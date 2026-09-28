export const CtaSection = () => {
  return (
    <section className="dark-section cta" id="cta">
      <div className="container cta-inner">
        <div className="eyebrow">Get started</div>
        <h2 style={{ color: "#F2EFE7" }}>
          See the <em>data.</em>
        </h2>
        <p
          className="lead"
          style={{ margin: "22px auto 0", maxWidth: 520 }}
        >
          Get a sample dataset and pricing. We'll walk you through the schema,
          delivery options, and compliance framework.
        </p>
        <div style={{ marginTop: 36 }}>
          <a className="btn btn-lime" href="mailto:hello@tryverso.ai">
            Book a demo
          </a>
        </div>
      </div>
    </section>
  );
};
