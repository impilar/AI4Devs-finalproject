import { getTagColor } from "../../utils/getTagColor";
import type { TagRef } from "../../types/nota";

type RemovableTagChipProps = {
  tag: TagRef;
  onRemove: (etiquetaId: string) => void;
  disabled?: boolean;
};

export function RemovableTagChip({ tag, onRemove, disabled = false }: RemovableTagChipProps) {
  const color = getTagColor(tag.name);

  return (
    <span
      className="note-detail__tag note-detail__tag--removable"
      style={{
        background: `${color}18`,
        color,
        borderColor: `${color}28`,
      }}
    >
      {tag.name}
      <button
        type="button"
        className="note-detail__tag-remove"
        onClick={() => onRemove(tag.id)}
        disabled={disabled}
        aria-label={`Quitar etiqueta ${tag.name}`}
      >
        ×
      </button>
    </span>
  );
}
