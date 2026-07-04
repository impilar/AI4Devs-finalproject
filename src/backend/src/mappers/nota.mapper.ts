import type { NotaListRow } from "../repositories/nota.repository.js";
import type { NotaResumen } from "../schemas/nota.schema.js";

export function toResumen(nota: NotaListRow): NotaResumen {
  return {
    id: nota.id,
    title: nota.title,
    createdAt: nota.createdAt.toISOString(),
    updatedAt: nota.updatedAt.toISOString(),
  };
}
