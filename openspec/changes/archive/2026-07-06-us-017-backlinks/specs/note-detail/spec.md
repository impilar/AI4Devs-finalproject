# Delta for note-detail (US-017)

## ADDED Requirements

### Requirement: Outgoing note backlinks in detail (US-017)

The note detail read-only view SHALL display outgoing note backlinks as a list of React Router links to `/notas/:id` with destination titles. The section SHALL be hidden when there are no outgoing backlinks. External URL links (`enlaces`) SHALL remain a separate section.

#### Scenario: Outgoing link visible on source note

- **GIVEN** note "Ideas de proyecto" links to "Investigación de mercado"
- **WHEN** the user opens detail of "Ideas de proyecto"
- **THEN** a clickable link to "Investigación de mercado" is visible

### Requirement: Incoming backlinks panel (US-017)

The note detail read-only view SHALL display a section titled «Notas que enlazan aquí» listing origin notes that link to the current note, each as a clickable link to `/notas/:id`. The section SHALL be hidden when there are no incoming backlinks.

#### Scenario: Incoming backlinks on target note

- **GIVEN** "Plan Q3" links to "Objetivos anuales"
- **WHEN** the user opens detail of "Objetivos anuales"
- **THEN** «Notas que enlazan aquí» includes "Plan Q3"
