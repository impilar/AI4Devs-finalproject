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

import type { NoteListOrder, NoteListSort } from "../types/nota";

export async function listNotas(options?: {
  etiqueta?: string;
  sort?: NoteListSort;
  order?: NoteListOrder;
}): Promise<NotaResumen[]> {
  const params = new URLSearchParams();
  if (options?.etiqueta) {
    params.set("etiqueta", options.etiqueta);
  }
  if (options?.sort) {
    params.set("sort", options.sort);
  }
  if (options?.order) {
    params.set("order", options.order);
  }
  const query = params.toString() ? `?${params.toString()}` : "";
  const response = await apiGet<ListNotasResponse>(`/notas${query}`);
  return response.data;
}

export async function listEtiquetas(): Promise<string[]> {
  const response = await apiGet<ListEtiquetasResponse>("/etiquetas");
  return response.data;
}

export async function getNota(id: string): Promise<NotaDetail> {
  const response = await apiGet<NotaDetailResponse>(`/notas/${id}`);
  registerTags(response.data.tags.map((tag) => tag.name));
  return response.data;
}

export async function createNota(dto: CreateNotaDto): Promise<NotaDetail> {
  const response = await apiPost<CreateNotaResponse>("/notas", dto);
  registerTags(response.data.tags.map((tag) => tag.name));
  return response.data;
}

export async function updateNota(id: string, dto: UpdateNotaDto): Promise<NotaDetail> {
  const response = await apiPut<UpdateNotaResponse>(`/notas/${id}`, dto);
  registerTags(response.data.tags.map((tag) => tag.name));
  return response.data;
}

export async function deleteNota(id: string): Promise<void> {
  await apiDelete(`/notas/${id}`);
}

export async function removeTagFromNota(notaId: string, etiquetaId: string): Promise<void> {
  await apiDelete(`/notas/${notaId}/etiquetas/${etiquetaId}`);
}
