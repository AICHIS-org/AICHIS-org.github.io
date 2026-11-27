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
    "({ CONTENT, EXPLORA_EDITIONS, PROFILES, BOARD_HISTORY, CITIES, COUNTRIES, UNIVERSITIES, MEMBER_MAP, PARTNERS, RESOURCES })",
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
      const val = obj[lang];
      const validString = typeof val === "string" && val.trim();
      const validList = Array.isArray(val) && val.length > 0 && val.every((s) => typeof s === "string" && s.trim());
      if (!validString && !validList) {
        errors.push(`${pathStr} is missing/empty "${lang}"`);
      }
    }
    return;
  }
  for (const k of keys) {
    checkTranslationLeaves(obj[k], pathStr ? `${pathStr}.${k}` : k);
  }
}

for (const name of ["EXPLORA_EDITIONS", "PROFILES", "BOARD_HISTORY", "COUNTRIES", "MEMBER_MAP", "PARTNERS", "RESOURCES"]) {
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
for (const partner of sandbox.PARTNERS || []) {
  if (partner.logo && !/^https?:\/\//.test(partner.logo) && !fs.existsSync(path.join(repoRoot, partner.logo))) {
    errors.push(`PARTNERS "${partner.name && partner.name.en}": logo not found at ${partner.logo}`);
  }
}
for (const edition of sandbox.EXPLORA_EDITIONS || []) {
  for (const r of edition.resources || []) {
    if (r.image && !/^https?:\/\//.test(r.image) && !fs.existsSync(path.join(repoRoot, r.image))) {
      errors.push(`EXPLORA_EDITIONS ${edition.year}: image not found at ${r.image}`);
    }
    if (r.date && !/^\d{4}-\d{2}-\d{2}$/.test(r.date)) {
      errors.push(`EXPLORA_EDITIONS ${edition.year}: date "${r.date}" must be written YYYY-MM-DD`);
    }
  }
}
for (const entry of sandbox.BOARD_HISTORY || []) {
  checkPhotoPaths(entry.members, `BOARD_HISTORY ${entry.year}`);
  for (const m of entry.members || []) {
    if (!m.role) errors.push(`BOARD_HISTORY ${entry.year} "${m.name}": missing role (is this entry in the right list?)`);
  }
}

/* --- 4. UNIVERSITIES: an address and coordinates for each, and for each
          of its faculties ------------------------------------------------ */
const inSweden = (at) =>
  Array.isArray(at) && at.length === 2 && at.every((n) => typeof n === "number") &&
  at[0] > 55 && at[0] < 69.3 && at[1] > 10.8 && at[1] < 24.3;
function checkPlace(place, label) {
  if (!place.name) errors.push(`${label}: missing name`);
  if (!place.address) errors.push(`${label}: missing address`);
  if (!inSweden(place.at)) errors.push(`${label}: \`at\` must be [latitude, longitude] of its address in Sweden, e.g. [59.35, 18.07]`);
}
for (const [key, uni] of Object.entries(sandbox.UNIVERSITIES || {})) {
  checkPlace(uni, `UNIVERSITIES "${key}"`);
  for (const [fkey, faculty] of Object.entries(uni.faculties || {})) {
    checkPlace(faculty, `UNIVERSITIES "${key}" faculty "${fkey}"`);
  }
}
const kmBetween = ([lat1, lon1], [lat2, lon2]) =>
  Math.hypot(lat2 - lat1, (lon2 - lon1) * Math.cos(((lat1 + lat2) / 2) * Math.PI / 180)) * 111;

/* --- 5. MEMBER_MAP: every member on it, with a known stage and city ----- */
for (const p of sandbox.PROFILES || []) {
  if (p.member && !(sandbox.MEMBER_MAP || []).some((m) => m.name === p.name)) {
    errors.push(`PROFILES "${p.name}" is a member but not on the map — add them to MEMBER_MAP`);
  }
}
for (const m of sandbox.MEMBER_MAP || []) {
  if (m.current && !(sandbox.PROFILES || []).some((p) => p.name === m.name && p.member)) {
    errors.push(`MEMBER_MAP "${m.name}" is a current member but has no PROFILES entry with that exact name`);
  }
}
const STAGES = ["student", "phd", "postdoc", "pi", "researcher", "professional"];
checkPhotoPaths(sandbox.MEMBER_MAP, "MEMBER_MAP");
for (const m of sandbox.MEMBER_MAP || []) {
  if (!STAGES.includes(m.stage)) {
    errors.push(`MEMBER_MAP "${m.name}": stage "${m.stage}" must be one of ${STAGES.join(", ")}`);
  }
  if (!(sandbox.CITIES || {})[m.city]) {
    errors.push(`MEMBER_MAP "${m.name}": city "${m.city}" is not in CITIES — add it there with its coordinates`);
  }
  if (m.university !== undefined && !(sandbox.UNIVERSITIES || {})[m.university]) {
    errors.push(`MEMBER_MAP "${m.name}": university "${m.university}" is not in UNIVERSITIES — add it there with its coordinates`);
  }
  const uni = (sandbox.UNIVERSITIES || {})[m.university];
  const faculty = uni && (uni.faculties || {})[m.faculty];
  if (m.faculty !== undefined && !faculty) {
    errors.push(uni
      ? `MEMBER_MAP "${m.name}": faculty "${m.faculty}" is not one of ${m.university}'s faculties in UNIVERSITIES (${Object.keys(uni.faculties || {}).join(", ") || "it has none yet"}) — add it there with its address`
      : `MEMBER_MAP "${m.name}": faculty "${m.faculty}" needs a university from UNIVERSITIES`);
  }
  // the pin goes to the faculty's address, or else the university's: make
  // sure that isn't a campus in another part of the country
  const spot = faculty || uni;
  const city = (sandbox.CITIES || {})[m.city];
  if (spot && inSweden(spot.at) && city && kmBetween(spot.at, city) > 30) {
    errors.push(`MEMBER_MAP "${m.name}": would be drawn at ${spot.address}, ${Math.round(kmBetween(spot.at, city))} km from their city "${m.city}" — if they are at another campus, set \`faculty\` to it; otherwise set \`city\` to where they work`);
  }
  (m.history || []).forEach((step, n) => {
    const where = `MEMBER_MAP "${m.name}" history[${n}]`;
    if (!step.years) errors.push(`${where}: missing years`);
    if (!step.role) errors.push(`${where}: missing role`);
    if (!STAGES.includes(step.stage)) errors.push(`${where}: stage "${step.stage}" must be one of ${STAGES.join(", ")}`);
    if (!(sandbox.COUNTRIES || {})[step.country]) {
      errors.push(`${where}: country "${step.country}" is not in COUNTRIES — add it there`);
    } else if (step.country === "Sweden" && !(sandbox.CITIES || {})[step.city]) {
      errors.push(`${where}: city "${step.city}" is in Sweden but not in CITIES — add it there`);
    }
  });
  if (typeof m.current !== "boolean") {
    errors.push(`MEMBER_MAP "${m.name}": current must be true or false`);
  }
}

/* --- report -------------------------------------------------------------- */
if (errors.length) {
  console.error(`✗ ${errors.length} problem(s) found in content.js:\n`);
  errors.forEach((e) => console.error("  - " + e));
  process.exit(1);
}

console.log("✓ content.js: translations complete, all photo paths exist, map entries valid.");
