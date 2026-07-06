import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { prisma } from "../../../src/backend/src/lib/prisma.js";
import { notaRepository } from "../../../src/backend/src/repositories/nota.repository.js";

const hasDatabase = Boolean(process.env.DATABASE_URL);

describe.skipIf(!hasDatabase)("nota repository findById (TASK-007)", () => {
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

  it("has detail indexes idx_enlaces_nota_id and idx_nota_etiqueta_nota", async () => {
    const rows = await prisma.$queryRaw<{ indexname: string; tablename: string }[]>`
      SELECT indexname, tablename
      FROM pg_indexes
      WHERE indexname IN ('idx_enlaces_nota_id', 'idx_nota_etiqueta_nota')
    `;

    const indexNames = rows.map((row) => row.indexname);
    expect(indexNames).toEqual(
      expect.arrayContaining(["idx_enlaces_nota_id", "idx_nota_etiqueta_nota"]),
    );
  });

  it("returns note with links and tags in one repository call", async () => {
    const nota = await prisma.nota.create({
      data: {
        title: "Ideas de proyecto",
        content: "Texto de la nota",
      },
    });
    const ideas = await prisma.etiqueta.create({ data: { name: "ideas" } });
    const trabajo = await prisma.etiqueta.create({ data: { name: "trabajo" } });

    await prisma.enlace.createMany({
      data: [
        {
          notaId: nota.id,
          url: "https://docs.example.com/mvp",
          createdAt: new Date("2026-01-01T10:00:00.000Z"),
        },
        {
          notaId: nota.id,
          url: "https://www.prisma.io/docs",
          createdAt: new Date("2026-01-02T10:00:00.000Z"),
        },
      ],
    });

    await prisma.notaEtiqueta.createMany({
      data: [
        { notaId: nota.id, etiquetaId: trabajo.id },
        { notaId: nota.id, etiquetaId: ideas.id },
      ],
    });

    const result = await notaRepository.findById(nota.id);

    expect(result).not.toBeNull();
    expect(result).toMatchObject({
      id: nota.id,
      title: "Ideas de proyecto",
      content: "Texto de la nota",
    });
    expect(result?.enlaces.map((enlace) => enlace.url)).toEqual([
      "https://docs.example.com/mvp",
      "https://www.prisma.io/docs",
    ]);
    expect(result?.etiquetas.map((association) => association.etiqueta.name).sort()).toEqual([
      "ideas",
      "trabajo",
    ]);
  });

  it("returns null when note does not exist", async () => {
    const result = await notaRepository.findById("550e8400-e29b-41d4-a716-446655440000");

    expect(result).toBeNull();
  });

  it("loads relations with a single findUnique include (no N+1)", async () => {
    const nota = await prisma.nota.create({
      data: {
        title: "Nota con relaciones",
        content: "Contenido",
      },
    });
    const tagA = await prisma.etiqueta.create({ data: { name: "alpha" } });
    const tagB = await prisma.etiqueta.create({ data: { name: "beta" } });

    await prisma.enlace.createMany({
      data: [
        { notaId: nota.id, url: "https://one.example.com" },
        { notaId: nota.id, url: "https://two.example.com" },
        { notaId: nota.id, url: "https://three.example.com" },
      ],
    });

    await prisma.notaEtiqueta.createMany({
      data: [
        { notaId: nota.id, etiquetaId: tagA.id },
        { notaId: nota.id, etiquetaId: tagB.id },
      ],
    });

    const findUniqueSpy = vi.spyOn(prisma.nota, "findUnique");

    try {
      await notaRepository.findById(nota.id);

      expect(findUniqueSpy).toHaveBeenCalledTimes(1);
      expect(findUniqueSpy).toHaveBeenCalledWith({
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
    } finally {
      findUniqueSpy.mockRestore();
    }
  });

  it("loads enlaces by nota_id for detail query", async () => {
    const nota = await prisma.nota.create({
      data: { title: "Nota", content: "Contenido" },
    });

    await prisma.enlace.create({
      data: { notaId: nota.id, url: "https://example.com" },
    });

    const links = await prisma.enlace.findMany({ where: { notaId: nota.id } });
    expect(links).toHaveLength(1);
    expect(links[0]?.url).toBe("https://example.com");
  });

  it("resolves nota_etiqueta associations by nota_id", async () => {
    const nota = await prisma.nota.create({
      data: { title: "Nota", content: "Contenido" },
    });
    const etiqueta = await prisma.etiqueta.create({ data: { name: "ideas" } });

    await prisma.notaEtiqueta.create({
      data: { notaId: nota.id, etiquetaId: etiqueta.id },
    });

    const associations = await prisma.notaEtiqueta.findMany({
      where: { notaId: nota.id },
      include: { etiqueta: true },
    });

    expect(associations).toHaveLength(1);
    expect(associations[0]?.etiqueta.name).toBe("ideas");
  });
});
