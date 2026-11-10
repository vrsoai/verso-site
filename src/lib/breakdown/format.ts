/** Formatting and small computations for the breakdown page. Pure, tested. */

import type { QuantileGrid } from "./api";

export function formatInt(n: number | null | undefined): string {
  if (n == null || !Number.isFinite(n)) return "–";
  return Math.round(n).toLocaleString("en-US");
}

function trimDecimal(x: number): string {
  const s = x >= 100 ? x.toFixed(0) : x.toFixed(1);
  return s.replace(/\.0$/, "");
}

/** 1,284 / 12.9K / 4.2M */
export function compact(n: number | null | undefined): string {
  if (n == null || !Number.isFinite(n)) return "–";
  const abs = Math.abs(n);
  if (abs < 10_000) return formatInt(n);
  if (abs < 1_000_000) return `${trimDecimal(n / 1000)}K`;
  return `${trimDecimal(n / 1_000_000)}M`;
}

export function pct(share: number | null | undefined, digits = 0): string {
  if (share == null || !Number.isFinite(share)) return "–";
  return `${(share * 100).toFixed(digits)}%`;
}

export function ratio(part: number | null | undefined, whole: number | null | undefined): number | null {
  if (part == null || whole == null || !(whole > 0)) return null;
  return part / whole;
}

export function fixed(n: number | null | undefined, digits = 1): string {
  if (n == null || !Number.isFinite(n)) return "–";
  return n.toFixed(digits).replace(/\.0$/, "");
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const MONTHS_LONG = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

/** "2026-10" -> "Oct" (or "Oct 26" with the year) */
export function monthLabel(ym: string, withYear = false): string {
  const [y, m] = ym.split("-");
  const name = MONTHS[Number(m) - 1] ?? ym;
  return withYear && y ? `${name} ${y.slice(2)}` : name;
}

/** "2026-10" -> "October 2026" */
export function monthLong(ym: string): string {
  const [y, m] = ym.split("-");
  const name = MONTHS_LONG[Number(m) - 1];
  return name && y ? `${name} ${y}` : ym;
}

export function dateLabel(iso: string | null | undefined): string {
  if (!iso) return "–";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "–";
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function relativeTime(iso: string | null | undefined, now = Date.now()): string {
  if (!iso) return "–";
  const t = Date.parse(iso);
  if (Number.isNaN(t)) return "–";
  const s = Math.max(0, Math.round((now - t) / 1000));
  if (s < 60) return "just now";
  const m = Math.round(s / 60);
  if (m < 60) return `${m} min ago`;
  const h = Math.round(m / 60);
  if (h < 36) return `${h} h ago`;
  return `${Math.round(h / 24)} days ago`;
}

export function hourLabel(h: number): string {
  const x = ((Math.round(h) % 24) + 24) % 24;
  if (x === 0) return "12 am";
  if (x === 12) return "12 pm";
  return x < 12 ? `${x} am` : `${x - 12} pm`;
}

export const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
export const WEEKDAYS_LONG = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

/** 48 s / 12 min / 3 h 15 min */
export function durationLabel(seconds: number | null | undefined): string {
  if (seconds == null || !Number.isFinite(seconds) || seconds <= 0) return "0 s";
  const s = Math.round(seconds);
  if (s < 60) return `${s} s`;
  const m = Math.round(s / 60);
  if (m < 60) return `${m} min`;
  const h = Math.floor(m / 60);
  const rest = m - h * 60;
  return rest > 0 ? `${h} h ${rest} min` : `${h} h`;
}

const MODEL_NAMES: Record<string, string> = {
  unknown: "Unknown",
  auto: "Auto",
  bidi: "Voice mode",
  research: "Deep research",
  "text-davinci-002-render-sha": "GPT-3.5",
  "text-davinci-002-render": "GPT-3.5",
  "gpt-4": "GPT-4",
  "gpt-4-turbo": "GPT-4 Turbo",
  "gpt-4o": "GPT-4o",
  "gpt-4o-mini": "GPT-4o mini",
  "gpt-4-1": "GPT-4.1",
  "gpt-4-1-mini": "GPT-4.1 mini",
  "gpt-4-5": "GPT-4.5",
};

/** ChatGPT model slug -> a readable name ("gpt-5-6-thinking" -> "GPT-5.6 Thinking"). */
export function modelLabel(slug: string | null | undefined): string {
  const m = (slug ?? "").trim().toLowerCase();
  if (!m) return "Unknown";
  if (MODEL_NAMES[m]) return MODEL_NAMES[m];
  const g5 = m.match(/^gpt-5(?:-(\d+))?(?:-(thinking|instant|pro|mini|nano|chat))?(?:-.*)?$/);
  if (g5) {
    const version = g5[1] ? `5.${g5[1]}` : "5";
    const variant = g5[2] ? ` ${g5[2].charAt(0).toUpperCase()}${g5[2].slice(1)}` : "";
    return `GPT-${version}${variant}`;
  }
  const o = m.match(/^(o\d)(?:-(mini|pro))?/);
  if (o) return o[2] ? `${o[1]}-${o[2]}` : o[1];
  if (m.startsWith("gpt-")) return m.toUpperCase();
  return m.charAt(0).toUpperCase() + m.slice(1);
}

const TOPIC_NAMES: Record<string, string> = {
  practical_guidance: "Practical guidance",
  writing: "Writing",
  seeking_information: "Seeking information",
  technical_help: "Technical help",
  self_expression: "Self-expression",
  multimedia: "Images & media",
  other: "Other",
};

const INTENT_NAMES: Record<string, string> = {
  asking: "Asking (information, advice)",
  doing: "Doing (produce something)",
  expressing: "Expressing (feelings, opinions)",
};

export function topicLabel(key: string): string {
  return TOPIC_NAMES[key] ?? key.replace(/_/g, " ");
}

export function intentLabel(key: string): string {
  return INTENT_NAMES[key] ?? key;
}

/** Index of the first maximum; -1 when there is no positive value. */
export function peakIndex(values: number[]): number {
  let best = -1;
  let max = 0;
  values.forEach((v, i) => {
    if (v > max) {
      max = v;
      best = i;
    }
  });
  return best;
}

/**
 * Where a value sits in a quantile grid (p: 5..95, v: the quantiles), as the
 * estimated percentage of panelists below it, 0..99. Null without a grid.
 */
export function percentileOf(value: number | null | undefined, grid: QuantileGrid | null | undefined): number | null {
  if (value == null || !Number.isFinite(value) || !grid) return null;
  const { p, v } = grid;
  if (!Array.isArray(p) || !Array.isArray(v) || p.length === 0 || p.length !== v.length) return null;
  const last = v.length - 1;
  if (value <= v[0]) {
    if (v[0] <= 0) return value <= 0 ? 0 : p[0];
    return Math.round((p[0] * Math.max(0, value)) / v[0]);
  }
  if (value >= v[last]) {
    if (value === v[last]) return p[last];
    const over = Math.min(1, (value - v[last]) / Math.max(v[last], 1e-9));
    return Math.min(99, Math.round(p[last] + (100 - p[last]) * over));
  }
  for (let i = 0; i < last; i++) {
    if (value >= v[i] && value <= v[i + 1]) {
      const span = v[i + 1] - v[i];
      const frac = span > 0 ? (value - v[i]) / span : 1;
      return Math.round(p[i] + (p[i + 1] - p[i]) * frac);
    }
  }
  return null;
}

/** Months covered by [firstAt, lastAt], inclusive (at least 1). */
export function monthsSpan(firstAt: string | null | undefined, lastAt: string | null | undefined): number {
  if (!firstAt || !lastAt) return 1;
  const a = new Date(firstAt);
  const b = new Date(lastAt);
  if (Number.isNaN(a.getTime()) || Number.isNaN(b.getTime())) return 1;
  return Math.max(1, (b.getUTCFullYear() - a.getUTCFullYear()) * 12 + (b.getUTCMonth() - a.getUTCMonth()) + 1);
}
