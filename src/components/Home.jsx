/**
 * Configuración principal y setup para la página de inicio
 * @module HomeConfig
 */

// Importaciones principales
import { 
  Box, Container, Typography, useTheme, useMediaQuery 
} from '@mui/material';
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';
import EngineeringIcon from '@mui/icons-material/Engineering';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ForestIcon from '@mui/icons-material/Forest';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import 'swiper/css/bundle';

// Importar componente LogoFooter
import LogoFooter from '../components/LogoFooter';

// Importación de recursos estáticos
import image1 from '../img/slider/image1.png';
import image2 from '../img/slider/image2.webp';
import image3 from '../img/slider/image3.png';
import image4 from '../img/slider/image4.jpg';
import especialistasBg from '../img/backgrounds/especialistas-bg.jpeg';
import misionBg from '../img/backgrounds/mision-bg.jpg';


/**
 * Configuración del slider principal
 * @constant {Object} SLIDER_CONFIG
 */
export const SLIDER_CONFIG = {
  imagenes: [image1, image4, image2, image3],
  tiempoAutoplay: 3500,
  duracionTransicion: 300,
};

/**
 * Definición de servicios con configuración responsive
 * @constant {Array} SERVICIOS
 */
export const SERVICIOS = [
  { 
    titulo: 'Gestion Financiera', 
    colorPrincipal: '#FFA500',
    colorHover: '#FFB732',
    colorGradiente: 'linear-gradient(135deg, #FFA500 0%, #FF8C00 100%)',
    icono: <AssuredWorkloadIcon />,
    descripcion: 'y proyectos',
    ruta: '/gestion-financiera-proyectos'
  },
  { 
    titulo: 'Riesgo Ambiental', 
    colorPrincipal: '#4287F5',
    colorHover: '#5A9BFF',
    colorGradiente: 'linear-gradient(135deg, #4287F5 0%, #2D5FBA 100%)',
    icono: <ForestIcon />,
    descripcion: 'y Social',
    ruta: '/riesgo-ambiental-social'
  },
  { 
    titulo: 'Riesgo Financiero', 
    colorPrincipal: '#FF0000',
    colorHover: '#FF3333',
    colorGradiente: 'linear-gradient(135deg, #FF0000 0%, #CC0000 100%)',
    icono: <MonetizationOnIcon />,
    ruta: '/riesgo-financiero'
  },
  { 
    titulo: 'Riesgo Estratégico', 
    colorPrincipal: '#0000FF',
    colorHover: '#3333FF',
    colorGradiente: 'linear-gradient(135deg, #0000FF 0%, #0000CC 100%)',
    icono: <EngineeringIcon />,
    descripcion: 'y Operacional',
    ruta: '/riesgo-estrategico-operacional'
  }
];

/**
 * Configuración de animaciones responsive
 * @constant {Object} ANIMACIONES
 */
export const ANIMACIONES = {
  transicion: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  hover: {
    transformacion: 'scale(1.05)',
    brillo: 'brightness(1.1)',
    elevacion: '0 12px 24px rgba(0,0,0,0.2)'
  },
  mobile: {
    transformacion: 'scale(1.02)',
    elevacion: '0 8px 16px rgba(0,0,0,0.15)'
  }
};
/**
 * Componentes base de la página de inicio
 * @module HomeBaseComponents
 */

/**
 * Componente del Slider Principal
 * @component
 */
export const SliderPrincipal = () => (
  <Box sx={{ 
    mt: { xs: 2, sm: 3, md: 1 },
    mb: { xs: 3, sm: 4, md: 2 },
    boxShadow: { 
      xs: '0 4px 16px rgba(0,0,0,0.1)',
      md: '0 8px 32px rgba(0,0,0,0.15)'
    },
    borderRadius: { xs: '12px', md: '10px' },
    overflow: 'hidden'
  }}>
    <Swiper
      modules={[Autoplay, Pagination, Navigation]}
      spaceBetween={0}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true, dynamicBullets: true }}
      autoplay={{
        delay: SLIDER_CONFIG.tiempoAutoplay,
        disableOnInteraction: false,
      }}
      style={{ 
        width: '100%',
        height: '250px' // Altura fija 
      }}
    >
      {SLIDER_CONFIG.imagenes.map((imagen, index) => (
        <SwiperSlide key={index}>
          <img 
            src={imagen}
            alt={`Slide ${index + 1}`}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'inherit',
              objectPosition: 'center'
            }}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  </Box>
);

/**
 * Componente Hexágono para servicios
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {Object} props.servicio - Datos del servicio
 * @param {number} props.angulo - Ángulo de posición
 * @param {number} props.radio - Radio del círculo
 * @param {boolean} props.esMovil - Indicador de vista móvil
 */
export const HexagonoServicio = ({ servicio, angulo, radio, esMovil, index }) => {
  const navigate = useNavigate();
  
  const calcularPosicion = () => {
    if (esMovil) {
      return {
        x: 0,
        y: index * (radio + 120), // Aumentamos el espaciado vertical
      };
    }
    return {
      x: Math.cos(angulo) * radio,
      y: Math.sin(angulo) * radio,
    };
  };

  const { x, y } = calcularPosicion();

  return (
    <Box
      onClick={() => navigate(servicio.ruta)}
      sx={{
        position: esMovil ? 'relative' : 'absolute',
        left: esMovil ? 'auto' : `calc(50% + ${x}px)`,
        top: esMovil ? 'auto' : `calc(50% + ${y}px)`,
        transform: esMovil ? 'none' : 'translate(-50%, -50%)',
        mx: esMovil ? 'auto' : 0,
        width: { xs: '200px', sm: '220px', md: '220px' },
        height: { xs: '230px', sm: '250px', md: '250px' },
        clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
        cursor: 'pointer',
        transition: ANIMACIONES.transicion,
        background: servicio.colorGradiente,
        '&:hover': {
          transform: esMovil 
            ? `translate(-50%, -50%) ${ANIMACIONES.mobile.transformacion}`
            : `translate(-50%, -50%) ${ANIMACIONES.hover.transformacion}`,
          boxShadow: esMovil ? ANIMACIONES.mobile.elevacion : ANIMACIONES.hover.elevacion,
        }
      }}
    >
      <Box
        className="contenido"
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '92%',
          height: '92%',
          backgroundColor: 'rgba(255,255,255,0.95)',
          clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: { xs: 1, sm: 1.5, md: 2 },
          transition: ANIMACIONES.transicion
        }}
      >
        <Box 
          className="icono"
          sx={{ 
            color: servicio.colorPrincipal,
            fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
            mb: { xs: 1, sm: 1.5, md: 2 },
            transition: ANIMACIONES.transicion
          }}
        >
          {servicio.icono}
        </Box>
        <Typography 
          variant={esMovil ? "subtitle1" : "h6"}
          sx={{ 
            fontWeight: 700,
            color: servicio.colorPrincipal,
            textAlign: 'center',
            lineHeight: 1.2,
            mb: 1,
            fontSize: { xs: '0.875rem', sm: '1rem', md: '1.25rem' }
          }}
        >
          {servicio.titulo}
        </Typography>
        {servicio.descripcion && (
          <Typography 
            variant="body2"
            sx={{ 
              color: 'text.secondary',
              fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' },
              textAlign: 'center'
            }}
          >
            {servicio.descripcion}
          </Typography>
        )}
      </Box>
    </Box>
  );
};
/**
 * Sección de Especialistas
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {boolean} props.esMovil - Indicador de vista móvil
 */
export const SeccionEspecialistas = ({ esMovil }) => (
  <Box
    component={motion.div}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.8 }}
    sx={{
      position: 'relative',
      py: { xs: 4, sm: 5, md: 15 },
      px: { xs: 2, sm: 3, md: 4 },
      mb: { xs: 2, md: 0 },
      overflow: 'hidden',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: '-5%',
        right: '-5%',
        bottom: 0,
        backgroundImage: `url(${especialistasBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.35,
        zIndex: 0
      }
    }}
  >
    <Container maxWidth="lg">
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { xs: 'center', md: 'flex-start' },
          gap: { xs: 6, md: 4 },
          position: 'relative',
          zIndex: 1
        }}
      >
        <Box
          component={motion.div}
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          sx={{ 
            flex: 1,
            width: '100%',
            maxWidth: { xs: '100%', md: '50%' }
          }}
        >
          <Typography
            variant="h3"
            sx={{
              mb: 3,
              color: 'primary.main',
              fontWeight: 700,
              textAlign: { xs: 'center', md: 'left' },
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }
            }}
          >
            Especialistas en administración de riesgos
          </Typography>
          <Typography
            variant="h5"
            sx={{
              mb: 2,
              color: 'text.secondary',
              textAlign: { xs: 'center', md: 'left' },
              fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' }
            }}
          >
            Proveemos asesoramiento global y tecnología de alto desempeño
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              textAlign: { xs: 'center', md: 'left' },
              fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' }
            }}
          >
            Cubrimos de manera exhaustiva el ciclo de implementación,
            asegurando resultados óptimos para nuestros clientes.
          </Typography>
        </Box>

        <Box
          sx={{
            flex: 1,
            position: 'relative',
            display: { xs: 'flex', md: 'block' },
            flexDirection: { xs: 'column', md: 'unset' },
            gap: { xs: 3, sm: 4 },
            height: { md: '400px' },
            width: '100%',
            maxWidth: { xs: '100%', md: '50%' }
          }}
        >
          {SERVICIOS.map((servicio, index) => (
            <HexagonoServicio
              key={servicio.titulo}
              servicio={servicio}
              index={index}
              angulo={(index * Math.PI * 2) / SERVICIOS.length}
              radio={esMovil ? 0 : 150}
              esMovil={esMovil}
            />
          ))}
        </Box>
      </Box>
    </Container>
  </Box>
);
/**
 * Sección de Misión
 * @component
 */
export const SeccionMision = () => (
  <Box
    component={motion.div}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.8 }}
    sx={{
      position: 'relative',
      py: { xs: 4, sm: 5, md: 20 },
      px: { xs: 2, sm: 3, md: 4 },
      mb: { xs: 3, sm: 4, md: 6 },
      overflow: 'hidden',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: '-5%',
        right: '-5%',
        bottom: 0,
        backgroundImage: `url(${misionBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.35,
        zIndex: 0
      }
    }}
  >
    <Container maxWidth="lg">
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          maxWidth: 800,
          mx: 'auto',
          textAlign: 'center'
        }}
      >
        <Typography
          variant="h3"
          component={motion.h3}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          sx={{
            mb: { xs: 3, md: 4 },
            color: 'primary.main',
            fontWeight: 700,
            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }
          }}
        >
          Nuestra Misión
        </Typography>
        
        <Typography
          variant="h6"
          component={motion.div}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          sx={{ 
            mb: 3,
            color: 'text.secondary',
            fontSize: { xs: '1.1rem', sm: '1.25rem', md: '1.5rem' }
          }}
        >
          Nuestra misión es proveer soluciones tecnológicas eficientes y
          fáciles de usar, en tiempo récord, excediendo las expectativas de
          nuestros clientes.
        </Typography>

        <Box
          component={motion.div}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Typography 
            variant="h6" 
            sx={{ 
              mb: 2,
              color: 'primary.main',
              fontSize: { xs: '1.1rem', sm: '1.25rem', md: '1.5rem' }
            }}
          >
            Implementación en tiempo récord gracias a:
          </Typography>
          {[
            'Nuestra asesoría, tanto desde el punto de vista de negocio y regulatorio, como tecnológico.',
            'La disponibilidad de modelos de valuación predefinidos.',
            'Reportes regulatorios preconfigurados en la solución.',
            'Grupo de profesionales con amplia experiencia en servicios financieros.'
          ].map((punto, index) => (
            <Typography
              key={index}
              variant="body1"
              component={motion.p}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.6 + (index * 0.1) }}
              sx={{ 
                mb: 1,
                color: 'text.secondary',
                fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                textAlign: 'left',
                pl: { xs: 2, sm: 3 }
              }}
            >
              • {punto}
            </Typography>
          ))}
        </Box>
      </Box>
    </Container>
  </Box>
);
/**
 * Componente principal Home
 * @component
 */
const Home = () => {
  const theme = useTheme();
  const esMovil = useMediaQuery(theme.breakpoints.down('md'));
  const esMuyPequeno = useMediaQuery(theme.breakpoints.down('sm'));

  // Configuración responsive para hexágonos
  const radioHexagonos = () => {
    if (esMuyPequeno) return 80;
    if (esMovil) return 100;
    return 150;
  };

  return (
    <Box 
      component="section"
      sx={{
        background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
        minHeight: '100vh',
        overflow: 'hidden'
      }}
    >
      <Container 
        maxWidth="lg"
        sx={{
          px: { xs: 2, sm: 3, md: 4 },
          maxWidth: { xs: '100%', sm: '540px', md: '720px', lg: '1140px' }
        }}
      >
        <SliderPrincipal />
      </Container>

      <SeccionEspecialistas 
        esMovil={esMovil} 
        radioHexagonos={radioHexagonos()}
      />
      
      <SeccionMision />
      
      <Container 
        maxWidth="lg" 
        sx={{ 
          textAlign: 'center', 
          py: { xs: 3, sm: 4 },
          px: { xs: 2, sm: 3, md: 4 }
        }}
      >
        {/* Logo Footer con Link */}

        <LogoFooter />
      </Container>
    </Box>
  );
};

export default Home;