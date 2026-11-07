/* 交互动效小样（一）：组件 C、控件反馈 F。时长、曲线、spring 只用 references/core/params.md 里的值 */
(() => {
const { Spring, seq, drag, tween, EASE, CSS, clamp, icon } = GL;

GL.css(`
.d-card{ background:var(--card); border:1px solid var(--line); border-radius:10px; }
.d-btn{ background:var(--ink); color:var(--bg); border:0; border-radius:10px; height:40px; padding:0 18px; font-size:14px; font-weight:600; cursor:pointer; }
.d-phone{ width:172px; height:196px; background:var(--card); border:1px solid var(--line); border-radius:20px; overflow:hidden; position:relative; }
.d-sk{ display:block; height:7px; border-radius:4px; background:var(--line); }
.box{ width:18px; height:18px; border-radius:6px; border:2px solid var(--line-2); display:grid; place-items:center; flex:none; transition:background-color 150ms ease, border-color 150ms ease; }
.box svg{ width:12px; height:12px; }
.box path{ stroke:var(--card); stroke-width:2.5; fill:none; stroke-linecap:round; stroke-linejoin:round; stroke-dasharray:16; stroke-dashoffset:16; }
.box.on{ background:var(--accent); border-color:var(--accent); }
.box.on path{ transition:stroke-dashoffset 150ms var(--ease-out); stroke-dashoffset:0; }
.roll{ display:inline-flex; font-variant-numeric:tabular-nums; }
.roll .dg{ position:relative; display:inline-block; overflow:hidden; height:1.25em; line-height:1.25em; }
.roll .dg .ph{ visibility:hidden; }
.roll .dg .a, .roll .dg .b{ position:absolute; left:0; right:0; top:0; text-align:center; }

/* C1 */
.c1{ position:relative; width:240px; height:72px; border:0; background:transparent; cursor:pointer; padding:0; }
.c1-p{ position:absolute; left:0; top:8px; width:32px; }
.c1-av{ width:32px; height:32px; border-radius:999px; display:grid; place-items:center; color:#fff; font-size:12px; font-weight:600; box-shadow:0 0 0 2px var(--stage); }
.c1-more{ background:var(--line-2); color:var(--ink); }
.c1-n{ position:absolute; top:38px; left:50%; transform:translateX(-50%); white-space:nowrap; font-size:11px; color:var(--ink-2); opacity:0; transition:opacity 150ms var(--ease-out); }
/* C2 */
.c2{ position:relative; width:min(240px, 86%); display:grid; gap:6px; }
.c2-fill{ position:absolute; inset:0; border-radius:10px; background:var(--accent-soft); transform-origin:left; transform:scaleX(0); transition:transform 250ms var(--ease-out); }
.c2-row{ position:relative; display:flex; align-items:center; gap:10px; height:38px; padding:0 12px; border-radius:10px; border:1px solid var(--line); background:transparent; text-align:left; font-size:13px; cursor:pointer; }
.c2-row[aria-pressed="true"] .c2-t{ color:var(--muted); text-decoration:line-through; }
/* C3 */
.c3{ display:flex; gap:6px; width:250px; height:150px; }
.c3-p{ position:relative; flex:1 1 0; min-width:0; display:flex; flex-direction:column; align-items:flex-start; transition:flex-grow 250ms var(--ease-in-out); border:1px solid var(--line); background:var(--card); border-radius:10px; overflow:hidden; text-align:left; padding:10px; cursor:pointer; }
.c3-p[aria-expanded="true"]{ flex-grow:5; }
.c3-n{ font-size:12px; font-weight:600; white-space:nowrap; }
.c3-b{ position:absolute; left:10px; top:32px; width:118px; display:grid; gap:4px; opacity:0; transition:opacity 150ms var(--ease-out); font-size:11px; color:var(--muted); }
.c3-b b{ font-size:17px; color:var(--ink); font-variant-numeric:tabular-nums; }
.c3-bars{ display:flex; align-items:flex-end; gap:3px; height:38px; margin-top:4px; }
.c3-bars i{ flex:1; background:var(--line-2); border-radius:2px 2px 0 0; }
.c3-bars i:last-child{ background:var(--accent); }
/* C7 */
.c7-bar{ position:relative; width:250px; height:48px; display:flex; align-items:center; padding:0 14px; }
.c7-t{ font-weight:600; transition:opacity 150ms var(--ease-out); }
.c7{ position:absolute; right:6px; top:6px; height:36px; width:36px; border-radius:10px; background:var(--stage); overflow:hidden; display:flex; align-items:center; }
.c7-b{ flex:none; width:36px; height:36px; border:0; background:transparent; display:grid; place-items:center; cursor:pointer; color:var(--ink); }
.c7-b .ic{ width:18px; height:18px; }
.c7-i{ flex:1; min-width:0; border:0; background:transparent; font-size:16px; outline:none; padding-right:10px; }
.c7-i:focus-visible{ box-shadow:none; }
.c7-bar.open .c7-t{ opacity:0; }
/* C9 */
.c9{ position:relative; width:132px; }
.c9 > span{ position:absolute; inset:0; display:flex; align-items:center; justify-content:center; gap:6px; }
.c9-l{ transition:opacity 100ms var(--ease-out); }
.c9-sp, .c9-ok{ opacity:0; transition:opacity 150ms var(--ease-out); }
.c9-sp::before{ content:""; width:16px; height:16px; border-radius:999px; border:2px solid currentColor; border-right-color:transparent; animation:spin 700ms linear infinite; }
@keyframes spin{ to{ transform:rotate(360deg); } }
.c9-ok svg{ width:18px; height:18px; }
.c9-ok path{ fill:none; stroke:currentColor; stroke-width:2.4; stroke-linecap:round; stroke-linejoin:round; stroke-dasharray:24; stroke-dashoffset:24; }
.c9.busy .c9-l, .c9.ok .c9-l{ opacity:0; }
.c9.busy .c9-sp{ opacity:1; }
.c9.ok .c9-ok{ opacity:1; }
.c9.ok .c9-ok path{ transition:stroke-dashoffset 150ms var(--ease-out); stroke-dashoffset:0; }
/* C12 */
.c12-sc{ position:absolute; inset:0; overflow-y:auto; padding:42px 10px 10px; scrollbar-width:none; }
.c12-sc::-webkit-scrollbar{ display:none; }
.c12-bar{ position:absolute; top:0; left:0; right:0; height:36px; background:var(--card); border-bottom:1px solid var(--line); z-index:2; display:flex; align-items:center; justify-content:space-between; padding:0 12px; font-size:12px; }
.c12-it{ display:grid; grid-template-columns:34px 1fr; grid-template-rows:auto auto; gap:6px 8px; padding:8px 0; border-bottom:1px solid var(--line); }
.c12-it i{ grid-row:1 / 3; width:34px; height:34px; border-radius:8px; background:var(--stage); }
/* C16 */
.c16{ width:250px; display:grid; gap:6px; }
.c16-w{ display:grid; grid-template-rows:1fr; transition:grid-template-rows 200ms var(--ease-out); }
.c16-w.gone{ grid-template-rows:0fr; }
.c16-in{ min-height:0; overflow:hidden; }
.c16-row{ display:flex; align-items:center; justify-content:space-between; gap:8px; height:44px; padding:0 8px 0 12px; font-size:13px; transition:opacity 150ms var(--ease-out); }
.c16-w.gone .c16-row{ opacity:0; }
.c16-tag{ font-size:11px; color:var(--muted); }
.c16-b{ position:relative; width:52px; height:30px; border-radius:8px; border:1px solid var(--line-2); background:var(--card); font-size:12px; cursor:pointer; overflow:hidden; transition:background-color 150ms ease, border-color 150ms ease, color 150ms ease; }
.c16-b span{ position:absolute; inset:0; display:grid; place-items:center; white-space:nowrap; transition:opacity 100ms var(--ease-out); }
.c16-b .t2{ opacity:0; }
.c16-b.ask{ background:var(--err-soft); border-color:var(--err); color:var(--err); }
.c16-b.ask .t1{ opacity:0; } .c16-b.ask .t2{ opacity:1; }
.c16-toast{ position:absolute; left:50%; bottom:12px; display:flex; gap:10px; align-items:center; background:var(--ink); color:var(--bg); border-radius:10px; padding:8px 8px 8px 12px; font-size:12px; white-space:nowrap; opacity:0; transform:translate(-50%, 8px); transition:opacity 200ms var(--ease-out), transform 200ms var(--ease-out); pointer-events:none; }
.c16-toast.show{ opacity:1; transform:translate(-50%, 0); pointer-events:auto; }
.c16-u{ border:0; background:transparent; color:var(--bg); text-decoration:underline; font-size:12px; cursor:pointer; padding:4px; }
/* C19 */
.c19-list{ width:250px; display:grid; gap:4px; margin-top:-34px; }
.c19-r{ display:flex; align-items:center; gap:10px; height:30px; padding:0 10px; border-radius:8px; border:0; background:var(--card); font-size:12.5px; text-align:left; cursor:pointer; }
.c19-bar{ position:absolute; left:16px; right:16px; bottom:10px; height:40px; border-radius:12px; background:var(--ink); color:var(--bg); display:flex; align-items:center; gap:6px; padding:0 6px 0 12px; font-size:12.5px; opacity:0; transform:translateY(calc(100% + 10px)); transition:opacity 150ms var(--ease-out), transform 150ms var(--ease-out); }
.c19-bar.show{ opacity:1; transform:none; transition-duration:200ms; }
.c19-bar > span{ flex:1; }
.c19-a{ height:28px; padding:0 10px; border-radius:8px; border:0; background:transparent; color:var(--bg); font-size:12px; cursor:pointer; }
.c19-main{ background:var(--accent); color:#fff; }
/* C20 */
.c20{ display:grid; gap:10px; justify-items:center; }
.c20-cap{ font-size:12px; color:var(--muted); font-variant-numeric:tabular-nums; }
.c20-pill{ position:relative; width:132px; height:44px; border-radius:22px; background:var(--ink); transition:background-color 150ms ease; }
.c20-pill > *{ position:absolute; }
.c20-send{ inset:0; width:100%; height:100%; border-radius:22px; background:transparent; transition:opacity 100ms var(--ease-out); }
.c20-cells{ inset:0; display:flex; gap:6px; justify-content:center; align-items:center; pointer-events:none; }
.c20-cells i{ width:34px; height:44px; border-radius:10px; border:1.5px solid var(--line-2); background:var(--card); display:grid; place-items:center; font:600 18px/1 var(--sans); font-style:normal; font-variant-numeric:tabular-nums; opacity:0; transition:border-color 150ms ease; }
.c20-cells i.cur{ border-color:var(--accent); }
.c20-in{ inset:0; width:100%; height:100%; opacity:1; color:transparent; caret-color:transparent; background:transparent; border:0; font-size:16px; outline:none; display:none; }
.c20-in:focus-visible{ box-shadow:none; }
.c20-st{ inset:0; display:flex; align-items:center; justify-content:center; gap:8px; font-size:13px; font-weight:600; opacity:0; transition:opacity 150ms var(--ease-out); white-space:nowrap; }
.c20-sp{ width:14px; height:14px; border-radius:999px; border:2px solid currentColor; border-right-color:transparent; animation:spin 700ms linear infinite; }
.c20-ck{ width:18px; height:18px; display:none; }
.c20-pill.cells, .c20-pill.err{ background:transparent; }
.c20-pill.cells .c20-send, .c20-pill.busy .c20-send, .c20-pill.ok .c20-send, .c20-pill.err .c20-send{ opacity:0; pointer-events:none; }
.c20-pill.cells .c20-in, .c20-pill.err .c20-in{ display:block; }
.c20-pill.err .c20-cells i{ border-color:var(--err); }
.c20-pill.busy{ background:var(--line); color:var(--ink); }
.c20-pill.busy .c20-st, .c20-pill.ok .c20-st{ opacity:1; }
.c20-pill.ok{ background:var(--ok); color:#fff; }
.c20-pill.ok .c20-sp{ display:none; } .c20-pill.ok .c20-ck{ display:block; }
.c20-msg{ font-size:12px; color:var(--muted); min-height:1.4em; font-variant-numeric:tabular-nums; text-align:center; }
.c20-msg.err{ color:var(--err); }
/* C21 */
.c21{ width:250px; display:grid; gap:8px; align-self:stretch; align-content:start; padding-top:16px; }
.c21-q{ justify-self:end; background:var(--ink); color:var(--bg); border-radius:12px 12px 4px 12px; padding:6px 10px; font-size:12.5px; }
.c21-a{ font-size:13px; line-height:1.6; min-height:92px; cursor:text; }
.c21-a p{ margin:0; }
.c21-a .ink{ animation:c21-in 120ms var(--ease-out) both; animation-delay:calc(var(--i) * 30ms); }
.c21-a.fin .ink{ animation:none; }
@keyframes c21-in{ from{ opacity:0; filter:blur(6px); } }
.c21-cur{ display:inline-block; width:.5em; height:1em; vertical-align:-0.125em; background:var(--ink-2); margin-left:1px; }
.c21-stop{ position:absolute; right:12px; bottom:12px; height:28px; padding:0 12px; border-radius:999px; border:1px solid var(--line-2); background:var(--card); font-size:12px; cursor:pointer; }

/* F2 */
.f2{ position:relative; width:240px; height:162px; }
.f2-r{ position:absolute; left:0; right:0; top:0; height:36px; display:flex; align-items:center; justify-content:space-between; padding:0 4px 0 12px; font-size:13px; user-select:none; cursor:grab; transition:box-shadow 150ms var(--ease-out); }
.f2-r.up{ box-shadow:var(--shadow); z-index:2; cursor:grabbing; }
.f2-h{ width:32px; height:32px; border:0; background:transparent; color:var(--muted); letter-spacing:-2px; cursor:grab; touch-action:none; }
/* F4 */
.f4{ width:236px; display:grid; gap:14px; }
.f4-v{ font-size:13px; color:var(--muted); }
.f4-v b{ color:var(--ink); font-size:18px; font-variant-numeric:tabular-nums; }
.f4-tr{ position:relative; height:6px; margin:0 8px; border-radius:3px; background:var(--line); }
.f4-fill{ position:absolute; inset:0; border-radius:3px; background:var(--ink); transform-origin:left; }
.f4-tr i{ position:absolute; top:12px; width:2px; height:6px; margin-left:-1px; background:var(--line-2); border-radius:1px; }
.f4-th{ position:absolute; top:-11px; left:-14px; width:28px; height:28px; border-radius:999px; border:0; background:var(--card); box-shadow:0 0 0 1px var(--line-2), var(--shadow); cursor:grab; touch-action:none; }
.f4-ticks{ position:relative; height:16px; margin:0 8px; font-size:11px; color:var(--muted); font-variant-numeric:tabular-nums; }
.f4-ticks span{ position:absolute; transform:translateX(-50%); }
/* F5 */
.f5{ width:250px; padding:12px; display:grid; gap:6px; font-size:12.5px; line-height:1.55; }
.f5-g{ position:relative; display:grid; grid-template-rows:0fr; transition:grid-template-rows 200ms var(--ease-out); }
.f5.open .f5-g{ grid-template-rows:1fr; }
.f5-in{ min-height:3.1em; overflow:hidden; }
.f5-in p{ margin:0; color:var(--ink-2); }
.f5-g::after{ content:""; position:absolute; left:0; right:0; bottom:0; height:1.6em; background:linear-gradient(transparent, var(--card)); transition:opacity 200ms var(--ease-out); pointer-events:none; }
.f5.open .f5-g::after{ opacity:0; }
.f5-b{ justify-self:start; display:inline-flex; align-items:center; gap:4px; border:0; background:transparent; padding:4px 0; font-size:12.5px; font-weight:600; cursor:pointer; }
.f5-b .ic{ transition:transform 200ms var(--ease-out); }
.f5.open .f5-b .ic{ transform:rotate(180deg); }
/* F9 */
.f9{ width:230px; height:190px; overflow-y:auto; padding:0 10px; scrollbar-width:none; }
.f9::-webkit-scrollbar{ display:none; }
.f9-c{ position:sticky; height:118px; margin-bottom:14px; border-radius:12px; background:var(--card); border:1px solid var(--line); padding:12px; display:grid; align-content:start; gap:6px; transform-origin:50% 0; overflow:hidden; }
.f9-c small{ color:var(--muted); font-size:11px; }
.f9-c b{ font-size:14px; }
.f9-c i{ display:block; width:28px; height:28px; border-radius:8px; }
.f9-dim{ position:absolute; inset:0; background:#000; opacity:0; pointer-events:none; }
.f9-end{ height:60px; }
/* F10 */
.f10{ width:244px; display:flex; flex-wrap:wrap; gap:8px; justify-content:center; }
.f10-t{ height:32px; padding:0 12px; border-radius:999px; border:1px solid var(--line-2); background:var(--card); font-size:13px; display:inline-flex; align-items:center; gap:0; cursor:pointer; }
.f10-t .ic{ width:0; opacity:0; transition:opacity 150ms var(--ease-out); }
.f10-t[aria-pressed="true"]{ background:var(--ink); color:var(--bg); border-color:var(--ink); padding:0 14px 0 10px; gap:4px; }
.f10-t[aria-pressed="true"] .ic{ width:14px; height:14px; opacity:1; }
/* F11 */
.f11{ width:240px; display:grid; gap:6px; }
.f11-l{ font-size:12px; color:var(--ink-2); font-weight:600; }
.f11-box{ position:relative; }
.f11-in{ width:100%; height:40px; border-radius:10px; border:1.5px solid var(--line-2); background:var(--card); padding:0 34px 0 12px; font-size:16px; outline:none; transition:border-color 150ms ease, box-shadow 150ms ease; }
.f11-in:focus, .f11-in:focus-visible, .f11-in.focus{ border-color:var(--ink-2); box-shadow:0 0 0 3px var(--line); }
.f11-in.err{ border-color:var(--err); }
.f11-in.ok{ border-color:var(--ok); }
.f11-ok{ position:absolute; right:10px; top:11px; color:var(--ok); opacity:0; transform:scale(.9); transition:opacity 150ms var(--ease-out), transform 150ms var(--ease-out); }
.f11-ok .ic{ width:18px; height:18px; }
.f11-ok.on{ opacity:1; transform:none; }
.f11-msg{ font-size:12px; min-height:2.8em; color:var(--err); opacity:0; transition:opacity 150ms var(--ease-out); }
.f11-msg.on{ opacity:1; }
/* F14 */
.f14{ display:flex; align-items:center; gap:10px; font-size:20px; font-weight:600; }
.f14-b{ position:relative; width:56px; height:56px; border-radius:999px; border:0; background:var(--card); box-shadow:0 0 0 1px var(--line); cursor:pointer; display:grid; place-items:center; }
.f14-h{ position:relative; width:26px; height:26px; color:var(--ink-2); }
.f14-h .ic{ position:absolute; inset:0; width:26px; height:26px; }
.f14-f{ color:var(--accent); opacity:0; transition:opacity 150ms ease; }
.f14-b[aria-pressed="true"] .f14-f{ opacity:1; }
.f14-d{ position:absolute; left:50%; top:50%; width:6px; height:6px; margin:-3px; border-radius:999px; background:var(--accent); opacity:0; pointer-events:none; }
/* F16 */
.f16{ width:250px; display:flex; align-items:center; justify-content:space-between; gap:8px; padding:10px 8px 10px 12px; }
.f16 small{ display:block; font-size:11px; color:var(--muted); }
.f16-t{ font:13px/1.4 var(--mono); font-variant-numeric:tabular-nums; }
.f16-b{ flex:none; display:inline-flex; align-items:center; gap:6px; height:32px; padding:0 10px; border-radius:8px; border:1px solid var(--line-2); background:var(--card); font-size:12px; cursor:pointer; }
.f16-i{ position:relative; width:16px; height:16px; }
.f16-i .ic{ position:absolute; inset:0; width:16px; height:16px; transition:opacity 150ms var(--ease-out), transform 150ms var(--ease-out); }
.f16-ck{ opacity:0; transform:scale(.9); color:var(--ok); }
.f16-l{ display:grid; } .f16-l > span{ grid-area:1 / 1; transition:opacity 150ms var(--ease-out); }
.f16-z{ opacity:0; }
.f16-b.done .f16-cp{ opacity:0; } .f16-b.done .f16-ck{ opacity:1; transform:none; }
.f16-b.done .f16-a{ opacity:0; } .f16-b.done .f16-z{ opacity:1; }
.f16-err{ position:absolute; left:16px; right:16px; bottom:18px; text-align:center; font-size:12px; color:var(--err); }
`);

/* 数字翻牌：只翻变了的那一位，多了往上翻、少了往下翻（G3 的做法，250ms --ease-out） */
GL.roller = (el, value) => {
  let cur = value; el.classList.add('roll');
  const flat = (v) => [...String(v)].map((c) => `<span class="dg"><span class="ph">0</span><span class="a">${c}</span></span>`).join('');
  el.innerHTML = flat(value);
  return {
    get:() => cur,
    set(v) {
      const p = cur; cur = v; if (v === p) return;
      if (GL.reduce.matches) { el.innerHTML = flat(v); return; }
      const L = Math.max(String(v).length, String(p).length), s = String(v).padStart(L, ' '), q = String(p).padStart(L, ' '), up = v > p;
      el.innerHTML = [...s].map((c, i) => c === q[i] ? `<span class="dg"><span class="ph">0</span><span class="a">${c}</span></span>`
        : `<span class="dg"><span class="ph">0</span><span class="a">${q[i]}</span><span class="b" style="transform:translateY(${up ? 100 : -100}%)">${c}</span></span>`).join('');
      el.querySelectorAll('.dg').forEach((d) => { if (!d.querySelector('.b')) return;
        d.querySelectorAll('.a, .b').forEach((x) => x.animate([{ transform:x.style.transform || 'translateY(0)' }, { transform:`translateY(${x.classList.contains('a') ? (up ? -100 : 100) : 0}%)` }], { duration:250, easing:CSS.out, fill:'forwards' })); });
      clearTimeout(el._t); el._t = setTimeout(() => { if (cur === v) el.innerHTML = flat(v); }, 270);
    },
  };
};

const sec = { id:'motion', kind:'motion', short:'交互动效', title:'交互动效', note:'建议卡第 1 项从这里挑。先加组件和控件反馈，再加页面级和手势，最后才加动效质感。这里列的是挑配方表里「先用」那一列，一共 45 个。', subs:[] };
GL.sections.push(sec);
const comp = { title:'组件', items:[] }, fb = { title:'控件反馈', items:[] };
sec.subs.push(comp, fb);
const check = '<span class="box"><svg viewBox="0 0 16 16"><path d="M3 8.5 L6.5 12 L13 4.5"/></svg></span>';

/* ---------------- C1 重叠头像堆 ---------------- */
comp.items.push({ code:'C1', name:'重叠头像堆', use:'成员、参与者列表：叠在一起省地方，点开散开看名字', hint:'点一下头像堆', mount(stage) {
  const ppl = [['林', '#C8553D', '林小雨'], ['陈', '#2A8C82', '陈大伟'], ['王', '#9A7B12', '王佳'], ['周', '#5468D4', '周敏'], ['吴', '#8E4FC8', '吴杰']];
  stage.innerHTML = `<button class="c1" type="button" aria-expanded="false" aria-label="8 位成员，点开看名字">${ppl.map(([a, c, n]) => `<span class="c1-p"><span class="c1-av" style="background:${c}">${a}</span><span class="c1-n">${n}</span></span>`).join('')}<span class="c1-p"><span class="c1-av c1-more">+3</span><span class="c1-n">还有 3 位</span></span></button>`;
  const btn = stage.querySelector('.c1'), ps = [...btn.querySelectorAll('.c1-p')], names = ps.map((p) => p.querySelector('.c1-n'));
  const pos = (open) => { const step = open ? 40 : 21, x0 = (240 - (step * (ps.length - 1) + 32)) / 2; return ps.map((_, i) => x0 + i * step); };
  const sp = ps.map((p, i) => new Spring(pos(false)[i], { onUpdate:(x) => { p.style.transform = `translateX(${x}px)`; } }));
  sp.forEach((s) => s.onUpdate(s.x));
  let open = false; const q = seq(), pq = seq();
  const set = async (o) => {
    open = o; btn.setAttribute('aria-expanded', o); const s = q.begin(), target = pos(o);
    if (!o) names.forEach((n) => { n.style.opacity = 0; });
    const order = o ? ps.map((_, i) => i) : ps.map((_, i) => ps.length - 1 - i);
    for (const [k, i] of order.entries()) { if (k && !await s.sleep(30)) return; sp[i].to(target[i]); }
    if (o && await s.sleep(400)) names.forEach((n) => { n.style.opacity = 1; });
  };
  btn.addEventListener('click', () => set(!open));
  return {
    async play() { const s = pq.begin(); if (open) { set(false); if (!await s.sleep(500)) return; } set(true); if (await s.sleep(2400)) set(false); },
    final() { open = true; btn.setAttribute('aria-expanded', true); pos(true).forEach((x, i) => sp[i].jump(x)); names.forEach((n) => { n.style.opacity = 1; }); },
  };
} });

/* ---------------- C2 进度底色 ---------------- */
comp.items.push({ code:'C2', name:'进度底色', use:'待办、清单、开店引导：做完一件，背景颜色往前推一点', hint:'点一行打勾', mount(stage) {
  const items = ['上传营业执照', '填写收款账户', '上架第一个商品'];
  stage.innerHTML = `<div class="c2"><span class="c2-fill"></span>${items.map((t) => `<button class="c2-row" type="button" aria-pressed="false">${check}<span class="c2-t">${t}</span></button>`).join('')}</div>`;
  const fill = stage.querySelector('.c2-fill'), rows = [...stage.querySelectorAll('.c2-row')];
  const sync = () => { const n = rows.filter((r) => r.getAttribute('aria-pressed') === 'true').length; fill.style.transform = `scaleX(${n / rows.length})`; };
  const set = (r, on) => { r.setAttribute('aria-pressed', on); r.querySelector('.box').classList.toggle('on', on); sync(); };
  rows.forEach((r) => r.addEventListener('click', () => set(r, r.getAttribute('aria-pressed') !== 'true')));
  const pq = seq();
  return {
    async play() { const s = pq.begin(); rows.forEach((r) => set(r, false)); for (const r of rows) { if (!await s.sleep(650)) return; set(r, true); } },
    final() { rows.forEach((r) => set(r, true)); },
  };
} });

/* ---------------- C3 横向手风琴 ---------------- */
comp.items.push({ code:'C3', name:'横向手风琴', use:'几家店、几个方案要对比，但一次只看一个的详情', hint:'点一条，或用 ← →', mount(stage) {
  const d = [['A 店', '48.2k', '+12%', [5, 7, 6, 9, 8]], ['B 店', '31.5k', '−4%', [6, 5, 5, 4, 5]], ['C 店', '56.9k', '+21%', [4, 6, 7, 8, 10]], ['D 店', '22.4k', '+3%', [3, 4, 3, 5, 4]]];
  stage.innerHTML = `<div class="c3" role="group" aria-label="四家店本周销售">${d.map(([n, v, c, b], i) => `<button class="c3-p" type="button" aria-expanded="${i === 0}"><span class="c3-n">${n}</span><span class="c3-b"><b>RM ${v}</b><span>比上周 ${c}</span><span class="c3-bars">${b.map((h) => `<i style="height:${h * 10}%"></i>`).join('')}</span></span></button>`).join('')}</div>`;
  const ps = [...stage.querySelectorAll('.c3-p')], bodies = ps.map((p) => p.querySelector('.c3-b'));
  let cur = 0; bodies[0].style.opacity = 1; const q = seq(), pq = seq();
  const go = async (i) => {
    if (i === cur) return; const s = q.begin(), wasOpen = bodies[cur].style.opacity === '1'; cur = i;
    bodies.forEach((b) => { b.style.transitionDelay = '0ms'; b.style.opacity = 0; });
    if (wasOpen && !await s.sleep(150)) return;            // 先淡出旧的内容，再收窄
    ps.forEach((p, k) => p.setAttribute('aria-expanded', k === i));
    bodies[i].style.transitionDelay = '150ms'; bodies[i].style.opacity = 1;   // 新的内容晚 150ms 淡入
  };
  ps.forEach((p, i) => p.addEventListener('click', () => go(i)));
  stage.querySelector('.c3').addEventListener('keydown', (e) => {
    const k = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0; if (!k) return;
    e.preventDefault(); const n = clamp(cur + k, 0, ps.length - 1); ps[n].focus(); go(n);
  });
  return { async play() { const s = pq.begin(); go(2); if (!await s.sleep(1200)) return; go(1); if (!await s.sleep(1200)) return; go(0); } };
} });

/* ---------------- C7 搜索框就地展开 ---------------- */
comp.items.push({ code:'C7', name:'搜索框就地展开', use:'顶栏空间不够的搜索入口：点一下原地变成输入框，不跳页', hint:'点放大镜，Esc 收起', mount(stage) {
  stage.innerHTML = `<div class="c7-bar d-card"><span class="c7-t">订单</span><div class="c7"><button class="c7-b" type="button" aria-label="搜索订单" aria-expanded="false">${icon('search')}</button><input class="c7-i" id="c7-in" type="search" placeholder="搜订单号、客户" aria-label="搜索订单" tabindex="-1"></div></div>`;
  const bar = stage.querySelector('.c7-bar'), box = stage.querySelector('.c7'), btn = stage.querySelector('.c7-b'), inp = stage.querySelector('.c7-i');
  let anim = null, open = false; const pq = seq();
  const widthTo = (w) => { const from = box.getBoundingClientRect().width; anim && anim.cancel(); box.style.width = w + 'px';
    anim = box.animate([{ width:from + 'px' }, { width:w + 'px' }], { duration:Math.max(1, 250 * Math.abs(w - from) / 202), easing:CSS.out }); return anim.finished.catch(() => {}); };
  const set = async (o, auto) => {
    if (o === open) return; open = o; btn.setAttribute('aria-expanded', o); bar.classList.toggle('open', o); inp.tabIndex = o ? 0 : -1;
    if (o) { await widthTo(238); if (open && !auto) inp.focus({ preventScroll:true }); }   // 展开完再聚焦，手机才不会边展开边弹键盘
    else { inp.blur(); widthTo(36); }
  };
  btn.addEventListener('click', () => set(!open));
  inp.addEventListener('keydown', (e) => { if (e.key === 'Escape') { set(false); btn.focus(); } });
  inp.addEventListener('blur', () => { if (!inp.value) setTimeout(() => { if (document.activeElement !== inp && document.activeElement !== btn) set(false); }, 0); });
  return { async play(auto) { const s = pq.begin(); set(true, auto); if (await s.sleep(1600)) set(false); } };
} });

/* ---------------- C9 按钮原地显示提交状态 ---------------- */
comp.items.push({ code:'C9', name:'按钮原地显示提交状态', use:'保存、提交、付款：转圈和对勾都在按钮里，宽度不跳', hint:'点保存', mount(stage) {
  stage.innerHTML = `<button class="d-btn c9" type="button"><span class="c9-l">保存更改</span><span class="c9-sp" aria-hidden="true"></span><span class="c9-ok" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>已保存</span></button><span class="sr" role="status"></span>`;
  const btn = stage.querySelector('.c9'), ok = stage.querySelector('.c9-ok'), st = stage.querySelector('[role=status]');
  const pop = new Spring(1, { preset:'pop', eps:0.001, onUpdate:(v) => { ok.style.transform = `scale(${v})`; } });
  const q = seq();
  const run = async () => {
    if (btn.classList.contains('busy')) return; const s = q.begin();
    btn.className = 'd-btn c9 busy'; btn.setAttribute('aria-disabled', 'true'); st.textContent = '正在保存';
    if (!await s.sleep(900)) return;
    btn.className = 'd-btn c9 ok'; pop.jump(0.85); pop.to(1); st.textContent = '已保存';
    if (!await s.sleep(1500)) return;
    btn.className = 'd-btn c9'; btn.removeAttribute('aria-disabled'); st.textContent = '';
  };
  btn.addEventListener('click', run);
  return { play:run };
} });

/* ---------------- C12 顶栏随滚动收起 ---------------- */
comp.items.push({ code:'C12', name:'顶栏随滚动收起', use:'内容页：往下看时顶栏让出位置，往回滑 20px 就回来', hint:'在框里上下滚', mount(stage) {
  stage.innerHTML = `<div class="d-phone"><div class="c12-bar"><b>附近好店</b>${icon('search')}</div><div class="c12-sc" tabindex="0" aria-label="店铺列表，可以滚动">${Array.from({ length:10 }, (_, i) => `<div class="c12-it"><i></i><span class="d-sk" style="width:${58 + (i * 13) % 32}%"></span><span class="d-sk" style="width:38%"></span></div>`).join('')}</div></div>`;
  const sc = stage.querySelector('.c12-sc'), bar = stage.querySelector('.c12-bar'), H = 36;
  let off = 0, last = 0, dir = 0, run = 0;
  sc.addEventListener('scroll', () => {
    const st = sc.scrollTop, d = st - last; last = st;
    if (st <= 0) { off = 0; run = 0; }
    else { const nd = Math.sign(d); if (nd && nd !== dir) { dir = nd; run = 0; } run += Math.abs(d); if (run > 20) off = clamp(off + d, 0, H); }
    bar.style.transform = `translateY(${-off}px)`; [...bar.children].forEach((c) => { c.style.opacity = 1 - off / H; });
  }, { passive:true });
  const pq = seq();
  return { async play() { const s = pq.begin(); sc.scrollTo({ top:0 }); sc.scrollTo({ top:280, behavior:'smooth' }); if (!await s.sleep(1300)) return; sc.scrollTo({ top:210, behavior:'smooth' }); if (!await s.sleep(1000)) return; sc.scrollTo({ top:0, behavior:'smooth' }); } };
} });

/* ---------------- C16 就地确认删除 ---------------- */
comp.items.push({ code:'C16', name:'就地确认删除', use:'删一行、移除成员这类小事：按钮原地变成「确认删除」，不弹窗，删完能撤销', hint:'点删除，再点确认', mount(stage) {
  stage.innerHTML = `<div class="c16"><div class="c16-w"><div class="c16-in"><div class="c16-row d-card"><span>十一月周报（草稿）</span><button class="c16-b" type="button" aria-live="polite"><span class="t1">删除</span><span class="t2">确认删除</span></button></div></div></div><div class="c16-row d-card"><span>客户回访记录</span><span class="c16-tag">已发布</span></div></div><div class="c16-toast" role="status"><span>已删除草稿</span><button type="button" class="c16-u">撤销</button></div>`;
  const b = stage.querySelector('.c16-b'), wrap = stage.querySelector('.c16-w'), toast = stage.querySelector('.c16-toast'), undo = stage.querySelector('.c16-u');
  let ask = 0, timer = 0, tt = 0;
  const morph = (w) => { const from = b.getBoundingClientRect().width; b.style.width = w + 'px'; b.animate([{ width:from + 'px' }, { width:w + 'px' }], { duration:200, easing:CSS.out }); };
  const reset = () => { if (!ask) return; ask = 0; clearTimeout(timer); b.classList.remove('ask'); morph(52); };
  const askNow = () => { ask = performance.now(); b.classList.add('ask'); morph(80); clearTimeout(timer); timer = setTimeout(reset, 4000); };
  const del = () => { reset(); wrap.classList.add('gone'); toast.classList.add('show'); clearTimeout(tt); tt = setTimeout(() => toast.classList.remove('show'), 4000); };
  const restore = () => { wrap.classList.remove('gone'); toast.classList.remove('show'); clearTimeout(tt); };
  b.addEventListener('click', () => { if (!ask) return askNow(); if (performance.now() - ask < 300) return; del(); });   // 变成确认态的前 300ms 不接受点击
  undo.addEventListener('click', restore);
  b.addEventListener('keydown', (e) => { if (e.key === 'Escape') reset(); });
  document.addEventListener('pointerdown', (e) => { if (ask && !b.contains(e.target)) reset(); });
  const pq = seq();
  return { async play() { const s = pq.begin(); restore(); reset(); if (!await s.sleep(300)) return; askNow(); if (!await s.sleep(1300)) return; del(); if (!await s.sleep(1900)) return; restore(); } };
} });

/* ---------------- C19 选中后长出操作条 ---------------- */
comp.items.push({ code:'C19', name:'选中后长出操作条', use:'表格、文件、邮件的批量操作：勾第一项时长出来，取消完收回去', hint:'勾几行；Esc 全部取消', mount(stage) {
  const rows = ['合同-丰源贸易.pdf', '报价单-十一月.xlsx', '发票-0428.pdf', '会议纪要.docx'];
  stage.innerHTML = `<div class="c19-list">${rows.map((r) => `<button class="c19-r" type="button" role="checkbox" aria-checked="false">${check}<span>${r}</span></button>`).join('')}</div><div class="c19-bar" role="toolbar" aria-label="批量操作"><span>已选 <b class="c19-c"></b> 项</span><button type="button" class="c19-a">下载</button><button type="button" class="c19-a c19-main">归档</button></div><span class="sr" aria-live="polite"></span>`;
  const rs = [...stage.querySelectorAll('.c19-r')], bar = stage.querySelector('.c19-bar'), live = stage.querySelector('[aria-live]');
  const n = GL.roller(stage.querySelector('.c19-c'), 0);
  const sync = () => { const k = rs.filter((r) => r.getAttribute('aria-checked') === 'true').length; n.set(k); bar.classList.toggle('show', k > 0); live.textContent = k ? `已选 ${k} 项` : ''; };
  const set = (r, on) => { r.setAttribute('aria-checked', on); r.querySelector('.box').classList.toggle('on', on); };
  rs.forEach((r) => r.addEventListener('click', () => { set(r, r.getAttribute('aria-checked') !== 'true'); sync(); }));
  stage.addEventListener('keydown', (e) => { if (e.key === 'Escape') { rs.forEach((r) => set(r, false)); sync(); } });
  const pq = seq();
  return { async play() { const s = pq.begin(); rs.forEach((r) => set(r, false)); sync(); for (const i of [0, 1, 2]) { if (!await s.sleep(i ? 550 : 300)) return; set(rs[i], true); sync(); } if (!await s.sleep(1300)) return; rs.forEach((r) => set(r, false)); sync(); } };
} });

/* ---------------- C20 按钮展开成验证码 ---------------- */
comp.items.push({ code:'C20', name:'按钮展开成验证码', use:'登录、绑手机：点「发送验证码」，按钮原地长成 6 个格子，输完自动提交', hint:'点按钮，输入下面那串数字', mount(stage) {
  stage.innerHTML = `<div class="c20"><div class="c20-cap">手机号 138 **** 8899</div><div class="c20-pill"><button class="c20-send d-btn" type="button">发送验证码</button><div class="c20-cells" aria-hidden="true">${'<i></i>'.repeat(6)}</div><input class="c20-in" id="c20-in" inputmode="numeric" autocomplete="one-time-code" maxlength="6" aria-label="6 位验证码"><div class="c20-st"><span class="c20-sp"></span><svg class="c20-ck" viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg><span class="c20-stt">验证中</span></div></div><div class="c20-msg" aria-live="polite"></div></div>`;
  const pill = stage.querySelector('.c20-pill'), send = stage.querySelector('.c20-send'), inp = stage.querySelector('.c20-in'), cells = [...stage.querySelectorAll('.c20-cells i')];
  const msg = stage.querySelector('.c20-msg'), stt = stage.querySelector('.c20-stt'), ck = stage.querySelector('.c20-ck');
  const CODE = '246810'; let tries = 3, sec = 60, tick = 0, shake = null; const q = seq(), pq = seq();
  const pop = new Spring(1, { preset:'pop', eps:0.001, onUpdate:(v) => { ck.style.transform = `scale(${v})`; } });
  const widthTo = (w) => { const from = pill.getBoundingClientRect().width; pill.style.width = w + 'px'; return pill.animate([{ width:from + 'px' }, { width:w + 'px' }], { duration:250, easing:CSS.out }).finished.catch(() => {}); };
  const hint = () => { msg.className = 'c20-msg'; msg.textContent = `收到的验证码 ${CODE}（示例）· ${sec ? sec + ' 秒后可重发' : '可以重新发送'}`; };
  const draw = () => { const v = inp.value; cells.forEach((c, i) => { c.textContent = v[i] || ''; c.classList.toggle('cur', document.activeElement === inp && i === Math.min(v.length, 5)); }); };
  const showCells = () => cells.forEach((c, i) => c.animate([{ opacity:0, transform:'scale(.9)' }, { opacity:1, transform:'none' }], { duration:150, delay:i * 30, easing:CSS.out, fill:'both' }));
  const hideCells = () => cells.forEach((c) => c.animate([{ opacity:1 }, { opacity:0 }], { duration:150, easing:CSS.out, fill:'both' }));
  const open = async (auto) => {
    const s = q.begin(); pill.className = 'c20-pill cells'; inp.value = ''; draw();
    clearInterval(tick); sec = 60; hint(); tick = setInterval(() => { sec = Math.max(0, sec - 1); if (!msg.classList.contains('err')) hint(); }, 1000);
    await widthTo(234); if (!s.alive()) return; showCells(); if (!auto) inp.focus({ preventScroll:true }); draw();
  };
  const verify = async () => {
    const s = q.begin(); inp.blur(); hideCells(); pill.className = 'c20-pill busy'; stt.textContent = '验证中'; await widthTo(112); if (!await s.sleep(650)) return;
    if (inp.value === CODE) { pill.className = 'c20-pill ok'; stt.textContent = '验证通过'; widthTo(132); pop.jump(0.85); pop.to(1); clearInterval(tick); msg.className = 'c20-msg'; msg.textContent = '正在进入下一步…'; return; }
    tries--; pill.className = 'c20-pill err'; await widthTo(234); if (!s.alive()) return; showCells();
    shake = pill.animate([{ transform:'translateX(0)' }, { transform:'translateX(-4px)' }, { transform:'translateX(4px)' }, { transform:'translateX(0)' }], { duration:250, easing:CSS.inOut });
    msg.className = 'c20-msg err'; msg.textContent = `验证码不对，还能试 ${tries} 次`; inp.value = ''; draw();
  };
  inp.addEventListener('input', () => { shake && shake.cancel(); inp.value = inp.value.replace(/\D/g, '').slice(0, 6); if (pill.classList.contains('err')) pill.className = 'c20-pill cells'; draw(); if (inp.value.length === 6) verify(); });
  inp.addEventListener('focus', draw); inp.addEventListener('blur', draw);
  send.addEventListener('click', () => open(false));
  const reset = () => { q.begin(); clearInterval(tick); tries = 3; pill.className = 'c20-pill'; pill.style.width = '132px'; cells.forEach((c) => c.getAnimations().forEach((a) => a.cancel())); inp.value = ''; draw(); msg.textContent = ''; };
  const type = async (s, str) => { for (const ch of str) { if (!await s.sleep(130)) return false; inp.value += ch; inp.dispatchEvent(new Event('input')); } return true; };
  return {
    async play(auto) { const s = pq.begin(); reset(); if (!await s.sleep(300)) return; open(true); if (!await s.sleep(500)) return;
      if (!await type(s, '246801')) return; if (!await s.sleep(1300)) return; if (!await type(s, CODE)) return; if (!await s.sleep(2600)) return; reset(); },
    final() { pill.className = 'c20-pill ok'; pill.style.width = '132px'; stt.textContent = '验证通过'; msg.textContent = '正在进入下一步…'; },
  };
} });

/* ---------------- C21 流式文字晕开 ---------------- */
comp.items.push({ code:'C21', name:'流式文字晕开', use:'AI 回答一批批到达：每个字从模糊到清楚，看得出还在写', hint:'点回答区直接写完', mount(stage) {
  const text = '建议把「今天收入」放到最大，三个次要指标收进一行。老板打开先看到结论，往下才是明细；手机上明细收进能展开的卡片。';
  stage.innerHTML = `<div class="c21"><div class="c21-q">首页怎么排？</div><div class="c21-a" aria-live="polite" aria-busy="false"><p></p></div></div><button class="c21-stop" type="button">停止</button>`;
  const a = stage.querySelector('.c21-a'), p = a.querySelector('p'), stop = stage.querySelector('.c21-stop');
  let pos = 0, timer = 0, cur = null, gen = 0; const sizes = [3, 5, 2, 6, 4, 3, 5];
  const end = () => { clearTimeout(timer); a.setAttribute('aria-busy', 'false'); cur && cur.remove(); cur = null; stop.hidden = true; };
  const finish = () => { gen++; p.textContent = text; pos = text.length; a.classList.add('fin'); end(); };
  const batch = () => {
    if (pos >= text.length) return end();
    const n = sizes[(pos / 3 | 0) % sizes.length], chunk = text.slice(pos, pos + n); pos += chunk.length;
    const g = gen;
    requestAnimationFrame(() => {                       // 每帧最多放出一批；每批从 0 开始数，30ms 一个，第 10 个以后一起出现
      if (g !== gen) return;
      const frag = document.createDocumentFragment();
      [...chunk].forEach((ch, i) => { const s = document.createElement('span'); s.className = 'ink'; s.style.setProperty('--i', Math.min(i, 9)); s.textContent = ch; frag.append(s); });
      p.insertBefore(frag, cur);
    });
    timer = setTimeout(batch, 90 + (pos % 4) * 25);
  };
  const start = () => { end(); gen++; p.textContent = ''; pos = 0; a.classList.remove('fin'); cur = document.createElement('span'); cur.className = 'c21-cur'; cur.setAttribute('aria-hidden', 'true'); p.append(cur); a.setAttribute('aria-busy', 'true'); stop.hidden = false; batch(); };
  a.addEventListener('click', finish);
  stop.addEventListener('click', end);
  stage.addEventListener('keydown', (e) => { if (e.key === 'Escape') finish(); });
  stop.hidden = true;
  return { play:start, final() { p.textContent = text; pos = text.length; end(); } };
} });

/* ---------------- F2 拖拽排序让位 ---------------- */
fb.items.push({ code:'F2', name:'拖拽排序让位', use:'待办、歌单、看板排序：拖到一半，别的行也停在半路，不是过了中线才跳', hint:'拖一行，手机拖把手；键盘按 ↑ ↓', mount(stage) {
  const names = ['周一例会', '整理报价', '回客户邮件', '发周报'];
  stage.innerHTML = `<div class="f2">${names.map((n) => `<div class="f2-r d-card"><span>${n}</span><button class="f2-h" type="button" aria-label="排序：${n}，按上下键移动">⋮⋮</button></div>`).join('')}</div>`;
  const rows = [...stage.querySelectorAll('.f2-r')], H = 36, P = 42;
  let order = rows.map((_, i) => i), cur = null;
  const paint = (i, y) => { rows[i].style.transform = `translateY(${y}px)${rows[i].classList.contains('up') ? ' scale(1.02)' : ''}`; };
  const sp = rows.map((_, i) => new Spring(i * P, { onUpdate:(y) => paint(i, y) }));
  sp.forEach((s, i) => paint(i, s.x));
  const slot = (r) => order.indexOf(r);
  const layout = (r, cy) => {                        // 让位量按拖动行中心的位置连续算
    const from = slot(r); let to = from;
    order.forEach((ri, k) => {
      if (ri === r) return;
      if (k > from) { const p = clamp((cy - k * P) / H, 0, 1); sp[ri].to(k * P - P * p); if (p > 0.5) to++; }
      else { const p = clamp((k * P + H - cy) / H, 0, 1); sp[ri].to(k * P + P * p); if (p > 0.5) to--; }
    });
    return to;
  };
  const lift = (r) => { cur = { r, y0:sp[r].x, to:slot(r) }; sp[r].stop(); rows[r].classList.add('up'); paint(r, sp[r].x); };
  const moveBy = (dy) => { const y = clamp(cur.y0 + dy, -10, (rows.length - 1) * P + 10); sp[cur.r].x = y; paint(cur.r, y); cur.to = layout(cur.r, y + H / 2); };
  const drop = () => {
    if (!cur) return; const { r, to } = cur; cur = null; order.splice(slot(r), 1); order.splice(to, 0, r);
    sp[r].onRest = () => { rows[r].classList.remove('up'); paint(r, sp[r].x); sp[r].onRest = null; };
    order.forEach((ri, k) => sp[ri].to(k * P));
  };
  rows.forEach((row, r) => {
    drag(row, { down:(e) => { if (e.pointerType !== 'mouse' && !e.target.closest('.f2-h')) return false; lift(r); }, move:(e, dx, dy) => cur && moveBy(dy), up:drop });
    row.querySelector('.f2-h').addEventListener('keydown', (e) => {
      const k = e.key === 'ArrowDown' ? 1 : e.key === 'ArrowUp' ? -1 : 0; if (!k) return; e.preventDefault();
      const from = slot(r), to = clamp(from + k, 0, rows.length - 1); order.splice(from, 1); order.splice(to, 0, r); order.forEach((ri, j) => sp[ri].to(j * P));
    });
  });
  const pq = seq();
  return { async play() { const s = pq.begin(); const r = order[0]; lift(r); await tween(800, EASE.inOut, (p) => cur && cur.r === r && moveBy(p * P * 2.2)); if (!s.alive()) return; await s.sleep(200); drop(); } };
} });

/* ---------------- F3 批量勾选接力 ---------------- */
fb.items.push({ code:'F3', name:'批量勾选接力', use:'点全选，勾一个接一个跑过去：每条差 30ms，看得出是一串', hint:'点全选', mount(stage) {
  const items = ['林小雨', '陈大伟', '王佳', '周敏'];
  stage.innerHTML = `<div class="c2">${items.map((t) => `<div class="c2-row" style="height:32px">${check}<span>${t}</span></div>`).join('')}<button class="c2-row" type="button" style="justify-content:center;height:32px;background:var(--card)">全选</button></div>`;
  const boxes = [...stage.querySelectorAll('.box')], btn = stage.querySelector('button');
  let on = false;
  const run = () => { on = !on; btn.textContent = on ? '取消全选' : '全选';
    boxes.forEach((b, i) => setTimeout(() => { b.classList.toggle('on', on); if (on) b.animate([{ transform:'scale(.9)' }, { transform:'scale(1.08)' }, { transform:'none' }], { duration:300, easing:CSS.out }); }, i * 30)); };
  btn.addEventListener('click', run);
  return { async play() { if (on) { run(); await GL.sleep(500); } run(); }, final() { if (!on) { on = true; btn.textContent = '取消全选'; boxes.forEach((b) => b.classList.add('on')); } } };
} });

/* ---------------- F4 滑杆惯性吸附 ---------------- */
fb.items.push({ code:'F4', name:'滑杆惯性吸附', use:'有档位的选择（音量档、金额档、评分）：甩一下，滑过头一点再拉回最近那档', hint:'拖或甩圆点；也能用 ← →', mount(stage) {
  const N = 5, W = 220, step = W / N;
  stage.innerHTML = `<div class="f4"><div class="f4-v">音量 <b class="f4-n">2</b> 档</div><div class="f4-tr"><div class="f4-fill"></div>${Array.from({ length:N + 1 }, (_, i) => `<i style="left:${i * step}px"></i>`).join('')}<button class="f4-th" type="button" role="slider" aria-label="音量档" aria-valuemin="0" aria-valuemax="5" aria-valuenow="2"></button></div><div class="f4-ticks">${Array.from({ length:N + 1 }, (_, i) => `<span style="left:${i * step}px">${i}</span>`).join('')}</div></div>`;
  const th = stage.querySelector('.f4-th'), fill = stage.querySelector('.f4-fill'), num = stage.querySelector('.f4-n');
  let target = 2;
  const show = (x) => { th.style.transform = `translateX(${x}px)`; fill.style.transform = `scaleX(${clamp(x / W, 0, 1)})`; };
  const sp = new Spring(target * step, { preset:'gesture', onUpdate:(x) => show(clamp(x, target * step - step / 2, target * step + step / 2)) });   // 过冲最多半档
  show(sp.x);
  const setTarget = (t) => { target = t; num.textContent = t; th.setAttribute('aria-valuenow', t); };
  const release = (x, vx) => { const t = clamp(Math.round(GL.project(x, vx * 1000) / step), 0, N); setTarget(t); sp.x = x; sp.to(t * step, vx * 1000); };
  let x0 = 0;
  drag(th, { down:() => { sp.stop(); x0 = sp.x; },
    move:(e, dx) => { let x = x0 + dx; if (x < 0) x = -GL.rubber(-x, W); if (x > W) x = W + GL.rubber(x - W, W); sp.x = x; show(x); },
    up:(e, dx, dy, v) => release(sp.x, v.vx) });
  th.addEventListener('keydown', (e) => { const k = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0; if (!k) return; e.preventDefault(); setTarget(clamp(target + k, 0, N)); sp.to(target * step); });
  const pq = seq();
  return { async play() { const s = pq.begin(); setTarget(1); sp.jump(step); if (!await s.sleep(300)) return; release(step * 1.3, 0.22); if (!await s.sleep(1300)) return; release(sp.x, -0.25); } };
} });

/* ---------------- F5 文本展开 ---------------- */
fb.items.push({ code:'F5', name:'文本展开', use:'长描述、FAQ：用 Grid 从 0fr 撑到 1fr，不用 JS 量高度', hint:'点「展开全文」', mount(stage) {
  stage.innerHTML = `<div class="f5 d-card"><b>商品说明</b><div class="f5-g" id="f5-g"><div class="f5-in"><p>手工研磨的阿拉比卡咖啡豆，中深烘焙，带一点坚果和可可的香气。每袋 250 克，开袋后建议两周内喝完。磨成粉后香气散得快，最好现喝现磨；冷萃用粗研磨，手冲用中细研磨。</p></div></div><button class="f5-b" type="button" aria-expanded="false" aria-controls="f5-g"><span>展开全文</span>${icon('chev')}</button></div>`;
  const box = stage.querySelector('.f5'), b = stage.querySelector('.f5-b');
  const set = (o) => { box.classList.toggle('open', o); b.setAttribute('aria-expanded', o); b.firstChild.textContent = o ? '收起' : '展开全文'; };
  b.addEventListener('click', () => set(!box.classList.contains('open')));
  const pq = seq();
  return { async play() { const s = pq.begin(); set(true); if (await s.sleep(1800)) set(false); }, final() { set(true); } };
} });

/* ---------------- F9 卡片堆叠滚动 ---------------- */
fb.items.push({ code:'F9', name:'卡片堆叠滚动', use:'时间线、落地页的特性卡：往下滚，前一张被压住、缩小一点', hint:'在框里往下滚', mount(stage) {
  const cards = [['第 1 步', '选好商品，放进购物车', '#F4A261'], ['第 2 步', '填地址，选配送时间', '#2A9D8F'], ['第 3 步', '付款，等商家接单', '#6D83F2'], ['第 4 步', '收到货，满意再确认', '#E07A5F']];
  stage.innerHTML = `<div class="f9" tabindex="0" aria-label="四步流程，可以滚动">${cards.map(([a, b, c], i) => `<div class="f9-c" style="top:${8 + i * 8}px"><span class="f9-dim"></span><i style="background:${c}"></i><small>${a}</small><b>${b}</b></div>`).join('')}<div class="f9-end"></div></div>`;
  const sc = stage.querySelector('.f9'), cs = [...sc.querySelectorAll('.f9-c')], CH = 118;
  const nat = cs.map((_, j) => j * (CH + 14)), top = cs.map((_, i) => 8 + i * 8);   // 卡片在内容里的原始位置：高 118 + 间距 14
  const paint = () => {
    const st = sc.scrollTop, p = cs.map((_, j) => clamp((st - (nat[j] - top[j] - CH)) / CH, 0, 1));
    cs.forEach((c, i) => { const n = p.slice(i + 1).reduce((a, b) => a + b, 0); c.style.transform = `scale(${Math.max(0.85, 1 - 0.05 * n)})`; c.firstChild.style.opacity = Math.min(0.08 * n, 0.24); });
  };
  sc.addEventListener('scroll', paint, { passive:true }); paint();
  const pq = seq();
  return { async play() { const s = pq.begin(); sc.scrollTo({ top:0 }); sc.scrollTo({ top:sc.scrollHeight, behavior:'smooth' }); if (await s.sleep(1900)) sc.scrollTo({ top:0, behavior:'smooth' }); } };
} });

/* ---------------- F10 标签选择挤开 ---------------- */
fb.items.push({ code:'F10', name:'标签选择挤开', use:'筛选标签：选中的真的变宽，旁边的让开；不是放大盖住别人', hint:'点几个标签', mount(stage) {
  const tags = ['全部', '新品', '包邮', '有货', '打折', '好评', '自提'];
  stage.innerHTML = `<div class="f10" role="group" aria-label="筛选">${tags.map((t) => `<button class="f10-t" type="button" aria-pressed="false">${icon('check')}<span>${t}</span></button>`).join('')}</div>`;
  const ts = [...stage.querySelectorAll('.f10-t')];
  const sp = ts.map((t) => new Spring(0, { onUpdate:(x) => { t.style.transform = x ? `translateX(${x}px)` : ''; } }));
  const toggle = (i) => {
    const before = ts.map((t) => t.getBoundingClientRect());
    ts[i].setAttribute('aria-pressed', ts[i].getAttribute('aria-pressed') !== 'true');
    ts.forEach((t, k) => {
      const a = t.getBoundingClientRect(), left = a.left - sp[k].x;
      if (Math.abs(a.top - before[k].top) > 4) { sp[k].jump(0); t.animate([{ opacity:0 }, { opacity:1 }], { duration:150, easing:CSS.out }); return; }   // 换行的那个淡入，不飞过去
      sp[k].x = before[k].left - left; sp[k].onUpdate(sp[k].x); sp[k].to(0);
    });
  };
  ts.forEach((t, i) => t.addEventListener('click', () => toggle(i)));
  const pq = seq();
  return { async play() { const s = pq.begin(); for (const i of [2, 4, 2]) { if (!await s.sleep(700)) return; toggle(i); } } };
} });

/* ---------------- F11 输入框状态反馈 ---------------- */
fb.items.push({ code:'F11', name:'输入框状态反馈', use:'表单：聚焦只变色；离开输入框才判对错，错了晃一次并写清原因', hint:'输入后点别处', mount(stage) {
  stage.innerHTML = `<div class="f11"><label class="f11-l" for="f11-in">邮箱</label><div class="f11-box"><input id="f11-in" class="f11-in" type="email" placeholder="name@shop.com" autocomplete="off" aria-describedby="f11-msg"><span class="f11-ok" aria-hidden="true">${icon('check')}</span></div><div class="f11-msg" id="f11-msg" aria-live="polite"></div></div>`;
  const inp = stage.querySelector('.f11-in'), box = stage.querySelector('.f11-box'), ok = stage.querySelector('.f11-ok'), msg = stage.querySelector('.f11-msg');
  let shake = null;
  const judge = () => {
    const v = inp.value.trim(); inp.classList.remove('err', 'ok'); ok.classList.remove('on'); msg.classList.remove('on');
    if (!v) return;
    if (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) { inp.classList.add('ok'); ok.classList.add('on'); return; }
    inp.classList.add('err'); msg.textContent = '邮箱 @ 后面不完整，例如 name@shop.com'; msg.classList.add('on');
    shake = box.animate([{ transform:'translateX(0)' }, { transform:'translateX(-4px)' }, { transform:'translateX(4px)' }, { transform:'translateX(0)' }], { duration:250, easing:CSS.inOut });
  };
  inp.addEventListener('blur', judge);
  inp.addEventListener('input', () => { shake && shake.cancel(); });
  const pq = seq();
  const type = async (s, str) => { for (const ch of str) { if (!await s.sleep(70)) return false; inp.value += ch; } return true; };
  return { async play(auto) {
    const s = pq.begin(); inp.value = ''; judge(); inp.classList.add('focus');
    if (!await type(s, 'lin@')) return; if (!await s.sleep(400)) return; inp.classList.remove('focus'); judge();
    if (!await s.sleep(1500)) return; inp.classList.add('focus'); if (!await type(s, 'shop.com')) return; if (!await s.sleep(400)) return; inp.classList.remove('focus'); judge();
  } };
} });

/* ---------------- F14 点赞爆开 ---------------- */
fb.items.push({ code:'F14', name:'点赞爆开', use:'点赞、收藏这类表达喜欢的低频操作：心弹一下，小点往外散，数字翻一位', hint:'点心形', mount(stage) {
  stage.innerHTML = `<div class="f14"><button class="f14-b" type="button" aria-pressed="false" aria-label="点赞"><span class="f14-h">${icon('heart', 'ic f14-o')}${icon('heart-f', 'ic f14-f')}</span>${'<i class="f14-d"></i>'.repeat(8)}</button><span class="f14-c"></span></div>`;
  const b = stage.querySelector('.f14-b'), h = stage.querySelector('.f14-h'), dots = [...stage.querySelectorAll('.f14-d')];
  const n = GL.roller(stage.querySelector('.f14-c'), 128);
  const pop = new Spring(1, { preset:'pop', eps:0.001, onUpdate:(v) => { h.style.transform = `scale(${v})`; } });
  const toggle = () => {
    const on = b.getAttribute('aria-pressed') !== 'true'; b.setAttribute('aria-pressed', on); n.set(n.get() + (on ? 1 : -1));
    if (!on) return;                                        // 取消只变色
    pop.jump(0.8); pop.to(1);
    dots.forEach((d, i) => { const a = i / dots.length * Math.PI * 2, r = 26;
      d.animate([{ opacity:1, transform:'translate(0,0) scale(1)' }, { opacity:0, transform:`translate(${Math.cos(a) * r}px, ${Math.sin(a) * r}px) scale(.6)` }], { duration:300, easing:CSS.out }); });
  };
  b.addEventListener('click', toggle);
  const pq = seq();
  return { async play() { const s = pq.begin(); if (b.getAttribute('aria-pressed') === 'true') { toggle(); if (!await s.sleep(500)) return; } toggle(); if (await s.sleep(1800)) toggle(); },
    final() { if (b.getAttribute('aria-pressed') !== 'true') { b.setAttribute('aria-pressed', 'true'); n.set(129); } } };
} });

/* ---------------- F16 复制成功对勾 ---------------- */
fb.items.push({ code:'F16', name:'复制成功对勾', use:'复制订单号、链接、代码：图标原地换成对勾，2.5 秒后自己换回，不弹', hint:'点复制', mount(stage) {
  stage.innerHTML = `<div class="f16 d-card"><div><small>订单号</small><code class="f16-t">SO-20261106-0428</code></div><button class="f16-b" type="button" aria-label="复制订单号"><span class="f16-i">${icon('copy', 'ic f16-cp')}${icon('check', 'ic f16-ck')}</span><span class="f16-l"><span class="f16-a">复制</span><span class="f16-z">已复制</span></span></button></div><span class="sr" role="status"></span><div class="f16-err" aria-live="polite"></div>`;
  const b = stage.querySelector('.f16-b'), code = stage.querySelector('.f16-t'), st = stage.querySelector('[role=status]'), err = stage.querySelector('.f16-err');
  let t = 0;
  const done = () => { b.classList.add('done'); st.textContent = '已复制'; err.textContent = ''; clearTimeout(t); t = setTimeout(() => { b.classList.remove('done'); st.textContent = ''; }, 2500); };   // 连点只重新计时
  b.addEventListener('click', () => {
    const fail = () => { const r = document.createRange(); r.selectNodeContents(code); const sel = getSelection(); sel.removeAllRanges(); sel.addRange(r); err.textContent = '复制失败，已帮你选中，按 Ctrl+C'; };
    try { navigator.clipboard.writeText(code.textContent).then(done, fail); } catch (e) { fail(); }
  });
  return { play:done };
} });
})();
