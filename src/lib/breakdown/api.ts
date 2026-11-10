/**
 * Client of Verso's self-serve API (Connect Worker, /api/self-serve), used by
 * the "Your ChatGPT, in numbers" pages.
 *
 * The hostname picks the environment: the live site talks to production,
 * previews and local dev talk to staging. VITE_VERSO_CONNECT_URL overrides.
 */

export const TOKEN_KEY = "verso.breakdown.token";
const PRODUCTION_HOSTS = ["tryverso.ai", "www.tryverso.ai"];

export function connectBase(hostname?: string): string {
  const override = import.meta.env.VITE_VERSO_CONNECT_URL;
  if (typeof override === "string" && override) return override.replace(/\/+$/, "");
  const host = hostname ?? (typeof window === "undefined" ? "" : window.location.hostname);
  return PRODUCTION_HOSTS.includes(host) ? "https://connect.tryverso.ai" : "https://connect-staging.tryverso.ai";
}

export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

// ---------------------------------------------------------------------------
// Types (mirror of the Edge Function `self-serve`)
// ---------------------------------------------------------------------------

export type Stage = "no_connection" | "importing" | "labeling" | "complete" | "needs_reauth";

export interface ConnectionView {
  id: string;
  status: string;
  connectedAt: string | null;
  lastSyncAt: string | null;
  historyCompleted: boolean;
  historyCompletedAt: string | null;
  conversations: number;
  oldest: string | null;
  newest: string | null;
  error: string | null;
}

export interface StatusView {
  email: string | null;
  createdAt: string | null;
  via: string | null;
  timezone: string | null;
  stage: Stage;
  connections: ConnectionView[];
  conversations: number;
  labels: { enabled: boolean; total: number; labeled: number };
  breakdownComputedAt: string | null;
  completeEmailSentAt: string | null;
}

export interface Totals {
  conversations: number;
  userMessages: number;
  assistantMessages: number;
  userWords: number;
  assistantWords: number;
  firstAt: string | null;
  lastAt: string | null;
  daysActive: number;
  medianPromptWords: number | null;
  medianUserMessagesPerConversation: number | null;
  singleMessageConversations: number;
  longestConversationMessages: number;
  longestStreakDays: number;
}

export interface MonthPoint {
  month: string;
  conversations: number;
  userMessages: number;
}

export interface DomainCount {
  domain: string;
  conversations: number;
}

export interface SearchStats {
  conversationsWithSources: number;
  answersWithSources: number;
  sitesCitedPerAnswer: number | null;
  topCitedDomains: DomainCount[];
  sampledConversations: number;
  conversationsWithSearch: number;
  searchingAnswers: number;
  resultsReadPerAnswer: number | null;
  sitesReadPerAnswer: number | null;
  topReadDomains: DomainCount[];
}

export interface MediaStats {
  imagesUploaded: number;
  conversationsWithImagesUploaded: number;
  imagesGenerated: number;
  conversationsWithGeneratedImages: number;
  voiceConversations: number;
}

export interface LabelStats {
  labeled: number;
  coverage: number | null;
  topics: { topic: string; conversations: number }[];
  intents: { intent: string; conversations: number }[];
  workConversations: number;
  workShare: number | null;
}

export type YouKey =
  | "conversationsTotal"
  | "conversationsLast90Days"
  | "searchShare"
  | "imagesShare"
  | "medianPromptWords"
  | "userMessagesPerConversation";

export interface QuantileGrid {
  p: number[];
  v: number[];
  median: number;
  n: number;
}

export interface PanelStats {
  computedAt?: string;
  connections?: number;
  minConversations?: number;
  metrics?: Partial<Record<YouKey, QuantileGrid | null>>;
}

export interface Breakdown {
  version: number;
  computedAt: string;
  timezone: string;
  connections: number;
  totals: Totals;
  byMonth: MonthPoint[];
  byHour: number[];
  byWeekday: number[];
  models: { model: string; messages: number }[];
  search: SearchStats;
  shopping: { conversations: number; share: number | null };
  media: MediaStats;
  gpts: { conversations: number; share: number | null; sampledConversations: number };
  thinking: {
    totalSeconds: number;
    answersWithReasoning: number;
    conversationsWithReasoning: number;
    longestSeconds: number;
    sampledConversations: number;
  };
  longestConversations: { title: string; userMessages: number; startedAt: string | null }[];
  labels: LabelStats;
  you: Partial<Record<YouKey, number | null>>;
  panel: PanelStats | null;
}

export interface BreakdownResponse {
  status: StatusView;
  breakdown: Breakdown | null;
}

export type StartResult =
  | { status: "created"; token: string; pageUrl: string; connectUrl: string; expiresAt: string }
  | { status: "existing"; emailSent: boolean };

// ---------------------------------------------------------------------------
// Calls
// ---------------------------------------------------------------------------

async function call<T>(path: string, init: { method?: string; body?: unknown; token?: string } = {}): Promise<T> {
  const headers: Record<string, string> = {};
  if (init.body !== undefined) headers["Content-Type"] = "application/json";
  if (init.token) headers.Authorization = `Bearer ${init.token}`;
  let res: Response;
  try {
    res = await fetch(`${connectBase()}${path}`, {
      method: init.method ?? "GET",
      headers,
      body: init.body === undefined ? undefined : JSON.stringify(init.body),
    });
  } catch {
    throw new ApiError(0, "Network error. Check your connection and retry.");
  }
  let data: unknown = null;
  try {
    data = await res.json();
  } catch {
    // no JSON body
  }
  if (!res.ok) {
    const message = (data as { error?: string } | null)?.error;
    throw new ApiError(res.status, message || `Request failed (${res.status})`);
  }
  return data as T;
}

export function startBreakdown(input: {
  email: string;
  consent: true;
  via?: string | null;
  timezone?: string | null;
  turnstileToken?: string;
}): Promise<StartResult> {
  return call("/api/self-serve", { method: "POST", body: { action: "start", ...input } });
}

export function fetchStatus(token: string): Promise<StatusView> {
  return call("/api/self-serve?view=status", { token });
}

export function fetchBreakdown(token: string, timezone: string): Promise<BreakdownResponse> {
  return call(`/api/self-serve?view=breakdown&tz=${encodeURIComponent(timezone)}`, { token });
}

export function requestConnectLink(token: string): Promise<{ connectUrl: string; expiresAt: string }> {
  return call("/api/self-serve", { method: "POST", token, body: { action: "connect-link" } });
}

export function deleteEverything(token: string): Promise<{ deleted: boolean; conversationsDeleted: number }> {
  return call("/api/self-serve", { method: "POST", token, body: { action: "delete" } });
}

// ---------------------------------------------------------------------------
// Browser helpers
// ---------------------------------------------------------------------------

export function isTokenShaped(value: unknown): value is string {
  return typeof value === "string" && /^[A-Za-z0-9_-]{43}$/.test(value);
}

export function readToken(): string | null {
  try {
    const t = window.localStorage.getItem(TOKEN_KEY);
    return isTokenShaped(t) ? t : null;
  } catch {
    return null;
  }
}

export function saveToken(token: string): boolean {
  try {
    window.localStorage.setItem(TOKEN_KEY, token);
    return true;
  } catch {
    return false;
  }
}

export function clearToken(): void {
  try {
    window.localStorage.removeItem(TOKEN_KEY);
  } catch {
    // ignore
  }
}

export function browserTimezone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
  } catch {
    return "UTC";
  }
}

/** Full-page navigation (the hosted connect page lives on another origin). */
export function goTo(url: string): void {
  window.location.assign(url);
}

export function track(event: string, params: Record<string, unknown> = {}): void {
  try {
    window.gtag?.("event", event, params);
  } catch {
    // analytics must never break the page
  }
}
