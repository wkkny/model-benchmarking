import assert from "node:assert/strict";
import test from "node:test";
import { reverseString } from "./reverse.ts";

const combiningEAcute = "e\u0301";

test("empty string", () => {
  assert.equal(reverseString(""), "");
});

test("emoji is not split", () => {
  assert.equal(reverseString("a😀b"), "b😀a");
});

test("combining é stays with its base letter", () => {
  assert.equal(reverseString(`caf${combiningEAcute}`), `${combiningEAcute}fac`);
  assert.equal([...reverseString(combiningEAcute)].length > 1, true);
  assert.equal(reverseString(combiningEAcute), combiningEAcute);
});

test("plain ascii", () => {
  assert.equal(reverseString("hello"), "olleh");
});

test("zwj family emoji stays one cluster", () => {
  const family = "👨‍👩‍👧‍👦";
  assert.equal(reverseString(`x${family}y`), `y${family}x`);
});
