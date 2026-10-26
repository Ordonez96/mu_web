import { Link } from 'react-router-dom';
import styles from './ui.module.css';

/** Franja de llamada a la acción reutilizable (fondo con el degradado de marca). */
const CtaBand = ({ titulo, texto, label = 'Contactar', to = '/contact' }) => (
  <section className={styles.cta} aria-label={titulo}>
    <div className={`mu-container ${styles.ctaInner}`}>
      <div>
        <h2 className={styles.ctaTitulo}>{titulo}</h2>
        {texto && <p className={styles.ctaTexto}>{texto}</p>}
      </div>
      <Link to={to} className="mu-btn mu-btn--light">
        {label}
      </Link>
    </div>
  </section>
);

export default CtaBand;
