import { describe, expect, it } from "vitest";
import { toDetail, toResumen } from "./nota.mapper.js";

describe("toResumen", () => {
  it("maps note fields to ISO date strings with excerpt and tags", () => {
    const createdAt = new Date("2026-06-12T10:00:00.000Z");
    const updatedAt = new Date("2026-06-12T11:30:00.000Z");

    const result = toResumen({
      id: "550e8400-e29b-41d4-a716-446655440000",
      title: "Ideas de proyecto",
      content: "Texto de la nota con suficiente contenido para el resumen.",
      createdAt,
      updatedAt,
      etiquetas: [
        { etiqueta: { id: "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbb01", name: "trabajo" } },
        { etiqueta: { id: "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbb02", name: "ideas" } },
      ],
    });

    expect(result).toEqual({
      id: "550e8400-e29b-41d4-a716-446655440000",
      title: "Ideas de proyecto",
      excerpt: "Texto de la nota con suficiente contenido para el resumen.",
      tags: ["ideas", "trabajo"],
      createdAt: "2026-06-12T10:00:00.000Z",
      updatedAt: "2026-06-12T11:30:00.000Z",
    });
  });

  it("truncates long content in excerpt", () => {
    const longContent = "a".repeat(150);

    const result = toResumen({
      id: "550e8400-e29b-41d4-a716-446655440000",
      title: "Long note",
      content: longContent,
      createdAt: new Date("2026-06-12T10:00:00.000Z"),
      updatedAt: new Date("2026-06-12T10:00:00.000Z"),
      etiquetas: [],
    });

    expect(result.excerpt).toHaveLength(121);
    expect(result.excerpt.endsWith("…")).toBe(true);
  });
});

describe("toDetail", () => {
  it("maps links by createdAt asc and tags alphabetically", () => {
    const createdAt = new Date("2026-06-12T10:00:00.000Z");
    const updatedAt = new Date("2026-06-12T11:30:00.000Z");

    const result = toDetail({
      id: "550e8400-e29b-41d4-a716-446655440000",
      title: "Ideas de proyecto",
      content: "Texto de la nota",
      createdAt,
      updatedAt,
      enlaces: [
        {
          url: "https://second.example.com",
          createdAt: new Date("2026-06-13T10:00:00.000Z"),
        },
        {
          url: "https://first.example.com",
          createdAt: new Date("2026-06-12T10:00:00.000Z"),
        },
      ],
      etiquetas: [
        { etiqueta: { id: "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbb01", name: "trabajo" } },
        { etiqueta: { id: "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbb02", name: "ideas" } },
      ],
    });

    expect(result).toEqual({
      id: "550e8400-e29b-41d4-a716-446655440000",
      title: "Ideas de proyecto",
      excerpt: "Texto de la nota",
      tags: [
        { id: "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbb02", name: "ideas" },
        { id: "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbb01", name: "trabajo" },
      ],
      content: "Texto de la nota",
      createdAt: "2026-06-12T10:00:00.000Z",
      updatedAt: "2026-06-12T11:30:00.000Z",
      links: ["https://first.example.com", "https://second.example.com"],
    });
  });
});
