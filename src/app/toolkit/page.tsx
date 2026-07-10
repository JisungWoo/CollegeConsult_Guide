import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";
import { ToolkitWorkspace } from "@/components/toolkit-workspace";
export const metadata: Metadata = { title: "Consultant toolkit" };
export default function ToolkitPage() { return <><PageIntro number="07" eyebrow="Reference mode · local worksheets" title="Use the toolkit" summary="Twenty-four practical checklists and worksheets for intake, planning, research, applications, decisions, and annual policy review." aside={<>Open only the worksheet needed for the present decision. Print views remove navigation and decorative surfaces.</>} /><ToolkitWorkspace /></>; }
