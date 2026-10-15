---
name: bryan-uiux
description: Bryan 的设计库，一个 skill 做完结构、静态视觉、动效、收尾检查。先读当前项目，自己判断该用什么设计，不让用户从菜单里挑；同一项目的 UI/UX 和动效统一，每页都有桌面和手机视图。内容：从零做新页面、改版、收尾检查（critique / audit / polish）和定向修（配色、字体、排版、文案、适配、性能）；80 个交互配方（页面、组件、图表控件、手势、控件反馈、动效质感、网页效果）、Matter.js 物理、Web 和 RN / Expo 动效写法、动效评审；dashboard 骨架 K1–K6 和排版方向 L1–L5（含等距 3D）、导航 11 种风格、高级感卡片、玻璃卡片、轴测线稿插画、7 条 UX 定律、AI 产品状态清单、参考组件库和灵感站、图标和 npm 库选型、GSAP、口味档案。适用于 Web、RN / Expo、Capacitor、Electron / Tauri。Use when 用户说「帮我设计一下 / 好看一点 / 随便你 / 我不知道要什么样 / 现在这个好丑 / 太 generic / 太 AI 味 / 高级一点」；新建、重做、改版某页或某屏（后台、工作台、dashboard、落地页、官网、定价页、登录页、表单、设置页、商品页、H5、活动页）；review 或 audit 现有 UI/UX；调配色、字体、间距、深色模式、空状态、错误态、设计 token；「转化低 / 找不到按钮 / 减少摩擦 / 手机上坏了」；「加点交互 / 微交互 / 手感 / 质感 / 更有生命力 / 像 iOS 那样顺」；3D 可视化、数字孪生、大屏、导航栏、卡片；给列表、滑杆、开关、步骤条加反馈；手势（滑动返回、拖拽排序、下拉回弹）；物理感（磁吸、液态形变、碰撞、掉落）；AI 界面（思考状态、流式输出、工具调用、操作确认）；写动画、评审动效、找哪里该加动效、「这个效果叫什么」；选组件库、图标库、npm 库，找设计参考；「记下来 / 收藏这个 / 整理截图」；点名配方（主题扩散、数字翻牌、流动 Tab、渐进模糊、挖空文字…）；用大白话描述效果（「鼠标放上去变大旁边让开」「像扇子一样展开」）。
---

# Bryan UI/UX — 结构、视觉、动效、收尾，一个 skill 做完

每次调用先认出当前项目，再按这个项目自己的设计规矩和动效规格做事。静态视觉、交互配方、动效写法、收尾检查都在本库里，不需要另外装别的 skill。目标：同一个项目里的动效和 UI/UX 全部统一。

## 第零步：先看是哪种叫法

| 用户怎么说 | 怎么办 |
|---|---|
| 只打 `/bryan-uiux`；或者「帮我设计一下 / 好看一点 / 高级一点 / 随便你 / 我不知道要什么样」，而要做的页还不存在 | **默认走全套**：先做第一步认项目、写项目画像，再按 [references/ux/interview.md](references/ux/interview.md) 从项目里自己定方向，用一段大白话说清「你会看到什么、根据什么、不对的话多半是哪两种」，然后**直接先做一屏**，桌面视图和手机视图都给用户看。只有项目里看不出「给谁用、想干成什么」时，才问这 1 个问题。不要反问「你想做什么」，也不给方案菜单让用户挑 |
| `/bryan-uiux <页面名>`，例如「设置页」 | 同上，但范围锁定在那一页；那一页已经存在就走下面的改版 |
| 已有的页面不满意（`/bryan-uiux redesign <页面>`、「现在这个好丑 / 太土了 / 太 AI 味 / 太 generic / 好看一点 / 高级一点」） | 改版。先说清保留什么、换成什么感觉，再按页面类型走：落地页、作品集、官网 → [references/visual/redesign/index.md](references/visual/redesign/index.md)（从它的第 11 节读起）；dashboard、后台、表格页（redesign 那份不管这类）→ 先跑 `critique` 和 `audit` 看现状，骨架按 [references/visual/dashboard-layouts.md](references/visual/dashboard-layouts.md) 的信号表重新判断，视觉走 [references/visual/new-page/index.md](references/visual/new-page/index.md) 的 product 路线；有 `DESIGN.md` 就锁定 token，只动结构 |
| 「没人点 / 转化低 / 太复杂 / 找不到按钮」 | 先按 [references/ux/ux-laws.md](references/ux/ux-laws.md) 的检查清单过一遍，列出违反了哪几条、各怎么改，再动手 |
| 检查现有页面，只看不改（`/bryan-uiux review`、`critique`、`audit`，「review 一下 / 检查现在的 UI / 哪里不好 / 挑毛病 / 上线前检查」） | **只看不改**：先第一步认项目，列出所有页面，每一页都看，不只看首页（点名了页面就只看那一页）。能跑起来就截图看桌面 1440px 和手机 390px 两种宽度；跑不起来就读代码，并说明是读代码判断的。每一页按 [references/ux/ux-laws.md](references/ux/ux-laws.md) 的页面类型过结构四问和 7 条清单；配色、字体、间距按 [references/visual/finish/index.md](references/visual/finish/index.md) 把 `critique` 和 `audit` 两个都跑；动效对照项目动效规格，没有规格就数一下现在用了几套时长和曲线。最后给一张表：页面 ｜ 违反哪条 ｜ 现在怎样 ｜ 怎么改 ｜ 先改哪个，按影响排序，并说推荐先改前几条 |
| 打磨（`polish`，「打磨一下」，或者检查完用户说「改吧 / 改前 3 条」） | 按 [references/visual/finish/index.md](references/visual/finish/index.md) 的 `polish`，只修检查表里用户点了的那几条 |
| 只修一样（「字体不对 / 配色太素 / 太挤 / 太吵 / 太平 / 文案看不懂 / 手机上坏了 / 很卡 / 空状态没做」） | 按 [references/visual/finish/index.md](references/visual/finish/index.md) 的命令表挑一个定向修（`typeset`、`colorize`、`layout`、`quieter`、`bolder`、`clarify`、`adapt`、`optimize`、`onboard`…）。空状态和引导要配图时，再按 [references/visual/illustrations.md](references/visual/illustrations.md) 第一节判断画不画 |
| 项目还没有 `PRODUCT.md` 或 `DESIGN.md`，用户想补上（`init`、`document`） | `PRODUCT.md` 按 [references/core/product-brief.md](references/core/product-brief.md) 写；`DESIGN.md` 按 [references/core/design-doc.md](references/core/design-doc.md) 从现有代码整理 |
| 做导航（底部 Tab、侧边栏、顶栏、「导航栏好丑」） | 按 [references/visual/navigation.md](references/visual/navigation.md) 做：手机、平板、桌面三种宽度一起出，同一组入口 |
| 做 3D 可视化、数字孪生、可视化大屏、等距场景（「把数据做立体一点」「让客户一眼看懂仓库现在什么情况」） | 按 [references/visual/isometric-scene.md](references/visual/isometric-scene.md) 做：先过第 1 节「该不该上 3D」那道关，再定场景画法 S1–S4 和是哪种屏（演示 / 后台 / 大屏）；桌面视图和手机视图一起出。要装 3D 的 npm 包先问用户 |
| 点名要什么（「加个数字翻牌」「这个按钮加个按下效果」） | 跳过提问，直接做：用户点名就算确认过，第三步第 4 条的确认表省掉。点名的是动作（hover、按下、拖、滑动）就查 [references/core/pick.md](references/core/pick.md) 的「按手怎么动来挑」 |
| 「加点交互 / 加点微交互 / 哪里该加动效 / 让它更有生命力」，但没说加在哪 | 按 [references/review/opportunities.md](references/review/opportunities.md) 找，先过频率关，再按峰终定律排序，只推荐最值得的 1–3 处，问一句「先加这几处？」，用户点头再加 |
| 用大白话描述效果（「鼠标放上去变大旁边让开」） | 查 [references/recipes/effects.md](references/recipes/effects.md) 翻译表，复述确认后再做 |
| 「这个效果叫什么」 | 查 [references/recipes/vocabulary.md](references/recipes/vocabulary.md)，只回答名字，不动手做 |
| 评审已有动效（「动效 review / 这个动画哪里不对」） | 按 [references/review/motion-review.md](references/review/motion-review.md)，只看不改 |
| 全项目动效审计、出改进方案 | 按 [references/review/motion-audit.md](references/review/motion-audit.md)，只出方案不改代码 |
| 丢来链接或截图，说「记下来 / 收藏这个 / 这个好看」 | 按 [references/ux/taste.md](references/ux/taste.md) 记一条收藏，只记不做 |
| 「整理截图」（截图已经拖进 `screenshot/`） | 按 [references/ux/taste.md](references/ux/taste.md) 把新截图写进索引，写完给用户一张表改猜错的 |

走全套时：第一步认项目、写项目画像 → 自己定方向，用一段话说清 → **先做一屏**，桌面视图和手机视图都给用户看。用户说不对，只换他点的那一项；连着否两次，才做 2–3 屏真的给他比（不是文字菜单）。

## 第一步：认项目（每次都做，不用问用户）

项目 = 当前工作目录，或用户点名的项目。只在这个项目目录里读写。

按顺序读，有就读，没有跳过：

1. `CLAUDE.md` / `AGENTS.md`：约束、能改哪里、哪份文档说了算。项目自己写明的优先级最优先（例如某份 DESIGN.md 被标注「动效部分已过期」，就不照它做动效）。
2. `PRODUCT.md`（根目录、`frontend/`、`docs/`）：给谁用（`## Users`）、什么类型的产品（`## Product Type`）。它决定动效人格。没有这份、项目又会做很多页时，建议先按 `references/core/product-brief.md` 写一份。
3. 静态视觉：`DESIGN.md`、`*TOKENS*.md`、`docs/DESIGN-SYSTEM.md`，或项目里现成的 token 文件。有就锁定 token。
4. 动效规格：`docs/MOTION-SPEC.md`，或名字里带 MOTION 的任何文档。
5. 平台：按 [references/core/platforms.md](references/core/platforms.md) 第 1 节判断目标平台（Web 应用、PWA、混合 App、Electron / Tauri、RN / Expo、原生），可能不止一个。再定要做哪些视图：Web 应用默认桌面视图和手机视图都要做（见 `references/core/platforms.md` 第 2.2 节）。
6. 代码：`package.json` 看已装的动效库；grep `--ease`、`--dur`、`transition`、`animation`、`spring`，看已有的动效常量和它们在哪个文件。
7. 写项目画像：按下面这张表判断。

**项目画像**：一张表定「这是什么产品、什么人格、这一屏是哪种页」。其他文件里的分类都以这张表为准，不各自重新判断：`references/core/pick.md` 的人格、`references/ux/ux-laws.md` 的页面类型、`references/visual/new-page/index.md` 的 register、`references/visual/finish/index.md` 的 mode、`references/build/intent.md` 的四种性格。

| 项目里看得到的 | 产品类型 | 人格 | 这一屏是哪种页 | new-page 走哪条 / finish 的 mode |
|---|---|---|---|---|
| 要登录才能用；路由里有 admin、dashboard、settings、reports；装了表格、数据网格、图表库 | 后台 / 工作台 | 克制 | 有主数字的是「看的页」；有主操作（提交、发布、保存）的是「做事的页」 | product / Operate |
| RN / Expo、Capacitor，或者面向个人用户的 App（个人资料、动态、打卡） | 消费 App | 有弹性 | 做事的页为主 | product（只在手机上打开的页走 h5）/ Operate |
| 路由是首页、定价、关于、活动；没有登录；文案多、要人注册或下单 | 落地页 / 品牌页 | 有表现力（高端、奢侈品牌取慢的一端、不回弹） | 品牌页 | brand / Persuade |
| 作品、案例、相册 | 作品集 / 展示页 | 有表现力 | 品牌页 | brand / Experience |
| 文档、文章、帮助中心、更新日志 | 阅读页 | 克制 | 看的页 | product / Read |
| 商品详情、商品列表、购物车、结账 | 电商 | 卖单个商品偏有表现力；在很多商品里挑、结账偏克制 | 详情是品牌页；列表和结账是做事的页 | commerce / 详情 Persuade，其余 Operate |

- 判断顺序：`PRODUCT.md` 写明的 > 动效规格写明的 > 代码里已经在用的（例如已经有带回弹的 spring，就是有弹性）> 上表的信号。
- 一个仓库里既有后台又有官网：按这一屏属于哪部分判断，两部分各写一个人格进动效规格。
- 表里对不上的，取最接近的一行，并在报告里说「这一项是猜的」。

读完用 3 行告诉用户：这是什么项目、目标平台和视图是哪些、项目画像（产品类型和人格，各自根据什么）、动效规格在不在。

项目文档里如果写着本库以外的 skill 名字（以前的写法），一律当成本库对应的章节来执行，并顺手把那一行改成本库的说法。

## 第二步：没有动效规格就先建

- 已经有动效文档（不管叫什么名字）→ 直接用它，不另建第二份。
- 没有 → 按 [references/core/motion-spec-template.md](references/core/motion-spec-template.md) 起草 `docs/MOTION-SPEC.md`。常量从现有代码提取，已有 token 就沿用，不另起一套；人格按第一步的项目画像定，配方范围看 [references/core/pick.md](references/core/pick.md) 的「人格 → 配方范围」表；意图用三问（想让用户感觉什么、动效人格、主角时刻），要展开时读 [references/build/intent.md](references/build/intent.md)。
- **给用户确认人格和常量后才写入。** 走全套时，用户看完第一屏点头就算确认。 写入后在项目 `CLAUDE.md` 加一句「动效按 `docs/MOTION-SPEC.md`」；项目没有 `CLAUDE.md` 就新建一个，只写这一句。以后每个会话都会自动遵守。

## 第三步：按动效规格挑配方

1. 同一类组件已经在规格的「已采用」里 → 照用它的配方和参数，不重新挑。**这是全项目统一的关键。**
2. 在规格的「没采用」里 → 不用，除非用户明确推翻。
3. 规格里都没有 → 用 [references/core/pick.md](references/core/pick.md) 的「按场景挑」表，在人格范围内挑 1–3 个。每个都要说得出「它回答用户的哪个问题」，并过两道关：频率关（每天用 100 次以上的操作不加动画）、目的关（说不出目的就不做）。配方里的「别用在」优先于用户笼统的「加点动效」。
4. **新配方列成表，给用户确认后再写代码**（用户自己点名的配方算已确认，不用再列）：配方编号 + 名字 ｜ 放在哪个元素 ｜ 回答的问题 ｜ 参数 ｜ 要不要装新包。**装任何 npm 包之前先问用户**；项目里已有同类库（例如已经有 Motion 就别再装 GSAP）就用已有的；确实要选新库，查 [references/visual/pick-library.md](references/visual/pick-library.md)。
5. 拿完整配方：`references/core/pick.md` 最后一节「全部配方」写着每个配方在哪份文件的第几行，按行号只读挑中的那几个（那一类有共同规则时一起读），不整份读配方文件。
6. 按平台和输入方式落地：同一个配方在触屏、鼠标 / 触控板、键盘上各怎么做，见 `references/core/platforms.md` 第 2 节。触屏手势配方在桌面上要有鼠标或键盘的对应做法。再按屏幕宽度落地：同一页在桌面视图和手机视图怎么排、哪些配方要换，见第 2.2 节。
7. 参数按人格改写。例如「不回弹」人格把 `spring-gesture` / `spring-pop` 一律换成 `spring-ui`。改写后的值写进规格。
8. 写代码：Web、PWA、WebView、Electron / Tauri 按 [references/build/web.md](references/build/web.md)；RN / Expo 按 [references/build/rn.md](references/build/rn.md)。数值只从参数词典和项目规格取。

## 第四步：按设计流程做

结构层 → 静态视觉 → 收尾检查 → 挑配方 → 写动效。每一层过了才进下一层。

| 层 | 做什么 | 看哪份 |
|---|---|---|
| 1 结构 | 结构四问，再先减选项、再分组、最后只高亮 1 样（做事的页是主操作，看的页是主数字） | `references/ux/ux-laws.md` |
| 2 静态视觉 | 有 `DESIGN.md` 就锁定 token，只动结构和层级。没有时：新页面按 `references/visual/new-page/index.md`，改版按 `references/visual/redesign/index.md`。做 dashboard 且没有 `DESIGN.md`，先从 `references/visual/dashboard-layouts.md` 按每页的数据自己判断骨架 K1–K6（不让用户挑）、按它的信号表给整个产品定 1 个排版方向 L1–L5（同样不让用户挑），写进 `DESIGN.md`，再做新页面 | 左边两份，二选一 |
| 3 收尾 | `critique` 和 `audit` 两个都跑，挑出问题，再 `polish` | `references/visual/finish/index.md` |
| 4 挑配方 | 第三步 | `references/core/pick.md` |
| 5 写动效 | 第三步第 8 条 | `references/build/web.md` / `references/build/rn.md` |

- **结构没过，不进静态视觉。静态视觉没定，不加交互、不调动效。**
- **新页面、改版、收尾是三个阶段，同一阶段只用它自己那一份**，不把三份的规则叠在一起用。收尾只修缺陷，不推翻前面定好的方向。
- 不跳过 `audit` 直接手改 CSS。评审要覆盖每个页面和每一屏，不只看首页。
- 先加组件级（C / D / F），再加页面级（P）和手势（G），最后才加动效质感（M）。M 最重，最容易做过头。
- 峰终定律留到挑配方时用。

## 第五步：自检，再写回规格

- 新代码里的时长、曲线、spring 只能用规格里的常量。grep 出规格外的新数值：改成常量；确实需要新值，就先加进规格的常量表。
- 同一类组件，全项目用同一个配方、同一组参数；多个平台之间也统一，只有输入方式不同。
- 每个目标平台都按 `references/core/platforms.md` 第 6 节验收一遍，不能只测一个；桌面视图和手机视图也都要看。
- 每一屏按 `references/ux/ux-laws.md` 的页面类型过一遍 7 条清单：只列没过的，先自己改好再给用户看；全过就写一行「7 条全过」。
- 这次新采用的配方写进「已采用」，考虑过但否决的写进「没采用 + 原因」，都附日期。

## 什么时候停下来问用户

1. 项目第一次建动效规格时，确认人格和常量（走全套时，先做的那一屏就是拿来确认的）。
2. 要加一个规格里还没有、用户也没点名的新配方时。

另外两件本来就要先问：装 npm 包；生成或下载图片。项目里看不出「给谁用、想干成什么」时，问这 1 个问题。

其余全部照规格自动做。

## 冲突时谁说了算

项目 `CLAUDE.md` 写明的 > 项目动效规格 > 项目 `DESIGN.md` / token > 用户明说的 > 7 条 UX 定律 `references/ux/ux-laws.md`（违反用户明说的要求时照做，只提醒一句） > 口味档案 `references/ux/taste.md`（只管方向，不管数值） > 本库参数词典 `references/core/params.md` > `references/build/`、`references/review/`、`references/visual/` 子文件夹里各份文件自己的说法。

最后一档的意思：这些子文件夹里的文件来自不同的来源，写法不完全一样。它们跟参数词典或上面任何一档不一致时，听上面的。

下面几条在任何项目都生效：

- 高频操作不加动画（频率关；唯一例外是 M5 流动 Tab，它的配方里写了为什么）；只动 `transform` / `opacity`；支持 reduced-motion。
- 一屏只高亮 1 样；红色只给错误和危险操作。
- 每个页面都有桌面视图和手机视图。
- 装任何 npm 包之前先问用户。

## 文件地图

所有路径相对本 skill 目录。这张地图就是整个库的目录：先在这里挑文件，再去读。

- 只读当前这一步用得上的文件。不要为了找东西把文件夹整个翻一遍。
- 超过 100 行的文件，大标题下面都有「本文件目录」，写着每一节在第几行。先读开头到目录结束为止，再按行号只读用得上的那一节。
- 三个大流程的入口文件不从头读到尾（两份最大的有几百到上千行）：
  - `new-page/index.md`：读开头说明、目录、「How to use this skill」和 §0，其余各节按步骤用到再读。后台、dashboard 这类产品页不读品牌页那几节（§2 soul、§4 hero engine、§5 品牌骨架），也不读 `divergence.md`。
  - `redesign/index.md`：从第 11 节「改版流程」读起，其余节用到再读。
  - `finish/index.md` 整份读（不到 100 行），再读 `finish/reference/` 里要跑的那个命令，那份从头读到尾。
  - 附录和参考资料那几节等用到再读。
- 挑配方看 `references/core/pick.md` 最后一节「全部配方」：一行一个，写着用在哪、在第几行。
- `new-page/`、`finish/`、`build/intent/` 里的子文件不列在这张地图上，从各自的入口文件进去，入口里写着每个子文件什么时候读。

**core/ 每次都会用**
- 参数词典（spring、曲线、时长、手势常量）+ 通用规则 + 调参表 → [references/core/params.md](references/core/params.md)（写任何动效数值之前读）
- 人格 → 配方范围 + 按场景挑 + 按手怎么动来挑 + 全部配方的目录（一行一个，带行号）→ [references/core/pick.md](references/core/pick.md)（规格里没有现成配方时读）
- 平台适配 → [references/core/platforms.md](references/core/platforms.md)（每次都读第 2 节；WebView 项目加读第 3 节，原生加读第 5 节）
- 动效规格模板 → [references/core/motion-spec-template.md](references/core/motion-spec-template.md)（项目第一次建规格时用）
- 写 `PRODUCT.md`（`init`）→ [references/core/product-brief.md](references/core/product-brief.md)
- 从现有代码整理 `DESIGN.md`（`document`）→ [references/core/design-doc.md](references/core/design-doc.md)

**ux/ 体验和流程**
- 结构四问 + 减少摩擦的 7 条 UX 定律 + 检查清单 → [references/ux/ux-laws.md](references/ux/ux-laws.md)（出方案和自检时必须过）
- 从项目里自己定方向、说给用户听 → [references/ux/interview.md](references/ux/interview.md)（见第零步）
- 口味档案（觉得好看的设计）→ [references/ux/taste.md](references/ux/taste.md)（截图和索引在 `screenshot/`；走全套和出方案时读；用户说「记下来 / 整理截图」时写）

**visual/ 长什么样**（静态视觉阶段用，见第四步）
- 从零做新页面：品牌页、产品后台、工作流页、AI 工作台、电商页、手机 H5 → [references/visual/new-page/index.md](references/visual/new-page/index.md)（它自己的参考文件和 22 个示例网页在同一个文件夹）
- 改版已有页面 → [references/visual/redesign/index.md](references/visual/redesign/index.md)
- 收尾检查和定向修 → [references/visual/finish/index.md](references/visual/finish/index.md)（每个命令一份，在它的 `reference/` 里）
- 导航：手机底部 Tab / 平板竖栏 / 桌面侧边栏，11 种风格 → [references/visual/navigation.md](references/visual/navigation.md)
- Dashboard 骨架 K1–K6 + 排版方向 L1–L5 → [references/visual/dashboard-layouts.md](references/visual/dashboard-layouts.md)
- 等距 3D 场景（L5 的完整做法）：该不该上 3D、四种场景画法 S1–S4、三种屏、镜头、白模配色、部件清单、联动、手机降级、R3F 写法 → [references/visual/isometric-scene.md](references/visual/isometric-scene.md)（做 3D 可视化、数字孪生、可视化大屏时读）
- 轴测线稿插画：画不画、画风、操作画成什么实物、放哪多大、Web 和 RN 画法 → [references/visual/illustrations.md](references/visual/illustrations.md)（做空状态、引导弹窗、功能介绍卡时读）
- 高级感卡片：配色、字号层级、6 种卡片结构（含逐条处理卡）、微交互 → [references/visual/cards.md](references/visual/cards.md)（从零做卡片时用；项目有 `DESIGN.md` 就只借结构和层级）
- 玻璃质感 → [references/visual/glassmorphism.md](references/visual/glassmorphism.md)（配 L1 用）
- 参考组件库 + 灵感站 + 图标库 + AI 产品状态清单 → [references/visual/libraries.md](references/visual/libraries.md)（不是配方；找效果参照、整页参照、选图标库、查漏状态时读）
- 某件事该用哪个 npm 库 → [references/visual/pick-library.md](references/visual/pick-library.md)（先用项目已有的；要装先问用户）

**recipes/ 交互配方**
- 页面级 P1–P8 → [references/recipes/page.md](references/recipes/page.md)
- 组件 C1–C20 → [references/recipes/component.md](references/recipes/component.md)
- 图表控件 D1–D10 → [references/recipes/chart.md](references/recipes/chart.md)
- 手势手感 G1–G12 → [references/recipes/gesture.md](references/recipes/gesture.md)
- 控件反馈 F1–F15 → [references/recipes/feedback.md](references/recipes/feedback.md)
- 动效质感 M1–M8 → [references/recipes/motion.md](references/recipes/motion.md)
- Matter.js 物理模式 M8-1–M8-7 + 参数表 → [references/recipes/physics.md](references/recipes/physics.md)（先读 M8）
- 网页视觉效果 E1–E7 + 用户原话翻译表 → [references/recipes/effects.md](references/recipes/effects.md)
- 效果的正式英文名（反查）→ [references/recipes/vocabulary.md](references/recipes/vocabulary.md)
- 用 GSAP 写动画 → [references/recipes/gsap.md](references/recipes/gsap.md)（曲线、时长按本库的对照表换算）

**build/ 怎么写动效**
- Web：判断顺序（该不该动、目的、工具、属性、曲线、打断、降级）→ [references/build/web.md](references/build/web.md)；常见组件的现成写法 → [references/build/web-recipes.md](references/build/web-recipes.md)
- RN / Expo → [references/build/rn.md](references/build/rn.md)；现成写法 → [references/build/rn-recipes.md](references/build/rn-recipes.md)
- 手势手感、弹性、材质和深度 → [references/build/apple-feel.md](references/build/apple-feel.md)
- 组件细节：transform、clip-path、拖拽、调试 → [references/build/craft-details.md](references/build/craft-details.md)
- 动效意图：想让用户感觉什么、怎么编排多个元素 → [references/build/intent.md](references/build/intent.md)

**review/ 评审动效**
- 评审一段动效代码 → [references/review/motion-review.md](references/review/motion-review.md)（标准在 [references/review/standards.md](references/review/standards.md)）
- 全项目动效审计和改进方案 → [references/review/motion-audit.md](references/review/motion-audit.md)（规则表在 [references/review/audit-method.md](references/review/audit-method.md)，方案格式在 [references/review/plan-template.md](references/review/plan-template.md)）
- 找哪里该加动效 → [references/review/opportunities.md](references/review/opportunities.md)

别人的开源内容的版权声明在仓库根目录 `THIRD_PARTY_NOTICES.md`，做设计时不用读。
