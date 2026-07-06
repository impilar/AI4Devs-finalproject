#!/usr/bin/env node
/**
 * Verifies that all user stories in a release scope are enriched before
 * generating implementation-plan / implementation-queue artifacts.
 *
 * Usage:
 *   node 05-scripts/check-stories-enriched.mjs --release V1
 *   node 05-scripts/check-stories-enriched.mjs --release MVP
 *   node 05-scripts/check-stories-enriched.mjs --story US-003
 *
 * Exit 0 = all in scope enriched; exit 1 = gaps found.
 */

import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const STATUS_PATH = join(
  ROOT,
  "02-docs/02_1-product/user-stories/status-v1.json",
);
const STORIES_DIR = join(ROOT, "02-docs/02_1-product/user-stories");

const ENRICHED_SECTION = "## Detalle de implementación (historia)";
const TASK_DETAIL_SECTION = "## Detalle por task";

function parseArgs(argv) {
  const args = { release: null, story: null };

  for (let i = 2; i < argv.length; i += 1) {
    if (argv[i] === "--release" && argv[i + 1]) {
      args.release = argv[++i];
      continue;
    }
    if (argv[i] === "--story" && argv[i + 1]) {
      args.story = argv[++i].toUpperCase();
      continue;
    }
    if (argv[i] === "--help" || argv[i] === "-h") {
      args.help = true;
    }
  }

  return args;
}

function loadStatus() {
  return JSON.parse(readFileSync(STATUS_PATH, "utf8"));
}

function readStoryFile(storyId) {
  const path = join(STORIES_DIR, `${storyId}.md`);
  return readFileSync(path, "utf8");
}

function isStoryEnriched(storyId, storyMeta) {
  if (storyMeta.status === "cancelled") {
    return { ok: true, skipped: true, reason: "cancelled" };
  }

  if (storyMeta.enriched === true) {
    return { ok: true, via: "status-v1.json" };
  }

  let content;
  try {
    content = readStoryFile(storyId);
  } catch {
    return { ok: false, reason: `missing file ${storyId}.md` };
  }

  if (!content.includes(ENRICHED_SECTION)) {
    return { ok: false, reason: "missing ## Detalle de implementación (historia)" };
  }

  if (!content.includes(TASK_DETAIL_SECTION)) {
    return { ok: false, reason: "missing ## Detalle por task" };
  }

  const tasks = Object.keys(storyMeta.tasks ?? {});
  for (const taskId of tasks) {
    const heading = `### ${taskId} —`;
    if (!content.includes(heading)) {
      return { ok: false, reason: `missing task subsection ${taskId}` };
    }
  }

  if (content.includes("{{") || content.includes("TBD")) {
    return { ok: false, reason: "contains placeholders {{ or TBD" };
  }

  return { ok: true, via: "US-NNN.md sections" };
}

function printHelp() {
  console.log(`check-stories-enriched — gate before implementation plan/queue

Options:
  --release MVP|V1|V2+   Check all stories with matching release in status-v1.json
  --story US-NNN         Check a single story
  -h, --help             Show this help

Examples:
  node 05-scripts/check-stories-enriched.mjs --release V1
  node 05-scripts/check-stories-enriched.mjs --story US-003
`);
}

function main() {
  const args = parseArgs(process.argv);

  if (args.help) {
    printHelp();
    process.exit(0);
  }

  if (!args.release && !args.story) {
    console.error("Error: provide --release <MVP|V1|V2+> or --story US-NNN");
    printHelp();
    process.exit(1);
  }

  const status = loadStatus();
  const stories = Object.entries(status.stories);

  const inScope = stories.filter(([id, meta]) => {
    if (args.story) {
      return id === args.story;
    }
    return meta.release === args.release;
  });

  if (inScope.length === 0) {
    console.error(
      `Error: no stories found for ${args.story ?? `release ${args.release}`}`,
    );
    process.exit(1);
  }

  const failures = [];
  const passed = [];

  for (const [storyId, meta] of inScope) {
    const result = isStoryEnriched(storyId, meta);
    if (result.skipped) {
      passed.push({ storyId, note: result.reason });
      continue;
    }
    if (result.ok) {
      passed.push({ storyId, via: result.via });
      continue;
    }
    failures.push({ storyId, reason: result.reason });
  }

  console.log(
    `Enrichment check — scope: ${args.story ?? args.release} (${inScope.length} stories)\n`,
  );

  for (const { storyId, via, note } of passed) {
    console.log(`  OK   ${storyId}${via ? ` (${via})` : ""}${note ? ` [${note}]` : ""}`);
  }

  for (const { storyId, reason } of failures) {
    console.log(`  FAIL ${storyId} — ${reason}`);
  }

  if (failures.length > 0) {
    console.log(`
${failures.length} stor${failures.length === 1 ? "y" : "ies"} not enriched.

Next steps:
  1. Run agent .cursor/agents/user-story-enricher.md for each story above
  2. Skill: .cursor/skills/enrich-user-story.md
  3. Re-run: node 05-scripts/check-stories-enriched.mjs --release ${args.release ?? args.story}

Do not generate implementation-plan-* or implementation-queue-* until this check passes.
`);
    process.exit(1);
  }

  console.log("\nAll stories in scope are enriched. Safe to run Implementation Planner.");
  process.exit(0);
}

main();
