import { z } from "zod";
import { NotaResumenSchema } from "./nota.schema.js";

export const SearchQuerySchema = z.object({
  q: z.string().trim().min(1, "El término de búsqueda es obligatorio"),
  order: z.enum(["relevance", "date"]).default("relevance"),
});

export const SearchResultSchema = z.object({
  data: z.array(NotaResumenSchema),
  meta: z.object({
    q: z.string(),
    total: z.number().int().nonnegative(),
  }),
});

export type SearchQuery = z.infer<typeof SearchQuerySchema>;
