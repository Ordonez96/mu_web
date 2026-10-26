import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { HexNucleo, HexagonoServicio, calcularPanal, UI } from '../../hex/HexFlower';
import { getIcon } from '../../ui/icons';
import { useScrollProgress } from '../../../hooks/useScrollProgress';
import { MODULOS_TAR } from './muTarContent';
import hexStyles from '../../hex/Hex.module.css';
import styles from './MuTar.module.css';

const MD = '(min-width: 900px)';
const N = MODULOS_TAR.length;
const noop = () => {};
const dos = (n) => String(n).padStart(2, '0');

/* ---------------- Escritorio: flor fija + texto ligado al scroll ---------------- */
const HistoriaEscritorio = () => {
  const [activo, setActivo] = useState(0);
  const activoRef = useRef(0);
  const florRef = useRef(null);
  const panal = useMemo(() => calcularPanal(N), []);

  // Solo hay re-render cuando cambia el módulo, no en cada frame de scroll
  const onProgreso = useCallback((p) => {
    const i = Math.min(N - 1, Math.floor(p * N));
    if (i !== activoRef.current) {
      activoRef.current = i;
      setActivo(i);
    }
  }, []);
  const seccionRef = useScrollProgress({ modo: 'recorrido', onProgreso });

  // La flor se escala para caber en su columna y en el alto de la pantalla
  useLayoutEffect(() => {
    const col = florRef.current;
    if (!col) return undefined;
    const ajustar = () => {
      const s = Math.min(1, col.clientWidth / panal.ancho, (window.innerHeight - 140) / panal.alto);
      col.style.setProperty('--escala-flor', s.toFixed(3));
    };
    ajustar();
    const ro = new ResizeObserver(ajustar);
    ro.observe(col);
    window.addEventListener('resize', ajustar, { passive: true });
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', ajustar);
    };
  }, [panal]);

  // Clic en un hexágono o en el índice → desplaza hasta el tramo de ese módulo
  const irA = useCallback(
    (item) => {
      const el = seccionRef.current;
      const i = MODULOS_TAR.findIndex((m) => m.id === item.id);
      if (!el || i < 0) return;
      const total = el.offsetHeight - window.innerHeight;
      const top = el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: top + total * ((i + 0.5) / N), behavior: 'smooth' });
    },
    [seccionRef]
  );

  const modulo = MODULOS_TAR[activo];

  return (
    <section
      ref={seccionRef}
      className={styles.historia}
      style={{ height: `${(N + 1) * 70}vh` }}
      aria-labelledby="historia-titulo"
    >
      <div className={styles.historiaSticky}>
        <div className={`mu-container ${styles.historiaGrid}`}>
          <div ref={florRef} className={styles.historiaFlor}>
            <div
              className={hexStyles.escenario}
              style={{
                width: panal.ancho,
                height: panal.alto,
                transform: 'translate(-50%, -50%) scale(var(--escala-flor, 1))',
              }}
            >
              <HexNucleo pos={panal.nucleo} titulo="TAR" subtitulo="MU CONSULTING" foco />
              {MODULOS_TAR.map((m, i) => (
                <HexagonoServicio
                  key={m.id}
                  item={m}
                  index={i}
                  pos={panal.celdas[i]}
                  activo={i === activo}
                  atenuado={i !== activo}
                  onEnter={noop}
                  onLeave={noop}
                  onActivar={irA}
                  registrar={noop}
                />
              ))}
            </div>
          </div>

          <div className={styles.historiaTexto}>
            <h2 id="historia-titulo" className="mu-title">Un sistema, todos tus riesgos</h2>
            <span className="mu-accent" />

            <div className={styles.historiaPanel} aria-live="polite">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={modulo.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { duration: 0.28, ease: UI.ease } }}
                  exit={{ opacity: 0, transition: { duration: 0.12 } }}
                >
                  <p className={styles.historiaNum}>
                    Módulo {dos(activo + 1)} / {dos(N)}
                  </p>
                  <h3 className={styles.historiaModulo}>{modulo.textoTitulo}</h3>
                  {modulo.parrafos.map((p) => (
                    <p key={p} className={styles.historiaParrafo}>{p}</p>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            <ol className={styles.historiaIndice} aria-label="Módulos">
              {MODULOS_TAR.map((m, i) => (
                <li
                  key={m.id}
                  className={i === activo ? styles.indiceActivo : i < activo ? styles.indiceHecho : undefined}
                >
                  <button type="button" onClick={() => irA(m)} aria-current={i === activo ? 'step' : undefined}>
                    {m.textoTitulo}
                  </button>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ---------------- Móvil: lista de módulos ---------------- */
const HistoriaMovil = () => (
  <section className="mu-section" aria-labelledby="historia-titulo">
    <div className="mu-container">
      <h2 id="historia-titulo" className="mu-title">Un sistema, todos tus riesgos</h2>
      <span className="mu-accent" />
      <ol className={styles.historiaLista}>
        {MODULOS_TAR.map((m, i) => {
          const Icon = getIcon(m.icon);
          return (
            <li key={m.id}>
              <span className={`${styles.historiaListaIcono} mu-hex`} aria-hidden="true">
                <Icon />
              </span>
              <span className={styles.historiaNum}>
                Módulo {dos(i + 1)} / {dos(N)}
              </span>
              <h3>{m.textoTitulo}</h3>
              {m.parrafos.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </li>
          );
        })}
      </ol>
    </div>
  </section>
);

/** Recorrido de los módulos reales de TAR. */
const ModuleStory = () => {
  const [esMd, setEsMd] = useState(() => window.matchMedia(MD).matches);
  useEffect(() => {
    const mq = window.matchMedia(MD);
    const fn = () => setEsMd(mq.matches);
    mq.addEventListener('change', fn);
    return () => mq.removeEventListener('change', fn);
  }, []);
  return esMd ? <HistoriaEscritorio /> : <HistoriaMovil />;
};

export default ModuleStory;
