"use client";

import { diagnosticDimensions, diagnosticStatuses } from "@/content/diagnostic";
import { useLocalState } from "./local-state-provider";
import { PrintButton, StudentFacingToggle } from "./local-controls";

export function DiagnosticWorkspace() {
  const { state, update } = useLocalState();
  const studentMode = state.preferences.languageMode === "student";
  return (
    <section className="section-block wide-frame">
      <p className="notice"><strong>Privacy:</strong> Use initials or a fictional case label. This draft remains in this browser. Do not enter information that is unnecessary for the counseling purpose.</p>
      <div className="action-row"><StudentFacingToggle /><PrintButton label="Print readiness map" /></div>
      <div className="form-grid"><label className="form-field"><span>Student or case label</span><input value={state.diagnosticDraft._meta?.evidence ?? ""} onChange={(event) => update((current) => ({ ...current, diagnosticDraft: { ...current.diagnosticDraft, _meta: { status: "label", evidence: event.target.value } } }))} placeholder="Initials or fictional label" /></label><label className="form-field"><span>Grade level</span><select value={state.diagnosticDraft._grade?.status ?? ""} onChange={(event) => update((current) => ({ ...current, diagnosticDraft: { ...current.diagnosticDraft, _grade: { status: event.target.value, evidence: "" } } }))}><option value="">Select grade</option><option>9</option><option>10</option><option>11</option><option>12</option><option>Postgraduate</option></select></label></div>
      <div aria-label="Qualitative readiness dimensions">
        {diagnosticDimensions.map((dimension) => {
          const draft = state.diagnosticDraft[dimension.id] ?? { status: "Insufficient information", evidence: "" };
          return <article className="diagnostic-row" key={dimension.id}>
            <div><p className="eyebrow">Dimension</p><h2>{dimension.title}</h2><p>{studentMode ? dimension.student : dimension.prompt}</p></div>
            <label className="form-field"><span>Evidence entered</span><textarea value={draft.evidence} onChange={(event) => update((current) => ({ ...current, diagnosticDraft: { ...current.diagnosticDraft, [dimension.id]: { ...draft, evidence: event.target.value } } }))} placeholder="Record evidence and missing information; avoid unsupported conclusions." /></label>
            <div><label className="form-field"><span>Qualitative status</span><select value={draft.status} onChange={(event) => update((current) => ({ ...current, diagnosticDraft: { ...current.diagnosticDraft, [dimension.id]: { ...draft, status: event.target.value } } }))}>{diagnosticStatuses.map((status) => <option key={status}>{status}</option>)}</select></label><details><summary>Questions, risk, and next steps</summary><h3>Investigate</h3><ul>{dimension.investigate.map((item) => <li key={item}>{item}</li>)}</ul><p><strong>Risk of misinterpretation:</strong> {dimension.risk}</p><p><strong>Immediate:</strong> {dimension.immediate}</p><p><strong>Longer term:</strong> {dimension.longer}</p><p className="caution"><strong>Consultant caution:</strong> {dimension.caution}</p></details></div>
          </article>;
        })}
      </div>
      <p className="caution"><strong>This is not an admit/deny prediction.</strong> The map records current evidence, unanswered questions, context, and next work. It assigns no probability or student-worth score.</p>
    </section>
  );
}
