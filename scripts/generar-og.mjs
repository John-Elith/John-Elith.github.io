/**
 * Genera las imágenes de marca a partir de SVG:
 *
 *   public/og.png               1200×630 — miniatura al compartir el enlace
 *   public/apple-touch-icon.png  180×180 — icono en la pantalla de inicio iOS
 *
 * Ejecutar con:  npm run og
 *
 * Usa `sharp`, que ya viene con Astro para optimizar imágenes, así que no
 * añade ninguna dependencia nueva al proyecto.
 *
 * Las tipografías se dibujan con la familia genérica del sistema: al
 * rasterizar, sharp usa las fuentes instaladas en la máquina, no las del
 * proyecto. Si quieres que coincida exactamente con la web, exporta la
 * imagen desde Figma y guárdala tú mismo como public/og.png.
 */

import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const RAIZ = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const PUBLICO = resolve(RAIZ, 'public');

/* Estos valores deben coincidir con src/data/perfil.ts. Se duplican aquí a
   propósito: este script se ejecuta con Node puro y no puede importar
   TypeScript sin un paso de compilación extra. */
const DATOS = {
  nombre: 'John Elith',
  iniciales: 'JE',
  titular: 'Desarrollador de software Full Stack',
  stack: 'C#  ·  .NET  ·  SQL Server  ·  ASP.NET Core',
  dominio: 'john-elith.github.io',
};

/** Escapa el texto que se inserta en el SVG. */
const esc = (t) =>
  String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/* ── Miniatura para redes sociales ──────────────────────────────────────
   Reproduce las mismas capas que el fondo del sitio: degradado base,
   halos verdes, viñeta y un monograma a la derecha.                      */
const svgOg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="base" x1="0.1" y1="0" x2="0.75" y2="1">
      <stop offset="0"    stop-color="#5d6f66"/>
      <stop offset="0.34" stop-color="#37423d"/>
      <stop offset="0.72" stop-color="#1c211f"/>
      <stop offset="1"    stop-color="#050606"/>
    </linearGradient>

    <radialGradient id="halo" cx="0.28" cy="0.3" r="0.6">
      <stop offset="0"   stop-color="#64a586" stop-opacity="0.42"/>
      <stop offset="1"   stop-color="#64a586" stop-opacity="0"/>
    </radialGradient>

    <radialGradient id="luz" cx="0.55" cy="0" r="0.5">
      <stop offset="0" stop-color="#ffffff" stop-opacity="0.2"/>
      <stop offset="1" stop-color="#ffffff" stop-opacity="0"/>
    </radialGradient>

    <radialGradient id="vinieta" cx="0.5" cy="0.5" r="0.75">
      <stop offset="0.35" stop-color="#000000" stop-opacity="0"/>
      <stop offset="1"    stop-color="#000000" stop-opacity="0.75"/>
    </radialGradient>

    <linearGradient id="acento" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0"    stop-color="#8fd3ae"/>
      <stop offset="0.55" stop-color="#64a586"/>
      <stop offset="1"    stop-color="#3f7a60"/>
    </linearGradient>
  </defs>

  <rect width="1200" height="630" fill="url(#base)"/>
  <rect width="1200" height="630" fill="url(#halo)"/>
  <rect width="1200" height="630" fill="url(#luz)"/>
  <rect width="1200" height="630" fill="url(#vinieta)"/>

  <!-- Pastilla de disponibilidad -->
  <rect x="80" y="150" width="266" height="44" rx="22"
        fill="#64a586" fill-opacity="0.16" stroke="#64a586" stroke-opacity="0.45"/>
  <circle cx="106" cy="172" r="5" fill="#8fd3ae"/>
  <text x="124" y="179" font-family="Segoe UI, Helvetica, Arial, sans-serif"
        font-size="19" fill="#8fd3ae">Disponible para proyectos</text>

  <!-- Nombre -->
  <text x="80" y="286" font-family="Segoe UI, Helvetica, Arial, sans-serif"
        font-size="82" font-weight="700" fill="#eef0ef" letter-spacing="-2">${esc(DATOS.nombre)}</text>

  <!-- Titular -->
  <text x="80" y="348" font-family="Segoe UI, Helvetica, Arial, sans-serif"
        font-size="36" font-weight="600" fill="#8fd3ae">${esc(DATOS.titular)}</text>

  <!-- Stack -->
  <text x="80" y="404" font-family="Consolas, Menlo, monospace"
        font-size="24" fill="#a5b3ac">${esc(DATOS.stack)}</text>

  <!-- Regla y dominio -->
  <rect x="80" y="452" width="120" height="3" rx="2" fill="#64a586"/>
  <text x="80" y="512" font-family="Consolas, Menlo, monospace"
        font-size="24" fill="#eef0ef" opacity="0.72">${esc(DATOS.dominio)}</text>

  <!-- Monograma -->
  <g transform="translate(880 195)">
    <rect width="240" height="240" rx="56" fill="#eef0ef" fill-opacity="0.05"
          stroke="#eef0ef" stroke-opacity="0.16"/>
    <rect x="26" y="26" width="188" height="188" rx="44" fill="url(#acento)"/>
    <text x="120" y="152" text-anchor="middle"
          font-family="Segoe UI, Helvetica, Arial, sans-serif"
          font-size="104" font-weight="700" fill="#050606">${esc(DATOS.iniciales)}</text>
  </g>
</svg>`;

/* ── Icono para iOS ───────────────────────────────────────────────────── */
const svgIcono = `
<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 180 180">
  <defs>
    <linearGradient id="a" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0"    stop-color="#8fd3ae"/>
      <stop offset="0.55" stop-color="#64a586"/>
      <stop offset="1"    stop-color="#3f7a60"/>
    </linearGradient>
  </defs>
  <rect width="180" height="180" fill="#1c211f"/>
  <rect x="10" y="10" width="160" height="160" rx="38" fill="url(#a)"/>
  <text x="90" y="122" text-anchor="middle"
        font-family="Segoe UI, Helvetica, Arial, sans-serif"
        font-size="84" font-weight="700" fill="#050606">${esc(DATOS.iniciales)}</text>
</svg>`;

async function generar() {
  await mkdir(PUBLICO, { recursive: true });

  const salidas = [
    { svg: svgOg, archivo: 'og.png', etiqueta: '1200×630 (redes sociales)' },
    { svg: svgIcono, archivo: 'apple-touch-icon.png', etiqueta: '180×180 (iOS)' },
  ];

  for (const { svg, archivo, etiqueta } of salidas) {
    const png = await sharp(Buffer.from(svg)).png({ quality: 90 }).toBuffer();
    await writeFile(resolve(PUBLICO, archivo), png);
    console.log(`  ✓ public/${archivo}  —  ${etiqueta}`);
  }

  console.log('\nListo. Comprueba cómo se ve al compartir en:');
  console.log('  https://www.opengraph.xyz/');
}

generar().catch((error) => {
  console.error('No se pudieron generar las imágenes:', error);
  process.exitCode = 1;
});
