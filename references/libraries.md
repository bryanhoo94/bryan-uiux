# 参考组件库（看效果用，不是装库用）

7 个现成组件库，用来找「效果参照」和「查漏状态」。先确认效果对不对，再讨论怎么实现。

- 实现时仍然先用项目里已有的组件。要新装库，按 CLAUDE.md 先过 `pick-ui-library`。
- AI 能读库的文档页（WebFetch），了解组件有哪些状态和属性。动效手感要实际点着试：请用户自己打开链接，或用浏览器 skill 截图。

## 按你在做什么挑

| 在做什么 | 先看 | 再看 |
|---|---|---|
| AI 对话界面 | Beautiful UI、AIUI Components | AI Elements |
| AI 要执行操作（调用工具、需要用户批准） | AI Elements | Beautiful UI、AIUI Components |
| 加载、生成中的等待状态 | Generative Loaders | Beautiful UI |
| 按钮、菜单、状态切换的细节动效 | beUI | — |
| 日常基础组件（按钮、表格、弹窗、表单） | shadcn/ui | — |
| 后台 / 工具类页面、AI 输入框、文件上传 | React Bits Pro（付费） | shadcn/ui |

## 7 个库

| 库 | 网址 | 适合看 | 重点参考 |
|---|---|---|---|
| Beautiful UI | https://www.beautifului.dev/ | AI 对话、思考过程、任务进度 | 思考状态；多步任务进行到哪一步；流式输出的节奏和排版 |
| beUI | https://beui.dev/ | 按钮、菜单、状态切换的细节动效 | 按下的形变、回弹、颜色变化；菜单展开方向、速度、曲线；两个状态之间的过渡 |
| AI Elements | https://elements.ai-sdk.dev/ | AI 产品的完整交互流程 | 执行前先征求同意（Confirmation 组件）；同意 / 拒绝后的界面反馈；工具调用的中间状态 |
| Generative Loaders | https://generativeloaders.com/ | 加载和内容出现 | 文字逐字出现（只动新增部分，已有文字不动）；图片模糊变清晰；生成中的等待动画 |
| shadcn/ui | https://ui.shadcn.com/ | 日常基础组件 | 按钮的状态和尺寸；表格排序、分页、可展开行；弹窗长内容滚动和底部按钮；表单校验和错误提示 |
| React Bits Pro | https://pro.reactbits.dev/ | 更完整的页面模块 | AI 输入框（附件、快捷指令、多模态）；数据表格（筛选、排序、批量操作）；文件上传（进度、失败、重试）；后台的信息组织和导航。Pro 内容付费 |
| AIUI Components | https://aiuicomponents.com/ | AI 常见交互，界面可切换中文 | 对话输入（多行、快捷命令、附件）；思考过程；引用来源标注；危险操作二次确认 |

## 要装的时候

先确认效果，再看这里。项目里已有同类组件就不装。

| 库 | 怎么装 |
|---|---|
| Beautiful UI | 不用装包，打开组件页复制源码进项目 |
| beUI | 不用装包，复制源码；也支持通过 shadcn registry 添加（命令见各组件页）。基于 Motion + Tailwind |
| AI Elements | `npx ai-elements@latest add <组件名>`，例如 `add confirmation`。基于 shadcn/ui，要配合 Vercel AI SDK |
| Generative Loaders | `npm install generative-loaders`，再引入它的样式表。React 组件 |
| shadcn/ui | `npx shadcn@latest init`，然后 `npx shadcn@latest add <组件名>`。代码复制进项目，可以随便改 |
| React Bits Pro | 免费版在 https://reactbits.dev/ ；Pro 付费后按官网说明安装 |
| AIUI Components | `npm install @aiuicomponents/components`。React 组件，MIT，源码在 https://github.com/connie918/aiui-components |

## 不要用的链接和命令

2026-09-22 逐个打开或查询核对过，下面这些是错的。别的资料里再看到，不要改回去：

- `beautiful.ai`：是做演示文稿的 AI 工具，不是 Beautiful UI。
- `beui.io`、`aielements.dev`、`aiui.dev`：打不开。
- `reactbits.pro`：域名在挂牌出售。
- `npx shadcn-ui@latest ...`、`npm install shadcn-ui`：`shadcn-ui` 包已被官方弃用，用 `npx shadcn@latest`。
- `npm install aiui-components`：npm 上没有这个包，正确的是 `@aiuicomponents/components`。
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

从上面 7 个库总结。设计 AI 功能时逐条对照，漏掉的状态要补设计，不是等上线后再说。

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
