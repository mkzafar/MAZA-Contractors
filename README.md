# MAZA Contractors

A responsive website for a local general contracting company serving the Greater Toronto Area.

Live: [mazacontractors.ca](https://mazacontractors.ca)

## Tech Stack
- HTML5
- CSS3 (modular: base / layout / components / sections / responsive)
- Vanilla JavaScript (modular: nav, carousel, modal, main)
- [GLightbox](https://biati-digital.github.io/glightbox/) for image lightbox
- [Font Awesome](https://fontawesome.com/) icons
- Google Fonts: Fraunces (display), Inter (body)

## Project Structure

```
.
├── index.html
├── CNAME
├── README.md
├── css/
│   ├── base.css         # variables, reset, typography
│   ├── layout.css       # page structure, animations
│   ├── components.css   # buttons, nav, modal, carousel
│   ├── sections.css     # per-section styles
│   └── responsive.css   # tablet & mobile breakpoints
├── js/
│   ├── nav.js           # mobile hamburger + scroll-spy
│   ├── carousel.js      # gallery carousels + lightbox
│   ├── modal.js         # quote modal open/close + form
│   └── main.js          # fade-in observer + back-to-top
└── assets/
    └── images/          # all photo assets
```

## Key Features
- Mobile-first responsive design with collapsible hamburger nav
- Scroll-spy navigation that highlights the active section
- Quote modal with full project intake form (opens from multiple CTAs)
- Image gallery carousels with lightbox preview
- Smooth scroll, fade-in animations, back-to-top button
- Reduced-motion support for accessibility

## Deployment

Hosted on GitHub Pages with the `mazacontractors.ca` custom domain (configured via the `CNAME` file).
