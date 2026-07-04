import { notaRepository } from "../repositories/nota.repository.js";
import { NotFoundError } from "../errors/NotFoundError.js";
import { toDetail, toResumen } from "../mappers/nota.mapper.js";
import type {
  CreateNotaDto,
  ListNotasQuery,
  NotaDetail,
  NotaResumen,
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
    const nota = await notaRepository.createWithRelations({
      title: dto.title,
      content: dto.content,
      links: dto.links,
    });

    return toDetail(nota);
  },
};
