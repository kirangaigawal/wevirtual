# Design Brief

## Direction

**Editorial Brutalist Minimalism** — A magazine-like design agency portfolio with strict black-and-white palette, editorial serif headings paired with clean sans-serif body, dark/light alternating sections, and smooth motion.

## Tone

Intellectual, refined, serious — anti-generic editorial aesthetic that speaks through typography scale and composition rather than decoration.

## Differentiation

Strict achromatic palette with Lora/DM Sans pairing; dark/light section alternation creates visual rhythm; Motion.js entrance animations and precise hover effects telegraph interactivity without gimmickry.

## Color Palette

| Token      | OKLCH (L C H)     | Role                  |
| ---------- | --------------------- | ---------------------- |
| background | 0.97 0 0          | Light cream base (light mode) |
| foreground | 0.12 0 0          | Near-black text (light mode) |
| card       | 0.99 0 0          | Card surface (light) |
| primary    | 0.12 0 0          | Near-black (dark sections) |
| accent     | 0.12 0 0          | Interactive emphasis (typography-based) |
| muted      | 0.88 0 0          | Secondary surfaces |
| dark bg    | 0.11 0 0          | Dark mode background |
| dark fg    | 0.95 0 0          | Dark mode text |

## Typography

- Display: **Lora** (serif) — Hero text, section headings, editorial emphasis. Weights: 400 (default), 700 (bold). Tight tracking (−0.02em) on headlines.
- Body: **DM Sans** (sans-serif) — Body copy, labels, UI text. Weights: 400 (default), 500 (emphasis), 600 (labels).
- Scale: hero `text-5xl md:text-7xl font-bold`, h2 `text-3xl md:text-5xl font-bold`, label `text-xs md:text-sm font-semibold uppercase`, body `text-base md:text-lg`.

## Elevation & Depth

No drop shadows. Surface hierarchy defined through background color alternation (light/dark sections) and border lines. Subtle `shadow-md` on interactive hover states only.

## Structural Zones

| Zone    | Background  | Border             | Notes                                  |
| ------- | ----------- | ------------------ | -------------------------------------- |
| Header  | primary (dark black) | border-b (thin) | Navigation, site title, white text |
| Content | Alternating light/dark | — | Odd sections: light bg, even sections: dark bg |
| Footer  | primary (dark black) | border-t (thin) | Contact, links, dark background |

## Spacing & Rhythm

Spacious breathing room throughout: `py-16 md:py-24` section gaps, `gap-8` content grouping. Section padding `px-4 sm:px-6 lg:px-8`. Consistent `gap-4` for component-level spacing. Max-width container `2xl:max-w-5xl`.

## Component Patterns

- **Buttons**: Black (dark mode) or transparent border on light sections. `hover:scale-105 transition-smooth`. No fill on light sections—text-only or outlined.
- **Cards**: Minimal 4px border-radius, no shadow (light mode) or subtle `shadow-md` (dark mode). Stroke border, no fill.
- **Links**: Underline (text-decoration-underline). `hover:opacity-70 transition-smooth`.

## Motion

- **Entrance**: Section fade + slide-up via `@keyframes section-enter` (0.6s ease-out). Stagger by 100ms per child element.
- **Hover**: `transition-smooth` (0.3s cubic-bezier) on all interactive elements. Hover scale `1.05` + `shadow-md` on cards/buttons.
- **Decorative**: Smooth scroll-triggered animations via Motion.js (if implemented in components).

## Constraints

- **No color accents** — pure achromatic. All visual emphasis via typography weight, size, tracking.
- **No gradients, blur effects, or glassmorphism** — flat surfaces only.
- **Radii**: Minimal (4px) to maintain brutalist edge.
- **Dark mode primary** — light mode used for alternating content sections only.

## Signature Detail

Dark/light section alternation creates editorial magazine rhythm, reinforced by strict monochrome palette and serif/sans-serif typography contrast. Typography hierarchy (Lora bold on dark, DM Sans regular on light) is the core differentiator.
