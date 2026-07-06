import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import request from "supertest";
import { createApp } from "../../../src/backend/src/app.js";
import { prisma } from "../../../src/backend/src/lib/prisma.js";

const hasDatabase = Boolean(process.env.DATABASE_URL);

describe.skipIf(!hasDatabase)("DELETE /api/v1/notas/:id/etiquetas/:etiquetaId (US-010)", () => {
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

  async function seedNoteWithTags(
    title: string,
    tagNames: string[],
  ): Promise<{ notaId: string; tags: { id: string; name: string }[] }> {
    const nota = await prisma.nota.create({
      data: { title, content: `Contenido de ${title}` },
    });

    const tags: { id: string; name: string }[] = [];

    for (const name of tagNames) {
      const existing = await prisma.etiqueta.findUnique({ where: { name } });
      const etiqueta =
        existing ?? (await prisma.etiqueta.create({ data: { name } }));
      await prisma.notaEtiqueta.create({
        data: { notaId: nota.id, etiquetaId: etiqueta.id },
      });
      tags.push({ id: etiqueta.id, name });
    }

    return { notaId: nota.id, tags };
  }

  it("returns 204 and removes one tag association while note persists", async () => {
    const { notaId, tags } = await seedNoteWithTags("Reunión", ["trabajo", "urgente"]);
    const urgente = tags.find((tag) => tag.name === "urgente");

    const response = await request(app).delete(
      `/api/v1/notas/${notaId}/etiquetas/${urgente?.id}`,
    );

    expect(response.status).toBe(204);

    const detail = await request(app).get(`/api/v1/notas/${notaId}`);
    expect(detail.status).toBe(200);
    expect(detail.body.data.title).toBe("Reunión");
    expect(detail.body.data.content).toBe("Contenido de Reunión");
    expect(detail.body.data.tags.map((tag: { name: string }) => tag.name)).toEqual(["trabajo"]);

    const notaRow = await prisma.nota.findUnique({ where: { id: notaId } });
    expect(notaRow).not.toBeNull();
  });

  it("keeps global tag when another note still uses it", async () => {
    const noteA = await seedNoteWithTags("A", ["trabajo"]);
    const noteB = await seedNoteWithTags("B", ["trabajo"]);
    const trabajoId = noteA.tags[0]?.id;

    const response = await request(app).delete(
      `/api/v1/notas/${noteA.notaId}/etiquetas/${trabajoId}`,
    );

    expect(response.status).toBe(204);

    const etiqueta = await prisma.etiqueta.findUnique({ where: { id: trabajoId } });
    expect(etiqueta?.name).toBe("trabajo");

    const detailB = await request(app).get(`/api/v1/notas/${noteB.notaId}`);
    expect(detailB.body.data.tags.map((tag: { name: string }) => tag.name)).toEqual(["trabajo"]);
  });

  it("returns 404 when note does not exist", async () => {
    const etiqueta = await prisma.etiqueta.create({ data: { name: "ideas" } });

    const response = await request(app).delete(
      `/api/v1/notas/550e8400-e29b-41d4-a716-446655440000/etiquetas/${etiqueta.id}`,
    );

    expect(response.status).toBe(404);
    expect(response.body.error.code).toBe("NOT_FOUND");
  });

  it("returns 404 when association does not exist", async () => {
    const { notaId } = await seedNoteWithTags("Solo una", ["ideas"]);
    const orphanTag = await prisma.etiqueta.create({ data: { name: "huérfana" } });

    const response = await request(app).delete(
      `/api/v1/notas/${notaId}/etiquetas/${orphanTag.id}`,
    );

    expect(response.status).toBe(404);
    expect(response.body.error.code).toBe("NOT_FOUND");
  });
});
