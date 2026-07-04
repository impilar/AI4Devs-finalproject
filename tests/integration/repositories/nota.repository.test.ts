import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { prisma } from "../../../src/backend/src/lib/prisma.js";

const hasDatabase = Boolean(process.env.DATABASE_URL);

describe.skipIf(!hasDatabase)("nota repository (database)", () => {
  beforeAll(async () => {
    await prisma.$connect();
  });

  beforeEach(async () => {
    await prisma.nota.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("inserts a note with generated id and timestamps", async () => {
    const created = await prisma.nota.create({
      data: {
        title: "Test note",
        content: "Body content",
      },
    });

    expect(created.id).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
    );
    expect(created.title).toBe("Test note");
    expect(created.content).toBe("Body content");
    expect(created.createdAt).toBeInstanceOf(Date);
    expect(created.updatedAt).toBeInstanceOf(Date);
  });

  it("rejects empty title at database level", async () => {
    await expect(
      prisma.nota.create({
        data: {
          title: "   ",
          content: "Valid content",
        },
      }),
    ).rejects.toThrow();
  });

  it("rejects empty content at database level", async () => {
    await expect(
      prisma.nota.create({
        data: {
          title: "Valid title",
          content: "",
        },
      }),
    ).rejects.toThrow();
  });
});
