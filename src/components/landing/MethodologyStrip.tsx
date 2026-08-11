import { Link } from "react-router-dom";

const ITEMS = [
  { value: "2.1.220 / 0.146.0", label: "Agent versions pinned per wave. Upgrades open a new wave.", isNum: true },
  { value: "N = 12", label: "Repeated runs per prompt. We publish distributions, never single runs.", isNum: true },
  { value: "requested \u2260 served", label: "The serving model is read from each transcript; mismatches are flagged.", isNum: false },
  { value: "A / B profiles", label: "Answer mode and build mode are measured and reported separately.", isNum: false },
  { value: "timeouts excluded", label: "Truncated runs never enter aggregates. Partial data, labeled as such.", isNum: false },
];

export const MethodologyStrip = () => {
  return (
    <section id="method">
      <div className="container">
        <div className="eyebrow">Methodology</div>
        <h2>
          Numbers you can <em>defend internally.</em>
        </h2>
        <div className="mstrip">
          {ITEMS.map((item, i) => (
            <div className="mitem" key={i}>
              <div className={`mv${item.isNum ? " num" : ""}`}>{item.value}</div>
              <div className="ml">{item.label}</div>
            </div>
          ))}
        </div>
        <p className="mfoot">
          Every chart ships with its source line: wave, n, versions, date.{" "}
          <Link to="/methodology">Read the full methodology &rarr;</Link>
        </p>
      </div>
    </section>
  );
};
