<!-- 第三方开源内容（MIT），已按本库规则修改；版权声明见仓库根目录 THIRD_PARTY_NOTICES.md -->

# Choreography

<!-- 目录:开始（自动生成，别手改；改了标题就跑 python3 tools/toc.py） -->
**本文件目录**（全文 114 行；先看这里，再按行号只读用得上的那一节）

- 第 17–33 行：Coordinated Entry Rules
- 第 35–43 行：Sequence Structure
- 第 45–49 行：The 1/3 Rules
- 第 51–64 行：Stagger Patterns
- 第 66–71 行：Shared Motion Events
- 第 73–88 行：Attention Direction
- 第 90–114 行：Common Recipes
<!-- 目录:结束 -->

## Coordinated Entry Rules

### 1. Lead with the Hero
- Hero gets largest displacement and most attention-grabbing easing
- Supporting elements are subtler in every dimension

### 2. Spatial Origin Consistency
All elements enter from same direction or shared origin. Mixed directions = chaos.

### 3. Counter-Motion

| Hero Motion | Counter-Motion | Speed Ratio |
|-------------|---------------|-------------|
| Enters left | Background shifts right | 20-30% |
| Scales up | Shadow scales down | 10-20% |
| Rotates CW | Ambient drifts CCW | 15-25% |
| Lifts (Y up) | Shadow spreads + softens | 20-30% |

## Sequence Structure

| Phase | Duration Share | What Happens |
|-------|--------------|-------------|
| Setup | 20-30% | Elements enter, scene establishes |
| Action | 30-40% | Primary motion, hero moment |
| Resolution | 30-40% | Settle, secondary reactions, breathing |

Leave 100-200ms stillness after resolution before new motion.

## The 1/3 Rules

**Distance**: No motion travels >1/3 screen without intermediate keyframe. Break with direction changes, speed variations, or arc adjustments.

**Elements**: With 3+ animated elements, max 1/3 active simultaneously. Stagger so element 1 settles as element 3 starts.

## Stagger Patterns

| Pattern | Description | Best For |
|---------|------------|----------|
| Sequential | Reading order | Lists, grids |
| Center-out | Radiating from center | Hero content, ripples |
| Random | Varied timing | Organic, particle-like |
| Wave | Sine-based | Data bars, continuous |
| Reverse | Bottom-to-top | Exits, backward nav |

- All staggered elements use same easing family
- Vary only start time, not curve
- Optional: last element gets slight overshoot (punctuation)
- Budget: 30–80ms per item and ≤ 300ms for the whole group; items past the budget enter together (`references/core/params.md`)

## Shared Motion Events

When multiple elements react to one trigger:
- All start within 50ms of each other
- Can arrive at different times (staggered landing)
- Same easing family; motion originates from trigger point

## Attention Direction

| Technique | Implementation |
|-----------|---------------|
| Leading motion | Animate target before context |
| Following motion | Settle on focal point |
| Ambient motion | Subtle continuous in periphery |
| Pointing motion | Directional toward CTA |

### Depth Through Speed

| Layer | Displacement | Speed |
|-------|-------------|-------|
| Foreground | 1.0x | Fastest |
| Midground | 0.5x | Medium |
| Background | 0.2x | Slowest |

## Common Recipes

These show the order and the layers. The code is in `references/build/web-recipes.md` and `references/build/rn-recipes.md`; where a number here and `references/core/params.md` differ, the dictionary wins.

### Dashboard Load
1. Skeletons fade in (100ms)
2. Hero metric (250ms, `--ease-out`, 100ms delay)
3. Supporting cards stagger (50ms between, 200ms each, whole group ≤ 300ms)
4. Chart data draws in (300ms, starts with cards)
5. Ambient pulse on primary metric — only where the personality has an ambient layer; a 克制，不回弹 dashboard skips it

Play this entrance once per session, not on every open (`references/recipes/chart.md`).

### Modal Open
1. Background dims (200ms)
2. Modal scales 95%→100% + fades (300ms, 50ms delay)
3. Content fades in (200ms, 100ms after modal)
4. Close button last (150ms)

Phone view: the dialog becomes a bottom sheet or a full screen (`references/core/platforms.md` section 2.2) and moves with `--ease-drawer`.

### List Update (item added)
1. Existing items shift down (200ms, `--ease-in-out`)
2. New item fades+slides from top (250ms, `--ease-out`, 50ms delay)
3. Subtle scale overshoot on land (`spring-gesture`; none in a no-bounce personality)
