import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { reverseString } from "./reverse.ts";

describe("reverseString", () => {
  it("reverses an empty string", () => {
    assert.equal(reverseString(""), "");
  });

  it("reverses ASCII text", () => {
    assert.equal(reverseString("hello"), "olleh");
  });

  it("reverses an emoji without splitting surrogate pairs", () => {
    assert.equal(reverseString("👋🌍"), "🌍👋");
  });

  it("reverses a precomposed accented character as one grapheme", () => {
    assert.equal(reverseString("café"), "éfac");
  });

  it("reverses decomposed é (e + combining acute) as one grapheme", () => {
    const eAcute = "e\u0301"; // é as two code points
    assert.equal(reverseString(`caf${eAcute}`), `${eAcute}fac`);
  });
});
