import { describe, expect, it } from "vitest";
import { searchDocuments, searchIndex } from "@/content/search-index";

describe("global search", () => {
  it("indexes every major content category", () => {
    expect(new Set(searchIndex.map((item) => item.category))).toEqual(new Set(["Lesson", "School", "Policy", "Case", "Toolkit", "Glossary", "Roadmap"]));
  });

  it("finds the required high-value queries", () => {
    expect(searchDocuments("Brown open curriculum")[0]?.href).toBe("/schools/brown");
    expect(searchDocuments("junior year").some((item) => item.category === "Roadmap" || item.category === "Lesson")).toBe(true);
    expect(searchDocuments("teacher recommendation").some((item) => item.href.includes("glossary") || item.href.includes("learn"))).toBe(true);
    expect(searchDocuments("financial aid").length).toBeGreaterThan(0);
    expect(searchDocuments("Columbia Core")[0]?.href).toBe("/schools/columbia");
  });
});
