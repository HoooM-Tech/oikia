# OIKIA — website design concept

An original, responsive, buildless homepage concept based on the supplied OIKIA discovery answers, CRD and approved logo direction. Sowt, PodVision and the supplied screenshots informed the visual approach.

## Scope of this version

- Five pages: Home, About, Services & Work, POD Creators Africa, and Blog.
- Persistent discovery-call buttons in the fixed header and open menu, repeated on Home and Services & Work.
- Services, Selected work, Book a Discovery Call and Send an Enquiry are anchors within Services & Work. No separate Contact or case-study pages.
- Blog articles open within the Blog page; the supplied editorial previews are explicitly labelled as draft sample copy.
- The footer keeps its original oversized wordmark, with links to the five pages, sample contact details, and sample privacy, terms and cookie notices.
- Pointer-responsive media cards, a muted video loop, scroll-revealed text, a moving brand ribbon and service artwork that changes with the accordion.
- Keyboard-accessible full-screen media stories and PodCreators Africa details.
- Reduced-motion support and a persistent motion toggle.
- A browser-only enquiry preview and a booking placeholder. No information is transmitted.

No client work, client logos, metrics, testimonials, programme dates, prices or promises have been invented. All imagery is illustrative. Media Strategy is presented as a future direction because the discovery answers say it has not yet launched.

## Content and integration still required

Final service scope, company history, approved project evidence, POD Creators Africa details, public contact mailbox, booking link, Substack links, legal copy and final brand font files.

## Assets

- Final V2 wordmark and standalone O: vector paths extracted from Logo 2 direction V2.pdf, including the revised left-shifted inner counter. Dark, white and lime SVG variants are provided.
- filmmaker.webp, behind-the-scenes.webp, culture.webp: illustrative images extracted from that supplied identity direction.
- portrait.jpg: ade / Unsplash, https://unsplash.com/photos/B0q7eBuXKjA .
- conversation.mp4 and poster: Alexander Suhorucov / Pexels, https://www.pexels.com/video/video-of-a-woman-talking-6534937/ .
- DM Sans and Instrument Serif: Google Fonts, served locally.

## Deployment

Static document root: dist/. No runtime dependencies. Run python scripts/build_pages.py after editing the shared templates or page content in src/.

The homepage hero includes a faint, decorative OIKIA wordmark. The Media Strategy artwork switches its text to white against the blue background.

## Final brand update — 19 November 2026

All pages and the handoff use the final V2 identity. The shared palette is defined in dist/assets/brand.css, with source values in brand-palette.json. The swatch grid supplies the extended palette; the blue icon example supplies the primary application blue. The approved PDF is available at dist/assets/brand-direction-v2.pdf.

The optional scripts/sync_brand.py exports logo paths and colour values from the final PDF (requires PyMuPDF); no extra dependency is needed to run the website.
