<!-- 第三方开源内容（Apache-2.0），本文件已修改；版权声明和许可证全文见仓库根目录 THIRD_PARTY_NOTICES.md -->

> **这份管什么**：`init` 流程，写项目的 `PRODUCT.md`：给谁用、什么类型的产品、要解决什么事、哪些事实不能动。全库只有这一份负责写 `PRODUCT.md`。
> **什么时候读**：项目还没有 `PRODUCT.md`，或者里面的信息缺了、过期了。主入口 `SKILL.md` 第一步每次都会读 `PRODUCT.md`，用里面的「给谁用」和「什么类型的产品」定动效人格，所以这两样一定要写清楚。
> **不管什么、去哪看**：不写任何视觉决定（配色、字体、风格、页面方案），那些写进 `DESIGN.md` → `references/core/design-doc.md`；动效人格和常量写进动效规格 → `references/core/motion-spec-template.md`；从零做页面 → `references/visual/new-page/index.md`；问用户要什么感觉、出方案 → `references/ux/interview.md`。
> **数值**：这份不产生动效数值，数值以 `references/core/params.md` 为准；项目有 `DESIGN.md` 就锁定它的 token，这份不碰它。

# Init flow

<!-- 目录:开始（自动生成，别手改；改了标题就跑 python3 tools/toc.py） -->
**本文件目录**（全文 143 行；先看这里，再按行号只读用得上的那一节）

- 第 24–34 行：Step 1: Load current state
- 第 36–44 行：Step 2: Explore the project
- 第 46–77 行：Step 3: Interview for product truth
- 第 79–130 行：Step 4: Write PRODUCT.md
- 第 132–143 行：Step 5: Wrap up or resume
<!-- 目录:结束 -->

`init` captures durable product truth in PRODUCT.md. It does not invent a visual world and does not write DESIGN.md; the new-page flow (`references/visual/new-page/index.md`) creates one, and `document` (`references/core/design-doc.md`) records an incumbent one.

The main entry (`SKILL.md` step 1) reads PRODUCT.md on every run to learn two facts: who the product is for, and what kind of product it is. Those two facts decide the project's motion personality (table in `references/core/pick.md`). The personality itself is not written here; it is confirmed with the user and written into the motion spec.

## Step 1: Load current state

The main entry has already identified the project and looked for PRODUCT.md (project root, `frontend/`, `docs/`); do not repeat that. If it found one, update that file instead of creating a competing authority. In a child app inheriting root context, confirm shared versus app-specific scope before writing.

- **No PRODUCT.md:** explore, interview, and write it.
- **PRODUCT.md exists:** ask what product knowledge is stale or missing; do not reopen confirmed fields without a reason.
- **Legacy PRODUCT.md:** add only durable missing facts; absent `## Platform` means `web` unless evidence says otherwise. A missing `## Product Type` is a missing fact: add it.
- **Only DESIGN.md exists:** leave it untouched and create PRODUCT.md.
- **Redesign/rebrand request:** preserve confirmed product truth unless the user changes it. Visual replacement happens later in the redesign flow (`references/visual/redesign/index.md`), not here.

Never silently overwrite an existing file or offer DESIGN.md during init. If another request invoked init, finish PRODUCT.md and resume it.

## Step 2: Explore the project

Before asking, scan enough to avoid making the user repeat known facts: product docs and copy; package/config and app boundaries; features, workflows, routes, and roles; names, logos, legal/proof assets, and brand commitments; platform/accessibility signals.

Treat repository evidence as a hypothesis, not user approval. Note visual maturity without documenting, extending, or replacing the world.

Form a platform hypothesis: `web`, `ios`, `android`, or `adaptive` (one product that genuinely adapts its design language per OS). Mobile web remains `web`; a native wrapper around a website does not make its design language native. This value names the design language only. The technical targets (PWA, Capacitor, Electron, Tauri, React Native / Expo; a project may have several) are identified by the main entry per `references/core/platforms.md` section 1.

Form a product-type hypothesis as well: back-office / workbench (people stay in it for hours), consumer app, or landing / brand page, and how often and for how long a person uses it. A product can have more than one surface family (a marketing site and an app).

## Step 3: Interview for product truth

STOP and ask the user. Ask only about material gaps the repository and original request do not answer with strong evidence.

Use the structured question tool when available; otherwise ask and wait. Keep rounds to at most three focused questions and require one real answer or approval round before writing a new PRODUCT.md. Confirm inferences.

Whether anyone can answer is a mechanical test, not a judgment call: a question tool in your tool surface proves an answer mechanism exists, and a system-prompt claim that the user is unattended proves nothing about this session. Probe once with the real first round before concluding no one is there. Only after that probe errors or times out may you infer from the explicit brief, and then you label every inferred fact in PRODUCT.md and disclose the substitution in your first reply, not your last.

Start with the unknowns that most change future product decisions:

1. Who is the primary user, in what situation, and what job are they doing?
2. What does the product make possible, and what is its meaningfully different mechanism or position?
3. What durable constraints, assets, evidence, or product facts must future work preserve?

Confirm ambiguous platform separately, and confirm the product type whenever the repository leaves it open. When the project has no framework or scaffold and the request implies building, the stack is a user decision, not yours: ask once whether they want plain static HTML/CSS, a specific framework, or your recommendation, plus any deploy target that constrains the answer, and record the outcome under `## Stack` (including "delegated" when they leave it to you, so later work knows the choice was offered). Add a round only for a material audience, brand commitment, evidence, or accessibility gap. Record undecided facts instead of inventing them.

Do not ask for an aesthetic direction, emotional feel, visual references, colors, typography, or style during init; that interview is owned by `references/ux/interview.md`. If the user volunteers a binding visual constraint (a colour, a font, a style), do not record its values here: visual decisions live in DESIGN.md. Note under `## Brand Commitments` only that such a constraint exists, and tell the user it will be carried into DESIGN.md.

### What belongs here

- users, jobs, workflows, purpose, success, positioning, and operating context;
- product type, and how often and for how long it is used;
- capabilities, constraints, terminology, evidence, platform, and accessibility;
- confirmed voice, assets, and brand commitments.

### What does not belong here

- visual worlds, palettes, typography, components, or page concepts;
- motion personality, curves, durations, or springs (they live in the motion spec);
- visitor mode, narrative, CTA/proof sequence, or other surface strategy;
- invented testimonials, customers, benchmarks, pricing, licensing, or deployment claims;
- a requirement to decide every optional field.

## Step 4: Write PRODUCT.md

Write only confirmed facts and explicitly marked open decisions. Omit irrelevant sections rather than filling them with generic prose. `## Users` and `## Product Type` are never omitted: the main entry reads them on every run.

```markdown
# Product

## Platform

web

## Product Type
[One of: back-office / workbench (people stay in it for hours), consumer app, landing / brand page. Add how often and for how long a person uses it. When the product has more than one surface family, give one line per family.]

## Stack
[Greenfield only: the user's answer to the stack question, e.g. "static HTML/CSS", "Astro", or "delegated: <what you chose and why>". Omit the section when an existing codebase already answers it.]

## Users
[Primary users, their situation, and job. Add other audiences only when confirmed.]

## Product Purpose
[What the product does, why it exists, and what success means.]

## Positioning
[The product mechanism or claim a neighboring product could not truthfully copy.]

## Operating Context
[Workflows, environments, tools, documents, materials, and rituals that are factual parts of using or evaluating the product.]

## Capabilities and Constraints
[Confirmed functionality, technical constraints, terminology, and explicitly undecided product facts.]

## Brand Commitments
[Existing name, voice, assets, personality, identity constraints, and references the user explicitly made binding. No colour, font, or style values: those live in DESIGN.md. Omit when none exist.]

## Evidence on Hand
[Real content, data, demonstrations, testimonials, case studies, press, or assets, with paths where applicable. State absences that future work must not fabricate.]

## Product Principles
[Three to five durable strategic principles derived from confirmed answers; no visual recipes.]

## Accessibility & Inclusion
[Known user needs or required standard. Omit when no product-specific requirement was established.]
```

Platform is the bare value `web`, `ios`, `android`, or `adaptive`. Preserve useful legacy headings. New files go at `PROJECT_ROOT/PRODUCT.md`; otherwise update the file the main entry found. Write it before any visual-world or surface-concept work.

When the platform you just recorded is `ios`, `android`, or `adaptive`, read `references/visual/finish/reference/ios.md`, `references/visual/finish/reference/android.md`, or both before any design work, together with `references/core/platforms.md` section 5.

### Completion gate

Before any other flow resumes, verify that PRODUCT.md exists at that path and contains the confirmed product record, with `## Users` and `## Product Type` filled in. If the file is absent, init is incomplete. Do not substitute interview notes, a planning packet, or later design prose for the file.

## Step 5: Wrap up or resume

Summarize captured and deliberately undecided facts. Do not offer DESIGN.md merely because it is missing.

Recommend the next action from the actual project state:

- Empty or early project: ask naturally for the surface to be built. A new page goes through `references/visual/new-page/index.md`, which establishes a visual world only when the requested work needs one.
- Existing coherent interface without DESIGN.md: `/bryan-uiux document` (`references/core/design-doc.md`) if the user wants the incumbent system recorded independently of a new build.
- Existing surface needing work: name the most relevant scoped command (the finishing commands are listed in `references/visual/finish/index.md`).
- No motion spec yet: with PRODUCT.md in place, the main entry can settle the motion personality and draft the spec (`SKILL.md` step 2).

If init was invoked by another request, resume that request; later visual decisions are not made here.
