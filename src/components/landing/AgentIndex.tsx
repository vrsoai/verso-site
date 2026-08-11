import { useState, useEffect, useRef } from "react";

interface Tool {
  n: string;
  p: string;
  i: number;
  m: number;
}

interface Category {
  note: string;
  tools: Tool[];
}

const DATA: Record<string, Category> = {
  Payments: {
    note: "PayPal: cited 7\u00d7 more than installed",
    tools: [
      { n: "Stripe", p: "stripe", i: 84, m: 91 },
      { n: "PayPal", p: "@paypal/checkout", i: 6, m: 41 },
      { n: "Lemon Squeezy", p: "@lemonsqueezy/js", i: 5, m: 31 },
      { n: "Paddle", p: "@paddle/paddle-js", i: 3, m: 22 },
      { n: "Braintree", p: "braintree", i: 2, m: 12 },
    ],
  },
  "Vector DBs": {
    note: "Qdrant closes the gap wave over wave",
    tools: [
      { n: "Pinecone", p: "@pinecone-database", i: 38, m: 61 },
      { n: "Qdrant", p: "@qdrant/js-client", i: 31, m: 44 },
      { n: "Chroma", p: "chromadb", i: 19, m: 33 },
      { n: "Weaviate", p: "weaviate-client", i: 7, m: 26 },
      { n: "pgvector", p: "pgvector", i: 5, m: 18 },
    ],
  },
  Auth: {
    note: "Auth0: strong brand, weak default",
    tools: [
      { n: "Clerk", p: "@clerk/nextjs", i: 39, m: 47 },
      { n: "Supabase Auth", p: "@supabase/supabase-js", i: 31, m: 42 },
      { n: "Auth0", p: "@auth0/nextjs-auth0", i: 14, m: 52 },
      { n: "NextAuth", p: "next-auth", i: 12, m: 29 },
      { n: "Firebase Auth", p: "firebase/auth", i: 4, m: 19 },
    ],
  },
  Comms: {
    note: "Twilio holds. Resend is the one to watch",
    tools: [
      { n: "Twilio", p: "twilio", i: 71, m: 83 },
      { n: "Resend", p: "resend", i: 14, m: 24 },
      { n: "Vonage", p: "@vonage/server-sdk", i: 6, m: 21 },
      { n: "MessageBird", p: "messagebird", i: 5, m: 14 },
      { n: "Sinch", p: "@sinch/sdk-core", i: 4, m: 9 },
    ],
  },
};

const CATEGORIES = Object.keys(DATA);

export const AgentIndex = () => {
  const [active, setActive] = useState(CATEGORIES[0]);
  const chartRef = useRef<HTMLDivElement>(null);
  const category = DATA[active];

  useEffect(() => {
    // Animate bars after render
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (chartRef.current) {
          chartRef.current.querySelectorAll<HTMLElement>(".bbar").forEach((b) => {
            b.style.width = b.dataset.w + "%";
          });
        }
      });
    });
  }, [active]);

  const handleTabClick = (cat: string) => {
    // Reset bar widths before switching
    if (chartRef.current) {
      chartRef.current.querySelectorAll<HTMLElement>(".bbar").forEach((b) => {
        b.style.width = "0";
      });
    }
    setActive(cat);
  };

  return (
    <section id="index">
      <div className="container">
        <div className="index-head">
          <div>
            <div className="eyebrow">The Verso Agent Index</div>
            <h2>
              Who agents choose,
              <br />
              <em>category by category.</em>
            </h2>
            <p className="lead">
              Blue is <b style={{ color: "var(--ink)" }}>install share</b>: what agents actually
              pulled while building. Hatched is{" "}
              <b style={{ color: "var(--ink)" }}>mention share</b>: what they recommended in
              answers. The gap is the story.
            </p>
          </div>
          <div className="tabs">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={`tab${cat === active ? " active" : ""}`}
                onClick={() => handleTabClick(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
        <div className="index-card">
          <div className="index-note">{category.note}</div>
          <div className="legend">
            <span>
              <span className="sw b"></span>Install share &middot; build mode
            </span>
            <span>
              <span className="sw g"></span>Mention share &middot; answer mode
            </span>
          </div>
          <div className="chart" ref={chartRef}>
            {category.tools.map((tool) => (
              <div className="crow" key={tool.n}>
                <div className="tool">
                  {tool.n}
                  <i>{tool.p}</i>
                </div>
                <div className="bars">
                  <div className="brow">
                    <div className="btrack">
                      <div className="bbar b" data-w={tool.i}></div>
                    </div>
                    <div className="bval num">
                      {tool.i}% <em>INSTALL</em>
                    </div>
                  </div>
                  <div className="brow">
                    <div className="btrack">
                      <div className="bbar g" data-w={tool.m}></div>
                    </div>
                    <div className="bval num" style={{ color: "var(--soft)" }}>
                      {tool.m}% <em>MENTION</em>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="src">
            Verso Agent Index &middot; Wave 1 (sample data, prototype) &middot; n=400 runs
            &middot; claude-code 2.1.220 &middot; codex 0.146.0 &middot; Aug 2026
          </div>
        </div>
      </div>
    </section>
  );
};
