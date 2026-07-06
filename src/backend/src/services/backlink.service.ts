import { Prisma } from "@prisma/client";
import { AppError } from "../errors/AppError.js";
import { NotFoundError } from "../errors/NotFoundError.js";
import { notaRepository } from "../repositories/nota.repository.js";
import { backlinkRepository } from "../repositories/backlink.repository.js";
import type { NoteRef } from "../schemas/backlink.schema.js";

export const backlinkService = {
  async create(origenId: string, destinoId: string) {
    if (origenId === destinoId) {
      throw new AppError(
        "VALIDATION_ERROR",
        "Una nota no puede enlazarse consigo misma",
        400,
      );
    }

    const [origen, destino] = await Promise.all([
      notaRepository.findById(origenId),
      notaRepository.findById(destinoId),
    ]);

    if (!origen || !destino) {
      throw new NotFoundError();
    }

    const duplicate = await backlinkRepository.exists(origenId, destinoId);

    if (duplicate) {
      throw new AppError("VALIDATION_ERROR", "El enlace ya existe", 400);
    }

    try {
      return await backlinkRepository.create(origenId, destinoId);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
        throw new AppError("VALIDATION_ERROR", "El enlace ya existe", 400);
      }

      throw error;
    }
  },

  async listSalientes(origenId: string): Promise<NoteRef[]> {
    const nota = await notaRepository.findById(origenId);

    if (!nota) {
      throw new NotFoundError();
    }

    return backlinkRepository.findSalientes(origenId);
  },

  async listEntrantes(destinoId: string): Promise<NoteRef[]> {
    const nota = await notaRepository.findById(destinoId);

    if (!nota) {
      throw new NotFoundError();
    }

    return backlinkRepository.findEntrantes(destinoId);
  },
};
