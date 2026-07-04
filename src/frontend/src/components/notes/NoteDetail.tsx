import type { NotaDetail } from "../../types/nota";

type NoteDetailProps = {
  note: NotaDetail;
};

export function NoteDetail({ note }: NoteDetailProps) {
  return (
    <article className="note-detail">
      <header className="note-detail__header">
        <h1 className="note-detail__title">{note.title}</h1>
      </header>

      <div className="note-detail__content">{note.content}</div>

      {note.links.length > 0 ? (
        <section className="note-detail__section" aria-label="Enlaces">
          <h2 className="note-detail__section-title">Enlaces</h2>
          <ul className="note-detail__links">
            {note.links.map((url) => (
              <li key={url}>
                <a href={url} target="_blank" rel="noopener noreferrer">
                  {url}
                </a>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {note.tags.length > 0 ? (
        <section className="note-detail__section" aria-label="Etiquetas">
          <h2 className="note-detail__section-title">Etiquetas</h2>
          <ul className="note-detail__tags">
            {note.tags.map((tag) => (
              <li key={tag} className="note-detail__tag">
                {tag}
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </article>
  );
}
