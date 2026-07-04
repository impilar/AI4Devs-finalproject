import type { NotaDetailRow, NotaListRow } from "../repositories/nota.repository.js";
import type { NotaDetail, NotaResumen } from "../schemas/nota.schema.js";

export function toResumen(nota: NotaListRow): NotaResumen {
  return {
    id: nota.id,
    title: nota.title,
    createdAt: nota.createdAt.toISOString(),
    updatedAt: nota.updatedAt.toISOString(),
  };
}

export function toDetail(nota: NotaDetailRow): NotaDetail {
  const links = nota.enlaces
    .slice()
    .sort((left, right) => left.createdAt.getTime() - right.createdAt.getTime())
    .map((enlace) => enlace.url);

  const tags = nota.etiquetas
    .map((association) => association.etiqueta.name)
    .sort((left, right) => left.localeCompare(right));

  return {
    id: nota.id,
    title: nota.title,
    content: nota.content,
    createdAt: nota.createdAt.toISOString(),
    updatedAt: nota.updatedAt.toISOString(),
    links,
    tags,
  };
}
