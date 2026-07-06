# Proposal: Home UI redesign — Phase 1 + shell (Phase 2)

## Why

The MVP home screen is functionally complete (US-001, US-009, US-012) but presents as a generic centered form: single-column list, system fonts, and no content preview. This undermines product positioning (PRD §2 — lightweight knowledge organizer) and fails to communicate note richness at a glance. A focused visual refresh with an app shell layout improves perceived quality without changing core flows or expanding MVP scope.

## What Changes

- Introduce CSS design tokens (warm palette, teal accent, Fraunces + DM Sans via Google Fonts) and card-based note grid on home
- Add `AppShell` layout: global header (search + “Nueva nota”), sidebar (tag filter + note count), main content area
- Extend `NotaResumen` API field `excerpt` (first ~120 chars of content) for list/search card previews — additive, non-breaking
- Extend `NotaResumen` with `tags: string[]` on list/search responses for card metadata
- Improve empty states with clearer copy and optional CTA on home
- Add search-term highlight in list card titles/excerpts when search is active
- Responsive sidebar: collapsible drawer on viewports &lt; 768px
- Preserve existing routes (`/`, `/notas/nueva`, `/notas/:id`), ARIA roles, and Playwright selectors used by US-001–US-016 E2E

**Out of scope:** dark mode, quick-capture modal, detail-page redesign, new npm UI libraries, markdown editor, backend pagination changes.

## Capabilities

### New Capabilities

- `home-ui-shell`: Application shell (header, sidebar, main), design tokens, card grid, improved empty states, responsive drawer

### Modified Capabilities

- `notes-list`: `NotaResumen` includes `excerpt` and `tags`; home page uses card grid inside shell; E2E accessibility contracts preserved

## Impact

| Area | Impact |
|------|--------|
| `openspec/changes/ui-home-redesign-phase-1-2/` | Proposal, design, delta specs, tasks |
| `src/backend/src/` | `nota.schema`, mapper, repository select for list/search |
| `src/frontend/src/` | `AppShell`, `HomePage`, `NoteListItem`, `EmptyState`, `index.css`, `index.html` |
| `tests/integration/` | List/search API tests for new fields |
| `tests/e2e/` | No scenario changes expected; verify pass |
| APIs | Additive fields on `NotaResumen` in `GET /api/v1/notas` and search |
| Queue | Post-MVP UX slice — no new TASK-XXX in implementation-queue-mvp.json |

**References:** PRD RF-015, RNF-001; [US-001](02-docs/02_1-product/user-stories/US-001.md), [US-009](02-docs/02_1-product/user-stories/US-009.md), [US-012](02-docs/02_1-product/user-stories/US-012.md); LLD-v1 §5 (frontend structure); [home mockup canvas](.cursor/projects/Users-pilarcastrogarrido-Documents-Master-IA4DEV-codigo-AI4Devs-finalproject/canvases/home-mockup.canvas.tsx).
