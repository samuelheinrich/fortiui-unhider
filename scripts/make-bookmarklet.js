const fs = require("fs");

const sourcePath = process.argv[2];
const targetPath = process.argv[3];

if (!sourcePath || !targetPath) {
  throw new Error("Usage: node make-bookmarklet.js <source.js> <target.bookmarklet.txt>");
}

const source = fs
  .readFileSync(sourcePath, "utf8")
  .replace(/\/\*[\s\S]*?\*\//g, "")
  .replace(/\n\s*/g, " ")
  .trim();

fs.writeFileSync(targetPath, `javascript:${source}\n`);
