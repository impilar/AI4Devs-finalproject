import { z } from "zod";

export const IdParamSchema = z.object({
  id: z.string().uuid("Identificador de nota inválido"),
});

export type IdParam = z.infer<typeof IdParamSchema>;
