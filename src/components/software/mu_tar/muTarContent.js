/**
 * Contenido de la página del software TAR.
 * Módulos, rutas internas y textos tomados del Home real de la app TAR
 * (TEXTOS_DESCRIPTIVOS / MENU_STRUCTURE). Los datos numéricos de los
 * widgets son de EJEMPLO y se rotulan así en pantalla.
 */

export const HERO = {
  chip: "Software TAR",
  palabras: ["El", "riesgo", "operativo,", "bajo", "control."],
  subtitulo:
    "TAR es el Sistema de Administración de Riesgos de MU Consulting: riesgo operativo, crédito, liquidez y prevención de LA-FT en una sola plataforma web.",
};

/* ---------- Módulos reales del Home de TAR (mismo orden) ---------- */
export const MODULOS_TAR = [
  {
    id: "RiesgoCredito",
    icon: "rc",
    titulo: "RIESGO-CRÉDITO",
    descripcion: "Menu RIESGO-CRÉDITO",
    textoTitulo: "Riesgo de crédito",
    parrafos: [
      "Sistema integral para la evaluación y seguimiento del riesgo crediticio de la institución.",
      "Herramientas avanzadas para el análisis de cartera, scoring de clientes, provisiones y cumplimiento de normativas de riesgo crediticio.",
      "Permite gestionar límites de exposición, monitorear concentraciones y generar reportes regulatorios para una gestión óptima del riesgo de crédito.",
    ],
  },
  {
    id: "RO",
    icon: "ro",
    titulo: "RIESGO-OPERATIVO",
    descripcion: "Menu RO",
    textoTitulo: "Riesgo operativo",
    parrafos: [
      "Plataforma especializada para identificar, medir, controlar y mitigar el riesgo operativo en todos los procesos institucionales.",
      "Incluye registro de eventos de pérdida, análisis de escenarios, evaluación de controles y seguimiento de planes de acción correctiva.",
      "Facilita el cálculo de capital regulatorio, gestión de matrices de riesgo y control, y generación de indicadores clave de riesgo (KRIs).",
    ],
  },
  {
    id: "RLiquidez",
    icon: "rl",
    titulo: "RIESGO-LIQUIDEZ",
    descripcion: "Menu RIESGO-LIQUIDEZ",
    textoTitulo: "Riesgo de liquidez",
    parrafos: [
      "Sistema de monitoreo y gestión del riesgo de liquidez para asegurar la disponibilidad de fondos en todo momento.",
      "Análisis de brechas de liquidez, proyecciones de flujos de efectivo, y seguimiento de indicadores regulatorios como LCR y NSFR.",
      "Herramientas para planes de contingencia, pruebas de estrés y optimización de la estructura de activos y pasivos.",
    ],
  },
  {
    id: "lvft",
    icon: "laft",
    titulo: "LA-FT",
    descripcion: "Matriz LA-FT",
    textoTitulo: "LA-FT · Prevención de lavado",
    parrafos: [
      "Sistema especializado para la prevención de lavado de activos y financiamiento del terrorismo.",
      "Herramientas avanzadas para el monitoreo, detección y reporte de operaciones sospechosas, cumpliendo con las regulaciones vigentes.",
    ],
  },
  {
    id: "lv_custom",
    icon: "laftCustom",
    titulo: "LA-FT",
    descripcion: "CUSTOM",
    textoTitulo: "Prevención de lavado CUSTOM",
    parrafos: [
      "Versión de la matriz LA-FT adaptada a la metodología propia de cada entidad.",
      "Mismas herramientas de monitoreo, detección y reporte de operaciones sospechosas, con la configuración que define tu institución.",
    ],
  },
  {
    id: "manuales",
    icon: "manuales",
    titulo: "MANUALES",
    descripcion: "Guías de uso",
    textoTitulo: "Manuales de usuario",
    parrafos: [
      "Guías de uso del sistema con capturas reales de cada pantalla, organizadas por módulo.",
      "Descarga en PDF el manual del módulo que necesites o el documento completo, con índice navegable y marcadores para encontrar rápidamente cada pantalla.",
    ],
  },
];

/* Panel por defecto del Home real */
export const DEFECTO_TAR = {
  titulo: "Panel de Control",
  parrafos: [
    "Bienvenido al sistema integrado de administración de riesgos. Seleccione uno de los módulos disponibles para comenzar a trabajar.",
    "Cada módulo proporciona herramientas especializadas para la gestión efectiva de los diferentes aspectos del riesgo operativo, financiero y de cumplimiento.",
  ],
};

/* ---------- Riesgo operativo en detalle ---------- */
export const RO_SUBMODULOS = [
  "Riesgo Operativo",
  "AMA Lite",
  "Riesgo Tecnológico",
  "Riesgo Legal",
  "Catálogos RO",
];

export const EVENTOS_EJEMPLO = [
  { tipo: "Fraude externo", area: "Canales digitales", monto: 12450 },
  { tipo: "Ejecución de procesos", area: "Desembolsos", monto: 3980 },
  { tipo: "Fallas de sistemas", area: "Core transaccional", monto: 8730 },
  { tipo: "Clientes y productos", area: "Agencias", monto: 1260 },
];

export const KRI_EJEMPLO = {
  nombre: "Reclamos por cada 10,000 transacciones",
  serie: [3.1, 3.4, 3.0, 3.8, 4.2, 4.0, 4.9, 5.6],
  umbral: 4.5,
};

export const CAPITAL_EJEMPLO = [
  { etiqueta: "Ene", v: 0.62 },
  { etiqueta: "Feb", v: 0.7 },
  { etiqueta: "Mar", v: 0.66 },
  { etiqueta: "Abr", v: 0.78 },
  { etiqueta: "May", v: 0.74 },
  { etiqueta: "Jun", v: 0.86 },
];

export const PLANES_EJEMPLO = [
  { nombre: "Doble validación en desembolsos", avance: 0.8 },
  { nombre: "Monitoreo de fraude en banca en línea", avance: 0.55 },
  { nombre: "Plan de contingencia del core", avance: 0.3 },
];

/* Ciclo descrito en el módulo RO: identificar, medir, controlar, mitigar */
export const CICLO = [
  {
    titulo: "Identificar",
    texto:
      "Eventos de pérdida y riesgos asociados a cada proceso institucional.",
  },
  {
    titulo: "Medir",
    texto:
      "Matrices de riesgo, análisis de escenarios y cálculo de capital regulatorio.",
  },
  {
    titulo: "Controlar",
    texto: "Evaluación de controles e indicadores clave de riesgo (KRIs).",
  },
  {
    titulo: "Mitigar",
    texto: "Planes de acción correctiva con seguimiento hasta su cierre.",
  },
];

/* ---------- Matriz de ejemplo (probabilidad × impacto) ---------- */
export const PROBABILIDAD = [
  "Rara",
  "Improbable",
  "Posible",
  "Probable",
  "Casi segura",
];
export const IMPACTO = [
  "Menor",
  "Moderado",
  "Significativo",
  "Mayor",
  "Severo",
];

export const RIESGOS_EJEMPLO = [
  { p: 4, i: 5, nombre: "Fraude externo en canales digitales" },
  { p: 3, i: 5, nombre: "Interrupción del core transaccional" },
  { p: 4, i: 4, nombre: "Errores en el desembolso de créditos" },
  { p: 2, i: 4, nombre: "Incumplimiento en reportes al regulador" },
  { p: 3, i: 3, nombre: "Rotación de personal clave" },
  { p: 5, i: 2, nombre: "Fallas en conciliación de cajeros" },
  { p: 2, i: 2, nombre: "Daño a activos físicos en agencias" },
  { p: 1, i: 3, nombre: "Fraude interno en custodia de valores" },
  { p: 3, i: 2, nombre: "Reclamos por cobros indebidos" },
];

export const nivelRiesgo = (score) => {
  if (score >= 15) return { key: "critico", label: "Crítico" };
  if (score >= 10) return { key: "alto", label: "Alto" };
  if (score >= 5) return { key: "moderado", label: "Moderado" };
  return { key: "bajo", label: "Bajo" };
};

/* ---------- Plataforma (características presentes en la app) ---------- */
export const PLATAFORMA = [
  {
    icon: "roles",
    titulo: "Acceso por permisos",
    texto: "Cada usuario ve solo los módulos que tiene habilitados.",
  },
  {
    icon: "manuales",
    titulo: "Manuales en PDF",
    texto: "Guías con capturas reales, índice navegable y marcadores.",
  },
  {
    icon: "reportes",
    titulo: "Reportes regulatorios",
    texto: "Información lista para comité, junta y supervisor.",
  },
  { icon: "web", titulo: "100 % web", texto: "Funciona desde el navegador." },
];

export const FAQ = [
  {
    q: "¿Puedo contratar solo el módulo de riesgo operativo?",
    a: "Conversemos tu necesidad. TAR está organizado por módulos y cada usuario accede solo a los que tiene habilitados.",
  },
  {
    q: "¿Se adapta a la metodología de mi entidad?",
    a: "Sí. Riesgo operativo trabaja sobre catálogos configurables adaptada a cada institución.",
  },
  {
    q: "¿Qué incluye la implementación?",
    a: "Acompañamiento del mismo equipo que asesora en riesgos, capacitación a usuarios y manuales de cada módulo en PDF.",
  },
];
