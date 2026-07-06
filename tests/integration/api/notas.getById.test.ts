import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import request from "supertest";
import { createApp } from "../../../src/backend/src/app.js";
import { prisma } from "../../../src/backend/src/lib/prisma.js";

const hasDatabase = Boolean(process.env.DATABASE_URL);

describe.skipIf(!hasDatabase)("GET /api/v1/notas/:id", () => {
  const app = createApp();

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

  it("returns 200 with note detail including links and tags", async () => {
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

    const response = await request(app).get(`/api/v1/notas/${nota.id}`);

    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toMatch(/application\/json/);
    expect(response.body.data).toMatchObject({
      id: nota.id,
      title: "Ideas de proyecto",
      content: "Texto de la nota",
      links: ["https://docs.example.com/mvp", "https://www.prisma.io/docs"],
    });
    expect(response.body.data.tags).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: ideas.id, name: "ideas" }),
        expect.objectContaining({ id: trabajo.id, name: "trabajo" }),
      ]),
    );
    expect(response.body.data.tags).toHaveLength(2);
    expect(response.body.data.createdAt).toBe(nota.createdAt.toISOString());
    expect(response.body.data.updatedAt).toBe(nota.updatedAt.toISOString());
  });

  it("returns empty links and tags when note has no relations", async () => {
    const nota = await prisma.nota.create({
      data: {
        title: "Solo nota",
        content: "Sin relaciones",
      },
    });

    const response = await request(app).get(`/api/v1/notas/${nota.id}`);

    expect(response.status).toBe(200);
    expect(response.body.data).toMatchObject({
      id: nota.id,
      links: [],
      tags: [],
    });
  });

  it("returns 404 when note does not exist", async () => {
    const response = await request(
      app,
    ).get("/api/v1/notas/550e8400-e29b-41d4-a716-446655440000");

    expect(response.status).toBe(404);
    expect(response.body.error).toEqual({
      code: "NOT_FOUND",
      message: "Nota no encontrada",
    });
  });

  it("returns 400 for malformed UUID", async () => {
    const response = await request(app).get("/api/v1/notas/not-a-uuid");

    expect(response.status).toBe(400);
    expect(response.body.error.code).toBe("VALIDATION_ERROR");
  });
});
