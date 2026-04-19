# Agent Execution Rules

## Docker-only Node commands

All local `npm`, `npx`, and `node` commands must run inside Docker.

- Use `docker compose run --rm app <command>` for one-off commands.
- Use `docker compose up --build` for local development.
- Do not run Node tooling directly on the host machine.

## Examples

```bash
docker compose run --rm app npm ci
docker compose run --rm app npm run lint
docker compose run --rm app npx tsc --noEmit
docker compose up --build
```

we