export const HowItWorks = () => {
  return (
    <section id="how-it-works">
      <div className="narrow">
        <div className="eyebrow">How it works</div>
        <h2>
          Consent-first collection <em>at scale.</em>
        </h2>
        <div className="how-steps">
          <div className="how-step">
            <div className="snum">01</div>
            <h3>Partner apps</h3>
            <p>
              Users of partner applications opt in to share their LLM
              conversation history. Every connection is explicit, revocable,
              and consent-based.
            </p>
          </div>
          <div className="how-step">
            <div className="snum">02</div>
            <h3>Normalize</h3>
            <p>
              Conversations are anonymized, stripped of PII, and structured into
              a consistent schema. Proprietary formats become clean, linear
              message lists — unified across providers.
            </p>
          </div>
          <div className="how-step">
            <div className="snum">03</div>
            <h3>Deliver</h3>
            <p>
              Fresh data delivered daily via API, bulk export, or cloud storage
              (S3/GCS). Your format, your cadence.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
