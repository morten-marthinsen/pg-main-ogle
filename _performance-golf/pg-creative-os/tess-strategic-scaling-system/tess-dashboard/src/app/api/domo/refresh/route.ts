/**
 * POST /api/domo/refresh
 *
 * Cache-busting endpoint. Clears all cached Domo data.
 */

import { NextResponse } from "next/server";
import { clearCache } from "@/lib/cache";

export async function POST() {
  clearCache();
  return NextResponse.json({ status: "ok", message: "Cache cleared" });
}
