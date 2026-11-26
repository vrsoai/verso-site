import { Link } from "react-router-dom";
import { Wordmark } from "@/components/landing/Wordmark";
import { BookDemoButton } from "@/components/landing/BookDemoButton";

const Index = () => {
  return (
    <main className="stealth">
      <Wordmark />
      <div className="stealth-main">
        <h1>
          The questions are <em>the interesting part.</em>
        </h1>
        <BookDemoButton source="hero" className="btn btn-dark" />
      </div>
      <nav className="stealth-links" aria-label="Contact and legal">
        <a href="mailto:contact@tryverso.ai">contact@tryverso.ai</a>
        <Link to="/privacy">Privacy</Link>
        <Link to="/terms">Terms</Link>
      </nav>
    </main>
  );
};

export default Index;
