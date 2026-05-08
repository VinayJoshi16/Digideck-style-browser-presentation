# Mall of America — Interactive Sales Deck

A cinematic, browser-based interactive **presentation deck** built for Mall of America — designed for prospective retail tenants, sponsors, and event partners. Built in the style of Digideck: full-screen slides, one at a time, with keyboard and swipe navigation.

**Live URL:** https://interactive-mega-mall-sales-deck.vercel.app  
**GitHub:** https://github.com/VinayJoshi16/Interactive-Mega-Mall-Sales-Deck

---

## What It Is

This is not a scrolling website. It is a **slide-based interactive sales tool** — 9 full-screen slides navigated by arrow keys, mouse wheel, swipe, or the built-in menu overlay. A salesperson can screen-share it on a live call, or send the link for a prospect to explore independently.

**Primary audience:** Decision-makers at brands, agencies, and production companies evaluating a retail presence, sponsorship deal, or event booking at Mall of America.

**Business objectives the deck serves:**
- Drive retail leasing deals (luxury, mid-tier, flagship, pop-up)
- Drive sponsorship and brand partnership deals
- Drive event bookings (concerts, activations, corporate events)

---

## Slide Structure

| # | Slide | Content | CTA |
|---|---|---|---|
| 01 | Welcome | Cinematic video hero, headline, 4 key stats | Explore the Property |
| 02 | Why Us | Demographics, stat cards, animated bars, image | — |
| 03 | Retail | Tenant marquee, 3 leasing category cards | Leasing inquiry |
| 04 | Luxury | Full-bleed image, editorial quote, brand strip | Luxury leasing |
| 05 | Dining | Split layout: image + highlights + stats | F&B inquiry |
| 06 | Entertainment | Bento grid: theme park, aquarium, activations | — |
| 07 | Events | Venue specs, past events scroll, booking CTA | Book a venue |
| 08 | Sponsorship | 3 tier cards, audience metrics, image | Partnership deck |
| 09 | Get Started | 3 conversion paths + full contact form | Send message |

---

## Navigation

| Input | Action |
|---|---|
| `→` or `↓` or `Space` | Next slide |
| `←` or `↑` | Previous slide |
| `M` | Toggle slide menu |
| `Esc` | Close menu / modal |
| Mouse wheel | Navigate slides |
| Swipe left / right | Navigate slides (mobile/tablet) |
| Bottom dot indicators | Jump to any slide |
| `☰ Slides` button | Open full slide menu overlay |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Animation | Framer Motion (`LazyMotion + domAnimation`) |
| Fonts | `next/font/google` — zero render blocking |
| Images | `next/image` — auto WebP, lazy load |
| AI Chatbot | Groq API — `llama-3.1-8b-instant` (free tier) |
| Styling | CSS custom properties + inline styles |
| Deployment | Vercel |

---

## Project Structure
src/
├── app/
│   ├── layout.tsx              # Fonts, metadata, OG tags
│   ├── page.tsx                # Root — cursor + intro + DeckShell
│   └── api/chat/route.ts       # Groq AI chatbot API route
│
├── components/
│   ├── DeckShell.tsx           # ★ Core — slide state, navigation, menu
│   ├── IntroAnimation.tsx      # Cinematic 10s intro before deck loads
│   │
│   ├── slides/
│   │   ├── Slide00Hero.tsx     # Slide 1 — Video hero
│   │   ├── Slide01WhyUs.tsx    # Slide 2 — Why this property
│   │   ├── Slide02Retail.tsx   # Slide 3 — Retail leasing
│   │   ├── Slide03Luxury.tsx   # Slide 4 — Luxury positioning
│   │   ├── Slide04Dining.tsx   # Slide 5 — Dining & lifestyle
│   │   ├── Slide05Entertainment.tsx  # Slide 6 — Attractions
│   │   ├── Slide06Events.tsx   # Slide 7 — Events platform
│   │   ├── Slide07Sponsorship.tsx    # Slide 8 — Partnerships
│   │   └── Slide08Contact.tsx  # Slide 9 — Get started
│   │
│   └── ui/
│       ├── SlideLayout.tsx     # Shared full-screen slide wrapper
│       ├── StatBadge.tsx       # Animated count-up stat component
│       ├── CTAButton.tsx       # Primary / secondary / ghost buttons
│       └── ChatBot.tsx         # AI leasing assistant chat panel
│
├── lib/
│   ├── data.ts                 # All content, stats, copy — single source
│   └── animations.ts           # Framer Motion shared variants
│
└── styles/
└── globals.css             # CSS variables, base styles, cursor

---

## Setup Instructions

```bash
# 1. Clone the repository
git clone https://github.com/VinayJoshi16/Digideck-style-browser-presentation
cd Digideck-style-browser-presentation

# 2. Install dependencies
npm install

# 3. Create environment variables
cp .env.example .env.local
# Then add your Groq API key to .env.local
```

Create `.env.local` in the project root:
```env
GROQ_API_KEY=your_groq_api_key_here
NEXT_PUBLIC_SITE_URL=https://digideck-style-browser-presentation.vercel.app/
```

Get a free Groq API key at **console.groq.com** — no credit card required.

```bash
# 4. Start the development server
npm run dev

# 5. Open in browser
# http://localhost:3000
```

```bash
# Build for production
npm run build
npm run start
```

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `GROQ_API_KEY` | Yes | Free API key from console.groq.com |
| `NEXT_PUBLIC_SITE_URL` | No | Production URL for OG meta tags |

---

## Deployment (Vercel)

1. Push repo to GitHub
2. Go to **vercel.com** → New Project → Import repo
3. Add environment variable: `GROQ_API_KEY`
4. Click Deploy

Every push to `main` auto-deploys.

---

## AI Tools Used

| Tool | Purpose |
|---|---|
| **Claude (Anthropic)** | Full project architecture,debugging, system design |
| **Groq / Llama 3.1** | Live AI leasing assistant embedded in the deck — free, 14K requests/day |
| **Midjourney** | AI-generated section images (hero, luxury corridor, events, dining, sponsor) |

### AI-Generated Assets

All 5 primary section images were generated with Midjourney:

| File | Prompt theme |
|---|---|
| `hero.webp` | Mall interior, Nickelodeon Universe, crowds, glass ceiling |
| `luxury.webp` | Luxury retail corridor — Chanel, Saint Laurent, Gucci |
| `event.webp` | Indoor concert crowd, stage lighting, confetti |
| `dining.webp` | Premium food hall, busy lunch crowd, skylights |
| `sponsor.webp` | Brand activation pop-up in mall atrium |

The intro animation uses real Mall of America photography (publicly available press assets).

---

## Performance

Tested via Google PageSpeed Insights on the Vercel deployment:

| Metric | Desktop | Mobile |
|---|---|---|
| Performance | 70+ | 66+ |
| Accessibility | 97 | 97 |
| Best Practices | 100 | 100 |
| SEO | 100 | 100 |
| Core Web Vitals | **Passed** (desktop) | — |

**Key optimizations applied:**
- `next/font/google` eliminates render-blocking font requests (~2,140ms saved)
- YouTube hero video loads after 3s delay — static image shown first for LCP
- `LazyMotion` with `domAnimation` reduces Framer Motion bundle ~30%
- Event delegation replaces per-element cursor listeners (fixes TBT)
- `next/image` for automatic WebP conversion and lazy loading
- RAF guard on particle canvas prevents CPU leak after intro unmounts

---

## Design Decisions

**1. Digideck-style slide architecture over scrolling**
The brief specifically referenced Digideck as the format. Full-screen slides with discrete navigation match the way sales presentations are actually used — on screen shares, where the presenter controls the pace, or as standalone links where the prospect navigates themselves.

**2. `DeckShell.tsx` as the single navigation brain**
All slide state, keyboard handling, wheel events, touch/swipe, dot indicators, and the menu overlay live in one component. Individual slides know nothing about navigation — they just render content. This makes slides trivially easy to reorder or add.

**3. `SlideLayout.tsx` as the shared frame**
Every slide uses the same wrapper: fixed 100vh × 100vw container, 64px top offset (top bar), 72px bottom offset (nav bar), optional background image with overlay. Consistent padding, consistent behavior.

**4. `data.ts` as the single source of truth**
No hardcoded copy in slide components. All stats, headlines, video IDs, image paths, and contact info live in `lib/data.ts`. Updating a stat or contact email is a one-line change. The deck is white-labelable — change `data.ts` and it becomes a different property's deck entirely.

**5. Cinematic intro as a tone-setter**
The 10-second intro animation (8 images flying in from screen edges, particle cursor effects, gold gradient headline, hero image reveal) establishes premium quality before the first slide loads. It signals immediately that this is not a standard pitch deck.

**6. AI chatbot as a 24/7 sales tool**
The "Ask Alex" assistant (bottom-right gold button) is powered by Groq's free Llama 3.1 model with a system prompt loaded with all property data — visitor stats, venue capacities, leasing categories, sponsorship tiers. It handles prospect questions at any hour and routes serious leads to the team.

---

## What I Would Improve With More Time

1. **Segmented leasing deep-dives** — dedicated sub-slides for each leasing category (Luxury / F&B / Pop-up / Mid-tier) with floor plan visualizations and availability data per category

2. **Venue sub-modules** — full-screen dedicated experiences for the Grand Atrium, Rotunda Stage, and North Garden Hall with 360° imagery and capacity configurator

3. **CMS integration** — connect `data.ts` to a headless CMS (Sanity or Contentful) so the sales team can update copy, swap images, and add new events without touching code

4. **Analytics layer** — track which slides get most time, which CTAs get clicked, and drop-off points; feed this data back to the sales team as engagement intelligence

5. **Presenter mode** — a separate URL parameter (`?presenter=true`) that shows speaker notes, timing indicators, and a mini-map of all slides for use during live screen-share calls

6. **PDF export** — one-click export of the deck as a branded PDF for prospects who request a leave-behind after the call

---

## Submission

**Live URL:** https://digideck-style-browser-presentation.vercel.app/ 
**GitHub:** https://github.com/VinayJoshi16/Digideck-style-browser-presentation
