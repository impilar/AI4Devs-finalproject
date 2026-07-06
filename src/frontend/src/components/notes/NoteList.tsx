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
        message="No hay notas todavía. Empieza capturando una idea."
        ctaLabel="Crear primera nota"
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
