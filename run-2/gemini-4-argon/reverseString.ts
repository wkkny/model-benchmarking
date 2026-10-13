const graphemeSegmenter = new Intl.Segmenter(undefined, {
  granularity: "grapheme",
});

export function reverseString(input: string): string {
  const segments = Array.from(
    graphemeSegmenter.segment(input),
    (s) => s.segment,
  );
  return segments.reverse().join("");
}
