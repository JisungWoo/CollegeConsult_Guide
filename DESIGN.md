# Design

## Source of truth
- Status: Active
- Last refreshed: 2026-07-10
- Primary product surfaces: field-guide index, curriculum, school reference, comparison workspace, roadmap, readiness diagnostic, consultation workspace, case lab, toolkit, glossary, policy watch, settings.
- Evidence reviewed: the complete product brief supplied on 2026-07-10; the workspace was empty and contained no prior design artifacts or components.

## Brand
- Personality: editorial, humane, exacting, calm, academically serious.
- Trust signals: source metadata, visible review dates, policy warnings, precise limitations, privacy-first defaults.
- Avoid: generic SaaS cards, prestige theater, admissions predictions, decorative dashboards, gradients, glass effects, stock campus imagery, vague calls to action.

## Product goals
- Goals: train developing consultants; support live meetings; make school, policy, and methodology references fast to retrieve; produce useful print summaries.
- Non-goals: admissions prediction, student ranking, essay ghostwriting, remote student-record storage, marketing funnel, billing, authentication.
- Success signals: a consultant can learn, compare, diagnose, run a meeting, save local notes, and print a summary without encountering an unfinished flow.

## Personas and jobs
- Primary personas: independent college consultant; school counselor building selective-admissions fluency; consultant using a laptop or tablet in a family meeting.
- User jobs: understand principles; retrieve a fact quickly; frame questions; record evidence; plan follow-up; explain a concept to a student; verify a policy.
- Key contexts of use: focused study, time-constrained live consultation, post-meeting documentation, policy review.

## Information architecture
- Primary navigation: three index-tab modes—Learn, Consult, Reference—with a utility strip for search, privacy, print, and settings.
- Core routes/screens: `/`, `/learn`, `/learn/[module]`, `/schools`, `/schools/[school-slug]`, `/compare`, `/roadmap`, `/diagnostic`, `/consult`, `/consult/intake`, `/consult/session`, `/case-lab`, `/case-lab/[case-slug]`, `/toolkit`, `/glossary`, `/policy-watch`, `/methodology`, `/ethics`, `/about`, `/settings`.
- Content hierarchy: stable principles first; consultant guidance second; school-specific conceptual distinctions third; time-sensitive policy records always paired with provenance.

## Design principles
- Publication, not product theater: pages behave like edited reference sheets with an index, running metadata, rules, marginalia, and footnotes.
- Dense but legible: information density comes from hierarchy and tables, not repeated card grids.
- Questions before verdicts: interactive tools produce prompts, evidence maps, and next actions—not scores or probabilities.
- Local by default: progress and meeting drafts remain in the browser unless the user exports them.
- Tradeoffs: editorial typography and rich structured content take priority over decorative imagery; client JavaScript is limited to tools that require state.

## Visual language
- Color: warm paper `#f2eee4`, light sheet `#fbf8f0`, ink `#1e211d`, muted burgundy `#7a2f3b`, forest support `#2f5944`, ochre warning `#8a5a12`, hairline `#c9c1b3`.
- Typography: Newsreader variable for display/editorial headings; IBM Plex Sans for interface and reading support; IBM Plex Mono for policy metadata and labels.
- Spacing/layout rhythm: 4px base; 24px body rhythm; maximum reading measure 70ch; wide comparison measure 1280px; asymmetric 12-column desktop layouts.
- Shape/radius/elevation: 0–4px radius, no floating card shadows; hierarchy uses rules, indentation, whitespace, and paper contrast.
- Motion: 120–200ms transitions for underline, disclosure, and checked state; no perpetual motion; reduced-motion override disables nonessential transitions.
- Imagery/iconography: no stock imagery; typographic symbols only when they carry meaning.

## Components
- Existing components to reuse: none; workspace began empty.
- New/changed components: AppShell, EditorialMasthead, ModeTabs, SectionIndex, PolicyStamp, MarginNote, SourceFootnote, SearchPalette, ComparisonTable, RoadmapRail, ReadinessDimension, StudentFacingToggle, SessionAgenda, CaseFile, KnowledgeCheck, LocalDataNotice, PrintHeader.
- Variants and states: current/stale/verification-needed policy; consultant/student language; complete/incomplete/attention/unknown evidence; default/print/compact layouts.
- Token/component ownership: global CSS owns tokens and primitives; domain components own admissions-specific interactions; content modules own prose and facts.

## Accessibility
- Target standard: WCAG 2.2 AA.
- Keyboard/focus behavior: skip link, visible 3px focus ring, Ctrl/Cmd+K search, Escape closes overlays, native controls, no hover-only disclosure.
- Contrast/readability: AA contrast, body line-height at least 1.55, no status conveyed by color alone, zoom-safe fluid type.
- Screen-reader semantics: landmarks, ordered headings, captioned tables, fieldsets/legends, status live regions, explicit external-link text.
- Reduced motion and sensory considerations: system preference plus local user preference; motion never required to understand state.

## Responsive behavior
- Supported breakpoints/devices: mobile from 360px, tablet from 720px, desktop from 1024px, wide reference layout from 1280px.
- Layout adaptations: marginalia becomes inline disclosure; comparison tables scroll inside a labeled region; desktop side rail collapses to a compact index; consult panes stack on mobile.
- Touch/hover differences: 44px minimum interactive targets; active and focus states do not depend on hover.

## Interaction states
- Loading: minimal text status only for lazy client tools.
- Empty: explain what will appear and provide a specific next action.
- Error: preserve entered data and identify the affected field or import format.
- Success: concise status plus visible persisted result.
- Disabled: explain prerequisite adjacent to control.
- Offline/slow network: all core content and local tools work without application API calls after load; external official sources are the only network-dependent actions.

## Content voice
- Tone: direct, calm, specific, student-centered, professionally cautious.
- Terminology: use “high reach” for Ivies; “evidence” and “questions” instead of “score”; “student ownership” instead of “optimization.”
- Microcopy rules: verbs name the exact action; never use hype, guarantees, chance language, “perfect profile,” or prestige-as-worth framing.

## Implementation constraints
- Framework/styling system: Next.js App Router, TypeScript, CSS custom properties and authored CSS; no decorative component library.
- Design-token constraints: all color, type, spacing, focus, and motion values originate in `src/app/globals.css`.
- Performance constraints: server components by default; client components only for stateful tools; no image or animation payloads; local search over a compact generated index.
- Compatibility constraints: current evergreen browsers; browser localStorage for non-sensitive drafts; browser print-to-PDF.
- Test/screenshot expectations: content validation, ethics scans, local-state logic, build/lint/type checks, and browser tests of keyboard, responsive, print, and primary flows.

## Open questions
- [ ] Confirm the product owner name and copyright line before public launch / owner / low impact.
- [ ] Re-verify all cycle-specific institutional policies immediately before public launch / content editor / high impact.
- [ ] Decide whether encrypted authenticated sync is ever needed; it is intentionally excluded from the first implementation / owner / medium impact.
