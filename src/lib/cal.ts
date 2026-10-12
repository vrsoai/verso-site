import { getCalApi } from "@calcom/embed-react";

/**
 * Cal.com booking link for the "Book a demo" CTA.
 * Format: "<username>/<event-slug>". If the Cal.com username changes,
 * update it here only.
 */
export const CAL_LINK = "verso/demo";
export const CAL_URL = `https://cal.com/${CAL_LINK}`;
const CAL_NAMESPACE = "verso-demo";

type CalApi = Awaited<ReturnType<typeof getCalApi>>;

let calPromise: Promise<CalApi> | null = null;
let calApi: CalApi | null = null;

/** Loads the Cal.com embed script once and applies Verso branding. */
export function loadCal(): Promise<CalApi> {
  if (!calPromise) {
    calPromise = getCalApi({ namespace: CAL_NAMESPACE }).then((cal) => {
      cal("ui", {
        theme: "light",
        layout: "month_view",
        cssVarsPerTheme: {
          light: { "cal-brand": "#2547F4" },
          dark: { "cal-brand": "#2547F4" },
        },
      });
      cal("preload", { calLink: CAL_LINK });
      calApi = cal;
      return cal;
    });
    calPromise.catch(() => {
      calPromise = null;
    });
  }
  return calPromise;
}

/** True once the embed script is ready to open a modal. */
export function isCalReady(): boolean {
  return calApi !== null;
}

/** Opens the booking modal. Returns false if the embed is not ready. */
export function openCalModal(): boolean {
  if (!calApi) return false;
  calApi("modal", { calLink: CAL_LINK, config: { layout: "month_view" } });
  return true;
}
