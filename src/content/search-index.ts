import { cases } from "./cases";
import { glossary } from "./glossary";
import { lessons } from "./lessons";
import { policies } from "./policies";
import { roadmap } from "./roadmap";
import { schools } from "./schools";
import { toolkit } from "./toolkit";

export type SearchDocument = {
  id: string;
  category: "Lesson" | "School" | "Policy" | "Case" | "Toolkit" | "Glossary" | "Roadmap";
  title: string;
  summary: string;
  href: string;
  text: string;
};

export const searchIndex: SearchDocument[] = [
  ...lessons.map((item) => ({ id: item.id, category: "Lesson" as const, title: item.title, summary: item.summary, href: `/learn/${item.slug}`, text: [item.title, item.summary, ...item.learningObjectives, ...item.sections.map((s) => `${s.heading} ${s.body}`)].join(" ").toLowerCase() })),
  ...schools.map((item) => ({ id: item.id, category: "School" as const, title: item.name, summary: item.consultantSummary, href: `/schools/${item.slug}`, text: [item.name, item.location, item.undergraduatePhilosophy, item.curriculumModel, ...item.distinctiveFeatures].join(" ").toLowerCase() })),
  ...policies.map((item) => ({ id: item.id, category: "Policy" as const, title: `${item.institution}: ${item.category}`, summary: item.summary, href: `/policy-watch#${item.id}`, text: [item.institution, item.category, item.status, item.summary, item.details].join(" ").toLowerCase() })),
  ...cases.map((item) => ({ id: item.id, category: "Case" as const, title: item.title, summary: item.subtitle, href: `/case-lab/${item.slug}`, text: [item.title, item.subtitle, ...item.learningGoals, ...item.facts.map((f) => f.detail)].join(" ").toLowerCase() })),
  ...toolkit.map((item) => ({ id: item.id, category: "Toolkit" as const, title: item.title, summary: item.purpose, href: `/toolkit#${item.id}`, text: [item.title, item.purpose, item.whenToUse, ...item.fields].join(" ").toLowerCase() })),
  ...glossary.map((item) => ({ id: item.slug, category: "Glossary" as const, title: item.term, summary: item.definition, href: `/glossary#${item.slug}`, text: [item.term, item.definition, item.whyItMatters, item.caution, ...item.related].join(" ").toLowerCase() })),
  ...roadmap.map((item) => ({ id: item.id, category: "Roadmap" as const, title: item.title, summary: item.summary, href: `/roadmap#${item.id}`, text: [item.title, item.summary, ...item.priorities.map((p) => `${p.title} ${p.detail}`)].join(" ").toLowerCase() })),
];

export function searchDocuments(query: string, limit = 12) {
  const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  if (!terms.length) return [];
  return searchIndex
    .map((item) => ({
      item,
      score: terms.reduce((score, term) => score + (item.title.toLowerCase().includes(term) ? 4 : 0) + (item.text.includes(term) ? 1 : 0), 0)
        + (item.category === "School" && terms.some((term) => item.title.toLowerCase().startsWith(term)) ? 2 : 0),
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || a.item.title.localeCompare(b.item.title))
    .slice(0, limit)
    .map(({ item }) => item);
}
