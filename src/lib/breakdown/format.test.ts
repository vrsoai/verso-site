import { describe, expect, it } from "vitest";
import {
  compact,
  durationLabel,
  formatInt,
  hourLabel,
  modelLabel,
  monthLabel,
  monthLong,
  monthsSpan,
  peakIndex,
  pct,
  percentileOf,
} from "./format";
import { connectBase, isTokenShaped } from "./api";

describe("numbers", () => {
  it("formats integers, compact values and shares", () => {
    expect(formatInt(1685)).toBe("1,685");
    expect(formatInt(null)).toBe("–");
    expect(compact(9_999)).toBe("9,999");
    expect(compact(223_061)).toBe("223K");
    expect(compact(12_940)).toBe("12.9K");
    expect(compact(894_046)).toBe("894K");
    expect(compact(1_200_000)).toBe("1.2M");
    expect(pct(0.1217)).toBe("12%");
    expect(pct(0.1217, 1)).toBe("12.2%");
    expect(pct(null)).toBe("–");
  });

  it("labels hours, months and durations", () => {
    expect(hourLabel(0)).toBe("12 am");
    expect(hourLabel(12)).toBe("12 pm");
    expect(hourLabel(15)).toBe("3 pm");
    expect(hourLabel(9)).toBe("9 am");
    expect(monthLabel("2026-10")).toBe("Oct");
    expect(monthLabel("2026-01", true)).toBe("Jan 26");
    expect(monthLong("2025-01")).toBe("January 2025");
    expect(durationLabel(48)).toBe("48 s");
    expect(durationLabel(720)).toBe("12 min");
    expect(durationLabel(11720)).toBe("3 h 15 min");
    expect(durationLabel(7200)).toBe("2 h");
    expect(monthsSpan("2025-01-12T20:43:59Z", "2026-10-29T13:01:46Z")).toBe(22);
  });
});

describe("modelLabel", () => {
  it("reads ChatGPT model slugs", () => {
    expect(modelLabel("gpt-4o")).toBe("GPT-4o");
    expect(modelLabel("gpt-5")).toBe("GPT-5");
    expect(modelLabel("gpt-5-2")).toBe("GPT-5.2");
    expect(modelLabel("gpt-5-6-thinking")).toBe("GPT-5.6 Thinking");
    expect(modelLabel("gpt-5-1-instant")).toBe("GPT-5.1 Instant");
    expect(modelLabel("o4-mini")).toBe("o4-mini");
    expect(modelLabel("bidi")).toBe("Voice mode");
    expect(modelLabel("unknown")).toBe("Unknown");
    expect(modelLabel("")).toBe("Unknown");
    expect(modelLabel("text-davinci-002-render-sha")).toBe("GPT-3.5");
  });
});

describe("percentileOf", () => {
  const grid = { p: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95], v: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95], median: 50, n: 100 };
  it("interpolates inside the grid and clamps outside", () => {
    expect(percentileOf(50, grid)).toBe(50);
    expect(percentileOf(52, grid)).toBe(52);
    expect(percentileOf(2, grid)).toBe(2);
    expect(percentileOf(0, grid)).toBe(0);
    expect(percentileOf(95, grid)).toBe(95);
    expect(percentileOf(500, grid)).toBe(99);
    expect(percentileOf(null, grid)).toBeNull();
    expect(percentileOf(10, null)).toBeNull();
    expect(percentileOf(10, { p: [5], v: [1, 2], median: 1, n: 1 })).toBeNull();
  });
  it("handles a flat grid (many zeros)", () => {
    const flat = { p: [5, 10, 15], v: [0, 0, 1], median: 0, n: 30 };
    expect(percentileOf(0, flat)).toBe(0);
    expect(percentileOf(0.5, flat)).toBe(13);
  });
});

describe("misc", () => {
  it("finds the peak and recognizes tokens", () => {
    expect(peakIndex([0, 3, 9, 9, 1])).toBe(2);
    expect(peakIndex([0, 0])).toBe(-1);
    expect(isTokenShaped("AbCdEfGhIjKlMnOpQrStUvWxYz0123456789-_abcde")).toBe(true);
    expect(isTokenShaped("short")).toBe(false);
  });
  it("picks the API host from the page host", () => {
    expect(connectBase("tryverso.ai")).toBe("https://connect.tryverso.ai");
    expect(connectBase("www.tryverso.ai")).toBe("https://connect.tryverso.ai");
    expect(connectBase("verso-site-git-breakdown-x.vercel.app")).toBe("https://connect-staging.tryverso.ai");
    expect(connectBase("localhost")).toBe("https://connect-staging.tryverso.ai");
  });
});
