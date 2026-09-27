/* ══════════════════════════════════════════════════════════════════════════
   PERFIL — EL ÚNICO ARCHIVO QUE NECESITAS EDITAR
   ──────────────────────────────────────────────────────────────────────────
   Todo el contenido del sitio vive aquí. Cambia estos datos y la web entera
   se actualiza sola: navegación, SEO, tarjetas para compartir en redes,
   datos estructurados de Google, secciones, etc.

   Los textos marcados con «TODO:» son de ejemplo — reemplázalos por los tuyos.
   ══════════════════════════════════════════════════════════════════════════ */

import type { NombreIcono } from '@/lib/iconos';

/* ─────────────────────────────  1. IDENTIDAD  ───────────────────────────── */

export const identidad = {
  /** Tu nombre completo. Aparece en el <title>, JSON-LD y la firma del pie. */
  nombre: 'John Elith',
  /** Nombre corto para el logo del sidebar. */
  nombreCorto: 'John',
  /** Iniciales para el avatar/monograma de respaldo. */
  iniciales: 'JE',
  /** Titular principal (el <h1> de la página). */
  titular: 'Desarrollador de software Full Stack',
  /**
   * Roles que rotan con animación bajo el titular.
   * El primero es el que se muestra si el usuario desactiva animaciones.
   */
  roles: [
    'C# · .NET Framework',
    'ASP.NET Core & Web API',
    'SQL Server & Entity Framework',
    'JavaScript · TypeScript',
    'Arquitectura limpia',
  ],
  /** Frase corta bajo el titular (1–2 líneas máximo). */
  eslogan:
    'Construyo software de negocio robusto y mantenible, del modelo de datos a la interfaz.',
  /** Ciudad y país. Se usa en el hero y en los datos estructurados. */
  ubicacion: 'Colombia',
  /** Estado de disponibilidad. Pon `null` para ocultar la píldora verde. */
  disponibilidad: 'Disponible para proyectos' as string | null,
  /**
   * Foto de perfil. Colócala en `public/` y referencia la ruta.
   * Recomendado: 800×800 px, formato .webp o .jpg.
   * Si el archivo no existe se muestra automáticamente el monograma.
   */
  foto: '/perfil.jpg',
  /** Texto alternativo de la foto (accesibilidad + SEO de imágenes). */
  fotoAlt: 'Retrato de John Elith, desarrollador de software Full Stack',
  /** CV en PDF dentro de `public/`. Pon `null` para ocultar el botón. */
  cv: '/cv-john-elith.pdf' as string | null,
};

/* ─────────────────────────────  2. SEO  ───────────────────────────── */

export const seo = {
  /**
   * Título por defecto. Regla práctica: 50–60 caracteres.
   * Formato recomendado: «Nombre — Rol principal».
   */
  titulo: `${identidad.nombre} — Desarrollador Full Stack C# / .NET`,
  /**
   * Meta descripción. 150–160 caracteres. Es el texto que Google muestra
   * bajo el título en los resultados de búsqueda.
   */
  descripcion:
    'Desarrollador de software Full Stack especializado en C#, .NET y SQL Server. Diseño y construyo aplicaciones web escalables, mantenibles y orientadas al negocio.',
  /** Palabras clave. Google las ignora, pero otros buscadores aún las leen. */
  palabrasClave: [
    'desarrollador full stack',
    'programador C#',
    '.NET Framework',
    'ASP.NET Core',
    'SQL Server',
    'desarrollador web Colombia',
    'John Elith',
  ],
  /** Idioma del sitio (código BCP-47). */
  idioma: 'es',
  /** Región, para `og:locale`. */
  locale: 'es_CO',
  /**
   * Imagen que se ve al compartir el enlace en WhatsApp, LinkedIn, X, etc.
   * DEBE medir 1200×630 px. Genérala con:  npm run og
   */
  imagenCompartir: '/og.png',
  imagenCompartirAlt: `${identidad.nombre} — Desarrollador de software Full Stack`,
  /** Usuario de X/Twitter sin la @. Pon `null` si no tienes. */
  usuarioTwitter: null as string | null,
  /** Color de la barra del navegador en móviles. */
  colorTema: '#1c211f',
};

/* ─────────────────────────────  3. NAVEGACIÓN  ───────────────────────────── */
/* El orden aquí define el orden del menú Y el orden de las secciones.        */

export const navegacion = [
  { id: 'sobre-mi', etiqueta: 'Sobre mí', icono: 'usuario' },
  { id: 'experiencia', etiqueta: 'Experiencia', icono: 'maletin' },
  { id: 'proyectos', etiqueta: 'Proyectos', icono: 'codigo' },
  { id: 'redes', etiqueta: 'Redes sociales', icono: 'compartir' },
  { id: 'hobbies', etiqueta: 'Hobbies', icono: 'chispa' },
  { id: 'contacto', etiqueta: 'Contáctame', icono: 'sobre' },
] satisfies { id: string; etiqueta: string; icono: NombreIcono }[];

/* ─────────────────────────────  4. BIOGRAFÍA  ───────────────────────────── */

export const biografia = {
  titulo: 'Biografía',
  subtitulo: '¿Quién soy y cómo trabajo?',
  /** Cada string es un párrafo. Añade o quita los que quieras. */
  parrafos: [
    // TODO: reescribe esto con tu historia real.
    'Soy desarrollador de software Full Stack con foco en el ecosistema **Microsoft**. Trabajo a diario con **C#**, **.NET** y **SQL Server** para construir sistemas de gestión que resuelven problemas reales de negocio, desde el modelado de datos hasta la interfaz que usa el cliente final.',
    'Me gusta el código que se entiende sin explicaciones: nombres claros, capas bien separadas y decisiones documentadas. Creo que un buen sistema no es el que impresiona, sino el que otro desarrollador puede mantener seis meses después sin miedo.',
    'Fuera del trabajo dedico tiempo a estudiar arquitectura de software y a experimentar con proyectos personales donde puedo romper cosas sin consecuencias. Aprendo mejor construyendo.',
  ],
  /**
   * Datos rápidos que se muestran como estadísticas.
   * Recomendado: 3 o 4 elementos.
   */
  /** Cada cifra lleva `valor` (texto grande) o `icono` en su lugar. */
  estadisticas: [
    { valor: '5+', etiqueta: 'Años programando' },
    { icono: 'check', etiqueta: 'Proyectos de calidad garantizada' },
    { valor: '12+', etiqueta: 'Tecnologías dominadas' },
  ] as { valor?: string; icono?: NombreIcono; etiqueta: string }[],
};

/* ─────────────────────────────  5. HABILIDADES  ───────────────────────────── */

export const habilidades = [
  {
    categoria: 'Backend',
    icono: 'servidor' as NombreIcono,
    items: ['C#', '.NET Framework', 'ASP.NET Core', 'Web API REST', 'Entity Framework', 'LINQ'],
  },
  {
    categoria: 'Frontend',
    icono: 'ventana' as NombreIcono,
    items: ['HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'Bootstrap'],
  },
  {
    categoria: 'Datos',
    icono: 'basedatos' as NombreIcono,
    items: ['SQL Server', 'T-SQL', 'MySQL', 'PostgreSQL', 'Procedimientos almacenados'],
  },
  {
    categoria: 'Herramientas',
    icono: 'herramienta' as NombreIcono,
    items: ['Git', 'Visual Studio', 'Docker', 'Postman'],
  },
];

/* ─────────────────────────────  6. EXPERIENCIA  ───────────────────────────── */

export const experiencia = {
  titulo: 'Experiencia',
  subtitulo: 'Mi trayectoria profesional',
  /** Ordena de más reciente a más antiguo. */
  items: [
    {
      puesto: 'Desarrollador de software independiente',
      empresa: 'Proyectos propios',
      /** Texto libre: 'Ene 2023', '2023', 'Marzo 2023'... */
      desde: '2025',
      /** Pon 'Actualidad' si sigues ahí. */
      hasta: 'Actualidad',
      ubicacion: 'Colombia',
      /** Tipo de contrato. Pon `null` para ocultarlo. */
      modalidad: 'Independiente' as string | null,
      descripcion:
        'Diseño, desarrollo y publico aplicaciones completas, de escritorio y web, que resuelven necesidades concretas de iglesias, contratistas y negocios de crédito.',
      /** Logros concretos. Usa números siempre que puedas — venden mucho más. */
      logros: [
        'Creé Coraza, software de proyección para iglesias en C# y WPF (.NET 8): funciona sin internet, se controla desde el móvil por la red local y se distribuye con instalador para Windows y versión portátil para USB.',
        'Desarrollé Kaori, aplicación de escritorio en Electron, React y TypeScript que genera los informes mensuales, las cuentas de cobro y los certificados de cumplimiento de contratos de prestación de servicios a partir de las plantillas Word de cada organización.',
        'Construí y puse en producción Créditos La Red, plataforma web para gestionar créditos y préstamos: clientes, pagos y abonos, control de mora y notificaciones en tiempo real.',
      ],
      tecnologias: ['C#', '.NET 8', 'WPF', 'Electron', 'React', 'TypeScript'],
    },
    {
      puesto: 'Desarrollador en formación',
      empresa: 'Proyectos académicos y personales',
      desde: '2023',
      hasta: '2025',
      ubicacion: 'Colombia',
      modalidad: null,
      descripcion:
        'Aprendí construyendo: aplicaciones de escritorio, sistemas CRUD y sitios web en varios lenguajes, todos publicados en GitHub.',
      logros: [
        'Aplicaciones de escritorio en C# y WPF conectadas a SQL Server, como un sistema de registro y gestión de estudiantes.',
        'Sistemas CRUD de usuarios en PHP y en Java, y utilidades en C# como un carrito de compras con cálculo de IVA y un registro de gastos personales.',
        'Sitios web con HTML, SCSS, JavaScript y TypeScript: landing pages, una tienda de productos y FacilFinanzas, una aplicación de finanzas personales.',
      ],
      tecnologias: ['C#', 'WPF', 'SQL Server', 'PHP', 'Java', 'JavaScript', 'TypeScript'],
    },
  ],
};

/* ─────────────────────────────  7. PROYECTOS  ───────────────────────────── */

export const proyectos = {
  titulo: 'Proyectos',
  subtitulo: 'Cosas que he construido',
  items: [
    {
      nombre: 'Kaori',
      /** Una línea. Lo que hace y para quién. */
      resumen:
        'Genera en Word los informes mensuales de contratos de prestación de servicios.',
      /** Descripción algo más larga que aparece en la tarjeta. */
      descripcion:
        'Aplicación de escritorio que registra el contrato una vez y produce el informe de actividades, la cuenta de cobro y el certificado de cumplimiento de cualquier mes: calcula pagos, acumulados y saldos, y escribe fechas y cifras en letras. Parte de las plantillas Word de cada organización, así que los documentos salen con su formato intacto.',
      tecnologias: ['Electron', 'React', 'TypeScript', 'Tailwind CSS'],
      /** Imagen en `public/proyectos/`. 1200×750 px recomendado. `null` = degradado. */
      imagen: '/proyectos/kaori.jpg' as string | null,
      /** Enlaces. Pon `null` en los que no apliquen. */
      repo: 'https://github.com/John-Elith/Kaori' as string | null,
      demo: null as string | null,
      /** Texto del enlace `demo`. `null` = «Ver demo». */
      textoDemo: null as string | null,
      /** Marca `true` en 1 o 2 para que ocupen el doble de ancho. */
      destacado: true,
      /** Año o rango. */
      anio: '2026',
    },
    {
      nombre: 'Coraza',
      resumen: 'Proyector de canciones, versículos e imágenes para cultos, del PC al videobeam.',
      descripcion:
        'Software de proyección para iglesias que funciona sin conexión a internet: letras, pasajes bíblicos, textos e imágenes listos para el culto, con control remoto desde el móvil dentro de la propia red local.',
      tecnologias: ['C#', '.NET 8', 'WPF', 'MVVM'],
      imagen: '/proyectos/coraza.jpg',
      repo: 'https://github.com/John-Elith/Coraza',
      demo: 'https://john-elith.github.io/Coraza/',
      textoDemo: null,
      destacado: true,
      anio: '2026',
    },
    {
      nombre: 'Créditos La Red',
      resumen: 'Plataforma web para administrar créditos y préstamos por negocio.',
      descripcion:
        'Gestión de clientes, pagos y abonos, con control de mora y notificaciones en tiempo real. Cada negocio administra su cartera por separado.',
      tecnologias: ['React', 'Vite', 'SPA'],
      imagen: '/proyectos/creditos-la-red.jpg',
      repo: null,
      // Es un servicio real en producción, no una demo.
      demo: 'https://creditoslared.com',
      textoDemo: 'Ver',
      destacado: true,
      anio: '2026',
    },
  ],
};

/* ─────────────────────────────  8. REDES SOCIALES  ───────────────────────────── */
/* Se usan en la sección «Redes sociales», en el pie y en el JSON-LD de Google.  */

export const redes = {
  titulo: 'Redes sociales',
  subtitulo: '¿Dónde encontrarme?',
  items: [
    {
      nombre: 'GitHub',
      usuario: '@John-Elith',
      url: 'https://github.com/John-Elith',
      icono: 'github' as NombreIcono,
      descripcion: 'Mi código, proyectos personales y contribuciones.',
      /** Color de acento de la tarjeta al pasar el cursor. */
      color: '#8b96a3',
    },
    {
      nombre: 'LinkedIn',
      usuario: '/in/jhon-elith-payan-mina',
      url: 'https://www.linkedin.com/in/jhon-elith-payan-mina',
      icono: 'linkedin' as NombreIcono,
      descripcion: 'Mi trayectoria profesional y red de contactos.',
      color: '#4a9fd8',
    },
    {
      nombre: 'X',
      usuario: '@tu_usuario',
      url: 'https://x.com/tu_usuario',
      icono: 'x' as NombreIcono,
      descripcion: 'Notas sueltas sobre desarrollo y aprendizaje.',
      color: '#c9d1d0',
    },
    {
      nombre: 'YouTube',
      usuario: '@tu-canal',
      url: 'https://youtube.com/@tu-canal',
      icono: 'youtube' as NombreIcono,
      descripcion: 'Tutoriales y explicaciones de lo que voy construyendo.',
      color: '#d9605c',
    },
  ],
};

/* ─────────────────────────────  9. HOBBIES  ───────────────────────────── */

export const hobbies = {
  titulo: 'Hobbies',
  subtitulo: 'Lo que hago cuando cierro el editor',
  items: [
    {
      nombre: 'Música', // TODO: pon los tuyos
      icono: 'musica' as NombreIcono,
      descripcion: 'Toco guitarra desde hace años. Ayuda a despejar la cabeza entre sprints.',
    },
    {
      nombre: 'Videojuegos',
      icono: 'mando' as NombreIcono,
      descripcion: 'Sobre todo estrategia y RPG. Me interesa tanto jugarlos como entender su diseño.',
    },
    {
      nombre: 'Lectura',
      icono: 'libro' as NombreIcono,
      descripcion: 'Libros técnicos y ciencia ficción, en proporciones parecidas.',
    },
    {
      nombre: 'Fotografía',
      icono: 'camara' as NombreIcono,
      descripcion: 'Salir a caminar con la cámara es mi forma favorita de desconectar.',
    },
    {
      nombre: 'Deportes',
      icono: 'pesas' as NombreIcono,
      descripcion: 'Moverme y competir: la mejor forma de despejar la cabeza después de horas de código.',
    },
    {
      nombre: 'Crear videos',
      icono: 'video' as NombreIcono,
      descripcion: 'Grabar y editar: contar algo en video usa un músculo distinto al de programar.',
    },
  ],
};

/* ─────────────────────────────  10. CONTACTO  ───────────────────────────── */

export const contacto = {
  titulo: 'Contáctame',
  subtitulo: '¿Tienes un proyecto en mente?',
  intro:
    'Cuéntame qué necesitas y te respondo en menos de 24 horas. También puedes escribirme directamente por correo o LinkedIn.',
  email: 'jepayan@unipacifico.edu.co',
  // `null` oculta la fila del teléfono en la sección Contáctame.
  telefono: null as string | null,
  ubicacion: identidad.ubicacion,
  /**
   * Endpoint del formulario. El sitio es estático, así que necesitas un
   * servicio externo que reciba el envío. Opciones gratuitas:
   *
   *   • Formspree  → https://formspree.io   → 'https://formspree.io/f/xxxxxxxx'
   *   • Web3Forms  → https://web3forms.com  → 'https://api.web3forms.com/submit'
   *   • Getform    → https://getform.io
   *
   * Mientras esto sea `null`, el formulario abre el cliente de correo
   * del usuario con el mensaje ya redactado (funciona, pero es menos elegante).
   */
  endpointFormulario: null as string | null,
};

/* ─────────────────────────────  11. PIE DE PÁGINA  ───────────────────────────── */

export const pie = {
  /** Se muestra como «© 2026 John Elith». */
  desde: 2024,
  /** Va seguida del icono `notaIcono` (el café). */
  nota: 'Hecho con Astro y bastante',
  notaIcono: 'cafe' as NombreIcono,
  /** Lo que lee un lector de pantalla en lugar del icono. */
  notaIconoTexto: 'café',
};
