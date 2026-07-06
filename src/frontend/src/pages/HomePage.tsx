import { useState } from "react";
import { Link } from "react-router-dom";
import { useNotes } from "../hooks/useNotes";
import { NoteList } from "../components/notes/NoteList";
import { TagFilter } from "../components/tags/TagFilter";

export function HomePage() {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const { notes, tags, isLoading, error } = useNotes({ etiqueta: activeTag });

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
      <TagFilter
        tags={tags}
        activeTag={activeTag}
        onSelect={setActiveTag}
        onClear={() => setActiveTag(null)}
      />
      <NoteList
        notes={notes}
        isLoading={isLoading}
        error={error}
        activeTag={activeTag}
      />
    </section>
  );
}
