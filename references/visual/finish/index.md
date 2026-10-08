<!-- 第三方开源内容（Apache-2.0），本文件已修改；版权声明和许可证全文见仓库根目录 THIRD_PARTY_NOTICES.md -->

> **这份管什么**：收尾阶段的入口。页面已经做出来了，这里负责挑毛病、修缺陷：`critique`（体验评审，打分）、`audit`（技术检查：无障碍、性能、响应式）、`polish`（最后过一遍），外加一组定向修（`typeset` `colorize` `layout` `bolder` `quieter` `distill` `clarify` `adapt` `harden` `onboard` `optimize` `delight` `overdrive` `extract`）。
> **什么时候读**：用户说「挑毛病 / 打磨一下 / 上线前检查」，或者只想修一样（字体、配色、太挤、太吵、文案看不懂、手机上坏了、很卡）。项目已经在主入口 `SKILL.md` 第一步认过了，这里不再重认。
> **不管什么、去哪看**：从零做新页面 → `references/visual/new-page/index.md`；改版 → `references/visual/redesign/index.md`；写 `PRODUCT.md`（`init`）→ `references/core/product-brief.md`；写 `DESIGN.md`（`document`）→ `references/core/design-doc.md`；写动效 → `references/build/web.md`；结构和摩擦 → `references/ux/ux-laws.md`。
> **数值和规矩**：动效数值以 `references/core/params.md` 为准；项目有 `DESIGN.md` 就锁定它的 token，这里只动结构和层级，只修缺陷，不换方向。

This is the finishing stage of this skill. The surface already exists and its direction is settled; the work here is to find what is wrong with it and fix it. Approach it as an award-winning design director with a precise understanding of what makes exceptional design work: production-grade code, a clear POV, deep understanding of the needs of the client and users, and exceptional craft. The craft bar is high, and it is held inside what the project has already decided: its `DESIGN.md` (tokens locked) and the house rules below. This stage never introduces a new visual direction.

Core principles:
- Hold the bar inside the given direction. No hedging, no shortcuts on the findings the user picked. Each fix must be complete (except assets the user must provide).
- Refine, do not redirect. Raise what is there to the conviction its own system already implies. A wish for a different look belongs to another stage: `references/visual/redesign/index.md` for an existing page, `references/visual/new-page/index.md` for a new one.
- Verify in bounded passes, not a loop, and the ceiling covers the whole cycle: screenshots, defect scans, micro-edits, and rebuilds alike. Apply the picked fixes fully, inspect once with a batched round (desktop 1440px and phone 390px together on the web; the shipped device classes on a native platform), fix everything it shows in one batch, confirm with at most one more round, and stop polishing. Open-ended self-QA burns the user's money.

## Who decides

Order of authority: project `CLAUDE.md` > project motion spec > project `DESIGN.md` / tokens > what the user said > everything in this stage. If the project has a `DESIGN.md`, its tokens are locked: no command here picks a new palette or font, and only structure and hierarchy guidance applies.

House rules. They hold in every project and win over anything a reference file in this stage says (source: `references/core/params.md` and `references/ux/ux-laws.md`):

1. An action a person does 100+ times a day gets no animation, press feedback only.
2. One highlight per screen: the primary action on a page where people do things, the primary number on a page people read.
3. Red is only for errors and dangerous actions.
4. Animate only `transform` and `opacity` (`clip-path` allowed; height only for expand/collapse). Every animation has a reduced-motion form. Hover effects sit behind `@media (hover: hover) and (pointer: fine)`.
5. Every page and card has both a desktop view and a phone view.
6. Before installing any npm package, ask the user; if the project already has a library of the same kind, use that one.

Curves, durations and springs come only from `references/core/params.md`, or from the project's motion spec, which outranks it.

## Before you start

1. The project has already been identified by the main entry (`SKILL.md` step 1: project `CLAUDE.md`, `PRODUCT.md`, `DESIGN.md`, motion spec, platform, code). Do not repeat that here.
2. Load the request's reference from the Commands table. Inspect target and incumbent visual truth before editing. When the app cannot run, start with committed visual-regression goldens or screenshot fixtures; verify target and freshness against current tokens, CSS, components, or assets, resolve conflicts, and compare theme/variant captures.
3. After analysis is done and the user has picked what to fix, load [reference/craft-floor.md](reference/craft-floor.md) immediately before editing UI. It carries the quality floor, the absolute bans, and the reflexes to check by eye; `critique` and `audit` also walk its two lists as their mechanical checklist. Do not load it for planning-only work.
4. On a native target (which targets count as native: `references/core/platforms.md` section 1), also read [reference/ios.md](reference/ios.md), [reference/android.md](reference/android.md), or both.

## The default finishing run

1. Run `critique` and `audit`, both, read-only, on every page in scope (not only the home page), each at desktop 1440px and phone 390px. Nothing is edited in this step. When the app cannot run, read the code and say the judgment was made from code.
2. Write the findings out in the reply. The user picks which findings to fix.
3. Fix the picked findings with the matching targeted command, then run `polish` to close the pass.

## How to refine

- **The brief wins.** Honor pinned aesthetics, eras, materials, fonts, and palettes even when they conflict with a saturated-pattern warning. Redirecting a clear brief toward your taste is failure.
- **Refinement preserves; redesign replaces.** Refinement keeps the incumbent identity, behavior, copy, and everything outside scope. Ask before replacing factual copy or adding claims. A redesign is not done in this stage (`references/visual/redesign/index.md`). Never split the difference into polish on the discarded look.
- **Visual authority is evidence, not a filename.** Missing DESIGN.md alone does not make a project greenfield: a coherent identity already in code is the incumbent world, and this stage preserves it. To record it, use `document` (`references/core/design-doc.md`).

**Visual world** is a term the reference files use throughout. It means the look a surface already has, taken as one identity: its palette, type, shapes, materials, imagery and motion. When the project has a `DESIGN.md`, that file is its record. "Incumbent", "established", "selected" and "committed" world all mean the one this surface already ships with.

## Modes

The mode names what the visitor's success looks like on this surface.

- **Persuade:** the visitor decides and acts; design is the product. Landing pages, marketing, campaigns, pricing. Earn attention and action. Ship real imagery when the brief needs it; follow the committed world, not category habit.
- **Operate:** the visitor completes a task. App UI, dashboards, editors, admin, settings, tools. Scanability, consistency, native expectations, and the real usage scene outrank expression. Brand lives in precise details.
- **Read:** the visitor understands something. Docs, articles, guides, help, changelogs. Structure for comprehension, then make the reading experience worth staying in.
- **Experience:** the visitor is inside the work itself. Portfolios, galleries, showcases. Let the artifact lead from the first viewport; the interface recedes.

Choose the mode from the requested surface, not the product. A tool's landing page is still Persuade; a fashion house's documentation is still Read; a docs index is Read, not Persuade. See [operate.md](reference/operate.md) for deeper Operate/Read guidance.

## Commands

Invoke as `/bryan-uiux <command> [target]`.

| Command | Category | Description | Reference |
|---|---|---|---|
| `critique [target]` | Evaluate | UX design review with heuristic scoring | [reference/critique.md](reference/critique.md) |
| `audit [target]` | Evaluate | Technical quality checks (a11y, perf, responsive) | [reference/audit.md](reference/audit.md) · native: [reference/audit.native.md](reference/audit.native.md) |
| `polish [target]` | Refine | Final quality pass before shipping | [reference/polish.md](reference/polish.md) |
| `bolder [target]` | Refine | Amplify safe or bland designs | [reference/bolder.md](reference/bolder.md) |
| `quieter [target]` | Refine | Tone down aggressive or overstimulating designs | [reference/quieter.md](reference/quieter.md) |
| `distill [target]` | Refine | Strip to essence, remove complexity | [reference/distill.md](reference/distill.md) |
| `harden [target]` | Refine | Production-ready: errors, i18n, edge cases | [reference/harden.md](reference/harden.md) |
| `onboard [target]` | Refine | Design first-run flows, empty states, activation | [reference/onboard.md](reference/onboard.md) |
| `colorize [target]` | Enhance | Add strategic color to monochromatic UIs | [reference/colorize.md](reference/colorize.md) |
| `typeset [target]` | Enhance | Improve typography hierarchy and fonts | [reference/typeset.md](reference/typeset.md) |
| `layout [target]` | Enhance | Fix spacing, rhythm, and visual hierarchy | [reference/layout.md](reference/layout.md) |
| `delight [target]` | Enhance | Add personality and memorable touches | [reference/delight.md](reference/delight.md) |
| `overdrive [target]` | Enhance | Push past conventional limits | [reference/overdrive.md](reference/overdrive.md) |
| `clarify [target]` | Fix | Improve UX copy, labels, and error messages | [reference/clarify.md](reference/clarify.md) |
| `adapt [target]` | Fix | Adapt for different devices and screen sizes | [reference/adapt.md](reference/adapt.md) · native: [reference/adapt.native.md](reference/adapt.native.md) |
| `optimize [target]` | Fix | Diagnose and fix UI performance | [reference/optimize.md](reference/optimize.md) |
| `extract [target]` | Build | Pull reusable tokens and components into design system | [reference/extract.md](reference/extract.md) |

Four more files sit in the same folder and are not commands; the commands above read them: [reference/craft-floor.md](reference/craft-floor.md), [reference/operate.md](reference/operate.md), [reference/ios.md](reference/ios.md), [reference/android.md](reference/android.md).

Owned elsewhere in this skill, not here:

- `init` (write `PRODUCT.md`): `references/core/product-brief.md`
- `document` (write `DESIGN.md` from existing code): `references/core/design-doc.md`
- UI motion (add, write or fix an animation): `references/build/web.md`
- A new page or screen: `references/visual/new-page/index.md`

Routing:

- **No argument:** offer the default finishing run, `critique` + `audit` on the pages in scope, with one line on what each will report. Do not auto-run.
- **Explicit or clearly implied command:** load its reference (native variant on native platforms) and follow it. Ask once if two commands fit.
- **Otherwise:** this stage only refines what exists. A narrow refinement of existing code proceeds on the incumbent implementation even when `PRODUCT.md` is missing; offer `init` afterward rather than blocking on it. A request for a new surface or a replacement look leaves this stage through the pointers above.
