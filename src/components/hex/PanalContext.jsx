import { createContext, useContext, useRef } from 'react';
import HoneycombCanvas from './HoneycombCanvas';

/**
 * Panal global: UN solo canvas fijo detrás de toda la página.
 * - Acompaña el scroll de arriba abajo (no se corta entre secciones).
 * - Tamaño = pantalla, así nunca dibuja más de lo visible.
 * - Cualquier componente lanza ondas con usePanal().current?.pulso(x, y, fuerza).
 */
const PanalContext = createContext({ current: null });

export const FondoPanal = ({ children }) => {
  const ref = useRef(null);
  return (
    <PanalContext.Provider value={ref}>
      <div className="mu-fondo" aria-hidden="true">
        <HoneycombCanvas ref={ref} />
      </div>
      {children}
    </PanalContext.Provider>
  );
};

/** Ref al panal global (tiene .pulso(clientX, clientY, fuerza)). */
export const usePanal = () => useContext(PanalContext);
