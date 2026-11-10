import { Component, type ReactNode } from "react";

/**
 * A page that fails to load or render (a new version deployed while the tab
 * was open, a flaky network on the code chunk) shows a way out instead of a
 * blank screen.
 */
export class BreakdownBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <main style={{ maxWidth: 520, margin: "0 auto", padding: "96px 24px", textAlign: "center" }}>
        <h1 style={{ fontSize: 28, marginBottom: 12 }}>This page didn't load</h1>
        <p style={{ marginBottom: 24, opacity: 0.7 }}>Your data is safe. Reloading usually fixes it.</p>
        <button type="button" className="btn btn-blue" onClick={() => window.location.reload()}>Reload</button>
      </main>
    );
  }
}
