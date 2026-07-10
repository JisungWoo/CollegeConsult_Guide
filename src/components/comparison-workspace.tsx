"use client";

import { useMemo } from "react";
import { schools } from "@/content/schools";
import { getPoliciesForSchool } from "@/content/policies";
import { useLocalState } from "./local-state-provider";
import { PrintButton, StudentFacingToggle } from "./local-controls";

const presets = [
  { label: "Brown versus Columbia", schools: ["brown", "columbia"], note: "Open Curriculum versus Core Curriculum" },
  { label: "Princeton versus Penn", schools: ["princeton", "penn"], note: "Independent scholarly depth versus interdisciplinary professional application" },
  { label: "Dartmouth versus Columbia", schools: ["dartmouth", "columbia"], note: "Small-town residential community versus dense urban experience" },
  { label: "Harvard versus Cornell", schools: ["harvard", "cornell"], note: "Broad college entry versus college-specific undergraduate application" },
  { label: "Yale versus Penn", schools: ["yale", "penn"], note: "Exploration-centered residential liberal arts versus school-specific application" },
];

const dimensions = [
  ["flexibility", "Curriculum flexibility"], ["commonCurriculum", "Required common curriculum"], ["undergraduateFocus", "Undergraduate focus"], ["researchIntensity", "Research intensity"], ["academicExploration", "Academic exploration"], ["independentWork", "Independent work"], ["urbanity", "Urbanity"], ["scale", "Campus scale"], ["residential", "Residential structure"], ["schoolChoice", "Undergraduate school choice"], ["preprofessional", "Preprofessional orientation"], ["facultyAccess", "Faculty access"], ["community", "Community style"],
] as const;

export function ComparisonWorkspace() {
  const { state, update } = useLocalState();
  const selected = useMemo(() => state.recentSchools.length ? state.recentSchools.slice(0, 3) : ["brown", "columbia"], [state.recentSchools]);
  const selectedSchools = useMemo(() => selected.map((id) => schools.find((school) => school.id === id)).filter(Boolean), [selected]);
  const studentMode = state.preferences.languageMode === "student";

  const choose = (id: string, index: number) => {
    const next = [...selected]; next[index] = id;
    const unique = [...new Set(next)].slice(0, 3);
    update((current) => ({ ...current, recentSchools: unique }));
  };

  return (
    <section className="section-block wide-frame">
      <div className="action-row"><StudentFacingToggle /><PrintButton label="Print Ivy comparison" /></div>
      <div className="form-grid" aria-label="Schools to compare">
        {[0, 1, 2].map((index) => <label className="form-field" key={index}><span>School {index + 1}{index === 2 ? " (optional)" : ""}</span><select value={selected[index] ?? ""} onChange={(event) => choose(event.target.value, index)}><option value="">No third school</option>{schools.map((school) => <option key={school.id} value={school.id} disabled={selected.some((value, selectedIndex) => selectedIndex !== index && value === school.id)}>{school.shortName}</option>)}</select></label>)}
      </div>
      <div className="action-row" aria-label="Comparison presets">{presets.map((preset) => <button className="text-button" type="button" key={preset.label} title={preset.note} onClick={() => update((current) => ({ ...current, recentSchools: preset.schools }))}>{preset.label}</button>)}</div>
      <div className="table-scroll" tabIndex={0} aria-label="Scrollable Ivy comparison table">
        <table className="comparison-table">
          <caption>Educational model and student-fit comparison</caption>
          <thead><tr><th scope="col">Dimension</th>{selectedSchools.map((school) => school && <th scope="col" key={school.id}>{school.shortName}</th>)}</tr></thead>
          <tbody>
            <tr><th scope="row">Core identity</th>{selectedSchools.map((school) => school && <td key={school.id}>{studentMode ? school.studentSummary : school.consultantSummary}</td>)}</tr>
            <tr><th scope="row">Location</th>{selectedSchools.map((school) => school && <td key={school.id}>{school.location}<br />{school.campusContext}</td>)}</tr>
            {dimensions.map(([key, label]) => <tr key={key}><th scope="row"><label><input type="checkbox" checked={(state.checklists["comparison:preferences"] ?? []).includes(key)} onChange={(event) => update((current) => { const existing = current.checklists["comparison:preferences"] ?? []; return { ...current, checklists: { ...current.checklists, "comparison:preferences": event.target.checked ? [...existing, key] : existing.filter((item) => item !== key) } }; })} /> {label}</label></th>{selectedSchools.map((school) => school && <td key={school.id}>{school.comparisonNotes[key] ?? "Review needed."}</td>)}</tr>)}
            <tr><th scope="row">Application-round structure</th>{selectedSchools.map((school) => school && <td key={school.id}>{school.applicationRoundOverview}</td>)}</tr>
            <tr><th scope="row">Financial aid overview</th>{selectedSchools.map((school) => school && <td key={school.id}>{school.financialAidOverview}</td>)}</tr>
            <tr><th scope="row">Testing policy</th>{selectedSchools.map((school) => school && <td key={school.id}>{getPoliciesForSchool(school.name).find((policy) => policy.category === "testing")?.status ?? "Verification needed"}</td>)}</tr>
            <tr><th scope="row">Early application</th>{selectedSchools.map((school) => school && <td key={school.id}>{getPoliciesForSchool(school.name).find((policy) => policy.category === "early-application")?.status ?? "Verification needed"}</td>)}</tr>
            <tr><th scope="row">Student fit questions</th>{selectedSchools.map((school) => school && <td key={school.id}><ul>{school.studentQuestions.map((item) => <li key={item}>{item}</li>)}</ul></td>)}</tr>
            <tr><th scope="row">Potential mismatch</th>{selectedSchools.map((school) => school && <td key={school.id}><ul>{school.possibleMismatchTraits.map((item) => <li key={item}>{item}</li>)}</ul></td>)}</tr>
          </tbody>
        </table>
      </div>
      <label className="notes-field"><span>Comparison notes — stored only in this browser</span><textarea value={state.comparisonNotes[selected.join(":")] ?? ""} onChange={(event) => update((current) => ({ ...current, comparisonNotes: { ...current.comparisonNotes, [selected.join(":")]: event.target.value } }))} placeholder="Record the student’s preferences, contradictions, and questions to verify." /></label>
      <p className="policy-warning"><strong>Policy caution.</strong> The table shows the review snapshot for cycle 2026–27. Recheck each institution’s official site before advising.</p>
    </section>
  );
}
