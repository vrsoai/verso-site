import { useEffect, useRef, useState, FormEvent } from "react";

const MOCK_DATA = [
  { name: "Stripe", pkg: "stripe", install: 84, mention: 91 },
  { name: "PayPal", pkg: "@paypal/checkout", install: 6, mention: 41 },
  { name: "Lemon Squeezy", pkg: "@lemonsqueezy/js", install: 5, mention: 31 },
  { name: "Paddle", pkg: "@paddle/paddle-js", install: 3, mention: 22 },
];

const CheckIcon = () => (
  <svg fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
    <path d="M5 13l4 4L19 7" />
  </svg>
);

export const Hero = () => {
  const mockRef = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (mockRef.current) {
        mockRef.current.querySelectorAll<HTMLElement>(".fill").forEach((f) => {
          f.style.width = f.dataset.w + "%";
        });
      }
    }, 250);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="hero">
      <div className="container hero-grid">
        <div>
          <a className="pill" href="#index">
            <b>NEW</b> The Verso Agent Index: Wave 1 is live <span>&rarr;</span>
          </a>
          <h1>
            Developers don't pick the stack anymore.{" "}
            <em className="u">Their agents do.</em>
          </h1>
          <p className="sub">
            Every day, <b>Claude Code</b> and <b>Codex</b> choose a payments provider, an auth
            layer, a vector database, inside thousands of autonomous builds. Verso measures
            whether they choose <b>you</b>.
          </p>
          <form className="audit" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Your tool (e.g. Qdrant, Lemon Squeezy)"
              required
            />
            <button className="btn btn-blue" type="submit">
              {submitted ? "Check your inbox \u2713" : "Check my agent share"}
            </button>
          </form>
          <div className="hero-checks">
            <span>
              <CheckIcon />
              Two free numbers from the live wave
            </span>
            <span>
              <CheckIcon />
              No credit card, no dashboard to learn
            </span>
          </div>
        </div>

        <div className="mock" ref={mockRef}>
          <div className="badge-live">
            <span className="pulse"></span>Wave 1 &middot; running
          </div>
          <div className="window">
            <div className="win-bar">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="win-title">verso &middot; agent index</span>
            </div>
            <div className="win-body">
              <div className="win-head">
                <span className="t">Payments &middot; install vs mention</span>
                <span className="chip">CLAUDE CODE + CODEX</span>
              </div>
              {MOCK_DATA.map((row) => (
                <div className="mrow" key={row.name}>
                  <div className="n">
                    {row.name}
                    <i>{row.pkg}</i>
                  </div>
                  <div>
                    <div className="track">
                      <div className="fill b" data-w={row.install}></div>
                    </div>
                    <div className="track">
                      <div className="fill g" data-w={row.mention}></div>
                    </div>
                  </div>
                  <div className="v num">
                    {row.install}%<small>{row.mention}% men.</small>
                  </div>
                </div>
              ))}
              <div className="win-foot">
                <span>n=400 runs &middot; sample</span>
                <span>claude-code 2.1.220 &middot; codex 0.146.0</span>
              </div>
            </div>
          </div>
          <div className="float-card">
            <div className="fc-top">Build #217 &middot; 41s</div>
            <div className="fc-main">
              Claude Code evaluated 3 providers, then ran{" "}
              <span className="tag">npm install stripe</span>. No human consulted.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
