# Delta for note-links-create

## ADDED Requirements

### Requirement: Persist links on create (US-006)

When creating a note, the backend SHALL accept optional `links: string[]`, validate each URL, and persist rows in `enlaces` associated with the new note.

#### Scenario: Create with valid links

- **WHEN** a client sends `POST /api/v1/notas` with `links: ["https://example.com"]`
- **THEN** the response status is 201
- **AND** `data.links` contains the URLs in creation order

#### Scenario: Invalid URL rejected

- **WHEN** any link is not a valid URL format
- **THEN** the response status is 400 with `VALIDATION_ERROR`

#### Scenario: Multiple links preserved

- **WHEN** multiple valid URLs are sent
- **THEN** all are stored and returned in `data.links`

### Requirement: Dynamic link fields in form (US-006)

The create form SHALL allow adding and removing optional URL fields with inline validation feedback.

#### Scenario: Add link row

- **GIVEN** the user is creating a note
- **WHEN** the user adds a link field and enters a valid URL
- **THEN** the URL is submitted with the create request

#### Scenario: Invalid link inline error

- **WHEN** the user enters malformed text in a link field
- **THEN** inline validation feedback is shown before or on submit

### Requirement: E2E coverage for US-006

Automated E2E tests SHALL validate URL validation and multi-link create from US-006 Gherkin.

#### Scenario: E2E valid and invalid URLs

- **WHEN** E2E submits invalid then valid URLs
- **THEN** invalid is rejected and valid links appear in detail or list context
