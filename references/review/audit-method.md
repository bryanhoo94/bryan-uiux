<!-- 第三方开源内容（MIT），已按本库规则修改；版权声明见仓库根目录 THIRD_PARTY_NOTICES.md -->

# Animation Audit Playbook

<!-- 目录:开始（自动生成，别手改；改了标题就跑 python3 tools/toc.py） -->
**本文件目录**（全文 129 行；先看这里，再按行号只读用得上的那一节）

- 第 22–33 行：1. Purpose & frequency
- 第 35–63 行：2. Easing & duration
- 第 65–75 行：3. Physicality & origin
- 第 77–86 行：4. Interruptibility
- 第 88–97 行：5. Performance
- 第 99–112 行：6. Accessibility
- 第 114–121 行：7. Cohesion & tokens
- 第 123–129 行：8. Missed opportunities
<!-- 目录:结束 -->

The eight audit categories, what to look for in each, and the exact target values to cite in findings and plans. Never approximate a value that appears here — copy it.

The curves, durations, and springs here are the same as `references/core/params.md`. If the two ever differ, `references/core/params.md` wins; a project's own motion spec overrides both.

## 1. Purpose & frequency

Every animation must answer "why does this animate?" — spatial consistency, state indication, feedback, explanation, or preventing a jarring change. "It looks cool" on a frequently-seen element is not a purpose.

| Frequency | Decision |
| --- | --- |
| 100+ times/day (keyboard shortcuts, command palette toggle) | No animation. Ever. |
| Tens of times/day (hover effects, list navigation) | Remove or drastically reduce |
| Occasional (modals, drawers, toasts) | Standard animation |
| Rare / first-time (onboarding, feedback, celebrations) | Can add delight |

Hunt for: animations on keyboard-initiated actions, command palettes with open/close transitions (Raycast has none — correct), decorative motion on list items or hover states hit constantly. The strongest fix is often **delete the animation**.

## 2. Easing & duration

Decision order for easing:

- Entering or exiting → **`ease-out`** (starts fast, feels responsive)
- Moving / morphing on screen → **`ease-in-out`**
- Hover / color change → **`ease`**
- Constant motion (marquee, progress) → **`linear`**
- Default → **`ease-out`**

**`ease-in` on UI is always a finding** — it starts slow, delaying the exact moment the user is watching. Built-in CSS easings are too weak for deliberate motion; plans should introduce strong custom curves (as tokens, matching repo conventions):

```css
--ease-out: cubic-bezier(0.23, 1, 0.32, 1);        /* strong ease-out for UI */
--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);    /* strong ease-in-out for on-screen movement */
--ease-drawer: cubic-bezier(0.32, 0.72, 0, 1);     /* iOS-like drawer curve */
```

Duration budgets — **UI animations stay under 300ms**:

| Element | Duration |
| --- | --- |
| Button press feedback | 100–160ms |
| Tooltips, small popovers | 125–200ms |
| Dropdowns, selects | 150–250ms |
| Modals, drawers | 200–500ms |
| Marketing / explanatory | Can be longer |

Hunt for: `ease-in` anywhere, bare `ease`/`linear` on entrances, durations > 300ms on UI elements, tooltip delay + animation on every tooltip in a toolbar (after the first, they should be instant).

## 3. Physicality & origin

- **Never `scale(0)`** — nothing in the real world appears from nothing. Target: `scale(0.9–0.97)` + `opacity: 0`.
- **Popovers/dropdowns/tooltips scale from their trigger**, not center:
  ```css
  .popover { transform-origin: var(--transform-origin); } /* Base UI */
  ```
  **Modals are exempt** — they appear centered; `transform-origin: center` is correct there. Do not report it.
- **Press feedback**: `transform: scale(0.97)` on `:active` with `transition: transform 160ms ease-out`. Keep it subtle (0.95–0.98).

Hunt for: `scale(0)`, pure-fade entrances with no initial transform, `transform-origin: center` (or none) on trigger-anchored elements, pressable elements with no press feedback.

## 4. Interruptibility

CSS **transitions** retarget from the current state mid-animation; **keyframes** restart from zero. Anything triggered rapidly or reversible mid-motion (toasts stacking, toggles, drags, expand/collapse) must use transitions or springs.

- Entry without JS: `@starting-style` (legacy fallback: a `data-mounted` attribute set in `useEffect`).
- Gesture-driven motion should use springs — they carry velocity when interrupted.
- Spring configs, Apple-style (recommended): `{ type: "spring", duration: 0.5, bounce: 0.2 }`. Keep bounce subtle (0.1–0.3); reserve visible bounce for drag-to-dismiss and playful moments. This config is the `spring-gesture` preset; `spring-ui` (bounce 0, the default for UI) and `spring-pop` (bounce 0.3, the ceiling, low-frequency actions only) are in `references/core/params.md`.
- **Asymmetric timing**: deliberate phases (press, hold, destructive confirm) animate slower; the system's response snaps. Symmetric timing on press-and-release is a finding.

Hunt for: `@keyframes` on toasts/toggles/rapidly-triggered UI, gesture handlers that tween with fixed-duration keyframes, drags without velocity-based dismissal (dismiss on `Math.abs(distance)/elapsedMs > ~0.11`, not distance thresholds alone), hard stops at drag boundaries instead of rising friction.

## 5. Performance

- **Animate `transform` and `opacity` only.** `width`/`height`/`margin`/`padding`/`top`/`left` trigger layout + paint + composite. `clip-path` is also allowed, and `height` only for expand/collapse — do not report those.
- **`transition: all`** animates unintended properties off-GPU — always a finding.
- **Framer Motion `x`/`y`/`scale` shorthands are not hardware-accelerated** — they run on the main thread and drop frames under load. Target: the full transform string, `animate={{ transform: "translateX(100px)" }}`.
- **Don't drive child transforms via a CSS variable on the parent** — it recalcs styles for all children. Set `transform` directly on the element.
- CSS (and WAAPI) beat rAF-based JS under load — use CSS for predetermined motion, JS/springs for dynamic and gesture-driven motion.
- Keep transition-time `filter: blur()` under 20px — heavy blur is expensive, especially in Safari.

Hunt for: `transition: all`, animated layout properties, Framer Motion shorthand props on busy pages, `setProperty('--x', …)` driving child transforms, rAF loops doing what CSS could.

## 6. Accessibility

```css
@media (prefers-reduced-motion: reduce) {
  .element { animation: fade 0.2s ease; } /* keep opacity/color, drop movement */
}
@media (hover: hover) and (pointer: fine) {
  .element:hover { transform: scale(1.05); } /* touch fires false hovers on tap */
}
```

Reduced motion means fewer and gentler animations, **not zero** — keep transitions that aid comprehension, remove position changes. In JS: `useReducedMotion()` and branch transform values.

Hunt for: movement with no `prefers-reduced-motion` handling, ungated `:hover` motion, reduced-motion implementations that nuke all feedback.

## 7. Cohesion & tokens

- Motion should match the product's personality — playful can be bouncier, a dashboard stays crisp. Mismatched personality across components is a finding.
- Curves and durations should live as shared tokens. Five hand-typed cubic-beziers that almost match is a consolidation finding.
- Everything-at-once group entrances where a **30–80ms stagger** belongs (the whole group's stagger adds up to ≤ 300ms; items past that enter together). Stagger is decorative — it must never block interaction.
- A jarring crossfade that shows two overlapping states can be masked with subtle `filter: blur(2px)` during the transition.

Hunt for: duplicated near-identical easings/durations, one bouncy component in a crisp app, list/grid entrances with no stagger, crossfades that visibly double-expose.

## 8. Missed opportunities

The additive category — places that don't animate but should.

Where to hunt, the four-question gate every candidate must pass, and what to reject are described in `references/review/opportunities.md`; use that file for this category.

Report at most a handful, grounded in actual UX seams you observed — not a wishlist.
