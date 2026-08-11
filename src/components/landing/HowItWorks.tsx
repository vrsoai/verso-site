export const HowItWorks = () => {
  return (
    <section id="how" style={{ paddingTop: 0 }}>
      <div className="container">
        <div className="eyebrow">How it works</div>
        <h2>
          Real prompts. Real builds. <em>Real choices.</em>
        </h2>
        <div className="steps">
          <div className="step">
            <div className="num">STEP 01</div>
            <h3>Run the prompts developers actually write</h3>
            <p>
              Natural questions like <code>"add subscription billing"</code> or{" "}
              <code>"set up semantic search"</code>, not keyword lists.
            </p>
          </div>
          <div className="step">
            <div className="num">STEP 02</div>
            <h3>Let the agents build, repeatedly</h3>
            <p>
              Each prompt runs N times per agent, per model, in pinned sandboxes. Answer mode
              captures recommendations; build mode captures installs.
            </p>
          </div>
          <div className="step">
            <div className="num">STEP 03</div>
            <h3>Read your share, and the why</h3>
            <p>
              Install &amp; mention share vs. every competitor, plus the run transcripts showing
              how agents justify each choice.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
