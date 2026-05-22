# MathForAll (Mathrix) — New Laptop Setup Guide

Complete guide to get this project running on a fresh machine from scratch.

---

## Prerequisites

Install the following tools before cloning the project. Skip any you already have.

### 1. Node.js (v18 or later)

Download from [https://nodejs.org](https://nodejs.org) — use the **LTS** version.

Verify after install:

```bash
node --version   # should print v18.x.x or higher
npm --version    # should print 9.x.x or higher
```

### 2. Git

Download from [https://git-scm.com](https://git-scm.com).

Verify:

```bash
git --version
```

### 3. VS Code (optional but recommended)

Download from [https://code.visualstudio.com](https://code.visualstudio.com).

Useful extensions for this project:

- **ESLint** — linting support
- **Tailwind CSS IntelliSense** — autocomplete for Tailwind classes
- **Prettier** — code formatting

---

## Cloning the Repository

```bash
git clone <your-repo-url> MathForAll
cd MathForAll
```

Replace `<your-repo-url>` with the actual GitHub/GitLab URL of this repository.

---

## Installing Dependencies

This project uses **npm**. Run this once after cloning (and again whenever `package.json` changes):

```bash
npm install
```

This installs all 62 packages listed in `package.json`, including React, Vite, Tailwind CSS, Framer Motion, and Radix UI components.

---

## Running the Development Server

```bash
npm run dev
```

Vite will start a local server. Open the URL it prints — usually:

```
http://localhost:5173
```

The page hot-reloads automatically whenever you save a file.

---

## Project Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start local development server with hot reload |
| `npm run build` | Compile and bundle for production (output: `dist/`) |
| `npm run preview` | Serve the production build locally to test before deploy |

---

## Environment Variables

This project has **no `.env` files required**. It is a fully client-side app with no secrets or API keys needed to run locally.

The only dynamic value is `BASE_URL`, which Vite injects automatically from `vite.config.js` — no manual setup needed.

---

## Project Structure Overview

```
MathForAll/
├── src/
│   ├── App.jsx                 # Root component: providers, router, layout
│   ├── main.jsx                # React entry point
│   ├── index.css               # Global styles and Tailwind theme variables
│   ├── components/
│   │   ├── Navbar.jsx          # Top navigation bar with class selector and theme toggle
│   │   ├── ThemeProvider.jsx   # Light / dark / system theme context
│   │   ├── ThreeScene.jsx      # Interactive 3D geometry shape viewer
│   │   └── ui/                 # 50+ reusable UI primitives (buttons, cards, dialogs, etc.)
│   ├── pages/
│   │   ├── Home.jsx            # Landing page
│   │   ├── Learn.jsx           # Main learning interface (class → chapter → content)
│   │   └── not-found.jsx       # 404 fallback
│   ├── data/
│   │   └── mathData.js         # All educational content: classes, chapters, formulas, quizzes
│   ├── hooks/
│   │   ├── use-toast.js        # Toast notification hook
│   │   └── use-mobile.jsx      # Mobile breakpoint detection hook
│   └── lib/
│       └── utils.js            # cn() utility for merging Tailwind classes
├── public/
│   ├── favicon.svg
│   └── robots.txt
├── index.html                  # HTML entry point
├── vite.config.js              # Build config (alias @→src, Tailwind plugin)
├── package.json
└── package-lock.json
```

---

## Tech Stack Summary

| Layer | Technology |
|---|---|
| Framework | React 18 |
| Build Tool | Vite 5 |
| Routing | Wouter |
| Styling | Tailwind CSS v4 |
| UI Primitives | Radix UI + shadcn-style components |
| Animations | Framer Motion |
| 3D Graphics | Custom CSS 3D transforms (`ThreeScene.jsx`) |
| Forms | React Hook Form + Zod |
| Data Fetching | TanStack React Query (provider ready, no API calls yet) |
| Theme | next-themes |
| Icons | Lucide React |

---

## Adding or Updating Content

All educational content lives in a single file: [src/data/mathData.js](src/data/mathData.js)

To add a new class, chapter, formula, or quiz question, edit that file directly. The `Learn.jsx` page renders everything from this dataset automatically — no UI changes needed for content updates.

Structure of each entry:

```js
{
  class: 6,
  chapters: [
    {
      name: "Chapter Name",
      formulas: [
        { title: "Formula Name", expression: "a² + b² = c²" }
      ],
      quiz: [
        {
          question: "What is ...?",
          options: ["A", "B", "C", "D"],
          answer: 0,              // index of correct option
          explanation: "Because..."
        }
      ]
    }
  ]
}
```

---

## Building for Production

```bash
npm run build
```

Output goes to the `dist/` folder. Preview it locally before deploying:

```bash
npm run preview
```

To deploy, upload the contents of `dist/` to any static hosting service (Vercel, Netlify, GitHub Pages, etc.).

---

## Common Issues

### `npm install` fails with permission errors (Windows)

Run the terminal as Administrator, or use:

```bash
npm install --legacy-peer-deps
```

### Port 5173 already in use

Vite will automatically try the next available port. Or specify one manually:

```bash
npm run dev -- --port 3000
```

### Page looks broken (missing styles)

Make sure you ran `npm install` and that the Tailwind CSS Vite plugin is active in `vite.config.js`. Do not open `index.html` directly in a browser — always use `npm run dev`.

### Hot reload stops working

Restart the dev server (`Ctrl+C`, then `npm run dev`).

---

## Git Workflow

```bash
# Check current status
git status

# Pull latest changes before starting work
git pull origin main

# Stage and commit your changes
git add src/data/mathData.js
git commit -m "Add Class 9 chapter: Polynomials"

# Push to remote
git push origin main
```

---

## Contacts / Links

- Project name in `package.json`: `mathrix`
- Main repo branch: `main`
- No backend, no database — purely frontend

---

*Last updated: May 2026*
