import { Link } from "react-router-dom";
import { getIcon } from "../../ui/icons";
import { useScrollProgress } from "../../../hooks/useScrollProgress";
import { useDocumentTitle } from "../../useDocumentTittle";
import TarMockup from "./TarMockup";
import ModuleStory from "./ModuleStory";
import RoBento from "./RoBento";
import CicloRO from "./CicloRO";
import { HERO, MODULOS_TAR, PLATAFORMA, FAQ } from "./muTarContent";
import hexStyles from "../../hex/Hex.module.css";
import styles from "./MuTar.module.css";

/**
 * Página de producto: TAR, Sistema de Administración de Riesgos.
 * Momento principal: la ventana 3D con la réplica del Home real, que se
 * endereza con el scroll. El resto de la página es sobrio a propósito.
 */
const MuTar = () => {
  useDocumentTitle("MU - TAR Sistema de Administración de Riesgos");
  // --p del hero: 0 arriba del todo → 1 tras bajar ~media pantalla
  const heroRef = useScrollProgress({ inicio: 0.1, fin: -0.45 });

  return (
    <>
      {/* ================= HERO ================= */}
      <section
        ref={heroRef}
        className={`${hexStyles.lienzo} ${styles.hero}`}
        aria-labelledby="tar-titulo"
      >
        <div
          className={`mu-container ${hexStyles.lienzoContenido} ${styles.heroGrid}`}
        >
          <div className={styles.heroTexto}>
            <span className="mu-chip">{HERO.chip}</span>
            <h1 id="tar-titulo" className={styles.heroTitulo}>
              {HERO.palabras.map((p, i) => (
                <span key={p}>
                  {/* El espacio va fuera del inline-block para que no colapse */}
                  <span className={styles.palabra} style={{ "--i": i }}>
                    {p}
                  </span>{" "}
                </span>
              ))}
            </h1>
            <span className={`mu-accent ${styles.heroAcento}`} />
            <p className={styles.heroSub}>{HERO.subtitulo}</p>
            <div className={styles.heroAcciones}>
              <Link to="/contact" className="mu-btn mu-btn--primary">
                Solicitar demostración
              </Link>
              <a href="#riesgo-operativo" className="mu-btn mu-btn--ghost">
                Ver riesgo operativo
              </a>
            </div>
            <ul className={styles.heroModulos} aria-label="Módulos de TAR">
              {MODULOS_TAR.filter((m) => m.id !== "lv_custom").map((m) => {
                const Icon = getIcon(m.icon);
                return (
                  <li key={m.id}>
                    <Icon aria-hidden="true" />
                    {m.textoTitulo}
                  </li>
                );
              })}
            </ul>
          </div>

          <div className={styles.heroVisual}>
            <TarMockup />
            <p className={styles.heroPista}>
              Pasa el cursor por los módulos: es una réplica del Home de TAR.
            </p>
          </div>
        </div>
      </section>

      {/* ================= RECORRIDO DE MÓDULOS ================= */}
      <ModuleStory />

      {/* ================= RIESGO OPERATIVO EN DETALLE ================= */}
      {/* <section
        id="riesgo-operativo"
        className="mu-section mu-section--alt"
        aria-labelledby="ro-titulo"
      >
        <div className="mu-container">
          <span className="mu-chip">Menú RO</span>
          <h2 id="ro-titulo" className="mu-title" style={{ marginTop: 16 }}>
            Riesgo operativo, de punta a punta
          </h2>
          <span className="mu-accent" />
          <p className="mu-lead">
            Identifica, mide, controla y mitiga el riesgo operativo en todos los
            procesos de la institución. Así se ve el trabajo diario en TAR
            (datos de ejemplo).
          </p>
          <RoBento />
        </div>
      </section> */}

      {/* ================= CICLO ================= */}
      <section className="mu-section" aria-labelledby="ciclo-titulo">
        <div className="mu-container">
          <h2 id="ciclo-titulo" className="mu-title">
            El ciclo completo, en una sola herramienta
          </h2>
          <span className="mu-accent" />
          <CicloRO />
        </div>
      </section>

      {/* ================= PLATAFORMA ================= */}
      <section
        className="mu-section mu-section--alt"
        aria-labelledby="plat-titulo"
      >
        <div className="mu-container">
          <h2 id="plat-titulo" className="mu-title">
            Pensado para el día a día de tu unidad de riesgos
          </h2>
          <span className="mu-accent" />
          <ul className={styles.plataforma}>
            {PLATAFORMA.map((p) => {
              const Icon = getIcon(p.icon);
              return (
                <li key={p.titulo}>
                  <span
                    className={`${styles.plataformaIcono} mu-hex`}
                    aria-hidden="true"
                  >
                    <Icon />
                  </span>
                  <h3>{p.titulo}</h3>
                  <p>{p.texto}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="mu-section" aria-labelledby="faq-titulo">
        <div className="mu-narrow">
          <h2 id="faq-titulo" className="mu-title">
            Preguntas frecuentes
          </h2>
          <span className="mu-accent" />
          <div className={styles.faq}>
            {FAQ.map((f) => (
              <details key={f.q} className={styles.faqItem}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CIERRE ================= */}
      <section
        className={`${styles.cierre} mu-trama`}
        aria-labelledby="cierre-titulo"
      >
        <div className={styles.cierreHex} aria-hidden="true">
          <span className={styles.cierreConico} />
          <span className={styles.cierreTexto}>
            <strong>TAR</strong>
            <small>MU CONSULTING</small>
          </span>
        </div>
        <div className={`mu-container ${styles.cierreInner}`}>
          <h2 id="cierre-titulo">
            Ve TAR funcionando con los riesgos de tu entidad
          </h2>
          <p>
            Agenda una demostración: te mostramos riesgo operativo, crédito,
            liquidez y LA-FT con información de tu institución.
          </p>
          <div className={styles.heroAcciones}>
            <Link to="/contact" className="mu-btn mu-btn--light">
              Agendar demostración
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default MuTar;
