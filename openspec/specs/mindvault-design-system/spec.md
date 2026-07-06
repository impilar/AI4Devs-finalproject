# mindvault-design-system Specification

## Purpose

Dark premium visual tokens and loading patterns for the Organizador de Conocimiento UI (MindVault aesthetic). Introduced by change `mindvault-ui-mvp-phase-1`.

## Requirements

### Requirement: MindVault design tokens

The frontend SHALL define CSS custom properties for the MindVault dark theme: background `#0B1020`, surface `#121829`, card `#182134`, primary gradient `#4F7CFF` → `#8B5CFF`, highlight `#7DE2D1`, text primary `#FFFFFF`, text secondary `#AAB4C5`, border `rgba(255,255,255,0.06)`, radius 16–24px, and transition duration 200ms.

#### Scenario: Dark theme applied globally

- **WHEN** the application loads any route
- **THEN** the page background uses the MindVault background token
- **AND** body text uses the primary text token

### Requirement: Typography

The frontend SHALL load Inter from Google Fonts with system-ui fallback. Headings SHALL use font-weight 700–800; body text 400–500.

#### Scenario: Inter font loaded

- **WHEN** the user opens the application
- **THEN** computed font-family includes Inter

### Requirement: Glass and ambient surfaces

Primary side panels SHALL use translucent glass styling (`backdrop-filter: blur(24px)`) with solid-color fallback. The application root SHALL render fixed ambient radial gradient glows behind content.

#### Scenario: Glass sidebar on desktop

- **WHEN** the user is on `/` at viewport width ≥ 768px
- **THEN** the left navigation panel uses glass surface styling

### Requirement: Premium loading skeleton

While note lists are loading, the UI SHALL display skeleton placeholders styled with MindVault card tokens (rounded corners, subtle pulse), not plain text “Cargando…”.

#### Scenario: Skeleton on home load

- **WHEN** the home page is fetching notes
- **THEN** skeleton card placeholders are visible in the list area
