# OIKIA — developer handoff

Prepared 16 November 2026.

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
| dist/assets/ | Local SVG logo marks, photographs, video and fonts |
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
- The approved OIKIA wordmark, including its K within the full wordmark.
- The standalone O extracted from that wordmark, used for the favicon and decorative brand marks.
- The large, faint OIKIA wordmark behind the homepage hero.
- The oversized footer wordmark and the existing footer visual style.
- White text for the blue Media Strategy artwork.
- Five main navigation items, with Book a Discovery Call as a separate persistent button in the fixed header and open menu. Repeat the booking action on Home and Services & Work.

## Current design tokens

These are the values used in this concept. Final brand specifications should take precedence when supplied.

| Token | Value |
| --- | --- |
| Paper | #f5f2e9 |
| Ink | #171715 |
| Muted text | #696961 |
| Rules/borders | #d7d4cb |
| Lime | #d8f205 |
| Blue | #345bff |
| Orange | #f47b45 |
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
10. Confirm final brand fonts, colour specifications and permissions/licences for imagery.
11. Configure the chosen hosting/domain and any agreed analytics. Preserve the page routes when deploying.
12. Test the rendered layouts and complete connected flows on real browsers and mobile devices.

## Verification status

The source corresponds to the published five-page concept, source revision 2d81b19bccc97633e10d1d640352e781719642cf.

Navigation, local asset paths, in-page anchors, dialog labels, CSS parsing and JavaScript syntax were checked. DOM smoke checks covered page initialization, booking-tab selection, menu behaviour, sample footer dialogs, service artwork state, inline enquiry preview and the Blog reader.

Visual browser QA and live booking, enquiry and Substack integration tests remain outstanding.

## Access and assets

The live concept was owner-private when this package was prepared. The owner will need to grant developer access through the site's sharing controls if the live link is used. The ZIP can be inspected and run locally without access to that hosted preview.

Asset sources and font licences are recorded in ASSETS.md and licences/. The client-supplied PDFs are not included in this export; request those separately if needed for context.
