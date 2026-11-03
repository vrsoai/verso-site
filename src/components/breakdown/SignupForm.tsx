import { type FormEvent, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ApiError, browserTimezone, goTo, saveToken, startBreakdown, track } from "@/lib/breakdown/api";
import { useTurnstile } from "@/hooks/use-turnstile";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type Done = { kind: "existing" } | { kind: "created"; pageUrl: string; connectUrl: string };

/** Email + consent, then straight to ChatGPT sign-in. Known emails get their link by email. */
export function SignupForm({ via }: { via: string | null }) {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<Done | null>(null);
  const turnstileBox = useRef<HTMLDivElement>(null);
  const turnstile = useTurnstile(import.meta.env.VITE_TURNSTILE_SITE_KEY, turnstileBox);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    const value = email.trim().toLowerCase();
    if (!EMAIL_RE.test(value)) return setError("Please enter a valid email address.");
    if (!consent) return setError("Please accept the terms to continue.");
    if (turnstile.enabled && !turnstile.token) return setError("Please complete the verification and try again.");
    setBusy(true);
    try {
      const res = await startBreakdown({ email: value, consent: true, via, timezone: browserTimezone(), turnstileToken: turnstile.token });
      if (res.status === "existing") {
        track("breakdown_start", { result: "existing" });
        setDone({ kind: "existing" });
        return;
      }
      track("breakdown_start", { result: "created", via: via ?? "" });
      const stored = saveToken(res.token);
      if (stored) {
        goTo(res.connectUrl);
        return;
      }
      setDone({ kind: "created", pageUrl: res.pageUrl, connectUrl: res.connectUrl });
    } catch (err) {
      const message = err instanceof ApiError ? err.message : "Something went wrong. Please try again.";
      setError(err instanceof ApiError && err.status === 429 ? "Too many sign-ups from your network right now. Please try again in an hour." : message);
      turnstile.reset();
    } finally {
      setBusy(false);
    }
  }

  if (done?.kind === "existing") {
    return (
      <div className="bd-card bd-form-done">
        <h3>Check your inbox</h3>
        <p className="bd-muted">
          This email already has a breakdown. We've sent the link to <b>{email.trim().toLowerCase()}</b> (also look in spam). Didn't get it after 10 minutes? Submit again.
        </p>
      </div>
    );
  }

  if (done?.kind === "created") {
    return (
      <div className="bd-card bd-form-done">
        <h3>Keep this link</h3>
        <p className="bd-muted">
          Your browser blocks site storage, so this page can't remember you. Your personal link is <a href={done.pageUrl}>{done.pageUrl}</a>. We'll also email it to you when your breakdown is complete.
        </p>
        <div className="bd-actions">
          <a className="btn btn-blue" href={done.connectUrl}>Continue to ChatGPT sign-in</a>
        </div>
      </div>
    );
  }

  return (
    <form className="bd-card bd-form" onSubmit={submit} noValidate>
      <label className="bd-label" htmlFor="bd-email">Your email</label>
      <input
        id="bd-email"
        className="bd-input"
        type="email"
        inputMode="email"
        autoComplete="email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={busy}
        required
      />
      <p className="bd-help">We email you when the full breakdown is ready (big accounts take up to a couple of hours). Nothing else.</p>
      <label className="bd-consent">
        <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} disabled={busy} />
        <span>
          I understand that Verso imports my ChatGPT conversations, stores them, and includes them, de-identified, in the conversation datasets Verso licenses to research and business customers. I can delete everything at any time. I agree to the{" "}
          <Link to="/terms" target="_blank">Terms</Link> and <Link to="/privacy" target="_blank">Privacy Policy</Link>.
        </span>
      </label>
      {turnstile.enabled ? <div ref={turnstileBox} className="bd-turnstile" /> : null}
      <button type="submit" className="btn btn-blue bd-submit" disabled={busy}>
        {busy ? "One moment…" : "Connect my ChatGPT"}
      </button>
      {error ? <p className="bd-error" role="alert">{error}</p> : null}
      <p className="bd-note">Next step: you sign in on ChatGPT's own pages. Verso never sees your password.</p>
    </form>
  );
}
