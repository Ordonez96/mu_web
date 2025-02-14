// Importaciones necesarias
import { useState, useEffect } from "react";
import { 
    AppBar, 
    Toolbar, 
    IconButton, 
    Typography, 
    Drawer, 
    List, 
    ListItem, 
    ListItemText,
    useTheme,
    useMediaQuery,
    Collapse
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import logo from '../img/logo/Logo-completo.png';

// Estructura del menú de navegación principal
const menuItems = [
    { text: "Inicio", path: "/" },
    { text: "Servicios", path: "/services", hasSubmenu: true },
    { text: "Blog", path: "/blog" },
    { text: "Sobre Nosotros", path: "/about" },
    { text: "Contacto", path: "/contact" },
];

// Estructura del submenú de servicios
const serviciosMenu = [
    {
        text: "Gestión de Riesgos",
        items: [
            { text: "Riesgos Estratégicos y Operacionales", path: "/riesgo-estrategico-operacional" },
            { text: "Riesgos Financieros", path: "/riesgo-financiero" },
            { text: "Riesgo Ambiental y Social", path: "/riesgo-ambiental-social" }
        ]
    },
    { 
        text: "Gestión Financiera y Proyectos",
        path: "/gestion-financiera-proyectos" 
    }
];

// Estilos para los menús desplegables
const dropdownStyles = {
    position: 'absolute',
    top: '100%',
    left: 0,
    backgroundColor: 'black',
    minWidth: '275px', // AJUSTABLE: Ancho mínimo del menú desplegable
    boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
    borderRadius: '8px',
    zIndex: 1000,
};

// Estilos para los elementos del menú desplegable
const dropdownItemStyles = {
    padding: '12px 16px', // AJUSTABLE: Espaciado interno de los elementos del menú desplegable
    color: 'white',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    '&:hover': {
        backgroundColor: 'rgba(255,255,255,0.1)'
    }
};

const Navbar = () => {
    // Gestión de estados
    const [openDrawer, setOpenDrawer] = useState(false);
    const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState(false);
    const [mobileRiskSubmenuOpen, setMobileRiskSubmenuOpen] = useState(false);
    const [hoveredMenuItem, setHoveredMenuItem] = useState(null);
    const [hoveredSubMenu, setHoveredSubMenu] = useState(null);
    
    // Hooks
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const navigate = useNavigate();
    const location = useLocation();

    // Cerrar todos los menús cuando cambia la ubicación
    useEffect(() => {
        handleCloseAll();
    }, [location]);

    // Función auxiliar para cerrar todos los menús
    const handleCloseAll = () => {
        setOpenDrawer(false);
        setMobileSubmenuOpen(false);
        setMobileRiskSubmenuOpen(false);
        setHoveredMenuItem(null);
        setHoveredSubMenu(null);
    };

    // Manejador de navegación
    const handleNavigation = (path) => {
        handleCloseAll();
        navigate(path);
    };

    // Estilos de la barra de navegación
    const navbarStyles = {
        backgroundColor: "black",
        height: "60px", // AJUSTABLE: Altura de la barra de navegación
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        transition: "all 0.3s ease"
    };

    // Estilos de los elementos del menú
    const menuItemStyles = {
        marginLeft: "25px", // AJUSTABLE: Distancia entre elementos del menú principal
        marginRight: "30px", // AJUSTABLE: Distancia entre elementos del menú principal
        color: "white",
        textDecoration: "none",
        fontSize: "1rem", // AJUSTABLE: Tamaño de fuente del menú
        fontWeight: 500,
        position: "relative",
        "&:after": {
            content: '""',
            position: "absolute",
            width: "0%",
            height: "2px", // AJUSTABLE: Grosor de la línea de subrayado
            bottom: "-5px", // AJUSTABLE: Distancia del subrayado al texto
            left: "0",
            backgroundColor: "white",
            transition: "width 0.3s ease"
        },
        "&:hover:after": {
            width: "100%"
        }
    };
    return (
        <AppBar position="sticky" sx={navbarStyles}>
            <Toolbar sx={{ 
                height: "100%",
                display: "flex", 
                justifyContent: "space-between", 
                alignItems: "center",
                padding: "0 24px" // AJUSTABLE: Padding horizontal del Toolbar
            }}>
                {isMobile ? (
                    // Vista móvil
                    <>
                        <IconButton 
                            edge="start" 
                            color="inherit" 
                            onClick={() => setOpenDrawer(true)}
                            sx={{ marginRight: 2 }} // AJUSTABLE: Margen derecho del botón de menú
                        >
                            <MenuIcon />
                        </IconButton>

                        <Link to="/">
                            <motion.img
                                src={logo}
                                alt="Logo"
                                style={{ 
                                    height: "60px", // AJUSTABLE: Altura del logo en móvil
                                    objectFit: "contain" 
                                }}
                                whileHover={{ scale: 1.05 }}
                            />
                        </Link>

                        {/* Navegación del drawer móvil */}
                        <Drawer 
                            anchor="left" 
                            open={openDrawer} 
                            onClose={() => setOpenDrawer(false)}
                        >
                            <List sx={{ width: 280 }}> 
                                {menuItems.map((item) => (
                                    <div key={item.text}>
                                        <ListItem 
                                            button 
                                            onClick={() => {
                                                if (item.hasSubmenu) {
                                                    setMobileSubmenuOpen(!mobileSubmenuOpen);
                                                } else {
                                                    handleNavigation(item.path);
                                                }
                                            }}
                                        >
                                            <ListItemText primary={item.text} />
                                            {item.hasSubmenu && (
                                                <ExpandMore 
                                                    sx={{ 
                                                        transform: mobileSubmenuOpen ? 'rotate(180deg)' : 'none',
                                                        transition: 'transform 0.3s'
                                                    }} 
                                                />
                                            )}
                                        </ListItem>
                                        
                                        {/* Submenú móvil */}
                                        {item.hasSubmenu && (
                                            <Collapse in={mobileSubmenuOpen}>
                                                <List>
                                                    {serviciosMenu.map((servicio) => (
                                                        <div key={servicio.text}>
                                                            {servicio.items ? (
                                                                <>
                                                                    <ListItem 
                                                                        button 
                                                                        onClick={() => setMobileRiskSubmenuOpen(!mobileRiskSubmenuOpen)}
                                                                        sx={{ pl: 4 }} // AJUSTABLE: Padding izquierdo para indentación
                                                                    >
                                                                        <ListItemText primary={servicio.text} />
                                                                        <ExpandMore 
                                                                            sx={{ 
                                                                                transform: mobileRiskSubmenuOpen ? 'rotate(180deg)' : 'none',
                                                                                transition: 'transform 0.3s'
                                                                            }} 
                                                                        />
                                                                    </ListItem>
                                                                    <Collapse in={mobileRiskSubmenuOpen}>
                                                                        <List>
                                                                            {servicio.items.map((subitem) => (
                                                                                <ListItem 
                                                                                    button 
                                                                                    key={subitem.text}
                                                                                    onClick={() => handleNavigation(subitem.path)}
                                                                                    sx={{ pl: 6 }} // AJUSTABLE: Padding izquierdo para sub-indentación
                                                                                >
                                                                                    <ListItemText primary={subitem.text} />
                                                                                </ListItem>
                                                                            ))}
                                                                        </List>
                                                                    </Collapse>
                                                                </>
                                                            ) : (
                                                                <ListItem 
                                                                    button 
                                                                    onClick={() => handleNavigation(servicio.path)}
                                                                    sx={{ pl: 4 }} // AJUSTABLE: Padding izquierdo para indentación
                                                                >
                                                                    <ListItemText primary={servicio.text} />
                                                                </ListItem>
                                                            )}
                                                        </div>
                                                    ))}
                                                </List>
                                            </Collapse>
                                        )}
                                    </div>
                                ))}
                            </List>
                        </Drawer>
                    </>
                ) : (
                    // Vista desktop
                    <>
                        <Link to="/">
                            <motion.img
                                src={logo}
                                alt="Logo"
                                style={{ 
                                    height: "90px", // AJUSTABLE: Altura del logo en desktop
                                    objectFit: "contain" 
                                }}
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.2 }}
                            />
                        </Link>

                        {/* Menú de navegación desktop */}
                        <div style={{ display: "flex", alignItems: "center" }}>
                            {menuItems.map((item) => (
                                <div 
                                    key={item.text}
                                    style={{ position: 'relative' }}
                                    onMouseEnter={() => item.hasSubmenu && setHoveredMenuItem(item.text)}
                                    onMouseLeave={() => item.hasSubmenu && setHoveredMenuItem(null)}
                                >
                                    <motion.div 
                                        whileHover={{ scale: 1.05 }}
                                        style={{ display: "inline-block" }}
                                    >
                                        <Typography 
                                            component={item.hasSubmenu ? "div" : Link}
                                            to={item.hasSubmenu ? undefined : item.path}
                                            sx={menuItemStyles} // Usa los estilos definidos anteriormente con marginLeft: "90px"
                                        >
                                            {item.text}
                                            {item.hasSubmenu && (
                                                <ExpandMore 
                                                    sx={{ 
                                                        verticalAlign: "middle",
                                                        ml: 0.5, // AJUSTABLE: Margen izquierdo del icono de expansión
                                                        transform: hoveredMenuItem === item.text ? 'rotate(180deg)' : 'none',
                                                        transition: 'transform 0.3s'
                                                    }} 
                                                />
                                            )}
                                        </Typography>
                                    </motion.div>

                                    {/* Menú desplegable desktop */}
                                    {item.hasSubmenu && (
                                        <div 
                                            style={{
                                                ...dropdownStyles,
                                                display: hoveredMenuItem === item.text ? 'block' : 'none'
                                            }}
                                            onMouseEnter={() => setHoveredMenuItem(item.text)}
                                            onMouseLeave={() => setHoveredMenuItem(null)}
                                        >
                                            {serviciosMenu.map((servicio) => (
                                                <div key={servicio.text} style={{ position: 'relative' }}>
                                                    {servicio.items ? (
                                                        <div 
                                                            onMouseEnter={() => setHoveredSubMenu(servicio.text)}
                                                            onMouseLeave={() => setHoveredSubMenu(null)}
                                                        >
                                                            <Typography sx={dropdownItemStyles}>
                                                                {servicio.text}
                                                                <ExpandMore />
                                                            </Typography>
                                                            {/* Submenú para "Gestión de Riesgos" */}
                                                            <div 
                                                                style={{
                                                                    ...dropdownStyles,
                                                                    top: '0px', // AJUSTABLE: Posición vertical del submenú
                                                                    left: '100%',
                                                                    display: hoveredSubMenu === servicio.text ? 'block' : 'none',
                                                                    marginLeft: '1px' // AJUSTABLE: Espacio entre menú y submenú
                                                                }}
                                                            >
                                                                {servicio.items.map((subitem) => (
                                                                    <Typography 
                                                                        key={subitem.text}
                                                                        onClick={() => handleNavigation(subitem.path)}
                                                                        sx={dropdownItemStyles}
                                                                    >
                                                                        {subitem.text}
                                                                    </Typography>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <Typography 
                                                            onClick={() => handleNavigation(servicio.path)}
                                                            sx={dropdownItemStyles}
                                                        >
                                                            {servicio.text}
                                                        </Typography>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;