import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { BacklinksPanel } from "./BacklinksPanel";

describe("BacklinksPanel", () => {
  it("renders incoming backlinks as router links", () => {
    render(
      <MemoryRouter>
        <BacklinksPanel
          items={[
            {
              id: "22222222-2222-2222-2222-222222222202",
              title: "Plan Q3",
              updatedAt: "2026-06-10T10:00:00.000Z",
            },
          ]}
        />
      </MemoryRouter>,
    );

    const link = screen.getByRole("link", { name: /Plan Q3/ });
    expect(link).toHaveAttribute("href", "/notas/22222222-2222-2222-2222-222222222202");
    expect(screen.getByRole("region", { name: "Notas que enlazan aquí" })).toBeInTheDocument();
  });

  it("renders nothing when there are no incoming backlinks", () => {
    const { container } = render(<BacklinksPanel items={[]} />);
    expect(container).toBeEmptyDOMElement();
  });
});
