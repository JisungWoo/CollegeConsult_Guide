"use client";

import { useState } from "react";
import type { CaseStudy } from "@/content/schema";
import { useLocalState } from "./local-state-provider";
import { PrintButton } from "./local-controls";

const responseFields = [
  ["missing", "Missing information", "What facts or context must you obtain before advising?"],
  ["questions", "Questions to ask", "Write questions that return the work to the student and family."],
  ["strengths", "Current strengths", "Name evidence without turning it into a prediction."],
  ["risks", "Risks and misinterpretations", "What could a consultant or reader misunderstand?"],
  ["next", "Recommended next steps", "Prioritize specific, ethical, feasible actions."],
  ["list", "Preliminary list strategy", "Describe categories, fit, and financial safeguards without probabilities."],
] as const;

export function CaseWorkspace({ item }: { item: CaseStudy }) {
  const { state, update } = useLocalState();
  const [showExpert, setShowExpert] = useState(false);
  const response = state.caseProgress[item.id] ?? {};
  const setField = (field: string, value: string) => update((current) => ({ ...current, caseProgress: { ...current.caseProgress, [item.id]: { ...response, [field]: value } } }));
  return (
    <section className="section-block reading-frame">
      <div className="action-row"><PrintButton label="Print case response" /></div>
      <dl className="case-file">{item.facts.map((fact) => <div className="case-fact" key={fact.label}><dt>{fact.label}</dt><dd>{fact.detail}</dd></div>)}</dl>
      <section><p className="eyebrow">Learning goals</p><ul>{item.learningGoals.map((goal) => <li key={goal}>{goal}</li>)}</ul></section>
      {responseFields.map(([id, title, prompt]) => <label className="notes-field" key={id}><span>{title}</span><small>{prompt}</small><textarea value={response[id] ?? ""} onChange={(event) => setField(id, event.target.value)} /></label>)}
      <div className="action-row"><button className="action-button" type="button" onClick={() => setShowExpert((value) => !value)} aria-expanded={showExpert}>{showExpert ? "Hide expert reasoning" : "Compare with expert reasoning"}</button></div>
      {showExpert && <section className="knowledge-check" aria-labelledby="expert-reasoning"><p className="eyebrow">Expert analysis · one defensible reading, not the only answer</p><h2 id="expert-reasoning">Compare the reasoning, not just the recommendation</h2><h3>Information still needed</h3><ul>{item.missingInformation.map((point) => <li key={point}>{point}</li>)}</ul><h3>Reasoning</h3><ol>{item.expertReasoning.map((point) => <li key={point}>{point}</li>)}</ol><p className="caution"><strong>Uncertainty and caution:</strong> {item.cautions.join(" ")}</p></section>}
    </section>
  );
}
