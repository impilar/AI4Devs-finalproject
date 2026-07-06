# mindvault-app-shell Specification

## Purpose

Three-column application shell with glass sidebar, main content, and contextual right panel. Introduced by change `mindvault-ui-mvp-phase-1`.

## Requirements

### Requirement: Three-column application shell

On the home route `/`, the frontend SHALL render a three-column layout: (1) fixed left glass sidebar with branding and navigation; (2) scrollable main content; (3) fixed right glass context panel. On routes `/notas/nueva` and `/notas/:id`, the right panel SHALL be hidden; left sidebar and main content SHALL remain.

#### Scenario: Three columns on home

- **WHEN** the user opens `/` at viewport width ≥ 1024px
- **THEN** left sidebar, main content, and right context panel are visible

#### Scenario: No right panel on create

- **WHEN** the user navigates to `/notas/nueva`
- **THEN** the right context panel is not rendered
- **AND** a “Nueva nota” or save affordance remains available

### Requirement: Product branding in shell

The left sidebar SHALL display the product name “Organizador de Conocimiento” as the visible application heading (`h1`) and a “Nueva nota” primary action linking to `/notas/nueva`.

#### Scenario: Branding visible

- **WHEN** the user opens any route wrapped by the shell
- **THEN** the heading “Organizador de Conocimiento” is visible in the left sidebar
- **AND** a “Nueva nota” control is visible

### Requirement: Left navigation (MVP)

The left sidebar SHALL provide navigation for: Inicio (`/`), Todas las notas (list section on `/`), and Etiquetas (tag filter section). Items for favorites, archive, settings, or user profile SHALL NOT be shown.

#### Scenario: MVP nav only

- **WHEN** the user views the left sidebar
- **THEN** “Favoritas” and “Archivadas” are not present

### Requirement: Responsive shell collapse

On viewports narrower than 768px, the left sidebar and right panel SHALL collapse; a header control SHALL open the tag filter / navigation as an overlay drawer.

#### Scenario: Mobile drawer

- **WHEN** viewport width is below 768px and the user is on `/`
- **THEN** a control opens the sidebar overlay with tag filter

### Requirement: Right context panel (MVP data)

The right panel on `/` SHALL show three sections populated from live API data: recently updated notes (links to detail), top tags by usage count among loaded notes, and quick access links to the latest created notes. Mock activity feeds, AI insights, streak widgets, and knowledge graph teasers SHALL NOT be shown.

#### Scenario: Recent notes from API

- **WHEN** notes exist and the user is on `/`
- **THEN** the right panel lists at least one recently updated note with a link to `/notas/:id`

#### Scenario: No mock AI banner

- **WHEN** the user is on `/`
- **THEN** no “IA Insights” or similar promotional banner is displayed
