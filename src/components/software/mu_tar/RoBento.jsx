import { useMemo } from 'react';
import RiskMatrix from './RiskMatrix';
import { getIcon } from '../../ui/icons';
import { useEnPantalla } from '../../../hooks/useScrollProgress';
import {
  EVENTOS_EJEMPLO,
  KRI_EJEMPLO,
  CAPITAL_EJEMPLO,
  PLANES_EJEMPLO,
  RO_SUBMODULOS,
} from './muTarContent';
import styles from './MuTar.module.css';

const usd = (n) => n.toLocaleString('es-SV', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

/* Encabezado común de cada tarjeta */
const Cabecera = ({ icon, titulo, etiqueta = 'Ejemplo' }) => {
  const Icon = getIcon(icon);
  return (
    <div className={styles.bentoCab}>
      <span className={`${styles.bentoIcono} mu-hex`} aria-hidden="true">
        <Icon />
      </span>
      <h3>{titulo}</h3>
      {etiqueta && <span className={styles.bentoEtiqueta}>{etiqueta}</span>}
    </div>
  );
};

/* ---------- Eventos de pérdida: filas que entran en cascada ---------- */
const Eventos = () => {
  const total = EVENTOS_EJEMPLO.reduce((a, e) => a + e.monto, 0);
  return (
    <article className={`${styles.bento} ${styles.bentoEventos}`}>
      <Cabecera icon="eventos" titulo="Registro de eventos de pérdida" />
      <ul className={styles.eventos}>
        {EVENTOS_EJEMPLO.map((e, i) => (
          <li key={e.tipo} style={{ '--i': i }}>
            <span className={styles.eventoTipo}>{e.tipo}</span>
            <span className={styles.eventoArea}>{e.area}</span>
            <strong>{usd(e.monto)}</strong>
          </li>
        ))}
      </ul>
      <p className={styles.eventosTotal}>
        Pérdida del periodo <strong>{usd(total)}</strong>
      </p>
    </article>
  );
};

/* ---------- KRI: línea que se dibuja + umbral ---------- */
const Kri = () => {
  const { serie, umbral, nombre } = KRI_EJEMPLO;
  const W = 300;
  const H = 120;
  const max = Math.max(...serie, umbral) * 1.12;
  const { d, area, puntos, yUmbral } = useMemo(() => {
    const pts = serie.map((v, i) => [(i / (serie.length - 1)) * W, H - (v / max) * H]);
    const linea = pts.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ');
    return {
      d: linea,
      area: `${linea} L${W},${H} L0,${H} Z`,
      puntos: pts,
      yUmbral: H - (umbral / max) * H,
    };
  }, [serie, umbral, max]);
  const ultimo = serie[serie.length - 1];
  const alerta = ultimo > umbral;

  return (
    <article className={`${styles.bento} ${styles.bentoKri}`}>
      <Cabecera icon="kri" titulo="Indicadores clave (KRI)" />
      <p className={styles.kriNombre}>{nombre}</p>
      <div className={styles.kriValor}>
        <strong>{ultimo.toFixed(1)}</strong>
        <span className={alerta ? styles.kriAlerta : styles.kriOk}>{alerta ? 'Sobre el umbral' : 'Dentro del umbral'}</span>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className={styles.kriSvg} role="img" aria-label={`Tendencia del indicador; último valor ${ultimo}, umbral ${umbral}`}>
        <defs>
          <linearGradient id="kriArea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#0369a1" stopOpacity="0.18" />
            <stop offset="1" stopColor="#0369a1" stopOpacity="0" />
          </linearGradient>
        </defs>
        <line x1="0" x2={W} y1={yUmbral} y2={yUmbral} className={styles.kriUmbral} />
        <path d={area} fill="url(#kriArea)" className={styles.kriArea} />
        <path d={d} className={styles.kriLinea} pathLength="1" />
        <circle cx={puntos[puntos.length - 1][0]} cy={puntos[puntos.length - 1][1]} r="5" className={styles.kriPunto} />
      </svg>
    </article>
  );
};

/* ---------- Capital regulatorio: barras que crecen ---------- */
const Capital = () => (
  <article className={`${styles.bento} ${styles.bentoCapital}`}>
    <Cabecera icon="ama" titulo="Capital regulatorio" />
    <div className={styles.barras} role="img" aria-label="Evolución mensual del requerimiento de capital por riesgo operativo">
      {CAPITAL_EJEMPLO.map((b, i) => (
        <div key={b.etiqueta} className={styles.barra}>
          <span style={{ '--v': b.v, '--i': i }} />
          <small>{b.etiqueta}</small>
        </div>
      ))}
    </div>
  </article>
);

/* ---------- Planes de acción: barras de avance ---------- */
const Planes = () => (
  <article className={`${styles.bento} ${styles.bentoPlanes}`}>
    <Cabecera icon="planes" titulo="Planes de acción correctiva" />
    <ul className={styles.planes}>
      {PLANES_EJEMPLO.map((p, i) => (
        <li key={p.nombre}>
          <div className={styles.planFila}>
            <span>{p.nombre}</span>
            <strong>{Math.round(p.avance * 100)} %</strong>
          </div>
          <div className={styles.planPista}>
            <span style={{ '--v': p.avance, '--i': i }} />
          </div>
        </li>
      ))}
    </ul>
  </article>
);

/* ---------- Submódulos de RO ---------- */
const Submodulos = () => (
  <article className={`${styles.bento} ${styles.bentoSub}`}>
    <Cabecera icon="ro" titulo="Dentro del menú RO" etiqueta={null} />
    <ul className={styles.subChips}>
      {RO_SUBMODULOS.map((s) => (
        <li key={s}>{s}</li>
      ))}
    </ul>
    <p className={styles.subNota}>Catálogos configurables para adaptar el módulo a la metodología de tu entidad.</p>
  </article>
);

/**
 * Cuadrícula "bento" con lo que hace el módulo de Riesgo Operativo.
 * Las animaciones arrancan una sola vez al entrar en pantalla (data-visible).
 */
const RoBento = () => {
  const ref = useEnPantalla(0.15);
  return (
    <div ref={ref} className={styles.bentoGrid}>
      <div className={`${styles.bento} ${styles.bentoMatriz}`}>
        <RiskMatrix />
      </div>
      <Eventos />
      <Kri />
      <Capital />
      <Planes />
      <Submodulos />
    </div>
  );
};

export default RoBento;
