<!-- 第三方开源内容（MIT），已按本库规则修改；版权声明见仓库根目录 THIRD_PARTY_NOTICES.md -->

# Emotion-to-Motion Mapping

## Core Table

| Emotion | Character | Path | Easing | Duration |
|---------|----------|------|--------|----------|
| Joy/Delight | Bouncy, arcs, overshoot | Curved, upward | `spring-pop` | middle of the range |
| Calm/Serenity | Smooth, flowing | Gentle curves | `--ease-in-out`; sine for ambient loops | slow end |
| Urgency/Alert | Sharp, fast, direct | Straight lines | `--ease-out` | fast end |
| Sadness/Weight | Slow, downward | Drooping curves | `--ease-in-out` | slow end |
| Surprise/Impact | Sudden, expanding | Radial outward | `--ease-out` | fast end |
| Elegance/Grace | Slow, controlled | Long smooth arcs | `--ease-out`, `spring-ui` | slow end |
| Playfulness | Bouncy, irregular | Arcs, squiggly | `spring-gesture`, `spring-pop` | middle of the range |
| Confidence | Direct, decisive | Straight, horizontal | `--ease-out` | middle of the range |
| Curiosity | Exploratory, varied | Mixed, circular | varied, inside the dictionary | middle to slow end |
| Tenderness | Soft, gentle | Very subtle curves | `--ease-in-out` | slow end |

"Range" is the element's duration range in `references/core/params.md`. Only first-screen and scroll storytelling on landing and brand pages goes past it.

## Path as Emotional Language

| Path Type | Connotation |
|-----------|------------|
| Angular/sharp | Tense, urgent, mechanical |
| Curved/smooth | Relaxed, friendly, organic |
| Spiral | Playful, whimsical |
| Straight diagonal | Dynamic, purposeful |
| Vertical up | Growth, achievement |
| Vertical down | Settling, gravity |
| Horizontal | Journey, progress |
| Radial outward | Explosion, release |
| Radial inward | Focus, convergence |

## Emotional Intensity

| Intensity | Characteristics | When |
|-----------|----------------|------|
| Low | Subtle opacity, tiny shifts | Ambient, routine |
| Medium | Visible but not demanding | Most UI interactions |
| High | Demands attention, large displacement | Errors, celebrations, onboarding |

## Color Psychology

| Color | Emotion | Animation Pairing |
|-------|---------|------------------|
| Blue | Trust, calm | Smooth, medium transitions |
| Green | Success, growth | Upward, expansion, gentle overshoot |
| Red | Error, danger | Sharp, fast, horizontal shakes |
| Orange | Energy, warmth | Bouncy, diagonal paths |
| Purple | Premium, mystery | Slow reveals, elegant easing |
| Yellow | Optimism, caution | Quick pulses |
| Teal | Modern, clarity | Clean, snappy transitions |

The colours themselves come from the project's `DESIGN.md` / tokens; this table only says which motion goes with a colour's role. Red is only for errors and dangerous actions, not for general urgency or attention.

### Color Transition Rules
- Success: transition TO green (don't start with it)
- Error: flash red then settle (don't sustain)
- Warning: pulse yellow/amber for urgency
- Neutral: use opacity rather than color change

## Context-Based Emotion Defaults

| Context | Default Emotion |
|---------|----------------|
| Form success | Joy + Confidence |
| Validation error | Mild urgency |
| Page load | Calm + Confidence |
| Navigation | Confidence |
| Notification | Mild surprise |
| Loading | Calm |
| Onboarding | Curiosity + Delight |
| Dashboard | Calm + Confidence |
| Purchase complete | Joy + Confidence |
| Delete/remove | Calm (respectful departure) |
