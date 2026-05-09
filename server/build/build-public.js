const fs = require("fs");
const path = require("path");

function rm(dir) {
  fs.rmSync(dir, { recursive: true, force: true });
}

function mkdirp(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function copyDir(src, dst) {
  mkdirp(dst);
  for (const ent of fs.readdirSync(src, { withFileTypes: true })) {
    const a = path.join(src, ent.name);
    const b = path.join(dst, ent.name);
    if (ent.isDirectory()) copyDir(a, b);
    else fs.copyFileSync(a, b);
  }
}

const ROOT = path.join(__dirname, "..", "src");
const SRC = path.join(ROOT, "public-src");
const OUT = path.join(ROOT, "public");

if (!fs.existsSync(SRC)) {
  console.error(`[build-public] missing source dir: ${SRC}`);
  process.exit(1);
}

rm(OUT);
copyDir(SRC, OUT);

console.log(`[build-public] copied public-src → public`);

