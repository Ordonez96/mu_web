import { motion, useReducedMotion } from 'framer-motion';
import { UI } from '../hex/HexFlower';

/* Desplazamiento inicial por dirección */
const DESDE = {
  arriba: { y: 24 },
  izquierda: { x: -32 },
  derecha: { x: 32 },
  zoom: { scale: 0.96 },
};

/**
 * Revela su contenido al entrar en pantalla (una sola vez), con la curva del sitio.
 * Con "reducir movimiento" solo hace fundido, sin desplazamiento.
 * @param {string} props.as        etiqueta HTML ('div', 'li', 'figure'...)
 * @param {string} props.desde     'arriba' | 'izquierda' | 'derecha' | 'zoom'
 * @param {number} props.retraso   segundos (para cascadas: i * 0.08)
 */
const Revelar = ({ as = 'div', desde = 'arriba', retraso = 0, children, ...resto }) => {
  const reducir = useReducedMotion();
  const Etiqueta = motion[as];

  return (
    <Etiqueta
      initial={{ opacity: 0, ...(reducir ? {} : DESDE[desde]) }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay: retraso, ease: UI.ease }}
      {...resto}
    >
      {children}
    </Etiqueta>
  );
};

export default Revelar;
