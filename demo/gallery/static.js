/* 静态小图：排版方向、配色、骨架、外框、品牌页、版式、手机页、卡片、导航。全部用 CSS 画，颜色写死在小图里，深浅主题下看起来一样 */
(() => {
GL.css(`
.t{ position:absolute; inset:14px; display:flex; align-items:center; justify-content:center; }
.scr{ width:100%; height:100%; max-width:300px; border-radius:8px; overflow:hidden; position:relative; background:#FFFFFF; box-shadow:0 1px 2px rgba(15,23,42,.08), 0 8px 20px -10px rgba(15,23,42,.28); }
.ph{ height:100%; aspect-ratio:9 / 18; border-radius:16px; overflow:hidden; position:relative; background:#FFFFFF; box-shadow:0 1px 2px rgba(15,23,42,.08), 0 8px 20px -10px rgba(15,23,42,.28); }
.k{ display:block; background:#E8ECF2; border-radius:4px; min-width:0; }
.ln{ display:block; height:4px; border-radius:2px; background:#D3DAE4; flex:none; }
.t svg.ic{ width:12px; height:12px; }
.tz{ align-items:flex-end; overflow:hidden; }
.tz .ph{ height:226px; flex:none; zoom:1.55; }
.tc{ font-family:var(--sans); color:#0F172A; }
.cd{ width:206px; border-radius:18px; padding:13px; display:grid; gap:9px; background:#FAFAFA; box-shadow:0 4px 24px rgba(0,0,0,.08); font:11px/1.4 var(--sans); color:#1D1D1F; }
.cd small{ font-size:9.5px; color:#6E6E73; }
.pl{ display:inline-flex; align-items:center; justify-content:center; height:22px; padding:0 11px; border-radius:999px; font-size:10px; font-weight:600; }
`);
const C = { ink:'#0F172A', mut:'#94A3B8', blk:'#E8ECF2', lin:'#D3DAE4', bg:'#F4F6FA', acc:'#FF5A3C', accs:'#FFE4DD', w:'#FFFFFF' };
const k = (s = '') => `<i class="k" style="${s}"></i>`;
const ln = (w = 60, s = '') => `<i class="ln" style="width:${w}%;${s}"></i>`;
const dv = (s, inner = '') => `<div style="${s}">${inner}</div>`;
const scr = (s, inner) => `<div class="t"><div class="scr" style="${s}">${inner}</div></div>`;
const ph = (s, inner) => `<div class="t"><div class="ph" style="${s}">${inner}</div></div>`;
const col = (gap, inner, s = '') => dv(`display:flex;flex-direction:column;gap:${gap}px;min-width:0;${s}`, inner);
const row = (gap, inner, s = '') => dv(`display:flex;gap:${gap}px;align-items:center;min-width:0;${s}`, inner);
const bars = (hs, c, s = '', each = () => '') => dv(`display:flex;align-items:flex-end;gap:3px;${s}`, hs.map((h, i) => `<i style="flex:1;height:${h}%;background:${c};border-radius:2px 2px 0 0;${each(i)}"></i>`).join(''));
const ic = (n, s = '') => `<svg class="ic" style="${s}" aria-hidden="true"><use href="#i-${n}"/></svg>`;
const av = (c, s = '') => `<i style="display:block;flex:none;width:16px;height:16px;border-radius:999px;background:${c};${s}"></i>`;
const img = (g, s = '') => `<i style="display:block;background:linear-gradient(150deg, ${g});${s}"></i>`;
const G = ['#F4A261, #E76F51', '#2A9D8F, #264653', '#8AB17D, #2A9D8F', '#6D83F2, #3F4FB8', '#E9C46A, #D9643A', '#C77DFF, #6D4BC0'];
const lines = (n, w = [80, 60, 70], s = '') => Array.from({ length:n }, (_, i) => ln(w[i % w.length], s)).join('');
const area = (c, fill) => `<svg viewBox="0 0 100 40" preserveAspectRatio="none" style="display:block;width:100%;height:100%"><path d="M0 32 L12 26 L24 29 L36 18 L48 21 L60 12 L72 15 L84 7 L100 10 L100 40 L0 40Z" fill="${fill}"/><path d="M0 32 L12 26 L24 29 L36 18 L48 21 L60 12 L72 15 L84 7 L100 10" fill="none" stroke="${c}" stroke-width="1.6" vector-effect="non-scaling-stroke"/></svg>`;
const side = (bg, lc, n = 6, act = 1, ac = C.acc, s = '') => col(7, row(5, av(ac, 'width:10px;height:10px;border-radius:3px') + ln(50, `background:${lc}`)) + Array.from({ length:n }, (_, i) => i === act ? dv(`height:12px;border-radius:4px;background:${ac === C.acc ? C.accs : ac};display:flex;align-items:center;padding:0 5px`, ln(60, `background:${ac === C.acc ? C.acc : '#fff'};height:3px`)) : ln([70, 55, 64][i % 3], `background:${lc};margin:4px 5px`)).join(''), `background:${bg};padding:9px 7px;${s}`);
const top = (s = '') => row(6, ln(22, `background:${C.ink};height:5px`) + dv('flex:1') + k('width:34px;height:10px;border-radius:5px') + av('#CBD5E1', 'width:10px;height:10px'), `height:22px;padding:0 9px;border-bottom:1px solid #EEF1F5;${s}`);
const tile = (s = '', big = 50) => col(5, ln(40, 'height:3px') + ln(big, `height:7px;background:${C.ink}`), `background:#fff;border-radius:6px;padding:7px;box-shadow:0 0 0 1px #EEF1F5;${s}`);

const items = {};
/* ---------- 排版方向 L1–L5 ---------- */
items.L = [
  { code:'L1', name:'方格纸 + 玻璃卡', use:'指标多、要分主次的品牌感后台或演示：靠材质分层，不画边框', html:scr(`background:linear-gradient(#E1E6EF 1px, transparent 1px) 0 0 / 14px 14px, linear-gradient(90deg, #E1E6EF 1px, transparent 1px) 0 0 / 14px 14px, #F2F4F8;padding:10px;display:grid;grid-template-columns:repeat(3, 1fr);grid-template-rows:46px 1fr 34px;gap:8px`,
    [[45, '#334155'], [72, 'repeating-linear-gradient(135deg, #FF5A3C 0 3px, #FFB8A8 3px 6px)'], [100, 'linear-gradient(160deg, #FF5A3C, #FF9F6B)']].map(([h, b]) => dv(`align-self:end;height:${h}%;border-radius:7px;background:${b}`)).join('')
    + dv('grid-column:1 / 3;background:rgba(255,255,255,.62);backdrop-filter:blur(3px);border-radius:8px;padding:8px;display:flex;flex-direction:column;gap:6px', ln(30) + dv('flex:1', area('#334155', 'rgba(51,65,85,.08)')))
    + dv('background:rgba(255,255,255,.62);backdrop-filter:blur(3px);border-radius:8px;padding:8px', col(5, ln(50) + ln(70, `height:7px;background:${C.ink}`)))
    + dv('grid-column:1 / -1;background:rgba(255,255,255,.62);backdrop-filter:blur(3px);border-radius:8px;padding:8px', col(6, lines(3)))) },
  { code:'L2', name:'分组侧边栏', use:'功能多的 SaaS 后台：导航入口超过 8 个，靠组和组之间的空白分清', html:scr('display:grid;grid-template-columns:30% 1fr',
    col(13, [0, 1, 2].map((g) => col(5, ln(32, 'height:3px;background:#94A3B8') + lines(3, [70, 55, 64], 'margin-left:3px'))).join('') + dv('flex:1') + row(5, av('#CBD5E1', 'width:12px;height:12px') + dv('flex:1;height:4px;border-radius:2px;background:#E2E8F0', dv('width:62%;height:100%;border-radius:2px;background:#64748B'))), 'background:#F7F8FA;padding:11px 9px')
    + col(8, ln(58, `height:10px;background:${C.ink}`) + ln(36, 'height:4px') + dv('display:grid;grid-template-columns:1fr 1fr;gap:7px;flex:1', tile() + tile('', 40) + dv('grid-column:1 / -1;background:#fff;border-radius:6px;box-shadow:0 0 0 1px #EEF1F5;padding:7px', col(6, lines(3)))), 'padding:12px 10px')) },
  { code:'L3', name:'一深一强调', use:'有一个北极星指标：全页只有侧栏是深色，强调色只出现在选中项、主按钮、图表命中值', html:scr('display:grid;grid-template-columns:28% 1fr;background:#F3F4F6',
    col(7, row(5, av(C.acc, 'width:10px;height:10px;border-radius:3px') + ln(50, 'background:#475569')) + [0, 1, 2, 3, 4].map((i) => i === 1 ? dv(`height:12px;border-radius:4px;background:rgba(255,90,60,.18);display:flex;align-items:center;padding:0 5px`, ln(60, `background:${C.acc};height:3px`)) : ln([70, 55, 64][i % 3], 'background:#334155;margin:4px 5px')).join('') + dv('flex:1') + dv(`height:30px;border-radius:7px;background:${C.acc}`), 'background:#111827;padding:10px 8px')
    + col(8, row(6, ln(40, `height:7px;background:${C.ink}`) + dv('flex:1') + dv(`width:38px;height:13px;border-radius:5px;background:${C.acc}`)) + dv('display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px', tile('', 60) + tile('', 45) + tile('', 55)) + dv('flex:1;background:#fff;border-radius:6px;padding:8px;display:flex', bars([40, 62, 48, 70, 55, 92, 60], '#CBD5E1', 'flex:1', (i) => i === 5 ? `background:${C.acc}` : '')), 'padding:10px')) },
  { code:'L4', name:'暗底明度分层', use:'实时刷新、要盯一整天或上墙：卡片比底亮一档就是一层，不描边、不加阴影', html:scr('background:#0B0D12;padding:10px;display:grid;grid-template-columns:2fr 1fr;grid-template-rows:auto 1fr;gap:8px',
    dv('background:#151922;border-radius:8px;padding:9px', col(6, ln(36, 'background:#3A4252') + row(4, `<b style="font:700 22px/1 var(--sans);color:#E6E9EF;font-variant-numeric:tabular-nums">124</b><span style="font-size:8px;color:#7A8394;align-self:flex-end">台在线</span>`)))
    + dv('background:#151922;border-radius:8px;padding:9px', col(6, ln(50, 'background:#3A4252') + `<b style="font:700 22px/1 var(--sans);color:#E6E9EF">3</b>`))
    + dv('grid-column:1 / -1;background:#151922;border-radius:8px;padding:9px;display:grid;grid-template-columns:repeat(14, 1fr);gap:5px;align-content:center', Array.from({ length:42 }, (_, i) => `<i style="aspect-ratio:1;border-radius:999px;background:${[3, 17, 30].includes(i) ? C.acc : '#202633'}"></i>`).join(''))) },
  { code:'L5', name:'等距 3D 场景', use:'数据有位置、楼层、连接关系，要让客户一眼看懂现场；先过「该不该上 3D」那道关', html:(() => {
    const s = 9, P = (x, y, z) => [100 + (x - y) * s * 0.866, 70 + (x + y) * s * 0.5 - z * s];
    const box = (x, y, w, d, h, c) => { const pts = (a) => a.map((p) => P(...p).map((v) => v.toFixed(1)).join(',')).join(' ');
      return `<polygon points="${pts([[x, y, h], [x + w, y, h], [x + w, y + d, h], [x, y + d, h]])}" fill="${c[0]}"/><polygon points="${pts([[x, y + d, 0], [x + w, y + d, 0], [x + w, y + d, h], [x, y + d, h]])}" fill="${c[1]}"/><polygon points="${pts([[x + w, y, 0], [x + w, y + d, 0], [x + w, y + d, h], [x + w, y, h]])}" fill="${c[2]}"/>`; };
    const wm = ['#DCE3EC', '#B8C3D1', '#A3B0C2'], ac = ['#FF8A6E', '#E04A2C', '#C93C20'];
    const svg = `<svg viewBox="0 0 200 150" style="position:absolute;inset:0;width:100%;height:100%">${box(-6, -6, 12, 12, 0.3, ['#1C2433', '#151B26', '#121722'])}${box(-4, -4, 3, 2, 2, wm)}${box(0, -4, 3, 2, 1.4, wm)}${box(-4, 0, 3, 3, 1, wm)}${box(1, 0, 2, 2, 3, ac)}${box(-4, 4, 2, 2, 1.6, wm)}${box(3, 3, 2, 2, 1.2, wm)}</svg>`;
    return scr('background:radial-gradient(circle at 50% 60%, #1A2232, #0B0F17)', svg + dv('position:absolute;left:8px;top:8px;width:30%;background:rgba(21,25,34,.92);border-radius:7px;padding:7px', col(5, ln(60, 'background:#3A4252') + ln(80, 'background:#2A3140') + ln(70, 'background:#2A3140') + ln(75, `background:${C.acc}`)))
      + dv('position:absolute;right:8px;bottom:8px;width:34%;background:rgba(21,25,34,.92);border-radius:7px;padding:7px', col(5, ln(50, 'background:#3A4252') + `<b style="font:700 14px/1 var(--sans);color:#E6E9EF">3 号线</b>` + ln(70, 'background:#2A3140'))));
  })() },
];

/* ---------- 后台配色 palette1–12 ---------- */
const PAL = [
  ['Sage Ledger', '财务、税务、采购、B2B 后台', '#eef0ec', '#ffffff', '#14201a', '#6d7d74', '#2F6B4F', '#C08A3E'],
  ['Amber Ops', '商家后台、电商后台', '#f4f0e9', '#ffffff', '#1f1710', '#82715f', '#D9642A', '#2E6B63'],
  ['Rose Clay', '美妆、时尚、生活方式、创作者平台', '#f5eeee', '#ffffff', '#231519', '#87696f', '#B4485E', '#C1913C'],
  ['Teal & Clay', 'CRM、项目管理、SaaS 中台', '#e9eeed', '#ffffff', '#0f2322', '#6b7d7c', '#176C6B', '#C4633F'],
  ['Violet Console', 'AI、机器学习、自动化平台', '#eeecf7', '#ffffff', '#171334', '#6f6890', '#5B4BD1', '#D98A3C'],
  ['Mint & Lavender', '健康、教育、HR', '#e9f0ec', '#ffffff', '#132420', '#6c7f78', '#2E9E7B', '#8E86D8'],
  ['Brick & Olive', '餐饮、零售收银、酒店', '#f3efe6', '#ffffff', '#1e1712', '#7f7263', '#9C4A38', '#5C5A3A'],
  ['Indigo & Coral', '内容、活动、广告后台', '#edeff8', '#ffffff', '#141830', '#6b7391', '#4A46C9', '#FF6B5A'],
  ['Cobalt Trust', '品牌或母平台规定必须用蓝的时候', '#edf0f6', '#ffffff', '#121a2b', '#69768c', '#2D5BD8', '#E08A2E'],
  ['Graphite & Lime', '开发工具、CI/CD、日志（深色）', '#0b0c0b', '#141613', '#eef1e9', '#8a9184', '#B6E018', '#5FD3B2'],
  ['Midnight & Amber', '资金、交易、财务（深色）', '#08090f', '#12141c', '#eceef5', '#848aa0', '#E8A33D', '#7B8CFF'],
  ['Steel Cyan', '监控、物联网、车队调度（深色）', '#080b0c', '#111618', '#e8f0f1', '#828f93', '#2FD3C5', '#F0A868'],
];
items.palette = PAL.map(([n, use, page, bg, ink, ink3, a, a2], i) => ({ code:'palette' + (i + 1), name:n, use:`${use}。强调色 ${a}，第二色 ${a2}`,
  html:scr(`background:${page};padding:9px;display:grid;grid-template-columns:24% 1fr;gap:8px`,
    col(7, row(4, av(a, 'width:9px;height:9px;border-radius:3px') + ln(50, `background:${ink3}`)) + [0, 1, 2, 3].map((j) => j === 0 ? dv(`height:11px;border-radius:4px;background:${a}22;display:flex;align-items:center;padding:0 4px`, ln(60, `background:${a};height:3px`)) : ln([70, 55, 64][j % 3], `background:${ink3};opacity:.5;margin:3px 4px`)).join(''), `background:${bg};border-radius:7px;padding:8px 6px`)
    + col(7, dv(`background:${bg};border-radius:7px;padding:8px;display:grid;gap:5px`, ln(34, `background:${ink3};height:3px`) + row(5, `<b style="font:700 16px/1 var(--sans);color:${ink};font-variant-numeric:tabular-nums">48.2k</b>` + `<i style="width:6px;height:6px;border-radius:9px;background:${a2}"></i>`))
      + dv(`flex:1;background:${bg};border-radius:7px;padding:8px;display:flex`, bars([35, 55, 42, 70, 50, 88, 62], a, 'flex:1', (j) => j === 5 ? '' : 'opacity:.35'))
      + row(4, [page, bg, ink, a, a2].map((c) => `<i style="width:13px;height:13px;border-radius:999px;background:${c};box-shadow:0 0 0 1px rgba(127,127,127,.25)"></i>`).join(''))) ) }));

/* ---------- Dashboard 骨架 K1–K6 ---------- */
const frame = (inner, s = '') => scr('display:grid;grid-template-rows:22px 1fr', top() + dv(`padding:8px;display:grid;gap:7px;min-height:0;background:${C.bg};${s}`, inner));
items.K = [
  { code:'K1', name:'主次布局', use:'有一个最重要的数，其他数都在解释它', html:frame(
    dv('grid-row:1 / 3;background:#fff;border-radius:7px;padding:9px;display:flex;flex-direction:column;gap:6px;box-shadow:0 0 0 1.5px #FFB8A8', ln(30) + `<b style="font:700 20px/1 var(--sans);color:${C.ink};font-variant-numeric:tabular-nums">RM 48.2k</b>` + dv('flex:1', area(C.acc, 'rgba(255,90,60,.12)'))) + tile() + tile('', 40) + tile('', 60) + tile('', 45),
    'grid-template-columns:2fr 1fr 1fr;grid-template-rows:1fr 1fr') },
  { code:'K2', name:'横带分层', use:'汇总、趋势、明细从上往下读；都对不上时用它', html:frame(
    dv('display:grid;grid-template-columns:repeat(4, 1fr);gap:6px', tile() + tile('', 40) + tile('', 60) + tile('', 45)) + dv('background:#fff;border-radius:7px;padding:8px', area('#334155', 'rgba(51,65,85,.08)')) + dv('background:#fff;border-radius:7px;padding:8px;display:grid;gap:6px', lines(3, [90, 85, 88])),
    'grid-template-rows:auto 1fr auto') },
  { code:'K3', name:'主区 + 粘性窄栏', use:'一边翻数据，一边盯着日程、通知、待办', html:frame(
    col(7, dv('display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px', tile() + tile('', 40) + tile('', 55)) + dv('flex:1;background:#fff;border-radius:7px;padding:8px', area('#334155', 'rgba(51,65,85,.08)')) + dv('background:#fff;border-radius:7px;padding:8px;display:grid;gap:6px', lines(2, [90, 80])))
    + col(6, ln(50, `height:5px;background:${C.ink}`) + [0, 1, 2, 3].map((i) => row(5, av(i === 0 ? C.acc : '#CBD5E1', 'width:8px;height:8px') + col(3, ln(80) + ln(50, 'height:3px'), 'flex:1'), 'background:#fff;border-radius:6px;padding:6px')).join(''), 'border-left:1px solid #E5E9F0;padding-left:7px'),
    'grid-template-columns:1fr 32%') },
  { code:'K4', name:'画布铺满 + 浮动面板', use:'东西在哪：地图、楼层、3D 场景铺满，面板浮在上面', html:scr('background:linear-gradient(90deg, transparent 47%, #FFFFFF 47% 50%, transparent 50%), linear-gradient(0deg, transparent 58%, #FFFFFF 58% 61%, transparent 61%), linear-gradient(35deg, transparent 30%, #FFFFFF 30% 32.5%, transparent 32.5%), #E4EAF1',
    [[30, 34], [62, 48], [72, 22], [40, 70]].map(([x, y], i) => `<i style="position:absolute;left:${x}%;top:${y}%;width:9px;height:9px;border-radius:999px;background:${i === 1 ? C.acc : '#64748B'};box-shadow:0 0 0 3px ${i === 1 ? 'rgba(255,90,60,.25)' : 'rgba(100,116,139,.2)'}"></i>`).join('')
    + dv('position:absolute;left:8px;top:8px;bottom:8px;width:30%;background:rgba(255,255,255,.95);border-radius:8px;padding:7px;box-shadow:0 6px 16px -8px rgba(15,23,42,.35)', col(6, ln(50, `height:5px;background:${C.ink}`) + lines(5, [80, 70, 75])))
    + dv('position:absolute;right:8px;top:8px;width:34%;background:rgba(255,255,255,.95);border-radius:8px;padding:7px;box-shadow:0 6px 16px -8px rgba(15,23,42,.35)', col(5, ln(40) + `<b style="font:700 13px/1 var(--sans);color:${C.ink}">2 号仓</b>` + ln(70))) ) },
  { code:'K5', name:'看板分列', use:'每件事卡在哪一步：状态有先后顺序（待处理 → 进行中 → 完成）', html:frame(
    [3, 2, 4, 1].map((n, c) => col(5, row(4, ln(50, `height:4px;background:${C.ink}`) + dv('margin-left:auto;font-size:8px;color:#64748B', String(n))) + Array.from({ length:n }, (_, i) => dv(`background:#fff;border-radius:5px;padding:5px;box-shadow:0 0 0 ${c === 1 && i === 0 ? '1.5px #FF5A3C' : '1px #EEF1F5'}`, col(4, ln(80) + ln(50, 'height:3px')))).join(''), 'background:#EDF0F5;border-radius:6px;padding:5px')).join(''),
    'grid-template-columns:repeat(4, 1fr);align-items:start') },
  { code:'K6', name:'时间轴泳道', use:'谁什么时候忙、哪里撞了：排班、会议室、设备占用', html:frame(
    dv('display:grid;grid-template-columns:20% 1fr;gap:4px 6px;align-content:start', dv('') + row(0, ['9', '11', '13', '15', '17'].map((h) => `<span style="flex:1;font-size:8px;color:#94A3B8;font-variant-numeric:tabular-nums">${h}:00</span>`).join(''))
      + [[[0, 30], [45, 25]], [[20, 40]], [[10, 20], [55, 35]], [[35, 30]]].map((bs, r) => ln(70, 'align-self:center') + dv('position:relative;height:16px;background:repeating-linear-gradient(90deg, #E8ECF2 0 1px, transparent 1px 20%);border-radius:3px', bs.map(([x, w], j) => `<i style="position:absolute;left:${x}%;width:${w}%;top:3px;bottom:3px;border-radius:3px;background:${r === 2 && j === 1 ? C.acc : '#64748B'};opacity:${r === 2 && j === 1 ? 1 : 0.55}"></i>`).join('') + (r === 2 ? `<i style="position:absolute;left:55%;width:10%;top:-2px;bottom:-2px;border:1.5px dashed ${C.acc};border-radius:4px"></i>` : ''))).join('')),
    '') },
];

/* ---------- 后台外框 shell1–7 ---------- */
items.shell = [
  { code:'shell1', name:'标准侧栏 + 顶栏', use:'大多数后台的外框：左侧栏、上顶栏、中间内容，用户不用重新学', html:scr('display:grid;grid-template-columns:26% 1fr', side('#FFFFFF', C.lin, 6, 1, C.acc, 'border-right:1px solid #EEF1F5') + dv('display:grid;grid-template-rows:22px 1fr;min-width:0', top() + dv(`background:${C.bg};padding:8px;display:grid;grid-template-columns:repeat(3, 1fr);grid-template-rows:auto 1fr;gap:6px`, tile() + tile('', 40) + tile('', 55) + dv('grid-column:1 / -1;background:#fff;border-radius:7px;padding:8px', area('#334155', 'rgba(51,65,85,.08)'))))) },
  { code:'shell2', name:'框起来的 App 卡', use:'整个后台装在一张大圆角卡里，放在有颜色的底上，像一个独立的 App', html:scr('background:#DDE5EF;padding:12px', dv('height:100%;background:#fff;border-radius:14px;box-shadow:0 20px 40px -24px rgba(15,23,42,.45);display:grid;grid-template-columns:24% 1fr;overflow:hidden', side('#F7F8FA', C.lin, 5, 2) + dv('padding:9px;display:grid;grid-template-rows:auto auto 1fr;gap:6px', ln(40, `height:6px;background:${C.ink}`) + dv('display:grid;grid-template-columns:1fr 1fr;gap:6px', tile() + tile('', 40)) + dv('background:#F4F6FA;border-radius:7px;padding:7px', area('#334155', 'rgba(51,65,85,.08)'))))) },
  { code:'shell3', name:'Bento 控制台', use:'很多大小不一的小数据：一行里宽度按重要性分（2.15 : 1.7 : 1 : 1 : 1）', html:scr(`background:${C.bg};display:grid;grid-template-rows:22px 1fr`, top() + dv('padding:8px;display:grid;grid-template-columns:2.15fr 1.7fr 1fr 1fr 1fr;grid-template-rows:1fr 1fr;gap:6px',
    dv('grid-row:1 / 3;border-radius:8px;padding:8px;background:linear-gradient(160deg, #1E293B, #0F172A)', col(6, ln(50, 'background:#475569') + ln(80, 'background:#94A3B8;height:6px') + ln(40, `background:${C.acc}`)))
    + dv('grid-row:1 / 3;background:#fff;border-radius:8px;padding:8px', col(9, [0, 1, 2].map(() => col(3, ln(40, 'height:3px') + ln(60, `height:6px;background:${C.ink}`))).join('')))
    + [0, 1, 2].map(() => tile('padding:5px', 70)).join('') + dv('grid-column:3 / 6;background:#fff;border-radius:8px;padding:6px', area('#334155', 'rgba(51,65,85,.08)')))) },
  { code:'shell4', name:'顶部胶囊导航', use:'一级入口不超过 5 个：不要侧栏，导航是一条胶囊；手机上变成底部 Tab', html:scr(`background:${C.bg};padding:9px;display:grid;grid-template-rows:auto 1fr;gap:9px`, row(4, av(C.acc, 'width:10px;height:10px;border-radius:3px') + dv('margin:0 auto;display:flex;gap:2px;background:#fff;border-radius:999px;padding:3px;box-shadow:0 0 0 1px #E5E9F0', [1, 0, 0, 0].map((a) => dv(`width:30px;height:11px;border-radius:999px;background:${a ? C.ink : 'transparent'};display:flex;align-items:center;justify-content:center`, ln(50, `background:${a ? '#fff' : C.lin};height:3px`))).join('')) + av('#CBD5E1', 'width:10px;height:10px'))
    + dv('display:grid;grid-template-columns:repeat(3, 1fr);grid-template-rows:auto 1fr;gap:6px', tile() + tile('', 40) + tile('', 55) + dv('grid-column:1 / -1;background:#fff;border-radius:7px;padding:8px', area('#334155', 'rgba(51,65,85,.08)')))) },
  { code:'shell5', name:'居中 Bento / 三栏', use:'顶部导航 + 三栏各自高度（296 : 1fr : 320），像瀑布流', html:scr(`background:${C.bg};display:grid;grid-template-rows:22px 1fr`, top() + dv('padding:8px;display:grid;grid-template-columns:27% 1fr 29%;gap:6px;align-items:start',
    col(6, tile('', 50) + dv('background:#fff;border-radius:7px;padding:7px;height:60px', area('#334155', 'rgba(51,65,85,.08)'))) + col(6, dv('background:#fff;border-radius:7px;height:86px;padding:7px', col(5, ln(40) + dv('height:56px;border-radius:5px;background:#EEF2F7'))) + tile('', 70)) + col(6, tile('', 40) + tile('', 60) + tile('', 50)))) },
  { code:'shell6', name:'工作流外壳', use:'要一步步填完的页（发布、建店、设置）：中间表单，右边实时预览，底部提交条', html:scr('display:grid;grid-template-columns:20% 1fr', side('#F7F8FA', C.lin, 5, 3) + dv(`display:grid;grid-template-rows:22px 1fr 24px;min-width:0;background:${C.bg}`,
    row(4, [1, 1, 0, 0].map((d, i) => av(d ? C.ink : '#CBD5E1', 'width:7px;height:7px') + (i < 3 ? `<i style="width:14px;height:1.5px;background:${d && i < 1 ? C.ink : '#CBD5E1'}"></i>` : '')).join(''), 'padding:0 9px;border-bottom:1px solid #EEF1F5;background:#fff')
    + dv('display:grid;grid-template-columns:1fr 34%;gap:6px;padding:7px;min-height:0', col(6, [1, 2].map((n) => dv('background:#fff;border-radius:7px;padding:7px', row(5, `<i style="width:11px;height:11px;border-radius:999px;background:${C.ink};color:#fff;font:600 7px/11px var(--sans);text-align:center;font-style:normal">${n}</i>` + ln(40, `height:4px;background:${C.ink}`)) + dv('margin-top:6px;display:grid;gap:5px', k('height:10px;background:#F1F4F8;box-shadow:inset 0 0 0 1px #E2E8F0') + k('height:10px;background:#F1F4F8;box-shadow:inset 0 0 0 1px #E2E8F0')))).join('')) + dv('background:#fff;border-radius:7px;padding:7px', col(5, ln(50, 'height:3px') + dv('height:40px;border-radius:5px;background:linear-gradient(150deg, #F4A261, #E76F51)') + ln(70))))
    + row(6, ln(30, 'background:#94A3B8') + dv('flex:1') + dv(`width:44px;height:14px;border-radius:5px;background:${C.ink}`), 'padding:0 8px;background:#fff;border-top:1px solid #EEF1F5'))) },
  { code:'shell7', name:'AI 控制台外壳', use:'交给 AI 做事的页：左边队列和历史，中间运行过程，右边产物和审批；主按钮是「停止」', html:scr(`display:grid;grid-template-columns:24% 1fr 28%;background:${C.bg}`,
    col(6, ln(50, `height:5px;background:${C.ink}`) + [1, 0, 0, 0].map((a) => row(4, av(a ? C.acc : '#CBD5E1', 'width:7px;height:7px') + ln(70), `padding:5px;border-radius:5px;background:${a ? '#fff' : 'transparent'}`)).join(''), 'padding:9px 7px;border-right:1px solid #E5E9F0')
    + col(6, row(4, ln(40, `height:5px;background:${C.ink}`) + dv('flex:1') + dv('height:13px;padding:0 6px;border-radius:999px;box-shadow:0 0 0 1px #FF5A3C;display:flex;align-items:center', ln(100, `width:14px;background:${C.acc};height:3px`))) + dv('background:#fff;border-radius:7px;padding:6px', col(4, lines(2, [90, 70]))) + [1, 1, 0].map((d) => row(4, `<i style="width:9px;height:9px;border-radius:999px;background:${d ? '#2FBF71' : 'transparent'};box-shadow:inset 0 0 0 1.5px ${d ? '#2FBF71' : '#94A3B8'}"></i>` + ln(60, 'height:3px'), 'padding:4px 6px;border-radius:5px;background:#EEF2F7')).join('') + dv('background:#fff;border-radius:7px;padding:6px', col(4, lines(3, [95, 85, 60]))), 'padding:9px 8px')
    + col(6, dv('background:#fff;border-radius:7px;padding:6px', col(4, ln(50, 'height:3px') + dv('height:28px;border-radius:4px;background:#EEF2F7'))) + dv('background:#fff;border-radius:7px;padding:6px;box-shadow:0 0 0 1px #F5C26B', col(5, ln(70) + row(4, dv('flex:1;height:10px;border-radius:4px;background:#E2E8F0') + dv(`flex:1;height:10px;border-radius:4px;background:${C.ink}`)))), 'padding:9px 7px;border-left:1px solid #E5E9F0')) },
];

/* ---------- 品牌页骨架 brand1–4 ---------- */
const nav = (dark) => row(6, av(dark ? '#fff' : C.ink, 'width:10px;height:10px;border-radius:3px') + dv('flex:1') + lines(3, [8, 8, 8], `width:16px;background:${dark ? '#475569' : C.lin}`) + dv(`width:30px;height:11px;border-radius:999px;background:${dark ? '#fff' : C.ink}`), 'height:22px;padding:0 10px');
items.brand = [
  { code:'brand1', name:'落地发布', use:'一个东西刚推出，要人看懂、注册或下单：首屏讲清它是什么，再给证据和行动', html:scr('display:grid;grid-template-rows:22px 1fr auto auto', nav(false)
    + dv('display:grid;grid-template-columns:1fr 42%;gap:8px;align-items:center;padding:4px 12px', col(6, ln(90, `height:10px;background:${C.ink}`) + ln(70, `height:10px;background:${C.ink}`) + ln(80, 'height:4px;margin-top:4px') + dv(`width:56px;height:16px;border-radius:999px;background:${C.acc};margin-top:4px`)) + dv('height:76px;border-radius:12px;background:linear-gradient(160deg, #1E293B, #334155);position:relative', `<i style="position:absolute;inset:10px 18px;border-radius:8px;background:linear-gradient(160deg, #FF8A6E, #FF5A3C)"></i>`))
    + row(10, lines(5, [12, 12, 12], 'width:14%;background:#CBD5E1;height:6px'), 'padding:8px 12px;justify-content:space-between;border-top:1px solid #EEF1F5')
    + dv('margin:0 12px 10px;height:22px;border-radius:7px;background:#F4F6FA')) },
  { code:'brand2', name:'作品集', use:'作品就是论点：先给作品再说自己；用一行一个作品的列表，不用六宫格', html:scr('display:grid;grid-template-rows:auto 1fr;padding:12px;gap:10px', row(6, ln(36, `height:8px;background:${C.ink}`) + dv('flex:1') + ln(16, 'width:30px'))
    + col(0, [0, 1, 2, 3, 4].map((i) => row(8, img(G[i], `width:${i === 1 ? 44 : 22}px;height:${i === 1 ? 28 : 16}px;border-radius:3px;flex:none`) + ln([60, 70, 50, 65, 55][i], `height:5px;background:${C.ink};flex:1;max-width:${[60, 70, 50, 65, 55][i]}%`) + dv('flex:1') + ln(14, 'width:22px') + ln(10, 'width:16px;background:#94A3B8'), 'padding:6px 0;border-bottom:1px solid #EEF1F5')).join(''))) },
  { code:'brand3', name:'Lookbook', use:'气氛就是产品：大图铺满，字很少，深浅反差是刻意的', html:scr('background:#0E0E10;display:grid;grid-template-columns:1.2fr 1fr;grid-template-rows:1fr 1fr;gap:4px;padding:4px',
    img('#C8A27A, #6B4A2E', 'grid-row:1 / 3;border-radius:4px;position:relative') + img('#8AA0A8, #3E5560', 'border-radius:4px') + dv('border-radius:4px;background:#F2EEE8;padding:9px;display:flex;flex-direction:column;justify-content:flex-end;gap:5px', ln(60, 'height:7px;background:#1A1A1A') + ln(40, 'background:#9A9389'))) },
  { code:'brand4', name:'工作室', use:'能力就是产品：一句大字声明，能力清单，案例一条排开', html:scr('display:grid;grid-template-rows:22px auto 1fr auto', nav(false)
    + col(5, ln(96, `height:12px;background:${C.ink}`) + ln(80, `height:12px;background:${C.ink}`) + ln(50, `height:12px;background:${C.acc}`), 'padding:8px 12px')
    + col(0, ['品牌', '网站', '产品'].map((t) => row(6, `<span style="font:600 9px/1 var(--sans);color:${C.ink}">${t}</span>` + dv('flex:1') + ln(30, 'width:40px'), 'padding:5px 0;border-top:1px solid #EEF1F5')).join(''), 'padding:0 12px')
    + dv('background:#0F172A;padding:8px 12px;display:flex;gap:5px', [0, 1, 2, 3].map((i) => img(G[i], 'flex:1;height:26px;border-radius:3px')).join(''))) },
];

/* ---------- 品牌页版式 layout1–9 ---------- */
const brandFrame = (inner, s = '') => scr(`padding:10px;${s}`, inner);
items.layout = [
  { code:'layout1', name:'手风琴胶片', use:'几张作品并排，一次展开一张，其余收成窄条', html:brandFrame(row(4, [0, 1, 2, 3, 4].map((i) => i === 2 ? img(G[i], 'flex:4;height:100%;border-radius:6px') : dv(`flex:1;height:100%;border-radius:6px;background:linear-gradient(180deg, ${G[i]});opacity:.7`)).join(''), 'height:100%;align-items:stretch')) },
  { code:'layout2', name:'横向固定轨道', use:'往下滚时画面钉住，内容横着走过去', html:scr('background:#F4F6FA;display:flex;align-items:center;padding-left:12px;gap:8px;overflow:hidden', [0, 1, 2, 3].map((i) => dv(`flex:none;width:44%;height:72%;border-radius:8px;background:${i < 2 ? '#fff' : 'transparent'};${i < 2 ? 'box-shadow:0 0 0 1px #E5E9F0' : 'border:1.5px dashed #CBD5E1'};padding:8px;display:flex;flex-direction:column;gap:6px;opacity:${i < 2 ? 1 : 0.6}`, img(G[i], 'height:52%;border-radius:5px') + ln(70, `height:5px;background:${C.ink}`) + ln(50))).join('') + `<span style="position:absolute;right:10px;bottom:8px;font:600 10px/1 var(--sans);color:#64748B">→</span>`) },
  { code:'layout3', name:'算法分格', use:'格子按算法切开，每次大小都不一样', html:brandFrame(dv('height:100%;display:grid;grid-template-columns:3fr 2fr 2fr;grid-template-rows:2fr 1fr 2fr;gap:4px', [['1 / 2', '1 / 3', 0], ['2 / 4', '1 / 2', 1], ['2 / 3', '2 / 4', 4], ['3 / 4', '2 / 3', 3], ['1 / 2', '3 / 4', 2], ['3 / 4', '3 / 4', 5]].map(([c, r, g], i) => i === 2 ? dv(`grid-column:${c};grid-row:${r};border-radius:4px;background:#0F172A;padding:6px;display:flex;align-items:flex-end`, ln(70, 'background:#fff;height:5px')) : img(G[g], `grid-column:${c};grid-row:${r};border-radius:4px`)).join(''))) },
  { code:'layout4', name:'列表行代替卡片', use:'一行一个：标题、类别、年份；比卡片格子更像编辑过的', html:brandFrame(col(0, [0, 1, 2, 3, 4, 5].map((i) => row(8, `<span style="font:600 ${i === 0 ? 13 : 11}px/1.2 var(--sans);color:${C.ink};flex:1">${['南洋咖啡馆', '海岸民宿', '城市书店', '独立唱片', '夜市品牌', '手作皮具'][i]}</span>` + ln(10, 'width:30px') + `<span style="font:9px var(--sans);color:#94A3B8;font-variant-numeric:tabular-nums">${2026 - i}</span>`, 'padding:6px 0;border-bottom:1px solid #EEF1F5')).join(''))) },
  { code:'layout5', name:'几何拼贴', use:'没有图片也有画面：圆、三角、半胶囊拼出首屏', html:scr('background:#F3EDE2;position:relative',
    `<i style="position:absolute;left:10%;top:16%;width:30%;aspect-ratio:1;border-radius:999px;background:#E2462C"></i><i style="position:absolute;left:44%;top:12%;width:22%;height:46%;border-radius:0 999px 999px 0;background:#2B59C3"></i><i style="position:absolute;right:8%;top:20%;width:24%;aspect-ratio:1;background:#F2B705;clip-path:polygon(50% 0, 100% 100%, 0 100%)"></i><i style="position:absolute;left:18%;bottom:12%;width:18%;aspect-ratio:1;border-radius:999px;border:4px solid #1A1A1A"></i><i style="position:absolute;left:46%;bottom:14%;width:26%;height:16%;background:radial-gradient(#1A1A1A 1.2px, transparent 1.4px) 0 0 / 7px 7px"></i><i style="position:absolute;right:10%;bottom:12%;width:16%;height:22%;background:#1A1A1A;border-radius:999px 999px 0 0"></i>`) },
  { code:'layout6', name:'非对称网格', use:'1.4 : 1 的两栏：不要素材也有层次', html:brandFrame(dv('height:100%;display:grid;grid-template-columns:1.4fr 1fr;gap:6px', img(G[3], 'border-radius:6px') + col(6, dv('flex:1;border-radius:6px;background:#F4F6FA;padding:8px', col(5, ln(80, `height:7px;background:${C.ink}`) + ln(60, `height:7px;background:${C.ink}`) + ln(70))) + img(G[0], 'flex:1;border-radius:6px')))) },
  { code:'layout7', name:'爆炸图', use:'把产品一层层拆开讲清楚，每层旁边一句说明', html:scr('background:#F4F6FA', [0, 1, 2].map((i) => `<i style="position:absolute;left:14%;top:${14 + i * 24}%;width:46%;height:30%;border-radius:8px;background:${['#0F172A', '#64748B', '#FF5A3C'][i]};transform:rotateX(58deg) rotateZ(-38deg);opacity:${[1, .85, 1][i]}"></i><i style="position:absolute;left:58%;top:${27 + i * 24}%;width:12%;border-top:1px dashed #94A3B8"></i><i style="position:absolute;left:72%;top:${25 + i * 24}%;width:18%;height:4px;border-radius:2px;background:#94A3B8"></i>`).join('')) },
  { code:'layout8', name:'全幅图片堆叠', use:'一张张大图往下叠，字直接压在图上', html:scr('display:grid;grid-template-rows:1.3fr 1fr 1fr', [0, 1, 4].map((g, i) => dv(`background:linear-gradient(150deg, ${G[g]});display:flex;flex-direction:column;justify-content:flex-end;gap:4px;padding:8px 10px;position:relative`, `<i style="position:absolute;inset:0;background:linear-gradient(transparent 40%, rgba(0,0,0,.45))"></i>` + ln(i ? 40 : 60, `height:${i ? 5 : 8}px;background:#fff;position:relative`) + (i ? '' : ln(36, 'background:rgba(255,255,255,.7);position:relative')))).join('')) },
  { code:'layout9', name:'固定步进面板', use:'左边钉住一张图，右边一步步往下讲，图跟着换', html:brandFrame(dv('height:100%;display:grid;grid-template-columns:1fr 1fr;gap:10px', img(G[1], 'border-radius:8px') + col(10, [0, 1, 2, 3].map((i) => row(6, `<i style="width:8px;height:8px;border-radius:999px;flex:none;background:${i === 1 ? C.acc : '#CBD5E1'}"></i>` + col(4, ln(i === 1 ? 80 : 60, `height:${i === 1 ? 5 : 4}px;background:${i === 1 ? C.ink : C.lin}`) + (i === 1 ? ln(70) : ''), 'flex:1'))).join(''), 'justify-content:center;border-left:1.5px solid #E5E9F0;padding-left:6px'))) },
];

/* ---------- 手机页形态 phone1–6 ---------- */
const status = (c = C.ink) => row(4, `<span style="font:600 7px/1 var(--sans);color:${c}">9:41</span>` + dv('flex:1') + `<i style="width:14px;height:5px;border-radius:2px;background:${c};opacity:.8"></i>`, 'height:16px;padding:0 10px');
const tabbar = (s = '') => row(0, ['home', 'search', 'heart', 'user'].map((n, i) => dv(`flex:1;display:grid;place-items:center;color:${i ? '#94A3B8' : C.ink}`, ic(n))).join(''), `position:absolute;left:8px;right:8px;bottom:8px;height:28px;border-radius:999px;background:rgba(255,255,255,.92);box-shadow:0 4px 14px -6px rgba(15,23,42,.35);${s}`);
items.phone = [
  { code:'phone1', name:'App 壳', use:'像 App 的页：Tab、列表、详情；每天打卡、记账的工作台也用它', html:ph('background:#F4F6FA', status() + col(7, ln(50, `height:8px;background:${C.ink}`) + k('height:16px;border-radius:999px;background:#fff') + [0, 1, 2, 3].map((i) => row(6, av(['#F4A261', '#2A9D8F', '#6D83F2', '#E9C46A'][i], 'width:18px;height:18px;border-radius:5px') + col(3, ln(70) + ln(45, 'height:3px'), 'flex:1'), 'background:#fff;border-radius:8px;padding:6px')).join(''), 'padding:6px 9px') + tabbar()) },
  { code:'phone2', name:'翻页卡', use:'活动页：一屏只讲一件事，上滑翻到下一屏', html:ph('background:linear-gradient(170deg, #FF8A6E, #E04A2C)', status('#fff') + col(7, ln(40, 'background:rgba(255,255,255,.7)') + ln(90, 'height:12px;background:#fff') + ln(70, 'height:12px;background:#fff') + ln(60, 'background:rgba(255,255,255,.7);margin-top:4px'), 'position:absolute;left:12px;right:22px;top:38%') + col(4, [1, 0, 0, 0].map((a) => `<i style="width:4px;height:${a ? 12 : 4}px;border-radius:2px;background:${a ? '#fff' : 'rgba(255,255,255,.5)'}"></i>`).join(''), 'position:absolute;right:8px;top:42%') + dv('position:absolute;left:0;right:0;bottom:10px;display:grid;place-items:center;color:#fff', ic('chev', 'transform:rotate(180deg)'))) },
  { code:'phone3', name:'吸附叙事', use:'年度报告、数据报告：一屏一个大数字，吸附着往下翻', html:ph('background:#0E1420', status('#fff') + row(3, [1, 1, 0, 0].map((a) => `<i style="flex:1;height:2px;border-radius:1px;background:${a ? '#fff' : 'rgba(255,255,255,.25)'}"></i>`).join(''), 'padding:2px 10px') + col(6, ln(50, 'background:#475569') + `<b style="font:800 24px/1 var(--sans);color:#fff;font-variant-numeric:tabular-nums">1,284</b>` + ln(80, 'background:#64748B') + ln(60, 'background:#64748B'), 'position:absolute;left:12px;right:12px;top:36%') + dv('position:absolute;left:12px;right:12px;bottom:14px;height:22px;border-radius:6px;background:linear-gradient(90deg, #FF5A3C 62%, #1E2736 62%)')) },
  { code:'phone4', name:'电商长页', use:'手机商品页：大图、价格、选项，底部一直有购买条', html:ph('', img(G[4], 'height:44%') + col(6, `<b style="font:700 13px/1 var(--sans);color:${C.acc};font-variant-numeric:tabular-nums">RM 68</b>` + ln(80, `height:5px;background:${C.ink}`) + row(4, [1, 0, 0].map((a) => dv(`height:13px;flex:1;border-radius:5px;box-shadow:inset 0 0 0 1px ${a ? C.ink : '#CBD5E1'}`)).join('')) + lines(2, [90, 70]), 'padding:9px') + row(5, dv('flex:1;height:22px;border-radius:7px;box-shadow:inset 0 0 0 1px #CBD5E1') + dv(`flex:1.4;height:22px;border-radius:7px;background:${C.ink}`), 'position:absolute;left:0;right:0;bottom:0;padding:7px 8px;background:#fff;border-top:1px solid #EEF1F5')) },
  { code:'phone5', name:'长页官网', use:'手机官网：一段段往下读，菜单收进右上角', html:ph('', status() + row(4, av(C.ink, 'width:11px;height:11px;border-radius:3px') + dv('flex:1') + col(2, '<i style="width:12px;height:1.5px;background:#0F172A"></i>'.repeat(3)), 'padding:4px 10px') + col(6, ln(90, `height:9px;background:${C.ink}`) + ln(70, `height:9px;background:${C.ink}`) + ln(80, 'margin-top:3px') + dv(`width:52px;height:15px;border-radius:999px;background:${C.ink};margin-top:3px`) + img(G[1], 'height:62px;border-radius:8px;margin-top:6px') + lines(3, [90, 80, 60]), 'padding:10px')) },
  { code:'phone6', name:'氛围单屏', use:'天气、海报这种单一用途：一屏就是全部', html:ph('background:linear-gradient(180deg, #7DB4E6, #F6C89F 85%)', status('#fff') + col(4, `<span style="font:200 44px/1 var(--sans);color:#fff;font-variant-numeric:tabular-nums">24°</span>` + `<span style="font:600 10px/1 var(--sans);color:#fff">吉隆坡 · 多云</span>`, 'position:absolute;left:14px;top:26%') + row(6, [0, 1, 2, 3].map(() => col(3, ln(100, 'background:rgba(255,255,255,.7);width:16px') + `<i style="width:10px;height:10px;border-radius:999px;background:rgba(255,255,255,.85)"></i>`, 'align-items:center;flex:1')).join(''), 'position:absolute;left:12px;right:12px;bottom:16px')) },
];

/* ---------- 卡片结构 card1–6 ---------- */
const btn = (t, fill, c = C.acc) => `<span class="pl" style="${fill ? `background:${c};color:#fff` : `box-shadow:inset 0 0 0 1px #C7C7CC;color:#1D1D1F`}">${t}</span>`;
const cd = (inner, s = '') => `<div class="t"><div class="cd" style="${s}">${inner}</div></div>`;
items.card = [
  { code:'card1', name:'头像组 + 金额', use:'社交金融、共同账本：金额最大用主色，一张卡只有一个实心按钮', html:cd(row(0, ['#C8553D', '#2A8C82', '#9A7B12', '#5468D4'].map((c, i) => av(c, `width:20px;height:20px;box-shadow:0 0 0 2px #FAFAFA;${i ? 'margin-left:-4px' : ''}`)).join('') + '<small style="margin-left:6px">家庭账本 · 4 人</small>') + `<b style="font:600 26px/1 var(--sans);color:${C.acc};font-variant-numeric:tabular-nums">RM 2,480</b>` + row(6, btn('收款', true) + btn('转账', false))) },
  { code:'card2', name:'内容卡', use:'推荐、社群活动：标题和标签在上，摘要 2–3 行，底部报名和互动数', html:cd(row(6, '<b style="font-size:12.5px">周末手冲课</b>' + `<span class="pl" style="height:18px;padding:0 7px;background:#F2F2F7;color:#6E6E73;font-weight:500">12 人</span>`) + '<span style="color:#6E6E73">两小时学会磨豆、注水、控温，一次带走三种豆子。</span>' + row(6, btn('报名', true) + btn('看看', false) + `<small style="margin-left:auto;font-variant-numeric:tabular-nums">♥ 86</small>`)) },
  { code:'card3', name:'图片 + 文字', use:'旅行、音乐、生活方式：图最多占 40%，信息占 60%', html:cd(img(G[2], 'height:58px;border-radius:12px') + '<b style="font-size:12.5px">金马伦高原</b><small>彭亨 · 两天一夜</small>' + row(10, ['212 km', '3.5 小时', '★ 4.8'].map((t) => `<small style="color:#1D1D1F;font-variant-numeric:tabular-nums">${t}</small>`).join('')), 'padding:8px 8px 12px;gap:6px') },
  { code:'card4', name:'个人资料', use:'找服务、找人：封面、压在封面上的头像、评分和预约', html:cd(dv('position:relative;height:40px;border-radius:12px;background:linear-gradient(150deg, #8AB17D, #2A9D8F)', av('#C8553D', 'position:absolute;left:10px;bottom:-12px;width:28px;height:28px;box-shadow:0 0 0 2.5px #FAFAFA')) + row(5, '<b style="font-size:12px;margin-top:8px">林小雨</b><i style="width:6px;height:6px;border-radius:9px;background:#2FBF71;margin-top:8px"></i>') + '<small style="margin-top:-6px">室内设计师 · 吉隆坡</small>' + row(0, [['4.9', '评分'], ['128', '单'], ['RM 90', '每小时']].map(([a, b]) => col(1, `<b style="font-size:11px;font-variant-numeric:tabular-nums">${a}</b><small>${b}</small>`, 'flex:1')).join('')) + btn('预约', true, C.ink), 'padding:8px 10px 12px;gap:7px') },
  { code:'card5', name:'音频波形', use:'播客、语音：波形用主色细线，互动放右边', html:cd(row(7, av('#5468D4', 'width:26px;height:26px') + col(1, '<b style="font-size:11.5px">周五电台</b><small>3 小时前</small>', 'flex:1') + `<small style="font-variant-numeric:tabular-nums">50.1k</small>`) + dv('display:flex;align-items:center;gap:2px;height:30px', Array.from({ length:34 }, (_, i) => `<i style="flex:1;height:${18 + Math.abs(Math.sin(i * 1.3) * Math.cos(i * 0.4)) * 82}%;border-radius:1px;background:${i < 13 ? C.acc : '#D1D1D6'}"></i>`).join('')) + row(12, ['heart', 'copy', 'user'].map((n) => `<span style="color:#6E6E73">${ic(n)}</span>`).join('') + `<small style="margin-left:auto;font-variant-numeric:tabular-nums">12:40</small>`)) },
  { code:'card6', name:'逐条处理', use:'一批待确认的东西一条条过：新发件人、审批单、导入时的重复数据', html:cd(row(6, '<b style="font-size:12px">新发件人</b>' + `<span class="pl" style="height:17px;padding:0 6px;background:#F2F2F7;color:#1D1D1F">12</span>` + `<span style="margin-left:auto;color:#6E6E73">${ic('close')}</span>`) + row(4, '<small style="color:#1D1D1F">12 个新发件人想进来</small>' + `<small style="margin-left:auto;font-variant-numeric:tabular-nums">1 / 12</small>`) + row(2, Array.from({ length:12 }, (_, i) => `<i style="flex:1;height:3px;border-radius:2px;background:${i ? '#E5E5EA' : C.acc}"></i>`).join(''))
    + dv('background:#F2F2F7;border-radius:10px;padding:7px;display:grid;gap:4px', row(5, av('#2A8C82', 'width:16px;height:16px') + '<b style="font-size:11px">丰源贸易</b>' + `<span class="pl" style="height:15px;padding:0 6px;background:#DCFCE7;color:#15803D;font-size:8.5px">已验证</span>`) + '<small>第一次来信：今天 · 往来 0 次</small>')
    + row(6, '<small style="color:#1D1D1F">稍后</small>' + dv('flex:1') + `<span class="pl" style="background:#E5E5EA;color:#1D1D1F">拒绝</span>` + btn('允许', true)), 'gap:7px') },
];

/* ---------- 卡片质感 surface1–4 ---------- */
const kpi = (ink, sub, acc) => `<small style="color:${sub}">本月收入</small><b style="font:600 20px/1 var(--sans);color:${ink};font-variant-numeric:tabular-nums">RM 48,200</b><div style="height:30px">${area(acc, 'transparent')}</div>`;
items.surface = [
  { code:'surface1', name:'浅色卡', use:'浅底：卡片 #FAFAFA，不描边，一层柔和阴影', html:dv('position:absolute;inset:0;background:#EEF1F5;display:grid;place-items:center', `<div class="cd">${kpi('#1D1D1F', '#6E6E73', C.acc)}</div>`) },
  { code:'surface2', name:'深色卡', use:'深底：卡片比底亮一档，白字靠透明度 100 / 70 / 60 / 50 分层', html:dv('position:absolute;inset:0;background:#08090B;display:grid;place-items:center', `<div class="cd" style="background:#141418;box-shadow:none">${kpi('#FFFFFF', 'rgba(255,255,255,.6)', '#FF7A5C')}</div>`) },
  { code:'surface3', name:'图片卡', use:'图片最多占 40%，信息占 60%，图片只是气氛', html:dv('position:absolute;inset:0;background:#EEF1F5;display:grid;place-items:center', `<div class="cd" style="padding:8px 8px 12px">${img(G[0], 'height:52px;border-radius:12px')}${kpi('#1D1D1F', '#6E6E73', C.acc).replace('height:30px', 'height:22px')}</div>`) },
  { code:'surface4', name:'玻璃卡', use:'背后要有照片或色块才好看，配 L1；不要叠在别的卡片上', html:dv('position:absolute;inset:0;background:radial-gradient(circle at 25% 30%, #FF9A7A 0 22%, transparent 23%), radial-gradient(circle at 78% 72%, #6D83F2 0 26%, transparent 27%), radial-gradient(circle at 70% 20%, #2A9D8F 0 14%, transparent 15%), #E8ECF4;display:grid;place-items:center', `<div class="cd" style="background:rgba(255,255,255,.5);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);box-shadow:inset 0 0 0 1px rgba(255,255,255,.6), 0 8px 24px -12px rgba(15,23,42,.3)">${kpi('#1D1D1F', '#4B5563', '#C2410C')}</div>`) },
];

/* ---------- Bento 小卡 bento1–4 ---------- */
const bento = (hi) => scr(`background:${C.bg};padding:9px;display:grid;grid-template-columns:1.5fr 1.2fr 1fr;grid-template-rows:1fr 1fr;gap:7px`, [
  dv(`grid-row:1 / 3;border-radius:9px;padding:9px;background:linear-gradient(160deg, #1E293B, #0F172A);display:flex;flex-direction:column;gap:7px;opacity:${hi === 0 ? 1 : 0.3}`, '<small style="font-size:8.5px;color:#94A3B8">API Key</small>' + `<b style="font:600 10px/1 var(--mono);color:#E2E8F0;letter-spacing:.05em">sk-••••4F2A</b>` + dv('flex:1') + ln(46, `background:${C.acc}`)),
  dv(`grid-row:1 / 3;background:#fff;border-radius:9px;padding:9px;display:grid;align-content:space-around;opacity:${hi === 1 ? 1 : 0.3}`, [['今日请求', '12.4k'], ['成功率', '99.2%'], ['平均耗时', '184ms']].map(([a, b]) => col(2, `<small style="font-size:8px;color:#64748B">${a}</small><b style="font:600 13px/1 var(--sans);color:${C.ink};font-variant-numeric:tabular-nums">${b}</b>`)).join('')),
  dv(`background:#fff;border-radius:9px;padding:8px;display:grid;place-items:center;gap:3px;opacity:${hi === 2 ? 1 : 0.3}`, `<span style="color:${C.ink}">${ic('bell', 'width:16px;height:16px')}</span><b style="font:600 13px/1 var(--sans);color:${C.ink}">3</b>`),
  dv(`background:#fff;border-radius:9px;padding:8px;display:grid;gap:3px;opacity:${hi === 3 ? 1 : 0.3}`, `<b style="font:600 12px/1 var(--sans);color:${C.ink};font-variant-numeric:tabular-nums">+18%</b><div style="height:24px">${area(C.acc, 'rgba(255,90,60,.12)')}</div>`),
].join(''));
items.bento = [
  { code:'bento1', name:'深色主卡', use:'一行里只放一张最重要的深色卡，例如 API Key、主指标', html:bento(0) },
  { code:'bento2', name:'多数据堆叠', use:'几个相关的数叠在一张卡里，省掉一排一样大的格子', html:bento(1) },
  { code:'bento3', name:'方块小卡', use:'一个图标加一个数，放零碎的小状态', html:bento(2) },
  { code:'bento4', name:'迷你图卡', use:'一个数加一条小走势线', html:bento(3) },
];

/* ---------- 导航风格 nav1–11 ---------- */
const navPh = (bar, bg = '#F4F6FA', behind = '') => `<div class="t tz"><div class="ph" style="background:${bg}">${status() + col(7, ln(46, `height:8px;background:${C.ink}`) + img(G[3], 'height:56px;border-radius:9px') + lines(4, [90, 70, 80]), 'padding:6px 10px') + behind + bar}</div></div>`;   // 导航只看底部：手机放大 1.55 倍，上面裁掉
const tabs = (fn) => ['home', 'search', 'heart', 'user'].map((n, i) => fn(n, i === 0, i)).join('');
const lab = (t, on, c) => `<span style="font:${on ? 700 : 500} 6.5px/1 var(--sans);color:${c}">${t}</span>`;
const T = ['首页', '搜索', '收藏', '我的'];
const item = (n, on, i, onC = C.acc, offC = '#94A3B8', extra = '') => col(2, ic(n, `color:${on ? onC : offC}`) + lab(T[i], on, on ? onC : offC), `align-items:center;flex:1;${extra}`);
items.nav = [
  { code:'nav1', name:'极简', use:'工具、后台、信息多的产品：纯色底、细线图标；选中靠主色 + 加粗，凑够两处不同', html:navPh(row(0, tabs((n, on, i) => item(n, on, i)), 'position:absolute;left:0;right:0;bottom:0;height:36px;background:#fff'), '#fff') },
  { code:'nav2', name:'磨砂玻璃', use:'背后有照片、视频的内容产品：内容从导航后面透出来', html:navPh(row(0, tabs((n, on, i) => item(n, on, i, C.ink, '#475569')), 'position:absolute;left:0;right:0;bottom:0;height:36px;background:rgba(255,255,255,.55);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px)'), '#F4F6FA', img(G[0], 'position:absolute;left:0;right:0;bottom:0;height:70px')) },
  { code:'nav3', name:'悬浮', use:'高端、付费产品：离开底边、左右缩进、圆角浮起', html:navPh(row(0, tabs((n, on, i) => item(n, on, i)), 'position:absolute;left:8px;right:8px;bottom:9px;height:34px;border-radius:14px;background:#fff;box-shadow:0 8px 18px -8px rgba(15,23,42,.45)')) },
  { code:'nav4', name:'新拟物', use:'慎用：软阴影做出凸起和凹陷，按钮边界很难达到 3:1 对比度', html:navPh(row(0, tabs((n, on, i) => item(n, on, i, '#475569', '#94A3B8', on ? 'box-shadow:inset 2px 2px 4px #C5CCD6, inset -2px -2px 4px #FFFFFF;border-radius:10px;padding:4px 0' : '')), 'position:absolute;left:6px;right:6px;bottom:7px;height:38px;border-radius:14px;background:#E4E8EE;box-shadow:-3px -3px 6px #FFFFFF, 3px 3px 7px #C5CCD6;padding:0 4px'), '#E4E8EE') },
  { code:'nav5', name:'胶囊', use:'通用、电商：选中项有一块圆角胶囊底色；Android Material 3 默认就是它', html:navPh(row(0, tabs((n, on, i) => col(2, dv(`width:26px;height:15px;border-radius:999px;display:grid;place-items:center;background:${on ? C.accs : 'transparent'}`, ic(n, `color:${on ? C.acc : '#94A3B8'}`)) + lab(T[i], on, on ? C.ink : '#94A3B8'), 'align-items:center;flex:1')), 'position:absolute;left:0;right:0;bottom:0;height:38px;background:#fff;border-top:1px solid #EEF1F5')) },
  { code:'nav6', name:'中间大按钮', use:'核心动作是发布、创建：中间一个大圆按钮，点开一个页面，不在原地执行', html:navPh(row(0, ['home', 'search', 'plus', 'heart', 'user'].map((n, i) => i === 2 ? dv('flex:1;display:grid;place-items:center', dv(`width:30px;height:30px;border-radius:999px;background:${C.acc};display:grid;place-items:center;transform:translateY(-9px);box-shadow:0 6px 12px -4px rgba(255,90,60,.6)`, ic('plus', 'color:#fff'))) : dv('flex:1;display:grid;place-items:center', ic(n, `color:${i === 0 ? C.ink : '#94A3B8'}`))).join(''), 'position:absolute;left:0;right:0;bottom:0;height:34px;background:#fff;border-top:1px solid #EEF1F5')) },
  { code:'nav7', name:'渐变', use:'慎用：年轻、娱乐、健身；在渐变最浅的地方测对比度', html:navPh(row(0, tabs((n, on, i) => item(n, on, i, '#FFFFFF', 'rgba(255,255,255,.72)')), 'position:absolute;left:0;right:0;bottom:0;height:36px;background:linear-gradient(90deg, #E04A2C, #C2410C 55%, #9A3412)')) },
  { code:'nav8', name:'线框变实心', use:'阅读、内容、极简产品：没选中是线框图标，选中换成同款实心', html:navPh(row(0, tabs((n, on, i) => item(on ? n + '-f' : n, on, i, C.ink, '#94A3B8')), 'position:absolute;left:0;right:0;bottom:0;height:36px;background:#fff;border-top:1px solid #EEF1F5')) },
  { code:'nav9', name:'指示条', use:'通用、最稳，Web 应用默认：选中项下面一条短条，再配主色', html:navPh(row(0, tabs((n, on, i) => col(3, ic(n, `color:${on ? C.acc : '#94A3B8'}`) + lab(T[i], on, on ? C.acc : '#94A3B8') + `<i style="width:14px;height:2.5px;border-radius:2px;background:${on ? C.acc : 'transparent'}"></i>`, 'align-items:center;flex:1;padding-top:5px')), 'position:absolute;left:0;right:0;bottom:0;height:38px;background:#fff;border-top:1px solid #EEF1F5;align-items:flex-start')) },
  { code:'nav10', name:'圆角顶', use:'想要柔和一点的产品：导航栏顶部两个角做圆角，圆角外面别露白边', html:navPh(row(0, tabs((n, on, i) => item(n, on, i)), 'position:absolute;left:0;right:0;bottom:0;height:38px;background:#fff;border-radius:16px 16px 0 0;box-shadow:0 -6px 16px -8px rgba(15,23,42,.3)'), '#F4F6FA', img(G[4], 'position:absolute;left:0;right:0;bottom:20px;height:40px')) },
  { code:'nav11', name:'仿 iOS Dock', use:'以 iPhone 用户为主：悬浮 + 磨砂 + 大圆角，接近 iOS 26 起的系统 Tab 栏', html:navPh(row(0, tabs((n, on, i) => item(n, on, i, '#0A84FF', '#3C3C43')), 'position:absolute;left:9px;right:9px;bottom:9px;height:36px;border-radius:20px;background:rgba(255,255,255,.58);backdrop-filter:blur(12px) saturate(1.6);-webkit-backdrop-filter:blur(12px) saturate(1.6);box-shadow:inset 0 0 0 1px rgba(255,255,255,.7), 0 8px 18px -8px rgba(15,23,42,.4)'), '#F4F6FA', img(G[1], 'position:absolute;left:0;right:0;bottom:0;height:64px')) },
];

/* ---------- 手机 Tab 栏 tab1–2 ---------- */
items.tab = [
  { code:'tab1', name:'悬浮胶囊', use:'内容能从下面透出来，看起来新；不要再加上边框', html:navPh(row(0, tabs((n, on, i) => dv('flex:1;display:grid;place-items:center', ic(n, `color:${on ? C.ink : '#64748B'}`))), 'position:absolute;left:12px;right:12px;bottom:10px;height:30px;border-radius:999px;background:rgba(255,255,255,.7);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);box-shadow:0 6px 16px -8px rgba(15,23,42,.4)'), '#F4F6FA', img(G[2], 'position:absolute;left:0;right:0;bottom:0;height:60px')) },
  { code:'tab2', name:'贴边', use:'背景花的时候更安全，看起来实用；上面一条细线', html:navPh(row(0, tabs((n, on, i) => item(n, on, i, C.ink)), 'position:absolute;left:0;right:0;bottom:0;height:38px;background:#fff;border-top:1px solid #E2E8F0'), '#F4F6FA', img(G[2], 'position:absolute;left:0;right:0;bottom:38px;height:40px')) },
];

GL.sections.push(
  { id:'look', kind:'static', title:'整体风格', note:'整个产品选一次就锁，写进 DESIGN.md；回「换方向」才全项目一起换。', subs:[
    { title:'后台排版方向 L1–L5', items:items.L },
    { title:'后台配色 12 套', items:items.palette } ] },
  { id:'layout', kind:'static', title:'页面排版', note:'按这一页的内容推荐，每次都能选。', subs:[
    { title:'Dashboard 骨架 K1–K6', items:items.K },
    { title:'后台外框', items:items.shell },
    { title:'品牌页骨架', items:items.brand },
    { title:'品牌页版式', items:items.layout },
    { title:'手机页形态', items:items.phone } ] },
  { id:'cards', kind:'static', title:'卡片和导航', note:'项目有 DESIGN.md 时只借结构和层级，颜色照项目的。导航每种都要配平板和桌面的样子，这里只画手机。', subs:[
    { title:'卡片结构', items:items.card },
    { title:'卡片质感', items:items.surface },
    { title:'Bento 小卡', items:items.bento },
    { title:'导航风格', items:items.nav },
    { title:'手机 Tab 栏', items:items.tab } ] },
);
})();
