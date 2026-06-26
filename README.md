# 3D Portfolio — Kashyap Patel

[![Netlify Status](https://api.netlify.com/api/v1/badges/.../deploy-status)](https://portfolio-kashyap.netlify.app)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

Interactive 3D portfolio website built with **React 18**, **Three.js** (React Three Fiber), and **Vite**. Features a particle field hero, floating 3D geometries, dark/light theme toggle, scroll-triggered animations, and a contact form powered by Web3Forms.

## Live Demo

**[kashyap-p.github.io/portfolioNEW](https://kashyap-p.github.io/portfolioNEW/)**

---

## Features

### 3D & Visual
- **Particle Field** — 800 animated color-graded particles in the hero background, rotating slowly for a cosmic effect
- **Floating Geometries** — Wireframe icosahedron, octahedron, torus, and torus knot with bloom-style glow, each rotating independently at different speeds
- **Distorted Avatar Sphere** — Hover-reactive 3D sphere with `MeshDistortMaterial` in the About section, continuously rotating
- **Skill Orbs** — Rotating dodecahedrons representing skill categories, rendered with wireframe overlays
- **Stars Background** — 1500 twinkling stars via `@react-three/drei` `<Stars />`

### Theme
- **Dark / Light Mode** — Toggle via Sun/Moon button in the navbar, persisted to `localStorage`, CSS variables drive all colors

### UX & Animations
- **Loading Screen** — Animated SVG progress ring with auto-dismiss after 2.2s
- **Scroll Animations** — Sections fade and slide in using `react-intersection-observer` with staggered delays
- **Animated Skill Bars** — Progress bars animate from 0 to their percentage on scroll into view
- **Project Cards** — Hover lift with colored glow borders and shadow
- **Timeline** — Vertical gradient line with dot markers and staggered slide-in entries
- **Responsive** — Mobile hamburger menu, fluid typography via `clamp()`, CSS Grid adapting to viewport

### Content Sections
- **Hero** — Gradient headline, CTA buttons, stats bar (5+ years, 50+ projects, 30+ clients)
- **About** — Bio, 12 tech stack tags, Education cards (Coding Ninjas, University of Mumbai), Experience Timeline with 5 real roles
- **Skills** — 3 categories (Frontend, Backend, DevOps & Tools) with progress bars and 3D floating orbs
- **Projects** — 5 real GitHub projects with live screenshots, GitHub links, live demo links, tech tags, and auto-generated acronym fallback when screenshots fail
- **Contact** — Working form powered by Web3Forms, social links (GitHub, LinkedIn), email and location info
- **Footer** — Copyright and social links

### Performance
- **Code Splitting** — Three.js (~687 KB) and R3F (~278 KB) split into separate chunks from app code (~69 KB)
- **DPR Capped** — Device pixel ratio capped to `[1, 1.5]` for GPU-friendly rendering
- **Memory Optimized** — `memo`, `useCallback`, `useMemo` on 3D components; `Float32Array` for particle buffer; `will-change` hints
- **Error Boundaries** — Canvas crash falls back gracefully to gradient background without breaking the page

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| [React 18](https://reactjs.org/) | UI framework with hooks and context API |
| [Vite 5](https://vitejs.dev/) | Build tool and dev server with HMR |
| [Three.js r170](https://threejs.org/) | 3D rendering engine |
| [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) | React renderer for Three.js |
| [@react-three/drei](https://github.com/pmndrs/drei) | R3F helpers (Float, Stars, MeshDistortMaterial) |
| [@react-three/postprocessing](https://github.com/pmndrs/react-postprocessing) | Bloom and post-processing effects |
| [React Icons](https://react-icons.github.io/react-icons/) | Feather Icons and Simple Icons |
| [react-intersection-observer](https://github.com/thebuilder/react-intersection-observer) | Scroll-triggered animations |
| [Web3Forms](https://web3forms.com/) | Form-to-email API (no backend) |

---

## Project Structure

```
portfolio/
├── index.html                     # Entry HTML
├── package.json
├── vite.config.js                 # Vite config, manual chunks
├── netlify.toml                   # Netlify build & redirects config
├── LICENSE
├── public/
│   ├── _redirects                 # Static SPA redirects for Netlify
│   ├── favicon.svg
│   └── images/                    # Project screenshots
│       ├── todo-app.png
│       ├── tech-news.png
│       ├── imdb-clone.png
│       ├── alarm-clock.png
│       └── wanderlust.png
└── src/
    ├── main.jsx                   # React entry point
    ├── App.jsx                    # Root component, section layout
    ├── context/
    │   └── ThemeContext.jsx        # Theme provider with localStorage
    ├── styles/
    │   └── global.css             # CSS variables (dark + light), base styles
    └── components/
        ├── Navbar.jsx             # Sticky nav, mobile menu, theme toggle
        ├── Hero.jsx               # 3D scene, headline, CTAs, stats
        ├── About.jsx              # Bio, tech tags, education, timeline
        ├── Skills.jsx             # 3D orbs + progress bars
        ├── Projects.jsx           # Project cards with screenshots
        ├── Contact.jsx            # Contact form (Web3Forms)
        ├── Footer.jsx             # Footer with socials
        ├── Loader.jsx             # Animated loading screen
        └── ErrorBoundary.jsx      # Canvas crash fallback
```

---

## Getting Started

### Prerequisites

- **Node.js 18+**
- npm or yarn

### Install

```bash
git clone https://github.com/kashyap-p/portfolioNEW.git
cd portfolio
npm install
```

### Run Development Server

```bash
npm run dev
```

Opens at **http://localhost:5173** with hot module replacement.

### Build for Production

```bash
npm run build
```

Output goes to `dist/`. Serve with any static hosting.

### Preview Production Build

```bash
npm run preview
```

---

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run predeploy` | Build before deploy (for gh-pages) |
| `npm run deploy` | Deploy to GitHub Pages via gh-pages |

---

## Customization

### Content

| What | Where |
|------|-------|
| Projects | Edit the `projects` array in `src/components/Projects.jsx` |
| Skills | Edit `skillCategories` in `src/components/Skills.jsx` |
| About bio & timeline | Edit `timeline` array and text in `src/components/About.jsx` |
| Hero headline & stats | Edit `Hero.jsx` (Stats component and headline text) |
| Social links | Edit `socialLinks` in `src/components/Contact.jsx` and `Footer.jsx` |
| Contact email | Edit the email address in `src/components/Contact.jsx` |

### Theme Colors

Edit CSS variables in `src/styles/global.css`:

```css
/* Dark theme (default) */
:root { ... }

/* Light theme */
[data-theme="light"] { ... }
```

Key variables: `--color-bg`, `--color-text`, `--color-text-secondary`, `--bg-card`, `--border`

### Contact Form

Replace the Web3Forms `access_key` in `src/components/Contact.jsx:31` with your own key from [web3forms.com](https://web3forms.com/).

### 3D Parameters

- Particle count: `count` in `Hero.jsx` ParticleField component
- Geometry positions/sizes: Edit args in `FloatingGeometry` and `RotatingTorusKnot`
- Sphere distortion: `distort` and `speed` props on `MeshDistortMaterial` in `About.jsx`
- DPR cap: `dpr={[1, 1.5]}` on Canvas in `Hero.jsx`

---

## Deployment

### Netlify (Recommended)

1. Push to GitHub
2. Import repo in [Netlify](https://app.netlify.com/)
3. Build and deploy settings are auto-detected from `netlify.toml`:
   - Build command: `npm run build`
   - Publish directory: `dist`

Netlify auto-deploys on every push to the main branch.

### GitHub Pages

```bash
npm run predeploy   # builds to dist/
npm run deploy      # pushes dist/ to gh-pages branch
```

Then enable GitHub Pages in repo **Settings → Pages** with **gh-pages** branch and `/ (root)` folder.

### Manual Deployment

```bash
npm run build
# Upload dist/ to any static host
```

---

## License

MIT — see [LICENSE](LICENSE).

---

Built by [Kashyap Patel](https://github.com/kashyap-p)
