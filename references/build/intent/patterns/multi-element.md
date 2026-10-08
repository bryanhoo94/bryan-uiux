<!-- 第三方开源内容（MIT），已按本库规则修改；版权声明见仓库根目录 THIRD_PARTY_NOTICES.md -->

# Multi-Element Patterns

These patterns say what moves and in what order. Curves, springs, duration ranges, and the stagger budget (30–80ms per item, ≤ 300ms for the whole group, items past the budget enter together) are the ones in `references/core/params.md`; the code is in `references/build/web-recipes.md` and `references/build/rn-recipes.md`.

## Stagger Recipes

### List Items
- Slide up 20px + fade (200ms, `--ease-out`); stagger 40-60ms; whole group ≤ 300ms, so with 8 items the last ones enter together

| Personality | Duration | Stagger | Easing |
|------------|---------|---------|--------|
| Playful | 250ms | 60ms | `spring-gesture` |
| Premium | 300ms | 80ms | `--ease-out` |
| Corporate | 200ms | 50ms | `--ease-out` |
| Energetic | 150ms | 30ms | `--ease-out` |

### Grid Cards
- Scale from 95% + fade (250ms, `--ease-out`); stagger 50-80ms reading order; +20ms per new row; whole group ≤ 300ms
- Shadow 50ms after card. Alt patterns: center-out, column-first, random

### Navigation Items
- Slide from side + fade (180ms, `--ease-out`); stagger 30-50ms; total <300ms

### Dashboard Widgets
```
1 — Skeletons visible
2 — Hero metric first (250ms, --ease-out)
3 — Widgets follow (200ms each, 60ms stagger, whole group ≤ 300ms)
4 — Chart draws once the hero has landed (300ms)
5 — Ambient pulse begins, only where the personality has an ambient layer
```

Play this entrance once per session, not on every open (`references/recipes/chart.md`).

## Coordinated Sequences

### Modal with Content
0ms: backdrop dims (200ms) → 50ms: modal scales 95%→100% (300ms) → 200ms: title → 250ms: body → 300ms: buttons → 350ms: close button. Content in reading order, the whole sequence inside the 200-500ms range of a dialog.

### Tab Switch
0ms: indicator slides (250ms, `--ease-in-out`) + old fades (150ms) → 100ms: new content from tab direction (200ms) → 150ms: elements stagger (40ms). Tabs switched tens of times a day keep only the indicator and a content fade, no element stagger.

### Accordion
Expand: arrow rotates (150ms) + height expands (250ms) + content fades at 50ms (200ms); siblings shift (200ms). Collapse: reverse, `--ease-out`, shorter.

### Page Transition
Current slides left+fades (300ms, `--ease-out`) → new from right (400ms, `--ease-out`, 100ms delay) → hero scales in → content staggers (50ms). Optional shared element morph (400ms).

### Drag and Drop
Drag: lift (scale 1.03, 150ms); others make room with `spring-ui`. Drop: settle to scale 1.0 with a spring (`spring-ui`, or `spring-gesture` in a bouncy personality); gaps close. Everything tied to the gesture is a spring, so it can be grabbed again mid-flight. Full recipe: F2 in `references/recipes/feedback.md`.

## Choreography Rules

### Timing Overlap
0%=methodical | 25%=brisk (standard) | 50%=fluid | 75%=rapid (energetic)

### Group Rules
- Same easing family; different durations/delays fine
- Exception: secondary/ambient can differ

### Shared Origin
Motion from trigger point; closer=first; farther=more delay

### Counter-Motion

| Hero Does | Counter-Motion |
|-----------|---------------|
| Slides right | Background left (20-30%) |
| Scales up | Shadow spreads |
| Lifts up | Shadow drops+softens |
| Rotates CW | Ambient CCW |
| Expands | Siblings compress |
