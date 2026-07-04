import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { NoteForm } from "./NoteForm";
import { createNota } from "../../services/notesApi";

vi.mock("../../services/notesApi", () => ({
  createNota: vi.fn(),
}));

describe("NoteForm", () => {
  it("shows validation errors when title or content is empty", () => {
    render(
      <MemoryRouter>
        <NoteForm mode="create" />
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Guardar" }));

    expect(screen.getByText("El título es obligatorio")).toBeInTheDocument();
    expect(screen.getByText("El contenido es obligatorio")).toBeInTheDocument();
    expect(createNota).not.toHaveBeenCalled();
  });

  it("shows validation error when only whitespace is entered", () => {
    render(
      <MemoryRouter>
        <NoteForm mode="create" />
      </MemoryRouter>,
    );

    fireEvent.change(screen.getByLabelText("Título"), {
      target: { value: "   " },
    });
    fireEvent.change(screen.getByLabelText("Contenido"), {
      target: { value: "Contenido válido" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Guardar" }));

    expect(screen.getByText("El título es obligatorio")).toBeInTheDocument();
    expect(createNota).not.toHaveBeenCalled();
  });
});
