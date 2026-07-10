import { z } from "zod";

export const STORAGE_KEY = "admissions-desk:v1";

const localStateSchema = z.object({
  version: z.literal(1),
  progress: z.record(z.string(), z.boolean()),
  bookmarks: z.array(z.string()),
  notes: z.record(z.string(), z.string()),
  checklists: z.record(z.string(), z.array(z.string())),
  caseProgress: z.record(z.string(), z.record(z.string(), z.string())),
  recentSearches: z.array(z.string()),
  recentSchools: z.array(z.string()),
  comparisonNotes: z.record(z.string(), z.string()),
  preferences: z.object({
    reducedMotion: z.boolean(),
    languageMode: z.enum(["consultant", "student"]),
  }),
  consultDraft: z.record(z.string(), z.string()),
  diagnosticDraft: z.record(z.string(), z.object({ status: z.string(), evidence: z.string() })),
});

export type LocalDeskState = z.infer<typeof localStateSchema>;

export const defaultLocalState: LocalDeskState = {
  version: 1,
  progress: {},
  bookmarks: [],
  notes: {},
  checklists: {},
  caseProgress: {},
  recentSearches: [],
  recentSchools: [],
  comparisonNotes: {},
  preferences: { reducedMotion: false, languageMode: "consultant" },
  consultDraft: {},
  diagnosticDraft: {},
};

export function parseLocalState(value: string): LocalDeskState {
  return localStateSchema.parse(JSON.parse(value));
}

export function serializeLocalState(state: LocalDeskState): string {
  return JSON.stringify(state, null, 2);
}
