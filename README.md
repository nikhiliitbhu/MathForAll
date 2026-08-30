# Mathrix

Mathrix is a frontend learning app for school mathematics (Class 6-12) with chapter-wise formulas, interactive 3D geometry visuals, and quick quizzes.

## What This Project Does

- Covers maths topics for `Class 6` to `Class 12`
- Shows chapter-specific formula cards
- Provides chapter quizzes with instant correct/incorrect feedback
- Includes interactive 3D shape explorer (drag to rotate)
- Reads the official NCERT maths textbook for every class, English or Hindi medium, chapter by chapter
- Supports light/dark theme switching
- Uses a modern responsive UI for desktop and mobile

## Tech Stack

- `React 18` + `Vite 5`
- `Wouter` for routing
- `Tailwind CSS v4` + Radix/shadcn-style UI components
- `Framer Motion` for animations
- Custom CSS 3D rendering for shapes (`ThreeScene` component)
- `@tanstack/react-query` provider (setup ready)

## Routes

- `/` -> Landing/home page
- `/learn` -> Learning workspace (class -> chapter -> formulas/quiz/3D)
- Fallback -> Not Found page

## Project Structure

```txt
src/
  App.jsx                  # App shell, providers, router
  main.jsx                 # React entrypoint
  data/mathData.js         # Class/chapter/formula/quiz data source
  data/ncertMaths.js       # NCERT book/chapter catalogue (generated — see scripts/)
  pages/
    Home.jsx               # Marketing + feature showcase
    Learn.jsx              # Main learning interface
    not-found.jsx
  components/
    Navbar.jsx             # Top navigation + theme toggle
    ThemeProvider.jsx      # Light/dark/system theme handling
    ThreeScene.jsx         # Interactive 3D geometry viewer
    BookView.jsx           # NCERT textbook reader (PDF.js, streamed from ncert.nic.in)
    ui/*                   # Reusable UI components
```

## Getting Started

### 1) Install dependencies

```bash
npm install
```

### 2) Start development server

```bash
npm run dev
```

Then open the local URL shown by Vite (usually `http://localhost:5173`).

## Build for Production

```bash
npm run build
npm run preview
```

## How Content Is Managed

Learning content is data-driven from [`src/data/mathData.js`](/Users/mac/Downloads/math4all/src/data/mathData.js).  
To add/update syllabus content, edit this file:

- add a class object
- add chapter entries
- add formulas
- add quiz questions/options/explanations

UI in `Learn.jsx` auto-renders from this dataset.

## Current Notes

- Project name in `package.json` is `mathrix`.
- `App.jsx` uses `BASE_URL` compatibility for router base path.
- Some UI provider setup exists (like React Query) for future scalability.

