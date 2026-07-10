import type { Metadata } from "next";
import { ComparisonWorkspace } from "@/components/comparison-workspace";
import { PageIntro } from "@/components/page-intro";

export const metadata: Metadata = { title: "Compare Ivy institutions" };

export default function ComparePage() {
  return <><PageIntro number="CMP" eyebrow="Reference mode · working table" title="Compare the Ivies" summary="Place up to three institutions side by side. Mark the dimensions relevant to this student, record questions, and print a simplified working comparison." aside={<>Use this table to generate questions—not to declare a perfect match.</>} /><ComparisonWorkspace /></>;
}
