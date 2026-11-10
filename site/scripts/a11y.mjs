import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const g = require('node:child_process').execSync('npm root -g').toString().trim();
const { chromium } = require(g + '/playwright');
const { default: AxeBuilder } = await import('@axe-core/playwright');
const base = process.argv[2] || 'http://localhost:4321';
const b = await chromium.launch();
for (const w of [390, 1440]) for (const p of ['/', '/entregas/base-viva/', '/entregas/speech-analytics/', '/entregas/motor-comentarios/', '/entregas/tradutor-mermaid/', '/estudos/']) {
  const ctx = await b.newContext({ viewport: { width: w, height: 900 } }); const page = await ctx.newPage();
  await page.goto(base + p, { waitUntil: 'networkidle' });
  const r = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
  const sw = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth);
  console.log(w, p, 'violações:', r.violations.map((v) => `${v.id}(${v.impact}:${v.nodes.length})`).join(', ') || 'nenhuma', sw ? '· ROLAGEM HORIZONTAL' : '');
  await ctx.close();
}
await b.close();
