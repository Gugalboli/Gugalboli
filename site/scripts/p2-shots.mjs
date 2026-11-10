import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const g = require('node:child_process').execSync('npm root -g').toString().trim();
const { chromium } = require(g + '/playwright');
import { mkdirSync } from 'node:fs';
const base = process.argv[2] || 'http://localhost:4321', out = process.argv[3] || 'shots/p2';
mkdirSync(out, { recursive: true });
const H = { 320: 640, 390: 844, 768: 1024, 1024: 768, 1440: 900 };
const widths = (process.env.WIDTHS || '390,1440').split(',').map(Number);
const b = await chromium.launch();
for (const w of widths) {
  const ctx = await b.newContext({ viewport: { width: w, height: H[w] }, deviceScaleFactor: Number(process.env.DSF || 1) });
  const p = await ctx.newPage();
  p.on('pageerror', (e) => console.log('PAGEERROR', w, e.message));
  p.on('console', (m) => m.type() === 'error' && console.log('CONSOLE', w, m.text()));
  await p.goto(base + '/', { waitUntil: 'networkidle' }); await p.waitForTimeout(800);
  await p.screenshot({ path: `${out}/home-${w}-0.png` });
  for (const id of ['cap-02', 'entregas', 'trajetoria', 'sobre', 'contato']) {
    await p.evaluate((id) => document.getElementById(id).scrollIntoView({ behavior: 'instant' }), id);
    await p.waitForTimeout(id === 'cap-02' ? 1500 : 500);
    if (id === 'cap-02') await p.evaluate(() => scrollBy(0, innerHeight * 0.25)), await p.waitForTimeout(1200);
    await p.screenshot({ path: `${out}/home-${w}-${id}.png` });
  }
  await p.goto(base + '/entregas/tradutor-mermaid/', { waitUntil: 'networkidle' }); await p.waitForTimeout(800);
  await p.screenshot({ path: `${out}/panel-${w}-mermaid-0.png` });
  for (const k of [1.3, 2.3, 3.3]) {
    await p.evaluate((k) => document.querySelector('[data-sheet]').scrollTo(0, k * innerHeight), k);
    await p.waitForTimeout(1200);
    await p.screenshot({ path: `${out}/panel-${w}-mermaid-${k}.png` });
  }
  await p.goto(base + '/entregas/speech-analytics/', { waitUntil: 'networkidle' }); await p.waitForTimeout(600);
  await p.evaluate(() => document.querySelector('[data-sheet]').scrollTo(0, 2.2 * innerHeight)); await p.waitForTimeout(900);
  await p.screenshot({ path: `${out}/panel-${w}-speech-step.png` });
  await p.evaluate(() => { const s = document.querySelector('[data-sheet]'); s.scrollTo(0, s.scrollHeight); }); await p.waitForTimeout(600);
  await p.screenshot({ path: `${out}/panel-${w}-speech-close.png` });
  await ctx.close();
}
await b.close();
