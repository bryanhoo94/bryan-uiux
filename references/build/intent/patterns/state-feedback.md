<!-- 第三方开源内容（MIT），已按本库规则修改；版权声明见仓库根目录 THIRD_PARTY_NOTICES.md -->

# State & Feedback Patterns

<!-- 目录:开始（自动生成，别手改；改了标题就跑 python3 tools/toc.py） -->
**本文件目录**（全文 120 行；先看这里，再按行号只读用得上的那一节）

- 第 21–36 行：Button Press
- 第 38–50 行：Hover States
- 第 52–55 行：Toggle / Switch
- 第 57–73 行：Success State
- 第 75–91 行：Error State
- 第 93–105 行：Loading States
- 第 107–110 行：Warning State
- 第 112–115 行：Disabled / Enabled
- 第 117–120 行：Focus States
<!-- 目录:结束 -->

These patterns say what moves and on which layer. Curves, springs, and duration ranges are the ones in `references/core/params.md`; the code is in `references/build/web-recipes.md` and `references/build/rn-recipes.md`. Press feedback is the one motion that survives the frequency gate: an action done 100+ times a day gets the press scale and nothing more.

## Button Press

Press feedback sits in the press range, 100-160ms.

### Playful
- Press: scale 0.95 (`--ease-out`); Release: overshoot to 1.05 and settle at 1.0 (`spring-pop`)
- Secondary: shadow shrinks/grows; color darkens/brightens
- The overshoot is for low-frequency buttons only

### Premium
- Press: scale 0.98; Release: 1.0 (`--ease-out`, no overshoot)
- Opacity dims to 90% on press

### Corporate
- Press: scale 0.97; Release: 1.0; no overshoot
- Background darkens 10%

## Hover States

| Element | Effect | Duration |
|---------|--------|----------|
| Button | Scale 1.02-1.05 | <100ms |
| Card | Scale 1.01-1.02 + shadow lift | <100ms |
| Link | Color change + underline | <100ms |
| Icon | Scale 1.1 + rotation 2-5° | <100ms |
| Image | Scale 1.03 (overflow hidden) | 150ms |

Hover enter <100ms; hover exit 150-200ms (slower = polished). Hover and colour changes use `ease`.

All hover motion sits behind `@media (hover: hover) and (pointer: fine)`. On touch there is no hover: what hover reveals is shown on tap or is always visible (`references/core/platforms.md` section 2.2). A "shadow lift" is a second shadow layer fading in with `opacity`. Rows in a list people scan tens of times a day change colour only.

## Toggle / Switch
- Thumb slides (120-180ms, `--ease-in-out`); track color transitions simultaneously
- Slight squash in movement direction
- Playful: bounce at destination; Premium: smooth, no overshoot

## Success State

### Checkmark Success
1. Container: scale 0.9→1.0 (`spring-pop`)
2. Checkmark: stroke draw (150ms, `--ease-out`, 100ms delay)
3. Color: to green (200ms); ambient glow/particles (300ms), a rare-moment extra
4. Total: the pop and the checkmark land within 300ms

### Confirmation Badge
1. Badge scales from 0.9 + opacity (`spring-pop`)
2. Text fades in (150ms, 50ms delay)
3. Background pulse (300ms, once)

### Payment Success
1. Spinner → checkmark crossfade (200ms)
2. Checkmark draws (200ms); container → success color (200ms)
3. Text fades in (200ms, 100ms delay); optional confetti, once, for a rare moment

## Error State

### Error Shake
- Horizontal oscillation ±10-15px, 2-3 cycles decreasing amplitude
- `--ease-in-out`, within 300ms total; red tint; no overshoot; settles at origin
- A shake never stands alone: the message says what went wrong and what to do next (`references/ux/ux-laws.md`)

### Inline Validation
1. Error text slides down + fades in (200ms)
2. Border → red (150ms); icon scales in (150ms, 50ms delay)
3. Optional single shake (200ms)

### Form Submission Error
1. Button returns to normal (200ms)
2. Error message slides in (250ms)
3. Affected fields highlight red (150ms, staggered 30ms)
4. Smooth scroll to first error (300ms, `--ease-in-out`)

## Loading States

### Spinner
- Continuous 360°, linear, 1000-1500ms/rev; optional breathing pulse (2-3s)

### Skeleton
- Gradient sweep L→R, 1500-2000ms; base 10-20% opacity, peak 30-40%; the sweep is a layer moved with `transform`, not an animated `background-position`

### Progress Bar
- `transform` (`scaleX`), not width; `linear` while it tracks real progress; optional color milestones + shimmer

### Indeterminate
- Oscillating position/`scaleX`, 1500-2500ms, sine ease-in-out (a loop); continuous, never frantic

## Warning State
1. Yellow/amber border (150ms)
2. Warning icon scales in (150ms; subtle overshoot with `spring-gesture` where the personality allows bounce)
3. Optional icon pulse (2-3s, sine), a few pulses and then still, not an endless loop; text fades in (200ms, 50ms delay)

## Disabled / Enabled

- **Disabling**: opacity to 50-60% (200ms); optional scale to 98%
- **Enabling**: opacity to 100% (200ms); optional scale pulse 98%→100%

## Focus States
- Focus ring: scale 95%→100% + opacity (150ms), for focus that follows a pointer or is set by the page
- Card focus: scale 1.01, shadow increase (150ms)
- Tab nav focus: the ring appears at once, with no animation — keyboard-initiated actions are not animated; must work with reduced-motion
