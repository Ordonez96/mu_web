import { useEffect, useState } from 'react';

/** Breakpoints compartidos (mismos valores que el CSS) */
export const MQ = {
  md: '(min-width: 900px)',
  sm: '(min-width: 640px)',
};

/**
 * true/false según una media query, actualizado al cambiar el tamaño.
 * Lee el valor en el primer render para no parpadear entre layouts.
 */
export function useMediaQuery(query) {
  const [coincide, setCoincide] = useState(() => window.matchMedia(query).matches);

  useEffect(() => {
    const mq = window.matchMedia(query);
    const fn = () => setCoincide(mq.matches);
    fn();
    mq.addEventListener('change', fn);
    return () => mq.removeEventListener('change', fn);
  }, [query]);

  return coincide;
}
