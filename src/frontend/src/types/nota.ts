export type NotaResumen = {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
};

export type ListNotasResponse = {
  data: NotaResumen[];
  meta: { total: number };
};
