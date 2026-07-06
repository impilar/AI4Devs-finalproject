import { describe, expect, it } from "vitest";
import { buildExcerpt } from "./excerpt.js";

describe("buildExcerpt", () => {
  it("returns trimmed content when within limit", () => {
    expect(buildExcerpt("  Hello   world  ")).toBe("Hello world");
  });

  it("truncates long content with ellipsis", () => {
    const longContent = "word ".repeat(40).trim();

    const result = buildExcerpt(longContent);

    expect(result.length).toBeLessThanOrEqual(121);
    expect(result.endsWith("…")).toBe(true);
  });
});
