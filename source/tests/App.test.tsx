import { StrictMode } from "react";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, expect, test, vi } from "vitest";
import App from "../src/App";

// Only visual transitions are replaced; App, storage, facts and adaptive scoring are real.
vi.mock("motion/react", async () => {
  const { createElement, forwardRef } = await import("react");
  return {
    motion: {
      div: forwardRef(({ initial, animate, exit, transition, ...props }: any, ref) =>
        createElement("div", { ...props, ref })),
    },
    AnimatePresence: ({ children }: any) => children,
  };
});

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date("2026-10-19T00:00:00Z"));
  vi.spyOn(Math, "random").mockReturnValue(0);
  localStorage.clear();
});

afterEach(() => {
  cleanup();
  vi.clearAllTimers();
  vi.useRealTimers();
  vi.restoreAllMocks();
});

function mount() {
  return render(<StrictMode><App /></StrictMode>);
}

function openPractice() {
  fireEvent.click(screen.getByRole("button", { name: "Play" }));
}

function tick(ms: number) {
  act(() => { vi.advanceTimersByTime(ms); });
}

function startRound() {
  openPractice();
  fireEvent.click(screen.getByRole("button", { name: "Start!" }));
  tick(3700);
}

function key(key: string) {
  fireEvent.keyDown(window, { key });
}

function answer() {
  return screen.getByRole("textbox", { name: "Timed round answer" }) as HTMLInputElement;
}

function progress() {
  return JSON.parse(localStorage.getItem("mental_math_journey_v2") || "{}");
}

function totalAttempts() {
  return Object.values(progress().factStats || {}).reduce((sum: number, stats: any) => sum + stats.shown, 0);
}

function score() {
  return Number(screen.getByText("correct").previousElementSibling?.textContent);
}

test("countdown ignores input and repeated Start, then starts one 60-second round", () => {
  mount();
  openPractice();
  const start = screen.getByRole("button", { name: "Start!" });
  fireEvent.click(start);
  fireEvent.click(start);
  key("0");
  expect(screen.getByText("3", { exact: true })).toBeTruthy();
  tick(1000);
  expect(screen.getByText("2", { exact: true })).toBeTruthy();
  tick(1000);
  expect(screen.getByText("1", { exact: true })).toBeTruthy();
  tick(1000);
  expect(screen.getByText("Go!", { exact: true })).toBeTruthy();
  tick(699);
  expect(screen.queryByRole("textbox")).toBeNull();
  tick(1);
  expect(answer().value).toBe("");
  expect(screen.getByText("60s")).toBeTruthy();
  tick(1000);
  expect(screen.getByText("59s")).toBeTruthy();
  expect(totalAttempts()).toBe(0);
});

test("rapid keypad and Enter submissions score once and hold the answer for 275ms", () => {
  mount();
  startRound();
  expect(screen.getByRole("heading", { name: "0 + 0" })).toBeTruthy();
  fireEvent.click(screen.getByRole("button", { name: "0" }));
  key("Enter");
  key("Enter");
  key("9");
  tick(274);
  expect(answer().value).toBe("0");
  expect(screen.getByText("Question 1")).toBeTruthy();
  expect(totalAttempts()).toBe(1);
  expect(score()).toBe(1);
  expect(progress().factStats["same-number:zero-add:0-0"].correct).toBe(1);
  tick(1);
  expect(screen.getByText("Question 2")).toBeTruthy();
  expect(answer().value).toBe("");
});

test("deleting before the deferred auto-check prevents a stale answer from scoring", () => {
  mount();
  startRound();
  key("0");
  key("Backspace");
  tick(50);
  expect(answer().value).toBe("");
  expect(totalAttempts()).toBe(0);
  key("0");
  tick(50);
  expect(totalAttempts()).toBe(1);
});

test("a two-digit fact waits for both digits, while Submit can reject a partial answer", () => {
  localStorage.setItem("mental_math_journey_v2", JSON.stringify({ viewedStrategyIds: [1, 5] }));
  mount();
  fireEvent.click(screen.getAllByRole("button", { name: "Play" })[1]);
  fireEvent.click(screen.getByRole("button", { name: "Start!" }));
  tick(3700);
  key("1");
  tick(50);
  expect(answer().value).toBe("1");
  expect(totalAttempts()).toBe(0);
  key("Enter");
  expect(totalAttempts()).toBe(1);
  expect(score()).toBe(0);
  tick(400);
  key("1");
  key("0");
  tick(50);
  expect(totalAttempts()).toBe(2);
  expect(score()).toBe(1);
});

test("two wrong submissions record one miss and block keyboard and keypad for 1500ms", () => {
  mount();
  startRound();
  key("9");
  key("Enter");
  tick(220);
  expect(answer().value).toBe("");
  tick(180);
  key("9");
  key("Enter");
  expect(screen.getByText("Slow down! Read carefully")).toBeTruthy();
  expect(answer().disabled).toBe(true);
  key("0");
  fireEvent.click(screen.getByRole("button", { name: "0" }));
  tick(1499);
  expect(answer().disabled).toBe(true);
  expect(totalAttempts()).toBe(1);
  expect(progress().factStats["same-number:zero-add:0-0"].incorrect).toBe(1);
  tick(1);
  expect(answer().disabled).toBe(false);
  expect(answer().value).toBe("");
  key("0");
  key("Enter");
  expect(totalAttempts()).toBe(2);
});

test("timeout reveals after 11250ms; copying the answer advances without earning points", () => {
  mount();
  startRound();
  tick(11249);
  expect(screen.queryByText("Type the answer shown to continue")).toBeNull();
  tick(1);
  expect(screen.getByText("Type the answer shown to continue")).toBeTruthy();
  expect(totalAttempts()).toBe(1);
  key("0");
  key("Enter");
  tick(224);
  expect(screen.getByText("Question 1")).toBeTruthy();
  tick(1);
  expect(screen.getByText("Question 2")).toBeTruthy();
  expect(totalAttempts()).toBe(1);
  expect(progress().factStats["same-number:zero-add:0-0"].timeouts).toBe(1);
  expect(progress().factStats["same-number:zero-add:0-0"].correct).toBe(0);
  expect(score()).toBe(0);
});

test.each([false, true])("correcting a wrong answer keeps its full hold (revealed: %s)", (revealed) => {
  mount();
  startRound();
  if (revealed) tick(11250);
  key("9");
  key("Enter");
  tick(220);
  key("0");
  key("Enter");
  tick(180);
  expect(answer().value).toBe("0");
  key("0");
  key("Enter");
  expect(score()).toBe(revealed ? 0 : 1);
  expect(totalAttempts()).toBe(revealed ? 1 : 2);
  tick(revealed ? 45 : 95);
  expect(screen.getByText("Question 2")).toBeTruthy();
  expect(answer().value).toBe("");
});

test("round expiry cancels a queued answer check and leaves no phantom final attempt", () => {
  mount();
  startRound();
  tick(11250);
  key("0");
  key("Enter");
  tick(225);
  tick(48515);
  expect(screen.getByText("1s")).toBeTruthy();
  const attempts = totalAttempts();
  key("1");
  tick(10);
  expect(screen.getByText("Nice try!")).toBeTruthy();
  tick(1000);
  key("Enter");
  expect(totalAttempts()).toBe(attempts);
  expect(progress().bestSpeeds[1]).toBe(0);
});

test("replay resets counters, and leaving practice removes round keyboard handling", () => {
  mount();
  startRound();
  key("0");
  key("Enter");
  tick(275);
  tick(59725);
  expect(screen.getByText("Nice try!")).toBeTruthy();
  fireEvent.click(screen.getByRole("button", { name: "Play Again" }));
  expect(screen.getByText("1-Minute Practice")).toBeTruthy();
  fireEvent.click(screen.getByRole("button", { name: "Start!" }));
  tick(3700);
  expect(screen.getByText("60s")).toBeTruthy();
  expect(screen.getByText("Question 1")).toBeTruthy();
  tick(60000);
  fireEvent.click(screen.getByRole("button", { name: "Back to Map" }));
  expect(document.body.classList.contains("timed-quiz-active")).toBe(false);
  expect(document.documentElement.classList.contains("timed-quiz-active")).toBe(false);
  const saved = localStorage.getItem("mental_math_journey_v2");
  key("0");
  key("Enter");
  tick(1000);
  expect(localStorage.getItem("mental_math_journey_v2")).toBe(saved);
});

test.each(["countdown", "answer check", "deferred check", "correct hold", "incorrect hold", "cooldown", "reveal"])(
  "unmount cancels all practice timers during %s under StrictMode",
  (phase) => {
    const { unmount } = mount();
    if (phase === "countdown") {
      openPractice();
      fireEvent.click(screen.getByRole("button", { name: "Start!" }));
    } else {
      startRound();
      if (phase === "answer check") key("0");
      if (phase === "deferred check") { key("0"); tick(16); }
      if (phase === "correct hold") { key("0"); key("Enter"); }
      if (phase === "incorrect hold" || phase === "cooldown") { key("9"); key("Enter"); }
      if (phase === "cooldown") { tick(400); key("9"); key("Enter"); }
      if (phase === "reveal") tick(11250);
    }
    const saved = localStorage.getItem("mental_math_journey_v2");
    unmount();
    const nextScreenButton = document.createElement("button");
    document.body.append(nextScreenButton);
    nextScreenButton.focus();
    // Drain jsdom's storage events; an abandoned blur callback must not steal focus.
    tick(1);
    expect(document.activeElement).toBe(nextScreenButton);
    nextScreenButton.remove();
    expect(vi.getTimerCount()).toBe(0);
    expect(document.body.classList.contains("timed-quiz-active")).toBe(false);
    expect(document.documentElement.classList.contains("timed-quiz-active")).toBe(false);
    tick(70000);
    expect(localStorage.getItem("mental_math_journey_v2")).toBe(saved);
  },
);
