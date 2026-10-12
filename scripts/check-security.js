#!/usr/bin/env node
/* =========================================================================
   PR check: looks for the things a contribution should never add to this
   site — markup or scripts hidden inside content.js, links that aren't
   plain web/email addresses, code loaded from other websites, and unsafe
   changes to the GitHub workflows.

   It complements human review, it doesn't replace it: a maintainer still
   reads every change before merging.
   ========================================================================= */
"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const repoRoot = path.resolve(__dirname, "..");
const read = (rel) => fs.readFileSync(path.join(repoRoot, rel), "utf8");

/* --- the external services this site is allowed to load from -----------
   Adding a new one is a deliberate decision: list it here AND in the
   Content-Security-Policy <meta> tag in index.html. */
const ALLOWED_IFRAME_PREFIXES = ["https://www.youtube-nocookie.com/embed/"];
const ALLOWED_STYLESHEET_PREFIXES = ["https://fonts.googleapis.com/"];

const errors = [];

/* --- 1. content.js: plain text and plain links only -------------------- */
const LINK_KEYS = ["link", "linkedin", "webpage"];

function checkContentValue(value, where, key) {
  if (typeof value !== "string") return;

  if (/<\s*[a-z/!]/i.test(value)) {
    errors.push(`${where}: contains HTML markup — content.js only takes plain text`);
  }
  if (/javascript\s*:|data\s*:\s*text\/html|vbscript\s*:/i.test(value)) {
    errors.push(`${where}: contains a script-style address ("javascript:" or similar)`);
  }

  if (LINK_KEYS.includes(key) && value !== "") {
    const ok = /^https:\/\/[^\s"'<>]+$/.test(value) || (key === "link" && /^mailto:[^\s"'<>]+$/.test(value));
    if (!ok) errors.push(`${where}: "${value}" must be an https:// address${key === "link" ? " (or mailto:)" : ""}`);
  }
  if (key === "email" && !/^[^\s@"'<>]+@[^\s@"'<>]+\.[^\s@"'<>]+$/.test(value)) {
    errors.push(`${where}: "${value}" is not a plain email address`);
  }
  if ((key === "photo" || key === "image") && value !== "") {
    const local = /^assets\/img\/[\w./-]+$/.test(value) && !value.includes("..");
    if (!local && !/^https:\/\/[^\s"'<>]+$/.test(value)) {
      errors.push(`${where}: "${value}" must be a file under assets/img/ or an https:// address`);
    }
  }
}

function walk(value, where, key) {
  if (Array.isArray(value)) {
    value.forEach((item, i) => walk(item, `${where}[${i}]`, key));
  } else if (value && typeof value === "object") {
    const label = typeof value.name === "string" ? `${where} "${value.name}"` : where;
    for (const k of Object.keys(value)) walk(value[k], `${label}.${k}`, k);
  } else {
    checkContentValue(value, where, key);
  }
}

try {
  const context = {};
  vm.createContext(context);
  vm.runInContext(read("assets/js/content.js"), context, { filename: "content.js" });
  const data = vm.runInContext(
    "({ CONTENT, EXPLORA_EDITIONS, PROFILES, BOARD_HISTORY, RESEARCHERS, PARTNERS, RESOURCES })",
    context
  );
  for (const name of Object.keys(data)) walk(data[name], name, name);
} catch (err) {
  errors.push("content.js failed to run: " + err.message);
}

/* --- 2. site JavaScript: no code built from text at runtime ------------ */
const jsDir = "assets/js";
for (const file of fs.readdirSync(path.join(repoRoot, jsDir)).filter((f) => f.endsWith(".js"))) {
  const source = read(`${jsDir}/${file}`);
  for (const [pattern, what] of [
    [/\beval\s*\(/, "eval()"],
    [/\bnew\s+Function\s*\(/, "new Function()"],
    [/\bdocument\.write(ln)?\s*\(/, "document.write()"],
    [/\bimportScripts\s*\(|\bimport\s*\(/, "dynamic import"],
    [/createElement\(\s*["'`]script["'`]\s*\)/, "a dynamically created <script>"],
  ]) {
    if (pattern.test(source)) errors.push(`${jsDir}/${file}: uses ${what}, which is not allowed on this site`);
  }
}

/* --- 3. HTML pages: nothing loaded from, or sent to, unknown sites ----- */
const attr = (tag, name) => {
  const m = tag.match(new RegExp(`\\s${name}\\s*=\\s*("([^"]*)"|'([^']*)'|([^\\s>]+))`, "i"));
  return m ? (m[2] ?? m[3] ?? m[4]) : null;
};
const isLocal = (url) => !/^([a-z][a-z0-9+.-]*:|\/\/)/i.test(url.trim());

for (const file of fs.readdirSync(repoRoot).filter((f) => f.endsWith(".html"))) {
  const html = read(file).replace(/<!--[\s\S]*?-->/g, "");

  if (!/<meta[^>]+http-equiv\s*=\s*["']Content-Security-Policy["']/i.test(html)) {
    errors.push(`${file}: the Content-Security-Policy <meta> tag is missing`);
  }
  if (/javascript\s*:/i.test(html)) errors.push(`${file}: contains a "javascript:" address`);

  for (const tag of html.match(/<[a-z][^>]*>/gi) || []) {
    const name = tag.match(/^<([a-z0-9]+)/i)[1].toLowerCase();
    const short = tag.length > 90 ? tag.slice(0, 90) + "…" : tag;

    if (/\son[a-z]+\s*=/i.test(tag)) {
      errors.push(`${file}: inline event handler (onclick=, onerror=, …) in ${short}`);
    }
    if (/\sstyle\s*=/i.test(tag)) {
      errors.push(`${file}: inline style= in ${short} — put the rule in styles.css (the CSP blocks inline styles)`);
    }
    if (name === "script") {
      const src = attr(tag, "src");
      if (src === null) errors.push(`${file}: inline <script> — put the code in assets/js/ instead`);
      else if (!isLocal(src)) errors.push(`${file}: <script> loaded from another site: ${src}`);
    }
    if (name === "iframe" || name === "embed" || name === "object") {
      const src = attr(tag, "src") || attr(tag, "data") || "";
      if (name !== "iframe" || !ALLOWED_IFRAME_PREFIXES.some((p) => src.startsWith(p))) {
        errors.push(`${file}: <${name}> from a source that isn't on the allow-list: ${src || "(none)"}`);
      }
    }
    if (name === "link" && /stylesheet/i.test(attr(tag, "rel") || "")) {
      const href = attr(tag, "href") || "";
      if (!isLocal(href) && !ALLOWED_STYLESHEET_PREFIXES.some((p) => href.startsWith(p))) {
        errors.push(`${file}: stylesheet from a source that isn't on the allow-list: ${href}`);
      }
    }
    if (name === "form") errors.push(`${file}: <form> elements are not used on this site`);
    if (name === "base") errors.push(`${file}: <base> is not allowed`);
    if (name === "meta" && /refresh/i.test(attr(tag, "http-equiv") || "")) {
      errors.push(`${file}: <meta http-equiv="refresh"> redirects are not allowed`);
    }
    if (name === "a" && attr(tag, "target") === "_blank" && !/noopener/i.test(attr(tag, "rel") || "")) {
      errors.push(`${file}: link opens a new tab without rel="noopener": ${short}`);
    }
  }
}

/* --- 4. GitHub workflows: pinned actions, no privileged PR trigger ----- */
const workflowDir = ".github/workflows";
if (fs.existsSync(path.join(repoRoot, workflowDir))) {
  for (const file of fs.readdirSync(path.join(repoRoot, workflowDir)).filter((f) => /\.ya?ml$/.test(f))) {
    const lines = read(`${workflowDir}/${file}`).split("\n");
    lines.forEach((line, i) => {
      const code = line.replace(/\s+#.*$/, "").replace(/^\s*#.*$/, "");
      const at = `${workflowDir}/${file}:${i + 1}`;

      if (/\bpull_request_target\b/.test(code)) {
        errors.push(`${at}: "pull_request_target" gives pull requests from forks access to secrets — use "pull_request"`);
      }
      const uses = code.match(/^\s*-?\s*uses:\s*["']?([^"'\s]+)/);
      if (uses && !uses[1].startsWith("./") && !/@[0-9a-f]{40}$/.test(uses[1])) {
        errors.push(`${at}: action "${uses[1]}" must be pinned to a full commit hash (see CONTRIBUTING.md)`);
      }
      // Text a contributor controls (PR title, branch name, …) must not be
      // pasted into a shell command; assigning it to an `env:` variable is fine.
      const untrusted = /\$\{\{[^}]*github\.(head_ref|event\.(pull_request|issue|comment|review|discussion)\.)/.test(code);
      const plainAssignment = /^\s*(?!run\b)[\w-]+:\s*\$\{\{[^}]*\}\}\s*$/.test(code);
      if (untrusted && !plainAssignment) {
        errors.push(`${at}: text written by a contributor is used inside a command — pass it through "env:" instead`);
      }
    });
  }
}

/* --- report -------------------------------------------------------------- */
if (errors.length) {
  console.error(`✗ ${errors.length} security problem(s) found:\n`);
  errors.forEach((e) => console.error("  - " + e));
  console.error("\nIf one of these is intentional, explain why in the pull request so a maintainer can review it.");
  process.exit(1);
}

console.log("✓ security check: content, pages, scripts and workflows look safe.");
