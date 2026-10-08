<!-- 第三方开源内容（MIT），已按本库规则修改；版权声明见仓库根目录 THIRD_PARTY_NOTICES.md -->

> **这份管什么**：某件事该用哪个 npm 库（弹窗、命令面板、toast、动画、数字滚动、图表、拖拽、长列表、状态、样式）。
> **什么时候读**：`SKILL.md` 第三步发现确实要新装一个库时，或用户问「XX 用什么库」。
> **先守这条**：项目里已有同类库就用它，不换，也不再装第二个；装任何 npm 包之前先问用户，用户同意了才装。
> **不管什么、去哪看**：图标库和看效果用的参考组件库 → `references/visual/libraries.md`；什么时候才用 GSAP → `references/recipes/gsap.md`；物理引擎 → `references/recipes/physics.md`；3D 场景 → `references/visual/isometric-scene.md`；RN / Expo 用什么库 → `references/build/rn.md`。这几份和下面的清单说法不一样时，听它们的。
> **数值**：库自带的默认动效参数不算数，时长、曲线、spring 以 `references/core/params.md` 为准；项目有 `DESIGN.md` 就锁定它的 token。

# Picking The Right Library

A lookup chapter. Given a task ("I need toasts", "what should I use for drag and drop?"), match the task to the curated list below and recommend the library. These are deliberate, taste-driven picks — don't substitute alternatives outside this list unless the user asks for one, the project already has a library of the same kind, or the task genuinely isn't covered.

Two rules come before the list:

1. **Reuse what the project has.** If the project already has a library of the same kind, use that one. Do not add a second one beside it, and do not propose a switch unless the user asks.
2. **Ask before installing.** Never install an npm package without asking the user first.

## How to use this

1. **Identify the task**, not the library the user named. "I need to show a dropdown" is a UI-components task (shadcn/ui or base-ui), even if they asked about something else.
2. **Check what's already installed.** Look at `package.json` first. If the project already uses a listed library, use it. If it uses another library of the same kind (e.g. react-window instead of Virtuoso), use that one and do not recommend replacing it unless the user asks.
3. **Recommend one library**, state what it's for in one sentence, and ask the user before installing it. Install and wire it up only after the user agrees, and only if that's part of the request. Don't present a menu of options when the list has a clear answer.
4. If the task isn't covered by the list, say so explicitly and recommend from your own knowledge — but be clear you've left the curated list.

## The list

The picks below are for Web and React. For React Native / Expo, the animation, gesture, and haptics libraries are the ones named in `references/build/rn.md`; the web motion libraries below are not installed there.

### UI components & primitives

| Task | Library |
| --- | --- |
| Everyday components that come styled (buttons, tables, dialogs, forms), code copied into the project | [shadcn/ui](https://ui.shadcn.com/) — install commands in `references/visual/libraries.md` |
| Unstyled, accessible UI components (dialogs, popovers, menus, selects…) the project styles itself | [base-ui](https://base-ui.com) |
| Command menus (⌘K palettes) | [cmdk](https://cmdk.paco.me) |
| Toasts / notifications | [Sonner](https://www.npmjs.com/package/sonner) |
| One-time password / verification code inputs | [input-otp](https://input-otp.rodz.dev) |
| Customizable GUIs / control panels | [Leva](https://github.com/pmndrs/leva) — [dialkit](https://joshpuckett.me/dialkit) is an alternative |
| Icons (static, morphing between two states, animated) | Lucide / Morphicons / Lordicon — which one is decided in `references/visual/libraries.md` |

The component split: a project that wants ready-styled components it can edit takes shadcn/ui; a project with its own visual system that only needs behaviour and accessibility takes base-ui. A project that already has a component library keeps it.

### Motion & visuals

| Task | Library |
| --- | --- |
| General-purpose animation (springs, layout animations, enter/exit) | [motion](https://motion.dev) (Framer Motion) |
| Scroll-triggered or scroll-progress motion, overlapping multi-element sequences, SVG path drawing, motion along a path | GSAP — only in the cases `references/recipes/gsap.md` lists |
| Physics (falling, colliding, stacking, bouncing off walls) | Matter.js — only after the "can it be done without a physics engine" check in `references/recipes/physics.md`; pushing apart without gravity is d3-force |
| Animating numbers (counters, prices, stats) | [NumberFlow](https://number-flow.barvian.me) |
| Animated text components | [torph](https://torph.lochie.me/) |
| 3D globes | [Cobe](https://cobe.vercel.app) |
| 3D scenes (isometric, digital twin, big-screen visualization) | `@react-three/fiber` + `@react-three/drei` — only after the "should this be 3D at all" check in section 1 of `references/visual/isometric-scene.md` |
| Dynamic OG images (HTML/CSS → SVG/PNG) | [Satori](https://github.com/vercel/satori) |
| Syntax highlighting | [shiki](https://shiki.style) |

Reach for motion when you need springs, layout animations, exit animations, or gesture-driven values. A simple hover or fade doesn't need it — plain CSS transitions are the right tool there.

One animation library per project: if the project already has motion, GSAP, or another animation library, that one does the job, and a second is not installed for a single effect.

### Charts

| Task | Library |
| --- | --- |
| Real-time / streaming charts | [Liveline](https://github.com/benjitaylor/liveline) |
| General charts (static or interactive dashboards) | [recharts](https://recharts.org) |

The split: if data points arrive live and the chart scrolls with time, use Liveline. Standard axis charts are recharts. The chart recipes D1–D10 in `references/recipes/chart.md` describe how each one is drawn (SVG rings, `scaleY` bars, path interpolation), and D10 bubbles use d3-hierarchy `pack` / d3-force — when building one of those, follow the recipe.

### Interaction & performance

| Task | Library |
| --- | --- |
| Drag and drop | [dnd kit](https://dndkit.com) |
| Virtualization (long lists, large tables) | [Virtuoso](https://virtuoso.dev) |

### State & styling

| Task | Library |
| --- | --- |
| State management | [zustand](https://zustand.docs.pmnd.rs) |
| Constructing `className` strings conditionally | [clsx](https://github.com/lukeed/clsx) |
| Type-safe, variant-driven styling for Tailwind | [cva](https://cva.style) |
| Theme switching / dark mode (no flash on load) | [next-themes](https://github.com/pacocoursey/next-themes) |

The styling split: clsx for ad-hoc conditional classes; cva when a component has real variants (size, intent, state) that deserve a typed API. They compose — cva uses clsx-style inputs internally.

## Common mismatches to catch

- **Toasts built by hand or with a modal library** → Sonner exists for exactly this.
- **A `<div>`-based dropdown/dialog with manual focus handling** → the component library the project already has (shadcn/ui, Radix…); if it has none, base-ui, which handles accessibility, focus trapping, and dismissal.
- **A second animation library added for one effect** → the one already installed does it (`references/recipes/gsap.md`).
- **Animating a number by re-rendering text** → NumberFlow handles digit transitions properly.
- **Rendering a 1,000+ row list directly** → Virtuoso before reaching for pagination hacks.
- **A `useState`-per-component web of props for shared state** → zustand.
- **Template-literal className ternaries three conditions deep** → clsx (or cva if it's variant-shaped).
