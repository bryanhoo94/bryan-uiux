<!-- 第三方开源内容（MIT），已按本库规则修改；版权声明见仓库根目录 THIRD_PARTY_NOTICES.md -->

# Narrative Structure

## Four-Act Structure

### Act 1: Anticipation (10-20%)
- Wind-up: small motion opposite to main direction
- Gathering: elements pull together before dispersing
- Dimming: context fades for focus; Tension: hold compressed ~50ms
- Skip for <150ms interactions and hover states

### Act 2: Action (30-50%)
Peak energy. The primary communicative motion.
- Fast+direct (sharp easing) → alerts
- Smooth+flowing (gentle easing, curves) → transitions
- Explosive+expanding (`--ease-out`, radial) → celebrations
- Controlled+precise (`--ease-in-out`, no overshoot) → data charts

### Act 3: Reaction (10-20%)
- Shadows adjust: 30-80ms after primary
- Siblings shift: 30-80ms after primary
- Environment ripples: later still, the whole reaction inside the 300ms stagger budget
- Counter-motion: simultaneous with action
- Skip for simple toggles/checkboxes

### Act 4: Resolution (20-30%)
- Overshoot settle (a spring preset from `references/core/params.md`); opacity reaches final (`--ease-out`)
- 100-200ms breathing room before next motion
- Even 50ms of settling transforms the feel

## Scaling to Duration

| Total | Anticipation | Action | Reaction | Resolution |
|-------|-------------|--------|----------|------------|
| 100-200ms | skip | 60-70% | skip | 30-40% |
| 200-300ms | 10-15% | 40-50% | 10-15% | 25-30% |
| 300-500ms (full-screen change, drawer, dialog) | 15-20% | 30-40% | 15-20% | 20-25% |
| longer (first-screen and scroll storytelling on landing and brand pages) | 20% | 30-35% | 15-20% | 25-30% |

The total is the element's duration from `references/core/params.md`; the acts divide it, they do not extend it.

## Multi-Beat Narratives

Transitions: overlap (fluid) | sequential (clear) | simultaneous (parallel)

Progressions:
- **Build-Up**: low → rising → peak → settling
- **Cycle**: depart → peak → return → repeat
- **Impact**: sudden action → ripple → slow settle

## By Personality

| Personality | Anticipation | Action | Resolution |
|------------|-------------|--------|------------|
| Playful | Exaggerated wind-up | Bouncy, overshoot | Wobble settle |
| Premium | Subtle tension | Smooth, controlled | Elegant ease |
| Corporate | Minimal/none | Direct, efficient | Clean stop |
| Energetic | Quick gather | Explosive | Fast snap |

## Common Patterns

- **Reveal**: tension (dim, scale 95%) → emerge (100%, full opacity) → surroundings adjust → settled
- **Departure**: gather (scale 98%) → exit → close gap → layout settles
- **Transformation**: destabilize (vibration) → morph → secondary appears → new state breathing
- **Celebration**: compress (50-100ms) → burst (scale, particles) → settle → calm with positive state
