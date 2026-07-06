import type { SearchOrder } from "../../types/nota";
import { SearchOrderSelect } from "./SearchOrderSelect";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  order?: SearchOrder;
  onOrderChange?: (order: SearchOrder) => void;
  showOrderSelect?: boolean;
  compact?: boolean;
  variant?: "default" | "spotlight";
};

export function SearchBar({
  value,
  onChange,
  order,
  onOrderChange,
  showOrderSelect = false,
  compact = false,
  variant = "default",
}: SearchBarProps) {
  const variantClass = variant === "spotlight" ? " search-bar--spotlight" : "";

  return (
    <div className={`search-bar${compact ? " search-bar--compact" : ""}${variantClass}`}>
      <label
        htmlFor="search-notes"
        className={`search-bar__label${compact ? " search-bar__label--visually-hidden" : ""}`}
      >
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
