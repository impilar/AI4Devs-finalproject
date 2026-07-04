import { Link, useParams } from "react-router-dom";
import { ErrorMessage } from "../components/common/ErrorMessage";
import { NoteDetail } from "../components/notes/NoteDetail";
import { useNote } from "../hooks/useNote";

export function NoteDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { note, isLoading, error, notFound } = useNote(id);

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

      {!isLoading && error ? <ErrorMessage message={error} /> : null}

      {!isLoading && !notFound && !error && note ? <NoteDetail note={note} /> : null}
    </section>
  );
}
