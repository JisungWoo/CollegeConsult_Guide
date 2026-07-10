"use client";

import Link from "next/link";
import { parentQuestions, studentQuestions } from "@/content/consult";
import { useLocalState } from "./local-state-provider";

export function IntakeWorkspace() {
  const { state, update } = useLocalState();
  const setField = (field: string, value: string) => update((current) => ({ ...current, consultDraft: { ...current.consultDraft, [field]: value } }));
  return (
    <section className="section-block reading-frame">
      <p className="notice"><strong>Local-data notice:</strong> Use initials or a fictional case label. Responses remain in this browser and are not transmitted to a server.</p>
      <div className="form-grid">
        <label className="form-field"><span>Student or case label</span><input value={state.consultDraft.label ?? ""} onChange={(event) => setField("label", event.target.value)} placeholder="Initials or fictional label" /></label>
        <label className="form-field"><span>Grade level</span><select value={state.consultDraft.grade ?? ""} onChange={(event) => setField("grade", event.target.value)}><option value="">Select grade</option><option>9</option><option>10</option><option>11</option><option>12</option><option>Postgraduate</option></select></label>
        <label className="form-field form-field--wide"><span>What does the student want from counseling?</span><textarea value={state.consultDraft.goal ?? ""} onChange={(event) => setField("goal", event.target.value)} /></label>
        <label className="form-field form-field--wide"><span>Relevant school, family, work, access, health, or financial context</span><textarea value={state.consultDraft.context ?? ""} onChange={(event) => setField("context", event.target.value)} placeholder="Record only what is needed for this counseling purpose." /></label>
        <label className="form-field form-field--wide"><span>Communication and student-ownership boundaries</span><textarea value={state.consultDraft.boundaries ?? ""} onChange={(event) => setField("boundaries", event.target.value)} /></label>
      </div>
      <details><summary>Student intake question bank</summary><ul>{studentQuestions.map((question) => <li key={question}>{question}</li>)}</ul></details>
      <details><summary>Parent intake question bank</summary><ul>{parentQuestions.map((question) => <li key={question}>{question}</li>)}</ul></details>
      <p className="caution">The consultant may guide, question, organize, and edit. The student must own the experiences, decisions, and writing.</p>
      <div className="action-row"><Link className="action-button" href="/consult/session">Open the consultation session</Link></div>
    </section>
  );
}
