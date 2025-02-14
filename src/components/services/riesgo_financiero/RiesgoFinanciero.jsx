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
import {Warning} from '@mui/icons-material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

// Importar componente LogoFooter
import LogoFooter from '../../LogoFooter';

// Importar las imágenes
import diagramaImg from '/src/components/services/riesgo_financiero/img/diagrama.png';
import arbolImg from '/src/components/services/riesgo_financiero/img/arbol.png';
import { useDocumentTitle } from '../../useDocumentTittle';

// Configuración de animaciones para elementos interactivos
const ANIMACIONES = {
  transicion: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  hover: {
    transformacion: 'scale(1.05)',
    elevacion: '0 12px 24px rgba(0,0,0,0.2)'
  }
};

// Configuración de animaciones de entrada para el contenedor principal
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

// Configuración de animaciones para elementos individuales
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { duration: 0.6 }
  }
};

const RiesgoFinanciero = () => {
  // Estado para controlar la carga inicial
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Efecto para simular tiempo de carga
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Lista de riesgos de crédito con sus iconos
  const riesgosCredito = [
    { icon: <AccountBalanceWalletIcon />, text: 'Macro proceso de crédito' },
    { icon: <Diversity3Icon />, text: 'Modelos Scoring de originación y comportamiento' },
    { icon: <TrendingDownIcon />, text: 'Pronóstico de Pérdidas Esperadas' },
  ];

  // Lista de riesgos financieros con sus iconos
  const riesgosFinancieros = [
    { icon: <Warning />, text: 'Riesgo de liquidez y contingencias' },
    { icon: <LocalAtmIcon />, text: 'Riesgo de precios y divisas' },
    { icon: <MonetizationOnIcon />, text: 'Riesgo de tasa de interés' },
  ];

  // Componente de esqueleto para estado de carga
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

  // Estilos para las secciones principales con soporte responsive
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

  useDocumentTitle('MU - Riesgo Financiero');
  
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
        // Renderizado del estado de carga
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
          Riesgos Financieros
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

          {/* Primera sección: Descripción de Riesgos Financieros */}
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
                Riesgos Financieros
              </Typography>
              <Typography textAlign={'justify'} variant="body1" sx={{ mb: 2 }}>
                Los riesgos financieros son aquellos generados por el "qué hacemos", es decir por todos los negocios ejecutados en la oferta de productos y servicios.
              </Typography>
              <Typography textAlign={'justify'} variant="body1" sx={{ mb: 2 }}>
                 Este ámbito del riesgo tiene la particularidad de ser <span style={{color: 'red'}}>inevitable pero predecible</span>, y las magnitudes de sus impactos pueden conducir a escenarios adversos de alta criticidad.
              </Typography>
              <Typography textAlign={'justify'} variant="body1" sx={{ mb: 2 }}>
                Una Gestión de Riesgos eficaz no solo genera valor a través de la medición, mitigación y control de estos riesgos, sino que también permite diseñar nuevas estrategias de negocios.
              </Typography>
            </Paper>
            <Box 
              component="img"
              src={diagramaImg}
              alt="Imagen Derecha"
              sx={{ 
                ml: isMobile ? 0 : 4,
                width: {
                  xs: '100% !important',
                  md: '800px !important'
                },
                maxWidth: '100% !important',
                height: 'auto !important'
              }}
            />
          </Box>

          {/* Segunda sección: Tipos de Riesgos */}
          <Box 
            component={motion.div}
            variants={itemVariants}
            sx={sectionStyle}
          >
            {!isMobile && (
              <Box 
                component="img"
                src={arbolImg}
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
                Riesgos de Crédito
              </Typography>
              <List>
                {riesgosCredito.map((riesgo, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>{riesgo.icon}</ListItemIcon>
                    <ListItemText primary={riesgo.text} />
                  </ListItem>
                ))}
              </List>
              <br />
              <br />
              <Typography variant="h8" color="secondary" sx={{ mb: 3 }}>
                Riesgos Financieros y Mercado
              </Typography>
              <List>
                {riesgosFinancieros.map((riesgo, index) => (
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
                src={arbolImg}
                alt="Imagen Izquierda"
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

export default RiesgoFinanciero;