export function getAnswerDigitLimit(answer: number): number {
  return Math.max(1, Math.min(8, String(answer).length));
}

export function evaluateAnswer(rawValue: string, expected: number, force = false): {
  raw: string;
  status: "pending" | "invalid" | "correct" | "incorrect";
} {
  const raw = rawValue.trim();
  // Auto-check waits for all digits; explicit Submit can check a shorter answer.
  if (raw === "" || (!force && raw.length < getAnswerDigitLimit(expected))) {
    return { raw, status: "pending" };
  }

  const parsed = Number(raw);
  if (Number.isNaN(parsed)) return { raw, status: "invalid" };
  return { raw, status: parsed === expected ? "correct" : "incorrect" };
}
