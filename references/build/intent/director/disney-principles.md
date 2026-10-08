<!-- 第三方开源内容（MIT），已按本库规则修改；版权声明见仓库根目录 THIRD_PARTY_NOTICES.md -->

# Disney's 12 Principles — UI Adapted

<!-- 目录:开始（自动生成，别手改；改了标题就跑 python3 tools/toc.py） -->
**本文件目录**（全文 124 行；先看这里，再按行号只读用得上的那一节）

- 第 23–28 行：1. Squash and Stretch
- 第 30–35 行：2. Anticipation
- 第 37–41 行：3. Staging
- 第 43–48 行：4. Straight Ahead vs. Pose to Pose
- 第 50–54 行：5. Follow Through and Overlapping Action
- 第 56–65 行：6. Slow In and Slow Out
- 第 67–71 行：7. Arcs
- 第 73–77 行：8. Secondary Action
- 第 79–91 行：9. Timing
- 第 93–102 行：10. Exaggeration
- 第 104–108 行：11. Solid Drawing
- 第 110–114 行：12. Appeal
- 第 116–124 行：Combining Principles
<!-- 目录:结束 -->

## 1. Squash and Stretch

- Squash: scale ~[1.2, 0.8]; Stretch: ~[0.85, 1.15]
- Impact: 2-4 frames (30-65ms); Recovery: 4-8 frames (65-130ms)
- Preserve volume: width +20% → height decreases proportionally
- Skip for premium/luxury brands

## 2. Anticipation

- Small motion opposite to main direction before action
- Duration: 100-200ms, magnitude: 10-20% of main action; the wind-up counts inside the element's total duration, it is not added on top
- Button: scale down 3% before expanding; Card: shift 5-10px away first
- Skip for micro-feedback (<150ms)

## 3. Staging

- Dim non-hero elements to 40-60% opacity; optional 2-4px blur
- Hero enters 100-200ms after supporting elements
- One primary action per timing beat

## 4. Straight Ahead vs. Pose to Pose

| Approach | Feel | Best For |
|----------|------|----------|
| Straight Ahead | Fluid, spontaneous | Particles, ambient, generative art |
| Pose to Pose | Planned, controlled | UI transitions, state changes |

## 5. Follow Through and Overlapping Action

- Child delay: 30-80ms behind parent
- Trailing elements: offset stop times, the whole group inside 300ms
- Use spring easing for trailing parts (lower stiffness = more trailing)

## 6. Slow In and Slow Out

| Context | Easing | Why |
|---------|--------|-----|
| Entrance | `--ease-out` | Arrives smoothly |
| Exit | `--ease-out`, shorter than the entrance | Departs quickly |
| On-screen | `--ease-in-out` | Smooth journey |
| Ambient loop | sine ease-in-out | Seamless |

**NEVER** linear for spatial movement. Linear only for: rotation, progress bars, timers. **NEVER** `ease-in` on UI: it delays the moment the user is watching.

## 7. Arcs

- Add 10-20px perpendicular offset at path midpoint
- Subtle (5px) for corporate, pronounced (20px+) for playful
- Mechanical UIs can use straight paths intentionally

## 8. Secondary Action

- Amplitude: 30-50% of primary; timing: 30-80ms after primary
- Different easing than primary
- Examples: card enters → shadow grows; button presses → ripple expands

## 9. Timing

| Weight/Mood | Duration |
|-------------|----------|
| Heavy (modals, pages) | 300-500ms |
| Light (tooltips, toggles) | 100-200ms |
| Sad/serious | slow end of the element's range |
| Happy/light | middle of the range |
| Urgent | fast end of the range |

Ranges are in `references/core/params.md`. Longer than a range only in first-screen and scroll storytelling on landing and brand pages.

Enter-exit asymmetry: entrances 30-50% longer than exits.

## 10. Exaggeration

| Personality | Exaggeration |
|-------------|-------------|
| Playful | `spring-gesture`; `spring-pop` on confirmations |
| Energetic | `spring-pop`, the ceiling |
| Corporate | none (`spring-ui`) |
| Premium | none (`spring-ui`) |

- Scale overshoot comes from the spring preset, not from a hand-set percentage; rotation: ±5-15°

## 11. Solid Drawing

- Maintain consistent proportions across keyframes
- Use scale + rotation together for depth
- Shadow behavior matches implied light source

## 12. Appeal

- Smooth curves over sharp angles; satisfying timing
- Personality consistency across all elements
- Appeal killers: jerky motion, inconsistent timing, abrupt stops, uniform animation

## Combining Principles

| Recipe | Principles Used |
|--------|----------------|
| Button press | Anticipation + Squash/Stretch + Follow-Through + Secondary + Timing |
| Card entrance | Anticipation + Arcs + Slow In/Out + Follow-Through + Staging |
| Success celebration | Exaggeration + Secondary + Timing + Squash/Stretch + Appeal |
| Error shake | Timing + Slow In/Out + Staging (no exaggeration) |
| Loading spinner | Timing + Slow In/Out + Appeal |
