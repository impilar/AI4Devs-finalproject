import { apiGet } from "./apiClient";
import type { ListNotasResponse, NotaResumen } from "../types/nota";

export async function listNotas(): Promise<NotaResumen[]> {
  const response = await apiGet<ListNotasResponse>("/notas");
  return response.data;
}
