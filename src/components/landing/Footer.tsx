import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer>
      <div className="container foot">
        <a className="wordmark" href="#">
          ver<span className="slash"></span>so
        </a>
        <nav>
          <a href="https://docs.tryverso.ai" target="_blank" rel="noopener noreferrer">Docs</a>
          <a href="mailto:contact@tryverso.ai">Contact</a>
          <Link to="/privacy">Privacy</Link>
          <Link to="/terms">Terms</Link>
        </nav>
        <div className="fine">&copy; {new Date().getFullYear()} Verso &middot; Conversation intelligence</div>
      </div>
    </footer>
  );
};
