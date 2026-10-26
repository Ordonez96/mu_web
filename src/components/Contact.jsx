import PhoneOutlined from "@mui/icons-material/PhoneOutlined";
import WhatsApp from "@mui/icons-material/WhatsApp";
import EmailOutlined from "@mui/icons-material/EmailOutlined";
import LocationOnOutlined from "@mui/icons-material/LocationOnOutlined";
import PageHeader from "./ui/PageHeader";
import logoIcon from "../img/logo/Logo-icon.png";
import { CONTACTOS, DIRECCION, soloDigitos } from "../config/siteData";
import { useDocumentTitle } from "./useDocumentTittle";
import styles from "./Contact.module.css";

/* Cada dato de contacto es un enlace accionable (antes era texto plano) */
const Fila = ({ icon: Icon, href, children, externo }) => (
  <li>
    <span className={`${styles.filaIcono} mu-hex`} aria-hidden="true">
      <Icon />
    </span>
    {href ? (
      <a
        href={href}
        {...(externo ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    ) : (
      <span>{children}</span>
    )}
  </li>
);

const TarjetaContacto = ({ persona }) => (
  <article className={styles.card}>
    <div className={styles.cardTop}>
      <img src={logoIcon} alt="" width="64" height="64" />
      <div>
        <h2>{persona.name}</h2>
        <p>{persona.title}</p>
      </div>
    </div>
    <ul className={styles.filas}>
      <Fila icon={PhoneOutlined} href={`tel:+${soloDigitos(persona.phone)}`}>
        {persona.phone}
      </Fila>
      <Fila
        icon={WhatsApp}
        href={`https://wa.me/${soloDigitos(persona.whatsapp)}`}
        externo
      >
        {persona.whatsapp}
      </Fila>
      <Fila icon={EmailOutlined} href={`mailto:${persona.email}`}>
        {persona.email}
      </Fila>
    </ul>
  </article>
);

const Contact = () => {
  useDocumentTitle("MU - Contacto");

  return (
    <>
      <PageHeader
        titulo="Contacto"
        subtitulo="Escríbenos o llámanos: te respondemos con una propuesta de trabajo para tu organización."
      >
        <div className={styles.cards}>
          {CONTACTOS.map((p) => (
            <TarjetaContacto key={p.email} persona={p} />
          ))}
        </div>
      </PageHeader>

      <section className="mu-section mu-section--alt">
        <div className={`mu-container ${styles.ubicacion}`}>
          {/* <div>
            <h2 className="mu-title">Visítanos</h2>
            <span className="mu-accent" />
            <ul className={styles.filas}>
              <Fila icon={LocationOnOutlined}>
                <strong>{DIRECCION.lugar}</strong>
                <br />
                {DIRECCION.linea1}
                <br />
                {DIRECCION.linea2}
              </Fila>
            </ul>
          </div> */}
          {/* <div className={styles.mapa}>
            <iframe
              title="Ubicación de MU Consulting en Google Maps"
              src={DIRECCION.mapa}
              width="100%"
              height="420"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div> */}
        </div>
      </section>
    </>
  );
};

export default Contact;
