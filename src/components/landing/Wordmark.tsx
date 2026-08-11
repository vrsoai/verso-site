import { Link } from "react-router-dom";

interface WordmarkProps {
  href?: string;
  className?: string;
}

export const Wordmark = ({ href = "/", className = "" }: WordmarkProps) => {
  return (
    <Link className={`wordmark ${className}`} to={href}>
      ver<span className="slash"></span>so
    </Link>
  );
};
