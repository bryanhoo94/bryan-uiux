---
name: bryan-uiux
description: Bryan 的设计配方库：每次先认出当前项目（平台、DESIGN.md、动效规格 MOTION-SPEC），没有规格就先起草，保证同一项目的动效和 UI/UX 统一。内容：61 个交互配方（页面级、组件、图表控件、手势、控件反馈、动效质感、网页效果），每条带场景、提示词、参数、打断、降级和禁用场景；Matter.js 物理模式 7 个；dashboard 排版方向 4 种（静态视觉阶段选 1 种）；AI 产品状态清单和参考组件库。适用于 Web 应用、手机 App（RN / Expo、Capacitor）、桌面 App（Electron / Tauri），实现交给 animate（Web / WebView）/ animate-expo（RN·Expo）。用户说不清要什么时，先问几道选择题再给 2–3 套方案让他选（见 references/interview.md）。Use when 用户说「帮我设计一下 / 好看一点 / 随便你 / 我不知道要什么样 / 现在这个好丑」、决定页面或组件该加什么交互、用户说「加点交互 / 手感好一点 / 质感 / 高级感 / 更有生命力 / 像 iOS 那样顺」、做 dashboard（排版方向、图表控件动效）、给列表·卡片·滑杆·开关·标签·步骤条·网格加反馈、处理手势（滑动返回、拖拽排序、下拉回弹、方向锁定、手势转场）、想要物理感（磁吸、液态形变、3D 视差、碰撞、掉落堆叠、Matter.js）、做 AI 产品界面（思考状态、流式输出、工具调用、操作确认、引用来源）、选图标库（Lucide / Morphicons / Lordicon）、用 GSAP 写动画、做 Apple 风玻璃质感卡片，或点名某个配方（主题扩散、数字翻牌、流动 Tab…）；也用于把用户的大白话翻译成正式效果（「鼠标放上去变大旁边让开」「像扇子一样展开」「扭成一圈」「波浪一样传开」「折一下翻过去」）。Not for 配色 / 字体 / 间距的细节（→ finesse-ui / design-taste-frontend / impeccable），也不负责扫代码找哪里缺动效（→ find-animation-opportunities）。
---

# Bryan Interactions — 交互配方库

每次调用先认出当前项目，再按这个项目自己的动效规格挑配方，最后交给 `animate`（Web）或 `animate-expo`（RN / Expo）写代码。目标：同一个项目里的动效和 UI/UX 全部统一。

## 第零步：先看是哪种叫法

| 用户怎么说 | 怎么办 |
|---|---|
| 只打 `/bryan-uiux`，后面什么都没带 | **默认走全套**：先做第一步认项目，报告 3 行（什么项目、什么平台、有没有设计规矩），再按 [references/interview.md](references/interview.md) 问最多 4 道选择题，最后给 2–3 套方案让用户选。不要反问「你想做什么」，自己看项目。 |
| `/bryan-uiux <页面名>`，例如「设置页」 | 同上，但范围锁定在那一页 |
| 「帮我设计一下 / 好看一点 / 随便你 / 我不知道要什么样 / 现在这个好丑」 | 同上 |
| 点名要什么（「加个数字翻牌」） | 跳过提问，直接做 |
| 用大白话描述效果（「鼠标放上去变大旁边让开」） | 查 [references/effects.md](references/effects.md) 翻译表，复述确认后再做 |

走全套时：先第一步认项目，再问选择题（一次一题、每题给推荐），然后给 2–3 套方案让用户选一套，**先做一屏**。

用户已经点名要什么（「加个数字翻牌」）→ 跳过，直接做。
用户用大白话描述效果（「鼠标放上去变大旁边让开」）→ 查 [references/effects.md](references/effects.md) 的翻译表，复述确认后再做。

## 第一步：认项目（每次都做，不用问用户）


项目 = 当前工作目录所在的 `/var/www/<项目>/`，或用户点名的项目。只在这个项目目录里读写。

按顺序读，有就读，没有跳过：

1. `CLAUDE.md` / `AGENTS.md`：约束、能改哪里、哪份文档说了算。项目自己写明的优先级最优先（例如某份 DESIGN.md 被标注「动效部分已过期」，就不照它做动效）。
2. `PRODUCT.md`（根目录、`frontend/`、`docs/`）：给谁用、什么类型的产品。它决定动效人格。
3. 静态视觉：`DESIGN.md`、`.impeccable/design.json`、`*TOKENS*.md`、`docs/DESIGN-SYSTEM.md`。有就锁定 token。
4. 动效规格：`docs/MOTION-SPEC.md`，或名字里带 MOTION 的任何文档。
5. 平台：按 [references/platforms.md](references/platforms.md) 第 1 节判断目标平台（Web 应用、PWA、混合 App、Electron / Tauri、RN / Expo、原生），可能不止一个。
6. 代码：`package.json` 看已装的动效库；grep `--ease`、`--dur`、`transition`、`animation`、`spring`，看已有的动效常量和它们在哪个文件。

读完用 3 行告诉用户：这是什么项目、目标平台是哪些、动效人格是什么、动效规格在不在。

## 第二步：没有动效规格就先建

- 已经有动效文档（不管叫什么名字）→ 直接用它，不另建第二份。
- 没有 → 按 [references/motion-spec-template.md](references/motion-spec-template.md) 起草 `docs/MOTION-SPEC.md`。常量从现有代码提取，已有 token 就沿用，不另起一套；人格按 `PRODUCT.md` 和下面的「人格 → 配方范围」表定；意图用 `motion-design` 的三问（想让用户感觉什么、动效人格、主角时刻）。
- **给用户确认人格和常量后才写入。** 写入后在项目 `CLAUDE.md` 加一句「动效按 `docs/MOTION-SPEC.md`」；项目没有 `CLAUDE.md` 就新建一个，只写这一句。以后每个会话都会自动遵守。

## 第三步：按动效规格挑配方

1. 同一类组件已经在规格的「已采用」里 → 照用它的配方和参数，不重新挑。**这是全项目统一的关键。**
2. 在规格的「没采用」里 → 不用，除非用户明确推翻。
3. 规格里都没有 → 用下面的「按场景挑」表，在人格范围内挑 1–3 个。每个都要说得出「它回答用户的哪个问题」，并过 `animate` 的两道关：频率关（每天用 100 次以上的操作不加动画）、目的关（说不出目的就不做）。配方里的「别用在」优先于用户笼统的「加点动效」。
4. **新配方列成表，给用户确认后再写代码**：配方编号 + 名字 ｜ 放在哪个元素 ｜ 回答的问题 ｜ 参数 ｜ 要不要装新包。**装任何 npm 包之前先问用户**；项目里已有同类库（例如已经有 Motion 就别再装 GSAP）就用已有的。
5. 读对应文件拿完整配方，只读用得上的那个：
   - 页面级 P1–P8 → [references/page.md](references/page.md)
   - 组件 C1–C13 → [references/component.md](references/component.md)
   - 图表控件 D1–D10 → [references/chart.md](references/chart.md)
   - 手势手感 G1–G7 → [references/gesture.md](references/gesture.md)
   - 控件反馈 F1–F10 → [references/feedback.md](references/feedback.md)
   - 动效质感 M1–M8 → [references/motion.md](references/motion.md)
   - Matter.js 物理模式 M8-1–M8-7 + 参数表 → [references/physics.md](references/physics.md)（先读 M8）
   - Dashboard 排版方向 L1–L4 → [references/dashboard-layouts.md](references/dashboard-layouts.md)（静态视觉阶段用，见第四步）
   - 网页视觉效果 E1–E5 + 用户原话翻译表 → [references/effects.md](references/effects.md)
   - 问用户、出方案的流程 → [references/interview.md](references/interview.md)（见第零步）
   - 参考组件库 + 图标库 + AI 产品状态清单 → [references/libraries.md](references/libraries.md)（不是配方；找效果参照、选图标库、查漏状态时读）
   - 玻璃质感怎么做 → [references/glassmorphism.md](references/glassmorphism.md)（配 L1 用）
   - 用 GSAP 写动画 → [references/gsap.md](references/gsap.md)（曲线、时长按本库的对照表换算）
   - 平台适配 → [references/platforms.md](references/platforms.md)（每次都要读第 2 节；WebView 项目加读第 3 节，原生加读第 5 节）
6. 按平台和输入方式落地：同一个配方在触屏、鼠标 / 触控板、键盘上各怎么做，见 `platforms.md` 第 2 节。触屏手势配方在桌面上要有鼠标或键盘的对应做法。
7. 参数按人格改写。例如「不回弹」人格把 `spring-gesture` / `spring-pop` 一律换成 `spring-ui`。改写后的值写进规格。

## 第四步：按设计流程做

结构层 → 视觉（有 `DESIGN.md` 就锁定 token，只动结构；没有时新页面用 `finesse-ui`、改版用 `design-taste-frontend`；做 dashboard 且没有 `DESIGN.md` 时，先从 `dashboard-layouts.md` 的 L1–L4 选 1 个排版方向，写进 `DESIGN.md`，再交给 `finesse-ui`）→ `impeccable audit` → `polish` → 本库挑配方 → `animate` / `animate-expo` 实现。

- 静态视觉没定之前不加交互。
- 先加组件级（C / D / F），再加页面级（P）和手势（G），最后才加动效质感（M）。M 最重，最容易做过头。

## 第五步：自检，再写回规格

- 新代码里的时长、曲线、spring 只能用规格里的常量。grep 出规格外的新数值：改成常量；确实需要新值，就先加进规格的常量表。
- 同一类组件，全项目用同一个配方、同一组参数；多个平台之间也统一，只有输入方式不同。
- 每个目标平台都按 `platforms.md` 第 6 节验收一遍，不能只测一个。
- 这次新采用的配方写进「已采用」，考虑过但否决的写进「没采用 + 原因」，都附日期。

## 只在两种情况停下来问用户

1. 项目第一次建动效规格时，确认人格和常量。
2. 要加一个规格里还没有的新配方时。

其余全部照规格自动做。

## 配套 skill 缺席时

本库的「参数词典」里已经写死了全部曲线、时长和 spring，**没装配套 skill 也能照常做事**：

| 缺哪个 | 怎么办 |
|---|---|
| `animate` / `animate-expo` | 直接用参数词典的数值自己写。不要自己编曲线和时长 |
| `finesse-ui` / `design-taste-frontend` | 视觉阶段按 `dashboard-layouts.md` 定方向，用项目已有的 token |
| `impeccable` | 收尾时手动过一遍：对比度、字号层级、间距、键盘可达、reduced-motion |
| `motion-design` | 用 `interview.md` 的 Q2 定人格，不必另外跑 |
| `pick-ui-library` | 先找项目里已有的同类组件；确实要装新库，列出 2 个候选和取舍让用户选 |

要一次装齐，仓库根目录的 `install.sh` 会从各自的上游装好（只碰 `~/.claude/skills/`，不碰项目）。

## 冲突时谁说了算

项目 `CLAUDE.md` 写明的 > 项目动效规格 > 项目 `DESIGN.md` / token > 本库参数词典 > `animate` 默认值。

`animate` 的硬规则在任何项目都生效：高频操作不加动画、只动 `transform` / `opacity`、支持 reduced-motion。

## 人格 → 配方范围

| 项目类型 | 人格 | 主要用 | 基本不用 | 参数改写 |
|---|---|---|---|---|
| 后台 / 工作台（一盯几小时） | 克制，不回弹 | G2、G3、F2、D 系列、M7（弹层） | M1–M4、P3、F7 | spring 全换成 `spring-ui`；只用 `--ease-out` / `--ease-in-out` |
| 消费 App | 有弹性 | G1、G6、M5、M7、C5 | P2 | 按参数词典原值 |
| 落地页 / 品牌页 | 有表现力 | P2、F9、M3、M4、F1 | 高频控件的动效 | 按参数词典原值；惊喜类动效只放首屏 |

这张表只是起点，最终以项目规格为准。实际例子：一个工作台项目在几十个配方里只采用了 12 个，其余都记了不用的原因。

## 按场景挑

| 场景 | 先用 | 再考虑 |
|---|---|---|
| 任何移动端 App 的基础手感 | G1 边缘滑回、G2 按钮滑出取消、G7 到顶回弹 | G5 飞行中可抓住 |
| 桌面 App / 桌面网页（鼠标 + 键盘） | G2 按钮滑出取消、F2 拖拽排序、D4 悬停对比 | C5 悬停放大（只在精细指针下）、M3 视差（只在品牌页） |
| 想要质感提升最明显 | P3 速度拖影、P5 参考线吸附 | P8 选中聚焦 |
| 财务 / 数据 dashboard | 先定排版方向 L1–L4；D1 活动圆环、D3 半圆仪表盘、D8 分段占比条 | D4 周月柱图、D6 折线切换、D9 环形占比、D10 气泡图 |
| 习惯 / 目标 / 时间记录 | D2 打卡热力格、D7 可拖动目标线 | D5 专注分段图 |
| 信息密度高的页面 | C1 重叠头像堆、C3 横向手风琴 | C4 托盘明细、C6 摘要胶囊、C11 就地展开详情 |
| 手机 App 的常用控件 | C7 搜索框展开、C9 按钮显示提交状态、C12 顶栏随滚动收起 | C8 加号展开面板、C10 按钮变步进器、C13 菜单铺满全屏 |
| todo / onboarding / task tracker | C2 进度底色、F3 批量勾选接力 | F6 步骤条回弹 |
| 相册 / 作品集 / 商品网格 | P1 捏合换密度、M6 图片展开至全屏 | P6 弧线换列、P4 下拉放大头图 |
| 卡片流 / 轮播 / 图片查看器 | G6 预判落点、G4 方向锁定 | F8 删除飞走、F9 卡片堆叠、M4 中心聚焦 |
| 底部导航 / 页面切换 | M5 流动 Tab、M7 手势转场 | G1 边缘滑回 |
| 设置页 / 表单控件 | F4 滑杆惯性吸附、F5 文本展开 | F7 开关涟漪（只用在低频页面） |
| 列表排序 / 筛选 | F2 拖拽让位、F10 标签挤开、G3 数字翻牌 | C5 图标放大栏、M8 物理碰撞（兴趣选择） |
| 落地页叙事 | P2 滚动驱动、F9 卡片堆叠 | P7 悬浮反色、F1 主题扩散、M4 中心聚焦 |
| 品牌感 / 首屏 hero | M3 3D 视差、M2 液态形变 | M1 磁吸、M8 物理碰撞（M8-7 浮动标签云） |
| 作品集 / 图片集 / 展示页 | E1 悬停让位、E2 封面流 | E3 3D 环形画廊、E5 翻页 |
| AI 对话 / agent 界面 | 先对照 libraries.md 的「AI 产品状态清单」 | G3 数字翻牌、F6 步骤条回弹（多步任务） |

## 参数词典

所有配方只用这里的值。曲线、时长、spring 取自 `animate`（Web）和 `animate-expo`（RN）；手势常量取自 `apple-design`；两边冲突以 `animate` 为准。配方里标「起始值」的是几何量（距离、缩放、模糊半径），要在真机上调。

**Spring 预设**

| 名字 | Web（Motion） | RN（Reanimated `withSpring`） | 用在 |
|---|---|---|---|
| `spring-ui` | `{ type: "spring", duration: 0.4, bounce: 0 }` | `{ duration: 400, dampingRatio: 1 }` | 让位、回位、形变，不过冲 |
| `spring-gesture` | `{ type: "spring", duration: 0.5, bounce: 0.2 }` | `{ duration: 400, dampingRatio: 0.8, velocity }` | 手势松手后落位，继承松手速度，轻微回弹 |
| `spring-pop` | `{ type: "spring", duration: 0.4, bounce: 0.3 }` | `{ duration: 400, dampingRatio: 0.7 }` | 确认时弹一下。bounce 0.3 是上限，只用在低频操作 |

**曲线**：`--ease-out: cubic-bezier(0.23, 1, 0.32, 1)` 用于进入、离开和默认；`--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1)` 用于屏幕上的移动和形变；颜色和 hover 用 `ease`。永远不用 `ease-in`。

**时长**：按下反馈 100–160ms ｜ 小弹层 125–200ms ｜ 下拉菜单 150–250ms ｜ 全屏切换、抽屉 200–500ms ｜ 其余 UI ≤ 300ms ｜ 错峰 30–80ms 一项，整组错峰总和 ≤ 300ms（超出的项同时出现）。

**手势常量**

- 甩动：松手速度 > 0.11 px/ms 就按速度方向提交，否则看距离是否过阈值。
- 提交还是退回：看松手时速度的**方向**，不看位置。
- 方向判定：手指先移动 10px 再判断横竖，判定后锁定到松手。
- 越界阻尼：`rubberband(x, d) = (x · d · 0.55) / (d + 0.55 · |x|)`，x 是越界距离，d 是容器尺寸。
- 动量落点：`当前位置 + (v / 1000) · 0.998 / (1 − 0.998)`，v 单位 px/s；想更利落把 0.998 换成 0.99。
- 抓取：按下时读屏幕上的当前值，停掉动画，从这里 1:1 跟手，保留手指和元素的相对偏移。

## 通用规则

每个配方默认遵守，配方里不再重复：

- 只动 `transform` / `opacity`；`clip-path` 可以；高度只允许在折叠展开里动。
- 可能被连续触发的用 transition 或 spring，不用 keyframes（keyframes 每次从头播）。
- 手势相关的动画全部用 spring，保证动画中随时能被按住（见 G5）。
- reduced-motion：去掉位移和缩放，保留透明度和颜色变化。配方写了降级方式的，按配方来。
- 触屏上的 hover 效果包在 `@media (hover: hover) and (pointer: fine)` 里。
- 会变化的数字加 `font-variant-numeric: tabular-nums`，防止宽度跳动。

## 用户说「不够精细」时怎么调

| 用户原话 | 改哪里 |
|---|---|
| 太弹、弹来弹去、阻尼感要强一点 | 换成 `spring-ui`（bounce 0） |
| 太硬、没生命力 | `spring-ui` 换成 `spring-gesture` |
| 太慢、拖沓 | 时长降到该档下限；错峰降到 30ms |
| 太快、看不清 | 时长升到该档上限，UI 不超过 300ms |
| 不跟手 | 拖动过程中不许用带 duration 的动画，改成直接 1:1 设置 transform |
| 手势老是误触 | 加 10px 方向判定 + 保留抓取偏移 |

## 给别的 AI 工具用

每个配方的「提示词」是原话，可直接复制给 Cursor 等工具。想要更精细，把「参数」那一行一起贴过去，并说明 tech stack。
