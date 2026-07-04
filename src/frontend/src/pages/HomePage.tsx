import { Link } from "react-router-dom";
import { useNotes } from "../hooks/useNotes";
import { NoteList } from "../components/notes/NoteList";

export function HomePage() {
  const { notes, isLoading, error } = useNotes();

  return (
    <section className="home-page">
      <header className="home-page__header">
        <div className="home-page__header-row">
          <div>
            <h1>Organizador de Conocimiento</h1>
            <p className="home-page__subtitle">Tus notas</p>
          </div>
          <Link to="/notas/nueva" className="home-page__new-note">
            Nueva nota
          </Link>
        </div>
      </header>
      <NoteList notes={notes} isLoading={isLoading} error={error} />
    </section>
  );
}
