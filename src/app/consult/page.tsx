import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/page-intro";
import { meetingTypes } from "@/content/consult";

export const metadata: Metadata = { title: "Consultation workspace" };

export default function ConsultPage() {
  return (
    <>
      <PageIntro number="05" eyebrow="Consult mode · live working desk" title="Run a consultation" summary="Prepare a focused meeting, ask student-centered questions, record evidence and decisions, assign follow-up, and print a clean summary." aside={<>No recording. No remote student record. No distracting gamification.</>} />
      <section className="section-block page-frame">
        <div className="section-heading"><span>OPEN</span><div><h2>Choose the next action</h2></div></div>
        <ul className="index-list"><li><Link href="/consult/intake"><span>INTAKE</span><strong>Begin a student or parent intake</strong><em>Establish goals, context, roles, and boundaries.</em></Link></li><li><Link href="/consult/session"><span>SESSION</span><strong>Open the live meeting workspace</strong><em>Agenda, questions, notes, follow-up, references, and print.</em></Link></li><li><Link href="/diagnostic"><span>MAP</span><strong>Review qualitative readiness</strong><em>Twelve evidence dimensions without a score.</em></Link></li></ul>
      </section>
      <section className="section-block page-frame"><div className="section-heading"><span>MEETINGS</span><div><h2>Supported meeting types</h2></div></div><div className="text-columns"><ul>{meetingTypes.map((type) => <li key={type}>{type}</li>)}</ul></div></section>
    </>
  );
}
