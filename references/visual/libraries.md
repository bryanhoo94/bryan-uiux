# 参考站和组件库（看效果用，不是装库用）

<!-- 目录:开始（自动生成，别手改；改了标题就跑 python3 tools/toc.py） -->
**本文件目录**（全文 188 行；先看这里，再按行号只读用得上的那一节）

- 第 25–47 行：按项目里看得到的挑
- 第 49–70 行：18 个组件库
- 第 72–82 行：5 个灵感站
- 第 84–106 行：要装的时候
- 第 108–121 行：不要用的链接和命令
- 第 123–152 行：图标：选哪个库
- 第 154–184 行：AI 产品状态清单
- 第 186–188 行：给开发或别的 AI 描述需求时
<!-- 目录:结束 -->

18 个现成组件库和 5 个灵感站，用来找「效果参照」「整页参照」和「查漏状态」。先确认效果对不对，再讨论怎么实现。

- 实现时仍然先用项目里已有的组件。要新装库，先查 `references/visual/pick-library.md`，并先问用户。
- AI 能读库的文档页（WebFetch），了解组件有哪些状态和属性。动效手感要实际点着试：请用户自己打开链接，或用浏览器 skill 截图。
- **炫动画组件只给主角时刻**：Aceternity UI、Magic UI 这类（聚光灯、流星、光束、粒子背景）只用在品牌页或作品集首屏，一页最多 1 个；后台、dashboard、表单页一律不用。它们就是「模板落地页」那种 AI 味的来源，放进后台会把数字压下去。
- **数值换成本库的**：从任何库抄进项目的组件，时长、曲线、spring 换成 `references/core/params.md` 的值；项目有 `DESIGN.md` 就换成它的 token。
- **只有 Web 能装**：这 18 个库都是网页用的（React、HTML / CSS）。项目是 RN / Expo、Flutter 或原生 iOS / Android 时，只拿它们看效果，写法按 `references/build/rn.md`（RN / Expo）或 `references/core/platforms.md` 第 5 节（其他原生）。Capacitor、Electron、Tauri 跑的是网页，照常能装。
- **手机上要换做法**：这些库的悬停效果到了手机上没有悬停，改成按下反馈或常显，见 `references/core/pick.md` 的「按手怎么动来挑」。

## 按项目里看得到的挑

先看项目，再看用户怎么说。项目里已经有同类组件的，用项目的。

| 项目里看得到的 / 在做什么 | 先看 | 再看 |
|---|---|---|
| 项目是 RN / Expo（`package.json` 里有 `expo` 或 `react-native`），或 Flutter、原生 iOS / Android | 下面的库都装不了，只看效果；写法按 `references/build/rn.md`（RN / Expo）或 `references/core/platforms.md` 第 5 节 | — |
| 项目装了 shadcn/ui（根目录有 `components.json`） | 同一套命令就能加：Magic UI、Motion Primitives、MicroKit、mapcn、Uiable 都在 shadcn 的 registry 里 | — |
| 后台、表格、弹窗、表单这类日常组件 | shadcn/ui | Uiable 社区版 |
| 后台 / 工具类页面的完整模块：AI 输入框、文件上传 | React Bits Pro（付费） | shadcn/ui |
| 数据有经纬度、要画地图（dashboard 骨架 K4） | mapcn | — |
| 品牌页、作品集首屏的主角时刻（一页 1 个） | Magic UI | Aceternity UI、Motion Primitives |
| 按钮、开关、菜单、状态切换的细节动效 | beUI、Kinetics | MicroKit |
| 拖、滑、按住这类手势小组件（滑动确认、拖动对比、径向菜单） | Bencho | beUI |
| 项目没有 React，只有 HTML / CSS | Uiverse、Kinetics（都有纯 CSS 版） | CSS Text Effects |
| 大字标题要有特效 | CSS Text Effects | `references/recipes/effects.md` 的 E7 挖空文字 |
| 要真的折射下面内容的玻璃（不只是磨砂） | Liquid Glass | `references/visual/glassmorphism.md` |
| AI 对话界面 | Beautiful UI、AIUI Components | AI Elements |
| AI 要执行操作（调用工具、需要用户批准） | AI Elements | Beautiful UI、AIUI Components |
| 加载、生成中的等待状态 | Generative Loaders | Beautiful UI |
| 404、空状态、出错页 | 404s | — |
| 项目还没有 `DESIGN.md`，想看别人的 token 怎么分层 | Refero Styles、designmd.ai | — |
| 整页滚动叙事、3D 落地页找整页参照 | Kage、ScrollTide | `references/visual/new-page/references/inspiration-catalog.md` |

## 18 个组件库

| 库 | 网址 | 适合看 | 重点参考 |
|---|---|---|---|
| shadcn/ui | https://ui.shadcn.com/ | 日常基础组件，64 个（2026-10-12） | 按钮的状态和尺寸；表格排序、分页、可展开行；弹窗长内容滚动和底部按钮；表单校验和错误提示 |
| Uiable | https://uiable.com/ | 基于 shadcn/ui 的大组件库，组件和区块近千个 | 现成区块（一整块页面模块）怎么排；社区版免费，Pro 付费 |
| beUI | https://beui.dev/ | 按钮、菜单、状态切换的细节动效 | 按下的形变、回弹、颜色变化；菜单展开方向、速度、曲线；两个状态之间的过渡 |
| Bencho | https://bencho.dev/ | 按手势分类的交互小组件，48 个（2026-10-07），分悬停、按下、拖、滑动切换、滑扫、输入、选择 7 类 | 滑动确认；按住录音、滑出取消；图片拖动对比；两栏互换；径向菜单；就地确认删除。每个都能现场点着试，旁边的面板能调外观 |
| Kinetics | https://kinetics.colorion.co/ | 弹簧手感的微交互，153 个（2026-10-12），每个都有 CSS 和提示词，约 100 个有 React 版 | 小控件按下、切换时的弹簧手感；同一个效果的 CSS 版和 React 版对照着看 |
| MicroKit | https://microkit.co/ | 微交互组件，49 个（2026-10-12） | 小控件的状态反馈；跟 Kinetics 对照着看 |
| Motion Primitives | https://motion-primitives.com/ | 可以拼起来用的动画小部件，33 个（2026-10-12） | 文字逐字出现、数字滚动、展开收起、跟随鼠标这类可复用的动作 |
| Magic UI | https://magicui.design/ | 落地页用的动画组件，75 个（2026-10-12） | 首屏背景、数字滚动、跑马灯、logo 墙 |
| Aceternity UI | https://ui.aceternity.com/ | 落地页用的炫动画组件，免费组件 112 个（2026-10-12），区块和模板付费 | 首屏的聚光灯、光束、3D 卡片；只用来定主角时刻长什么样 |
| Uiverse | https://uiverse.io/ | 社区投稿的 HTML / CSS 小组件，几千个 | 按钮、开关、加载、复选框的纯 CSS 写法 |
| CSS Text Effects | https://text-effects.colorion.co/ | 纯 CSS 文字特效，114 个（2026-10-12） | 标题文字的各种纯 CSS 效果，挑一个给首屏大字；渐变字不要挑（`references/visual/new-page/references/anti-cheap.md` 禁了） |
| Liquid Glass | https://www.npmjs.com/package/@samasante/liquid-glass（包页面上有演示站链接） | 一个会折射下面内容的玻璃组件（不是一整套库） | 玻璃边缘的折射和高光；只有 Chrome / Edge 能真的折射下面的页面，Safari 和 Firefox 只有磨砂 |
| mapcn | https://mapcn.dev/ | 地图组件，8 个：地图、控件、标记、弹窗、路线、弧线、GeoJSON、聚合点 | dashboard 里的点位、路线和点开详情；基于 MapLibre，默认底图免费、不用 key |
| Beautiful UI | https://www.beautifului.dev/ | AI 对话、思考过程、任务进度 | 思考状态；多步任务进行到哪一步；流式输出的节奏和排版 |
| AI Elements | https://elements.ai-sdk.dev/ | AI 产品的完整交互流程 | 执行前先征求同意（Confirmation 组件）；同意 / 拒绝后的界面反馈；工具调用的中间状态 |
| AIUI Components | https://aiuicomponents.com/ | AI 常见交互，界面可切换中文 | 对话输入（多行、快捷命令、附件）；思考过程；引用来源标注；危险操作二次确认 |
| Generative Loaders | https://generativeloaders.com/ | 加载和内容出现 | 文字逐字出现（只动新增部分，已有文字不动）；图片模糊变清晰；生成中的等待动画 |
| React Bits Pro | https://pro.reactbits.dev/ | 更完整的页面模块 | AI 输入框（附件、快捷指令、多模态）；数据表格（筛选、排序、批量操作）；文件上传（进度、失败、重试）；后台的信息组织和导航。Pro 内容付费 |

## 5 个灵感站

看整页、看风格用，不装任何东西。只借结构（怎么分块、什么最大、哪里留白），不照抄别人品牌的颜色和字体。

| 站 | 网址 | 是什么 | 什么时候看 |
|---|---|---|---|
| Kage | https://kage.design/ | 真实产品的界面截图，每张都能「复制成提示词」，免费 | 要给别的 AI 描述一个界面长什么样时；截图版权归各产品，只看不搬 |
| ScrollTide | https://scrolltide.co/ | 滚动叙事和 3D 网站的提示词与模板，大部分付费 | 做落地页、作品集前看整页节奏；条款不许转发它的提示词和模板，不要贴进项目文档 |
| Refero Styles | https://styles.refero.design/ | 一个网站一份设计规范：`DESIGN.md`、Tailwind 配置、CSS 变量（测试版） | 项目还没有 `DESIGN.md` 时，看别人的 token 怎么分层；AI 读不了这个站，请用户自己打开 |
| designmd.ai | https://designmd.ai/ | 社区上传的 `DESIGN.md` 文件合集，免费 | 同上；文件许可证没写，只参考结构，自己的值按 `references/core/design-doc.md` 写 |
| 404s | https://404s.design/ | 404 页面合集，带截图和原页链接，免费 | 做 404、空状态、出错页时 |

## 要装的时候

先确认效果，再看这里。项目里已有同类组件就不装。

| 库 | 怎么装 |
|---|---|
| shadcn/ui | `npx shadcn@latest init`，然后 `npx shadcn@latest add <组件名>`。代码复制进项目，可以随便改。MIT |
| Uiable | `npx shadcn@latest add @uiable/<组件名>`。社区版 MIT；Pro 的标准许可证不许拿去做 SaaS 产品，用之前看清楚 |
| beUI | 不用装包，复制源码；也支持通过 shadcn registry 添加（命令见各组件页）。基于 Motion + Tailwind |
| Bencho | 不用装包。打开组件，切到代码页签，复制源码进项目。React，部分组件用到 `framer-motion` 和 `lucide-react`（项目里装的是 `motion` 就把引入改成 `motion/react`）。它的弹簧数值是它自己的，抄进项目时换成 `references/core/params.md` 的预设。组件源码 MIT，整段复制时保留它的版权声明；组件里的示例照片和字体不在授权范围内，换成自己的 |
| Kinetics、CSS Text Effects | 不用装包，复制 CSS 或 React。网站写 MIT，但它们的代码仓库里没有许可证文件：看效果、照着写，不整段复制 |
| MicroKit | `npx shadcn@latest add @microkit/<组件名>`。MIT |
| Motion Primitives | `npx motion-primitives@latest add <组件名>`（官方文档的写法）。MIT。基于 Motion + Tailwind |
| Magic UI | `npx shadcn@latest add @magicui/<组件名>`。MIT。基于 Motion + Tailwind |
| Aceternity UI | `npx shadcn@latest add @aceternity/<组件名>`，或打开组件页复制。免费组件**不是 MIT**：它的许可证不许把源码再发布。用在项目里可以，别把源码贴进公开的模板、skill 或组件库 |
| Uiverse | 不用装包，打开元素页复制 HTML / CSS 或 Tailwind 版。MIT |
| Liquid Glass | `npm i @samasante/liquid-glass`。0.1 版，还很早，用之前先在 Safari 上看一眼退化成什么样。MIT |
| mapcn | `npx shadcn@latest add @mapcn/map`。MIT |
| Beautiful UI | 不用装包，打开组件页复制源码进项目 |
| AI Elements | `npx ai-elements@latest add <组件名>`，例如 `add confirmation`。基于 shadcn/ui，要配合 Vercel AI SDK |
| AIUI Components | `npm install @aiuicomponents/components`。React 组件，MIT，包页面 https://www.npmjs.com/package/@aiuicomponents/components |
| Generative Loaders | `npm install generative-loaders`，再引入它的样式表。React 组件 |
| React Bits Pro | 免费版在 https://reactbits.dev/ ；Pro 付费后按官网说明安装 |

## 不要用的链接和命令

2026-09-22 和 2026-10-12 逐个打开或查询核对过，下面这些是错的。别的资料里再看到，不要改回去：

- `beautiful.ai`：是做演示文稿的 AI 工具，不是 Beautiful UI。
- `beui.io`、`aielements.dev`、`aiui.dev`：打不开。
- `reactbits.pro`：域名在挂牌出售。
- `npx shadcn-ui@latest ...`、`npm install shadcn-ui`：`shadcn-ui` 包已被官方弃用，用 `npx shadcn@latest`。
- `npm install aiui-components`：npm 上没有这个包，正确的是 `@aiuicomponents/components`。
- `npm install mapcn`：npm 上的 `mapcn` 是抢注的空包，用上面的 shadcn 命令。
- `npm install microkit`：npm 上的 `microkit` 是一个无关的微服务工具。
- `npm install magicui`、`npm install uiable`：npm 上没有这两个包。`aceternity-ui` 是 2024 年停更的旧命令行工具。都用上面的 shadcn 命令。
- `@itchief/react-morphicons`、`@morphicons/core`：npm 上没有这两个包，正确的是 `morphicons`。
- `<LOrdIcon icon="https://cdn.lordicon.com/xxx.json">`：`@lordicon/react` 没有这种写法，它导出的是 `Player`，`icon` 收的是下载好的 JSON 数据；带 `colors="primary:..."` 的是网页组件 `@lordicon/element` 的 `<lord-icon>`。

## 图标：选哪个库

```
要什么样的图标？
├─ 常规静态图标（搜索、设置、菜单）        → Lucide
├─ 两个图标之间要变（菜单 ↔ 关闭）         → Morphicons
└─ 要吸引注意的动态图标（加载、成功、空状态） → Lordicon
```

| 库 | 官网 | 装什么 | 怎么写 |
|---|---|---|---|
| Lucide | https://lucide.dev/ | `npm install lucide-react`（纯 JS 用 `lucide`） | `import { Search } from 'lucide-react'` → `<Search size={20} strokeWidth={2} />` |
| Morphicons | https://morphicons.com/ | `npm install morphicons` | `import { MorphIcon } from 'morphicons/react'` → `<MorphIcon icon={open ? X : Menu} />`，图标数据直接用 Lucide 的 |
| Lordicon | https://lordicon.com/ | `npm install @lordicon/react`（要 `lottie-web`）；任意框架用 `@lordicon/element` | React：`import { Player } from '@lordicon/react'` → `<Player icon={ICON} />`，ICON 是从官网下载的 JSON，播放用 ref 控制。纯 HTML：`<lord-icon src="..." colors="primary:#10B981" trigger="in">` |

**各自用在哪**

- **Lucide**：侧栏导航、筛选器、操作按钮。线性图标，24×24 网格，一整套风格一致。
- **Morphicons**：侧栏折叠（菜单 → X）、播放 ↔ 暂停、加号 ↔ 减号、亮 ↔ 暗、收藏 ↔ 已收藏。它是**两个状态之间的形变**，跟 F5 的「箭头转 180°」是同一个道理：让人知道这是同一个开关的两面。
- **Lordicon**：加载中、提交成功、操作失败、空状态、收到消息、任务完成。属于惊喜类动效，只放在低频时刻。加载状态还可以看 Generative Loaders（按内容类型选加载方式）。

**一个页面三个一起用的例子**：Lucide 做侧栏导航图标，Morphicons 做折叠按钮，Lordicon 做加载和提交成功。三者颜色统一。

**注意**

- **别混风格**：Lucide 是线性图标，同一组里不要混实心或填充风格的图标。
- **Lordicon 别滥用**：一个页面 2–3 个动态图标就够，多了很吵。
- **Morphicons 的时长**：官网写 200–400ms，按本库的时长档取 **200–250ms**，不要超过 300ms。
- **大小统一**：同一区域统一 20 或 24，不要混用。
- **图标不能是唯一信息**：重要操作要有文字，或至少有 `aria-label`。

## AI 产品状态清单

从上面的库总结。设计 AI 功能时逐条对照，漏掉的状态要补设计，不是等上线后再说。

**AI 在工作时**

- 思考中：用户看得出 AI 在想，不是卡住了（步骤指示，或可折叠的思考过程）。
- 流式输出：逐字出现时已有文字不跳动；看得出「还没写完」。
- 多步任务：当前第几步、哪一步失败、能不能重试。
- 工具调用：调用了什么、正在等什么、返回了什么。

**AI 要动手之前和之后**

- 执行前：先征求用户同意。
- 同意或拒绝后：界面各有对应反馈，执行中、成功、失败三种状态都要设计。
- 危险操作：二次确认。
- 回答有依据时：标注引用来源。

**加载按内容类型选，不要只放一个 spinner**

- 文字 → 流式逐字出现。
- 图片 → 模糊变清晰。
- 思考过程 → 步骤指示。

**基础组件的边界情况**

- 输入框：多行、快捷指令、附件、多模态。
- 文件上传：进度、失败、重试。
- 表格：排序、分页、筛选、批量操作、可展开行、空状态。
- 弹窗：内容很长时怎么滚动，底部按钮固定。
- 表单：校验中、校验失败、错误提示写在哪。

## 给开发或别的 AI 描述需求时

不要只说「这里要动效」「这里好看一点」。给三样东西：**链接 + 截图 + 行为描述**，例如「按钮按下时先缩放再回弹，像 beUI 这个组件一样」。能对应到配方库的，再附上配方编号和参数行。
