import { beforeEach, describe, expect, it, vi } from "vitest";
import { searchService } from "./search.service.js";
import { notaRepository } from "../repositories/nota.repository.js";

vi.mock("../repositories/nota.repository.js", () => ({
  notaRepository: {
    search: vi.fn(),
  },
}));

const mockedSearch = vi.mocked(notaRepository.search);

describe("searchService.search", () => {
  beforeEach(() => {
    mockedSearch.mockReset();
  });

  it("ranks title matches before content-only matches when order is relevance", async () => {
    const createdAt = new Date("2026-06-01T10:00:00.000Z");
    const updatedAt = new Date("2026-06-01T11:00:00.000Z");

    mockedSearch.mockResolvedValue([
      {
        id: "22222222-2222-2222-2222-222222222222",
        title: "Ideas varias",
        createdAt,
        updatedAt,
      },
      {
        id: "11111111-1111-1111-1111-111111111111",
        title: "Proyecto compra",
        createdAt,
        updatedAt,
      },
    ]);

    const result = await searchService.search({ q: "compra", order: "relevance" });

    expect(result.meta).toEqual({ q: "compra", total: 2 });
    expect(result.data.map((note) => note.title)).toEqual(["Proyecto compra", "Ideas varias"]);
  });

  it("returns at most the repository result count in meta.total", async () => {
    const timestamp = new Date("2026-06-01T10:00:00.000Z");

    mockedSearch.mockResolvedValue(
      Array.from({ length: 50 }, (_, index) => ({
        id: `00000000-0000-0000-0000-${String(index).padStart(12, "0")}`,
        title: `Nota ${index}`,
        createdAt: timestamp,
        updatedAt: timestamp,
      })),
    );

    const result = await searchService.search({ q: "nota", order: "relevance" });

    expect(result.data).toHaveLength(50);
    expect(result.meta.total).toBe(50);
  });

  it("delegates date ordering to the repository", async () => {
    const older = new Date("2026-06-01T10:00:00.000Z");
    const newer = new Date("2026-06-02T10:00:00.000Z");

    mockedSearch.mockResolvedValue([
      {
        id: "11111111-1111-1111-1111-111111111111",
        title: "Nota reciente",
        createdAt: newer,
        updatedAt: newer,
      },
      {
        id: "22222222-2222-2222-2222-222222222222",
        title: "Nota antigua",
        createdAt: older,
        updatedAt: older,
      },
    ]);

    const result = await searchService.search({ q: "nota", order: "date" });

    expect(mockedSearch).toHaveBeenCalledWith("nota", "date");
    expect(result.data.map((note) => note.title)).toEqual(["Nota reciente", "Nota antigua"]);
  });

  it("breaks relevance ties by updatedAt descending", async () => {
    const older = new Date("2026-06-01T10:00:00.000Z");
    const newer = new Date("2026-06-02T10:00:00.000Z");

    mockedSearch.mockResolvedValue([
      {
        id: "22222222-2222-2222-2222-222222222222",
        title: "Proyecto alpha",
        createdAt: older,
        updatedAt: older,
      },
      {
        id: "11111111-1111-1111-1111-111111111111",
        title: "Proyecto beta",
        createdAt: newer,
        updatedAt: newer,
      },
    ]);

    const result = await searchService.search({ q: "proyecto", order: "relevance" });

    expect(result.data.map((note) => note.title)).toEqual(["Proyecto beta", "Proyecto alpha"]);
  });
});
