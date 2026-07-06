import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import request from "supertest";
import { createApp } from "../../../src/backend/src/app.js";
import { prisma } from "../../../src/backend/src/lib/prisma.js";

const hasDatabase = Boolean(process.env.DATABASE_URL);

describe.skipIf(!hasDatabase)("PUT /api/v1/notas/:id (TASK-057, TASK-060)", () => {
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

  async function seedEditableNote() {
    const nota = await prisma.nota.create({
      data: {
        title: "Original title",
        content: "Original content",
      },
    });
    const trabajo = await prisma.etiqueta.create({ data: { name: "trabajo" } });
    const ideas = await prisma.etiqueta.create({ data: { name: "ideas" } });

    await prisma.enlace.create({
      data: {
        notaId: nota.id,
        url: "https://example.com/original",
      },
    });

    await prisma.notaEtiqueta.createMany({
      data: [
        { notaId: nota.id, etiquetaId: trabajo.id },
        { notaId: nota.id, etiquetaId: ideas.id },
      ],
    });

    return nota;
  }

  it("returns 200 with full update and refreshed updatedAt", async () => {
    const nota = await seedEditableNote();
    const previousUpdatedAt = nota.updatedAt;

    await new Promise((resolve) => setTimeout(resolve, 15));

    const response = await request(app).put(`/api/v1/notas/${nota.id}`).send({
      title: "Updated title",
      content: "Updated content",
      links: ["https://example.com/new"],
      tags: ["urgente"],
    });

    expect(response.status).toBe(200);
    expect(response.body.data).toMatchObject({
      id: nota.id,
      title: "Updated title",
      content: "Updated content",
      links: ["https://example.com/new"],
    });
    expect(response.body.data.tags.map((tag: { name: string }) => tag.name)).toEqual(["urgente"]);
    expect(new Date(response.body.data.updatedAt).getTime()).toBeGreaterThan(
      previousUpdatedAt.getTime(),
    );
  });

  it("updates only title without changing links or tags", async () => {
    const nota = await seedEditableNote();

    const response = await request(app)
      .put(`/api/v1/notas/${nota.id}`)
      .send({ title: "Title only" });

    expect(response.status).toBe(200);
    expect(response.body.data).toMatchObject({
      title: "Title only",
      content: "Original content",
      links: ["https://example.com/original"],
    });
    expect(response.body.data.tags.map((tag: { name: string }) => tag.name)).toEqual([
      "ideas",
      "trabajo",
    ]);
  });

  it("clears all links when links is an empty array", async () => {
    const nota = await seedEditableNote();

    const response = await request(app)
      .put(`/api/v1/notas/${nota.id}`)
      .send({ links: [] });

    expect(response.status).toBe(200);
    expect(response.body.data.links).toEqual([]);

    const storedLinks = await prisma.enlace.findMany({ where: { notaId: nota.id } });
    expect(storedLinks).toHaveLength(0);
  });

  it("returns 400 when body has no updatable fields", async () => {
    const nota = await seedEditableNote();

    const response = await request(app).put(`/api/v1/notas/${nota.id}`).send({});

    expect(response.status).toBe(400);
    expect(response.body.error.code).toBe("VALIDATION_ERROR");
  });

  it("returns 400 when title is empty on update (US-007)", async () => {
    const nota = await seedEditableNote();

    const response = await request(app)
      .put(`/api/v1/notas/${nota.id}`)
      .send({ title: "   " });

    expect(response.status).toBe(400);
    expect(response.body.error.code).toBe("VALIDATION_ERROR");
    expect(response.body.error.details).toEqual(
      expect.arrayContaining([
        { field: "title", message: "El título es obligatorio" },
      ]),
    );

    const stored = await prisma.nota.findUnique({ where: { id: nota.id } });
    expect(stored?.title).toBe("Original title");
  });

  it("returns 400 when content is empty on update (US-007)", async () => {
    const nota = await seedEditableNote();

    const response = await request(app)
      .put(`/api/v1/notas/${nota.id}`)
      .send({ content: "" });

    expect(response.status).toBe(400);
    expect(response.body.error.code).toBe("VALIDATION_ERROR");
    expect(response.body.error.details).toEqual(
      expect.arrayContaining([
        { field: "content", message: "El contenido es obligatorio" },
      ]),
    );

    const stored = await prisma.nota.findUnique({ where: { id: nota.id } });
    expect(stored?.content).toBe("Original content");
  });

  it("returns 404 when note does not exist", async () => {
    const response = await request(app)
      .put("/api/v1/notas/550e8400-e29b-41d4-a716-446655440000")
      .send({ title: "Ghost" });

    expect(response.status).toBe(404);
    expect(response.body.error).toEqual({
      code: "NOT_FOUND",
      message: "Nota no encontrada",
    });
  });

  it("returns 400 for malformed UUID", async () => {
    const response = await request(app)
      .put("/api/v1/notas/not-a-uuid")
      .send({ title: "Invalid" });

    expect(response.status).toBe(400);
    expect(response.body.error.code).toBe("VALIDATION_ERROR");
  });
});
