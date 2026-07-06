import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { SearchOrderSelect } from "./SearchOrderSelect";

describe("SearchOrderSelect", () => {
  it("renders relevance and date options", () => {
    render(<SearchOrderSelect value="relevance" onChange={vi.fn()} />);

    expect(screen.getByRole("combobox", { name: "Ordenar resultados" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Relevancia" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Fecha" })).toBeInTheDocument();
  });

  it("calls onChange when the user selects a different order", () => {
    const onChange = vi.fn();

    render(<SearchOrderSelect value="relevance" onChange={onChange} />);

    fireEvent.change(screen.getByRole("combobox", { name: "Ordenar resultados" }), {
      target: { value: "date" },
    });

    expect(onChange).toHaveBeenCalledWith("date");
  });
});
