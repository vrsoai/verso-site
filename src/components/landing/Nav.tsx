import { useState } from "react";
import { Wordmark } from "./Wordmark";

export const Nav = () => {
  const [open, setOpen] = useState(false);

  return (
    <header>
      <div className="container nav">
        <Wordmark />
        <nav className={`nav-links${open ? " open" : ""}`}>
          <a href="#use-cases" onClick={() => setOpen(false)}>Use cases</a>
          <a href="#how-it-works" onClick={() => setOpen(false)}>How it works</a>
          <a href="#trust" onClick={() => setOpen(false)}>Trust</a>
          <a href="https://docs.tryverso.ai" target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>Docs</a>
          <a
            className="btn btn-dark btn-sm mobile-cta"
            href="mailto:hello@tryverso.ai"
            onClick={() => setOpen(false)}
          >
            Book a demo
          </a>
        </nav>
        <div className="nav-cta desktop-cta">
          <a className="btn btn-dark btn-sm" href="mailto:hello@tryverso.ai">
            Book a demo
          </a>
        </div>
        <button
          className={`burger${open ? " active" : ""}`}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
      {open && <div className="nav-overlay" onClick={() => setOpen(false)} />}
    </header>
  );
};
