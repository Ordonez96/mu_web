import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
import { 
  Business,
  Warning,
  Security,
  Engineering,
  Gavel,
  Computer
} from '@mui/icons-material';

// Importar componente LogoFooter
import LogoFooter from '../../LogoFooter';

// Importar las imágenes
import riesgoDerechaImg from '/src/components/services/riesgo_estrategico_operacional/img/riesgo_derecha.png';
import riesgoIzquierdaImg from '/src/components/services/riesgo_estrategico_operacional/img/riesgo_izquierda.png';
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

const RiesgoEstrategicoOperacional = () => {
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

  // Lista de riesgos estratégicos con sus iconos
  const riesgosEstrategicos = [
    { icon: <Business />, text: 'Gobierno Corporativo' },
    { icon: <Warning />, text: 'Riesgo Reputacional' },
    { icon: <Security />, text: 'Continuidad de Negocio (BCP)' },
    { icon: <Warning />, text: 'Riesgo Ambiental y social' }
  ];

  // Lista de riesgos operacionales con sus iconos
  const riesgosOperacionales = [
    { icon: <Engineering />, text: 'Riesgos Operativos' },
    { icon: <Gavel />, text: 'Riesgo de Cumplimiento' },
    { icon: <Computer />, text: 'Riesgo de Tecnología' },
    { icon: <Gavel />, text: 'Riesgo Legal' }
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

  useDocumentTitle('MU - Riesgo Estratégico y Operacional');
  
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
        // Contenido principal
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
          Riesgos Estratégicos y Operacionales
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

          {/* Sección de Riesgos Estratégicos */}
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
                Riesgos Estratégicos
              </Typography>
              <Typography textAlign={'justify'} variant="body1" sx={{ mb: 2 }}>
                Los riesgos estratégicos son aquellos que tienen su raíz en el ápice estratégico de la empresa y en fenómenos de impacto sistémico.
              </Typography>
              <Typography textAlign={'justify'} variant="body1" sx={{ mb: 2 }}>
                Este tipo de riesgos requiere una gestión eficaz ya que puede dar lugar a una incertidumbre intolerable sobre los productos o servicios, 
                sobre los clientes y/o sobre la propia empresa.
              </Typography>
              <List>
                {riesgosEstrategicos.map((riesgo, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>{riesgo.icon}</ListItemIcon>
                    <ListItemText primary={riesgo.text} />
                  </ListItem>
                ))}
              </List>
            </Paper>
            <Box 
              component="img"
              src={riesgoDerechaImg}
              alt="Imagen Derecha"
              sx={{ 
                ml: isMobile ? 0 : 4,
                width: {
                  xs: '100% !important',
                  md: '550px !important'
                },
                maxWidth: '100% !important',
                height: 'auto !important'
              }}
            />
          </Box>

          {/* Sección de Riesgos Operacionales */}
          <Box 
            component={motion.div}
            variants={itemVariants}
            sx={sectionStyle}
          >
            {!isMobile && (
              <Box 
                component="img"
                src={riesgoIzquierdaImg}
                alt="Imagen Izquierda"
                sx={{ 
                  mr: 4,
                  width: {
                    xs: '100% !important',
                    md: '350px !important'
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
              <Typography variant="h5" color="primary" sx={{ mb: 3 }}>
                Riesgos Operacionales
              </Typography>
              <Typography textAlign={'justify'} variant="body1" sx={{ mb: 2 }}>
                Los riesgos operacionales son aquellos generados por el &quot;c&oacute;mo lo hacemos&quot;, es decir por todos los procesos 
                operativos y por factores exógenos a la organización.
              </Typography>
              <Typography textAlign={'justify'} variant="body1" sx={{ mb: 2 }}>
                Tienen la particularidad de ser <span style={{color: 'red'}}>impredecibles pero evitables</span>, y las magnitudes de sus impactos pueden llegar a ser catastróficas.
              </Typography>
              <List>
                {riesgosOperacionales.map((riesgo, index) => (
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
                src={riesgoIzquierdaImg}
                alt="Imagen Izquierda"
              />
            )}
          </Box>

          {/* Sección del Logo Footer */}
            <LogoFooter />

        </>
      )}
    </Container>
  );
};

export default RiesgoEstrategicoOperacional;