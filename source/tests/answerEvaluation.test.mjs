import assert from "node:assert/strict";
import { test } from "vitest";
import { evaluateAnswer, getAnswerDigitLimit } from "../src/answerEvaluation.ts";

test("digit limits cover zero, digit boundaries, and the eight-character cap", () => {
  for (const [answer, limit] of [[0, 1], [9, 1], [10, 2], [99, 2], [100, 3], [12345678, 8], [123456789, 8]]) {
    assert.equal(getAnswerDigitLimit(answer), limit);
  }
});

test("auto-check waits for the complete answer length before accepting or rejecting", () => {
  assert.deepEqual(evaluateAnswer("1", 12), { raw: "1", status: "pending" });
  assert.deepEqual(evaluateAnswer("9", 12), { raw: "9", status: "pending" });
  assert.deepEqual(evaluateAnswer("12", 12), { raw: "12", status: "correct" });
  assert.deepEqual(evaluateAnswer("13", 12), { raw: "13", status: "incorrect" });
});

test("Submit checks a short answer immediately, including an invalid short answer", () => {
  assert.deepEqual(evaluateAnswer("1", 12, true), { raw: "1", status: "incorrect" });
  assert.deepEqual(evaluateAnswer("x", 12), { raw: "x", status: "pending" });
  assert.deepEqual(evaluateAnswer("x", 12, true), { raw: "x", status: "invalid" });
});

test("empty input remains pending even on Submit, rather than becoming numeric zero", () => {
  for (const force of [false, true]) {
    for (const value of ["", " \t\n"]) {
      assert.deepEqual(evaluateAnswer(value, 0, force), { raw: "", status: "pending" });
    }
  }
  assert.deepEqual(evaluateAnswer("0", 0), { raw: "0", status: "correct" });
});

test("surrounding whitespace is removed and the submitted digits are retained", () => {
  assert.deepEqual(evaluateAnswer(" 12 ", 12), { raw: "12", status: "correct" });
  assert.deepEqual(evaluateAnswer("007", 7), { raw: "007", status: "correct" });
});

test("unparseable complete input is cleared instead of counted as a wrong answer", () => {
  for (const value of ["xx", "1 2", "NaN"]) {
    assert.deepEqual(evaluateAnswer(value, 12), { raw: value, status: "invalid" });
  }
});

test("evaluation retains Number conversion semantics; keypad validation stays in App", () => {
  assert.deepEqual(evaluateAnswer("1e1", 10), { raw: "1e1", status: "correct" });
  assert.deepEqual(evaluateAnswer("Infinity", 12), { raw: "Infinity", status: "incorrect" });
});
