import { describe, expect, it } from "vitest";
import { defaultLocalState, parseLocalState, serializeLocalState } from "@/lib/local-state";

describe("versioned local state", () => {
  it("round-trips a valid export", () => {
    const state = { ...defaultLocalState, notes: { test: "Local note" }, progress: { "module-1": true } };
    expect(parseLocalState(serializeLocalState(state))).toEqual(state);
  });

  it("rejects malformed or unknown-version imports", () => {
    expect(() => parseLocalState("not json")).toThrow();
    expect(() => parseLocalState(JSON.stringify({ ...defaultLocalState, version: 2 }))).toThrow();
  });
});
