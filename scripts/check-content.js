#!/usr/bin/env node
/* =========================================================================
   PR check: validates assets/js/content.js so common editing mistakes
   (a typo that breaks the page, a translation left out, a renamed/missing
   photo) get caught before merge instead of after deploy.
   ========================================================================= */
"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const repoRoot = path.resolve(__dirname, "..");
const contentPath = path.join(repoRoot, "assets/js/content.js");
const LANGS = ["es", "en", "sv"];

const errors = [];

/* --- load content.js in a sandbox so we can inspect its data ---------- */
const code = fs.readFileSync(contentPath, "utf8");
const context = {};
vm.createContext(context);
let sandbox;
try {
  vm.runInContext(code, context, { filename: "content.js" });
  // top-level `const`/`let` don't attach to the context object itself, so
  // pull the values out via a second eval in the same lexical scope.
  sandbox = vm.runInContext(
    "({ CONTENT, EXPLORA_EDITIONS, PROFILES, BOARD_HISTORY, RESEARCHERS, RESOURCES })",
    context
  );
} catch (err) {
  console.error("✗ content.js failed to run:\n" + err.message);
  process.exit(1);
}

/* --- 1. CONTENT: es/en/sv must define the exact same nested keys ------ */
function keysDeep(obj, prefix = "") {
  let keys = [];
  for (const k of Object.keys(obj || {})) {
    const full = prefix ? `${prefix}.${k}` : k;
    const val = obj[k];
    if (val && typeof val === "object" && !Array.isArray(val)) {
      keys = keys.concat(keysDeep(val, full));
    } else {
      keys.push(full);
    }
  }
  return keys;
}

const { CONTENT } = sandbox;
if (!CONTENT || LANGS.some((l) => !CONTENT[l])) {
  errors.push(`CONTENT must define all of: ${LANGS.join(", ")}`);
} else {
  const keySets = Object.fromEntries(LANGS.map((l) => [l, new Set(keysDeep(CONTENT[l]))]));
  const allKeys = new Set(LANGS.flatMap((l) => [...keySets[l]]));
  for (const key of allKeys) {
    const missing = LANGS.filter((l) => !keySets[l].has(key));
    if (missing.length) {
      errors.push(`CONTENT.{${LANGS.join("|")}}.${key} is missing in: ${missing.join(", ")}`);
    }
  }
}

/* --- 2. Any inline { es, en, sv } object must have all three ---------- */
function checkTranslationLeaves(obj, pathStr) {
  if (obj === null || typeof obj !== "object") return;
  if (Array.isArray(obj)) {
    obj.forEach((item, i) => checkTranslationLeaves(item, `${pathStr}[${i}]`));
    return;
  }
  const keys = Object.keys(obj);
  const looksLikeTranslation = keys.length > 0 && keys.every((k) => LANGS.includes(k));
  if (looksLikeTranslation) {
    for (const lang of LANGS) {
      if (typeof obj[lang] !== "string" || !obj[lang].trim()) {
        errors.push(`${pathStr} is missing/empty "${lang}"`);
      }
    }
    return;
  }
  for (const k of keys) {
    checkTranslationLeaves(obj[k], pathStr ? `${pathStr}.${k}` : k);
  }
}

for (const name of ["EXPLORA_EDITIONS", "PROFILES", "BOARD_HISTORY", "RESEARCHERS", "RESOURCES"]) {
  if (sandbox[name] !== undefined) checkTranslationLeaves(sandbox[name], name);
}

/* --- 3. Local photo paths must actually exist on disk ------------------ */
function checkPhotoPaths(list, label) {
  if (!Array.isArray(list)) return;
  for (const entry of list) {
    const photo = entry && entry.photo;
    if (photo && !/^https?:\/\//.test(photo)) {
      const abs = path.join(repoRoot, photo);
      if (!fs.existsSync(abs)) {
        errors.push(`${label} "${entry.name}": photo not found at ${photo}`);
      }
    }
  }
}

checkPhotoPaths(sandbox.PROFILES, "PROFILES");
for (const entry of sandbox.BOARD_HISTORY || []) {
  checkPhotoPaths(entry.members, `BOARD_HISTORY ${entry.year}`);
}

/* --- report -------------------------------------------------------------- */
if (errors.length) {
  console.error(`✗ ${errors.length} problem(s) found in content.js:\n`);
  errors.forEach((e) => console.error("  - " + e));
  process.exit(1);
}

console.log("✓ content.js: translations complete, all photo paths exist.");
