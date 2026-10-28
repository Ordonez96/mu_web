import { Link } from 'react-router-dom';
import PageHeader from './ui/PageHeader';
import HexFlower from './hex/HexFlower';
import CtaBand from './ui/CtaBand';
import HexList from './ui/HexList';
import RiskMatrix from './software/mu_tar/RiskMatrix';
import { SERVICIOS, PRODUCTO_TAR } from '../config/siteData';
import { useDocumentTitle } from './useDocumentTittle';
import styles from './Home.module.css';

/* Pétalos del Home: 4 servicios + el software TAR */
const PETALOS = [
  ...SERVICIOS.map((s) => ({ ...s, textoTitulo: `${s.titulo} ${s.descripcion}`, cta: 'Ver servicio' })),
  { ...PRODUCTO_TAR, textoTitulo: 'TAR · Sistema de Administración de Riesgos', cta: 'Conocer TAR' },
];

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

const Home = () => {
  useDocumentTitle('MU Consultores');

  return (
    <>
      <PageHeader
        titulo="Especialistas en administración de riesgos"
        subtitulo="Proveemos asesoramiento global y tecnología de alto desempeño. Explora cada hexágono para conocer nuestros servicios."
      >
        <HexFlower
          items={PETALOS}
          nucleo={{ titulo: 'MU', subtitulo: 'CONSULTING' }}
          defecto={DEFECTO}
          unidad="Servicio"
        />
      </PageHeader>

      {/* Misión */}
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

      {/* Software TAR */}
      <section className="mu-section">
        <div className={`mu-container ${styles.split} ${styles.splitTar}`}>
          <div>
            <span className="mu-chip">Software propio</span>
            <h2 className="mu-title" style={{ marginTop: 16 }}>
              TAR: el riesgo operativo bajo control, en una sola plataforma
            </h2>
            <span className="mu-accent" />
            <p className={styles.parrafo}>
              Nuestro Sistema de Administración de Riesgos integra riesgo operativo, crédito, liquidez y
              prevención de LA-FT. Registra eventos de pérdida, gestiona matrices de riesgo y control,
              calcula capital regulatorio y sigue tus KRIs.
            </p>
            <p className={styles.parrafo}>
              Lo desarrolla y lo implementa el mismo equipo que asesora a tu entidad en riesgos.
            </p>
            <div className={styles.acciones}>
              <Link to={PRODUCTO_TAR.ruta} className="mu-btn mu-btn--primary">
                Conocer TAR
              </Link>
              <Link to="/contact" className="mu-btn mu-btn--ghost">
                Solicitar demostración
              </Link>
            </div>
          </div>
          <RiskMatrix />
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
