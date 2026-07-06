import type { SearchOrder } from "../../types/nota";
import { SearchOrderSelect } from "./SearchOrderSelect";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  order?: SearchOrder;
  onOrderChange?: (order: SearchOrder) => void;
  showOrderSelect?: boolean;
};

export function SearchBar({
  value,
  onChange,
  order,
  onOrderChange,
  showOrderSelect = false,
}: SearchBarProps) {
  return (
    <div className="search-bar">
      <label htmlFor="search-notes" className="search-bar__label">
        Buscar
      </label>
      <div className="search-bar__controls">
        <input
          id="search-notes"
          type="search"
          className="search-bar__input"
          placeholder="Buscar notas…"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          aria-label="Buscar notas"
        />
        {showOrderSelect && order !== undefined && onOrderChange ? (
          <SearchOrderSelect value={order} onChange={onOrderChange} />
        ) : null}
      </div>
    </div>
  );
}
