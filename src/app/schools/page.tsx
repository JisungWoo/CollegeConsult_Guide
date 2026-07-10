import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/page-intro";
import { schools } from "@/content/schools";

export const metadata: Metadata = { title: "The eight Ivies" };

export default function SchoolsPage() {
  return (
    <>
      <PageIntro number="02" eyebrow="Reference mode · school index" title="Understand the eight Ivies" summary="Eight institutions share an athletic conference, not one educational model. Compare structure, place, community, and the work each school asks students to do." aside={<>Every Ivy remains a <strong>high reach</strong>, even for an academically exceptional applicant.</>} />
      <section className="section-block page-frame" aria-labelledby="school-index">
        <div className="section-heading"><span>PROFILES</span><div><h2 id="school-index">Institutional index</h2><p>Use these profiles to generate research questions, not declare a perfect match.</p></div></div>
        <ol className="index-list">
          {schools.map((school, index) => <li key={school.id}><Link href={`/schools/${school.slug}`}><span>{String(index + 1).padStart(2, "0")}</span><strong>{school.name}</strong><em>{school.curriculumModel}</em></Link></li>)}
        </ol>
        <p className="notice"><Link href="/compare">Open the side-by-side comparison workspace.</Link></p>
      </section>
    </>
  );
}
