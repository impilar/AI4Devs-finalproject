import type { NoteListSortPreset } from "../../utils/noteListSortSession";

type NoteSortSelectProps = {
  value: NoteListSortPreset;
  onChange: (preset: NoteListSortPreset) => void;
};

export function NoteSortSelect({ value, onChange }: NoteSortSelectProps) {
  return (
    <select
      className="note-sort-select"
      data-testid="note-sort-select"
      value={value}
      onChange={(event) => onChange(event.target.value as NoteListSortPreset)}
      aria-label="Ordenar listado"
    >
      <option value="created_at_desc">Fecha (más recientes)</option>
      <option value="created_at_asc">Fecha (más antiguas)</option>
      <option value="title_asc">Título (A-Z)</option>
      <option value="title_desc">Título (Z-A)</option>
    </select>
  );
}
