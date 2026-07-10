import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";
import { PolicyStamp } from "@/components/policy-stamp";
import { policies } from "@/content/policies";

export const metadata: Metadata = { title: "Policy watch" };

export default function PolicyWatchPage() {
  return (
    <>
      <PageIntro number="08" eyebrow="Reference mode · cycle-bound records" title="Policy watch" summary="Testing and early-application records for the 2026–27 application cycle, with official sources and visible review status." aside={<>Initial coverage is limited to testing and early plans. Recheck official sources before every high-stakes recommendation.</>} />
      <section className="section-block reading-frame">
        <p className="caution"><strong>Coverage note:</strong> This initial tracker does not claim current coverage for all deadlines, supplements, interviews, recommendations, platforms, or aid requirements. Those categories remain a next-phase verification task.</p>
        {policies.map((policy) => <PolicyStamp key={policy.id} policy={policy} />)}
      </section>
    </>
  );
}
