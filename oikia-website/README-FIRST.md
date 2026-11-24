# OIKIA — developer handoff

Updated 19 November 2026 — final client-approved V2 identity.

Live concept: https://oikia-stories-in-motion.laceyparrot2.chatgpt.site

This is a working website concept built in HTML, CSS and JavaScript. Figma is not required to inspect, reuse or continue the implementation. The ZIP contains the five-page website, shared page templates, SVG logo assets, fonts, photographs, video and animation code.

## Start here

1. Extract OIKIA-Developer-Handoff.zip.
2. Open a terminal inside the oikia-website folder.
3. Serve the ready-to-run website:

~~~sh
python3 -m http.server 3000 --bind 127.0.0.1 --directory dist
~~~

4. Open http://127.0.0.1:3000/ in your browser.

Use an installed Python 3 interpreter; on Windows, py or python may be the command name. Another static web server is also suitable. Serve dist/ as the website root so the root-relative asset URLs and page routes resolve correctly.

There are no npm packages or application-server dependencies needed to run this version.

## Page map

| Page | Route |
| --- | --- |
| Home | / |
| About | /about/ |
| Services & Work | /services-work/ |
| POD Creators Africa | /pod-creators-africa/ |
| Blog | /blog/ |

Services & Work contains the anchors #services, #selected-work, #book-discovery-call and #send-enquiry. Case-study summaries belong on this page. There is no separate Contact page.

Blog article previews open within the Blog page and use hash links. They do not create additional article pages.

## Where to edit

| File or folder | Purpose |
| --- | --- |
| dist/ | Website files ready for a static host |
| dist/style.css | Original layout, colours, typography and motion |
| dist/pages.css | Five-page layout additions, fixed navigation, footer content layout and requested refinements |
| dist/app.js | Media stories, motion controls, menus, service artwork, forms, footer previews and Blog reader |
| dist/assets/ | Final V2 SVG marks, brand PDF, photographs, video and fonts |
| dist/assets/brand.css | Shared approved colour tokens |
| dist/assets/brand-palette.json | Recorded PDF colour values |
| BRAND.md | Final brand reference and SVG variant inventory |
| src/home.html and other page templates | Main content for each of the five pages |
| src/header.html | Shared five-page navigation and discovery-call button |
| src/footer.html | Shared oversized-wordmark footer and footer content |
| src/dialogs.html | Shared story, booking/enquiry and sample-information dialogs |
| scripts/build_pages.py | Generates the five HTML pages from the shared templates |

After editing the HTML templates:

~~~sh
python3 scripts/build_pages.py
~~~

Then refresh the local website. CSS, JavaScript and media are edited directly in dist/. All files needed for static hosting are already included.

## Visual direction to preserve

- Expressive editorial typography, generous spacing and media-led interaction.
- The final V2 OIKIA wordmark, including the revised left-shifted O counter.
- The standalone O extracted from that wordmark, used for the favicon and decorative brand marks.
- The large, faint OIKIA wordmark behind the homepage hero.
- The oversized footer wordmark and the existing footer visual style.
- White text for the blue Media Strategy artwork.
- Five main navigation items, with Book a Discovery Call as a separate persistent button in the fixed header and open menu. Repeat the booking action on Home and Services & Work.

## Current design tokens

The final V2 PDF supplies the colours below. Its icon application blue and extended palette-grid blue are recorded separately. All pages share dist/assets/brand.css; BRAND.md records the brand assets and values.

| Colour | Hex |
| --- | --- |
| Cream / page background | #f4f0e8 |
| Black / text | #101010 |
| Logo ink | #100c15 |
| Stone | #d8cfc0 |
| Lime | #d7f205 |
| Charcoal | #3b3b3b |
| Primary blue / icon application | #2f5bff |
| Electric blue / palette grid | #345bff |
| Orange | #f27a42 |
| Sage | #a8b79b |
| Soft yellow | #f1e79b |

| Type / motion | Value |
| --- | --- |
| Primary typeface | DM Sans |
| Editorial typeface | Instrument Serif |
| Main motion easing | cubic-bezier(.2,.7,.2,1) |

Layouts adapt at several widths. The open navigation menu appears at 1200px and below; the main mobile layout changes at 760px, with additional refinements at 370px. The original layout also includes intermediate and large-screen adjustments.

## Interaction reference

| Interaction | Behaviour to retain |
| --- | --- |
| Hero media stack | Cards respond gently to pointer movement and spread as the page scrolls; taps/clicks open stories |
| Hero video | Muted loop, with a poster if playback is unavailable; pauses when offscreen, hidden or behind a dialog |
| Story viewer | Image/video and text, previous/next controls, keyboard navigation, close control and video play/pause |
| Reading headline | Words reveal as the visitor scrolls |
| Brand ribbon | Continuous moving text, pausing on hover or when motion is paused |
| Service accordion | Open item changes artwork, background and headline; blue artwork uses white type |
| Blog | Category filters and an article reader within the Blog page, with back navigation |
| Motion preference | Honour prefers-reduced-motion and retain the visible motion control |
| Navigation | Keep the booking button visible in the fixed header and open menu |

Most motion values are defined directly in CSS or the Web Animations calls in app.js. Use the working implementation as the interaction reference.

## What is complete in the concept

- Five page layouts and their navigation.
- Shared header, footer, logo assets and responsive CSS.
- Media interactions, service artwork, Blog reading behaviour and reduced-motion handling.
- Enquiry preview UI and a discovery-call placeholder.
- Sample contact links and sample legal-copy dialogs.

## Work to complete before launch

1. Confirm final service deliverables and which services are currently available. Media Strategy is marked as a next chapter because the discovery answers describe it as not yet launched.
2. Replace the selected-work placeholder with approved case-study summaries and cleared project images. Do not invent client names, results or testimonials.
3. Obtain the founder story, team content and final About copy from the client.
4. Confirm POD Creators Africa programme details, eligibility, dates and the intended next action.
5. Connect the approved third-party scheduling tool, calendar link, availability rules and confirmation flow. The current Book a Discovery Call action opens a preview, not a working calendar.
6. Connect the enquiry form to an approved receiving mailbox/backend. Define validation, spam handling, privacy wording and success/error states. The current form only shows a browser-side preview; it does not send or store enquiries.
7. Add the real Substack address and article links. Replace the clearly labelled draft articles with approved published content and connect subscriptions through Substack.
8. Replace hello@oikia.example, @oikia.sample, the sample LinkedIn wording and The OIKIA Letter description with confirmed public contact details.
9. Replace sample privacy, terms and cookie text with the client-approved versions.
10. Confirm final brand font specifications and permissions/licences for imagery. The supplied V2 logo and colour palette are implemented.
11. Configure the chosen hosting/domain and any agreed analytics. Preserve the page routes when deploying.
12. Test the rendered layouts and complete connected flows on real browsers and mobile devices.

## Verification status

This source contains the five-page concept with the final client-approved V2 wordmark, revised O and palette, updated 19 November 2026. The shared navigation, footer style and media interactions are retained.

Navigation, local asset paths, in-page anchors, dialog labels, CSS parsing and JavaScript syntax were checked. DOM smoke checks covered page initialization, booking-tab selection, menu behaviour, sample footer dialogs, service artwork state, inline enquiry preview and the Blog reader.

Visual browser QA and live booking, enquiry and Substack integration tests remain outstanding.

## Access and assets

The hosted concept uses restricted sharing. Existing authorized reviewers retain access; new recipients need their own viewer invitation. The ZIP can be inspected and run locally without access to the hosted preview.

Asset sources and font licences are recorded in ASSETS.md and licences/. The final brand PDF is included at dist/assets/brand-direction-v2.pdf. The earlier discovery and CRD documents can be requested separately.
