import { Link } from 'react-router-dom';
import PageHeader from '../ui/PageHeader';
import CtaBand from '../ui/CtaBand';
import HexList from '../ui/HexList';
import { getIcon } from '../ui/icons';
import { SERVICIOS } from '../../config/siteData';
import { useDocumentTitle } from '../useDocumentTittle';
import styles from './ServicePage.module.css';

/**
 * Convierte "texto [[resaltado]] texto" en nodos React (sin innerHTML).
 * Sustituye los <span style={{color:'red'}}> del diseño anterior.
 */
const Texto = ({ children }) =>
  children.split(/(\[\[.*?\]\])/g).map((parte, i) =>
    parte.startsWith('[[') ? (
      <mark key={i} className={styles.resaltado}>{parte.slice(2, -2)}</mark>
    ) : (
      parte
    )
  );

const Seccion = ({ s, invertida, alt }) => (
  <section className={`mu-section ${alt ? 'mu-section--alt' : ''}`}>
    <div className={`mu-container ${styles.split} ${invertida ? styles.invertida : ''}`}>
      <div className={styles.texto}>
        <h2 className="mu-title">{s.titulo}</h2>
        <span className="mu-accent" />
        {(s.parrafos || []).map((p) => (
          <p key={p} className={styles.parrafo}>
            <Texto>{p}</Texto>
          </p>
        ))}
        {(s.listas || []).map((l) => (
          <div key={l.titulo || 'lista'} className={styles.lista}>
            {l.titulo && <h3 className={styles.listaTitulo}>{l.titulo}</h3>}
            <HexList items={l.items} />
          </div>
        ))}
      </div>

      {s.imagen &&
        (s.imagen.tipo === 'diagrama' ? (
          <figure className={`mu-figure ${styles.media}`}>
            <img src={s.imagen.src} alt={s.imagen.alt} width={s.imagen.w} height={s.imagen.h} loading="lazy" decoding="async" />
          </figure>
        ) : (
          <div className={`${styles.media} ${styles.ilustracion}`}>
            <img src={s.imagen.src} alt={s.imagen.alt} width={s.imagen.w} height={s.imagen.h} loading="lazy" decoding="async" />
          </div>
        ))}
    </div>
  </section>
);

/** Enlaces a los demás servicios (navegación cruzada). */
const OtrosServicios = ({ actual }) => (
  <section className="mu-section">
    <div className="mu-container">
      <h2 className="mu-title">Otros servicios</h2>
      <span className="mu-accent" />
      <ul className={styles.otros}>
        {SERVICIOS.filter((s) => s.ruta !== actual).map((s) => {
          const Icon = getIcon(s.icon);
          return (
            <li key={s.id}>
              <Link to={s.ruta} className={styles.otro}>
                <span className={`${styles.otroIcono} mu-hex`} aria-hidden="true">
                  <Icon />
                </span>
                <span>
                  <strong>{s.titulo} {s.descripcion}</strong>
                  <small>{s.resumen}</small>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  </section>
);

/**
 * Plantilla de página de servicio.
 * @param {object} props.contenido { docTitle, ruta, titulo, subtitulo, secciones[], destacado?, cta? }
 */
const ServicePage = ({ contenido }) => {
  useDocumentTitle(contenido.docTitle);
  const { destacado } = contenido;

  return (
    <>
      <PageHeader chip="Servicios" titulo={contenido.titulo} subtitulo={contenido.subtitulo} />

      {contenido.secciones.map((s, i) => (
        <Seccion key={s.titulo} s={s} invertida={i % 2 === 1} alt={i % 2 === 0} />
      ))}

      {destacado && (
        <section className="mu-section" style={{ paddingBottom: 0 }}>
          <div className="mu-container">
            <Link to={destacado.ruta} className={styles.destacado}>
              <span className={`${styles.destacadoHex} mu-hex`} aria-hidden="true">
                TAR
              </span>
              <span>
                <strong>{destacado.titulo}</strong>
                <small>{destacado.texto}</small>
              </span>
              <span className={styles.destacadoCta}>{destacado.label}</span>
            </Link>
          </div>
        </section>
      )}

      <OtrosServicios actual={contenido.ruta} />

      <CtaBand
        titulo={contenido.cta?.titulo || 'Conversemos sobre tu organización'}
        texto={contenido.cta?.texto || 'Diagnóstico, implementación y capacitación de la mano de especialistas.'}
        label="Contactar"
      />
    </>
  );
};

export default ServicePage;
