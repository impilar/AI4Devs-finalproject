import { z } from "zod";

export const EtiquetaCatalogItemSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  count: z.number().int().nonnegative(),
});

export const ListEtiquetasResponseSchema = z.object({
  data: z.array(EtiquetaCatalogItemSchema),
});

export type EtiquetaCatalogItem = z.infer<typeof EtiquetaCatalogItemSchema>;
