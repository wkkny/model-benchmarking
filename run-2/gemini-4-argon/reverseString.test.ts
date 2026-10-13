import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { reverseString } from "./reverseString.ts";

describe("reverseString", () => {
  it("handles an empty string", () => {
    assert.equal(reverseString(""), "");
  });

  it("reverses a basic ASCII string", () => {
    assert.equal(reverseString("hello"), "olleh");
  });

  it("handles single-codepoint and surrogate-pair emojis", () => {
    assert.equal(reverseString("a🚀b🎉c"), "c🎉b🚀a");
  });

  it("handles decomposed combined characters like 'e' + combining acute accent (é)", () => {
    const input = "cafe\u0301";
    const expected = "e\u0301fac";
    assert.equal(reverseString(input), expected);
  });

  it("handles multi-codepoint ZWJ emoji sequences and skin tone modifiers", () => {
    const input = "👋🏽👨‍👩‍👧‍👦!";
    const expected = "!👨‍👩‍👧‍👦👋🏽";
    assert.equal(reverseString(input), expected);
  });
});
