<!-- 第三方开源内容（Apache-2.0），本文件已修改；版权声明和许可证全文见仓库根目录 THIRD_PARTY_NOTICES.md -->

<!-- 目录:开始（自动生成，别手改；改了标题就跑 python3 tools/toc.py） -->
**本文件目录**（全文 790 行；先看这里，再按行号只读用得上的那一节）

  - 第 32–34 行：Purpose
  - 第 36–46 行：Hard Invariants
  - 第 48–56 行：Setup
  - 第 58–68 行：Assessment Orchestration
  - 第 70–82 行：Assessment A: Design Review
  - 第 84–103 行：Assessment B: Mechanical Evidence
  - 第 105–197 行：Generate Combined Critique Report
  - 第 199–205 行：Deliver the Report
  - 第 207–229 行：Ask the User
  - 第 231–259 行：Recommended Actions
- 第 261–790 行：Reference Material
  - 第 265–372 行：Cognitive Load Assessment
  - 第 374–611 行：Heuristics Scoring Guide
    - 第 378–580 行：Nielsen's 10 Heuristics
    - 第 582–596 行：Score Summary
    - 第 598–611 行：Issue Severity (P0–P3)
  - 第 613–790 行：Persona-Based Design Testing
    - 第 621–646 行：1. Impatient Power User: "Alex"
    - 第 648–673 行：2. Confused First-Timer: "Jordan"
    - 第 675–701 行：3. Accessibility-Dependent User: "Sam"
    - 第 703–728 行：4. Deliberate Stress Tester: "Riley"
    - 第 730–755 行：5. Distracted Mobile User: "Casey"
    - 第 757–770 行：Selecting Personas
    - 第 772–790 行：Project-Specific Personas
<!-- 目录:结束 -->

### Purpose

Resolve one stable target, run two independent assessments, synthesize a design critique, write it out in the reply, and ask the user what to improve next. The chat response is the deliverable. Critique is read-only: it edits nothing, and nothing is stored by a program.

### Hard Invariants

- Assessment A (design review) and Assessment B (mechanical evidence: source scan plus screenshots) are both required.
- Assessment A and B MUST run as two isolated sub-agents whenever a sub-agent/Task tool is exposed. Running them inline in this context is "possible" but is NOT permitted; it is a degraded run. Inline is allowed ONLY when no sub-agent tool exists (or the user declined, on harnesses that ask).
- If you degrade for any reason, the report's first line MUST be a banner: `⚠️ DEGRADED: single-context (<reason>)`. A silent degraded critique is a failed critique.
- Assessment A must finish before Assessment B's findings enter the parent synthesis context. A mechanical checklist is easy to verify, but it still anchors judgment.
- A skipped Assessment B is a failed critique run.
- Viewable targets require browser inspection when available.
- Any local server started only for critique screenshots must run in the background, have a recorded stop method, and be stopped before final reporting unless the user asks to keep it.
- The question is the LAST thing in the response. Write the entire report out first, then ask; nothing follows the question. Prose emitted after a structured question is withheld until the user answers it, so a report written after the question reads as if the critique never ran.
- A run that ends with neither the targeted questions nor a literal `Questions skipped: <reason>` line is an incomplete run. The report is not the finish; the close is.

### Setup

1. **Resolve the target** to a concrete file path or URL. Prefer a source path over a dev-server URL when both identify the same surface; ports drift, paths do not.
   - "the homepage" -> `site/pages/index.astro` or `index.html`
   - "the settings modal" -> the primary component file
   - "this page" -> the current URL or source file
   - several pages (the default finishing run) -> one resolved path per page; every page is reviewed, and every finding names its page
2. **The project is already identified** by the main entry (`SKILL.md` step 1). Judge the surface against its `PRODUCT.md`, `DESIGN.md` and motion spec; do not repeat that step here.
3. **Drop findings the user has already declared intentional** in this conversation. Drop them silently; that is the only prior-run input critique consumes.

### Assessment Orchestration

Delegate Assessment A and Assessment B to separate sub-agents. They must not see each other's output. Do not show findings to the user until synthesis.

Sub-agent gate (all harnesses):
- Unless a harness-specific gate below overrides this, spawn A and B as two isolated, parallel sub-agents whenever a sub-agent/Task tool is exposed. This is the default and is mandatory; do not run them inline because it is faster.
- "Unavailable" means exactly one thing: no sub-agent/Task tool is exposed in this session (or, on harnesses that ask, the user declined). It does not mean inconvenient.
- If and only if sub-agents are unavailable, fall back sequentially: finish and record Assessment A, then run Assessment B, then synthesize, and emit the degraded banner.
- Whichever path you take, declare it in the report header (see Report header provenance). Skipping sub-agents without the banner is the most common failure of this command.

If browser automation is available, each assessment creates its own new tab. Never reuse an existing tab, even if it is already at the right URL.

### Assessment A: Design Review

Read relevant source files and visually inspect the live page, at desktop 1440px and phone 390px, when browser automation is available. Think like a design director.

Evaluate:
- **Design specificity**: Is the composition, interaction, and visual language grounded in this product, or could an unrelated product use it unchanged? Make this judgment before seeing Assessment B's findings.
- **Holistic design**: hierarchy, IA, emotional fit, discoverability, composition, typography, color, accessibility, states, copy, and edge cases.
- **Cognitive load**: consult the [Cognitive Load Assessment](#cognitive-load-assessment) section below; report checklist failures and decision points with >4 visible options.
- **Emotional journey**: peak-end rule, emotional valleys, reassurance at high-stakes moments.
- **Nielsen heuristics**: consult the [Heuristics Scoring Guide](#heuristics-scoring-guide) section below; score all 10 heuristics 0-4, marking any heuristic the mode-applicability rule allows as `n/a` instead of forcing a number.
- **House rules**: report any breach of the house rules listed in [../index.md](../index.md): more than one highlight on a screen, red used for anything but errors and dangerous actions, a page or card with only one of its two views (desktop, phone).

Return: design-specificity verdict, heuristic scores, cognitive load, emotional journey, 2-3 strengths, 3-5 priority issues, persona red flags, minor observations, and provocative questions.

### Assessment B: Mechanical Evidence

Collect the mechanical evidence by hand; no program does it. Assessment B is mandatory and must remain isolated from Assessment A until both are complete.

Source scan:

- Read the target's markup and style files directly. Walk the Verify and Refuse lists in [craft-floor.md](craft-floor.md) item by item and record each hit with its rule name, file, and line.
- For very large trees (500+ scannable files), narrow scope or ask.

Screenshots are required for a viewable target when browser automation is available. Use a localhost dev/static URL for local files; avoid `file://` unless the available browser explicitly supports this workflow. Screenshot flow:

1. Create a fresh tab and navigate. Prefer the harness's native/browser-canvas screenshot path before hand-rolling a Playwright/Puppeteer script; only fall back to a custom script when no native browser tool is exposed.
2. Take screenshots at 1440px wide (desktop) and 390px wide (phone), from the top of the page, in every theme the surface ships.
3. Walk the same two lists against the screenshots: contrast, spacing, type, states, overflow, touch targets.
4. For a multi-view target, cover every page in scope, not a sample.
5. If the page cannot be rendered, skip the screenshots, judge from the code, and say so in the report.

Return: findings with counts, rule names, and file locations; false positives; and skipped/failed browser steps with concrete reasons.

After Assessment B returns usable findings, reuse them. Do not repeat the scan in the parent unless Assessment B failed, was truncated, or omitted count, rule names, or file locations.

### Generate Combined Critique Report

Synthesize both assessments into a single report. Do NOT simply concatenate. Weave the findings together, noting where the design review and the mechanical evidence agree, where the mechanical pass caught issues the design review missed, and where mechanical findings are false positives.

The chat response is the primary user-facing deliverable. Present the full structured critique below in chat; do not replace it with a summary and a link.

Structure your feedback as a design director would:

#### Report header provenance

The report's first line MUST declare how the assessments were run, so a degraded run is never silent:
- Dual-agent: `Method: dual-agent (A: <agent-id> · B: <agent-id>)`
- Degraded: `⚠️ DEGRADED: single-context (<reason, e.g. no sub-agent tool exposed>)`

#### Design Health Score
> *Consult the [Heuristics Scoring Guide](#heuristics-scoring-guide) section below.*

Present the Nielsen's 10 heuristics scores as a table:

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | ? | [specific finding or "n/a" if solid] |
| 2 | Match System / Real World | ? | |
| 3 | User Control and Freedom | ? | |
| 4 | Consistency and Standards | ? | |
| 5 | Error Prevention | ? | |
| 6 | Recognition Rather Than Recall | ? | |
| 7 | Flexibility and Efficiency | ? | |
| 8 | Aesthetic and Minimalist Design | ? | |
| 9 | Error Recovery | ? | |
| 10 | Help and Documentation | ? | |
| **Total** | | **??/[applicable max]** | **[Rating band]** |

The applicable maximum is 4 times the number of heuristics you actually scored: **/40** when all ten apply, **/32** when two are `n/a`. Never print `/40` over a partial set.

Be honest with scores. A 4 means genuinely excellent. Most real interfaces score 20-32 out of 40.

**Mode applicability**: heuristics 7 (Flexibility and Efficiency) and 10 (Help and Documentation) may be scored `n/a` on Persuade and Experience surfaces (landing pages, campaigns, portfolios, bodies of work), as may any other heuristic that genuinely cannot apply to the surface under review. Write `n/a` in the Score cell with a one-line reason, and renormalize the total to the applicable maximum (e.g. **24/32** when two heuristics are n/a) so the rating band stays proportional. The report must state the applicable maximum and which heuristics were scored n/a.

#### Design Specificity Verdict

**Start here.** Does the result feel authored for this product, or category-interchangeable?

**LLM assessment**: Your unanchored evaluation of design specificity. Cover overall coherence, structural sameness, category-interchangeable choices, and missed opportunities for product character.

**Mechanical evidence**: Summarize what Assessment B found, with counts and file locations. Note any additional issues it caught that the design review missed, and flag any false positives.

**Screenshots**: Say which pages, widths (1440px, 390px), and themes the evidence covers. If a page could not be rendered, say that it was judged from code.

#### Overall Impression
A brief gut reaction: what works, what doesn't, and the single biggest opportunity.

#### What's Working
Highlight 2-3 things done well. Be specific about why they work.

#### Priority Issues
The 3-5 most impactful design problems, ordered by importance.

For each issue, tag with **P0-P3 severity** (see [Issue Severity below](#issue-severity-p0p3) for definitions):
- **[P?] What**: Name the problem clearly
- **Why it matters**: How this hurts users or undermines goals
- **Fix**: What to do about it (be concrete)
- **Suggested command**: Which command could address this (from: /bryan-uiux adapt, /bryan-uiux audit, /bryan-uiux bolder, /bryan-uiux clarify, /bryan-uiux colorize, /bryan-uiux critique, /bryan-uiux delight, /bryan-uiux distill, /bryan-uiux document, /bryan-uiux harden, /bryan-uiux layout, /bryan-uiux onboard, /bryan-uiux optimize, /bryan-uiux overdrive, /bryan-uiux polish, /bryan-uiux quieter, /bryan-uiux typeset). Two kinds of problem have no command in this stage: for a motion problem name `references/review/motion-review.md` (review the existing motion) or `references/build/web.md` (write the fix); for a structure or flow problem name `references/ux/ux-laws.md`.

#### Persona Red Flags
> *Consult the [Personas reference](#persona-based-design-testing) below.*

Auto-select 2-3 personas most relevant to this interface type (use the selection table in the reference). If the project has a `PRODUCT.md`, also generate 1-2 project-specific personas from its users and brand information.

For each selected persona, walk through the primary user action and list specific red flags found:

**Alex (Power User)**: No keyboard shortcuts detected. Form requires 8 clicks for primary action. Forced modal onboarding. High abandonment risk.

**Jordan (First-Timer)**: Icon-only nav in sidebar. Technical jargon in error messages ("404 Not Found"). No visible help. Will abandon at step 2.

Be specific. Name the exact elements and interactions that fail each persona. Don't write generic persona descriptions; write what broke for them.

#### Minor Observations
Quick notes on smaller issues worth addressing.

#### Questions to Consider
Provocative questions that might unlock better solutions:
- "What if the primary action were more prominent?"
- "Does this need to feel this complex?"
- "What would a confident version of this look like?"

**Remember**:
- Be direct. Vague feedback wastes everyone's time.
- Be specific. "The submit button," not "some elements."
- Say what's wrong AND why it matters to users.
- Give concrete suggestions. Cut "consider exploring..." entirely.
- Prioritize ruthlessly. If everything is important, nothing is.
- Don't soften criticism. Developers need honest feedback to ship great design.

### Deliver the Report

Write the full report into the chat response now. This is the deliverable, and it is the only place the findings live: no program stores a snapshot, a score, or a trend. `/bryan-uiux polish` and the targeted commands take their findings from this report in the current conversation; in a later session the user carries them over by giving the list.

After the report and before the questions, add one line for the score over time. When an earlier critique of the same target is in this conversation, put its total beside the new one, each with its own denominator (`24/32 → 30/40`), and note when the two runs scored different heuristic sets, so the line is not a like-for-like comparison. If this is the first run for the target, say so: "First run for this target, no trend yet."

The report is not the end of the run. Go to Ask the User below and emit the questions, or the `Questions skipped: <reason>` line when the count allows it. Stopping at the report leaves the user with findings and no way forward, and leaves `/bryan-uiux polish` with no priorities to inherit.

### Ask the User

**After presenting findings**, use targeted questions based on what was actually found. STOP and ask the user. These answers will shape the action plan.

Ask in the same message that carries the report, with the report written out first and the question last. Do not split the two across turns: a turn that ends on the report is a turn that ends, and the questions never arrive. Order within the message is what matters, because prose emitted after a structured question is withheld until the user answers. In the default finishing run, where `critique` and `audit` run together, write both reports out first and ask once, after the second report.

Ask questions along these lines (adapt to the specific findings; do NOT ask generic questions):

1. **Priority direction**: Based on the issues found, ask which category matters most to the user right now. For example: "I found problems with visual hierarchy, color usage, and information overload. Which area should we tackle first?" Offer the top 2-3 issue categories as options.

2. **Design intent**: If the critique found a tonal mismatch, ask whether it was intentional. For example: "The interface feels clinical and corporate. Is that the intended tone, or should it feel warmer/bolder/more playful?" Offer 2-3 tonal directions as options based on what would fix the issues found.

3. **Scope**: Ask how much the user wants to take on. For example: "I found N issues. Want to address everything, or focus on the top 3?" Offer scope options like "Top 3 only", "All issues", "Critical issues only".

4. **Constraints** (optional; only ask if relevant): If the findings touch many areas, ask if anything is off-limits. For example: "Should any sections stay as-is?" This prevents the plan from touching things the user considers done.

**Rules for questions**:
- Every question must reference specific findings from the report. Never ask generic "who is your audience?" questions.
- Keep it to 2-4 questions maximum. Respect the user's time.
- Offer concrete options, not open-ended prompts.
- Skipping is allowed only when the report listed **fewer than 3 Priority Issues**. Count them; do not judge the findings "straightforward" by feel. At 3 or more, the questions are required.

**Final-question gate.** The user-visible response must either include the targeted questions or carry the literal line `Questions skipped: <reason>` naming the count that permitted the skip. Each question must include 2-3 concrete answer options tied to the actual critique findings. Do not end with only open-ended questions, and do not end with neither: stopping after the report, having asked nothing and printed no skip line, is the most common way this command fails.

### Recommended Actions

**After receiving the user's answers**, present a prioritized action summary reflecting the user's priorities and scope from Ask the User.

#### Action Summary

List recommended commands in priority order, based on the user's answers:

1. **`/command-name`**: Brief description of what to fix (specific context from critique findings)
2. **`/command-name`**: Brief description (specific context)
...

**Rules for recommendations**:
- Only recommend commands from: /bryan-uiux adapt, /bryan-uiux audit, /bryan-uiux bolder, /bryan-uiux clarify, /bryan-uiux colorize, /bryan-uiux critique, /bryan-uiux delight, /bryan-uiux distill, /bryan-uiux document, /bryan-uiux harden, /bryan-uiux layout, /bryan-uiux onboard, /bryan-uiux optimize, /bryan-uiux overdrive, /bryan-uiux polish, /bryan-uiux quieter, /bryan-uiux typeset
- Order by the user's stated priorities first, then by impact
- Each item's description should carry enough context that the command knows what to focus on
- Map each Priority Issue to the appropriate command
- Skip commands that would address zero issues
- If the user chose a limited scope, only include items within that scope
- If the user marked areas as off-limits, exclude commands that would touch those areas
- End with `/bryan-uiux polish` as the final step if any fixes were recommended

After presenting the summary, tell the user:

> You can ask me to run these one at a time, all at once, or in any order you prefer.
>
> Re-run `/bryan-uiux critique` after fixes to see your score improve.

---

## Reference Material

The sections below were previously separate reference files (`cognitive-load.md`, `heuristics-scoring.md`, `personas.md`). They live inline now so the critique flow has all its deep context in one place.

### Cognitive Load Assessment

Cognitive load is the total mental effort required to use an interface. Overloaded users make mistakes, get frustrated, and leave. This reference helps identify and fix cognitive overload.

---

#### Three Types of Cognitive Load

##### Intrinsic Load: The Task Itself
Complexity inherent to what the user is trying to do. You can't eliminate this, but you can structure it.

**Manage it by**:
- Breaking complex tasks into discrete steps
- Providing scaffolding (templates, defaults, examples)
- Progressive disclosure: show what's needed now, hide the rest
- Grouping related decisions together

##### Extraneous Load: Bad Design
Mental effort caused by poor design choices. **Eliminate this ruthlessly.** It's pure waste.

**Common sources**:
- Confusing navigation that requires mental mapping
- Unclear labels that force users to guess meaning
- Visual clutter competing for attention
- Inconsistent patterns that prevent learning
- Unnecessary steps between user intent and result

##### Germane Load: Learning Effort
Mental effort spent building understanding. This is *good* cognitive load; it leads to mastery.

**Support it by**:
- Progressive disclosure that reveals complexity gradually
- Consistent patterns that reward learning
- Feedback that confirms correct understanding
- Onboarding that teaches through action, not walls of text

---

#### Cognitive Load Checklist

Evaluate the interface against these 8 items:

- [ ] **Single focus**: Can the user complete their primary task without distraction from competing elements?
- [ ] **Chunking**: Is information presented in digestible groups (≤4 items per group)?
- [ ] **Grouping**: Are related items visually grouped together (proximity, borders, shared background)?
- [ ] **Visual hierarchy**: Is it immediately clear what's most important on the screen?
- [ ] **One thing at a time**: Can the user focus on a single decision before moving to the next?
- [ ] **Minimal choices**: Are decisions simplified (≤4 visible options at any decision point)?
- [ ] **Working memory**: Does the user need to remember information from a previous screen to act on the current one?
- [ ] **Progressive disclosure**: Is complexity revealed only when the user needs it?

**Scoring**: Count the failed items. 0–1 failures = low cognitive load (good). 2–3 = moderate (address soon). 4+ = high cognitive load (critical fix needed).

---

#### The Working Memory Rule

**Humans can hold ≤4 items in working memory at once** (Miller's Law revised by Cowan, 2001).

At any decision point, count the number of distinct options, actions, or pieces of information a user must simultaneously consider:
- **≤4 items**: Within working memory limits, manageable
- **5–7 items**: Pushing the boundary; consider grouping or progressive disclosure
- **8+ items**: Overloaded; users will skip, misclick, or abandon

**Practical applications**:
- Action buttons: 1 primary, 1–2 secondary, group the rest in a menu
- Navigation menus: ≤5 top-level items (group the rest under clear categories)
- Long-form articles: one reading path; gather related links into a single block at the end instead of scattering them mid-flow
- Documentation sidebars: ≤4 sibling choices visible per level before grouping kicks in
- Portfolio and gallery indexes: one decision per screen (which piece to open), not filter, sort, and tag controls all at once

---

#### Common Cognitive Load Violations

##### 1. The Wall of Options
**Problem**: Presenting 10+ choices at once with no hierarchy.
**Fix**: Group into categories, highlight recommended, use progressive disclosure.

##### 2. The Memory Bridge
**Problem**: User must remember info from step 1 to complete step 3.
**Fix**: Keep relevant context visible, or repeat it where it's needed.

##### 3. The Hidden Navigation
**Problem**: User must build a mental map of where things are.
**Fix**: Always show current location (breadcrumbs, active states, progress indicators).

##### 4. The Jargon Barrier
**Problem**: Technical or domain language forces translation effort.
**Fix**: Use plain language. If domain terms are unavoidable, define them inline.

##### 5. The Visual Noise Floor
**Problem**: Every element has the same visual weight; nothing stands out.
**Fix**: Establish clear hierarchy: one primary element, 2–3 secondary, everything else muted.

##### 6. The Inconsistent Pattern
**Problem**: Similar actions work differently in different places.
**Fix**: Standardize interaction patterns. Same type of action = same type of UI.

##### 7. The Multi-Task Demand
**Problem**: Interface requires processing multiple simultaneous inputs (reading + deciding + navigating).
**Fix**: Sequence the steps. Let the user do one thing at a time.

##### 8. The Context Switch
**Problem**: User must jump between screens/tabs/modals to gather info for a single decision.
**Fix**: Co-locate the information needed for each decision. Reduce back-and-forth.

---

### Heuristics Scoring Guide

Score each of Nielsen's 10 Usability Heuristics on a 0–4 scale. Be honest: a 4 means genuinely excellent, not "good enough."

#### Nielsen's 10 Heuristics

##### 1. Visibility of System Status

Keep users informed about what's happening through timely, appropriate feedback.

**Check for**:
- Loading indicators during async operations
- Confirmation of user actions (save, submit, delete)
- Progress indicators for multi-step processes
- Current location in navigation (breadcrumbs, active states)
- Form validation feedback (inline, not just on submit)

**Scoring**:
| Score | Criteria |
|-------|----------|
| 0 | No feedback; user is guessing what happened |
| 1 | Rare feedback; most actions produce no visible response |
| 2 | Partial; some states communicated, major gaps remain |
| 3 | Good; most operations give clear feedback, minor gaps |
| 4 | Excellent; every action confirms, progress is always visible |

##### 2. Match Between System and Real World

Speak the user's language. Follow real-world conventions. Information appears in natural, logical order.

**Check for**:
- Familiar terminology (no unexplained jargon)
- Logical information order matching user expectations
- Recognizable icons and metaphors
- Domain-appropriate language for the target audience
- Natural reading flow (left-to-right, top-to-bottom priority)

**Scoring**:
| Score | Criteria |
|-------|----------|
| 0 | Pure tech jargon, alien to users |
| 1 | Mostly confusing; requires domain expertise to navigate |
| 2 | Mixed; some plain language, some jargon leaks through |
| 3 | Mostly natural; occasional term needs context |
| 4 | Speaks the user's language fluently throughout |

##### 3. User Control and Freedom

Users need a clear "emergency exit" from unwanted states without extended dialogue.

**Check for**:
- Undo/redo functionality
- Cancel buttons on forms and modals
- Clear navigation back to safety (home, previous)
- Easy way to clear filters, search, selections
- Escape from long or multi-step processes

**Scoring**:
| Score | Criteria |
|-------|----------|
| 0 | Users get trapped; no way out without refreshing |
| 1 | Difficult exits; must find obscure paths to escape |
| 2 | Some exits; main flows have escape, edge cases don't |
| 3 | Good control; users can exit and undo most actions |
| 4 | Full control; undo, cancel, back, and escape everywhere |

##### 4. Consistency and Standards

Users shouldn't wonder whether different words, situations, or actions mean the same thing.

**Check for**:
- Consistent terminology throughout the interface
- Same actions produce same results everywhere
- Platform conventions followed (standard UI patterns)
- Visual consistency (colors, typography, spacing, components)
- Consistent interaction patterns (same gesture = same behavior)

**Scoring**:
| Score | Criteria |
|-------|----------|
| 0 | Inconsistent everywhere; feels like different products stitched together |
| 1 | Many inconsistencies; similar things look/behave differently |
| 2 | Partially consistent; main flows match, details diverge |
| 3 | Mostly consistent; occasional deviation, nothing confusing |
| 4 | Fully consistent; cohesive system, predictable behavior |

##### 5. Error Prevention

Better than good error messages is a design that prevents problems in the first place.

**Check for**:
- Confirmation before destructive actions (delete, overwrite)
- Constraints preventing invalid input (date pickers, dropdowns)
- Smart defaults that reduce errors
- Clear labels that prevent misunderstanding
- Autosave and draft recovery

**Scoring**:
| Score | Criteria |
|-------|----------|
| 0 | Errors easy to make; no guardrails anywhere |
| 1 | Few safeguards; some inputs validated, most aren't |
| 2 | Partial prevention; common errors caught, edge cases slip |
| 3 | Good prevention; most error paths blocked proactively |
| 4 | Excellent; errors nearly impossible through smart constraints |

##### 6. Recognition Rather Than Recall

Minimize memory load. Make objects, actions, and options visible or easily retrievable.

**Check for**:
- Visible options (not buried in hidden menus)
- Contextual help when needed (tooltips, inline hints)
- Recent items and history
- Autocomplete and suggestions
- Labels on icons (not icon-only navigation)

**Scoring**:
| Score | Criteria |
|-------|----------|
| 0 | Heavy memorization; users must remember paths and commands |
| 1 | Mostly recall; many hidden features, few visible cues |
| 2 | Some aids; main actions visible, secondary features hidden |
| 3 | Good recognition; most things discoverable, few memory demands |
| 4 | Everything discoverable; users never need to memorize |

##### 7. Flexibility and Efficiency of Use

Accelerators, invisible to novices, speed up expert interaction.

**Check for**:
- Keyboard shortcuts for common actions
- Customizable interface elements
- Recent items and favorites
- Bulk/batch actions
- Power user features that don't complicate the basics

**Scoring**:
| Score | Criteria |
|-------|----------|
| 0 | One rigid path; no shortcuts or alternatives |
| 1 | Limited flexibility; few alternatives to the main path |
| 2 | Some shortcuts; basic keyboard support, limited bulk actions |
| 3 | Good accelerators; keyboard nav, some customization |
| 4 | Highly flexible; multiple paths, power features, customizable |

##### 8. Aesthetic and Minimalist Design

Interfaces should not contain irrelevant or rarely needed information. Every element should serve a purpose.

**Check for**:
- Only necessary information visible at each step
- Clear visual hierarchy directing attention
- Purposeful use of color and emphasis
- No decorative clutter competing for attention
- Focused, uncluttered layouts

**Scoring**:
| Score | Criteria |
|-------|----------|
| 0 | Overwhelming; everything competes for attention equally |
| 1 | Cluttered; too much noise, hard to find what matters |
| 2 | Some clutter; main content clear, periphery noisy |
| 3 | Mostly clean; focused design, minor visual noise |
| 4 | Perfectly minimal; every element earns its pixel |

##### 9. Help Users Recognize, Diagnose, and Recover from Errors

Error messages should use plain language, precisely indicate the problem, and constructively suggest a solution.

**Check for**:
- Plain language error messages (no error codes for users)
- Specific problem identification ("Email is missing @" not "Invalid input")
- Actionable recovery suggestions
- Errors displayed near the source of the problem
- Non-blocking error handling (don't wipe the form)

**Scoring**:
| Score | Criteria |
|-------|----------|
| 0 | Cryptic errors; codes, jargon, or no message at all |
| 1 | Vague errors; "Something went wrong" with no guidance |
| 2 | Clear but unhelpful; names the problem but not the fix |
| 3 | Clear with suggestions; identifies problem and offers next steps |
| 4 | Perfect recovery; pinpoints issue, suggests fix, preserves user work |

##### 10. Help and Documentation

Even if the system is usable without docs, help should be easy to find, task-focused, and concise.

**Check for**:
- Searchable help or documentation
- Contextual help (tooltips, inline hints, guided tours)
- Task-focused organization (not feature-organized)
- Concise, scannable content
- Easy access without leaving current context

**Scoring**:
| Score | Criteria |
|-------|----------|
| 0 | No help available anywhere |
| 1 | Help exists but hard to find or irrelevant |
| 2 | Basic help; FAQ or docs exist, not contextual |
| 3 | Good documentation; searchable, mostly task-focused |
| 4 | Excellent contextual help; right info at the right moment |

---

#### Score Summary

**Total possible**: 40 points (10 heuristics × 4 max)

| Score Range | Rating | What It Means |
|-------------|--------|---------------|
| 36–40 | Excellent | Minor polish only; ship it |
| 28–35 | Good | Address weak areas, solid foundation |
| 20–27 | Acceptable | Significant improvements needed before users are happy |
| 12–19 | Poor | Major UX overhaul required; core experience broken |
| 0–11 | Critical | Redesign needed; unusable in current state |

When heuristics were scored `n/a`, the maximum is lower than 40; read the band off the percentage instead of the raw number (90%+ Excellent, 70%+ Good, 50%+ Acceptable, 30%+ Poor, below that Critical). 24/32 is 75%, so Good.

---

#### Issue Severity (P0–P3)

Tag each individual issue found during scoring with a priority level:

| Priority | Name | Description | Action |
|----------|------|-------------|--------|
| **P0** | Blocking | Prevents task completion entirely | Fix immediately; this is a showstopper |
| **P1** | Major | Causes significant difficulty or confusion | Fix before release |
| **P2** | Minor | Annoyance, but workaround exists | Fix in next pass |
| **P3** | Polish | Nice-to-fix, no real user impact | Fix if time permits |

**Tip**: If you're unsure between two levels, ask: "Would a user contact support about this?" If yes, it's at least P1.

---

### Persona-Based Design Testing

Test the interface through the eyes of 5 distinct user archetypes. Each persona exposes different failure modes that a single "design director" perspective would miss.

**How to use**: Select 2–3 personas most relevant to the interface being critiqued. Walk through the primary user action as each persona. Report specific red flags, not generic concerns.

---

#### 1. Impatient Power User: "Alex"

**Profile**: Expert with similar products. Expects efficiency, hates hand-holding. Will find shortcuts or leave.

**Behaviors**:
- Skips all onboarding and instructions
- Looks for keyboard shortcuts immediately
- Tries to bulk-select, batch-edit, and automate
- Gets frustrated by required steps that feel unnecessary
- Abandons if anything feels slow or patronizing

**Test Questions**:
- Can Alex complete the core task in under 60 seconds?
- Are there keyboard shortcuts for common actions?
- Can onboarding be skipped entirely?
- Do modals have keyboard dismiss (Esc)?
- Is there a "power user" path (shortcuts, bulk actions)?

**Red Flags** (report these specifically):
- Forced tutorials or unskippable onboarding
- No keyboard navigation for primary actions
- Slow animations that can't be skipped
- One-item-at-a-time workflows where batch would be natural
- Redundant confirmation steps for low-risk actions

---

#### 2. Confused First-Timer: "Jordan"

**Profile**: Never used this type of product. Needs guidance at every step. Will abandon rather than figure it out.

**Behaviors**:
- Reads all instructions carefully
- Hesitates before clicking anything unfamiliar
- Looks for help or support constantly
- Misunderstands jargon and abbreviations
- Takes the most literal interpretation of any label

**Test Questions**:
- Is the first action obviously clear within 5 seconds?
- Are all icons labeled with text?
- Is there contextual help at decision points?
- Does terminology assume prior knowledge?
- Is there a clear "back" or "undo" at every step?

**Red Flags** (report these specifically):
- Icon-only navigation with no labels
- Technical jargon without explanation
- No visible help option or guidance
- Ambiguous next steps after completing an action
- No confirmation that an action succeeded

---

#### 3. Accessibility-Dependent User: "Sam"

**Profile**: Uses screen reader (VoiceOver/NVDA), keyboard-only navigation. May have low vision, motor impairment, or cognitive differences.

**Behaviors**:
- Tabs through the interface linearly
- Relies on ARIA labels and heading structure
- Cannot see hover states or visual-only indicators
- Needs adequate color contrast (4.5:1 minimum)
- May use browser zoom up to 200%

**Test Questions**:
- Can the entire primary flow be completed keyboard-only?
- Are all interactive elements focusable with visible focus indicators?
- Do images have meaningful alt text?
- Is color contrast WCAG AA compliant (4.5:1 for text)?
- Does the screen reader announce state changes (loading, success, errors)?

**Red Flags** (report these specifically):
- Click-only interactions with no keyboard alternative
- Missing or invisible focus indicators
- Meaning conveyed by color alone (red = error, green = success)
- Unlabeled form fields or buttons
- Time-limited actions without extension option
- Custom components that break screen reader flow

---

#### 4. Deliberate Stress Tester: "Riley"

**Profile**: Methodical user who pushes interfaces beyond the happy path. Tests edge cases, tries unexpected inputs, and probes for gaps in the experience.

**Behaviors**:
- Tests edge cases intentionally (empty states, long strings, special characters)
- Submits forms with unexpected data (emoji, RTL text, very long values)
- Tries to break workflows by navigating backwards, refreshing mid-flow, or opening in multiple tabs
- Looks for inconsistencies between what the UI promises and what actually happens
- Documents problems methodically

**Test Questions**:
- What happens at the edges (0 items, 1000 items, very long text)?
- Do error states recover gracefully or leave the UI in a broken state?
- What happens on refresh mid-workflow? Is state preserved?
- Are there features that appear to work but produce broken results?
- How does the UI handle unexpected input (emoji, special chars, paste from Excel)?

**Red Flags** (report these specifically):
- Features that appear to work but silently fail or produce wrong results
- Error handling that exposes technical details or leaves UI in a broken state
- Empty states that show nothing useful ("No results" with no guidance)
- Workflows that lose user data on refresh or navigation
- Inconsistent behavior between similar interactions in different parts of the UI

---

#### 5. Distracted Mobile User: "Casey"

**Profile**: Using phone one-handed on the go. Frequently interrupted. Possibly on a slow connection.

**Behaviors**:
- Uses thumb only; prefers bottom-of-screen actions
- Gets interrupted mid-flow and returns later
- Switches between apps frequently
- Has limited attention span and low patience
- Types as little as possible, prefers taps and selections

**Test Questions**:
- Are primary actions in the thumb zone (bottom half of screen)?
- Is state preserved if the user leaves and returns?
- Does it work on slow connections (3G)?
- Can forms use autocomplete and smart defaults?
- Are touch targets at least 44×44pt?

**Red Flags** (report these specifically):
- Important actions positioned at the top of the screen (unreachable by thumb)
- No state persistence; progress lost on tab switch or interruption
- Large text inputs required where selection would work
- Heavy assets loading on every page (no lazy loading)
- Tiny tap targets or targets too close together

---

#### Selecting Personas

Choose personas based on the interface type:

| Interface Type | Primary Personas | Why |
|---------------|-----------------|-----|
| Landing page / marketing | Jordan, Riley, Casey | First impressions, trust, mobile |
| Dashboard / admin | Alex, Sam | Power users, accessibility |
| E-commerce / checkout | Casey, Riley, Jordan | Mobile, edge cases, clarity |
| Onboarding flow | Jordan, Casey | Confusion, interruption |
| Data-heavy / analytics | Alex, Sam | Efficiency, keyboard nav |
| Form-heavy / wizard | Jordan, Sam, Casey | Clarity, accessibility, mobile |

---

#### Project-Specific Personas

If the project has a `PRODUCT.md` (written by `/bryan-uiux init`, see `references/core/product-brief.md`), derive 1–2 additional personas from its `## Users` and `## Brand Commitments` sections:

1. Read the target audience description
2. Identify the primary user archetype not covered by the 5 predefined personas
3. Create a persona following this template:

```
##### [Role]: "[Name]"

**Profile**: [2-3 key characteristics derived from PRODUCT.md]

**Behaviors**: [3-4 specific behaviors based on the described audience]

**Red Flags**: [3-4 things that would alienate this specific user type]
```

Only generate project-specific personas when a real `PRODUCT.md` is available. Don't invent audience details; use the 5 predefined personas when no context exists.
