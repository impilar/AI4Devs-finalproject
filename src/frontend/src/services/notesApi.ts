import { apiGet } from "./apiClient";
import type {
  ListNotasResponse,
  NotaDetail,
  NotaDetailResponse,
  NotaResumen,
} from "../types/nota";

export async function listNotas(): Promise<NotaResumen[]> {
  const response = await apiGet<ListNotasResponse>("/notas");
  return response.data;
}

export async function getNota(id: string): Promise<NotaDetail> {
  const response = await apiGet<NotaDetailResponse>(`/notas/${id}`);
  return response.data;
}
