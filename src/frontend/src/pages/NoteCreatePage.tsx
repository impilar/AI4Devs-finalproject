import { Link } from "react-router-dom";
import { NoteForm } from "../components/notes/NoteForm";

export function NoteCreatePage() {
  return (
    <section className="note-create-page">
      <nav className="note-create-page__nav">
        <Link to="/" className="note-create-page__back">
          ← Volver al listado
        </Link>
      </nav>

      <header className="note-create-page__header">
        <h1>Nueva nota</h1>
      </header>

      <NoteForm mode="create" />
    </section>
  );
}
