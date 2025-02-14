// GestionFinancieraProyectos.jsx
import { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography,
  Paper,
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText,
  Skeleton,
  useTheme,
  useMediaQuery 
} from '@mui/material';
import { motion } from 'framer-motion';
import BalanceIcon from '@mui/icons-material/Balance';
import AddTaskIcon from '@mui/icons-material/AddTask';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import LanIcon from '@mui/icons-material/Lan';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';

// Importar componente LogoFooter
import LogoFooter from '../../LogoFooter';

// Importar las imágenes
import tabla from '/src/components/services/gestion_financiera_proyectos/img/tabla.png';
import foco from '/src/components/services/gestion_financiera_proyectos/img/foco.png';
import { useDocumentTitle } from '../../useDocumentTittle';

// Configuración de animaciones
const ANIMACIONES = {
  transicion: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  hover: {
    transformacion: 'scale(1.05)',
    elevacion: '0 12px 24px rgba(0,0,0,0.2)'
  }
};

// Configuración de animaciones de entrada
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

/**
 * Componente GestionFinancieraProyectos
 * @description Página principal de gestión financiera y proyectos que muestra información sobre
 * servicios financieros y sistema SARAS
 * @returns {JSX.Element} Elemento JSX que contiene la página completa
 */
const GestionFinancieraProyectos = () => {
  // Estado para controlar la carga inicial
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Efecto para simular carga inicial
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Datos de los servicios SARAS
  const SARAS = [
    { icon: <CorporateFareIcon />, text: 'Valoración de empresas' },
    { icon: <BalanceIcon />, text: 'Gestión de flujos de caja y contingencias' },
    { icon: <LanIcon />, text: 'Evaluación de sistema contable' },
    { icon: <AddTaskIcon />, text: 'Evaluación de cumplimiento tributario' },
    { icon: <PriceCheckIcon />, text: 'Formulación y evaluación de proyectos de inversión' },
  ];

  /**
   * Componente para mostrar el esqueleto de carga
   * @returns {JSX.Element} Elemento JSX que muestra el esqueleto durante la carga
   */
  const SectionSkeleton = () => (
    <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', mb: 1, gap: 1 }}>
      <Box sx={{ flex: 1 }}>
        <Skeleton variant="text" height={40} sx={{ mb: 2 }} />
        <Skeleton variant="text" height={20} sx={{ mb: 1 }} />
        <Skeleton variant="text" height={20} sx={{ mb: 1 }} />
        <Skeleton variant="text" height={20} sx={{ mb: 1 }} />
        {[...Array(4)].map((_, index) => (
          <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Skeleton variant="circular" width={24} height={24} sx={{ mr: 2 }} />
            <Skeleton variant="text" width="80%" height={20} />
          </Box>
        ))}
      </Box>
      <Skeleton 
        variant="rectangular" 
        width={isMobile ? '100%' : '35%'} 
        height={300}
      />
    </Box>
  );

  // Estilos para las secciones
  const sectionStyle = {
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    alignItems: 'center',
    mb: 4,
    '& img': {
      width: isMobile ? '100%' : '35%',
      mb: isMobile ? 2 : 0,
      mt: isMobile ? 2 : 0,
      transition: ANIMACIONES.transicion,
      '&:hover': {
        transform: ANIMACIONES.hover.transformacion
      }
    }
  };

  useDocumentTitle('MU - Gestión Financiera y Proyectos');

  return (
    <Container 
      component={motion.div}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      maxWidth="xl" 
      sx={{ 
        py: 5,
        background: 'linear-gradient(135deg,rgb(255, 255, 255) 0%,rgb(255, 255, 255) 100%)',
        minHeight: '100vh'
      }}
    >
      {loading ? (
        <>
          <Skeleton variant="rectangular" height={60} sx={{ mb: 2 }} />
          <Skeleton variant="text" height={30} sx={{ mb: 4, width: '60%', mx: 'auto' }} />
          <SectionSkeleton />
          <SectionSkeleton />
        </>
      ) : (
        <>
          {/* Título principal */}
          <Typography 
          variant="h3"
            sx={{
              textAlign: 'center',
              fontWeight: 700,
              color: '#1a237e',
              fontSize: { xs: '1.8rem', md: '3rem' },
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                letterSpacing: '0.15em'
              }
          }}
        >
          Gestion Financiera y Proyectos
        </Typography>
          
          {/* Subtítulo */}
          <Typography 
            component={motion.h6}
            variants={itemVariants}
            variant="h6" 
            align="center" 
            color="secondary" 
            sx={{ 
              mb: 4,
              fontSize: { xs: '1.1rem', sm: '1.25rem', md: '1.5rem' }
            }}
          >
            Desarrolla los siguientes servicios
          </Typography>

          {/* Sección de Riesgos Financieros */}
          <Box 
            component={motion.div}
            variants={itemVariants}
            sx={sectionStyle}
          >
            <Paper 
              elevation={3} 
              sx={{ 
                p: 3, 
                flex: 1, 
                width: '100%',
                transition: ANIMACIONES.transicion,
                '&:hover': {
                  transform: ANIMACIONES.hover.transformacion,
                  boxShadow: ANIMACIONES.hover.elevacion
                }
              }}
            >
              <Typography variant="h5" color="primary" sx={{ mb: 3 }}>
                Gestion Financiera 
              </Typography>
              <Typography textAlign={'justify'} variant="body1" sx={{ mb: 2 }}>
                La Gestión Financiera y Contable se fundamenta en la eficacia de la información estructural de la organización para la efectiva toma de decisiones. Esta gestión debe ser totalmente confiable, por lo que ofrecemos servicios de consultoría basados en metodologías y soluciones que conduzcan a la optimización de ingresos y costos.
              </Typography>
              <Typography textAlign={'justify'} variant="body1" sx={{ mb: 2 }}>
                Esta gestión debe ser totalmente confiable, por lo que ofrecemos servicios de consultoría basados en metodologías y soluciones que conduzcan a la optimización de ingresos y costos.
              </Typography>
              <Typography textAlign={'justify'} variant="body1" sx={{ mb: 2 }}>
                Nuestros servicios financieros y de evaluación de proyectos permiten tomar las mejores decisiones de inversión, estableciendo la viabilidad y rentabilidad de los proyectos a través técnicas modernas de valoración.
              </Typography>
            </Paper>
            <Box 
              component="img"
              src={tabla}
              alt="Imagen Derecha"
              sx={{ 
                ml: isMobile ? 0 : 4,
                width: {
                  xs: '100% !important',
                  md: '900px !important'
                },
                maxWidth: '100% !important',
                height: 'auto !important'
              }}
            />
          </Box>

          {/* Sección SARAS */}
          <Box 
            component={motion.div}
            variants={itemVariants}
            sx={sectionStyle}
          >
            {!isMobile && (
              <Box 
                component="img"
                src={foco}
                alt="Imagen Izquierda"
                sx={{ 
                  mr: 4,
                  width: {
                    xs: '100% !important',
                    md: '400px !important'
                  },
                  maxWidth: '100% !important',
                  height: 'auto !important'
                }}
              />
            )}
            <Paper 
              elevation={3} 
              sx={{ 
                p: 3, 
                flex: 1, 
                width: '100%',
                transition: ANIMACIONES.transicion,
                '&:hover': {
                  transform: ANIMACIONES.hover.transformacion,
                  boxShadow: ANIMACIONES.hover.elevacion
                }
              }}
            >
              <Typography variant="h8" color="secondary" sx={{ mb: 3 }}>
                Desarrollamos el Sistema de Administración de Riesgo Ambiental y Social (SARAS) 
              </Typography>
              <List>
                {SARAS.map((riesgo, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>{riesgo.icon}</ListItemIcon>
                    <ListItemText primary={riesgo.text} />
                  </ListItem>
                ))}
              </List>
            </Paper>
            {isMobile && (
              <Box 
                component="img"
                src={foco}
                alt="Imagen Izquierda"
              />
            )}
          </Box>

          {/* Componente LogoFooter */}
          <LogoFooter />
        </>
      )}
    </Container>
  );
};

export default GestionFinancieraProyectos;