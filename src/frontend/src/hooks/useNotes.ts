import { useEffect, useState } from "react";
import { listEtiquetas, listNotas } from "../services/notesApi";
import type { NotaResumen } from "../types/nota";

type UseNotesOptions = {
  etiqueta?: string | null;
};

type UseNotesResult = {
  notes: NotaResumen[];
  tags: string[];
  isLoading: boolean;
  error: string | null;
};

export function useNotes({ etiqueta = null }: UseNotesOptions = {}): UseNotesResult {
  const [notes, setNotes] = useState<NotaResumen[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadNotes(): Promise<void> {
      setIsLoading(true);
      setError(null);

      try {
        const [notesData, tagsData] = await Promise.all([
          listNotas(etiqueta ? { etiqueta } : undefined),
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
  }, [etiqueta]);

  return { notes, tags, isLoading, error };
}
