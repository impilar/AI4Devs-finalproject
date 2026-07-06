import { z } from "zod";

export const NoteRefSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
});

export const CreateBacklinkDtoSchema = z.object({
  destinoId: z.string().uuid("Identificador de nota destino inválido"),
});

export const CreateBacklinkResponseSchema = z.object({
  data: z.object({
    origenId: z.string().uuid(),
    destinoId: z.string().uuid(),
    destino: NoteRefSchema,
  }),
});

export const ListBacklinksResponseSchema = z.object({
  data: z.array(NoteRefSchema),
});

export type CreateBacklinkDto = z.infer<typeof CreateBacklinkDtoSchema>;
export type NoteRef = z.infer<typeof NoteRefSchema>;
