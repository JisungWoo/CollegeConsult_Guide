"use client";

import { roadmap } from "@/content/roadmap";
import { useLocalState } from "./local-state-provider";
import { PrintButton } from "./local-controls";

export function RoadmapWorkspace() {
  const { state, update } = useLocalState();
  return (
    <section className="section-block wide-frame">
      <div className="action-row"><PrintButton label="Print four-year roadmap" /></div>
      <div className="roadmap-rail">
        {roadmap.map((period) => {
          const selected = state.checklists[`roadmap:${period.id}`] ?? [];
          return <article className="roadmap-period" id={period.id} key={period.id}>
            <header className="roadmap-period__header"><span>{period.label}</span><div><h2>{period.title}</h2><p>{period.summary}</p></div></header>
            <div className="roadmap-items">{period.priorities.map((priority) => <article key={priority.title}><label><input type="checkbox" checked={selected.includes(priority.title)} onChange={(event) => update((current) => { const existing = current.checklists[`roadmap:${period.id}`] ?? []; return { ...current, checklists: { ...current.checklists, [`roadmap:${period.id}`]: event.target.checked ? [...existing, priority.title] : existing.filter((item) => item !== priority.title) } }; })} /> <strong>{priority.title}</strong></label><p>{priority.detail}</p></article>)}</div>
            <details><summary>Consultant emphasis and common mistakes</summary><h3>Consultant emphasis</h3><ul>{period.consultantEmphasis.map((item) => <li key={item}>{item}</li>)}</ul><h3>Common mistakes</h3><ul>{period.mistakes.map((item) => <li key={item}>{item}</li>)}</ul></details>
          </article>;
        })}
      </div>
    </section>
  );
}
