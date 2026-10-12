# Root Node — Editorial Technology Journal

**Root Node** is an independent, handcrafted technology publication exploring the foundations of computing, networking, systems architecture, cybersecurity, and software engineering.

---

## 1. Design System & Editorial Philosophy

Root Node deliberately rejects generic AI aesthetics (no neon cyan glow, no purple gradients, no glassmorphism, no generic startup landing cards). Instead, it adopts an authentic, print-inspired magazine layout:

- **Organic Dark Palette**:
  - Background: Deep warm charcoal (`#151513`, surface `#1E1D1B`)
  - Primary Typography: Soft off-white (`#F4F3EE`)
  - Secondary Typography: Muted warm gray (`#ADA99F`)
  - Editorial Accents: Sage green (`#5E7A5A`), Terracotta/Rust (`#C55E40`), Sand (`#D9CBB0`)
  - Hairline Separators: Subtle borders (`#292825`, `#3B3934`)
- **Typography**:
  - Headings: **Lora** (Refined editorial serif)
  - Body Prose: **Inter** (High-legibility sans-serif, max line width ~`68ch`, line height `1.75`)
  - Code & Metadata: **JetBrains Mono**
- **Imagery**:
  - Curated, realistic high-resolution Unsplash photography featuring analog textures, real engineers, server racks, fiber terminations, and mechanical work.

---

## 2. Directory Structure

```text
root node/
├── css/
│   └── style.css            # Modular design system with CSS custom properties
├── js/
│   └── script.js            # Reading progress, TOC scrollspy, search, validation
├── index.html               # Editorial homepage with featured story & latest feed
├── blog.html                # Archive page of all 15 articles with live search & filters
├── about.html               # Publication charter, editorial standards & mission
├── contact.html             # Direct correspondence desk with validated form
├── privacy.html             # Comprehensive, honest data privacy policy
├── terms.html               # Terms of Service & MIT code licensing terms
├── disclaimer.html          # Technical, security, and cookie policy disclaimer
├── robots.txt               # Search engine crawler instructions
├── sitemap.xml              # Complete XML sitemap
│
├── post-1.html              # How the Internet Actually Works (3,450 words, 4+ figures)
├── post-2.html              # What Is DNS? How Resolution Works (3,380 words, 4+ figures)
├── post-3.html              # How Websites Work: Request to Rendered Page (3,520 words, 4+ figures)
├── post-4.html              # Git and GitHub Explained (Practical beginner guide)
├── post-5.html              # Python for Beginners: Scripts to Real Projects
├── post-6.html              # APIs Explained: How Applications Communicate
├── post-7.html              # What Is Cybersecurity? Essential Concepts
├── post-8.html              # How Password Managers Work and Why They Matter
├── post-9.html              # Linux Explained: Distributions, Terminals, Everyday Use
├── post-10.html             # How Databases Work: SQL, NoSQL, and Data Storage
├── post-11.html             # Cloud Computing Explained: Servers, Storage, Services
├── post-12.html             # Web Performance Optimization: Make Websites Faster
├── post-13.html             # What Is Two-Factor Authentication?
├── post-14.html             # Containers Explained: Docker, Images, Deployment
└── post-15.html             # How to Build a Personal Website From Scratch
```

---

## 3. How to Run Locally

Because the project is built with strictly vanilla HTML5, CSS3, and JavaScript, **no build step, bundler, or dependencies are required**.

### Option A: Direct Browser Inspection
Simply double-click `index.html` or open any `.html` file directly in Google Chrome, Firefox, Safari, or Microsoft Edge.

### Option B: Local HTTP Server (Recommended)
Using Python:
```bash
python -m http.server 8000
```
Then navigate to `http://localhost:8000/`.

Or using Node:
```bash
npx serve .
```

---

## 4. Key Interactive Features
- **Reading Progress Bar**: Fixed indicator at the top of long-form articles tracking scroll position.
- **Table of Contents Scrollspy**: Sticky left sidebar on desktop highlighting active sections using `IntersectionObserver`.
- **Live Search & Category Filter**: Real-time client-side keyword and category filtering on `blog.html`.
- **Accessible Mobile Drawer**: Hamburger menu with ARIA attributes and keyboard Escape handler.
- **Client Form Validation**: Accessible validation with immediate feedback states on `contact.html`.
