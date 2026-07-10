import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { globSync } from "node:fs";

const source = globSync("src/**/*.{ts,tsx}", { exclude: ["src/test/**"] }).map((file) => readFileSync(file, "utf8")).join("\n");
const css = readFileSync("src/app/globals.css", "utf8");

describe("accessibility, privacy, and print sensors", () => {
  it("defines visible focus, reduced-motion, and print modes", () => {
    expect(css).toContain(":focus-visible");
    expect(css).toContain("@media (prefers-reduced-motion: reduce)");
    expect(css).toContain("@media print");
    expect(css).toContain("@page");
  });

  it("does not render raw user HTML", () => {
    expect(source).not.toContain("dangerouslySetInnerHTML");
  });

  it("protects every explicit new-tab link", () => {
    const newTabCount = source.match(/target="_blank"/g)?.length ?? 0;
    const protectedCount = source.match(/target="_blank" rel="noreferrer"/g)?.length ?? 0;
    expect(newTabCount).toBeGreaterThan(0);
    expect(protectedCount).toBe(newTabCount);
  });

  it("contains no analytics or tracker integration", () => {
    expect(source.toLowerCase()).not.toMatch(/google-analytics|gtag\(|segment\.com|mixpanel|posthog/);
  });
});
