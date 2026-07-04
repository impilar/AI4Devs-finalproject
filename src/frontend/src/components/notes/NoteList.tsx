import { ErrorMessage } from "../common/ErrorMessage";
import { NoteListItem } from "./NoteListItem";
import type { NotaResumen } from "../../types/nota";

type NoteListProps = {
  notes: NotaResumen[];
  isLoading: boolean;
  error: string | null;
};

export function NoteList({ notes, isLoading, error }: NoteListProps) {
  if (isLoading) {
    return <p className="note-list__status">Cargando notas…</p>;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (notes.length === 0) {
    return <p className="note-list__status">No hay notas todavía.</p>;
  }

  return (
    <ul className="note-list" aria-label="Listado de notas">
      {notes.map((note) => (
        <NoteListItem key={note.id} note={note} />
      ))}
    </ul>
  );
}
