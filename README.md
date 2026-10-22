# Petal & Promise — For Abeer

A small, romantic English-language flower garden created for Abeer. Its editorial, paper-and-rose palette frames a gentle opening note, an interactive infinite spiral of blooms, expandable love notes, and a final dedication.

## The experience

- The flower gallery borrows the supplied InfiniteSpiral interaction: its cards drift in a looping floral helix, pause on hover, respond to pointer/touch drag, and can be stepped through with accessible previous/next controls.
- Selecting a flower changes the accompanying love note. Three additional notes expand in place, and the closing letter is dedicated to Abeer.
- Motion respects `prefers-reduced-motion`; layouts adapt from desktop to mobile. The share control copies the garden's current URL.
- Floral photographs are sourced from [Unsplash](https://unsplash.com/) and [Pexels](https://www.pexels.com/).

## Development

This site uses the project's React/Vite starter and is served as a static frontend; it does not require a database or application server.

```sh
pnpm dev:static
pnpm check
pnpm build:static
```

Vite serves the application from `client/`, and static assets live in `client/public/`. The source route manifest is `client/public/manus-routes.json`.
