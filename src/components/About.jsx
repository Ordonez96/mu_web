import PageHeader from './ui/PageHeader';
import CtaBand from './ui/CtaBand';
import Revelar from './ui/Revelar';
import riskBanner from '../img/about/risk.jpg';
import mapaRiesgos from '../img/about/imagen.png';
import { useDocumentTitle } from './useDocumentTittle';
import styles from './About.module.css';

/* Contenido original (ahora como párrafos, sin dangerouslySetInnerHTML) */
const BLOQUES = [
  {
    titulo: 'Quiénes somos',
    parrafos: [
      'Somos un equipo multidisciplinario de profesionales altamente calificados con amplia experiencia en Gestión de Riesgos, Gestión Financiera y Gestión de Información.',
      'Nuestro servicio personalizado tiene por enfoque agregar valor a las organizaciones mediante métodos modernos de gestión, desarrollados en consonancia con el marco regulatorio, con los objetivos organizacionales y con el sano equilibrio rentabilidad-riesgo.',
    ],
  },
  {
    titulo: 'Nuestros servicios',
    parrafos: [
      'Nuestra oferta comprende realizar un diagnóstico dentro del marco legal, acompañamiento en la implementación y capacitación al equipo de trabajo, para que tu organización logre sus objetivos estratégicos sobre una base sólida y sostenible.',
    ],
  },
];

/* La oferta descrita arriba es una secuencia real → pasos numerados */
const PASOS = [
  { titulo: 'Diagnóstico', texto: 'Evaluamos tu situación actual dentro del marco legal y regulatorio.' },
  { titulo: 'Implementación', texto: 'Acompañamos la puesta en marcha de modelos, metodologías y herramientas.' },
  { titulo: 'Capacitación', texto: 'Transferimos el conocimiento a tu equipo para que la gestión sea sostenible.' },
];

const About = () => {
  useDocumentTitle('MU - Sobre Nosotros');

  return (
    <>
      <PageHeader
        titulo="Somos especialistas en gestión de riesgos"
        subtitulo="Métodos modernos de gestión, alineados al marco regulatorio y a los objetivos de cada organización."
      />

      <section className="mu-section" style={{ paddingTop: 0 }}>
        <div className="mu-container">
          <Revelar desde="zoom">
            <img
              src={riskBanner}
              alt="Gestión de riesgos: equilibrio y control"
              className={styles.banner}
              width="2500"
              height="500"
              loading="lazy"
              decoding="async"
            />
          </Revelar>

          <div className={styles.bloques}>
            {BLOQUES.map((b, i) => (
              <Revelar
                as="article"
                key={b.titulo}
                className={styles.bloque}
                desde={i % 2 === 0 ? 'izquierda' : 'derecha'}
                retraso={i * 0.1}
              >
                <h2 className={styles.h2}>{b.titulo}</h2>
                {b.parrafos.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </Revelar>
            ))}
          </div>
        </div>
      </section>

      <section className="mu-section mu-section--alt">
        <div className="mu-container">
          <Revelar>
            <h2 className="mu-title">Cómo trabajamos</h2>
            <span className="mu-accent" />
          </Revelar>
          <ol className={styles.pasos}>
            {PASOS.map((p, i) => (
              <Revelar as="li" key={p.titulo} className={styles.paso} retraso={0.15 + i * 0.12}>
                <span className={`${styles.pasoNum} mu-hex`}>
                  <span>{String(i + 1).padStart(2, '0')}</span>
                </span>
                <h3>{p.titulo}</h3>
                <p>{p.texto}</p>
              </Revelar>
            ))}
          </ol>
        </div>
      </section>

      <section className="mu-section">
        <div className="mu-container">
          <Revelar>
            <h2 className="mu-title">Nuestro mapa de gestión de riesgos</h2>
            <span className="mu-accent" />
            <p className="mu-lead">
              Cubrimos riesgos financieros, operacionales y estratégicos con modelos regulatorios y prudenciales.
            </p>
          </Revelar>
          <Revelar as="figure" className="mu-figure" retraso={0.1}>
            <img
              src={mapaRiesgos}
              alt="Mapa de gestión de riesgos: financieros, operacionales y estratégicos"
              width="1935"
              height="982"
              loading="lazy"
              decoding="async"
            />
          </Revelar>
        </div>
      </section>

      <CtaBand
        titulo="Hablemos de tu próximo proyecto"
        texto="Cuéntanos qué necesitas y te proponemos un plan de trabajo."
        label="Contactar"
      />
    </>
  );
};

export default About;
