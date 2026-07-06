import { useEffect, useState } from "react";
import { searchNotas } from "../services/searchApi";
import type { NotaResumen, SearchOrder } from "../types/nota";

export const SEARCH_DEBOUNCE_MS = 300;

type UseSearchResult = {
  query: string;
  debouncedQuery: string;
  order: SearchOrder;
  results: NotaResumen[];
  isSearching: boolean;
  error: string | null;
  setQuery: (value: string) => void;
  setOrder: (order: SearchOrder) => void;
};

export function useSearch(): UseSearchResult {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [order, setOrder] = useState<SearchOrder>("relevance");
  const [results, setResults] = useState<NotaResumen[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedQuery(query.trim());
    }, SEARCH_DEBOUNCE_MS);

    return () => {
      window.clearTimeout(timer);
    };
  }, [query]);

  useEffect(() => {
    if (debouncedQuery.length === 0) {
      setResults([]);
      setIsSearching(false);
      setError(null);
      return;
    }

    let cancelled = false;

    async function runSearch(): Promise<void> {
      setIsSearching(true);
      setError(null);

      try {
        const data = await searchNotas(debouncedQuery, order);

        if (!cancelled) {
          setResults(data);
        }
      } catch (err) {
        if (!cancelled) {
          const message = err instanceof Error ? err.message : "Error al buscar notas";
          setError(message);
          setResults([]);
        }
      } finally {
        if (!cancelled) {
          setIsSearching(false);
        }
      }
    }

    void runSearch();

    return () => {
      cancelled = true;
    };
  }, [debouncedQuery, order]);

  return {
    query,
    debouncedQuery,
    order,
    results,
    isSearching,
    error,
    setQuery,
    setOrder,
  };
}
