## ADDED Requirements

### Requirement: Tag filter in left sidebar

The tag filter (`aria-label` “Filtro por etiqueta”) SHALL be rendered inside the left glass sidebar on `/`, integrated with the “Etiquetas” navigation area. Tag buttons SHALL use MindVault pill styling consistent with note cards.

#### Scenario: Tag filter in sidebar

- **WHEN** the user is on `/` and tags exist
- **THEN** the tag filter is available in the left sidebar
- **AND** `aria-label` “Filtro por etiqueta” is preserved

#### Scenario: Tag filter behavior unchanged

- **WHEN** the user clicks tag “trabajo” in the sidebar filter
- **THEN** only notes with tag “trabajo” are visible in the main list
