/*
 * Builds the static site into dist/:
 *   public/            copied as-is (images, CNAME, robots.txt, sitemap)
 *   src/client/*.ts    bundled by esbuild into js/
 *   src/styles         joined and minified into css/
 *   src/site/pages     prerendered to .html, linking assets with a content hash for cache busting
 */
import { createHash } from "node:crypto";
import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import * as esbuild from "esbuild";
import { stylesheets } from "../styles/index.ts";
import { document, pages, type Assets } from "../site/pages.ts";
import { prerender } from "./prerender.ts";

const root = fileURLToPath(new URL("../../", import.meta.url));
const dist = join(root, "dist");
const client = join(root, "src/client");

/** Browser targets for both scripts and styles. */
const target = ["chrome111", "edge111", "firefox114", "safari16.4"];

const write = async (path: string, contents: string): Promise<void> => {
  await mkdir(dirname(join(dist, path)), { recursive: true });
  await writeFile(join(dist, path), contents);
};

const bundle = async (entry: string): Promise<string> => {
  const result = await esbuild.build({
    entryPoints: [join(client, entry)],
    bundle: true,
    format: "iife",
    minify: true,
    target,
    write: false,
    legalComments: "none",
  });
  return result.outputFiles[0].text;
};

const started = performance.now();
await rm(dist, { recursive: true, force: true });
await cp(join(root, "public"), dist, { recursive: true });

const files = new Map<string, string>([["js/main.js", await bundle("main.ts")]]);
for (const [path, modules] of Object.entries(stylesheets)) {
  const { code } = await esbuild.transform(modules.join("\n\n"), { loader: "css", minify: true, target });
  files.set(path, code);
}
for (const [path, contents] of files) await write(path, contents);

const hashes = new Map([...files].map(([path, contents]) => [path, createHash("sha256").update(contents).digest("hex").slice(0, 10)]));
const assets: Assets = {
  url: (path) => {
    const hash = hashes.get(path);
    if (!hash) throw new Error(`No built asset at ${path}`);
    return `/${path}?v=${hash}`;
  },
  themeInit: (await bundle("theme-init.ts")).trim(),
};

for (const page of pages) await write(page.file, document(page, prerender(page), assets));

const summary = [...files.keys(), ...pages.map((page) => page.file)].map((path) => `  ${path}`).join("\n");
console.log(`Built dist/ in ${Math.round(performance.now() - started)} ms\n${summary}`);
