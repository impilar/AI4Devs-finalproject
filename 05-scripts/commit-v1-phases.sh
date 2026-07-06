#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

patch_queue_phase() {
  local phase="$1"
  python3 - "$phase" <<'PY'
import json, sys
phase = int(sys.argv[1])
path = "02-docs/02_3-engineering/implementation-queue-v1.json"
with open(path) as f:
    data = json.load(f)
phase_ids = {1: "PHASE-001", 2: "PHASE-002", 3: "PHASE-003", 4: "PHASE-004"}
done_phases = {phase_ids[i] for i in range(1, phase + 1)}
done_tasks = set()
for p in data["phases"]:
    if p["id"] in done_phases:
        p["status"] = "done"
        p["completed_at"] = "2026-07-06"
        done_tasks.update(p["task_ids"])
    else:
        p.pop("completed_at", None)
        p["status"] = "backlog"
for t in data["queue"]:
    if t["id"] in done_tasks:
        t["status"] = "done"
        t["completed_at"] = "2026-07-06"
    else:
        t.pop("completed_at", None)
        t["status"] = "backlog"
with open(path, "w") as f:
    json.dump(data, f, indent=2, ensure_ascii=False)
    f.write("\n")
PY
}

patch_status_phase() {
  local phase="$1"
  python3 - "$phase" <<'PY'
import json, sys
phase = int(sys.argv[1])
path = "02-docs/02_1-product/user-stories/status-v1.json"
with open(path) as f:
    data = json.load(f)
story_by_phase = {
    1: "US-003",
    2: "US-007",
    3: "US-010",
    4: "US-014",
}
for p in range(1, phase + 1):
    sid = story_by_phase[p]
    story = data["stories"][sid]
    story["status"] = "done"
    story["completed_at"] = "2026-07-06"
    for tid, _ in list(story.get("tasks", {}).items()):
        story["tasks"][tid] = "done"
for p in range(phase + 1, 5):
    sid = story_by_phase[p]
    story = data["stories"][sid]
    story["status"] = "backlog"
    story.pop("completed_at", None)
    for tid in story.get("tasks", {}):
        story["tasks"][tid] = "backlog"
data["last_updated"] = "2026-07-06"
with open(path, "w") as f:
    json.dump(data, f, indent=2, ensure_ascii=False)
    f.write("\n")
PY
}

write_notelist_phase1() {
  cat > src/frontend/src/components/notes/NoteList.tsx <<'EOF'
import { ErrorMessage } from "../common/ErrorMessage";
import { EmptyState } from "./EmptyState";
import { NoteListItem } from "./NoteListItem";
import { SkeletonNoteList } from "./SkeletonNoteList";
import type { NotaResumen } from "../../types/nota";

type NoteListProps = {
  notes: NotaResumen[];
  isLoading: boolean;
  error: string | null;
  activeTag?: string | null;
  searchQuery?: string | null;
};

export function NoteList({
  notes,
  isLoading,
  error,
  activeTag = null,
  searchQuery = null,
}: NoteListProps) {
  if (isLoading) {
    return <SkeletonNoteList />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (notes.length === 0) {
    if (searchQuery) {
      return (
        <EmptyState message={`No se encontraron notas para «${searchQuery}».`} />
      );
    }

    if (activeTag) {
      return (
        <EmptyState message={`No hay notas con la etiqueta «${activeTag}».`} />
      );
    }

    return (
      <EmptyState
        message="Aún no hay notas."
        ctaLabel="Crear nota"
        ctaTo="/notas/nueva"
      />
    );
  }

  return (
    <ul className="note-list" aria-label="Listado de notas">
      {notes.map((note) => (
        <NoteListItem key={note.id} note={note} searchQuery={searchQuery} />
      ))}
    </ul>
  );
}
EOF
}

write_notelist_test_phase1() {
  python3 <<'PY'
from pathlib import Path
p = Path("src/frontend/src/components/notes/NoteList.test.tsx")
text = p.read_text()
# Remove search empty test block if present (will be added in phase 4)
import re
text = re.sub(
    r'\n  it\("shows search empty state when searchQuery is set".*?\n  \}\);\n',
    '\n',
    text,
    flags=re.S,
)
p.write_text(text)
PY
}

# Save final versions
cp src/frontend/src/components/notes/NoteList.tsx /tmp/notelist-final.tsx
cp src/frontend/src/components/notes/NoteList.test.tsx /tmp/notelist-test-final.tsx
cp src/frontend/src/index.css /tmp/index-final.css
cp 02-docs/02_3-engineering/implementation-queue-v1.json /tmp/queue-final.json
cp 02-docs/02_1-product/user-stories/status-v1.json /tmp/status-final.json

# --- PHASE-001 ---
write_notelist_phase1
write_notelist_test_phase1
cp /tmp/queue-final.json 02-docs/02_3-engineering/implementation-queue-v1.json
cp /tmp/status-final.json 02-docs/02_1-product/user-stories/status-v1.json
patch_queue_phase 1
patch_status_phase 1

git add \
  .cursor/agents/implementation-planner.md \
  .cursor/skills/create-implementation-plan.md \
  .cursor/skills/enrich-user-story.md \
  .cursor/rules/09-enrichment-before-plan.mdc \
  02-docs/02_1-product/user-stories/US-003.md \
  02-docs/02_1-product/user-stories/US-007.md \
  02-docs/02_1-product/user-stories/US-010.md \
  02-docs/02_1-product/user-stories/US-014.md \
  02-docs/02_3-engineering/README.md \
  02-docs/02_3-engineering/implementation-plan-v1.md \
  02-docs/02_3-engineering/implementation-queue-v1.json \
  02-docs/02_1-product/user-stories/status-v1.json \
  04-prompts/development/01-implementation-plan.md \
  04-prompts/discovery/03-enriquecer-user-story.md \
  05-scripts/check-stories-enriched.mjs \
  package.json \
  openspec/changes/archive/2026-07-06-us-003-empty-state \
  openspec/specs/notes-list/spec.md \
  src/frontend/src/components/notes/EmptyState.test.tsx \
  src/frontend/src/components/notes/NoteList.tsx \
  src/frontend/src/components/notes/NoteList.test.tsx \
  src/frontend/src/pages/NoteDetailPage.editorial.test.tsx \
  tests/e2e/us-001-listado.spec.ts \
  tests/e2e/us-003-empty-state.spec.ts \
  tests/e2e/us-005-crear-nota.spec.ts \
  tests/integration/api/notas.list.test.ts \
  tests/integration/repositories/nota.repository.list.test.ts \
  tests/integration/repositories/nota.repository.test.ts

git commit -m "$(cat <<'EOF'
feat(frontend): PHASE-001 V1 empty library state (US-003)

Add Gherkin-aligned empty library message and CTA, E2E coverage, OpenSpec
archive, V1 implementation plan/queue, and story enrichment tooling.
EOF
)"

# --- PHASE-002 ---
cp /tmp/queue-final.json 02-docs/02_3-engineering/implementation-queue-v1.json
cp /tmp/status-final.json 02-docs/02_1-product/user-stories/status-v1.json
patch_queue_phase 2
patch_status_phase 2

git add \
  openspec/changes/archive/2026-07-06-us-007-form-validation \
  openspec/specs/note-create/spec.md \
  openspec/specs/note-update/spec.md \
  src/backend/src/schemas/nota.schema.test.ts \
  src/frontend/src/components/notes/NoteForm.tsx \
  src/frontend/src/components/notes/NoteForm.test.tsx \
  src/frontend/src/components/notes/NoteForm.validation.test.tsx \
  src/frontend/src/components/tags/TagInput.tsx \
  src/frontend/src/components/tags/TagInput.test.tsx \
  tests/e2e/us-007-validacion-formulario.spec.ts \
  tests/integration/api/notas.create.test.ts \
  tests/integration/api/notas.update.test.ts \
  02-docs/02_3-engineering/implementation-queue-v1.json \
  02-docs/02_1-product/user-stories/status-v1.json

git commit -m "$(cat <<'EOF'
feat(frontend): PHASE-002 V1 form validation UX (US-007)

Harden inline validation with preserved form state, stricter API error tests,
and E2E coverage for create/edit validation scenarios.
EOF
)"

# --- PHASE-003 ---
cp /tmp/notelist-final.tsx src/frontend/src/components/notes/NoteList.tsx
cp /tmp/index-final.css src/frontend/src/index.css
cp /tmp/queue-final.json 02-docs/02_3-engineering/implementation-queue-v1.json
cp /tmp/status-final.json 02-docs/02_1-product/user-stories/status-v1.json
patch_queue_phase 3
patch_status_phase 3

# NoteList still has SearchEmptyState - revert search branch for phase 3 commit
python3 <<'PY'
from pathlib import Path
p = Path("src/frontend/src/components/notes/NoteList.tsx")
text = p.read_text()
text = text.replace(
    'import { SearchEmptyState } from "../search/SearchEmptyState";\n',
    '',
)
text = text.replace(
    '      return <SearchEmptyState searchTerm={searchQuery} />;',
    '      return (\n        <EmptyState message={`No se encontraron notas para «${searchQuery}».`} />\n      );',
)
p.write_text(text)
PY

cp /tmp/notelist-test-final.tsx /tmp/notelist-test-p4.tsx
python3 <<'PY'
from pathlib import Path
import re
p = Path("src/frontend/src/components/notes/NoteList.test.tsx")
text = p.read_text()
text = re.sub(
    r'\n  it\("shows search empty state when searchQuery is set".*?\n  \}\);\n',
    '\n',
    text,
    flags=re.S,
)
p.write_text(text)
PY

git add \
  openspec/changes/README.md \
  openspec/changes/archive/2026-07-06-us-010-remove-tag \
  openspec/specs/note-detail/spec.md \
  openspec/specs/note-tags/spec.md \
  src/backend/src/controllers/nota.controller.ts \
  src/backend/src/mappers/nota.mapper.ts \
  src/backend/src/mappers/nota.mapper.test.ts \
  src/backend/src/repositories/nota.repository.ts \
  src/backend/src/routes/notas.routes.ts \
  src/backend/src/schemas/common.schema.ts \
  src/backend/src/schemas/nota.schema.ts \
  src/backend/src/scripts/e2e-db-setup.ts \
  src/backend/src/services/nota.service.ts \
  src/frontend/src/components/notes/NoteDetail.tsx \
  src/frontend/src/components/notes/NoteDetail.test.tsx \
  src/frontend/src/components/notes/NoteList.tsx \
  src/frontend/src/components/notes/NoteList.test.tsx \
  src/frontend/src/components/tags/RemovableTagChip.tsx \
  src/frontend/src/components/tags/RemovableTagChip.test.tsx \
  src/frontend/src/hooks/useNote.ts \
  src/frontend/src/hooks/useNote.test.ts \
  src/frontend/src/index.css \
  src/frontend/src/pages/NoteDetailPage.tsx \
  src/frontend/src/services/notesApi.ts \
  src/frontend/src/types/nota.ts \
  tests/e2e/fixtures/seed.ts \
  tests/e2e/us-002-detalle.spec.ts \
  tests/e2e/us-008-etiquetas.spec.ts \
  tests/e2e/us-010-quitar-etiqueta.spec.ts \
  tests/e2e/us-015-edicion.spec.ts \
  tests/integration/api/notas.getById.test.ts \
  tests/integration/api/notas.remove-tag.test.ts \
  tests/integration/api/notas.tags.test.ts \
  tests/integration/api/notas.update.test.ts \
  02-docs/02_3-engineering/implementation-queue-v1.json \
  02-docs/02_1-product/user-stories/status-v1.json

git commit -m "$(cat <<'EOF'
feat(backend): PHASE-003 V1 remove tag from note (US-010)

Add DELETE /notas/:id/etiquetas/:etiquetaId, TagRef on detail, removable tag
chips, and integration/E2E tests including shared-tag persistence.
EOF
)"

# --- PHASE-004 ---
cp /tmp/notelist-final.tsx src/frontend/src/components/notes/NoteList.tsx
cp /tmp/notelist-test-final.tsx src/frontend/src/components/notes/NoteList.test.tsx
cp /tmp/queue-final.json 02-docs/02_3-engineering/implementation-queue-v1.json
cp /tmp/status-final.json 02-docs/02_1-product/user-stories/status-v1.json

git add \
  openspec/changes/archive/2026-07-06-us-014-search-empty-state \
  openspec/specs/note-search/spec.md \
  src/backend/src/services/search.service.test.ts \
  src/frontend/src/components/search/SearchEmptyState.tsx \
  src/frontend/src/components/search/SearchEmptyState.test.tsx \
  src/frontend/src/components/notes/NoteList.tsx \
  src/frontend/src/components/notes/NoteList.test.tsx \
  tests/e2e/us-012-busqueda.spec.ts \
  tests/e2e/us-014-busqueda-sin-resultados.spec.ts \
  tests/integration/api/buscar.test.ts \
  03-delivery/releases/v0.2.0-v1 \
  03-delivery/changelogs/CHANGELOG.md \
  02-docs/02_3-engineering/implementation-queue-v1.json \
  02-docs/02_1-product/user-stories/status-v1.json

git commit -m "$(cat <<'EOF'
feat(frontend): PHASE-004 V1 search empty state (US-014)

Show Gherkin copy for zero search hits, strengthen buscar contract tests,
archive OpenSpec change, and publish v0.2.0 release notes.
EOF
)"

echo "Done. Commits:"
git log --oneline -4
