import { describe, expect, it } from "vitest";
import { normalizeTagNames } from "./etiqueta.service.js";

describe("normalizeTagNames", () => {
  it("trims and deduplicates tag names case-sensitively", () => {
    expect(normalizeTagNames([" ideas ", "ideas", "trabajo", "  ", "Trabajo"])).toEqual([
      "ideas",
      "trabajo",
      "Trabajo",
    ]);
  });

  it("returns empty array when all tags are blank", () => {
    expect(normalizeTagNames(["", "   "])).toEqual([]);
  });
});
