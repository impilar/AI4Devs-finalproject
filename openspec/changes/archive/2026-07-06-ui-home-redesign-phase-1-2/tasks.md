# Tasks: Home UI redesign — Phase 1 + shell (Phase 2)

> Change: `ui-home-redesign-phase-1-2`  
> Post-MVP UX slice — no `implementation-queue-mvp.json` TASK ids.  
> References: [proposal](./proposal.md), [design](./design.md), specs in `specs/`.

## 1. Backend — extend NotaResumen (backend-engineer)

- [x] 1.1 Add `excerpt` and `tags` to `NotaResumenSchema` in `nota.schema.ts`
- [x] 1.2 Extend repository list/search selects to include `content` and tag relations
- [x] 1.3 Update `toResumen` mapper: truncate excerpt (120 chars), map sorted tag names
- [x] 1.4 Update integration tests for `GET /api/v1/notas` and search responses

## 2. Frontend — design tokens and utilities (frontend-engineer)

- [x] 2.1 Add Google Fonts (Fraunces, DM Sans) in `index.html`
- [x] 2.2 Define CSS custom properties and update global/base styles in `index.css`
- [x] 2.3 Add `formatRelativeDate` utility (for `title` attribute) and `highlightText` helper
- [x] 2.4 Update `types/nota.ts` with `excerpt` and `tags` on `NotaResumen`

## 3. Frontend — AppShell and home layout (frontend-engineer)

- [x] 3.1 Create `components/layout/AppShell.tsx` (header, sidebar slot, main, mobile drawer)
- [x] 3.2 Refactor `HomePage` to use `AppShell` with search in header and tags in sidebar
- [x] 3.3 Update `App.tsx` to wrap routes with `AppShell`
- [x] 3.4 Adapt `TagFilter` styles for vertical sidebar layout

## 4. Frontend — card list and empty states (frontend-engineer)

- [x] 4.1 Redesign `NoteListItem` as card with excerpt, tags, date, hover transition
- [x] 4.2 Update `NoteList` to CSS grid layout; pass `searchQuery` for highlight
- [x] 4.3 Enhance `EmptyState` with CTA for empty library case
- [x] 4.4 Update `SearchBar` for compact header variant (optional label hidden)

## 5. QA — tests and verification (qa-engineer)

- [x] 5.1 Update `NoteList.test.tsx` and mapper/API tests for new fields
- [x] 5.2 Run frontend unit tests (`npm test` in `src/frontend`)
- [x] 5.3 Run integration tests for notes list API
- [x] 5.4 Verify E2E US-001, US-009, US-012 scenarios still pass (no selector changes)
- [x] 5.5 Mark all tasks complete in this file

## 6. Verification (all)

- [x] 6.1 Home shows card grid inside shell at `/`
- [x] 6.2 Tag filter and search behave as before
- [x] 6.3 `openspec verify ui-home-redesign-phase-1-2` passes (when applicable)
