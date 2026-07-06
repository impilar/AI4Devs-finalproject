import { Link } from "react-router-dom";
import type { NotaResumen } from "../../types/nota";
import { formatRelativeDate } from "../../utils/formatDate";
import { getTagColor } from "../../utils/getTagColor";

type RightContextPanelProps = {
  notes: NotaResumen[];
  tags: string[];
};

function countTags(notes: NotaResumen[]): Map<string, number> {
  const counts = new Map<string, number>();

  for (const note of notes) {
    for (const tag of note.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }

  return counts;
}

export function RightContextPanel({ notes, tags }: RightContextPanelProps) {
  const recentNotes = [...notes]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 4);

  const quickNotes = [...notes]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3);

  const tagCounts = countTags(notes);
  const topTags = tags
    .map((name) => ({ name, count: tagCounts.get(name) ?? 0 }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  const maxCount = topTags[0]?.count ?? 1;

  return (
    <aside className="right-panel" aria-label="Panel contextual">
      {recentNotes.length > 0 ? (
        <section className="right-panel__section">
          <h2 className="right-panel__heading">Actividad reciente</h2>
          <ul className="right-panel__activity">
            {recentNotes.map((note) => (
              <li key={note.id}>
                <Link to={`/notas/${note.id}`} className="right-panel__activity-item">
                  <span className="right-panel__activity-title">{note.title}</span>
                  <span className="right-panel__activity-meta">
                    Actualizada {formatRelativeDate(note.updatedAt)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {topTags.length > 0 ? (
        <section className="right-panel__section">
          <h2 className="right-panel__heading">Etiquetas frecuentes</h2>
          <ul className="right-panel__tags">
            {topTags.map(({ name, count }) => {
              const color = getTagColor(name);
              return (
                <li key={name} className="right-panel__tag-row">
                  <span className="right-panel__tag-name" style={{ color }}>
                    {name}
                  </span>
                  <div className="right-panel__tag-bar">
                    <div
                      className="right-panel__tag-bar-fill"
                      style={{
                        width: `${(count / maxCount) * 100}%`,
                        background: color,
                      }}
                    />
                  </div>
                  <span className="right-panel__tag-count">{count}</span>
                </li>
              );
            })}
          </ul>
        </section>
      ) : null}

      {quickNotes.length > 0 ? (
        <section className="right-panel__section">
          <h2 className="right-panel__heading">Accesos rápidos</h2>
          <ul className="right-panel__quick">
            {quickNotes.map((note) => (
              <li key={note.id}>
                <Link to={`/notas/${note.id}`} className="right-panel__quick-item">
                  {note.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </aside>
  );
}
