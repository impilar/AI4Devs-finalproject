import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { NoteDetailPage } from "./NoteDetailPage";

const note = {
  id: "11111111-1111-1111-1111-111111111101",
  title: "Nota de prueba",
  content: "Contenido de prueba",
  createdAt: "2026-07-04T12:00:00.000Z",
  updatedAt: "2026-07-04T12:00:00.000Z",
  links: [],
  tags: [{ id: "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbb01", name: "ideas" }],
};

vi.mock("../hooks/useNote", () => ({
  useNote: () => ({
    note,
    salientes: [],
    entrantes: [],
    isLoading: false,
    isSaving: false,
    isDeleting: false,
    isRemovingTag: false,
    error: null,
    notFound: false,
    updateNote: vi.fn(),
    addBacklink: vi.fn(),
    deleteNote: vi.fn(),
    removeTag: vi.fn(),
    reloadBacklinks: vi.fn(),
  }),
}));

vi.mock("../services/notesApi", () => ({
  listNotas: vi.fn().mockResolvedValue([]),
}));

describe("NoteDetailPage editorial edit", () => {
  it("wraps edit mode with editorial page class for MindVault form styling", () => {
    const { container } = render(
      <MemoryRouter initialEntries={["/notas/11111111-1111-1111-1111-111111111101"]}>
        <Routes>
          <Route path="/notas/:id" element={<NoteDetailPage />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(container.querySelector(".note-detail-page")).not.toHaveClass(
      "note-detail-page--editorial",
    );

    fireEvent.click(screen.getByRole("button", { name: "Editar" }));

    expect(container.querySelector(".note-detail-page")).toHaveClass(
      "note-detail-page--editorial",
    );
    expect(container.querySelector(".note-form--editorial")).toBeInTheDocument();
  });
});
