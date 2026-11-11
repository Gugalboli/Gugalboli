import { defineConfig } from 'astro/config';

// Site estático. `base` permite publicar em subpasta (GitHub Pages) sem mudar código.
export default defineConfig({
  site: 'https://example.invalid',
  base: process.env.SITE_BASE || '/',
  trailingSlash: 'ignore',
  build: { format: 'directory', inlineStylesheets: 'always' },
});
