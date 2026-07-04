import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { prisma } from "../../../src/backend/src/lib/prisma.js";

const hasDatabase = Boolean(process.env.DATABASE_URL);

describe.skipIf(!hasDatabase)("enlaces schema (TASK-023)", () => {
  beforeAll(async () => {
    await prisma.$connect();
  });

  beforeEach(async () => {
    await prisma.enlace.deleteMany();
    await prisma.notaEtiqueta.deleteMany();
    await prisma.etiqueta.deleteMany();
    await prisma.nota.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("has enlaces table with expected index", async () => {
    const indexes = await prisma.$queryRaw<{ indexname: string }[]>`
      SELECT indexname
      FROM pg_indexes
      WHERE tablename = 'enlaces'
    `;

    const indexNames = indexes.map((row) => row.indexname);
    expect(indexNames).toEqual(expect.arrayContaining(["idx_enlaces_nota_id"]));
  });

  it("stores link associated with an existing note", async () => {
    const nota = await prisma.nota.create({
      data: { title: "Nota", content: "Contenido" },
    });

    const enlace = await prisma.enlace.create({
      data: {
        notaId: nota.id,
        url: "https://docs.example.com/mvp",
      },
    });

    expect(enlace.notaId).toBe(nota.id);
    expect(enlace.url).toBe("https://docs.example.com/mvp");
  });

  it("cascades enlaces when note is deleted", async () => {
    const nota = await prisma.nota.create({
      data: { title: "Nota", content: "Contenido" },
    });

    await prisma.enlace.create({
      data: {
        notaId: nota.id,
        url: "https://www.prisma.io/docs",
      },
    });

    await prisma.nota.delete({ where: { id: nota.id } });

    const links = await prisma.enlace.findMany({ where: { notaId: nota.id } });
    expect(links).toHaveLength(0);
  });

  it("rejects link with invalid nota_id", async () => {
    await expect(
      prisma.enlace.create({
        data: {
          notaId: "99999999-9999-9999-9999-999999999999",
          url: "https://example.com",
        },
      }),
    ).rejects.toThrow();
  });
});
