import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { EmptyState } from "./EmptyState";

describe("EmptyState", () => {
  it("renders message and optional CTA link", () => {
    render(
      <MemoryRouter>
        <EmptyState
          message="Aún no hay notas."
          ctaLabel="Crear nota"
          ctaTo="/notas/nueva"
        />
      </MemoryRouter>,
    );

    expect(screen.getByText("Aún no hay notas.")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Crear nota" })).toHaveAttribute(
      "href",
      "/notas/nueva",
    );
    expect(screen.getByRole("presentation", { hidden: true })).toBeInTheDocument();
  });

  it("renders message only when CTA is omitted", () => {
    render(<EmptyState message="Sin resultados." />);

    expect(screen.getByText("Sin resultados.")).toBeInTheDocument();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });
});
