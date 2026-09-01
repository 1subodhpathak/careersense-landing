# CareerSense — Data Analyst Fellowship Asset Pack

This pack is prepared for the React implementation of the supplied Data Analyst Fellowship design.

## What is included

- Transparent CareerSense logo + standalone brand mark
- Cleaned hero photography asset in PNG and WebP
- 3 hero analytics cards as scalable SVG + high-resolution PNG
- 6 learning outcome illustrations as scalable SVG + 1024px PNG
- 10 tool / technology icons as scalable SVG + 1024px PNG
- Fellowship certificate, fellow ID card, and ready-to-place credential stack as scalable SVG + high-resolution PNG
- Why Join and CTA dashboard illustrations as scalable SVG + high-resolution PNG
- 10 utility icons as scalable SVG + 512px PNG

## React usage

Prefer SVG for UI icons and illustrations. Use WebP for the hero photo. The hero photography is the clean high-resolution CareerSense source matching the supplied design, with the CareerSense logo applied to the laptop.

Example:
```jsx
<img src="/assets/fellowship/learning/analysis-sql.svg" alt="" />
<img src="/assets/fellowship/hero/hero-data-analyst-student.webp" alt="" />
```

For the hero photo:
```css
.hero-photo {
  width: min(58vw, 980px);
  object-fit: cover;
  object-position: center;
}
```

The analytics card SVGs can either be used directly or rebuilt with Recharts when animation/data binding is required.

## Design palette

- Navy: #071B49
- Primary blue: #1577EE
- Teal: #0ABF9A
- Light background: #F4F8FF
- Purple: #6F50E8
- Coral: #FF5E78
- Orange: #FF9A2F

All custom SVGs have transparent backgrounds unless the original element itself is a card.
