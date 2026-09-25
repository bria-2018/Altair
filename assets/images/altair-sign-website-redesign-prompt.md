# Altair Sign & Light — Website Redesign Prompt
*Use this with Claude.ai to generate the first HTML build, then hand the output to Antigravity to continue development.*

---

## 1. Project Context (for the AI to understand the business)

You are redesigning the website for **Altair Sign & Light**, a commercial sign company based in Smyrna, GA, serving Metro Atlanta for over 20 years.

**What they do:** Design, manufacture, permit, install, and service commercial signage and lighting — channel letters, monument signs, pole signs, awnings, digital LED displays, building/wall signs, tenant signage, high-rise installs, plus vehicle wraps and interior wayfinding.

**Who they serve:** Property owners, retailers, restaurant groups, schools, gyms, hotels, shopping centers, and multi-location brands — i.e., end businesses that need signage on their own buildings. (Not other sign shops — that's a wholesale fabrication business, a different model.)

**Key differentiators to foreground:**
- Marquee, verifiable work: **Mercedes-Benz Stadium, Truist Park, and State Farm Arena** — this is a major trust signal competitors don't have. Treat it as a hero-level asset, not a buried case study.
- Everything in-house: design → in-house fabrication → **in-house permit expediter** → owned crane/service trucks → install → warrantied service. One point of contact, no vendor hand-offs.
- 20+ years, acquired their production partner (ASAP Signs) in 2014 for expanded fabrication capacity.
- Warranty on both labor and materials.

**Brand constraints:**
- Keep the current logo.
- Open to refreshing/expanding the color palette beyond the current site (the current site uses a fairly flat, generic template blue — you have room to make this bolder and more distinctive while staying compatible with the existing logo).
- No final photography yet — build with clearly-marked placeholder image/video blocks (labeled by content, e.g. "[Placeholder: Mercedes-Benz Stadium channel letters, night shot]") so real assets can be dropped in later without restructuring layout.

**What NOT to copy:** A competitor/family site (Atlas Wholesale Signs, a *wholesale fabrication-to-sign-shops* business, unrelated audience) recently relaunched using a generic template look — rounded icon-cards, a stock video hero, and safe SaaS-style layout blocks. Altair's site must **not** read as the same template with different words. Avoid: generic 3-icon "why choose us" cards with no personality, boilerplate rounded-corner-everything styling, and stock corporate photography clichés (handshakes, hard-hat groups staring at blueprints).

---

## 2. Visual Direction

**Overall style: Premium/architectural base, energized with a bold accent color.**

- **Foundation:** Light backgrounds, generous whitespace, an editorial grid, confident large-scale typography for headlines — the site should feel like it belongs to a company that does stadium-scale work, not a template.
- **Energy layer:** One saturated, high-contrast accent color (derived from/complementary to the current logo) used deliberately and sparingly — CTA buttons, key numbers/stats, section dividers, hover states, small accent shapes. It should feel punchy against the light backgrounds, not diluted across every element.
- **Typography:** A confident, slightly architectural/industrial-feeling display typeface for headlines (something with real presence — think condensed or geometric sans with weight), paired with a clean, highly legible body sans. Avoid default system-font look.
- **Imagery treatment:** Full-bleed, large-format photography (signs at night with illumination, wide building shots, close-up fabrication detail) rather than small boxed thumbnails. Duotone or subtle brand-color overlay accents on placeholder blocks are fine to signal "photography goes here, treated on-brand."
- **Motion:** Restrained — subtle fade/slide-in on scroll, smooth hover states, no busy sliders or looping carousels with placeholder text (the current site has multiple slides that literally say "Slide title / Write your caption here" — this exact failure mode must not happen).
- **Iconography:** If icons are used, use a custom-feeling line-icon set consistent in weight — not generic Bootstrap-style icon packs.
- **Layout:** Full-width sections edge-to-edge, with an inner max-width content container (~1280–1440px) for readability. Break the grid occasionally (asymmetric image/text splits, offset stat callouts) so it doesn't feel like uniform stacked rows of cards.

---

## 3. Site Architecture

Keep the information architecture simpler and more scannable than the current mega-menu (which currently has 5+ nested dropdown levels). Consolidate into a flatter, clearer structure:

```
Home
Services
  ├─ Design & Manufacturing
  ├─ Installation
  ├─ Repair & Maintenance
  ├─ Lighting & LED Retrofit
  └─ Property Management Programs
Products
  ├─ Outdoor Signs (channel letters, monument, pole, awning, digital LED, tenant, high-rise)
  └─ Indoor Signs (lobby, wayfinding, window/vinyl graphics)
Industries We Serve
  (Retail · Restaurant · Schools · Property Management · Multi-Location Brands)
Portfolio (incl. Featured Projects: Mercedes-Benz Stadium, Truist Park, State Farm Arena)
About
Contact / Get a Free Quote
```

For the first HTML build, focus on a fully designed **Homepage**, and one representative **interior template page** (e.g., a Services or Product detail page) that establishes the reusable pattern for all other interior pages. Note in the prompt to Claude.ai that remaining pages will follow this template.

---

## 4. Homepage — Section by Section

1. **Hero**
   Full-viewport-height, full-width. Large bold headline (not generic — something that leads with credibility, e.g. referencing 20+ years and stadium-scale work), one-sentence subhead, two CTAs ("Request a Free Quote" primary / "Call [phone]" secondary). Placeholder for a striking night shot of an illuminated sign. No slider — one strong static (or single subtle video loop) hero, not five looping "slide title" placeholders.

2. **Trust bar**
   A tight horizontal strip immediately below the hero: "20+ Years in Metro Atlanta," "In-House Permit Expediting," "Licensed Techs & Owned Equipment," "Labor + Materials Warranty" — small icons, high scannability, sets credibility before anything else.

3. **Featured Work (Stadium Projects)**
   This should be a visually prominent, distinct section — large-format image placeholders for Mercedes-Benz Stadium / Truist Park / State Farm Arena with short captions, linking to full case studies. Treat this as the emotional/credibility peak of the homepage, not a small strip near the bottom like the current site.

4. **What We Do (Services overview)**
   Design & Manufacturing / Installation / Repair & Maintenance / Lighting — as a clean, asymmetric layout (not 4 identical icon cards), each with a short benefit-driven sentence and a link.

5. **Why Businesses Choose Altair**
   Turn the current bullet list into a more visual, scannable stat/benefit section (e.g., large number "20+" years, "100%" in-house, etc., paired with short supporting copy) rather than a plain bulleted list.

6. **Industries We Serve**
   Retail, Restaurant, Schools, Property Management/Multi-location — short cards with placeholder imagery specific to each vertical.

7. **Process / How It Works** *(new — not on current site, recommended addition)*
   A simple 4-step visual: Consult → Design & Permit → Fabricate & Install → Warranty & Service. This directly showcases the "one point of contact, no vendor hand-offs" differentiator in a skimmable format.

8. **About / Local credibility**
   Short version of the About story (Smyrna-based, 20+ years, ASAP Signs acquisition, values) with a placeholder team/facility photo, linking to a full About page.

9. **Testimonials** *(current site has none surfaced on homepage — recommended addition)*
   If real testimonials/reviews aren't available yet, mark as placeholder — structurally build the section so Google Reviews or client quotes can be dropped in later.

10. **Service Area**
    Brief map/text section: Atlanta, Smyrna, Greater Atlanta Area.

11. **Final CTA**
    Full-width, high-contrast (accent color) band: "Get Your Custom Sign Project Started Today" with quote form + phone number, before the footer.

12. **Footer**
    Simplified vs. the current footer's giant flat link-dump of every service/product/industry (which currently reads as an SEO keyword dump). Keep it to logical grouped columns: Company / Services / Products / Contact, plus social icons, address, license info if applicable.

---

## 5. Interior Page Template (apply to Services, Products, Portfolio, etc.)

- Page hero: shorter than homepage hero, full-width, headline + one-line description + breadcrumb.
- Body: alternating full-width image/text sections rather than dense paragraph blocks. Use pull-quotes or stat callouts for key claims (e.g. warranty, permitting).
- Related links / cross-sell to adjacent services or products at the bottom.
- Consistent final CTA band (same component as homepage) on every page.

**Portfolio page specifically:** filterable grid (by sign type or industry — similar interaction pattern to what's expected of a modern portfolio, but styled in Altair's own visual language, not copied from any reference site), with the three stadium projects pinned/featured at the top regardless of filter.

---

## 6. Mobile-First Requirements

Design and build mobile layouts first, then scale up — not the other way around.

- **Navigation:** Collapsed hamburger menu with a full-screen or slide-in overlay; flatten the current multi-level dropdown into an accordion-style expandable list. Sticky header with a persistent tap-to-call button on mobile.
- **Touch targets:** Minimum 44×44px for all buttons/links.
- **Hero on mobile:** Headline and CTA must be fully visible without scrolling past a small hero image; avoid tiny centered text over a busy background image (a common failure mode on the current site).
- **Forms:** Single-column, large inputs, native input types (`tel`, `email`), a visible tap-to-call alternative right next to the quote form.
- **Images:** Responsive `srcset`/`sizes`, lazy-loaded below the fold, no oversized desktop images shipped to mobile.
- **Performance:** No autoplay looping video on mobile by default (or a lightweight/muted version only), minimal JS for animations, avoid layout shift.
- **Tap-to-call:** Phone number tappable everywhere it appears, plus a persistent floating call/quote button on mobile scroll.

---

## 7. Key Features / Interactions to Build

- Sticky header that shrinks/condenses on scroll.
- Working, functional multi-field quote request form (name, phone, email, sign type/service needed, message) — style it as a first-class component, not an afterthought form buried at the bottom like the current site's "Quick Contact."
- Filterable portfolio grid (client-side filter by category).
- Scroll-triggered subtle fade/slide-in animations on section entry (respect `prefers-reduced-motion`).
- Click-to-call and click-to-email links using proper `tel:`/`mailto:` protocols.
- Clear, consistent CTA hierarchy: one primary action ("Request a Free Quote") repeated at logical intervals, one secondary ("Call Now") always available.
- Accessible accordion/dropdown nav (keyboard navigable, proper ARIA attributes).

---

## 8. Content & Copywriting Guidance

- Tone: confident, plain-spoken, expert — not generic marketing fluff. The current site's actual body copy (about permitting, warranty, in-house fabrication) is genuinely good and specific — preserve and reuse that substance, just re-cut it into shorter, punchier blocks that fit the new visual rhythm rather than long paragraphs.
- Every section needs real, specific headline copy — never leave placeholder text like "Slide title / Write your caption here" in the delivered HTML.
- Lead with outcomes/proof (stadium work, 20+ years, warranty) before process detail.
- Keep CTAs specific: "Request a Free Quote," "See the Stadium Work," "Talk to a Sign Expert" — avoid bare "Learn More" everywhere.

---

## 9. Technical Requirements (for the HTML build)

- Clean semantic HTML5 (`header`, `nav`, `main`, `section`, `article`, `footer`), accessible landmarks and heading hierarchy (single `h1` per page).
- Mobile-first CSS (min-width media queries), CSS custom properties for the color palette and spacing scale so Antigravity can theme/extend easily.
- Self-contained, well-commented sections so it's easy to hand off section-by-section into Antigravity for componentization (e.g., React components later if desired).
- Placeholder images as clearly labeled `<div>` blocks or `<img>` with descriptive `alt` text and a visible placeholder background, not broken image links.
- Preserve strong existing SEO content (service/product keyword pages, meta description patterns) — don't lose the underlying SEO value of the current site's page structure even while simplifying the visible navigation.
- Basic on-page SEO: unique `<title>`, meta description, and `alt` text per page/section.

---

## 10. What to Ask Claude.ai to Deliver First

1. A complete, polished **homepage** HTML/CSS/JS build following all sections above.
2. One **interior template page** (recommend: a Services or Product detail page) establishing the reusable pattern.
3. A short style guide summary (colors as hex/CSS variables, type scale, spacing scale) so the look stays consistent as Antigravity builds out the remaining pages.

## 11. What to Do Next in Antigravity

- Use the delivered homepage + template page as the design system source of truth.
- Build out the remaining pages (full Services, Products, Industries, Portfolio, About, Contact) reusing the same header/footer/CTA-band/nav components.
- Wire up the quote request form to an actual backend/email service.
- Swap in real photography/video once available, respecting the placeholder dimensions and treatment already established.
- Run a mobile performance and accessibility pass (Lighthouse) before launch.
