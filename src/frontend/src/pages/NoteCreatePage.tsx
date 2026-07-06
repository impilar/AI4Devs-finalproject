import { NoteForm } from "../components/notes/NoteForm";
import { getTagSuggestions } from "../utils/tagSuggestions";

export function NoteCreatePage() {
  return (
    <section className="note-create-page note-create-page--editorial">
      <header className="note-create-page__header">
        <h1 className="note-create-page__title note-form__label--visually-hidden">Nueva nota</h1>
      </header>

      <NoteForm mode="create" tagSuggestions={getTagSuggestions()} />
    </section>
  );
}
