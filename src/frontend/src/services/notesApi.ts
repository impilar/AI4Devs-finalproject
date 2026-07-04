import { apiGet, apiPost } from "./apiClient";
import type {
  CreateNotaDto,
  CreateNotaResponse,
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

export async function createNota(dto: CreateNotaDto): Promise<NotaDetail> {
  const response = await apiPost<CreateNotaResponse>("/notas", dto);
  return response.data;
}
