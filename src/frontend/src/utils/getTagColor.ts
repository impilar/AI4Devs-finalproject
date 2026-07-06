const TAG_PALETTE = [
  "#4F7CFF",
  "#8B5CFF",
  "#7DE2D1",
  "#FFB347",
  "#FF6B9D",
  "#4ECB8D",
  "#FF6B6B",
] as const;

export function getTagColor(tag: string): string {
  let hash = 0;

  for (let index = 0; index < tag.length; index += 1) {
    hash = tag.charCodeAt(index) + ((hash << 5) - hash);
  }

  const paletteIndex = Math.abs(hash) % TAG_PALETTE.length;
  return TAG_PALETTE[paletteIndex];
}
