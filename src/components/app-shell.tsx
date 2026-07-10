"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { SearchPalette } from "./search-palette";

const modes = [
  { label: "Learn", href: "/learn", match: ["/learn", "/case-lab"] },
  { label: "Consult", href: "/consult", match: ["/consult", "/diagnostic", "/roadmap"] },
  { label: "Reference", href: "/schools", match: ["/schools", "/compare", "/glossary", "/policy-watch", "/toolkit"] },
];

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <header className="site-header">
        <div className="utility-bar page-frame">
          <Link className="wordmark" href="/" aria-label="The Admissions Desk home">
            <span>The Admissions Desk</span>
            <small>A field guide for thoughtful college counseling</small>
          </Link>
          <div className="edition-mark"><span>Application cycle</span><strong>2026–27</strong><span>Reviewed 10 Jul 2026</span></div>
          <SearchPalette />
        </div>
        <nav className="mode-tabs page-frame" aria-label="Working modes">
          {modes.map((mode, index) => {
            const active = mode.match.some((prefix) => pathname.startsWith(prefix));
            return <Link key={mode.href} href={mode.href} aria-current={active ? "page" : undefined}><span>0{index + 1}</span>{mode.label}</Link>;
          })}
          <Link href="/settings" aria-current={pathname === "/settings" ? "page" : undefined}><span>04</span>Local data</Link>
        </nav>
      </header>
      <main id="main-content">{children}</main>
      <footer className="site-footer">
        <div className="page-frame footer-grid">
          <div><strong>The Admissions Desk</strong><p>An educational and organizational resource. Not legal, financial, tax, or mental-health advice.</p></div>
          <nav aria-label="Publication information"><Link href="/methodology">Methodology</Link><Link href="/ethics">Ethics</Link><Link href="/about">About</Link><Link href="/settings">Data controls</Link></nav>
          <p className="footer-note">Institutional policies change. Recheck official sources before advising a student.</p>
        </div>
      </footer>
    </>
  );
}
