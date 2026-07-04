import { useEffect, useState } from "react";
import { listNotas } from "../services/notesApi";
import type { NotaResumen } from "../types/nota";

type UseNotesResult = {
  notes: NotaResumen[];
  isLoading: boolean;
  error: string | null;
};

export function useNotes(): UseNotesResult {
  const [notes, setNotes] = useState<NotaResumen[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadNotes(): Promise<void> {
      setIsLoading(true);
      setError(null);

      try {
        const data = await listNotas();
        if (!cancelled) {
          setNotes(data);
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
  }, []);

  return { notes, isLoading, error };
}
