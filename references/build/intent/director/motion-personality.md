<!-- 第三方开源内容（MIT），已按本库规则修改；版权声明见仓库根目录 THIRD_PARTY_NOTICES.md -->

# Motion Personality

A project's motion spec records one of the three personalities in `references/core/pick.md` (克制，不回弹 / 有弹性 / 有表现力). The four archetypes here describe the character in more detail; each maps onto one of those three. Durations are written as a position inside the element's range in `references/core/params.md`, and curves and springs are the ones defined there.

## Four Archetypes

### Playful

| Parameter | Value |
|-----------|-------|
| Maps to | 有弹性 |
| Duration | middle of the element's range |
| Easing | `--ease-out`; bouncy springs: `spring-gesture`, `spring-pop` on confirmations |
| Overshoot | from the spring preset; `spring-pop` (bounce 0.3) is the ceiling |
| Paths | Arcs and curves, never straight |
| Squash-stretch | Yes, on impacts |

Signature: bounce settle, squash-stretch on press, rotation wobble, bright color pops, varied stagger timing.
Use for: children's apps, casual games, social media, celebrations, onboarding, creative tools.

### Premium / Luxury

| Parameter | Value |
|-----------|-------|
| Maps to | 克制，不回弹 in product UI; 有表现力 on landing and brand pages |
| Duration | slow end of the element's range; longer only in first-screen and scroll storytelling on landing and brand pages |
| Easing | `--ease-out`; `--ease-in-out` for on-screen movement |
| Overshoot | none (`spring-ui`) |
| Paths | Smooth curves, subtle parallax |
| Squash-stretch | Never |

Signature: slow fades, subtle scale (98%→100%), generous pauses, minimal properties (opacity+one), ultra-smooth.
Use for: fashion, finance, luxury brands, premium SaaS, portfolios, editorial.

### Corporate / Professional

| Parameter | Value |
|-----------|-------|
| Maps to | 克制，不回弹 |
| Duration | fast end to middle of the element's range |
| Easing | `--ease-out`; `--ease-in-out` for on-screen movement |
| Overshoot | none (`spring-ui`) |
| Paths | Mostly straight, small arcs for emphasis |
| Squash-stretch | No |

Signature: consistent timing, clear state transitions, functional motion, predictable patterns, uniform stagger.
Use for: enterprise, dashboards, business tools, admin, healthcare, banking.

### Energetic / Dynamic

| Parameter | Value |
|-----------|-------|
| Maps to | 有弹性 in an app; 有表现力 on landing and brand pages |
| Duration | fast end of the element's range |
| Easing | `--ease-out`; `spring-pop` |
| Overshoot | `spring-pop` (bounce 0.3), the ceiling |
| Paths | Dramatic arcs, large displacement, diagonal |
| Squash-stretch | Yes, exaggerated |

Signature: large scale changes (50-150%), fast color transitions, particle bursts, accelerating stagger, bold edge entrances.
Use for: gaming, sports, music, events, marketing, fitness apps.

## Keyword Matching

| Keywords | Archetype |
|----------|-----------|
| fun, whimsical, bouncy, cute, friendly | Playful |
| elegant, minimal, luxury, sophisticated | Premium |
| clean, professional, business, dashboard | Corporate |
| dynamic, energetic, bold, exciting | Energetic |
| (unspecified) + UI | Corporate (default) |
| (unspecified) + illustration | Playful (default) |

## Brand Motion Identity

Define three constants for recognizable motion. They are rows of the project's motion spec (`references/core/motion-spec-template.md`: 进出场曲线, 时长档, 统一进场方式) and are written there, not kept in this file.

### 1. Signature Easing (80% of animations)
`--ease-out` for every archetype. What differs is the spring that goes with it — Playful: `spring-gesture` | Premium: `spring-ui` | Corporate: `spring-ui` | Energetic: `spring-pop`

### 2. Duration Palette

Three durations — quick, standard, slow — picked inside the ranges of `references/core/params.md`: quick for press and hover, standard for menus and toasts, slow for dialogs and drawers.

Where each archetype lands inside those ranges — Playful: middle | Premium: slow end | Corporate: fast end to middle | Energetic: fast end

### 3. Entrance Pattern
Playful: bounce up from below | Premium: slow fade + scale 98%→100% | Corporate: slide right + opacity | Energetic: snap from edge + overshoot

## Mixing Archetypes
- 90% primary archetype; specific moments can borrow another
- Ease into personality shifts, don't snap
- Example: corporate dashboard borrows Playful for success state only
