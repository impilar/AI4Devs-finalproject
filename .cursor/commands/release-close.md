---
name: /release:close
id: release-close
category: Workflow
description: Verify release readiness (queue, status, OpenSpec, tests, git) and prepare the release PR
---

Close a product release and prepare the pull request.

**Read and follow:** `.cursor/skills/close-release/SKILL.md`  
**Agent persona:** `.cursor/agents/release-manager.md`

**Input:** Optionally specify release name after the command (e.g. `/release:close MVP`). Default: infer from `implementation-queue-*.json` `scope` or ask.

**Prerequisites:**

- All slices implemented and archived (`openspec/changes/` has no active change folders)
- Per-slice verify already passed before each archive

**Quick checklist (skill has full detail):**

1. `implementation-queue-mvp.json` — all release tasks/phases `done`
2. `status-v1.json` — all release stories/tasks `done`; epics not stale `backlog`
3. `openspec/changes/` — only `archive/` + `README.md`; archives exist per story
4. `openspec/specs/` — merged capabilities present
5. Full test suite (backend unit, integration, frontend unit, e2e)
6. DoD per `.cursor/rules/08-definition-of-done.mdc`
7. `03-delivery/releases/` notes (warn if missing)
8. Git clean, committed, pushed
9. `gh pr create` on PASS (with user confirmation)

**On PASS:** Report table + PR URL.  
**On FAIL:** Blockers list; no PR until fixed.
