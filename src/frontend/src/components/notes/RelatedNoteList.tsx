import { Link } from "react-router-dom";
import type { NoteRef } from "../../types/nota";
import { formatRelativeDate } from "../../utils/formatDate";

type RelatedNoteListProps = {
  title: string;
  ariaLabel: string;
  items: NoteRef[];
};

export function RelatedNoteList({ title, ariaLabel, items }: RelatedNoteListProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section className="note-detail__section note-detail__related" aria-label={ariaLabel}>
      <h2 className="note-detail__related-title">{title}</h2>
      <ul className="note-detail__related-list">
        {items.map((note) => (
          <li key={note.id}>
            <Link to={`/notas/${note.id}`} className="note-detail__related-card">
              <span className="note-detail__related-icon" aria-hidden="true">
                📚
              </span>
              <span className="note-detail__related-body">
                <span className="note-detail__related-name">{note.title}</span>
                <time className="note-detail__related-meta" dateTime={note.updatedAt}>
                  {formatRelativeDate(note.updatedAt)}
                </time>
              </span>
              <span className="note-detail__related-chevron" aria-hidden="true">
                ›
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
