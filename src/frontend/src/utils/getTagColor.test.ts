import { describe, expect, it } from "vitest";
import { getTagColor } from "./getTagColor";

describe("getTagColor", () => {
  it("returns a stable color for the same tag", () => {
    expect(getTagColor("trabajo")).toBe(getTagColor("trabajo"));
  });

  it("returns a color from the palette", () => {
    const color = getTagColor("ideas");
    expect(color).toMatch(/^#[0-9A-F]{6}$/i);
  });
});
