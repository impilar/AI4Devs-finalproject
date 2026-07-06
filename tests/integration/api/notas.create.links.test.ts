import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import request from "supertest";
import { createApp } from "../../../src/backend/src/app.js";
import { prisma } from "../../../src/backend/src/lib/prisma.js";

const hasDatabase = Boolean(process.env.DATABASE_URL);

describe.skipIf(!hasDatabase)("POST /api/v1/notas links (TASK-021)", () => {
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

  it("persists zero links when links array is omitted", async () => {
    const response = await request(app).post("/api/v1/notas").send({
      title: "Sin enlaces",
      content: "Contenido",
    });

    expect(response.status).toBe(201);
    expect(response.body.data.links).toEqual([]);

    const enlaces = await prisma.enlace.findMany({
      where: { notaId: response.body.data.id },
    });
    expect(enlaces).toHaveLength(0);
  });

  it("persists a single valid link", async () => {
    const response = await request(app)
      .post("/api/v1/notas")
      .send({
        title: "Con enlace",
        content: "Contenido",
        links: ["https://example.com/docs"],
      });

    expect(response.status).toBe(201);
    expect(response.body.data.links).toEqual(["https://example.com/docs"]);

    const enlaces = await prisma.enlace.findMany({
      where: { notaId: response.body.data.id },
    });
    expect(enlaces).toHaveLength(1);
    expect(enlaces[0]?.url).toBe("https://example.com/docs");
  });

  it("persists multiple valid links in submission order", async () => {
    const response = await request(app)
      .post("/api/v1/notas")
      .send({
        title: "Varios enlaces",
        content: "Contenido",
        links: [
          "https://docs.example.com/mvp",
          "https://www.prisma.io/docs",
        ],
      });

    expect(response.status).toBe(201);
    expect(response.body.data.links).toEqual([
      "https://docs.example.com/mvp",
      "https://www.prisma.io/docs",
    ]);

    const enlaces = await prisma.enlace.findMany({
      where: { notaId: response.body.data.id },
      orderBy: { createdAt: "asc" },
    });
    expect(enlaces.map((enlace) => enlace.url)).toEqual([
      "https://docs.example.com/mvp",
      "https://www.prisma.io/docs",
    ]);
  });

  it("returns 400 for invalid link URL", async () => {
    const response = await request(app).post("/api/v1/notas").send({
      title: "Enlace inválido",
      content: "Contenido",
      links: ["no-es-url"],
    });

    expect(response.status).toBe(400);
    expect(response.body.error.code).toBe("VALIDATION_ERROR");
    expect(response.body.error.details).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          field: "links.0",
          message: "URL con formato inválido",
        }),
      ]),
    );

    expect(await prisma.nota.count()).toBe(0);
  });

  it("returns 400 when one link in the array is invalid", async () => {
    const response = await request(app)
      .post("/api/v1/notas")
      .send({
        title: "Mix válido/inválido",
        content: "Contenido",
        links: ["https://example.com", "no-es-url"],
      });

    expect(response.status).toBe(400);
    expect(response.body.error.code).toBe("VALIDATION_ERROR");
    expect(response.body.error.details).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ field: "links.1" }),
      ]),
    );

    expect(await prisma.nota.count()).toBe(0);
  });
});
