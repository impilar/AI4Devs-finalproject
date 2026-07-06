import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import request from "supertest";
import { createApp } from "../../../src/backend/src/app.js";
import { prisma } from "../../../src/backend/src/lib/prisma.js";

const hasDatabase = Boolean(process.env.DATABASE_URL);

describe.skipIf(!hasDatabase)("GET /api/v1/notas?etiqueta=", () => {
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

  async function seedTaggedNotes(): Promise<void> {
    const trabajo = await prisma.etiqueta.create({ data: { name: "trabajo" } });
    const personal = await prisma.etiqueta.create({ data: { name: "personal" } });
    await prisma.etiqueta.create({ data: { name: "archivo" } });

    const notaTrabajo1 = await prisma.nota.create({
      data: { title: "Proyecto A", content: "Contenido A" },
    });
    const notaTrabajo2 = await prisma.nota.create({
      data: { title: "Proyecto B", content: "Contenido B" },
    });
    const notaPersonal = await prisma.nota.create({
      data: { title: "Compras", content: "Lista" },
    });

    await prisma.notaEtiqueta.createMany({
      data: [
        { notaId: notaTrabajo1.id, etiquetaId: trabajo.id },
        { notaId: notaTrabajo2.id, etiquetaId: trabajo.id },
        { notaId: notaPersonal.id, etiquetaId: personal.id },
      ],
    });
  }

  it("returns only notes with the selected tag", async () => {
    await seedTaggedNotes();

    const response = await request(app).get("/api/v1/notas?etiqueta=trabajo");

    expect(response.status).toBe(200);
    expect(response.body.meta).toEqual({ total: 2 });
    expect(response.body.data).toHaveLength(2);
    expect(response.body.data.map((note: { title: string }) => note.title).sort()).toEqual([
      "Proyecto A",
      "Proyecto B",
    ]);
  });

  it("returns empty list for orphan tag without notes", async () => {
    await seedTaggedNotes();

    const response = await request(app).get("/api/v1/notas?etiqueta=archivo");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      data: [],
      meta: { total: 0 },
    });
  });

  it("returns empty list for unknown tag name", async () => {
    await seedTaggedNotes();

    const response = await request(app).get("/api/v1/notas?etiqueta=inexistente");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      data: [],
      meta: { total: 0 },
    });
  });

  it("returns full list when etiqueta param is omitted", async () => {
    await seedTaggedNotes();

    const response = await request(app).get("/api/v1/notas");

    expect(response.status).toBe(200);
    expect(response.body.meta).toEqual({ total: 3 });
  });
});

describe.skipIf(!hasDatabase)("GET /api/v1/etiquetas", () => {
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

  it("returns all tag names sorted alphabetically including orphan tags", async () => {
    await prisma.etiqueta.createMany({
      data: [{ name: "trabajo" }, { name: "archivo" }, { name: "personal" }],
    });

    const response = await request(app).get("/api/v1/etiquetas");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      data: ["archivo", "personal", "trabajo"],
    });
  });
});
