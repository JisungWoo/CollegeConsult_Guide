"use client";

import { useState } from "react";
import type { Lesson } from "@/content/schema";

export function KnowledgeCheck({ check }: { check: Lesson["knowledgeCheck"] }) {
  const [selected, setSelected] = useState<number | null>(null);
  const submitted = selected !== null;
  const correct = selected === check.correctIndex;
  return (
    <section className="knowledge-check" aria-labelledby="knowledge-check-title">
      <p className="eyebrow">Knowledge check</p>
      <h2 id="knowledge-check-title">{check.question}</h2>
      <div className="answer-list">
        {check.options.map((option, index) => <button type="button" key={option} aria-pressed={selected === index} onClick={() => setSelected(index)}>{String.fromCharCode(65 + index)}. {option}</button>)}
      </div>
      {submitted && <p className={`feedback ${correct ? "feedback--correct" : "feedback--review"}`} role="status"><strong>{correct ? "Best answer." : "Review the principle."}</strong> {check.explanation}</p>}
    </section>
  );
}
