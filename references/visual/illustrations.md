# 轴测线稿插画

<!-- 目录:开始（自动生成，别手改；改了标题就跑 python3 tools/toc.py） -->
**本文件目录**（全文 171 行；先看这里，再按行号只读用得上的那一节）

- 第 20–33 行：画不画（自己判断，不问用户）
- 第 35–57 行：画风
- 第 59–72 行：画什么：操作 → 实物
- 第 74–80 行：放在哪、多大
- 第 82–147 行：怎么画
- 第 149–156 行：动效
- 第 158–161 行：无障碍
- 第 163–171 行：常见翻车
<!-- 目录:结束 -->

一张小插画，把看不见的操作画成一个实物：筛选陌生发件人画成一根闸杆，自动分类画成分格的文件架，清理画成碎纸机。用在空状态、引导弹窗、开启某个功能的那张卡片顶部。

参数预设、曲线和通用规则见 `references/core/params.md`，这里不重复。整页的灰阶层次见 `references/visual/dashboard-layouts.md` 的 L4。

## 画不画（自己判断，不问用户）

先看项目，按下表从上往下对，第一条对上的就是。

| 项目里看得到的 | 画不画、画在哪 |
|---|---|
| 项目里已经有插画（`illustrations/` 文件夹、成套的插图 SVG、Lottie 文件） | 跟项目现有的风格，不用这套 |
| 列表、搜索结果、收件箱会变成 0 条；有首次引导、设置向导（「第 2 步 / 共 3 步」） | 画，放在空状态和引导卡顶部 |
| 有在后台自动发生的操作（定时任务、规则、AI 自动处理），用户看不见它在干什么 | 画，放在开启这个功能的弹窗顶部，讲它会做什么 |
| 品牌页、落地页、作品集 | 不用这套，品牌页的视觉按 `references/visual/new-page/index.md` |
| 数据监控、要盯一整天的页面主区；列表行、表格、导航 | 不放。图标从 `references/visual/libraries.md` 挑 |

- 跟 L4 暗底明度分层最配：插画自己也靠明度分层（底座最暗、物件亮一档、主体用强调色）。L1–L3 的浅色页用下面的浅色取值。
- 选完用一行告诉用户：「收件箱清空时放一张『全部处理完』的线稿插画：项目里列表会变成 0 条，现在只显示一行灰字。」

## 画风

| 项 | 规则 |
|---|---|
| 视角 | 等距，2:1 斜率（横走 2、竖走 1，约 26.6°）。坐标都是整数，线不发糊。同一个产品所有插画用同一个斜率 |
| 线 | 只有一种灰线，1px；主体 1.5px。转角和线头都是圆的 |
| 面 | 每个面填插画所在那块底色，把后面的线遮住。不填就成了线框图，前后穿插看不清 |
| 强调色 | **一张图只有 1 个物件用强调色**：强调色描边 + 24% 强调色填充（起始值），比主按钮弱一档，主按钮仍是这一屏最显眼的。这个物件就是这张卡片在讲的「当前这一条」 |
| 状态色 | 只在讲这个状态的图里出现，而且是替代强调色，不叠加。红色只给出错 |
| 物件数 | 1 个底座 + 1 个主体 + 最多 3 个配角。再多就看不出在讲什么 |
| 细节 | 物件上可以加 1–2 条细线表示它是什么（信封的封口、文件的文字行），不加纹理 |
| 不要 | 人物、渐变、阴影、发光。L4 里加阴影会破坏明度分层 |

**取值**（项目有 `DESIGN.md` 就用项目的灰阶和强调色）

| 变量 | 深色 | 浅色 | 用在 |
|---|---|---|---|
| `--illo-bg` | `#16161A` | `#FFFFFF` | 面的填充，**必须等于插画所在那块的底色**。放在弹窗上就改成弹窗色（L4 灰阶第 4 层 `#2A2A30`） |
| `--illo-line` | `#52525B` | `#AEAEB2` | 物件的线 |
| `--illo-base` | `#2E2E35` | `#E5E5EA` | 底座的线，比物件再暗一档 |
| `--accent` | 项目强调色 | 项目强调色 | 主体 |

插画是装饰，灰线不用达到 WCAG 的 3:1。也因为它是装饰，意思一定要有文字讲出来（见下面「无障碍」）。

## 画什么：操作 → 实物

| 要讲的操作 | 画成什么 | 强调色给谁 |
|---|---|---|
| 筛选陌生发件人、审核准入 | 一条传送台，几封信排队，尽头一根闸杆 | 正排到闸口的那一封 |
| 自动分类 | 分格的文件架，信插在不同格里 | 插进「要你处理」那一格的那封 |
| 清理、退订、批量删除 | 碎纸机，几张纸正往里送 | 正在进口的那一张 |
| 稍后提醒 | 一条晾衣绳，夹着几封信 | 最先回来的那一封 |
| 文件审阅还没有内容 | 一个空托盘，一张文件悬在上面 | 悬着的那张 |
| 全部处理完 | 几张卡片叠在底座上，最上面打勾 | 最上面那张（下面的完整示例） |

表里没有的操作，照这个思路找：这件事在现实里由什么东西来做，画那个东西，不画抽象符号（漏斗、齿轮、盾牌）。

要的不是空状态小图，而是在说明页、文档里把一条规则讲清楚的整张大图，还要能操作 → `references/visual/explain-objects.md`。

## 放在哪、多大

| 放在哪 | 桌面视图 | 手机视图 |
|---|---|---|
| 空状态 | 宽 240px，居中。下面依次是一句标题、一句说明、1 个按钮 | 宽 200px，插画加文字不超过半屏 |
| 弹窗、引导卡顶部 | 占卡片高度 35–40%，不加框，直接放在卡片底色上。下面接标题和「第 2 步 / 共 3 步」 | 弹窗在手机上变成底部弹层，插画缩到 160px 宽；屏幕高度不到 700px（起始值）就不放插画，只留标题 |
| 功能介绍卡 | 按 `references/visual/cards.md` 的规矩：图片区不超过卡片的 40% | 卡片改成 1 列，插画跟着缩 |

## 怎么画

**Web（React + SVG）**：先写一个坐标换算，再用长方体拼。画的顺序是从远到近：底座 → 后排 → 前排，叠起来的从下往上。

```tsx
// 等距坐标 → SVG 坐标。x 轴往右下，y 轴往左下，z 轴竖直向上
const U = 16                    // 一格多宽（起始值）
const OX = 120, OY = 40         // (0,0,0) 在 viewBox 里的位置
type Pt = readonly [number, number]
const iso = (x: number, y: number, z = 0): Pt => [OX + (x - y) * U, OY + ((x + y) * U) / 2 - z * U]
const poly = (...p: Pt[]) => `M${p.map(([a, b]) => `${a} ${b}`).join(' L')} Z`

// 长方体只画看得见的三个面：顶、左前、右前
export function box(x: number, y: number, z: number, w: number, d: number, h: number) {
  const t = z + h
  return [
    poly(iso(x, y, t), iso(x + w, y, t), iso(x + w, y + d, t), iso(x, y + d, t)),
    poly(iso(x, y + d, t), iso(x + w, y + d, t), iso(x + w, y + d, z), iso(x, y + d, z)),
    poly(iso(x + w, y, t), iso(x + w, y + d, t), iso(x + w, y + d, z), iso(x + w, y, z)),
  ]
}

const Box = ({ faces, tone }: { faces: string[]; tone: 'base' | 'line' | 'accent' }) => (
  <g className={`illo-${tone}`}>{faces.map((d) => <path key={d} d={d} />)}</g>
)

// 全部处理完：底座 + 三张叠起来的卡片，最上面那张用强调色并打勾
export function AllDoneIllustration() {
  return (
    <svg viewBox="0 0 240 160" className="illo" aria-hidden="true">
      <Box faces={box(0, 0, 0, 6, 6, 0.5)} tone="base" />
      <Box faces={box(1.5, 1, 0.5, 3, 4, 0.25)} tone="line" />
      <Box faces={box(1.5, 1, 0.75, 3, 4, 0.25)} tone="line" />
      <Box faces={box(1.5, 1, 1, 3, 4, 0.25)} tone="accent" />
      <path className="illo-mark" d="M110 66 L117 73 L132 58" />
    </svg>
  )
}
```

```css
:root { --illo-bg: #FFFFFF; --illo-line: #AEAEB2; --illo-base: #E5E5EA; }
[data-theme="dark"] { --illo-bg: #16161A; --illo-line: #52525B; --illo-base: #2E2E35; }

.illo { width: 240px; max-width: 100%; height: auto; }
.illo path {
  fill: var(--illo-bg); stroke-width: 1;
  stroke-linejoin: round; stroke-linecap: round;
  vector-effect: non-scaling-stroke;  /* 插画缩放时线宽不变 */
}
.illo-base path { stroke: var(--illo-base); }
.illo-line path { stroke: var(--illo-line); }
.illo-accent path {
  stroke: var(--accent); stroke-width: 1.5;
  fill: color-mix(in srgb, var(--accent) 24%, var(--illo-bg));  /* 混出来是不透明色，照样能遮住后面的线 */
}
.illo .illo-mark { fill: none; stroke: var(--accent); stroke-width: 2; }
```

- 勾、信封封口这类小符号直接用屏幕坐标画，不走 `iso()`：认得出比透视对更重要。
- 主体的填充不能用 `fill-opacity`，半透明会让后面的线透出来；用 `color-mix` 混出不透明色。

**RN / Expo**：用 `react-native-svg`，`iso()` 和 `box()` 原样复用，`<svg>` / `<g>` / `<path>` 换成 `Svg` / `G` / `Path`，样式写成属性（`stroke`、`strokeWidth`、`strokeLinejoin`、`fill`）。

- RN 里没有 CSS 变量和 `color-mix`：颜色从主题对象里取；主体先画一层 `fill={illoBg}` 的面，再叠一层 `fill={accent} fillOpacity={0.24}` 的同一个面。
- `Svg` 的 `width` 按上面那张表的尺寸写死，跟 viewBox 同比例，线宽就不会被缩放。

## 动效

默认不动。一屏就一张静态图，动起来只会跟主按钮抢注意。

唯一例外：「全部处理完」第一次出现时，勾画出来一次。勾的画法跟 F3 一样：SVG 路径 `stroke-dashoffset`，150ms `--ease-out`。

- 频率关：列表一筛选就会变 0 条的那种空状态不画勾，只给真的「全部处理完」。
- reduced-motion：直接显示画好的勾。

## 无障碍

- 插画旁边的文字已经讲清楚了（几乎总是这样）→ `aria-hidden="true"`；RN 里给外层 `View` 设 `accessibilityElementsHidden` 和 `importantForAccessibility="no-hide-descendants"`。
- 插画是唯一讲这件事的东西 → 先补一句文字。实在不能加，就给 `role="img"` 和 `aria-label`（RN 用 `accessibilityRole="image"` 和 `accessibilityLabel`），写它讲的那件事，不描述画面。

## 常见翻车

- ❌ 只描边不填底色 → 后面的线穿过前面的物件，看起来像线框图。
- ❌ 每个物件都上色 → 主体淹没在彩色里，跟 L5 白模的道理一样。
- ❌ 插画里的强调色比主按钮还亮 → 抢走了主操作，一屏只高亮 1 样。
- ❌ 一张图塞了 5 个以上物件 → 看不出在讲什么。
- ❌ 画抽象符号（漏斗、齿轮、盾牌）→ 跟图标没区别，没讲清楚「它会帮你做什么」。
- ❌ 同一个产品里斜率、线宽、灰阶不统一 → 一看就是拼来的。
- ❌ `--illo-bg` 跟所在的底色不一样 → 每个面都成了一块色块。
