const segmenter = new Intl.Segmenter(undefined, { granularity: "grapheme" });

export function reverseString(input: string): string {
  return Array.from(segmenter.segment(input), ({ segment }) => segment)
    .reverse()
    .join("");
}
