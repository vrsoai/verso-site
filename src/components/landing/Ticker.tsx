const SEGMENTS = [
  "THE VERSO AGENT INDEX: WAVE 1 IS LIVE",
  "PAYMENTS · VECTOR DBS · AUTH · COMMS",
  "WHO DO CODING AGENTS PICK?",
];

export const Ticker = () => {
  const track = SEGMENTS.map((text, i) => (
    <span key={i}>
      {text} <span className="arrow">&rarr;</span>
    </span>
  ));

  return (
    <div className="ticker">
      <div className="ticker-track">
        {track}
        {track}
      </div>
    </div>
  );
};
