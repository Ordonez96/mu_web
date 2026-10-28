import { Link } from 'react-router-dom';
import Revelar from './Revelar';
import styles from './ui.module.css';

/** Franja de llamada a la acción reutilizable (fondo con el degradado de marca). */
const CtaBand = ({ titulo, texto, label = 'Contactar', to = '/contact' }) => (
  <section className={styles.cta} aria-label={titulo}>
    <div className={`mu-container ${styles.ctaInner}`}>
      <Revelar desde="izquierda">
        <h2 className={styles.ctaTitulo}>{titulo}</h2>
        {texto && <p className={styles.ctaTexto}>{texto}</p>}
      </Revelar>
      <Revelar desde="derecha" retraso={0.15}>
        <Link to={to} className="mu-btn mu-btn--light">
          {label}
        </Link>
      </Revelar>
    </div>
  </section>
);

export default CtaBand;
