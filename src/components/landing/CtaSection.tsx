import { useState, FormEvent } from "react";

const CheckIcon = () => (
  <svg fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" width="16">
    <path d="M5 13l4 4L19 7" />
  </svg>
);

export const CtaSection = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="dark-section cta" id="cta">
      <div className="container cta-inner">
        <div className="eyebrow">Your move</div>
        <h2 style={{ color: "#F2EFE7" }}>
          Does the agent <em>pick you?</em>
        </h2>
        <p
          className="lead"
          style={{ margin: "22px auto 0", maxWidth: 520 }}
        >
          Tell us your tool. A human analyst replies within two business days with your install
          share and the competitor agents prefer. Free, with the source line attached.
        </p>
        <form className="audit" onSubmit={handleSubmit}>
          <input type="text" placeholder="Your tool + work email" required />
          <button className="btn btn-lime" type="submit">
            {submitted ? "Check your inbox \u2713" : "Get my two numbers"}
          </button>
        </form>
        <div className="hero-checks" style={{ marginTop: 20 }}>
          <span>
            <CheckIcon />
            Free
          </span>
          <span>
            <CheckIcon />
            From the live wave
          </span>
          <span>
            <CheckIcon />
            Or book a demo instead
          </span>
        </div>
      </div>
    </section>
  );
};
