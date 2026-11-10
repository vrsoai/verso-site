import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BreakdownShell } from "@/components/breakdown/BreakdownShell";
import { DataCard } from "@/components/breakdown/DataCard";
import {
  HeroNumbers,
  LabelsSection,
  LongestSection,
  MediaSection,
  ModelsSection,
  RhythmSection,
  SearchSection,
} from "@/components/breakdown/Sections";
import { StageBanner } from "@/components/breakdown/StageBanner";
import { useBreakdownData } from "@/hooks/use-breakdown";
import { usePageMeta } from "@/hooks/use-page-meta";
import { ApiError, clearToken, goTo, isTokenShaped, readToken, requestConnectLink, track } from "@/lib/breakdown/api";

export default function BreakdownMe() {
  usePageMeta({ title: "My ChatGPT breakdown · Verso", noindex: true });
  const navigate = useNavigate();
  const location = useLocation();
  const token = useMemo(() => {
    const fromState = (location.state as { token?: unknown } | null)?.token;
    return readToken() ?? (isTokenShaped(fromState) ? fromState : null);
  }, [location.state]);

  useEffect(() => {
    if (!token) navigate("/breakdown", { replace: true });
  }, [token, navigate]);

  const { status, breakdown, unauthorized } = useBreakdownData(token);
  const [connecting, setConnecting] = useState(false);
  const [connectError, setConnectError] = useState<string | null>(null);

  useEffect(() => {
    if (unauthorized) clearToken();
  }, [unauthorized]);

  // Back from the ChatGPT sign-in, phones restore this page as it was left:
  // the connect button must be usable again.
  useEffect(() => {
    const onShow = (e: PageTransitionEvent) => {
      if (e.persisted) setConnecting(false);
    };
    window.addEventListener("pageshow", onShow);
    return () => window.removeEventListener("pageshow", onShow);
  }, []);

  async function connect() {
    if (!token) return;
    setConnecting(true);
    setConnectError(null);
    try {
      track("breakdown_connect_click", { stage: status.data?.stage ?? "" });
      const { connectUrl } = await requestConnectLink(token);
      goTo(connectUrl);
    } catch (err) {
      setConnectError(err instanceof ApiError ? err.message : "Could not open the ChatGPT sign-in. Please try again.");
      setConnecting(false);
    }
  }

  if (!token) return null;

  if (unauthorized) {
    return (
      <BreakdownShell>
        <section className="bd-hero">
          <h1 className="bd-h1 bd-h1-sm">This link is no longer valid</h1>
          <p className="bd-lead">The data behind it was deleted, or the link was replaced. You can start again with the same email.</p>
          <div className="bd-actions">
            <Link className="btn btn-blue" to="/breakdown">Start again</Link>
          </div>
        </section>
      </BreakdownShell>
    );
  }

  if (status.isPending) {
    return (
      <BreakdownShell>
        <section className="bd-hero">
          <div className="bd-card bd-banner">
            <div className="bd-spinner" aria-hidden="true" />
            <div className="bd-banner-text"><h3>Loading your breakdown…</h3></div>
          </div>
        </section>
      </BreakdownShell>
    );
  }

  if (status.isError || !status.data) {
    return (
      <BreakdownShell>
        <section className="bd-hero">
          <h1 className="bd-h1 bd-h1-sm">Couldn't load your breakdown</h1>
          <p className="bd-lead">{status.error instanceof ApiError ? status.error.message : "Please check your connection and retry."}</p>
          <div className="bd-actions">
            <button type="button" className="btn btn-blue" onClick={() => status.refetch()}>Retry</button>
          </div>
        </section>
      </BreakdownShell>
    );
  }

  const s = status.data;
  const b = breakdown.data?.breakdown ?? null;
  const showReport = b !== null && b.totals.conversations > 0;

  return (
    <BreakdownShell aside={<span className="bd-tag">{s.email ?? "Your breakdown"}</span>}>
      <section className="bd-hero" style={{ paddingBottom: 0 }}>
        {s.stage === "no_connection" ? (
          <h1 className="bd-h1 bd-h1-sm">Your ChatGPT, <em>in numbers.</em></h1>
        ) : null}
        <StageBanner status={s} onConnect={connect} connecting={connecting} error={connectError} />
      </section>

      {s.stage !== "no_connection" && !showReport ? (
        <section className="bd-section">
          <div className="bd-card">
            {breakdown.isError && !breakdown.isFetching ? (
              <>
                <p className="bd-muted">We couldn't compute your numbers just now. Your import is not affected.</p>
                <div className="bd-actions">
                  <button type="button" className="btn btn-blue" onClick={() => breakdown.refetch()}>Retry</button>
                </div>
              </>
            ) : (
              <p className="bd-muted">
                {breakdown.isPending || breakdown.isFetching
                  ? "Computing your first numbers…"
                  : "No conversations imported yet. This page refreshes on its own as the import progresses."}
              </p>
            )}
          </div>
        </section>
      ) : null}

      {showReport && b ? (
        <>
          <HeroNumbers b={b} />
          <SearchSection b={b} />
          <LabelsSection b={b} status={s} />
          <RhythmSection b={b} />
          <ModelsSection b={b} />
          <MediaSection b={b} />
          <LongestSection b={b} />
        </>
      ) : null}

      <section className="bd-section" id="data" aria-labelledby="data-h">
        <div className="eyebrow">Your data</div>
        <h2 id="data-h">Yours to keep or delete</h2>
        <DataCard token={token} status={s} onConnect={connect} connecting={connecting} />
      </section>
    </BreakdownShell>
  );
}
