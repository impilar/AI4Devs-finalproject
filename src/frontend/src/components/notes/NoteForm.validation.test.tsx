import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { NoteForm } from "./NoteForm";
import { createNota } from "../../services/notesApi";
import { ValidationApiError } from "../../services/apiClient";

vi.mock("../../services/notesApi", () => ({
  createNota: vi.fn(),
}));

describe("NoteForm validation (US-007)", () => {
  it("shows title error and preserves content when title is empty", () => {
    render(
      <MemoryRouter>
        <NoteForm mode="create" />
      </MemoryRouter>,
    );

    const content = "Contenido que no debe perderse";
    fireEvent.change(screen.getByLabelText("Contenido"), {
      target: { value: content },
    });
    fireEvent.click(screen.getByRole("button", { name: "Guardar" }));

    expect(screen.getByText("El título es obligatorio")).toBeInTheDocument();
    expect(screen.getByLabelText("Contenido")).toHaveValue(content);
    expect(createNota).not.toHaveBeenCalled();
  });

  it("maps server validation details without clearing entered values", async () => {
    vi.mocked(createNota).mockRejectedValueOnce(
      new ValidationApiError("Los datos enviados no son válidos", 400, {
        title: "El título no puede superar 500 caracteres",
      }),
    );

    render(
      <MemoryRouter>
        <NoteForm mode="create" />
      </MemoryRouter>,
    );

    const content = "Texto conservado tras error de servidor";
    const longTitle = "a".repeat(501);
    fireEvent.change(screen.getByLabelText("Contenido"), {
      target: { value: content },
    });
    fireEvent.change(screen.getByLabelText("Título"), {
      target: { value: longTitle },
    });
    fireEvent.click(screen.getByRole("button", { name: "Guardar" }));

    await waitFor(() => {
      expect(screen.getByText("El título no puede superar 500 caracteres")).toBeInTheDocument();
    });
    expect(screen.getByLabelText("Contenido")).toHaveValue(content);
    expect(screen.getByLabelText("Título")).toHaveValue(longTitle);
  });

  it("preserves content in edit mode when title validation fails", () => {
    const onSubmit = vi.fn();

    render(
      <MemoryRouter>
        <NoteForm
          mode="edit"
          initialValues={{
            title: "Título inicial",
            content: "Contenido inicial",
            links: [],
            tags: [],
          }}
          onSubmit={onSubmit}
          onCancel={vi.fn()}
        />
      </MemoryRouter>,
    );

    const revisedContent = "Contenido editado conservado";
    fireEvent.change(screen.getByLabelText("Título"), { target: { value: "   " } });
    fireEvent.change(screen.getByLabelText("Contenido"), {
      target: { value: revisedContent },
    });
    fireEvent.click(screen.getByRole("button", { name: "Guardar" }));

    expect(screen.getByText("El título es obligatorio")).toBeInTheDocument();
    expect(screen.getByLabelText("Contenido")).toHaveValue(revisedContent);
    expect(onSubmit).not.toHaveBeenCalled();
  });
});
