# Petal & Promise — For Abeer

A romantic English-language flower garden created for Abeer. Its midnight-and-rose palette pairs luminous white typography with a restrained pink glow, an interactive infinite spiral of blooms, expandable love notes, and a final dedication.

## The experience

- A fixed floral backdrop uses the supplied `RippleDistortion` WebGL effect: pointer movement sends soft water-like ripples over a locally stored flower image.
- The floral backdrop respects `prefers-reduced-motion` and falls back to a still image where WebGL is unavailable.
- The flower gallery borrows the supplied InfiniteSpiral interaction: its cards drift in a looping floral helix, pause on hover, respond to pointer/touch drag, and can be stepped through with accessible previous/next controls.
- Selecting a flower changes the accompanying love note. Three additional notes expand in place, and the closing letter is dedicated to Abeer.
- Manrope provides the clear interface type; Playfair Display gives the editorial headings their contrast. Layouts adapt from desktop to mobile.
- Floral photographs are sourced from [Unsplash](https://unsplash.com/) and [Pexels](https://www.pexels.com/).

## Development

This site uses the project's React/Vite starter and is served as a static frontend; it does not require a database or application server. OGL powers the WebGL displacement effect.

```sh
pnpm dev:static
pnpm check
pnpm build:static
```

Vite serves the application from `client/`, and static assets live in `client/public/`. The source route manifest is `client/public/manus-routes.json`.
