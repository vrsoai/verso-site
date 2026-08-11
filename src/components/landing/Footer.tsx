import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer>
      <div className="container foot">
        <Link className="wordmark" to="/">
          ver<span className="slash"></span>so
        </Link>
        <nav>
          <a href="/#index">Index</a>
          <Link to="/methodology">Methodology</Link>
          <a href="mailto:hello@tryverso.ai">Data partnerships</a>
          <a href="mailto:hello@tryverso.ai">Company</a>
          <Link to="/privacy">Privacy</Link>
        </nav>
        <div className="fine">&copy; {new Date().getFullYear()} Verso &middot; Agent recommendation intelligence</div>
      </div>
    </footer>
  );
};
