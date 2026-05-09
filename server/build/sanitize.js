const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..", "src", "public-src");
const required = [
  path.join(ROOT, "index.html"),
  path.join(ROOT, "assets", "js", "main.js"),
  path.join(ROOT, "assets", "css", "styles.css")
];

for (const p of required) {
  if (!fs.existsSync(p)) {
    console.error(`[sanitize] missing required file: ${p}`);
    process.exit(1);
  }
}

// Minimal “sanitization” gate: ensure the contact form posts to our local API (no external POST).
const indexHtml = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
if (!indexHtml.includes('data-endpoint="/api/contact"')) {
  console.error("[sanitize] expected index.html contact form to use data-endpoint=\"/api/contact\"");
  process.exit(1);
}

console.log("[sanitize] ok");

