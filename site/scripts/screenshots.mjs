// Uso: node scripts/screenshots.mjs [baseURL] — gera capturas em ./shots
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
let chromium;
try { ({ chromium } = require('playwright')); } catch { ({ chromium } = require(require('node:child_process').execSync('npm root -g').toString().trim() + '/playwright')); }
import { mkdirSync } from 'node:fs';
const base = process.argv[2] || 'http://localhost:4321';
const out = process.argv[3] || 'shots';
mkdirSync(out, { recursive: true });
const widths = (process.env.WIDTHS || '390,1440').split(',').map(Number);
const heights = { 320: 640, 390: 844, 768: 1024, 1024: 768, 1440: 900 };
const plan = [
  { name: 'hub', path: '/', scrolls: [0] },
  { name: 'a', path: '/estudos/a', scrolls: [0, 1.1, 2.35, 3.6, 4.85, 6.1] },
  { name: 'b', path: '/estudos/b', scrolls: [0] },
  { name: 'mermaid', path: '/estudos/mermaid', scrolls: [0, 1.4, 2.4, 3.4, 4.4, 5.6, 'end'] },
];
const only = process.env.ONLY;
const browser = await chromium.launch();
for (const w of widths) {
  const ctx = await browser.newContext({ viewport: { width: w, height: heights[w] || 900 }, deviceScaleFactor: Number(process.env.DSF || 1) });
  const page = await ctx.newPage();
  page.on('pageerror', (e) => console.log('PAGEERROR', e.message));
  page.on('console', (m) => m.type() === 'error' && console.log('CONSOLE', m.text()));
  for (const p of plan) {
    if (only && !only.split(',').includes(p.name)) continue;
    await page.goto(base + p.path, { waitUntil: 'networkidle' });
    await page.waitForTimeout(600);
    for (const s of p.scrolls) {
      await page.evaluate((s) => window.scrollTo(0, s === 'end' ? document.body.scrollHeight : s * innerHeight), s);
      await page.waitForTimeout(1400);
      await page.screenshot({ path: `${out}/${p.name}-${w}-${String(s).replace('.', '_')}.png` });
    }
  }
  await ctx.close();
}
await browser.close();
