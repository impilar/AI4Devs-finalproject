import { prisma } from "../lib/prisma.js";

export type EtiquetaRow = {
  id: string;
  name: string;
};

export type EtiquetaCatalogRow = EtiquetaRow & {
  count: number;
};

export const etiquetaRepository = {
  async findAllNames(): Promise<string[]> {
    const rows = await prisma.etiqueta.findMany({
      select: { name: true },
      orderBy: { name: "asc" },
    });

    return rows.map((row) => row.name);
  },

  async findAllWithCount(): Promise<EtiquetaCatalogRow[]> {
    const rows = await prisma.etiqueta.findMany({
      select: {
        id: true,
        name: true,
        _count: {
          select: { notas: true },
        },
      },
      orderBy: { name: "asc" },
    });

    return rows.map((row) => ({
      id: row.id,
      name: row.name,
      count: row._count.notas,
    }));
  },

  async upsertByName(name: string): Promise<EtiquetaRow> {
    return prisma.etiqueta.upsert({
      where: { name },
      create: { name },
      update: {},
      select: { id: true, name: true },
    });
  },

  async findByName(name: string): Promise<EtiquetaRow | null> {
    return prisma.etiqueta.findUnique({
      where: { name },
      select: { id: true, name: true },
    });
  },
};
