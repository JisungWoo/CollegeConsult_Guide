import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BookmarkButton, NotesField, PrintButton } from "@/components/local-controls";
import { PageIntro } from "@/components/page-intro";
import { PolicyStamp } from "@/components/policy-stamp";
import { getPoliciesForSchool } from "@/content/policies";
import { getSchool, schools } from "@/content/schools";

export function generateStaticParams() { return schools.map((school) => ({ "school-slug": school.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ "school-slug": string }> }): Promise<Metadata> {
  const school = getSchool((await params)["school-slug"]);
  return { title: school?.name ?? "School profile" };
}

export default async function SchoolPage({ params }: { params: Promise<{ "school-slug": string }> }) {
  const school = getSchool((await params)["school-slug"]);
  if (!school) notFound();
  const schoolPolicies = getPoliciesForSchool(school.name);
  return (
    <>
      <PageIntro number="IVY" eyebrow={`${school.location} · profile`} title={school.name} summary={school.undergraduatePhilosophy} aside={<>Profile reviewed {school.lastVerifiedAt}. Policy coverage applies to cycle {school.applicationCycle} and must be rechecked.</>} />
      <article className="section-block reading-frame">
        <div className="action-row"><BookmarkButton id={`school:${school.id}`} /><PrintButton label="Print school profile" /></div>
        <dl className="metadata-list"><div><dt>Curriculum</dt><dd>{school.curriculumModel}</dd></div><div><dt>Undergraduate structure</dt><dd>{school.undergraduateStructure}</dd></div><div><dt>Setting</dt><dd>{school.campusContext}</dd></div></dl>
        <section><p className="eyebrow">Distinctive educational features</p><h2>What shapes the undergraduate experience</h2><ul>{school.distinctiveFeatures.map((item) => <li key={item}>{item}</li>)}</ul></section>
        <div className="text-columns">
          <section><p className="eyebrow">Potential alignment</p><h2>May fit students who…</h2><ul>{school.strongFitTraits.map((item) => <li key={item}>{item}</li>)}</ul></section>
          <section><p className="eyebrow">Possible mismatch</p><h2>Ask more questions when…</h2><ul>{school.possibleMismatchTraits.map((item) => <li key={item}>{item}</li>)}</ul></section>
        </div>
        <section className="caution"><p className="eyebrow">Common misconception</p><ul>{school.commonMisconceptions.map((item) => <li key={item}>{item}</li>)}</ul></section>
        <section><p className="eyebrow">Student fit questions</p><h2>Questions to investigate</h2><ol>{school.studentQuestions.map((item) => <li key={item}>{item}</li>)}</ol></section>
        <section><p className="eyebrow">Major-specific consideration</p><h2>Research the actual pathway</h2><p>{school.majorConsiderations}</p></section>
        <div className="text-columns">
          <section><p className="eyebrow">Application rounds</p><h2>Understand the commitment structure</h2><p>{school.applicationRoundOverview}</p></section>
          <section><p className="eyebrow">Financial aid</p><h2>Use the institution&apos;s own calculator</h2><p>{school.financialAidOverview}</p></section>
        </div>
        <section><p className="eyebrow">Useful comparisons</p><h2>Compare educational models, not prestige</h2><ul>{school.usefulComparisonSchools.map((item) => <li key={item}>{item}</li>)}</ul></section>
        <section><p className="eyebrow">Supplement research prompts</p><h2>Move beyond generic praise</h2><ul>{school.supplementResearchPrompts.map((item) => <li key={item}>{item}</li>)}</ul></section>
        <aside className="notice"><strong>Student-facing summary:</strong> {school.studentSummary}</aside>
        <section><p className="eyebrow">Time-sensitive policy records</p><h2>Testing and early application</h2>{schoolPolicies.map((policy) => <PolicyStamp key={policy.id} policy={policy} />)}</section>
        <section><p className="eyebrow">Official references</p><ul>{school.officialSources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer">{source.title} <span className="sr-only">(opens in a new tab)</span></a></li>)}</ul></section>
        <NotesField id={`school:${school.id}`} />
      </article>
    </>
  );
}
