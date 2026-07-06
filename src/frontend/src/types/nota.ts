export type CreateNotaDto = {
  title: string;
  content: string;
  links?: string[];
  tags?: string[];
};

export type UpdateNotaDto = {
  title?: string;
  content?: string;
  links?: string[];
  tags?: string[];
};

export type TagRef = {
  id: string;
  name: string;
};

export type NoteRef = {
  id: string;
  title: string;
};

export type NotaResumen = {
  id: string;
  title: string;
  excerpt: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
};

export type NotaDetail = Omit<NotaResumen, "tags"> & {
  content: string;
  links: string[];
  tags: TagRef[];
};

export type ListNotasResponse = {
  data: NotaResumen[];
  meta: { total: number };
};

export type ListEtiquetasResponse = {
  data: EtiquetaCatalogItem[];
};

export type EtiquetaCatalogItem = {
  id: string;
  name: string;
  count: number;
};

export type NotaDetailResponse = {
  data: NotaDetail;
};

export type CreateNotaResponse = NotaDetailResponse;

export type UpdateNotaResponse = NotaDetailResponse;

export type CreateBacklinkDto = {
  destinoId: string;
};

export type CreateBacklinkResponse = {
  data: {
    origenId: string;
    destinoId: string;
    destino: NoteRef;
  };
};

export type ListBacklinksResponse = {
  data: NoteRef[];
};

export type SearchOrder = "relevance" | "date";

export type NoteListSort = "created_at" | "title";
export type NoteListOrder = "asc" | "desc";

export type SearchResponse = {
  data: NotaResumen[];
  meta: { q: string; total: number };
};
