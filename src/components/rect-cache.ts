/**
 * Caché del `getBoundingClientRect()` de un elemento.
 *
 * `Peel` lo consulta en cada `pointermove`; medir el elemento en cada evento
 * obliga al navegador a recalcular el diseño decenas de veces por segundo.
 * Aquí solo se vuelve a medir cuando algo pudo moverlo: un cambio de tamaño
 * del propio elemento, de la ventana o un desplazamiento.
 *
 * Lo importa `canvasui/Peel.tsx` con la ruta `../rect-cache`, que es la que
 * espera el registro de canvas-ui; por eso vive aquí y no en `src/lib/`.
 */

export interface RectCache {
  /** Último rectángulo medido. Se recalcula al leerlo si quedó obsoleto. */
  readonly current: DOMRect;
  /** Deja de observar el elemento y la ventana. */
  destroy: () => void;
}

export function createRectCache(element: Element): RectCache {
  let rect = element.getBoundingClientRect();
  let obsoleto = false;

  const invalidar = () => {
    obsoleto = true;
  };

  const observador = new ResizeObserver(invalidar);
  observador.observe(element);

  // En fase de captura para enterarnos también del scroll de contenedores
  // intermedios, no solo del de la ventana.
  window.addEventListener('scroll', invalidar, { passive: true, capture: true });
  window.addEventListener('resize', invalidar, { passive: true });

  return {
    get current() {
      if (obsoleto) {
        rect = element.getBoundingClientRect();
        obsoleto = false;
      }
      return rect;
    },
    destroy() {
      observador.disconnect();
      window.removeEventListener('scroll', invalidar, { capture: true });
      window.removeEventListener('resize', invalidar);
    },
  };
}
