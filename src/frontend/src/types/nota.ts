export type CreateNotaDto = {
  title: string;
  content: string;
  links?: string[];
  tags?: string[];
};

export type NotaResumen = {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
};

export type NotaDetail = NotaResumen & {
  content: string;
  links: string[];
  tags: string[];
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

export type SearchOrder = "relevance" | "date";

export type SearchResponse = {
  data: NotaResumen[];
  meta: { q: string; total: number };
};
