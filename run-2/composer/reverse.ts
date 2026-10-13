/**
 * Reverses a string by grapheme cluster (user-perceived character), not UTF-16 code units.
 */
export function reverseString(input: string): string {
  const segmenter = new Intl.Segmenter(undefined, { granularity: "grapheme" });
  const graphemes = [...segmenter.segment(input)].map((s) => s.segment);
  graphemes.reverse();
  return graphemes.join("");
}
