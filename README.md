# Nagam Mousa — Portfolio

Portfolio site for Nagam Mousa, web designer & developer for US small businesses
(home services, facility services, healthcare).

Plain HTML/CSS/JS, no build step. To run locally:

```bash
python3 -m http.server 8080
```

## Structure
- `index.html` — all sections and copy
- `css/style.css` — design tokens (top of file) and styles
- `js/main.js` — scroll reveals, before/after slider, sticky mobile CTA, quote form
- `assets/img/` — optimized `.webp` screenshots of client projects

## Quote form
The form posts to [FormSubmit](https://formsubmit.co) and is delivered to
`info.nagamui@gmail.com`. The first submission sends an activation email to
that address; click the link once and every later submission is delivered.

## Deploying
Settings → Pages → Deploy from branch → `main` / root.
