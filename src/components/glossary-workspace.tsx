"use client";

import { useMemo, useState } from "react";
import { glossary } from "@/content/glossary";

export function GlossaryWorkspace() {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => { const value = query.trim().toLowerCase(); return value ? glossary.filter((item) => [item.term, item.definition, item.whyItMatters, item.caution].join(" ").toLowerCase().includes(value)) : glossary; }, [query]);
  return <section className="section-block wide-frame"><label className="form-field"><span>Filter the glossary</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try “Early Decision”" /></label><p aria-live="polite">{filtered.length} terms shown.</p>{filtered.map((item) => <article className="glossary-entry" id={item.slug} key={item.slug}><h2>{item.term}</h2><div><p>{item.definition}</p><p><strong>Why it matters:</strong> {item.whyItMatters}</p><p className="policy-warning"><strong>Consultant caution:</strong> {item.caution}</p>{item.related.length > 0 && <p><strong>Related:</strong> {item.related.join(" · ")}</p>}</div></article>)}</section>;
}
