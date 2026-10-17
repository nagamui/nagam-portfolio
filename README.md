# Nagham Mousa — Portfolio

A single-page portfolio for Nagham Mousa, Product Designer, built from her
Notion case studies (Orem Orthodontics, Focusize, PharmAssist, My Design Lab).

No build step — plain HTML/CSS/JS. Open `index.html` directly or serve it:

```bash
python3 -m http.server 8080
```

## Structure
- `index.html` — all markup/sections
- `css/style.css` — design tokens + styles (see `:root` for the palette/type scale)
- `js/main.js` — cursor, scroll reveals, counters, before/after slider, "more work" grid
- `assets/img/` — optimized `.webp` images pulled from the Notion case studies

## Design system notes
This was built from the content in the Notion portfolio page since the original
Canva "Nagham Design System" PDF/SVG exports weren't received in this session.
The visual system here (dark ink background, lime `#d4ff3d` accent, Fraunces +
Inter + Space Grotesk type) is an original interpretation — swap the tokens at
the top of `css/style.css` if you want to match the Canva deck exactly once you
share it.

## Deploying
Push to GitHub and enable **Settings → Pages → Deploy from branch (main / root)**
— no build step needed.
