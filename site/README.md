# Site — Gustavo Albuquerque

Astro + TypeScript, estático. Estado atual: **completo (Fases 1–4)** (ver `DECISIONS.md` e `CONTENT.md`).

```bash
npm install
npm run dev        # http://localhost:4321
npm run build && npm run preview
node scripts/screenshots.mjs http://localhost:4321   # capturas em ./shots (WIDTHS=320,390,768,1024,1440)
node scripts/a11y.mjs http://localhost:4321          # axe-core, WCAG 2.2 AA
node scripts/e2e.mjs http://localhost:4321           # abrir/fechar entregas, URL, foco, posição, Voltar, sem JS
node scripts/p2-shots.mjs http://localhost:4321      # capturas da página única e dos painéis
```

Páginas: `/` (site), `/entregas/<slug>/` (mesma página com a entrega aberta), `/estudos/` (Fase 1).

## Publicar

**GitHub Pages (pronto):** o workflow `.github/workflows/deploy-site.yml` publica a cada push em `main` que mexa em `site/` (ou manualmente em Actions → "Publicar site"). Uma vez só: Settings → Pages → Source: **GitHub Actions**. Endereço: `https://<usuario>.github.io/<repo>/`.

**Vercel (alternativa):** importar o repositório, Root Directory `site`, framework Astro, sem variáveis (o site fica na raiz).

**Domínio próprio:** apontar o domínio, e no workflow trocar `SITE_BASE` para `/`.
