# Site — Gustavo Albuquerque

Astro + TypeScript, estático. Estado atual: **Fase 1 — estudos de direção** (ver `DECISIONS.md` e `CONTENT.md`).

```bash
npm install
npm run dev        # http://localhost:4321
npm run build && npm run preview
node scripts/screenshots.mjs http://localhost:4321   # capturas em ./shots (WIDTHS=320,390,768,1024,1440)
node scripts/a11y.mjs http://localhost:4321          # axe-core, WCAG 2.2 AA
```

Páginas: `/` (índice dos estudos), `/estudos/a`, `/estudos/b`, `/estudos/mermaid`.
