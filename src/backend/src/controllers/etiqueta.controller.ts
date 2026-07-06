import type { Request, Response } from "express";
import { etiquetaService } from "../services/etiqueta.service.js";

export async function listEtiquetas(_req: Request, res: Response): Promise<void> {
  const data = await etiquetaService.listNames();
  res.status(200).json({ data });
}
