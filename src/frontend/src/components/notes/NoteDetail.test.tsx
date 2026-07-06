import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { NoteDetail } from "./NoteDetail";
import type { NotaDetail } from "../../types/nota";

const mockNote: NotaDetail = {
  id: "11111111-1111-1111-1111-111111111101",
  title: "Ideas de proyecto",
  excerpt: "Texto de la nota",
  tags: [
    { id: "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbb01", name: "ideas" },
    { id: "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbb02", name: "trabajo" },
  ],
  content: "Texto de la nota",
  createdAt: "2026-06-12T10:00:00.000Z",
  updatedAt: "2026-06-12T10:00:00.000Z",
  links: ["https://docs.example.com/mvp"],
};

function renderNoteDetail(overrides?: Partial<Parameters<typeof NoteDetail>[0]>) {
  const onEdit = vi.fn();
  const onDelete = vi.fn();
  const onRemoveTag = vi.fn();

  render(
    <NoteDetail
      note={mockNote}
      salientes={[]}
      entrantes={[]}
      onEdit={onEdit}
      onDelete={onDelete}
      onRemoveTag={onRemoveTag}
      {...overrides}
    />,
  );

  return { onEdit, onDelete, onRemoveTag };
}

describe("NoteDetail", () => {
  it("renders title, content, links, tags and updatedAt", () => {
    renderNoteDetail();

    expect(screen.getByRole("heading", { level: 1, name: "Ideas de proyecto" })).toBeInTheDocument();
    expect(screen.getByText("Texto de la nota")).toBeInTheDocument();
    expect(screen.getByText(/Hace|Ayer|jun/i)).toBeInTheDocument();

    const link = screen.getByRole("link", { name: "https://docs.example.com/mvp" });
    expect(link).toHaveAttribute("href", "https://docs.example.com/mvp");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");

    expect(screen.getByText("ideas")).toBeInTheDocument();
    expect(screen.getByText("trabajo")).toBeInTheDocument();
  });

  it("calls onEdit when edit button is clicked", () => {
    const { onEdit } = renderNoteDetail();

    fireEvent.click(screen.getByRole("button", { name: "Editar" }));

    expect(onEdit).toHaveBeenCalledTimes(1);
  });

  it("calls onDelete when delete button is clicked", () => {
    const { onDelete } = renderNoteDetail();

    fireEvent.click(screen.getByRole("button", { name: "Eliminar" }));

    expect(onDelete).toHaveBeenCalledTimes(1);
  });

  it("calls onRemoveTag when a tag remove button is clicked", () => {
    const { onRemoveTag } = renderNoteDetail();

    fireEvent.click(screen.getByRole("button", { name: "Quitar etiqueta trabajo" }));

    expect(onRemoveTag).toHaveBeenCalledWith("bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbb02");
  });

  it("hides links and tags sections when arrays are empty", () => {
    render(
      <NoteDetail
        note={{
          ...mockNote,
          links: [],
          tags: [],
        }}
        salientes={[]}
        entrantes={[]}
        onEdit={() => undefined}
        onDelete={() => undefined}
        onRemoveTag={() => undefined}
      />,
    );

    expect(screen.queryByLabelText("Enlaces externos")).not.toBeInTheDocument();
    expect(screen.queryByLabelText("Etiquetas")).not.toBeInTheDocument();
  });
});
