import { Bar, BarChart, CartesianGrid, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { compact, formatInt, peakIndex } from "@/lib/breakdown/format";

export interface ColumnDatum {
  key: string;
  /** Axis tick (short). */
  tick: string;
  /** Full name, in the tooltip and the table. */
  label: string;
  value: number;
}

const BLUE = "#2547F4";

function ChartTip({ active, payload, unit }: { active?: boolean; payload?: Array<{ payload: ColumnDatum }>; unit: string }) {
  if (!active || !payload || payload.length === 0) return null;
  const d = payload[0].payload;
  return (
    <div className="bd-tip">
      <div className="bd-tip-v">
        {formatInt(d.value)} <span>{unit}</span>
      </div>
      <div className="bd-tip-l">{d.label}</div>
    </div>
  );
}

/**
 * One-series column chart: thin blue columns with a rounded top, a hairline
 * grid, a direct label on the peak only, a tooltip per column and a table twin.
 */
export function ColumnChart({
  data,
  unit,
  tableTitle,
  height = 190,
  interval = "preserveStartEnd",
}: {
  data: ColumnDatum[];
  unit: string;
  tableTitle: string;
  height?: number;
  interval?: number | "preserveStartEnd";
}) {
  const peak = peakIndex(data.map((d) => d.value));
  const rows = data.map((d, i) => ({ ...d, peakLabel: i === peak ? compact(d.value) : undefined }));
  return (
    <div className="bd-chart">
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={rows} margin={{ top: 18, right: 4, left: 0, bottom: 0 }} barCategoryGap="28%">
          <CartesianGrid vertical={false} stroke="#EEEBE1" strokeWidth={1} />
          <XAxis
            dataKey="tick"
            tickLine={false}
            axisLine={{ stroke: "#E6E2D7" }}
            tick={{ fontSize: 11, fill: "#9B968A" }}
            interval={interval}
            minTickGap={18}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 11, fill: "#9B968A" }}
            width={40}
            tickFormatter={(v: number) => compact(v)}
            allowDecimals={false}
            tickCount={4}
          />
          <Tooltip cursor={{ fill: "rgba(37,71,244,0.08)" }} content={<ChartTip unit={unit} />} />
          <Bar dataKey="value" fill={BLUE} radius={[4, 4, 0, 0]} maxBarSize={24} isAnimationActive={false}>
            <LabelList dataKey="peakLabel" position="top" style={{ fontSize: 11, fill: "#141310", fontWeight: 600 }} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <details className="bd-table">
        <summary>View as table</summary>
        <table>
          <thead>
            <tr>
              <th>{tableTitle}</th>
              <th>{unit}</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d) => (
              <tr key={d.key}>
                <td>{d.label}</td>
                <td>{formatInt(d.value)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </details>
    </div>
  );
}
