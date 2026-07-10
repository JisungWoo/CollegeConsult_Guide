import { z } from "zod";

export const sourceSchema = z.object({
  title: z.string().min(3),
  url: z.url(),
});

export const lessonSchema = z.object({
  id: z.string(),
  slug: z.string(),
  module: z.number().int().min(1).max(16),
  title: z.string(),
  summary: z.string(),
  learningObjectives: z.array(z.string()).min(2),
  sections: z.array(z.object({ heading: z.string(), body: z.string() })).min(2),
  mistakes: z.array(z.string()).min(2),
  consultantPrompts: z.array(z.string()).min(2),
  studentFacingExplanation: z.string(),
  knowledgeCheck: z.object({
    question: z.string(),
    options: z.array(z.string()).min(2),
    correctIndex: z.number().int().nonnegative(),
    explanation: z.string(),
  }),
  relatedTools: z.array(z.string()),
  lastReviewedAt: z.string(),
});

export const schoolSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  shortName: z.string(),
  location: z.string(),
  undergraduatePhilosophy: z.string(),
  curriculumModel: z.string(),
  campusContext: z.string(),
  undergraduateStructure: z.string(),
  applicationRoundOverview: z.string(),
  financialAidOverview: z.string(),
  usefulComparisonSchools: z.array(z.string()).min(3),
  distinctiveFeatures: z.array(z.string()).min(3),
  strongFitTraits: z.array(z.string()).min(3),
  possibleMismatchTraits: z.array(z.string()).min(2),
  studentQuestions: z.array(z.string()).min(3),
  commonMisconceptions: z.array(z.string()).min(1),
  comparisonNotes: z.record(z.string(), z.string()),
  majorConsiderations: z.string(),
  supplementResearchPrompts: z.array(z.string()).min(2),
  policyIds: z.array(z.string()),
  officialSources: z.array(sourceSchema).min(1),
  applicationCycle: z.string(),
  lastVerifiedAt: z.string(),
  verificationStatus: z.enum(["current", "verification-needed", "archived"]),
  consultantSummary: z.string(),
  studentSummary: z.string(),
});

export const policySchema = z.object({
  id: z.string(),
  institution: z.string(),
  category: z.enum(["testing", "early-application", "financial-aid", "application"]),
  applicationCycle: z.string(),
  status: z.string(),
  summary: z.string(),
  details: z.string(),
  officialSourceUrl: z.url(),
  sourceTitle: z.string(),
  lastVerifiedAt: z.string(),
  nextReviewDate: z.string(),
  verificationStatus: z.enum(["current", "verification-needed", "archived"]),
  reviewWarning: z.string(),
});

export const caseSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  subtitle: z.string(),
  facts: z.array(z.object({ label: z.string(), detail: z.string() })).min(5),
  learningGoals: z.array(z.string()).min(3),
  missingInformation: z.array(z.string()).min(2),
  expertReasoning: z.array(z.string()).min(3),
  cautions: z.array(z.string()).min(1),
});

export const toolkitSchema = z.object({
  id: z.string(),
  title: z.string(),
  purpose: z.string(),
  whenToUse: z.string(),
  consultantInstructions: z.string(),
  studentInstructions: z.string().optional(),
  mistakes: z.array(z.string()).min(1),
  fields: z.array(z.string()).min(3),
});

export const glossarySchema = z.object({
  term: z.string(),
  slug: z.string(),
  definition: z.string(),
  whyItMatters: z.string(),
  caution: z.string(),
  related: z.array(z.string()),
});

export type Lesson = z.infer<typeof lessonSchema>;
export type School = z.infer<typeof schoolSchema>;
export type Policy = z.infer<typeof policySchema>;
export type CaseStudy = z.infer<typeof caseSchema>;
export type ToolkitItem = z.infer<typeof toolkitSchema>;
export type GlossaryEntry = z.infer<typeof glossarySchema>;

export function validateCollection<T>(schema: z.ZodType<T>, records: unknown[]): T[] {
  return records.map((record) => schema.parse(record));
}
