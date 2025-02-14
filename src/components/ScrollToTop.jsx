import { useEffect, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();

  // useLayoutEffect se ejecuta antes que los cambios visuales
  useLayoutEffect(() => {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'  // Fuerza un scroll instantáneo
    });
  }, [pathname]);

  // useEffect como respaldo
  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTo(0, 0);
      document.body.scrollTo(0, 0);
    };

    // Ejecutar inmediatamente
    scrollToTop();

    // Ejecutar después del paint
    requestAnimationFrame(scrollToTop);

    // Ejecutar después de un pequeño delay
    setTimeout(scrollToTop, 0);
    
    // Ejecutar después de que el contenido se cargue
    window.addEventListener('load', scrollToTop, { once: true });

    return () => {
      window.removeEventListener('load', scrollToTop);
    };
  }, [pathname]);

  return null;
}

export default ScrollToTop;