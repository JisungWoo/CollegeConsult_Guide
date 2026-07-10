"use client";

import { useRef, useState } from "react";
import { useLocalState } from "./local-state-provider";

export function SettingsWorkspace() {
  const { state, update, reset, exportState, importState, hydrated } = useLocalState();
  const inputRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState("");
  const [confirmReset, setConfirmReset] = useState(false);

  const download = () => {
    const blob = new Blob([exportState()], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `admissions-desk-local-data-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
    setMessage("Local data export created.");
  };

  return (
    <section className="section-block reading-frame">
      <p className="notice"><strong>Storage location:</strong> All progress, notes, drafts, checklists, and preferences are stored in this browser under one versioned local-storage record. The application has no account, analytics, tracker, or remote student database.</p>
      <dl className="metadata-list"><div><dt>Modules complete</dt><dd>{Object.values(state.progress).filter(Boolean).length}</dd></div><div><dt>Bookmarks</dt><dd>{state.bookmarks.length}</dd></div><div><dt>Notes</dt><dd>{Object.values(state.notes).filter(Boolean).length}</dd></div><div><dt>Case drafts</dt><dd>{Object.keys(state.caseProgress).length}</dd></div></dl>
      <section><p className="eyebrow">Preferences</p><h2>Reading and language</h2><label className="checklist"><span><input type="checkbox" checked={state.preferences.reducedMotion} onChange={(event) => update((current) => ({ ...current, preferences: { ...current.preferences, reducedMotion: event.target.checked } }))} /> Reduce nonessential motion in this application</span></label><label className="form-field"><span>Default language mode</span><select value={state.preferences.languageMode} onChange={(event) => update((current) => ({ ...current, preferences: { ...current.preferences, languageMode: event.target.value as "consultant" | "student" } }))}><option value="consultant">Consultant</option><option value="student">Student-facing</option></select></label></section>
      <hr />
      <section><p className="eyebrow">Portability</p><h2>Export or import the local desk</h2><p>Export produces a readable JSON file. Import validates the version and record shape before replacing local state.</p><div className="action-row"><button className="action-button" type="button" onClick={download} disabled={!hydrated}>Export local data</button><button className="text-button" type="button" onClick={() => inputRef.current?.click()}>Import local data</button><input ref={inputRef} className="sr-only" type="file" accept="application/json,.json" onChange={async (event) => { const file = event.target.files?.[0]; if (!file) return; const result = importState(await file.text()); setMessage(result.message); event.target.value = ""; }} /></div></section>
      <hr />
      <section><p className="eyebrow">Deletion</p><h2>Delete all local data</h2><p>This removes progress, bookmarks, notes, toolkit checks, case responses, comparison notes, consultation drafts, diagnostic drafts, recent searches, and preferences from this browser.</p>{confirmReset ? <div className="action-row"><button className="action-button" type="button" onClick={() => { reset(); setConfirmReset(false); setMessage("All local Admissions Desk data deleted."); }}>Confirm permanent local deletion</button><button className="text-button" type="button" onClick={() => setConfirmReset(false)}>Cancel deletion</button></div> : <button className="text-button" type="button" onClick={() => setConfirmReset(true)}>Prepare to delete all local data</button>}</section>
      {message && <p role="status" className="feedback feedback--correct">{message}</p>}
    </section>
  );
}
