# Frontend standards

Stack: **React 18**, **Vite**, **TypeScript**, **React Router**.

## Architecture

- Feature-oriented structure per LLD-v1 §5 (`src/frontend/`)
- API access only via typed client module — no direct `fetch` scattered in components
- Base URL from `import.meta.env.VITE_API_URL`

## Components

| Type | Purpose |
|------|---------|
| Pages | Route-level views (`NoteListPage`, `NoteDetailPage`, …) |
| Components | Reusable UI (`NoteCard`, `TagInput`, `NoteForm`, …) |
| Hooks | Data fetching, form state |
| Services/api | HTTP client functions matching backend DTOs |

Keep components focused; extract hooks when logic grows.

## State and routing

- React Router for navigation (list → detail → edit)
- Local component state for forms; no global store required in MVP
- Loading and error states on every async view

## Styling

- Match existing project choice when scaffold exists (CSS modules or global CSS per LLD)
- Accessible labels on form fields; keyboard navigation for main flows

## API integration

- Types aligned with backend DTOs (`camelCase`)
- Handle 400/404/500 with user-visible messages
- Optimistic UI only where LLD explicitly allows

## Testing

| Type | Tool | Location |
|------|------|----------|
| Component | Vitest + Testing Library | `src/frontend/**/*.test.tsx` |
| E2E | Playwright | `tests/e2e/` |

`[FE]` tasks: implement UI after corresponding `[BE]` task is done and API is testable.

E2E scenarios follow Gherkin in user stories (US-001–US-016 MVP subset).

## Agent

`.cursor/agents/frontend-engineer.md`

## References

- LLD: `02-docs/02_2-architecture/lld/LLD-v1.md` §5
- User stories: `02-docs/02_1-product/user-stories/`
- Test strategy: `02-docs/02_4-qa/test-strategy.md`
