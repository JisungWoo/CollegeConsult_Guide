import Link from "next/link";
import { HomeProgress } from "@/components/home-progress";
import { policies } from "@/content/policies";

const index = [
  ["01", "Learn the work", "A sixteen-module curriculum for ethical, contextual college counseling.", "/learn"],
  ["02", "Understand the eight Ivies", "Compare educational models, structures, settings, and fit questions.", "/schools"],
  ["03", "Evaluate a student", "Build a qualitative readiness map from evidence and unanswered questions.", "/diagnostic"],
  ["04", "Plan grades 9–12", "Use a longitudinal academic and application roadmap.", "/roadmap"],
  ["05", "Run a consultation", "Prepare an agenda, ask better questions, record decisions, and print follow-up.", "/consult"],
  ["06", "Practice with cases", "Work through six fictional situations and compare reasoning.", "/case-lab"],
  ["07", "Use the toolkit", "Open, complete, save, and print practical consultant worksheets.", "/toolkit"],
  ["08", "Check current policies", "Review cycle-specific testing and early-plan records with official sources.", "/policy-watch"],
] as const;

export default function Home() {
  const reviewNeeded = policies.filter((policy) => policy.verificationStatus === "verification-needed");
  return (
    <>
      <section className="page-intro page-frame home-intro">
        <div className="page-intro__marker" aria-hidden="true">AD</div>
        <div className="page-intro__content">
          <p className="eyebrow">Field guide · working edition · 2026–27</p>
          <h1>The Admissions Desk</h1>
          <p className="lede">A field guide for thoughtful college counseling.</p>
        </div>
        <aside className="margin-note"><strong>Editorial principle</strong><br />Use evidence to generate questions—not to manufacture certainty.</aside>
      </section>
      <section className="section-block page-frame" aria-labelledby="opening-statement">
        <div className="section-heading"><span>PREAMBLE</span><div><h2 id="opening-statement">Strong counseling does not manufacture an applicant.</h2></div></div>
        <p className="lede">It helps a student understand their record, make thoughtful choices, identify suitable colleges, and communicate their experiences honestly.</p>
      </section>
      <section className="section-block page-frame" aria-labelledby="desk-index">
        <div className="section-heading"><span>INDEX</span><div><p className="eyebrow">Three modes, one working desk</p><h2 id="desk-index">Open a section</h2></div></div>
        <ol className="index-list">
          {index.map(([number, title, description, href]) => <li key={href}><Link href={href}><span>{number}</span><strong>{title}</strong><em>{description}</em></Link></li>)}
        </ol>
      </section>
      <HomeProgress />
      <section className="section-block page-frame" aria-labelledby="policy-watch-home">
        <div className="section-heading"><span>WATCH</span><div><p className="eyebrow">Policy watch · reviewed 10 Jul 2026</p><h2 id="policy-watch-home">Items that should not be carried forward silently</h2></div></div>
        {reviewNeeded.map((policy) => <p className="notice" key={policy.id}><strong>{policy.institution} — {policy.category.replace("-", " ")}:</strong> {policy.summary} <Link href={`/policy-watch#${policy.id}`}>Read the review record.</Link></p>)}
        <p><Link href="/policy-watch">Review all testing and early-application policies.</Link></p>
      </section>
    </>
  );
}
