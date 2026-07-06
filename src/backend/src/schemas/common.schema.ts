import { z } from "zod";

export const IdParamSchema = z.object({
  id: z.string().uuid("Identificador de nota inválido"),
});

export const NotaTagParamsSchema = z.object({
  id: z.string().uuid("Identificador de nota inválido"),
  etiquetaId: z.string().uuid("Identificador de etiqueta inválido"),
});

export type IdParam = z.infer<typeof IdParamSchema>;
export type NotaTagParams = z.infer<typeof NotaTagParamsSchema>;
