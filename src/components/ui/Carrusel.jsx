import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import ArrowForwardRounded from '@mui/icons-material/ArrowForwardRounded';
import { getIcon } from './icons';
import styles from './Carrusel.module.css';

/**
 * Carrusel horizontal para móvil con scroll-snap nativo (sin librerías).
 * La siguiente tarjeta asoma para invitar a deslizar; los puntos indican la posición.
 *
 * items: [{ id, icon, titulo, etiqueta?, parrafos?: string[], texto?, ruta?, cta? }]
 */
const Carrusel = ({ items, etiqueta = 'Elementos', numerar = false }) => {
  const pistaRef = useRef(null);
  const [activo, setActivo] = useState(0);

  // La tarjeta más visible marca el punto activo (un observer, sin listeners de scroll)
  useEffect(() => {
    const pista = pistaRef.current;
    if (!pista) return undefined;
    const io = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((e) => {
          if (e.isIntersecting) setActivo(Number(e.target.dataset.i));
        });
      },
      { root: pista, threshold: 0.6 }
    );
    Array.from(pista.children).forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [items]);

  const irA = (i) => {
    const el = pistaRef.current?.children[i];
    el?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
  };

  const total = String(items.length).padStart(2, '0');

  return (
    <div className={styles.carrusel}>
      <ul ref={pistaRef} className={styles.pista} aria-label={etiqueta}>
        {items.map((it, i) => {
          const Icon = getIcon(it.icon);
          return (
            <li key={it.id} data-i={i} className={styles.tarjeta}>
              <div className={styles.top}>
                <span className={`${styles.icono} mu-hex`} aria-hidden="true">
                  <Icon />
                </span>
                {numerar && (
                  <span className={styles.num}>
                    {String(i + 1).padStart(2, '0')} / {total}
                  </span>
                )}
                {it.etiqueta && <span className={styles.etiqueta}>{it.etiqueta}</span>}
              </div>
              <h3 className={styles.titulo}>{it.titulo}</h3>
              {(it.parrafos || [it.texto]).filter(Boolean).map((p) => (
                <p key={p} className={styles.texto}>
                  {p}
                </p>
              ))}
              {it.ruta && (
                <Link to={it.ruta} className={styles.cta}>
                  {it.cta || 'Ver más'} <ArrowForwardRounded aria-hidden="true" />
                </Link>
              )}
            </li>
          );
        })}
      </ul>

      <div className={styles.puntos}>
        {items.map((it, i) => (
          <button
            key={it.id}
            type="button"
            className={i === activo ? styles.puntoActivo : undefined}
            aria-label={`Ir a ${it.titulo}`}
            aria-current={i === activo ? 'true' : undefined}
            onClick={() => irA(i)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carrusel;
