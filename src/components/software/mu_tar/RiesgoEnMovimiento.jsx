import { useRef } from 'react';
import { useScrollProgress } from '../../../hooks/useScrollProgress';
import { CICLO, RIESGOS_MOVIMIENTO, nivelRiesgo } from './muTarContent';
import styles from './RiesgoEnMovimiento.module.css';

/* ---------- Datos precalculados (estáticos, una sola vez) ---------- */
const COLOR = {
  critico: 'var(--r-critico)',
  alto: 'var(--r-alto)',
  moderado: 'var(--r-moderado)',
  bajo: 'var(--r-bajo)',
};

const CELDAS = [];
for (let p = 5; p >= 1; p -= 1) {
  for (let i = 1; i <= 5; i += 1) {
    CELDAS.push({ id: `${p}-${i}`, color: COLOR[nivelRiesgo(p * i).key] });
  }
}

const PUNTOS = RIESGOS_MOVIMIENTO.map((r, k) => ({
  ...r,
  k,
  s0: r.p0 * r.i0,
  s1: r.p1 * r.i1,
  c0: COLOR[nivelRiesgo(r.p0 * r.i0).key],
  c1: COLOR[nivelRiesgo(r.p1 * r.i1).key],
}));

const N = PUNTOS.length;
const EXPOSICION_0 = PUNTOS.reduce((t, r) => t + r.s0, 0);
const EXPOSICION_1 = PUNTOS.reduce((t, r) => t + r.s1, 0);
const CRITICOS_0 = PUNTOS.filter((r) => r.s0 >= 15).length;
const CRITICOS_1 = PUNTOS.filter((r) => r.s1 >= 15).length;
const PCT_FINAL = Math.round((EXPOSICION_1 / EXPOSICION_0) * 100);

/* Mismas fórmulas que el CSS: fase de movimiento y avance de cada punto */
const clamp01 = (v) => Math.min(1, Math.max(0, v));
const fase = (p) => clamp01((p - 0.42) / 0.5);
const avancePunto = (m, k) => clamp01(m * 1.6 - k * 0.075);
const etapaDe = (p) => (p < 0.2 ? 0 : p < 0.42 ? 1 : p < 0.72 ? 2 : 3);

/**
 * Sección "sticky": al hacer scroll los riesgos se identifican, se miden
 * y se mueven de su posición inherente a la residual.
 * El CSS lee --p (0→1); aquí solo se actualizan textos cuando cambian.
 */
const RiesgoEnMovimiento = ({ id = 'riesgo-en-movimiento', alt = false }) => {
  const criticosRef = useRef(null);
  const expRef = useRef(null);
  const ultimo = useRef({ etapa: -1, criticos: -1, exp: -1 });

  const seccionRef = useScrollProgress({
    modo: 'recorrido',
    onProgreso: (p) => {
      const el = seccionRef.current;
      if (!el) return;
      const m = fase(p);
      let criticos = 0;
      let exp = 0;
      for (const r of PUNTOS) {
        const a = avancePunto(m, r.k);
        if ((a < 0.5 ? r.s0 : r.s1) >= 15) criticos += 1;
        exp += r.s0 + (r.s1 - r.s0) * a;
      }
      const pct = Math.round((exp / EXPOSICION_0) * 100);
      const etapa = etapaDe(p);
      const u = ultimo.current;
      if (etapa !== u.etapa) el.dataset.etapa = String((u.etapa = etapa));
      if (criticos !== u.criticos && criticosRef.current) {
        criticosRef.current.textContent = String((u.criticos = criticos));
      }
      if (pct !== u.exp && expRef.current) {
        expRef.current.textContent = `${(u.exp = pct)} %`;
        el.style.setProperty('--exp', (pct / 100).toFixed(3));
      }
    },
  });

  return (
    <section
      ref={seccionRef}
      id={id}
      className={`${styles.recorrido} ${alt ? 'mu-section--alt' : ''}`}
      data-etapa="0"
      aria-labelledby={`${id}-titulo`}
    >
      <div className={styles.sticky}>
        <div className={`mu-container ${styles.grid}`}>
          <div className={styles.texto}>
            <span className="mu-chip">Así trabaja TAR</span>
            <h2 id={`${id}-titulo`} className={`mu-title ${styles.titulo}`}>
              Del riesgo inherente al residual
            </h2>
            <span className="mu-accent" />
            <p className={styles.lead}>
              Sigue bajando: así se ve tu mapa de riesgos cuando cada riesgo tiene
              controles y un plan de acción.
            </p>

            <ol className={styles.etapas}>
              {CICLO.map((c, i) => (
                <li key={c.titulo} className={styles.etapa} data-n={i}>
                  <span className={styles.etapaNum} aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span>
                    <strong>{c.titulo}</strong>
                    <small>{c.texto}</small>
                  </span>
                </li>
              ))}
            </ol>

            <dl className={styles.metricas} aria-hidden="true">
              <div>
                <dt>Riesgos críticos</dt>
                <dd ref={criticosRef}>{CRITICOS_0}</dd>
              </div>
              <div>
                <dt>Exposición total</dt>
                <dd ref={expRef}>100 %</dd>
                <span className={styles.barra}>
                  <span />
                </span>
              </div>
            </dl>
            {/* Resumen para lectores de pantalla (las métricas animadas van ocultas) */}
            <p className="mu-sr-only">
              Ejemplo: con controles y planes de acción, los riesgos críticos pasan de{' '}
              {CRITICOS_0} a {CRITICOS_1} y la exposición total baja al {PCT_FINAL} %.
            </p>
          </div>

          <div className={styles.visual} aria-hidden="true">
            <div className={styles.panel}>
              <div className={styles.panelTop}>
                <span className={styles.panelTitulo}>Mapa de riesgo</span>
                <span className={styles.estado}>
                  <span className={styles.estadoInherente}>Inherente</span>
                  <span className={styles.estadoResidual}>Residual</span>
                </span>
              </div>

              <div className={styles.matriz}>
                <span className={styles.ejeY}>Probabilidad</span>
                <div className={styles.tablero}>
                  {CELDAS.map((c) => (
                    <span key={c.id} className={styles.celda} style={{ '--c': c.color }} />
                  ))}
                  <div className={styles.capaPuntos}>
                    {PUNTOS.map((r) => (
                      <span
                        key={r.nombre}
                        className={styles.punto}
                        style={{
                          '--k': r.k,
                          '--dx': r.i1 - r.i0,
                          '--dy': r.p0 - r.p1,
                          '--c0': r.c0,
                          '--c1': r.c1,
                        }}
                      >
                        <span
                          className={styles.bola}
                          style={{ left: `${(r.i0 - 0.5) * 20}%`, top: `${(5.5 - r.p0) * 20}%` }}
                        />
                      </span>
                    ))}
                  </div>
                </div>
                <span className={styles.ejeX}>Impacto</span>
              </div>
              <p className={styles.nota}>Datos de ejemplo · {N} riesgos operativos</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RiesgoEnMovimiento;
