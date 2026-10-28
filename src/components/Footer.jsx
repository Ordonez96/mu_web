import { Link } from "react-router-dom";
import logoLight from "../img/logo/Logo-completo-light.png";
import {
  SERVICIOS,
  PRODUCTO_TAR,
  CONTACTOS,
  DIRECCION,
  soloDigitos,
} from "../config/siteData";
import styles from "./Footer.module.css";

const ANIO = new Date().getFullYear();

const Footer = () => {
  const principal = CONTACTOS[0];

  return (
    <footer className={`${styles.footer} mu-trama`}>
      <div className={`mu-container ${styles.grid}`}>
        <div className={styles.marca}>
          <Link to="/" aria-label="MU Consulting, ir al inicio">
            <img src={logoLight} alt="MU Consulting" width="170" height="70" />
          </Link>
          <p>
            Especialistas en administración de riesgos. Asesoría global y
            tecnología de alto desempeño para instituciones financieras.
          </p>
        </div>

        <nav aria-label="Servicios">
          <h2 className={styles.h}>Servicios</h2>
          <ul>
            {SERVICIOS.map((s) => (
              <li key={s.id}>
                <Link to={s.ruta}>
                  {s.titulo} {s.descripcion}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Empresa">
          <h2 className={styles.h}>Empresa</h2>
          <ul>
            <li>
              <Link to={PRODUCTO_TAR.ruta}>Software TAR</Link>
            </li>
            <li>
              <Link to="/about">Sobre nosotros</Link>
            </li>
            <li>
              <Link to="/contact">Contacto</Link>
            </li>
          </ul>
        </nav>

        <address className={styles.contacto}>
          <h2 className={styles.h}>Contacto</h2>
          <a href={`tel:+${soloDigitos(principal.whatsapp)}`}>
            {principal.whatsapp}
          </a>
          <a href={`mailto:${principal.email}`}>{principal.email}</a>
          {/* <span>
            {DIRECCION.lugar}, {DIRECCION.linea1}
            <br />
            {DIRECCION.linea2}
          </span> */}
        </address>
      </div>

      <div className={`mu-container ${styles.legal}`}>
        <span>© {ANIO} MU Consultores. Todos los derechos reservados.</span>
      </div>
    </footer>
  );
};

export default Footer;
