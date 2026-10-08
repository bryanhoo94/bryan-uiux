<!-- 第三方开源内容（MIT），已按本库规则修改；版权声明见仓库根目录 THIRD_PARTY_NOTICES.md -->

# Troubleshooting

Fixes here use the curves, springs, and ranges of `references/core/params.md` (a project's motion spec overrides it). When the user describes the problem in their own words (too bouncy, too stiff, too slow, not following the finger), the tuning table at the end of that file says which constant to change.

## Looks Robotic
- Linear easing → use `--ease-out` (entrance and exit) or `--ease-in-out` (on-screen movement)
- Straight paths → add 10-20px arc at midpoint
- Uniform timing → stagger 30-80ms between elements
- Everything synced → offset start/stop 30-80ms
- No secondary → add shadow, icon reaction, ambient

## Feels Too Slow
- Duration exceeds type budget → check the element's range in `references/core/params.md`
- `--ease-in-out` when `--ease-out` works → `--ease-out` feels faster
- `ease-in` anywhere → replace with `--ease-out`
- Too much anticipation → reduce to 10% or remove
- Stagger exceeded → whole group ≤ 300ms
- Overshoot settle too long → increase damping: `spring-ui`, or the preset with less bounce

## Feels Too Fast / Jarring
- Duration below minimum → dialogs, drawers, and full-screen changes start at 200ms
- No easing → add `--ease-out` minimum
- Missing resolution → add 50-100ms settle
- No anticipation on large motion → add 100-200ms wind-up

## Feels Cheap / Flat
- Only primary motion → add secondary + ambient, in a hero moment or on a landing or brand page; routine product UI stays primary-only
- Opacity-only → combine with position or scale
- Same easing everywhere → vary primary vs secondary
- No follow-through → child elements trail 30-80ms
- No overshoot → `spring-gesture`, where the personality allows bounce

## Too Distracting
- Too many moving → 1/3 rule
- Amplitude too large → reduce to minimum
- Competing heroes → one per moment, dim rest
- Ambient too prominent → 10-20% amplitude, slower
- No breathing room → 100-200ms pause between beats

## No Personality
- Default easing → apply archetype's signature
- Same duration for all → use the project's duration tiers (quick / standard / slow in its motion spec)
- No consistent entrance → define one for project
- Mixed archetypes → pick one for 90%+

## Inconsistent Feel
- Different easing same-type → standardize per motion type
- Duration varies same type → use palette consistently
- Entry direction changes → one origin everywhere
- Overshoot inconsistent → apply rules consistently

## Performance (Dropped Frames)
- Animating width/height/margin → use transform
- Too many elements → <20 per viewport
- Complex shadows/filters → simplify or pre-render
- No GPU acceleration → transform + opacity
- All simultaneous → stagger to spread load

## Quick Diagnostic

1. No linear on spatial movement
2. Duration matches element type
3. Primary + secondary layers
4. Consistent personality
5. Directional easing correct
6. 1/3 screen rule
7. 1/3 element rule
8. Follow-through present
9. Every motion has purpose
10. Fine on 100th viewing

## Personality Mistakes
- **Playful**: bounce above `spring-pop` = broken; not everything bounces; short+bounce = glitchy
- **Premium**: too subtle = invisible; too slow = waiting; zero = broken
- **Corporate**: too conservative = boring; playful easing breaks trust; identical = monotonous
- **Energetic**: max everywhere = nothing stands out; too many particles; no settle = chaos
