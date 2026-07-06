import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { highlightText } from "./highlightText";

describe("highlightText", () => {
  it("returns original text when query is empty", () => {
    expect(highlightText("Hello world", "")).toBe("Hello world");
  });

  it("wraps matching substring in mark element", () => {
    render(<span>{highlightText("Lista semanal", "semanal")}</span>);

    expect(screen.getByText("semanal").tagName).toBe("MARK");
  });
});
