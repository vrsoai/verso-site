export const Trust = () => {
  return (
    <section className="dark-section" id="trust">
      <div className="container">
        <div className="eyebrow">Trust</div>
        <h2 style={{ color: "#F2EFE7" }}>
          Enterprise-grade <em>data governance.</em>
        </h2>
        <div className="trust-grid">
          <div className="trust-card">
            <div className="trust-icon">&#x2713;</div>
            <h3>Consent</h3>
            <p>
              Every user explicitly opts in. Access is revocable at any time
              through a self-service manage page.
            </p>
          </div>
          <div className="trust-card">
            <div className="trust-icon">&#x29C9;</div>
            <h3>Anonymization</h3>
            <p>
              PII stripped before delivery. No usernames, emails, or personal
              identifiers in the dataset.
            </p>
          </div>
          <div className="trust-card">
            <div className="trust-icon">&#x1F512;</div>
            <h3>Encryption</h3>
            <p>
              AES-256 envelope encryption. Vault key destruction on user
              deletion — credentials become mathematically irrecoverable.
            </p>
          </div>
          <div className="trust-card">
            <div className="trust-icon">&#x2696;</div>
            <h3>Compliance</h3>
            <p>
              GDPR Article 17 compliant. Full audit trail. Data purge with
              cryptographic proof of deletion.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
