import type { Metadata } from "next";
import { GlossaryWorkspace } from "@/components/glossary-workspace";
import { PageIntro } from "@/components/page-intro";
export const metadata: Metadata = { title: "Admissions glossary" };
export default function GlossaryPage() { return <><PageIntro number="A–Z" eyebrow="Reference mode · plain language" title="Admissions glossary" summary="Definitions that explain what a term means, why it matters, and where a consultant should be cautious." aside={<>A term can describe a process without making that process predictable.</>} /><GlossaryWorkspace /></>; }
