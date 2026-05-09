const fs = require("fs");
const path = require("path");

const out = path.join(__dirname, "..", "src", "public");
fs.rmSync(out, { recursive: true, force: true });
console.log("[restore-dev-source] removed src/public (dev will use public-src)");

