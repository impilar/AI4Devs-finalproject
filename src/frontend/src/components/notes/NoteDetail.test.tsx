import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
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
  it("renders title, content, links and tags", () => {
    render(<NoteDetail note={mockNote} />);

    expect(screen.getByRole("heading", { level: 1, name: "Ideas de proyecto" })).toBeInTheDocument();
    expect(screen.getByText("Texto de la nota")).toBeInTheDocument();

    const link = screen.getByRole("link", { name: "https://docs.example.com/mvp" });
    expect(link).toHaveAttribute("href", "https://docs.example.com/mvp");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");

    expect(screen.getByText("ideas")).toBeInTheDocument();
    expect(screen.getByText("trabajo")).toBeInTheDocument();
  });

  it("hides links and tags sections when arrays are empty", () => {
    render(
      <NoteDetail
        note={{
          ...mockNote,
          links: [],
          tags: [],
        }}
      />,
    );

    expect(screen.queryByLabelText("Enlaces")).not.toBeInTheDocument();
    expect(screen.queryByLabelText("Etiquetas")).not.toBeInTheDocument();
  });
});
