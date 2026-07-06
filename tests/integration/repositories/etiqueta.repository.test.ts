import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { prisma } from "../../../src/backend/src/lib/prisma.js";
import { etiquetaRepository } from "../../../src/backend/src/repositories/etiqueta.repository.js";

const hasDatabase = Boolean(process.env.DATABASE_URL);

describe.skipIf(!hasDatabase)("etiqueta repository findAllWithCount (US-011)", () => {
  beforeAll(async () => {
    await prisma.$connect();
  });

  beforeEach(async () => {
    await prisma.notaEtiqueta.deleteMany();
    await prisma.etiqueta.deleteMany();
    await prisma.nota.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("returns tags with note counts including zero", async () => {
    const ideas = await prisma.etiqueta.create({ data: { name: "ideas" } });
    await prisma.etiqueta.create({ data: { name: "archivo" } });

    const notes = await Promise.all(
      Array.from({ length: 5 }, (_, index) =>
        prisma.nota.create({
          data: {
            title: `Nota ${index + 1}`,
            content: `Contenido ${index + 1}`,
          },
        }),
      ),
    );

    for (const note of notes) {
      await prisma.notaEtiqueta.create({
        data: { notaId: note.id, etiquetaId: ideas.id },
      });
    }

    const catalog = await etiquetaRepository.findAllWithCount();

    expect(catalog).toHaveLength(2);
    expect(catalog[0]).toMatchObject({ name: "archivo", count: 0 });
    expect(catalog[1]).toEqual({ id: ideas.id, name: "ideas", count: 5 });
  });
});
