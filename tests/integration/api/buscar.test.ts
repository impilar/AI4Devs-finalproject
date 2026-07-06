import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import request from "supertest";
import { createApp } from "../../../src/backend/src/app.js";
import { prisma } from "../../../src/backend/src/lib/prisma.js";

const hasDatabase = Boolean(process.env.DATABASE_URL);

describe.skipIf(!hasDatabase)("GET /api/v1/buscar", () => {
  const app = createApp();

  beforeAll(async () => {
    await prisma.$connect();
  });

  beforeEach(async () => {
    await prisma.notaEtiqueta.deleteMany();
    await prisma.enlace.deleteMany();
    await prisma.etiqueta.deleteMany();
    await prisma.nota.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  async function seedSearchNotes(): Promise<void> {
    await prisma.nota.create({
      data: {
        title: "Recetas",
        content: "Colección de platos favoritos",
      },
    });
    await prisma.nota.create({
      data: {
        title: "Lista semanal",
        content: "lista de la compra del supermercado",
      },
    });
    await prisma.nota.create({
      data: {
        title: "Sin coincidencia",
        content: "Contenido irrelevante",
      },
    });
  }

  it("finds a note by content match", async () => {
    await seedSearchNotes();

    const response = await request(app).get("/api/v1/buscar?q=compra");

    expect(response.status).toBe(200);
    expect(response.body.meta).toEqual({ q: "compra", total: 1 });
    expect(response.body.data).toHaveLength(1);
    expect(response.body.data[0].title).toBe("Lista semanal");
  });

  it("finds a note by title match", async () => {
    await seedSearchNotes();

    const response = await request(app).get("/api/v1/buscar?q=recetas");

    expect(response.status).toBe(200);
    expect(response.body.meta).toEqual({ q: "recetas", total: 1 });
    expect(response.body.data[0].title).toBe("Recetas");
  });

  it("is case-insensitive", async () => {
    await seedSearchNotes();

    const response = await request(app).get("/api/v1/buscar?q=COMPRA");

    expect(response.status).toBe(200);
    expect(response.body.meta.total).toBe(1);
    expect(response.body.data[0].title).toBe("Lista semanal");
  });

  it("returns empty results when there are no matches", async () => {
    await seedSearchNotes();

    const response = await request(app).get("/api/v1/buscar?q=xyznonexistent");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      data: [],
      meta: { q: "xyznonexistent", total: 0 },
    });
  });

  it("returns 400 when q is empty", async () => {
    const response = await request(app).get("/api/v1/buscar?q=");

    expect(response.status).toBe(400);
    expect(response.body.error.code).toBe("VALIDATION_ERROR");
  });

  it("returns at most 50 results", async () => {
    await prisma.nota.createMany({
      data: Array.from({ length: 60 }, (_, index) => ({
        title: `Nota ${index}`,
        content: `contenido buscable ${index}`,
      })),
    });

    const response = await request(app).get("/api/v1/buscar?q=buscable");

    expect(response.status).toBe(200);
    expect(response.body.data).toHaveLength(50);
    expect(response.body.meta.total).toBe(50);
  });

  it("prioritizes title matches when order defaults to relevance", async () => {
    await prisma.nota.create({
      data: {
        title: "Ideas varias",
        content: "texto con compra en el contenido",
      },
    });
    await prisma.nota.create({
      data: {
        title: "Compra semanal",
        content: "sin palabra clave en título",
      },
    });

    const response = await request(app).get("/api/v1/buscar?q=compra");

    expect(response.status).toBe(200);
    expect(response.body.data.map((note: { title: string }) => note.title)).toEqual([
      "Compra semanal",
      "Ideas varias",
    ]);
  });
});
