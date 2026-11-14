# PennSide frontend

React 19 + TypeScript + Vite 8 + Tailwind CSS 4.

- Run `pnpm install`, `pnpm dev`, `pnpm typecheck`, and `pnpm build`.
- Preserve the Figma-derived layout, original local image assets, and reduced-motion support.
- Use `import.meta.env.BASE_URL` for public assets so subpath hosting works.
- Authentication, event verification, matching, and invitations are demo UI flows; do not represent them as real backend operations.
- Keep credentials out of the repository. A future backend must validate identity and permissions on the server.
