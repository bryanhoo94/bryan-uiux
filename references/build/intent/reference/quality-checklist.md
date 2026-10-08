<!-- 第三方开源内容（MIT），已按本库规则修改；版权声明见仓库根目录 THIRD_PARTY_NOTICES.md -->

# Quality Checklist

This checklist judges intent: layers, emotion, narrative, choreography. The bar for reviewing motion code is `references/review/motion-review.md`.

## Before anything else
- [ ] Passed the frequency gate: nothing animates on an action done 100+ times a day (press feedback only)
- [ ] Passed the purpose gate: the motion can name the question it answers
- [ ] Personality, curves, durations, and springs are the ones in the project's motion spec, or in `references/core/params.md` where the spec is silent

## Visual Quality
- [ ] Elements >40px for motion, >100px for detail
- [ ] Readable at full speed without slow-motion
- [ ] Clear primary, secondary, ambient layers where the moment calls for them (routine product UI is primary-only by design)
- [ ] Counter-motion for balance where needed
- [ ] Natural arcs (unless intentionally mechanical)
- [ ] 1/3 rule (distance): no unbroken motion >1/3 container
- [ ] 1/3 rule (density): max 1/3 elements active simultaneously

## Technical Quality
- [ ] No linear easing on spatial movement
- [ ] Duration matches the element's range in `references/core/params.md`
- [ ] `--ease-out` entrances and exits; no `ease-in` anywhere
- [ ] Duration proportional to distance
- [ ] Entrance duration >= exit duration
- [ ] Not opacity-only for important state changes
- [ ] Stagger 30-80ms per item, whole group ≤ 300ms
- [ ] Follow-through: child elements offset 30-80ms

## Emotional Quality
- [ ] Target emotion identified before properties
- [ ] Personality archetype matches brand
- [ ] Setup → action → resolution structure
- [ ] Intensity matches interaction importance
- [ ] Consistent: same interaction = same motion
- [ ] Appropriate on 100th viewing

## Performance Quality
- [ ] Primary motion uses transform + opacity
- [ ] <20 animated elements per viewport
- [ ] No layout-triggering properties animated (`height` in an expand/collapse is the one exception)
- [ ] Elements staggered, not simultaneous
- [ ] Maintains 60fps (30fps acceptable for ambient)

## Accessibility Quality
- [ ] prefers-reduced-motion alternative provided
- [ ] Hover motion sits behind `@media (hover: hover) and (pointer: fine)`
- [ ] No vestibular triggers without alternative
- [ ] Same interaction = same animation
- [ ] Critical info not motion-only
- [ ] Animations >5s are pausable

## Severity Tiers

### CRITICAL
- Linear easing on spatial movement
- Opacity-only for important states
- Exceeds 1/3 screen rule
- Missing primary layer
- Stagger group >300ms
- Layout property animation causing jank
- Animation on an action done 100+ times a day
- `ease-in` on UI

### HIGH
- Missing secondary layer in a hero moment
- Duration mismatch with element type
- Wrong directional easing
- Inconsistent personality
- No follow-through
- Missing reduced-motion alternative

### MEDIUM
- Missing ambient layer where the personality has one
- No anticipation phase
- Overshoot mismatch
- Could use better arcs
- Missing counter-motion
