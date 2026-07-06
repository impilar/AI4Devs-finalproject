import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { prisma } from "../../../src/backend/src/lib/prisma.js";
import { notaRepository } from "../../../src/backend/src/repositories/nota.repository.js";

const hasDatabase = Boolean(process.env.DATABASE_URL);

describe.skipIf(!hasDatabase)("nota repository findAll (TASK-003)", () => {
  beforeAll(async () => {
    await prisma.$connect();
  });

  beforeEach(async () => {
    await prisma.nota.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("has idx_notas_created_at index in PostgreSQL", async () => {
    const rows = await prisma.$queryRaw<{ indexname: string }[]>`
      SELECT indexname
      FROM pg_indexes
      WHERE tablename = 'notas'
        AND indexname = 'idx_notas_created_at'
    `;

    expect(rows).toHaveLength(1);
    expect(rows[0]?.indexname).toBe("idx_notas_created_at");
  });

  it("returns notes ordered by createdAt descending by default", async () => {
    const baseTime = new Date("2026-01-01T10:00:00.000Z");
    const oldest = await prisma.nota.create({
      data: {
        title: "Oldest",
        content: "First note",
        createdAt: baseTime,
        updatedAt: baseTime,
      },
    });
    const middle = await prisma.nota.create({
      data: {
        title: "Middle",
        content: "Second note",
        createdAt: new Date("2026-01-02T10:00:00.000Z"),
        updatedAt: new Date("2026-01-02T10:00:00.000Z"),
      },
    });
    const newest = await prisma.nota.create({
      data: {
        title: "Newest",
        content: "Third note",
        createdAt: new Date("2026-01-03T10:00:00.000Z"),
        updatedAt: new Date("2026-01-03T10:00:00.000Z"),
      },
    });

    const notes = await notaRepository.findAll();

    expect(notes.map((note) => note.id)).toEqual([newest.id, middle.id, oldest.id]);
  });

  it("plans list query with created_at DESC sort key", async () => {
    const notes = Array.from({ length: 101 }, (_, index) => ({
      title: `Note ${String(index).padStart(3, "0")}`,
      content: `Content ${index}`,
    }));

    await prisma.nota.createMany({ data: notes });

    const plan = await prisma.$queryRaw<{ "QUERY PLAN": string }[]>`
      EXPLAIN
      SELECT id, title, created_at, updated_at
      FROM notas
      ORDER BY created_at DESC
    `;

    const planText = plan.map((row) => row["QUERY PLAN"]).join("\n");
    expect(planText).toMatch(/idx_notas_created_at|created_at DESC/);
  });
});
