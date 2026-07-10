import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/page-intro";
import { cases } from "@/content/cases";

export const metadata: Metadata = { title: "Case lab" };

export default function CaseLabPage() {
  return <><PageIntro number="06" eyebrow="Learn mode · fictional practice" title="Practice with cases" summary="Review incomplete records, identify missing information, choose questions, name risks, recommend next work, and compare your reasoning with an uncertainty-aware expert analysis." aside={<>Every student in the case lab is fictional. The expert response explains a defensible process, not the one correct answer.</>} /><section className="section-block page-frame"><ol className="index-list">{cases.map((item, index) => <li key={item.id}><Link href={`/case-lab/${item.slug}`}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item.title}</strong><em>{item.subtitle}</em></Link></li>)}</ol></section></>;
}
