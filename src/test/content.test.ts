import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { globSync } from "node:fs";
import { cases } from "@/content/cases";
import { glossary } from "@/content/glossary";
import { lessons } from "@/content/lessons";
import { getPoliciesForSchool, policies } from "@/content/policies";
import { roadmap } from "@/content/roadmap";
import { schools } from "@/content/schools";
import { toolkit } from "@/content/toolkit";
import { policySchema } from "@/content/schema";

describe("content coverage", () => {
  it("seeds every required major collection", () => {
    expect(lessons).toHaveLength(16);
    expect(schools).toHaveLength(8);
    expect(policies).toHaveLength(16);
    expect(cases).toHaveLength(6);
    expect(toolkit).toHaveLength(24);
    expect(glossary).toHaveLength(40);
    expect(roadmap).toHaveLength(6);
  });

  it("keeps every Ivy in high-reach language rather than probability language", () => {
    expect(schools.map((school) => school.name).sort()).toEqual([
      "Brown University", "Columbia University", "Cornell University", "Dartmouth College", "Harvard University", "Princeton University", "University of Pennsylvania", "Yale University",
    ].sort());
    expect(lessons.find((lesson) => lesson.module === 9)?.sections.map((section) => section.body).join(" ")).toMatch(/every Ivy League institution remains a high reach/i);
  });

  it("gives every school decision-useful comparison and cost context", () => {
    for (const school of schools) {
      expect(school.applicationRoundOverview.length).toBeGreaterThan(40);
      expect(school.financialAidOverview.length).toBeGreaterThan(40);
      expect(school.usefulComparisonSchools.length).toBeGreaterThanOrEqual(3);
      expect(school.comparisonNotes.researchIntensity).toBeTruthy();
      expect(school.comparisonNotes.academicExploration).toBeTruthy();
      expect(school.officialSources.some((source) => /financial aid|afford|cost and aid/i.test(source.title))).toBe(true);
    }
  });

  it("requires provenance and review metadata for every policy", () => {
    for (const policy of policies) {
      expect(policy.officialSourceUrl).toMatch(/^https:\/\//);
      expect(policy.applicationCycle).toBe("2026–27");
      expect(policy.lastVerifiedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(policy.nextReviewDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(policy.reviewWarning).toMatch(/official website/i);
    }
  });

  it("marks Penn cycle-specific uncertainty instead of silently carrying it forward", () => {
    const penn = policies.filter((policy) => policy.institution === "University of Pennsylvania");
    expect(penn).toHaveLength(2);
    expect(penn.every((policy) => policy.verificationStatus === "verification-needed")).toBe(true);
  });

  it("handles missing and invalid policy data explicitly", () => {
    expect(getPoliciesForSchool("Fictional University")).toEqual([]);
    expect(policySchema.safeParse({ institution: "Incomplete record" }).success).toBe(false);
  });
});

describe("public-copy ethics sensor", () => {
  const files = globSync("src/**/*.{ts,tsx}", { exclude: ["src/test/**"] });
  const publicSource = files.map((file) => readFileSync(file, "utf8")).join("\n").toLowerCase();
  const unrelatedPlatformName = ["maia", "learning"].join("");

  it("contains no unrelated platform name", () => {
    expect(publicSource).not.toContain(unrelatedPlatformName);
  });

  it("contains no admissions guarantee or chance-calculator copy", () => {
    for (const phrase of ["guarantee your", "calculate your ivy chances", "ivy chance calculator", "crack the ivy code", "perfect ivy profile"]) {
      expect(publicSource).not.toContain(phrase);
    }
  });
});
