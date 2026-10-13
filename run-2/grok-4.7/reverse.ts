/**
 * Reverse a string by extended grapheme cluster so emoji, skin-tone
 * modifiers, and combining marks stay intact.
 */
export function reverseString(input: string): string {
  const segmenter = new Intl.Segmenter(undefined, { granularity: "grapheme" });
  const graphemes: string[] = [];

  for (const { segment } of segmenter.segment(input)) {
    graphemes.push(segment);
  }

  return graphemes.reverse().join("");
}
