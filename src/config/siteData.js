/**
 * Datos compartidos del sitio: navegación, servicios y contacto.
 * Navbar, Footer, Home y Contact leen de aquí → un solo lugar para editar.
 */

/* ---------------- Servicios ---------------- */
export const SERVICIOS = [
  {
    id: 'reo',
    titulo: 'Riesgo Estratégico',
    descripcion: 'y Operacional',
    ruta: '/riesgo-estrategico-operacional',
    icon: 'estrategico',
    resumen:
      'Gobierno corporativo, continuidad de negocio, riesgo operativo, legal, tecnológico y de cumplimiento.',
    parrafos: [
      'Los riesgos estratégicos nacen en el ápice de la organización; los operacionales, en el "cómo lo hacemos".',
      'Desarrollamos modelos de gestión y metodologías de medición para ambos, alineados al marco regulatorio.',
    ],
  },
  {
    id: 'rf',
    titulo: 'Riesgo Financiero',
    descripcion: 'Crédito y mercado',
    ruta: '/riesgo-financiero',
    icon: 'financiero',
    resumen: 'Crédito, scoring, pérdidas esperadas, liquidez, tasas de interés, precios y divisas.',
    parrafos: [
      'Los riesgos financieros son inevitables pero predecibles: se originan en el "qué hacemos".',
      'Medimos, mitigamos y controlamos para que la gestión de riesgos también abra nuevas estrategias de negocio.',
    ],
  },
  {
    id: 'ras',
    titulo: 'Riesgo Ambiental',
    descripcion: 'y Social',
    ruta: '/riesgo-ambiental-social',
    icon: 'ambiental',
    resumen: 'Diseño e implementación del Sistema de Administración de Riesgo Ambiental y Social (SARAS).',
    parrafos: [
      'La responsabilidad ambiental y social pesa cada vez más en la economía y en la cartera de las entidades financieras.',
      'Implementamos el SARAS: políticas, gobernanza, clasificación de riesgo A&S y monitoreo de cartera.',
    ],
  },
  {
    id: 'gfp',
    titulo: 'Gestión Financiera',
    descripcion: 'y Proyectos',
    ruta: '/gestion-financiera-proyectos',
    icon: 'gestion',
    resumen: 'Valoración de empresas, flujos de caja, evaluación contable y tributaria, proyectos de inversión.',
    parrafos: [
      'Información financiera confiable para decidir: metodologías que optimizan ingresos y costos.',
      'Evaluamos viabilidad y rentabilidad de proyectos con técnicas modernas de valoración.',
    ],
  },
];

/* Producto propio */
export const PRODUCTO_TAR = {
  id: 'tar',
  titulo: 'MU-TAR',
  descripcion: 'Software',
  ruta: '/software/mu-tar',
  icon: 'software',
  resumen: 'TAR, Sistema de Administración de Riesgos: operativo, crédito, liquidez y LA-FT.',
  parrafos: [
    'TAR es nuestro Sistema de Administración de Riesgos: riesgo operativo, riesgo de crédito, riesgo de liquidez y prevención de LA-FT en una sola plataforma web.',
    'Lo desarrolla y lo implementa el mismo equipo que asesora a tu entidad en riesgos.',
  ],
};

/* ---------------- Navegación ---------------- */
export const NAV = [
  { text: 'Inicio', path: '/' },
  {
    text: 'Servicios',
    children: [
      {
        text: 'Gestión de Riesgos',
        children: [
          { text: 'Riesgos Estratégicos y Operacionales', path: '/riesgo-estrategico-operacional' },
          { text: 'Riesgos Financieros', path: '/riesgo-financiero' },
          { text: 'Riesgo Ambiental y Social', path: '/riesgo-ambiental-social' },
        ],
      },
      { text: 'Gestión Financiera y Proyectos', path: '/gestion-financiera-proyectos' },
    ],
  },
  { text: 'Software TAR', path: '/software/mu-tar', destacado: true },
  // { text: 'Blog', path: '/blog' }, // Reactivar cuando exista la página del blog
  { text: 'Sobre Nosotros', path: '/about' },
  { text: 'Contacto', path: '/contact' },
];

/* ---------------- Contacto ---------------- */
export const CONTACTOS = [
  {
    name: 'Antonio Moreno Santeliz',
    title: 'Director Ejecutivo',
    phone: '(503) 2526-9245',
    whatsapp: '(503) 7160-2578',
    email: 'amoreno@muconsultores.com',
  },
  {
    name: 'Mauricio Urrutia',
    title: 'Director de Proyectos',
    phone: '(503) 2526-9245',
    whatsapp: '(503) 7601-1475',
    email: 'murrutia@muconsultores.com',
  },
];

export const DIRECCION = {
  lugar: 'STofficenter',
  linea1: 'Urb. San Francisco, C. Los Abetos #37',
  linea2: 'San Salvador, El Salvador',
  mapa:
    'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7752.943833261301!2d-89.2281245!3d13.6898438!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f63315b75f4842b%3A0x172ddca6cec65abe!2sMU%20Consulting!5e0!3m2!1ses-419!2ssv!4v1738620549538!5m2!1ses-419!2ssv',
};

/** Convierte "(503) 7160-2578" → "50371602578" para enlaces tel:/wa.me */
export const soloDigitos = (txt) => txt.replace(/\D/g, '');
