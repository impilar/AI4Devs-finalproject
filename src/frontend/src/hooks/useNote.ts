import { useCallback, useEffect, useState } from "react";
import { ApiError, ValidationApiError } from "../services/apiClient";
import {
  createBacklink,
  deleteNota,
  getNota,
  listBacklinksEntrantes,
  listBacklinksSalientes,
  removeTagFromNota,
  updateNota,
} from "../services/notesApi";
import type { NotaDetail, NoteRef, UpdateNotaDto } from "../types/nota";

type UseNoteResult = {
  note: NotaDetail | null;
  salientes: NoteRef[];
  entrantes: NoteRef[];
  isLoading: boolean;
  isSaving: boolean;
  isDeleting: boolean;
  isRemovingTag: boolean;
  error: string | null;
  notFound: boolean;
  updateNote: (dto: UpdateNotaDto) => Promise<NotaDetail>;
  addBacklink: (destinoId: string) => Promise<void>;
  deleteNote: () => Promise<void>;
  removeTag: (etiquetaId: string) => Promise<void>;
  reloadBacklinks: () => Promise<void>;
};

export function useNote(id: string | undefined): UseNoteResult {
  const [note, setNote] = useState<NotaDetail | null>(null);
  const [salientes, setSalientes] = useState<NoteRef[]>([]);
  const [entrantes, setEntrantes] = useState<NoteRef[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isRemovingTag, setIsRemovingTag] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);

  const loadBacklinks = useCallback(async (noteId: string): Promise<void> => {
    const [outgoing, incoming] = await Promise.all([
      listBacklinksSalientes(noteId),
      listBacklinksEntrantes(noteId),
    ]);
    setSalientes(outgoing);
    setEntrantes(incoming);
  }, []);

  useEffect(() => {
    if (!id) {
      setNote(null);
      setSalientes([]);
      setEntrantes([]);
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
        const [outgoing, incoming] = await Promise.all([
          listBacklinksSalientes(id),
          listBacklinksEntrantes(id),
        ]);

        if (!cancelled) {
          setNote(data);
          setSalientes(outgoing);
          setEntrantes(incoming);
        }
      } catch (err) {
        if (!cancelled) {
          if (err instanceof ApiError && err.status === 404) {
            setNotFound(true);
            setNote(null);
            setSalientes([]);
            setEntrantes([]);
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

  const reloadBacklinks = useCallback(async (): Promise<void> => {
    if (!id) {
      return;
    }

    await loadBacklinks(id);
  }, [id, loadBacklinks]);

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

  const addBacklinkToNote = useCallback(
    async (destinoId: string): Promise<void> => {
      if (!id) {
        throw new Error("Identificador de nota inválido");
      }

      setError(null);

      try {
        await createBacklink(id, { destinoId });
        await loadBacklinks(id);
      } catch (err) {
        const message = err instanceof Error ? err.message : "Error al crear el enlace";
        setError(message);
        throw err;
      }
    },
    [id, loadBacklinks],
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
      setSalientes([]);
      setEntrantes([]);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error al eliminar la nota";
      setError(message);
      throw err;
    } finally {
      setIsDeleting(false);
    }
  }, [id]);

  const removeTag = useCallback(
    async (etiquetaId: string): Promise<void> => {
      if (!id || !note) {
        throw new Error("Identificador de nota inválido");
      }

      setIsRemovingTag(true);
      setError(null);

      try {
        await removeTagFromNota(id, etiquetaId);
        setNote({
          ...note,
          tags: note.tags.filter((tag) => tag.id !== etiquetaId),
        });
      } catch (err) {
        const message = err instanceof Error ? err.message : "Error al quitar la etiqueta";
        setError(message);
        throw err;
      } finally {
        setIsRemovingTag(false);
      }
    },
    [id, note],
  );

  return {
    note,
    salientes,
    entrantes,
    isLoading,
    isSaving,
    isDeleting,
    isRemovingTag,
    error,
    notFound,
    updateNote: saveNote,
    addBacklink: addBacklinkToNote,
    deleteNote: removeNote,
    removeTag,
    reloadBacklinks,
  };
}
