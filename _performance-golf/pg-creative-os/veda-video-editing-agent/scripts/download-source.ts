#!/usr/bin/env node
/**
 * Quick script to download a source video from Iconik.
 * Usage: node --experimental-strip-types scripts/download-source.ts [asset-name] [proxy|original]
 */

import { IconikClient, createFetchSource } from "../src/utils/iconik-client.ts";

async function main() {
  const assetName = process.argv[2] ?? "dqfe-0012";
  const mode = (process.argv[3] as "proxy" | "original") ?? "proxy";

  const appId = process.env.ICONIK_APP_ID;
  const authToken = process.env.ICONIK_AUTH_TOKEN;

  if (!appId || !authToken) {
    console.error("Missing ICONIK_APP_ID or ICONIK_AUTH_TOKEN in environment");
    process.exit(1);
  }

  const client = new IconikClient({ appId, authToken });
  const fetchSource = createFetchSource(client, "./source-videos", mode);

  console.log(`Searching Iconik for "${assetName}" (${mode} mode)...`);
  const result = await fetchSource(assetName);

  console.log(JSON.stringify(result, null, 2));

  if (result.status === "SUCCESS") {
    console.log(`\nDownloaded to: ${result.data.file_path}`);
  }
}

main();
