import assert from "node:assert/strict";
import { test } from "node:test";
import { reverseString } from "./reverse.ts";

test("1. empty string", () => {
  assert.strictEqual(reverseString(""), "");
});

test("2. single and surrogate-pair emoji", () => {
  assert.strictEqual(reverseString("hello 👋🌍"), "🌍👋 olleh");
});

test("3. combined character 'é' (e + U+0301 combining acute accent)", () => {
  const input = "cafe\u0301";
  const expected = "e\u0301fac";
  assert.strictEqual(reverseString(input), expected);
});

test("4. ZWJ emoji sequence and skin tone modifiers", () => {
  assert.strictEqual(reverseString("A👨‍👩‍👧‍👦👍🏽B"), "B👍🏽👨‍👩‍👧‍👦A");
});

test("5. standard ASCII text", () => {
  assert.strictEqual(reverseString("TypeScript"), "tpircSepyT");
});
