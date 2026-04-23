---
id: 03-page-animations
title: Page Animations — anime.js Scroll-Triggered Animations
edition: TheDecipherist
depends_on: [01-create-github-pages, 02-build-html]
source_files:
  - docs/js/scroll-animations.js
  - docs/css/src/animations/scroll-driven.css
  - docs/css/src/components/stat-counter.css
  - docs/index.html
routes: []
models: []
test_files: []
data_flow: greenfield
last_synced: 2026-04-23
status: in_progress
phase: integration-pending
mdd_version: 1
known_issues: []
---

# 03 — Page Animations — anime.js Scroll-Triggered Animations

## Purpose

Replaces the site's CSS-native `animation-timeline: view()` scroll animations with anime.js
IntersectionObserver-driven animations. Every card type (article, repo, project item, stat)
animates into view on scroll with premium easings, stagger, and spring physics — making the
site feel alive. Respects `prefers-reduced-motion`.

## Architecture

```
docs/index.html
  └─ <script src="https://cdnjs.cloudflare.com/…/anime.min.js" defer>
  └─ <script src="/js/scroll-animations.js" defer>

docs/js/scroll-animations.js
  ├─ DOMContentLoaded → check anime.js available + reduced-motion
  ├─ anime.set() — set initial hidden state on all animated elements
  ├─ IntersectionObserver (per element group)
  │    ├─ .articles-grid → stagger .article-card children
  │    ├─ #repos-grid    → stagger .repo-card children
  │    ├─ .project-item  → individual slide-in (each observed separately)
  │    ├─ .stats-bar     → stagger .stat-item children
  │    └─ .section__heading, .section__subheading, .articles-category__label
  └─ Each observer fires once then disconnects

docs/css/src/animations/scroll-driven.css
  └─ Scroll-driven rules removed (article-card, headings, about, category-label)
     Non-scroll keyframe declarations in keyframes.css remain untouched.

docs/css/src/components/stat-counter.css
  └─ stat-item animation-timeline and sibling-index delay removed
     (replaced by anime.js stagger via IntersectionObserver)
```

## Data Model

No data model. Pure frontend animation layer.

## API Endpoints

None.

## Business Rules

**Initial state:** `anime.set()` sets `opacity: 0` and initial transform on all animated
elements immediately in the DOMContentLoaded handler, before any scroll occurs. If JS fails
to load, elements remain fully visible (progressive enhancement).

**Reduced motion:** If `window.matchMedia('(prefers-reduced-motion: reduce)').matches` is
true, the script returns immediately without setting hidden state or attaching observers.
All elements stay fully visible.

**Observer fires once:** Each IntersectionObserver entry calls `observer.unobserve(target)`
after firing so the animation only plays on entry, not re-triggers.

**Group vs individual:**
- Grid containers (`.articles-grid`, `#repos-grid`, `.stats-bar`) are observed as a whole.
  When the container enters view, all children animate together with stagger.
- `.project-item` is observed individually (list items appear at different scroll positions).
- `.section__heading`, `.section__subheading`, `.articles-category__label` are observed
  individually.

**Easing palette:**
- Card grid entries: `cubicBezier(0.16, 1, 0.3, 1)` — expo-out feel, snappy
- Repo cards: `cubicBezier(0.34, 1.56, 0.64, 1)` — slight overshoot (back-out)
- Stat items: `spring(1, 80, 10, 0)` — spring physics
- Section headings: `cubicBezier(0.16, 1, 0.3, 1)` with translateY + skewY reset

**Stagger:** `anime.stagger(80ms)` for article cards, `60ms` for repo cards, `60ms` for
stat items. Project items: no stagger (observed individually).

**Threshold:** IntersectionObserver threshold `0.08` — animation fires when ~8% of the
element is visible, giving a crisp entry without waiting for the full element.

**anime.js version:** 3.2.2 from cdnjs (stable, wide CDN coverage for a static site).

## Data Flow

Greenfield — no existing backend data consumed. Animation targets are DOM elements
produced by `docs/index.html` (static + injected by `build-html.js`).

## Dependencies

- `01-create-github-pages` — provides the HTML structure, CSS layer order, and component
  class names (`.article-card`, `.repo-card`, `.project-item`, `.stat-item`, etc.)
- `02-build-html` — generates the card HTML injected into index.html at build time;
  scroll-animations.js targets those generated elements by selector

## Known Issues

(none — new feature)
