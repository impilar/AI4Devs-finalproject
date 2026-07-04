import { prisma } from "../lib/prisma.js";

export type ListNotasParams = {
  etiqueta?: string;
  sort?: "created_at" | "title";
  order?: "asc" | "desc";
};

export type NotaListRow = {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
};

function resolveOrderBy(filters: ListNotasParams): {
  createdAt?: "asc" | "desc";
  title?: "asc" | "desc";
} {
  const sort = filters.sort ?? "created_at";
  const order = filters.order ?? "desc";

  if (sort === "title") {
    return { title: order };
  }

  return { createdAt: order };
}

export const notaRepository = {
  async findAll(filters: ListNotasParams = {}): Promise<NotaListRow[]> {
    return prisma.nota.findMany({
      orderBy: resolveOrderBy(filters),
      select: {
        id: true,
        title: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  },
};
