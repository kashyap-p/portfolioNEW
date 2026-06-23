# Portfolio | Kashyap

3D portfolio website built with **React 18**, **Three.js** (React Three Fiber), and **Vite**.

## Features

- **3D Particle Field** — 800 animated particles with color gradients in the hero background
- **Interactive 3D Geometries** — Floating wireframe shapes (icosahedron, octahedron, torus, torus knot) with bloom-style glow
- **Distorted Avatar Sphere** — Hover-reactive 3D sphere with MeshDistortMaterial in the About section
- **Floating Skill Orbs** — Rotating dodecahedrons representing skill categories
- **Animated Skill Bars** — CSS-animated progress bars that trigger on scroll
- **Project Cards** — 6 project cards with hover effects, GitHub/Live links, and live screenshots
- **Contact Form** — Integrated with Web3Forms API, sends submissions to email
- **Loading Screen** — Animated SVG progress ring with auto-dismiss
- **Responsive Design** — Mobile hamburger menu, fluid typography via `clamp()`
- **Performance Optimized** — Code-split chunks, `content-visibility`, `will-change` hints, ref-based hover (no React state for 3D interactions)

## Tech Stack

| Tool | Purpose |
|------|---------|
| [React 18](https://reactjs.org/) | UI framework |
| [Vite 5](https://vitejs.dev/) | Build tool & dev server |
| [Three.js r170](https://threejs.org/) | 3D rendering engine |
| [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) | React renderer for Three.js |
| [@react-three/drei](https://github.com/pmndrs/drei) | R3F helpers (Float, Stars, MeshDistortMaterial) |
| [@react-three/postprocessing](https://github.com/pmndrs/react-postprocessing) | Bloom & post-processing effects |
| [React Icons](https://react-icons.github.io/react-icons/) | Icon library (Feather Icons, Simple Icons) |
| [react-intersection-observer](https://github.com/thebuilder/react-intersection-observer) | Scroll-triggered animations |
| [Web3Forms](https://web3forms.com/) | Form-to-email API (no backend) |

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Install

```bash
cd portfolio
npm install
```

### Run Dev Server

```bash
npm run dev
```

Opens at **http://localhost:5173**.

### Build for Production

```bash
npm run build
```

Output goes to `dist/`. Serve with any static hosting (GitHub Pages, Vercel, Netlify).

### Preview Build

```bash
npm run preview
```

## Project Structure

```
portfolio/
├── index.html
├── package.json
├── vite.config.js
├── public/
│   ├── favicon.svg
│   └── images/
│       ├── todo-app.png
│       └── tech-news.png
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── styles/
    │   └── global.css
    └── components/
        ├── Hero.jsx
        ├── Navbar.jsx
        ├── About.jsx
        ├── Skills.jsx
        ├── Projects.jsx
        ├── Contact.jsx
        ├── Footer.jsx
        ├── Loader.jsx
        └── ErrorBoundary.jsx
```

## Customization

- **Projects** — Edit `src/components/Projects.jsx`, the `projects` array
- **Skills** — Edit `src/components/Skills.jsx`, the `skillCategories` array
- **Social Links** — Edit `src/components/Contact.jsx` and `src/components/Footer.jsx`
- **Colors** — Edit CSS variables in `src/styles/global.css` (`:root`)
- **Contact Form** — Replace the `access_key` in `src/components/Contact.jsx` with your Web3Forms key
- **Content** — Edit text/content directly in each component file

## Deploy

### GitHub Pages

1. Update `homepage` in `package.json` or use `vite.config.js` base path
2. Run `npm run build`
3. Push `dist/` to the `gh-pages` branch or use GitHub Actions

### Vercel / Netlify

1. Connect repo
2. Build command: `npm run build`
3. Output directory: `dist`

## License

MIT
