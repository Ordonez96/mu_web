import { motion } from 'framer-motion';
import { UI } from '../hex/HexFlower';
import styles from '../hex/Hex.module.css';

/**
 * Encabezado de página estilo TAR:
 * chip "MU Consulting" + título en degradado marino (mayúsculas) + barra de acento 56×3.
 * Opcionalmente envuelve contenido (children) sobre el panal reactivo.
 * El panal es global (FondoPanal en App), por eso aquí no hay canvas.
 */
const PageHeader = ({ chip = 'MU Consulting', titulo, subtitulo, children, acciones }) => {
  return (
    <section className={styles.lienzo}>
      <div className={`mu-container ${styles.lienzoContenido}`}>
        <motion.header
          className={styles.encabezado}
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: UI.ease }}
          style={children ? undefined : { paddingBottom: 'clamp(40px, 6vw, 72px)', marginBottom: 0 }}
        >
          <span className="mu-chip">{chip}</span>
          <h1 className={styles.encabezadoTitulo}>{titulo}</h1>
          <span className="mu-accent" style={{ marginBottom: 0 }} />
          {subtitulo && <p className={styles.encabezadoSub}>{subtitulo}</p>}
          {acciones}
        </motion.header>
        {children}
      </div>
    </section>
  );
};

export default PageHeader;
