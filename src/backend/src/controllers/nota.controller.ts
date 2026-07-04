import type { Request, Response } from "express";
import { notaService } from "../services/nota.service.js";
import { ListNotasQuerySchema } from "../schemas/nota.schema.js";

export async function listNotas(req: Request, res: Response): Promise<void> {
  const query = ListNotasQuerySchema.parse(req.query);
  const result = await notaService.list(query);

  res.status(200).json(result);
}
