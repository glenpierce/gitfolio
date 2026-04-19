## Design System

### Color Palette (Tailwind classes)
| Color | Primary Use | Tailwind Classes |
|-------|-------------|------------------|
| Cyan | Links, accents, tech | `cyan-400`, `cyan-500`, `cyan-700` |
| Fuchsia | Highlights, emphasis | `fuchsia-400`, `fuchsia-500`, `fuchsia-600` |
| Yellow | CTAs, warnings | `yellow-400`, `yellow-500` |
| Purple | Gradients | `purple-400`, `purple-500` |

### Glow Effects Pattern
```tsx
// Text glow
className="drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]"

// Box glow on hover  
className="hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]"
```

## Key Files

| File | Purpose |
|------|---------|
| `app/page.tsx` | All content + components |
| `app/layout.tsx` | Metadata, fonts (Geist) |
| `app/globals.css` | Tailwind imports only |
| `next.config.ts` | Static export + basePath |
| `.github/workflows/deploy.yml` | GitHub Pages CI/CD |
| `public/me.png` | Profile image location |

## Commands
```bash
docker compose up --build                     # Local development at localhost:3000
docker compose run --rm app npm run build     # Production build (static export to /out)
docker compose run --rm app npm run lint      # ESLint check
```

## Agent Command Policy

- Agents must run all `npm`, `npx`, and `node` commands via Docker.
- Use `docker compose run --rm app <command>` for one-off tasks.
- Do not run Node tooling directly on the host machine.

## When Helping Users

1. **Content changes** → Edit `app/page.tsx` only
2. **Adding images** → Place in `/public`, use `${basePath}/filename` pattern
3. **Deployment issues** → Check basePath matches repo name in both config files
4. **Styling** → Use existing Tailwind classes; maintain cyberpunk aesthetic
5. **New sections** → Follow existing section pattern with `id` for nav linking
