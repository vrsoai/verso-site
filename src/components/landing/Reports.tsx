export const Reports = () => {
  return (
    <section className="dark-section" id="reports" style={{ paddingTop: 104 }}>
      <div className="container">
        <div className="eyebrow">Reports</div>
        <h2 style={{ color: "#F2EFE7" }}>Three ways in.</h2>
        <div className="offers">
          <div className="offer">
            <div className="k">One-time</div>
            <h3>Snapshot</h3>
            <p className="d">Your exact position in your category, right now.</p>
            <ul>
              <li>Install &amp; mention share vs. competitors</li>
              <li>By agent, model &amp; prompt family</li>
              <li>Verbatim run transcripts</li>
              <li>The prompts where you lose, and to whom</li>
            </ul>
            <a className="btn btn-ghost" href="#cta">
              Request a snapshot
            </a>
          </div>
          <div className="offer featured">
            <div className="tagtop">Most popular</div>
            <div className="k">Monthly</div>
            <h3>Monitoring</h3>
            <p className="d">Every model release reshuffles the deck. See it happen.</p>
            <ul>
              <li>Monthly waves &amp; trend lines</li>
              <li>New-model alerts within days</li>
              <li>Category expansion on request</li>
              <li>Quarterly analyst readout</li>
            </ul>
            <a className="btn btn-lime" href="#cta">
              Start monitoring
            </a>
          </div>
          <div className="offer">
            <div className="k">Custom</div>
            <h3>Benchmark</h3>
            <p className="d">Your prompts, your use-cases, your markets.</p>
            <ul>
              <li>Custom prompt sets from your ICP</li>
              <li>Head-to-head vs. named competitors</li>
              <li>SDK &amp; docs friction analysis</li>
              <li>Raw exports for your data team</li>
            </ul>
            <a className="btn btn-ghost" href="#cta">
              Scope a benchmark
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
