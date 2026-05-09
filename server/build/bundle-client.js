const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

function sha256Hex(s) {
  return crypto.createHash("sha256").update(s).digest("hex");
}

function readText(p) {
  return fs.readFileSync(p, "utf8");
}

function writeText(p, s) {
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, s);
}

function replaceAll(html, needle, replacement) {
  return html.split(needle).join(replacement);
}

const SRC_ROOT = path.join(__dirname, "..", "src", "public");
const distDir = path.join(SRC_ROOT, "dist");
fs.mkdirSync(distDir, { recursive: true });

const jsMain = path.join(SRC_ROOT, "assets", "js", "main.js");
const cssA = path.join(SRC_ROOT, "assets", "css", "styles.css");

if (!fs.existsSync(jsMain) || !fs.existsSync(cssA)) {
  console.error("[bundle-client] expected assets missing under src/public/assets");
  process.exit(1);
}

const bundleJs = `${readText(jsMain)}\n`;
const bundleCss = readText(cssA);

const jsHash = sha256Hex(bundleJs).slice(0, 16);
const cssHash = sha256Hex(bundleCss).slice(0, 16);

const jsFile = `${jsHash}.js`;
const cssFile = `${cssHash}.css`;

writeText(path.join(distDir, jsFile), bundleJs);
writeText(path.join(distDir, cssFile), bundleCss);

const manifest = {
  js: jsFile,
  css: cssFile,
  assetsJs: {
    "assets/js/main.js": jsFile
  },
  assetsCss: {
    "assets/css/styles.css": cssFile
  }
};
writeText(path.join(distDir, "manifest.json"), JSON.stringify(manifest, null, 2) + "\n");

// Rewrite HTML files to reference dist assets.
for (const name of ["index.html", "privacy-policy.html", "disclaimer.html"]) {
  const htmlPath = path.join(SRC_ROOT, name);
  if (!fs.existsSync(htmlPath)) continue;
  let html = readText(htmlPath);

  html = replaceAll(html, '<link rel="stylesheet" href="./assets/css/styles.css" />', `<link rel="stylesheet" href="./dist/${cssFile}" />`);
  html = replaceAll(html, '<script src="./assets/js/site-content.js"></script>', "");
  html = replaceAll(html, '<script src="./assets/js/main.js" defer></script>', `<script src="./dist/${jsFile}" defer></script>`);

  writeText(htmlPath, html);
}

console.log(`[bundle-client] wrote dist/${jsFile}, dist/${cssFile} and updated HTML`);

