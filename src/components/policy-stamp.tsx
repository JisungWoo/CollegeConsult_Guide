import type { Policy } from "@/content/schema";

const verificationLabels: Record<Policy["verificationStatus"], string> = {
  current: "Current review record.",
  "verification-needed": "Verification needed.",
  archived: "Archived record — do not use for current-cycle advice.",
};

export function PolicyStamp({ policy }: { policy: Policy }) {
  return (
    <article className={`policy-stamp policy-stamp--${policy.verificationStatus}`} id={policy.id}>
      <header><span>{policy.category.replace("-", " ")}</span><strong>{policy.status}</strong></header>
      <p>{policy.summary}</p>
      <details><summary>Read policy detail and source</summary><p>{policy.details}</p><dl className="metadata-list"><div><dt>Cycle</dt><dd>{policy.applicationCycle}</dd></div><div><dt>Last reviewed</dt><dd>{policy.lastVerifiedAt}</dd></div><div><dt>Next review</dt><dd>{policy.nextReviewDate}</dd></div></dl><a href={policy.officialSourceUrl} target="_blank" rel="noreferrer">Official source: {policy.sourceTitle} <span className="sr-only">(opens in a new tab)</span></a></details>
      <p className="policy-warning"><strong>{verificationLabels[policy.verificationStatus]}</strong> {policy.reviewWarning}</p>
    </article>
  );
}
