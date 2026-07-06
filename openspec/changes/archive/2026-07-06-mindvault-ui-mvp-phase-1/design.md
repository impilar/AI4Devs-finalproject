# Design: MindVault UI — MVP Phase 1

## Context

The frontend follows LLD-v1 §5: React 18 + Vite, feature-oriented folders, global CSS (`index.css`), React Router. Functional MVP is complete (US-001–US-016). Change `ui-home-redesign-phase-1-2` added `AppShell`, card grid, `excerpt`/`tags` on `NotaResumen`, and a warm light theme — implemented but not aligned with the Figma export in `MindVault SaaS Application Design/`.

The Figma prototype (`App.tsx`) demonstrates a 3-column dark SaaS layout with glass sidebars, dashboard KPIs, masonry note cards, and editorial create/detail flows. It also includes non-MVP features (favorites, AI insights, knowledge graph) that must not be ported.

E2E tests depend on stable ARIA: `list` “Listado de notas”, `searchbox` “Buscar notas”, tag `button` names, form control labels. US-001 asserts visible heading “Organizador de Conocimiento” — this change updates it to “MindVault”.

## Goals / Non-Goals

**Goals:**

- Match Figma visual language: dark tokens, Inter, glass surfaces, gradient accents, ambient glows, 20–24px radii, 200ms CSS transitions
- Implement 3-column shell on home: left nav (logo, “Nueva nota”, nav + tag filter), main (dashboard + grid), right panel (MVP widgets from live data)
- Premium note cards: masonry grid, excerpt, colored tag pills, relative date primary display
- Editorial styling on create/detail without changing form fields, validation, or API contracts
- Preserve all E2E behavioral contracts; update US-001 title assertion only

**Non-Goals:**

- New backend endpoints, Prisma schema, or `NotaResumen` field changes
- Favorites, archive, settings, notifications, user profile, AI banners, knowledge graph, streaks
- Emoji picker, drag-and-drop, block editor, images, `motion`/Framer, lucide-react, Tailwind, shadcn
- Detail-page right rail with “notas relacionadas” (V2+ backlinks)
- Light mode toggle

## Decisions

### 1. CSS custom properties only — port Figma tokens, not the Figma package

**Choice:** Replace `:root` tokens in `index.css` with MindVault palette from `MindVault SaaS Application Design/src/styles/theme.css`. Do not add Tailwind or copy shadcn components into `src/frontend`.

**Rationale:** LLD §5 and frontend-standards use global CSS; zero new dependencies reduces bundle and E2E risk.

**Alternative:** Adopt Tailwind + shadcn from Figma export — rejected (scope creep, duplicate stack).

### 2. Evolve `AppShell` into `MindVaultShell` (3 columns)

**Choice:** Refactor `AppShell.tsx` into a full-height flex row: fixed glass `aside` (208px), `main` (flex-1), optional glass `aside` right (272px) on home only. Header content moves into main area (greeting + search) per Figma dashboard, not a separate top bar on home.

**Rationale:** Figma uses sidebar-first chrome; current sticky header duplicates search placement.

**Alternative:** Keep top header + 2 columns — rejected; does not match reference.

### 3. Left nav: MVP routes only

**Choice:** Nav items:

| Label | Behavior |
|-------|----------|
| Inicio | `/` — dashboard + full grid section |
| Todas las notas | scroll/focus list section on `/` (same route) |
| Etiquetas | expand tag filter in sidebar (existing `TagFilter`) |

Hide Figma items: Favoritas, Archivadas, Ajustes, Pro badge.

**Rationale:** No backend support for favorites/archive.

### 4. Right panel: derive widgets client-side

**Choice:**

- **Notas recientes:** top 4 notes by `updatedAt` from current list fetch
- **Etiquetas frecuentes:** tag names from `GET /api/v1/etiquetas` with bar width from note counts (count notes per tag in client from list data, or extend `useNotes` tag metadata if available)
- **Accesos rápidos:** top 3 notes by `createdAt`

**Rationale:** No activity log in MVP; avoids mock data from Figma.

**Alternative:** New `GET /api/v1/stats` — rejected; unnecessary for MVP.

### 5. KPI cards: three metrics (no favoritas)

**Choice:** Display Total notas (`meta.total`), Etiquetas (`tags.length`), Última actualización (relative phrase from max `updatedAt` in list).

**Rationale:** Figma “Favoritas” has no domain model in MVP.

### 6. Relative dates as visible text; absolute in `title`

**Choice:** Card and detail metadata show `formatRelativeDate(updatedAt)` (e.g. “Hace 2 días”). `title` attribute holds `toLocaleDateString("es-ES", …)` for hover/tooltip.

**Rationale:** Matches Figma; E2E US-001 asserts absolute dates in list — **update E2E** to assert relative text OR keep absolute date visible in a secondary line. **Decision:** show relative as primary; keep a visually subtle absolute date in `time[datetime]` for E2E update to query `datetime` attribute instead of visible text.

**Mitigation:** Task 5.4 updates `us-001-listado.spec.ts` to assert `datetime` on list items rather than visible “12 jun 2026”.

### 7. Masonry grid via CSS columns

**Choice:** `column-count: 2` (≥768px) on `ul` list wrapper; `break-inside: avoid` on `li` cards — same pattern as Figma `NotesView`.

**Rationale:** No JS layout library; preserves `ul`/`li` semantics.

### 8. Tag pill colors: deterministic hash palette

**Choice:** `getTagColor(tagName)` maps to Figma accent set (`#4F7CFF`, `#8B5CFF`, `#7DE2D1`, etc.) via string hash — same visual as Figma `TAG_COLORS` without per-tag API.

### 9. Create/detail: shell without right panel

**Choice:** `/notas/nueva` and `/notas/:id` use left nav + main only; right panel hidden. Create form uses large title input placeholder “¿Qué quieres recordar?” and card-styled content `textarea`; existing link/tag inputs grouped as “blocks”.

**Rationale:** MVP forms unchanged; visual wrapper only.

### 10. Branding: Organizador de Conocimiento visible title

**Choice:** Logo + `h1` “Organizador de Conocimiento” in left sidebar; subtitle “Tu segundo cerebro”. E2E US-001 heading assertion unchanged.

**Rationale:** Product name per PRD and user preference; Figma “MindVault” applies to visual style only.

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| E2E breaks on heading/dates | Update US-001 only; preserve `aria-label`, roles, button names |
| Right panel tag counts inaccurate without per-tag counts API | Compute from loaded notes; acceptable for MVP volumes (&lt;1000 notes) |
| Masonry + `ul` accessibility | Keep one `li` per note; cards are links inside `li` |
| Glass `backdrop-filter` unsupported | Solid `#121829` fallback when `backdrop-filter` not supported |
| Replacing warm theme may confuse reviewers | Document supersession of `ui-home-redesign-phase-1-2` visual direction |

## Migration Plan

1. Frontend-only deploy; no API coordination required
2. Replace `index.css` tokens and shell components incrementally (tokens → shell → home → detail → create)
3. Rollback: revert frontend CSS/components; backend unchanged

## Open Questions

- _(none — scope locked to MVP Phase 1 visual alignment)_
