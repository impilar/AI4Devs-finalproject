# platform-health Specification

## Purpose
TBD - created by archiving change phase-000-bootstrap. Update Purpose after archive.
## Requirements
### Requirement: Health endpoint availability

The backend API SHALL expose a health check endpoint at `GET /api/v1/health` that returns HTTP 200 when the process is running.

#### Scenario: Health check succeeds

- **WHEN** a client sends `GET /api/v1/health`
- **THEN** the response status is 200
- **AND** the JSON body is `{ "status": "ok" }`

#### Scenario: Health check without authentication

- **WHEN** a client sends `GET /api/v1/health` without credentials
- **THEN** the response status is 200

### Requirement: Health endpoint content type

The health endpoint SHALL respond with `Content-Type: application/json`.

#### Scenario: JSON response

- **WHEN** a client sends `GET /api/v1/health`
- **THEN** the response `Content-Type` header includes `application/json`

