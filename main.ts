// Fix Human Sleep: Funniest Patch Note
// Writes a single-line patch note announcing that human sleep is fixed.
// Gate (kit RULES): /output/entry.txt, UTF-8, 1-160 characters, one line.
// The note reads like a real changelog line: version, "Fixed", a specific
// bug (sleep crashing at 3 a.m.), and the payoff (no more forty tabs).
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";

const ENTRY =
  "v2.4.1 — Fixed a bug where human sleep crashed at 3 a.m.; users can now close their eyes without the brain opening forty tabs.";

function main(): void {
  // Gate guard: the entry must stay a single line under 160 characters.
  if (ENTRY.length < 1 || ENTRY.length > 160 || ENTRY.includes("\n")) {
    throw new Error(`entry violates gate: ${ENTRY.length} characters`);
  }
  const outArg = process.argv[2];
  const outDir = outArg ? resolve(outArg) : "/output";
  // Accept either a directory or a file path, like the grader's /output.
  const outFile = outArg && outArg.endsWith(".txt") ? outDir : join(outDir, "entry.txt");
  mkdirSync(dirname(outFile), { recursive: true });
  writeFileSync(outFile, ENTRY, "utf8");
  console.log(`wrote ${outFile} (${ENTRY.length} characters)`);
}

main();
