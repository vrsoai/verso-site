import { type RefObject, useCallback, useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: Record<string, unknown>) => string;
      reset: (id?: string) => void;
      remove: (id: string) => void;
    };
  }
}

const SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

/**
 * Cloudflare Turnstile, only when a site key is configured
 * (VITE_TURNSTILE_SITE_KEY). Without one the form works unchanged.
 */
export function useTurnstile(siteKey: string | undefined, container: RefObject<HTMLDivElement>) {
  const [token, setToken] = useState<string | undefined>(undefined);
  const widget = useRef<string | null>(null);
  const enabled = typeof siteKey === "string" && siteKey.length > 0;

  useEffect(() => {
    if (!enabled || !container.current) return;
    let cancelled = false;
    const render = () => {
      if (cancelled || widget.current || !container.current || !window.turnstile) return;
      widget.current = window.turnstile.render(container.current, {
        sitekey: siteKey,
        callback: (t: string) => setToken(t),
        "expired-callback": () => setToken(undefined),
        "error-callback": () => setToken(undefined),
      });
    };
    if (window.turnstile) {
      render();
    } else {
      let script = document.querySelector<HTMLScriptElement>("script[data-turnstile]");
      if (!script) {
        script = document.createElement("script");
        script.src = SCRIPT_SRC;
        script.async = true;
        script.dataset.turnstile = "1";
        document.head.appendChild(script);
      }
      script.addEventListener("load", render);
    }
    return () => {
      cancelled = true;
      if (widget.current && window.turnstile) {
        window.turnstile.remove(widget.current);
        widget.current = null;
      }
    };
  }, [enabled, siteKey, container]);

  const reset = useCallback(() => {
    if (widget.current && window.turnstile) window.turnstile.reset(widget.current);
    setToken(undefined);
  }, []);

  return { token, reset, enabled };
}
