<!-- 第三方开源内容（MIT），已按本库规则修改；版权声明见仓库根目录 THIRD_PARTY_NOTICES.md -->

# Pre-Flight Check

<!-- 目录:开始（自动生成，别手改；改了标题就跑 python3 tools/toc.py） -->
**本文件目录**（全文 222 行；先看这里，再按行号只读用得上的那一节）

- 第 27–47 行：Gate 0. Promise Kept (hard — run this first, before anything below)
- 第 49–66 行：Gate 1. It Actually Renders (hard — run this second, before §A)
- 第 68–76 行：A. Direction & Soul (hard)
- 第 78–85 行：B. Premium Substrate (hard)
- 第 87–119 行：C. Spectacle (hard if SPECTACLE ≥ 7)
- 第 121–141 行：D. Layout Discipline (hard)
- 第 143–152 行：E. Cheapness Scan (hard)
- 第 154–158 行：F. Copy Self-Audit (hard)
- 第 160–165 行：G. Accessibility (hard)
- 第 167–170 行：H. Performance (soft)
- 第 172–195 行：H.1 House rules (hard — they win over every gate above)
- 第 197–208 行：I. Strategic Omissions (soft — but separate a prototype from a real deliverable)
- 第 210–222 行：J. Self-Grading Loop (run last, before saying "done")
<!-- 目录:结束 -->

Run before saying "done." Merges the promise check, the substrate check, the cheapness scan, the spectacle verification, and the accessibility gates. Failing any **hard rule** is shipping broken work — fix before delivery. Soft rules are judgment calls; if you skip one, say why.

---

## Gate 0. Promise Kept (hard — run this first, before anything below)

Every check in §A–§I asks *"does this page follow the rules?"* None of them asks **"is this the page the user agreed to?"** Those are different questions, and only the second one can fail silently: a page can pass every rule in this file while having quietly become something the user never approved. Long builds drift — a moving hero degrades into a static image, a dark theme lightens section by section, an engine gets stubbed out when it wouldn't run and never gets restored. Nothing downstream notices, because a static image has perfect contrast and zero jank.

**Paste the `You'll see:` line from the §0.B Design Read back in, and check it item by item against the built page.**

```
Gate 0 — Promise kept
  ✅ near-black page
  ❌ slow-drifting star dust  →  shipped as a static background image  →  P0
  ✅ very large headline over it
  ✅ galaxy rotates on scroll
```

- [ ] **Every clause of `You'll see:` is verifiably present.** Not "an equivalent effect" — the thing described. Any miss is **P0**: the user confirmed *that* sentence, and shipping something else is shipping work he did not approve.
- [ ] **A clause that could not be built was renegotiated, not silently dropped.** If the engine wouldn't hold 60fps and you fell back to a still frame, that is a legitimate call (§1.B says so) — but it changes what the user agreed to, so it gets said out loud at delivery, not buried.
- [ ] **`Not right?` was answered.** If the user picked ① or ②, the built page reflects that pick, not the original assertion.

> This generalizes §1.B. "Spectacle claimed, spectacle shown" is the same test applied to one dial — and it is this flow's signature check precisely because claimed-vs-shipped is the failure that rule-checking cannot see. `You'll see:` is the *whole* claim, so it gets the same treatment.

---

## Gate 1. It Actually Renders (hard — run this second, before §A)

Every check in §A–§I asks *"is this page well-made?"* — and every one of them **passes vacuously on a page that never rendered**. A `<link>` pointing at a stylesheet that was never written produces unstyled Times New Roman: no grain to be missing, no `#fff` to be banned, no eyebrow to over-count. The taste layer cannot see a file that isn't there. So the file-existence check runs before the taste layer, not inside it.

**This is also the truncated-build tell.** The HTML gets written, the run ends before the CSS does, and nothing downstream notices — the most common way a long build ships broken. `.bryan-uiux/log.json` will even be there, correctly recording a build that doesn't exist on screen.

**An optional checker does the mechanical part of this gate.** It is one Node file with no dependencies that ships with this skill. If Node is available, run it on every built file (the path is relative to the skill folder, not the user's project); if not, walk `anti-cheap.md` and the bullets below by eye. It is never required:

```bash
node references/visual/new-page/scripts/detect.mjs <every built file>
```

- [ ] **Every local `href` / `src` / `url()` resolves to a file that exists.** A dead local reference is a P0 hard fail — write the missing file or fix the path. The checker resolves file-relative refs and skips `http(s):` / `data:` / `#anchor` / `mailto:`; **root-relative `/img/x.png` it cannot judge** (it has no serving root), so check those by hand. Without the checker, open each built file and follow every local reference to a file on disk yourself.
- [ ] **The mechanical checks were done, by the checker or by hand.** The checker is optional; the checks are not. If it was not run, say so and walk the refs and M1/M2/M5/M6 by hand — silently skipping both is how those four go unchecked for an entire project.
- [ ] **Every file the page needs was actually written.** Walk your own build list: stylesheet, script, each asset. A file you *planned* and a file that exists on disk are different things, and only one of them renders.
- [ ] **Told him it hasn't been opened.** The checks above are static and catch the expensive failures for free; whether it *looks* right is one second of his time. **Don't drive a browser to find out — say 「我没打开看」 and let him look.** Only if he asks. (The main entry's self-check still wants the desktop view and the phone view both looked at: when screenshots at 1440px and 390px wide are cheap in this session, take them. This line covers the session where they are not, and either way it forbids claiming a look that did not happen.)

---

## A. Direction & Soul (hard)

- [ ] **Design Read** was committed (industry · soul · register · SPECTACLE · engine) **and the `You'll see:` line was written in plain observable terms** — no `SPECTACLE=n`, no `scrimmed sections`, no library names in the sentence the user was asked to confirm (§0.C.1, `plain-words.md`).
- [ ] **Anti-default named** — the lazy aesthetic for this brief was identified and beaten.
- [ ] **Rotation was read and stated** — `.bryan-uiux/log.json` (or a `/* bryan-uiux ·` CSS stamp) was read at §0, the rotation was stated to the user **as a plain sentence** (not axis letters), and this build differs from the last on **≥3 of 5 axes** (`divergence.md` §4). The five-axis coordinates themselves live in the log and the stamp, not in the user-facing line.
- [ ] **Build recorded** — the five-axis stamp is the first non-empty line of the CSS, and an entry was prepended to `.bryan-uiux/log.json` (trimmed to 20). *An unrecorded build is one the next run collides with.* Component-scope builds skip both by design.
- [ ] **One soul, one accent, locked** across every section. No drift, no second accent unless duotone-by-design.
- [ ] **Theme locked** — no warm-paper section inside a dark page (unless deliberate one-time switch).
- [ ] Page matches its **register** (brand = bold/spectacle; if it's really product-UI, the brand route is the wrong one — it builds on `product-ui.md`).

## B. Premium Substrate (hard)

- [ ] **Grain** layer present (`opacity .02–.05`).
- [ ] **No pure `#fff`/`#000`**; neutrals tinted toward brand hue.
- [ ] **Translucent borders** only; no hard `#333` lines; shadows hue-tinted (not pure black on light bg).
- [ ] **Display type tension** — `clamp()` size, negative tracking, weight contrast against light body. Line-height **`.86–.95` for mixed case**; **`1.0` floor (`1.02–1.08` recommended) whenever `text-transform: uppercase` is on** — all-caps has no descenders, so tight leading collides cap-tops with the line above the moment the heading wraps, which on a phone it always does (`mobile-floor.md` M6).
- [ ] **Tokens hold to the end** — every colour and `font-family` in the artifact references a named token; no literal `#hex` / `oklch()` / `rgb()` outside the `:root` block. The colour lock is the decision; this is what enforces it 400 lines in.
- [ ] **Layered z-index** depth (engine · grain · vignette · content).

## C. Spectacle (hard if SPECTACLE ≥ 7)

- [ ] **Spectacle shown, not claimed** — a real working engine exists.
- [ ] **60fps on a mid-range device** (not the dev machine). Below 50fps → simplified.
- [ ] **Canvas DPR-adapted** (retina not blurry).
- [ ] **Progressive enhancement** — page is complete and readable with the engine removed.
- [ ] **`prefers-reduced-motion`** freezes the engine to a still frame / static hero.
- [ ] **Motivated motion** — every animation has a one-sentence reason. ≤1 marquee.

### C.1 The beat sheet (hard on any page that moves — `motion.md`)

Gate C above checks **the hero engine**. These check **the page's motion as a whole**, and they fail on pages that pass everything above.

- [ ] **No route over-reach** — nothing uses a heavy route for work a cheap one does. Grep the failure directly: a bundled GSAP whose only tweens are entrance fades or scroll parallax (→ R1/R2, delete the 60KB); a Canvas that draws a static gradient (→ CSS); a Three.js scene whose content is photographs (→ R6).
- [ ] **Budget held** — **≤1 heavy beat** (R4/R5/R6), ≤4 beats total, and **no two beats from the same §2 family**. Two scroll-narrative beats is a repeat, not a composition.
- [ ] **Every beat has a composed still**, not just the global reduced-motion backstop. Check the specific killer: any element authored at `opacity: 0` / `transform: translateY(...)` awaiting a trigger is **permanently invisible** under the backstop — it must be authored in its final state and animated *from* elsewhere.
- [ ] **Pointer-driven beats gated behind `FINE`** (`hover: hover and pointer: fine`) so magnetic buttons, tilts and cursor followers never fire on touch.
- [ ] **`product` register carries R3 and nothing else** — a dashboard with a hero engine is a category error; a dashboard where filtering hard-refreshes the table is the opposite one. (House rule first: a filter or any other action used 100+ times a day gets no transition at all, press feedback only.)
- [ ] **Rotation honoured** — the signature beat's §2 family differs from the last run's (`.bryan-uiux/log.json`), and the family+variant is written back at §8.

### Verifying spectacle — don't trust your own claim, prove it

A page that *claims* SPECTACLE 8 but ships a white hero is broken, not plain. Verify in two passes:

1. **Static (always):** grep the built files for a real engine (`three`, `canvas`, `gsap` / `ScrollTrigger`, `webgl`, `requestAnimationFrame`) and for the reduced-motion fallback. "Spectacle claimed, not shown" and "no reduced-motion form" are both P0 hard fails — fix before shipping. The optional checker from Gate 1 does this grep for you when Node is available; when it isn't, the by-hand checks above stand in for it — its absence is neither a pass nor a blocker.
2. **Runtime — hand it to him in one line, don't go look yourself.** The grep proves the code exists, not that it renders. Close that gap by *telling him where to look*, not by driving a browser:

   ```
   我没打开看。你扫一眼：hero 画出来没有（不是白屏），
   开「减弱动态效果」刷新后是不是定格在一张构图。
   ```

   Screenshot only if he asks. **And never claim a pass you didn't run** — 「静态检查通过，没打开看」 is a complete delivery line; 「已验证渲染正常」 after a grep is not.

## D. Layout Discipline (hard)

- [ ] **Hero fits the viewport** — headline ≤2 lines, subtext ≤20 words, CTA visible without scroll. Max 4 text elements.
- [ ] **Nav** single line, ≤80px tall.
- [ ] **Eyebrow count ≤ ceil(sections/3).**
- [ ] **≥4 layout families** on a long page; no family more than twice; ≤2 consecutive image+text zigzags.
- [ ] **Mobile collapse** declared per multi-column section. `min-h-dvh` over `100vh`.

### D.1 The mobile floor (hard) — test at 320 · 375 · 414 · 768

Not "narrow the window until it looks off" — those four widths. Causes and fixes: `mobile-floor.md`.

> **h5 register: run `h5-mobile.md` §10 instead of this section.** A phone-only page has no width range to survive, so most of D.1 doesn't apply — M1/M4/M6 still hold inside the frame, but M2 and M5 largely evaporate (one column, one bottom bar). Its gate list is a different set of failures: `viewport-fit=cover` present; `env(safe-area-inset-*)` on the status bar, bottom bar, sheets **and** the scroll container's bottom padding; `body` locked with a child scrolling; every hit area ≥44px with an `:active` state and no tap flash; nothing cut off at `height: 640px`; ambient motion layers **removed** rather than frozen under reduced motion.

- [ ] **M1** — `overflow-x: clip` on **both** `html` and `body`. Not `hidden` (it creates a scroll container and kills every sticky/fixed descendant — the "I fixed the scroll and broke the nav" bug).
- [ ] **M2** — every grid track that can hold an image is `minmax(0, 1fr)`, not bare `1fr`; flex children that can hold one have `min-width: 0`.
- [ ] **M3** — no button, nav link, footer link, tab, breadcrumb, or CTA wraps to two lines at **any** width from 320 up. Shorten the label first.
- [ ] **M4** — display headings carry `overflow-wrap: anywhere; min-width: 0`.
- [ ] **M5** — exactly one sticky element at `top: 0`; every other sticky offset by `--nav-h`, with `--z-nav` above `--z-sticky`.
- [ ] **M6** — nothing has both `text-transform: uppercase` and `line-height < 1.0` (see §B).
- [ ] M1/M2/M5/M6 were checked, by the optional checker (Gate 1) or by reading the CSS. **M3 and M4 no grep can see**; open the page at 320px and read it.

## E. Cheapness Scan (hard)

- [ ] No em-dashes in copy. No div-based fake screenshots. No gradient-text/glass/AI-purple as default.
- [ ] **No re-drawn environment chrome** — no hand-built browser bar (URL pill + traffic lights), phone bezel, IDE frame, or terminal window. Real screenshot in a `<figure>`, or no chrome at all. (Distinct from fake screenshots: a *real* screenshot inside a *drawn* MacBook bezel still fails.)
- [ ] No fake-precise numbers without a source. No banned beige+brass default palette.
- [ ] No identical card grids. No numbered `01·02·03` unless a real sequence.
- [ ] **Real imagery in every slot the built page has for one** — hero photograph, gallery/lookbook rail, PDP shot, H5 cover or scene, empty state, avatar row. Judged off the skeleton, not the industry; food/hotel/fashion/travel/product are the obvious cases, not the boundary. Sourced per `asset-sourcing.md` (generate/stock/placeholder), not a silent gradient-blob substitute.
- [ ] **Every image on the page has an answer to "who said yes to this?"** — the slots were named at the Design Read (`../index.md` §0.B `Images:`) and the user approved the count + source. Nothing was generated, downloaded, or hotlinked off your own inference that the brief implied it. A page that quietly spent the user's generation budget fails this check as hard as one that quietly shipped gradients.
- [ ] Real SVG logos (not text wordmarks) on any "trusted by" wall.
- [ ] Fonts chosen with a reason — not a blind reach for Inter/Fraunces/Instrument Serif.

## F. Copy Self-Audit (hard)

- [ ] Re-read every visible string. No broken grammar, unclear referents, or AI-cute wordplay.
- [ ] One copy register per page. Quotes ≤3 lines with full attribution.
- [ ] One label per CTA intent across nav/hero/footer.

## G. Accessibility (hard)

- [ ] Contrast WCAG AA — body ≥4.5:1, large ≥3:1. Includes **buttons over photos** (scrim/stroke), placeholders, helper/error text, focus rings.
- [ ] Visible focus state on every interactive element; keyboard-reachable nav + CTAs.
- [ ] Button text fits one line at **every width from 320 up** — not just desktop, which is the width where the problem never happens (`mobile-floor.md` M3).
- [ ] Touch targets ≥44px. Form labels above inputs (never placeholder-as-label).

## H. Performance (soft)

- [ ] Animate only `transform`/`opacity` (`clip-path` allowed; height only for expand/collapse). **This line is hard, not soft**: it is a house rule (`references/core/params.md`). `will-change` sparingly.
- [ ] Heavy engines lazy-loaded. Responsive images (WebP/AVIF, `srcset`). CLS < 0.1.

## H.1 House rules (hard — they win over every gate above)

From `references/core/params.md` and `references/ux/ux-laws.md`. A page that passes §A–§H and fails one of these is not done.

- [ ] **Frequency gate** — nothing a person does 100+ times a day animates; it gets press feedback only.
- [ ] **One highlight per screen** — the primary action on a page people operate, the primary number on a page people read. A second filled accent button on the same screen is demoted to outline.
- [ ] **Red only for errors and dangerous actions** — never the primary button.
- [ ] **Hover effects** sit behind `@media (hover: hover) and (pointer: fine)`; **every animation has a reduced-motion form**.
- [ ] **UI motion numbers** (press feedback, popovers, dropdowns, toasts, drawers) come only from `references/core/params.md` or the project's motion spec. Brand-page storytelling may run longer, on the same curves.
- [ ] **Both views exist** — a desktop view and a phone view for every page and card (h5: the desktop view is the 560px phone frame).
- [ ] **No npm package was installed without the user's yes**, and none duplicates a library the project already had.

---

### The four ship-tests (from overdrive thinking)

1. **wow** — would someone who hasn't seen it react?
2. **removal** — if you delete the engine, is the experience clearly worse?
3. **device** — still smooth on a phone / Chromebook?
4. **context** — does this spectacle actually serve *this* brand and audience, or is it showing off?

If "removal" or "context" fails, the spectacle is decoration, not craft. Cut or rework it.

---

## I. Strategic Omissions (soft — but separate a prototype from a real deliverable)

These don't affect visual output but are what get noticed after launch:

- [ ] **Custom 404 page** — a framework default is not acceptable for a brand page.
- [ ] **Legal links** (Privacy Policy, Terms of Service) in the footer — required for any real launch.
- [ ] **Skip-to-content link** (`<a href="#main" class="sr-only focus:not-sr-only">`) for keyboard users — satisfies WCAG 2.4.1.
- [ ] **"Back" navigation** — every page is reachable from at least one other page. No dead ends in user flows.
- [ ] **No placeholder data left** ("Jane Doe", lorem ipsum, `email@example.com`) in shipped output.
- [ ] **Form validation wired** — client-side on blur, errors state cause + fix ("Password needs 8+ chars", not "Invalid").

---

## J. Self-Grading Loop (run last, before saying "done")

Generate 5 sharp questions about your specific output, then answer each with concrete evidence from the code/copy you wrote — not a generic "yes." If any answer reveals a failure, fix it before shipping.

**Template — fill in with your actual output:**

1. **Engine check:** "Did I ship a working `[engine type]`, or is there a gradient blob/placeholder where the hero should be?" → [evidence]
2. **Soul check:** "Is the soul I picked (`[persona name]`) actually visible in the palette, typeface, and motion — or did I drift back to a generic aesthetic?" → [evidence]
3. **HARD BAN sweep:** "Does the copy contain any em-dashes? Are there any eyebrow labels on more than 1-in-3 sections? Any fake numbers?" → [evidence]
4. **Substrate check:** "Did I apply grain, type tension (negative tracking + weight contrast), and translucent borders to every section — or just the hero?" → [evidence]
5. **Dial honesty:** "Is the page I built actually `SPECTACLE=[n]` and `DENSITY=[n]`, or did I under-deliver on what I committed to?" → [evidence]

**A "yes" with no evidence = unverified = fail.** Re-read the output, quote the specific line or value that proves it.
