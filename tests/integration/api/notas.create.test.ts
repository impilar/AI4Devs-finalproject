import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import request from "supertest";
import { createApp } from "../../../src/backend/src/app.js";
import { prisma } from "../../../src/backend/src/lib/prisma.js";

const hasDatabase = Boolean(process.env.DATABASE_URL);

describe.skipIf(!hasDatabase)("POST /api/v1/notas", () => {
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

  it("returns 201 with created note detail", async () => {
    const response = await request(app).post("/api/v1/notas").send({
      title: "Nueva idea",
      content: "Contenido de la nota",
    });

    expect(response.status).toBe(201);
    expect(response.headers["content-type"]).toMatch(/application\/json/);
    expect(response.body.data).toMatchObject({
      title: "Nueva idea",
      content: "Contenido de la nota",
      links: [],
      tags: [],
    });
    expect(response.body.data.id).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
    );
    expect(response.body.data.createdAt).toMatch(/^\d{4}-\d{2}-\d{2}T/);
    expect(response.body.data.updatedAt).toMatch(/^\d{4}-\d{2}-\d{2}T/);

    const stored = await prisma.nota.findUnique({
      where: { id: response.body.data.id },
    });
    expect(stored).not.toBeNull();
  });

  it("returns 400 when title is empty", async () => {
    const response = await request(app).post("/api/v1/notas").send({
      title: "   ",
      content: "Contenido válido",
    });

    expect(response.status).toBe(400);
    expect(response.body.error.code).toBe("VALIDATION_ERROR");
    expect(response.body.error.details).toEqual(
      expect.arrayContaining([
        { field: "title", message: "El título es obligatorio" },
      ]),
    );

    const count = await prisma.nota.count();
    expect(count).toBe(0);
  });

  it("returns 400 when content is empty", async () => {
    const response = await request(app).post("/api/v1/notas").send({
      title: "Título válido",
      content: "",
    });

    expect(response.status).toBe(400);
    expect(response.body.error.code).toBe("VALIDATION_ERROR");
    expect(response.body.error.details).toEqual(
      expect.arrayContaining([
        { field: "content", message: "El contenido es obligatorio" },
      ]),
    );

    const count = await prisma.nota.count();
    expect(count).toBe(0);
  });

  it("returns 400 when title exceeds 500 characters", async () => {
    const response = await request(app).post("/api/v1/notas").send({
      title: "a".repeat(501),
      content: "Contenido válido",
    });

    expect(response.status).toBe(400);
    expect(response.body.error.code).toBe("VALIDATION_ERROR");
    expect(response.body.error.details).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ field: "title" }),
      ]),
    );
  });
});
