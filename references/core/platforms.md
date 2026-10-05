# 平台适配（Web 应用 / 手机 App / 桌面 App）

同一个配方，在不同平台上落地的方式不一样。第一步「认项目」时先判断平台，挑完配方后按本文件落地。

## 1. 判断目标平台

看 `package.json`、项目目录和 `PRODUCT.md`。一个项目可能同时有好几个目标（例如 Web + Capacitor 手机 App），每个都要列出来。

| 信号 | 平台 | 实现交给 |
|---|---|---|
| next / vite / react-dom / vue 等，没有外壳 | Web 应用（桌面浏览器 + 手机浏览器都要考虑） | `animate` |
| 有 manifest + service worker | PWA | `animate` |
| `@capacitor/core`、`cordova`、`@ionic/*` | 手机 App 里的 WebView（混合 App） | `animate`，并看第 3 节 |
| `electron` | 桌面 App（自带 Chromium） | `animate`，并看第 3 节 |
| `@tauri-apps/api` 或 `src-tauri/` | 桌面 App（系统 WebView：macOS 是 WKWebView，Windows 是 WebView2，Linux 是 WebKitGTK） | `animate`，并看第 3 节 |
| `expo` / `react-native` | 原生手机 App | `animate-expo`，并看第 5 节 |
| `pubspec.yaml`（Flutter）、Xcode / Android 原生工程 | 原生 App | 没有对应 skill，按第 5 节换算 |

## 2. 按输入方式和屏幕宽度落地

输入方式决定「怎么操作」，屏幕宽度决定「怎么排」，两件事分开判断：桌面浏览器窗口可以拉得很窄，iPad 也可以接鼠标。

### 2.1 输入方式

**按输入能力判断，不按设备判断。** 用 `(pointer: coarse)` 判断触屏，`(pointer: fine)` 判断鼠标 / 触控板，`(hover: hover)` 判断能不能悬停。桌面上每个交互都要能用键盘完成。

| 配方 | 触屏 | 鼠标 / 触控板 | 键盘 |
|---|---|---|---|
| G1 边缘滑回 | 原生 App、PWA 独立窗口、混合 App 才做；手机浏览器不做（系统已占用） | 不做，用返回按钮 | Esc 或 Alt + ← |
| G4 方向锁定、G6 预判落点、M7 手势转场 | 做 | 鼠标拖拽用同一套 Pointer Events；触控板横滑是 `wheel` 事件，要映射到同一个进度 | 方向键翻页，Esc 关闭 |
| P1 捏合换密度 | 双指捏合 | 触控板捏合：Chrome / Edge / Firefox 是 `wheel` + `ctrlKey`，Safari 是 `gesturestart` / `gesturechange`；另外给按钮 | `+` / `−` 键 |
| C5 跟手放大图标栏 | 按住滑动 | 悬停跟随，只在精细指针下开 | 方向键移动高亮 |
| M3 3D 视差、M1 磁吸按钮 | 不做（不为它申请陀螺仪权限） | 鼠标跟随 | 不做 |
| F2 拖拽排序 | 长按后拖 | 直接拖，不用长按 | 空格拿起，方向键移动，空格放下 |
| G2 按钮滑出取消 | 做 | 做（Pointer Events 一样） | 不适用，Enter / 空格直接触发 |
| G7 到顶回弹、P4 下拉放大头图 | 做；平台自带回弹时不重复做 | 不做，交给系统（macOS 触控板自带弹性滚动） | 不适用 |
| P2、P3、M4 等滚动驱动的配方 | 做 | 做 | 键盘滚动同样触发 |
| 点击类（P8、C1、C3、D 系列等） | 点按 | 点击，可加悬停预览 | 焦点 + Enter |
| L5 等距 3D 场景的镜头 | 单指平移、双指缩放，不能转 | 左键拖平移、滚轮缩放、按钮转 90° | 方向键平移，`+` / `−` 缩放；选中走列表 |

### 2.2 屏幕宽度（桌面视图 / 手机视图）

**Web 应用默认桌面视图和手机视图都要做，只做了一个不算完成。** 原生手机 App 的目标里有平板或横屏的话，也要照顾到。

**断点**：先用项目已有的（Tailwind 配置、CSS 变量、theme 文件）。没有就用：手机 < 640px ｜ 平板 640–1023px ｜ 桌面 ≥ 1024px。平板竖屏按手机视图排（可以放宽到 2 列），横屏按桌面视图排。RN / Expo 用 `useWindowDimensions()` 读宽度，不要按设备型号写死。Electron / Tauri 给窗口设最小尺寸，窗口拖窄以后按平板排。

**同一个东西，两种视图怎么变**

| 东西 | 桌面视图 | 手机视图 |
|---|---|---|
| 主导航 | 侧边栏（平板用左侧图标竖栏） | 底部 Tab 3–5 项，或者顶栏按钮 + C13 全屏菜单。入口数、选中样式、安全区、11 种风格都见 `references/visual/navigation.md` |
| 卡片网格 | 多列，`repeat(auto-fill, minmax(280px, 1fr))`（起始值） | 1 列；同类推荐可以横滑一排（`scroll-snap`，露出下一张的一截，提示还能滑） |
| 数据表格 | 表格 | 每行变成一张卡片，只放 2–3 个关键字段，点开看全部 |
| 下拉菜单、popover | 从触发点展开 | 底部弹层（M7） |
| 对话框 | 居中弹窗 | 底部弹层或全屏 |
| 悬停才出现的信息（tooltip、D4 悬停对比） | 悬停 | 点按显示，或者直接常显 |
| 主操作按钮 | 跟着内容放 | 固定在底部拇指区，避开 `env(safe-area-inset-bottom)` |
| 页面左右边距 | 24–32px | 16px |
| 超大数字、大标题 | 取配方的上限 | 取下限，中间用 `clamp()` 过渡 |

**手机视图的硬指标**

- 可点区域 ≥ 44 × 44px。图标看起来小没关系，点击区要撑够。
- 输入框字号 ≥ 16px，否则 iOS Safari 聚焦时会自动放大页面。
- 屏宽 360px 时不许出现横向滚动条。
- 正文不小于 14px。

**宽度变了，配方也要换**

| 配方 | 桌面视图 | 手机视图 |
|---|---|---|
| C3 横向手风琴 | 做 | 改成纵向折叠 |
| C13 菜单铺满全屏 | 不做，用下拉菜单 | 做 |
| E2 封面流、E3 环形画廊 | 做 | 降级成横滑列表 + `scroll-snap` |
| M5 流动 Tab | 顶部分段控件，限制最大拉伸长度 | 底部 Tab |
| P6 弧线换列 | 窗口宽度跨过断点、列数变了时播，等 resize 停下再播 | 转屏时播 |
| L5 等距 3D 场景 | 场景铺满窗口，面板浮在上面 | 场景占上半屏，列表和详情进底部弹层（M7）；跑不动换静态图。见 `references/visual/isometric-scene.md` 第 11 节 |

## 3. WebView 特有的注意事项（Capacitor / Cordova / Electron / Tauri）

- **新 API 能不能用，看 WebView 的引擎。** iOS WKWebView 跟同版本 Safari 一样；Android System WebView 是 Chromium，跟着系统更新；Electron 自带新版 Chromium，新特性基本都能用；Tauri 用系统 WebView，Linux 的 WebKitGTK 最落后。
- **新 API 必须先检测再用。** View Transitions 用 `document.startViewTransition` 检测，`animation-timeline`、`interpolate-size`、`@starting-style` 用 `CSS.supports(...)` 检测。不支持就走配方里写的「降级」。
- **手机 WebView 的回弹和下拉刷新**：自己做 G7 / P4 之前，先在原生外壳里关掉 WebView 自带的回弹（Capacitor / Cordova 各有配置项，按项目用的版本查文档），网页里再加 `overscroll-behavior: none`。否则会出现两层阻尼。
- **系统返回**：iOS 的 WKWebView 默认没有边缘返回手势，混合 App 要自己做 G1。Android 的系统返回键或手势，用外壳提供的返回事件（Capacitor 用 `@capacitor/app` 的 `backButton`）接到同一套返回逻辑上。
- **安全区**：底部 Tab（M5）、底部弹层（M7）、全屏图片（M6）要用 `env(safe-area-inset-*)` 避开刘海和底部横条。
- **桌面窗口拖拽区**：Electron / Tauri 标题栏里的 `-webkit-app-region: drag` 区域收不到鼠标事件。可拖的元素要放在 `no-drag` 区域。
- **桌面 App 键盘用得多**：快捷键触发的操作不加动画（`animate` 的频率关），而且门槛比网页更严。
- **低端 Android WebView 性能差**：`blur`、`backdrop-filter`、SVG 滤镜很贵。P3 拖影、P7 背景反色、M5 的液态滤镜默认关，或只在高端设备上开。

## 4. 触觉反馈

配方里写的「轻触觉反馈」，按平台选做法。所有平台都要保证：**没有触觉，视觉反馈也要能单独成立。**

| 平台 | 做法 |
|---|---|
| RN / Expo | `expo-haptics`（写法见 `animate-expo`） |
| Capacitor | `@capacitor/haptics` |
| 手机浏览器 / PWA | `navigator.vibrate` 只有 Android Chrome 支持，iOS Safari 不支持，只能当加分项 |
| 桌面浏览器、Electron、Tauri | 没有触觉，只靠视觉 |

## 5. 原生 App 的换算

- **RN / Expo**：spring 用参数词典（`references/core/params.md`）的 RN 列；曲线用 `animate-expo` 里的同名常量（与 Web 同一组贝塞尔值）；手势用 Gesture Handler，动画跑在 UI 线程。CSS 专属的功能要换写法：View Transitions 换成 Reanimated 的共享元素 / 布局动画，滚动驱动换成 `useAnimatedScrollHandler` + `interpolate`。具体写法交给 `animate-expo`。
- **Flutter / Swift / Kotlin**：没有对应的 skill，按参数词典换算。曲线用同一组贝塞尔值；spring 按「过冲多少」（bounce）和「时长」换成各平台的 spring 参数；手势常量（10px 方向判定、0.11 px/ms 甩动、`rubberband` 公式、动量落点公式）直接沿用。

## 6. 验收

每个目标平台都要过一遍，不能只测一个平台：

1. 桌面：只用鼠标走一遍，再只用键盘走一遍。
2. 两种视图：桌面 1280 / 1440px、手机 360 / 390px 各看一遍，目标里有平板再看 768 / 1024px。桌面网页再把窗口从宽拖到窄，中间不许有布局断掉的宽度。
3. 手机：真机触屏走一遍，手势要在真机上测。
4. WebView 项目：在最旧的目标引擎上确认降级正常（iOS 最低版本、Linux WebKitGTK 等）。
5. 打开系统的「减少动态」，再走一遍。
