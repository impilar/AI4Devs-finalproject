import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { prisma } from "../../../src/backend/src/lib/prisma.js";

const hasDatabase = Boolean(process.env.DATABASE_URL);

describe.skipIf(!hasDatabase)("etiquetas schema (TASK-031)", () => {
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

  it("has etiquetas and nota_etiqueta tables with expected indexes", async () => {
    const indexes = await prisma.$queryRaw<{ indexname: string }[]>`
      SELECT indexname
      FROM pg_indexes
      WHERE tablename IN ('etiquetas', 'nota_etiqueta')
    `;

    const indexNames = indexes.map((row) => row.indexname);
    expect(indexNames).toEqual(expect.arrayContaining(["idx_etiquetas_name"]));
    expect(indexNames).toEqual(expect.arrayContaining(["idx_nota_etiqueta_nota"]));
    expect(indexNames).toEqual(expect.arrayContaining(["idx_nota_etiqueta_etiqueta"]));
  });

  it("rejects duplicate etiqueta name (RF-009)", async () => {
    await prisma.etiqueta.create({ data: { name: "ideas" } });

    await expect(prisma.etiqueta.create({ data: { name: "ideas" } })).rejects.toThrow();
  });

  it("rejects duplicate nota_etiqueta association (BR-003)", async () => {
    const nota = await prisma.nota.create({
      data: { title: "Nota", content: "Contenido" },
    });
    const etiqueta = await prisma.etiqueta.create({ data: { name: "trabajo" } });

    await prisma.notaEtiqueta.create({
      data: { notaId: nota.id, etiquetaId: etiqueta.id },
    });

    await expect(
      prisma.notaEtiqueta.create({
        data: { notaId: nota.id, etiquetaId: etiqueta.id },
      }),
    ).rejects.toThrow();
  });

  it("cascades nota_etiqueta when note is deleted", async () => {
    const nota = await prisma.nota.create({
      data: { title: "Nota", content: "Contenido" },
    });
    const etiqueta = await prisma.etiqueta.create({ data: { name: "personal" } });

    await prisma.notaEtiqueta.create({
      data: { notaId: nota.id, etiquetaId: etiqueta.id },
    });

    await prisma.nota.delete({ where: { id: nota.id } });

    const associations = await prisma.notaEtiqueta.findMany({
      where: { notaId: nota.id },
    });
    expect(associations).toHaveLength(0);

    const tag = await prisma.etiqueta.findUnique({ where: { id: etiqueta.id } });
    expect(tag).not.toBeNull();
  });
});
