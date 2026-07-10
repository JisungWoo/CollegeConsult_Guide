# Design system

The canonical contract is [`DESIGN.md`](../DESIGN.md). This file records implementation details.

## Foundations

- 4px spacing base; 24px primary vertical rhythm.
- Newsreader for editorial display, IBM Plex Sans for UI/body support, IBM Plex Mono for metadata.
- Paper, ink, burgundy, forest, ochre, and hairline tokens only.
- Rules and whitespace create grouping; radius is capped at 4px and elevation is avoided.
- Reading text is capped near 70 characters; comparison workspaces may extend to 1280px.

## Interaction

- Underlined text and rule-based tabs signal interactivity.
- All controls expose hover, focus-visible, active, disabled, and selected states.
- Common transitions are 160ms; user/system reduced motion makes transitions effectively immediate.
- Print hides navigation and controls, removes texture, and adds source/review metadata.

## Anti-pattern sensor

Code review and tests scan public copy for guarantee/probability language and references to unrelated counseling platforms. Visual QA rejects gradients, glass effects, decorative dashboards, giant rounded containers, repeated generic cards, and vague button labels.
