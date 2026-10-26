import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import MenuRounded from '@mui/icons-material/MenuRounded';
import CloseRounded from '@mui/icons-material/CloseRounded';
import ExpandMoreRounded from '@mui/icons-material/ExpandMoreRounded';
import ChevronRightRounded from '@mui/icons-material/ChevronRightRounded';
import logo from '../img/logo/Logo-completo.png';
import { NAV } from '../config/siteData';
import styles from './Navbar.module.css';

const EASE = [0.22, 1, 0.36, 1];

/** ¿La ruta actual pertenece a este ítem (o a alguno de sus hijos)? */
const contieneRuta = (item, pathname) =>
  item.path === pathname || (item.children || []).some((c) => contieneRuta(c, pathname));

/* ---------------- Desktop: menú desplegable ---------------- */
const Desplegable = ({ item, pathname }) => {
  const [abierto, setAbierto] = useState(false);
  const [subAbierto, setSubAbierto] = useState(null);
  const ref = useRef(null);

  // Cierra al hacer clic fuera o con Escape
  useEffect(() => {
    if (!abierto) return undefined;
    const fuera = (e) => !ref.current?.contains(e.target) && setAbierto(false);
    const esc = (e) => e.key === 'Escape' && setAbierto(false);
    document.addEventListener('pointerdown', fuera);
    document.addEventListener('keydown', esc);
    return () => {
      document.removeEventListener('pointerdown', fuera);
      document.removeEventListener('keydown', esc);
    };
  }, [abierto]);

  useEffect(() => {
    setAbierto(false);
    setSubAbierto(null);
  }, [pathname]);

  return (
    <li
      ref={ref}
      className={styles.item}
      onMouseEnter={() => setAbierto(true)}
      onMouseLeave={() => {
        setAbierto(false);
        setSubAbierto(null);
      }}
    >
      <button
        type="button"
        className={`${styles.link} ${contieneRuta(item, pathname) ? styles.activo : ''}`}
        aria-expanded={abierto}
        aria-haspopup="true"
        onClick={() => setAbierto((v) => !v)}
      >
        {item.text}
        <ExpandMoreRounded className={`${styles.chevron} ${abierto ? styles.chevronAbierto : ''}`} />
      </button>

      <AnimatePresence>
        {abierto && (
          <motion.ul
            className={styles.dropdown}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6, transition: { duration: 0.12 } }}
            transition={{ duration: 0.22, ease: EASE }}
          >
            {item.children.map((child) =>
              child.children ? (
                <li
                  key={child.text}
                  className={styles.subItem}
                  onMouseEnter={() => setSubAbierto(child.text)}
                  onMouseLeave={() => setSubAbierto(null)}
                >
                  <button
                    type="button"
                    className={styles.dropLink}
                    aria-expanded={subAbierto === child.text}
                    onClick={() => setSubAbierto((v) => (v === child.text ? null : child.text))}
                  >
                    {child.text}
                    <ChevronRightRounded fontSize="small" />
                  </button>
                  {subAbierto === child.text && (
                    <ul className={styles.subDropdown}>
                      {child.children.map((g) => (
                        <li key={g.path}>
                          <NavLink
                            to={g.path}
                            className={({ isActive }) => `${styles.dropLink} ${isActive ? styles.dropActivo : ''}`}
                          >
                            {g.text}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ) : (
                <li key={child.path}>
                  <NavLink
                    to={child.path}
                    className={({ isActive }) => `${styles.dropLink} ${isActive ? styles.dropActivo : ''}`}
                  >
                    {child.text}
                  </NavLink>
                </li>
              )
            )}
          </motion.ul>
        )}
      </AnimatePresence>
    </li>
  );
};

/* ---------------- Móvil: grupo colapsable ---------------- */
const GrupoMovil = ({ item, nivel = 0 }) => {
  const [abierto, setAbierto] = useState(false);
  return (
    <li>
      <button
        type="button"
        className={styles.mLink}
        style={{ paddingLeft: 20 + nivel * 16 }}
        aria-expanded={abierto}
        onClick={() => setAbierto((v) => !v)}
      >
        {item.text}
        <ExpandMoreRounded className={`${styles.chevron} ${abierto ? styles.chevronAbierto : ''}`} />
      </button>
      {abierto && (
        <ul className={styles.mSub}>
          {item.children.map((c) =>
            c.children ? (
              <GrupoMovil key={c.text} item={c} nivel={nivel + 1} />
            ) : (
              <li key={c.path}>
                <NavLink
                  to={c.path}
                  className={({ isActive }) => `${styles.mLink} ${isActive ? styles.mActivo : ''}`}
                  style={{ paddingLeft: 20 + (nivel + 1) * 16 }}
                >
                  {c.text}
                </NavLink>
              </li>
            )
          )}
        </ul>
      )}
    </li>
  );
};

/* ---------------- Navbar ---------------- */
const Navbar = () => {
  const { pathname } = useLocation();
  const [movilAbierto, setMovilAbierto] = useState(false);
  const [conSombra, setConSombra] = useState(false);
  const cerrarRef = useRef(null);

  // Sombra al hacer scroll (listener pasivo, solo cambia estado al cruzar el umbral)
  useEffect(() => {
    const onScroll = () => setConSombra(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Cerrar el menú móvil al navegar
  useEffect(() => setMovilAbierto(false), [pathname]);

  // Bloqueo de scroll + Escape + foco inicial en el menú móvil
  useEffect(() => {
    if (!movilAbierto) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const esc = (e) => e.key === 'Escape' && setMovilAbierto(false);
    document.addEventListener('keydown', esc);
    cerrarRef.current?.focus();
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener('keydown', esc);
    };
  }, [movilAbierto]);

  const principales = NAV.filter((i) => i.path !== '/contact');
  const contacto = NAV.find((i) => i.path === '/contact');

  return (
    <header className={`${styles.header} ${conSombra ? styles.headerSombra : ''}`}>
      <nav className={`mu-container ${styles.bar}`} aria-label="Principal">
        <Link to="/" className={styles.logo} aria-label="MU Consulting, ir al inicio">
          <img src={logo} alt="MU Consulting" width="150" height="62" />
        </Link>

        {/* Desktop */}
        <ul className={styles.menu}>
          {principales.map((item) =>
            item.children ? (
              <Desplegable key={item.text} item={item} pathname={pathname} />
            ) : (
              <li key={item.path} className={styles.item}>
                <NavLink
                  to={item.path}
                  end={item.path === '/'}
                  className={({ isActive }) =>
                    `${styles.link} ${item.destacado ? styles.destacado : ''} ${isActive ? styles.activo : ''}`
                  }
                >
                  {item.destacado && <span className={`${styles.destacadoHex} mu-hex`} aria-hidden="true" />}
                  {item.text}
                </NavLink>
              </li>
            )
          )}
          {contacto && (
            <li className={styles.item}>
              <Link to={contacto.path} className={`mu-btn mu-btn--primary ${styles.cta}`}>
                {contacto.text}
              </Link>
            </li>
          )}
        </ul>

        {/* Botón móvil */}
        <button
          type="button"
          className={styles.burger}
          aria-label="Abrir menú"
          aria-expanded={movilAbierto}
          onClick={() => setMovilAbierto(true)}
        >
          <MenuRounded />
        </button>
      </nav>

      {/* Menú móvil */}
      <AnimatePresence>
        {movilAbierto && (
          <>
            <motion.div
              className={styles.overlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMovilAbierto(false)}
            />
            <motion.div
              className={styles.drawer}
              role="dialog"
              aria-modal="true"
              aria-label="Menú"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.35, ease: EASE }}
            >
              <div className={styles.drawerTop}>
                <img src={logo} alt="MU Consulting" width="120" height="50" />
                <button
                  ref={cerrarRef}
                  type="button"
                  className={styles.burger}
                  aria-label="Cerrar menú"
                  onClick={() => setMovilAbierto(false)}
                >
                  <CloseRounded />
                </button>
              </div>
              <ul className={styles.mList}>
                {NAV.map((item) =>
                  item.children ? (
                    <GrupoMovil key={item.text} item={item} />
                  ) : (
                    <li key={item.path}>
                      <NavLink
                        to={item.path}
                        end={item.path === '/'}
                        className={({ isActive }) => `${styles.mLink} ${isActive ? styles.mActivo : ''}`}
                      >
                        {item.text}
                      </NavLink>
                    </li>
                  )
                )}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
