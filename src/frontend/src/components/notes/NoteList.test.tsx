import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import type { ComponentProps } from "react";
import { NoteList } from "./NoteList";
import type { NotaResumen } from "../../types/nota";

const mockNotes: NotaResumen[] = [
  {
    id: "11111111-1111-1111-1111-111111111101",
    title: "Ideas de proyecto",
    createdAt: "2026-06-12T10:00:00.000Z",
    updatedAt: "2026-06-12T10:00:00.000Z",
  },
  {
    id: "11111111-1111-1111-1111-111111111102",
    title: "Lista de la compra",
    createdAt: "2026-06-11T10:00:00.000Z",
    updatedAt: "2026-06-11T10:00:00.000Z",
  },
  {
    id: "11111111-1111-1111-1111-111111111103",
    title: "Referencias técnicas",
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
  it("shows loading state", () => {
    renderNoteList({ isLoading: true });

    expect(screen.getByText("Cargando notas…")).toBeInTheDocument();
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
    expect(screen.getByText("12 jun 2026")).toBeInTheDocument();
  });

  it("shows empty message when there are no notes", () => {
    renderNoteList({ notes: [] });

    expect(screen.getByText("No hay notas todavía.")).toBeInTheDocument();
  });
});
