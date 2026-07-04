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

export type NotaDetailRow = {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  enlaces: { url: string; createdAt: Date }[];
  etiquetas: { etiqueta: { name: string } }[];
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

  async findById(id: string): Promise<NotaDetailRow | null> {
    return prisma.nota.findUnique({
      where: { id },
      include: {
        enlaces: {
          orderBy: { createdAt: "asc" },
        },
        etiquetas: {
          include: { etiqueta: true },
        },
      },
    });
  },
};
