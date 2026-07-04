import { useNotes } from "../hooks/useNotes";
import { NoteList } from "../components/notes/NoteList";

export function HomePage() {
  const { notes, isLoading, error } = useNotes();

  return (
    <section className="home-page">
      <header className="home-page__header">
        <h1>Organizador de Conocimiento</h1>
        <p className="home-page__subtitle">Tus notas</p>
      </header>
      <NoteList notes={notes} isLoading={isLoading} error={error} />
    </section>
  );
}
