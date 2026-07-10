"use client";

import Link from "next/link";
import { meetingTypes, parentQuestions, studentQuestions } from "@/content/consult";
import { useLocalState } from "./local-state-provider";
import { PrintButton, StudentFacingToggle } from "./local-controls";

const defaultAgenda = ["Confirm the session objective", "Review changes since the last meeting", "Discuss the central evidence or decision", "Name unresolved questions", "Assign follow-up owners and dates"];

export function SessionWorkspace() {
  const { state, update } = useLocalState();
  const draft = state.consultDraft;
  const studentMode = state.preferences.languageMode === "student";
  const setField = (field: string, value: string) => update((current) => ({ ...current, consultDraft: { ...current.consultDraft, [field]: value } }));
  const agenda = state.checklists["consult:agenda"] ?? [];
  return (
    <section className="section-block wide-frame">
      <div className="print-header"><p className="eyebrow">Meeting summary · cycle 2026–27</p><h2>{draft.label || "Unlabeled local session"}</h2><p>Printed {new Date().toLocaleDateString()}</p></div>
      <p className="notice"><strong>Privacy:</strong> This draft stays in this browser. Use initials or a fictional label; avoid unnecessary sensitive details. Reset or export from Local data.</p>
      <div className="action-row"><StudentFacingToggle /><PrintButton label="Print the meeting summary" /></div>
      <div className="consult-grid">
        <div>
          <div className="form-grid">
            <label className="form-field"><span>Student or case label</span><input value={draft.label ?? ""} onChange={(event) => setField("label", event.target.value)} /></label>
            <label className="form-field"><span>Grade level</span><select value={draft.grade ?? ""} onChange={(event) => setField("grade", event.target.value)}><option value="">Select grade</option><option>9</option><option>10</option><option>11</option><option>12</option><option>Postgraduate</option></select></label>
            <label className="form-field"><span>Meeting type</span><select value={draft.meetingType ?? "Initial student intake"} onChange={(event) => setField("meetingType", event.target.value)}>{meetingTypes.map((type) => <option key={type}>{type}</option>)}</select></label>
            <label className="form-field"><span>Session objective</span><input value={draft.objective ?? draft.goal ?? ""} onChange={(event) => setField("objective", event.target.value)} placeholder="Name the decision or outcome for this meeting." /></label>
          </div>
          <section><p className="eyebrow">Agenda</p><h2>Keep the conversation on purpose</h2><ul className="checklist">{defaultAgenda.map((item) => <li key={item}><label><input type="checkbox" checked={agenda.includes(item)} onChange={(event) => update((current) => { const existing = current.checklists["consult:agenda"] ?? []; return { ...current, checklists: { ...current.checklists, "consult:agenda": event.target.checked ? [...existing, item] : existing.filter((entry) => entry !== item) } }; })} /><span>{item}</span></label></li>)}</ul></section>
          <label className="notes-field"><span>Meeting notes</span><textarea value={draft.notes ?? ""} onChange={(event) => setField("notes", event.target.value)} placeholder="Record evidence, questions, and decisions—not a transcript." /></label>
          <label className="notes-field"><span>{studentMode ? "What we agreed to do next" : "Follow-up actions, owners, and dates"}</span><textarea value={draft.followUp ?? ""} onChange={(event) => setField("followUp", event.target.value)} /></label>
          <label className="notes-field"><span>{studentMode ? "Summary for the student" : "Consultant-only caution or unresolved judgment"}</span><textarea value={studentMode ? draft.studentSummary ?? "" : draft.caution ?? ""} onChange={(event) => setField(studentMode ? "studentSummary" : "caution", event.target.value)} /></label>
          <p className="caution">The consultant may guide, question, organize, and edit. The student must own the experiences, decisions, and writing.</p>
        </div>
        <aside className="consult-rail" aria-label="Reference drawer">
          <p className="eyebrow">Reference drawer</p><h2>Questions and tools</h2>
          <details><summary>Student questions</summary><ul>{studentQuestions.slice(0, 7).map((question) => <li key={question}>{question}</li>)}</ul></details>
          <details><summary>Parent questions</summary><ul>{parentQuestions.map((question) => <li key={question}>{question}</li>)}</ul></details>
          <nav aria-label="Related consultation tools"><ul><li><Link href="/roadmap">Open the grade plan</Link></li><li><Link href="/compare">Compare Ivy institutions</Link></li><li><Link href="/diagnostic">Review readiness evidence</Link></li><li><Link href="/toolkit">Open a worksheet</Link></li><li><Link href="/policy-watch">Verify a policy</Link></li></ul></nav>
        </aside>
      </div>
    </section>
  );
}
