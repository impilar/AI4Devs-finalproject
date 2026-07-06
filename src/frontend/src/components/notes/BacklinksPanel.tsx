import { Link } from "react-router-dom";
import type { NoteRef } from "../../types/nota";

type BacklinksPanelProps = {
  items: NoteRef[];
};

export function BacklinksPanel({ items }: BacklinksPanelProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section className="note-detail__section" aria-label="Notas que enlazan aquí">
      <h2 className="note-detail__section-title">Notas que enlazan aquí</h2>
      <ul className="note-detail__note-links">
        {items.map((note) => (
          <li key={note.id}>
            <Link to={`/notas/${note.id}`} className="note-detail__note-link">
              {note.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
