---
name: close-release
description: Verify release completion (queue, status, OpenSpec, tests, git) and prepare the release pull request. Use at the end of MVP, V1, or V2+ when all slices are implemented.
license: MIT
compatibility: Requires openspec CLI, gh CLI, local Postgres for integration/E2E tests.
metadata:
  author: project
  version: "1.0"
---

Close a product release after all slices are implemented, archived, and synced.

**Agent:** `.cursor/agents/release-manager.md`  
**Command:** `/release:close [MVP|V1|V2+]`

**Input:** Release name (`MVP`, `V1`, `V2+`). Default: infer from `implementation-queue-*.json` `scope` field, or ask.

**Outcome:** Structured PASS/FAIL report. On PASS (and user confirmation), push branch if needed and open PR with `gh`.

---

## Prerequisites

Before running close-release:

- Every slice in the release was implemented via `/opsx:apply`
- Every change was verified (`openspec-verify-change`) and archived (`openspec-archive-change`)
- No active folders under `openspec/changes/` except `archive/` and `README.md`

---

## Step 1 — Resolve release scope

1. Read `docs/product/roadmap/roadmap-v1.md` §4 (Vista por release) for expected stories.
2. Load `docs/product/user-stories/status-v1.json`.
3. Find implementation queue: `docs/engineering/implementation-queue-vN.json` where `scope` matches the release (e.g. `MVP` → `implementation-queue-v1.json`).

Build inventory:

| Story | Expected tasks (from status-v1.json) |
|-------|--------------------------------------|

**Fail if:** release name unknown or queue file missing for scope.

---

## Step 2 — Implementation queue

Read `docs/engineering/implementation-queue-vN.json`.

**Checks:**

```bash
# Pending tasks in queue (any status != done)
jq '[.queue[] | select(.status != "done")] | length' docs/engineering/implementation-queue-vN.json

# Pending phases
jq '[.phases[] | select(.status != "done")] | length' docs/engineering/implementation-queue-vN.json
```

**Fail if:**

- Any task in `queue[]` for stories of this release is not `done`
- Any `phases[]` entry for this release is not `done`
- Task count for release stories ≠ all `done` in `status-v1.json`

---

## Step 3 — status-v1.json sync

**Checks:**

```bash
RELEASE="MVP"  # or V1, V2+

# Stories of release not done
jq --arg r "$RELEASE" '.stories | to_entries[] | select(.value.release == $r and .value.status != "done") | .key' docs/product/user-stories/status-v1.json

# Tasks of release stories not done
jq --arg r "$RELEASE" '[.stories | to_entries[] | select(.value.release == $r) | .value.tasks | to_entries[] | select(.value != "done")] | length' docs/product/user-stories/status-v1.json
```

**Epic status rules** (see `docs/product/user-stories/README.md`):

- Epic `done` → all its stories (any release) are `done`
- Epic `in_progress` → at least one story done, release slice may be complete but epic continues in later releases
- Epic `backlog` → **fail** if any story of the current release is already `done` (stale sync)

**Fail if:**

- Any story with `release: <RELEASE>` is not `done`
- Any task under those stories is not `done`
- Epic still `backlog` while release stories are `done`

**On pass:** update `last_updated` to today if stale (only this field and epic statuses; do not mark epics `done` if V1/V2+ stories remain).

---

## Step 4 — OpenSpec hygiene

**Active changes:**

```bash
ls -1 openspec/changes/ | grep -v -E '^(archive|README\.md)$'
```

**Fail if:** any active change directory exists (slices must be archived first).

**Archived changes:**

- For each story in the release, confirm at least one folder exists under `openspec/changes/archive/` matching the story (e.g. `*us-001*`, `*us-015-016*`).
- Confirm merged specs exist in `openspec/specs/` for capabilities introduced in the release.

**Optional validation:**

```bash
openspec validate --type spec --strict --json 2>/dev/null || openspec doctor
```

**Fail if:** expected archive missing or main specs obviously out of sync with archived deltas.

---

## Step 5 — Automated tests

Run full suite (Postgres required for integration/E2E):

```bash
cd src/backend && npm run test
cd src/backend && DATABASE_URL=postgresql://okc:okc@localhost:5432/okc npm run test:integration
cd src/frontend && npm run test
cd <repo-root> && npm run test:e2e
```

**Fail if:** any suite fails. Fix before PR.

---

## Step 6 — Definition of Done

Read `.cursor/rules/08-definition-of-done.mdc`.

For each story in the release, confirm:

- Gherkin scenarios covered by tests (`tests/e2e/us-NNN-*.spec.ts` or integration tests)
- No secrets in working tree diff
- Release notes path documented (see Step 7)

---

## Step 7 — Release documentation

Use `.cursor/skills/release-planning.md` when notes do not exist yet.

**Expected outputs:**

- `delivery/releases/<version>-<release-name>/RELEASE.md` — summary, stories delivered, test evidence pointers
- `delivery/changelogs/CHANGELOG.md` — version entry

**Warn (non-blocking)** if release folder missing; offer to generate from roadmap + status-v1.json.

---

## Step 8 — Git and branch hygiene

Run in parallel:

```bash
git status
git diff
git diff --staged
git branch -vv
git log --oneline -5
git log main..HEAD --oneline  # or master
```

**Fail if:**

- Uncommitted changes that belong to the release (code, docs, openspec, status, queue)
- Untracked files that should be versioned (exclude `node_modules`, `.env`, `delivery/evidence/`, vitest cache)

**Warn if:**

- Branch not pushed to remote (`ahead` without upstream)
- Commits not following `CONTRIBUTING.md` convention (`feat(scope):`, `docs:`, etc.)

**Commits:** only create commits when the user explicitly asks (see user rules). Report what must be committed.

**Push:** only when user confirms close-release should open PR (requires `git_write` + network).

---

## Step 9 — Pull request

Only when Steps 1–8 are **PASS** (warnings acknowledged) and user confirms PR creation.

1. Ensure branch pushed: `git push -u origin HEAD`
2. Analyze full diff vs base branch (`main` or `master`)
3. Create PR with `gh pr create`:

```bash
gh pr create --title "release(<scope>): <Release name> — <short description>" --body "$(cat <<'EOF'
## Summary
- <bullet: what the release delivers>
- <bullet: stories US-XXX … US-YYY>
- <bullet: OpenSpec archived, queue and status synced>

## Test plan
- [ ] Backend unit tests pass
- [ ] Integration tests pass
- [ ] Frontend unit tests pass
- [ ] E2E tests pass
- [ ] Manual smoke: <main user journey>

## Release checklist
- [ ] implementation-queue: all tasks done
- [ ] status-v1.json: all release stories/tasks done
- [ ] OpenSpec: no active changes; archives present
- [ ] delivery/releases documented

EOF
)"
```

Return the PR URL to the user.

---

## Report format

```markdown
## Release Close — <RELEASE>

| Check | Result | Notes |
|-------|--------|-------|
| Queue (`implementation-queue-vN.json`) | pass / fail | X/Y tasks done |
| Status (`status-v1.json`) | pass / fail | X/Y stories done |
| OpenSpec (no active changes) | pass / fail | N archives found |
| Tests (unit + integration + e2e) | pass / fail | … |
| DoD | pass / fail | … |
| Release docs | pass / warn | path or missing |
| Git (clean + pushed) | pass / fail | … |

**Stories in release:** US-001, US-002, …
**Blockers:** <list or "none">
**Result:** PASS — ready for PR | FAIL — fix blockers above

**PR:** <url> | not created
```

---

## Guardrails

- Never open a PR while any check is **fail** unless user explicitly overrides after seeing the report
- Never skip OpenSpec active-change check (empty `openspec/changes/` except archive)
- Never commit or push without user confirmation
- Run tests; do not trust queue/status alone
- Prefer fixing sync issues (status, queue) before PR
- English for PR title/body and commits; Spanish OK for release notes in `delivery/`
