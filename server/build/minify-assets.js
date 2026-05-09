const fs = require("fs");
const path = require("path");
const CleanCSS = require("clean-css");
const terser = require("terser");

function readText(p) {
  return fs.readFileSync(p, "utf8");
}

function writeText(p, s) {
  fs.writeFileSync(p, s);
}

async function main() {
  const root = path.join(__dirname, "..", "src", "public");
  const dist = path.join(root, "dist");
  const manifestPath = path.join(dist, "manifest.json");
  if (!fs.existsSync(manifestPath)) {
    console.error("[minify-assets] missing manifest.json (run bundle-client first)");
    process.exit(1);
  }
  const manifest = JSON.parse(readText(manifestPath));
  const jsPath = path.join(dist, manifest.js);
  const cssPath = path.join(dist, manifest.css);

  const jsIn = readText(jsPath);
  const jsOut = await terser.minify(jsIn, {
    compress: true,
    mangle: true,
    format: { comments: false }
  });
  if (!jsOut.code) throw new Error("terser did not return code");
  writeText(jsPath, jsOut.code + "\n");

  const cssIn = readText(cssPath);
  const cssOut = new CleanCSS({ level: 2 }).minify(cssIn);
  if (cssOut.errors && cssOut.errors.length) {
    console.error(cssOut.errors);
    process.exit(1);
  }
  writeText(cssPath, (cssOut.styles || "") + "\n");

  console.log(`[minify-assets] minified dist assets`);
}

main().catch((e) => {
  console.error("[minify-assets] failed", e);
  process.exit(1);
});

