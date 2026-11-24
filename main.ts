import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, isAbsolute, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const LINE =
  "I told my boss I'd bring the quarterly raccoon to the meeting — I meant report, but he's already asked me to bring snacks for it.";

// Gate validation: one line, 1-200 characters.
if (LINE.length < 1 || LINE.length > 200 || LINE.includes("\n")) {
  throw new Error("entry line must be a single line of 1-200 characters");
}

// Resolve the output dir relative to this script file, never process.cwd().
const scriptDir = dirname(fileURLToPath(import.meta.url));
const rawOut = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const outDir = isAbsolute(rawOut) ? rawOut : resolve(scriptDir, rawOut);
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
