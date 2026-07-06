import type { NotaDetail } from "../../types/nota";

type NoteDetailProps = {
  note: NotaDetail;
  onEdit: () => void;
  onDelete: () => void;
};

function formatUpdatedAt(isoDate: string): string {
  return new Date(isoDate).toLocaleString("es-ES", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function NoteDetail({ note, onEdit, onDelete }: NoteDetailProps) {
  return (
    <article className="note-detail">
      <header className="note-detail__header">
        <div className="note-detail__heading">
          <h1 className="note-detail__title">{note.title}</h1>
          <p className="note-detail__meta">
            Última actualización:{" "}
            <time dateTime={note.updatedAt}>{formatUpdatedAt(note.updatedAt)}</time>
          </p>
        </div>
        <div className="note-detail__actions">
          <button type="button" className="note-detail__edit" onClick={onEdit}>
            Editar
          </button>
          <button type="button" className="note-detail__delete" onClick={onDelete}>
            Eliminar
          </button>
        </div>
      </header>

      <div className="note-detail__content">{note.content}</div>

      {note.links.length > 0 ? (
        <section className="note-detail__section" aria-label="Enlaces">
          <h2 className="note-detail__section-title">Enlaces</h2>
          <ul className="note-detail__links">
            {note.links.map((url) => (
              <li key={url}>
                <a href={url} target="_blank" rel="noopener noreferrer">
                  {url}
                </a>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {note.tags.length > 0 ? (
        <section className="note-detail__section" aria-label="Etiquetas">
          <h2 className="note-detail__section-title">Etiquetas</h2>
          <ul className="note-detail__tags">
            {note.tags.map((tag) => (
              <li key={tag} className="note-detail__tag">
                {tag}
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </article>
  );
}
