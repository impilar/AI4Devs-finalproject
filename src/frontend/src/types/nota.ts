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
  data: string[];
};

export type NotaDetailResponse = {
  data: NotaDetail;
};

export type CreateNotaResponse = NotaDetailResponse;

export type UpdateNotaResponse = NotaDetailResponse;

export type SearchOrder = "relevance" | "date";

export type SearchResponse = {
  data: NotaResumen[];
  meta: { q: string; total: number };
};
