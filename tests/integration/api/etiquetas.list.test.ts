import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import request from "supertest";
import { createApp } from "../../../src/backend/src/app.js";
import { prisma } from "../../../src/backend/src/lib/prisma.js";

const hasDatabase = Boolean(process.env.DATABASE_URL);

describe.skipIf(!hasDatabase)("GET /api/v1/etiquetas (US-011)", () => {
  const app = createApp();

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

  it("returns catalog items with counts ordered by name", async () => {
    const ideas = await prisma.etiqueta.create({ data: { name: "ideas" } });
    await prisma.etiqueta.create({ data: { name: "archivo" } });

    const note = await prisma.nota.create({
      data: { title: "Una nota", content: "Contenido" },
    });

    await prisma.notaEtiqueta.create({
      data: { notaId: note.id, etiquetaId: ideas.id },
    });

    const response = await request(app).get("/api/v1/etiquetas");

    expect(response.status).toBe(200);
    expect(response.body.data).toEqual([
      { id: expect.any(String), name: "archivo", count: 0 },
      { id: ideas.id, name: "ideas", count: 1 },
    ]);
  });

  it("includes orphan tags with count zero", async () => {
    await prisma.etiqueta.createMany({
      data: [{ name: "archivo" }, { name: "ideas" }],
    });

    const response = await request(app).get("/api/v1/etiquetas");

    expect(response.status).toBe(200);
    expect(response.body.data).toEqual([
      { id: expect.any(String), name: "archivo", count: 0 },
      { id: expect.any(String), name: "ideas", count: 0 },
    ]);
  });
});
