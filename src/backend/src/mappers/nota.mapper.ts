import { buildExcerpt } from "../lib/excerpt.js";
import type { NotaDetailRow, NotaListRow } from "../repositories/nota.repository.js";
import type { NotaDetail, NotaResumen } from "../schemas/nota.schema.js";

function mapTags(etiquetas: NotaListRow["etiquetas"]): string[] {
  return etiquetas
    .map((association) => association.etiqueta.name)
    .sort((left, right) => left.localeCompare(right));
}

export function toResumen(nota: NotaListRow): NotaResumen {
  return {
    id: nota.id,
    title: nota.title,
    excerpt: buildExcerpt(nota.content),
    tags: mapTags(nota.etiquetas),
    createdAt: nota.createdAt.toISOString(),
    updatedAt: nota.updatedAt.toISOString(),
  };
}

function mapTagRefs(etiquetas: NotaDetailRow["etiquetas"]): NotaDetail["tags"] {
  return etiquetas
    .map((association) => ({
      id: association.etiqueta.id,
      name: association.etiqueta.name,
    }))
    .sort((left, right) => left.name.localeCompare(right.name));
}

export function toDetail(nota: NotaDetailRow): NotaDetail {
  const links = nota.enlaces
    .slice()
    .sort((left, right) => left.createdAt.getTime() - right.createdAt.getTime())
    .map((enlace) => enlace.url);

  return {
    id: nota.id,
    title: nota.title,
    excerpt: buildExcerpt(nota.content),
    tags: mapTagRefs(nota.etiquetas),
    content: nota.content,
    createdAt: nota.createdAt.toISOString(),
    updatedAt: nota.updatedAt.toISOString(),
    links,
  };
}
