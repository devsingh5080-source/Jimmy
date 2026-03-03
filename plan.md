# 🐾 Jimmy's Furry House — Website Plan

## Brand
- **Name:** Jimmy's Furry House
- **Logo:** Jimmy's Furry House (text-based, serif + gold accent)
- **Tagline:** *"Born from love. Built for your furry friends."*

---

## The Story

Tanishka's beloved dog **Jimmy** passed away due to cancer. One month after his passing, she channeled her grief into love — starting a **dog-keeping service** in her society at very reasonable rates, caring for dogs the way she cared for Jimmy.

---

## 📄 Pages (3 Sections)

### 1. 💛 About Us Page — Homepage (`index.html`)
- **Hero:** Full-screen cinematic image + massive "Jimmy's *Furry* House" display text + CTA
- **Quote Section:** A gentle, validating quote on eternal love ("Love goes very far beyond...")
- **The Story:** Scroll-driven editorial narrative:
  1. When Tanishka met Jimmy
  2. A love that was unconditional
  3. When Jimmy left (cancer diagnosis)
  4. **Tribute to Her Care:** Quietly honoring her devotion, reminding her she was his whole world.
  5. The birth of Jimmy's Furry House (A safe haven)
- **Big statement typography** between story blocks
- **Services grid:** Home-Like Stays, Daily Walks, Healthy Meals, Lots of Love
- **Contact section** at bottom: form, WhatsApp link, phone, email, location

### 2. 🖼️ Gallery Page (`gallery.html`)
- Masonry photo grid (CSS columns, 6 images)
- Hover effects: scale + caption overlay with dog names
- Lightbox: GSAP-animated fullscreen image viewer
- CTA section linking to booking

### 3. ⭐ Testimonials Page (`testimonials.html`)
- 6 review cards with star ratings + avatar initials
- Client quotes from society members
- Dark-themed CTA section

---

## 🎨 Design Direction (Calming "Safe Haven" Aesthetic)

| Aspect | Direction |
|--------|-----------|
| **Mood** | Calming, soft, quiet, a "safe haven", deeply emotional |
| **Background** | Warm cream `#FAF8F5` |
| **Primary Accent** | Soft Golden Amber `#D4A853` |
| **Text** | Softened Charcoal `#3a3935` (to reduce stark contrast) |
| **Serif Font** | Playfair Display (headings, quotes, story) |
| **Sans Font** | Inter (body, nav, labels) |
| **Layout** | Generous whitespace, quiet breathing room, elegant pacing |
| **Overall Feel** | A love letter to Jimmy and a comforting embrace for pet parents |

---

## 🎬 Animations (GSAP + ScrollTrigger)

| Pattern | Description |
|---------|-------------|
| **Hero Reveal** | `gsap.timeline()` — bg scales 1.2→1, nav + title stagger in |
| **Typography Masking** | Headers in `overflow:hidden`, yPercent 100→0 on scroll |
| **Cinematic Image Unveils** | clipPath reveals wrapper while image counter-scales 1.3→1 |
| **Staggered Reveals** | Cards/gallery items animate in with stagger: 0.12s |
| **Scroll Velocity Distortions** | Images skew ±8° on fast scroll + golden canvas scanlines |
| **Paw Trail Cursor** | 🐾 emoji follows mouse on desktop |
| **Page Transitions** | Golden overlay wipe between pages |

---

## 🛠️ Tech Stack

- **Core:** HTML, CSS, JavaScript (vanilla)
- **Animations:** GSAP 3.12.5 + ScrollTrigger (CDN)
- **Fonts:** Google Fonts (Playfair Display, Inter)
- **Layout:** Responsive, mobile-first (hamburger menu < 768px)
- **Deployment:** GitHub Pages from `Jimmy` repo

---

## 📝 Status & Next Steps

- [x] Core 3-page website built
- [x] GSAP animation engine integrated
- [ ] Replace placeholder images with real photos
- [ ] Update contact details (phone, email, WhatsApp)
- [ ] Update testimonials with real reviews
- [ ] Push to GitHub & deploy on GitHub Pages
