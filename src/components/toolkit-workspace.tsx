"use client";

import { toolkit } from "@/content/toolkit";
import { useLocalState } from "./local-state-provider";
import { PrintButton } from "./local-controls";

export function ToolkitWorkspace() {
  const { state, update } = useLocalState();
  return (
    <section className="section-block wide-frame">
      <p className="notice"><strong>Local worksheet rule:</strong> Entries remain in this browser. Use a case label and record only information needed for the worksheet’s purpose.</p>
      {toolkit.map((item, index) => <article className="toolkit-item" id={item.id} key={item.id}>
        <div className="toolkit-item__grid">
          <header><p className="eyebrow">Tool {String(index + 1).padStart(2, "0")}</p><h2>{item.title}</h2><p>{item.purpose}</p><p><strong>When:</strong> {item.whenToUse}</p></header>
          <div><details><summary>Instructions and common mistakes</summary><h3>Consultant instructions</h3><p>{item.consultantInstructions}</p>{item.studentInstructions && <><h3>Student instructions</h3><p>{item.studentInstructions}</p></>}<h3>Common mistakes</h3><ul>{item.mistakes.map((mistake) => <li key={mistake}>{mistake}</li>)}</ul></details><ul className="checklist">{item.fields.map((field) => <li key={field}><label><input type="checkbox" checked={(state.checklists[`toolkit:${item.id}`] ?? []).includes(field)} onChange={(event) => update((current) => { const existing = current.checklists[`toolkit:${item.id}`] ?? []; return { ...current, checklists: { ...current.checklists, [`toolkit:${item.id}`]: event.target.checked ? [...existing, field] : existing.filter((value) => value !== field) } }; })} /><span>{field}</span></label></li>)}</ul><label className="notes-field"><span>Worksheet notes</span><textarea value={state.notes[`toolkit:${item.id}`] ?? ""} onChange={(event) => update((current) => ({ ...current, notes: { ...current.notes, [`toolkit:${item.id}`]: event.target.value } }))} /></label><div className="action-row"><PrintButton label={`Print ${item.title.toLowerCase()}`} /></div></div>
        </div>
      </article>)}
    </section>
  );
}
