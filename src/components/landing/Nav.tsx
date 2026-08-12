import { useState } from "react";
import { Link } from "react-router-dom";
import { Wordmark } from "./Wordmark";

interface NavProps {
  activeLink?: string;
}

export const Nav = ({ activeLink }: NavProps) => {
  const [open, setOpen] = useState(false);

  return (
    <header>
      <div className="container nav">
        <Wordmark />
        <nav className={`nav-links${open ? " open" : ""}`}>
          <a href={activeLink ? "/#index" : "#index"} onClick={() => setOpen(false)}>The Index</a>
          <a href={activeLink ? "/#build" : "#build"} onClick={() => setOpen(false)}>Build mode</a>
          <a href={activeLink ? "/#reports" : "#reports"} onClick={() => setOpen(false)}>Reports</a>
          <Link to="/methodology" className={activeLink === "methodology" ? "on" : ""} onClick={() => setOpen(false)}>
            Methodology
          </Link>
          <a
            className="btn btn-dark btn-sm mobile-cta"
            href={activeLink ? "/#cta" : "#cta"}
            onClick={() => setOpen(false)}
          >
            Book a demo
          </a>
        </nav>
        <div className="nav-cta desktop-cta">
          <a className="btn btn-dark btn-sm" href={activeLink ? "/#cta" : "#cta"}>
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
