import type { Request, Response } from "express";
import { searchService } from "../services/search.service.js";
import { SearchQuerySchema } from "../schemas/search.schema.js";

export async function searchNotas(req: Request, res: Response): Promise<void> {
  const query = SearchQuerySchema.parse(req.query);
  const result = await searchService.search(query);

  res.status(200).json(result);
}
