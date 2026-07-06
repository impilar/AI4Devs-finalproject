import { notaRepository } from "../repositories/nota.repository.js";
import { NotFoundError } from "../errors/NotFoundError.js";
import { etiquetaService } from "./etiqueta.service.js";
import { toDetail, toResumen } from "../mappers/nota.mapper.js";
import type {
  CreateNotaDto,
  ListNotasQuery,
  NotaDetail,
  NotaResumen,
  UpdateNotaDto,
} from "../schemas/nota.schema.js";

export const notaService = {
  async list(
    params: ListNotasQuery,
  ): Promise<{ data: NotaResumen[]; meta: { total: number } }> {
    const rows = await notaRepository.findAll(params);
    const data = rows.map(toResumen);

    return {
      data,
      meta: { total: data.length },
    };
  },

  async getById(id: string): Promise<NotaDetail> {
    const nota = await notaRepository.findById(id);

    if (!nota) {
      throw new NotFoundError();
    }

    return toDetail(nota);
  },

  async create(dto: CreateNotaDto): Promise<NotaDetail> {
    const tagMap = await etiquetaService.upsertByNames(dto.tags);
    const nota = await notaRepository.createWithRelations({
      title: dto.title,
      content: dto.content,
      links: dto.links,
      etiquetaIds: [...tagMap.values()],
    });

    return toDetail(nota);
  },

  async update(id: string, dto: UpdateNotaDto): Promise<NotaDetail> {
    let etiquetaIds: string[] | undefined;

    if (dto.tags !== undefined) {
      const tagMap = await etiquetaService.upsertByNames(dto.tags);
      etiquetaIds = [...tagMap.values()];
    }

    const nota = await notaRepository.updateWithRelations(id, {
      title: dto.title,
      content: dto.content,
      links: dto.links,
      etiquetaIds,
    });

    if (!nota) {
      throw new NotFoundError();
    }

    return toDetail(nota);
  },

  async delete(id: string): Promise<void> {
    const nota = await notaRepository.findById(id);

    if (!nota) {
      throw new NotFoundError();
    }

    await notaRepository.delete(id);
  },
};
