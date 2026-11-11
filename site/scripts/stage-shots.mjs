import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const g = require('node:child_process').execSync('npm root -g').toString().trim();
const { chromium } = require(g + '/playwright');
import { mkdirSync } from 'node:fs';
const base = 'http://localhost:4321', out = 'shots/st'; mkdirSync(out, { recursive: true });
const w = +(process.env.W || 1440), h = w < 800 ? 844 : 900;
const slugs = (process.env.SLUGS || 'base-viva,speech-analytics,motor-comentarios').split(',');
const b = await chromium.launch(); const ctx = await b.newContext({ viewport: { width: w, height: h } }); const p = await ctx.newPage();
p.on('pageerror', (e) => console.log('ERR', e.message)); p.on('console', (m) => m.type() === 'error' && console.log('CONSOLE', m.text()));
for (const s of slugs) {
  await p.goto(`${base}/entregas/${s}/`, { waitUntil: 'networkidle' }); await p.waitForTimeout(500);
  const top = await p.evaluate(() => { const st = document.querySelector('[data-panel]:not([hidden]) [data-pstep]'); return st.getBoundingClientRect().top + document.querySelector('[data-sheet]').scrollTop; });
  for (const k of [0.45, 1.45, 2.45, 3.6]) {
    const step = await p.evaluate(() => document.querySelector('[data-panel]:not([hidden]) [data-pstep]').offsetHeight);
    await p.evaluate(([t]) => document.querySelector('[data-sheet]').scrollTo(0, t), [top - h * 0.72 + k * step]);
    await p.waitForTimeout(1100);
    await p.screenshot({ path: `${out}/${s}-${w}-${k}.png` });
  }
}
await b.close();
