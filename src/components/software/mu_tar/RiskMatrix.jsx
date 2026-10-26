import { useState } from 'react';
import { PROBABILIDAD, IMPACTO, RIESGOS_EJEMPLO, nivelRiesgo } from './muTarContent';
import styles from './MuTar.module.css';

/*
 * Precalculamos las 25 celdas una sola vez a nivel de módulo:
 * los datos son estáticos, así que no hay trabajo por render.
 * Filas de arriba hacia abajo = probabilidad 5 → 1 (convención de mapas de calor).
 */
const CELDAS = [];
for (let p = 5; p >= 1; p -= 1) {
  for (let i = 1; i <= 5; i += 1) {
    const score = p * i;
    CELDAS.push({
      id: `${p}-${i}`,
      p,
      i,
      score,
      nivel: nivelRiesgo(score),
      riesgos: RIESGOS_EJEMPLO.filter((r) => r.p === p && r.i === i),
    });
  }
}

const TOTALES = RIESGOS_EJEMPLO.reduce((acc, r) => {
  const { key } = nivelRiesgo(r.p * r.i);
  acc[key] = (acc[key] || 0) + 1;
  return acc;
}, {});

const LEYENDA = [
  { key: 'critico', label: 'Crítico' },
  { key: 'alto', label: 'Alto' },
  { key: 'moderado', label: 'Moderado' },
  { key: 'bajo', label: 'Bajo' },
];

/**
 * Mapa de calor interactivo (probabilidad × impacto).
 * Cada celda es un botón: funciona con mouse, teclado y lectores de pantalla.
 */
const RiskMatrix = () => {
  const [activa, setActiva] = useState('4-5');
  const celda = CELDAS.find((c) => c.id === activa);

  return (
    <div className={styles.matrixPanel}>
      <div className={styles.matrixHeader}>
        <span className={styles.matrixTitle}>Mapa de riesgo residual</span>
        <span className={styles.matrixTag}>Vista de ejemplo</span>
      </div>

      <div className={styles.matrixBody}>
        <span className={styles.axisY} aria-hidden="true">Probabilidad</span>

        <div
          className={styles.matrixGrid}
          role="group"
          aria-label="Matriz de riesgo: probabilidad por impacto"
        >
          {CELDAS.map((c, idx) => (
            <button
              key={c.id}
              type="button"
              className={[
                styles.cell,
                styles[`lvl_${c.nivel.key}`],
                c.riesgos.length ? styles.cellFilled : '',
                activa === c.id ? styles.cellActive : '',
              ].join(' ')}
              style={{ '--d': `${idx * 28}ms` }}
              onMouseEnter={() => setActiva(c.id)}
              onFocus={() => setActiva(c.id)}
              onClick={() => setActiva(c.id)}
              aria-pressed={activa === c.id}
              aria-label={`Probabilidad ${PROBABILIDAD[c.p - 1]}, impacto ${IMPACTO[c.i - 1]}: nivel ${c.nivel.label}, ${c.riesgos.length} riesgos`}
            >
              {c.riesgos.length > 0 && (
                <span className={styles.cellCount}>{c.riesgos.length}</span>
              )}
            </button>
          ))}
        </div>

        <span className={styles.axisX} aria-hidden="true">Impacto</span>
      </div>

      {/* Detalle de la celda seleccionada; aria-live anuncia el cambio */}
      <div className={styles.matrixDetail} aria-live="polite">
        <div className={styles.detailTop}>
          <span className={`${styles.levelPill} ${styles[`pill_${celda.nivel.key}`]}`}>
            {celda.nivel.label}
          </span>
          <span className={styles.detailCoords}>
            {PROBABILIDAD[celda.p - 1]} / {IMPACTO[celda.i - 1]}
          </span>
        </div>
        {celda.riesgos.length ? (
          <ul className={styles.detailList}>
            {celda.riesgos.map((r) => (
              <li key={r.nombre}>{r.nombre}</li>
            ))}
          </ul>
        ) : (
          <p className={styles.detailEmpty}>Sin riesgos en esta zona.</p>
        )}
      </div>

      <ul className={styles.legend}>
        {LEYENDA.map((l) => (
          <li key={l.key}>
            <span className={`${styles.legendDot} ${styles[`lvl_${l.key}`]}`} />
            {l.label}
            <strong>{TOTALES[l.key] || 0}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RiskMatrix;
