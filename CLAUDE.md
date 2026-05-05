# Adoness Design — Project Briefing

## What This Project Is
A fashion designer's portfolio and showcase website for a client named Adoness. The site displays collections, categories, and new arrivals, and includes a chatbot powered by an n8n agent. The goal is a premium, elegant, modern fashion brand experience.

## Tech Stack
- **Framework:** Next.js 14+ (App Router)
- **Styling:** Tailwind CSS
- **Language:** TypeScript (strict — no `any` types ever)
- **Animation:** GSAP (used selectively where motion adds value — entrances, reveals, hover effects)
- **HTTP Client:** Axios (used for chatbot API calls to n8n webhook)
- **Design Reference:** Figma exports and screenshots provided in /design folder

---

## Brand Identity (Follow This Exactly)

### Colours
Extracted from the approved design mockup:

| Token | Value | Usage |
|-------|-------|-------|
| `background` | `#FAF6F1` | Page background (warm off-white/cream) |
| `foreground` | `#111111` | Primary text, headings |
| `muted` | `#C8C0B8` | Subtle dot patterns, borders, secondary text |
| `accent` | `#A0866A` | Warm tan/sand — hover states, highlights |
| `surface` | `#FFFFFF` | Cards, image containers |
| `btn-primary-bg` | `#111111` | Primary button background |
| `btn-primary-text` | `#FFFFFF` | Primary button text |

Define all of these as CSS variables in `globals.css` and reference them via Tailwind config. Never hardcode raw hex values in components.

### Typography
- **Headings (h1–h3):** Large, bold serif — use `font-serif` or a Google Font like `Playfair Display` or `DM Serif Display`
- **Body / UI text:** Clean, modern sans-serif — use `font-sans` with `Inter` or `DM Sans`
- **Labels / nav / buttons:** Uppercase tracking-widest for small caps feel (as seen in mockup nav)
- Font sizes should be generous — this is a fashion brand, whitespace and type scale matter

---

## Folder Structure
```
src/
  app/                    → Next.js App Router pages
    page.tsx              → Home
    about/page.tsx
    collections/page.tsx
    category/page.tsx
    new-arrivals/page.tsx
    contact/page.tsx
    item/[slug]/page.tsx  → Single product/item detail page
    layout.tsx            → Root layout with Navbar + Footer + Chatbot
  components/
    ui/                   → Reusable primitives (Button, Badge, Card, etc.)
    layout/               → Navbar, Footer
    sections/             → Page-level sections (Hero, CollectionGrid, etc.)
    chatbot/              → Chatbot modal component
  lib/
    axios.ts              → Axios instance with base URL configured
    chatbot.ts            → Chatbot API call helper
    gsap/                 → GSAP animation utilities and hooks
  hooks/                  → Custom React hooks
  types/                  → TypeScript interfaces and types
  styles/
    globals.css           → CSS variables, base styles
design/                   → Figma exports, screenshots, reference images (DO NOT modify)
```

---

## Pages Overview

| Page | Route | Purpose |
|------|-------|---------|
| Home | `/` | Hero section, featured collections, brand intro, image grid |
| Collections | `/collections` | Full collections/lookbook grid |
| Category | `/category` | Filter view by clothing type |
| New Arrivals | `/new-arrivals` | Latest pieces highlighted |
| About | `/about` | Designer story, vision, process |
| Contact | `/contact` | Booking, enquiries, social links |
| Item Detail | `/item/[slug]` | Single piece detail view |

---

## Design System Rules

- **Always use server components by default.** Add `"use client"` only when the component uses hooks, browser APIs, or GSAP animations.
- **Spacing:** Use generous padding and margin. Fashion sites breathe — don't compress content.
- **Images:** Always use `next/image` with proper `alt` text. Use `object-cover` for fashion photography.
- **Responsive:** Mobile-first. Every component must look correct at 375px, 768px, and 1280px+.
- **Rounded corners:** Soft `rounded-2xl` or `rounded-3xl` for cards and image containers, matching the mockup aesthetic.
- **Dot pattern background:** The subtle dot grid on the hero is a CSS background-image pattern — replicate it in globals.css.

---

## GSAP Animation Rules
- Only animate elements that benefit from motion (hero text reveal, image stagger, section entrances)
- All GSAP code goes inside `useEffect` with proper cleanup (`return () => { tl.kill() }`)
- Use `ScrollTrigger` for scroll-based reveals
- Never animate layout-breaking properties — stick to `opacity`, `y`, `scale`, `x`
- Keep animations subtle and elegant — this is fashion, not a game site

---

## Chatbot Integration
- The chatbot connects to an **n8n webhook** via Axios POST
- Axios instance is configured in `/lib/axios.ts` with the base URL from `.env.local`
- Session ID is generated once per page load and passed with every message
- Request body shape:
```json
{
  "action": "sendMessage",
  "sessionId": "string",
  "chatInput": "string"
}
```
- Response: parse `data.output` first, fallback to `data.text`, `data.response`, `data.message`
- The chatbot component floats fixed bottom-right, same pattern as the portfolio site
- Environment variable: `NEXT_PUBLIC_CHATBOT_WEBHOOK_URL`

---

## Coding Conventions
- **TypeScript:** Strict mode. Every prop, function param, and return type must be typed. No `any`.
- **Components:** Functional only. Named exports for all components.
- **Imports:** Use `@/` path alias for all internal imports
- **CSS:** Tailwind utility classes only. No inline styles. No separate CSS modules unless absolutely necessary.
- **Error handling:** All Axios calls wrapped in try/catch. Always handle loading and error states in UI.
- **No magic numbers:** Use Tailwind spacing scale. If a custom value is needed, define it in tailwind.config.

---

## Environment Variables
```
NEXT_PUBLIC_CHATBOT_WEBHOOK_URL=   ← n8n webhook URL for chatbot
```
Never hardcode URLs. Always read from `process.env`.

---

## What Claude Should Do When Working on This Project
- **Read** the design files in `/design` before building any new page or section
- **Follow the brand identity exactly** — colours, fonts, spacing must match the mockup
- **Write full TypeScript** — no shortcuts, no implicit types
- **Run the dev server mentally** — before finishing a task, consider if there are missing imports, type errors, or broken layouts
- **Preserve existing structure** — do not reorganise folders unless asked
- **Comment non-obvious code** — especially GSAP timelines and animation logic
- **Never touch .env files** — only reference env variables, never create or overwrite .env