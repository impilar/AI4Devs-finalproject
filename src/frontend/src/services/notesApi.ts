import { apiGet, apiPost } from "./apiClient";
import { registerTags } from "../utils/tagSuggestions.js";
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
  registerTags(response.data.tags);
  return response.data;
}

export async function createNota(dto: CreateNotaDto): Promise<NotaDetail> {
  const response = await apiPost<CreateNotaResponse>("/notas", dto);
  registerTags(response.data.tags);
  return response.data;
}
