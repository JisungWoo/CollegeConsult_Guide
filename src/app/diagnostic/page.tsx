import type { Metadata } from "next";
import { DiagnosticWorkspace } from "@/components/diagnostic-workspace";
import { PageIntro } from "@/components/page-intro";

export const metadata: Metadata = { title: "Student readiness diagnostic" };

export default function DiagnosticPage() { return <><PageIntro number="03" eyebrow="Consult mode · qualitative evidence map" title="Evaluate a student" summary="Review twelve dimensions through evidence, context, unanswered questions, risks of misinterpretation, and next actions—without scores or admission predictions." aside={<>Status labels describe the evidence available now. They do not rank the student or forecast a college decision.</>} /><DiagnosticWorkspace /></>; }
