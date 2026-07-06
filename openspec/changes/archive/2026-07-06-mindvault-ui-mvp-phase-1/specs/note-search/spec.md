## ADDED Requirements

### Requirement: Spotlight-style search presentation

On the home route, the search input SHALL use a prominent “Spotlight” visual treatment: rounded 16px container, search icon, card background token, and refined focus ring using the primary accent color. The input SHALL retain `role="searchbox"` and accessible name “Buscar notas”.

#### Scenario: Search styling on home

- **WHEN** the user is on `/`
- **THEN** the search input is visually prominent in the main content area
- **AND** the accessible name remains “Buscar notas”

#### Scenario: Focus ring on search

- **WHEN** the user focuses the search input
- **THEN** a visible accent focus ring appears
