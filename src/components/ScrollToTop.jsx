import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ESPERA_MAX = 3000; // ms: las páginas lazy pueden tardar en montar la sección

/* El navegador no restaura el scroll por su cuenta: lo decide este componente */
if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual';

/**
 * Al cambiar de página sube al inicio.
 * Si la URL trae #ancla (ej. /software/mu-tar#modulos) baja a esa sección,
 * esperando a que exista porque las páginas se cargan de forma diferida.
 */
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useLayoutEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      return undefined;
    }

    const id = decodeURIComponent(hash.slice(1));
    const inicio = performance.now();
    let raf = 0;
    const buscar = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ block: 'start' });
      } else if (performance.now() - inicio < ESPERA_MAX) {
        raf = requestAnimationFrame(buscar);
      }
    };
    buscar();
    return () => cancelAnimationFrame(raf);
  }, [pathname, hash]);

  return null;
}

export default ScrollToTop;
