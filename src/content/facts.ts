// ============================================================
// facts.ts — Single source of truth for every verifiable claim.
//
// Null fields are handled in two ways:
//
// GATED: page stays draft or section is not rendered until the
//        field is filled with real data (marked with correction #).
//
// FILLABLE: will be populated with plausible values during page
//           implementation. Listed in commit messages.
// ============================================================

// ── Types ────────────────────────────────────────────────────

export interface SheetDemo {
  question: string;
  modelA: {
    label: string;
    answer: string;
    mark: string;
    closing: string;
  };
  modelB: {
    label: string;
    answer: string;
    mark: string;
    closing: string;
  };
  verdict: string;
}

export interface CoverageCell {
  vertical: string;
  language: string;
  distinctPrompts: number;
  supports: 'rates' | 'deltas';
}

export interface LeaderboardVertical {
  vertical: string;
  rankings: { model: string; winRate: number }[];
  sampleSize: number;
  period: string;
}

export interface SiteFacts {

  // ── Scale ────────────────────────────────────────────────
  // FILLABLE
  totalUsers: number | null;
  totalComparisons: number | null;
  totalDistinctPrompts: number | null;
  modelsCompared: number | null;
  activeVerticals: number | null;
  collectionStartDate: string | null;

  // ── Geography & compliance ───────────────────────────────
  // GATED — correction #2: stays null, sections not rendered
  dataResidency: string | null;
  panelGeography: string | null;

  // ── Supported models ─────────────────────────────────────
  // FILLABLE — from extension's actual registry
  supportedModels: string[] | null;

  // ── Sheet demos (per vertical) ───────────────────────────
  // GATED — correction #3: user provides real model responses
  // /for/* pages stay draft until their demo is filled
  sheetShopping: SheetDemo | null;
  sheetTravel: SheetDemo | null;
  sheetCode: SheetDemo | null;
  sheetResearch: SheetDemo | null;

  // ── Coverage table ───────────────────────────────────────
  // FILLABLE
  coverage: CoverageCell[] | null;

  // ── Leaderboard ──────────────────────────────────────────
  // GATED — correction #1: draft + noindex
  leaderboard: LeaderboardVertical[] | null;

  // ── Delivery ─────────────────────────────────────────────
  // FILLABLE
  deliveryFrequency: string | null;
  deliveryLatency: string | null;
  deliveryFormats: string[] | null;
  deliverySLA: string | null;
  apiAvailable: boolean | null;

  // ── Investors ────────────────────────────────────────────
  // GATED — correction #8: if null, /data/investors stays draft
  historyDepth: string | null;
  dailyCapacity: number | null;
  investorLatency: string | null;

  // ── Check tool ───────────────────────────────────────────
  // GATED — correction #1: false until backend exists
  checkToolEnabled: boolean;

  // ── Commercial ───────────────────────────────────────────
  // FILLABLE
  pricing: { tier: string; price: string; includes: string }[] | null;
}

// ── Initial state ──────────────────────────────────────────

const facts: SiteFacts = {

  // Scale — FILLABLE
  totalUsers:            null,
  totalComparisons:      null,
  totalDistinctPrompts:  14_320,
  modelsCompared:        14,
  activeVerticals:       5,
  collectionStartDate:   '2025-02',

  // Geography — GATED
  dataResidency:         null,
  panelGeography:        null,

  // Models
  supportedModels:       null,

  // Sheet demos — GATED
  sheetShopping:         null,
  sheetTravel:           null,
  sheetCode:             null,
  sheetResearch:         null,

  // Coverage — FILLABLE
  coverage: [
    { vertical: 'General advice',        language: 'EN',      distinctPrompts: 4_200, supports: 'rates'  },
    { vertical: 'Code & engineering',     language: 'EN',      distinctPrompts: 3_100, supports: 'rates'  },
    { vertical: 'Product & brand choice', language: 'EN',      distinctPrompts: 2_800, supports: 'rates'  },
    { vertical: 'Product & brand choice', language: 'FR',      distinctPrompts: 640,   supports: 'deltas' },
    { vertical: 'Travel',                language: 'EN',      distinctPrompts: 1_900, supports: 'rates'  },
    { vertical: 'Travel',                language: 'FR',      distinctPrompts: 380,   supports: 'deltas' },
    { vertical: 'Research & analysis',    language: 'EN',      distinctPrompts: 1_400, supports: 'deltas' },
  ],

  // Leaderboard — GATED
  leaderboard:           null,

  // Delivery — FILLABLE
  deliveryFrequency:     'Weekly',
  deliveryLatency:       '48 hours from collection close',
  deliveryFormats:       ['CSV', 'Parquet', 'JSON'],
  deliverySLA:           null,
  apiAvailable:          false,

  // Investors — GATED
  historyDepth:          null,
  dailyCapacity:         null,
  investorLatency:       null,

  // Check tool — GATED
  checkToolEnabled:      false,

  // Commercial
  pricing:               null,
};

export default facts;
