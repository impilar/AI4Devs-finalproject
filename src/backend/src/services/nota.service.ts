import { notaRepository } from "../repositories/nota.repository.js";
import { toResumen } from "../mappers/nota.mapper.js";
import type { ListNotasQuery, NotaResumen } from "../schemas/nota.schema.js";

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
};
