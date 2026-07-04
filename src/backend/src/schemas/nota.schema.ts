import { z } from "zod";

export const ListNotasQuerySchema = z.object({
  etiqueta: z.string().trim().optional(),
  sort: z.enum(["created_at", "title"]).default("created_at"),
  order: z.enum(["asc", "desc"]).default("desc"),
});

export const NotaResumenSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const NotaDetailSchema = NotaResumenSchema.extend({
  content: z.string(),
  links: z.array(z.string().url()),
  tags: z.array(z.string()),
});

export type ListNotasQuery = z.infer<typeof ListNotasQuerySchema>;
export type NotaResumen = z.infer<typeof NotaResumenSchema>;
export type NotaDetail = z.infer<typeof NotaDetailSchema>;
