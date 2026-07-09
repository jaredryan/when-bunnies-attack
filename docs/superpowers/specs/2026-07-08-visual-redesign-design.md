# When Bunnies Attack — Visual Redesign

> Status: **approved design**, ready to move into an implementation plan. All five screens (A–E) are confirmed; the journal/dialogue classifier for section A has been validated against every line in `Messages.js`.

## Goal

Visual/UI redesign only — not a gameplay rewrite. Preserve the decision loop, room/event progression, map unlock logic, battle logic, item usage logic, typewriter behavior, History behavior, and restart/end-game flow. Make the game feel polished, atmospheric, and intentionally designed: a "creepy-cute storybook escape game."

Constraints:
- CSS, visual design, layout, spacing, typography, colors, modal styling, button styling, responsive improvements are all in scope.
- Small JSX/className/semantic markup changes are okay for styling or accessibility.
- Title/Win/Lose pages can be redesigned freely.
- No major new libraries. Work mostly through CSS + small component changes.
- Don't globally remove focus outlines — replace with custom visible focus states.

## Aesthetic direction

**Primary layer — World / Field Guide Base.** The main visual system, used everywhere: parchment, ink, forest, rust, old field notes, a creepy castle/facility escape adventure. Old, strange, musty, atmospheric — specimen labels, escape maps, field notes.

**Secondary layer — Bunny Pop Accent.** Used sparingly, only for bunny-specific moments: enemy cards, battle screen, danger states, bunny dialogue accents, the "cute but wrong" contrast. Not used for general UI chrome.

**Motif (not a separate color tier) — Stamps / Labels / Warnings.** The clinical/dossier feeling (there's only one lab room, so it doesn't deserve its own palette) is expressed through type and shape — Special Elite typewriter type, stamped label shapes, torn-tape corners, hazard strips, classification codes — built mostly from Tier 1 colors, borrowing Caution Yellow / Faded Steel only when a note needs to read clinical.

Tone: not serious horror. Funny, handmade, absurd — just more polished and intentional.

## Palette

```
Tier 1 — World / Field Guide Base (used everywhere):
  Parchment #EAE0C8   Ink #2B2620   Forest #3F5D42
  Rust #A34428         Brass #A6822E   Slate #6E6455

Tier 2 — Bunny Pop Accent (sparing: battle, enemy cards, danger states, bunny dialogue):
  Blush #EDB6C2   Mint #AEDCC9   Lavender #C9B8E0   Pop Red #E24B4B

Motif borrowed colors (stamps/labels/warnings only):
  Caution Yellow #D9A93B   Faded Steel #7C8079
```

**Guardrail:** Bunny Pop colors must stay controlled — not fighting for attention everywhere. Pop Red is reserved specifically for danger/damage/low HP/warnings/battle emphasis (hostile tag, HP bar, damage flashes) — it is **not** the default color for the Attack button or general UI. Blush/mint/lavender appear only in bunny-specific moments (mainly the battle screen).

## Typography

- **Display:** Fraunces — field-guide titling, slightly wonky/hand-set quality.
- **Body:** Vollkorn — warm, readable book serif.
- **Utility/stamp:** Special Elite — typewriter face for dossier stamps, room codes, labels, warnings.

Loaded via Google Fonts `<link>` tag (same lightweight mechanism as the current Roboto Slab), no bundle-size cost.

## Signature element: the label system

Every game object gets a hand-stamped label, but the style is matched to what it is rather than one uniform template:

- **Rooms** → field-note / map labels (Tier 1 only)
- **Items** → field inventory tags (Tier 1 only)
- **Enemies** → true specimen labels (Tier 1 card + Tier 2 pop wash + danger tag)
- **Warnings** → stamped annotations (Tier 1 + borrowed caution yellow)

This ties the game's core joke — bunnies being studied/classified like lab specimens — directly into the UI language, without forcing every label into an identical look.

## Layout concepts by screen

### A — Main game shell / narration (approved)

Room backdrop photo becomes a blurred, ink-tinted, vignetted atmosphere shot (blur + duotone + vignette) instead of a literal photo — this also smooths over the fact that the source photos are stylistically inconsistent (stock photos, AI-generated bunny portraits, real landscape photos). A parchment "journal page" panel sits on top, slightly rotated, with a torn-tape corner accent. Status (HP/Attack) reads as a ledger row; Map is a wax-seal button; Items is a satchel-tab button; choices render as a field-note option list.

**Journal vs. dialogue split — approved, classifier validated:**

The existing content already encodes the distinction via string conventions already in use everywhere in `Messages.js` — no content edits required:

```
classifyLine(text, lastSpeaker):
  starts with `Name: `        → dialogue, speaker = Name, lastSpeaker = Name
  starts with a quote mark    → dialogue, speaker = lastSpeaker (carried forward)
  otherwise                   → journal, lastSpeaker = null (streak resets)
```

- Journal lines render in-flow as parchment/field-note paragraphs, accumulating on the page.
- Dialogue lines (the *currently active* one only) float as a rotated speech-bubble note near the lower-left, overlapping the page edge, with the speaker name as a small tag when known. Once advanced past, they settle into the log like any other line (styled as a quoted aside).
- **Carry-forward speaker:** when a speaker delivers several consecutive quoted lines without repeating `Name:` on each one (e.g. the final boss monologue), the bubble keeps showing the last explicit speaker rather than going unlabeled. The streak resets on the next journal line.
- Same typewriter speed/mechanism for both — the difference is framing (in-page paragraph vs. floating bubble), not typing behavior. **This is a first-implementation choice, not a locked rule** — if typed-out journal entries feel off in practice, a follow-up pass can move journal entries to a faster ink-reveal/fade/instant-write treatment while keeping full typewriter speed for bubbles, bunny dialogue, combat dialogue, and surprise/self-reaction moments. Not part of this implementation pass.
- Scope: **exploration `DialogueBox` usage only.** Battle's `windowOnly` `DialogueBox` usage is unchanged — combat dialogue keeps the direct typewriter treatment, no journal/bubble split there.
- **What this does not touch:** `current`/`done`/`skip` state machine, `handleSkip` logic, History's data source, `onDone` timing contract, the meadow win-image detection, `decisionLoop`/`AreasList`/`EventsList`.
- "Revisit fully written, not re-typewritten" is already true today for History — no change needed.
- Optional low-risk touch: relabel the Skip button "Next" once the current line has finished typing (already behaves as advance-to-next at that point) — text-only change.

**Classifier validation (every line in `Messages.js` checked):**

The two rules (plus carry-forward speaker) map cleanly onto every line used in exploration. Notable edge cases, none requiring a content edit:

1. *Multi-line monologues* (`finalBossEncounter`): only the first line of a speech carries `Bunny:` — resolved by carry-forward speaker above.
2. *Punctuation-only beats* (`...`, `..`, `.`, `:)`) default to journal — reads fine as a written pause/marginalia, no bubble needed.
3. *One unquoted exclamation* — `"Shoot, there's a bunny!"` in `wonGameMessage` is the single line in the whole file that reads like a reaction but isn't quoted, so it defaults to journal instead of a bubble. Low-stakes, one line, still reads fine as a note — left as-is rather than editing content for a classifier nuance.
4. *Parenthetical stage directions inside dialogue* (`You: (Oh, right.) "I'm...actually, I don't remember."`) still classify correctly as dialogue; the whole string renders inside the bubble.
5. Dynamic/templated strings (`travelToRoomMessage`, `escape7DistanceWalked`, `winBattleMessage`, `fleeSuccessMessage`, etc.) never contain a leading quote or `Name:` prefix, so they always classify journal — correct and desired, since these are system/narration-style lines shown in the exploration flow after battle resolves.

### B — Map modal (approved, proceed)

Rooms become hand-stamped, irregular blob shapes (not perfect circles) on aged paper, joined by dotted trail lines instead of hard connector bars.

- Current room: solid forest-ink fill.
- Visited rooms: outlined, parchment fill.
- Available-but-unvisited rooms: dashed brass "rumored" outline.
- Unreachable rooms: faint dotted placeholder.
- Keep existing travel/cancel behavior and room graph/unlock logic exactly as-is.
- Interactive rooms must be visibly clickable and keyboard-focusable (custom focus states, not outline removal).

### C — Inventory (approved, proceed)

Satchel drawer, same slide-up behavior and Use logic. Items restyled as field inventory tags — name, effect, short flavor line, stamped "Use" tab. Keep it lightweight and readable.

### D — Battle screen (approved, revised)

Environment/location image stays as the battle background — **not** replaced by the enemy portrait. During battle the environment becomes more blurred/desaturated/dimmed, with a gentle rust-tinted wash (subtle, not a dramatic red alert). The enemy appears as a card/specimen-label element layered on top (with a small circular portrait inside the card), not as the scene itself.

Color guardrail: Attack button uses **rust**, not Pop Red. Pop Red is reserved for the hostile tag, the HP bar, and damage/low-HP/warning emphasis. Bunny Pop accents (blush card wash, danger tag) belong here more than anywhere else in the game, but stay controlled.

### E — Title / Win / Lose (approved)

- **Title:** engraved-plate/game-cover treatment over the tinted/blurred photo (approved as-is).
- **Lose:** leans into the case-file treatment (approved as-is).
- **Win (revised, two-stage):**
  1. *Release beat* — full meadow photo (the existing "HasWon" image), light wash instead of dark vignette, 1–2 short paragraphs of the existing ending text, no case-file chrome yet. Meant to contrast against the trapped/dark tone of the rest of the game.
  2. *Case-file card* — settles into a calm case-file result card, "Specimen Escaped" (the joke being that the player was effectively the specimen), Case File: Closed stamp, Play Again button lives here.

## Overall guardrails (carried through every screen)

- Preserve existing gameplay behavior: decision loop, map unlock logic, battle logic, item usage, restart flow are untouched.
- Be especially cautious with any change touching dialogue/progression behavior — propose the approach before implementing if it's not a pure CSS/small-markup change.
- Preserve Skip and History, adapting presentation only if the journal/dialogue model changes.
- Work mostly through CSS and small JSX/className changes.
- Keep visual motifs controlled — parchment/stamps/labels/field notes/blurred backgrounds/bunny-pop accents should support the game, not overwhelm it.
- Keep Bunny Pop mostly tied to bunnies, dialogue, battle, danger, comedy contrast.
- Add custom visible focus states instead of removing outlines.

## Status

All sections (A–E) approved. Next step: write the implementation plan (file-by-file breakdown, sequencing, verification approach) and execute against it.
