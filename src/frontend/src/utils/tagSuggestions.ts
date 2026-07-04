const knownTags = new Set<string>();

export function registerTags(tags: string[]): void {
  for (const tag of tags) {
    const name = tag.trim();

    if (name) {
      knownTags.add(name);
    }
  }
}

export function getTagSuggestions(): string[] {
  return [...knownTags].sort((left, right) => left.localeCompare(right));
}

export function clearTagSuggestionsForTests(): void {
  knownTags.clear();
}
