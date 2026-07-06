import { etiquetaRepository } from "../repositories/etiqueta.repository.js";

export function normalizeTagNames(tags: string[]): string[] {
  const seen = new Set<string>();
  const normalized: string[] = [];

  for (const tag of tags) {
    const name = tag.trim();

    if (!name || seen.has(name)) {
      continue;
    }

    seen.add(name);
    normalized.push(name);
  }

  return normalized;
}

export const etiquetaService = {
  async listCatalog() {
    return etiquetaRepository.findAllWithCount();
  },

  async listNames(): Promise<string[]> {
    return etiquetaRepository.findAllNames();
  },

  async upsertByNames(names: string[]): Promise<Map<string, string>> {
    const normalized = normalizeTagNames(names);
    const nameToId = new Map<string, string>();

    for (const name of normalized) {
      const etiqueta = await etiquetaRepository.upsertByName(name);
      nameToId.set(etiqueta.name, etiqueta.id);
    }

    return nameToId;
  },
};
