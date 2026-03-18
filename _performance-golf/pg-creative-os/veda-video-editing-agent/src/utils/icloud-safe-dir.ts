/**
 * iCloud-safe directory creation.
 *
 * When the project lives on iCloud Drive, rapid file writes (e.g. FFmpeg output)
 * trigger iCloud's sync daemon to create conflict copies — appending " 2", " 3", etc.
 * to both directories and files. The `.nosync` suffix tells iCloud to skip syncing.
 *
 * This utility ensures any directory used for heavy writes gets the `.nosync` treatment:
 *   1. Creates `<dir>.nosync/` as the real directory
 *   2. Creates a symlink `<dir>` → `<dir>.nosync` so all code paths work unchanged
 *
 * If the directory already exists as a regular dir (not on iCloud, or already `.nosync`),
 * this is a no-op — it just ensures the directory exists.
 */

import { mkdir, symlink, lstat, readlink, rename } from "node:fs/promises";
import { resolve, basename } from "node:path";

/** Returns true if the path appears to be inside iCloud Drive. */
function isOnICloudDrive(dirPath: string): boolean {
  const resolved = resolve(dirPath);
  // iCloud Drive paths on macOS:
  // ~/Library/Mobile Documents/ (system-level)
  // Anything under a known iCloud-synced folder
  return (
    resolved.includes("/Library/Mobile Documents/")
  );
}

/**
 * Ensure a directory exists with iCloud-safe `.nosync` protection.
 *
 * - If on iCloud: creates `<path>.nosync/` + symlink `<path>` → `<path>.nosync`
 * - If not on iCloud: just `mkdir -p`
 * - If already set up correctly: no-op
 */
export async function ensureICloudSafeDir(dirPath: string): Promise<void> {
  const resolved = resolve(dirPath);

  // Not on iCloud — plain mkdir is fine
  if (!isOnICloudDrive(resolved)) {
    await mkdir(resolved, { recursive: true });
    return;
  }

  // Already ends in .nosync — just mkdir
  if (resolved.endsWith(".nosync")) {
    await mkdir(resolved, { recursive: true });
    return;
  }

  const nosyncPath = `${resolved}.nosync`;

  // Check if symlink already exists and points to .nosync
  try {
    const stat = await lstat(resolved);
    if (stat.isSymbolicLink()) {
      const target = await readlink(resolved);
      if (target === `${basename(resolved)}.nosync` || target === nosyncPath) {
        // Symlink already set up — just ensure .nosync dir exists
        await mkdir(nosyncPath, { recursive: true });
        return;
      }
    }
    // exists as a regular directory — migrate it
    if (stat.isDirectory()) {
      await rename(resolved, nosyncPath);
      await symlink(nosyncPath.split("/").pop()!, resolved);
      return;
    }
  } catch {
    // doesn't exist yet — create fresh
  }

  // Create .nosync dir + symlink
  await mkdir(nosyncPath, { recursive: true });
  try {
    await symlink(nosyncPath.split("/").pop()!, resolved);
  } catch {
    // symlink creation failed (race condition, etc) — .nosync dir still exists and works
  }
}
