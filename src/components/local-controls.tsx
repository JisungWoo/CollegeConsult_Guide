"use client";

import { useState } from "react";
import { useLocalState } from "./local-state-provider";

export function BookmarkButton({ id }: { id: string }) {
  const { state, update } = useLocalState();
  const saved = state.bookmarks.includes(id);
  return <button className="text-button" type="button" aria-pressed={saved} onClick={() => update((current) => ({ ...current, bookmarks: saved ? current.bookmarks.filter((item) => item !== id) : [...current.bookmarks, id] }))}>{saved ? "Remove bookmark" : "Bookmark this page"}</button>;
}

export function ProgressButton({ id }: { id: string }) {
  const { state, update } = useLocalState();
  const complete = Boolean(state.progress[id]);
  return <button className="action-button" type="button" aria-pressed={complete} onClick={() => update((current) => ({ ...current, progress: { ...current.progress, [id]: !complete } }))}>{complete ? "Marked complete ✓" : "Mark module complete"}</button>;
}

export function NotesField({ id, label = "Consultant notes" }: { id: string; label?: string }) {
  const { state, update } = useLocalState();
  return <label className="notes-field"><span>{label}</span><textarea value={state.notes[id] ?? ""} onChange={(event) => update((current) => ({ ...current, notes: { ...current.notes, [id]: event.target.value } }))} placeholder="Stored only in this browser." /></label>;
}

export function PrintButton({ label = "Print this page" }: { label?: string }) {
  return <button className="text-button print-button" type="button" onClick={() => window.print()}>{label}</button>;
}

export function StudentFacingToggle() {
  const { state, update } = useLocalState();
  const student = state.preferences.languageMode === "student";
  return <button className="language-toggle" type="button" aria-pressed={student} onClick={() => update((current) => ({ ...current, preferences: { ...current.preferences, languageMode: student ? "consultant" : "student" } }))}><span>Language</span><strong>{student ? "Student-facing" : "Consultant"}</strong></button>;
}

export function CopyStatus({ children }: { children: string }) {
  const [copied, setCopied] = useState(false);
  return <button type="button" className="text-button" onClick={async () => { await navigator.clipboard.writeText(children); setCopied(true); }}>{copied ? "Copied" : "Copy summary"}</button>;
}
