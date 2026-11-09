# 建议卡和全部选项

<!-- 目录:开始（自动生成，别手改；改了标题就跑 python3 tools/toc.py） -->
**本文件目录**（全文 163 行；先看这里，再按行号只读用得上的那一节）

- 第 18–44 行：1. 卡长什么样
- 第 46–56 行：2. 每一行怎么写
- 第 58–75 行：3. 哪些选项能上卡
- 第 77–91 行：4. 怎么做到下次不一样
- 第 93–152 行：5. 全部选项
- 第 154–163 行：6. 不上卡，永远照做
<!-- 目录:结束 -->

全自动的话，同一个项目每次都得到同一个答案，用户也看不到还有什么可选。所以每次调用先出一张**建议卡**：这次建议什么、为什么、还有什么可选。用户回了才动手。

这份管两件事：卡怎么写，库里一共有什么可以推荐。什么时候出卡、用户回了怎么办，看 `references/ux/interview.md`。每个选项的细节都在它自己的文件里，这里只有名字、编号和指路。

## 1. 卡长什么样

**完整卡**（例子，项目和数字都是虚构的）：

```
这次的建议 · 订单后台 · 首页
产品风格：后台，克制不回弹（路由有 /admin，一天开很多次）
上次：K2 + L2（已锁）

1 交互动效（每次都有）
  ⭐ 数字翻牌 + 处理完一条淡出换下一条：老板一眼看到变化
  B 再加图表悬停对比   C 只做按下和状态反馈
2 骨架  ⭐ K1 主次布局：有一个主数字，老板要先看它
        B K3 主区+窄栏   C 维持现在
3 卡片  ⭐ 逐条处理卡：12 条待审批，一条条过最快
        B 表格+批量条   C 维持现在

手机上：左栏变底部 Tab，卡片排成一列
看图：G3 · K1 · K3 · card6（本 skill 的 demo/gallery.html#编号）

回「好」= 全用 ⭐ ｜ 回「1B」= 只换这项
回「维持」= 骨架和卡片不改，交互照做 ｜ 回「看全部」= 看其他选项
```

**短卡**：只修一样、打磨、「加点交互」时用。只有产品风格、交互动效、这次要修的那一项，其余照上面。

**没有建议时也要说**：这页没什么要改，就写「这页没什么要改，交互已齐」，下面给一行「要换方向就回『换方向』」。这样用户知道是真的没有，不是没看。

## 2. 每一行怎么写

1. **第一行写产品风格**：产品类型和人格，加一句项目里看到的证据。来源按 `SKILL.md` 第一步的项目画像，`PRODUCT.md`、`DESIGN.md`、动效规格和现有代码优先。
2. **第 1 项永远是交互动效**，不能省，占 3 项里的 1 项。写看得见的动作和放在哪个元素，不写时长和曲线。挑法按 `references/core/pick.md`，规格里「已采用」的照用不上卡，只推还没有的。备选里没有「全都不动」：整页不动不是选项，单个元素可以写「这里故意不动」。
3. **另外最多 2 项**，挑最会改变样子的：结构 → 整体方向 → 卡片 / 导航 → 转场。上游没定不推下游；项目定得了、只有一条路的不上卡，记成「替你定的」。
4. **每项三样东西**：⭐ 推荐加一句证据（项目里看到的，不写「更好看」）；1–2 个真的不一样的备选；页面已存在时加「维持现在」。
5. **名字用大白话**，后面可以带编号，图鉴页按编号找。
6. **要等用户点头的事写在卡上**：要装的 npm 包、要生成或下载的图片，写进对应那一行。用户回「好」就算同意了这几件，不再单独问。
7. **最后两行固定**：`手机上：…` 一句话说手机上怎么变；`看图：…` 列这张卡每个选项的编号。图鉴页 `demo/gallery.html` 里有图的只有这些：`pick.md`「按场景挑」里「先用」那一列的 45 个配方（会动，能上手试），和第 5 节带编号的 L、K、`palette`、`shell`、`brand`、`layout`、`phone`、`card`、`surface`、`bento`、`nav`、`tab`（静态图）。其余选项没有图，不写进「看图」。地址是图鉴页加 `#编号`，例如 `gallery.html#G3`。

**在 Claude Code 里**：有选择框（AskUserQuestion）就用，卡的每一行是一题，推荐放第一个、标「（推荐）」，版式类选项放文字草图预览，图鉴地址写进选项说明。选择框可能盖住前面的文字，所以产品风格那句证据要写进第 1 题。Codex 或没有选择框时，用上面的文字卡，用户回「好」或「1B」。

## 3. 哪些选项能上卡

第 5 节是全部的库，不是每次都推。**不合这个产品的不上卡**，用户回「看全部」才列。

| 这一屏属于（按项目画像） | 能上卡 | 不上卡 |
|---|---|---|
| 后台 / 工作台 | L、K、后台外框、后台配色、卡片、Bento 小卡、导航 1 / 9 / 5、克制范围内的配方 | 品牌页灵魂、品牌版式、首屏引擎、`pick.md` 里「基本不用」的配方 |
| 消费 App | 手机形态、卡片、导航 5 / 8 / 3、配色强度、有弹性范围内的配方 | 首屏引擎；有数据页时才给 K |
| 落地页 / 品牌页 | 品牌页灵魂、品牌骨架、品牌版式、字体关系、材质、配色强度、首屏引擎、导航 2 / 3 / 11、有表现力范围内的配方 | L、K、后台外框 |
| 作品集 / 展示页 | 同上，再加画廊类配方（E1–E5、P1） | L、K、后台外框 |
| 阅读页 | 字体关系、配色强度、导航 1 / 8 | 首屏引擎、3D、发光小物件 |
| 电商 | 详情页按品牌页那一行，列表和结账按后台那一行 | 同所属那一行 |

另外三条：

- **锁定的不上卡**：项目有 `DESIGN.md` 就不推配色和字体；已定的排版方向、人格也不推。第一行写「已锁」就够。用户回「换方向」才把这一组放上卡（`references/ux/interview.md`）。
- **有门槛的先过门槛**：L5 和 3D 场景过 `references/visual/isometric-scene.md` 第 1 节，发光小物件、讲概念的实物图、线稿插画各过自己文件的第 1 节。过不了不上卡。
- **慎用的不主动推**：新拟物、渐变导航、柱子城市，用户点名才给。

## 4. 怎么做到下次不一样

出卡前读项目根目录的 `.bryan-uiux/log.json`，用户回了卡就写一条。这份文件的基本规矩（最新在前、留最近 20 条、加进 `.gitignore`）见 `references/visual/new-page/references/divergence.md` §4.1；出卡写的是下面这个字段，跟它的 `axes` 放在同一条记录里，没有页面记录时只写这个字段。

```json
{ "date": "2026-11-06", "page": "orders-home",
  "card": { "offered": ["G3", "K1", "K3", "card6"], "picked": ["G3", "K1", "card6"], "rejected": ["K3"] } }
```

1. **否过的不再推**：`rejected` 里的选项，之后不上卡，用户回「看全部」时才出现。配方另外写进动效规格的「没采用」，这是长期记录。
2. **选过的写在「上次」**：第一行下面写上次定了什么，用户不用记。
3. **备选换新的**：⭐ 可以跟上次一样，只要证据还成立；备选优先用 `offered` 里没出现过的。
4. **没有记录也能出卡**：文件不存在就当第一次，只是少了防重复。

这不是轮换：**同一个项目保持统一**。项目级的不换，页面级的按这一页的内容推，同类组件全项目用同一个配方。

## 5. 全部选项

⭐ 是都对不上时的默认。先按「在哪」那份文件的信号表找，对上的就是这次的 ⭐。

### 整体风格（项目级，选一次就锁）

| 设定 | 全部选项 | ⭐ 默认和原因 | 在哪 |
|---|---|---|---|
| 后台排版方向（5） | L1 方格纸 + 玻璃卡 · L2 分组侧边栏 · L3 一深一强调 · L4 暗底明度分层 · L5 等距 3D 场景 | L2；能叠 L3 就叠，一个管结构，一个管焦点 | `references/visual/dashboard-layouts.md` |
| 品牌页灵魂（10） | Cinematic Tech · Phosphor Terminal · Editorial Publication · Warm Heritage · Gold Luxury · Brutal Typographic · Quiet Luxury Minimal · Organic / Botanical · Electric Nightlife · Scientific Emergence | 按行业；拿不准用 Quiet Luxury Minimal，不靠重动效，手机也稳 | `references/visual/new-page/references/style-personas.md` |
| 配色强度（4） | Restrained · Committed · Full · Drenched | 后台 Restrained，品牌页 Committed | 同上；每种强度里四个颜色角色各占多少、主按钮色怎么定见 `references/visual/color-roles.md` |
| 后台配色（12，`palette1`–`palette12`） | Sage Ledger · Amber Ops · Rose Clay · Teal & Clay · Violet Console · Mint & Lavender · Brick & Olive · Indigo & Coral · Cobalt Trust · Graphite & Lime · Midnight & Amber · Steel Cyan | 按行业查它的第 8 节，不默认用蓝 | `references/visual/new-page/references/product-palettes.md` |
| 底色（5） | Cool Slate · True Neutral · Warm Stone · Sage · Lilac | 跟强调色走；品牌色很抢眼时用 True Neutral | 同上 |
| 三个旋钮 | 个性 · 炫技 · 密度（各 1–10） | 后台炫技 1–4、密度 6–9 | `references/visual/new-page/index.md` §1 |
| 配色结构（6） | 单色 + 一亮色 · 冷暖双色 · 全单色 · 大地色 + 一饱和色 · 近黑 + 双金属 · 浅底 + 墨 + 信号色 | 浅底 + 墨 + 信号色，最易读 | `references/visual/new-page/references/divergence.md` §3 |
| 字体关系（6） | 同家族 · 900 对 300 · 无衬线夹斜体衬线 · 等宽为主 · 一款可变字体 · 大字当版式 | 900 对 300，最省力的高级感 | 同上 |
| 材质（9） | 胶片 · 纸与印刷 · 机加工金属 · 水与流体 · 信号荧光 · 实验室标本 · 织物 · 混凝土与光 · 电路网格 | 按品牌内容定，这一轴最先定 | 同上 |
| 设计系统（12） | Fluent · Material 3 · Carbon · Polaris · Atlassian · Primer · GOV.UK · USWDS · Bootstrap · Radix Themes · shadcn/ui · Tailwind v4 | 项目有就留，没有用 shadcn/ui；要装先写在卡上 | `references/visual/redesign/index.md` §2 |
| 审美（8） | 玻璃 · Bento · 粗野主义 · 杂志风 · 暗黑科技 · 极光渐变 · 动态文字 · Liquid Glass | Bento，后台也能用，不靠特效 | 同上 |
| 人格（3） | 克制 · 有弹性 · 有表现力 | 跟产品类型走 | `SKILL.md` 第一步 |

### 页面排版（每次可选）

| 设定 | 全部选项 | ⭐ 默认和原因 | 在哪 |
|---|---|---|---|
| Dashboard 骨架（6） | K1 主次 · K2 横带 · K3 主区 + 窄栏 · K4 画布铺满 · K5 看板 · K6 时间轴泳道 | K2；有一个最重要的数字就 K1 | `references/visual/dashboard-layouts.md` |
| 后台外框（7，`shell1`–`shell7`） | 1 标准侧栏 + 顶栏 · 2 框起来的 App 卡 · 3 Bento 控制台 · 4 顶部胶囊导航 · 5 居中 Bento / 三栏 · 6 工作流外壳 · 7 AI 控制台外壳 | 1，用户不用重新学；做事的页用 6，交给 AI 做的页用 7 | `references/visual/new-page/references/product-ui.md` §1 |
| 品牌页骨架（4，`brand1`–`brand4`） | 1 落地发布 · 2 作品集 · 3 Lookbook · 4 工作室 | 1；有作品就 2 | `references/visual/new-page/index.md` §5 |
| 品牌页版式（9，`layout1`–`layout9`） | 1 手风琴胶片 · 2 横向固定轨道 · 3 算法分格 · 4 列表行代替卡片 · 5 几何拼贴 · 6 非对称网格 · 7 爆炸图 · 8 全幅图片堆叠 · 9 固定步进面板 | 6，不要素材也有层次 | `references/visual/new-page/references/divergence.md` §3 |
| 手机页形态（6，`phone1`–`phone6`） | 1 App 壳（含每日工作台）· 2 翻页卡 · 3 吸附叙事 · 4 电商长页 · 5 长页官网 · 6 氛围单屏 | 1，像 App 的都用它 | `references/visual/new-page/references/h5-mobile.md` §4 |

### 卡片和导航（每次可选）

| 设定 | 全部选项 | ⭐ 默认和原因 | 在哪 |
|---|---|---|---|
| 卡片结构（6，`card1`–`card6`） | 1 头像组 + 金额 · 2 内容卡 · 3 图片 + 文字 · 4 个人资料 · 5 音频波形 · 6 逐条处理 | 2 最通用；有一批待确认就 6 | `references/visual/cards.md` |
| 卡片质感（4，`surface1`–`surface4`） | 1 浅色 · 2 深色 · 3 图片卡 · 4 玻璃卡 | 跟项目明暗走；玻璃卡要背后有内容 | `references/visual/cards.md`、`references/visual/glassmorphism.md` |
| Bento 小卡（4，`bento1`–`bento4`） | 1 深色主卡 · 2 多数据堆叠 · 3 方块小卡 · 4 迷你图卡 | 一行混用，外形不同才不单调 | `references/visual/new-page/references/product-ui.md` §1 |
| 导航风格（11，`nav1`–`nav11`） | 1 极简 · 2 磨砂 · 3 悬浮 · 4 新拟物 · 5 胶囊 · 6 中间大按钮 · 7 渐变 · 8 线框变实心 · 9 指示条 · 10 圆角顶 · 11 仿 iOS Dock | 9，Web 最稳；原生 iOS 用 11，原生 Android 用 5 | `references/visual/navigation.md` |
| 手机 Tab 栏（2，`tab1`–`tab2`） | 1 悬浮胶囊 · 2 贴边 | 2，背景花时更安全 | `references/visual/new-page/references/h5-mobile.md` §4 |

### 画面和图

| 设定 | 全部选项 | ⭐ 默认和原因 | 在哪 |
|---|---|---|---|
| 3D 场景（4 × 3 种屏） | S1 空间 · S2 流程 · S3 结构 · S4 柱子城市；演示 · 后台 · 大屏 | 默认不上；有真实位置才用 S1 | `references/visual/isometric-scene.md` |
| 首屏引擎（5） | A Three.js · B Canvas · C WebGL 流体 · D GSAP 滚动 · E 纯 CSS | D 或 E，风险最低，手机不卡 | `references/visual/new-page/references/hero-engines.md` |
| 发光小物件（3） | 线稿发光 · 实心 · 真 3D | 线稿发光，文件小，离线能开 | `references/visual/glow-objects.md` |
| 其他配图（2） | 讲概念的实物图 · 轴测线稿插画 | 讲规则用实物图，空状态用线稿 | `references/visual/explain-objects.md`、`references/visual/illustrations.md` |
| 参照来源 | 22 个示范页 · 18 个组件库 · 5 个灵感站 · 用户收藏 | 有对得上的收藏先用收藏，没有就看示范页 | `references/visual/new-page/examples/EXAMPLES.md`、`references/visual/libraries.md`、`references/ux/taste.md` |

### 动效和收尾

| 设定 | 全部选项 | ⭐ 默认和原因 | 在哪 |
|---|---|---|---|
| 动效多少（2） | 只做反馈 · 加 1 个招牌 | 只做反馈；品牌页、活动页可以加招牌 | `references/ux/interview.md` 五件事第 ④ 条 |
| 转场（3） | 立刻换 · 滑进来 · 原位放大 | 桌面 Tab 立刻换，手机下一层滑进来，大图原位放大 | `references/core/pick.md` |
| 交互配方（85） | 页面 P1–P11 · 组件 C1–C21 · 图表 D1–D10 · 手势 G1–G12 · 反馈 F1–F16 · 质感 M1–M8 · 效果 E1–E7 | 一次 1–3 个，先加组件级 | `references/core/pick.md` |
| 定向修（14） | bolder · quieter · distill · harden · onboard · colorize · typeset · layout · delight · overdrive · clarify · adapt · optimize · extract | 只修用户点的那样 | `references/visual/finish/index.md` |
| 检查（3） | critique · audit · polish | 先 critique + audit，再 polish | `references/visual/finish/index.md` |

## 6. 不上卡，永远照做

这些不是选项，不问用户，也不写在卡上：

- 质感 10 条（`references/visual/premium-details.md`）
- 11 条 UX 定律（`references/ux/ux-laws.md`）
- 一屏只高亮 1 样，红色只给错误和危险操作
- 高频操作不加动画，只动 `transform` / `opacity`，支持 reduced-motion
- 桌面视图和手机视图都做
- 时长、曲线、spring（`references/core/params.md`）
