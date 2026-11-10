import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import "./breakdown.css";

/** Page frame of the breakdown pages: a light header, the content, a short footer. */
export function BreakdownShell({ children, aside }: { children: ReactNode; aside?: ReactNode }) {
  return (
    <div className="bd-page">
      <div className="bd-header">
        <Link className="wordmark" to="/">
          ver<span className="slash"></span>so
        </Link>
        <div>{aside ?? <span className="bd-tag">Your ChatGPT, in numbers</span>}</div>
      </div>
      <main className="bd-main">{children}</main>
      <div className="bd-footer">
        <span>&copy; {new Date().getFullYear()} Verso</span>
        <nav>
          <Link to="/privacy">Privacy</Link>
          <Link to="/terms">Terms</Link>
          <a href="mailto:hello@tryverso.ai">Contact</a>
        </nav>
      </div>
    </div>
  );
}
