import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import type { ComponentProps } from "react";
import { NoteList } from "./NoteList";
import type { NotaResumen } from "../../types/nota";

const mockNotes: NotaResumen[] = [
  {
    id: "11111111-1111-1111-1111-111111111101",
    title: "Ideas de proyecto",
    excerpt: "Resumen de ideas para el proyecto.",
    tags: ["ideas"],
    createdAt: "2026-06-12T10:00:00.000Z",
    updatedAt: "2026-06-12T10:00:00.000Z",
  },
  {
    id: "11111111-1111-1111-1111-111111111102",
    title: "Lista de la compra",
    excerpt: "Leche, pan y café.",
    tags: [],
    createdAt: "2026-06-11T10:00:00.000Z",
    updatedAt: "2026-06-11T10:00:00.000Z",
  },
  {
    id: "11111111-1111-1111-1111-111111111103",
    title: "Referencias técnicas",
    excerpt: "Enlaces y documentación útil.",
    tags: ["trabajo"],
    createdAt: "2026-06-10T10:00:00.000Z",
    updatedAt: "2026-06-10T10:00:00.000Z",
  },
];

function renderNoteList(props: Partial<ComponentProps<typeof NoteList>> = {}) {
  return render(
    <MemoryRouter>
      <NoteList
        notes={[]}
        isLoading={false}
        error={null}
        {...props}
      />
    </MemoryRouter>,
  );
}

describe("NoteList", () => {
  it("shows loading skeleton", () => {
    const { container } = renderNoteList({ isLoading: true });

    expect(container.querySelector(".skeleton-note-list")).toBeInTheDocument();
  });

  it("shows error message", () => {
    renderNoteList({ error: "Network error" });

    expect(screen.getByRole("alert")).toHaveTextContent("Network error");
  });

  it("renders three notes with title and formatted date", () => {
    renderNoteList({ notes: mockNotes });

    expect(screen.getByLabelText("Listado de notas")).toBeInTheDocument();
    expect(screen.getByText("Ideas de proyecto")).toBeInTheDocument();
    expect(screen.getByText("Lista de la compra")).toBeInTheDocument();
    expect(screen.getByText("Referencias técnicas")).toBeInTheDocument();
    expect(screen.getByLabelText("Listado de notas").querySelector('time[datetime="2026-06-12T10:00:00.000Z"]')).toBeTruthy();
  });

  it("shows library empty state when there are no notes", () => {
    renderNoteList({ notes: [] });

    expect(screen.getByText("Aún no hay notas.")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Crear nota" })).toHaveAttribute("href", "/notas/nueva");
  });


  it("shows tag filter empty state when activeTag is set", () => {
    renderNoteList({ notes: [], activeTag: "archivo" });

    expect(screen.getByText(/No hay notas con la etiqueta «archivo»/)).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Crear nota" })).not.toBeInTheDocument();
  });
});
