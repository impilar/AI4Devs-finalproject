import request from "supertest";
import { describe, expect, it } from "vitest";
import { createApp } from "../../src/backend/src/app.js";

describe("GET /api/v1/health", () => {
  it("returns 200 and ok status", async () => {
    const app = createApp();
    const response = await request(app).get("/api/v1/health");

    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toMatch(/application\/json/);
    expect(response.body).toEqual({ status: "ok" });
  });
});
