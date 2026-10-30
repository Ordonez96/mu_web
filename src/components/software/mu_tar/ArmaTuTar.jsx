import { useCallback, useMemo, useState } from "react";
import CheckRounded from "@mui/icons-material/CheckRounded";
import AddRounded from "@mui/icons-material/AddRounded";
import ExpandMoreRounded from "@mui/icons-material/ExpandMoreRounded";
import WhatsApp from "@mui/icons-material/WhatsApp";
import EmailOutlined from "@mui/icons-material/EmailOutlined";
import { getIcon } from "../../ui/icons";
import { CONTACTOS, soloDigitos } from "../../../config/siteData";
import { MODULOS_VENTA, INCLUIDO_SIEMPRE } from "./muTarContent";
import styles from "./ArmaTuTar.module.css";

/* Quien recibe las solicitudes de propuesta (cambiar aquí si es otra persona) */
const VENTAS = CONTACTOS[0];
const TOTAL = MODULOS_VENTA.length;

/** Texto de la solicitud según los módulos elegidos */
const armarMensaje = (elegidos) => {
  if (elegidos.length === TOTAL) {
    return `Hola, me interesa la suite completa de TAR (${TOTAL} módulos). ¿Podemos agendar una demostración?`;
  }
  const lista = elegidos.map((m) => `- ${m.textoTitulo}`).join("\n");
  return `Hola, me interesan estos módulos de TAR:\n${lista}\n¿Podemos agendar una demostración?`;
};

const TarjetaModulo = ({ modulo, elegido, onToggle }) => {
  const Icon = getIcon(modulo.icon);
  // Solo aplica en móvil: en escritorio la lista siempre se ve (el botón está oculto por CSS)
  const [abierto, setAbierto] = useState(false);
  const listaId = `incluye-${modulo.id}`;
  return (
    <li className={`${styles.card} ${elegido ? styles.cardElegida : ""}`}>
      <div className={styles.cardTop}>
        <span className={`${styles.cardIcono} mu-hex`} aria-hidden="true">
          <Icon />
        </span>
        <span className={styles.cardEtiqueta}>{modulo.etiqueta}</span>
      </div>
      <h3 className={styles.cardTitulo}>{modulo.textoTitulo}</h3>
      <p className={styles.cardResumen}>{modulo.resumen}</p>
      <button
        type="button"
        className={styles.cardVerMas}
        aria-expanded={abierto}
        aria-controls={listaId}
        onClick={() => setAbierto((v) => !v)}
      >
        {abierto ? "Ocultar detalle" : `Ver lo que incluye (${modulo.incluye.length})`}
        <ExpandMoreRounded aria-hidden="true" />
      </button>
      <ul id={listaId} className={styles.cardIncluye} data-abierto={abierto}>
        {modulo.incluye.map((item) => (
          <li key={item}>
            <CheckRounded aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>
      {/* aria-pressed: el lector de pantalla anuncia si el módulo está elegido */}
      <button
        type="button"
        className={styles.cardToggle}
        aria-pressed={elegido}
        onClick={() => onToggle(modulo.id)}
      >
        {elegido ? <CheckRounded aria-hidden="true" /> : <AddRounded aria-hidden="true" />}
        {elegido ? "En mi propuesta" : "Agregar módulo"}
        <span className="mu-sr-only"> {modulo.textoTitulo}</span>
      </button>
    </li>
  );
};

/**
 * Sección de venta modular: suite completa o módulos sueltos.
 * El resumen genera un mensaje prellenado para WhatsApp o correo.
 */
const ArmaTuTar = () => {
  const [elegidos, setElegidos] = useState(() => new Set());

  const toggle = useCallback((id) => {
    setElegidos((prev) => {
      const sig = new Set(prev);
      if (sig.has(id)) sig.delete(id);
      else sig.add(id);
      return sig;
    });
  }, []);

  const esSuite = elegidos.size === TOTAL;
  const elegirSuite = () => setElegidos(new Set(MODULOS_VENTA.map((m) => m.id)));
  const limpiar = () => setElegidos(new Set());

  const { whatsapp, correo } = useMemo(() => {
    const lista = MODULOS_VENTA.filter((m) => elegidos.has(m.id));
    const msg = encodeURIComponent(armarMensaje(lista));
    const asunto = encodeURIComponent("Solicitud de propuesta TAR");
    return {
      whatsapp: `https://wa.me/${soloDigitos(VENTAS.whatsapp)}?text=${msg}`,
      correo: `mailto:${VENTAS.email}?subject=${asunto}&body=${msg}`,
    };
  }, [elegidos]);

  const resumen = esSuite
    ? `Suite completa · ${TOTAL} módulos`
    : `${elegidos.size} de ${TOTAL} módulos`;

  return (
    <section
      id="modulos"
      className="mu-section mu-section--alt"
      aria-labelledby="modulos-titulo"
    >
      <div className="mu-container">
        <span className="mu-chip">Licenciamiento flexible</span>
        <h2 id="modulos-titulo" className="mu-title" style={{ marginTop: 16 }}>
          Suite completa o solo los módulos que necesitas
        </h2>
        <span className="mu-accent" />
        <p className="mu-lead">
          Cada módulo funciona por sí solo. Empieza con uno y agrega los demás
          cuando tu entidad lo requiera, o adquiere los seis desde el inicio.
        </p>

        {/* Modalidades */}
        <div className={styles.modalidades}>
          <button
            type="button"
            className={`${styles.modalidad} ${esSuite ? styles.modalidadActiva : ""}`}
            aria-pressed={esSuite}
            onClick={esSuite ? limpiar : elegirSuite}
          >
            <span className={styles.modalidadNum}>{TOTAL}</span>
            <span>
              <strong>Suite completa</strong>
              <small>Todos los módulos en una sola licencia</small>
            </span>
          </button>
          <div className={styles.modalidad} aria-hidden="true">
            <span className={styles.modalidadNum}>1+</span>
            <span>
              <strong>Por módulos</strong>
              <small>Elige abajo solo los que necesitas</small>
            </span>
          </div>
        </div>

        <ul className={styles.grid}>
          {MODULOS_VENTA.map((m) => (
            <TarjetaModulo
              key={m.id}
              modulo={m}
              elegido={elegidos.has(m.id)}
              onToggle={toggle}
            />
          ))}
        </ul>

        <p className={styles.incluidoSiempre}>
          <strong>Incluido en cualquier modalidad:</strong>{" "}
          {INCLUIDO_SIEMPRE.join(" · ")}
        </p>

        {/* Resumen fijo al fondo: solo aparece cuando ya hay módulos elegidos */}
        {elegidos.size > 0 && (
          <div className={styles.resumen} aria-live="polite">
            <div className={styles.resumenTexto}>
              <span className={styles.resumenConteo}>{resumen}</span>
              <button type="button" className={styles.resumenLimpiar} onClick={limpiar}>
                Limpiar
              </button>
            </div>
            <div className={styles.resumenAcciones}>
              <a
                href={whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="mu-btn mu-btn--primary"
              >
                <WhatsApp aria-hidden="true" />
                <span className={styles.textoLargo}>Solicitar propuesta</span>
                <span className={styles.textoCorto}>Solicitar</span>
              </a>
              <a
                href={correo}
                className={`mu-btn mu-btn--ghost ${styles.btnCorreo}`}
                aria-label="Solicitar propuesta por correo"
              >
                <EmailOutlined aria-hidden="true" />
                <span className={styles.btnCorreoTexto}>Por correo</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ArmaTuTar;
