import { Link } from "react-router-dom";
import type { NotaResumen } from "../../types/nota";
import { formatCreatedAt, formatRelativeDate } from "../../utils/formatDate";
import { getTagColor } from "../../utils/getTagColor";
import { highlightText } from "../../utils/highlightText";

type NoteListItemProps = {
  note: NotaResumen;
  searchQuery?: string | null;
};

export function NoteListItem({ note, searchQuery = null }: NoteListItemProps) {
  const absoluteDate = formatCreatedAt(note.updatedAt);
  const relativeDate = formatRelativeDate(note.updatedAt);

  return (
    <li className="note-list-item">
      <Link to={`/notas/${note.id}`} className="note-list-item__card">
        <h2 className="note-list-item__title">
          {highlightText(note.title, searchQuery ?? "")}
        </h2>
        {note.excerpt ? (
          <p className="note-list-item__excerpt">
            {highlightText(note.excerpt, searchQuery ?? "")}
          </p>
        ) : null}
        <div className="note-list-item__meta">
          {note.tags.length > 0 ? (
            <div className="note-list-item__tags" aria-label="Etiquetas de la nota">
              {note.tags.map((tag) => {
                const color = getTagColor(tag);
                return (
                  <span
                    key={tag}
                    className="note-list-item__tag"
                    style={{
                      background: `${color}18`,
                      color,
                      borderColor: `${color}28`,
                    }}
                  >
                    {tag}
                  </span>
                );
              })}
            </div>
          ) : (
            <span className="note-list-item__tags-placeholder" />
          )}
          <time
            className="note-list-item__date"
            dateTime={note.updatedAt}
            title={absoluteDate}
          >
            {relativeDate}
          </time>
        </div>
      </Link>
    </li>
  );
}
