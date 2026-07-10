import type { ReactNode } from "react";

export function PageIntro({ number, eyebrow, title, summary, aside }: { number?: string; eyebrow: string; title: string; summary: string; aside?: ReactNode }) {
  return (
    <header className="page-intro page-frame">
      <div className="page-intro__marker" aria-hidden="true">{number ?? "§"}</div>
      <div className="page-intro__content"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="lede">{summary}</p></div>
      {aside && <aside className="margin-note">{aside}</aside>}
    </header>
  );
}
