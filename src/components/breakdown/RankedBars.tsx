export interface RankedItem {
  label: string;
  value: number;
  display: string;
  hint?: string;
}

/** Ranked horizontal bars, one series, largest first; the value sits at the end of each row. */
export function RankedBars({ items, ariaLabel }: { items: RankedItem[]; ariaLabel: string }) {
  const top = Math.max(0, ...items.map((i) => i.value));
  if (items.length === 0) return <p className="bd-muted">Nothing here yet.</p>;
  return (
    <ul className="bd-bars" aria-label={ariaLabel}>
      {items.map((it) => (
        <li key={it.label} className="bd-bar-row" title={it.hint ? `${it.label}: ${it.hint}` : `${it.label}: ${it.display}`}>
          <span className="bd-bar-label">{it.label}</span>
          <span className="bd-bar-value">{it.display}</span>
          <span className="bd-bar-track">
            <span className="bd-bar-fill" style={{ width: top > 0 ? `${Math.max(1.5, (it.value / top) * 100)}%` : "0%" }} />
          </span>
        </li>
      ))}
    </ul>
  );
}
