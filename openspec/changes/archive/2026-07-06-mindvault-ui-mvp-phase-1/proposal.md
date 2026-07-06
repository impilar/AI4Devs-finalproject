# Proposal: MindVault UI — MVP Phase 1

## Why

The Figma export in `MindVault SaaS Application Design/` defines a premium dark-mode product identity (“MindVault”) aligned with modern PKM tools (Notion, Linear, Craft). The current frontend implements a functional MVP with a warm light theme from `ui-home-redesign-phase-1-2`, which does not match the approved visual direction or the product ambition in PRD §2 (lightweight knowledge organizer that feels polished, not academic). This change realigns look-and-feel and layout with the Figma reference while **keeping MVP behavior only** — no new domain features (favorites, archive, AI, knowledge graph, auth).

## What Changes

- Adopt **MindVault** branding: dark palette (`#0B1020` / `#121829` / `#182134`), blue-violet accent gradient, Inter typography, glassmorphism, ambient glow backgrounds
- Replace the current 2-column header+sidebar shell with a **3-column layout**: glass left nav, main content, right context panel (home and list views)
- **Dashboard home** (`/`): greeting header, inspirational tagline, Spotlight-style search, KPI cards computed from live data (total notes, tag count, last update — no “favoritas”)
- **Premium note grid**: masonry-style card grid with excerpt, colored tag pills, relative dates (“Hace 2 días”) as primary display; absolute `es-ES` date preserved in `title` for accessibility
- **Right panel** (MVP data only): recently updated notes, top tags by usage count, quick links to latest notes — no mock activity feed, streaks, or graph teaser
- **Note detail** (`/notas/:id`): immersive document surface, refined action bar (Editar / Eliminar); links and tags unchanged functionally
- **Note create** (`/notas/nueva`): editorial layout (large title placeholder, content surface, tag/link blocks) — same fields and validation as today, not a block editor
- CSS-only microinteractions (200ms transitions, hover elevation); **no** `motion`/Framer dependency
- Preserve E2E ARIA contracts (`list` “Listado de notas”, `searchbox` “Buscar notas”, tag buttons, form controls); keep visible app title **“Organizador de Conocimiento”**; update US-001 E2E to assert dates via `time[datetime]`
- Reuse existing backend additions (`excerpt`, `tags` on `NotaResumen`) — no API or schema changes

**Explicitly out of scope (Figma features deferred):**

- Favoritas, archivadas, ajustes, perfil Pro, notificaciones
- Emoji picker, importance bars, per-note accent colors, share/star quick actions on cards
- AI insights banner, knowledge graph, study streak, drag-and-drop reorder
- Notas relacionadas / backlinks (V2+)
- Block editor, images, ⌘K command palette
- New npm UI libraries (shadcn, lucide-react, Tailwind) — port visual patterns via CSS custom properties

## Capabilities

### New Capabilities

- `mindvault-design-system`: Dark design tokens, typography, glass surfaces, gradients, tag pill colors, skeleton loading styles
- `mindvault-app-shell`: Three-column shell (left nav, main, right panel), MindVault logo, nav items mapped to MVP routes, responsive collapse

### Modified Capabilities

- `notes-list`: Dashboard KPIs, premium masonry card grid, relative dates on cards, right-panel widgets fed by list/tag data
- `note-detail`: Immersive detail layout and document surface styling; preserve edit/delete flows (US-002, US-015, US-016)
- `note-create`: Editorial create/edit layout styling; preserve validation and save behavior (US-005, US-006, US-008)
- `note-search`: Spotlight-style search bar presentation on home; preserve debounce, order select, and highlight behavior (US-012, US-013)
- `note-tag-filter`: Sidebar nav integration for tag filtering (US-009)

## Impact

| Area | Impact |
|------|--------|
| `openspec/changes/mindvault-ui-mvp-phase-1/` | Proposal, design, delta specs, tasks |
| `MindVault SaaS Application Design/` | Visual reference only — not merged into `src/` |
| `src/frontend/src/` | `index.css`, `index.html`, `AppShell`, layout components, `HomePage`, `NoteList*`, `SearchBar`, `TagFilter`, `NoteDetailPage`, `NoteCreatePage`, `EmptyState` |
| `src/backend/` | No changes |
| `tests/e2e/us-001-listado.spec.ts` | Assert dates via `time[datetime]`; heading remains “Organizador de Conocimiento” |
| `tests/e2e/` | Re-verify US-001–US-016 selectors unchanged except app title |
| APIs | None |
| Queue | Post-MVP UX slice — no new TASK-XXX in `implementation-queue-mvp.json` |

**References:** PRD RF-015, RNF-001; [US-001](02-docs/02_1-product/user-stories/US-001.md), [US-005](02-docs/02_1-product/user-stories/US-005.md), [US-009](02-docs/02_1-product/user-stories/US-009.md), [US-012](02-docs/02_1-product/user-stories/US-012.md); Figma reference `MindVault SaaS Application Design/src/app/App.tsx`; supersedes visual direction of archived change `ui-home-redesign-phase-1-2`.
