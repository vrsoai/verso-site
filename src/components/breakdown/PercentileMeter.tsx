/** Where the reader sits among panelists on one metric: a track, a marker, a sentence. */
export function PercentileMeter({ label, you, percentile, median }: { label: string; you: string; percentile: number; median: string }) {
  const p = Math.max(0, Math.min(100, percentile));
  const sentence = p >= 50 ? `Higher than ${p}% of panelists` : `Lower than ${100 - p}% of panelists`;
  return (
    <div className="bd-meter">
      <div className="bd-meter-head">
        <span>{label}</span>
        <span className="bd-meter-you">{you}</span>
      </div>
      <div className="bd-meter-track" role="img" aria-label={`${label}: ${sentence}`}>
        <div className="bd-meter-fill" style={{ width: `${p}%` }} />
        <div className="bd-meter-mark" style={{ left: `${p}%` }} />
      </div>
      <div className="bd-meter-foot">
        <span>{sentence}</span>
        <span>Panel median {median}</span>
      </div>
    </div>
  );
}
