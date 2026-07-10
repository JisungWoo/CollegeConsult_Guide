# Repository assessment and implementation plan

## Assessment — 2026-07-10

The workspace was completely empty: no framework, routes, styles, state layer, storage, tests, scripts, reusable components, assets, dead code, or Git metadata existed. There was therefore no working functionality to preserve and no obsolete code to remove.

## Architecture decision

Use Next.js App Router with strict TypeScript. Render reference content on the server; isolate comparison, diagnostic, consultation, search, case response, settings, and local persistence as small client components. Use authored CSS tokens rather than a generic component library. Store educational content in typed modules and local user data in a versioned browser envelope.

## Execution order

1. Establish design, product, content, data, and policy-governance contracts.
2. Scaffold framework, quality tooling, fonts, tokens, shell, and navigation.
3. Add validated structured content and search index.
4. Build homepage, curriculum, schools, comparison, roadmap, diagnostic, consult, toolkit, case lab, glossary, and policy watch.
5. Add local persistence, import/export/reset, student-facing language, and print.
6. Verify accessibility, responsive behavior, privacy, copy, build, lint, types, unit tests, and browser flows.

## Known delivery constraint

Institutional policies change by cycle. The app can ship a verified snapshot only if every record is checked against its official source near release; stale or uncertain items remain visibly marked for verification.
