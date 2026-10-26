import { useLayoutEffect, useRef, useState } from 'react';
import HexFlower from '../../hex/HexFlower';
import { getIcon } from '../../ui/icons';
import { MODULOS_TAR, DEFECTO_TAR } from './muTarContent';
import styles from './MuTar.module.css';

/* Ancho de diseño de la réplica: se renderiza como en escritorio y se escala a la ventana */
const ANCHO_DISENO = 1240;

/**
 * Ventana de la app TAR con una réplica funcional de su Home real
 * (barra lateral colapsada, encabezado, panal en flor y panel).
 * El contenido se escala con transform: los clics y el hover siguen funcionando.
 */
const TarMockup = () => {
  const marcoRef = useRef(null);
  const contenidoRef = useRef(null);
  const [escala, setEscala] = useState(0.5);
  const [alto, setAlto] = useState(0);

  useLayoutEffect(() => {
    const marco = marcoRef.current;
    const contenido = contenidoRef.current;
    if (!marco || !contenido) return undefined;
    const medir = () => {
      const s = marco.clientWidth / ANCHO_DISENO;
      setEscala(s);
      setAlto(contenido.offsetHeight * s);
    };
    medir();
    const ro = new ResizeObserver(medir);
    ro.observe(marco);
    ro.observe(contenido);
    return () => ro.disconnect();
  }, []);

  const Hive = getIcon('hiveFill');

  return (
    <div className={styles.ventana} role="region" aria-label="Vista interactiva del Home de TAR">
      <div className={styles.ventanaBarra} aria-hidden="true">
        <span className={styles.ventanaPuntos}>
          <i />
          <i />
          <i />
        </span>
        <span className={styles.ventanaUrl}>TAR · Sistema de Administración de Riesgos</span>
      </div>

      <div ref={marcoRef} className={styles.ventanaMarco} style={{ height: alto || undefined }}>
        <div
          ref={contenidoRef}
          className={styles.app}
          style={{ width: ANCHO_DISENO, transform: `scale(${escala})` }}
        >
          {/* Barra lateral colapsada (como en la app) */}
          <aside className={styles.appLateral} aria-hidden="true">
            <span className={`${styles.appLogo} mu-hex`}>
              <Hive />
            </span>
            {MODULOS_TAR.map((m) => {
              const Icon = getIcon(m.icon);
              return (
                <span key={m.id} className={styles.appLateralIcono}>
                  <Icon />
                </span>
              );
            })}
          </aside>

          <div className={styles.appMain}>
            <div className={styles.appEncabezado}>
              <span className={styles.appChip}>MU Consulting</span>
              <p className={styles.appTitulo}>Sistema de Administración de Riesgos</p>
              <span className={styles.appAcento} />
            </div>
            <HexFlower
              items={MODULOS_TAR}
              nucleo={{ titulo: 'TAR', subtitulo: 'MU CONSULTING' }}
              defecto={DEFECTO_TAR}
              unidad="Módulo"
              forzarMd
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TarMockup;
