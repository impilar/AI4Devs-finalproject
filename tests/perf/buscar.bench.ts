import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createApp } from "../../src/backend/src/app.js";
import { prisma } from "../../src/backend/src/lib/prisma.js";

const hasDatabase = Boolean(process.env.DATABASE_URL);
const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const backendRoot = path.join(repoRoot, "src/backend");
const dbSetupScript = path.join(backendRoot, "src/05-scripts/e2e-db-setup.ts");

function seedBenchNotes(): void {
  const databaseUrl = process.env.DATABASE_URL ?? "postgresql://okc:okc@localhost:5432/okc";
  const result = spawnSync("npx", ["tsx", dbSetupScript, "bench"], {
    cwd: backendRoot,
    env: { ...process.env, DATABASE_URL: databaseUrl },
    encoding: "utf-8",
  });

  if (result.status !== 0) {
    throw new Error(result.stderr || result.stdout || "bench seed failed");
  }
}

function percentile(values: number[], ratio: number): number {
  const sorted = [...values].sort((left, right) => left - right);
  const index = Math.min(sorted.length - 1, Math.ceil(sorted.length * ratio) - 1);
  return sorted[index] ?? 0;
}

describe.skipIf(!hasDatabase)("GET /api/v1/buscar performance", () => {
  const app = createApp();

  beforeAll(async () => {
    await prisma.$connect();
    seedBenchNotes();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("responds within 300 ms p95 for 100 search requests with 500 notes", async () => {
    const timings: number[] = [];

    for (let index = 0; index < 100; index += 1) {
      const startedAt = performance.now();
      const response = await request(app).get("/api/v1/buscar?q=buscable");
      timings.push(performance.now() - startedAt);

      expect(response.status).toBe(200);
    }

    const p95 = percentile(timings, 0.95);
    expect(p95).toBeLessThan(300);
  });
});
