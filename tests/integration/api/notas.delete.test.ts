import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import request from "supertest";
import { createApp } from "../../../src/backend/src/app.js";
import { prisma } from "../../../src/backend/src/lib/prisma.js";

const hasDatabase = Boolean(process.env.DATABASE_URL);

describe.skipIf(!hasDatabase)("DELETE /api/v1/notas/:id (TASK-061, TASK-064)", () => {
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

  async function seedDeletableNote() {
    const etiqueta = await prisma.etiqueta.create({ data: { name: "eliminar-test" } });
    const nota = await prisma.nota.create({
      data: {
        title: "Nota a eliminar",
        content: "Contenido",
        enlaces: {
          create: { url: "https://example.com/delete-me" },
        },
        etiquetas: {
          create: { etiquetaId: etiqueta.id },
        },
      },
    });

    return { nota, etiqueta };
  }

  it("returns 204 and removes note from list and detail", async () => {
    const { nota } = await seedDeletableNote();

    const response = await request(app).delete(`/api/v1/notas/${nota.id}`);

    expect(response.status).toBe(204);
    expect(response.text).toBe("");

    const listResponse = await request(app).get("/api/v1/notas");
    expect(listResponse.body.data).toEqual([]);

    const detailResponse = await request(app).get(`/api/v1/notas/${nota.id}`);
    expect(detailResponse.status).toBe(404);
    expect(detailResponse.body.error.code).toBe("NOT_FOUND");
  });

  it("cascades delete to enlaces and nota_etiqueta", async () => {
    const { nota } = await seedDeletableNote();

    const response = await request(app).delete(`/api/v1/notas/${nota.id}`);
    expect(response.status).toBe(204);

    const enlaces = await prisma.enlace.findMany({ where: { notaId: nota.id } });
    const associations = await prisma.notaEtiqueta.findMany({ where: { notaId: nota.id } });

    expect(enlaces).toHaveLength(0);
    expect(associations).toHaveLength(0);
  });

  it("returns 404 when note does not exist", async () => {
    const response = await request(app).delete(
      "/api/v1/notas/550e8400-e29b-41d4-a716-446655440000",
    );

    expect(response.status).toBe(404);
    expect(response.body.error).toEqual({
      code: "NOT_FOUND",
      message: "Nota no encontrada",
    });
  });

  it("returns 400 for malformed UUID", async () => {
    const response = await request(app).delete("/api/v1/notas/not-a-uuid");

    expect(response.status).toBe(400);
    expect(response.body.error.code).toBe("VALIDATION_ERROR");
  });
});
