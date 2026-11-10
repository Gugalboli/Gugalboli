// Abrir/fechar entregas no lugar: URL, foco, posição de rolagem e botão Voltar.
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const g = require('node:child_process').execSync('npm root -g').toString().trim();
const { chromium } = require(g + '/playwright');
const base = process.argv[2] || 'http://localhost:4321';
let fails = 0;
const ok = (c, m) => { console.log(c ? '  ✓' : '  ✗', m); if (!c) fails++; };
const b = await chromium.launch();
for (const [w, h, rm] of [[1440, 900, 'no-preference'], [390, 844, 'no-preference'], [1440, 900, 'reduce']]) {
  console.log(`\n${w}px · movimento ${rm}`);
  const ctx = await b.newContext({ viewport: { width: w, height: h }, reducedMotion: rm });
  const p = await ctx.newPage();
  const errors = []; p.on('pageerror', (e) => errors.push(e.message));
  await p.goto(base + '/', { waitUntil: 'networkidle' });
  await p.locator('#entregas').scrollIntoViewIfNeeded(); await p.evaluate(() => scrollBy(0, 300)); await p.waitForTimeout(300);
  await p.locator('[data-open="speech-analytics"].card-link').scrollIntoViewIfNeeded();
  const y0 = await p.evaluate(() => scrollY);
  await p.click('[data-open="speech-analytics"].card-link'); await p.waitForTimeout(800);
  ok(p.url().endsWith('/entregas/speech-analytics/'), 'abrir atualiza a URL');
  ok(await p.evaluate(() => document.querySelector('[data-sheet]').open), 'painel aberto (dialog modal)');
  ok(await p.locator('[data-panel="speech-analytics"]').isVisible(), 'mostra a entrega certa');
  await p.evaluate(() => document.querySelector('[data-sheet]').scrollTo(0, 2000)); await p.waitForTimeout(300);
  await p.click('.sheet-x'); await p.waitForTimeout(800);
  ok(!(await p.evaluate(() => document.querySelector('[data-sheet]').open)), 'fechar pelo botão');
  ok(!p.url().includes('/entregas/'), 'URL volta para a página');
  ok(Math.abs((await p.evaluate(() => scrollY)) - y0) < 4, `posição restaurada (${y0})`);
  ok(await p.evaluate(() => document.activeElement?.matches('[data-open="speech-analytics"]')), 'foco volta ao cartão');
  // Esc
  await p.click('[data-open="base-viva"].card-link'); await p.waitForTimeout(700);
  await p.keyboard.press('Escape'); await p.waitForTimeout(700);
  ok(!(await p.evaluate(() => document.querySelector('[data-sheet]').open)), 'fechar com Esc');
  // Voltar do navegador
  await p.locator('[data-open="motor-comentarios"].card-link').scrollIntoViewIfNeeded();
  const y1 = await p.evaluate(() => scrollY);
  await p.click('[data-open="motor-comentarios"].card-link'); await p.waitForTimeout(700);
  await p.goBack(); await p.waitForTimeout(800);
  ok(!(await p.evaluate(() => document.querySelector('[data-sheet]').open)), 'Voltar fecha o painel');
  ok(Math.abs((await p.evaluate(() => scrollY)) - y1) < 4, 'Voltar mantém a posição');
  await p.goForward(); await p.waitForTimeout(800);
  ok(await p.evaluate(() => document.querySelector('[data-sheet]').open && !document.querySelector('[data-panel="motor-comentarios"]').hidden), 'Avançar reabre a entrega');
  // trocar de entrega dentro do painel
  await p.locator('[data-panel="motor-comentarios"] [data-goto]').last().click(); await p.waitForTimeout(500);
  ok(p.url().endsWith('/entregas/tradutor-mermaid/'), 'próxima entrega troca no lugar');
  await p.click('.sheet-back'); await p.waitForTimeout(700);
  ok(!(await p.evaluate(() => document.querySelector('[data-sheet]').open)), 'fecha após trocar');
  // chegada direta
  await p.goto(base + '/entregas/base-viva/', { waitUntil: 'networkidle' }); await p.waitForTimeout(500);
  ok(await p.evaluate(() => document.querySelector('[data-sheet]').open && !document.querySelector('[data-panel="base-viva"]').hidden), 'URL direta abre a entrega');
  await p.keyboard.press('Escape'); await p.waitForTimeout(600);
  ok(p.url().endsWith('/#entregas') && await p.evaluate(() => { const r = document.getElementById('entregas').getBoundingClientRect(); return r.top < innerHeight && r.bottom > 0; }), 'fechar após URL direta mostra a matriz');
  // trajetória expansível
  const btn = p.locator('[data-stop]').nth(2);
  await btn.click(); ok((await btn.getAttribute('aria-expanded')) === 'true', 'trajetória expande no lugar');
  ok(errors.length === 0, 'sem erros de JS ' + errors.join(' | '));
  await ctx.close();
}
// sem JavaScript
const ctx = await b.newContext({ javaScriptEnabled: false, viewport: { width: 1024, height: 768 } });
const p = await ctx.newPage();
await p.goto(base + '/entregas/speech-analytics/');
console.log('\nsem JavaScript');
ok(await p.locator('[data-panel="speech-analytics"] h2').isVisible(), 'entrega legível');
ok(await p.getByText('Resultados do projeto; o speech analytics apoiou').isVisible(), 'legenda dos resultados coletivos visível');
await p.goto(base + '/');
ok(await p.locator('h1').isVisible() && await p.locator('#trajetoria').count() === 1, 'página legível');
await b.close();
console.log(fails ? `\n${fails} falha(s)` : '\ntudo ok');
process.exit(fails ? 1 : 0);
