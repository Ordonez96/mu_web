// RiesgoAmbientalSocial.jsx
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
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import GroupsIcon from '@mui/icons-material/Groups';
import DevicesIcon from '@mui/icons-material/Devices';
import DeviceHubIcon from '@mui/icons-material/DeviceHub';
import TroubleshootIcon from '@mui/icons-material/Troubleshoot';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

// Importar componente LogoFooter
import LogoFooter from '../../LogoFooter';

// Importar las imágenes
import diagramaImg from '/src/components/services/riesgo_ambiental_social/img/diagrama.png';
import personImg from '/src/components/services/riesgo_ambiental_social/img/person.png';
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
 * Componente RiesgoAmbientalSocial
 * @description Página que muestra información sobre la gestión de riesgos ambientales y sociales,
 * incluyendo el sistema SARAS y sus componentes
 * @returns {JSX.Element} Elemento JSX que contiene la página completa
 */
const RiesgoAmbientalSocial = () => {
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

  // Datos de los componentes del sistema SARAS
  const SARAS = [
    { icon: <AccountTreeIcon />, text: 'Marco de políticas y procedimientos' },
    { icon: <GroupsIcon />, text: 'Sistema de Gobernanza' },
    { icon: <DeviceHubIcon />, text: 'Modelo de clasificación del riesgo A&S' },
    { icon: <TroubleshootIcon />, text: 'Metodología de análisis por sector económico' },
    { icon: <DevicesIcon />, text: 'Sistema de monitoreo y mantenimiento de cartera' },
    { icon: <AccountBalanceIcon />, text: 'Desarrollo de productos de finanzas sostenibles' },
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

  // Estilos para las secciones principales
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

  useDocumentTitle('MU - Riesgo Ambiental y Social');

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
        // Contenido mientras carga
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
          Riesgo Ambiental y Social
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
            Desarrollamos modelos de gestión y metodologías de medición
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
                Responsabilidad Ambiental y Social
              </Typography>
              <Typography textAlign={'justify'} variant="body1" sx={{ mb: 2 }}>
                La responsabilidad ambiental y social adquiere cada vez más importancia en la economía mundial.
              </Typography>
              <Typography textAlign={'justify'} variant="body1" sx={{ mb: 2 }}>
                Las instituciones financieras deben desarrollar un compromiso proactivo de alineación a la agenda internacional y local de desarrollo sostenible, al incidir desde su rol de entidad financiera en algunos principios de sostenibilidad ambiental y social y contar con un Sistema de Gestión de Riesgos Ambientales y Sociales <span style={{color: 'red'}}>(SARAS)</span>, el cual debe identificar los impactos ambientales y sociales de las operaciones a financiar.
              </Typography>
              <Typography textAlign={'justify'} variant="body1" sx={{ mb: 2 }}>
                Este tipo de riesgos requiere una gestión eficaz y culturalmente arraigada ya que puede dar lugar a fenómenos o incidentes que impacten a nivel de cartera de activos de riesgo y a nivel estratégico desde el riesgo reputacional.
              </Typography>
            </Paper>
            <Box 
              component="img"
              src={diagramaImg}
              alt="Diagrama de Riesgos"
              sx={{ 
                ml: isMobile ? 0 : 4,
                width: {
                  xs: '100% !important',
                  md: '750px !important'
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
                src={personImg}
                alt="Persona Trabajando"
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
                src={personImg}
                alt="Persona Trabajando"
              />
            )}
          </Box>

          {/* Componente LogoFooter reutilizable */}
          <LogoFooter />
        </>
      )}
    </Container>
  );
};

export default RiesgoAmbientalSocial;