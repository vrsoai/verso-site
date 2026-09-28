import { useEffect, useRef, useState, useCallback } from "react";

interface TermLine {
  text: string;
  cls: string;
  delay: number;
}

const LINES: TermLine[] = [
  { text: '$ prompt: "Add subscription billing to this Next.js app"', cls: "p", delay: 300 },
  { text: "> A payments provider is required. Evaluating options\u2026", cls: "p", delay: 650 },
  { text: "> Comparing Stripe, Paddle, Lemon Squeezy for this stack.", cls: "p", delay: 750 },
  { text: "> Decision: |Stripe|. Best-documented SDK, first-class Next.js support.", cls: "", delay: 800 },
  { text: "$ npm install |stripe| @stripe/stripe-js", cls: "", delay: 520 },
  { text: "+ stripe@15.8.0  + @stripe/stripe-js@4.2.0", cls: "p", delay: 600 },
  { text: "\u2713 Build complete: 1 provider installed, 0 humans consulted.", cls: "ok", delay: 0 },
];

function highlightText(text: string): string {
  return text.replace(/\|([^|]*)\|/g, '<span class="hl">$1</span>');
}

function CountUp({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const counted = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || counted.current) return;
          counted.current = true;
          observer.unobserve(el);

          const t0 = performance.now();
          const animate = (t: number) => {
            const p = Math.min((t - t0) / 700, 1);
            el.textContent = String(Math.round(to * (1 - Math.pow(1 - p, 3))));
            if (p < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        });
      },
      { threshold: 0.6 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [to]);

  return <span ref={ref} className="count">0</span>;
}

export const BuildMode = () => {
  const termRef = useRef<HTMLDivElement>(null);
  const played = useRef(false);
  const [termLines, setTermLines] = useState<Array<{ html: string; cls: string }>>([]);
  const [showCursor, setShowCursor] = useState(false);

  const typeLine = useCallback((lineIndex: number) => {
    if (lineIndex >= LINES.length) {
      setShowCursor(true);
      return;
    }

    const { text, cls, delay } = LINES[lineIndex];
    let charIndex = 0;

    // Add a new empty line
    setTermLines((prev) => [...prev, { html: "", cls }]);

    const typeChar = () => {
      if (charIndex <= text.length) {
        const partial = text.slice(0, charIndex).replace(/\|([^|]*)\|?/g, (_, g) => `<span class="hl">${g}</span>`).replace(/\|/g, "");
        setTermLines((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = { html: partial, cls };
          return updated;
        });
        charIndex++;
        setTimeout(typeChar, 13);
      } else {
        // Finalize the line
        setTermLines((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = { html: highlightText(text), cls };
          return updated;
        });
        setTimeout(() => typeLine(lineIndex + 1), delay);
      }
    };

    typeChar();
  }, []);

  useEffect(() => {
    const el = termRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !played.current) {
            played.current = true;
            observer.unobserve(el);
            typeLine(0);
          }
        });
      },
      { threshold: 0.45 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [typeLine]);

  return (
    <section className="dark-section" id="build">
      <div className="container split">
        <div>
          <div className="eyebrow">Build mode</div>
          <h2>
            What they <em>say</em> vs. what they <em>install</em>.
          </h2>
          <p className="lead">
            Everyone else asks chatbots questions and counts the mentions. Verso runs real
            developer prompts through the coding agents themselves, sandboxed and at scale, and
            records the <span className="mono" style={{ color: "#F2EFE7" }}>npm install</span>{" "}
            that happens when nobody is watching.
          </p>
          <div className="dstats">
            <div className="dstat">
              <div className="n num">
                <CountUp to={41} />
                <span className="lm">%</span>
              </div>
              <div className="l">
                of mentions never become
                <br />
                an install
              </div>
            </div>
            <div className="dstat">
              <div className="n num">
                <CountUp to={12} />
                <span className="lm">&times;</span>
              </div>
              <div className="l">
                runs per prompt. Distributions,
                <br />
                not anecdotes
              </div>
            </div>
          </div>
        </div>
        <div className="term">
          <div className="win-bar">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="win-title">
              sandbox &middot; build mode &middot; claude-code 2.1.220
            </span>
          </div>
          <div className="term-body" ref={termRef}>
            {termLines.map((line, i) => (
              <span
                key={i}
                className={`ln ${line.cls}`}
                dangerouslySetInnerHTML={{ __html: line.html }}
              />
            ))}
            {showCursor && <span className="cursor-blink"></span>}
          </div>
        </div>
      </div>
    </section>
  );
};
