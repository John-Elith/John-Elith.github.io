// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

import react from '@astrojs/react';

// Dirección pública del sitio. Es obligatoria para que el sitemap, la URL
// canónica y las imágenes de Open Graph (compartir en redes) se generen con
// URLs absolutas.
//
// Al ser un repositorio de usuario (John-Elith.github.io), GitHub Pages sirve
// la web en la raíz del dominio: no hace falta `base`. Si algún día pasas a un
// dominio propio, cambia solo esta línea (y el Sitemap de public/robots.txt y
// el dominio de scripts/generar-og.mjs).
const SITE = 'https://john-elith.github.io';

export default defineConfig({
  site: SITE,
  integrations: [sitemap(), react()],
  build: {
    inlineStylesheets: 'auto',
  },
  compressHTML: true,
});