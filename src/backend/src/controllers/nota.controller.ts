import type { NextFunction, Request, Response } from "express";
import { notaService } from "../services/nota.service.js";
import { ListNotasQuerySchema } from "../schemas/nota.schema.js";

export async function listNotas(req: Request, res: Response): Promise<void> {
  const query = ListNotasQuerySchema.parse(req.query);
  const result = await notaService.list(query);

  res.status(200).json(result);
}

export async function getNota(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const data = await notaService.getById(req.params.id);
    res.status(200).json({ data });
  } catch (error) {
    next(error);
  }
}
