<p align="center">
  <img src="src/assets/verso-logo.png" alt="Verso AI" width="120" />
</p>

<h1 align="center">Verso AI</h1>

<p align="center">
  <strong>The Chrome extension that gives you a second opinion from another LLM.</strong>
</p>

<p align="center">
  <a href="https://tryverso.ai">🌐 Live site</a> •
  <a href="https://tryverso.ai">📋 Join the waitlist</a>
</p>

---

## About

This repo contains the landing page and waitlist for **Verso AI** — a Chrome extension that lets you double-check any AI response by getting a second answer from a different LLM, for free.

## Tech Stack

| Technology | Usage |
|------------|-------|
| [React](https://react.dev) | UI |
| [TypeScript](https://typescriptlang.org) | Type safety |
| [Vite](https://vitejs.dev) | Build & dev server |
| [Tailwind CSS](https://tailwindcss.com) | Styling |
| [shadcn/ui](https://ui.shadcn.com) | UI components |
| [Supabase](https://supabase.com) | Backend (waitlist, auth) |

## Development

```bash
# Clone the repo
git clone <YOUR_GIT_URL>
cd verso-website

# Install dependencies
npm install

# Start the dev server
npm run dev
```

## Project Structure

```
src/
├── components/
│   ├── landing/          # Landing page sections
│   │   ├── Hero.tsx
│   │   ├── Nav.tsx
│   │   └── WhySection.tsx
│   ├── ui/               # shadcn/ui components
│   └── WaitingListForm.tsx
├── hooks/                # Custom hooks
├── integrations/         # Supabase client
├── lib/                  # Utilities
├── pages/
│   ├── Index.tsx         # Home page
│   └── NotFound.tsx      # 404 page
├── App.tsx               # Routes
├── main.tsx              # Entry point
└── index.css             # Global styles
```

## License

Proprietary — Verso AI © 2025
