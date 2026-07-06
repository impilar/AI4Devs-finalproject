import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { notaRepository } from "../../../src/backend/src/repositories/nota.repository.js";
import { prisma } from "../../../src/backend/src/lib/prisma.js";

const hasDatabase = Boolean(process.env.DATABASE_URL);

describe.skipIf(!hasDatabase)("nota repository (database)", () => {
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

  it("returns empty array from findAll when no notes exist (US-003)", async () => {
    const rows = await notaRepository.findAll();
    expect(rows).toEqual([]);
  });

  it("inserts a note with generated id and timestamps", async () => {
    const created = await prisma.nota.create({
      data: {
        title: "Test note",
        content: "Body content",
      },
    });

    expect(created.id).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
    );
    expect(created.title).toBe("Test note");
    expect(created.content).toBe("Body content");
    expect(created.createdAt).toBeInstanceOf(Date);
    expect(created.updatedAt).toBeInstanceOf(Date);
  });

  it("rejects empty title at database level", async () => {
    await expect(
      prisma.nota.create({
        data: {
          title: "   ",
          content: "Valid content",
        },
      }),
    ).rejects.toThrow();
  });

  it("rejects empty content at database level", async () => {
    await expect(
      prisma.nota.create({
        data: {
          title: "Valid title",
          content: "",
        },
      }),
    ).rejects.toThrow();
  });

  it("refreshes updatedAt on update without passing it explicitly", async () => {
    const created = await prisma.nota.create({
      data: {
        title: "Original title",
        content: "Original content",
      },
    });

    await new Promise((resolve) => setTimeout(resolve, 15));

    const updated = await prisma.nota.update({
      where: { id: created.id },
      data: { title: "Updated title" },
    });

    expect(updated.updatedAt.getTime()).toBeGreaterThan(created.updatedAt.getTime());
  });

  it("cascades delete to enlaces and nota_etiqueta while keeping etiquetas", async () => {
    const etiqueta = await prisma.etiqueta.create({
      data: { name: "cascade-test" },
    });

    const nota = await prisma.nota.create({
      data: {
        title: "Note with relations",
        content: "Content",
        enlaces: {
          create: { url: "https://example.com/link" },
        },
        etiquetas: {
          create: { etiquetaId: etiqueta.id },
        },
      },
    });

    await prisma.nota.delete({ where: { id: nota.id } });

    const enlaces = await prisma.enlace.findMany({ where: { notaId: nota.id } });
    const associations = await prisma.notaEtiqueta.findMany({ where: { notaId: nota.id } });
    const persistedTag = await prisma.etiqueta.findUnique({ where: { id: etiqueta.id } });

    expect(enlaces).toHaveLength(0);
    expect(associations).toHaveLength(0);
    expect(persistedTag).not.toBeNull();
  });
});
