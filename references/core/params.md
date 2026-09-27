# 参数词典 + 通用规则

所有配方的时长、曲线、spring、手势常量只从这里取。写任何动效数值之前先读这份；项目动效规格里已经有的常量优先。

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
- 每个页面、每张卡片都要同时有桌面视图和手机视图，布局怎么变按 `references/core/platforms.md` 第 2.2 节。只做了一个视图不算完成。

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
