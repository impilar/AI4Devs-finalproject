import { beforeEach, describe, expect, it, vi } from "vitest";
import { act, renderHook, waitFor } from "@testing-library/react";
import { useNote } from "./useNote";
import { getNota, updateNota, deleteNota } from "../services/notesApi";

vi.mock("../services/notesApi.js", () => ({
  getNota: vi.fn(),
  updateNota: vi.fn(),
  deleteNota: vi.fn(),
}));

const mockedGetNota = vi.mocked(getNota);
const mockedUpdateNota = vi.mocked(updateNota);
const mockedDeleteNota = vi.mocked(deleteNota);

const note = {
  id: "11111111-1111-1111-1111-111111111101",
  title: "Original",
  content: "Contenido",
  createdAt: "2026-06-12T10:00:00.000Z",
  updatedAt: "2026-06-12T10:00:00.000Z",
  links: [],
  tags: [],
};

describe("useNote", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockedGetNota.mockResolvedValue(note);
  });

  it("loads note by id", async () => {
    const { result } = renderHook(() => useNote(note.id));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.note).toEqual(note);
    expect(mockedGetNota).toHaveBeenCalledWith(note.id);
  });

  it("updateNote persists changes in local state", async () => {
    const updated = {
      ...note,
      title: "Actualizado",
      updatedAt: "2026-07-06T10:00:00.000Z",
    };
    mockedUpdateNota.mockResolvedValue(updated);

    const { result } = renderHook(() => useNote(note.id));

    await waitFor(() => {
      expect(result.current.note).toEqual(note);
    });

    await act(async () => {
      await result.current.updateNote({ title: "Actualizado" });
    });

    expect(mockedUpdateNota).toHaveBeenCalledWith(note.id, { title: "Actualizado" });
    expect(result.current.note).toEqual(updated);
    expect(result.current.isSaving).toBe(false);
  });

  it("deleteNote calls API", async () => {
    mockedDeleteNota.mockResolvedValue(undefined);

    const { result } = renderHook(() => useNote(note.id));

    await waitFor(() => {
      expect(result.current.note).toEqual(note);
    });

    await act(async () => {
      await result.current.deleteNote();
    });

    expect(mockedDeleteNota).toHaveBeenCalledWith(note.id);
    expect(result.current.note).toBeNull();
    expect(result.current.isDeleting).toBe(false);
  });
});
