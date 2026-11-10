import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ApiError, clearToken, deleteEverything, track, type StatusView } from "@/lib/breakdown/api";
import { dateLabel, formatInt } from "@/lib/breakdown/format";

interface Props {
  token: string;
  status: StatusView;
  onConnect: () => void;
  connecting: boolean;
}

/** The reader's data: what we hold, reconnect, and delete everything (inline confirmation). */
export function DataCard({ token, status, onConnect, connecting }: Props) {
  const navigate = useNavigate();
  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deleted, setDeleted] = useState<number | null>(null);

  async function remove() {
    setDeleting(true);
    setError(null);
    try {
      const res = await deleteEverything(token);
      track("breakdown_delete", { conversations: res.conversationsDeleted });
      clearToken();
      setDeleted(res.conversationsDeleted);
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) {
        clearToken();
        setDeleted(0);
        return;
      }
      setError(err instanceof ApiError ? err.message : "Deletion failed. Please try again.");
    } finally {
      setDeleting(false);
    }
  }

  if (deleted !== null) {
    return (
      <div className="bd-card">
        <h3>Everything is deleted</h3>
        <p className="bd-muted">
          {formatInt(deleted)} conversations and their attachments were erased, the ChatGPT session was revoked and your email removed. This link no longer works.
        </p>
        <div className="bd-actions">
          <button type="button" className="btn btn-ghost btn-sm" onClick={() => navigate("/breakdown", { replace: true })}>Back to the start</button>
        </div>
      </div>
    );
  }

  const live = status.connections.filter((c) => c.status !== "revoked");
  return (
    <div className="bd-card">
      <h3>Your data</h3>
      <p className="bd-kv">
        Email <b>{status.email ?? "–"}</b> · signed up <b>{dateLabel(status.createdAt)}</b> · {formatInt(status.conversations)} conversations imported
        {live.length > 1 ? ` across ${live.length} ChatGPT accounts` : ""}.
      </p>
      <p className="bd-muted" style={{ marginTop: 8 }}>
        Your conversations are stored by Verso and included, de-identified, in the datasets Verso licenses. Deleting erases the conversations, the attachments and the ChatGPT session, immediately and for good.
      </p>
      <div className="bd-actions">
        {status.stage !== "no_connection" ? (
          <button type="button" className="btn btn-ghost btn-sm" onClick={onConnect} disabled={connecting}>
            {connecting ? "Opening…" : "Connect another ChatGPT account"}
          </button>
        ) : null}
        {!confirming ? (
          <button type="button" className="btn btn-ghost btn-sm" onClick={() => setConfirming(true)}>Delete everything</button>
        ) : (
          <span className="bd-confirm">
            <span>Delete all your data? This cannot be undone.</span>
            <button type="button" className="btn btn-dark btn-sm" onClick={remove} disabled={deleting}>
              {deleting ? "Deleting…" : "Yes, delete everything"}
            </button>
            <button type="button" className="btn btn-ghost btn-sm" onClick={() => setConfirming(false)} disabled={deleting}>Keep it</button>
          </span>
        )}
      </div>
      {error ? <p className="bd-error">{error}</p> : null}
    </div>
  );
}
