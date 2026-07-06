import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import request from "supertest";
import { createApp } from "../../../src/backend/src/app.js";
import { prisma } from "../../../src/backend/src/lib/prisma.js";

const hasDatabase = Boolean(process.env.DATABASE_URL);

describe.skipIf(!hasDatabase)("Note backlinks API (US-017)", () => {
  const app = createApp();

  beforeAll(async () => {
    await prisma.$connect();
  });

  beforeEach(async () => {
    await prisma.notaBacklink.deleteMany();
    await prisma.enlace.deleteMany();
    await prisma.notaEtiqueta.deleteMany();
    await prisma.etiqueta.deleteMany();
    await prisma.nota.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  async function seedPair() {
    const origen = await prisma.nota.create({
      data: { title: "Ideas de proyecto", content: "Contenido origen" },
    });
    const destino = await prisma.nota.create({
      data: { title: "Investigación de mercado", content: "Contenido destino" },
    });

    return { origen, destino };
  }

  it("POST creates backlink and returns destination title", async () => {
    const { origen, destino } = await seedPair();

    const response = await request(app)
      .post(`/api/v1/notas/${origen.id}/backlinks`)
      .send({ destinoId: destino.id });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      data: {
        origenId: origen.id,
        destinoId: destino.id,
        destino: { id: destino.id, title: "Investigación de mercado" },
      },
    });
  });

  it("GET salientes lists destination notes", async () => {
    const { origen, destino } = await seedPair();

    await request(app)
      .post(`/api/v1/notas/${origen.id}/backlinks`)
      .send({ destinoId: destino.id });

    const response = await request(app).get(`/api/v1/notas/${origen.id}/backlinks/salientes`);

    expect(response.status).toBe(200);
    expect(response.body.data).toEqual([
      { id: destino.id, title: "Investigación de mercado" },
    ]);
  });

  it("GET entrantes lists origin notes on target", async () => {
    const plan = await prisma.nota.create({
      data: { title: "Plan Q3", content: "Contenido plan" },
    });
    const objetivos = await prisma.nota.create({
      data: { title: "Objetivos anuales", content: "Contenido objetivos" },
    });

    await request(app)
      .post(`/api/v1/notas/${plan.id}/backlinks`)
      .send({ destinoId: objetivos.id });

    const response = await request(app).get(
      `/api/v1/notas/${objetivos.id}/backlinks/entrantes`,
    );

    expect(response.status).toBe(200);
    expect(response.body.data).toEqual([{ id: plan.id, title: "Plan Q3" }]);
  });

  it("rejects self-link with 400", async () => {
    const { origen } = await seedPair();

    const response = await request(app)
      .post(`/api/v1/notas/${origen.id}/backlinks`)
      .send({ destinoId: origen.id });

    expect(response.status).toBe(400);
    expect(response.body.error.code).toBe("VALIDATION_ERROR");
  });

  it("rejects duplicate backlink with 400", async () => {
    const { origen, destino } = await seedPair();

    await request(app)
      .post(`/api/v1/notas/${origen.id}/backlinks`)
      .send({ destinoId: destino.id });

    const response = await request(app)
      .post(`/api/v1/notas/${origen.id}/backlinks`)
      .send({ destinoId: destino.id });

    expect(response.status).toBe(400);
    expect(response.body.error.code).toBe("VALIDATION_ERROR");
  });

  it("returns 404 when origin note does not exist", async () => {
    const destino = await prisma.nota.create({
      data: { title: "Solo destino", content: "Contenido" },
    });

    const response = await request(app)
      .post("/api/v1/notas/550e8400-e29b-41d4-a716-446655440000/backlinks")
      .send({ destinoId: destino.id });

    expect(response.status).toBe(404);
    expect(response.body.error.code).toBe("NOT_FOUND");
  });

  it("cascades backlinks when origin note is deleted", async () => {
    const { origen, destino } = await seedPair();

    await request(app)
      .post(`/api/v1/notas/${origen.id}/backlinks`)
      .send({ destinoId: destino.id });

    await request(app).delete(`/api/v1/notas/${origen.id}`);

    const remaining = await prisma.notaBacklink.findMany();
    expect(remaining).toHaveLength(0);
  });
});
