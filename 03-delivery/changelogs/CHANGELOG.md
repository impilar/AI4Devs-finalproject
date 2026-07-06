# Changelog

All notable changes to this project are documented in this file.

Format based on [Keep a Changelog](https://keepachangelog.com/).

## [0.2.0] - 2026-07-06

### Added

- Library empty state with «Crear nota» CTA when no notes exist (US-003)
- Inline form validation with field-level API errors; values preserved on failure (US-007)
- Remove single tag from note detail via `DELETE /notas/:id/etiquetas/:etiquetaId` (US-010)
- `SearchEmptyState` message «Sin resultados para {término}» when search has no hits (US-014)
- `RemovableTagChip`, `SearchEmptyState` components; V1 E2E and integration coverage

### Changed

- Note detail API returns `tags: { id, name }[]` for tag removal support
- Search no-results copy aligned with Gherkin (replaces generic empty message)

### Documentation

- Implementation plan and queue for V1 (`implementation-plan-v1.md`, `implementation-queue-v1.json`)
- Release notes: `03-delivery/releases/v0.2.0-v1/RELEASE.md`
- OpenSpec archives for US-003, US-007, US-010, US-014

## [0.1.0] - 2026-07-06

### Added

- Notes list with title and date (US-001)
- Note detail view with links and tags (US-002)
- Create note with title and content in ≤2 interactions (US-005)
- URL links on notes with validation (US-006)
- Tags on notes with auto-create and uniqueness (US-008)
- Filter notes list by tag (US-009)
- Full-text search on title and content (US-012)
- Search results sort by relevance or date (US-013)
- Edit existing notes (US-015)
- Permanent note deletion with confirmation (US-016)
- Docker Compose local stack, health API, modular monolith (PHASE-000)
- OpenSpec behaviour specs under `openspec/specs/`

### Documentation

- Implementation plan and priority queue for MVP
- Release notes: `03-delivery/releases/v0.1.0-mvp/RELEASE.md`
- Release Manager agent (`/release:close`) for future release verification

[0.2.0]: ../releases/v0.2.0-v1/RELEASE.md
[0.1.0]: ../releases/v0.1.0-mvp/RELEASE.md
