import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)' }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'var(--serif)', fontSize: 72, fontWeight: 500, marginBottom: 16, letterSpacing: '-.02em' }}>404</h1>
        <p style={{ fontSize: 18, color: 'var(--soft)', marginBottom: 24 }}>Page not found</p>
        <Link className="btn btn-dark btn-sm" to="/">Return to Home</Link>
      </div>
    </div>
  );
};

export default NotFound;
