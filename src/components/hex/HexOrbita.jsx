import { getIcon } from '../ui/icons';
import styles from './HexOrbita.module.css';

const RADIO = 34; // distancia centro → módulo, en % del ancho (coincide con el CSS)

/**
 * TAR al centro y sus módulos alrededor, unidos por líneas con un pulso de datos.
 * Todo escala con el ancho del contenedor (unidades cqw), sin JS de medición.
 *
 * @param {Array}  modulos  [{ id, icon, corto }]
 * @param {'claro'|'oscuro'} tono
 */
const HexOrbita = ({ modulos, tono = 'claro', className = '' }) => {
  const n = modulos.length;
  const pos = modulos.map((_, i) => {
    const a = (-90 + (360 / n) * i) * (Math.PI / 180);
    return { x: 50 + RADIO * Math.cos(a), y: 50 + RADIO * Math.sin(a) };
  });

  return (
    <div className={`${styles.orbita} ${tono === 'oscuro' ? styles.oscuro : ''} ${className}`}>
      <svg className={styles.lineas} viewBox="0 0 100 100" aria-hidden="true">
        {pos.map((p, i) => (
          <line key={modulos[i].id} x1="50" y1="50" x2={p.x} y2={p.y} style={{ '--i': i }} />
        ))}
      </svg>

      <div className={styles.nucleo} aria-hidden="true">
        <strong>TAR</strong>
        <small>MU CONSULTING</small>
      </div>

      <ul className={styles.modulos} aria-label="Módulos de TAR">
        {modulos.map((m, i) => {
          const Icon = getIcon(m.icon);
          return (
            <li
              key={m.id}
              className={styles.modulo}
              style={{ left: `${pos[i].x}%`, top: `${pos[i].y}%`, '--i': i }}
            >
              <span className={styles.hex}>
                <Icon aria-hidden="true" />
                <span className={styles.etiqueta}>{m.corto}</span>
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default HexOrbita;
