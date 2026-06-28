## Brand
Afrocentric premium fashion brand. Aesthetic: editorial, warm, cultural, bold.
Tone: luxury African fashion studio — confident, expressive, timeless.
Reference: think Vogue Africa meets handcrafted fabric artistry.
NOT generic Western e-commerce. NOT loud or chaotic. Culturally rich but premium.

## Colours
- Background:     #FAF6F1  (warm cream — all page backgrounds)
- Foreground:     #111111  (near black — headings, body text)
- Muted:          #C8C0B8  (warm grey — borders, secondary text)
- Accent Primary: #FF1694  (hot pink — PRIMARY brand colour, buttons, badges, hover)
- Accent Warm:    #A0866A  (warm tan — secondary depth, subtle highlights)
- Surface:        #FFFFFF  (pure white — cards, image containers)
- Button bg:      #FF1694  (pink, not black)
- Button text:    #FFFFFF
- Ankara Teal:    #00A896  (decorative accents only — not UI)
- Ankara Orange:  #F47C26  (decorative accents only — not UI)

## Typography
- Headings (h1–h3): Bold serif — Playfair Display or DM Serif Display
- Body / UI: Clean sans-serif — Inter or DM Sans
- Nav / labels / buttons: uppercase, tracking-widest
- Hero heading: very large, heavy weight, centre-aligned

## Layout & Spacing
- Generous whitespace — fashion sites breathe, never feel cramped
- Section padding: minimum 80px top and bottom (120px preferred on desktop)
- Cards: rounded-2xl or rounded-3xl
- Grids: ASYMMETRIC and STAGGERED — not uniform boxes of equal height
- Hero: full-viewport, centred, editorial
- Image layouts: inspired by the old Adoness site — scattered polaroid-like
  arrangement with varied rotations and heights, not a boring grid

## Afrocentric Visual Elements

### Paintbrush Strokes
- SVG paintbrush stroke shapes used as section dividers
- Pink (#FF1694) brush strokes separating major sections
- Animate with GSAP SVG path draw on scroll enter
- Keep them organic, hand-painted feel — not geometric
- Can pick out posters in (public/posters)

### Background Patterns
- Hero background: Ankara-inspired dot/diamond pattern (NOT plain dot grid)
- Pattern uses muted (#C8C0B8) at very low opacity (5–8%) — subtle texture
- CSS background-image pattern in globals.css
- Some sections: warm cream solid, alternating with light pink tint (#FFF0F7)

### Ankara Accent Shapes
- Small decorative Ankara-coloured geometric shapes (teal, orange) scattered
  in hero and about section — purely decorative, never overwhelming
- Think paint splatter dots, diamond shapes, small triangle accents
- SVG inline elements, not background images

### Hero Section Specific
- Bidemi's photo CENTRED — circular crop with a pink ring border
- Product images SCATTERED around her photo at slight rotations (±3–8deg)
- Each product image: white polaroid-style frame, soft shadow, slight tilt
- This creates the "designer surrounded by her work" editorial feel
- Reference: the old Adoness website about page layout exactly

## Components

### Navbar
- Logo left (use /public/logo.png)
- Nav links centre: uppercase tracking-widest
- Icons right: search + cart/bag
- On scroll: add subtle backdrop blur + slight border bottom
- Mobile: hamburger menu, full-screen overlay, links stacked large

### Buttons
- Shape: pill (rounded-full)
- Primary: pink fill (#FF1694), white text, uppercase tracking-widest
- Secondary: pink border, transparent fill, pink text
- Hover: scale(1.03) + slight opacity shift — GSAP on hover

### Product Cards (ArrivalCard)
- White surface, rounded-3xl, soft shadow
- Image top: object-cover, varied aspect ratios in grid
- Price in pink below image
- Availability badge: green pill (In Stock), pink pill (Pre-Order), grey (Sold Out)
- Hover: card lifts (translateY -4px), image scales slightly (1.05)
- All hover done with GSAP, not CSS transition

### Chatbot
- Floating fixed bottom-right
- Trigger: pink circular button (matches brand, NOT dark)
- Modal: cream background (#FAF6F1), dark header (#111111), pink send button
- NOT WhatsApp — this is the custom n8n AI chatbot

### PaintbrushDivider Component
- Reusable SVG component placed between major page sections
- Props: color (default pink), direction (left | right | centre)
- GSAP path draw animation on ScrollTrigger enter

## Animations — Full Specification

### Philosophy
Elegant, purposeful, performance-conscious. Every animation must earn its place.
Agreed with client: lots of animation BUT optimised. No jank, no lag.

### Page Load (Hero)
1. Logo fades in from top (y: -20 → 0, opacity 0 → 1, duration 0.6s)
2. Nav links stagger in left to right (delay 0.1s between each)
3. Hero heading: each word/line reveals upward (y: 40 → 0, opacity 0 → 1, stagger 0.15s)
4. Hero subtext fades in (delay 0.8s)
5. CTA button scales in (scale: 0.8 → 1, opacity 0 → 1, delay 1s)
6. Bidemi's circular photo fades + scales in (scale: 0.9 → 1, delay 0.5s)
7. Product photos scatter in one by one with slight rotation (stagger 0.1s each)
8. Ankara decorative shapes draw/fade in last (delay 1.2s)

### Scroll Animations (ScrollTrigger)
- Section headings: slide up + fade in (y: 30 → 0) as they enter viewport
- Product card grids: stagger fade-up (each card 0.08s apart)
- Paintbrush dividers: SVG path draw left to right
- About section: photo and text split — photo slides from left, text from right
- Collection images: alternating parallax (odd columns move up, even move down slightly)

### Hover Interactions
- Nav links: pink underline slides in from left on hover (GSAP)
- Product cards: lift + image zoom (GSAP, not CSS)
- Buttons: gentle scale pulse on hover
- Social icons: rotate ±10deg + colour shift on hover

### Performance Rules
- `will-change: transform` only on actively animating elements — remove after
- Use `gsap.context()` for all component-scoped animations
- Always cleanup: `return () => ctx.revert()`
- Lazy load images below the fold (`loading="lazy"` on next/image)
- Never animate width, height, display, or background-color
- Keep total animation duration per interaction under 0.6s

## Do's
- Use pink boldly — it's her brand, not an accent
- Stagger everything — nothing should appear all at once
- Asymmetric image layouts always — fashion is editorial not corporate
- Serif for all headings, labels uppercase
- Paintbrush strokes between every major section
- Circular cropped photos for portraits

## Don'ts
- No uniform grids where every card is identical height
- No blue, purple, or cool-toned colours anywhere
- No CSS transitions for hover — use GSAP for consistency
- No generic dark tech UI for the chatbot
- No tight cramped layouts
- No Framer Motion — GSAP only
- Never hardcode hex values in components — always CSS variables
