import { useEffect, useState } from "react";
import { listEtiquetas, listNotas } from "../services/notesApi";
import type { EtiquetaCatalogItem, NoteListOrder, NoteListSort, NotaResumen } from "../types/nota";

type UseNotesOptions = {
  etiqueta?: string | null;
  sort?: NoteListSort;
  order?: NoteListOrder;
};

type UseNotesResult = {
  notes: NotaResumen[];
  tags: EtiquetaCatalogItem[];
  isLoading: boolean;
  error: string | null;
};

export function useNotes({
  etiqueta = null,
  sort = "created_at",
  order = "desc",
}: UseNotesOptions = {}): UseNotesResult {
  const [notes, setNotes] = useState<NotaResumen[]>([]);
  const [tags, setTags] = useState<EtiquetaCatalogItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadNotes(): Promise<void> {
      setIsLoading(true);
      setError(null);

      try {
        const [notesData, tagsData] = await Promise.all([
          listNotas({
            etiqueta: etiqueta ?? undefined,
            sort,
            order,
          }),
          listEtiquetas(),
        ]);

        if (!cancelled) {
          setNotes(notesData);
          setTags(tagsData);
        }
      } catch (err) {
        if (!cancelled) {
          const message = err instanceof Error ? err.message : "Error al cargar las notas";
          setError(message);
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    void loadNotes();

    return () => {
      cancelled = true;
    };
  }, [etiqueta, sort, order]);

  return { notes, tags, isLoading, error };
}
