---
name: bryan-uiux
description: Bryan 的设计配方库。每次先认出当前项目（平台、DESIGN.md、动效规格 MOTION-SPEC），没有规格先起草，保证同一项目的 UI/UX 和动效统一；每个页面都要有桌面视图和手机视图，实现交给 animate（Web / WebView）/ animate-expo（RN·Expo）。内容：61 个交互配方（页面、组件、图表控件、手势、控件反馈、动效质感、网页效果）、Matter.js 物理模式、dashboard 排版方向 L1–L4、导航（手机底部 Tab / 平板竖栏 / 桌面侧边栏，11 种风格）、高级感卡片、Apple 风玻璃卡片、7 条减少摩擦的 UX 定律（希克、费茨、雅各布、米勒、峰终、邻近、冯·雷斯托夫）、AI 产品状态清单、参考组件库、图标库（Lucide / Morphicons / Lordicon）、GSAP 指南、个人口味档案。适用于 Web 应用、手机 App（RN / Expo、Capacitor）、桌面 App（Electron / Tauri）。Use when 用户说「帮我设计一下 / 好看一点 / 随便你 / 我不知道要什么样 / 现在这个好丑」；review 现有页面的 UI/UX；页面太复杂或没人点（「转化低 / 找不到按钮 / 减少摩擦」）；「加点交互 / 手感好一点 / 质感 / 高级感 / 更有生命力 / 像 iOS 那样顺」；做 dashboard、导航栏（底部 Tab、侧边栏、顶栏）、卡片；给列表·卡片·滑杆·开关·标签·步骤条·网格加反馈；手势（滑动返回、拖拽排序、下拉回弹、方向锁定、手势转场）；物理感（磁吸、液态形变、3D 视差、碰撞、掉落堆叠）；AI 界面（思考状态、流式输出、工具调用、操作确认、引用来源）；选图标库、用 GSAP；「记下来 / 收藏这个 / 这个好看 / 整理截图」；点名某个配方（主题扩散、数字翻牌、流动 Tab…）；把大白话翻译成正式效果（「鼠标放上去变大旁边让开」「像扇子一样展开」「扭成一圈」「波浪一样传开」「折一下翻过去」）。Not for 配色 / 字体 / 间距的细节（→ finesse-ui / design-taste-frontend / impeccable），也不负责扫代码找哪里缺动效（→ find-animation-opportunities）。
---

# Bryan Interactions — 交互配方库

每次调用先认出当前项目，再按这个项目自己的动效规格挑配方，最后交给 `animate`（Web）或 `animate-expo`（RN / Expo）写代码。目标：同一个项目里的动效和 UI/UX 全部统一。

## 第零步：先看是哪种叫法

| 用户怎么说 | 怎么办 |
|---|---|
| 只打 `/bryan-uiux`，后面什么都没带 | **默认走全套**：先做第一步认项目，报告 3 行（什么项目、什么平台、有没有设计规矩），再按 [references/ux/interview.md](references/ux/interview.md) 问最多 4 道选择题，最后给 2–3 套方案让用户选。不要反问「你想做什么」，自己看项目。 |
| `/bryan-uiux <页面名>`，例如「设置页」 | 同上，但范围锁定在那一页 |
| 「帮我设计一下 / 好看一点 / 随便你 / 我不知道要什么样 / 现在这个好丑」 | 同上 |
| 「没人点 / 转化低 / 太复杂 / 找不到按钮」 | 先按 [references/ux/ux-laws.md](references/ux/ux-laws.md) 的检查清单过一遍，列出违反了哪几条、各怎么改，再动手 |
| `/bryan-uiux review`、「review 一下 / 检查现在的 UI / 哪里不好」 | **只看不改**：先第一步认项目，列出所有页面，每一页都看，不只看首页（点名了页面就只看那一页）。能跑起来就截图看桌面 1440px 和手机 390px 两种宽度；跑不起来就读代码，并说明是读代码判断的。每一页按 [references/ux/ux-laws.md](references/ux/ux-laws.md) 的页面类型过 7 条清单；动效对照项目动效规格，没有规格就数一下现在用了几套时长和曲线。最后给一张表：页面 ｜ 违反哪条 ｜ 现在怎样 ｜ 怎么改 ｜ 先改哪个，按影响排序。配色、字体、间距的细节不在这里评，提示用户接着跑 `impeccable` 的 critique 和 audit。用户点了改哪几条再动手 |
| 做导航（底部 Tab、侧边栏、顶栏、「导航栏好丑」） | 按 [references/visual/navigation.md](references/visual/navigation.md) 做：手机、平板、桌面三种宽度一起出，同一组入口 |
| 点名要什么（「加个数字翻牌」） | 跳过提问，直接做 |
| 用大白话描述效果（「鼠标放上去变大旁边让开」） | 查 [references/recipes/effects.md](references/recipes/effects.md) 翻译表，复述确认后再做 |
| 丢来链接或截图，说「记下来 / 收藏这个 / 这个好看」 | 按 [references/ux/taste.md](references/ux/taste.md) 记一条收藏，只记不做 |
| 「整理截图」（截图已经拖进 `screenshot/`） | 按 [references/ux/taste.md](references/ux/taste.md) 把新截图写进索引，写完给用户一张表改猜错的 |

走全套时：先第一步认项目，再问选择题（一次一题、每题给推荐），然后给 2–3 套方案让用户选一套，**先做一屏**，桌面视图和手机视图都给用户看。

## 第一步：认项目（每次都做，不用问用户）

项目 = 当前工作目录所在的 `/var/www/<项目>/`，或用户点名的项目。只在这个项目目录里读写。

按顺序读，有就读，没有跳过：

1. `CLAUDE.md` / `AGENTS.md`：约束、能改哪里、哪份文档说了算。项目自己写明的优先级最优先（例如某份 DESIGN.md 被标注「动效部分已过期」，就不照它做动效）。
2. `PRODUCT.md`（根目录、`frontend/`、`docs/`）：给谁用、什么类型的产品。它决定动效人格。
3. 静态视觉：`DESIGN.md`、`.impeccable/design.json`、`*TOKENS*.md`、`docs/DESIGN-SYSTEM.md`。有就锁定 token。
4. 动效规格：`docs/MOTION-SPEC.md`，或名字里带 MOTION 的任何文档。
5. 平台：按 [references/core/platforms.md](references/core/platforms.md) 第 1 节判断目标平台（Web 应用、PWA、混合 App、Electron / Tauri、RN / Expo、原生），可能不止一个。再定要做哪些视图：Web 应用默认桌面视图和手机视图都要做（见 `references/core/platforms.md` 第 2.2 节）。
6. 代码：`package.json` 看已装的动效库；grep `--ease`、`--dur`、`transition`、`animation`、`spring`，看已有的动效常量和它们在哪个文件。

读完用 3 行告诉用户：这是什么项目、目标平台和视图是哪些、动效人格是什么、动效规格在不在。

## 第二步：没有动效规格就先建

- 已经有动效文档（不管叫什么名字）→ 直接用它，不另建第二份。
- 没有 → 按 [references/core/motion-spec-template.md](references/core/motion-spec-template.md) 起草 `docs/MOTION-SPEC.md`。常量从现有代码提取，已有 token 就沿用，不另起一套；人格按 `PRODUCT.md` 和 [references/core/pick.md](references/core/pick.md) 的「人格 → 配方范围」表定；意图用 `motion-design` 的三问（想让用户感觉什么、动效人格、主角时刻）。
- **给用户确认人格和常量后才写入。** 写入后在项目 `CLAUDE.md` 加一句「动效按 `docs/MOTION-SPEC.md`」；项目没有 `CLAUDE.md` 就新建一个，只写这一句。以后每个会话都会自动遵守。

## 第三步：按动效规格挑配方

1. 同一类组件已经在规格的「已采用」里 → 照用它的配方和参数，不重新挑。**这是全项目统一的关键。**
2. 在规格的「没采用」里 → 不用，除非用户明确推翻。
3. 规格里都没有 → 用 [references/core/pick.md](references/core/pick.md) 的「按场景挑」表，在人格范围内挑 1–3 个。每个都要说得出「它回答用户的哪个问题」，并过 `animate` 的两道关：频率关（每天用 100 次以上的操作不加动画）、目的关（说不出目的就不做）。配方里的「别用在」优先于用户笼统的「加点动效」。
4. **新配方列成表，给用户确认后再写代码**：配方编号 + 名字 ｜ 放在哪个元素 ｜ 回答的问题 ｜ 参数 ｜ 要不要装新包。**装任何 npm 包之前先问用户**；项目里已有同类库（例如已经有 Motion 就别再装 GSAP）就用已有的。
5. 按文末「文件地图」读对应文件拿完整配方，只读用得上的那个。
6. 按平台和输入方式落地：同一个配方在触屏、鼠标 / 触控板、键盘上各怎么做，见 `references/core/platforms.md` 第 2 节。触屏手势配方在桌面上要有鼠标或键盘的对应做法。再按屏幕宽度落地：同一页在桌面视图和手机视图怎么排、哪些配方要换，见第 2.2 节。
7. 参数按人格改写。例如「不回弹」人格把 `spring-gesture` / `spring-pop` 一律换成 `spring-ui`。改写后的值写进规格。

## 第四步：按设计流程做

结构层 → 视觉（有 `DESIGN.md` 就锁定 token，只动结构；没有时新页面用 `finesse-ui`、改版用 `design-taste-frontend`；做 dashboard 且没有 `DESIGN.md` 时，先从 `references/visual/dashboard-layouts.md` 的 L1–L4 选 1 个排版方向，写进 `DESIGN.md`，再交给 `finesse-ui`）→ `impeccable audit` → `polish` → 本库挑配方 → `animate` / `animate-expo` 实现。

- 结构层和静态视觉按 `references/ux/ux-laws.md` 的顺序：先减选项、再分组、最后只高亮 1 样（做事的页是主操作，看的页是主数字）；峰终定律留到挑配方时用。
- 静态视觉没定之前不加交互。
- 先加组件级（C / D / F），再加页面级（P）和手势（G），最后才加动效质感（M）。M 最重，最容易做过头。

## 第五步：自检，再写回规格

- 新代码里的时长、曲线、spring 只能用规格里的常量。grep 出规格外的新数值：改成常量；确实需要新值，就先加进规格的常量表。
- 同一类组件，全项目用同一个配方、同一组参数；多个平台之间也统一，只有输入方式不同。
- 每个目标平台都按 `references/core/platforms.md` 第 6 节验收一遍，不能只测一个；桌面视图和手机视图也都要看。
- 每一屏按 `references/ux/ux-laws.md` 的页面类型过一遍 7 条清单：只列没过的，先自己改好再给用户看；全过就写一行「7 条全过」。
- 这次新采用的配方写进「已采用」，考虑过但否决的写进「没采用 + 原因」，都附日期。

## 只在两种情况停下来问用户

1. 项目第一次建动效规格时，确认人格和常量。
2. 要加一个规格里还没有的新配方时。

其余全部照规格自动做。

## 配套 skill 缺席时

本库的参数词典 [references/core/params.md](references/core/params.md) 里已经写死了全部曲线、时长和 spring，**没装配套 skill 也能照常做事**：

| 缺哪个 | 怎么办 |
|---|---|
| `animate` / `animate-expo` | 直接用参数词典的数值自己写。不要自己编曲线和时长 |
| `finesse-ui` / `design-taste-frontend` | 视觉阶段按 `references/visual/dashboard-layouts.md` 定方向，用项目已有的 token |
| `impeccable` | 收尾时手动过一遍：对比度、字号层级、间距、键盘可达、reduced-motion |
| `motion-design` | 用 `references/ux/interview.md` 的 Q2 定人格，不必另外跑 |
| `pick-ui-library` | 先找项目里已有的同类组件；确实要装新库，列出 2 个候选和取舍让用户选 |

要一次装齐，仓库根目录的 `install.sh` 会从各自的上游装好（只碰 `~/.claude/skills/`，不碰项目）。

## 冲突时谁说了算

项目 `CLAUDE.md` 写明的 > 项目动效规格 > 项目 `DESIGN.md` / token > 用户明说的 > 7 条 UX 定律 `references/ux/ux-laws.md`（违反用户明说的要求时照做，只提醒一句） > 口味档案 `references/ux/taste.md`（只管方向，不管数值） > 本库参数词典 `references/core/params.md` > `animate` 默认值。

`animate` 的硬规则在任何项目都生效：高频操作不加动画、只动 `transform` / `opacity`、支持 reduced-motion。

## 文件地图

所有路径相对本 skill 目录。只读当前用得上的文件。

**core/ 每次都会用**
- 参数词典（spring、曲线、时长、手势常量）+ 通用规则 + 调参表 → [references/core/params.md](references/core/params.md)（写任何动效数值之前读）
- 人格 → 配方范围 + 按场景挑 → [references/core/pick.md](references/core/pick.md)（规格里没有现成配方时读）
- 平台适配 → [references/core/platforms.md](references/core/platforms.md)（每次都读第 2 节；WebView 项目加读第 3 节，原生加读第 5 节）
- 动效规格模板 → [references/core/motion-spec-template.md](references/core/motion-spec-template.md)（项目第一次建规格时用）

**recipes/ 交互配方**
- 页面级 P1–P8 → [references/recipes/page.md](references/recipes/page.md)
- 组件 C1–C13 → [references/recipes/component.md](references/recipes/component.md)
- 图表控件 D1–D10 → [references/recipes/chart.md](references/recipes/chart.md)
- 手势手感 G1–G7 → [references/recipes/gesture.md](references/recipes/gesture.md)
- 控件反馈 F1–F10 → [references/recipes/feedback.md](references/recipes/feedback.md)
- 动效质感 M1–M8 → [references/recipes/motion.md](references/recipes/motion.md)
- Matter.js 物理模式 M8-1–M8-7 + 参数表 → [references/recipes/physics.md](references/recipes/physics.md)（先读 M8）
- 网页视觉效果 E1–E5 + 用户原话翻译表 → [references/recipes/effects.md](references/recipes/effects.md)
- 用 GSAP 写动画 → [references/recipes/gsap.md](references/recipes/gsap.md)（曲线、时长按本库的对照表换算）

**visual/ 长什么样**（静态视觉阶段用，见第四步）
- 导航：手机底部 Tab / 平板竖栏 / 桌面侧边栏，11 种风格 → [references/visual/navigation.md](references/visual/navigation.md)
- Dashboard 排版方向 L1–L4 → [references/visual/dashboard-layouts.md](references/visual/dashboard-layouts.md)
- 高级感卡片：配色、字号层级、5 种卡片结构、微交互 → [references/visual/cards.md](references/visual/cards.md)（从零做卡片时用；项目有 `DESIGN.md` 就只借结构和层级）
- 玻璃质感 → [references/visual/glassmorphism.md](references/visual/glassmorphism.md)（配 L1 用）
- 参考组件库 + 图标库 + AI 产品状态清单 → [references/visual/libraries.md](references/visual/libraries.md)（不是配方；找效果参照、选图标库、查漏状态时读）

**ux/ 体验和流程**
- 减少摩擦的 7 条 UX 定律 + 检查清单 → [references/ux/ux-laws.md](references/ux/ux-laws.md)（出方案和自检时必须过）
- 问用户、出方案的流程 → [references/ux/interview.md](references/ux/interview.md)（见第零步）
- 口味档案（觉得好看的设计）→ [references/ux/taste.md](references/ux/taste.md)（截图和索引在 `screenshot/`；走全套和出方案时读；用户说「记下来 / 整理截图」时写）
