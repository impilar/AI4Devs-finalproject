# Design: Home UI redesign — Phase 1 + shell (Phase 2)

## Context

The frontend follows LLD-v1 §5: React 18 + Vite, feature-oriented folders, global CSS (`index.css`), React Router. Home (`HomePage`) currently renders inside `<main class="app">` (max-width 40rem card) with `SearchBar`, `TagFilter`, and flat `NoteList` rows. E2E tests (US-001, US-009, US-012) rely on stable ARIA: `list` named “Listado de notas”, tag `button` names, heading “Organizador de Conocimiento”, and absolute `es-ES` dates in list items.

A canvas mockup (`home-mockup.canvas.tsx`) validated the “Quiet confidence” direction: two-column shell, card grid, sidebar tags.

## Goals / Non-Goals

**Goals:**

- Deliver Phase 1 visual polish: tokens, typography, card grid, hover transitions, richer empty states
- Deliver Phase 2 shell: `AppShell` with header + sidebar + main; tag filter and note count in sidebar
- Provide `excerpt` and `tags` on `NotaResumen` for meaningful cards without extra round-trips
- Keep all existing E2E scenarios green without selector changes

**Non-Goals:**

- Dark mode, `⌘K` command palette, quick-capture modal (Phase 3+)
- Detail/create page visual overhaul (inherit shell only)
- Tailwind, component libraries, or CSS-modules migration
- DB schema changes (excerpt computed from existing `content` column)

## Decisions

### 1. AppShell wraps all routes via `App.tsx`

**Choice:** `AppShell` wraps `<Routes>`; sidebar shows tag filter only on `/`; header always shows app title + optional search slot.

**Rationale:** Consistent chrome; create/detail pages get header + “Nueva nota” without duplicating layout. LLD §5 allows layout components.

**Alternative:** Shell only on `HomePage` — rejected; inconsistent back navigation chrome.

### 2. Additive API fields on `NotaResumen`

**Choice:** Add `excerpt: string` (max 120 chars, trimmed, ellipsis) and `tags: string[]` (sorted) to list and search responses.

**Rationale:** Card preview needs content snippet; tags on cards improve scanability. No migration; mapper derives from existing rows.

**Alternative:** Client-side title-only cards — rejected; weak WOW impact.

### 3. CSS custom properties in `:root` (no new dependencies)

**Choice:** Tokens for color, font, radius, shadow; Google Fonts link in `index.html`.

**Palette:** off-white `#faf9f7`, ink `#1c1917`, accent teal `#0d9488`, DM Sans body, Fraunces display.

**Alternative:** Tailwind — rejected per scope and E2E risk.

### 4. Card grid as `ul` / `li` preserving list semantics

**Choice:** `NoteList` remains `ul[aria-label="Listado de notas"]`; each `NoteListItem` is `li` containing a card-styled `Link`.

**Rationale:** E2E uses `getByRole("list")` and `listitem` counts (US-001, US-009).

### 5. Dates: keep absolute `es-ES` visible text

**Choice:** Continue `toLocaleDateString("es-ES", { year, month: "short", day })` as visible text; add relative phrase in `title` attribute only.

**Rationale:** US-001 E2E asserts exact strings `12 jun 2026`, etc.

**Alternative:** Relative primary display — deferred until E2E fixtures updated.

### 6. Responsive sidebar as overlay drawer

**Choice:** Below 768px, sidebar hidden by default; toggle button in header opens overlay with backdrop.

**Rationale:** Phase 2 shell requirement without horizontal scroll on mobile.

### 7. Search highlight via safe string split (no `dangerouslySetInnerHTML`)

**Choice:** Utility `highlightText(text, query)` returns React nodes with `<mark>`.

**Rationale:** Aligns with security rules (React escape + explicit mark elements).

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| E2E breaks on layout/ARIA | Preserve `aria-label`, `list`/`listitem`, button names, heading text, date strings |
| API payload growth | Excerpt capped at 120 chars; tags already small cardinality |
| Google Fonts offline | `system-ui` / `Georgia` fallbacks in token stack |
| Detail/create pages cramped in shell | Main area `max-width` only on home grid; form pages use readable column width |

## Migration Plan

1. Deploy backend first (additive fields ignored by old clients)
2. Deploy frontend with new shell + cards
3. Rollback: revert frontend only; API remains backward compatible

## Open Questions

- _(none — scope locked to Phase 1 + basic Phase 2 shell)_
