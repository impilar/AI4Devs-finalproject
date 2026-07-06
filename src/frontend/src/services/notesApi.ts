import { apiDelete, apiGet, apiPost, apiPut } from "./apiClient";
import { registerTags } from "../utils/tagSuggestions.js";
import type {
  CreateNotaDto,
  CreateNotaResponse,
  ListEtiquetasResponse,
  ListNotasResponse,
  NotaDetail,
  NotaDetailResponse,
  NotaResumen,
  UpdateNotaDto,
  UpdateNotaResponse,
} from "../types/nota";

export async function listNotas(options?: { etiqueta?: string }): Promise<NotaResumen[]> {
  const query = options?.etiqueta
    ? `?etiqueta=${encodeURIComponent(options.etiqueta)}`
    : "";
  const response = await apiGet<ListNotasResponse>(`/notas${query}`);
  return response.data;
}

export async function listEtiquetas(): Promise<string[]> {
  const response = await apiGet<ListEtiquetasResponse>("/etiquetas");
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

export async function updateNota(id: string, dto: UpdateNotaDto): Promise<NotaDetail> {
  const response = await apiPut<UpdateNotaResponse>(`/notas/${id}`, dto);
  registerTags(response.data.tags);
  return response.data;
}

export async function deleteNota(id: string): Promise<void> {
  await apiDelete(`/notas/${id}`);
}
