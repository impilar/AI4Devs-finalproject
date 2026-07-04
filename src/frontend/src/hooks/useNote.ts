import { useEffect, useState } from "react";
import { ApiError } from "../services/apiClient";
import { getNota } from "../services/notesApi";
import type { NotaDetail } from "../types/nota";

type UseNoteResult = {
  note: NotaDetail | null;
  isLoading: boolean;
  error: string | null;
  notFound: boolean;
};

export function useNote(id: string | undefined): UseNoteResult {
  const [note, setNote] = useState<NotaDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!id) {
      setNote(null);
      setIsLoading(false);
      setError("Identificador de nota inválido");
      setNotFound(false);
      return;
    }

    let cancelled = false;

    async function loadNote(): Promise<void> {
      setIsLoading(true);
      setError(null);
      setNotFound(false);

      try {
        const data = await getNota(id);
        if (!cancelled) {
          setNote(data);
        }
      } catch (err) {
        if (!cancelled) {
          if (err instanceof ApiError && err.status === 404) {
            setNotFound(true);
            setNote(null);
          } else {
            const message = err instanceof Error ? err.message : "Error al cargar la nota";
            setError(message);
          }
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    void loadNote();

    return () => {
      cancelled = true;
    };
  }, [id]);

  return { note, isLoading, error, notFound };
}
