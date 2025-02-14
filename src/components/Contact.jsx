import { useState, useEffect } from 'react';
import { 
  Box, 
  Stack, 
  Typography, 
  Paper, 
  IconButton, 
  Skeleton 
} from '@mui/material';
import { motion } from 'framer-motion';
import { Phone, Email, LocationOn } from '@mui/icons-material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

import LogoFooter from '../components/LogoFooter';

// Importar las imágenes
import logoIcon from '../img/logo/Logo-icon.png';
import contactBanner from '../img/contact/Imagen1.png';
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

// Constantes para la información de contacto
const contactPersons = [
  {
    name: "Antonio Moreno Santeliz",
    title: "Director Ejecutivo",
    phone: "(503) 2526-9245",
    whatsapp: "(503) 7160-2578",
    email: "amoreno@muconsultores.com"
  },
  {
    name: "Mauricio Urrutia",
    title: "Director de Proyectos",
    phone: "(503) 2526-9245",
    whatsapp: "(503) 7601-1475",
    email: "murrutia@muconsultores.com"
  }
];

// Componente Skeleton de carga
const ContactSkeleton = () => (
  <Stack direction={{ xs: "column", md: "row" }} spacing={2.5}>
    {[1, 2].map((index) => (
      <Paper key={index} elevation={3} sx={{ flex: 1, p: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
          <Skeleton variant="circular" width={75} height={75} />
          <Box>
            <Skeleton variant="text" width={180} height={35} />
            <Skeleton variant="text" width={130} height={25} />
          </Box>
        </Box>
        {[160, 140, 200, 230].map((width, idx) => (
          <Stack key={idx} direction="row" spacing={1} alignItems="center" sx={{ mt: idx === 0 ? 2 : 0.5 }}>
            <Skeleton variant="circular" width={40} height={40} />
            <Skeleton variant="text" width={width} height={30} />
          </Stack>
        ))}
      </Paper>
    ))}
  </Stack>
);

// Componente de tarjeta de contacto
const ContactCard = ({ person }) => (
  <Paper 
    component={motion.div}
    variants={itemVariants}
    elevation={3} 
    sx={{ 
      flex: 1, 
      padding: 3, 
      transition: ANIMACIONES.transicion,
      '&:hover': {
        transform: ANIMACIONES.hover.transformacion,
        boxShadow: ANIMACIONES.hover.elevacion
      }
    }}
  >
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      <Box 
        component="img" 
        src={logoIcon} 
        alt="Logo" 
        sx={{ 
          width: 75, 
          height: 75,
          transition: ANIMACIONES.transicion,
          '&:hover': {
            transform: ANIMACIONES.hover.transformacion
          }
        }} 
      />
      <Box>
        <Typography variant="h5" fontWeight="bold">{person.name}</Typography>
        <Typography sx={{ pl: 1 }} variant="subtitle1">{person.title}</Typography>
      </Box>
    </Box>

    <Stack spacing={0.5} sx={{ pl: 10, mt: 2 }}>
      <ContactInfo icon={<Phone />} text={person.phone} />
      <ContactInfo icon={<WhatsAppIcon />} text={person.whatsapp} />
      <ContactInfo icon={<Email />} text={person.email} />
      <ContactInfo 
        icon={<LocationOn />} 
        text={<><strong>STofficenter</strong>, urb. San Francisco <br /> C. Los Abetos #37, S.S.</>} 
      />
    </Stack>
  </Paper>
);

// Componente para cada línea de información de contacto
const ContactInfo = ({ icon, text }) => (
  <Stack 
    component={motion.div}
    variants={itemVariants}
    direction="row" 
    spacing={1} 
    alignItems="center"
  >
    <IconButton>{icon}</IconButton>
    <Typography sx={{ textAlign: "justify" }}>{text}</Typography>
  </Stack>
);

const Contact = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  useDocumentTitle('MU - Contacto');
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
      {/* Banner de imagen con efecto de desvanecimiento */}
      <Box
        component={motion.img}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        src={contactBanner}
        alt="Fondo de Contacto"
        sx={{
          width: '100%',
          height: '30vh',
          objectFit: 'cover',
          marginBottom: 0.2,
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          filter: 'brightness(0.9) contrast(1.1)',
          position: 'relative',
          transition: ANIMACIONES.transicion,
          '&:hover': {
            transform: ANIMACIONES.hover.transformacion
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: '50%',
            background: 'linear-gradient(to bottom, transparent, white)',
            pointerEvents: 'none'
          }
        }}
      />

      {/* Contenido principal */}
      {loading ? (
        <ContactSkeleton />
      ) : (
        <>
          {/* Tarjetas de contacto */}
          <Stack 
            direction={{ xs: "column", md: "row" }} 
            padding={0.8} 
            spacing={2} 
            justifyContent="space-between"
          >
            {contactPersons.map((person, index) => (
              <ContactCard key={index} person={person} />
            ))}
          </Stack>

          {/* Mapa integrado */}
          <Paper 
            component={motion.div}
            variants={itemVariants}
            elevation={4} 
            sx={{ 
              marginTop: 0.5, 
              padding: 0.8,
              transition: ANIMACIONES.transicion,
              '&:hover': {
                transform: ANIMACIONES.hover.transformacion
              }
            }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7752.943833261301!2d-89.2281245!3d13.6898438!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f63315b75f4842b%3A0x172ddca6cec65abe!2sMU%20Consulting!5e0!3m2!1ses-419!2ssv!4v1738620549538!5m2!1ses-419!2ssv"
              width="100%"
              height="450"
              style={{ borderRadius: "7px", border: "none" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Paper>
        </>
      )}

      {/* Logo Footer con Link */}
      <LogoFooter />
    </Box>
  );
};

export default Contact;