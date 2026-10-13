/**
 * Reverse a string by Unicode extended grapheme cluster.
 * Emoji (including ZWJ sequences) and combining marks stay attached
 * to the character they modify, so they are not split across the reverse.
 */
export function reverseString(input: string): string {
  const segmenter = new Intl.Segmenter(undefined, { granularity: "grapheme" });
  const graphemes: string[] = [];

  for (const { segment } of segmenter.segment(input)) {
    graphemes.push(segment);
  }

  graphemes.reverse();
  return graphemes.join("");
}
