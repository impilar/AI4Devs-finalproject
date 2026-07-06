import { describe, expect, it } from "vitest";
import { CreateNotaDtoSchema, ListNotasQuerySchema, UpdateNotaDtoSchema } from "./nota.schema.js";

describe("CreateNotaDtoSchema", () => {
  it("accepts valid title and content", () => {
    const result = CreateNotaDtoSchema.safeParse({
      title: "Nueva idea",
      content: "Contenido de la nota",
    });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual({
        title: "Nueva idea",
        content: "Contenido de la nota",
        links: [],
        tags: [],
      });
    }
  });

  it("rejects empty title with Spanish message", () => {
    const result = CreateNotaDtoSchema.safeParse({
      title: "   ",
      content: "Contenido válido",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe("El título es obligatorio");
    }
  });

  it("rejects empty content with Spanish message", () => {
    const result = CreateNotaDtoSchema.safeParse({
      title: "Título válido",
      content: "",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe("El contenido es obligatorio");
    }
  });

  it("rejects title longer than 500 characters", () => {
    const result = CreateNotaDtoSchema.safeParse({
      title: "a".repeat(501),
      content: "Contenido válido",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe(
        "El título no puede superar 500 caracteres",
      );
    }
  });

  it("accepts valid links array", () => {
    const result = CreateNotaDtoSchema.safeParse({
      title: "Título válido",
      content: "Contenido válido",
      links: ["https://example.com", "https://docs.example.com"],
    });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.links).toEqual([
        "https://example.com",
        "https://docs.example.com",
      ]);
    }
  });

  it("rejects invalid link URL with Spanish message and path", () => {
    const result = CreateNotaDtoSchema.safeParse({
      title: "Título válido",
      content: "Contenido válido",
      links: ["no-es-url"],
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.path).toEqual(["links", 0]);
      expect(result.error.issues[0]?.message).toBe("URL con formato inválido");
    }
  });
});

describe("UpdateNotaDtoSchema", () => {
  it("accepts partial update with at least one field", () => {
    const result = UpdateNotaDtoSchema.safeParse({ title: "Solo título" });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual({ title: "Solo título" });
    }
  });

  it("rejects empty body", () => {
    const result = UpdateNotaDtoSchema.safeParse({});

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe(
        "Debe enviar al menos un campo para actualizar",
      );
    }
  });

  it("rejects empty title with Spanish message", () => {
    const result = UpdateNotaDtoSchema.safeParse({ title: "   " });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe("El título es obligatorio");
    }
  });

  it("rejects empty content with Spanish message", () => {
    const result = UpdateNotaDtoSchema.safeParse({ content: "" });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe("El contenido es obligatorio");
    }
  });
});

describe("ListNotasQuerySchema", () => {
  it("defaults sort to created_at and order to desc", () => {
    const result = ListNotasQuerySchema.safeParse({});

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual({
        sort: "created_at",
        order: "desc",
      });
    }
  });

  it("accepts title ascending sort", () => {
    const result = ListNotasQuerySchema.safeParse({ sort: "title", order: "asc" });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.sort).toBe("title");
      expect(result.data.order).toBe("asc");
    }
  });

  it("rejects invalid sort values", () => {
    const result = ListNotasQuerySchema.safeParse({ sort: "invalid" });

    expect(result.success).toBe(false);
  });
});
