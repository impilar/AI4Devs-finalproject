import { Link } from "react-router-dom";
import type { NotaResumen } from "../../types/nota";

type NoteListItemProps = {
  note: NotaResumen;
};

function formatCreatedAt(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function NoteListItem({ note }: NoteListItemProps) {
  return (
    <li className="note-list-item">
      <Link to={`/notas/${note.id}`} className="note-list-item__link">
        <span className="note-list-item__title">{note.title}</span>
        <time className="note-list-item__date" dateTime={note.createdAt}>
          {formatCreatedAt(note.createdAt)}
        </time>
      </Link>
    </li>
  );
}
