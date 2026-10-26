import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import ArrowForwardRounded from '@mui/icons-material/ArrowForwardRounded';
import { getIcon } from '../ui/icons';
import { usePanal } from './PanalContext';
import styles from './Hex.module.css';

/* =========================================================
   Flor de hexágonos + panel (estructura de la referencia TAR v2)
   HexNucleo · HexagonoServicio · ContenidoPanel · AccesoRapido
   ========================================================= */

export const UI = { ease: [0.22, 1, 0.36, 1] };

/* ---------- Geometría del panal en flor ---------- */
const CELDA = { NW: [-1, -1], NE: [1, -1], N: [0, -2], SW: [-1, 1], SE: [1, 1], S: [0, 2], A: [-1, 3], B: [1, 3] };
const PATRONES = {
  1: ['N'],
  2: ['NW', 'NE'],
  3: ['NW', 'NE', 'N'],
  4: ['NW', 'NE', 'SW', 'SE'],
  5: ['NW', 'N', 'NE', 'SW', 'SE'],
  6: ['NW', 'N', 'NE', 'SW', 'SE', 'S'],
  7: ['NW', 'N', 'NE', 'SW', 'SE', 'S', 'A'],
  8: ['NW', 'N', 'NE', 'SW', 'SE', 'S', 'A', 'B'],
};
const HEX_W = 210;
const HEX_H = 180;
const PASO_X = 164.5;
const PASO_Y = 94.5;
const OFFSET_X = -37;

/**
 * calcularPanal(n, orden): posiciones (centro de cada hexágono) relativas al núcleo,
 * recentradas en vertical. Devuelve { celdas, nucleo, alto, ancho }.
 */
export const calcularPanal = (n, orden) => {
  const claves = orden && orden.length === n ? orden : PATRONES[Math.min(Math.max(n, 1), 8)];
  const grid = claves.map((k) => CELDA[k]);
  const ys = [0, ...grid.map(([, gy]) => gy)];
  const centroY = ((Math.min(...ys) + Math.max(...ys)) / 2) * PASO_Y;
  const pos = ([gx, gy]) => ({ x: OFFSET_X + gx * PASO_X, y: gy * PASO_Y - centroY });
  const celdas = grid.map(pos);
  const nucleo = pos([0, 0]);
  const xs = [nucleo.x, ...celdas.map((c) => c.x)];
  const ancho = 2 * Math.max(...xs.map((x) => Math.abs(x))) + HEX_W + 24;
  const alto = Math.max(500, (Math.max(...ys) - Math.min(...ys)) * PASO_Y + HEX_H + 20);
  return { celdas, nucleo, alto, ancho };
};

const tieneTexto = (t) => Boolean(t && t.trim() && t.trim() !== '.');
const dos = (n) => String(n).padStart(2, '0');

/* ---------- Núcleo ---------- */
export const HexNucleo = ({ pos, titulo, subtitulo, foco }) => (
  <motion.div
    className={styles.nucleo}
    style={{ left: `calc(50% + ${pos.x}px)`, top: `calc(50% + ${pos.y}px)`, x: '-50%', y: '-50%' }}
    initial={{ opacity: 0, scale: 0.6, rotate: -30 }}
    animate={{ opacity: 1, scale: 1, rotate: 0 }}
    transition={{ duration: 0.7, ease: UI.ease }}
    aria-hidden="true"
  >
    <span className={styles.nucleoHalo} />
    <span className={styles.nucleoSombra}><span /></span>
    <span className={styles.nucleoCuerpo}>
      <span className={styles.nucleoConico} />
      <svg className={styles.nucleoContorno} viewBox="0 0 210 180" preserveAspectRatio="none">
        <polygon points="62,12 148,12 194,90 148,168 62,168 16,90" />
      </svg>
      <span className={styles.nucleoTexto}>
        {(() => {
          const Hive = getIcon('hive');
          return <Hive className={`${styles.nucleoIcono} ${foco ? styles.nucleoIconoFoco : ''}`} />;
        })()}
        <strong>{titulo}</strong>
        <small>{subtitulo}</small>
      </span>
    </span>
  </motion.div>
);

/* ---------- Hexágono de módulo / servicio ---------- */
export const HexagonoServicio = ({
  item,
  index,
  pos,
  movil,
  activo,
  atenuado,
  onEnter,
  onLeave,
  onActivar,
  registrar,
}) => {
  const Icon = getIcon(item.icon);
  const estiloPos = movil
    ? undefined
    : { left: `calc(50% + ${pos.x}px)`, top: `calc(50% + ${pos.y}px)`, x: '-50%', y: '-50%' };

  const onKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onActivar(item, e.currentTarget);
    }
  };

  return (
    <motion.div
      className={`${styles.hex} ${movil ? styles.hexMovil : ''}`}
      style={estiloPos}
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.55, delay: 0.2 + index * 0.08, ease: UI.ease }}
    >
      <div className={`${styles.cuerpo} ${activo ? styles.estadoActivo : ''} ${atenuado ? styles.atenuado : ''}`}>
        <span className={styles.sombra}><span /></span>
        <span className={`borde ${styles.borde}`} />
        <div
          ref={(el) => registrar(item.id, el)}
          className={`contenido ${styles.contenido}`}
          role={item.ruta ? 'link' : 'button'}
          tabIndex={0}
          aria-label={`${item.titulo} ${item.descripcion || ''}`.trim()}
          aria-pressed={item.ruta ? undefined : activo}
          onMouseEnter={(e) => onEnter(item, e.currentTarget)}
          onMouseLeave={onLeave}
          onFocus={(e) => onEnter(item, e.currentTarget)}
          onBlur={onLeave}
          onClick={(e) => onActivar(item, e.currentTarget)}
          onKeyDown={onKeyDown}
        >
          <span className={styles.icono}>
            <Icon />
          </span>
          <span className={styles.titulo}>{item.titulo}</span>
          {tieneTexto(item.descripcion) && <span className={styles.chip}>{item.descripcion}</span>}
        </div>
      </div>
    </motion.div>
  );
};

/* ---------- Acceso rápido (panel por defecto) ---------- */
const AccesoRapido = ({ item, onEnter, onLeave, onActivar }) => {
  const Icon = getIcon(item.icon);
  return (
    <button
      type="button"
      className={styles.acceso}
      onMouseEnter={() => onEnter(item)}
      onMouseLeave={onLeave}
      onFocus={() => onEnter(item)}
      onBlur={onLeave}
      onClick={(e) => onActivar(item, e.currentTarget)}
    >
      <span className={`${styles.accesoIcono} mu-hex`}>
        <Icon />
      </span>
      <span className={styles.accesoTexto}>
        <strong>{item.titulo}</strong>
        {tieneTexto(item.descripcion) && <small>{item.descripcion}</small>}
      </span>
    </button>
  );
};

/* ---------- Contenido del panel (lo usan el panel y el medidor) ---------- */
const ContenidoPanel = ({ estado, total, fecha, defecto, unidad, ctaLabel, accesos }) => {
  if (!estado) {
    return (
      <div className={styles.panelContenido}>
        <p className={styles.eyebrow}>
          <span className={styles.eyebrowPunto} />
          {fecha}
        </p>
        <h2 className={styles.panelTitulo}>{defecto.titulo}</h2>
        {defecto.parrafos.map((p) => (
          <p key={p} className={styles.panelParrafo}>{p}</p>
        ))}
        {defecto.extra}
        {accesos}
      </div>
    );
  }
  return (
    <div className={styles.panelContenido}>
      <p className={styles.eyebrow}>
        <span className={styles.eyebrowPunto} />
        {unidad} {dos(estado.index + 1)} / {dos(total)}
        {tieneTexto(estado.item.descripcion) && (
          <span className={styles.eyebrowChip}>{estado.item.descripcion}</span>
        )}
      </p>
      <h2 className={styles.panelTitulo}>{estado.item.textoTitulo || estado.item.titulo}</h2>
      {(estado.item.parrafos || []).map((p) => (
        <p key={p} className={styles.panelParrafo}>{p}</p>
      ))}
      {estado.item.extra}
      {estado.item.ruta && (
        <span className={styles.ingresar}>
          {estado.item.cta || ctaLabel}
          <ArrowForwardRounded className={styles.ingresarFlecha} />
        </span>
      )}
    </div>
  );
};

/* =========================================================
   Componente público
   ========================================================= */
const MD = '(min-width: 900px)';

const HexFlower = ({
  items,
  nucleo = { titulo: 'TAR', subtitulo: 'MU CONSULTING' },
  orden,
  defecto,
  unidad = 'Módulo',
  ctaLabel = 'Ingresar',
  accesosTitulo = 'Accesos rápidos',
  canvasRef,
  forzarMd = false, // la réplica en la ventana 3D siempre usa el layout de escritorio
}) => {
  const navigate = useNavigate();
  const reduce = useReducedMotion();
  const panalGlobal = usePanal();
  const panalRef = canvasRef || panalGlobal; // panal propio o el global del sitio
  const [esMd, setEsMd] = useState(() => forzarMd || window.matchMedia(MD).matches);
  const [hoverId, setHoverId] = useState(null); // previsualización (hover/foco)
  const [fijoId, setFijoId] = useState(null); // seleccionado con clic (ítems sin ruta)
  const [resaltadoId, setResaltadoId] = useState(null); // hover en acceso rápido
  const [altoPanel, setAltoPanel] = useState(0);
  const [escala, setEscala] = useState(1);

  const salirTimer = useRef(0);
  const activoRef = useRef(null);
  const hexEls = useRef({});
  const medidorRef = useRef(null);
  const panelRef = useRef(null);
  const columnaRef = useRef(null);

  const panal = useMemo(() => calcularPanal(items.length, orden), [items.length, orden]);
  const fecha = useMemo(
    () => new Date().toLocaleDateString('es-SV', { weekday: 'long', day: 'numeric', month: 'long' }),
    []
  );

  /* Breakpoint md */
  useEffect(() => {
    if (forzarMd) return undefined;
    const mq = window.matchMedia(MD);
    const fn = () => setEsMd(mq.matches);
    mq.addEventListener('change', fn);
    return () => mq.removeEventListener('change', fn);
  }, [forzarMd]);

  useEffect(() => () => clearTimeout(salirTimer.current), []);

  /* Onda en el canvas desde el centro de un elemento */
  const onda = useCallback(
    (el, fuerza) => {
      if (!el || !panalRef?.current) return;
      const r = el.getBoundingClientRect();
      panalRef.current.pulso(r.left + r.width / 2, r.top + r.height / 2, fuerza);
    },
    [panalRef]
  );

  const registrar = useCallback((id, el) => {
    hexEls.current[id] = el;
  }, []);

  /* Hover / foco en hexágono */
  const onEnter = useCallback(
    (item, el) => {
      clearTimeout(salirTimer.current);
      if (activoRef.current === item.id) return; // evita re-render y ondas repetidas
      activoRef.current = item.id;
      setHoverId(item.id);
      onda(el, 0.7);
    },
    [onda]
  );

  const onLeave = useCallback(() => {
    clearTimeout(salirTimer.current);
    salirTimer.current = setTimeout(() => {
      activoRef.current = null;
      setHoverId(null);
    }, 160);
  }, []);

  /* Clic / Enter */
  const onActivar = useCallback(
    (item, el) => {
      onda(hexEls.current[item.id] || el, 1.25);
      if (item.ruta) {
        setTimeout(() => navigate(item.ruta), reduce ? 0 : 220);
      } else {
        setFijoId((prev) => (prev === item.id ? null : item.id));
      }
    },
    [navigate, onda, reduce]
  );

  /* Acceso rápido: resalta el hexágono y lanza onda 0.5 sin cambiar el texto */
  const onEnterAcceso = useCallback(
    (item) => {
      setResaltadoId(item.id);
      onda(hexEls.current[item.id], 0.5);
    },
    [onda]
  );
  const onLeaveAcceso = useCallback(() => setResaltadoId(null), []);

  const visibleId = hoverId ?? fijoId;
  const estado = useMemo(() => {
    const index = items.findIndex((i) => i.id === visibleId);
    return index >= 0 ? { index, item: items[index] } : null;
  }, [items, visibleId]);
  const visualActivo = visibleId ?? resaltadoId;

  const accesos = (
    <div className={styles.accesos}>
      <p className={styles.accesosTitulo}>{accesosTitulo}</p>
      <div className={styles.accesosGrid}>
        {items.map((it) => (
          <AccesoRapido
            key={it.id}
            item={it}
            onEnter={onEnterAcceso}
            onLeave={onLeaveAcceso}
            onActivar={onActivar}
          />
        ))}
      </div>
    </div>
  );

  /* ---------- Medidor: alto fijo del panel (nunca al pasar el mouse) ---------- */
  useLayoutEffect(() => {
    if (!esMd) return undefined;
    const medir = () => {
      const med = medidorRef.current;
      const panel = panelRef.current;
      if (!med || !panel) return;
      const cs = getComputedStyle(panel);
      const extra =
        parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom) +
        parseFloat(cs.borderTopWidth) + parseFloat(cs.borderBottomWidth);
      const max = Math.max(...Array.from(med.children).map((c) => c.offsetHeight));
      setAltoPanel(Math.ceil(max + extra));
    };
    const escalar = () => {
      const col = columnaRef.current;
      if (col) setEscala(Math.min(1, col.clientWidth / panal.ancho));
    };
    medir();
    escalar();
    const ro = new ResizeObserver(() => {
      medir();
      escalar();
    });
    if (panelRef.current) ro.observe(panelRef.current);
    if (columnaRef.current) ro.observe(columnaRef.current);
    document.fonts?.ready.then(medir);
    return () => ro.disconnect();
  }, [esMd, items, panal.ancho]);

  const altoFlor = panal.alto * escala;
  const altoFila = Math.max(altoFlor, altoPanel);

  return (
    <div className={`${styles.fila} ${forzarMd ? styles.filaForzada : ''}`}>
      {/* Columna de hexágonos */}
      <div
        ref={columnaRef}
        className={styles.columnaHex}
        style={esMd ? { height: altoFila } : undefined}
      >
        {esMd ? (
          <div
            className={styles.escenario}
            style={{ width: panal.ancho, height: panal.alto, transform: `translate(-50%, -50%) scale(${escala})` }}
          >
            <HexNucleo pos={panal.nucleo} titulo={nucleo.titulo} subtitulo={nucleo.subtitulo} foco={Boolean(visualActivo)} />
            {items.map((it, i) => (
              <HexagonoServicio
                key={it.id}
                item={it}
                index={i}
                pos={panal.celdas[i]}
                activo={visualActivo === it.id}
                atenuado={Boolean(visualActivo) && visualActivo !== it.id}
                onEnter={onEnter}
                onLeave={onLeave}
                onActivar={onActivar}
                registrar={registrar}
              />
            ))}
          </div>
        ) : (
          <div className={styles.pila}>
            {items.map((it, i) => (
              <HexagonoServicio
                key={it.id}
                item={it}
                index={i}
                movil
                activo={visualActivo === it.id}
                atenuado={false}
                onEnter={onEnter}
                onLeave={onLeave}
                onActivar={onActivar}
                registrar={registrar}
              />
            ))}
          </div>
        )}
      </div>

      {/* Panel derecho */}
      <motion.aside
        ref={panelRef}
        className={styles.panel}
        style={esMd && altoPanel ? { height: altoFila } : undefined}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.1, ease: UI.ease }}
        aria-live="polite"
      >
        <motion.span
          key={`barra-${visibleId ?? 'def'}`}
          className={styles.barra}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, ease: UI.ease }}
        />
        <AnimatePresence initial={false}>
          {(() => {
            const Marca = getIcon(estado ? estado.item.icon : 'hive');
            return (
              <motion.span
                key={`marca-${estado ? estado.item.id : 'def'}`}
                className={styles.marca}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                aria-hidden="true"
              >
                <Marca />
              </motion.span>
            );
          })()}
        </AnimatePresence>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={visibleId ?? 'def'}
            className={styles.panelAnim}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.28 } }}
            exit={{ opacity: 0, transition: { duration: 0.12 } }}
          >
            <ContenidoPanel
              estado={estado}
              total={items.length}
              fecha={fecha}
              defecto={defecto}
              unidad={unidad}
              ctaLabel={ctaLabel}
              accesos={accesos}
            />
          </motion.div>
        </AnimatePresence>

        {/* Medidor invisible: renderiza todos los estados y se toma el más alto */}
        {esMd && (
          <div ref={medidorRef} className={styles.medidor} aria-hidden="true">
            <div>
              <ContenidoPanel estado={null} total={items.length} fecha={fecha} defecto={defecto} unidad={unidad} ctaLabel={ctaLabel} accesos={accesos} />
            </div>
            {items.map((it, i) => (
              <div key={it.id}>
                <ContenidoPanel estado={{ index: i, item: it }} total={items.length} fecha={fecha} defecto={defecto} unidad={unidad} ctaLabel={ctaLabel} accesos={null} />
              </div>
            ))}
          </div>
        )}
      </motion.aside>
    </div>
  );
};

export default HexFlower;
