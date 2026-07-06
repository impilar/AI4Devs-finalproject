const EXCERPT_MAX_LENGTH = 120;

export function buildExcerpt(content: string): string {
  const normalized = content.trim().replace(/\s+/g, " ");

  if (normalized.length <= EXCERPT_MAX_LENGTH) {
    return normalized;
  }

  return `${normalized.slice(0, EXCERPT_MAX_LENGTH).trimEnd()}…`;
}
