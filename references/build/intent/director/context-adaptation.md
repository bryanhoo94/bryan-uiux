<!-- 第三方开源内容（MIT），已按本库规则修改；版权声明见仓库根目录 THIRD_PARTY_NOTICES.md -->

# Context Adaptation

Every multiplier in this file picks a position inside the element's range in `references/core/params.md`; it never takes a duration outside the range. A project keeps one set of constants in its motion spec for all its platforms, and only the input method differs between them, so read a modifier as "which end of the range to choose when the spec is written for a project that lives mainly on that platform", not as a per-device multiplier applied at runtime. How the same recipe lands on touch, mouse, and keyboard, and in the desktop view and the phone view, is in `references/core/platforms.md` section 2.

## Platform Scaling

| Platform | Duration Modifier | Complexity | Physics |
|----------|------------------|------------|---------|
| Desktop | 1.0x (baseline) | Full | All types |
| Tablet | 0.9x | Standard | Most types |
| Mobile | 0.8x | Reduced (1-2 properties) | Snappy only |
| Watch | 0.6x | Minimal (1 property) | None |
| TV/Kiosk | 1.3x | Full | All types |

**Mobile rules**: prefer opacity + transform; touch feedback <100ms; reduce stagger budgets by 30%; avoid parallax
**Desktop opportunities**: hover states (behind `@media (hover: hover) and (pointer: fine)`), cursor tracking, multi-column stagger, spatial choreography

## Accessibility

### prefers-reduced-motion

| Original Motion | Reduced Alternative |
|----------------|-------------------|
| Slide entrance | Opacity fade only |
| Bounce/spring | Instant or simple ease-out |
| Parallax | Static positioning |
| Auto-playing | Paused, user-initiated |
| Complex choreography | Single fade |
| Continuous ambient | Static or subtle opacity pulse |

Reduced motion means: remove spatial movement, keep opacity, remove spring easing, reduce duration 50%+, never auto-play loops.

### Vestibular Triggers (avoid or provide alternatives)
- Large-scale zoom, full-screen position transitions
- Spinning elements >100px, parallax >2 layers, rapid direction changes

### Cognitive Accessibility
- Same interaction = same animation every time
- Pause controls for animations >5 seconds
- Don't convey critical info through motion alone

## Performance Budgets

| Tier | Properties | Max Elements |
|------|-----------|-------------|
| Optimal | transform, opacity | Unlimited (GPU) |
| Good | + color, clip-path | 10-15 |
| Expand/collapse only | + height | the one element that opens |
| Avoid | width, margin, box-shadow, border-radius, filter | 1-3 |

House rule: motion is `transform` and `opacity`; `clip-path` is allowed, `height` only for expand/collapse, colour changes use `ease`. The Avoid row is not a budget to spend: fade a second shadow layer with `opacity` instead of animating `box-shadow`, and keep any transition-time blur small.

- Target 60fps (16.67ms/frame); animation logic <10ms/frame
- will-change sparingly; keep animated elements <20 per viewport
- Stagger reduces peak load vs simultaneous
- Fallback: 30fps acceptable for ambient

## Content Type Adaptation

| Content Type | Personality | Duration | Motion Density |
|-------------|-------------|----------|---------------|
| Financial | Corporate/Premium | middle to slow end of the range | Low |
| Social media | Playful | middle of the range | Medium |
| Enterprise SaaS | Corporate | fast end to middle | Low |
| Gaming | Energetic | fast end | High |
| Healthcare | Corporate/Calm | slow end | Very low |
| E-commerce | Varies | middle of the range | Medium |
| Editorial | Premium | slow end | Low |
| Children's apps | Playful | middle of the range | High |

The personality written into the project's motion spec is the matching one of the three in `references/core/pick.md`; the mapping is at the top of `references/build/intent.md`.

## Responsive Motion

| Container Width | Max Displacement | Duration |
|----------------|-----------------|----------|
| <400px | 20% of width | 0.8x |
| 400-800px | 25% of width | 1.0x |
| 800-1200px | 20% of width | 1.0x |
| >1200px | 15% of width | 1.1x |

- Small viewport: sequential, one element at a time
- Medium: standard stagger, 2-3 columns
- Large: full choreography, center-out stagger, parallax

## Dark Mode
- Reduce motion intensity 10-20% (bright on dark = more impact)
- Subtler ambient motion; careful with opacity values
- Avoid pure white flashes
