import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { reverseString } from "./reverseString.js";

describe("reverseString", () => {
  it("reverses an empty string", () => {
    assert.equal(reverseString(""), "");
  });

  it("reverses plain ASCII", () => {
    assert.equal(reverseString("hello"), "olleh");
  });

  it("reverses emoji without splitting code units", () => {
    assert.equal(reverseString("👋🌍"), "🌍👋");
  });

  it("reverses a precomposed accented character as one grapheme", () => {
    assert.equal(reverseString("café"), "éfac");
  });

  it("reverses decomposed e + combining acute as one grapheme", () => {
    const eAcute = "e\u0301";
    assert.equal(reverseString(`ab${eAcute}c`), `c${eAcute}ba`);
  });
});
