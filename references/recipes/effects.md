# 网页视觉效果（E1–E7）+ 用户原话翻译表

<!-- 目录:开始（自动生成，别手改；改了标题就跑 python3 tools/toc.py） -->
**本文件目录**（全文 146 行；先看这里，再按行号只读用得上的那一节）

- 第 17–53 行：用户这么说 → 其实是什么 → 用哪个
- 第 55–146 行：实现规矩
  - 第 64–72 行：E1 悬停抬起 + 邻位让位
  - 第 74–82 行：E2 封面流
  - 第 84–91 行：E3 3D 环形画廊
  - 第 93–99 行：E4 点击涟漪
  - 第 101–108 行：E5 翻页 / 折纸
  - 第 110–125 行：E6 渐进模糊
  - 第 127–146 行：E7 挖空文字
<!-- 目录:结束 -->

## 用户这么说 → 其实是什么 → 用哪个

用户很少会说专业词。听到左边这些话，直接对到右边。

| 用户这么说 | 正式叫法 | 用哪个 |
|---|---|---|
| 鼠标放上去变大，旁边的让开 | 悬停抬起 + 邻位让位（Hover Lift + Neighbor Displace） | E1 |
| 像扇子一样展开 / 一张张排过去 | 扇形排列 / 封面流（Fan Layout / Cover Flow） | E2 |
| 扭成一圈、像转盘 | 3D 环形画廊（3D Ring Gallery） | E3 |
| 一个一个冒出来 | 交错入场（Stagger Enter） | `references/core/params.md` 的错峰规则 + F3 |
| 弹来弹去收不住 | 弹簧过冲（Spring Physics / Overshoot） | `spring-pop`、F6 步骤条回弹 |
| 飘在水面上 | 浮动悬浮（Floating Levity） | M8-7 |
| 被吸过去 | 磁吸对齐（Magnetic Snap） | M1（拖拽吸附）、P5（对齐线） |
| 波浪一样传开 | 点击涟漪（Wave Ripple） | E4 |
| 撕开露出下面的 | 分层视差撕开（Parallax Split） | M7 + M3 |
| 折一下翻过去 | 翻页 / 折纸（Page Flip / Origami） | E5 |
| 两个对调一下 / 上下换个位置 | 两栏互换（Swap） | C14 |
| 拖中间那条线看前后对比 | 图片拖动对比（Before / After Slider） | C15 |
| 输错了晃一下 | 报错晃动（Error Shake） | F11 |
| 滑过去才算确认 | 滑动确认（Slide to Confirm） | G8 |
| 往下拉一下就刷新 | 下拉刷新（Pull to Refresh） | G9 |
| 按住数字左右拖就能调 | 数字拖动快调（Scrubbable Number） | G10 |
| 按住说话，滑走取消 | 按住录音（Hold to Record） | G11 |
| 点删除先在原地问一句 | 就地确认（Inline Confirm） | C16 |
| 把文件拖进来就上传 | 拖放上传区（Dropzone） | C17 |
| 用手指签名 | 签名板（Signature Pad） | C18 |
| 选了几个，底下冒出一条操作 | 批量操作条（Bulk Action Bar） | C19 |
| 绕着圈拖来调数值 | 环形拨盘（Circular Slider / Dial） | F12 |
| 点进输入框，标签跑到上面 | 浮动标签（Floating Label） | F13 |
| 点赞的时候炸开一下 | 点赞爆开（Like Burst） | F14 |
| 咚一下盖个章 / 盖上「已付」 | 盖章确认（Stamp Confirm） | F15 |
| 像手机闹钟那样上下滚着选 | 滚轮选择器（Wheel Picker） | G12 |
| 底部按钮上面那段内容渐渐糊掉 / 顶栏下面越往上越模糊 | 渐进模糊（Progressive Blur） | E6 |
| 点按钮变成一排验证码格子 | 按钮展开成验证码（OTP Input Morph） | C20 |
| 字像被挖空，透出下面的视频 / 镂空大字 | 挖空文字（Knockout Text） | E7 |

翻译完要复述一遍给用户确认：「你说的是不是这个——鼠标放上去那张抬起来，旁边两张往两边让？」确认了再动手。

## 实现规矩

- 纯 CSS 能做就不加库。要加库先查 `references/visual/pick-library.md`，并先问用户。
- 只动 `transform` 和 `opacity`，不动 `width` / `height` / `padding`（会掉帧）。
- **配色和间距不由本库决定**：项目有 `DESIGN.md` 就用它的 token；没有就先按 `references/visual/dashboard-layouts.md` 定排版方向，再按 `references/visual/new-page/index.md` 做静态视觉。不要只丢一段动效代码给用户，页面整体要能跑。
- 数值只用 `references/core/params.md` 参数词典里的。常见对应关系：`cubic-bezier(0.16, 1, 0.3, 1)` ≈ 我们的 `--ease-out`；`cubic-bezier(0.34, 1.56, 0.64, 1)`（带过冲）≈ 我们的 `spring-pop`。

---

### E1 悬停抬起 + 邻位让位

- **用在**：桌面端的一排卡片（作品集、套餐、推荐位）。
- **提示词**：做一排卡片，鼠标悬停时当前卡片抬起放大，左右相邻卡片各自往两边让开一点
- **参数**：当前卡 `translateY(-8px) scale(1.03)`；左右相邻各 `translateX(±4px)`（起始值）；200ms `--ease-out`；只动 transform。整段包在 `@media (hover: hover) and (pointer: fine)` 里。
- **打断**：鼠标快速划过时 transition 随时改目标，不要用 keyframes。
- **降级**：reduced-motion 时只变边框或阴影颜色，不动位置。
- **别用在**：触屏（没有悬停）；一天点几十次的列表行。
- **相关**：F10 标签挤开是点选版。

### E2 封面流

- **用在**：图片集、作品、专辑封面。一次看一张，但要看得到前后还有。
- **提示词**：做 Cover Flow 效果的卡片组，中间一张正对，两侧依次倾斜、变暗、往后退
- **参数**：中间 `rotateY(0)`、`brightness(1)`、`translateZ(0)`；往两侧第 n 张 `rotateY(±15°×n)`、`brightness(1 − 0.1n)`、`translateZ(−40px×n)`；容器 `perspective: 1000px`。切换时整排一起转 250ms `--ease-in-out`，不要每张单独做动画。
- **打断**：切换中再切，整排转向新目标。
- **降级**：变成普通横向列表 + `scroll-snap`。
- **别用在**：需要并排比较的内容（侧面看不清）；小屏。
- **相关**：G6 预判落点（手势翻页）、M4 中心聚焦（纵向版）。

### E3 3D 环形画廊

- **用在**：品牌页、相册首屏这类「展示」场合。
- **提示词**：用纯 CSS 3D 做环形画廊，照片围成一圈，可以拖着转，点某张它往前凸出
- **参数**：第 i 张 `rotateY(20°×i) translateZ(R)`，半径 `R = 张数 × 卡片宽 / 6.28`；容器 `transform-style: preserve-3d`、`perspective: 1000px`。拖拽时把横向位移累加到整个环的 `rotateY`，1:1 跟手；松手用 `spring-ui` 落到最近一张。点中那张 `translateZ(+50px)`，其余不动。不用 Three.js。
- **打断**：转动中按住立刻停在手指下（G5）。
- **降级**：横向列表。
- **别用在**：产品内的功能页；照片少于 6 张。

### E4 点击涟漪

- **用在**：按钮、列表项的点击反馈。
- **提示词**：点击位置生成一个圆，从小扩散到大并淡出
- **参数**：在点击点放一个圆，`scale(0)` → `scale(4)`、`opacity 0.6` → `0`，300ms `--ease-out`（常见写法是 600ms，超过 UI 300ms 的上限，缩短）。不阻塞点击；可以连点，每个涟漪各自独立，播完删掉节点。
- **降级**：reduced-motion 时只做颜色变化。
- **别用在**：已经有 G2 按下缩放的按钮上再叠一层；一天点上百次的操作（过不了频率关）。

### E5 翻页 / 折纸

- **用在**：电子书、相册、教程这种一页一页的内容。
- **提示词**：以一边为轴翻页，背面是下一页，跟着手势走，中途松手能翻回去
- **参数**：以边为轴 `rotateY` 从 0 到 −180°，容器 `perspective: 2000px`，背面 `backface-visibility: hidden`。进度跟手（同 M7）；松手按速度 > 0.11 px/ms 或是否过半决定翻过去还是翻回来；落位用 `spring-ui`。
- **打断**：全程跟手，随时可反向。
- **降级**：换页改成交叉淡入。
- **别用在**：需要快速跳页的长文档；数据页面。

### E6 渐进模糊

- **用在**：浮在滚动内容上面的东西：底部固定按钮、底部 Tab、顶栏。内容滚到它下面时，从清晰慢慢糊掉，浮着的那层更突出，下面的内容还看得出轮廓。
- **提示词**：在底部悬浮按钮和滚动列表之间加一层渐进模糊：从按钮上方 120px 开始，越靠近按钮越模糊，按钮本身保持清晰；用 4 层叠起来的 backdrop-filter，每层模糊翻倍，各自用 mask-image 渐变只露出一段；再垫一层从页面底色到透明的渐变；不挡点击
- **参数**：
  - 单独一层 `backdrop-filter: blur()` 是均匀的，只能整块一样糊。真正的渐进靠叠层：4 层绝对定位的 div 叠在同一块区域，模糊依次是 1 / 2 / 4 / 8px，每层用 `mask-image: linear-gradient(...)` 只露出一段，越靠边的段模糊越大，相邻两层的渐变互相重叠一段，接缝就看不出来。
  - 最底下垫一层底色渐变：从页面底色（用 token，例如 `var(--bg)`）到 `transparent`，最浓处不透明度 0.8–0.9。深色模式自动跟着 token 走，不要写死白色，不然深色页面上会出现一条灰带。
  - 区域高 80–160px（起始值），只盖浮着的那层加它上方一段；整块 `pointer-events: none`，`aria-hidden="true"`。
  - 滚动内容底部留出「模糊区高度 + 按钮高度」的空白（`padding-bottom` 或 `scroll-padding-bottom`），不然最后一项永远躲在模糊下面，点不到。
  - 内容滚到底、下面没东西了，模糊层淡出（列表末尾放一个哨兵元素，用 IntersectionObserver 判断），200ms `--ease-out`；往回滚再淡入。只动 `opacity`，不在滚动里改模糊半径（每帧改 `blur()` 很贵）。
- **打断**：只有淡入淡出，用 transition，随时可反向。
- **降级**：不支持 `backdrop-filter`（`@supports not (backdrop-filter: blur(1px))`）或低端 Android WebView（`references/core/platforms.md` 第 3 节）：只留底色渐变。用户开了降低透明度（`prefers-reduced-transparency: reduce`，支持的浏览器上）：底色渐变改成不透明底色。
- **别用在**：表单、输入框上方（要看清的内容不能糊）；内容短到不用滚的页面；L4 暗底明度分层的页面（L4 不用模糊，只用底色渐变）；一屏里超过 2 处（每层都是一次 backdrop 计算，叠多了掉帧）。
- **桌面 / 手机**：桌面 4 层。手机先试 3 层（2 / 4 / 8px），真机滚动掉帧就降到只留底色渐变。底部按钮要避开 `env(safe-area-inset-bottom)`，模糊区一起往上延伸到安全区。RN / Expo：`expo-blur` 的 `BlurView` 外面套 `@react-native-masked-view/masked-view` 加 `expo-linear-gradient` 做遮罩；Android 上模糊效果和性能都不稳，默认只用 `expo-linear-gradient` 的底色渐变，要上模糊先在真机测。
- **无障碍**：模糊层是装饰，读屏跳过；浮着的按钮和它下面糊掉的内容之间，文字对比度仍要 ≥ 4.5:1，这正是底色渐变那一层的作用。
- **相关**：玻璃卡片的模糊取值见 `references/visual/glassmorphism.md`；顶栏随滚动收起是 C12。

### E7 挖空文字

- **用在**：品牌页首屏、活动页、作品集封面、电子通行证和闪卡、海报。在项目里看到这几样就可以用：有现成的视频或亮色大图素材；页面是展示类（品牌、活动、作品集）；这一屏只有 1–2 个词的大字。它是一页的主角时刻，一页只用一处。
- **提示词**：做一张挖空文字卡片：底层铺一段视频（或图片），上面盖一层纯黑底、纯白大字的贴纸层，贴纸层用 mix-blend-mode: multiply，黑色盖住视频，白字的地方透出视频，看起来字被挖空；日期、姓名这些小字放在第三层，不参与混合；卡片加 isolation: isolate
- **参数**：
  - 从下到上三层：① 视频或图片层；② 贴纸层 `background: #000; color: #fff; mix-blend-mode: multiply`；③ 小字层（日期、姓名、条形码），普通白字，不混合。
  - 必须是纯 `#000` 和纯 `#fff`。黑色不纯（例如 `#111`），黑底里会透出一层视频的影子；白色不纯（例如 `#eee`），字里的视频会变暗。
  - 卡片加 `isolation: isolate`，让混合只跟卡片里的视频算。不加的话，视频还没加载出来时，字里透出的是页面底色。
  - 贴纸层和视频层是同一个父级下的兄弟。中间不要再包一层带 `opacity`、`transform`、`will-change` 或动画的 div：那样贴纸层会变成一整块黑；Safari 在这种嵌套下也不混合。
  - `<video>` 自己铺满：`position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover`。`object-fit` 写在外面包着的 div 上没用。卡片用 `aspect-ratio`（例如 `2 / 3`）撑出高度；子层全是绝对定位，不写的话卡片高度是 0。
  - 字用 900 字重，桌面 64–96px（起始值）。笔画越粗，透出来的面积越大。只放 1–2 个词，字多了看不出是挖空。
  - 素材要亮、颜色饱满。字里透出的画面太暗，就跟黑底分不开。素材本身偏暗：在视频层上面加一层 35% 白色蒙层（起始值），它是视频层上方的兄弟层，不要拿它包住贴纸层。
  - 想反过来做成白底：贴纸层改白底黑字，混合模式改 `screen`，适合偏暗的素材。卡片底想用品牌色：混合模式做不到，改用 `mask-image` 把文字形状挖在视频上，再放一份视觉上隐藏的文字给读屏。
- **视频怎么放**：`<video muted playsinline loop poster="…">`，一定要给一张亮的 `poster` 静帧，因为 iPhone 低电量模式会拦掉自动播放，加载失败时也只剩它。HTML 里不写 `autoplay`：用 JS 确认用户没开减少动态效果（`matchMedia('(prefers-reduced-motion: no-preference)')`）再调 `play()`，并接住 `play()` 的报错，被拦时就停在 poster 上。React 不会把 `muted` 写进 DOM，要在 ref 上设 `video.muted = true`。
- **打断**：超过 5 秒的循环视频必须能停（WCAG 2.2.2）。卡片角落放一个暂停按钮；或者只播一遍，5 秒内停在最后一帧。
- **降级**：用户开了减少动态效果就不播，只显示 poster，挖空效果照样在。卡片滚出屏幕时暂停（IntersectionObserver），滚回来再播。低端 Android WebView 上掉帧（`references/core/platforms.md` 第 3 节），换成图片底：效果一样，不用每帧重算混合。
- **别用在**：后台、dashboard、表单页；要读的长文字；同一屏第二处；用户一天打开很多次的页面（视频一直在转，过不了频率关）。
- **桌面 / 手机**：桌面卡片宽 360–420px（起始值），可以跟说明文字并排。手机卡片宽是屏宽减去两边各 16px，卡片里的视频换成小码率版本，或者直接用图片底。字号跟卡片宽走：卡片设 `container-type: inline-size`，字号用 `cqi` 单位（起始值：4 个字母约 `30cqi`），这样长一点的词也不会撑破卡片。RN / Expo：不用 `mixBlendMode`（要新架构；Android 上目前不稳定；盖在视频上也不保证生效）。改用 `@react-native-masked-view/masked-view`：外层一块黑底 View，里面的 MaskedView 拿文字当遮罩，遮罩里放 `expo-video` 的 `VideoView`。`expo-video` 没有自动播放属性，在 `useVideoPlayer` 里设 `loop`、`muted` 再 `play()`；poster 用一张 `expo-image` 盖在上面，`onFirstFrameRender` 之后隐藏。小字层放在 MaskedView 外面。
- **无障碍**：挖空的字是真文字，读屏读得到，也能选中复制。视频是装饰，加 `aria-hidden="true"`。字里透出的画面跟黑底至少要有 3:1 的对比，也就是透出来的画面不能暗过中灰（约 `#595959`）；做不到就加上面那层白色蒙层。
- **相关**：做成通行证、会员卡这类卡片时，卡片结构和字号层级看 `references/visual/cards.md`。
