import type { Metadata } from "next";
import { IntakeWorkspace } from "@/components/intake-workspace";
import { PageIntro } from "@/components/page-intro";

export const metadata: Metadata = { title: "Student and parent intake" };
export default function IntakePage() { return <><PageIntro number="IN" eyebrow="Consult mode · intake" title="Begin a student intake" summary="Establish the student’s goals, context, family constraints, decision roles, privacy boundaries, and questions before diagnosing or recommending." aside={<>Ask for the minimum necessary. A case label is usually enough.</>} /><IntakeWorkspace /></>; }
