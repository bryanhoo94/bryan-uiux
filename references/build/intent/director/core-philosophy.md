<!-- 第三方开源内容（MIT），已按本库规则修改；版权声明见仓库根目录 THIRD_PARTY_NOTICES.md -->

# Core Philosophy

## Three Pillars

### Pillar 1: Emotional Intent
Define target emotion before choosing any property.

| Emotion | Character | Timing | Easing |
|---------|----------|--------|--------|
| Trust | Smooth, predictable | middle to slow end of the range | `--ease-out`, no bounce |
| Delight | Bouncy, surprising | middle of the range | Overshoot (`spring-pop`) |
| Urgency | Sharp, direct | fast end | Snappy `--ease-out` |
| Calm | Slow, flowing | slow end | `--ease-in-out`; sine for ambient loops |
| Surprise | Sudden, explosive | fast end | `--ease-out` |
| Confidence | Direct, decisive | middle of the range | Strong `--ease-out` |

"Range" is the element's duration range in `references/core/params.md`; how this group writes durations is explained in `references/build/intent.md`.

### Pillar 2: Visual Narrative

| Phase | Duration Share | Purpose |
|-------|--------------|---------|
| Setup | 20-30% | Establish context, prepare viewer |
| Action | 30-40% | Primary motion, hero moment |
| Resolution | 30-40% | Settle, breathe, confirm |

Even a 200ms tooltip fade has implicit setup→action→resolution.

### Pillar 3: Motion Craft
- Easing curves match emotional intent
- Duration proportional to element size and distance
- Arcs for organic, straight for mechanical
- Secondary motion (shadows, related elements)
- Nothing starts and stops all at once

## Three Motion Layers

| Layer | Role | Amplitude |
|-------|------|-----------|
| Primary | Main action viewer follows | 100% |
| Secondary | Supporting richness | 30-50% |
| Ambient | Background life | 10-20% |

- Secondary offset 30-80ms from primary, different easing
- Ambient is continuous/slow, never demands attention
- Primary-only animation feels flat; always add secondary + ambient — in the hero moment and on landing and brand pages. Routine product UI is primary-only by design, and the 克制，不回弹 personality runs no ambient layer

## The 1/3 Screen Rule
No motion travels >1/3 screen without intermediate keyframe. Break with direction changes, speed shifts, or arc adjustments.

## The Attention Budget
- One hero motion per scene moment
- Max 2-3 elements in active motion simultaneously
- Ambient doesn't count against budget
- Stagger rather than synchronize
