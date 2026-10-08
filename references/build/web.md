<!-- 第三方开源内容（MIT），已按本库规则修改；版权声明见仓库根目录 THIRD_PARTY_NOTICES.md -->

> **这份管什么**：在 Web 上（浏览器、PWA、WebView、Electron / Tauri）把一个动效从头写出来。按固定顺序做 7 个判断：该不该动 → 为什么动 → 用什么工具 → 动哪些属性 → 曲线和时长（或 spring）→ 打断和退场 → reduced-motion 和 hover 限制。
> **什么时候读**：配方挑好了、要动手写 Web 动效代码时。第 1 步就是「频率关」，任何动效都先过这一关，过不了就不写。
> **不管什么、去哪看**：常见组件的现成写法 → [web-recipes.md](web-recipes.md)；RN / Expo → `references/build/rn.md`；手势手感和 spring 物理 → `references/build/apple-feel.md`；组件细节 → `references/build/craft-details.md`；想让用户感觉什么 → `references/build/intent.md`；评审已有动效 → `references/review/motion-review.md`；落地页和品牌页的大型叙事动效 → `references/visual/new-page/references/motion.md`。
> **数值**：时长、曲线、spring 以 `references/core/params.md` 为准，下面的表和它是同一组值。项目已经由主入口第一步认过，这里不再重认；项目动效规格或 `DESIGN.md` 里已有的 token 锁定照用，不另起一套。
> **谁说了算**：项目 `CLAUDE.md` > 项目动效规格 > 项目 `DESIGN.md` / token > 用户明说的 > 这份文件。装任何 npm 包之前先问用户；项目里已有同类动效库就用它。

# Building Animations

<!-- 目录:开始（自动生成，别手改；改了标题就跑 python3 tools/toc.py） -->
**本文件目录**（全文 225 行；先看这里，再按行号只读用得上的那一节）

- 第 32–41 行：Operating Posture
- 第 43–49 行：Hard Rules
- 第 51–187 行：The Build Sequence
  - 第 53–66 行：1. Should this animate at all?
  - 第 68–81 行：2. What is the purpose?
  - 第 83–97 行：3. Pick the tool — cheapest that works
  - 第 99–112 行：4. Pick the properties
  - 第 114–159 行：5. Easing and duration — or a spring
  - 第 161–166 行：6. Interruption and exit
  - 第 168–187 行：7. Reduced motion and pointer gating
- 第 189–191 行：Recipes
- 第 193–211 行：Never Ship
- 第 213–221 行：Output
- 第 223–225 行：Tone
<!-- 目录:结束 -->

This file does ONE thing: turn a request for motion into an implementation that would survive a strict review. It does not audit a codebase (that's `references/review/motion-audit.md`), critique a diff (that's `references/review/motion-review.md`), hunt for places that could animate (that's `references/review/opportunities.md`), or build for React Native (that's `references/build/rn.md`).

## Operating Posture

You are a senior design engineer building the animation yourself. The bar is the one `references/review/motion-review.md` enforces. Write it so it passes that review the first time.

Two failure modes, and the first is worse:

1. **Animating something that shouldn't animate.** The gate below exists to produce zero lines of code sometimes. That's a success, not a dodge.
2. **Animating the right thing with the wrong ingredients** — `ease-in` on an entrance, `scale(0)`, keyframes on a toast, a duration that makes a dropdown feel sluggish.

Never present motion options as a menu. Make the call, state the reasoning in one line, write the code.

## Hard Rules

1. **Run the sequence in order.** Steps 1 and 2 gate everything. Don't reach for a curve before you know whether it animates at all.
2. **No approximated values.** Every curve, duration, and spring config comes from the tables below, which carry the same values as `references/core/params.md`. Never invent a Material-style `cubic-bezier` because it looks familiar.
3. **Extend the codebase's tokens, don't fork them.** If `--ease-out` or a duration scale already exists, use it. Adding a parallel system is a defect.
4. **Reduced motion and hover gating ship with the animation**, not as a follow-up.
5. **Cheapest tool that works.** Don't install a motion library for a fade. Before installing any npm package, ask the user; if the project already has an animation library, use that one.

## The Build Sequence

### 1. Should this animate at all?

| Frequency | Decision |
| --- | --- |
| 100+ times/day (keyboard shortcuts, command palette toggle) | **No animation. Ever.** Stop here. |
| Tens of times/day (hover effects, list navigation) | Near-imperceptible only — fast and subtle, or nothing |
| Occasional (modals, drawers, toasts) | Standard animation |
| Rare / first-time (onboarding, success, celebration) | The delight budget lives here |

**Keyboard-initiated actions are a disqualifier, not a judgment call.** Raycast has no open/close animation — that is correct for something opened hundreds of times a day.

Press feedback is the one thing that survives the top tier: a control pressed 100+ times a day still gets its 100–160ms press state, and nothing else.

If the request fails this gate, say so plainly and don't write the animation. Offer the non-motion alternative (instant state change, a static affordance) instead.

### 2. What is the purpose?

Name it in one of these words before continuing:

- **Feedback** — confirming the interface heard the user
- **Spatial consistency** — showing where something came from or went
- **State indication** — making a state change legible
- **Preventing a jarring change** — bridging content that would otherwise teleport
- **Explanation** — demonstrating how something works (marketing/onboarding only)
- **Delight** — allowed *only* at the rare/first-time tier

Can't name it? Don't build it. "It looks cool" on a frequently-seen element is a reason to stop.

Also check **function**: data the user is reading or acting on should not move for style. A decorative mouse-tracking effect belongs on a marketing page, not on a graph in a banking app.

### 3. Pick the tool — cheapest that works

Walk down; stop at the first that fits.

| Need | Tool |
| --- | --- |
| Hover, press, color, a state toggle you control with a class or attribute | **CSS transition** |
| Entry animation on mount, no JS state | **CSS `@starting-style`** |
| Predetermined motion that must stay smooth while the page is busy loading | **CSS animation** (runs off the main thread) |
| Programmatic control with CSS performance, no library | **WAAPI** (`element.animate()`) |
| Springs, layout animations, exit animations, gesture-driven values | **Motion** (`motion.dev`) |

CSS animations beat JS under load — they run off the main thread, while `requestAnimationFrame`-based animation drops frames while the browser loads, scripts, or paints. Use CSS for predetermined motion, JS for dynamic and interruptible motion.

If the task needs a *component* rather than an animation — a toast, a drawer, a command menu, a dropdown — stop and read `references/visual/pick-library.md`. Hand-rolling those is how you end up with a `<div>` dropdown and no focus management.

### 4. Pick the properties

- **`transform` and `opacity` only.** They skip layout and paint and run on the GPU. `width`/`height`/`margin`/`padding`/`top`/`left` trigger all three. (`clip-path` is the sanctioned fourth — see [web-recipes.md](web-recipes.md). `height` is tolerated only for accordions, where there's no transform equivalent.)
- **Never `scale(0)`.** Start from `scale(0.9–0.97)` + `opacity: 0`. Nothing in the real world appears from nothing.
- **`transform-origin` at the trigger** for popovers, dropdowns, menus, tooltips — `var(--transform-origin)` in Base UI. **Modals are exempt**; they're not anchored to a trigger, so they stay centered.
- **Percentages in `translate()`** are relative to the element's own size — `translateY(100%)` moves by its own height whatever the content. Prefer over hardcoded pixels.
- **In Motion, use the full transform string.** `x`/`y`/`scale` shorthands are not hardware-accelerated and drop frames under load:

```jsx
<motion.div animate={{ x: 100 }} />                          // drops frames under load
<motion.div animate={{ transform: "translateX(100px)" }} />  // hardware accelerated
```

- **Never drive a child's transform from a CSS variable on the parent** — it recalculates styles for every child. Set `transform` on the element directly.

### 5. Easing and duration — or a spring

**Easing**, in decision order:

| Situation | Easing |
| --- | --- |
| Entering or exiting | `ease-out` |
| Moving / morphing on screen | `ease-in-out` |
| Hover / color change | `ease` |
| Constant motion (marquee, progress) | `linear` |
| Default | `ease-out` |

**Never `ease-in` on UI.** It starts slow, delaying the exact moment the user is watching. `ease-out` at 200ms *feels* faster than `ease-in` at 200ms.

Built-in CSS easings are too weak. Use these:

```css
--ease-out: cubic-bezier(0.23, 1, 0.32, 1);        /* strong ease-out for UI */
--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);    /* strong ease-in-out for on-screen movement */
--ease-drawer: cubic-bezier(0.32, 0.72, 0, 1);     /* iOS-like drawer curve (Ionic) */
```

Need a curve that isn't here? Take it from [easing.dev](https://easing.dev/) or [easings.co](https://easings.co/). Don't hand-roll one. Add it to the project's motion spec as a named constant before using it; the three above stay the default set.

**Duration:**

| Element | Duration |
| --- | --- |
| Button press feedback | 100–160ms |
| Tooltips, small popovers | 125–200ms |
| Dropdowns, selects | 150–250ms |
| Modals, drawers | 200–500ms |
| Marketing / explanatory | Can be longer |

**UI animations stay under 300ms.** A 180ms dropdown feels more responsive than a 400ms one.

**Reach for a spring instead** when the motion is drag with momentum, an element that should feel alive, a gesture the user can interrupt or reverse, or decorative mouse-tracking:

```js
{ type: "spring", duration: 0.5, bounce: 0.2 }        // Apple-style — easier to reason about
{ type: "spring", mass: 1, stiffness: 100, damping: 10 }  // traditional physics — more control
```

The first line is the `spring-gesture` preset. The other two presets, `spring-ui` (no bounce, the default for anything not thrown by a gesture) and `spring-pop`, are in `references/core/params.md`.

Keep bounce at 0.1–0.3, and avoid bounce in most UI — reserve it for drag-to-dismiss and playful interactions.

### 6. Interruption and exit

- **Transitions, not keyframes, for anything triggered rapidly** — toasts, toggles, anything a user can fire twice in a second. Transitions retarget from the current value; keyframes restart from zero.
- **Springs for gestures**, because they carry velocity through an interruption.
- **Exit the way it entered.** A toast that slides in from the bottom leaves through the bottom. Symmetric paths are what make swipe-to-dismiss feel obvious.
- **Asymmetric timing where the user is deciding.** Slow on the deliberate phase (a hold-to-confirm press: 2s linear), snappy on the system response (release: 200ms ease-out).

### 7. Reduced motion and pointer gating

Ships with the animation, every time.

```css
@media (prefers-reduced-motion: reduce) {
  .element { animation: fade 0.2s ease; } /* keep opacity/color, drop transform-based motion */
}

@media (hover: hover) and (pointer: fine) {
  .element:hover { transform: scale(1.05); } /* touch fires false hovers on tap */
}
```

```jsx
const reduce = useReducedMotion();
const closedX = reduce ? 0 : '-100%';
```

Reduced motion means **fewer and gentler** animations, not zero — keep transitions that aid comprehension, remove movement and position changes.

## Recipes

For ready-to-build implementations of the common cases — button press, dropdown, tooltip, modal, drawer, toast, accordion, stagger, hold-to-confirm, tab indicator, scroll reveal, drag-to-dismiss — see [web-recipes.md](web-recipes.md). Load it whenever the request matches one of those components; start from the recipe rather than from a blank file.

## Never Ship

Self-check before you finish. Each of these is an automatic block in `references/review/motion-review.md`:

| Never | Instead |
| --- | --- |
| `transition: all` | Name the exact properties |
| `transform: scale(0)` entrance | `scale(0.95)` + `opacity: 0` |
| `ease-in` on a UI element | `ease-out` or a strong custom curve |
| Built-in `ease-out` on a deliberate animation | `cubic-bezier(0.23, 1, 0.32, 1)` |
| Animation on a keyboard shortcut or 100+/day action | No animation |
| UI duration over 300ms with no reason | 150–250ms |
| `transform-origin: center` on a trigger-anchored popover | `var(--transform-origin)` (modals exempt) |
| Keyframes on toasts, toggles, rapidly-triggered elements | CSS transitions |
| Animating `width`/`height`/`margin`/`padding`/`top`/`left` | `transform` / `opacity` |
| Motion `x`/`y`/`scale` props under load | Full `transform` string |
| Ungated `:hover` motion | `@media (hover: hover) and (pointer: fine)` |
| Missing `prefers-reduced-motion` | Gentler variant, not zero |
| Everything entering at once | 30–80ms stagger, whole group within 300ms |

## Output

Write the code. Then, in at most a few lines:

- **The gate result** — frequency tier and the named purpose. If something in the request was rejected, say which and why.
- **The ingredients** — tool, properties, curve, duration or spring config, in one line each.
- **What to feel-check** — if the result depends on feel you can't judge from code (a crossfade, a spring's bounce, the opacity/height balance in an entering list), say so and point at the check: play it at 2–5× duration or in the DevTools animation inspector, step it frame by frame, test gestures on a real device, and look again the next day with fresh eyes.

Don't pad this into a report. The code is the deliverable.

## Tone

Opinionated and brief. When the honest answer is "this shouldn't animate," give it — that answer is the reason the gate exists. When feel genuinely can't be settled from code, say so instead of guessing at a value.
