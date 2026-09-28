const MODELS = [
  { name: "Claude Code", hot: true },
  { name: "Codex CLI", hot: true },
  { name: "GPT-5.6 Sol", hot: false },
  { name: "GPT-5.6 Terra", hot: false },
  { name: "GPT-5.6 Luna", hot: false },
  { name: "Claude Opus", hot: false },
  { name: "Claude Sonnet", hot: false },
  { name: "new models within days", hot: false },
];

export const CoverageBar = () => {
  return (
    <div className="coverage">
      <div className="container">
        <div className="cov-label">Measuring across</div>
        <div className="cov-row">
          {MODELS.map((m) => (
            <span key={m.name} className={`cov${m.hot ? " hot" : ""}`}>
              {m.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
