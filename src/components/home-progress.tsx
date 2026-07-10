"use client";

import Link from "next/link";
import { lessons } from "@/content/lessons";
import { useLocalState } from "./local-state-provider";

export function HomeProgress() {
  const { state, hydrated } = useLocalState();
  if (!hydrated) return null;
  const completed = lessons.filter((lesson) => state.progress[lesson.id]);
  const next = lessons.find((lesson) => !state.progress[lesson.id]);
  if (!completed.length && !state.consultDraft.label && !state.diagnosticDraft.academic) return null;
  return (
    <section className="section-block page-frame" aria-labelledby="continue-title">
      <div className="section-heading"><span>RETURN</span><div><p className="eyebrow">Local progress found</p><h2 id="continue-title">Continue where you left off</h2></div></div>
      <ul className="index-list">
        {next && <li><Link href={`/learn/${next.slug}`}><span>LESSON</span><strong>{next.title}</strong><em>{completed.length} of {lessons.length} modules complete</em></Link></li>}
        {state.consultDraft.label && <li><Link href="/consult/session"><span>SESSION</span><strong>Return to {state.consultDraft.label}</strong><em>Draft stored in this browser</em></Link></li>}
        {Object.keys(state.diagnosticDraft).length > 0 && <li><Link href="/diagnostic"><span>MAP</span><strong>Continue the readiness map</strong><em>{Object.keys(state.diagnosticDraft).length} dimensions started</em></Link></li>}
      </ul>
    </section>
  );
}
