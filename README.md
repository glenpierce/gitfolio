## 📁 Project Structure

```
├── app/
│   ├── page.tsx        # 👈 Main content (edit this!)
│   ├── layout.tsx      # Root layout & metadata
│   └── globals.css     # Global styles
├── public/
│   └── me.png          # 👈 Your profile photo
├── .github/
│   └── workflows/      # GitHub Pages deployment
└── next.config.ts      # Next.js configuration
```

---

## 🎨 Design Features

- **Cyberpunk Aesthetic**: Neon cyan, fuchsia, and yellow accents on deep space background
- **Terminal Typography**: Monospaced fonts for that coder vibe
- **Interactive Elements**: Glowing hover effects, pulsing status indicator, smooth animations
- **Responsive**: Looks great on mobile, tablet, and desktop
- **Accessible**: Semantic HTML and proper contrast ratios

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| [Next.js](https://nextjs.org/) | 16 | React framework with App Router |
| [React](https://react.dev/) | 19 | UI library |
| [Tailwind CSS](https://tailwindcss.com/) | 4 | Utility-first styling |
| [TypeScript](https://www.typescriptlang.org/) | 5 | Type safety |

---

## 🐳 Local Command Policy

Run all `npm`, `npx`, and `node` commands through Docker. Do not run Node tooling directly on the host machine for local development.

---

## 📝 Available Scripts

```bash
docker compose up --build                               # Start development server at localhost:3000
docker compose run --rm app npm run build              # Build for production
docker compose run --rm app npm run start              # Start production server
docker compose run --rm app npm run lint               # Run ESLint
docker compose run --rm app npx tsc --noEmit           # Type-check
```
