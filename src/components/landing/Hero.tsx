export const Hero = () => {
  return (
    <section className="hero">
      <div className="container hero-grid">
        <div>
          <div className="eyebrow">Conversation intelligence</div>
          <h1>
            Real conversations between humans{" "}
            <em className="u">and&nbsp;AI.</em>
          </h1>
          <p className="sub">
            Verso collects and delivers raw, anonymized LLM conversation
            data — across ChatGPT, Claude, Gemini, and more. <b>Consent-based</b>. <b>GDPR-ready</b>. Updated daily.
          </p>
          <a className="btn btn-blue" href="mailto:hello@tryverso.ai">
            Book a demo
          </a>
        </div>

        <div className="mock">
          <div className="window">
            <div className="win-bar">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="win-title">verso &middot; sample</span>
            </div>
            <div className="win-body">
              <pre className="sample-json">{`{
  "conversation_id": "a1b2c3d4",
  "messages": [
    {
      "role": "user",
      "content": "Compare React Server Components
                  with traditional SSR approaches",
      "timestamp": "2026-09-27T14:23:11Z"
    },
    {
      "role": "assistant",
      "content": "React Server Components differ
                  from traditional SSR in several
                  key ways ...",
      "timestamp": "2026-09-27T14:23:18Z"
    }
  ],
  "provider": "openai",
  "model": "gpt-4o",
  "create_time": "2026-09-27T14:23:11Z"
}`}</pre>
            </div>
          </div>
        </div>
      </div>

      <div className="container stats">
        <div className="stat">
          <div className="stat-num">2m+</div>
          <div className="stat-label">conversations collected</div>
        </div>
        <div className="stat">
          <div className="stat-num">daily</div>
          <div className="stat-label">fresh data delivery</div>
        </div>
        <div className="stat">
          <div className="stat-num">100%</div>
          <div className="stat-label">consent-based, anonymized</div>
        </div>
      </div>
    </section>
  );
};
