import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { HexNucleo, HexagonoServicio, calcularPanal, UI } from '../../hex/HexFlower';
import { getIcon } from '../../ui/icons';
import { MODULOS_TAR } from './muTarContent';
import hexStyles from '../../hex/Hex.module.css';
import styles from './MuTar.module.css';

const MD = '(min-width: 900px)';
const N = MODULOS_TAR.length;
const noop = () => {};
const dos = (n) => String(n).padStart(2, '0');

/* ---------------- Escritorio: flor + panel, recorrido automático ---------------- */
const INTERVALO = 5000; // ms por módulo en el recorrido automático

const HistoriaEscritorio = () => {
  const [activo, setActivo] = useState(0);
  const [visible, setVisible] = useState(false); // sección en pantalla
  const [encima, setEncima] = useState(false); // puntero sobre la sección → pausa
  const [fijado, setFijado] = useState(false); // el usuario eligió un módulo → sin recorrido
  const reducir = useReducedMotion();
  const seccionRef = useRef(null);
  const florRef = useRef(null);
  const panal = useMemo(() => calcularPanal(N), []);

  // Solo avanza mientras se ve, sin interacción y sin "reducir movimiento"
  const enMarcha = visible && !encima && !fijado && !reducir;

  useEffect(() => {
    const el = seccionRef.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Se reprograma en cada cambio de módulo: cada uno dura INTERVALO completo
  useEffect(() => {
    if (!enMarcha) return undefined;
    const t = setTimeout(() => setActivo((i) => (i + 1) % N), INTERVALO);
    return () => clearTimeout(t);
  }, [enMarcha, activo]);

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

  const indice = useCallback((item) => MODULOS_TAR.findIndex((m) => m.id === item.id), []);

  // Hover: muestra el módulo; clic: lo deja fijo y detiene el recorrido
  const onEnter = useCallback((item) => setActivo(indice(item)), [indice]);
  const elegir = useCallback(
    (item) => {
      setActivo(indice(item));
      setFijado(true);
    },
    [indice]
  );

  const modulo = MODULOS_TAR[activo];

  return (
    <section
      ref={seccionRef}
      className={`mu-section ${styles.historia}`}
      aria-labelledby="historia-titulo"
      onPointerEnter={() => setEncima(true)}
      onPointerLeave={() => setEncima(false)}
    >
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
                onEnter={onEnter}
                onLeave={noop}
                onActivar={elegir}
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

          <ol
            className={`${styles.historiaIndice} ${enMarcha ? styles.indiceEnMarcha : ''}`}
            style={{ '--intervalo': `${INTERVALO}ms` }}
            aria-label="Módulos"
          >
            {MODULOS_TAR.map((m, i) => (
              <li
                key={m.id}
                className={i === activo ? styles.indiceActivo : i < activo ? styles.indiceHecho : undefined}
              >
                {/* key con el activo: reinicia la barra de progreso en cada módulo */}
                <button
                  key={i === activo ? `on-${activo}` : 'off'}
                  type="button"
                  onMouseEnter={() => onEnter(m)}
                  onClick={() => elegir(m)}
                  aria-current={i === activo ? 'step' : undefined}
                >
                  {m.textoTitulo}
                </button>
              </li>
            ))}
          </ol>
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
