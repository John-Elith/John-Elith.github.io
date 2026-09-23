# Portafolio — John Elith

Sitio web personal construido con [Astro](https://astro.build). Genera HTML
estático puro: sin servidor, sin base de datos y sin JavaScript obligatorio
para ver el contenido.

---

## Arrancar

```bash
npm install     # solo la primera vez
npm run dev     # http://localhost:4321
```

| Comando           | Qué hace                                                        |
| ----------------- | --------------------------------------------------------------- |
| `npm run dev`     | Servidor de desarrollo con recarga automática                    |
| `npm run build`   | Genera el sitio final en `dist/`                                 |
| `npm run preview` | Sirve `dist/` tal como se verá en producción                     |
| `npm run check`   | Comprueba tipos y errores en los `.astro`                        |
| `npm run og`      | Regenera `public/og.png` y `public/apple-touch-icon.png`         |

---

## Lo primero que tienes que hacer

### 1. Rellenar tus datos

Todo el contenido del sitio está en **un solo archivo**:

```
src/data/perfil.ts
```

Nombre, biografía, experiencia, proyectos, redes, hobbies, correo, SEO… todo.
Los textos de ejemplo están marcados con `// TODO`. Cambia ahí y la web entera
se actualiza: menú, títulos, pie de página, datos de Google y tarjetas para
compartir incluidos.

### 2. Poner tu dominio

Cuando lo tengas, cámbialo en **tres sitios**:

| Archivo                  | Qué cambiar                                    |
| ------------------------ | ---------------------------------------------- |
| `astro.config.mjs`       | La constante `SITE`                            |
| `public/robots.txt`      | La línea `Sitemap:`                            |
| `scripts/generar-og.mjs` | `DATOS.dominio` (y luego ejecuta `npm run og`) |

Es imprescindible: sin un dominio absoluto, las miniaturas de WhatsApp y
LinkedIn no aparecen y el sitemap sale mal.

### 3. Añadir tus archivos

Colócalos en `public/`:

| Archivo                     | Para qué                      | Recomendación             |
| --------------------------- | ----------------------------- | ------------------------- |
| `perfil.jpg`                | Tu foto del hero              | 800×1000 px, `.webp`/`.jpg` |
| `cv-john-elith.pdf`         | El CV descargable             | PDF, menos de 2 MB        |
| `proyectos/*.jpg`           | Capturas de proyectos         | 1200×750 px               |

Mientras no existan, el sitio **no los enlaza**: en lugar de una imagen rota
verás el monograma «JE», y el botón de descargar CV no aparece. Se comprueba
durante el build, así que basta con dejar el archivo en su sitio y volver a
compilar.

### 4. Activar el formulario de contacto

Tal como está, el formulario abre el cliente de correo del usuario con el
mensaje ya redactado. Funciona, pero es más elegante recibirlo directamente:

1. Crea una cuenta gratis en [Formspree](https://formspree.io) o
   [Web3Forms](https://web3forms.com).
2. Copia la URL del endpoint que te dan.
3. Pégala en `contacto.endpointFormulario` dentro de `src/data/perfil.ts`.

El envío pasa a hacerse en segundo plano, sin recargar la página.

---

## Estructura

```
src/
├─ data/perfil.ts          ← TU CONTENIDO (lo único que sueles tocar)
├─ lib/
│  ├─ iconos.ts            Registro de SVG. Añade iconos aquí.
│  ├─ texto.ts             Formato de texto y rango de años
│  └─ archivos.ts          Comprueba en el build si un archivo existe
├─ styles/
│  ├─ tokens.css           Color, tipografía, espaciado, curvas de animación
│  ├─ base.css             Reinicio, tipografía y utilidades de maquetación
│  ├─ componentes.css      Cristal, botones, etiquetas, formularios
│  ├─ animaciones.css      Fotogramas clave y aparición al hacer scroll
│  └─ global.css           Une los cuatro anteriores
├─ components/
│  ├─ Icon.astro           <Icon nombre="github" />
│  ├─ Boton.astro          <Boton href="…" variante="primario">…</Boton>
│  ├─ Seccion.astro        Envoltorio con antetítulo + título + subtítulo
│  ├─ Fondo.astro          Las 6 capas del degradado de marca
│  ├─ Navegacion.astro     Carril lateral / menú móvil
│  ├─ Hero.astro           Presentación
│  ├─ SobreMi.astro        Biografía, cifras y habilidades
│  ├─ Experiencia.astro    Línea de tiempo
│  ├─ Proyectos.astro      Rejilla de tarjetas
│  ├─ Redes.astro          Tarjetas de redes sociales
│  ├─ Hobbies.astro        Rejilla de intereses
│  ├─ Contacto.astro       Datos + formulario
│  └─ Pie.astro            Pie de página y botón «volver arriba»
├─ layouts/Base.astro      <head> completo: SEO, Open Graph y JSON-LD
├─ pages/index.astro       Ensambla las secciones
└─ scripts/interacciones.ts Todo el JavaScript del sitio
```

### Cómo añadir una sección nueva

1. Añade sus datos en `src/data/perfil.ts`.
2. Añade una entrada al array `navegacion` (id, etiqueta e icono).
3. Crea el componente usando `<Seccion id="mi-id" …>` como envoltorio.
4. Colócalo en `src/pages/index.astro` **en el mismo orden** que en `navegacion`.

El menú, el ancla y el resaltado de la sección activa funcionan solos.

---

## Sistema de diseño

**Paleta** — sacada del degradado de fondo. Está en `src/styles/tokens.css`:

| Token             | Color     | Uso                          |
| ----------------- | --------- | ---------------------------- |
| `--c-hueso`       | `#eef0ef` | Texto principal              |
| `--c-salvia`      | `#a5b3ac` | Texto secundario             |
| `--c-musgo`       | `#5d6f66` | Bordes y superficies medias  |
| `--c-pizarra`     | `#37423d` | Fondos de tarjeta            |
| `--c-tinta`       | `#1c211f` | Fondo base                   |
| `--c-vacio`       | `#050606` | El extremo oscuro            |
| `--c-acento`      | `#64a586` | El verde de la marca         |
| `--c-acento-claro`| `#8fd3ae` | Hovers, enlaces, resaltados  |

**Glassmorphism** — la clase `.vidrio` da el panel translúcido; añade
`.vidrio--interactivo` para que reaccione al cursor con un foco de luz y un
borde iluminado que lo siguen. Hay respaldo para navegadores sin
`backdrop-filter`: el panel se vuelve más opaco y sigue leyéndose bien.

**Movimiento** — nada se desplaza más de ~24 px ni dura más de ~700 ms. Todo
respeta `prefers-reduced-motion`: si el sistema del usuario pide menos
movimiento, las animaciones se desactivan y el contenido aparece directamente.

---

## Sobre el fondo

`src/components/Fondo.astro` reproduce el degradado de la marca en seis capas
(base, manchas desenfocadas, partículas, halos, viñeta y grano).

El degradado original va de `#eef0ef` (casi blanco) a `#050606`. Está
reescalado al 218 % y anclado abajo para que la franja clara quede por encima
del borde de la pantalla: así el texto claro mantiene un contraste de ~9:1 en
toda la página. Si prefieres el rango completo, el comentario dentro del
archivo explica exactamente qué dos valores cambiar (y que tendrás que oscurecer
el texto de las secciones superiores).

---

## Publicar

### GitHub Pages (lo que usa este repositorio)

Ya está configurado. El repositorio se llama `John-Elith.github.io`, así que
la web se sirve en la raíz del dominio:

    https://john-elith.github.io

Cada envío a `main` dispara `.github/workflows/desplegar.yml`, que compila el
proyecto en los servidores de GitHub y lo publica. No hay que subir `dist/`:
sigue ignorada.

Requisito, una sola vez: en **Settings → Pages**, poner «Source» en
**GitHub Actions**.

Para ver cómo va un despliegue, o relanzarlo a mano, está la pestaña
**Actions** del repositorio.

### Otros servicios

El sitio es estático, así que sirve cualquier hosting. Los tres gratuitos más
cómodos, todos con HTTPS y dominio propio incluidos:

**Netlify / Vercel / Cloudflare Pages**

1. Sube el proyecto a un repositorio de GitHub.
2. Conéctalo desde el panel del proveedor.
3. Configuración de build:
   - Comando: `npm run build`
   - Carpeta de salida: `dist`
4. En «Dominios», añade el tuyo y apunta los DNS donde te indiquen.

**Hosting propio o IIS** — ejecuta `npm run build` y copia el contenido de
`dist/` a la raíz del servidor. No hace falta Node en producción: son
archivos estáticos.

> Recuerda actualizar `SITE` en `astro.config.mjs` **antes** de compilar para
> producción.

---

## Comprobaciones antes de publicar

- [ ] Datos reales en `src/data/perfil.ts` (sin ningún `TODO`)
- [ ] Dominio actualizado en `astro.config.mjs`, `robots.txt` y `generar-og.mjs`
- [ ] `npm run og` ejecutado después de cambiar el dominio o el nombre
- [ ] Foto en `public/perfil.jpg` y CV en `public/`
- [ ] Endpoint del formulario configurado
- [ ] Enlaces de redes y proyectos apuntando a tus URLs reales
- [ ] Previsualizar cómo se comparte en [opengraph.xyz](https://www.opengraph.xyz/)
- [ ] Pasar [PageSpeed Insights](https://pagespeed.web.dev/)
- [ ] Dar de alta el sitio en [Google Search Console](https://search.google.com/search-console)
      y enviar `https://tudominio.com/sitemap-index.xml`
