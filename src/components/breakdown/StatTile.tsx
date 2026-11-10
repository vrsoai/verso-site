export function StatTile({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="bd-tile">
      <div className="bd-tile-v">{value}</div>
      <div className="bd-tile-l">{label}</div>
      {hint ? <div className="bd-tile-h">{hint}</div> : null}
    </div>
  );
}
