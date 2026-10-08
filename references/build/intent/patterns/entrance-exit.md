<!-- 第三方开源内容（MIT），已按本库规则修改；版权声明见仓库根目录 THIRD_PARTY_NOTICES.md -->

# Entrance & Exit Patterns

These patterns say what moves, from where, and in what order. Curves, springs, and duration ranges are the ones in `references/core/params.md`; the code is in `references/build/web-recipes.md` and `references/build/rn-recipes.md`. An exit uses `--ease-out` like an entrance, only shorter — never `ease-in`.

## Entrance Strategies

### 1. Direct Entrance (Slide In)
- Position + opacity; offset 20-40px + opacity 0 → final position + opacity 1
- Easing: `--ease-out`; duration 200-300ms

| Personality | Offset | Easing | Overshoot |
|------------|--------|--------|-----------|
| Playful | 30-50px | `spring-gesture` | from the preset |
| Premium | 15-25px | `--ease-out` | none |
| Corporate | 20-30px | `--ease-out` | none |
| Energetic | 40-80px | `spring-pop` | from the preset, the ceiling |

Direction: below=arrival, right=forward, left=back, above=dropdown/authority.

### 2. Emergent Entrance (Scale In)
- Scale + opacity; start 85-95% + opacity 0 → 100% + opacity 1; never from scale 0
- Duration: the element's range — small popover and tooltip 125-200ms, dialog 200-500ms, anything else ≤ 300ms
- Popovers, tooltips, and dropdowns scale from their trigger (`transform-origin`); a dialog stays centered

| Personality | Start Scale | Easing | Overshoot |
|------------|------------|--------|-----------|
| Playful | 70-80% | `spring-gesture` | from the preset |
| Premium | 95-98% | `--ease-out` | none |
| Corporate | 90-95% | `--ease-out` | none |
| Energetic | 50-70% | `spring-pop` | from the preset, the ceiling |

Best for: modals, dialogs, notifications, popovers, tooltips.

### 3. Reveal Entrance (Clip/Mask)
- clip-path or mask + opacity; `--ease-out`; ≤ 300ms in product UI, 300-500ms and longer as a storytelling reveal on landing and brand pages
- Directions: top-to-bottom (dramatic), L-to-R (reading order), center-out (focus), edge-in (contained)

### 4. Assembled Entrance (Multi-Part)
- Parts arrive from different positions; stagger 30-80ms; whole group ≤ 300ms (a logo build on a landing or brand page may run longer)
- Best for: icon assembly, logo builds, data viz construction

## Exit Strategies

**Rule**: Exits = 65-75% of entrance duration.

### 1. Direct Exit (Slide Out)
- Offset 20-40px + opacity 0; `--ease-out`; 150-250ms

### 2. Dissolve Exit (Fade Out)
- Opacity (+ optional scale to 98%); `--ease-out`; 150-250ms
- Best for: gentle departures, backgrounding, crossfades

### 3. Collapse Exit (Shrink Out)
- Scale 85-95% + opacity 0; `--ease-out`; 150-250ms
- Best for: deletion, closing modals, dismissal

### 4. Transfer Exit (Move Away)
- Position toward destination + scale shrink; `--ease-in-out`; 250-300ms
- Best for: add-to-cart, save-to-collection, move-to-folder

## Entrance-Exit Continuity
- Eye follows naturally from exit to entrance
- Exit point near entry point when possible
- 100-150ms timing overlap between exit and entrance
- Same easing family for paired entrance-exit

## Common Recipes

### Notification Slide-In
1. Slide from right + opacity (250ms, `--ease-out`)
2. No overshoot (corporate) or `spring-gesture` (playful)
3. Icon appears (100ms, 50ms delay)

### Toast Dismiss
1. Slide toward the edge it entered from + opacity (180ms, `--ease-out`)
2. Remaining toasts shift up (200ms, `--ease-in-out`)

### Dropdown Open
1. Scale 95%→100% + opacity, origin at the trigger (200ms, `--ease-out`)
2. Items stagger fade in (30ms apart, 50ms after container)

Phone view: the dropdown becomes a bottom sheet (`references/core/platforms.md` section 2.2) and moves with `--ease-drawer`.

### Page Transition (Forward)
1. Current page slides left + fades (300ms, `--ease-out`)
2. New page from right + fades in (400ms, `--ease-out`, 100ms delay)
3. Shared elements morph (400ms, `--ease-in-out`)
