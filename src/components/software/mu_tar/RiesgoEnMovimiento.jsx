import { useCallback, useEffect, useRef, useState } from 'react';
import { CICLO, RIESGOS_MOVIMIENTO, nivelRiesgo } from './muTarContent';
import styles from './RiesgoEnMovimiento.module.css';

/* ---------- Datos precalculados (estáticos, una sola vez) ---------- */
const COLOR = {
  critico: 'var(--r-critico)',
  alto: 'var(--r-alto)',
  moderado: 'var(--r-moderado)',
  bajo: 'var(--r-bajo)',
};

const LEYENDA = [
  { key: 'critico', label: 'Crítico' },
  { key: 'alto', label: 'Alto' },
  { key: 'moderado', label: 'Moderado' },
  { key: 'bajo', label: 'Bajo' },
];

const CELDAS = [];
for (let p = 5; p >= 1; p -= 1) {
  for (let i = 1; i <= 5; i += 1) {
    CELDAS.push({ id: `${p}-${i}`, color: COLOR[nivelRiesgo(p * i).key] });
  }
}

/* Centro de una celda en % del tablero (columnas = impacto, filas = probabilidad 5→1) */
const cx = (i) => (i - 0.5) * 20;
const cy = (p) => (5.5 - p) * 20;

const PUNTOS = RIESGOS_MOVIMIENTO.map((r, k) => ({
  ...r,
  k,
  c0: COLOR[nivelRiesgo(r.p0 * r.i0).key],
  c1: COLOR[nivelRiesgo(r.p1 * r.i1).key],
}));

const resumen = (campoP, campoI) => {
  const scores = PUNTOS.map((r) => r[campoP] * r[campoI]);
  return {
    criticos: scores.filter((s) => s >= 15).length,
    exposicion: scores.reduce((t, s) => t + s, 0),
  };
};
const INHERENTE = resumen('p0', 'i0');
const RESIDUAL = resumen('p1', 'i1');
const PCT_RESIDUAL = Math.round((RESIDUAL.exposicion / INHERENTE.exposicion) * 100);

/* Guion de la animación (ms desde que el mapa se ve completo) */
const GUION = [
  { t: 0, etapa: 0, fase: 'inherente' }, // Identificar: aparecen los riesgos
  { t: 1300, etapa: 1, fase: 'inherente' }, // Medir: se enciende el mapa de calor
  { t: 2800, etapa: 2, fase: 'residual' }, // Controlar: los riesgos se mueven
  { t: 4300, etapa: 3, fase: 'residual' }, // Mitigar: estado final
];

const reducirMovimiento = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * El mapa se ve primero como riesgo inherente y, cuando está completo en
 * pantalla, se anima solo hacia el residual (no depende de la posición exacta
 * del scroll). Cada punto deja su posición original marcada para comparar.
 * El selector permite alternar entre ambos estados en cualquier momento.
 */
const RiesgoEnMovimiento = ({ id = 'riesgo-en-movimiento' }) => {
  const [visible, setVisible] = useState(false);
  const [etapa, setEtapa] = useState(0);
  const [fase, setFase] = useState('inherente');
  const panelRef = useRef(null);
  const timers = useRef([]);

  const cancelar = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);

  // Arranca una sola vez, cuando el mapa entra casi completo en pantalla
  useEffect(() => {
    const el = panelRef.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(
      ([e]) => {
        // Visible casi completo, o llenando la pantalla si es más alto que ella
        const suficiente =
          e.intersectionRatio >= 0.75 || e.intersectionRect.height >= window.innerHeight * 0.8;
        if (!e.isIntersecting || !suficiente) return;
        io.disconnect();
        setVisible(true);
        if (reducirMovimiento()) {
          setEtapa(3);
          setFase('residual');
          return;
        }
        timers.current = GUION.map((paso) =>
          setTimeout(() => {
            setEtapa(paso.etapa);
            setFase(paso.fase);
          }, paso.t)
        );
      },
      { threshold: [0.25, 0.5, 0.75, 1] }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelar();
    };
  }, [cancelar]);

  // El usuario toma el control: se detiene el guion
  const elegirFase = (f) => {
    cancelar();
    setVisible(true);
    setFase(f);
    setEtapa(f === 'inherente' ? 1 : 3);
  };

  const datos = fase === 'residual' ? RESIDUAL : INHERENTE;
  const pct = fase === 'residual' ? PCT_RESIDUAL : 100;

  return (
    <section
      id={id}
      className={`mu-section ${styles.seccion}`}
      data-etapa={etapa}
      data-fase={fase}
      data-visible={visible}
      aria-labelledby={`${id}-titulo`}
    >
      <div className={`mu-container ${styles.grid}`}>
        <div className={styles.texto}>
          <span className="mu-chip">Así trabaja TAR</span>
          <h2 id={`${id}-titulo`} className={`mu-title ${styles.titulo}`}>
            Del riesgo inherente al residual
          </h2>
          <span className="mu-accent" />
          <p className={styles.lead}>
            Cada punto es un riesgo de tu entidad. Con controles y planes de acción, TAR los lleva
            de la zona roja a la verde.
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

          <dl className={styles.metricas}>
            <div>
              <dt>Riesgos críticos</dt>
              <dd>{datos.criticos}</dd>
            </div>
            <div>
              <dt>Exposición total</dt>
              <dd>{pct} %</dd>
              <span className={styles.barra} aria-hidden="true">
                <span style={{ transform: `scaleX(${pct / 100})` }} />
              </span>
            </div>
          </dl>
        </div>

        <div className={styles.visual}>
          <div ref={panelRef} className={styles.panel}>
            <div className={styles.panelTop}>
              <span className={styles.panelTitulo}>Mapa de riesgo</span>
              <div className={styles.selector} role="group" aria-label="Ver riesgo">
                {['inherente', 'residual'].map((f) => (
                  <button
                    key={f}
                    type="button"
                    aria-pressed={fase === f}
                    className={styles[`sel_${f}`]}
                    onClick={() => elegirFase(f)}
                  >
                    {f === 'inherente' ? 'Inherente' : 'Residual'}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.matriz} aria-hidden="true">
              <span className={styles.ejeY}>Probabilidad ↑</span>
              <div className={styles.tablero}>
                {CELDAS.map((c) => (
                  <span key={c.id} className={styles.celda} style={{ '--c': c.color }} />
                ))}

                {/* Trayectos: de la posición inherente a la residual */}
                <svg className={styles.trayectos} viewBox="0 0 100 100" preserveAspectRatio="none">
                  {PUNTOS.map((r) => (
                    <line
                      key={r.nombre}
                      x1={cx(r.i0)}
                      y1={cy(r.p0)}
                      x2={cx(r.i1)}
                      y2={cy(r.p1)}
                      style={{ '--k': r.k }}
                    />
                  ))}
                </svg>

                {PUNTOS.map((r) => (
                  <span
                    key={`f-${r.nombre}`}
                    className={styles.fantasma}
                    style={{ left: `${cx(r.i0)}%`, top: `${cy(r.p0)}%`, '--k': r.k }}
                  />
                ))}

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
                    <span className={styles.bola} style={{ left: `${cx(r.i0)}%`, top: `${cy(r.p0)}%` }} />
                  </span>
                ))}
              </div>
              <span className={styles.ejeX}>Impacto →</span>
            </div>

            <ul className={styles.leyenda} aria-hidden="true">
              {LEYENDA.map((l) => (
                <li key={l.key}>
                  <span style={{ background: COLOR[l.key] }} />
                  {l.label}
                </li>
              ))}
            </ul>
            <p className={styles.nota}>Datos de ejemplo · {PUNTOS.length} riesgos operativos</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RiesgoEnMovimiento;
