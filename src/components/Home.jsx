import { lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import HexFlower, { UI } from './hex/HexFlower';
import HexOrbita from './hex/HexOrbita';
import CtaBand from './ui/CtaBand';
import HexList from './ui/HexList';
import Carrusel from './ui/Carrusel';
import { getIcon } from './ui/icons';
import RiesgoEnMovimiento from './software/mu_tar/RiesgoEnMovimiento';
import { MODULOS_VENTA } from './software/mu_tar/muTarContent';
import { SERVICIOS, PRODUCTO_TAR } from '../config/siteData';
import { useDocumentTitle } from './useDocumentTittle';
import { useMediaQuery, MQ } from '../hooks/useMediaQuery';
import { useScrollProgress } from '../hooks/useScrollProgress';
import hexStyles from './hex/Hex.module.css';
import styles from './Home.module.css';

/* La réplica de TAR pesa: se descarga aparte y solo en pantallas donde se lee bien */
const TarMockup = lazy(() => import('./software/mu_tar/TarMockup'));

/* Pétalos del Home: 4 servicios + el software TAR */
const PETALOS = [
  ...SERVICIOS.map((s) => ({ ...s, textoTitulo: `${s.titulo} ${s.descripcion}`, cta: 'Ver servicio' })),
  { ...PRODUCTO_TAR, textoTitulo: 'TAR · Sistema de Administración de Riesgos', cta: 'Conocer TAR' },
];

/* Mismo contenido en formato carrusel para móvil */
const TARJETAS_SERVICIOS = PETALOS.map((p) => ({
  id: p.id,
  icon: p.icon,
  titulo: p.textoTitulo,
  texto: p.resumen,
  ruta: p.ruta,
  cta: p.cta,
}));

const DEFECTO = {
  titulo: 'Riesgos, finanzas y tecnología',
  parrafos: [
    'Somos un equipo multidisciplinario con amplia experiencia en gestión de riesgos, gestión financiera y gestión de información.',
    'Cubrimos de manera exhaustiva el ciclo de implementación, asegurando resultados óptimos para nuestros clientes.',
  ],
};

const RAZONES = [
  { icon: 'groups', text: 'Asesoría de negocio, regulatoria y tecnológica en un mismo equipo' },
  { icon: 'ama', text: 'Modelos de valuación predefinidos' },
  { icon: 'reportes', text: 'Reportes regulatorios preconfigurados en la solución' },
  { icon: 'bank', text: 'Profesionales con amplia experiencia en servicios financieros' },
];

/* Señales de confianza del hero: hechos del propio sitio, sin cifras inventadas */
const CREDENCIALES = [
  { icon: 'gavel', titulo: 'Marco regulatorio', texto: 'Modelos alineados a la normativa' },
  { icon: 'software', titulo: 'Software propio', texto: 'TAR, desarrollado e implementado por MU' },
  { icon: 'groups', titulo: 'Equipo multidisciplinario', texto: 'Riesgos, finanzas y tecnología' },
  { icon: 'addTask', titulo: 'Acompañamiento completo', texto: 'Diagnóstico, implementación y capacitación' },
];

/* Hueco con la misma proporción aproximada de la ventana: evita saltos mientras carga */
const ReservaVentana = () => <div className={styles.reservaVentana} aria-hidden="true" />;

const Home = () => {
  useDocumentTitle('MU Consultores');
  const esMd = useMediaQuery(MQ.md);
  const esSm = useMediaQuery(MQ.sm);
  // --p del hero: la ventana 3D se endereza al bajar
  const heroRef = useScrollProgress({ inicio: 0.1, fin: -0.45 });

  return (
    <>
      {/* ================= HERO ================= */}
      <section ref={heroRef} className={`${hexStyles.lienzo} ${styles.hero}`}>
        <div className={`mu-container ${hexStyles.lienzoContenido}`}>
          <div className={styles.heroGrid}>
            <motion.header
              className={styles.heroTexto}
              initial={{ opacity: 0, y: -14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: UI.ease }}
            >
              <span className="mu-chip">Consultoría en riesgos · El Salvador</span>
              <h1 className={hexStyles.encabezadoTitulo}>Especialistas en administración de riesgos</h1>
              <span className="mu-accent" style={{ marginBottom: 0 }} />
              <p className={hexStyles.encabezadoSub}>
                Asesoramiento global y tecnología de alto desempeño para que tu institución financiera
                mida, controle y gestione sus riesgos con confianza.
              </p>
              <div className={styles.heroAcciones}>
                <Link to="/contact" className="mu-btn mu-btn--primary">
                  Solicitar diagnóstico
                </Link>
                <Link to={PRODUCTO_TAR.ruta} className="mu-btn mu-btn--ghost">
                  Conocer el software TAR
                </Link>
              </div>
            </motion.header>

            <div className={styles.heroVisual}>
              {esSm ? (
                <Suspense fallback={<ReservaVentana />}>
                  <TarMockup />
                </Suspense>
              ) : (
                <HexOrbita modulos={MODULOS_VENTA} />
              )}
            </div>
          </div>

          <ul className={styles.credenciales}>
            {CREDENCIALES.map((c, i) => {
              const Icon = getIcon(c.icon);
              return (
                /* Entrada en cascada tras el titular, con la curva del sitio */
                <motion.li
                  key={c.titulo}
                  className={styles.credencial}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.35 + i * 0.08, ease: UI.ease }}
                >
                  <span className={`${styles.credencialIcono} mu-hex`} aria-hidden="true">
                    <Icon />
                  </span>
                  <span>
                    <strong>{c.titulo}</strong>
                    <small>{c.texto}</small>
                  </span>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ================= SERVICIOS ================= */}
      <section className="mu-section mu-section--alt" aria-labelledby="servicios-titulo">
        <div className="mu-container">
          <span className="mu-chip">Servicios</span>
          <h2 id="servicios-titulo" className="mu-title" style={{ marginTop: 16 }}>
            Soluciones para cada frente de riesgo
          </h2>
          <span className="mu-accent" />
          <p className="mu-lead">
            Cuatro líneas de consultoría y una plataforma propia.{' '}
            {esMd ? 'Explora cada hexágono para ver el detalle.' : 'Desliza para ver cada una.'}
          </p>
          {esMd ? (
            <HexFlower
              items={PETALOS}
              nucleo={{ titulo: 'MU', subtitulo: 'CONSULTING' }}
              defecto={DEFECTO}
              unidad="Servicio"
            />
          ) : (
            <Carrusel items={TARJETAS_SERVICIOS} etiqueta="Servicios" />
          )}
        </div>
      </section>

      {/* ================= TAR (sección nocturna) ================= */}
      <section className={styles.noche} aria-labelledby="tar-home-titulo">
        <div className={`mu-container ${styles.split} ${styles.splitTar}`}>
          <div>
            <span className={styles.chipNoche}>Software propio</span>
            <h2 id="tar-home-titulo" className={styles.tituloNoche}>
              TAR: seis módulos, un solo sistema
            </h2>
            <span className={styles.acentoNoche} />
            <p className={styles.parrafoNoche}>
              Nuestro Sistema de Administración de Riesgos reúne riesgo operativo, crédito, liquidez,
              LA-FT, RO tecnológico y RO legal en una sola plataforma web.
            </p>
            <p className={styles.parrafoNoche}>
              Adquiere la suite completa o solo los módulos que tu entidad necesita. Lo implementa el
              mismo equipo que te asesora en riesgos.
            </p>

            {/* En móvil la órbita ya está en el hero: aquí van los módulos como chips */}
            {!esMd && (
              <ul className={styles.chipsNoche} aria-label="Módulos de TAR">
                {MODULOS_VENTA.map((m) => {
                  const Icon = getIcon(m.icon);
                  return (
                    <li key={m.id}>
                      <Icon aria-hidden="true" />
                      {m.textoTitulo}
                    </li>
                  );
                })}
              </ul>
            )}

            <div className={styles.acciones}>
              <Link to={PRODUCTO_TAR.ruta} className="mu-btn mu-btn--light">
                Conocer TAR
              </Link>
              <Link to={`${PRODUCTO_TAR.ruta}#modulos`} className={`mu-btn ${styles.btnContorno}`}>
                Elegir módulos
              </Link>
            </div>
          </div>

          {esMd && <HexOrbita modulos={MODULOS_VENTA} tono="oscuro" />}
        </div>
      </section>

      {/* ================= RIESGO EN MOVIMIENTO ================= */}
      <RiesgoEnMovimiento id="riesgo-home" />

      {/* ================= MISIÓN ================= */}
      <section className="mu-section mu-section--alt">
        <div className={`mu-container ${styles.split}`}>
          <div>
            <h2 className="mu-title">Nuestra misión</h2>
            <span className="mu-accent" />
            <p className={styles.mision}>
              Proveer soluciones tecnológicas eficientes y fáciles de usar, en tiempo récord, excediendo
              las expectativas de nuestros clientes.
            </p>
          </div>
          <div>
            <h3 className={styles.h3}>Implementación en tiempo récord gracias a</h3>
            <HexList items={RAZONES} />
          </div>
        </div>
      </section>

      <CtaBand
        titulo="Conversemos sobre los riesgos de tu organización"
        texto="Diagnóstico dentro del marco legal, acompañamiento en la implementación y capacitación a tu equipo."
        label="Contactar"
      />
    </>
  );
};

export default Home;
