import { describe, expect, it } from "vitest";
import { toResumen } from "./nota.mapper.js";

describe("toResumen", () => {
  it("maps note fields to ISO date strings", () => {
    const createdAt = new Date("2026-06-12T10:00:00.000Z");
    const updatedAt = new Date("2026-06-12T11:30:00.000Z");

    const result = toResumen({
      id: "550e8400-e29b-41d4-a716-446655440000",
      title: "Ideas de proyecto",
      createdAt,
      updatedAt,
    });

    expect(result).toEqual({
      id: "550e8400-e29b-41d4-a716-446655440000",
      title: "Ideas de proyecto",
      createdAt: "2026-06-12T10:00:00.000Z",
      updatedAt: "2026-06-12T11:30:00.000Z",
    });
  });
});
