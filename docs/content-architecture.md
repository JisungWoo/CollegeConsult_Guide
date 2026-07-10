# Content architecture

## Separation

Presentation components never own large admissions content. Domain content lives under `src/content`, is typed in `src/content/schema.ts`, and is validated during tests/build-time imports.

## Collections

| Collection | Purpose | Stable vs time-sensitive |
| --- | --- | --- |
| `lessons` | Sixteen-module consultant curriculum | Mostly stable; review annually |
| `schools` | Eight differentiated institutional profiles | Conceptual content stable; policy references time-sensitive |
| `policies` | Testing, early application, and financial-aid records | Time-sensitive; source and review metadata required |
| `roadmap` | Grade 9 through decision-period planning | Stable; review annually |
| `cases` | Six fictional practice scenarios | Stable; clearly labeled fictional |
| `toolkit` | Printable working templates | Stable; review when practices change |
| `glossary` | Plain-language terms and cautions | Mixed; link volatile terms to policies |

## Search

`src/content/search-index.ts` normalizes the collections into a compact index of title, category, route, summary, and keywords. Search is client-side and stores only recent query strings locally.

## Governance rule

Stable guidance and consultant judgment may appear in lessons. A current institutional claim must be a policy record with application cycle, official source, last verified date, next review date, and warning. Unknown or expired information is displayed as such—not inferred.
