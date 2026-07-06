import type { Request, Response } from "express";
import { etiquetaService } from "../services/etiqueta.service.js";
import { ListEtiquetasResponseSchema } from "../schemas/etiqueta.schema.js";

export async function listEtiquetas(_req: Request, res: Response): Promise<void> {
  const data = await etiquetaService.listCatalog();
  const body = ListEtiquetasResponseSchema.parse({ data });
  res.status(200).json(body);
}
