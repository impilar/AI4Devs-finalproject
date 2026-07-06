import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ConfirmDialog } from "../components/common/ConfirmDialog";
import { ErrorMessage } from "../components/common/ErrorMessage";
import { NoteDetail } from "../components/notes/NoteDetail";
import { NoteForm } from "../components/notes/NoteForm";
import { useNote } from "../hooks/useNote";
import { getTagSuggestions } from "../utils/tagSuggestions";
import type { UpdateNotaDto } from "../types/nota";

type DetailMode = "view" | "edit";

export function NoteDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [mode, setMode] = useState<DetailMode>("view");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const { note, isLoading, isSaving, isDeleting, error, notFound, updateNote, deleteNote } =
    useNote(id);

  async function handleSave(dto: UpdateNotaDto): Promise<void> {
    await updateNote(dto);
    setMode("view");
  }

  async function handleConfirmDelete(): Promise<void> {
    try {
      await deleteNote();
      setShowDeleteDialog(false);
      navigate("/");
    } catch {
      setShowDeleteDialog(false);
    }
  }

  return (
    <section className="note-detail-page">
      <nav className="note-detail-page__nav">
        <Link to="/" className="note-detail-page__back">
          ← Volver al listado
        </Link>
      </nav>

      {isLoading ? <p className="note-detail-page__status">Cargando nota…</p> : null}

      {notFound ? (
        <div className="note-detail-page__not-found">
          <ErrorMessage message="La nota no existe o fue eliminada" />
          <Link to="/" className="note-detail-page__back-link">
            Volver al listado
          </Link>
        </div>
      ) : null}

      {!isLoading && error && mode === "view" ? <ErrorMessage message={error} /> : null}

      {!isLoading && !notFound && note && mode === "view" ? (
        <NoteDetail
          note={note}
          onEdit={() => setMode("edit")}
          onDelete={() => setShowDeleteDialog(true)}
        />
      ) : null}

      {!isLoading && !notFound && note && mode === "edit" ? (
        <NoteForm
          mode="edit"
          initialValues={note}
          onSubmit={handleSave}
          onCancel={() => setMode("view")}
          isSaving={isSaving}
          tagSuggestions={getTagSuggestions()}
        />
      ) : null}

      <ConfirmDialog
        open={showDeleteDialog}
        title="¿Eliminar permanentemente?"
        message="Esta acción no se puede deshacer. La nota desaparecerá del listado."
        confirmLabel="Eliminar"
        onConfirm={() => {
          void handleConfirmDelete();
        }}
        onCancel={() => setShowDeleteDialog(false)}
        isConfirming={isDeleting}
      />
    </section>
  );
}
