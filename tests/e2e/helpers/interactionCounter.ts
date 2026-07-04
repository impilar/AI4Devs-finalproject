export function createInteractionCounter() {
  let count = 0;

  return {
    recordClick(): void {
      count += 1;
    },
    getCount(): number {
      return count;
    },
    reset(): void {
      count = 0;
    },
  };
}
