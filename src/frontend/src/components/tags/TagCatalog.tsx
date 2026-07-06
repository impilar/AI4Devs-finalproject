import type { EtiquetaCatalogItem } from "../../types/nota";

type TagCatalogProps = {
  items: EtiquetaCatalogItem[];
  activeTag: string | null;
  onSelect: (tag: string) => void;
  onClear: () => void;
};

function formatCatalogLabel(item: EtiquetaCatalogItem): string {
  return `${item.name} (${item.count})`;
}

export function TagCatalog({ items, activeTag, onSelect, onClear }: TagCatalogProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <nav className="tag-filter tag-filter--sidebar" aria-label="Catálogo de etiquetas">
      <div className="tag-filter__header">
        <h2 className="tag-filter__title">Etiquetas</h2>
        {activeTag ? (
          <button type="button" className="tag-filter__clear" onClick={onClear}>
            Ver todas
          </button>
        ) : null}
      </div>
      <ul className="tag-filter__list" aria-label="Etiquetas con conteo de notas">
        {items.map((item) => {
          const label = formatCatalogLabel(item);
          const isActive = activeTag === item.name;

          return (
            <li key={item.id}>
              <button
                type="button"
                className={`tag-filter__tag${isActive ? " tag-filter__tag--active" : ""}`}
                aria-pressed={isActive}
                onClick={() => onSelect(item.name)}
              >
                {label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
