import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { SEARCH_DEBOUNCE_MS, useSearch } from "./useSearch";
import { searchNotas } from "../services/searchApi";

vi.mock("../services/searchApi.js", () => ({
  searchNotas: vi.fn(),
}));

const mockedSearchNotas = vi.mocked(searchNotas);

async function flushDebounceAndSearch(): Promise<void> {
  await act(async () => {
    vi.advanceTimersByTime(SEARCH_DEBOUNCE_MS);
    await Promise.resolve();
    await Promise.resolve();
  });
}

describe("useSearch", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    mockedSearchNotas.mockReset();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("debounces search requests by 300 ms", async () => {
    mockedSearchNotas.mockResolvedValue([]);

    const { result } = renderHook(() => useSearch());

    act(() => {
      result.current.setQuery("compra");
    });

    expect(mockedSearchNotas).not.toHaveBeenCalled();

    await act(async () => {
      vi.advanceTimersByTime(SEARCH_DEBOUNCE_MS - 1);
    });

    expect(mockedSearchNotas).not.toHaveBeenCalled();

    await flushDebounceAndSearch();

    expect(mockedSearchNotas).toHaveBeenCalledWith("compra", "relevance");
  });

  it("does not search when the query is empty after debounce", async () => {
    const { result } = renderHook(() => useSearch());

    act(() => {
      result.current.setQuery("   ");
    });

    await flushDebounceAndSearch();

    expect(mockedSearchNotas).not.toHaveBeenCalled();
    expect(result.current.results).toEqual([]);
    expect(result.current.isSearching).toBe(false);
  });

  it("stores search results and clears them when query is emptied", async () => {
    mockedSearchNotas.mockResolvedValue([
      {
        id: "11111111-1111-1111-1111-111111111111",
        title: "Lista de la compra",
        excerpt: "Compra semanal",
        tags: [],
        createdAt: "2026-06-12T10:00:00.000Z",
        updatedAt: "2026-06-12T11:00:00.000Z",
      },
    ]);

    const { result } = renderHook(() => useSearch());

    act(() => {
      result.current.setQuery("compra");
    });

    await flushDebounceAndSearch();

    expect(result.current.results).toHaveLength(1);

    act(() => {
      result.current.setQuery("");
    });

    await flushDebounceAndSearch();

    expect(result.current.results).toEqual([]);
    expect(result.current.debouncedQuery).toBe("");
  });

  it("exposes an error message when the search request fails", async () => {
    mockedSearchNotas.mockRejectedValue(new Error("Error al buscar notas"));

    const { result } = renderHook(() => useSearch());

    act(() => {
      result.current.setQuery("compra");
    });

    await flushDebounceAndSearch();

    expect(result.current.error).toBe("Error al buscar notas");
    expect(result.current.results).toEqual([]);
    expect(result.current.isSearching).toBe(false);
  });

  it("re-fetches immediately when order changes without waiting for debounce", async () => {
    mockedSearchNotas.mockResolvedValue([]);

    const { result } = renderHook(() => useSearch());

    act(() => {
      result.current.setQuery("nota");
    });

    await flushDebounceAndSearch();

    expect(mockedSearchNotas).toHaveBeenCalledWith("nota", "relevance");
    mockedSearchNotas.mockClear();

    await act(async () => {
      result.current.setOrder("date");
      await Promise.resolve();
      await Promise.resolve();
    });

    expect(mockedSearchNotas).toHaveBeenCalledWith("nota", "date");
  });
});
