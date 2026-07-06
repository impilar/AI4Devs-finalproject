# Tasks: MindVault UI — MVP Phase 1

> Change: `mindvault-ui-mvp-phase-1`  
> Post-MVP UX slice — no `implementation-queue-mvp.json` TASK ids.  
> Visual reference: `MindVault SaaS Application Design/src/app/App.tsx`  
> Supersedes visual direction of `ui-home-redesign-phase-1-2` (functional work retained).  
> Branding: visible product name remains **Organizador de Conocimiento**.

## 1. Design system — tokens and base styles (frontend-engineer)

- [x] 1.1 Replace `:root` tokens in `index.css` with MindVault dark palette and gradients
- [x] 1.2 Update `index.html` fonts: Inter (remove Fraunces/DM Sans)
- [x] 1.3 Add ambient glow background layer and glass utility classes
- [x] 1.4 Add `getTagColor(tag)` utility with deterministic palette
- [x] 1.5 Add skeleton card component/styles for list loading states

## 2. App shell — 3-column layout (frontend-engineer)

- [x] 2.1 Refactor `AppShell.tsx` to MindVault 3-column layout (left nav, main, right panel on home)
- [x] 2.2 Create `AppLogo`, `SidebarNav`, `RightContextPanel` components
- [x] 2.3 Wire `HomeShellContext` slots for search, tags, note data into right panel
- [x] 2.4 Implement responsive drawer for sidebar on viewports &lt; 768px
- [x] 2.5 Hide right panel on `/notas/nueva` and `/notas/:id`

## 3. Home — dashboard and note grid (frontend-engineer)

- [x] 3.1 Add dashboard header (greeting, tagline, date) to `HomePage`
- [x] 3.2 Add KPI row (total notes, tag count, last update) from live data
- [x] 3.3 Restyle `SearchBar` as Spotlight variant (preserve ARIA name “Buscar notas”)
- [x] 3.4 Update `NoteList` / `NoteListItem` to masonry grid with hover glow, tag pills, relative dates + `time[datetime]`
- [x] 3.5 Restyle `TagFilter` for sidebar integration (`aria-label` unchanged)
- [x] 3.6 Update `EmptyState` with MindVault styling and CTA

## 4. Detail and create pages (frontend-engineer)

- [x] 4.1 Restyle `NoteDetailPage` with document surface and action bar
- [x] 4.2 Restyle `NoteCreatePage` with editorial layout (placeholder, card textarea, link/tag blocks)
- [x] 4.3 Ensure edit mode on detail inherits editorial styling (US-015)

## 5. QA — tests and verification (qa-engineer)

- [x] 5.1 Update unit tests for `NoteList`, `formatRelativeDate`, `getTagColor`, shell components
- [x] 5.2 Update `tests/e2e/us-001-listado.spec.ts`: dates via `datetime`; heading “Organizador de Conocimiento”
- [x] 5.3 Run frontend unit tests (`npm test` in `src/frontend`)
- [x] 5.4 Run full E2E suite US-001–US-016
- [x] 5.5 Run `openspec validate mindvault-ui-mvp-phase-1`

## 6. Verification (all)

- [x] 6.1 Home matches Figma MVP scope: dark theme, 3 columns, KPIs, masonry cards, right panel with real data
- [x] 6.2 No favorites, AI, graph, or emoji UI present
- [x] 6.3 Create, edit, delete, search, and tag filter behave as before
