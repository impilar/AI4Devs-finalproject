import type { SearchOrder } from "../../types/nota";

type SearchOrderSelectProps = {
  value: SearchOrder;
  onChange: (order: SearchOrder) => void;
};

export function SearchOrderSelect({ value, onChange }: SearchOrderSelectProps) {
  return (
    <select
      className="search-order-select"
      value={value}
      onChange={(event) => onChange(event.target.value as SearchOrder)}
      aria-label="Ordenar resultados"
    >
      <option value="relevance">Relevancia</option>
      <option value="date">Fecha</option>
    </select>
  );
}
