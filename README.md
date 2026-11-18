# OIKIA Platform

> A modern, African podcast-first media company exploring storytelling, podcast marketing, podcast management, consultation, POD Creators Africa (PCA), and upcoming media strategy.

## Tech Stack & Architecture

- **Framework:** [Next.js](https://nextjs.org) (App Router, React 19)
- **Language:** TypeScript
- **Styling:** CSS Custom Properties (Design Tokens), responsive layouts (1500px, 1100px, 760px, 370px), and fluid typography
- **Form Validation:** Zod
- **Architecture:** React Server Components (RSC) for page shells and SEO metadata, with isolated Client Components for interactive UI (3D hero media stage, ambient video loop, accessible `<dialog>` modals, exclusive service accordion, and in-page blog reader)

---

## Getting Started

### Prerequisites

- Node.js (v18.17+ or v20+)
- npm (v9+)

### Installation

```bash
# Clone the repository
git clone https://github.com/HoooM-Tech/oikia.git
cd oikia

# Install dependencies
npm install
```

### Running Locally

```bash
# Start the development server
npm run dev

# Open in your browser
http://localhost:3000
```

### Production Build

```bash
# Typecheck
npm run typecheck

# Build for production
npm run build

# Start production server
npm run start
```

---

## Route Overview

| Route | Description |
| :--- | :--- |
| `/` | **Home:** Hero 3D interactive stage, ambient video, marquee ribbon, about statement, services teaser, POD Creators Africa teaser, perspectives grid, and contact prompt. |
| `/about` | **About:** Dual-image panorama, core values grid (Excellence, Creativity, Emotional Resonance), and "Our Next Chapter". |
| `/services-work` | **Services & Work:** In-page anchor jumps, full service accordion, selected work placeholder, booking preview, and inline enquiry form with review state. |
| `/pod-creators-africa` | **POD Creators Africa:** Community manifesto, visual collage, ecosystem pillars (Connect, Learn, Explore), and program notes. |
| `/blog` | **Blog:** Editorial journal with category filters (`All`, `Podcasting`, `Media`, `Community`) and client-side in-page reader driven by URL hash links. |
| `/api/enquiry` | **API Route Handler:** Validates enquiry submissions with Zod. |

---

## Design Invariants & Tokens

- **Paper Background:** `#f5f2e9`
- **Ink:** `#171715`
- **Muted Text:** `#696961`
- **Editorial Rules:** `#d7d4cb`
- **Lime Accent:** `#d8f205`
- **Interactive Blue:** `#345bff`
- **Orange Accent:** `#f47b45`
- **Typefaces:** DM Sans (Primary) & Instrument Serif (Editorial Italics)
- **Favicon:** Custom crisp white O mark (`/favicon.svg`)

---

## License & Credits

See [oikia-website/ASSETS.md](file:///c:/Users/DELL/Documents/OIKIA/oikia-website/ASSETS.md) and [oikia-website/licences/](file:///c:/Users/DELL/Documents/OIKIA/oikia-website/licences/) for asset attributions and font licenses.
