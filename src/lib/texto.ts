/**
 * Utilidades de texto.
 */

/** Escapa los caracteres que tendrían significado como HTML. */
function escapar(texto: string): string {
  return texto
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * Convierte el subconjunto de Markdown que usamos en `perfil.ts` a HTML.
 * Solo admite **negrita** y *cursiva* — suficiente para resaltar tecnologías
 * dentro de un párrafo, y poco como para no necesitar un parser entero.
 *
 * Escapa primero y aplica el formato después, así el texto del perfil nunca
 * puede inyectar etiquetas por accidente.
 */
export function formatoSimple(texto: string): string {
  return escapar(texto)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/g, '<em>$1</em>');
}

/**
 * Devuelve el rango de copyright: «2024» si el año de inicio es el actual,
 * «2024–2026» si ya ha pasado tiempo.
 */
export function rangoAnios(desde: number): string {
  const ahora = new Date().getFullYear();
  return desde >= ahora ? `${ahora}` : `${desde}–${ahora}`;
}
