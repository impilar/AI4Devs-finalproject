import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { AppError } from "../errors/AppError.js";
import { NotFoundError } from "../errors/NotFoundError.js";
import { backlinkRepository } from "../repositories/backlink.repository.js";
import { notaRepository } from "../repositories/nota.repository.js";
import { backlinkService } from "./backlink.service.js";

vi.mock("../repositories/nota.repository.js", () => ({
  notaRepository: {
    findById: vi.fn(),
  },
}));

vi.mock("../repositories/backlink.repository.js", () => ({
  backlinkRepository: {
    exists: vi.fn(),
    create: vi.fn(),
    findSalientes: vi.fn(),
    findEntrantes: vi.fn(),
  },
}));

describe("backlinkService", () => {
  const origenId = "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaa01";
  const destinoId = "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaa02";

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("rejects self-link with validation error", async () => {
    await expect(backlinkService.create(origenId, origenId)).rejects.toMatchObject({
      code: "VALIDATION_ERROR",
      statusCode: 400,
    });
  });

  it("rejects duplicate links", async () => {
    vi.mocked(notaRepository.findById)
      .mockResolvedValueOnce({ id: origenId } as never)
      .mockResolvedValueOnce({ id: destinoId } as never);
    vi.mocked(backlinkRepository.exists).mockResolvedValue(true);

    await expect(backlinkService.create(origenId, destinoId)).rejects.toBeInstanceOf(AppError);
  });

  it("throws not found when origin note is missing", async () => {
    vi.mocked(notaRepository.findById).mockResolvedValueOnce(null).mockResolvedValueOnce({ id: destinoId } as never);

    await expect(backlinkService.create(origenId, destinoId)).rejects.toBeInstanceOf(NotFoundError);
  });
});
