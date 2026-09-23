// 把 demo/index.html 里的例子录成 README 用的动图和截图。
// 需要：node、ffmpeg、playwright-core（任意一份，用 PW 环境变量指向它）。
//   PW=/path/to/node_modules/playwright-core CHROME=/path/to/chrome node demo/record.mjs
import { execFileSync } from 'node:child_process';
import { mkdirSync, rmSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const media = join(here, 'media');
const tmp = join(here, '.rec');
const page_url = 'file://' + join(here, 'index.html');

const pw = await import(process.env.PW || 'playwright-core');
const chromium = pw.chromium ?? pw.default?.chromium;
const W = 520, H = 300, FPS = 12;

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

// 每个例子怎么演示：真的移动鼠标、真的按下，不是假动画。
const clips = {
  g2: async (page) => {                       // 按住 → 滑出去 → 松手；再按一次正常付款
    const b = await (await page.locator('.btn')).boundingBox();
    const cx = b.x + b.width / 2, cy = b.y + b.height / 2;
    await page.mouse.move(cx, cy); await wait(400);
    await page.mouse.down(); await wait(500);
    for (let i = 1; i <= 16; i++) { await page.mouse.move(cx + i * 7, cy + i * 3); await wait(28); }
    await wait(500); await page.mouse.up(); await wait(1100);
    await page.mouse.move(cx, cy, { steps: 12 }); await wait(250);
    await page.mouse.down(); await wait(420); await page.mouse.up(); await wait(1200);
  },
  g3: async (page) => { await wait(700); await page.evaluate(() => __play('g3')); await wait(1500);
                        await page.evaluate(() => __play('g3')); await wait(1500); },
  c2: async (page) => { await wait(400); await page.evaluate(() => __play('c2')); await wait(3400); },
  f3: async (page) => { await wait(600); await page.evaluate(() => __play('f3')); await wait(1600);
                        await page.evaluate(() => __play('f3')); await wait(1400); },
  f8: async (page) => { await wait(600); await page.evaluate(() => __play('f8')); await wait(1500);
                        await page.evaluate(() => __play('f8')); await wait(1600); },
  m5: async (page) => { await wait(500); for (let i = 0; i < 3; i++) { await page.evaluate(() => __play('m5')); await wait(1000); } await wait(500); },
  g7: async (page) => {                       // 在手机框里往下拖，越拉越重，松手弹回
    const p = await (await page.locator('.phone')).boundingBox();
    const cx = p.x + p.width / 2, cy = p.y + 40;
    await page.mouse.move(cx, cy); await wait(400); await page.mouse.down();
    for (let i = 1; i <= 26; i++) { await page.mouse.move(cx, cy + i * 9); await wait(26); }
    await wait(600); await page.mouse.up(); await wait(1400);
  },
  d1: async (page) => { await wait(1600); await page.evaluate(() => __play('d1')); await wait(1600); },
};
const shots = ['l1', 'l4'];                   // 排版方向用静态截图

rmSync(tmp, { recursive: true, force: true });
mkdirSync(media, { recursive: true });
mkdirSync(tmp, { recursive: true });

const browser = await chromium.launch({ executablePath: process.env.CHROME, args: ['--force-device-scale-factor=2'] });

for (const [id, run] of Object.entries(clips)) {
  const ctx = await browser.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 2,
                                         recordVideo: { dir: join(tmp, id), size: { width: W, height: H } } });
  const page = await ctx.newPage();
  await page.goto(`${page_url}?solo=${id}`);
  await wait(500);
  await run(page);
  await wait(300);
  await ctx.close();
  const webm = join(tmp, id, readdirSync(join(tmp, id))[0]);
  const gif = join(media, `${id}.gif`);
  execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', webm,
    '-vf', `fps=${FPS},scale=${W}:-1:flags=lanczos,split[s0][s1];[s0]palettegen=max_colors=96[p];[s1][p]paletteuse=dither=bayer:bayer_scale=3`,
    '-loop', '0', gif]);
  console.log('gif', id);
}

for (const id of shots) {
  const ctx = await browser.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  await page.goto(`${page_url}?solo=${id}`);
  await wait(600);
  await page.screenshot({ path: join(media, `${id}.png`) });
  await ctx.close();
  console.log('png', id);
}

await browser.close();
rmSync(tmp, { recursive: true, force: true });
console.log('done →', media);
