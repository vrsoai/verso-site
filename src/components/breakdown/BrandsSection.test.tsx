import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { Breakdown, StatusView } from "@/lib/breakdown/api";
import { BrandsSection } from "./Sections";

const status = (enabled: boolean) => ({ labels: { enabled, total: 10, labeled: 10 } }) as unknown as StatusView;

const breakdown = (brands: Breakdown["brands"], conversations = 10) =>
  ({ totals: { conversations }, brands }) as unknown as Breakdown;

describe("BrandsSection", () => {
  it("renders nothing when labels are off", () => {
    const { container } = render(<BrandsSection b={breakdown(null)} status={status(false)} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("says it is still reading while the brands are missing or none is assessed", () => {
    render(<BrandsSection b={breakdown(undefined)} status={status(true)} />);
    expect(screen.getByText(/Reading your conversations/)).toBeInTheDocument();
  });

  it("shows the counts, the shares and the names", () => {
    render(
      <BrandsSection
        status={status(true)}
        b={breakdown({
          assessed: 8,
          recommended: 4,
          recommendedSeveral: 2,
          mentionedOnly: 1,
          recommendedShare: 0.5,
          distinctRecommended: 6,
          topRecommended: [{ name: "Grand Hotel Tremezzo", conversations: 3 }, { name: "Notion", conversations: 1 }],
          topMentioned: [{ name: "Crédit Agricole", conversations: 2 }],
        })}
      />,
    );
    expect(screen.getByText(/at least one brand, product, company or organization in 50% of your conversations, and two or more in 25%/)).toBeInTheDocument();
    expect(screen.getByText("conversations with a recommendation")).toBeInTheDocument();
    expect(screen.getByText("Grand Hotel Tremezzo")).toBeInTheDocument();
    expect(screen.getByText("Crédit Agricole")).toBeInTheDocument();
    // 8 of 10 read so far
    expect(screen.getByText(/Based on the 8 conversations read so far, out of 10/)).toBeInTheDocument();
  });
});
