<!-- 第三方开源内容（Apache-2.0），本文件已修改；版权声明和许可证全文见仓库根目录 THIRD_PARTY_NOTICES.md -->

> **这份管什么**：`document` 流程，从项目现有的代码整理出根目录的 `DESIGN.md`：颜色、字体、间距、圆角、组件这些 token，以及它们怎么用。全库只有这一份负责从代码整理 `DESIGN.md`。
> **什么时候读**：项目已经有成形的界面但没有 `DESIGN.md`，或者 `DESIGN.md` 跟代码对不上了。
> **不管什么、去哪看**：不发明新方向。从零定视觉方向 → `references/visual/new-page/index.md`（它把自己的决定写在 `DESIGN.md` 最后的 `## Direction lock`，这份不碰那一节）；改版 → `references/visual/redesign/index.md`；产品事实 → `references/core/product-brief.md`；动效常量写进动效规格 → `references/core/motion-spec-template.md`。
> **锁定**：`DESIGN.md` 一旦存在，它的 token 就对本库其他所有章节锁定，别的章节只许动结构和层级，不许换颜色和字体。动效数值以 `references/core/params.md` 为准，不写进 `DESIGN.md`。

<!-- 目录:开始（自动生成，别手改；改了标题就跑 python3 tools/toc.py） -->
**本文件目录**（全文 327 行；先看这里，再按行号只读用得上的那一节）

- 第 33–77 行：The frontmatter: token schema
- 第 79–92 行：The markdown body: eight sections (canonical order)
- 第 94–101 行：When to run
- 第 103–107 行：Scope: code that exists
- 第 109–300 行：Scan mode (approach C: auto-extract, then confirm descriptive language)
  - 第 111–121 行：Step 1: Find the design assets
  - 第 123–132 行：Step 2: Auto-extract what can be auto-extracted
  - 第 134–143 行：Step 2b: Stage the frontmatter
  - 第 145–155 行：Step 3: Ask the user for qualitative language
  - 第 157–282 行：Step 4: Write DESIGN.md
  - 第 284–292 行：Step 4b: Place what the frontmatter cannot hold
  - 第 294–300 行：Step 5: Confirm and refine
- 第 302–314 行：Style guidelines
- 第 316–327 行：Pitfalls
<!-- 目录:结束 -->

Generate a `DESIGN.md` file at the project root that captures the current visual design system, so AI agents generating new screens stay on-brand. The project has already been identified by the main entry (`SKILL.md` step 1), which also found any existing design document; do not repeat that here. Once this file exists, its tokens are locked for every other chapter of this skill: they change only when the user asks for it.

If the main entry found a design document under another name (`docs/DESIGN-SYSTEM.md`, a `*TOKENS*.md` file), do not create a competing file on your own: show it to the user and ask whether to convert it into `DESIGN.md` or leave it as the authority.

DESIGN.md follows the [official DESIGN.md format spec](https://raw.githubusercontent.com/google-labs-code/design.md/main/docs/spec.md): optional YAML frontmatter carrying machine-readable design tokens, followed by up to eight markdown sections in a fixed order. **Tokens are normative; prose provides context for how to apply them.** Sections may be omitted when not relevant, but those present stay in the specified order. Use the canonical headings below so the file remains portable across DESIGN.md-aware tools.

## The frontmatter: token schema

The YAML frontmatter is the machine-readable layer. It's what Stitch's linter validates. Keep it tight; every entry should correspond to a token the project actually uses.

```yaml
---
name: <project title>
description: <one-line tagline>
colors:
  primary: "#b8422e"
  neutral-bg: "#faf7f2"
  # ...one entry per extracted color; key = descriptive slug
typography:
  display:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "clamp(2.5rem, 7vw, 4.5rem)"
    fontWeight: 300
    lineHeight: 1
    letterSpacing: "normal"
  body:
    # ...
rounded:
  sm: "4px"
  md: "8px"
spacing:
  sm: "8px"
  md: "16px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral-bg}"
    rounded: "{rounded.sm}"
    padding: "16px 48px"
  button-primary-hover:
    backgroundColor: "{colors.primary-deep}"
---
```

Rules that matter:

- **Token refs** use `{path.to.token}` (e.g. `{colors.primary}`, `{rounded.md}`). Components may reference primitives; primitives may not reference each other.
- **Colors accept any valid CSS color string.** Hex is the recommended default for portability, but preserve an incumbent `rgb()`, `hsl()`, `oklch()`, wide-gamut, or mixed-color value when it is the project's normative source. Never split the source of truth without explicit reason.
- **Component sub-tokens** are limited to 8 props: `backgroundColor`, `textColor`, `typography`, `rounded`, `padding`, `size`, `height`, `width`. Shadows, motion, focus rings, backdrop-filter: none of those fit. Carry them in the prose sections (Step 4b).
- **Scale keys are open-ended.** Use whatever names the project already uses (`oxblood-deep`, `surface-container-low`). Don't rename to Material defaults.
- **Variants are naming convention, not schema.** `button-primary` / `button-primary-hover` / `button-primary-active` as sibling keys.

## The markdown body: eight sections (canonical order)

1. `## Overview`
2. `## Colors`
3. `## Typography`
4. `## Layout`
5. `## Elevation & Depth`
6. `## Shapes`
7. `## Components`
8. `## Do's and Don'ts`

Omit irrelevant sections rather than filling them with invented rules. Put responsive layout in Layout, depth in Elevation & Depth, radius and form language in Shapes, and per-component behavior in Components. Unknown sections are preserved by the format, but new visual guidance should use the canonical structure whenever it fits.

This skill adds one optional section after the eight, always last: `## Direction lock`. It holds the decisions recorded by the new-page flow (register, soul, dial values, anti-references). That flow writes it; this flow leaves it untouched. A section titled 「排版方向」, written when a dashboard layout direction L1–L5 is chosen from `references/visual/dashboard-layouts.md`, is kept the same way.

## When to run

- The project has a coherent incumbent visual system but no `DESIGN.md`.
- The first implementation of a new page is complete and its provisional decisions need to be carbonized.
- An existing `DESIGN.md` is stale (the design has drifted).
- Before a large redesign, to capture the current state as a reference.

If a `DESIGN.md` already exists, **do not silently overwrite it**. Show the user the existing file first. STOP and ask the user. The choice is refresh, overwrite, or merge. Whatever the choice, a `## Direction lock` section, and any other section this flow did not write (for example a layout direction recorded before any code existed), is carried over unchanged.

## Scope: code that exists

This flow has one path, scan mode: the project has design tokens, components, or rendered output. Extract, then confirm descriptive language.

If the scan (Scan mode Step 1) finds no tokens, no component files, and no rendered site, there is nothing to document yet. Say so and stop; do not fabricate a token spec. Choosing a direction for a project with no code is the new-page flow's job (`references/visual/new-page/index.md`), and that flow records its decisions under `## Direction lock`. Run this flow once there is code.

## Scan mode (approach C: auto-extract, then confirm descriptive language)

### Step 1: Find the design assets

Search the codebase in priority order:

1. **CSS custom properties**: grep for `--color-`, `--font-`, `--spacing-`, `--radius-`, `--shadow-`, `--ease-`, `--duration-` declarations in CSS files (usually `src/styles/`, `public/css/`, `app/globals.css`, etc.). Record name, value, and the file it's defined in. The motion ones (`--ease-`, `--duration-`) are not written into DESIGN.md: hand them to the project's motion spec (Step 4b).
2. **Tailwind config**: if `tailwind.config.{js,ts,mjs}` exists, read the `theme.extend` block for colors, fontFamily, spacing, borderRadius, boxShadow.
3. **CSS-in-JS theme files**: styled-components, emotion, vanilla-extract, stitches; look for `theme.ts`, `tokens.ts`, or equivalent.
4. **Design token files**: `tokens.json`, `design-tokens.json`, Style Dictionary output, W3C token community group format.
5. **Component library**: scan the main button, card, input, navigation, dialog components. Note their variant APIs and default styles.
6. **Global stylesheet**: the root CSS file usually has the base typography and color assignments.
7. **Visible rendered output**: if browser automation tools are available, load the live site and sample computed styles from key elements (body, h1, a, button, .card). This catches values that tokens miss.

### Step 2: Auto-extract what can be auto-extracted

Build a structured draft from the discovered tokens. For each token class:

- **Colors**: Group into Primary / Secondary / Tertiary / Neutral (the Material-derived roles Stitch uses). If the project only has one accent, express it as Primary + Neutral; omit Secondary and Tertiary rather than inventing them. Record what the code actually uses. If it spends red on anything other than errors and dangerous actions, record it as found and tell the user it conflicts with this skill's house rule; do not change it silently.
- **Typography**: Map observed sizes and weights to the Material hierarchy (display / headline / title / body / label). Note font-family stacks and the scale ratio.
- **Elevation**: Catalogue the shadow vocabulary. If the project is flat and uses tonal layering instead, that's a valid answer; state it explicitly.
- **Components**: For each common component (button, card, input, chip, list item, tooltip, nav), extract shape (radius), color assignment, hover/focus treatment, internal padding.
- **Layout + spacing**: Extract grid, container, breakpoint, rhythm, and density behavior into Layout.
- **Shapes**: Extract radius, corner, border, clipping, and recurring form behavior into Shapes.

### Step 2b: Stage the frontmatter

From the auto-extracted tokens, draft the YAML frontmatter now (you'll write it at the top of DESIGN.md in Step 4). This is the machine-readable layer: what Stitch's linter consumes.

- **Colors**: one entry per extracted color. Key = descriptive slug (`oxblood-deep`, `editorial-magenta`, not `blue-800`). Value = whichever format the project treats as canonical (OKLCH or hex; see the frontmatter rules above). Don't split the source of truth: one format in the frontmatter, don't redefine the same token in prose with a different value.
- **Typography**: one entry per role (`display`, `headline`, `title`, `body`, `label`). Typography is an object; include only the props that are real for the project (`fontFamily`, `fontSize`, `fontWeight`, `lineHeight`, `letterSpacing`, `fontFeature`, `fontVariation`).
- **Rounded / Spacing**: whatever scale steps the project actually uses, keyed by whatever scale name the project uses (`sm` / `md` / `lg`, or `surface-sm`, or numeric steps).
- **Components**: one entry per variant (`button-primary`, `button-primary-hover`, `button-ghost`). Reference primitives via `{colors.X}`, `{rounded.Y}`. If a variant needs a property Stitch's 8-prop set doesn't cover (shadow, focus ring, backdrop-filter), describe it in the `## Components` prose instead (Step 4b).

Skip anything the project doesn't have. Empty scale keys or fabricated tokens pollute the spec.

### Step 3: Ask the user for qualitative language

The following require creative input that cannot be auto-extracted. Ask them in two structured rounds of no more than three questions each (or the harness's lower limit), waiting between rounds:

- **Creative North Star**: a single named metaphor for the whole system ("The Editorial Sanctuary", "The Golden State Curator", "The Lab Notebook"). Offer 2-3 options that honor PRODUCT.md's brand personality.
- **Overview voice**: mood adjectives, aesthetic philosophy in 2-3 sentences, and any confirmed visual anti-reference.
- **Color character** (for auto-extracted colors): descriptive names ("Deep Muted Teal-Navy", not "blue-800"). Suggest 2-3 options per key color based on hue/saturation.
- **Elevation philosophy**: flat/layered/lifted. If shadows exist, is their role ambient or structural?
- **Component philosophy**: the feel of buttons, cards, inputs in one phrase ("tactile and confident" vs. "refined and restrained").

Carry a line from PRODUCT.md only when it is a durable brand commitment that actually constrains the visual system. Page strategy and surface concepts do not belong here.

### Step 4: Write DESIGN.md

The file opens with the YAML frontmatter staged in Step 2b (schema documented at the top of this reference), then the markdown body using the canonical structure below.

```markdown
---
name: [Project Title]
description: [one-line tagline]
colors:
  # ... staged frontmatter from Step 2b
---

# Design System: [Project Title]

## Overview

**Creative North Star: "[Named metaphor in quotes]"**

[2-3 paragraph holistic description: personality, density, and aesthetic philosophy. Start from the North Star and work outward. State only confirmed visual rejections. End with a short **Key Characteristics:** bullet list.]

## Colors

[Describe the palette character in one sentence.]

### Primary
- **[Descriptive Name]** (#HEX / oklch(...)): [Where and why this color is used. Be specific about context, not just role.]

### Secondary (optional; omit if the project has only one accent)
- **[Descriptive Name]** (#HEX): [Role.]

### Tertiary (optional)
- **[Descriptive Name]** (#HEX): [Role.]

### Neutral
- **[Descriptive Name]** (#HEX): [Text / background / border / divider role.]
- [...]

### Named Rules (optional, powerful)
**The [Rule Name] Rule.** [Short, forceful prohibition or doctrine, e.g. "The One Voice Rule. The primary accent is used on ≤10% of any given screen. Its rarity is the point."]

## Typography

**Display Font:** [Family] (with [fallback])
**Body Font:** [Family] (with [fallback])
**Label/Mono Font:** [Family, if distinct]

**Character:** [1-2 sentence personality description of the pairing.]

### Hierarchy
- **Display** ([weight], [size/clamp], [line-height]): [Purpose; where it appears.]
- **Headline** ([weight], [size], [line-height]): [Purpose.]
- **Title** ([weight], [size], [line-height]): [Purpose.]
- **Body** ([weight], [size], [line-height]): [Purpose. Include max line length like 65–75ch if relevant.]
- **Label** ([weight], [size], [letter-spacing], [case if uppercase]): [Purpose.]

### Named Rules (optional)
**The [Rule Name] Rule.** [Short doctrine about type use.]

## Layout

[Describe the grid or spatial model, container behavior, density, responsive changes, and the spacing rhythm. Include exact values only when observed.]

## Elevation & Depth

[One paragraph: does this system use shadows, tonal layering, or a hybrid? If "no shadows", say so explicitly and describe how depth is conveyed instead.]

### Shadow Vocabulary (if applicable)
- **[Role name]** (`box-shadow: [exact value]`): [When to use it.]
- [...]

### Named Rules (optional)
**The [Rule Name] Rule.** [e.g. "The Flat-By-Default Rule. Surfaces are flat at rest. Shadows appear only as a response to state (hover, elevation, focus)."]

## Shapes

[Describe the form language: corner/radius strategy, borders, clipping, and any recurring silhouette or geometry.]

## Components

For each component, lead with a short character line, then specify shape, color assignment, states, and any distinctive behavior.

### Buttons
- **Shape:** [radius described, exact value in parens]
- **Primary:** [color assignment + padding, in semantic + exact terms]
- **Hover / Focus:** [transitions, treatments]
- **Secondary / Ghost / Tertiary (if applicable):** [brief description]

### Chips (if used)
- **Style:** [background, text color, border treatment]
- **State:** [selected / unselected, filter / action variants]

### Cards / Containers
- **Corner Style:** [radius]
- **Background:** [colors used]
- **Shadow Strategy:** [reference Elevation section]
- **Border:** [if any]
- **Internal Padding:** [scale]

### Inputs / Fields
- **Style:** [stroke, background, radius]
- **Focus:** [treatment, e.g. glow, border shift, etc.]
- **Error / Disabled:** [if applicable]

### Navigation
- **Style, typography, default/hover/active states, mobile treatment.**

### [Signature Component] (optional; if the project has a distinctive custom component worth documenting)
[Description.]

## Do's and Don'ts

Concrete visual guardrails grounded in the incumbent implementation or the user's chosen world. Lead each with "Do" or "Don't" and include exact values only when established. Do not turn a task-specific concept or surface strategy into a system-wide prohibition.

### Do:
- **Do** [specific prescription with exact values / named rule].
- **Do** [...]

### Don't:
- **Don't** [specific prohibition confirmed by the incumbent system or the user].
- **Don't** [...]
- **Don't** [...]

## Direction lock

[Optional, always last. Decisions recorded by the new-page flow: register, soul, dial values, anti-references. Written by that flow. This flow never writes, edits, or reorders it: carry it over exactly as found, and leave the section out when it does not exist.]
```

### Step 4b: Place what the frontmatter cannot hold

The frontmatter owns token primitives (colors, typography, rounded, spacing, components). Everything Stitch's schema can't hold goes into the prose sections of the same file. No second file is written.

- **Shadows and elevation tokens** → `## Elevation & Depth`, under Shadow Vocabulary, with the exact `box-shadow` value.
- **Focus rings, backdrop-filter, and other component properties outside the 8-prop set** → `## Components`, on the component they belong to, with the exact value.
- **Breakpoints** → `## Layout`.
- **Tonal ramps** → `## Colors`, only when the project already defines a tonal scale (Material `surface-container-low` family, Tailwind-style `blue-50..blue-900`). Do not synthesize one.
- **Motion** → not in DESIGN.md. Curves, durations, and springs belong to the project's motion spec (`docs/MOTION-SPEC.md`, or the motion document the project already has), drafted per `references/core/motion-spec-template.md` with values per `references/core/params.md`. DESIGN.md may say in prose which component moves and why, and points to the spec for the numbers.

### Step 5: Confirm and refine

1. Show the user the full DESIGN.md you wrote. Briefly highlight the non-obvious creative choices (descriptive color names, atmosphere language, named rules).
2. Tell the user that from now on these tokens are locked: every other chapter of this skill uses them as they are and changes only structure and hierarchy.
3. Offer to refine any section: "Want me to revise a section, add component patterns I missed, or adjust the atmosphere language?"

Your own write is the freshest source; subsequent commands in this session don't need a reload.

## Style guidelines

- **Frontmatter first, prose second.** Tokens go in the YAML frontmatter; prose contextualizes them. Don't redefine a token value in two places; the frontmatter is normative.
- **Carry only durable product constraints.** A binding logo, identity asset, accessibility need, or brand commitment from PRODUCT.md may constrain DESIGN.md. Surface strategy does not belong in DESIGN.md.
- **Match the spec.** Use its eight canonical sections in order and omit any that are irrelevant; `## Direction lock`, when present, stays last. Motion numbers go to the motion spec (Step 4b) rather than into a token group the schema does not support.
- **Descriptive > technical**: "Gently curved edges (8px radius)" > "rounded-lg". Include the technical value in parens, lead with the description.
- **Functional > decorative**: for each token, explain WHERE and WHY it's used, not just WHAT it is.
- **Exact values in parens**: hex codes, px/rem values, font weights; always the number in parens alongside the description.
- **Use Named Rules**: `**The [Name] Rule.** [short doctrine]`. These are memorable, citable, and much stickier for AI consumers than bullet lists. Stitch's own outputs use them heavily ("The No-Line Rule", "The Ghost Border Fallback"). Aim for 1-3 per section.
- **Be decisive where evidence is decisive.** Use hard language for actual invariants and softer language for provisional guidance.
- **Use concrete audit tests only when they are grounded in the observed system or a confirmed user decision.** A one-sentence test beats a paragraph of principle.
- **Reference PRODUCT.md selectively.** Product truth explains why the world fits; it does not supply page composition or a visual don't-list by default.
- **Group colors by role**, not by hex-order or hue-order. Primary / Secondary / Tertiary / Neutral is the spec ordering.

## Pitfalls

- Don't paste raw CSS class names. Translate to descriptive language.
- Don't extract every token. Stop at what's actually reused; one-offs pollute the system.
- Don't invent components that don't exist. If the project only has buttons and cards, only document those.
- Don't overwrite an existing DESIGN.md without asking.
- Don't duplicate content from PRODUCT.md. DESIGN.md is strictly visual.
- Don't replace canonical sections with near-synonyms. Put layout and responsive behavior in `Layout`; put motion numbers in the motion spec.
- Don't rename sections even slightly. "Colors" not "Color Palette & Roles". "Typography" not "Typography Rules". Tooling parsing depends on exact headers.
- Don't duplicate token values between frontmatter and prose. If a color is in `colors.primary` as hex, the prose can name it and describe its role but should not reassert a different hex. The frontmatter is normative.
- Don't invent frontmatter token groups outside Stitch's schema (no `motion:`, `breakpoints:`, `shadows:` at the top level). Stitch's Zod schema only accepts `colors`, `typography`, `rounded`, `spacing`, `components`. Anything else belongs in the prose sections (Step 4b).
- Don't write, edit, or drop `## Direction lock`. It belongs to the new-page flow.
