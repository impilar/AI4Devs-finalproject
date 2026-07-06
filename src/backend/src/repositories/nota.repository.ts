import { prisma } from "../lib/prisma.js";

export type ListNotasParams = {
  etiqueta?: string;
  sort?: "created_at" | "title";
  order?: "asc" | "desc";
};

export type SearchOrder = "relevance" | "date";

export type NotaListRow = {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  etiquetas: { etiqueta: { id: string; name: string } }[];
};

export type NotaDetailRow = {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  enlaces: { url: string; createdAt: Date }[];
  etiquetas: { etiqueta: { id: string; name: string } }[];
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

function resolveWhere(filters: ListNotasParams): { etiquetas?: { some: { etiqueta: { name: string } } } } | undefined {
  if (!filters.etiqueta) {
    return undefined;
  }

  return {
    etiquetas: {
      some: {
        etiqueta: { name: filters.etiqueta },
      },
    },
  };
}

export const notaRepository = {
  async findAll(filters: ListNotasParams = {}): Promise<NotaListRow[]> {
    return prisma.nota.findMany({
      where: resolveWhere(filters),
      orderBy: resolveOrderBy(filters),
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
        updatedAt: true,
        etiquetas: {
          include: {
            etiqueta: true,
          },
        },
      },
    });
  },

  async search(term: string, order: SearchOrder = "relevance"): Promise<NotaListRow[]> {
    return prisma.nota.findMany({
      where: {
        OR: [
          { title: { contains: term, mode: "insensitive" } },
          { content: { contains: term, mode: "insensitive" } },
        ],
      },
      take: 50,
      ...(order === "date" ? { orderBy: { updatedAt: "desc" as const } } : {}),
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
        updatedAt: true,
        etiquetas: {
          include: {
            etiqueta: true,
          },
        },
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

  async createWithRelations(data: {
    title: string;
    content: string;
    links?: string[];
    etiquetaIds?: string[];
  }): Promise<NotaDetailRow> {
    const links = data.links ?? [];
    const etiquetaIds = data.etiquetaIds ?? [];

    return prisma.$transaction(async (tx) => {
      const nota = await tx.nota.create({
        data: {
          title: data.title,
          content: data.content,
        },
      });

      if (links.length > 0) {
        await tx.enlace.createMany({
          data: links.map((url) => ({
            notaId: nota.id,
            url,
          })),
        });
      }

      if (etiquetaIds.length > 0) {
        await tx.notaEtiqueta.createMany({
          data: etiquetaIds.map((etiquetaId) => ({
            notaId: nota.id,
            etiquetaId,
          })),
        });
      }

      return tx.nota.findUniqueOrThrow({
        where: { id: nota.id },
        include: {
          enlaces: {
            orderBy: { createdAt: "asc" },
          },
          etiquetas: {
            include: { etiqueta: true },
          },
        },
      });
    });
  },

  async updateWithRelations(
    id: string,
    data: {
      title?: string;
      content?: string;
      links?: string[];
      etiquetaIds?: string[];
    },
  ): Promise<NotaDetailRow | null> {
    const existing = await prisma.nota.findUnique({ where: { id } });

    if (!existing) {
      return null;
    }

    return prisma.$transaction(async (tx) => {
      await tx.nota.update({
        where: { id },
        data: {
          ...(data.title !== undefined ? { title: data.title } : {}),
          ...(data.content !== undefined ? { content: data.content } : {}),
        },
      });

      if (data.links !== undefined) {
        await tx.enlace.deleteMany({ where: { notaId: id } });

        if (data.links.length > 0) {
          await tx.enlace.createMany({
            data: data.links.map((url) => ({
              notaId: id,
              url,
            })),
          });
        }
      }

      if (data.etiquetaIds !== undefined) {
        await tx.notaEtiqueta.deleteMany({ where: { notaId: id } });

        if (data.etiquetaIds.length > 0) {
          await tx.notaEtiqueta.createMany({
            data: data.etiquetaIds.map((etiquetaId) => ({
              notaId: id,
              etiquetaId,
            })),
          });
        }
      }

      return tx.nota.findUniqueOrThrow({
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
    });
  },

  async delete(id: string): Promise<void> {
    await prisma.nota.delete({ where: { id } });
  },

  async deleteNotaEtiqueta(notaId: string, etiquetaId: string): Promise<boolean> {
    const result = await prisma.notaEtiqueta.deleteMany({
      where: { notaId, etiquetaId },
    });

    return result.count === 1;
  },
};
