# Petal & Promise — For Abeer

A romantic English-language experience for Abeer, now illustrated with moonlit oceans, mountain skies, desert horizons, and city lights instead of flower photography. A midnight-purple RippleDistortion backdrop sits behind luminous white typography, with love notes and an interactive spiral of scenes.

## The experience

- `RippleDistortion` uses the local `/hero.jpg` backdrop with the requested brush size, strength, swirl, rings, spread, fade, spacing, dispersion, glint, tint, highlight, hover trigger, click strength, and low-quality settings.
- Every click in the garden releases a glowing six-flower flourish at the pointer; keyboard-activated clicks bloom beside their control. Reduced-motion preferences keep the flourish still and brief.
- The photo spiral includes starry landscapes, misty mountains, sunset dunes, a rain-lit city, a mountain road, and warm city lights. Selecting an image changes its accompanying love note.
- Inter provides crisp interface typography, while Cormorant Garamond gives the headings and notes an editorial feel. Layouts adapt from desktop to mobile.
- Landscape and city photographs are sourced from [Unsplash](https://unsplash.com/) and [Pexels](https://www.pexels.com/).

## Development

This React/Vite site is served as a static frontend and does not require a database or application server. OGL powers the WebGL displacement effect.

```sh
pnpm dev:static
pnpm check
pnpm build:static
```

Vite serves the application from `client/`, and static assets live in `client/public/`. The source route manifest is `client/public/manus-routes.json`.
