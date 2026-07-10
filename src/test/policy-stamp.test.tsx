import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PolicyStamp } from "@/components/policy-stamp";
import type { Policy } from "@/content/schema";

const archivedPolicy: Policy = {
  id: "archived-policy",
  institution: "Example University",
  category: "testing",
  applicationCycle: "2024–25",
  status: "Historical test-optional record",
  summary: "This record is retained only for historical context.",
  details: "It must not be used for current-cycle advising.",
  officialSourceUrl: "https://example.edu/admissions",
  sourceTitle: "Example admissions archive",
  lastVerifiedAt: "2024-07-01",
  nextReviewDate: "2024-10-01",
  verificationStatus: "archived",
  reviewWarning: "Review the current official website before advising.",
};

describe("PolicyStamp", () => {
  it("clearly warns that archived policy data is not current advice", () => {
    render(<PolicyStamp policy={archivedPolicy} />);
    expect(screen.getByText(/Archived record — do not use for current-cycle advice/i)).toBeInTheDocument();
    expect(document.querySelector(".policy-stamp--archived")).toBeInTheDocument();
  });
});
