import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";
import { SessionWorkspace } from "@/components/session-workspace";

export const metadata: Metadata = { title: "Live consultation session" };
export default function SessionPage() { return <><PageIntro number="LIVE" eyebrow="Consult mode · local session" title="Meeting guide and notes" summary="A calm working view for agenda, guided questions, evidence, decisions, follow-up, references, and a printable summary." aside={<>Nothing entered here is sent to a server. Clear the browser record from Local data when it is no longer needed.</>} /><SessionWorkspace /></>; }
