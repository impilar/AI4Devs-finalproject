import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { SearchBar } from "./SearchBar";

describe("SearchBar", () => {
  it("renders the search input with placeholder", () => {
    render(<SearchBar value="" onChange={vi.fn()} />);

    expect(screen.getByRole("searchbox", { name: "Buscar notas" })).toHaveAttribute(
      "placeholder",
      "Buscar notas…",
    );
  });

  it("calls onChange when the user types", () => {
    const onChange = vi.fn();

    render(<SearchBar value="" onChange={onChange} />);

    fireEvent.change(screen.getByRole("searchbox", { name: "Buscar notas" }), {
      target: { value: "compra" },
    });

    expect(onChange).toHaveBeenCalledWith("compra");
  });

  it("renders the order selector when enabled", () => {
    render(
      <SearchBar
        value="compra"
        onChange={vi.fn()}
        order="relevance"
        onOrderChange={vi.fn()}
        showOrderSelect
      />,
    );

    expect(screen.getByRole("combobox", { name: "Ordenar resultados" })).toBeInTheDocument();
  });
});
