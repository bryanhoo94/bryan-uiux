<!-- 第三方开源内容（MIT），已按本库规则修改；版权声明见仓库根目录 THIRD_PARTY_NOTICES.md -->

# Property Selection

## Position

| Direction | Meaning |
|-----------|---------|
| Upward | Growth, improvement, aspiration |
| Downward | Settling, completion, grounding |
| Leftward | Regression, backward, departure |
| Rightward | Progression, forward, arrival |
| Toward center | Focus, convergence |
| Away from center | Distribution, expansion |

## Scale

| Direction | Meaning |
|-----------|---------|
| Scale up | Importance, activation, proximity |
| Scale down | Deprioritization, distance |
| Pulse | Attention, heartbeat, life |
| Breathing | Presence, waiting |

## Rotation

| Range | Meaning |
|-------|---------|
| Small (5-15°) | Subtle adjustment |
| Medium (45-90°) | Transformation |
| Full (360°) | Completion, processing |
| Continuous | Ongoing activity |

## Opacity

| Direction | Meaning |
|-----------|---------|
| Fade in | Arrival, enablement |
| Fade out | Departure, disablement |
| Partial | Secondary, disabled state |

**Rule**: NEVER opacity alone for important state changes. Combine with position or scale.

## Color

| Transition | Meaning |
|-----------|---------|
| To green | Success, go |
| To red | Error, stop |
| To blue | Trust, active |
| To gray | Disabled, inactive |
| Brightening | Activation, focus |
| Dimming | Deactivation, background |

The colours themselves come from the project's `DESIGN.md` / tokens. Red is only for errors and dangerous actions.

## Combined Properties

| Combination | Best For |
|-------------|----------|
| Position + Opacity | Content appearing/disappearing |
| Scale + Opacity | Cards, modals, notifications |
| Position + Scale | Selected items, focused content |
| Rotation + Scale | Celebrations, playful activation |
| Position + Rotation | Organic transitions |
| Color + Scale | State emphasis |

Primary property carries meaning; secondary adds polish. Two properties is the sweet spot.

## Property Selection by Goal

| Goal | Primary | Secondary | Avoid |
|------|---------|-----------|-------|
| Entrance | position | opacity | rotation |
| Exit | position | opacity | scale up |
| Button press | scale | color | position |
| Hover | scale or color | opacity | position |
| Success | scale | color + opacity | position |
| Error | position (shake) | color | scale |
| Loading | rotation | opacity | position |
| Toggle | position | color | rotation |
| Notification | position + scale | opacity | rotation |
| Delete | scale + opacity | position | grow |
| Selection | scale | color, opacity | rotation |
| Progress | position or scale | color | opacity |

## Performance

| Property | Performance |
|----------|-------------|
| transform (translate, scale, rotate) | Excellent — GPU-accelerated |
| opacity | Excellent — GPU-accelerated |
| color / background-color | Good — triggers paint |
| clip-path | Good — GPU on modern browsers |
| width / height | Poor — triggers layout |
| margin / padding | Poor — triggers layout |
| box-shadow | Poor — expensive paint |

**Rule**: transform + opacity for all motion. `clip-path` is allowed, `height` only for expand/collapse, and colour changes use `ease`. `width`, `margin`, `padding`, and `box-shadow` are not animated: a shadow change is a second shadow layer fading with `opacity`.
