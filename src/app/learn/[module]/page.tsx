import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BookmarkButton, NotesField, PrintButton, ProgressButton } from "@/components/local-controls";
import { KnowledgeCheck } from "@/components/knowledge-check";
import { PageIntro } from "@/components/page-intro";
import { getLesson, lessons } from "@/content/lessons";

export function generateStaticParams() { return lessons.map((lesson) => ({ module: lesson.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ module: string }> }): Promise<Metadata> {
  const lesson = getLesson((await params).module);
  return { title: lesson?.title ?? "Lesson" };
}

export default async function LessonPage({ params }: { params: Promise<{ module: string }> }) {
  const lesson = getLesson((await params).module);
  if (!lesson) notFound();
  return (
    <>
      <PageIntro number={String(lesson.module).padStart(2, "0")} eyebrow={`Learn mode · module ${lesson.module} of ${lessons.length}`} title={lesson.title} summary={lesson.summary} aside={<>Last reviewed {lesson.lastReviewedAt}. Stable principles should still receive annual editorial review.</>} />
      <article className="section-block reading-frame">
        <div className="action-row"><ProgressButton id={lesson.id} /><BookmarkButton id={lesson.id} /><PrintButton label="Print lesson notes" /></div>
        <section aria-labelledby="objectives"><p className="eyebrow">Learning objectives</p><h2 id="objectives">By the end of this module</h2><ul>{lesson.learningObjectives.map((item) => <li key={item}>{item}</li>)}</ul></section>
        <hr />
        {lesson.sections.map((section, index) => <section key={section.heading} id={`section-${index + 1}`}><p className="eyebrow">{String(index + 1).padStart(2, "0")}</p><h2>{section.heading}</h2><p>{section.body}</p></section>)}
        <section className="caution" aria-labelledby="mistakes"><p className="eyebrow">Common mistakes</p><h2 id="mistakes">Read before advising</h2><ul>{lesson.mistakes.map((item) => <li key={item}>{item}</li>)}</ul></section>
        <section><p className="eyebrow">Consultant prompts</p><h2>Questions that keep judgment open</h2><ul>{lesson.consultantPrompts.map((item) => <li key={item}>{item}</li>)}</ul></section>
        <aside className="notice"><strong>Student-facing explanation:</strong> {lesson.studentFacingExplanation}</aside>
        <KnowledgeCheck check={lesson.knowledgeCheck} />
        <section><p className="eyebrow">Use this in a meeting</p><h2>Related tools</h2><ul>{lesson.relatedTools.map((item) => <li key={item}>{item}</li>)}</ul></section>
        <NotesField id={`lesson:${lesson.id}`} label="Personal lesson notes" />
      </article>
    </>
  );
}
