import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Wordmark } from "./Wordmark";

interface NavProps {
  activeLink?: string;
}

export const Nav = ({ activeLink }: NavProps) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <header className={open ? "menu-open" : ""}>
        <div className="container nav">
          <Wordmark />
          <nav className="nav-links nav-desktop">
            <a href={activeLink ? "/#index" : "#index"}>The Index</a>
            <a href={activeLink ? "/#build" : "#build"}>Build mode</a>
            <a href={activeLink ? "/#reports" : "#reports"}>Reports</a>
            <Link to="/methodology" className={activeLink === "methodology" ? "on" : ""}>
              Methodology
            </Link>
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
      </header>

      {open && (
        <div className="mobile-menu">
          <a href={activeLink ? "/#index" : "#index"} onClick={() => setOpen(false)}>The Index</a>
          <a href={activeLink ? "/#build" : "#build"} onClick={() => setOpen(false)}>Build mode</a>
          <a href={activeLink ? "/#reports" : "#reports"} onClick={() => setOpen(false)}>Reports</a>
          <Link to="/methodology" className={activeLink === "methodology" ? "on" : ""} onClick={() => setOpen(false)}>
            Methodology
          </Link>
          <a
            className="btn btn-dark btn-sm"
            href={activeLink ? "/#cta" : "#cta"}
            onClick={() => setOpen(false)}
          >
            Book a demo
          </a>
        </div>
      )}
    </>
  );
};
