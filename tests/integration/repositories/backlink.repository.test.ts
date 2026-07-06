import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { prisma } from "../../../src/backend/src/lib/prisma.js";
import { backlinkRepository } from "../../../src/backend/src/repositories/backlink.repository.js";

const hasDatabase = Boolean(process.env.DATABASE_URL);

describe.skipIf(!hasDatabase)("backlink repository (US-017)", () => {
  beforeAll(async () => {
    await prisma.$connect();
  });

  beforeEach(async () => {
    await prisma.notaBacklink.deleteMany();
    await prisma.enlace.deleteMany();
    await prisma.notaEtiqueta.deleteMany();
    await prisma.etiqueta.deleteMany();
    await prisma.nota.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("creates a backlink between two notes", async () => {
    const origen = await prisma.nota.create({
      data: { title: "Ideas de proyecto", content: "Contenido origen" },
    });
    const destino = await prisma.nota.create({
      data: { title: "Investigación de mercado", content: "Contenido destino" },
    });

    const created = await backlinkRepository.create(origen.id, destino.id);

    expect(created).toEqual({
      origenId: origen.id,
      destinoId: destino.id,
      destino: { id: destino.id, title: "Investigación de mercado" },
    });
  });

  it("removes backlinks when a linked note is deleted (CASCADE)", async () => {
    const origen = await prisma.nota.create({
      data: { title: "Plan Q3", content: "Contenido plan" },
    });
    const destino = await prisma.nota.create({
      data: { title: "Objetivos anuales", content: "Contenido objetivos" },
    });

    await backlinkRepository.create(origen.id, destino.id);

    await prisma.nota.delete({ where: { id: origen.id } });

    const remaining = await prisma.notaBacklink.findMany();
    expect(remaining).toHaveLength(0);
  });
});
