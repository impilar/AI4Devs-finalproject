import type { NotaDetail, NoteRef } from "../../types/nota";
import { formatRelativeDate } from "../../utils/formatDate";
import { RemovableTagChip } from "../tags/RemovableTagChip";
import { BacklinksPanel } from "./BacklinksPanel";
import { RelatedNoteList } from "./RelatedNoteList";

type NoteDetailProps = {
  note: NotaDetail;
  salientes: NoteRef[];
  entrantes: NoteRef[];
  onEdit: () => void;
  onDelete: () => void;
  onRemoveTag: (etiquetaId: string) => void;
  isRemovingTag?: boolean;
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

export function NoteDetail({
  note,
  salientes,
  entrantes,
  onEdit,
  onDelete,
  onRemoveTag,
  isRemovingTag = false,
}: NoteDetailProps) {
  const hasMetadata =
    note.links.length > 0 ||
    note.tags.length > 0 ||
    salientes.length > 0 ||
    entrantes.length > 0;

  return (
    <article className="note-detail">
      <header className="note-detail__hero">
        <h1 className="note-detail__title">{note.title}</h1>
        <p className="note-detail__meta">
          <time dateTime={note.updatedAt} title={formatUpdatedAt(note.updatedAt)}>
            {formatRelativeDate(note.updatedAt)}
          </time>
        </p>
        <div className="note-detail__actions">
          <button type="button" className="note-detail__edit" onClick={onEdit}>
            Editar
          </button>
          <button type="button" className="note-detail__delete" onClick={onDelete}>
            Eliminar
          </button>
        </div>
      </header>

      <div className="note-detail__document">
        <div
          className={`note-detail__content${hasMetadata ? " note-detail__content--with-footer" : ""}`}
        >
          {note.content}
        </div>

        {hasMetadata ? (
          <footer className="note-detail__meta-footer">
            {note.links.length > 0 ? (
              <section className="note-detail__section" aria-label="Enlaces externos">
                <h2 className="note-detail__section-title">Enlaces externos</h2>
                <ul className="note-detail__links">
                  {note.links.map((url) => (
                    <li key={url} className="note-detail__link-item">
                      <a
                        href={url}
                        className="note-detail__link-card"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span className="note-detail__link-icon" aria-hidden="true">
                          ↗
                        </span>
                        <span className="note-detail__link-url">{url}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            {salientes.length > 0 ? (
              <RelatedNoteList
                title="Notas relacionadas"
                ariaLabel="Notas enlazadas"
                items={salientes}
              />
            ) : null}

            <BacklinksPanel items={entrantes} />

            {note.tags.length > 0 ? (
              <section className="note-detail__section" aria-label="Etiquetas">
                <h2 className="note-detail__section-title">Etiquetas</h2>
                <ul className="note-detail__tags">
                  {note.tags.map((tag) => (
                    <li key={tag.id}>
                      <RemovableTagChip
                        tag={tag}
                        onRemove={onRemoveTag}
                        disabled={isRemovingTag}
                      />
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}
          </footer>
        ) : null}
      </div>
    </article>
  );
}
