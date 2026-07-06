import { prisma } from "../lib/prisma.js";

export type NoteRefRow = {
  id: string;
  title: string;
  updatedAt: string;
};

export type BacklinkCreateRow = {
  origenId: string;
  destinoId: string;
  destino: NoteRefRow;
};

function mapNoteRef(nota: { id: string; title: string; updatedAt: Date }): NoteRefRow {
  return {
    id: nota.id,
    title: nota.title,
    updatedAt: nota.updatedAt.toISOString(),
  };
}

export const backlinkRepository = {
  async create(origenId: string, destinoId: string): Promise<BacklinkCreateRow> {
    const row = await prisma.notaBacklink.create({
      data: { origenId, destinoId },
      include: {
        destino: {
          select: { id: true, title: true, updatedAt: true },
        },
      },
    });

    return {
      origenId: row.origenId,
      destinoId: row.destinoId,
      destino: mapNoteRef(row.destino),
    };
  },

  async exists(origenId: string, destinoId: string): Promise<boolean> {
    const row = await prisma.notaBacklink.findUnique({
      where: {
        origenId_destinoId: { origenId, destinoId },
      },
      select: { origenId: true },
    });

    return row !== null;
  },

  async findSalientes(origenId: string): Promise<NoteRefRow[]> {
    const rows = await prisma.notaBacklink.findMany({
      where: { origenId },
      select: {
        destino: {
          select: { id: true, title: true, updatedAt: true },
        },
      },
      orderBy: { destino: { title: "asc" } },
    });

    return rows.map((row) => mapNoteRef(row.destino));
  },

  async findEntrantes(destinoId: string): Promise<NoteRefRow[]> {
    const rows = await prisma.notaBacklink.findMany({
      where: { destinoId },
      select: {
        origen: {
          select: { id: true, title: true, updatedAt: true },
        },
      },
      orderBy: { origen: { title: "asc" } },
    });

    return rows.map((row) => mapNoteRef(row.origen));
  },
};
