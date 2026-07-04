import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import request from "supertest";
import { createApp } from "../../../src/backend/src/app.js";
import { prisma } from "../../../src/backend/src/lib/prisma.js";

const hasDatabase = Boolean(process.env.DATABASE_URL);

describe.skipIf(!hasDatabase)("POST/PUT /api/v1/notas tags (TASK-029)", () => {
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

  it("creates tag and association on POST with new tag name", async () => {
    const response = await request(app).post("/api/v1/notas").send({
      title: "Nota con etiqueta",
      content: "Contenido",
      tags: ["productividad"],
    });

    expect(response.status).toBe(201);
    expect(response.body.data.tags).toEqual(["productividad"]);

    const etiqueta = await prisma.etiqueta.findUnique({
      where: { name: "productividad" },
    });
    expect(etiqueta).not.toBeNull();

    const associations = await prisma.notaEtiqueta.findMany({
      where: { notaId: response.body.data.id },
    });
    expect(associations).toHaveLength(1);
  });

  it("reuses existing tag when creating a second note", async () => {
    const first = await request(app).post("/api/v1/notas").send({
      title: "Primera",
      content: "Contenido",
      tags: ["ideas"],
    });
    const second = await request(app).post("/api/v1/notas").send({
      title: "Segunda",
      content: "Contenido",
      tags: ["ideas"],
    });

    expect(first.status).toBe(201);
    expect(second.status).toBe(201);

    const etiquetas = await prisma.etiqueta.findMany({ where: { name: "ideas" } });
    expect(etiquetas).toHaveLength(1);

    const associations = await prisma.notaEtiqueta.findMany({
      where: { etiquetaId: etiquetas[0]?.id },
    });
    expect(associations).toHaveLength(2);
  });

  it("deduplicates repeated tag names in POST body", async () => {
    const response = await request(app).post("/api/v1/notas").send({
      title: "Nota deduplicada",
      content: "Contenido",
      tags: ["a", "a"],
    });

    expect(response.status).toBe(201);
    expect(response.body.data.tags).toEqual(["a"]);

    const associations = await prisma.notaEtiqueta.findMany({
      where: { notaId: response.body.data.id },
    });
    expect(associations).toHaveLength(1);
  });

  it("returns tags sorted alphabetically in NotaDetail", async () => {
    const response = await request(app).post("/api/v1/notas").send({
      title: "Varias etiquetas",
      content: "Contenido",
      tags: ["urgente", "ideas", "productividad"],
    });

    expect(response.status).toBe(201);
    expect(response.body.data.tags).toEqual(["ideas", "productividad", "urgente"]);
  });

  it("replaces tag associations on PUT", async () => {
    const created = await request(app).post("/api/v1/notas").send({
      title: "Editable",
      content: "Contenido",
      tags: ["ideas", "trabajo"],
    });

    const updated = await request(app)
      .put(`/api/v1/notas/${created.body.data.id}`)
      .send({ tags: ["urgente"] });

    expect(updated.status).toBe(200);
    expect(updated.body.data.tags).toEqual(["urgente"]);

    const associations = await prisma.notaEtiqueta.findMany({
      where: { notaId: created.body.data.id },
      include: { etiqueta: true },
    });
    expect(associations).toHaveLength(1);
    expect(associations[0]?.etiqueta.name).toBe("urgente");
  });

  it("returns 404 when updating tags on missing note", async () => {
    const response = await request(app)
      .put("/api/v1/notas/550e8400-e29b-41d4-a716-446655440000")
      .send({ tags: ["ideas"] });

    expect(response.status).toBe(404);
  });
});
