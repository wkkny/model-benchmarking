import assert from "node:assert/strict";
import { test } from "node:test";
import { reverseString } from "./reverse.ts";

test("reverses an empty string", () => {
  assert.equal(reverseString(""), "");
});

test("reverses an emoji without splitting its surrogate pair", () => {
  assert.equal(reverseString("a😀b"), "b😀a");
});

test("keeps a combining character attached to its base", () => {
  const eAcute = "e\u0301";
  assert.equal(reverseString(`a${eAcute}b`), `b${eAcute}a`);
});

test("reverses a plain ASCII string", () => {
  assert.equal(reverseString("hello"), "olleh");
});

test("keeps a ZWJ emoji sequence as one grapheme", () => {
  const family = "👨\u200d👩\u200d👧";
  assert.equal(reverseString(`x${family}y`), `y${family}x`);
});
