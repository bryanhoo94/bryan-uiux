/* 交互动效小样（二）：图表 D、手势 G、页面级 P、动效质感 M、网页效果 E。时长、曲线、spring 只用 references/core/params.md 里的值 */
(() => {
const { Spring, seq, drag, tween, EASE, CSS, clamp, icon } = GL;

GL.css(`
/* D1 */
.d1{ position:relative; width:150px; height:150px; cursor:pointer; }
.d1 svg{ transform:rotate(-90deg); }
.d1 circle{ fill:none; stroke-linecap:round; }
.d1-n{ position:absolute; inset:0; display:grid; place-items:center; font-size:26px; font-weight:700; font-variant-numeric:tabular-nums; }
/* D2 */
.d2{ position:relative; display:grid; gap:8px; }
.d2-g{ display:grid; grid-template-rows:repeat(7, 14px); grid-auto-flow:column; grid-auto-columns:14px; gap:3px; }
.d2-g button{ width:14px; height:14px; border-radius:3px; border:0; padding:0; cursor:pointer; background:var(--line); }
.d2-g button.l1{ background:color-mix(in srgb, var(--accent) 30%, var(--card)); }
.d2-g button.l2{ background:color-mix(in srgb, var(--accent) 52%, var(--card)); }
.d2-g button.l3{ background:color-mix(in srgb, var(--accent) 76%, var(--card)); }
.d2-g button.l4{ background:var(--accent); }
.d2-g button.today{ box-shadow:0 0 0 1.5px var(--ink); }
.d2-g button.future{ visibility:hidden; }
.d2-lg{ display:flex; align-items:center; gap:3px; justify-content:flex-end; font-size:11px; color:var(--muted); }
.d2-lg i{ width:10px; height:10px; border-radius:2px; }
.d2-pop{ position:absolute; z-index:3; background:var(--ink); color:var(--bg); font-size:12px; border-radius:8px; padding:5px 9px; white-space:nowrap; pointer-events:none; opacity:0; font-variant-numeric:tabular-nums; }
/* D3 */
.d3{ display:grid; justify-items:center; gap:2px; width:220px; cursor:pointer; }
.d3 text{ font:10px var(--sans); fill:var(--muted); }
.d3-ndl{ transform-box:view-box; transform-origin:110px 112px; }
.d3-v{ font-size:12px; color:var(--muted); }
.d3-v b{ font-size:20px; color:var(--ink); font-variant-numeric:tabular-nums; margin-left:4px; }
/* D4 */
.d4{ width:250px; display:grid; gap:10px; }
.d4-seg{ justify-self:start; display:inline-flex; background:var(--line); border-radius:8px; padding:2px; }
.d4-seg button{ height:26px; padding:0 14px; border:0; border-radius:6px; background:transparent; font-size:12px; cursor:pointer; color:var(--ink-2); }
.d4-seg button[aria-selected="true"]{ background:var(--card); color:var(--ink); box-shadow:0 1px 2px rgba(15,23,42,.12); }
.d4-ch{ position:relative; height:120px; padding-left:34px; touch-action:pan-y; }
.d4-ax{ position:absolute; left:0; top:0; bottom:0; width:30px; }
.d4-ax > div{ position:absolute; inset:0; display:flex; flex-direction:column-reverse; justify-content:space-between; font-size:10px; color:var(--muted); text-align:right; font-variant-numeric:tabular-nums; transition:opacity 250ms var(--ease-in-out); }
.d4-g{ position:absolute; left:34px; right:0; top:6px; bottom:0; display:flex; align-items:flex-end; gap:var(--gap); transition:opacity 250ms var(--ease-in-out); }
.d4-g i{ flex:1; height:100%; border-radius:3px 3px 0 0; background:var(--ink-2); transform-origin:bottom; transition:opacity 150ms ease; }
.d4-g.press i{ opacity:.4; } .d4-g.press i.on{ opacity:1; }
.d4-tip{ position:absolute; top:-6px; font-size:11px; background:var(--ink); color:var(--bg); border-radius:6px; padding:2px 6px; white-space:nowrap; transform:translateX(-50%); opacity:0; transition:opacity 150ms ease; pointer-events:none; font-variant-numeric:tabular-nums; }
/* D7 */
.d7{ width:250px; display:grid; gap:8px; }
.d7-top{ display:flex; justify-content:space-between; font-size:12px; color:var(--muted); }
.d7-top b{ color:var(--ink); font-variant-numeric:tabular-nums; }
.d7-ch{ position:relative; height:120px; display:flex; align-items:flex-end; gap:8px; }
.d7-ch > i{ flex:1; border-radius:4px 4px 0 0; background:var(--line-2); transition:background-color 150ms ease; }
.d7-ch > i.pass{ background:var(--accent); }
.d7-ln{ position:absolute; left:-4px; right:-4px; top:0; height:44px; margin-top:-22px; cursor:ns-resize; touch-action:none; border:0; background:transparent; padding:0; }
.d7-ln::before{ content:""; position:absolute; left:0; right:0; top:21px; border-top:2px dashed var(--ink); }
.d7-ln span{ position:absolute; right:0; top:4px; font-size:10.5px; background:var(--ink); color:var(--bg); border-radius:5px; padding:1px 5px; font-variant-numeric:tabular-nums; }
/* D8 */
.d8{ position:relative; width:250px; display:grid; gap:12px; padding-top:30px; }
.d8-bar{ display:flex; gap:2px; height:18px; }
.d8-bar button{ border:0; padding:0; height:18px; cursor:pointer; transition:transform 175ms var(--ease-out); }
.d8-bar button:first-child{ border-radius:5px 0 0 5px; } .d8-bar button:last-child{ border-radius:0 5px 5px 0; }
.d8-bar button.on{ transform:translateY(-4px); }
.d8-lg{ display:flex; flex-wrap:wrap; gap:4px 12px; font-size:11.5px; color:var(--ink-2); }
.d8-lg span{ display:inline-flex; align-items:center; gap:4px; }
.d8-lg i{ width:8px; height:8px; border-radius:2px; }
.d8-pop{ position:absolute; top:0; transform-origin:50% 100%; background:var(--ink); color:var(--bg); font-size:11.5px; border-radius:7px; padding:4px 8px; white-space:nowrap; opacity:0; pointer-events:none; font-variant-numeric:tabular-nums; }

/* G1 */
.g1 > div{ position:absolute; inset:0; background:var(--card); }
.g1-h{ height:38px; display:flex; align-items:center; gap:4px; padding:0 10px; font-size:12.5px; font-weight:600; border-bottom:1px solid var(--line); }
.g1-row{ display:grid; gap:6px; width:100%; text-align:left; padding:10px 12px; border:0; border-bottom:1px solid var(--line); background:transparent; font-size:12px; cursor:pointer; }
.g1-scrim{ background:#000 !important; opacity:0; pointer-events:none; }
.g1-top{ box-shadow:-8px 0 24px -12px rgba(0,0,0,.35); }
.g1-back{ width:28px; height:28px; border:0; background:transparent; display:grid; place-items:center; cursor:pointer; color:var(--ink); margin-left:-6px; }
.g1-back .ic{ width:18px; height:18px; }
.g1-body{ display:grid; gap:8px; padding:12px; }
.g1-img{ height:64px; border-radius:10px; background:linear-gradient(135deg, #F4A261, #E76F51); }
.g1-edge{ position:absolute; left:0; top:0; bottom:0; width:20px; touch-action:none; cursor:ew-resize; }
@media (hover:hover) and (pointer:fine){ .g1-edge:hover{ background:linear-gradient(90deg, color-mix(in srgb, var(--accent) 22%, transparent), transparent); } }
/* G2 */
.g2-btn{ background:var(--ink); color:var(--bg); border:0; border-radius:12px; height:48px; padding:0 30px; font-size:15px; font-weight:600; touch-action:none; user-select:none; cursor:pointer; }
.g2-hint, .g7-hint, .g-cap{ position:absolute; bottom:12px; left:0; right:0; text-align:center; font-size:12px; color:var(--muted); pointer-events:none; }
/* G3 */
.g3{ display:grid; gap:4px; justify-items:center; cursor:pointer; border:0; background:transparent; padding:12px; }
.g3 small{ font-size:12px; color:var(--muted); }
.g3 .roll{ font-size:44px; font-weight:700; }
/* G4 */
.g4{ display:grid; gap:10px; justify-items:center; }
.g4-lock{ font-size:11.5px; color:var(--muted); background:var(--card); border:1px solid var(--line); border-radius:999px; padding:2px 10px; }
.g4-v{ width:200px; height:140px; border-radius:12px; overflow:hidden; touch-action:none; cursor:grab; }
.g4-tr{ display:flex; height:100%; }
.g4-ph{ flex:none; width:200px; height:100%; display:flex; align-items:flex-end; justify-content:flex-end; padding:8px; color:#fff; font-size:11px; font-variant-numeric:tabular-nums; }
/* G6 */
.g6{ display:grid; gap:10px; justify-items:center; }
.g6-v{ width:240px; overflow:hidden; touch-action:pan-y; cursor:grab; border-radius:12px; }
.g6-tr{ display:flex; gap:12px; }
.g6-c{ flex:none; width:150px; height:110px; border-radius:12px; padding:10px; color:#fff; font-size:12px; font-weight:600; transition:box-shadow 150ms ease; }
.g6-c.tgt{ box-shadow:inset 0 0 0 2px rgba(255,255,255,.9); }
.g6-dots{ display:flex; gap:6px; }
.g6-dots i{ width:6px; height:6px; border-radius:999px; background:var(--line-2); transition:background-color 150ms ease, transform 150ms var(--ease-out); }
.g6-dots i.on{ background:var(--ink); transform:scale(1.3); }
/* G7 */
.g7{ width:190px; height:150px; background:var(--card); border:1px solid var(--line); border-radius:14px; overflow:hidden; position:relative; touch-action:none; cursor:grab; }
.g7-s{ padding:0 12px; }
.g7-l{ height:12px; background:var(--line); border-radius:5px; margin:11px 0; }
.g7-l.s{ width:58%; }
.g7-e{ position:absolute; top:0; left:0; right:0; height:3px; background:var(--accent); opacity:0; }
/* G8 */
.g8{ position:relative; width:240px; height:52px; border-radius:26px; background:var(--stage); box-shadow:inset 0 0 0 1px var(--line-2); transition:background-color 150ms ease; }
.g8-t{ position:absolute; inset:0; display:grid; place-items:center; font-size:13px; font-weight:600; color:var(--ink-2); pointer-events:none; padding-left:30px; font-variant-numeric:tabular-nums; }
.g8-h{ position:absolute; left:4px; top:4px; width:44px; height:44px; border-radius:999px; border:0; background:var(--ink); color:var(--bg); display:grid; place-items:center; touch-action:none; cursor:grab; }
.g8-h .ic{ width:20px; height:20px; }
.g8.done{ background:var(--ok-soft); }
.g8.done .g8-h{ background:var(--ok); color:#fff; }
.g8-wrap{ display:grid; gap:10px; justify-items:center; }
.g8-wrap small{ font-size:11.5px; color:var(--muted); }
/* G11 */
.g11{ position:relative; width:240px; height:190px; display:flex; flex-direction:column; justify-content:flex-end; gap:8px; }
.g11-chat{ flex:1; display:flex; flex-direction:column; justify-content:flex-end; gap:6px; overflow:hidden; }
.g11-m{ max-width:70%; padding:6px 10px; border-radius:12px; font-size:12px; background:var(--card); border:1px solid var(--line); align-self:flex-start; }
.g11-m.me{ align-self:flex-end; background:var(--ink); color:var(--bg); border-color:var(--ink); display:inline-flex; gap:6px; align-items:center; font-variant-numeric:tabular-nums; }
.g11-rec{ position:absolute; left:0; right:0; bottom:52px; height:44px; border-radius:12px; background:var(--card); border:1px solid var(--line); display:flex; align-items:center; gap:8px; padding:0 10px; opacity:0; pointer-events:none; transition:opacity 150ms var(--ease-out); }
.g11-rec.on{ opacity:1; }
.g11-w{ flex:1; display:flex; align-items:center; gap:2px; height:24px; }
.g11-w i{ flex:1; height:100%; border-radius:2px; background:var(--accent); transform:scaleY(.2); }
.g11-t{ font-size:11.5px; font-variant-numeric:tabular-nums; color:var(--ink-2); }
.g11-x{ position:absolute; left:10px; top:-22px; font-size:11px; color:var(--err); opacity:0; }
.g11-b{ height:44px; border-radius:12px; border:0; background:var(--line); font-size:13px; font-weight:600; display:flex; align-items:center; justify-content:center; gap:6px; touch-action:none; user-select:none; cursor:pointer; transition:transform 140ms var(--ease-out), background-color 150ms ease, color 150ms ease; }
.g11-b.down{ transform:scale(.97); background:var(--line-2); }
.g11-b.cancel{ background:var(--err); color:#fff; }
.g11-tip{ position:absolute; left:0; right:0; bottom:52px; text-align:center; font-size:11.5px; color:var(--muted); }

/* P1 */
.p1{ display:grid; gap:8px; justify-items:center; }
.p1-v{ width:220px; height:150px; overflow:hidden; border-radius:10px; touch-action:pan-y; }
.p1-g{ display:grid; grid-template-columns:repeat(var(--c), 1fr); gap:4px; transform-origin:50% 0; }
.p1-g i{ aspect-ratio:1; border-radius:4px; transform-origin:0 0; }
.p1-bt{ display:flex; gap:6px; }
.p1-bt button{ height:28px; padding:0 10px; border-radius:8px; border:1px solid var(--line-2); background:var(--card); font-size:12px; cursor:pointer; }
/* P2 */
.p2{ width:230px; height:186px; overflow-y:auto; border-radius:12px; background:var(--card); border:1px solid var(--line); scrollbar-width:none; }
.p2::-webkit-scrollbar{ display:none; }
.p2-k{ position:sticky; top:0; height:186px; display:grid; place-items:center; gap:0; }
.p2-ph{ width:62px; height:112px; border-radius:14px; border:3px solid var(--ink); position:relative; overflow:hidden; background:var(--stage); }
.p2-sc{ position:absolute; inset:0; background:linear-gradient(160deg, var(--accent), #F5A524); transform-origin:bottom; }
.p2-cap{ position:absolute; bottom:22px; left:0; right:0; height:18px; text-align:center; font-size:12.5px; font-weight:600; }
.p2-cap span{ position:absolute; inset:0; }
.p2-bar{ position:absolute; left:20px; right:20px; bottom:10px; height:3px; border-radius:2px; background:var(--line); }
.p2-bar i{ position:absolute; inset:0; border-radius:2px; background:var(--ink); transform-origin:left; }
.p2-sp{ height:380px; }
/* P3 */
.p3{ width:250px; overflow-x:auto; scrollbar-width:none; border-radius:10px; }
.p3::-webkit-scrollbar{ display:none; }
.p3-tr{ display:flex; gap:8px; width:max-content; }
.p3-tr i{ width:86px; height:120px; border-radius:10px; flex:none; display:flex; align-items:flex-end; padding:8px; color:#fff; font:600 11px var(--sans); font-style:normal; }
/* P5 */
.p5{ position:relative; width:240px; height:172px; border-radius:12px; background-color:var(--card); background-image:radial-gradient(var(--line-2) 1px, transparent 1px); background-size:12px 12px; border:1px solid var(--line); overflow:hidden; }
.p5-a, .p5-b{ position:absolute; display:grid; place-items:center; border-radius:8px; font-size:12px; font-weight:600; }
.p5-a{ left:40px; top:40px; width:70px; height:44px; background:var(--stage); border:1.5px solid var(--line-2); color:var(--muted); }
.p5-b{ left:0; top:0; width:56px; height:36px; background:var(--ink); color:var(--bg); cursor:grab; touch-action:none; user-select:none; }
.p5-gx, .p5-gy{ position:absolute; background:var(--accent); opacity:0; transition:opacity 100ms var(--ease-out); pointer-events:none; }
.p5-gx{ top:0; bottom:0; width:1px; } .p5-gy{ left:0; right:0; height:1px; }
.p5-tip{ position:absolute; right:8px; top:6px; font-size:10.5px; color:var(--muted); }
/* P11 */
.p11{ width:230px; height:186px; overflow-y:auto; border-radius:12px; background:var(--card); border:1px solid var(--line); padding:12px; display:grid; gap:10px; align-content:start; scrollbar-width:none; }
.p11::-webkit-scrollbar{ display:none; }
.p11 b{ font-size:15px; }
.p11-row{ display:grid; grid-template-columns:1fr 1fr; gap:8px; }
.p11-it{ height:70px; border-radius:10px; }
.p11-tx{ display:grid; gap:6px; padding:4px 0; }
[data-reveal="wait"]{ opacity:0; transform:translateY(16px); }
[data-reveal="in"]{ opacity:1; transform:none; transition:opacity 300ms var(--ease-out), transform 300ms var(--ease-out); }

/* M2 */
.m2{ position:absolute; left:50%; top:50%; width:64px; height:64px; margin:-32px; border-radius:999px; background:radial-gradient(circle at 35% 30%, #FFB199, var(--accent) 60%, #C2410C); box-shadow:0 10px 24px -10px rgba(194,65,12,.6); touch-action:none; cursor:grab; border:0; }
/* M3 */
.m3{ perspective:1000px; }
.m3-c{ position:relative; width:210px; height:140px; border-radius:16px; overflow:hidden; background:#1E2A3A; box-shadow:0 18px 40px -20px rgba(15,23,42,.6); }
.m3-l{ position:absolute; inset:-24px; }
.m3-bg{ background:radial-gradient(circle at 20% 30%, #2D4A6B 0 18%, transparent 19%), radial-gradient(circle at 80% 70%, #3B5B80 0 22%, transparent 23%), linear-gradient(160deg, #1E2A3A, #2B3F58); }
.m3-mid{ display:grid; place-items:center; }
.m3-mid i{ width:62px; height:62px; border-radius:999px; background:radial-gradient(circle at 35% 30%, #FFD3A6, #F28C38 65%); box-shadow:0 10px 20px -8px rgba(0,0,0,.5); transform:translate(36px, 4px); }
.m3-fg{ inset:auto; left:16px; bottom:14px; color:#fff; display:grid; gap:2px; }
.m3-fg b{ font-size:16px; } .m3-fg span{ font-size:11.5px; opacity:.8; }
/* M6 */
.m6{ display:grid; gap:10px; justify-items:center; }
.m6 small{ font-size:12px; color:var(--muted); }
.m6-row{ display:flex; gap:10px; }
.m6-t{ width:64px; height:64px; border-radius:10px; border:0; padding:0; cursor:zoom-in; background-size:cover; background-position:center; }
.m6-ov{ position:absolute; inset:0; z-index:4; display:none; touch-action:none; }
.m6-sc{ position:absolute; inset:0; background:rgb(8 12 20); opacity:0; }
.m6-f{ position:absolute; left:50%; top:50%; width:200px; height:150px; margin:-75px 0 0 -100px; background-size:cover; background-position:center; transform-origin:50% 50%; will-change:transform; }
/* M7 */
.m7-bg{ padding:12px; display:grid; gap:8px; }
.m7-sc{ position:absolute; inset:0; background:#000; opacity:0; pointer-events:none; }
.m7-sh{ position:absolute; left:0; right:0; bottom:0; height:168px; background:var(--card); border-radius:16px 16px 0 0; box-shadow:0 -6px 20px -10px rgba(0,0,0,.35); }
.m7-hd{ width:100%; border:0; background:transparent; padding:8px 12px 10px; display:grid; gap:6px; justify-items:center; touch-action:none; cursor:grab; font-size:12px; font-weight:600; }
.m7-hd::before{ content:""; width:32px; height:4px; border-radius:2px; background:var(--line-2); }
.m7-bd{ padding:0 12px; display:grid; gap:8px; }
.m7-it{ display:flex; justify-content:space-between; font-size:11.5px; color:var(--ink-2); font-variant-numeric:tabular-nums; }
.m7-go{ height:32px; border-radius:9px; background:var(--ink); color:var(--bg); display:grid; place-items:center; font-size:12px; font-weight:600; }

/* E1 */
.e1{ display:flex; gap:8px; }
.e1 button{ width:52px; height:76px; border-radius:10px; border:1px solid var(--line); background:var(--card); padding:6px; display:grid; align-content:start; gap:5px; cursor:pointer; transition:transform 200ms var(--ease-out), border-color 200ms var(--ease-out), box-shadow 200ms var(--ease-out); }
.e1 button i{ height:26px; border-radius:6px; }
.e1 button.lift{ box-shadow:var(--shadow); border-color:var(--line-2); }
/* E2 */
.e2{ display:grid; gap:10px; justify-items:center; }
.e2-row{ position:relative; width:250px; height:112px; perspective:1000px; touch-action:pan-y; }
.e2-c{ position:absolute; left:50%; top:4px; width:96px; height:96px; margin-left:-48px; border-radius:8px; border:0; padding:8px; display:flex; align-items:flex-end; color:#fff; font-size:11px; font-weight:600; cursor:pointer; transition:transform 250ms var(--ease-in-out), opacity 250ms var(--ease-in-out); }
.e2-c::after{ content:""; position:absolute; inset:0; border-radius:8px; background:#000; opacity:var(--dim, 0); transition:opacity 250ms var(--ease-in-out); }
.e2-bt{ display:flex; gap:8px; }
.e2-bt button{ width:32px; height:28px; border-radius:8px; border:1px solid var(--line-2); background:var(--card); cursor:pointer; display:grid; place-items:center; }
/* E6 */
.e6-sc{ position:absolute; inset:0; overflow-y:auto; padding:10px 10px 106px; display:grid; gap:8px; align-content:start; scrollbar-width:none; }
.e6-sc::-webkit-scrollbar{ display:none; }
.e6-it{ height:40px; border-radius:9px; display:flex; align-items:center; padding:0 10px; color:#fff; font-size:11.5px; font-weight:600; flex:none; }
.e6-blur{ position:absolute; left:0; right:0; bottom:0; height:96px; pointer-events:none; transition:opacity 200ms var(--ease-out); }
.e6-blur > i{ position:absolute; inset:0; }
.e6-blur > i:nth-child(1){ backdrop-filter:blur(1px); -webkit-backdrop-filter:blur(1px); mask-image:linear-gradient(to bottom, transparent 0%, #000 12.5%, #000 37.5%, transparent 50%); -webkit-mask-image:linear-gradient(to bottom, transparent 0%, #000 12.5%, #000 37.5%, transparent 50%); }
.e6-blur > i:nth-child(2){ backdrop-filter:blur(2px); -webkit-backdrop-filter:blur(2px); mask-image:linear-gradient(to bottom, transparent 12.5%, #000 37.5%, #000 62.5%, transparent 75%); -webkit-mask-image:linear-gradient(to bottom, transparent 12.5%, #000 37.5%, #000 62.5%, transparent 75%); }
.e6-blur > i:nth-child(3){ backdrop-filter:blur(4px); -webkit-backdrop-filter:blur(4px); mask-image:linear-gradient(to bottom, transparent 37.5%, #000 62.5%, #000 87.5%, transparent 100%); -webkit-mask-image:linear-gradient(to bottom, transparent 37.5%, #000 62.5%, #000 87.5%, transparent 100%); }
.e6-blur > i:nth-child(4){ backdrop-filter:blur(8px); -webkit-backdrop-filter:blur(8px); mask-image:linear-gradient(to bottom, transparent 62.5%, #000 87.5%); -webkit-mask-image:linear-gradient(to bottom, transparent 62.5%, #000 87.5%); }
.e6-blur > i:nth-child(5){ background:linear-gradient(to bottom, transparent, color-mix(in srgb, var(--card) 85%, transparent)); }
@supports not ((backdrop-filter:blur(1px)) or (-webkit-backdrop-filter:blur(1px))){ .e6-blur > i:not(:last-child){ display:none; } }
@media (prefers-reduced-transparency: reduce){ .e6-blur > i:not(:last-child){ display:none; } .e6-blur > i:last-child{ background:linear-gradient(to bottom, transparent, var(--card) 60%); } }
.e6-go{ position:absolute; left:10px; right:10px; bottom:10px; height:38px; border-radius:10px; border:0; background:var(--ink); color:var(--bg); font-size:12.5px; font-weight:600; cursor:pointer; font-variant-numeric:tabular-nums; }
.e6-end{ height:1px; }
`);

const sec = GL.sections.find((s) => s.id === 'motion');
const chart = { title:'图表控件', items:[] }, gest = { title:'手势手感', items:[] }, page = { title:'页面级', items:[] }, feel = { title:'动效质感', items:[] }, web = { title:'网页效果', items:[] };
sec.subs.push(chart, gest, page, feel, web);
const art = (i) => ['#F4A261, #E76F51', '#2A9D8F, #264653', '#8AB17D, #2A9D8F', '#6D83F2, #3F4FB8', '#E9C46A, #D9643A', '#C77DFF, #6D4BC0', '#94A3B8, #475569'][i % 7];

/* ---------------- D1 同心活动圆环 ---------------- */
chart.items.push({ code:'D1', name:'同心活动圆环', use:'预算、收入、储蓄这类完成度：三个圆环从 0 画到今天，中间数字一起长', hint:'点圆环重画', mount(stage) {
  const conf = [{ r:62, c:'#FF5A3C', p:0.82 }, { r:46, c:'#F5A524', p:0.64 }, { r:30, c:'#2FBF71', p:0.46 }];
  stage.innerHTML = `<button class="d1" type="button" aria-label="收入完成 82%，重画一次" style="border:0;background:transparent;padding:0"><svg width="150" height="150" viewBox="0 0 150 150">${conf.map((c) => `<circle cx="75" cy="75" r="${c.r}" stroke="var(--line)" stroke-width="11"></circle>`).join('')}${conf.map((c) => `<circle class="arc" cx="75" cy="75" r="${c.r}" stroke="${c.c}" stroke-width="11"></circle>`).join('')}</svg><span class="d1-n">0%</span></button>`;
  const arcs = [...stage.querySelectorAll('.arc')], num = stage.querySelector('.d1-n');
  const len = conf.map((c) => 2 * Math.PI * c.r);
  arcs.forEach((a, i) => { a.style.strokeDasharray = len[i]; a.style.strokeDashoffset = len[i]; });
  const play = () => {
    arcs.forEach((a, i) => { a.style.transition = 'none'; a.style.strokeDashoffset = len[i];
      requestAnimationFrame(() => requestAnimationFrame(() => { a.style.transition = `stroke-dashoffset 400ms var(--ease-out) ${i * 50}ms`; a.style.strokeDashoffset = len[i] * (1 - conf[i].p); })); });
    tween(400, EASE.out, (p) => { num.textContent = Math.round(82 * p) + '%'; });
  };
  stage.querySelector('.d1').addEventListener('click', play);
  return { play, final() { arcs.forEach((a, i) => { a.style.strokeDashoffset = len[i] * (1 - conf[i].p); }); num.textContent = '82%'; } };
} });

/* ---------------- D2 打卡热力格 ---------------- */
chart.items.push({ code:'D2', name:'打卡热力格', use:'习惯打卡、活跃度：按分位数分 4 档，今天的格子有描边，点格子看那天', hint:'点格子；方向键也能走', mount(stage) {
  const weeks = 12, today = new Date(2026, 10, 6), dow = (today.getDay() + 6) % 7;   // 周一 = 0
  let seed = 11; const rnd = () => (seed = (seed * 9301 + 49297) % 233280) / 233280;
  const n = weeks * 7, vals = Array.from({ length:n }, () => { const r = rnd(); return r < 0.24 ? 0 : 1 + Math.floor(r * r * 6); });
  const nz = vals.filter(Boolean).sort((a, b) => a - b), qt = (p) => nz[Math.floor(p * (nz.length - 1))], cut = [qt(0.25), qt(0.5), qt(0.75)];
  const lvl = (v) => !v ? 0 : v <= cut[0] ? 1 : v <= cut[1] ? 2 : v <= cut[2] ? 3 : 4;
  const last = (weeks - 1) * 7 + dow;
  const date = (i) => { const d = new Date(today); d.setDate(d.getDate() - (last - i)); return d; };
  const W = '一二三四五六日';
  stage.innerHTML = `<div class="d2"><div class="d2-g" role="grid" aria-label="最近 12 周的打卡">${vals.map((v, i) => `<button type="button" tabindex="${i === last ? 0 : -1}" class="l${lvl(v)}${i === last ? ' today' : ''}${i > last ? ' future' : ''}" aria-label="${date(i).getMonth() + 1}月${date(i).getDate()}日 打卡 ${v} 次"></button>`).join('')}</div><div class="d2-lg">少${[0, 1, 2, 3, 4].map((l) => `<i class="" style="background:${['var(--line)', 'color-mix(in srgb, var(--accent) 30%, var(--card))', 'color-mix(in srgb, var(--accent) 52%, var(--card))', 'color-mix(in srgb, var(--accent) 76%, var(--card))', 'var(--accent)'][l]}"></i>`).join('')}多</div><div class="d2-pop" role="status"></div></div>`;
  const box = stage.querySelector('.d2'), cells = [...stage.querySelectorAll('.d2-g button')], pop = stage.querySelector('.d2-pop');
  let open = -1, anim = null;
  const show = (i) => {
    if (i === open) return hide();
    open = i; const d = date(i), c = cells[i].getBoundingClientRect(), b = box.getBoundingClientRect();
    pop.textContent = `${d.getMonth() + 1}月${d.getDate()}日 周${W[(d.getDay() + 6) % 7]} · ${vals[i] ? `打卡 ${vals[i]} 次` : '没打卡'}`;
    const w = pop.offsetWidth, left = clamp(c.left - b.left + 7 - w / 2, -10, b.width - w + 10);
    pop.style.left = left + 'px'; pop.style.top = (c.top - b.top - 30) + 'px'; pop.style.transformOrigin = `${c.left - b.left + 7 - left}px 100%`;
    anim && anim.cancel(); anim = pop.animate([{ opacity:0, transform:'scale(.96)' }, { opacity:1, transform:'none' }], { duration:175, easing:CSS.out, fill:'forwards' });
  };
  const hide = () => { open = -1; anim && anim.cancel(); anim = pop.animate([{ opacity:1 }, { opacity:0 }], { duration:150, easing:CSS.out, fill:'forwards' }); };
  cells.forEach((c, i) => c.addEventListener('click', () => show(i)));
  stage.querySelector('.d2-g').addEventListener('keydown', (e) => {
    const i = cells.indexOf(document.activeElement); if (i < 0) return;
    const k = { ArrowUp:-1, ArrowDown:1, ArrowLeft:-7, ArrowRight:7 }[e.key]; if (!k) return; e.preventDefault();
    const j = clamp(i + k, 0, last); cells[i].tabIndex = -1; cells[j].tabIndex = 0; cells[j].focus(); if (open >= 0) show(j);
  });
  document.addEventListener('pointerdown', (e) => { if (open >= 0 && !box.contains(e.target)) hide(); });
  const pq = seq();
  return { async play() { const s = pq.begin(); show(last); if (!await s.sleep(1400)) return; show(last - 9); if (!await s.sleep(1400)) return; hide(); } };
} });

/* ---------------- D3 半圆仪表盘 ---------------- */
chart.items.push({ code:'D3', name:'半圆仪表盘', use:'一个指标落在哪一段：报税进度、预算用量；分界由业务定，不是三等分', hint:'点一下换个数', mount(stage) {
  const cx = 110, cy = 112, r = 84, pt = (p, rr = r) => { const a = Math.PI * (1 - p); return [cx + rr * Math.cos(a), cy - rr * Math.sin(a)]; };
  const arc = (a, b, c) => { const [x1, y1] = pt(a), [x2, y2] = pt(b); return `<path d="M${x1.toFixed(1)} ${y1.toFixed(1)} A${r} ${r} 0 0 1 ${x2.toFixed(1)} ${y2.toFixed(1)}" stroke="${c}" stroke-width="14" fill="none"/>`; };
  const lab = (p, t) => { const [x, y] = pt(p, r + 18); return `<text x="${x.toFixed(1)}" y="${(y + 3).toFixed(1)}" text-anchor="middle">${t}</text>`; };
  stage.innerHTML = `<button class="d3" type="button" aria-label="预算用量，点一下换个数" style="border:0;background:transparent;padding:0"><svg viewBox="0 0 220 124" width="220" height="124">${arc(0, 0.595, 'var(--ok)')}${arc(0.605, 0.845, 'var(--warn)')}${arc(0.855, 1, 'var(--err)')}${lab(0.3, '正常')}${lab(0.725, '注意')}${lab(0.93, '超标')}<g class="d3-ndl"><line x1="${cx}" y1="${cy}" x2="${cx}" y2="${cy - 64}" stroke="var(--ink)" stroke-width="3" stroke-linecap="round"/><circle cx="${cx}" cy="${cy}" r="6" fill="var(--ink)"/></g></svg><span class="d3-v" role="status">预算用了<b class="d3-n">0%</b></span></button>`;
  const ndl = stage.querySelector('.d3-ndl'), num = stage.querySelector('.d3-n');
  const sp = new Spring(0, { preset:'gesture', eps:0.0005, onUpdate:(p) => { ndl.style.transform = `rotate(${-90 + 180 * clamp(p, -0.02, 1.02)}deg)`; } });
  sp.onUpdate(0);
  const vals = [0.76, 0.91, 0.42]; let k = -1;
  const next = () => { k = (k + 1) % vals.length; num.textContent = Math.round(vals[k] * 100) + '%'; sp.to(vals[k]); };
  stage.querySelector('.d3').addEventListener('click', next);
  return { play() { k = -1; sp.jump(0); next(); }, final() { k = 0; num.textContent = '76%'; sp.jump(0.76); } };
} });

/* ---------------- D4 周 / 月切换柱状图 ---------------- */
chart.items.push({ code:'D4', name:'周 / 月切换柱状图', use:'按周或按月看支出、收入：旧的一组淡出，新的一组长出来；按住看数', hint:'切换周 / 月；按住柱子左右滑', mount(stage) {
  const sets = { w:{ v:[120, 340, 210, 90, 280, 410, 160], max:450, ax:[0, 150, 300, 450], lab:(i) => '周' + '一二三四五六日'[i], gap:'8px' },
    m:{ v:Array.from({ length:30 }, (_, i) => Math.round(500 + 700 * Math.abs(Math.sin(i * 1.7)) + (i % 5) * 60)), max:1500, ax:[0, 500, 1000, 1500], lab:(i) => `11月${i + 1}日`, gap:'2px' } };
  stage.innerHTML = `<div class="d4"><div class="d4-seg" role="tablist" aria-label="时间范围"><button role="tab" type="button" aria-selected="true" data-k="w">周</button><button role="tab" type="button" aria-selected="false" data-k="m">月</button></div><div class="d4-ch"><div class="d4-ax"></div><div class="d4-tip"></div></div></div>`;
  const ch = stage.querySelector('.d4-ch'), ax = stage.querySelector('.d4-ax'), tip = stage.querySelector('.d4-tip'), tabs = [...stage.querySelectorAll('[role=tab]')];
  let cur = null, g = null;
  const build = (k, animate) => {
    const d = sets[k], old = g, oldAx = ax.firstChild;
    g = document.createElement('div'); g.className = 'd4-g'; g.style.setProperty('--gap', d.gap);
    g.innerHTML = d.v.map((v) => `<i style="transform:scaleY(${v / d.max})"></i>`).join('');
    ch.insertBefore(g, tip);
    const a = document.createElement('div'); a.innerHTML = d.ax.map((x) => `<span>${x}</span>`).join(''); ax.append(a);
    if (animate) {
      g.style.opacity = 0; a.style.opacity = 0;
      requestAnimationFrame(() => { g.style.opacity = 1; a.style.opacity = 1; });
      [...g.children].forEach((b, i) => b.animate([{ transform:'scaleY(0)' }, { transform:`scaleY(${d.v[i] / d.max})` }], { duration:250, easing:CSS.inOut }));
      if (old) { old.style.opacity = 0; oldAx.style.opacity = 0; setTimeout(() => { old.remove(); oldAx.remove(); }, 260); }
    } else if (old) { old.remove(); oldAx && oldAx.remove(); }
    cur = k; tabs.forEach((t) => t.setAttribute('aria-selected', t.dataset.k === k));
  };
  build('w', false);
  tabs.forEach((t) => t.addEventListener('click', () => t.dataset.k !== cur && build(t.dataset.k, true)));
  const at = (x) => { const r = g.getBoundingClientRect(), n = g.children.length; return clamp(Math.floor((x - r.left) / r.width * n), 0, n - 1); };
  const press = (i) => { const d = sets[cur], bars = [...g.children]; g.classList.add('press'); bars.forEach((b, k) => b.classList.toggle('on', k === i));
    const br = bars[i].getBoundingClientRect(), cr = ch.getBoundingClientRect(); tip.textContent = `${d.lab(i)} RM ${d.v[i]}`; tip.style.left = (br.left - cr.left + br.width / 2) + 'px'; tip.style.opacity = 1; };
  const release = () => { g && g.classList.remove('press'); tip.style.opacity = 0; };
  drag(ch, { down:(e) => press(at(e.clientX)), move:(e) => press(at(e.clientX)), up:release });
  const pq = seq();
  return { async play() { const s = pq.begin(); if (cur !== 'w') build('w', true); if (!await s.sleep(400)) return; build('m', true); if (!await s.sleep(1200)) return; press(19); if (!await s.sleep(1000)) return; release(); if (!await s.sleep(500)) return; build('w', true); } };
} });

/* ---------------- D7 可拖动目标线柱状图 ---------------- */
chart.items.push({ code:'D7', name:'可拖动目标线柱状图', use:'设目标或预算线，看几天达标：线跟手，吸到整十的刻度', hint:'上下拖虚线；或聚焦按 ↑ ↓', mount(stage) {
  const v = [32, 48, 20, 55, 40, 62, 28], MAX = 70, H = 120, y = (m) => H - m / MAX * H;
  stage.innerHTML = `<div class="d7"><div class="d7-top"><span>每天运动（分钟）</span><span>达标 <b class="d7-c">0</b> / 7 天</span></div><div class="d7-ch">${v.map((m) => `<i style="height:${m / MAX * 100}%"></i>`).join('')}<button class="d7-ln" type="button" role="slider" aria-label="目标分钟数" aria-valuemin="10" aria-valuemax="60"><span></span></button></div></div>`;
  const ln = stage.querySelector('.d7-ln'), bars = [...stage.querySelectorAll('.d7-ch > i')], cnt = stage.querySelector('.d7-c'), tag = ln.querySelector('span');
  let goal = 40, snap = 40;
  const show = (m) => { ln.style.transform = `translateY(${y(m)}px)`; const g = Math.round(m); tag.textContent = `目标 ${g}`; ln.setAttribute('aria-valuenow', g);
    let k = 0; bars.forEach((b, i) => { const p = v[i] >= m; b.classList.toggle('pass', p); k += p; }); cnt.textContent = k; };   // 达标天数直接换，不滚动
  const setRaw = (raw) => {                       // 进入 6px 吸附，离开 10px 才放开（P5 的做法）
    const ry = y(raw);
    if (snap !== null && Math.abs(ry - y(snap)) > 10) snap = null;
    if (snap === null) { const t = clamp(Math.round(raw / 10) * 10, 10, 60); if (Math.abs(ry - y(t)) < 6) snap = t; }
    goal = snap ?? clamp(raw, 5, 65); show(goal);
  };
  show(goal);
  let g0 = 0;
  drag(ln, { down:() => { g0 = goal; }, move:(e, dx, dy) => setRaw(g0 - dy / H * MAX) });
  ln.addEventListener('keydown', (e) => { const k = e.key === 'ArrowUp' ? 10 : e.key === 'ArrowDown' ? -10 : 0; if (!k) return; e.preventDefault(); snap = clamp(Math.round(goal / 10) * 10 + k, 10, 60); goal = snap; show(goal); });
  const pq = seq();
  return { async play() { const s = pq.begin(); const a = goal; await tween(900, EASE.inOut, (p) => s.alive() && setRaw(a + (57 - a) * p)); if (!await s.sleep(500)) return; await tween(900, EASE.inOut, (p) => s.alive() && setRaw(57 - 32 * p)); } };
} });

/* ---------------- D8 分段占比条 ---------------- */
chart.items.push({ code:'D8', name:'分段占比条', use:'支出分类、时间分配：比环形图省地方；点一段，它抬起来，上面写名字和占比', hint:'点一段', mount(stage) {
  const seg = [['房租', 42, '#6D83F2'], ['吃饭', 23, '#2A9D8F'], ['购物', 15, '#D9A21B'], ['交通', 12, '#E07A5F'], ['其他', 8, '#94A3B8']], total = 4800;
  stage.innerHTML = `<div class="d8"><div class="d8-pop" role="status"></div><div class="d8-bar">${seg.map(([n, p, c]) => `<button type="button" style="flex:${p};background:${c}" aria-label="${n} ${p}%"></button>`).join('')}</div><div class="d8-lg">${seg.map(([n, p, c]) => `<span><i style="background:${c}"></i>${n} ${p}%</span>`).join('')}</div></div>`;
  const box = stage.querySelector('.d8'), bs = [...stage.querySelectorAll('.d8-bar button')], pop = stage.querySelector('.d8-pop');
  let on = -1, anim = null;
  const sel = (i) => {
    if (i === on || i < 0) { on = -1; bs.forEach((b) => b.classList.remove('on')); anim && anim.cancel(); anim = pop.animate([{ opacity:1 }, { opacity:0 }], { duration:150, easing:CSS.out, fill:'forwards' }); return; }
    on = i; bs.forEach((b, k) => b.classList.toggle('on', k === i));
    const [n, p] = seg[i]; pop.textContent = `${n} ${p}% · RM ${(total * p / 100).toLocaleString('en')}`;
    const br = bs[i].getBoundingClientRect(), xr = box.getBoundingClientRect(), w = pop.offsetWidth;
    pop.style.left = clamp(br.left - xr.left + br.width / 2 - w / 2, 0, xr.width - w) + 'px';
    anim && anim.cancel(); anim = pop.animate([{ opacity:0, transform:'scale(.96)' }, { opacity:1, transform:'none' }], { duration:175, easing:CSS.out, fill:'forwards' });
  };
  bs.forEach((b, i) => b.addEventListener('click', () => sel(i)));
  document.addEventListener('pointerdown', (e) => { if (on >= 0 && !box.contains(e.target)) sel(-1); });
  const pq = seq();
  return { async play() { const s = pq.begin(); sel(1); if (!await s.sleep(1300)) return; sel(3); if (!await s.sleep(1300)) return; sel(-1); } };
} });

/* ---------------- G1 边缘滑动返回 ---------------- */
gest.items.push({ code:'G1', name:'边缘滑动返回', use:'App 里有层级的页面：从左边缘拉，当前页跟手，下面那页从 -30% 跟上来', hint:'从左边缘往右拖；或点返回', mount(stage) {
  stage.innerHTML = `<div class="d-phone g1"><div class="g1-under"><div class="g1-h">订单</div>${['20261106', '20261105', '20261103'].map((n) => `<button class="g1-row" type="button"><b>订单 #${n}</b><span class="d-sk" style="width:60%"></span></button>`).join('')}</div><div class="g1-scrim"></div><div class="g1-top"><div class="g1-h"><button class="g1-back" type="button" aria-label="返回订单列表">${icon('back')}</button>订单详情</div><div class="g1-body"><span class="d-sk" style="width:70%"></span><span class="d-sk"></span><span class="d-sk" style="width:50%"></span><div class="g1-img"></div></div><div class="g1-edge" aria-hidden="true"></div></div></div>`;
  const W = 172, top = stage.querySelector('.g1-top'), under = stage.querySelector('.g1-under'), scrim = stage.querySelector('.g1-scrim');
  const paint = (x) => { const p = clamp(x / W, 0, 1); top.style.transform = `translateX(${x}px)`; under.style.transform = `translateX(${-0.3 * W * (1 - p)}px)`; scrim.style.opacity = 0.25 * (1 - p); top.style.pointerEvents = p > 0.99 ? 'none' : ''; };
  const sp = new Spring(0, { onUpdate:paint }); paint(0);
  let x0 = 0;
  const release = (vx) => { const back = Math.abs(vx) > GL.FLICK ? vx > 0 : sp.x > W / 2; sp.to(back ? W : 0, vx * 1000); };   // 先看速度方向，速度小才看过没过半
  drag(stage.querySelector('.g1-edge'), { down:() => { sp.stop(); x0 = sp.x; }, move:(e, dx) => { sp.x = clamp(x0 + dx, 0, W); paint(sp.x); }, up:(e, dx, dy, v) => release(v.vx) });
  stage.querySelector('.g1-back').addEventListener('click', () => sp.to(W));
  stage.querySelectorAll('.g1-row').forEach((r) => r.addEventListener('click', () => sp.to(0)));
  const pq = seq();
  return { async play() { const s = pq.begin(); if (sp.x > 1) { sp.to(0); if (!await s.sleep(700)) return; } sp.stop(); await tween(420, EASE.out, (p) => { if (s.alive()) { sp.x = W * 0.55 * p; paint(sp.x); } }); if (!s.alive()) return; release(0.25); if (!await s.sleep(1500)) return; sp.to(0); } };
} });

/* ---------------- G2 按钮滑出取消 ---------------- */
gest.items.push({ code:'G2', name:'按钮滑出取消', use:'付款、提交这类按钮：按着后悔了，手指滑出去，按钮慢慢弹回，松手不算', hint:'按住 → 滑出去 → 松手', mount(stage) {
  stage.innerHTML = `<button class="g2-btn" type="button">付款</button><div class="g2-hint" aria-live="polite">按住 → 滑出去 → 松手</div>`;
  const b = stage.querySelector('.g2-btn'), hint = stage.querySelector('.g2-hint');
  const dist = (x, y) => { const r = b.getBoundingClientRect(); return Math.hypot(Math.max(r.left - x, 0, x - r.right), Math.max(r.top - y, 0, y - r.bottom)); };
  const scale = (d) => 0.97 + 0.03 * clamp((d - 10) / 30, 0, 1);       // 出边界 10px 开始恢复，40px 完全恢复
  const setS = (v, ms) => { b.style.transition = `transform ${ms}ms var(--ease-out)`; b.style.transform = `scale(${v})`; };
  let t = 0;
  const say = (m) => { hint.textContent = m; clearTimeout(t); t = setTimeout(() => { hint.textContent = '按住 → 滑出去 → 松手'; }, 1400); };
  drag(b, { down:() => { setS(0.97, 140); hint.textContent = '按住了'; }, move:(e) => { const d = dist(e.clientX, e.clientY); setS(scale(d), 0); hint.textContent = d > 40 ? '滑出去了，松手不算' : '按住了'; },
    up:(e) => { const ok = dist(e.clientX, e.clientY) <= 10; setS(1, 140); say(ok ? '付款成功' : '没有付款'); } });
  b.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setS(0.97, 140); } });
  b.addEventListener('keyup', (e) => { if (e.key === 'Enter' || e.key === ' ') { setS(1, 140); say('付款成功'); } });
  const pq = seq();
  return { async play() { const s = pq.begin(); setS(0.97, 140); hint.textContent = '按住了'; if (!await s.sleep(500)) return; await tween(500, EASE.inOut, (p) => s.alive() && setS(scale(p * 60), 0)); if (!s.alive()) return; hint.textContent = '滑出去了，松手不算'; if (!await s.sleep(400)) return; setS(1, 140); say('没有付款'); } };
} });

/* ---------------- G3 数字翻牌 ---------------- */
gest.items.push({ code:'G3', name:'数字翻牌', use:'订单数、余额这类会变的数：只翻变了的那一位，多了往上翻，少了往下翻', hint:'点数字', mount(stage) {
  stage.innerHTML = `<button class="g3" type="button" aria-label="今天的订单，点一下加几单"><small>今天的订单</small><span class="g3-n" aria-live="polite"></span></button>`;
  const r = GL.roller(stage.querySelector('.g3-n'), 128);
  const bump = () => r.set(r.get() + (r.get() % 2 ? 7 : 13));
  stage.querySelector('.g3').addEventListener('click', bump);
  const pq = seq();
  return { async play() { const s = pq.begin(); bump(); if (!await s.sleep(900)) return; bump(); if (!await s.sleep(900)) return; r.set(r.get() - 4); } };
} });

/* ---------------- G4 方向锁定 ---------------- */
gest.items.push({ code:'G4', name:'方向锁定', use:'图片查看器：横着拖翻页、竖着拖关闭；先动 10px 才判断方向，判完锁到松手', hint:'在图片上横拖或竖拖', mount(stage) {
  stage.innerHTML = `<div class="g4"><div class="g4-lock" aria-live="polite">还没判定</div><div class="g4-v"><div class="g4-tr">${[0, 1, 2].map((i) => `<div class="g4-ph" style="background:linear-gradient(135deg, ${art(i)})">${i + 1} / 3</div>`).join('')}</div></div></div>`;
  const v = stage.querySelector('.g4-v'), tr = stage.querySelector('.g4-tr'), lock = stage.querySelector('.g4-lock'), W = 200;
  let page = 0, axis = null, x0 = 0, t = 0;
  const sx = new Spring(0, { onUpdate:(x) => { tr.style.transform = `translateX(${x}px)`; } });
  const sy = new Spring(0, { preset:'gesture', onUpdate:(y) => { v.style.transform = `translateY(${y}px) scale(${1 - Math.min(Math.abs(y) / 600, 0.15)})`; } });
  const say = (m) => { lock.textContent = m; clearTimeout(t); };
  const begin = () => { axis = null; sx.stop(); sy.stop(); x0 = sx.x; say('还没判定'); };
  const move = (dx, dy) => {
    if (!axis) { if (Math.hypot(dx, dy) < 10) return; axis = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y'; say(axis === 'x' ? '锁定：横向（翻页）' : '锁定：纵向（关闭）'); }
    if (axis === 'x') { let x = x0 + dx; const min = -(2 * W); if (x > 0) x = GL.rubber(x, W); if (x < min) x = min - GL.rubber(min - x, W); sx.x = x; sx.onUpdate(x); }
    else { sy.x = dy; sy.onUpdate(dy); }
  };
  const end = (dx, dy, vel) => {
    if (axis === 'x') { if (Math.abs(vel.vx) > GL.FLICK) page -= Math.sign(vel.vx); else if (Math.abs(dx) > W / 2) page -= Math.sign(dx); page = clamp(page, 0, 2); sx.to(-page * W, vel.vx * 1000); }
    else if (axis === 'y') {
      if (vel.vy > GL.FLICK || dy > 70) { v.animate([{ opacity:1, transform:v.style.transform }, { opacity:0, transform:`translateY(${dy + 60}px) scale(.85)` }], { duration:200, easing:CSS.out, fill:'forwards' }); say('已关闭');
        setTimeout(() => { v.getAnimations().forEach((a) => a.cancel()); sy.jump(0); v.animate([{ opacity:0 }, { opacity:1 }], { duration:200, easing:CSS.out }); say('还没判定'); }, 900); }
      else sy.to(0, vel.vy * 1000);
    }
    axis = null; t = setTimeout(() => { lock.textContent = '还没判定'; }, 900);
  };
  drag(v, { down:begin, move:(e, dx, dy) => move(dx, dy), up:(e, dx, dy, vel) => end(dx, dy, vel) });
  v.tabIndex = 0; v.setAttribute('aria-label', '图片查看器，左右键翻页');
  v.addEventListener('keydown', (e) => { const k = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0; if (!k) return; e.preventDefault(); page = clamp(page + k, 0, 2); sx.to(-page * W); });
  const pq = seq();
  const fake = async (s, fx, fy, ms) => { begin(); let lx = 0, ly = 0; await tween(ms, EASE.out, (p) => { if (s.alive()) { lx = fx * p; ly = fy * p; move(lx, ly); } }); return [lx, ly]; };
  return { async play() { const s = pq.begin(); if (page) { page = 0; sx.to(0); if (!await s.sleep(600)) return; }
    const [a] = await fake(s, -90, 3, 380); if (!s.alive()) return; end(a, 0, { vx:-0.4, vy:0 }); if (!await s.sleep(900)) return;
    const [, b] = await fake(s, 4, 46, 400); if (!s.alive()) return; end(0, b, { vx:0, vy:0 }); } };
} });

/* ---------------- G6 轮播预判落点 ---------------- */
gest.items.push({ code:'G6', name:'轮播预判落点', use:'横滑卡片、分页轮播：拖的时候就算出会停在哪张，提前亮起来', hint:'甩一下卡片；或聚焦按 ← →', mount(stage) {
  const n = 6, P = 162, off = (240 - 150) / 2;
  stage.innerHTML = `<div class="g6"><div class="g6-v" tabindex="0" aria-label="套餐卡片，左右键切换"><div class="g6-tr">${Array.from({ length:n }, (_, i) => `<div class="g6-c" style="background:linear-gradient(135deg, ${art(i)})">套餐 ${i + 1}</div>`).join('')}</div></div><div class="g6-dots">${'<i></i>'.repeat(n)}</div></div>`;
  const vp = stage.querySelector('.g6-v'), tr = stage.querySelector('.g6-tr'), cs = [...tr.children], dots = [...stage.querySelectorAll('.g6-dots i')];
  let idx = 0, x0 = 0;
  const mark = (i) => { cs.forEach((c, k) => c.classList.toggle('tgt', k === i)); dots.forEach((d, k) => d.classList.toggle('on', k === i)); };
  const sp = new Spring(0, { onUpdate:(x) => { tr.style.transform = `translateX(${off + x}px)`; } }); sp.onUpdate(0); mark(0);
  const aim = (x, vx) => clamp(Math.round(-GL.project(x, vx * 1000) / P), 0, n - 1);    // 当前位置 + 动量落点，吸到最近一张
  const moveTo = (x, vx) => { const min = -(n - 1) * P; if (x > 0) x = GL.rubber(x, 240); if (x < min) x = min - GL.rubber(min - x, 240); sp.x = x; sp.onUpdate(x); mark(aim(x, vx)); };
  const release = (vx) => { idx = aim(sp.x, vx); mark(idx); sp.to(-idx * P, vx * 1000); };
  drag(vp, { down:() => { sp.stop(); x0 = sp.x; }, move:(e, dx, dy, v) => moveTo(x0 + dx, v.vx), up:(e, dx, dy, v) => release(v.vx) });
  vp.addEventListener('keydown', (e) => { const k = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0; if (!k) return; e.preventDefault(); idx = clamp(idx + k, 0, n - 1); mark(idx); sp.to(-idx * P); });
  const pq = seq();
  return { async play() { const s = pq.begin(); if (idx) { idx = 0; mark(0); sp.to(0); if (!await s.sleep(700)) return; } sp.stop();
    await tween(140, (p) => p, (p) => s.alive() && moveTo(-55 * p, -0.9)); if (!s.alive()) return; release(-0.9); if (!await s.sleep(1600)) return; idx = 0; mark(0); sp.to(0); } };
} });

/* ---------------- G7 到顶阻尼回弹 ---------------- */
gest.items.push({ code:'G7', name:'到顶阻尼回弹', use:'列表拉到头：越拉越重，松手弹回，告诉你「到底了」', hint:'在框里往下拖', mount(stage) {
  stage.innerHTML = `<div class="g7" aria-label="列表，往下拖试试"><div class="g7-e"></div><div class="g7-s">${Array.from({ length:6 }, (_, i) => `<div class="g7-l${i % 3 === 2 ? ' s' : ''}"></div>`).join('')}</div></div><div class="g7-hint">在方框里往下拖</div>`;
  const box = stage.querySelector('.g7'), sh = stage.querySelector('.g7-s'), edge = stage.querySelector('.g7-e'), H = 150;
  const paint = (y) => { sh.style.transform = `translateY(${y}px)`; edge.style.opacity = String(Math.min(y / 40, 1) * 0.8); };
  const sp = new Spring(0, { onUpdate:paint });
  drag(box, { down:() => sp.stop(), move:(e, dx, dy) => { sp.x = GL.rubber(Math.max(dy, 0), H); paint(sp.x); }, up:() => sp.to(0) });
  const pq = seq();
  return { async play() { const s = pq.begin(); sp.stop(); await tween(500, EASE.out, (p) => { if (s.alive()) { sp.x = GL.rubber(160 * p, H); paint(sp.x); } }); if (!s.alive()) return; await s.sleep(150); sp.to(0); } };
} });

/* ---------------- G8 滑动确认 ---------------- */
gest.items.push({ code:'G8', name:'滑动确认', use:'手机上不能误触的事：付款、转账、开锁。慢拖过 85% 才算，甩一下也算', hint:'拖圆钮；键盘按回车', mount(stage) {
  stage.innerHTML = `<div class="g8-wrap"><div class="g8"><span class="g8-t">滑动付款 RM 128</span><button class="g8-h" type="button" aria-label="滑动付款 RM 128，按回车确认">${icon('back')}</button></div><small aria-live="polite">没过 85% 就弹回去</small></div>`;
  const tr = stage.querySelector('.g8'), h = stage.querySelector('.g8-h'), txt = stage.querySelector('.g8-t'), note = stage.querySelector('small'), MAX = 240 - 52;
  h.querySelector('svg').style.transform = 'rotate(180deg)';
  let locked = false, x0 = 0;
  const paint = (x) => { h.style.transform = `translateX(${x}px)`; if (!locked) txt.style.opacity = 1 - clamp(x / MAX, 0, 1); };   // 提示字的透明度 = 1 − 进度
  const sp = new Spring(0, { onUpdate:paint }); paint(0);
  const commit = () => { locked = true; sp.use('ui').to(MAX); tr.classList.add('done'); h.innerHTML = icon('check'); txt.textContent = '已付款'; txt.style.opacity = 1; note.textContent = '已付款，等结果回来';
    setTimeout(reset, 2000); };
  const reset = () => { locked = false; tr.classList.remove('done'); h.innerHTML = icon('back'); h.querySelector('svg').style.transform = 'rotate(180deg)'; txt.textContent = '滑动付款 RM 128'; sp.use('ui').to(0); note.textContent = '没过 85% 就弹回去'; };
  const release = (vx) => { const go = vx > GL.FLICK || (Math.abs(vx) <= GL.FLICK && sp.x / MAX > 0.85); if (go) commit(); else { sp.use('gesture').to(0, vx * 1000); note.textContent = '没过 85%，弹回去了'; } };
  drag(h, { down:() => { if (locked) return false; sp.stop(); x0 = sp.x; }, move:(e, dx) => { sp.x = clamp(x0 + dx, 0, MAX); paint(sp.x); }, up:(e, dx, dy, v) => release(v.vx) });
  h.addEventListener('click', (e) => { if (e.detail === 0 && !locked) commit(); });   // 键盘回车、空格
  const pq = seq();
  const slide = async (s, to, ms) => { sp.stop(); await tween(ms, EASE.inOut, (p) => { if (s.alive()) { sp.x = MAX * to * p; paint(sp.x); } }); return s.alive(); };
  return { async play() { const s = pq.begin(); if (locked) return; if (!await slide(s, 0.55, 500)) return; release(0); if (!await s.sleep(900)) return; if (!await slide(s, 0.92, 600)) return; release(0); } };
} });

/* ---------------- G11 按住录音 ---------------- */
gest.items.push({ code:'G11', name:'按住录音', use:'聊天里的语音消息：按住录，松手发，往左滑 80px 取消（取消会丢掉录音，所以变红）', hint:'按住按钮；键盘按住空格', mount(stage) {
  stage.innerHTML = `<div class="g11"><div class="g11-chat"><div class="g11-m">周六几点到？</div></div><div class="g11-rec"><span class="g11-x">← 滑到这里取消</span><div class="g11-w">${'<i></i>'.repeat(18)}</div><span class="g11-t">0:00</span></div><div class="g11-tip" aria-live="polite"></div><button class="g11-b" type="button">${icon('mic')}<span>按住说话</span></button></div>`;
  const b = stage.querySelector('.g11-b'), lb = b.querySelector('span'), rec = stage.querySelector('.g11-rec'), bars = [...stage.querySelectorAll('.g11-w i')], tm = stage.querySelector('.g11-t'), cx = stage.querySelector('.g11-x'), chat = stage.querySelector('.g11-chat'), tip = stage.querySelector('.g11-tip');
  let t0 = 0, raf = 0, cancel = false, on = false, ph = 0;
  const loop = () => { ph += 0.35; bars.forEach((x, i) => { x.style.transform = `scaleY(${(0.2 + 0.8 * Math.abs(Math.sin(ph + i * 0.7) * Math.sin(ph * 0.37 + i))).toFixed(3)})`; }); const sec = (performance.now() - t0) / 1000; tm.textContent = `0:${String(Math.floor(sec)).padStart(2, '0')}`; raf = requestAnimationFrame(loop); };   // 波形直接跟音量走，不加缓动
  const start = () => { on = true; cancel = false; t0 = performance.now(); b.classList.add('down'); rec.classList.add('on'); tip.textContent = ''; lb.textContent = '松手发送'; cancelAnimationFrame(raf); loop(); };
  const slide = (dx) => { if (!on) return; const p = clamp(-dx / 80, 0, 1); cx.style.opacity = p; cancel = -dx > 80; b.classList.toggle('cancel', cancel); lb.textContent = cancel ? '松手取消' : '松手发送'; };
  const stop = () => {
    if (!on) return; on = false; cancelAnimationFrame(raf); b.classList.remove('down', 'cancel'); rec.classList.remove('on'); cx.style.opacity = 0; lb.textContent = '按住说话';
    const sec = (performance.now() - t0) / 1000;
    if (cancel) { tip.textContent = '已取消'; return; }
    if (sec < 1) { tip.textContent = '说话时间太短'; return; }
    const m = document.createElement('div'); m.className = 'g11-m me'; m.innerHTML = `${icon('play')}${Math.round(sec)}″`; chat.append(m);
    m.animate([{ opacity:0, transform:'translateY(8px)' }, { opacity:1, transform:'none' }], { duration:200, easing:CSS.out });
    while (chat.children.length > 3) chat.firstChild.remove();
  };
  drag(b, { down:start, move:(e, dx) => slide(dx), up:stop });
  b.addEventListener('keydown', (e) => { if (e.key === ' ' && !e.repeat) { e.preventDefault(); start(); } });
  b.addEventListener('keyup', (e) => { if (e.key === ' ') stop(); });
  const pq = seq();
  return { async play() { const s = pq.begin(); start(); if (!await s.sleep(1700)) return; stop(); if (!await s.sleep(1000)) return; start(); if (!await s.sleep(500)) return;
    await tween(500, EASE.out, (p) => s.alive() && slide(-110 * p)); if (!await s.sleep(500)) return; stop(); } };
} });

/* ---------------- P1 捏合换密度 ---------------- */
page.items.push({ code:'P1', name:'捏合换密度', use:'相册、商品网格：两指捏合换一排几张，每张从旧位置滑到新位置', hint:'触控板捏合、两指捏合；或点按钮', mount(stage) {
  const cols = [2, 3, 4]; let ci = 1;
  stage.innerHTML = `<div class="p1"><div class="p1-v"><div class="p1-g" style="--c:3">${Array.from({ length:16 }, (_, i) => `<i style="background:linear-gradient(135deg, ${art(i)})"></i>`).join('')}</div></div><div class="p1-bt"><button type="button" data-k="1">更密</button><button type="button" data-k="-1">更疏</button></div></div>`;
  const vp = stage.querySelector('.p1-v'), g = stage.querySelector('.p1-g'), tiles = [...g.children];
  let z = 1, flip = [];
  const zs = new Spring(1, { eps:0.0005, onUpdate:(v) => { z = v; g.style.transform = `scale(${v})`; } });
  const fp = new Spring(0, { eps:0.0005, onUpdate:(p) => tiles.forEach((t, i) => { const f = flip[i]; if (f) t.style.transform = p ? `translate(${f.dx * p}px, ${f.dy * p}px) scale(${1 + (f.sx - 1) * p})` : ''; }) });
  const setCols = (k) => {
    const n = clamp(ci + k, 0, cols.length - 1); if (n === ci) { zs.to(1); return; }
    const a = tiles.map((t) => t.getBoundingClientRect());          // 先记旧位置（含正在捏的缩放）
    ci = n; zs.jump(1); fp.jump(0); g.style.setProperty('--c', cols[ci]);
    const b = tiles.map((t) => t.getBoundingClientRect());
    flip = b.map((r, i) => ({ dx:a[i].left - r.left, dy:a[i].top - r.top, sx:a[i].width / r.width }));
    fp.jump(1); fp.to(0);                                            // spring-ui 从旧位置回到新位置
  };
  const decide = () => { if (z < 0.75) setCols(1); else if (z > 1.33) setCols(-1); else zs.to(1); };
  let wt = 0;
  vp.addEventListener('wheel', (e) => { if (!e.ctrlKey) return; e.preventDefault(); zs.stop(); zs.x = clamp(z * Math.exp(-e.deltaY * 0.01), 0.5, 1.8); zs.onUpdate(zs.x); clearTimeout(wt); wt = setTimeout(decide, 160); }, { passive:false });
  const pts = new Map(); let d0 = 0;
  vp.addEventListener('pointerdown', (e) => { if (e.pointerType !== 'touch') return; pts.set(e.pointerId, e); if (pts.size === 2) { const [p, q] = [...pts.values()]; d0 = Math.hypot(p.clientX - q.clientX, p.clientY - q.clientY); zs.stop(); } });
  vp.addEventListener('pointermove', (e) => { if (!pts.has(e.pointerId)) return; pts.set(e.pointerId, e); if (pts.size === 2 && d0) { const [p, q] = [...pts.values()]; zs.x = clamp(Math.hypot(p.clientX - q.clientX, p.clientY - q.clientY) / d0, 0.5, 1.8); zs.onUpdate(zs.x); } });
  const up = (e) => { if (!pts.delete(e.pointerId)) return; if (d0 && pts.size < 2) { d0 = 0; decide(); } };
  vp.addEventListener('pointerup', up); vp.addEventListener('pointercancel', up);
  stage.querySelectorAll('.p1-bt button').forEach((b) => b.addEventListener('click', () => setCols(+b.dataset.k)));
  const pq = seq();
  const pinch = async (s, to) => { zs.stop(); await tween(350, EASE.out, (p) => { if (s.alive()) { zs.x = 1 + (to - 1) * p; zs.onUpdate(zs.x); } }); if (s.alive()) decide(); };
  return { async play() { const s = pq.begin(); if (ci !== 1) { setCols(1 - ci); if (!await s.sleep(800)) return; } await pinch(s, 0.7); if (!await s.sleep(1400)) return; await pinch(s, 1.45); } };
} });

/* ---------------- P2 滚动驱动动画 ---------------- */
page.items.push({ code:'P2', name:'滚动驱动动画', use:'落地页讲产品：滚到哪，画面就到哪；往回滚也倒着走，没有时长', hint:'在框里上下滚', mount(stage) {
  const caps = ['一部手机', '装下整家店', '随时看收入'];
  stage.innerHTML = `<div class="p2" tabindex="0" aria-label="产品介绍，可以滚动"><div class="p2-k"><div class="p2-ph"><i class="p2-sc"></i></div><div class="p2-cap">${caps.map((c) => `<span>${c}</span>`).join('')}</div><div class="p2-bar"><i></i></div></div><div class="p2-sp"></div></div>`;
  const sc = stage.querySelector('.p2'), ph = stage.querySelector('.p2-ph'), scr = stage.querySelector('.p2-sc'), cs = [...stage.querySelectorAll('.p2-cap span')], bar = stage.querySelector('.p2-bar i');
  const paint = () => { const p = clamp(sc.scrollTop / Math.max(1, sc.scrollHeight - sc.clientHeight), 0, 1);   // 进度 = 滚动位置线性映射到 0–1
    ph.style.transform = `translateY(${-14 + 4 * p}px) rotate(${-14 + 14 * p}deg) scale(${0.9 + 0.1 * p})`; scr.style.transform = `scaleY(${p})`; bar.style.transform = `scaleX(${p})`;
    cs.forEach((c, i) => { c.style.opacity = clamp(1 - Math.abs(p * 2 - i) * 1.6, 0, 1); }); };
  sc.addEventListener('scroll', paint, { passive:true }); paint();
  const pq = seq();
  return { async play() { const s = pq.begin(); sc.scrollTo({ top:0 }); sc.scrollTo({ top:sc.scrollHeight, behavior:'smooth' }); if (await s.sleep(1700)) sc.scrollTo({ top:0, behavior:'smooth' }); },
    final() { sc.scrollTop = sc.scrollHeight; paint(); } };
} });

/* ---------------- P3 速度拖影 ---------------- */
page.items.push({ code:'P3', name:'速度拖影', use:'图片为主的横向画廊：滑得越快越糊，只往滑的方向糊，停下就清楚', hint:'快速横着滑', mount(stage) {
  stage.innerHTML = `<svg width="0" height="0" style="position:absolute" aria-hidden="true"><filter id="p3-f" x="-5%" width="110%"><feGaussianBlur stdDeviation="0 0"/></filter></svg><div class="p3" tabindex="0" aria-label="图片横向列表，可以滚动"><div class="p3-tr">${Array.from({ length:14 }, (_, i) => `<i style="background:linear-gradient(160deg, ${art(i)})">作品 ${i + 1}</i>`).join('')}</div></div>`;
  const sc = stage.querySelector('.p3'), tr = stage.querySelector('.p3-tr'), blur = stage.querySelector('feGaussianBlur');
  const bs = new Spring(0, { eps:0.02, onUpdate:(b) => { blur.setAttribute('stdDeviation', `${b.toFixed(2)} 0`); tr.style.filter = b > 0.1 ? 'url(#p3-f)' : ''; } });   // 一次加在整条上，不每项加
  let last = sc.scrollLeft, lt = performance.now(), raf = 0, quiet = 0;
  const loop = (t) => { const v = (sc.scrollLeft - last) / Math.max(1, t - lt); last = sc.scrollLeft; lt = t;
    if (Math.abs(v) > 0.01) quiet = t; bs.to(Math.min(Math.abs(v) * 2.6, 8));                   // 跟速度成正比，上限 8px；速度归零时 spring-ui 回到 0
    raf = t - quiet < 120 ? requestAnimationFrame(loop) : (bs.to(0), 0); };
  sc.addEventListener('scroll', () => { if (!raf) { last = sc.scrollLeft; lt = performance.now(); quiet = lt; raf = requestAnimationFrame(loop); } }, { passive:true });
  const pq = seq();
  return { async play() { const s = pq.begin(); sc.scrollTo({ left:sc.scrollWidth, behavior:'smooth' }); if (await s.sleep(1100)) sc.scrollTo({ left:0, behavior:'smooth' }); } };
} });

/* ---------------- P5 参考线吸附 ---------------- */
page.items.push({ code:'P5', name:'参考线吸附', use:'画布、编辑器里拖东西：靠近对齐线 6px 就跳过去，离开 10px 才放开', hint:'拖 B；按住 Alt 不吸附；方向键微调', mount(stage) {
  stage.innerHTML = `<div class="p5"><div class="p5-a">A</div><div class="p5-b" tabindex="0" role="button" aria-label="可拖动的方块 B，方向键移动">B</div><i class="p5-gx"></i><i class="p5-gy"></i><span class="p5-tip">按住 Alt 拖不吸附</span></div>`;
  const b = stage.querySelector('.p5-b'), gx = stage.querySelector('.p5-gx'), gy = stage.querySelector('.p5-gy');
  const A = { l:40, t:40, w:70, h:44 }, bw = 56, bh = 36;
  const cand = (al, as, bs) => [[al, al], [al + as, al + as], [al + as - bs, al + as], [al - bs, al], [al + as / 2 - bs / 2, al + as / 2]];   // [B 的位置, 参考线位置]
  const CX = cand(A.l, A.w, bw), CY = cand(A.t, A.h, bh);
  const snap = { x:null, y:null };
  let raw = { x:150, y:118 }, free = false;
  const axis = (k, v, C, g) => {
    if (free) { snap[k] = null; return v; }
    if (snap[k] && Math.abs(v - snap[k][0]) > 10) snap[k] = null;            // 离开 10px 才放开
    if (!snap[k]) { let best = null; C.forEach((c) => { const d = Math.abs(v - c[0]); if (d < 6 && (!best || d < best.d)) best = { c, d }; }); if (best) snap[k] = best.c; }   // 进入 6px 直接跳过去，不插值
    return snap[k] ? snap[k][0] : v;
  };
  const place = () => { const x = axis('x', raw.x, CX), y = axis('y', raw.y, CY); b.style.transform = `translate(${x}px, ${y}px)`;
    gx.style.opacity = snap.x ? 1 : 0; if (snap.x) gx.style.left = snap.x[1] + 'px'; gy.style.opacity = snap.y ? 1 : 0; if (snap.y) gy.style.top = snap.y[1] + 'px'; };
  place();
  let r0 = null;
  drag(b, { down:(e) => { r0 = { ...raw }; free = e.altKey; }, move:(e, dx, dy) => { free = e.altKey; raw = { x:clamp(r0.x + dx, 0, 184), y:clamp(r0.y + dy, 0, 136) }; place(); }, up:() => { raw = { x:snap.x ? snap.x[0] : raw.x, y:snap.y ? snap.y[0] : raw.y }; } });
  b.addEventListener('keydown', (e) => { const d = { ArrowLeft:[-4, 0], ArrowRight:[4, 0], ArrowUp:[0, -4], ArrowDown:[0, 4] }[e.key]; if (!d) return; e.preventDefault(); raw = { x:clamp(raw.x + d[0], 0, 184), y:clamp(raw.y + d[1], 0, 136) }; place(); });
  const pq = seq();
  return { async play() { const s = pq.begin(); free = false; snap.x = snap.y = null; raw = { x:160, y:120 }; place(); if (!await s.sleep(300)) return;
    await tween(1500, EASE.inOut, (p) => { if (s.alive()) { raw = { x:160 - 113 * p, y:120 - 34 * p }; place(); } }); } };
} });

/* ---------------- P11 滚动渐显 ---------------- */
page.items.push({ code:'P11', name:'滚动渐显', use:'落地页、对外汇报页：内容进屏幕时淡入上移一次，同一批每项差 50ms', hint:'在框里往下滚', mount(stage) {
  const row = (i) => `<div class="p11-row"><div class="p11-it" style="background:linear-gradient(135deg, ${art(i)})"></div><div class="p11-it" style="background:linear-gradient(135deg, ${art(i + 3)})"></div></div>`;
  const text = `<div class="p11-tx"><span class="d-sk" style="width:80%"></span><span class="d-sk" style="width:60%"></span></div>`;
  stage.innerHTML = `<div class="p11" tabindex="0" aria-label="长页面，可以滚动"><b>春季新品</b>${text}${row(0)}${text}${row(1)}${text}${row(2)}${text}</div>`;
  const sc = stage.querySelector('.p11'), items = [...sc.querySelectorAll('.p11-tx, .p11-it')];
  const io = new IntersectionObserver((list) => {
    let k = 0;
    list.forEach((en) => { if (!en.isIntersecting) return; const el = en.target; io.unobserve(el);
      el.style.transitionDelay = Math.min(k++ * 50, 300) + 'ms'; el.dataset.reveal = 'in';                  // 按这一批里的序号错峰
      el.addEventListener('transitionend', () => { delete el.dataset.reveal; el.style.transitionDelay = ''; }, { once:true }); });
  }, { root:sc, rootMargin:'0px 0px -10% 0px' });
  const arm = () => { items.forEach((el) => { io.unobserve(el); delete el.dataset.reveal; el.style.transitionDelay = ''; if (el.offsetTop - sc.scrollTop > sc.clientHeight) { el.dataset.reveal = 'wait'; io.observe(el); } }); };   // 只藏屏幕下方的
  const pq = seq();
  return { async play() { const s = pq.begin(); sc.scrollTop = 0; arm(); if (!await s.sleep(300)) return; sc.scrollTo({ top:sc.scrollHeight, behavior:'smooth' }); if (await s.sleep(2400)) sc.scrollTo({ top:0, behavior:'smooth' }); },
  };
} });

/* ---------------- M2 液态形变 ---------------- */
feel.items.push({ code:'M2', name:'液态形变', use:'品牌页上可拖的气泡、悬浮按钮：顺着方向拉长、侧面压扁，面积不变', hint:'拖着圆球甩', mount(stage) {
  stage.innerHTML = `<button class="m2" type="button" aria-label="可以拖动的圆球"></button>`;
  const el = stage.querySelector('.m2');
  let vx = 0, vy = 0;
  const paint = (x, y, vX, vY) => { const sp = Math.hypot(vX, vY), sx = Math.min(1 + 0.15 * sp, 1.2), th = Math.atan2(vY, vX);
    el.style.transform = `translate(${x}px, ${y}px) rotate(${th}rad) scale(${sx}, ${1 / sx}) rotate(${-th}rad)`; };   // 先转到速度方向，再缩放，再转回
  const X = new Spring(0, { preset:'gesture', onUpdate:() => paint(X.x, Y.x, X.v / 1000, Y.v / 1000) });
  const Y = new Spring(0, { preset:'gesture', onUpdate:() => paint(X.x, Y.x, X.v / 1000, Y.v / 1000) });
  let x0 = 0, y0 = 0;
  const set = (x, y, a, b) => { X.stop(); Y.stop(); X.x = x; Y.x = y; paint(x, y, a, b); };
  const free = (a, b) => { X.to(0, a * 1000); Y.to(0, b * 1000); };       // 松手 spring-gesture 回原形，轻微回弹就是果冻感
  drag(el, { down:() => { x0 = X.x; y0 = Y.x; X.stop(); Y.stop(); }, move:(e, dx, dy, v) => set(clamp(x0 + dx, -110, 110), clamp(y0 + dy, -70, 70), v.vx, v.vy), up:(e, dx, dy, v) => free(v.vx, v.vy) });
  const pq = seq();
  return { async play() { const s = pq.begin(); let px = 0, py = 0, pt = performance.now();
    await tween(700, EASE.inOut, (p) => { if (!s.alive()) return; const t = performance.now(), x = 90 * Math.sin(p * Math.PI * 1.5), y = -40 * Math.sin(p * Math.PI); vx = (x - px) / Math.max(1, t - pt); vy = (y - py) / Math.max(1, t - pt); px = x; py = y; pt = t; set(x, y, vx, vy); });
    if (s.alive()) free(vx, vy); } };
} });

/* ---------------- M3 3D 视差 ---------------- */
feel.items.push({ code:'M3', name:'3D 视差', use:'落地页首屏、卡片悬停：前景动 20px、中景 10px、背景 4px，最多转 8°', hint:'鼠标在卡片上移动', mount(stage) {
  stage.innerHTML = `<div class="m3"><div class="m3-c"><div class="m3-l m3-bg"></div><div class="m3-l m3-mid"><i></i></div><div class="m3-l m3-fg"><b>秋季限定</b><span>焦糖拿铁 RM 14</span></div></div></div>`;
  const wrap = stage.querySelector('.m3'), c = stage.querySelector('.m3-c'), [bg, mid, fg] = [...c.children];
  const paint = () => { const x = NX.x, y = NY.x; c.style.transform = `rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
    bg.style.transform = `translate(${x * 4}px, ${y * 4}px)`; mid.style.transform = `translate(${x * 10}px, ${y * 10}px)`; fg.style.transform = `translate(${x * 20}px, ${y * 20}px)`; };
  const NX = new Spring(0, { eps:0.001, onUpdate:paint }), NY = new Spring(0, { eps:0.001, onUpdate:paint });   // 用 spring-ui 跟随，不直接赋值
  const fine = matchMedia('(hover: hover) and (pointer: fine)');
  wrap.addEventListener('pointermove', (e) => { if (!fine.matches || GL.reduce.matches) return; const r = c.getBoundingClientRect(); NX.to(clamp((e.clientX - r.left) / r.width * 2 - 1, -1, 1)); NY.to(clamp((e.clientY - r.top) / r.height * 2 - 1, -1, 1)); });
  wrap.addEventListener('pointerleave', () => { NX.to(0); NY.to(0); });
  const pq = seq();
  return { async play() { const s = pq.begin(); await tween(1800, (p) => p, (p) => { if (s.alive()) { NX.to(Math.sin(p * Math.PI * 2) * 0.9); NY.to(-Math.cos(p * Math.PI * 2) * 0.6); } }); if (s.alive()) { NX.to(0); NY.to(0); } } };
} });

/* ---------------- M6 图片展开至全屏 ---------------- */
feel.items.push({ code:'M6', name:'图片展开至全屏', use:'相册、商品图点开看大图：从小图原位置放大，往下拖缩回去', hint:'点小图；大图往下拖或按 Esc 关', mount(stage) {
  stage.innerHTML = `<div class="m6"><small>点开看大图</small><div class="m6-row">${[0, 1, 2].map((i) => `<button class="m6-t" type="button" aria-label="打开第 ${i + 1} 张大图" style="background-image:linear-gradient(160deg, ${art(i)})"></button>`).join('')}</div></div><div class="m6-ov" role="dialog" aria-label="大图" tabindex="-1"><div class="m6-sc"></div><div class="m6-f"></div></div>`;
  const ts = [...stage.querySelectorAll('.m6-t')], ov = stage.querySelector('.m6-ov'), scrim = stage.querySelector('.m6-sc'), full = stage.querySelector('.m6-f');
  const FW = 200, FH = 150; let from = null, cur = -1, moved = false;
  const paint = (p) => { if (!from) return; const s0 = from.h / FH, s = s0 + (1 - s0) * p, ins = ((FW - from.w / s0) / 2) * (1 - p);   // 比例不同就用 clip-path 裁，不拉伸
    full.style.transform = `translate(${from.dx * (1 - p)}px, ${from.dy * (1 - p)}px) scale(${s})`; full.style.clipPath = `inset(0 ${ins.toFixed(2)}px round ${(10 / s0) * (1 - p) + 12 * p}px)`; scrim.style.opacity = 0.6 * clamp(p, 0, 1); };
  const sp = new Spring(0, { eps:0.0008, onUpdate:paint, onRest:() => { if (sp.target === 0) { ov.style.display = 'none'; ts[cur] && (ts[cur].style.visibility = ''); } } });
  const open = (i) => { cur = i; const t = ts[i].getBoundingClientRect(), st = stage.getBoundingClientRect();
    from = { w:t.width, h:t.height, dx:(t.left + t.width / 2) - (st.left + st.width / 2), dy:(t.top + t.height / 2) - (st.top + st.height / 2) };
    full.style.backgroundImage = ts[i].style.backgroundImage; ov.style.display = 'block'; ts[i].style.visibility = 'hidden'; sp.jump(0); sp.to(1); };
  const close = (v) => { sp.to(0, v); };
  ts.forEach((t, i) => t.addEventListener('click', () => { open(i); ov.focus({ preventScroll:true }); }));
  drag(ov, { down:() => { moved = false; sp.stop(); }, move:(e, dx, dy) => { if (Math.abs(dy) > 4) moved = true; sp.x = clamp(1 - Math.max(dy, 0) / 250, 0, 1); paint(sp.x); },
    up:(e, dx, dy, v) => { if (!moved) return close(0); const pv = -v.vy * 1000 / 250; if (v.vy > GL.FLICK || sp.x < 0.6) close(pv); else sp.to(1, pv); } });
  ov.addEventListener('keydown', (e) => { if (e.key === 'Escape') { close(0); ts[cur].focus(); } });
  const pq = seq();
  return { async play() { const s = pq.begin(); open(1); if (await s.sleep(1400)) close(0); } };
} });

/* ---------------- M7 手势转场 ---------------- */
feel.items.push({ code:'M7', name:'手势转场', use:'底部弹层、卡片展开：转场进度 = 拖的距离，1:1 跟手，松手看速度再看过没过半', hint:'上下拖把手；或点一下', mount(stage) {
  stage.innerHTML = `<div class="d-phone"><div class="m7-bg">${Array.from({ length:6 }, (_, i) => `<span class="d-sk" style="width:${50 + (i * 17) % 45}%"></span>`).join('')}</div><div class="m7-sc"></div><div class="m7-sh"><button class="m7-hd" type="button" aria-expanded="false">购物车 3 件 · RM 328</button><div class="m7-bd"><div class="m7-it"><span>手冲豆 250g</span><span>RM 68</span></div><div class="m7-it"><span>陶瓷滤杯</span><span>RM 120</span></div><div class="m7-it"><span>电子秤</span><span>RM 140</span></div><div class="m7-go">去结算</div></div></div></div>`;
  const sh = stage.querySelector('.m7-sh'), hd = stage.querySelector('.m7-hd'), scrim = stage.querySelector('.m7-sc'), D = 168 - 46;
  const paint = (p) => { sh.style.transform = `translateY(${(1 - p) * D}px)`; scrim.style.opacity = 0.3 * clamp(p, 0, 1); hd.setAttribute('aria-expanded', p > 0.5); };
  const sp = new Spring(0, { eps:0.0008, onUpdate:paint }); paint(0);
  let p0 = 0, moved = false;
  const settle = (vy) => { const open = Math.abs(vy) > GL.FLICK ? vy < 0 : sp.x > 0.5; sp.to(open ? 1 : 0, -vy * 1000 / D); };
  drag(hd, { down:() => { sp.stop(); p0 = sp.x; moved = false; }, move:(e, dx, dy) => { if (Math.abs(dy) > 4) moved = true; let p = p0 - dy / D; if (p > 1) p = 1 + GL.rubber(p - 1, 1) * 0.3; if (p < 0) p = -GL.rubber(-p, 1) * 0.3; sp.x = p; paint(p); },
    up:(e, dx, dy, v) => { if (!moved) return sp.to(sp.x > 0.5 ? 0 : 1); settle(v.vy); } });
  hd.addEventListener('click', (e) => { if (e.detail === 0) sp.to(sp.x > 0.5 ? 0 : 1); });
  const pq = seq();
  const fake = async (s, a, b, vy) => { sp.stop(); await tween(380, EASE.out, (p) => { if (s.alive()) { sp.x = a + (b - a) * p; paint(sp.x); } }); if (s.alive()) settle(vy); };
  return { async play() { const s = pq.begin(); if (sp.x > 0.5) { sp.to(0); if (!await s.sleep(600)) return; } await fake(s, 0, 0.55, -0.3); if (!await s.sleep(1400)) return; await fake(s, 1, 0.7, 0.4); } };
} });

/* ---------------- E1 悬停抬起 + 邻位让位 ---------------- */
web.items.push({ code:'E1', name:'悬停抬起 + 邻位让位', use:'桌面上一排卡片（套餐、作品）：鼠标放上去这张抬起，左右两张各让开 4px', hint:'鼠标划过；或 Tab 过去', mount(stage) {
  stage.innerHTML = `<div class="e1">${[0, 1, 2, 3].map((i) => `<button type="button" aria-label="套餐 ${i + 1}"><i style="background:linear-gradient(135deg, ${art(i)})"></i><span class="d-sk" style="width:80%"></span><span class="d-sk" style="width:50%"></span></button>`).join('')}</div>`;
  const bs = [...stage.querySelectorAll('.e1 button')], fine = matchMedia('(hover: hover) and (pointer: fine)');
  const lift = (h, full = true) => bs.forEach((b, i) => { b.classList.toggle('lift', i === h);
    b.style.transform = !full || h < 0 ? '' : i === h ? 'translateY(-8px) scale(1.03)' : i === h - 1 ? 'translateX(-4px)' : i === h + 1 ? 'translateX(4px)' : ''; });   // 减少动态效果时只变边框和阴影
  bs.forEach((b, i) => { b.addEventListener('pointerenter', (e) => { if (e.pointerType === 'mouse' && fine.matches) lift(i, !GL.reduce.matches); });
    b.addEventListener('focus', () => lift(i, !GL.reduce.matches)); b.addEventListener('blur', () => lift(-1)); });
  stage.querySelector('.e1').addEventListener('pointerleave', () => lift(-1));
  const pq = seq();
  return { async play() { const s = pq.begin(); for (const i of [0, 1, 2, 3]) { lift(i); if (!await s.sleep(450)) return; } lift(-1); } };
} });

/* ---------------- E2 封面流 ---------------- */
web.items.push({ code:'E2', name:'封面流', use:'专辑、作品集：一次看一张，两边看得到前后还有；整排一起转', hint:'点两边、拖、或按 ← →', mount(stage) {
  const n = 7;
  stage.innerHTML = `<div class="e2"><div class="e2-row" tabindex="0" aria-label="封面，左右键切换">${Array.from({ length:n }, (_, i) => `<button class="e2-c" type="button" tabindex="-1" style="background:linear-gradient(160deg, ${art(i)})">专辑 ${i + 1}</button>`).join('')}</div><div class="e2-bt"><button type="button" aria-label="上一张">${icon('back')}</button><button type="button" aria-label="下一张" style="transform:scaleX(-1)">${icon('back')}</button></div></div>`;
  const row = stage.querySelector('.e2-row'), cs = [...row.children], [prev, next] = stage.querySelectorAll('.e2-bt button');
  let cur = 3;
  const lay = () => cs.forEach((c, i) => { const k = i - cur, a = Math.abs(k);
    c.style.transform = `translateX(${k * 36}px) translateZ(${-40 * a}px) rotateY(${-15 * k}deg)`; c.style.setProperty('--dim', Math.min(0.1 * a, 0.3)); c.style.zIndex = 10 - a; c.style.opacity = a > 2 ? 0 : 1; c.setAttribute('aria-current', k === 0); });
  const go = (i) => { cur = clamp(i, 0, n - 1); lay(); };
  lay();
  cs.forEach((c, i) => c.addEventListener('click', () => go(i)));
  prev.addEventListener('click', () => go(cur - 1)); next.addEventListener('click', () => go(cur + 1));
  row.addEventListener('keydown', (e) => { const k = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0; if (k) { e.preventDefault(); go(cur + k); } });
  let c0 = 0; drag(row, { down:() => { c0 = cur; }, move:(e, dx) => { const t = clamp(c0 - Math.round(dx / 50), 0, n - 1); if (t !== cur) go(t); } });
  const pq = seq();
  return { async play() { const s = pq.begin(); for (const k of [1, 1, -1, -1]) { if (!await s.sleep(600)) return; go(cur + k); } } };
} });

/* ---------------- E6 渐进模糊 ---------------- */
web.items.push({ code:'E6', name:'渐进模糊', use:'底部固定按钮、底部 Tab：下面的内容越靠近越糊，浮着的那层更清楚；滚到底就收起', hint:'在框里上下滚', mount(stage) {
  stage.innerHTML = `<div class="d-phone"><div class="e6-sc" tabindex="0" aria-label="商品列表，可以滚动">${Array.from({ length:9 }, (_, i) => `<div class="e6-it" style="background:linear-gradient(90deg, ${art(i)})">商品 ${i + 1}</div>`).join('')}<div class="e6-end"></div></div><div class="e6-blur" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></div><button class="e6-go" type="button">去结算 RM 328</button></div>`;
  const sc = stage.querySelector('.e6-sc'), bl = stage.querySelector('.e6-blur');
  new IntersectionObserver(([en]) => { bl.style.opacity = en.isIntersecting ? 0 : 1; }, { root:sc }).observe(stage.querySelector('.e6-end'));   // 下面没东西了就淡出
  const pq = seq();
  return { async play() { const s = pq.begin(); sc.scrollTo({ top:sc.scrollHeight, behavior:'smooth' }); if (await s.sleep(1700)) sc.scrollTo({ top:0, behavior:'smooth' }); } };
} });
})();
