# Adoness Design — Project Briefing

## What This Project Is
A premium Afrocentric fashion designer's portfolio and showcase website for client Adoness 
(Bidemi Odusi). Displays collections, categories, and new arrivals, includes an n8n-powered AI 
chatbot, a fabric makeover request form, and a fabric art video showcase. 
Goal: premium Afrocentric editorial fashion brand — warm, cultural, elegant, animated, optimised.

## Build Phases — READ THIS FIRST
Work strictly within the current phase. Do not build ahead.

- **Phase 1 (CURRENT):** Design system, layout, all display pages, animations, chatbot UI
- **Phase 2:** Supabase integration, admin upload, data retrieval, Buy Now (Stripe), Makeover form
- **Phase 3:** Fabric Academy full build, any post-launch features

Each phase section below is tagged. Only build Phase 2+ when explicitly instructed.

---

## Tech Stack
- **Framework:** Next.js 14+ (App Router)
- **Styling:** Tailwind CSS
- **Language:** TypeScript (strict — no `any` ever)
- **Animation:** GSAP (selective, elegant, performance-conscious)
- **HTTP Client:** Axios (chatbot + client-side calls)
- **Database:** Supabase (Phase 2)
- **Storage:** Supabase Storage (Phase 2)
- **Design Reference:** /design folder (READ ONLY)

---

## Brand Identity

### Logo
- File: `/public/logo.png` (transparent PNG required)
- Wordmark: "Adoness" hot pink serif + dot icon
- Sub-mark: "FABRIC-ART-GALLERY" Ankara-patterned multicolour
- Tagline: "...making luxury fabric-art statements"
- Navbar (left) + Footer. Never recolour, stretch, or recreate.

### Colours
| Token | Value | Usage |
|-------|-------|-------|
| `background` | `#FAF6F1` | Page background (warm cream) |
| `foreground` | `#111111` | Primary text, headings |
| `muted` | `#C8C0B8` | Borders, secondary text |
| `accent-primary` | `#FF1694` | Brand pink — buttons, badges, highlights, hover |
| `accent-warm` | `#A0866A` | Secondary warm tan |
| `surface` | `#FFFFFF` | Cards, image containers |
| `btn-primary-bg` | `#FF1694` | Primary button bg (pink) |
| `btn-primary-text` | `#FFFFFF` | Primary button text |
| `ankara-teal` | `#00A896` | Decorative accents only |
| `ankara-orange` | `#F47C26` | Decorative accents only |

Define all as CSS variables in `globals.css`. Never hardcode hex in components.

### Typography
- Headings (h1–h3): Bold serif — Playfair Display / DM Serif Display
- Body / UI: Inter / DM Sans
- Labels / nav / buttons: uppercase, tracking-widest
- Hero heading: very large, heavy, centre-aligned

### Design Vibe
Premium Afrocentric editorial. Vogue Africa meets luxury fabric studio.
Scattered/staggered image layouts, paintbrush stroke dividers, Ankara patterns, 
her photo centred with products orbiting. Pink used boldly. Generous whitespace.
Full visual + animation spec lives in `/design/DESIGN.md` — follow it exactly.

---

## Folder Structure
```
app/
  page.tsx                    → Home [P1]
  globals.css                 → @theme tokens, base styles [P1]
  layout.tsx                  → Navbar + Footer + Chatbot [P1]
  about/page.tsx              → [P1]
  collections/page.tsx        → Server component, fetches from Supabase [P2]
  category/[slug]/page.tsx    → Dynamic category filter, server fetch [P2]
  new-arrivals/page.tsx       → Server component, Supabase fetch [P2]
  item/[slug]/page.tsx        → Product detail + Buy Now [P2]
  contact/page.tsx            → [P1]
  fabric-makeover/page.tsx    → Request form [P2]
  fabric-academy/page.tsx     → Video showcase [P3 — placeholder only until then]
  admin/
    post/page.tsx             → PIN-protected upload form [P2]
  api/
    arrivals/route.ts         → POST (create item) + optional GET [P2]
components/
  ui/                         → Button, Container, Card, Badge [P1]
  layout/                     → Navbar, Footer [P1]
  sections/                   → Hero, CollectionGrid, CategoryStrip [P1]
    ArrivalCard.tsx           → Product card: price + availability badge [P1 shell, P2 data]
    PaintbrushDivider.tsx     → SVG paintbrush stroke divider [P1]
  chatbot/                    → Floating trigger + modal [P1]
  admin/
    PostForm.tsx              → Admin upload form [P2]
lib/
  axios.ts                    → Axios instance [P1]
  chatbot.ts                  → Chatbot API helper [P1]
  supabase.ts                 → Supabase client (server + client variants) [P2]
  gsap/                       → GSAP utilities and hooks [P1]
hooks/
types/
  arrival.ts                  → ArrivalItem interface [P1]
public/
  logo.png                    → Brand logo (do not modify)
  about/                      → Bidemi portrait + working photos
design/                       → Client references — READ ONLY
```

---

## ───────────────  PHASE 1  ───────────────
## Design, Layout & Display (BUILD NOW)

### Pages
| Page | Route | Purpose |
|------|-------|---------|
| Home | `/` | Hero, featured collections, brand intro, staggered image grid |
| About | `/about` | Designer story, her photo, process grid, vision |
| Contact | `/contact` | Enquiries, social links |

### Phase 1 Scope
- Full design system in globals.css — all colour tokens, fonts, base styles
- Navbar (logo, centre nav, search + cart icons, mobile menu)
- Footer (logo, links, socials, tagline)
- Home page: hero with scattered product layout, featured sections, paintbrush dividers
- About page: her portrait centred, working photos in staggered grid
- Contact page: form UI (no backend yet) + social links
- Chatbot UI fully built and wired to n8n webhook
- ALL animations per DESIGN.md (hero load sequence, scroll reveals, hover)
- ArrivalCard component built as a SHELL — accepts props, displays correctly,
  but fed with placeholder/mock data in Phase 1 (real data comes Phase 2)
- Collections/Category/New Arrivals pages can be built with MOCK data arrays
  in Phase 1 so layout and animation are locked, then wired to Supabase in Phase 2

### Her Working Photos — Placement
- About page hero: her portrait (circular crop, pink ring border)
- About process grid: 3–4 working photos, staggered asymmetric layout
- Store in `/public/about/` — `bidemi-portrait.jpg`, `bidemi-working-1.jpg`, etc.

---

## ───────────────  PHASE 2  ───────────────
## Data, Admin, Commerce (DO NOT BUILD UNTIL INSTRUCTED)

### Data Architecture — Hybrid Pattern
**Server components query Supabase directly** (server-side, no API hop):
- `collections/page.tsx`, `category/[slug]/page.tsx`, `new-arrivals/page.tsx`, `item/[slug]/page.tsx`
- Use a server-side Supabase client from `lib/supabase.ts`
- Fetch on the server, render server-side, pass data to client card components

**API route handles writes + client-side needs:**
- `app/api/arrivals/route.ts`
  - `POST` → create new item (called by admin PostForm)
  - `GET` (optional) → for any client-side filtering/search if needed later
- Admin form posts to `/api/arrivals`, route inserts into Supabase

`lib/supabase.ts` exports two clients:
```typescript
// Server client — for server components (uses service role or anon, server-only)
export const createServerClient = () => { ... }
// Browser client — for client components (anon key, public)
export const createBrowserClient = () => { ... }
```

### ArrivalItem Type (types/arrival.ts)
```typescript
interface ArrivalItem {
  id: string
  uuid: string
  title: string
  category: string           // matches category slug
  images: string[]           // Supabase Storage public URLs
  description?: string
  price?: number             // NGN
  stripe_payment_url?: string
  availability: 'in_stock' | 'pre_order' | 'sold_out'
  quantity?: number          // only when in_stock
  created_at: string
}
```

### Supabase Table: `arrivals`
```sql
create table arrivals (
  id uuid primary key default gen_random_uuid(),
  uuid uuid not null,
  title text not null,
  category text not null,
  images text[] not null,
  description text,
  price numeric,
  stripe_payment_url text,
  availability text default 'in_stock',
  quantity integer,
  created_at timestamptz default now()
);
```
Storage bucket: `arrivals` (public read).

### Product Categories
**Fashion:** Bags, Clothes, Jewellery, Shoes (coming soon)
**Fabric Homewares:** Coming soon
**Gifts & Souvenirs:** Phone & Airpod Pouches, Wallets, Pencil Cases, Make-up Bags
**Wall Arts & Home Decorations**
Slugs: lowercase-hyphenated (`bags`, `clothes`, `make-up-bags`).

### Retrieval Logic
- **New Arrivals:** all items, sorted `created_at desc`, server-fetched
- **Collections:** all items grouped/displayed by category, server-fetched
- **Category `[slug]`:** items filtered `where category = slug`, server-fetched
- **Item `[slug]`:** single item by slug/id, server-fetched
- All pages: loading + empty states required

### Admin Form (PostForm.tsx → POST /api/arrivals)
Fields:
- `title` — text (required)
- `category` — dropdown (full category list above)
- `images` — multi-upload, min 1 max 5, compressed (browser-image-compression)
- `description` — optional textarea
- `price` — number, NGN (optional)
- `stripe_payment_url` — text, paste Stripe Payment Link (optional)
- `availability` — dropdown: In Stock / Pre-order / Sold Out
- `quantity` — number, shown only when In Stock selected
- Submit — pill, pink fill
PIN protected via `ADMIN_PIN` env. Handle upload progress + success/error.

### Buy Now — Stripe Payment Links
No SDK, no backend sessions. Adoness creates Payment Links in Stripe, pastes URL in admin form.
| State | Badge | Button |
|-------|-------|--------|
| in_stock + qty > 0 | Green "In Stock (n left)" | Pink "Buy Now" → Stripe |
| pre_order | Pink "Pre-Order" | Pink "Pre-Order Now" → Stripe |
| sold_out | Grey "Sold Out" | Disabled |
Button only renders if `stripe_payment_url` exists. Opens new tab.

### Bulk Upload Script
`upload-products.mjs` at project root reads `/products/[Item Name]/` folders,
parses `details.txt`, uploads images to Supabase Storage, inserts rows.
Run with `node upload-products.mjs` after `npm install @supabase/supabase-js dotenv`.

### Fabric Makeover Page (/fabric-makeover)
Request form: client describes desired makeover, submits → saved or emailed to Bidemi.
Fields: name, contact, item description, photo upload (optional), notes.
Simple form — NOT e-commerce. Posts to an API route or email service.

---

## ───────────────  PHASE 3  ───────────────
## Post-Launch (DO NOT BUILD UNTIL INSTRUCTED)

### Fabric Academy Page (/fabric-academy)
Until Phase 3: render a styled "Coming Soon" placeholder only.
Full build: video showcase grid of Bidemi's process/work videos.
Video embeds (YouTube or direct), thumbnail grid, branded layout.

---

## Chatbot Integration [P1]
- n8n webhook via Axios POST, floats fixed bottom-right
- Trigger: pink circular button. Modal: cream bg, dark header, pink send
- NOT WhatsApp — custom AI chatbot
Request:
```json
{ "action": "sendMessage", "sessionId": "string", "chatInput": "string" }
```
Response: parse `data.output` → `data.text` → `data.response` → `data.message`
Env: `NEXT_PUBLIC_CHATBOT_WEBHOOK_URL`

---

## Environment Variables
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
SUPABASE_SERVICE_ROLE_KEY=          ← server-only, never client
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
ADMIN_PIN=
NEXT_PUBLIC_CHATBOT_WEBHOOK_URL=
```
Never hardcode. Never modify .env files. Reference via `process.env` only.

---

## Coding Conventions
- TypeScript strict — everything typed. No `any`, no `@ts-ignore`.
- Named exports for components. No default exports.
- Server components by default — `"use client"` only for hooks/browser/GSAP.
- `@/` path alias for internal imports.
- Tailwind utilities only — no inline styles, no CSS modules unless unavoidable.
- All Axios/fetch in try/catch with loading + error UI.
- CSS variable tokens always — never raw hex in components.
- `next/image` with alt text + object-cover for all images.
- Animate only opacity/transform — never width/height/display/colour.

---

## What Claude Should Do on Every Task
1. Confirm which PHASE the task belongs to — do not build ahead of current phase
2. Read relevant section of this file + `/design/DESIGN.md`
3. Check `/design` for reference files before building any page/section
4. List files to be created/modified before starting
5. Work one component/section at a time
6. After completing: `npm run type-check` → `lint` → `build`
7. Summarise: what changed, what was skipped and why, follow-ups
8. Flag out-of-scope issues in a "Side note:" — never silently fix
