import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { NoteForm } from "./NoteForm";
import { createNota } from "../../services/notesApi";

vi.mock("../../services/notesApi", () => ({
  createNota: vi.fn(),
}));

describe("NoteForm links", () => {
  it("adds and removes link rows without losing other fields", () => {
    render(
      <MemoryRouter>
        <NoteForm mode="create" />
      </MemoryRouter>,
    );

    fireEvent.change(screen.getByLabelText("Título"), {
      target: { value: "Mi nota" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Añadir enlace" }));

    const linkInput = screen.getByLabelText("Enlace 1");
    fireEvent.change(linkInput, {
      target: { value: "https://example.com" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Eliminar enlace 1" }));

    expect(screen.queryByLabelText("Enlace 1")).not.toBeInTheDocument();
    expect(screen.getByLabelText("Título")).toHaveValue("Mi nota");
  });

  it("shows inline error for invalid URL and blocks submit", () => {
    render(
      <MemoryRouter>
        <NoteForm mode="create" />
      </MemoryRouter>,
    );

    fireEvent.change(screen.getByLabelText("Título"), {
      target: { value: "Título válido" },
    });
    fireEvent.change(screen.getByLabelText("Contenido"), {
      target: { value: "Contenido válido" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Añadir enlace" }));
    fireEvent.change(screen.getByLabelText("Enlace 1"), {
      target: { value: "no-es-url" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Guardar" }));

    expect(screen.getByText("La URL no es válida")).toBeInTheDocument();
    expect(createNota).not.toHaveBeenCalled();
  });

  it("submits sanitized links when URLs are valid", async () => {
    vi.mocked(createNota).mockResolvedValueOnce({
      id: "11111111-1111-1111-1111-111111111101",
      title: "Título válido",
      content: "Contenido válido",
      createdAt: "2026-07-04T12:00:00.000Z",
      updatedAt: "2026-07-04T12:00:00.000Z",
      links: ["https://example.com", "https://docs.example.com"],
      tags: [],
    });

    render(
      <MemoryRouter>
        <NoteForm mode="create" />
      </MemoryRouter>,
    );

    fireEvent.change(screen.getByLabelText("Título"), {
      target: { value: "Título válido" },
    });
    fireEvent.change(screen.getByLabelText("Contenido"), {
      target: { value: "Contenido válido" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Añadir enlace" }));
    fireEvent.change(screen.getByLabelText("Enlace 1"), {
      target: { value: "https://example.com" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Añadir enlace" }));
    fireEvent.change(screen.getByLabelText("Enlace 2"), {
      target: { value: "https://docs.example.com" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Guardar" }));

    expect(createNota).toHaveBeenCalledWith({
      title: "Título válido",
      content: "Contenido válido",
      links: ["https://example.com", "https://docs.example.com"],
    });
  });

  it("allows submit with zero links", async () => {
    vi.mocked(createNota).mockResolvedValueOnce({
      id: "11111111-1111-1111-1111-111111111101",
      title: "Sin enlaces",
      content: "Contenido",
      createdAt: "2026-07-04T12:00:00.000Z",
      updatedAt: "2026-07-04T12:00:00.000Z",
      links: [],
      tags: [],
    });

    render(
      <MemoryRouter>
        <NoteForm mode="create" />
      </MemoryRouter>,
    );

    fireEvent.change(screen.getByLabelText("Título"), {
      target: { value: "Sin enlaces" },
    });
    fireEvent.change(screen.getByLabelText("Contenido"), {
      target: { value: "Contenido" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Guardar" }));

    expect(createNota).toHaveBeenCalledWith({
      title: "Sin enlaces",
      content: "Contenido",
      links: [],
    });
  });
});
