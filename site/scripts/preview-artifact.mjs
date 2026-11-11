// Gera uma prévia de arquivo único (JS e fontes embutidos, entregas em #entrega-<slug>)
// a partir de dist/index.html. Uso: node scripts/preview-artifact.mjs <saida.html>
import { readFileSync, writeFileSync } from 'node:fs';
import { rolldown } from 'rolldown';
const out = process.argv[2];
let h = readFileSync('dist/index.html', 'utf8');
// o publicador envolve a página num esqueleto próprio
h = h.replace(/<!DOCTYPE html>/i, '').replace(/<html[^>]*>/, '').replace('</html>', '')
  .replace('<head>', '').replace('</head>', '').replace(/<body[^>]*>/, '').replace('</body>', '');
h = h.replace(/<title>[^<]*<\/title>/, '<title>Gustavo Albuquerque</title>');
h = h.replace(/<link rel="(preload|icon)"[^>]*>/g, '');
h = h.replace('<script>document.documentElement.classList.add', "<script>document.documentElement.dataset.urls='hash';document.documentElement.classList.add");
if (!h.includes("dataset.urls='hash'")) h = `<script>document.documentElement.dataset.urls='hash'</script>` + h;
h = h.replace(/href="\/entregas\/([a-z-]+)\/"/g, 'href="#entrega-$1"').replace(/href="\/#/g, 'href="#');
// fontes como data URI
h = h.replace(/url\(\/_astro\/([^)]+\.woff2?)\)/g, (_, f) => `url(data:font/woff2;base64,${readFileSync('dist/_astro/' + f).toString('base64')})`);
// scripts de módulo: empacota cada entrada num único bloco embutido
const re = /<script type="module" src="\/_astro\/([^"]+)"><\/script>/g;
for (const m of [...h.matchAll(re)]) {
  const bundle = await rolldown({ input: 'dist/_astro/' + m[1] });
  const { output } = await bundle.generate({ format: 'esm', codeSplitting: false, inlineDynamicImports: true });
  const code = output[0].code.replace(/<\/script/gi, '<\\/script');
  h = h.replace(m[0], `<script type="module">${code}</script>`);
}
if (/\/_astro\//.test(h)) console.warn('ainda há referências a /_astro/');
writeFileSync(out, h);
console.log('ok', (h.length / 1024).toFixed(0), 'KB');
