import { describe, it, expect, vi, beforeEach } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { BookDemoButton } from "./BookDemoButton";

const cal = vi.hoisted(() => ({
  ready: false,
  loadCal: vi.fn(() => Promise.resolve()),
  openCalModal: vi.fn(() => true),
}));

vi.mock("@/lib/cal", () => ({
  CAL_URL: "https://cal.com/verso/demo",
  loadCal: cal.loadCal,
  isCalReady: () => cal.ready,
  openCalModal: cal.openCalModal,
}));

describe("BookDemoButton", () => {
  beforeEach(() => {
    cal.ready = false;
    cal.loadCal.mockClear();
    cal.openCalModal.mockClear();
    window.gtag = vi.fn();
  });

  it("renders a link to the Cal.com booking page and preloads the embed", () => {
    render(<BookDemoButton source="hero" className="btn btn-blue" />);
    const link = screen.getByRole("link", { name: "Book a demo" });
    expect(link).toHaveAttribute("href", "https://cal.com/verso/demo");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveClass("btn", "btn-blue");
    expect(cal.loadCal).toHaveBeenCalledTimes(1);
  });

  it("opens the modal in place when the embed is ready", () => {
    cal.ready = true;
    render(<BookDemoButton source="cta" />);
    const link = screen.getByRole("link", { name: "Book a demo" });
    const notPrevented = fireEvent.click(link);
    expect(notPrevented).toBe(false);
    expect(cal.openCalModal).toHaveBeenCalledTimes(1);
    expect(window.gtag).toHaveBeenCalledWith("event", "book_demo_click", { source: "cta" });
  });

  it("falls back to the native link when the embed is not ready", () => {
    const onClick = vi.fn();
    render(<BookDemoButton source="nav" onClick={onClick} />);
    const link = screen.getByRole("link", { name: "Book a demo" });
    const notPrevented = fireEvent.click(link);
    expect(notPrevented).toBe(true);
    expect(cal.openCalModal).not.toHaveBeenCalled();
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(window.gtag).toHaveBeenCalledWith("event", "book_demo_click", { source: "nav" });
  });
});
