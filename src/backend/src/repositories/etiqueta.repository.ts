import { prisma } from "../lib/prisma.js";

export type EtiquetaRow = {
  id: string;
  name: string;
};

export const etiquetaRepository = {
  async findAllNames(): Promise<string[]> {
    const rows = await prisma.etiqueta.findMany({
      select: { name: true },
      orderBy: { name: "asc" },
    });

    return rows.map((row) => row.name);
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
