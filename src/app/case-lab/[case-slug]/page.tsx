import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseWorkspace } from "@/components/case-workspace";
import { PageIntro } from "@/components/page-intro";
import { cases, getCase } from "@/content/cases";

export function generateStaticParams() { return cases.map((item) => ({ "case-slug": item.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ "case-slug": string }> }): Promise<Metadata> { return { title: getCase((await params)["case-slug"])?.title ?? "Case lab" }; }
export default async function CasePage({ params }: { params: Promise<{ "case-slug": string }> }) { const item = getCase((await params)["case-slug"]); if (!item) notFound(); return <><PageIntro number="CASE" eyebrow="Case lab · fictional student" title={item.title} summary={item.subtitle} aside={<>Read the file before naming strengths or recommendations. Missing information is part of the exercise.</>} /><CaseWorkspace item={item} /></>; }
