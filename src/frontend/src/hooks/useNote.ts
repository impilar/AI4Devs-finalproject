import { useCallback, useEffect, useState } from "react";
import { ApiError, ValidationApiError } from "../services/apiClient";
import { deleteNota, getNota, updateNota } from "../services/notesApi";
import type { NotaDetail, UpdateNotaDto } from "../types/nota";

type UseNoteResult = {
  note: NotaDetail | null;
  isLoading: boolean;
  isSaving: boolean;
  isDeleting: boolean;
  error: string | null;
  notFound: boolean;
  updateNote: (dto: UpdateNotaDto) => Promise<NotaDetail>;
  deleteNote: () => Promise<void>;
};

export function useNote(id: string | undefined): UseNoteResult {
  const [note, setNote] = useState<NotaDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
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

  const saveNote = useCallback(
    async (dto: UpdateNotaDto): Promise<NotaDetail> => {
      if (!id) {
        throw new Error("Identificador de nota inválido");
      }

      setIsSaving(true);
      setError(null);

      try {
        const data = await updateNota(id, dto);
        setNote(data);
        return data;
      } catch (err) {
        if (!(err instanceof ValidationApiError)) {
          const message = err instanceof Error ? err.message : "Error al guardar la nota";
          setError(message);
        }

        throw err;
      } finally {
        setIsSaving(false);
      }
    },
    [id],
  );

  const removeNote = useCallback(async (): Promise<void> => {
    if (!id) {
      throw new Error("Identificador de nota inválido");
    }

    setIsDeleting(true);
    setError(null);

    try {
      await deleteNota(id);
      setNote(null);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error al eliminar la nota";
      setError(message);
      throw err;
    } finally {
      setIsDeleting(false);
    }
  }, [id]);

  return {
    note,
    isLoading,
    isSaving,
    isDeleting,
    error,
    notFound,
    updateNote: saveNote,
    deleteNote: removeNote,
  };
}
