import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { RelatedNoteList } from "./RelatedNoteList";

describe("RelatedNoteList", () => {
  it("renders MindVault-style related note rows", () => {
    render(
      <MemoryRouter>
        <RelatedNoteList
          title="Notas relacionadas"
          ariaLabel="Notas enlazadas"
          items={[
            {
              id: "22222222-2222-2222-2222-222222222202",
              title: "Referencias IA",
              updatedAt: "2026-06-28T10:00:00.000Z",
            },
          ]}
        />
      </MemoryRouter>,
    );

    expect(screen.getByRole("heading", { name: "Notas relacionadas" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Referencias IA/ })).toHaveAttribute(
      "href",
      "/notas/22222222-2222-2222-2222-222222222202",
    );
    expect(screen.getByText(/Hace|jun/i)).toBeInTheDocument();
  });
});
