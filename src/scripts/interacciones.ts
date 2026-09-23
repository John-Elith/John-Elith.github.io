/* ══════════════════════════════════════════════════════════════════════════
   INTERACCIONES
   ──────────────────────────────────────────────────────────────────────────
   Todo el JavaScript del sitio. Está dividido en funciones independientes:
   cada una busca sus elementos y, si no los encuentra, se retira sin hacer
   ruido. Así una sección que se elimine de `index.astro` no rompe el resto.

   Principio general: la página debe funcionar sin este archivo. Aquí solo
   hay mejoras — nada de contenido ni de navegación esencial.
   ══════════════════════════════════════════════════════════════════════════ */

const ESCRITORIO = 1024;

/** ¿El usuario ha pedido menos movimiento en su sistema operativo? */
const menosMovimiento = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ─────────────────────────  MENÚ MÓVIL  ───────────────────────── */

function iniciarMenu(): void {
  const boton = document.querySelector<HTMLButtonElement>('#alternar-menu');
  const panel = document.querySelector<HTMLElement>('#menu-principal');
  const velo = document.querySelector<HTMLElement>('[data-cerrar-menu]');
  if (!boton || !panel || !velo) return;

  // Guardamos quién tenía el foco para devolvérselo al cerrar.
  let focoPrevio: HTMLElement | null = null;

  const estaAbierto = () => document.body.dataset.menuAbierto === 'true';

  const abrir = () => {
    focoPrevio = document.activeElement as HTMLElement | null;
    document.body.dataset.menuAbierto = 'true';
    boton.setAttribute('aria-expanded', 'true');
    boton.setAttribute('aria-label', 'Cerrar menú de navegación');
    velo.hidden = false;
    // Espera al primer fotograma para que el panel ya esté visible cuando
    // movemos el foco; enfocar algo invisible confunde a los lectores.
    requestAnimationFrame(() => {
      panel.querySelector<HTMLElement>('a, button')?.focus();
    });
  };

  const cerrar = ({ devolverFoco = true } = {}) => {
    if (!estaAbierto()) return;
    document.body.dataset.menuAbierto = 'false';
    boton.setAttribute('aria-expanded', 'false');
    boton.setAttribute('aria-label', 'Abrir menú de navegación');
    // El velo se oculta al terminar el desvanecido, no antes.
    window.setTimeout(() => {
      if (!estaAbierto()) velo.hidden = true;
    }, 400);
    if (devolverFoco) focoPrevio?.focus();
  };

  boton.addEventListener('click', () => (estaAbierto() ? cerrar() : abrir()));
  velo.addEventListener('click', () => cerrar());

  // Al elegir un destino, el menú sobra: estorbaría al aterrizar.
  // Delegado en el panel: <Peel> puede volver a montar los enlaces al
  // hidratarse, y un listener puesto en cada uno se perdería.
  panel.addEventListener('click', (e) => {
    if ((e.target as HTMLElement | null)?.closest('a[href^="#"]')) {
      cerrar({ devolverFoco: false });
    }
  });

  document.addEventListener('keydown', (e) => {
    if (!estaAbierto()) return;

    if (e.key === 'Escape') {
      cerrar();
      return;
    }

    // Mientras el panel está abierto tapando la página, el tabulador debe
    // quedarse dentro; si no, se navega a ciegas por lo que hay detrás.
    if (e.key !== 'Tab') return;

    const focos = [
      ...panel.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'),
    ].filter((el) => el.offsetParent !== null);
    if (focos.length === 0) return;

    const primero = focos[0]!;
    const ultimo = focos[focos.length - 1]!;

    if (e.shiftKey && document.activeElement === primero) {
      e.preventDefault();
      ultimo.focus();
    } else if (!e.shiftKey && document.activeElement === ultimo) {
      e.preventDefault();
      primero.focus();
    }
  });

  // Al pasar a escritorio el panel deja de ser un diálogo y se convierte en
  // el carril fijo: hay que soltar el bloqueo de scroll y el foco atrapado.
  window.matchMedia(`(min-width: ${ESCRITORIO}px)`).addEventListener('change', (e) => {
    if (e.matches) cerrar({ devolverFoco: false });
  });
}

/* ─────────────────  APARICIÓN AL HACER SCROLL  ───────────────── */

function iniciarRevelado(): void {
  const elementos = document.querySelectorAll<HTMLElement>('[data-revelar]');
  if (elementos.length === 0) return;

  // Sin IntersectionObserver (o sin ganas de animaciones), lo mostramos todo.
  if (!('IntersectionObserver' in window) || menosMovimiento()) {
    elementos.forEach((el) => el.classList.add('visible'));
    return;
  }

  const observador = new IntersectionObserver(
    (entradas) => {
      for (const entrada of entradas) {
        if (!entrada.isIntersecting) continue;
        entrada.target.classList.add('visible');
        // Una sola vez: reanimar al volver a subir marea y cuesta batería.
        observador.unobserve(entrada.target);
      }
    },
    { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
  );

  elementos.forEach((el) => observador.observe(el));
}

/* ───────────  SECCIÓN ACTIVA, BARRA Y BOTÓN «ARRIBA»  ─────────── */

function iniciarScroll(): void {
  // Los enlaces se vuelven a buscar en cada actualización: <Peel> puede
  // sustituirlos al hidratarse. Las secciones, en cambio, no cambian.
  const buscarEnlaces = () =>
    document.querySelectorAll<HTMLAnchorElement>('[data-enlace-seccion]');
  const enlaces = [...buscarEnlaces()];
  const barra = document.querySelector<HTMLElement>('[data-barra]');
  const arriba = document.querySelector<HTMLButtonElement>('[data-arriba]');

  const secciones = enlaces
    .map((a) => document.getElementById(a.dataset.enlaceSeccion!))
    .filter((s): s is HTMLElement => s !== null);

  let pendiente = false;

  const actualizar = () => {
    pendiente = false;
    const y = window.scrollY;

    // ── Barra superior: sólida en cuanto la página se ha movido un poco.
    if (barra) barra.dataset.desplazado = String(y > 12);

    // ── Botón «volver arriba»: aparece pasada una pantalla.
    if (arriba) arriba.dataset.visible = String(y > window.innerHeight * 0.7);

    if (secciones.length === 0) return;

    // ── Sección activa: la última cuyo inicio ha pasado el 38 % superior
    // de la ventana. Es el punto donde el ojo suele estar leyendo.
    const referencia = y + window.innerHeight * 0.38;
    let activa: string | null = null;

    for (const seccion of secciones) {
      const inicio = seccion.getBoundingClientRect().top + y;
      if (inicio <= referencia) activa = seccion.id;
    }

    // Al final del documento siempre gana la última sección: si es corta,
    // nunca llegaría a cruzar la línea de referencia por sí sola.
    const finDocumento =
      window.innerHeight + y >= document.documentElement.scrollHeight - 8;
    if (finDocumento) activa = secciones[secciones.length - 1]!.id;

    for (const enlace of buscarEnlaces()) {
      const esActiva = enlace.dataset.enlaceSeccion === activa;
      // `aria-current` se quita del todo: dejarlo en "false" hace que
      // algunos lectores de pantalla lo sigan anunciando.
      if (esActiva) enlace.setAttribute('aria-current', 'true');
      else enlace.removeAttribute('aria-current');
    }
  };

  // El scroll dispara muchísimos eventos; agrupamos en un fotograma.
  const alDesplazar = () => {
    if (pendiente) return;
    pendiente = true;
    requestAnimationFrame(actualizar);
  };

  window.addEventListener('scroll', alDesplazar, { passive: true });
  window.addEventListener('resize', alDesplazar, { passive: true });
  actualizar();

  arriba?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: menosMovimiento() ? 'auto' : 'smooth' });
  });
}

/* ──────────────  FOCO DE LUZ QUE SIGUE AL CURSOR  ────────────── */

function iniciarBrillo(): void {
  const tarjetas = document.querySelectorAll<HTMLElement>('[data-brillo]');
  if (tarjetas.length === 0) return;

  // En pantallas táctiles no hay cursor al que seguir; y quien pide menos
  // movimiento tampoco quiere una luz persiguiéndole.
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  if (menosMovimiento()) return;

  for (const tarjeta of tarjetas) {
    tarjeta.addEventListener(
      'pointermove',
      (e) => {
        const caja = tarjeta.getBoundingClientRect();
        tarjeta.style.setProperty('--mx', `${e.clientX - caja.left}px`);
        tarjeta.style.setProperty('--my', `${e.clientY - caja.top}px`);
      },
      { passive: true }
    );

    // Al salir, la luz vuelve al centro para que el desvanecido no "salte".
    tarjeta.addEventListener('pointerleave', () => {
      tarjeta.style.setProperty('--mx', '50%');
      tarjeta.style.setProperty('--my', '50%');
    });
  }
}

/* ──────────────────────  ONDA AL PULSAR  ────────────────────── */

function iniciarOndas(): void {
  if (menosMovimiento()) return;

  document.addEventListener('pointerdown', (e) => {
    const objetivo = (e.target as HTMLElement | null)?.closest<HTMLElement>('[data-onda]');
    if (!objetivo) return;

    const caja = objetivo.getBoundingClientRect();
    // Diámetro suficiente para cubrir el botón desde cualquier esquina.
    const tam = Math.max(caja.width, caja.height) * 1.1;

    const onda = document.createElement('span');
    onda.className = 'onda';
    onda.style.width = onda.style.height = `${tam}px`;
    onda.style.left = `${e.clientX - caja.left - tam / 2}px`;
    onda.style.top = `${e.clientY - caja.top - tam / 2}px`;

    onda.addEventListener('animationend', () => onda.remove(), { once: true });
    objetivo.appendChild(onda);
  });
}

/* ──────────────────  ROTACIÓN DE ESPECIALIDADES  ────────────── */

function iniciarRoles(): void {
  const elemento = document.querySelector<HTMLElement>('[data-roles]');
  if (!elemento) return;

  let roles: string[] = [];
  try {
    roles = JSON.parse(elemento.dataset.roles ?? '[]');
  } catch {
    return;
  }
  // Con un solo rol no hay nada que rotar; se queda el que ya está escrito.
  if (roles.length < 2 || menosMovimiento()) return;

  const VISIBLE = 2600;
  const TRANSICION = 380;
  let i = 0;
  let temporizador: number | undefined;

  const siguiente = () => {
    i = (i + 1) % roles.length;

    // 1. sale hacia arriba
    elemento.dataset.fase = 'sale';

    window.setTimeout(() => {
      // 2. cambia el texto y se coloca abajo, sin transición
      elemento.textContent = roles[i]!;
      elemento.dataset.fase = 'entra';

      // 3. fuerza el recálculo para que el navegador no fusione los pasos
      //    2 y 3 en uno solo (si no, el texto aparecería sin animarse)
      void elemento.offsetWidth;

      // 4. sube a su sitio
      delete elemento.dataset.fase;
    }, TRANSICION);
  };

  const arrancar = () => {
    temporizador = window.setInterval(siguiente, VISIBLE + TRANSICION);
  };
  const parar = () => {
    window.clearInterval(temporizador);
    temporizador = undefined;
  };

  arrancar();

  // Si la pestaña no está a la vista, el ciclo no aporta nada: lo paramos
  // para no gastar batería en segundo plano.
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) parar();
    else if (!temporizador) arrancar();
  });
}

/* ───────────────────  COPIAR AL PORTAPAPELES  ─────────────────── */

function iniciarCopiar(): void {
  const botones = document.querySelectorAll<HTMLButtonElement>('[data-copiar]');

  for (const boton of botones) {
    boton.addEventListener('click', async () => {
      const valor = boton.dataset.copiar ?? '';
      const etiquetaOriginal = boton.getAttribute('aria-label') ?? '';

      try {
        await navigator.clipboard.writeText(valor);
      } catch {
        // `navigator.clipboard` no existe fuera de HTTPS (ni en localhost sin
        // permiso). Recurrimos al método antiguo con un campo temporal.
        const temp = document.createElement('textarea');
        temp.value = valor;
        temp.setAttribute('readonly', '');
        temp.style.position = 'fixed';
        temp.style.opacity = '0';
        document.body.appendChild(temp);
        temp.select();
        try {
          // API obsoleta, pero es el único respaldo que existe fuera de un
          // contexto seguro. El cast evita el aviso de deprecación de TS.
          (document as Document & { execCommand(c: string): boolean }).execCommand('copy');
        } catch {
          return;
        } finally {
          temp.remove();
        }
      }

      boton.classList.add('copiado');
      boton.setAttribute('aria-label', 'Copiado al portapapeles');

      window.setTimeout(() => {
        boton.classList.remove('copiado');
        boton.setAttribute('aria-label', etiquetaOriginal);
      }, 1800);
    });
  }
}

/* ─────────────────────────  FORMULARIO  ───────────────────────── */

function iniciarFormulario(): void {
  const form = document.querySelector<HTMLFormElement>('[data-formulario]');
  if (!form) return;

  const aviso = form.querySelector<HTMLElement>('[data-aviso]');
  const boton = form.querySelector<HTMLButtonElement>('button[type="submit"]');
  const contador = form.querySelector<HTMLElement>('[data-contador]');
  const mensaje = form.querySelector<HTMLTextAreaElement>('#c-mensaje');
  const endpoint = form.dataset.endpoint || '';
  const correo = form.dataset.correo || '';

  // Contador de caracteres del mensaje.
  if (contador && mensaje) {
    const refrescar = () => (contador.textContent = String(mensaje.value.length));
    mensaje.addEventListener('input', refrescar);
    refrescar();
  }

  const mostrar = (texto: string, tipo: 'ok' | 'error') => {
    if (!aviso) return;
    aviso.textContent = texto;
    aviso.classList.remove('aviso--ok', 'aviso--error');
    aviso.classList.add(`aviso--${tipo}`);
    aviso.hidden = false;
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // A partir del primer intento sí marcamos en rojo lo que falte.
    form.dataset.validado = 'true';

    if (!form.checkValidity()) {
      const primerFallo = form.querySelector<HTMLElement>(':invalid');
      primerFallo?.focus();
      mostrar('Revisa los campos marcados antes de enviar.', 'error');
      return;
    }

    const datos = new FormData(form);

    // Trampa antispam activada: cortamos sin avisar al bot.
    if (String(datos.get('_gotcha') ?? '').trim() !== '') return;

    // ── Sin endpoint: abrimos el cliente de correo del usuario ──────────
    if (!endpoint) {
      const asunto = String(datos.get('asunto') || 'Contacto desde la web');
      const cuerpo =
        `Nombre: ${datos.get('nombre')}\n` +
        `Correo: ${datos.get('email')}\n\n` +
        `${datos.get('mensaje')}`;
      window.location.href =
        `mailto:${correo}?subject=${encodeURIComponent(asunto)}` +
        `&body=${encodeURIComponent(cuerpo)}`;
      mostrar('Abriendo tu aplicación de correo para completar el envío…', 'ok');
      return;
    }

    // ── Con endpoint: envío en segundo plano ────────────────────────────
    boton?.setAttribute('aria-disabled', 'true');
    // Guardamos el HTML, no el texto: dentro del botón hay un <svg> que
    // `textContent` borraría para siempre al restaurarlo.
    const contenidoBoton = boton?.innerHTML ?? '';
    if (boton) boton.textContent = 'Enviando…';

    try {
      const respuesta = await fetch(endpoint, {
        method: 'POST',
        body: datos,
        headers: { Accept: 'application/json' },
      });

      if (!respuesta.ok) throw new Error(`HTTP ${respuesta.status}`);

      form.reset();
      form.dataset.validado = 'false';
      if (contador) contador.textContent = '0';
      mostrar('¡Mensaje enviado! Te responderé lo antes posible.', 'ok');
    } catch {
      mostrar(
        `No se pudo enviar el mensaje. Escríbeme directamente a ${correo}.`,
        'error'
      );
    } finally {
      boton?.removeAttribute('aria-disabled');
      if (boton && contenidoBoton) boton.innerHTML = contenidoBoton;
    }
  });
}

/* ──────────────────  RETRATO SIN ARCHIVO  ────────────────── */

function iniciarFoto(): void {
  // Mientras no exista `public/perfil.jpg`, quitamos la imagen rota para
  // que se vea el monograma que hay detrás en lugar del icono de error.
  for (const img of document.querySelectorAll<HTMLImageElement>('[data-foto], .perfil-mini__avatar img')) {
    const fallo = () => img.remove();
    img.addEventListener('error', fallo, { once: true });
    // `complete` con ancho 0 significa que ya falló antes de llegar aquí.
    if (img.complete && img.naturalWidth === 0) fallo();
  }
}

/* ─────────────────────────  ARRANQUE  ───────────────────────── */

function iniciar(): void {
  iniciarMenu();
  iniciarRevelado();
  iniciarScroll();
  iniciarBrillo();
  iniciarOndas();
  iniciarRoles();
  iniciarCopiar();
  iniciarFormulario();
  iniciarFoto();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', iniciar, { once: true });
} else {
  iniciar();
}
