import { apiGet } from "./apiClient";
import type { NotaResumen, SearchOrder, SearchResponse } from "../types/nota";

export async function searchNotas(
  q: string,
  order: SearchOrder = "relevance",
): Promise<NotaResumen[]> {
  const params = new URLSearchParams({ q, order });
  const response = await apiGet<SearchResponse>(`/buscar?${params.toString()}`);
  return response.data;
}
