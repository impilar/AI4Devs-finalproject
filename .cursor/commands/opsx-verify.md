---
name: /opsx-verify
id: opsx-verify
category: Workflow
description: Verify implementation vs OpenSpec specs and tests (required before archive)
---

Verify an OpenSpec change before archiving it.

**Read and follow:** `.cursor/skills/openspec-verify-change/SKILL.md`

**Input:** Optionally specify change name (e.g. `/opsx:verify us-002-detalle-nota`). If omitted, infer from context or prompt via `openspec list --json`.

**Required before archive:** `/opsx:archive` MUST NOT run until verify reports **PASS** in the same session (unless the user explicitly confirms override after a FAIL report).

**Quick checklist (skill has full detail):**

1. `openspec status --change "<name>" --json` — artifacts done
2. `openspec validate "<name>" --type change --strict` — change valid
3. `tasks.md` all `[x]`; queue + `status-v1.json` tasks `done`
4. Delta specs vs code/tests — Gherkin scenarios covered
5. `npm run test` (backend + frontend), `test:integration`, `npm run test:e2e`

**On PASS:** Report ready for `/opsx:archive <name>`.

**On FAIL:** List blockers; fix and re-run verify. Do not archive.
