import { toResumen } from "../mappers/nota.mapper.js";
import { notaRepository, type NotaListRow } from "../repositories/nota.repository.js";
import type { NotaResumen } from "../schemas/nota.schema.js";
import type { SearchQuery } from "../schemas/search.schema.js";

function sortByRelevance(rows: NotaListRow[], term: string): NotaListRow[] {
  const needle = term.toLowerCase();

  return rows.slice().sort((left, right) => {
    const leftTitleMatch = left.title.toLowerCase().includes(needle);
    const rightTitleMatch = right.title.toLowerCase().includes(needle);

    if (leftTitleMatch !== rightTitleMatch) {
      return leftTitleMatch ? -1 : 1;
    }

    return right.updatedAt.getTime() - left.updatedAt.getTime();
  });
}

export const searchService = {
  async search(
    query: SearchQuery,
  ): Promise<{ data: NotaResumen[]; meta: { q: string; total: number } }> {
    const rows = await notaRepository.search(query.q, query.order);
    const ordered = query.order === "relevance" ? sortByRelevance(rows, query.q) : rows;
    const data = ordered.map(toResumen);

    return {
      data,
      meta: { q: query.q, total: data.length },
    };
  },
};
