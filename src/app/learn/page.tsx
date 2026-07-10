import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/page-intro";
import { lessons } from "@/content/lessons";

export const metadata: Metadata = { title: "Learn the work" };

export default function LearnPage() {
  return (
    <>
      <PageIntro number="01" eyebrow="Learn mode · sixteen modules" title="Learn the work" summary="A structured curriculum for counseling that is ethical, contextual, student-owned, and operationally reliable." aside={<><strong>Use this in a meeting</strong><br />Each module connects principles to a live worksheet or consultation prompt.</>} />
      <section className="section-block page-frame" aria-labelledby="curriculum-index">
        <div className="section-heading"><span>SYLLABUS</span><div><h2 id="curriculum-index">Curriculum index</h2><p>Read in sequence or open the module needed for a live case.</p></div></div>
        <ol className="index-list">
          {lessons.map((lesson) => <li key={lesson.id}><Link href={`/learn/${lesson.slug}`}><span>{String(lesson.module).padStart(2, "0")}</span><strong>{lesson.title}</strong><em>{lesson.summary}</em></Link></li>)}
        </ol>
      </section>
    </>
  );
}
