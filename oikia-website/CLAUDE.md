# CLAUDE.md — OIKIA Lead Developer Guide (Next.js & TypeScript)

> **Status:** Active Engineering Blueprint & Architectural Guide  
> **Framework:** Next.js (App Router) + TypeScript + React  
> **Visual Reference:** https://oikia-stories-in-motion.laceyparrot2.chatgpt.site (Source: `2d81b19bccc97633e10d1d640352e781719642cf`)  
> **Original Spec & Assets:** `OIKIA-Developer-Handoff.md` & `oikia-website/README-FIRST.md`  

---

## 1. Project Vision & Architectural Core

**OIKIA** is an African podcast-first media company developing storytelling, podcast marketing, podcast management, consultation, POD Creators Africa (PCA), and upcoming media strategy.

### Next.js & TypeScript Architectural Invariants
* **Framework:** Next.js 14/15 App Router with TypeScript.
* **Component Paradigm (RSC vs. Client):**
  * **Server Components by default:** Layouts, static page shells, metadata generation, and content prose.
  * **Client Components (`'use client'`):**
    * `HeroMediaStage`: Pointer tracking (`--mx`, `--my`), scroll spread (`--spread`), ambient video loop.
    * `StoryDialog`: Native `<dialog>` modal with 4-slide carousel, keyboard navigation, and video sync.
    * `ServiceAccordion`: Dynamic interactive artwork switching, tone adjustment, and background color shifts.
    * `ContactDialog` & `InlineEnquiryForm`: Tab switching, client-side validation, review mode, and Server Action / API submission.
    * `BlogReader`: Category filtering, hash-based URL navigation, and in-page reading view without full page reload.
    * `MotionControl`: Floating toggle for user motion preference.
* **Form & Backend Architecture:**
  * Type-safe Next.js **Server Actions** or **Route Handler** (`/api/enquiry`) using Zod for validation.
  * Integration ready for email dispatch (Resend/SendGrid) or CRM webhooks.
* **Absolute Respect for Brand Truth:** **Never invent** client names, case studies, metrics, testimonials, program dates, pricing, or promises. All unconfirmed sections remain clearly marked as design previews.

---

## 2. Directory Structure (Next.js App Router)

```
oikia/ (or app root)
├── app/
│   ├── layout.tsx                  # Root layout (fonts, noise texture, Header, Footer, Dialogs, MotionControl)
│   ├── page.tsx                    # Home: Hero 3D stage, Marquee, Intro, Service teaser, PCA, Perspectives
│   ├── about/
│   │   └── page.tsx                # About: Panorama, Values grid, "Our Next Chapter", Contact trigger
│   ├── services-work/
│   │   └── page.tsx                # Services & Work: Accordion, Selected work, Booking section, Enquiry form
│   ├── pod-creators-africa/
│   │   └── page.tsx                # POD Creators Africa: Manifesto, Pillars, Community notes
│   ├── blog/
│   │   └── page.tsx                # Blog: Filterable grid & in-page reader
│   └── api/
│       └── enquiry/
│           └── route.ts            # Type-safe API Route Handler for enquiries
├── components/
│   ├── layout/
│   │   ├── Header.tsx              # Fixed blur header, desktop nav, booking CTA, mobile drawer
│   │   └── Footer.tsx              # Oversized SVG wordmark, directory links, sample info modals
│   ├── hero/
│   │   ├── HeroMediaStage.tsx      # Client Component: 3D parallax cards, scroll spread, ambient video
│   │   └── Marquee.tsx             # Continuous brand ribbon
│   ├── services/
│   │   └── ServiceAccordion.tsx    # Interactive service list + synchronized artwork stage
│   ├── dialogs/
│   │   ├── StoryDialog.tsx         # 4-part visual story modal with video loop & arrow keys
│   │   ├── ContactDialog.tsx       # Tabbed modal (Send Enquiry vs. Book Call)
│   │   └── InfoDialog.tsx          # Sample legal & contact details modal
│   ├── blog/
│   │   ├── BlogGrid.tsx            # Category filters and article cards
│   │   └── BlogReader.tsx          # Client-side hash reader with pushState
│   └── ui/
│       ├── Button.tsx              # Pill button with rotating circle arrow
│       ├── MotionControl.tsx       # Reduced-motion toggle button
│       └── ScrollProgress.tsx      # Fixed top progress bar
├── lib/
│   ├── types.ts                    # Shared TypeScript interfaces (Stories, Services, Enquiries, Articles)
│   └── constants.ts                # Stories data, service descriptions, sample copy
├── public/
│   ├── assets/                     # wordmark.svg, mark.svg, images, video, fonts
│   └── noise.svg                   # Subtle fractal grain texture
├── styles/
│   ├── globals.css                 # CSS tokens, reset, typography, utility classes, keyframes
│   └── animations.css              # Custom motion easing and transitions
├── tsconfig.json
└── package.json
```

---

## 3. Information Architecture & Routes

| Route | Segment | Features & Anchors |
| :--- | :--- | :--- |
| **Home** | `/` | Hero 3D cards, Ambient video, Marquee, About snippet, Services teaser, PCA teaser, Perspectives |
| **About** | `/about` | Dual-image Panorama, Core values grid, "Our Next Chapter", Contact prompt |
| **Services & Work** | `/services-work` | `#services`, `#selected-work`, `#book-discovery-call`, `#send-enquiry` |
| **POD Creators Africa** | `/pod-creators-africa` | Community manifesto, Ecosystem pillars, Program preview |
| **Blog** | `/blog` | Journal grid, filters (`all`, `podcasting`, `media`, `community`), reader (`#finding-your-people`, etc.) |

---

## 4. Visual Design Tokens & Styling (CSS Variables)

Define these in `globals.css` and map them into Tailwind or CSS Modules:

### Colors
* `--paper`: `#f5f2e9` (Warm editorial parchment background)
* `--ink`: `#171715` (Deep charcoal primary text and solid buttons)
* `--muted`: `#696961` (Secondary body copy and quiet metadata)
* `--line`: `#d7d4cb` (Editorial rules, cards, and structural grid dividers)
* `--lime`: `#d8f205` (High-energy accent: button hover, badges, PCA highlights)
* `--blue`: `#345bff` (Interactive brand blue: active states, focus outlines, media strategy)
* `--orange`: `#f47b45` (Warm accent: People card, marketing service highlight)

### Typography
* **Primary:** `DM Sans` (Google Font or self-hosted in `public/assets/`)
* **Editorial:** `Instrument Serif` (Italics `<em>`, `<i>` for poetic, expressive emphasis)
* **Font Scaling:** `clamp()` scales used for hero headings (`clamp(66px, 8.8vw, 138px)`) and editorial accents.

### Strict Visual Invariants
1. **Wordmark:** Vector SVG `wordmark.svg` with the distinctive `K`. Never replace with standard text.
2. **Mark:** Extracted vector `mark.svg` (the standalone `O`) used for favicon, stamps, and rotating badges.
3. **Hero Watermark:** Giant, low-opacity (`opacity: 0.045`) `wordmark.svg` positioned behind hero text.
4. **Footer Wordmark:** Oversized SVG spanning the bottom edge of the layout.
5. **Contrast Guard:** Media Strategy artwork & blue containers (`#345bff`) MUST use white text (`data-tone="light"`).
6. **Grain:** `body::after` fractal noise layer (`opacity: 0.025`).

---

## 5. Client Interactions & State Management (`'use client'`)

* **Hero 3D Stage (`HeroMediaStage.tsx`):**
  * `onPointerMove`: Calculates normalized mouse coordinates `(-1 to +1)` on fine-pointer devices and applies tilt to card stack.
  * `scroll` listener: Interpolates scroll offset `(0 to 650px)` to dynamically spread cards outward (`--spread: 0 -> 1`).
  * `ambientVideo`: Pauses automatically if offscreen (`IntersectionObserver`), hidden tab, or if a modal dialog opens.
* **Story Viewer Modal (`StoryDialog.tsx`):**
  * Native HTML `<dialog>` with `.showModal()`.
  * Keyboard navigation (`ArrowRight`, `ArrowLeft`, `Escape`).
  * Video playback controls synced with current slide.
* **In-Page Blog Reader (`BlogReader.tsx`):**
  * Reads `window.location.hash` to display the active article without triggering a full page navigation.
  * Syncs history using `window.history.pushState`.
  * Remembers and restores the previous scroll position when returning to the overview.
* **Accessibility & Reduced Motion:**
  * Detects `(prefers-reduced-motion: reduce)`.
  * Floating `MotionControl.tsx` updates `document.documentElement.classList.toggle('motion-paused')`.

---

## 6. Pre-Launch Implementation Checklist

### Phase 1: Core Next.js Migration
- [ ] Initialize Next.js project with TypeScript, ESLint, and Tailwind CSS (or standard CSS).
- [ ] Migrate all SVGs, WebP images, MP4, and font files into `public/assets/`.
- [ ] Recreate root `layout.tsx` with global styles, metadata, `Header`, and `Footer`.
- [ ] Port the 5 route pages (`/`, `/about`, `/services-work`, `/pod-creators-africa`, `/blog`).
- [ ] Port all interactive Client Components (`HeroMediaStage`, `StoryDialog`, `ServiceAccordion`, `BlogReader`, `ContactDialog`).

### Phase 2: Live Integrations & Backend
- [ ] **Discovery Call Integration:** Connect Cal.com or Calendly embed/popup to `Book a Discovery Call` buttons.
- [ ] **Type-Safe Enquiry Action:** Create Server Action or `/api/enquiry` Route Handler with Zod schema and email/webhook dispatch.
- [ ] **Substack Linkage:** Connect *The OIKIA Letter* buttons to the live publication.

### Phase 3: Content Clearance & Production QA
- [ ] **Case Studies:** Replace illustrative work placeholder with cleared client summaries.
- [ ] **Copy Clearance:** Add approved founder story, team bios, and PCA details.
- [ ] **Legal Policies:** Replace sample privacy/terms with client-approved policies.
- [ ] **Cross-Device & Accessibility Testing:** Ensure full keyboard navigation, screen reader accessibility, and responsive validation on mobile/desktop.

---

## 7. Developer Operating Principles

1. **RSC First:** Keep pages and static layout as React Server Components; extract interactivity into isolated, lightweight Client Components.
2. **Never Compromise Visual Direction:** Match the pixel-perfection, typography cadence, and fluid easing of the original concept.
3. **No Fabricated Information:** Never introduce unverified client logos, statistics, or quotes.
