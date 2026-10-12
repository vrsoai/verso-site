import { useEffect, type MouseEvent, type ReactNode } from "react";
import { CAL_URL, isCalReady, loadCal, openCalModal } from "@/lib/cal";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

type BookDemoButtonProps = {
  /** Where on the page the button lives, sent as the analytics event label. */
  source: "hero" | "nav" | "nav-mobile" | "cta";
  className?: string;
  onClick?: () => void;
  children?: ReactNode;
};

/**
 * "Book a demo" CTA. Opens the Cal.com booking modal in place; falls back to
 * opening the Cal.com booking page in a new tab if the embed script is not
 * loaded (ad blocker, slow network).
 */
export const BookDemoButton = ({
  source,
  className = "btn btn-blue",
  onClick,
  children = "Book a demo",
}: BookDemoButtonProps) => {
  useEffect(() => {
    void loadCal();
  }, []);

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.();
    window.gtag?.("event", "book_demo_click", { source });
    if (!isCalReady()) return;
    event.preventDefault();
    openCalModal();
  };

  return (
    <a
      className={className}
      href={CAL_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
    >
      {children}
    </a>
  );
};
