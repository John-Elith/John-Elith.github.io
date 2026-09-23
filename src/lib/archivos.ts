import { existsSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';

/**
 * Carpeta `public/` del proyecto.
 *
 * Se resuelve desde el directorio de trabajo, no desde `import.meta.url`:
 * durante `astro build` este archivo se empaqueta en otra carpeta, así que
 * una ruta relativa al módulo acaba apuntando fuera del proyecto — y entonces
 * todo parece no existir, de modo que ni la foto ni el CV se enlazaban nunca
 * en el sitio compilado (en `astro dev` sí funcionaba, y por eso no cantaba).
 */
const PUBLICO = new URL('public/', pathToFileURL(`${process.cwd()}/`));

/**
 * ¿Existe realmente este archivo en `public/`?
 *
 * Se ejecuta durante el build (Node), nunca en el navegador. Sirve para que
 * el sitio funcione bien ANTES de que pongas tus recursos: mientras no
 * exista `public/perfil.jpg`, en vez de un icono de imagen rota y un 404 en
 * la consola, se muestra el monograma; y el botón de descargar CV
 * simplemente no aparece hasta que subas el PDF.
 *
 * Las URLs externas se dan por buenas: no vamos a hacer una petición de red
 * en cada compilación para comprobarlas.
 */
export function existeEnPublico(ruta: string | null | undefined): boolean {
  if (!ruta) return false;
  if (/^(https?:)?\/\//.test(ruta)) return true;

  const relativa = ruta.replace(/^\//, '').split(/[?#]/)[0];
  if (!relativa) return false;

  return existsSync(fileURLToPath(new URL(relativa, PUBLICO)));
}
