import { useEffect, useRef } from 'react';

/**
 * Progreso de scroll de un elemento, de 0 a 1, escrito como variable CSS `--p`.
 *
 * - No provoca re-renders: el CSS lee `--p` y anima solo transform/opacity.
 * - Un único listener pasivo + requestAnimationFrame (máximo 1 cálculo por frame).
 * - Solo escucha mientras el elemento está cerca del viewport (IntersectionObserver).
 * - prefers-reduced-motion: deja `--p` fijo en 1 (estado final, sin animación).
 *
 * @param {object}   opts
 * @param {number}   opts.inicio  fracción del viewport donde empieza (1 = el borde superior del elemento toca el fondo de la pantalla)
 * @param {number}   opts.fin     fracción del viewport donde termina (0 = el borde inferior del elemento toca el tope)
 * @param {'entrada'|'recorrido'} opts.modo
 *        'entrada'   → 0 cuando el tope del elemento está en `inicio`, 1 cuando está en `fin`.
 *        'recorrido' → 0 cuando el elemento empieza a pasar, 1 cuando terminó (para secciones sticky).
 * @param {(p:number)=>void} [opts.onProgreso] callback opcional (ej. cambiar un índice activo).
 */
export function useScrollProgress({ inicio = 1, fin = 0.3, modo = 'entrada', onProgreso } = {}) {
  const ref = useRef(null);
  const cb = useRef(onProgreso);
  cb.current = onProgreso;

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.style.setProperty('--p', '1');
      cb.current?.(1);
      return undefined;
    }

    let raf = 0;
    let ultimo = -1;

    const calcular = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      let p;
      if (modo === 'recorrido') {
        const total = r.height - vh;
        p = total > 0 ? -r.top / total : r.top <= 0 ? 1 : 0;
      } else {
        const a = vh * inicio;
        const b = vh * fin;
        p = (a - r.top) / (a - b);
      }
      p = Math.min(1, Math.max(0, p));
      if (Math.abs(p - ultimo) < 0.001) return;
      ultimo = p;
      el.style.setProperty('--p', p.toFixed(4));
      cb.current?.(p);
    };

    const programar = () => {
      if (!raf) raf = requestAnimationFrame(calcular);
    };

    let escuchando = false;
    const activar = (si) => {
      if (si === escuchando) return;
      escuchando = si;
      if (si) {
        window.addEventListener('scroll', programar, { passive: true });
        window.addEventListener('resize', programar, { passive: true });
        programar();
      } else {
        window.removeEventListener('scroll', programar);
        window.removeEventListener('resize', programar);
      }
    };

    const io = new IntersectionObserver(([e]) => activar(e.isIntersecting), { rootMargin: '25% 0px' });
    io.observe(el);
    calcular();

    return () => {
      io.disconnect();
      activar(false);
      cancelAnimationFrame(raf);
    };
  }, [inicio, fin, modo]);

  return ref;
}

/**
 * Marca un elemento como visible (clase `data-visible`) la primera vez que entra en pantalla.
 * Sirve para disparar animaciones CSS una sola vez.
 */
export function useEnPantalla(umbral = 0.25) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.dataset.visible = 'true';
          io.disconnect();
        }
      },
      { threshold: umbral }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [umbral]);
  return ref;
}
