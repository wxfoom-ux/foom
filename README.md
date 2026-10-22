# Petal & Promise — For Abeer

A romantic English-language experience for Abeer, now filled throughout with original, high-end floral photography: a full-screen rose-and-peony RippleDistortion backdrop, a matching floral hero image, and six distinct flower portraits in the interactive spiral. Luminous white typography and personal love notes sit over the dramatic midnight garden.

## The experience

- `RippleDistortion` uses the full-screen original rose-and-peony image from Managed Storage, with the requested brush size, strength, swirl, rings, spread, fade, spacing, dispersion, glint, tint, highlight, hover trigger, click strength, and low-quality settings.
- Every click in the garden releases a glowing six-flower flourish at the pointer; keyboard-activated clicks bloom beside their control. Reduced-motion preferences keep the flourish still and brief.
- The hero and all six spiral photographs show professional, original floral imagery: crimson roses, blush peonies, golden-hour tulips, ivory orchids, plum dahlias, and a romantic hand-tied bouquet. Selecting an image changes its accompanying love note.
- A separate “Little letters, meant for Abeer” section contains six personal English messages. Each heart-sealed card opens and folds its note with a luminous reveal, local rose-petal burst, and the garden-wide click-flower effect.
- Inter provides crisp interface typography, while Cormorant Garamond gives the headings and notes an editorial feel. Layouts adapt from desktop to mobile.
- A translucent midnight treatment keeps the floral backdrop visibly present through the full page while protecting text legibility.

## Development

This React/Vite site is served as a static frontend and does not require a database or application server. OGL powers the WebGL displacement effect.

```sh
pnpm dev:static
pnpm check
pnpm build:static
```

Vite serves the application from `client/`, and static assets live in `client/public/`. The source route manifest is `client/public/manus-routes.json`.
