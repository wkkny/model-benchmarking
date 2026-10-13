const graphemeSegmenter = new Intl.Segmenter(undefined, {
  granularity: "grapheme",
});

export function reverseString(input: string): string {
  const graphemes = [...graphemeSegmenter.segment(input)].map(
    (part) => part.segment,
  );
  return graphemes.reverse().join("");
}
