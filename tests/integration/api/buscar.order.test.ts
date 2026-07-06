import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import request from "supertest";
import { createApp } from "../../../src/backend/src/app.js";
import { prisma } from "../../../src/backend/src/lib/prisma.js";

const hasDatabase = Boolean(process.env.DATABASE_URL);

describe.skipIf(!hasDatabase)("GET /api/v1/buscar order param", () => {
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

  async function seedRelevanceNotes(): Promise<void> {
    await prisma.nota.create({
      data: {
        title: "Ideas varias",
        content: "texto con proyecto en el contenido",
      },
    });
    await prisma.nota.create({
      data: {
        title: "Proyecto principal",
        content: "sin palabra clave en título",
      },
    });
  }

  async function seedDateOrderedNotes(): Promise<{
    newerId: string;
    olderId: string;
  }> {
    const older = await prisma.nota.create({
      data: {
        title: "Nota antigua",
        content: "contenido con palabra nota",
      },
    });
    const newer = await prisma.nota.create({
      data: {
        title: "Nota reciente",
        content: "otro contenido con palabra nota",
      },
    });

    await prisma.nota.update({
      where: { id: older.id },
      data: { updatedAt: new Date("2026-01-01T00:00:00.000Z") },
    });
    await prisma.nota.update({
      where: { id: newer.id },
      data: { updatedAt: new Date("2026-06-01T00:00:00.000Z") },
    });

    return { newerId: newer.id, olderId: older.id };
  }

  it("orders by relevance with title matches before content-only matches", async () => {
    await seedRelevanceNotes();

    const response = await request(app).get("/api/v1/buscar?q=proyecto&order=relevance");

    expect(response.status).toBe(200);
    expect(response.body.data.map((note: { title: string }) => note.title)).toEqual([
      "Proyecto principal",
      "Ideas varias",
    ]);
  });

  it("defaults to relevance when order is omitted", async () => {
    await seedRelevanceNotes();

    const response = await request(app).get("/api/v1/buscar?q=proyecto");

    expect(response.status).toBe(200);
    expect(response.body.data.map((note: { title: string }) => note.title)).toEqual([
      "Proyecto principal",
      "Ideas varias",
    ]);
  });

  it("orders by updatedAt descending when order=date", async () => {
    const { newerId, olderId } = await seedDateOrderedNotes();

    const response = await request(app).get("/api/v1/buscar?q=nota&order=date");

    expect(response.status).toBe(200);
    expect(response.body.data).toHaveLength(2);
    expect(response.body.data[0].id).toBe(newerId);
    expect(response.body.data[1].id).toBe(olderId);
  });

  it("breaks relevance ties by updatedAt descending", async () => {
    const older = await prisma.nota.create({
      data: {
        title: "Proyecto alpha",
        content: "contenido alpha",
      },
    });
    const newer = await prisma.nota.create({
      data: {
        title: "Proyecto beta",
        content: "contenido beta",
      },
    });

    await prisma.nota.update({
      where: { id: older.id },
      data: { updatedAt: new Date("2026-01-01T00:00:00.000Z") },
    });
    await prisma.nota.update({
      where: { id: newer.id },
      data: { updatedAt: new Date("2026-06-01T00:00:00.000Z") },
    });

    const response = await request(app).get("/api/v1/buscar?q=proyecto&order=relevance");

    expect(response.status).toBe(200);
    expect(response.body.data.map((note: { title: string }) => note.title)).toEqual([
      "Proyecto beta",
      "Proyecto alpha",
    ]);
  });

  it("returns 400 for invalid order value", async () => {
    const response = await request(app).get("/api/v1/buscar?q=nota&order=invalid");

    expect(response.status).toBe(400);
    expect(response.body.error.code).toBe("VALIDATION_ERROR");
  });
});
