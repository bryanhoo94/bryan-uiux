# Three.js 别凭记忆写（r186 速查）

<!-- 目录:开始（自动生成，别手改；改了标题就跑 python3 tools/toc.py） -->
**本文件目录**（全文 125 行；先看这里，再按行号只读用得上的那一节）

- 第 21–38 行：1. 单个 HTML 文件怎么引
- 第 40–59 行：2. 渲染器起手
- 第 61–82 行：3. 最常写错的
- 第 84–100 行：4. 模型（GLTF / GLB）
- 第 102–117 行：5. 手机、出错和收尾
- 第 119–125 行：6. 这几件事没查到官方说法
<!-- 目录:结束 -->

three.js 差不多每个月出一版，旧写法过大约 10 版就删掉。AI 凭记忆写，最常错的就是下面这些：写法过时、引入路径不对、构造函数的参数变了。**写任何 three.js 代码之前，先对一遍这份。**

- 2026-10-16 查的：当前版本 r186，npm 上是 `three@0.186.1`。动手前看一眼 https://github.com/mrdoob/three.js/releases 有没有新版；要升级就先读迁移指南 https://github.com/mrdoob/three.js/wiki/Migration-Guide 。下一版 r187 已经写了 3 处改动：PMREM 改用立方体渲染目标、删掉 `CubeUVReflectionMapping`、绑定了渲染目标时 `setViewport()` / `setScissor()` 不再乘像素比。
- three.js 官方专门给 AI 写了一份说明：https://threejs.org/docs/llms.txt 。它的示例没给像素比封顶，这一条按本文件第 2 节。
- 用 R3F 的项目：React 那一层看 `references/visual/isometric-scene.md` 第 12 节，底下的 three.js 照这份。R3F 默认已经设了 ACES 色调映射、sRGB 输出和 `dpr [1, 2]`；纯 three.js 的默认是不做色调映射，两边的默认值不一样。
- 用到这份的：`references/visual/isometric-scene.md`（数据 3D 场景）、`references/visual/glow-objects.md`（能玩的发光小物件）、`references/visual/new-page/references/3d-effects.md` 和 `hero-engines.md`（落地页的 3D）。

## 1. 单个 HTML 文件怎么引

```html
<script type="importmap">
{ "imports": {
  "three": "https://cdn.jsdelivr.net/npm/three@0.186.1/build/three.module.js",
  "three/addons/": "https://cdn.jsdelivr.net/npm/three@0.186.1/examples/jsm/"
}}
</script>
<script type="module">
  import * as THREE from 'three';
  import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
</script>
```

- 版本号写死，核心和插件用同一个版本。不写 `three@latest`，也不写不带版本的 `three`。
- import map 要写在用到它的 `type="module"` 脚本前面。`three/addons/` 这种以斜杠结尾的，左边和右边都要以 `/` 结尾（MDN）。
- npm 项目一样：`import * as THREE from 'three'`，插件从 `three/addons/...` 引。

## 2. 渲染器起手

```js
const renderer = new THREE.WebGLRenderer({ antialias: true });       // antialias 默认是 false
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));               // 手机封到 1.5（起始值）
renderer.setSize(width, height);
renderer.toneMapping = THREE.NeutralToneMapping;                     // 默认不做色调映射，要自己设
// 输出颜色空间默认就是 sRGB，不用写；更不要写已经删掉的 outputEncoding
```

**色调映射选哪个**

| 画的是什么 | 选哪个 |
|---|---|
| 商品、实物，颜色要准 | `NeutralToneMapping`（r162 起有）。Khronos 专门为商品颜色出的，Google 的 `<model-viewer>` 默认也用它 |
| 很亮的光、发光、要电影感（落地页首屏的粒子、光效） | `AgXToneMapping`（r160 起）或 `ACESFilmicToneMapping`。ACES 会让颜色跑偏，商品不用 |
| 线稿、纯色、不靠光照 | 不设 |

- **像素比不要直接用 `devicePixelRatio`**：手机上是 3，要多画 9 倍的像素。官方文档也说重的场景「强烈不建议」。iOS 上画布最大 4096×4096（MDN）。
- **新的 `WebGPURenderer` 先别用**，除非项目已经在用：官方还写着「实验状态」，而且不支持 `ShaderMaterial`、`onBeforeCompile`、`EffectComposer`。真要用：从 `three/webgpu` 引入，先 `await renderer.init()` 或者用 `setAnimationLoop`；TSL 从 `three/tsl` 引入。

## 3. 最常写错的

全部对照过 r186 的源码、发布说明和迁移指南。

| AI 常写的 | 现在的写法 | 从哪一版改的 |
|---|---|---|
| `<script src=".../three.min.js">`、`examples/js/...` | 第 1 节的 import map，插件走 `three/addons/` | `examples/js` 在 r148 删掉 |
| `renderer.outputEncoding = sRGBEncoding`、`texture.encoding` | 输出不用写（默认 sRGB）；自己用 `TextureLoader` 加载的颜色贴图写 `tex.colorSpace = THREE.SRGBColorSpace`（GLTFLoader 会自己设） | r152 改名，旧名 r162 删掉 |
| `physicallyCorrectLights = true`、`useLegacyLights` | 两个都删掉，现在只有一种光照。照旧教程抄来的光太暗：环境光、半球光、平行光的强度乘 π；点光源和聚光灯的单位是坎德拉，衰减 2，按 1 单位 = 1 米算 | `useLegacyLights` r155 弃用、r165 删掉 |
| `THREE.Geometry`、`Face3`、`BoxBufferGeometry` | `BufferGeometry`、`BoxGeometry`（所有 `*BufferGeometry` 别名都去掉 `Buffer`） | `Geometry` r125 移出核心；别名 r154 删掉 |
| `new THREE.Clock()` | `const timer = new THREE.Timer(); timer.connect(document);` 每帧先 `timer.update()` 再 `timer.getDelta()` | `Timer` r179 进核心；`Clock` r183 弃用 |
| `CapsuleGeometry(r, length, cap, radial)` | `CapsuleGeometry(radius, height, capSegments = 4, radialSegments = 8, heightSegments = 1)` | r176 |
| `RGBELoader` | `HDRLoader`（旧名还能用，会报警告） | r180 |
| `new RoomEnvironment(renderer)` | `scene.environment = new THREE.PMREMGenerator(renderer).fromScene(new RoomEnvironment()).texture` | 参数 r168 去掉；r183 起打出来的光看起来不一样 |
| `PCFSoftShadowMap` | `PCFShadowMap`（现在本身就是软阴影） | r182 弃用 |
| `WebGL1Renderer` | 删掉了，用 `WebGLRenderer` | r163 |
| 以为色调映射默认开着 | 默认是 `NoToneMapping`，按第 2 节自己设 | — |
| 用了后处理，还靠 `material.toneMapped = false` 让东西发光 | 用了后处理或渲染目标，这个开关就不起作用。发光部件用 `emissiveIntensity > 1`，`UnrealBloomPass` 阈值约 1，最后加 `OutputPass`；只让部分物体发光要用图层（官方示例 `webgl_postprocessing_unreal_bloom_selective`） | 色调映射只在画到屏幕时做，r155 起 |
| `WebGPURenderer` 从 `three` 引入、`renderAsync()` | 从 `three/webgpu` 引入，`await renderer.init()` | async 方法 r181 弃用；`PostProcessing` r183 改名 `RenderPipeline` |
| 正交相机用 `controls.minDistance` 限制缩放 | 正交相机用 `minZoom` / `maxZoom`；`minDistance` 只管透视相机 | — |
| 「方向键转模型」 | `OrbitControls` 的方向键是平移，按住 Ctrl / ⌘ / Shift 才是转；而且要先 `controls.listenToKeyEvents(元素)` | — |
| 只改一个部件的颜色，结果别的部件也变了 | 模型里同一个材质被多个部件共用，改之前先 `mesh.material = mesh.material.clone()` | — |

## 4. 模型（GLTF / GLB）

```js
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader, DRACO_GLTF_CONFIG } from 'three/addons/loaders/DRACOLoader.js';
import { KTX2Loader } from 'three/addons/loaders/KTX2Loader.js';
import { MeshoptDecoder } from 'three/addons/libs/meshopt_decoder.module.js';

const loader = new GLTFLoader()
  .setDRACOLoader(new DRACOLoader().setDecoderPath(DRACO_GLTF_CONFIG))   // 解码器从同一个 CDN 自己找
  .setKTX2Loader(new KTX2Loader().detectSupport(renderer))
  .setMeshoptDecoder(MeshoptDecoder);
```

- 模型压缩过却没配对应的解码器，会直接报错。不知道压没压，三个都配上。
- Draco 的解码器不要再指到 gstatic 的旧地址，`DRACO_GLTF_CONFIG` 是 r185 起官方示例的写法。`setDecoderConfig` 已经弃用，r194 删掉。KTX2 的 `detectSupportAsync` 已经弃用（r181），用 `detectSupport`。
- 从本地双击打开的页面（`file://`）不能去加载别的文件：模型要么转成 base64 写进页面，要么起一个本地服务器。

## 5. 手机、出错和收尾

| 事情 | 怎么写 |
|---|---|
| 画布接管触摸 | `OrbitControls` 会把画布设成 `touch-action: none`，手指放在画布上页面就滑不动。画布铺满整页时没问题。嵌在长页面里：建好 `OrbitControls` 之后把画布改成 `touch-action: pan-y pinch-zoom`，再设 `controls.enableZoom = false`，竖滑、滚轮、双指都留给页面，横拖转模型（`references/visual/glow-objects/assets/gallery-3d.html` 的 `?embed` 就是这么写的）；不行就手机上不让转 |
| 悬停效果 | 只在 `@media (hover: hover) and (pointer: fine)` 时做；手机上点一下才算选中 |
| 分清「拖」和「点」 | 按下到松开移动超过 10px 就是拖，不触发点击（方向判定同 `references/core/params.md` 的手势常量） |
| 没东西在动 | 不渲染，有变化才画一帧（官方手册「Rendering on demand」）。R3F 用 `frameloop="demand"` |
| 切到后台再回来 | 用 `Timer` 并调 `timer.connect(document)`，或者自己把每帧的时间差封顶，不然动画一下子跳很远 |
| WebGL 上下文丢了 | three.js 自己会处理丢失事件，页面要做的是停掉渲染循环，显示一句提示或一张静态图。测试用 `renderer.forceContextLoss()` |
| 开不了 WebGL | 不要留黑屏：显示提示和一张同角度的静态图 |
| 画布对读屏 | 画布里的东西读屏看不到（MDN）。所有操作都要有真的 HTML 按钮，画布写一句说明 |
| 减少动态 | 不自动转，镜头直接切到位；颜色、亮度变化保留 |
| 不用了 | `renderer.dispose()`，几何体、材质、贴图各自 `dispose()`；`PMREMGenerator` 用完就 `dispose()` |

**RN / Expo**：three.js 本身的写法跟上面一样。画布换成 `@react-three/fiber/native`（底层 `expo-gl`），细节见 `references/visual/isometric-scene.md` 第 12 节。要整页 HTML 直接放进 App，用 WebView，见 `references/visual/glow-objects.md` 第 8 节。

## 6. 这几件事没查到官方说法

照着做之前先在真机上试：

- 透视相机和正交相机之间平滑切换：官方没有现成写法。做法是让正交相机的视野高度等于透视相机在目标点那里看到的高度（`2 × 距离 × tan(视角 / 2)`），切换时把位置和朝向抄过去，再把 `controls.object` 换成新相机；画面大小对得上，所以看不出跳。glow-objects 的 3D 模板就是这么做的（按 `I` 键），2026-10-16 在 Chromium 里测过。
- 在 `OrbitControls` 连上之后把画布改回 `touch-action: pan-y pinch-zoom`：2026-10-16 在 Chromium 的手机模拟里测过，竖滑滚页面、横拖转模型都对；iOS Safari 和安卓真机还没试。
- 上下文恢复后，所有贴图和模型是不是都会自己重建：源码里只看到它重建了 WebGL 的状态。glow-objects 的 3D 模板（没有贴图）测过，恢复后接着画；带贴图、带模型的场景还没试。
