import type { NoteRef } from "../../types/nota";
import { RelatedNoteList } from "./RelatedNoteList";

type BacklinksPanelProps = {
  items: NoteRef[];
};

export function BacklinksPanel({ items }: BacklinksPanelProps) {
  return (
    <RelatedNoteList
      title="Notas que enlazan aquí"
      ariaLabel="Notas que enlazan aquí"
      items={items}
    />
  );
}
