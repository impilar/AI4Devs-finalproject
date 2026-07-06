import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import request from "supertest";
import { createApp } from "../../../src/backend/src/app.js";
import { prisma } from "../../../src/backend/src/lib/prisma.js";

const hasDatabase = Boolean(process.env.DATABASE_URL);

describe.skipIf(!hasDatabase)("GET /api/v1/notas", () => {
  const app = createApp();

  beforeAll(async () => {
    await prisma.$connect();
  });

  beforeEach(async () => {
    await prisma.nota.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("returns 200 with empty list when no notes exist", async () => {
    const response = await request(app).get("/api/v1/notas");

    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toMatch(/application\/json/);
    expect(response.body).toEqual({
      data: [],
      meta: { total: 0 },
    });
  });

  it("returns note summaries ordered by createdAt desc by default", async () => {
    const oldest = await prisma.nota.create({
      data: {
        title: "Oldest",
        content: "First",
        createdAt: new Date("2026-01-01T10:00:00.000Z"),
        updatedAt: new Date("2026-01-01T10:00:00.000Z"),
      },
    });
    const middle = await prisma.nota.create({
      data: {
        title: "Middle",
        content: "Second",
        createdAt: new Date("2026-01-02T10:00:00.000Z"),
        updatedAt: new Date("2026-01-02T10:00:00.000Z"),
      },
    });
    const newest = await prisma.nota.create({
      data: {
        title: "Newest",
        content: "Third",
        createdAt: new Date("2026-01-03T10:00:00.000Z"),
        updatedAt: new Date("2026-01-03T10:00:00.000Z"),
      },
    });

    const response = await request(app).get("/api/v1/notas");

    expect(response.status).toBe(200);
    expect(response.body.meta).toEqual({ total: 3 });
    expect(response.body.data).toHaveLength(3);
    expect(response.body.data[0]).toMatchObject({
      id: newest.id,
      title: "Newest",
      excerpt: "Third",
      tags: [],
      createdAt: newest.createdAt.toISOString(),
      updatedAt: newest.updatedAt.toISOString(),
    });
    expect(response.body.data[1].id).toBe(middle.id);
    expect(response.body.data[2].id).toBe(oldest.id);
  });

  it("returns 400 for invalid sort query parameter", async () => {
    const response = await request(app).get("/api/v1/notas?sort=invalid");

    expect(response.status).toBe(400);
    expect(response.body.error.code).toBe("VALIDATION_ERROR");
  });
});
