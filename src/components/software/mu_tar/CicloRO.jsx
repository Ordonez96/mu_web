import { useScrollProgress } from '../../../hooks/useScrollProgress';
import { CICLO } from './muTarContent';
import styles from './MuTar.module.css';

/**
 * Ciclo de riesgo operativo (identificar → medir → controlar → mitigar).
 * El trazo se dibuja y cada nodo se enciende según el scroll (--p, solo CSS).
 */
const CicloRO = () => {
  const ref = useScrollProgress({ inicio: 0.85, fin: 0.35 });

  return (
    <div ref={ref} className={styles.ciclo} style={{ '--n': CICLO.length }}>
      <svg className={styles.cicloTrazo} viewBox="0 0 1000 20" preserveAspectRatio="none" aria-hidden="true">
        <line x1="40" y1="10" x2="960" y2="10" className={styles.cicloBase} />
        <line x1="40" y1="10" x2="960" y2="10" className={styles.cicloProgreso} pathLength="1" />
      </svg>
      <ol className={styles.cicloPasos}>
        {CICLO.map((c, i) => (
          <li key={c.titulo} className={styles.cicloPaso} style={{ '--i': i }}>
            <span className={`${styles.cicloNodo} mu-hex`}>{String(i + 1).padStart(2, '0')}</span>
            <h3>{c.titulo}</h3>
            <p>{c.texto}</p>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default CicloRO;
