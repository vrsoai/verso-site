import type { StatusView } from "@/lib/breakdown/api";
import { formatInt, relativeTime } from "@/lib/breakdown/format";

interface Props {
  status: StatusView;
  onConnect: () => void;
  connecting: boolean;
  error: string | null;
}

/** What is happening with the reader's import, and the one action it may need. */
export function StageBanner({ status, onConnect, connecting, error }: Props) {
  const connectButton = (label: string) => (
    <button type="button" className="btn btn-blue btn-sm" onClick={onConnect} disabled={connecting}>
      {connecting ? "Opening ChatGPT sign-in…" : label}
    </button>
  );
  const emailNote = status.email ? ` We'll email ${status.email} when it's complete; the link in that email brings you back here.` : "";

  if (status.stage === "no_connection") {
    return (
      <div className="bd-card bd-banner">
        <div className="bd-warn" aria-hidden="true">1</div>
        <div className="bd-banner-text">
          <h3>One step left: connect your ChatGPT</h3>
          <p>You sign in on ChatGPT's own pages, in a secure window. Verso never sees your password. Your breakdown starts building right after.</p>
          {connectButton("Connect my ChatGPT")}
          {error ? <p className="bd-error">{error}</p> : null}
        </div>
      </div>
    );
  }

  if (status.stage === "needs_reauth") {
    return (
      <div className="bd-card bd-banner">
        <div className="bd-warn" aria-hidden="true">!</div>
        <div className="bd-banner-text">
          <h3>ChatGPT signed Verso out</h3>
          <p>Your breakdown below covers what was imported so far ({formatInt(status.conversations)} conversations). Reconnect to resume syncing new conversations.</p>
          {connectButton("Reconnect my ChatGPT")}
          {error ? <p className="bd-error">{error}</p> : null}
        </div>
      </div>
    );
  }

  if (status.stage === "importing") {
    return (
      <div className="bd-card bd-banner">
        <div className="bd-spinner" aria-hidden="true" />
        <div className="bd-banner-text">
          <h3>Importing your ChatGPT history…</h3>
          <p>
            {formatInt(status.conversations)} conversations so far. Most accounts take a few minutes; the largest can take a couple of hours.{emailNote} The numbers below update as the import progresses.
          </p>
        </div>
      </div>
    );
  }

  if (status.stage === "labeling") {
    return (
      <div className="bd-card bd-banner">
        <div className="bd-spinner" aria-hidden="true" />
        <div className="bd-banner-text">
          <h3>Categorizing your conversations…</h3>
          <p>
            {formatInt(status.labels.labeled)} of {formatInt(status.labels.total)} done. Everything else below is final; the "recommendations" and "what you use it for" sections fill in as we go.{emailNote}
          </p>
        </div>
      </div>
    );
  }

  const lastSync = status.connections.map((c) => c.lastSyncAt).filter(Boolean).sort().pop() ?? null;
  return (
    <p className="bd-status-line">
      Complete · {formatInt(status.conversations)} conversations · last synced {relativeTime(lastSync)}. New conversations keep syncing in the background.
    </p>
  );
}
