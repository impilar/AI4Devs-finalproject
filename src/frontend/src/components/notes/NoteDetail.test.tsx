import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { NoteDetail } from "./NoteDetail";
import type { NotaDetail } from "../../types/nota";

const mockNote: NotaDetail = {
  id: "11111111-1111-1111-1111-111111111101",
  title: "Ideas de proyecto",
  content: "Texto de la nota",
  createdAt: "2026-06-12T10:00:00.000Z",
  updatedAt: "2026-06-12T10:00:00.000Z",
  links: ["https://docs.example.com/mvp"],
  tags: ["ideas", "trabajo"],
};

describe("NoteDetail", () => {
  it("renders title, content, links, tags and updatedAt", () => {
    render(<NoteDetail note={mockNote} onEdit={() => undefined} onDelete={() => undefined} />);

    expect(screen.getByRole("heading", { level: 1, name: "Ideas de proyecto" })).toBeInTheDocument();
    expect(screen.getByText("Texto de la nota")).toBeInTheDocument();
    expect(screen.getByText(/Última actualización:/)).toBeInTheDocument();

    const link = screen.getByRole("link", { name: "https://docs.example.com/mvp" });
    expect(link).toHaveAttribute("href", "https://docs.example.com/mvp");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");

    expect(screen.getByText("ideas")).toBeInTheDocument();
    expect(screen.getByText("trabajo")).toBeInTheDocument();
  });

  it("calls onEdit when edit button is clicked", () => {
    const onEdit = vi.fn();
    render(<NoteDetail note={mockNote} onEdit={onEdit} onDelete={() => undefined} />);

    fireEvent.click(screen.getByRole("button", { name: "Editar" }));

    expect(onEdit).toHaveBeenCalledTimes(1);
  });

  it("calls onDelete when delete button is clicked", () => {
    const onDelete = vi.fn();
    render(<NoteDetail note={mockNote} onEdit={() => undefined} onDelete={onDelete} />);

    fireEvent.click(screen.getByRole("button", { name: "Eliminar" }));

    expect(onDelete).toHaveBeenCalledTimes(1);
  });

  it("hides links and tags sections when arrays are empty", () => {
    render(
      <NoteDetail
        note={{
          ...mockNote,
          links: [],
          tags: [],
        }}
        onEdit={() => undefined}
        onDelete={() => undefined}
      />,
    );

    expect(screen.queryByLabelText("Enlaces")).not.toBeInTheDocument();
    expect(screen.queryByLabelText("Etiquetas")).not.toBeInTheDocument();
  });
});
