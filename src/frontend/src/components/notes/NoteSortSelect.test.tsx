import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { NoteSortSelect } from "./NoteSortSelect";

describe("NoteSortSelect", () => {
  it("renders sort options and calls onChange", () => {
    const onChange = vi.fn();

    render(<NoteSortSelect value="created_at_desc" onChange={onChange} />);

    const select = screen.getByTestId("note-sort-select");
    fireEvent.change(select, { target: { value: "title_asc" } });

    expect(onChange).toHaveBeenCalledWith("title_asc");
  });
});
