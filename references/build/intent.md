<!-- 第三方开源内容（MIT），已按本库规则修改；版权声明见仓库根目录 THIRD_PARTY_NOTICES.md -->

> **这份管什么**：动手写动效之前先想清楚三件事：想让用户感觉什么、这个项目是哪种动效人格、哪一刻是主角。再定多个元素怎么编排，一段动效怎么起承转合。
> **什么时候读**：项目第一次建动效规格，`SKILL.md` 第二步的三问要展开时；一屏里有好几样东西要一起动，需要排先后时；动效「能跑但没感觉」，要找原因时。
> **不管什么、去哪看**：具体数值 → `references/core/params.md`；怎么写代码 → `references/build/web.md`（Web）/ `references/build/rn.md`（RN / Expo）；用哪个配方 → `references/core/pick.md`；落地页的大型滚动叙事、粒子、WebGL 首屏 → `references/visual/new-page/references/motion.md` 和 `references/visual/new-page/references/hero-engines.md`。
> **数值**：这组文件不另立一套数。时长写成「该档的快端 / 中间 / 慢端」，档位、曲线、spring 都以 `references/core/params.md` 为准；项目有动效规格就用规格里的常量，项目有 `DESIGN.md` 就锁定它的 token。
> **人格**：写进项目动效规格的只有 `references/core/pick.md` 的三种（克制不回弹 / 有弹性 / 有表现力）。这组文件里的四种叫法只用来描述气质，按下表对过去。
>
> | 这组文件的叫法 | 写进规格的人格（`references/core/pick.md`） |
> |---|---|
> | Corporate | 克制，不回弹 |
> | Premium | 产品内页：克制，不回弹；落地页 / 品牌页：有表现力（仍然不回弹） |
> | Playful | 有弹性 |
> | Energetic | App 内：有弹性；落地页 / 品牌页：有表现力 |

# Motion Intent

<!-- 目录:开始（自动生成，别手改；改了标题就跑 python3 tools/toc.py） -->
**本文件目录**（全文 322 行；先看这里，再按行号只读用得上的那一节）

- 第 36–63 行：When to Apply
- 第 65–78 行：Quick Reference: 8-Step Checklist
- 第 80–99 行：Three Pillars (CRITICAL)
- 第 101–134 行：Motion Personality
- 第 136–153 行：Property Selection
- 第 155–175 行：Duration and Easing
- 第 177–213 行：Common Patterns
- 第 215–237 行：Choreography Essentials
- 第 239–255 行：Emotion-to-Motion Map
- 第 257–265 行：Weight Classification
- 第 267–283 行：Quality Rules
- 第 285–299 行：Troubleshooting Quick Reference
- 第 301–322 行：File Reference
<!-- 目录:结束 -->

## When to Apply

Use this chapter when:
- Creating UI animations (buttons, cards, modals, page transitions)
- Designing micro-interactions and feedback animations
- Building loading, success, or error states
- Animating illustrations or decorative elements
- Planning scroll-triggered or progress-based animations
- Establishing brand motion identity
- Choreographing multi-element sequences

**Decision tree:**
1. Does it serve a functional purpose (feedback, guidance)? → Timing rules for responsiveness
2. Does it express brand personality? → Motion Personality archetypes
3. Does it tell a story or guide attention? → Disney principles + choreography
4. Is this a complex multi-element scene? → 1/3 Rule + stagger patterns

**House rules that come first.** They override anything in this group of files:
- **Frequency gate**: an action a person does 100+ times a day gets no animation, press feedback only. **Purpose gate**: a motion that cannot name the question it answers is not built. Both are steps 1 and 2 of `references/build/web.md`.
- Animate `transform` and `opacity` only (`clip-path` allowed; `height` only for expand/collapse). A shadow that "moves" is a second shadow layer fading with `opacity`, not an animated `box-shadow`.
- Every animation has a reduced-motion form; hover effects sit behind `@media (hover: hover) and (pointer: fine)`.
- One highlight per screen; red only for errors and dangerous actions.
- Never `ease-in` on UI: an exit uses `--ease-out` like an entrance, only shorter.
- The project's motion spec comes before this group: if it already names a personality, constants, or an adopted recipe, use those.

**How durations are written in this group**: as a position inside the element's range in `references/core/params.md` — *fast end*, *middle*, *slow end* — never as a separate number system. A dropdown's range is 150–250ms, so its fast end is about 150ms and its slow end about 250ms. Only first-screen and scroll storytelling on landing and brand pages goes past a range.

---

## Quick Reference: 8-Step Checklist

Before creating any animation (after it has passed the frequency gate and the purpose gate):

1. **Emotional target?** — joy, calm, urgency, elegance
2. **Motion Personality?** — the one in the project's motion spec; if there is none yet: Playful, Premium, Corporate, Energetic, mapped as in the table at the top
3. **Primary property?** — position, scale, rotation, opacity
4. **Duration?** — the element's range in `references/core/params.md`
5. **Easing family?** — entrance and exit = `--ease-out`, on-screen movement = `--ease-in-out`
6. **Hero element?** — apply staging principles
7. **Secondary + ambient layers?** — add richness where the moment earns it
8. **1/3 rules?** — motion distance, simultaneous elements

---

## Three Pillars (CRITICAL)

Every animation must satisfy three pillars before any technical decisions:

| Pillar | Question | Drives |
|--------|----------|--------|
| **Emotional Intent** | What should the viewer FEEL? | Easing, timing, amplitude |
| **Visual Narrative** | What's the micro-story? | Setup → Action → Resolution |
| **Motion Craft** | How do we make it believable? | Physics, secondary motion, paths |

**Three motion layers** (flat animation = missing layers):
- **Primary**: Main action the viewer follows
- **Secondary**: Supporting richness (shadows, icons shifting)
- **Ambient**: Background life (gradients, subtle pulses)

Layers are a budget, not a quota. The hero moment of a screen and rare moments (first run, success, celebration) can carry all three. Routine product UI is primary-only, and the 克制，不回弹 personality runs no ambient layer.

> Deep dive: [intent/director/core-philosophy.md](intent/director/core-philosophy.md)

---

## Motion Personality

A project has ONE personality. Apply consistently. If the project's motion spec already names it, use that and do not pick again. The spec records one of the three in `references/core/pick.md`; the four archetypes below describe the character in more detail and map onto those three.

| Archetype | Maps to (`references/core/pick.md`) | Duration | Curve / spring | Keywords |
|-----------|-------------------------------------|----------|----------------|----------|
| **Playful** | 有弹性 | middle of the range | `--ease-out`; `spring-gesture`, `spring-pop` on confirmations | fun, whimsical, bouncy, cute |
| **Premium** | 克制，不回弹 in product UI; 有表现力 on landing and brand pages | slow end of the range | `--ease-out`, `spring-ui`; no bounce | elegant, minimal, luxury, sophisticated |
| **Corporate** | 克制，不回弹 | fast end to middle | `--ease-out`, `spring-ui`; no bounce | clean, professional, business, dashboard |
| **Energetic** | 有弹性 in an app; 有表现力 on landing and brand pages | fast end of the range | `--ease-out`; `spring-pop` (bounce 0.3 is the ceiling) | dynamic, energetic, bold, exciting |

**Default**: Corporate for UI, Playful for illustrations.

**Brand Motion Identity** — define three constants:
1. **Signature easing**: One curve for 80% of animations
2. **Duration palette**: 3 durations (quick / standard / slow)
3. **Entrance pattern**: One consistent entry style

These three are rows of the project's motion spec (`references/core/motion-spec-template.md`: 进出场曲线, 时长档, 统一进场方式). The curve is one from `references/core/params.md`, the three durations are picked inside its ranges, and all of it is written into the spec, not kept here.

**Material metaphor** — the motion spec asks for one beside the personality (for example "rigid metal, zero bounce"):

| Material | Duration | Spring |
|----------|----------|--------|
| Rigid (metal, stone) | slow end of the range | `spring-ui`, no bounce |
| Elastic (rubber, gel) | fast end of the range | `spring-pop` |
| Fluid (water, paint) | slow end of the range | `spring-gesture` |
| Paper (cards, sheets) | middle of the range | `spring-ui`; `spring-gesture` when thrown |
| Gas (smoke, fog) | ambient only, slowest | none |
| Glass (brittle) | fast end to middle | `spring-ui`, no bounce |

> Deep dive: [intent/director/motion-personality.md](intent/director/motion-personality.md)

---

## Property Selection

| Effect Goal | Primary Property | Secondary Properties |
|-------------|------------------|---------------------|
| Entrance/Exit | position | opacity, scale |
| Emphasis/Attention | scale | rotation (subtle), opacity pulse |
| State Change | opacity, color | scale (press feedback) |
| Direction/Flow | position | rotation (follow path) |
| Depth/3D Feel | scale + shadow | position (parallax) |
| Loading/Progress | rotation (spinner) | scale, opacity pulse |
| Success | scale (pop) | color, rotation (checkmark draw) |
| Error/Alert | position (shake) | color, rotation (wobble) |

**Simplicity threshold**: Use the minimum properties needed. One = direct. Two = polished. Three+ = potentially overwhelming.

> Deep dive: [intent/reference/property-selection.md](intent/reference/property-selection.md)

---

## Duration and Easing

Durations, curves, and springs are not defined in this group: take them from `references/core/params.md` (a project's motion spec overrides it). What this group adds is where to land inside a range:

**Distance scales duration**: 50px = 0.8x. 100px = base. 200px = 1.3x. 300px = 1.5x. 400px = 1.6x. Full screen = 1.8-2.0x. The result stays inside the element's range; a long travel sits at the slow end, it does not leave the range.

**Enter > Exit**: Entrances 30-50% longer than exits (an exit is 65-75% of its entrance). Users care about what appears. Both use `--ease-out`.

**Overshoot is a spring preset, not a percentage**: no bounce = `spring-ui`; a light settle = `spring-gesture`; a pop = `spring-pop`, the ceiling, low-frequency actions only.

| Context | Overshoot |
|---------|-----------|
| Success | `spring-pop` |
| Error | none |
| Feedback | none, or `spring-gesture` in a bouncy personality |
| Celebration (rare) | `spring-pop` |
| Premium | none |

**Looping ambient motion** (breathing, floating) is the one place this group keeps a curve outside the dictionary: a sine ease-in-out, so the loop is seamless. Constant motion (spinners, progress, marquees) is `linear`.

---

## Common Patterns

These show how the principles combine in one moment: what moves, in what order, on which layer. How to write them is in `references/build/web-recipes.md` and `references/build/rn-recipes.md`.

### Button Press (Playful)
1. **Anticipation**: Scale to 0.97 on press (`--ease-out`, inside the press range)
2. **Squash**: Scale to [1.04, 0.96] on release
3. **Follow through**: Overshoots to 1.02, settles to 1.0 (`spring-pop`)
4. **Secondary**: Shadow shrinks during press, icon shifts down 2px
5. **Where**: a low-frequency button such as a primary confirm. A button pressed all day gets the plain press scale and nothing else.

### Card Entrance (Premium)
1. **Start**: 20px below target, opacity 0
2. **Path**: Slight curve (10px X offset at midpoint)
3. **Easing**: `--ease-out` deceleration
4. **Follow through**: Shadow arrives 50ms after card
5. **Secondary**: Content fades in 50-80ms after card lands
6. **Staging**: Other cards dim to 80%

### Success State (Playful)
1. **Primary**: Scale pop with `spring-pop`
2. **Secondary**: Checkmark draws in
3. **Ambient**: Subtle particle burst (a rare-moment extra)
4. **Color**: Green fill
5. **Total**: the pop and the checkmark land within 300ms

### Error Shake (Corporate)
1. **Primary**: Position oscillates 2-3 times, ±10-15px horizontal
2. **Easing**: `--ease-in-out` for sharp stops
3. **Color**: Red tint
4. **Total**: within 300ms
5. **No overshoot**: Errors feel firm
6. **Never alone**: the message still says what went wrong and what to do next (`references/ux/ux-laws.md`)

> More patterns: [intent/patterns/entrance-exit.md](intent/patterns/entrance-exit.md) | [intent/patterns/state-feedback.md](intent/patterns/state-feedback.md)

---

## Choreography Essentials

**Coordinated entry**:
- Lead with the hero — primary element enters first or most prominently
- Spatial consistency — all elements enter from same direction
- Counter-motion — hero moves right → ambient moves left at 20-30% speed

**1/3 Rule (distance)**: No motion travels more than 1/3 of screen without a keyframe change.

**1/3 Rule (elements)**: With 3+ elements, no more than 1/3 in active motion simultaneously.

**Stagger budget**: 30–80ms per item and ≤ 300ms for the whole group; items past the budget enter together (`references/core/params.md`).

| Pattern | Delay | Use Case |
|---------|-------|----------|
| Micro cascade | low end of the range | List items, grid cells |
| Standard | middle to high end | Cards, panels, nav |
| Wave | low end to middle | Data visualizations |
| Dramatic | wider than the range | Hero sections on landing and brand pages only |

> Deep dive: [intent/director/choreography.md](intent/director/choreography.md)

---

## Emotion-to-Motion Map

| Emotion | Character | Path | Curve / spring | Duration |
|---------|-----------|------|----------------|----------|
| Joy | Bouncy, arcs | Curved, upward | `spring-pop` | middle of the range |
| Calm | Smooth, flowing | Gentle curves | `--ease-in-out` | slow end |
| Urgency | Sharp, fast | Straight lines | `--ease-out` | fast end |
| Sadness | Slow, downward | Drooping curves | `--ease-in-out` | slow end |
| Surprise | Sudden, expanding | Radial outward | `--ease-out` | fast end |
| Elegance | Slow, controlled | Long arcs | `--ease-out`, `spring-ui` | slow end |
| Playfulness | Bouncy, irregular | Arcs, squiggly | `spring-gesture`, `spring-pop` | middle of the range |

**Path as language**: Angular = tense. Curved = friendly. Spiral = whimsical. Diagonal = purposeful. Vertical = growth/weight. Horizontal = progress.

> Deep dive: [intent/director/emotion-mapping.md](intent/director/emotion-mapping.md)

---

## Weight Classification

| Weight | Examples | Duration | Overshoot | Easing |
|--------|----------|----------|-----------|--------|
| Heavy | Modals, overlays | 300-500ms | none (`spring-ui`) | Gentle, high damping |
| Medium | Cards, panels | 200-300ms | none; `spring-gesture` in a bouncy personality | Moderate |
| Light | Tooltips, badges, icons | 125-200ms | none; `spring-pop` for a rare confirmation | Responsive |

---

## Quality Rules

### CRITICAL — never break
1. **Never linear for spatial movement** — always use easing curves (linear only for spinners, progress bars)
2. **Never opacity-only** for important state changes — combine with position or scale (the reduced-motion form is the exception: it keeps opacity and colour only)
3. **Never exceed 1/3 screen** without intermediate keyframe
4. **Always three motion layers** — primary + secondary + ambient — in the hero moment and on landing and brand pages. Routine product UI is primary-only by design

### HIGH — strongly follow
1. Match duration to element type (`references/core/params.md`)
2. Use directional easing (`--ease-out` for entrance and exit, `--ease-in-out` on screen; never `ease-in`)
3. Apply Disney principles (especially anticipation, follow-through)
4. Maintain consistent personality across scene

> Full checklist: [intent/reference/quality-checklist.md](intent/reference/quality-checklist.md)

---

## Troubleshooting Quick Reference

| Problem | Likely Cause | Fix |
|---------|-------------|-----|
| Looks robotic | Linear easing or no arcs | Add easing curves + arc paths |
| Feels too slow | Duration too long for element type | Check the range in `references/core/params.md`, use `--ease-out` |
| Feels cheap/flat | Missing secondary + ambient | Add shadow motion + background life, where the moment earns it |
| Too distracting | Too many elements moving | Apply 1/3 rule, reduce amplitude |
| No personality | Generic easing everywhere | Apply personality archetype consistently |

When the user describes the problem in their own words (too bouncy, too stiff, too slow, not following the finger), the tuning table at the end of `references/core/params.md` says which constant to change.

> Deep dive: [intent/reference/troubleshooting.md](intent/reference/troubleshooting.md)

---

## File Reference

**Philosophy** (intent/director/):
- [core-philosophy.md](intent/director/core-philosophy.md) — Three Pillars deep dive
- [decision-framework.md](intent/director/decision-framework.md) — Full decision pipeline
- [disney-principles.md](intent/director/disney-principles.md) — 12 principles, UI-adapted
- [motion-personality.md](intent/director/motion-personality.md) — 4 archetypes + brand identity
- [emotion-mapping.md](intent/director/emotion-mapping.md) — Emotion → motion + color psychology
- [choreography.md](intent/director/choreography.md) — Multi-element coordination
- [narrative-structure.md](intent/director/narrative-structure.md) — Micro-story framework
- [context-adaptation.md](intent/director/context-adaptation.md) — Platform, a11y, performance

**Reference** (intent/reference/):
- [property-selection.md](intent/reference/property-selection.md) — Property communication guide
- [troubleshooting.md](intent/reference/troubleshooting.md) — Animation smells + fixes
- [quality-checklist.md](intent/reference/quality-checklist.md) — Evaluation criteria

**Patterns** (intent/patterns/):
- [entrance-exit.md](intent/patterns/entrance-exit.md) — Entrance/exit recipes
- [state-feedback.md](intent/patterns/state-feedback.md) — Success, error, loading, hover
- [ambient-continuous.md](intent/patterns/ambient-continuous.md) — Looping, breathing, parallax
- [multi-element.md](intent/patterns/multi-element.md) — Stagger + choreography recipes
