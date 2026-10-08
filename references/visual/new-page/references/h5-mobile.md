<!-- 第三方开源内容（MIT），已按本库规则修改；版权声明见仓库根目录 THIRD_PARTY_NOTICES.md -->

# H5 — Pages That Only Ever Live on a Phone

<!-- 目录:开始（自动生成，别手改；改了标题就跑 python3 tools/toc.py） -->
**本文件目录**（全文 562 行；先看这里，再按行号只读用得上的那一节）

- 第 48–78 行：0. Is this an H5 page?
- 第 80–160 行：1. The Frame — the one skeleton every H5 page shares
- 第 162–211 行：2. Safe areas and the thumb — the two hard constraints
- 第 213–250 行：3. Touch — the rules that have no desktop equivalent
- 第 252–373 行：4. The six morphologies
  - 第 256–309 行：A · App shell — *tabs, lists, detail, settings*
  - 第 311–331 行：B · Paged deck — *campaign / 活动页, one message per screen*
  - 第 333–344 行：C · Snap narrative — *data report, year-in-review*
  - 第 346–358 行：D · Commerce stack — *mobile PDP*
  - 第 360–362 行：E · Longform site — *mobile 官网*
  - 第 364–373 行：F · Ambient screen — *weather, poster, single-purpose*
- 第 375–468 行：5. The native furniture
- 第 470–480 行：6. Type, density, color inside 390px
- 第 482–504 行：7. Motion & reduced-motion
- 第 506–516 行：8. Images & performance
- 第 518–535 行：9. The H5 cheapness list
- 第 537–550 行：10. H5 pre-flight
- 第 552–562 行：11. Recording the build
<!-- 目录:结束 -->

The **fourth register.** `brand` / `product` / `commerce` all describe pages that are *primarily* desktop and *also* have to survive a phone. This file is the inverse: pages where the phone **is** the target, the desktop is the degraded case, and the viewport is a **fixed 390×844 rectangle** rather than a range to be responsive across.

That inversion changes almost every mechanical decision, which is why it can't be a section inside `product-ui.md`:

| | brand / product / commerce | **h5** |
|---|---|---|
| Viewport | a **range** — 320 → 1920, breakpoints | one **fixed** rect (~390×844); desktop is the fallback |
| What scrolls | the **page** (`body`) | a **container** (`body` is locked; `#app` scrolls) |
| Layout unit | columns and grids that reflow | a **single column** that never reflows |
| Chrome | nav bar, footer | **status bar · TabBar · home indicator** — OS furniture |
| Input | pointer, hover states | **touch only** — no hover exists |
| Bottom of screen | least valuable (footer) | **most valuable** — the thumb lives there |
| Vertical budget | infinite scroll | ~700px of usable height, hard-bounded by safe areas |

> **This is not `mobile-floor.md`.** That file is about a **desktop page not breaking** when it reaches a phone — six mechanical failures (`overflow-x`, `minmax(0,1fr)`, sticky collisions, all-caps leading). This file is about a page that has **no desktop form at all**. You still inherit the universal craft floor from `design-dna.md` §1 (tinted neutrals, no `#fff`/`#000`, translucent borders, contrast floors) and the cheapness blacklist (`../index.md` §6). `mobile-floor.md`'s M1/M4/M6 still apply inside the frame. But M2 (grid tracks) and M5 (competing stickies) mostly evaporate — there's one column and one bottom bar.

> **Neighbouring files, and where they win.** This file is the phone-only frame. A page that also has a desktop view is not built here: its phone view follows `references/core/platforms.md` §2.2 and its navigation follows `references/visual/navigation.md` (one nav in three widths, safe-area code, 11 styles). On every number those two files state — tab count, hit area, icon size, press timing, tab switching without animation, the 16px side margin, 16px input text — they win over this file. Motion numbers come from `references/core/params.md`; the gesture constants (10px direction lock, 0.11 px/ms fling) are there too, the gesture recipes are `references/recipes/gesture.md`, and gesture feel and materials are `references/build/apple-feel.md`. A React Native / Expo screen is written per `references/build/rn.md`, not from this file's CSS. When the project has a `DESIGN.md`, its tokens replace every colour, radius and type value below.

---

## 0. Is this an H5 page?

Yes if **any** of these is true:

- The brief names a phone-only artifact: **H5**、**移动端**、**小程序页面**、**公众号页面**、**活动页**、**落地页(手机)**, "mobile app UI", "app prototype", "in-app page", "WeChat page".
- The deliverable is a **screen**, not a site: an app screen, a prototype flow, a marketing 活动页 that will be opened from a chat message or a QR code.
- The design has **OS furniture** in it — a status bar, a TabBar, a home indicator, a native-feeling push transition.
- The user is going to look at it **in a phone frame** (a 390×844 mock), not in a browser window.

**The ambiguity, and how to settle it in one question.** "做一个手机端的页面" is genuinely two different jobs:

> *"这个页面只在手机上打开，还是电脑上也要好看？"*

- **Phone only** → h5. Build the frame (§1), single column, OS furniture.
- **Both** → it's `brand` or `product` with `mobile-floor.md` applied. Do **not** build the phone frame; a real responsive page in a 406px box is a worse desktop page, not a better one.

**Then split by the page's job** — this picks the morphology (§4) and the dials:

| The page is… | Morphology (§4) | SOUL | SPECTACLE | DENSITY |
|---|---|---|---|---|
| an **app screen** (tabs, lists, detail, settings) | **A · App shell** | 6 | 3 | 6–8 |
| a **工作台** on a phone — 每日工作台 / 打卡页 / 值守台 (revolves around one thing he does over and over, not a batch of business objects) | **A.1 · Daily desk** | 6 | 2 | 4–5 |
| a **campaign / 活动页** (coupon, launch, invite) | **B · Paged deck** | 8 | 6 | 3–4 |
| a **数据报告 / year-in-review** | **C · Snap narrative** | 8 | 6 | 5 |
| a **商品详情 / PDP** (mobile commerce) | **D · Commerce stack** | 6 | 3 | 8 |
| a **mobile site** (longform, brand, 官网) | **E · Longform site** | 7 | 5 | 6 |
| an **immersive single screen** (weather, poster) | **F · Ambient screen** | 9 | 7–8 | 2–3 |

> **The register-mixing rule.** h5 is a *container* register: it fixes the frame, the furniture, and the touch rules. The **content grammar underneath still comes from the other three.** A mobile PDP is `h5` + `commerce-ui.md`. An app dashboard screen is `h5` + `product-ui.md` (§0 substrate, charts via `chart-crafting.md`). A 活动页 is `h5` + the brand substrate and a soul. Load both files. h5 never replaces the content reference — it wraps it.

---

## 1. The Frame — the one skeleton every H5 page shares

Every H5 page is the same four-layer box. Get this wrong and nothing above it can be right.

```html
<body>                    <!-- locked; never scrolls; dark surround on desktop -->
  <div class="phone">     <!-- the viewport; 100% on a phone, a framed 406px on desktop -->
    <div class="status">  <!-- fake OS status bar — flex:none -->
    <div id="app">        <!-- THE ONLY SCROLL CONTAINER — flex:1; overflow-y:auto -->
    <nav class="tabbar">  <!-- absolute, bottom-anchored, above the scroll -->
    <div class="sheet">   <!-- absolute, translateY(102%) until opened -->
    <div class="home-ind"><!-- the home indicator pill -->
  </div>
</body>
```

### 1.A The contract — copy this verbatim

```html
<meta name="viewport"
      content="width=device-width, initial-scale=1, viewport-fit=cover, maximum-scale=1, user-scalable=no">
<meta name="theme-color" content="#3f95dd">
```

`viewport-fit=cover` is what makes `env(safe-area-inset-*)` return real numbers instead of `0px` — without it §2 silently no-ops and your content sits under the notch. `maximum-scale=1, user-scalable=no` stops the double-tap zoom that makes a fixed-frame UI feel broken. `theme-color` tints the browser chrome to match the page.

> **The one exception:** if the H5 page is **text-heavy and read** (a reader, an article, a longform 官网), drop `maximum-scale=1, user-scalable=no` — you are taking away pinch-zoom from people who need it, and there is no fixed-frame benefit to protect on a page that just scrolls. Two of the eighteen reference templates do exactly this.

> **Check before you copy `maximum-scale=1, user-scalable=no`.** It takes pinch-zoom away (WCAG 1.4.4), and the library's own nav recipe (`references/visual/navigation.md`) ships the meta without it. Keep it only for a framed, app-like screen with no reading text. To stop double-tap zoom alone, `touch-action: manipulation` on the tappable elements does it and leaves pinch-zoom working. Either way, input text stays ≥ 16px so iOS Safari does not zoom the page on focus (`references/core/platforms.md` §2.2).

### 1.B The shell CSS — the load-bearing part

```css
* { box-sizing: border-box; margin: 0; padding: 0;
    -webkit-tap-highlight-color: transparent; }   /* §3 — kills the grey flash */
html, body { height: 100%; overflow-x: clip; }
body {
  overflow: hidden;                  /* THE PAGE DOES NOT SCROLL. #app does. */
  background: #08090b;               /* the desktop surround */
  display: flex; align-items: center; justify-content: center;
}
.phone {
  position: relative; width: 100%; height: 100%; overflow: hidden;
  background: var(--bg);
  display: flex; flex-direction: column;   /* status | #app | (absolutes) */
}
#app {
  flex: 1; overflow-y: auto; overflow-x: clip;
  padding-bottom: calc(env(safe-area-inset-bottom) + 108px);  /* clear the TabBar — §2.C */
}
#app::-webkit-scrollbar { width: 0; }       /* a scrollbar inside a phone is a tell */
```

**`body { overflow: hidden }` + `#app { overflow-y: auto }` is the whole architecture.** It is the opposite of every other register, and it buys three things at once: the status bar and TabBar stay put without `position: fixed` (which is unreliable inside iOS Safari's collapsing chrome), the rubber-band bounce is contained, and a bottom sheet can be `position: absolute` against `.phone` instead of fighting the document.

> **Multi-tab variant.** In morphology A each tab usually owns **its own scroll container** (`.view`, one per tab, only the active one displayed) rather than sharing a single `#app`. That's the same architecture — locked `body`, scrolling child — and it buys one important thing: each tab keeps its own scroll position when you switch away and back, which is what native does and what users expect. The bottom-padding rule (§2.C) then applies to **every** `.view`, not just one element; forgetting it on the third tab is a classic partial fix.

> **Why `100%` and not `100dvh`.** Inside `.phone` the height is already bounded by the flex parent, so `dvh` buys nothing and costs a reflow when iOS chrome collapses. `dvh` is the right answer for a **scrolling** mobile page (`mobile-floor.md`); it is the wrong answer inside a fixed frame. None of the eighteen reference templates use it.

### 1.C The desktop frame — one media query, identical in all eighteen templates

On a real phone the page is edge-to-edge. On a desktop it becomes a phone sitting on a backdrop — the only responsive rule an H5 page has.

```css
@media (min-width: 560px) {
  body { background: radial-gradient(120% 90% at 50% 0%, #16181d 0%, #08090b 62%); }
  .phone {
    width: 406px; height: min(880px, 94vh);
    border-radius: 46px;
    border: 1px solid rgba(255,255,255,.1);
    box-shadow: 0 46px 120px -30px rgba(0,0,0,.9),   /* the drop */
                0 0 0 10px #0b0c0e;                  /* the bezel — a spread-only ring */
  }
}
```

**Read the second shadow.** `0 0 0 10px` with no blur is the device bezel, drawn as a shadow so it costs no layout. Tint it to the page: near-black bezel on a dark page, `#2a2622` warm-charcoal on a cream page, `#fff` on the pastel scene. The `radial-gradient` backdrop should be a **desaturated relative of the page's own palette**, never a neutral grey — grey reads as an unstyled screenshot.

`min(880px, 94vh)` is the part people get wrong: a fixed `844px` overflows a 13" laptop and the bottom bar goes off-screen. `94vh` keeps a breathing margin at any window height.

---

## 2. Safe areas and the thumb — the two hard constraints

### 2.A `env()` everywhere, and always in a `calc()`

The insets are `0px` on desktop and in the frame, so the `calc()` degrades correctly with zero extra rules. Never write a bare `padding-top: 44px`.

```css
.status  { height:  calc(env(safe-area-inset-top) + 44px);
           padding: env(safe-area-inset-top) 24px 0; }
.tabbar  { bottom:  calc(env(safe-area-inset-bottom) + 16px); }
.sheet   { padding: 12px 22px calc(env(safe-area-inset-bottom) + 20px); }
#app     { padding-bottom: calc(env(safe-area-inset-bottom) + 108px); }
.home-ind{ bottom:  calc(env(safe-area-inset-bottom) + 5px); }
```

All eighteen reference templates use `env()`; the count per file runs from 3 to 11. **If a file has zero, it is broken on every notched phone** and you won't see it in a desktop frame — this is the single most common H5 defect, and it is invisible in exactly the environment you're building in.

### 2.B The status bar is yours to draw

Inside a frame there's no real OS bar, so the page draws one: `9:41` on the left, signal/wifi/battery SVGs on the right, `12.5px / 500`, `currentColor` so it inverts with the page theme. It costs ~10 lines and it is the difference between "a web page" and "an app screen".

Set the clock from the real time (`toTimeString().slice(0,5)`) — a hardcoded `9:41` is an Apple-mock tell that reads as a stolen screenshot.

### 2.C The thumb zone inverts the page

On a 844px-tall screen the thumb comfortably reaches roughly the **bottom 55%**. This flips desktop hierarchy:

- **Primary actions go to the bottom.** TabBar, buy bar, FAB, sheet CTA. Never a top-right "提交" — it's the least reachable pixel on the screen.
- **The top is for display, not interaction.** Title, hero number, cover image. A back button top-left is the one accepted exception (muscle memory beats reach).
- **`#app` needs bottom padding equal to the bar height + inset**, or the last row of content hides under the TabBar forever. `108px` is the working value for a 62px floating bar (`62 + 16 gap + 30 breathing`).

### 2.D Bleed the horizontal rails

A horizontal scroller inside a padded column must **escape the padding**, or the last card looks clipped and the first has no run-up:

```css
.rail {
  display: flex; gap: 12px; overflow-x: auto;
  margin: 14px -20px 0;     /* negative = the page's own side padding */
  padding: 0 20px 4px;      /* positive = puts the inset back inside the scroller */
  scrollbar-width: none; scroll-snap-type: x mandatory;
}
.rail::-webkit-scrollbar { display: none; }
.rail::after { content: ""; flex: none; width: 8px; }  /* tail breathing room */
.rail > * { flex: none; scroll-snap-align: center; }
```

The `margin`/`padding` mirror is the whole trick: content still aligns with the column, but the scroll track runs edge to edge.

---

## 3. Touch — the rules that have no desktop equivalent

1. **`-webkit-tap-highlight-color: transparent` in the `*` reset.** Not optional. The default is a grey/blue flash on every tap that instantly reads as "web page in a webview".
2. **Hover does not exist. `:active` is your only free feedback.** Every tappable thing gets one: `:active { transform: scale(.96) }` or `opacity: .85`, transition 100–160ms (the press range in `references/core/params.md`; a `filter` is not animated). A button with no pressed state feels dead on a phone in a way it never does under a cursor.
3. **44×44px minimum, and it's a *hit* target, not a *visual* one.** A 24px icon lives inside a 46px button. Pad, don't grow.
4. **`{ passive: true }` on `touchstart`/`touchmove`/`wheel`** unless you are actually calling `preventDefault()` — then it must be `{ passive: false }` or the call is silently ignored. Getting this backwards is why "my swipe doesn't work" and "scrolling is janky" are the same bug.
5. **Gestures use Pointer Events, not Touch Events**, unless you need multi-touch. `pointerdown/move/up/cancel` works with mouse, touch, and pen — so a swipe you build is testable in a desktop frame. Always handle `pointercancel`; without it an interrupted drag leaves the element stuck mid-transform.
6. **Never trap the vertical scroll to build a horizontal gesture.** Only `preventDefault()` after the gesture has proven horizontal (`|dx| > |dy|` and `|dx| > 10px`, the direction-lock constant in `references/core/params.md`). Otherwise the page becomes unscrollable in the swipe region.
7. **A drag threshold separates tap from swipe.** 10px to start dragging. On release, a fling faster than 0.11 px/ms commits in its direction; otherwise ~50px of travel commits the action. Below that, animate back to rest — never leave it half-open.

```js
/* the reference swipe-to-delete, from the task-list template */
let sx = 0, cur = null, dragging = false;
list.addEventListener('pointerdown', e => {
  cur = e.target.closest('.row'); if (!cur) return;
  sx = e.clientX; dragging = false;
});
list.addEventListener('pointermove', e => {
  if (!cur) return;
  const dx = e.clientX - sx;
  if (Math.abs(dx) > 10) dragging = true;          /* 10px direction lock */
  if (dx < 0) cur.querySelector('.face').style.transform = `translateX(${Math.max(dx, -120)}px)`;
});
list.addEventListener('pointerup', e => {
  if (!cur) return;
  const dx = e.clientX - sx, face = cur.querySelector('.face');
  face.style.transform = '';                       /* hand back to the CSS transition */
  cur.classList.toggle('swiped', dragging && dx < -52);   /* distance only; a real build adds the 0.11 px/ms fling test */
  cur = null;
});
list.addEventListener('pointercancel', () => {     /* never omit this */
  if (cur) { cur.querySelector('.face').style.transform = ''; cur = null; }
});
```

A gesture is only a shortcut: the row also needs a visible control that does the same thing (`references/ux/ux-laws.md` §3). The card that flies off to the bin when deleted is `references/recipes/feedback.md` F8; direction lock and catching a moving element are `references/recipes/gesture.md` G4 and G5.

---

## 4. The six morphologies

Pick one in §0. They are structurally different pages, not themes — mixing two is how an H5 page ends up feeling like a website.

### A · App shell — *tabs, lists, detail, settings*

`status | #app | floating TabBar`. Three to five tabs (with only two, use a top segmented control instead — `references/visual/navigation.md`), each a `<section>` toggled by class (not a route). Detail opens as a **push layer** (§5.D), not a new page. This is the default for anything that behaves like an app.

The TabBar has two accepted forms: **floating pill** (`left/right: 18px`, `border-radius: 99px`, `backdrop-filter: blur(22px)`) or **edge-to-edge bar** (`left/right: 0`, `border-top: 1px hairline`). The pill reads modern and lets content scroll visibly beneath it; the bar reads utilitarian and is safer on a busy background. Pick one — a floating pill with a top border is neither.

A **center FAB** (56px, raised, accent-filled, `:active { scale(.92) }`) may replace the middle tab when there is one dominant create action. Never add a FAB *and* a fifth tab. It opens a page or a sheet for that action rather than acting in place, and it is the only floating button on the screen (`references/visual/navigation.md`, style 6).

#### A.1 · Daily desk — **工作台 的手机身体**

**It revolves around one thing done over and over, and it is *his*.** 记账 · 喝水 · 体重 · 用药 · 喂宠 · 练腿 · 陪孩子读书 · 每日写作 · 小组站会 · 值守. Same frame and same TabBar contract as A — but the dials, the first screen and the palette latitude differ enough that building it as a generic app shell produces a page nobody opens twice.

> **This is not a phone-only species. It is one of a workbench's two bodies.**
>
> | 载体 | 壳 | 例子 |
> |---|---|---|
> | 手机上开 | **这里** — A.1，锁定手机框 + TabBar，DENSITY 4–5 | `../examples/h5-fern-meal-desk.html` · `../examples/h5-peach-daily-desk.html` |
> | 电脑上开 | `product-ui.md` 的 shell，**带 A.1 的性格和克制的密度** —— 不是塞满图表的 dashboard | `../examples/relay-agent-console.html` |
>
> Same product, two bodies. Everything below — the first screen, the input cost, the soul obligation, the three added rules — **applies to both**; only the frame and the furniture are this file's.
>
> **Two things that are not the test.** **人数**：一家人共用的记账台、一个小组共用的值守台都是工作台；一个人独用的进销存仍是后台。**屏幕**：它只选身体，不定物种。The actual test — **围着一批业务对象转 → 后台；围着他反复做的一件事转 → 工作台** — lives in `../index.md` §1's resolver.
>
> **And if something is running on it** — an agent executing multi-step tasks, streamed output, a queue — layer `ai-console.md` **§9** (its phone form) on top of this. That's a capability, not a different page.

**The distinction that matters most is against a dashboard, not against A.** They look adjacent — both product-register, both stat tiles, both charts — and they are opposites in the three places that decide whether the page survives:

| | **后台 back-office** | **工作台 workbench**（两副身体都算） |
|---|---|---|
| Why it's open | there's work to process — orders, tickets, an alert | it's the time of day he checks in |
| Who writes the data | systems, integrations, other people | **he does**, in seconds, and it must cost almost nothing |
| Soul | **neutral by obligation** — it sits inside someone else's brand next to eleven other tools; personality reads as noise | **mandatory** — it's his; a neutral one has no reason to be opened a second time |
| Charts | a grid of them, comparing across the business | **one**, comparing him to his own past |
| Fails by | being unreadable | **having nothing new to say tomorrow** |

The soul row is the load-bearing one, and it is why `h5-fern-meal-desk.html` (暖沙 + 赭石, light frame) and `h5-peach-daily-desk.html` (粉彩渐变) look nothing alike despite being the same morphology. **Pouring `product-ui.md`'s neutral dashboard grammar into A.1 is the most common way to build this wrong** — the result is competent, correct, and dead by Thursday.

| | generic app shell (A) | **daily desk (A.1)** |
|---|---|---|
| DENSITY | 6–8 | **4–5** — a page you touch for 15 seconds should not be full |
| First screen | a list or a feed | **今天** — one状态 line, then the entry control within thumb reach |
| Primary action | browse | **record**, and it must be **one tap with a sensible default**, never a form |
| Charts | as needed | **one**, and it looks back at *his own* past — a gauge, a ring, a small curve. Not a dashboard's grid of four |
| Fails by | unreadable | **nothing new to see tomorrow** — the top line is identical every day, so the third open is the last one |

**The examples are the spec.** `../examples/h5-fern-meal-desk.html` (warm sand + ochre, light phone frame, 11-segment arc gauge, FAB + scan sheet) and `../examples/h5-peach-daily-desk.html` (pastel gradient, three habits on one concentric ring, mood/water/weight tiles). Open both before building — they are the same morphology at opposite ends of the palette range, which is the point: **rotate the soul, never the furniture** (§11).

**Three rules this variant adds:**

1. **The top line must contain something that changed since yesterday.** A greeting, a date, or a total that only grows are all constants wearing a variable's clothes. If nothing on the page can differ tomorrow, the page has no reason to be opened tomorrow — and a browser page has no push notification to rescue it.
2. **Day-one state is a designed screen, not a `--`.** He arrives with zero rows. Compose what that screen says and what single action it invites; an empty gauge reading `0` is how a daily page dies before it starts. This is a real image slot too (`asset-sourcing.md`).
3. **Every extra field costs more than it looks.** Input is the tax; the payoff must visibly exceed it. Three fields per entry is already a form, and a form at 23:50 is a page he stops opening. Derive what you can (weekday, streak, deltas) instead of asking.

> **This is the interface half of a personal workbench.** If the brief arrives without its modules, its fields, or what the top line reads on day one, that half is not this file's job: ask for it through `references/ux/interview.md`, or read it from the project's `PRODUCT.md` (writing one is `references/core/product-brief.md`). The user would rather just see something? Build from the two examples and **name your assumptions in the Design Read**, where they cost one line to correct.

### B · Paged deck — *campaign / 活动页, one message per screen*

Full-screen pages, `translateY(-100% × i)`, one idea each. Needs **three input paths** or it feels broken on one of them:

```js
deck.addEventListener('touchstart', e => y0 = e.touches[0].clientY, { passive: true });
deck.addEventListener('touchend',   e => {
  const dy = e.changedTouches[0].clientY - y0;
  if (Math.abs(dy) > 44) go(dy < 0 ? 1 : -1);
}, { passive: true });
deck.addEventListener('touchmove',  e => e.preventDefault(), { passive: false }); // must be false
let lock = 0;
deck.addEventListener('wheel', e => {              /* desktop frame — needs a cooldown */
  const now = performance.now();
  if (now - lock < 700 || Math.abs(e.deltaY) < 12) return;
  lock = now; go(e.deltaY > 0 ? 1 : -1);
}, { passive: true });
addEventListener('keydown', e => { /* ArrowUp/Down, PageUp/Down, Space */ });
```

The `wheel` cooldown is what stops one trackpad flick from firing six page turns. Stagger each screen's entrance (`--i * 70ms`) so a page turn has internal rhythm instead of arriving as one slab.

### C · Snap narrative — *data report, year-in-review*

The deck's scrolling cousin: real scroll, `scroll-snap-type: y mandatory` + `scroll-snap-stop: always` per screen, plus a top progress bar. Cheaper and more robust than a deck — use it whenever the content is a *sequence of facts* rather than a *sequence of slides*.

```css
#app { overflow-y: auto; scroll-snap-type: y mandatory; }
.scr { min-height: 100%; scroll-snap-align: start; scroll-snap-stop: always;
       padding: calc(env(safe-area-inset-top) + 64px) 28px calc(env(safe-area-inset-bottom) + 56px);
       display: flex; flex-direction: column; justify-content: center; }
```

Numbers count up on entry via `IntersectionObserver` (`easeOutCubic`, 900–1400ms, once) — a report's story beat. A KPI on an app screen follows `references/recipes/chart.md` instead: 300–500ms, once per session. Charts are hand-built per `chart-crafting.md` — the SVG rules are identical, only the width budget changes.

### D · Commerce stack — *mobile PDP*

Load **`commerce-ui.md`** with this. The vertical order is near-fixed and deviating from it costs conversion:

```
snap gallery + pager  →  price / title / tags  →  countdown (only if real)  →
SKU row (opens sheet)  →  delivery & service  →  spec table  →
reviews  →  rich detail images  →  [ sticky buy bar ]
```

The **buy bar** is `position: absolute; bottom: 0`, `padding-bottom: calc(env(safe-area-inset-bottom) + 11px)`, and holds `[icon] [icon] [加入购物车 | 立即购买]` as one rounded segmented control. **The SKU sheet is mandatory** — never inline variant selection into the page; the sheet is what lets price and stock update in one place. Anti-dark-pattern rules from `commerce-ui.md` apply unchanged: no fake countdown, no fake stock, no pre-checked add-ons.

The add-to-cart arc (a 22px ball on a two-segment bezier into the cart icon, then a badge `scale(1)→1.5→1` pop) is the one piece of decorative motion that earns its place here — it answers "did that work?" without a toast. The badge pop is `spring-pop`, and it plays only when the count goes from 0 to 1; later adds just change the number (`references/visual/navigation.md`).

### E · Longform site — *mobile 官网*

The only morphology where `.phone` scrolls like a normal page. Sticky header that gains `background + backdrop-filter` past ~40px (class toggle, not `mix-blend-mode`), section rhythm, horizontal product rails (§2.D), accordion specs, and a **bottom CTA bar that rises after the first viewport**. Everything in `page-crafting.md` applies; the width budget is just 390px.

### F · Ambient screen — *weather, poster, single-purpose*

One screen, no tabs, no scroll — or one small scroll into a bottom sheet. Carried by a full-bleed image/illustration/SVG scene, an oversized ultralight number (`font-weight: 200`, 92–120px), and a **white bottom drawer** holding the data. Highest SOUL and SPECTACLE of the six; lowest density.

Two mechanics make it work:

- **Scene crossfade.** Two stacked `<img>`/`<svg>` layers, opacity swap over ~1s. Each scene carries its own `--z` bottom-anchored scale (`transform-origin: 50% 100%`) so the horizon lands above the drawer, and its own veil strength (`--v1/--v2`) so the same white type stays legible on a bright sky and a grey one. **Per-scene veil values, not one global scrim** — that's the detail that separates this from a stock-photo hero.
- **Effects branch per scene.** Rain = N falling lines; night = twinkling dots; clear = a breathing sun glow + gliding birds. All CSS keyframes, de-synced by `--i`. A single shared ambient loop (very slow Ken Burns, 30s alternate) keeps the still image from reading as dead.

---

## 5. The native furniture

These six components are what make the page read as an app. Build them from these recipes; they are load-bearing and there is no reason to reinvent them per project.

### 5.A Bottom sheet

```css
.scrim { position: absolute; inset: 0; z-index: 50; background: rgba(0,0,0,.4);
         opacity: 0; pointer-events: none; transition: opacity .3s ease; }
.scrim.on { opacity: 1; pointer-events: auto; }
.sheet {
  position: absolute; left: 0; right: 0; bottom: 0; z-index: 55;
  background: var(--sheet-bg); border-radius: 28px 28px 0 0;
  padding: 12px 22px calc(env(safe-area-inset-bottom) + 20px);
  transform: translateY(102%);              /* 102, not 100 — hides the shadow */
  transition: transform .44s var(--ease-drawer);   /* cubic-bezier(.32,.72,0,1) — sheets and drawers only */
  max-height: 82%; overflow-y: auto;
}
.sheet.on { transform: none; }
```

`102%` is deliberate: at exactly `100%` a box-shadow or a 1px border still peeks along the bottom edge. Always ship the **grab handle** (`42×4px`, `border-radius: 99px`, 14% ink) — it's how users know it's draggable/dismissible even before they try. The scrim must be tappable to dismiss. `--ease-drawer` is the one curve `references/core/params.md` reserves for drawers and bottom sheets, and `.44s` sits inside its 200–500ms range. Dragging the sheet shut is a gesture, not a transition: `references/recipes/motion.md` M7.

On a dark page the sheet is usually **light** (`#fbfbfc`) — a deliberate inversion that reads as a system surface, and it doesn't violate the color lock because it's OS furniture, not brand surface.

### 5.B TabBar

```css
.tabbar {
  position: absolute; z-index: 50; left: 18px; right: 18px;
  bottom: calc(env(safe-area-inset-bottom) + 16px);
  height: 62px; border-radius: 99px;
  background: rgba(23,26,30,.86); backdrop-filter: blur(22px) saturate(160%);
  border: 1px solid var(--line);
  display: flex; align-items: center; justify-content: space-around; padding: 0 10px;
  box-shadow: 0 18px 40px -18px rgba(0,0,0,.9);
}
.tabbar button { width: 46px; height: 46px; border-radius: 50%;   /* 46 > 44 ✓ */
                 display: grid; place-items: center; color: var(--dim);
                 transition: background-color .15s ease, color .15s ease, transform .12s var(--ease); }   /* no `all`; only the press animates */
.tabbar button.on { background: var(--txt); color: var(--bg); }   /* filled, not tinted */
```

Icons `24px`, `stroke-width: 1.7`, `fill: none`, `stroke-linecap/linejoin: round` — a consistent stroke icon set is most of what makes a TabBar look designed. The active state should be a **filled shape**, not just a color change: at 24px a hue shift is nearly invisible in daylight.

A tab is tapped a hundred times a day, so switching is not animated: the selected state changes at once (150ms `ease` on colour at most) and only the press gives feedback, 100–160ms (`references/visual/navigation.md`). Icon-only buttons each carry an `aria-label`; the bar is a `<nav aria-label>` and the current item has `aria-current="page"`. On a page whose `body` scrolls — not this register — the same bar is `position: fixed`; that version, with its tablet and desktop forms, is in `references/visual/navigation.md`.

### 5.C Home indicator

`118×4px`, `border-radius: 99px`, `opacity: .16`, `bottom: calc(env(safe-area-inset-bottom) + 5px)`, centered, `z-index` above the TabBar. Four lines that complete the illusion. Skip it only if the design has an edge-to-edge bar already sitting in that space.

### 5.D Push transition

The native "detail slides in from the right", in six lines:

```css
.detail { position: absolute; inset: 0; z-index: 60; background: var(--bg);
          transform: translateX(100%); transition: transform .42s var(--ease);
          display: flex; flex-direction: column; }
.detail.on { transform: none; }
```

Keep the list mounted underneath — going back must not reset its scroll position. `--ease` is `cubic-bezier(.23,1,.32,1)`, the `--ease-out` of `references/core/params.md`: fast out, long settle, no overshoot. Only the sheet in §5.A takes `--ease-drawer`.

### 5.E FLIP zoom transition

When a detail view should feel like it *grew from* the thing you tapped (a photo, a card), don't cross-fade — FLIP it. Hand-written, no library:

```js
function openFlip(fromEl, i) {
  fill(i);                                   /* populate the detail BEFORE measuring */
  const r = fromEl.getBoundingClientRect(), p = phone.getBoundingClientRect();
  detail.classList.add('on');
  if (RM) { detail.style.transform = 'none'; detail.style.opacity = 1; return; }  /* §7 */
  detail.style.transition = 'none';
  detail.style.transform =
    `translate(${(r.left - p.left).toFixed(1)}px, ${(r.top - p.top).toFixed(1)}px)
     scale(${(r.width / p.width).toFixed(4)}, ${(r.height / p.height).toFixed(4)})`;
  detail.style.opacity = '.2';
  requestAnimationFrame(() => {              /* one frame later, or it never animates */
    detail.style.transition = 'transform .5s var(--ease), opacity .3s ease';   /* full-screen change: 500ms at most */
    detail.style.transform = 'none';
    detail.style.opacity = '1';
  });
}
```

Measure against `.phone`, **not the viewport** — inside the desktop frame those differ by hundreds of pixels and the animation flies in from off-screen. The `requestAnimationFrame` is mandatory: setting the start and end transform in the same frame produces no transition at all.

### 5.F Toast & pull-to-refresh

Toast: absolute, `bottom: calc(TabBar height + inset + 12px)`, auto-dismiss 2.4s, one line, with an **undo affordance** if it reports a destructive action. Pull-to-refresh: only when the list genuinely refetches; a decorative spinner that reloads nothing is worse than no gesture. Inside a WebView, turn the shell's own bounce off first or the two dampings stack (`references/core/platforms.md` §3).

---

## 6. Type, density, color inside 390px

- **Body text `14–15px`, never below `12px`.** `11px` is legible on a Retina phone and unreadable on a cheap one. Secondary/meta text bottoms out at `11.5px` and must carry ≥4.5:1.
- **No `clamp()` display type.** There is no width range to respond to — `clamp()` inside a fixed frame is dead code that hides a decision. Use fixed px. Hero numbers `72–120px`; screen titles `19–24px / 700–800`; section headers `15–17px`.
- **The oversized-ultralight number** (`font-weight: 200`, `92–120px`, `letter-spacing: -.03em`) is the signature H5 hero move — a temperature, a price, a score. It works because a phone screen has no other element that can carry that much visual weight.
- **Vertical rhythm is tighter than desktop.** Card padding `14–18px` (not 24–32), card gap `9–12px`, section gap `22–28px`, page side padding `16–24px` (16px is the library's phone default, `references/core/platforms.md` §2.2; go wider only for an airy layout). Desktop spacing inside a 390px frame wastes a third of the screen.
- **Corner radii run large.** Cards `16–22px`, sheets `28–30px`, pills `99px`. Small radii read as web; large radii read as app.
- **One accent, and the color lock still applies** (`../index.md` §3; palette families in `design-dna.md` §6) — but OS furniture (a white sheet on a dark page, a system-grey separator) is exempt.
- **Test contrast against the *photo*, not the token.** Morphology F puts white type on an image; that's `page-crafting.md` §2.B's scrim stack, and it's the most common a11y failure in this register.

---

## 7. Motion & reduced-motion

The motion gate from `page-crafting.md` §0 is unchanged and **mandatory** — read the probes once, branch per effect:

```js
const RM = matchMedia('(prefers-reduced-motion:reduce)').matches;
```

```css
@media (prefers-reduced-motion: reduce) {
  * { animation-duration: .01ms !important; animation-iteration-count: 1 !important;
      transition-duration: .01ms !important; }
  .fly, .fx { display: none; }        /* purely decorative layers: remove, don't freeze */
}
```

All eighteen reference templates ship this block. Note the second line: for H5, **ambient effect layers** (falling rain, drifting particles, a flying cart ball) should be *removed* under reduced motion, not slowed to `.01ms` — a rain layer frozen mid-fall is a still image of streaks, which is worse than clear sky. Structural transforms (`.sheet`, `.detail`, `.tabbar`) keep their terminal states.

`FINE` (`(hover:hover) and (pointer:fine)`) gates almost nothing here — you're on touch by definition. Spend the budget on `:active` states instead.

**Entrance choreography** is the cheapest craft in this register: `animation: rise .7s var(--ease) both calc(var(--i) * 70ms)`. Stagger 60–80ms per item, cap the total at ~600ms. It costs four lines and it is most of the difference between "rendered" and "arrived". Those are campaign numbers — first-screen storytelling on morphologies B, C, E and F. An app screen (A, A.1, D) is product UI: `rise .3s`, stagger 30–80ms, the whole group within 300ms, played once per session. A screen opened many times a day does not replay its entrance, and a tab switch plays none (`references/core/params.md`).

---

## 8. Images & performance

> **Where do the images come from? Ask before you build, not after.** This register leans on photography harder than any other — morph F *is* a full-bleed scene, morph B is campaign art, morph C is a scene per section, morph D is product shots — and none of those briefs say "food/hotel/fashion", so the category-shaped instinct never fires and the screen quietly ships a gradient. **Name the image slots in the Design Read** (`../index.md` §0.B's `Images:` line): how many, what each depicts, and where they'd come from in this session. Then follow `asset-sourcing.md` — including its gate: naming them is an **offer the user answers**, never permission to generate or download because the morphology obviously wants pictures.

- **Everything is at DPR 3.** A 390px-wide hero is a 1170px image. Under-supply and it's mush; over-supply and a 活动页 opened over 4G never paints.
- **Full-bleed scene images:** `object-fit: cover; object-position: 50% 100%` plus a per-scene `transform: scale(var(--z))` with `transform-origin: 50% 100%` — bottom-anchored so the horizon survives the drawer (§4.F).
- **Lazy-load anything below the first screen** (`loading="lazy"`), and give every `<img>` explicit dimensions or an `aspect-ratio` — CLS on a phone is far more visible than on desktop.
- **`backdrop-filter` is the most expensive property in this register.** It's what makes glass cards work, and stacking eight of them over a background photo will drop a mid-range Android below 30fps. Cap it at ~4 simultaneously visible, and never animate a blurred element's size. On a low-end Android WebView turn the blur off and ship an opaque bar or card instead (`references/core/platforms.md` §3).
- Animate `transform`/`opacity` only, as everywhere else.

---

## 9. The H5 cheapness list

`anti-cheap.md` applies in full. These are the additional tells specific to this register:

- **No `env(safe-area-inset-*)` anywhere** — the page is broken on every notched phone and looks fine in your frame. The #1 defect.
- **A desktop layout squeezed into 406px** — multi-column grids, a wide nav with 6 links, desktop-sized padding. If it reflowed to get here, it's not an H5 page.
- **A visible scrollbar inside the phone frame.**
- **Grey tap flash** on every button (`-webkit-tap-highlight-color` not reset).
- **Nothing happens on press** — no `:active` state anywhere.
- **A hardcoded `9:41`** status bar, or a status bar with real content underneath it (no safe-area padding).
- **The bottom bar covering the last content row** — missing `#app` bottom padding.
- **`position: fixed` for the TabBar** instead of `absolute` inside the frame — works in the mock, drifts on iOS Safari.
- **A sheet with no grab handle**, or a scrim that isn't tappable to dismiss.
- **Copy-pasted iOS chrome** — real SF Symbols, a literal iOS segmented control, Apple's exact blue. Draw furniture in the page's own language.
- **A frame with a neutral-grey backdrop** — the surround should be a desaturated relative of the page palette.
- **Fake countdowns / fake stock** on morphology D (`commerce-ui.md`).

---

## 10. H5 pre-flight

Run alongside `preflight.md`. These gates are specific to the register and none are optional.

1. **Notch test.** `env()` present on: status bar, bottom bar, sheet, `#app` bottom padding. `viewport-fit=cover` in the meta.
2. **Frame test.** At ≥560px the page is a phone on a backdrop, bezel and all. At <560px it's edge-to-edge with no leftover frame CSS.
3. **Scroll test.** `body` does not scroll. `#app` does, with no visible scrollbar, and the last content row clears the bottom bar.
4. **Touch test.** Every interactive element ≥44px hit area, has an `:active` state, and no grey tap flash. All gesture listeners declare `passive` correctly and handle `pointercancel`.
5. **Height test.** At `height: 640px` (an SE-class screen) nothing is cut off and no bar overlaps content. At `min(880px, 94vh)` in a 13" window, the bottom bar is visible.
6. **Reduced-motion test.** The block is present; ambient layers are removed, not frozen; every transform has a terminal state.
7. **Contrast test.** Text over images/scenes at every scene state, not just the default one.
8. **Furniture test.** Status bar clock is real; TabBar active state is a filled shape; home indicator present; sheet has a grab handle.

---

## 11. Recording the build

H5 builds log like any other (`divergence.md` §4, `../index.md` §8.0), with `register=h5` and the morphology recorded in the layout axis:

```css
/* bryan-uiux · register=h5 · morph=A-app-shell · A=true-black+coral · B=Jakarta-800/400
 * C=ring-hero+capsule-bars+floating-pill-tabbar · D=SVG-ring-suite · E=night-tracker
 * SOUL=7 SPECTACLE=5 DENSITY=8 */
```

Rotation applies to the **soul axes (A/B/E)** and to the morphology, but **not to the furniture**. Every app's TabBar should look like every other app's TabBar — that's a convention users navigate by, exactly like the dashboard-navigation carve-out in `divergence.md` §0. Diverge on the palette, the type, the metaphor, the chart language. Do not diverge on where the back button is.
