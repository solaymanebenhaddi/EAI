# EAI Website — Full Audit & Master Rebuild Prompt
**ELAOUD Architecture et Ingénierie — eai-construction.com**
*Prepared for: Solaymane | Stack: Next.js 14 + Tailwind + Framer Motion*

---

## PART 1 — DIAGNOSTIC: WHAT IS WRONG WITH THE CURRENT BUILD

### 1.1 Brand Identity Failures

| Issue | Current State | Impact |
|-------|---------------|--------|
| **Color** | Flat, saturated forest green (#1d4a2a range). One-dimensional, generic, zero materiality. | Looks like a real estate template, not a premium architecture firm |
| **Typography** | Standard serif/sans mix with no editorial personality. Headlines lack scale hierarchy. | Nothing is memorable. No typographic drama |
| **Visual Weight** | Everything has the same visual weight — headings, body, labels compete equally | User eye doesn't know where to look first |
| **Spacing** | Inconsistent vertical rhythm. Sections feel squeezed or randomly padded | No architectural precision — ironic for an architecture firm |
| **Photography** | Images cropped in standard rectangles with no artistic treatment | Feels like stock image usage, not curated portfolio |

### 1.2 Layout & UX Failures

| Section | Problem |
|---------|---------|
| **Hero** | Static layout. Headline and image are side-by-side with no compositional tension. Zero kinetic energy on load |
| **"WE WILL GIVE YOU EACH NICE DAY"** | Incomprehensible copy. No message. No brand voice. Placeholder energy |
| **Services overlay ("IVE IN DETAILS")** | Partial text reveal on an image is a dark pattern — it's cut off, reads as broken |
| **Projets Signature** | 4 uniform small cards in a rigid grid. No hierarchy between featured and secondary projects |
| **Stats section** | Flat 4-column counter row on dark background. Zero context, zero drama |
| **Founder section** | Standard photo-left text-right layout. Not distinctive |
| **Testimonials** | Formatted like a generic review widget |
| **Footer/CTA** | No visual surprise. Feels like the site ran out of energy |

### 1.3 Technical Failures

- No scroll-triggered animations — page feels static and cheap
- No hover states on project cards (no reveal, no scale, no overlay)
- No custom cursor — missed opportunity for brand distinction
- Navigation has no visual anchor on scroll (no backdrop blur / sticky behavior visible)
- Mobile responsiveness not verified but grid-heavy layout will break
- No micro-interactions on CTAs
- No page transitions between routes
- Trilingual architecture likely hardcoded, not i18n-managed

---

## PART 2 — NEW BRAND IDENTITY: "MATIÈRE ET LUMIÈRE"

*The architectural philosophy made visual: raw materials meet refined light.*

### 2.1 Color System

```
/* ═══════════════════════════════════════════
   EAI — PALETTE "MATIÈRE ET LUMIÈRE"
   Inspired by: quarry stone, travertine,
   hammered brass, desert sand at dusk
═══════════════════════════════════════════ */

--eai-void:       #080806;   /* near-black warm — primary bg */
--eai-stone:      #111110;   /* dark stone — card surfaces */
--eai-travertine: #1A1916;   /* secondary surfaces */
--eai-ash:        #2C2B27;   /* subtle dividers, borders */
--eai-dust:       #4A4840;   /* muted elements */

--eai-brass:      #C4A052;   /* primary accent — hammered brass */
--eai-brass-dim:  #8A6E38;   /* brass at rest / hover base */
--eai-brass-glow: #E8C070;   /* brass highlight / hover peak */
--eai-sage:       #7A9186;   /* secondary accent — architectural sage */
--eai-sage-dim:   #4F6860;   /* sage muted */

--eai-parchment:  #F0EBE0;   /* primary text — warm white */
--eai-linen:      #C8C0B0;   /* secondary text */
--eai-mortar:     #7A7468;   /* tertiary / captions */

--eai-gold-line:  rgba(196, 160, 82, 0.15);   /* separator lines */
--eai-gold-card:  rgba(196, 160, 82, 0.06);   /* card bg hover */
```

**Rationale:** Abandons the green that reads as "eco" or "real estate". The new palette reads as **monumental, material, serious** — travertine floors, brass door handles, desert stone walls. Associates EAI with the permanence and craft of architecture itself.

### 2.2 Typography System

```
/* ═══════════════════════════════════════════
   FONT STACK
═══════════════════════════════════════════ */

/* DISPLAY — Cormorant Garamond ExtraLight Italic */
/* Use for: hero headlines, section titles */
/* Load: Google Fonts — weight 300, italic */
--font-display: 'Cormorant Garamond', Georgia, serif;
/* Sizes: 96px / 72px / 56px */
/* Weight: 300 (italic) — never bold */
/* Letter-spacing: -0.02em to -0.04em */

/* HEADING — Cormorant Garamond Medium */
/* Use for: sub-headings, card titles */
/* Weight: 500, normal */
/* Sizes: 32px / 24px / 20px */

/* LABEL — Space Grotesk */
/* Use for: nav items, small caps labels, buttons, captions */
/* Weight: 400 / 500 */
/* Sizes: 11px (all-caps, tracking 0.15em) / 14px / 16px */
--font-body: 'Space Grotesk', sans-serif;

/* EDITORIAL ACCENT — Libre Baskerville Italic */
/* Use for: pull quotes, testimonials, founder quote */
/* Weight: 400 italic */
--font-accent: 'Libre Baskerville', serif;
```

**Typographic Rules:**
- Headlines are ALWAYS in Cormorant Garamond, ExtraLight (300), Italic
- NO BOLD headlines. Weight comes from scale, not weight
- ALL CAPS labels use Space Grotesk, letter-spacing: 0.12em
- Body text: Space Grotesk 400, 16px, line-height 1.7
- Max line length: 65ch

### 2.3 Motion & Interaction System

```
/* ═══════════════════════════════════════════
   MOTION DESIGN LANGUAGE
   Philosophy: Architecture is slow, deliberate, permanent.
   Motion should feel like stone settling — no bounce, no snap.
═══════════════════════════════════════════ */

/* Easing */
--ease-arch:  cubic-bezier(0.16, 1, 0.3, 1);      /* primary — slow out */
--ease-stone: cubic-bezier(0.7, 0, 0.84, 0);       /* enter — deliberate in */
--ease-reveal: cubic-bezier(0.25, 0.46, 0.45, 0.94); /* content reveal */

/* Durations */
--dur-instant: 120ms;   /* micro-interactions */
--dur-fast:    280ms;   /* hover states */
--dur-normal:  500ms;   /* page elements */
--dur-slow:    900ms;   /* section reveals */
--dur-cinematic: 1400ms; /* hero entrance */
```

**Motion Rules:**
- Hero: staggered text reveal (each word slides up from below, 80ms delay between)
- Sections: clip-path reveal from bottom (height: 0 → 100%) on scroll intersection
- Project cards: image scale 1.0 → 1.04 on hover, 400ms ease
- CTAs: brass underline slides in from left on hover
- Image hover: subtle grain overlay intensifies
- Custom cursor: 40px circle, brass color, scale 2x on links
- Page transitions: cross-fade + slight upward translation

---

## PART 3 — SITE ARCHITECTURE & SECTIONS

### Section Map

```
/ (Homepage)
├── [NAV]           Floating, backdrop-blur on scroll
├── [HERO]          Full-viewport, kinetic type + editorial photo split
├── [MANIFESTO]     Single large statement, large counter strip
├── [SERVICES]      3 services, full-bleed editorial layout
├── [PROJETS]       Featured project (large) + 3 secondary + "Voir tout"
├── [APROPOS]       Founder section, editorial layout
├── [EVENTS]        FIDI 2026 feature + stats
├── [TESTIMONIALS]  3 testimonials, editorial carousel
├── [CTA]           Bold collaboration initiation section
└── [FOOTER]        Clean, trilingual links

/projets            Portfolio page
/expertises         Services detail
/a-propos           Founder + team
/contact            Contact form
```

---

## PART 4 — MASTER REBUILD PROMPT

Copy-paste this prompt to your AI coding agent (Antigravity, v0, Cursor, etc.):

---

```
You are rebuilding the website for ELAOUAD Architecture et Ingénierie (EAI), a premium Moroccan architecture and engineering firm based in Casablanca, founded by architect Soukaina ELAOUAD.

STACK: Next.js 14 (App Router), TypeScript, Tailwind CSS v3, Framer Motion v11, next/font (Google Fonts). No CSS modules. Tailwind extends, not replaces, the design system below.

TRILINGUAL: Full FR / AR / EN support using next-intl. All strings in /messages/{fr,ar,en}.json. Arabic uses dir="rtl" on <html>. Navigation switches locale without full reload.

═══════════════════════════════════════════════════════════════
A. DESIGN SYSTEM — IMPLEMENT FIRST IN tailwind.config.ts
═══════════════════════════════════════════════════════════════

COLORS (extend theme.colors):
  void:       '#080806'
  stone:      '#111110'
  travertine: '#1A1916'
  ash:        '#2C2B27'
  dust:       '#4A4840'
  brass:      '#C4A052'
  brass-dim:  '#8A6E38'
  brass-glow: '#E8C070'
  sage:       '#7A9186'
  parchment:  '#F0EBE0'
  linen:      '#C8C0B0'
  mortar:     '#7A7468'

FONTS (next/font/google):
  display: Cormorant_Garamond, weights: [300], style: italic, variable: --font-display
  body:    Space_Grotesk, weights: [300, 400, 500], variable: --font-body
  accent:  Libre_Baskerville, weights: [400], style: italic, variable: --font-accent

Apply fonts: html = font-body. .font-display = font-display.

EXTEND theme.fontSize:
  'display-xl': ['clamp(64px, 8vw, 120px)', { lineHeight: '0.92', letterSpacing: '-0.03em' }]
  'display-lg': ['clamp(48px, 6vw, 80px)',  { lineHeight: '0.94', letterSpacing: '-0.025em' }]
  'display-md': ['clamp(32px, 4vw, 56px)',  { lineHeight: '1.0',  letterSpacing: '-0.02em' }]
  'label':      ['11px', { lineHeight: '1', letterSpacing: '0.12em' }]

EXTEND theme.animation:
  'reveal-up': 'revealUp 0.9s cubic-bezier(0.16,1,0.3,1) forwards'
  'reveal-clip': 'revealClip 1.0s cubic-bezier(0.16,1,0.3,1) forwards'

EXTEND theme.keyframes:
  revealUp: { from: { opacity: 0, transform: 'translateY(40px)' }, to: { opacity: 1, transform: 'translateY(0)' } }
  revealClip: { from: { clipPath: 'inset(0 0 100% 0)' }, to: { clipPath: 'inset(0 0 0% 0)' } }

═══════════════════════════════════════════════════════════════
B. GLOBAL LAYOUT — app/layout.tsx
═══════════════════════════════════════════════════════════════

- bg-void text-parchment min-h-screen
- Custom cursor: 40px circle div, position fixed, pointer-events-none, z-[9999], bg-brass/30, border border-brass, rounded-full, transition-transform 150ms. Scale to 2.5 on [data-cursor="link"]. Update position via mousemove. Hide on touch devices.
- Grain overlay: fixed inset-0 pointer-events-none z-10, bg-[url('/noise.png')] opacity-[0.035]
- Smooth scroll: html { scroll-behavior: smooth }
- Page transitions: AnimatePresence with exit { opacity: 0, y: -10 } duration 300ms

═══════════════════════════════════════════════════════════════
C. NAVIGATION — components/Nav.tsx
═══════════════════════════════════════════════════════════════

STRUCTURE:
  - Fixed top-0, full width, z-50
  - Default: bg-transparent
  - After 80px scroll: bg-void/90 backdrop-blur-md border-b border-gold-line transition-all 600ms
  - Layout: logo left | links center | CTA right (3-column grid)

LOGO: "ELAOUAD" in font-display text-[22px] tracking-[0.08em] text-parchment. 
Below it: "Architecture & Ingénierie" in font-body text-[9px] tracking-[0.15em] uppercase text-mortar

NAV LINKS: font-body text-label uppercase tracking-[0.12em] text-linen
  - Hover: text-parchment with brass underline (::after width 0→100%, 280ms ease)
  - Active route: text-brass

NAV ITEMS (FR): Maison | Expertises | Projets | À Propos | Contact

CTA BUTTON: "Démarrer un projet" 
  - Style: border border-brass text-brass px-5 py-2 text-label uppercase tracking-[0.1em]
  - Hover: bg-brass text-void transition-all 280ms

MOBILE: Hamburger → full-screen overlay, bg-void, staggered link reveal

═══════════════════════════════════════════════════════════════
D. HERO SECTION — components/sections/Hero.tsx
═══════════════════════════════════════════════════════════════

LAYOUT: Full viewport height. Two-column asymmetric grid: 55% left | 45% right.

LEFT COLUMN:
  Top: Small label — "[ Architecture & Ingénierie — Casablanca ]" in text-label text-mortar uppercase tracking-widest
  
  Headline (STAGGERED REVEAL — each line animates independently, 120ms delay between):
    Line 1: "L'Architecture" — font-display text-display-xl text-parchment
    Line 2: "comme acte" — font-display text-display-xl text-parchment italic (already italic but add visual distinction)
    Line 3: "de vision." — font-display text-display-xl text-brass
  
  Body: 2-line description, font-body text-[16px] text-linen max-w-[420px] mt-8 mb-10
    Text: "Fondée par Soukaina Elaouad, EAI conçoit des architectures qui défient l'ordinaire — de la vision initiale à la livraison finale, avec la même exigence absolue."
  
  CTAs: Two buttons side by side:
    Primary: "Découvrir nos projets" — bg-brass text-void px-8 py-4 text-label uppercase tracking-widest hover:bg-brass-glow
    Ghost: "Notre démarche →" — text-parchment border-b border-mortar pb-1 text-label uppercase tracking-widest hover:border-brass hover:text-brass

  Bottom left: Scroll indicator — thin vertical line (60px) + "Défiler" rotated 90deg, text-mortar text-label

RIGHT COLUMN:
  - Large editorial photo, 85vh height, object-cover
  - Photo has: overflow-hidden. On load: clip-path reveal from bottom (revealClip 1.2s)
  - Overlay: absolute inset-0 bg-gradient-to-t from-void/40 to-transparent
  - Bottom of photo: floating pill "500+ projets livrés" — bg-stone/80 backdrop-blur-sm border border-ash rounded-none px-4 py-2 text-label text-linen

BACKGROUND: absolute behind everything — thin vertical gold lines at x=33% and x=66%, opacity-[0.04], spanning full height

═══════════════════════════════════════════════════════════════
E. MANIFESTO SECTION — components/sections/Manifesto.tsx
═══════════════════════════════════════════════════════════════

LAYOUT: Full-width, py-32, bg-stone

CONTENT:
  Label (top): "[ Notre Philosophie ]" — text-label text-brass uppercase tracking-widest
  
  Large statement — center-aligned, max-w-[900px] mx-auto:
    "Nous ne construisons pas des bâtiments."
    "Nous gravons des intentions dans la pierre."
  Font: font-display text-display-lg text-parchment
  Second line: text-brass
  
  Separator: thin horizontal brass line 120px, mx-auto my-12 opacity-40
  
  STATS ROW (4 counters, animated on scroll entry with CountUp):
    [ 500+ ]  Projets livrés
    [ 15+ ]   Années d'expertise
    [ 12 ]    Pays d'intervention
    [ 60+ ]   Collaborateurs
  
  Style per stat:
    Number: font-display text-[72px] text-brass leading-none
    Label: font-body text-label text-mortar uppercase tracking-widest mt-2

═══════════════════════════════════════════════════════════════
F. SERVICES SECTION — components/sections/Services.tsx
═══════════════════════════════════════════════════════════════

LAYOUT: Full-width, alternating editorial layout (not cards)

LABEL: "[ Nos Expertises ]" — text-label text-brass uppercase

Section headline: "Trois disciplines, une signature." — font-display text-display-md text-parchment

SERVICE 1 — Architecture:
  Layout: 60% image left | 40% content right
  Image: full-bleed, 70vh, object-cover, slight parallax on scroll (useScroll + useTransform y -60 to 60)
  Overlay on image: bottom-left corner — brass "01" text-[120px] font-display opacity-10
  Content: Number "01" text-label text-brass | Title "Architecture" text-display-md font-display | 
           Description 3 lines | "Explorer →" link text-label text-brass with hover underline

SERVICE 2 — BIM Consulting:
  Layout: 40% content left | 60% image right (REVERSED)
  Same treatment, number "02", accent color still brass

SERVICE 3 — Design Intérieur:
  Layout: same as Service 1, number "03"

Between services: 1px horizontal line, color ash, opacity-60

═══════════════════════════════════════════════════════════════
G. PROJETS SIGNATURE — components/sections/Projets.tsx
═══════════════════════════════════════════════════════════════

LABEL: "[ Portfolio ]" — text-label text-brass uppercase
Headline: "Projets Signature" — font-display text-display-md text-parchment

FEATURED PROJECT (top, full-width):
  - Large image 80vh, full-width, object-cover, overflow-hidden
  - Hover: image scale 1.03, 600ms ease
  - Bottom overlay bar (always visible): 
    bg-gradient-to-t from-void/90 to-transparent
    Content: Left = project name font-display text-[36px] text-parchment | Right = category text-label text-mortar + arrow
  - Clicking navigates to project detail

SECONDARY PROJECTS (3 columns below):
  Each card:
    - Image 55vh object-cover overflow-hidden
    - On hover: image scale 1.05, overlay bg-void/30 appears, brass "→" slides up from bottom
    - Below image: project name font-body text-[18px] text-parchment | category text-label text-mortar | location text-label text-mortar

CTA: "Voir tous les projets →" centered, text-label text-brass border-b border-brass pb-1 uppercase tracking-widest

PROJECTS DATA (hardcoded initially, CMS-ready):
  - Résidence Palmier | Architecture Résidentielle | Casablanca
  - Siège Corporate Alpha | Architecture Tertiaire | Casablanca
  - Éco-Quartier Zénith | Urbanisme | Rabat
  - Villa Californie | Design Intérieur | Casablanca

═══════════════════════════════════════════════════════════════
H. APROPOS / FOUNDER — components/sections/Apropos.tsx
═══════════════════════════════════════════════════════════════

LAYOUT: Two-column. 45% content left | 55% image right.

LEFT:
  Label: "[ Derrière la Transformation ]" text-label text-brass uppercase
  Headline: "Soukaina Elaouad" — font-display text-display-md text-parchment
  Sub: "Architecte fondatrice, DG" — text-label text-mortar uppercase tracking-widest mt-2 mb-8
  
  Quote (pull quote style):
    Left brass border 2px | pl-6
    Font: font-accent (Libre Baskerville italic) text-[20px] text-linen leading-relaxed
    Text: "L'architecture est à la fois un acte artistique et une responsabilité technique. Chaque projet que nous livrons doit être beau, solide, durable et utile."
  
  Bio text: font-body text-[15px] text-mortar leading-relaxed mt-8 max-w-[480px]
  
  Credentials: 3 items, each with brass dot prefix
    • Architecte DPLG — École Nationale Supérieure d'Architecture
    • Fondatrice d'EAI depuis 2009
    • Membre de l'Ordre National des Architectes du Maroc

RIGHT:
  Image: 80vh, object-cover object-top
  Bottom-right corner: thin brass square decorative frame (SVG, 80x80px, position absolute)

═══════════════════════════════════════════════════════════════
I. EVENTS SECTION — components/sections/Events.tsx
═══════════════════════════════════════════════════════════════

LAYOUT: Full-width bg-travertine py-24

LABEL: "[ Événements ]" text-label text-brass uppercase

FEATURED EVENT CARD (FIDI 2026):
  - Full-width, height 65vh, relative overflow-hidden
  - Background: dark editorial image of event/architecture forum
  - Center content (absolute centered):
    Eyebrow: "FORUM INTERNATIONAL DE LA DÉCORATION INTÉRIEURE" text-label text-brass/80 uppercase tracking-widest
    Date: "3 — 5 Décembre 2026" font-display text-[48px] text-parchment
    Location: "Casablanca, Maroc" text-label text-linen uppercase tracking-widest
    CTA: "En savoir plus →" — brass bordered button
  - Bottom scrim: bg-gradient-to-t from-void to-transparent

STATS BELOW (already in manifesto, skip duplication OR make this event-specific):
  "10 000+" Visiteurs | "450+" Exposants | "100+" Conférences | "60+" Nationalités

═══════════════════════════════════════════════════════════════
J. TESTIMONIALS — components/sections/Testimonials.tsx
═══════════════════════════════════════════════════════════════

LAYOUT: Full-width, py-32, bg-stone

LABEL: "[ L'Excellence Prouvée ]" text-label text-brass uppercase
Headline: "Ce que disent nos clients." — font-display text-display-md text-parchment

TESTIMONIALS: 3, displayed as horizontal cards, no carousel (static on desktop, swipeable on mobile)

Per testimonial card:
  - bg-travertine border border-ash p-10
  - Stars: 5 brass stars (★★★★★) text-[14px]
  - Quote: font-accent italic text-[17px] text-linen leading-relaxed mt-4
  - Separator: 1px line, color ash, my-6
  - Name: font-body text-[15px] text-parchment font-medium
  - Title: text-label text-mortar uppercase

TESTIMONIAL DATA:
  "EAI a su transformer notre vision en espace de vie exceptionnel. Leur rigueur technique et leur sens de l'esthétique sont incomparables."
  — Karim N., Directeur Général | Résidence Palmier

  "Un cabinet qui pense comme des architectes mais qui livre comme des ingénieurs. La précision de leur BIM consulting nous a économisé des mois de travail."
  — Sarah M., Directrice de Projet | Siège Corporate Alpha

  "La qualité du suivi chantier et la précision des détails nous a bluffés. EAI ne fait pas de compromis."
  — Omar T., Promoteur Immobilier | Éco-Quartier Zénith

═══════════════════════════════════════════════════════════════
K. CTA SECTION — components/sections/CallToAction.tsx
═══════════════════════════════════════════════════════════════

LAYOUT: Full-width, min-h-[60vh], bg-void, flex items-center justify-center

Large centered content:
  Eyebrow: "[ Initier une Collaboration ]" text-label text-mortar uppercase tracking-widest
  Headline: "Votre projet mérite" — font-display text-display-xl text-parchment
             "l'excellence." — font-display text-display-xl text-brass italic
  
  Two CTAs:
    Primary: "Contactez-nous" — large, bg-brass text-void px-12 py-5 text-[15px] font-medium uppercase tracking-widest hover:bg-brass-glow
    Secondary: "Voir notre démarche" — text-linen border-b border-mortar hover:border-brass hover:text-brass pb-1 text-label uppercase

  Background: subtle — 4 thin vertical gold lines (SVG, opacity 0.03), full height

═══════════════════════════════════════════════════════════════
L. FOOTER — components/Footer.tsx
═══════════════════════════════════════════════════════════════

LAYOUT: bg-stone border-t border-ash py-16

ROW 1 (top): Logo left + Tagline right
  Logo: "ELAOUAD" font-display text-[28px] text-parchment
  Tagline: "Précision. Ambition. Vision." font-body text-label text-mortar uppercase tracking-widest

ROW 2 (middle): 4-column grid
  Col 1 - Navigation: Services | Projets | À Propos | Contact
  Col 2 - Expertises: Architecture | BIM Consulting | Design Intérieur | Urbanisme
  Col 3 - Contact: +212 5XX XXX XXX | contact@eai-construction.com | Casablanca, Maroc
  Col 4 - Langues: FR | العربية | EN (locale switcher)

All footer links: text-label text-mortar uppercase hover:text-brass transition 200ms

ROW 3 (bottom): 1px ash separator + "© 2025 ELAOUAD Architecture et Ingénierie. Tous droits réservés." text-label text-dust

═══════════════════════════════════════════════════════════════
M. FRAMER MOTION — SCROLL ANIMATIONS
═══════════════════════════════════════════════════════════════

Create a reusable component: components/ui/RevealOnScroll.tsx

```tsx
'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export function RevealOnScroll({ children, delay = 0, className }: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  )
}
```

Apply to: every section headline, every image, every stat counter.
Stagger children with delay={index * 0.12}

IMAGE PARALLAX:
```tsx
// In Hero + Services
const { scrollYProgress } = useScroll({ target: containerRef })
const y = useTransform(scrollYProgress, [0, 1], [0, -60])
// Apply as style={{ y }} on <motion.div> wrapping the image
```

═══════════════════════════════════════════════════════════════
N. CUSTOM CURSOR — components/ui/Cursor.tsx
═══════════════════════════════════════════════════════════════

'use client'
- Fixed 40x40 circle, border border-brass/50, rounded-full, z-[9999], pointer-events-none
- Transition: transform 150ms ease, opacity 200ms ease
- On any <a> or [data-cursor="link"]: scale(2) + bg-brass/10
- On images: scale(1.5) + inner text "Voir" in text-label text-brass
- Hide on mobile (touch detection)
- Smooth lag: use lerp (0.15 factor) for position, requestAnimationFrame loop

═══════════════════════════════════════════════════════════════
O. PROJECT DETAIL PAGE — app/[locale]/projets/[slug]/page.tsx
═══════════════════════════════════════════════════════════════

LAYOUT:
  Hero: Full-viewport image, project title bottom-left in font-display text-display-lg
  Info strip: Category | Location | Surface | Année | Statut
  Gallery: Masonry grid, 2-3 columns, gap-4
  Description: Large editorial text, max-w-[700px], centered
  Next project: Full-width teaser → links to next project slug

═══════════════════════════════════════════════════════════════
P. PERFORMANCE & SEO REQUIREMENTS
═══════════════════════════════════════════════════════════════

- All images: next/image, priority on hero, lazy on rest, sizes prop always set
- LCP target: <2.5s. Hero image: priority={true}, quality={90}
- Fonts: display: 'swap', preload: true
- generateMetadata() for every page with FR/AR/EN variants
- hreflang alternate links in <head>
- Structured data: Organization + LocalBusiness schema on homepage
- og:image per page (1200x630, generated or static)
- Sitemap: app/sitemap.ts generating all locale/slug combinations
- robots.ts: allow all, disallow /api
- Web Vitals: install @vercel/analytics

═══════════════════════════════════════════════════════════════
Q. FILE STRUCTURE
═══════════════════════════════════════════════════════════════

app/
├── [locale]/
│   ├── layout.tsx          # locale provider + font injection
│   ├── page.tsx            # homepage (assembles all sections)
│   ├── projets/
│   │   ├── page.tsx        # portfolio grid
│   │   └── [slug]/page.tsx # project detail
│   ├── expertises/page.tsx
│   ├── a-propos/page.tsx
│   └── contact/page.tsx
├── layout.tsx              # root layout, cursor, grain overlay
├── globals.css             # @tailwind + custom CSS variables + keyframes
└── sitemap.ts

components/
├── Nav.tsx
├── Footer.tsx
├── sections/
│   ├── Hero.tsx
│   ├── Manifesto.tsx
│   ├── Services.tsx
│   ├── Projets.tsx
│   ├── Apropos.tsx
│   ├── Events.tsx
│   ├── Testimonials.tsx
│   └── CallToAction.tsx
└── ui/
    ├── RevealOnScroll.tsx
    ├── Cursor.tsx
    ├── CountUp.tsx          # animated number counter
    ├── ParallaxImage.tsx    # reusable parallax wrapper
    └── LocaleSwitcher.tsx

messages/
├── fr.json
├── ar.json
└── en.json

public/
├── noise.png               # subtle grain texture, 200x200px, tileable
├── images/                 # project photos, optimized WebP
└── fonts/                  # if self-hosting

═══════════════════════════════════════════════════════════════
R. IMPLEMENTATION ORDER
═══════════════════════════════════════════════════════════════

Phase 1 — Foundation (implement first, nothing renders without this):
  1. tailwind.config.ts — full design system
  2. globals.css — CSS variables + keyframes + grain overlay
  3. root layout.tsx — fonts, cursor component shell, grain div
  4. Nav.tsx — responsive, scroll-aware
  5. Footer.tsx

Phase 2 — Homepage Sections (in visual order):
  6.  Hero.tsx
  7.  Manifesto.tsx + CountUp.tsx
  8.  Services.tsx + ParallaxImage.tsx
  9.  Projets.tsx
  10. Apropos.tsx
  11. Events.tsx
  12. Testimonials.tsx
  13. CallToAction.tsx

Phase 3 — Interactions:
  14. RevealOnScroll.tsx — apply to all sections
  15. Cursor.tsx — full implementation
  16. Page transitions (AnimatePresence in root layout)

Phase 4 — Inner Pages:
  17. /projets — grid page
  18. /projets/[slug] — detail page
  19. /expertises
  20. /a-propos
  21. /contact + form (react-hook-form + validation)

Phase 5 — i18n + SEO:
  22. next-intl setup + message files
  23. generateMetadata() for all pages
  24. sitemap.ts + robots.ts
  25. Structured data

═══════════════════════════════════════════════════════════════
FINAL INSTRUCTIONS TO THE AGENT
═══════════════════════════════════════════════════════════════

ABSOLUTE REQUIREMENTS:
  ✦ NO Bootstrap, NO MUI, NO Chakra, NO Ant Design
  ✦ Tailwind ONLY for utility classes — design tokens always via CSS variables
  ✦ NEVER use a white background anywhere — minimum: bg-travertine
  ✦ NEVER bold a display headline — weight is 300 (ExtraLight)
  ✦ NEVER use rounded corners on buttons — the brand is architectural (squared or slightly rounded max rx-sm)
  ✦ ALL text-transform: uppercase elements must use letter-spacing: 0.12em minimum
  ✦ Every section must use RevealOnScroll on entry
  ✦ Images ALWAYS use next/image — never <img>
  ✦ TypeScript strict mode — no `any`
  ✦ All content strings in messages/*.json — never hardcoded in JSX (except SEO metadata)
  ✦ Mobile-first — test at 375px, 768px, 1280px, 1920px breakpoints

QUALITY BAR: The result must feel like a benchmark architecture studio website — 
comparable to Kengo Kuma Associates, Adjaye Associates, or Snøhetta's web presence. 
Not a template. A brand.
```

---

## PART 5 — QUICK REFERENCE: BEFORE / AFTER

| Element | Before (current build) | After (this prompt) |
|---------|----------------------|---------------------|
| Background | Flat saturated forest green | Warm near-black void with stone layering |
| Accent | Coral/red CTA button | Hammered brass throughout |
| Display font | Generic serif | Cormorant Garamond 300 italic |
| Body font | Unknown sans | Space Grotesk |
| Hero | Static 2-col layout | Staggered kinetic type + clip-path reveal |
| Images | Plain rectangles | Parallax + scale-on-hover + grain |
| Counters | Flat numbers | CountUp animation on scroll |
| Cursor | Browser default | Custom brass circle, scale on links |
| Services | Text over full-bleed photo | Alternating editorial sections |
| Project cards | Uniform small grid | Featured large + secondary with hover reveal |
| Motion | None | Framer Motion throughout |
| Brand feeling | Template | Architecture studio benchmark |

---

*Document prepared by Claude for Solaymane — EAI / LYKORA*
*Next.js 14 + Tailwind CSS + Framer Motion v11 + next-intl*
