---
name: openspec-verify-change
description: Verify an OpenSpec change before archive. Use when closing a slice, before /opsx:archive, or when the user asks to verify implementation vs specs.
license: MIT
compatibility: Requires openspec CLI, local Postgres for integration tests.
metadata:
  author: project
  version: "1.0"
---

Verify that implementation matches OpenSpec delta specs and Gherkin before archiving a change.

**Mandatory:** Run this skill (or `/opsx:verify`) **before every** `/opsx:archive`. Do not archive without a passing verify in the same session unless the user explicitly overrides after seeing failures.

**Store selection:** If the user names a store, pass `--store <id>` on `openspec` commands that support it.

**Input:** Change name (e.g. `us-002-detalle-nota`). If omitted, infer from context or run `openspec list --json` and ask.

## Steps

### 1. Select change

Announce: `Verifying change: <name>`.

### 2. OpenSpec structural checks

```bash
openspec status --change "<name>" --json
openspec validate "<name>" --type change --strict --json
```

**Fail verify if:**
- Any artifact is not `done`
- `validate` reports `valid: false`

### 3. Tasks and queue sync

Read `openspec/changes/<name>/tasks.md` (or `changeRoot` from status JSON).

**Fail verify if:**
- Any checkbox remains `- [ ]`
- Related tasks in `02-docs/02_3-engineering/implementation-queue-mvp.json` are not `done`
- Related tasks in `02-docs/02_1-product/user-stories/status-v1.json` are not `done`

### 4. Spec vs implementation review

Read delta specs under `openspec/changes/<name>/specs/**/*.md`.

For each requirement and Gherkin scenario, confirm evidence exists in code or tests (file path + test name). Cover at minimum:
- API contracts (integration tests in `tests/integration/api/`)
- DB schema (migrations + repository tests)
- Frontend behavior (component tests + route)
- E2E Gherkin (`tests/e2e/us-NNN-*.spec.ts`)

Document a short checklist in the verify summary (pass/fail per capability).

### 5. Automated tests

Run all applicable suites (Postgres must be up for integration/E2E):

```bash
# Backend unit
cd src/backend && npm run test

# Backend integration
cd src/backend && DATABASE_URL=postgresql://okc:okc@localhost:5432/okc npm run test:integration

# Frontend unit
cd src/frontend && npm run test

# E2E (starts backend + frontend via playwright.config.ts)
cd <repo-root> && npm run test:e2e
```

**Fail verify if any suite fails.** Fix failures before archive.

### 6. Report

Output:

```markdown
## Verify Complete

**Change:** <name>
**OpenSpec validate:** pass | fail
**Tasks / queue:** pass | fail
**Specs coverage:** <bullet checklist>
**Tests:** backend unit X/X · integration X/X · frontend X/X · e2e X/X

**Result:** PASS — ready for `/opsx:archive` | FAIL — fix items above before archive
```

## Guardrails

- Never skip verify silently when the user asks to archive
- If verify fails, fix issues and re-run verify; do not archive until PASS
- User may override only after an explicit FAIL report and their confirmation
- Verify does not modify specs; use `openspec-sync-specs` only when explicitly requested (archive handles sync)
