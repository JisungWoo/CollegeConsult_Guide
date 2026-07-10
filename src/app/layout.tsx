import type { Metadata } from "next";
import "@fontsource-variable/newsreader";
import "@fontsource/ibm-plex-sans/400.css";
import "@fontsource/ibm-plex-sans/500.css";
import "@fontsource/ibm-plex-sans/600.css";
import "@fontsource/ibm-plex-mono/400.css";
import "./globals.css";
import { AppShell } from "@/components/app-shell";
import { LocalStateProvider } from "@/components/local-state-provider";

export const metadata: Metadata = {
  title: { default: "The Admissions Desk", template: "%s — The Admissions Desk" },
  description: "A field guide for thoughtful college counseling.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <LocalStateProvider><AppShell>{children}</AppShell></LocalStateProvider>
      </body>
    </html>
  );
}
