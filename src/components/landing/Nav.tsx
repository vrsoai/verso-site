import { Link } from "react-router-dom";
import { Wordmark } from "./Wordmark";

interface NavProps {
  activeLink?: string;
}

export const Nav = ({ activeLink }: NavProps) => {
  return (
    <header>
      <div className="container nav">
        <Wordmark />
        <nav className="nav-links">
          <a href={activeLink ? "/#index" : "#index"}>The Index</a>
          <a href={activeLink ? "/#build" : "#build"}>Build mode</a>
          <a href={activeLink ? "/#reports" : "#reports"}>Reports</a>
          <Link to="/methodology" className={activeLink === "methodology" ? "on" : ""}>
            Methodology
          </Link>
        </nav>
        <div className="nav-cta">
          <a className="btn btn-dark btn-sm" href={activeLink ? "/#cta" : "#cta"}>
            Book a demo
          </a>
        </div>
      </div>
    </header>
  );
};
