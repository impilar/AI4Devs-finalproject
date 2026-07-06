type TagFilterProps = {
  tags: string[];
  activeTag: string | null;
  onSelect: (tag: string) => void;
  onClear: () => void;
  layout?: "inline" | "sidebar";
};

export function TagFilter({
  tags,
  activeTag,
  onSelect,
  onClear,
  layout = "inline",
}: TagFilterProps) {
  if (tags.length === 0) {
    return null;
  }

  return (
    <nav
      className={`tag-filter${layout === "sidebar" ? " tag-filter--sidebar" : ""}`}
      aria-label="Filtro por etiqueta"
    >
      <div className="tag-filter__header">
        <h2 className="tag-filter__title">Etiquetas</h2>
        {activeTag ? (
          <button type="button" className="tag-filter__clear" onClick={onClear}>
            Ver todas
          </button>
        ) : null}
      </div>
      <ul className="tag-filter__list" aria-label="Etiquetas disponibles">
        {tags.map((tag) => {
          const isActive = activeTag === tag;

          return (
            <li key={tag}>
              <button
                type="button"
                className={`tag-filter__tag${isActive ? " tag-filter__tag--active" : ""}`}
                aria-pressed={isActive}
                onClick={() => onSelect(tag)}
              >
                {tag}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
