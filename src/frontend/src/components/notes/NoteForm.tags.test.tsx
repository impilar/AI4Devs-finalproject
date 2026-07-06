import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { NoteForm } from "./NoteForm";
import { createNota } from "../../services/notesApi";

vi.mock("../../services/notesApi", () => ({
  createNota: vi.fn(),
}));

describe("NoteForm tags", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("submits tags added via TagInput", async () => {
    vi.mocked(createNota).mockResolvedValueOnce({
      id: "11111111-1111-1111-1111-111111111101",
      title: "Con etiquetas",
      content: "Contenido",
      createdAt: "2026-07-04T12:00:00.000Z",
      updatedAt: "2026-07-04T12:00:00.000Z",
      links: [],
      tags: ["react", "mvp"],
    });

    render(
      <MemoryRouter>
        <NoteForm mode="create" tagSuggestions={["react", "typescript"]} />
      </MemoryRouter>,
    );

    fireEvent.change(screen.getByLabelText("Título"), {
      target: { value: "Con etiquetas" },
    });
    fireEvent.change(screen.getByLabelText("Contenido"), {
      target: { value: "Contenido" },
    });

    const tagInput = screen.getByLabelText("Etiquetas (opcional)");
    fireEvent.change(tagInput, { target: { value: "react" } });
    fireEvent.keyDown(tagInput, { key: "Enter" });
    fireEvent.change(tagInput, { target: { value: "mvp" } });
    fireEvent.keyDown(tagInput, { key: "Enter" });

    fireEvent.click(screen.getByRole("button", { name: "Guardar" }));

    expect(createNota).toHaveBeenCalledWith({
      title: "Con etiquetas",
      content: "Contenido",
      links: [],
      tags: ["react", "mvp"],
    });
  });
});
