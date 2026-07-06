import { describe, expect, it } from "vitest";
import { SearchQuerySchema } from "./search.schema.js";

describe("SearchQuerySchema", () => {
  it("accepts a valid search term with default order", () => {
    const result = SearchQuerySchema.safeParse({ q: "compra" });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual({ q: "compra", order: "relevance" });
    }
  });

  it("trims the search term", () => {
    const result = SearchQuerySchema.safeParse({ q: "  compra  " });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.q).toBe("compra");
    }
  });

  it("rejects empty search term with Spanish message", () => {
    const result = SearchQuerySchema.safeParse({ q: "   " });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe("El término de búsqueda es obligatorio");
    }
  });

  it("accepts order=date", () => {
    const result = SearchQuerySchema.safeParse({ q: "nota", order: "date" });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.order).toBe("date");
    }
  });
});
