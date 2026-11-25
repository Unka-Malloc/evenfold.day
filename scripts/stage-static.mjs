#!/usr/bin/env node
import { cpSync, existsSync, mkdirSync, rmSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");

const PUBLIC_ENTRIES = [
  "index.html",
  "404.html",
  "robots.txt",
  "sitemap.xml",
  "favicon.png",
  "apple-touch-icon.png",
  "assets",
  "zh",
  "privacy",
  "terms",
  "support"
];

rmSync(dist, { recursive: true, force: true });
mkdirSync(dist, { recursive: true });

for (const entry of PUBLIC_ENTRIES) {
  const src = path.join(root, entry);
  if (!existsSync(src)) {
    throw new Error(`Missing required public entry: ${entry}`);
  }
  const dest = path.join(dist, entry);
  cpSync(src, dest, {
    recursive: true,
    filter: (sourcePath) => path.basename(sourcePath) !== ".DS_Store"
  });
}

console.log(`Staged ${PUBLIC_ENTRIES.length} public entries to dist/`);
