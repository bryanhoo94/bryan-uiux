# GSAP（网页动画库）

用 Timeline 编排节奏，不要用一堆 `setTimeout` 和 `delay` 硬凑。

## 什么时候才用它

| 需求 | 用什么 |
|---|---|
| hover、按下、颜色变化、一个状态切换 | CSS transition 就够了，不要为它装库 |
| 滚动触发、滚动进度驱动 | GSAP ScrollTrigger |
| 多个元素按顺序、有重叠的序列 | GSAP Timeline |
| SVG 路径画出来、元素沿路径走 | GSAP + MotionPathPlugin |
| 精确时序控制的复杂转场 | GSAP Timeline |

**项目已经装了别的动画库（Motion、Anime 等）就用它，不要为一个效果再装第二个。** 手机 App（RN / Expo）不用 GSAP，走 `animate-expo`。

## 安装

```bash
npm install gsap          # React 项目再加：npm install @gsap/react
```

插件要先注册：`gsap.registerPlugin(ScrollTrigger)`。

## 四个核心用法

**1. Timeline 排节奏**

```js
const tl = gsap.timeline();
tl.from('.card', { y: 60, opacity: 0, duration: 0.25, stagger: 0.05, ease: 'power3.out' })
  .from('.text', { y: 20, opacity: 0, duration: 0.2 }, '-=0.1');   // 负数 = 和上一段重叠
```

**2. ScrollTrigger：进入视口才播**

```js
gsap.from('.section', {
  scrollTrigger: { trigger: '.section', start: 'top 80%', toggleActions: 'play none none reverse' },
  y: 50, opacity: 0, duration: 0.3, ease: 'power3.out',
});
```

要「滚动到哪就停在哪」（P2 滚动驱动）时加 `scrub: true`，不要写 duration。

**3. SVG 路径**

```js
gsap.from('#path', { strokeDashoffset: 1000, duration: 1.2, ease: 'power2.inOut' });          // 线条画出来
gsap.to('.dot', { motionPath: { path: '#track', align: '#track', autoRotate: true }, duration: 2 });
```

**4. React 里的清理**

`useGSAP()` 自己会清理，不用再手动包 `gsap.context()`：

```jsx
const scope = useRef(null);
useGSAP(() => {
  gsap.from('.card', { y: 60, opacity: 0, stagger: 0.05 });
}, { scope });        // 选择器只在 scope 内生效，组件卸载时自动 revert
return <div ref={scope}>…</div>;
```

## 缓动对照表

本库的曲线和 spring，在 GSAP 里这样写：

| 本库 | GSAP | 用在 |
|---|---|---|
| `--ease-out` | `power3.out`（要更柔用 `power2.out`） | 进入、离开、默认 |
| `--ease-in-out` | `power2.inOut` | 屏幕上的移动和形变 |
| `spring-ui`（不过冲） | `power3.out` | 让位、回位 |
| `spring-gesture`（轻微回弹） | `back.out(1.1)` – `back.out(1.4)` | 手势落位 |
| `spring-pop`（弹一下） | `back.out(1.7)` | 确认反馈，低频才用 |
| — | `elastic.out(1, 0.5)`、`bounce.out` | 幅度很大，只用在庆祝这类罕见时刻 |
| 禁止 | 任何 `.in` 结尾的缓动 | UI 上永远不用 ease-in |

GSAP **不认** `ease: 'cubic-bezier(...)'`，那需要另外装 CustomEase 插件。不想装就用上表的对应写法。

时长：GSAP 的 `duration` 单位是秒。本库的时长档换算过来是 0.1–0.16（按下）、0.15–0.25（菜单）、0.2–0.5（全屏、抽屉），其余 UI ≤ 0.3。落地页的首屏叙事可以放宽。

## 常用模板

| 模板 | 写法要点 |
|---|---|
| 文字逐字显现 | 把文字拆成 span，`stagger: 0.05`，`duration: 0.25`，`ease: 'power3.out'`。想更俏皮用 `back.out(1.7)`，但只放在品牌页 |
| 卡片交错入场 | `stagger: { amount: 0.3, grid: [列, 行], from: 'top' }`。整组错峰总和 ≤ 0.3 秒，超出的项同时进 |
| 点击展开折叠 | `gsap.timeline({ paused: true }).to('.content', { height: 'auto', duration: 0.2, ease: 'power2.inOut' })`，点击时 `play()` / `reverse()`。高度动画只允许用在折叠场景 |
| 页面转场 | 旧页 `scale: 0.95, opacity: 0, duration: 0.2`，新页 `from({ scale: 1.05, opacity: 0, duration: 0.3 }, '-=0.1')`。两段都用 `power3.out`，退场也不要用 `.in` |
| 数字增长 | `gsap.to('.counter', { innerText: 目标值, snap: { innerText: 1 }, duration: 1, ease: 'power2.out' })`。要「只翻变化的那一位」的翻牌效果，用 G3，不要用这个 |
| 弹性回弹 | `ease: 'back.out(1.7)'`。`elastic.out(1, 0.5)` 幅度太大，只用在庆祝 |

## 性能和无障碍

| 问题 | 解法 |
|---|---|
| 动 `width` / `height` | 改用 `scale`（折叠除外） |
| 动 `top` / `left` | 改用 `x` / `y`（translate） |
| 一屏东西同时全播 | 用 `stagger` 分批 |
| 组件卸载后动画还在跑 | React 用 `useGSAP({ scope })`；原生 JS 用 `gsap.context()` 并在销毁时 `revert()` |
| 手机掉帧 | 少用 blur / filter；必要时加 `will-change` |

减少动态：用 `gsap.matchMedia()` 加一条 `'(prefers-reduced-motion: reduce)'` 分支，在里面只做透明度变化，不做位移。

## 提示词模板

用 GSAP 实现 [效果描述]，要求：用 gsap.timeline() 编排节奏，不用 setTimeout / delay 硬凑；触发方式为 [滚动进入 / 页面加载 / 点击]；缓动用 [power3.out / back.out(1.7)]；React 项目用 useGSAP({ scope }) 处理清理；只动 transform 和 opacity。

例如：用 GSAP 实现卡片列表的交错入场：卡片从下方依次滑入，每个晚 0.05 秒，缓动 power3.out，用 useGSAP({ scope }) 处理清理。
