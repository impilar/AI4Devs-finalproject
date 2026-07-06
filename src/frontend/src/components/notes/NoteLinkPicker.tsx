import type { NoteRef } from "./nota";

type NoteLinkPickerProps = {
  notes: NoteRef[];
  currentNoteId: string;
  value: string;
  onChange: (destinoId: string) => void;
  disabled?: boolean;
};

export function NoteLinkPicker({
  notes,
  currentNoteId,
  value,
  onChange,
  disabled = false,
}: NoteLinkPickerProps) {
  const options = notes.filter((note) => note.id !== currentNoteId);

  return (
    <div className="note-link-picker">
      <label className="note-link-picker__label" htmlFor="note-link-picker">
        Enlazar con otra nota (opcional)
      </label>
      <select
        id="note-link-picker"
        className="note-link-picker__select"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        disabled={disabled}
      >
        <option value="">Seleccionar nota…</option>
        {options.map((note) => (
          <option key={note.id} value={note.id}>
            {note.title}
          </option>
        ))}
      </select>
    </div>
  );
}
