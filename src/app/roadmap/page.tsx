import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";
import { RoadmapWorkspace } from "@/components/roadmap-workspace";

export const metadata: Metadata = { title: "Grade 9–12 roadmap" };

export default function RoadmapPage() { return <><PageIntro number="04" eyebrow="Consult mode · longitudinal plan" title="Plan grades 9–12" summary="A six-period planning rail from grade 9 foundations through post-submission decisions. Check work locally and print a clean reference." aside={<>The roadmap protects healthy development. It does not turn every high-school choice into an admissions tactic.</>} /><RoadmapWorkspace /></>; }
