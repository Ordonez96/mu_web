import { useState, useEffect } from 'react';
import { Box, Typography, Skeleton, useTheme, useMediaQuery, Container } from '@mui/material';
import { motion } from 'framer-motion';

// Importación de imágenes
import riskBanner from '../img/about/risk.jpg';
import mainImage from '../img/about/imagen.png';
import honeyBackground from '../img/about/honeybg.jpg'; // Nueva importación para el fondo
import LogoFooter from '../components/LogoFooter';
import { useDocumentTitle } from './useDocumentTittle';

// Configuración de animaciones
const ANIMACIONES = {
  transicion: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  hover: {
    transformacion: 'scale(1.02)',
    elevacion: '0 12px 24px rgba(0,0,0,0.2)'
  }
};

// Variantes de animación para entrada de componentes
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      duration: 0.8,
      when: "beforeChildren",
      staggerChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { duration: 0.6 }
  }
};

// Contenido de las secciones
const sections = [
  {
    title: "Quiénes Somos",
    content: `Somos un equipo multidisciplinario de profesionales altamente calificados con amplia experiencia en Gestión de Riesgos, Gestión Financiera y Gestión de Información. <br /> 
              Nuestro servicio personalizado tiene por enfoque agregar valor a las organizaciones mediante métodos modernos de gestión, desarrollados en consonancia con el marco regulatorio, con los objetivos organizacionales, y al sano equilibrio rentabilidad riesgo.`
  },
  {
    title: "Nuestros Servicios",
    content: `Nuestra oferta de servicios comprende realizar un diagnóstico dentro del marco legal, acompañamiento en la implementación y capacitación al equipo de trabajo para que su organización logre los objetivos estratégicos, sobre una base sólida y sostenible.`
  }
];

// Componente de Skeleton para secciones de texto
const TextSectionSkeleton = () => (
  <>
    <Skeleton variant="text" width="60%" height={40} sx={{ mb: 3 }} />
    <Skeleton variant="text" width="100%" height={20} />
    <Skeleton variant="text" width="100%" height={20} />
    <Skeleton variant="text" width="100%" height={20} />
  </>
);

const About = () => {
  // Estado de carga inicial
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Simular tiempo de carga
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  useDocumentTitle('MU - Sobre Nosotros');
  return (
    <Box 
      component={motion.div}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      sx={{ 
        width: "100%", 
        padding: 0,
        background: 'linear-gradient(135deg,rgb(255, 255, 255) 0%,rgb(254, 254, 255) 100%)',
        minHeight: '100vh'
      }}
    >
      {/* Banner superior con efecto de desvanecimiento */}
      <Box
        component={motion.img}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        src={riskBanner}
        alt="Banner Risk"
        sx={{
          width: '100%',
          height: { xs: '200px', md: '300px' },
          objectFit: 'cover',
          marginBottom: 0.2,
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          filter: 'brightness(0.9) contrast(1.1)',
          position: 'relative',
          transition: ANIMACIONES.transicion,
          '&:hover': {
            transform: ANIMACIONES.hover.transformacion
          }
        }}
      />

      {/* Nuevo texto después del banner */}
      <Box
        component={motion.div}
        variants={itemVariants}
        sx={{
          textAlign: 'center',
          py: { xs: 4, md: 6 },
          background: 'linear-gradient(to right, rgba(255,255,255,0.9), rgba(255,255,255,0.95), rgba(255,255,255,0.9))'
        }}
      >
        <Typography 
          variant="h3"
          sx={{
            fontWeight: 700,
            color: '#1a237e',
            fontSize: { xs: '1.8rem', md: '2.5rem' },
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              letterSpacing: '0.15em'
            }
          }}
        >
          Somos Especialistas en Gestión de Riesgos
        </Typography>
      </Box>

      {/* Contenido principal */}
      {loading ? (
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Skeleton variant="rectangular" width="100%" height={300} />
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
              {sections.map((_, index) => (
                <Box key={index} sx={{ flex: 1 }}>
                  <TextSectionSkeleton />
                </Box>
              ))}
            </Box>
          </Box>
        </Container>
      ) : (
        <>
          <Container maxWidth="lg">
            {/* Imagen principal */}
            <Box 
              component={motion.div}
              variants={itemVariants}
              sx={{
                width: '100%',
                borderRadius: 2,
                overflow: 'hidden',
                transition: ANIMACIONES.transicion,
                mb: 4,
                '&:hover': {
                  transform: ANIMACIONES.hover.transformacion,
                  boxShadow: ANIMACIONES.hover.elevacion
                }
              }}
            >
              <img
                src={mainImage}
                alt="Imagen About"
                style={{ 
                  width: '100%', 
                  height: 'auto', 
                  objectFit: 'cover', 
                  display: 'block' 
                }}
              />
            </Box>
          </Container>

          {/* Sección con fondo de panal */}
          <Box
            sx={{
              width: '100%',
              backgroundImage: `url(${honeyBackground})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              py: { xs: 8, md: 14 }, // 64px en móvil, 96px en desktop
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(255, 255, 255, 0.40)',
                zIndex: 1
              }
            }}
          >
            <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
              {/* Secciones de texto */}
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', md: 'row' },
                  gap: 3
                }}
              >
                {sections.map((section, index) => (
                  <Box
                    key={index}
                    component={motion.div}
                    variants={itemVariants}
                    sx={{
                      flex: 1,
                      bgcolor: 'rgb(255, 255, 255, 0.6)',
                      p: 4,
                      borderRadius: 2,
                      transition: ANIMACIONES.transicion,
                      backdropFilter: 'blur(5px)',
                      '&:hover': {
                        transform: ANIMACIONES.hover.transformacion,
                        boxShadow: ANIMACIONES.hover.elevacion
                      }
                    }}
                  >
                    <Typography 
                      variant="h4" 
                      sx={{
                        mb: 3,
                        fontWeight: 600,
                        color: '#1a237e',
                        fontSize: { xs: '1.5rem', md: '2rem' }
                      }}
                    >
                      {section.title}
                    </Typography>
                    <Typography 
                      variant="body1" 
                      sx={{
                        lineHeight: 1.8,
                        color: '#424242',
                        textAlign: 'justify',
                        fontSize: { xs: '0.9rem', md: '1rem' },

                      }}
                      dangerouslySetInnerHTML={{
                        __html: section.content
                      }}
                    />
                  </Box>
                ))}
              </Box>
            </Container>
          </Box>
        </>
      )}
      {/* Logo Footer con Link */}
      <LogoFooter />
    </Box>
  );
};

export default About;