import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { SearchEmptyState } from "./SearchEmptyState";

describe("SearchEmptyState", () => {
  it("renders Gherkin copy with the search term", () => {
    render(<SearchEmptyState searchTerm="xyzabc" />);

    expect(screen.getByRole("status")).toHaveTextContent("Sin resultados para xyzabc");
  });
});
