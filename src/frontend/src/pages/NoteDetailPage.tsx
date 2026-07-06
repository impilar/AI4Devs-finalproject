import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ConfirmDialog } from "../components/common/ConfirmDialog";
import { ErrorMessage } from "../components/common/ErrorMessage";
import { NoteDetail } from "../components/notes/NoteDetail";
import { NoteForm } from "../components/notes/NoteForm";
import { useNote } from "../hooks/useNote";
import { listNotas } from "../services/notesApi";
import { getTagSuggestions } from "../utils/tagSuggestions";
import type { NoteRef, UpdateNotaDto } from "../types/nota";

type DetailMode = "view" | "edit";

export function NoteDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [mode, setMode] = useState<DetailMode>("view");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [noteOptions, setNoteOptions] = useState<NoteRef[]>([]);
  const {
    note,
    salientes,
    entrantes,
    isLoading,
    isSaving,
    isDeleting,
    isRemovingTag,
    error,
    notFound,
    updateNote,
    addBacklink,
    deleteNote,
    removeTag,
  } = useNote(id);

  useEffect(() => {
    if (mode !== "edit" || !id) {
      return;
    }

    let cancelled = false;

    async function loadNoteOptions(): Promise<void> {
      const notes = await listNotas();
      if (!cancelled) {
        setNoteOptions(notes.map((item) => ({ id: item.id, title: item.title })));
      }
    }

    void loadNoteOptions();

    return () => {
      cancelled = true;
    };
  }, [id, mode]);

  async function handleSave(dto: UpdateNotaDto, backlinkDestinoId?: string): Promise<void> {
    await updateNote(dto);

    if (backlinkDestinoId) {
      await addBacklink(backlinkDestinoId);
    }

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
    <section
      className={`note-detail-page${mode === "edit" ? " note-detail-page--editorial" : ""}`}
    >
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
          salientes={salientes}
          entrantes={entrantes}
          onEdit={() => setMode("edit")}
          onDelete={() => setShowDeleteDialog(true)}
          onRemoveTag={(etiquetaId) => {
            void removeTag(etiquetaId);
          }}
          isRemovingTag={isRemovingTag}
        />
      ) : null}

      {!isLoading && !notFound && note && mode === "edit" ? (
        <NoteForm
          mode="edit"
          initialValues={{
            title: note.title,
            content: note.content,
            links: note.links,
            tags: note.tags.map((tag) => tag.name),
          }}
          currentNoteId={note.id}
          noteOptions={noteOptions}
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
