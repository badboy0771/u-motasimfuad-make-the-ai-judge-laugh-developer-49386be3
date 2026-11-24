// Entry: "Make the AI Judge Laugh: Developer Excuses" (make.fun).
//
// A developer, the morning production fell over, explaining that it was
// not the code's fault. The excuse is one sentence, and the sentence is a
// trap: it starts as a denial and ends as a confession. The code did not
// break prod — a cron job the same developer wrote in 2021 did, by waking
// up and doing exactly what it was told to do years ago. The blame the
// speaker tries to dodge lands back on the speaker in the final words.
//
// This program does nothing creative. It is a courier: it holds the line,
// checks it against the bounty gate, writes it to /output/entry.txt, and
// reads the file back so a truncated or altered write can never slip
// through silently. Plain Node 22+, no dependencies, no network, no
// arguments:
//
//   node main.ts

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// ---------------------------------------------------------------------------
// The entry
// ---------------------------------------------------------------------------

// One line, 109 characters. The file the judge reads holds this line and
// nothing else — no trailing newline, no padding. The gate counts
// characters, so the exact string below is the entry; editing it here
// edits the submission.
const ENTRY_LINE =
  "My code didn't break prod — the cron job I wrote in 2021 finally woke up and remembered what I told it to do.";

// ---------------------------------------------------------------------------
// The gate
// ---------------------------------------------------------------------------

// /output/entry.txt must be UTF-8 text of 1–200 characters, a single line,
// and not only whitespace. Anything else never reaches the judge.
const GATE = { minChars: 1, maxChars: 200 } as const;
const ENTRY_PATH = "/output/entry.txt";

interface GateFailure {
  rule: string;
  detail: string;
}

// Each check returns a failure describing what is wrong, or null when the
// line passes that rule. Splitting the rules apart means a bad edit fails
// with the name of the rule it broke, not a generic error.
function checkLength(line: string): GateFailure | null {
  if (line.length < GATE.minChars || line.length > GATE.maxChars) {
    return {
      rule: "length",
      detail: `line is ${line.length} characters, gate allows ${GATE.minChars}-${GATE.maxChars}`,
    };
  }
  return null;
}

function checkPadding(raw: string): GateFailure | null {
  if (raw.trim() !== raw) {
    return {
      rule: "padding",
      detail: "line must not have leading or trailing whitespace",
    };
  }
  return null;
}

function checkSingleLine(line: string): GateFailure | null {
  if (/[\r\n]/.test(line)) {
    return { rule: "single-line", detail: "line must not contain a line break" };
  }
  return null;
}

function checkNotBlank(line: string): GateFailure | null {
  if (line.trim().length === 0) {
    return { rule: "blank", detail: "line must not be only whitespace" };
  }
  return null;
}

// Run every rule and throw on the first failure found. The order is the
// order a reader would notice the problem: size, then shape, then content.
function validateEntry(raw: string): string {
  const checks = [checkLength, checkPadding, checkSingleLine, checkNotBlank];
  for (const check of checks) {
    const failure = check(raw);
    if (failure !== null) {
      throw new Error(`gate failed (${failure.rule}): ${failure.detail}`);
    }
  }
  return raw;
}

// ---------------------------------------------------------------------------
// Writing
// ---------------------------------------------------------------------------

// Write the validated line, then read it back and compare character for
// character. The round-trip is the only proof that what is on disk is what
// is above — a write that silently truncates would otherwise pass.
function writeAndVerify(line: string): void {
  mkdirSync("/output", { recursive: true });
  writeFileSync(ENTRY_PATH, line, "utf8");
  const onDisk = readFileSync(ENTRY_PATH, "utf8");
  if (onDisk !== line) {
    throw new Error(
      `read-back mismatch: disk holds ${onDisk.length} characters, entry has ${line.length}`,
    );
  }
  if (onDisk.includes("\n") || onDisk.includes("\r")) {
    throw new Error("entry file must not contain a line break");
  }
}

function main(): void {
  const line = validateEntry(ENTRY_LINE);
  writeAndVerify(line);
  console.log(`wrote ${ENTRY_PATH} (${line.length} characters, 1 line)`);
  console.log(line);
}

main();
