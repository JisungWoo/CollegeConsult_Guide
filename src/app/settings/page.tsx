import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";
import { SettingsWorkspace } from "@/components/settings-workspace";
export const metadata: Metadata = { title: "Local data and settings" };
export default function SettingsPage() { return <><PageIntro number="04" eyebrow="Local data · privacy controls" title="Control your local desk" summary="Review what is stored, choose reading preferences, export or import a versioned record, and delete all local data." aside={<>No account is required. Sensitive student records should not be entered unless necessary for a clear counseling purpose.</>} /><SettingsWorkspace /></>; }
