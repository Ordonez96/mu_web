// LogoFooter.jsx
import { Link } from 'react-router-dom';
import { Box } from '@mui/material';
import { motion } from 'framer-motion';

// Importar la imagen del logo
import logoFooter from '/src/img/logo/logo-footer.png';

// Configuración de animaciones
const ANIMACIONES = {
  transicion: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  hover: {
    transformacion: 'scale(1.05)'
  }
};

/**
 * Componente LogoFooter
 * @description Componente reutilizable que muestra el logo del footer con animaciones y enlace a la página principal
 * @returns {JSX.Element} Elemento JSX que contiene el logo animado
 */
const LogoFooter = () => {
  return (
    <Box sx={{ textAlign: 'center', marginTop: '2rem' }}>
      <Link to="/">
        <Box
          component={motion.img}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          src={logoFooter}
          alt="Logo Footer"
          sx={{
            width: { xs: 180, sm: 220, md: 250 },
            height: 'auto',
            display: 'inline-block',
            opacity: 0.7,
            cursor: 'pointer',
            transition: ANIMACIONES.transicion,
            '&:hover': {
              opacity: 0.9,
              transform: ANIMACIONES.hover.transformacion
            }
          }}
        />
      </Link>
    </Box>
  );
};

export default LogoFooter;