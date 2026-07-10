# Data model

## Local state envelope

The browser stores a versioned JSON envelope under `admissions-desk:v1`:

```ts
type LocalDeskState = {
  version: 1;
  progress: Record<string, boolean>;
  bookmarks: string[];
  notes: Record<string, string>;
  checklists: Record<string, string[]>;
  caseProgress: Record<string, CaseResponse>;
  recentSearches: string[];
  recentSchools: string[];
  preferences: { reducedMotion: boolean; languageMode: "consultant" | "student" };
  consultDraft?: ConsultDraft;
  diagnosticDraft?: DiagnosticDraft;
};
```

No full legal name is required. The UI asks for initials or a fictional label. Export/import uses this same versioned envelope; import validates shape and version before replacing current state. Reset deletes the storage key and in-memory state.

## Content records

Structured content is validated with Zod. Policy records require provenance fields. School records reference policy IDs instead of duplicating mutable policy text.

## Privacy boundary

There is no backend persistence or analytics in the first implementation. Content and local tools are browser-only. External university links receive safe `rel` attributes and open only by explicit user action.
