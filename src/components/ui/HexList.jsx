import { getIcon } from './icons';
import Revelar from './Revelar';
import styles from './ui.module.css';

/** Lista de capacidades con ícono dentro de un hexágono. items: [{ icon, text }] */
const HexList = ({ items }) => (
  <ul className={styles.hexList}>
    {items.map((it, i) => {
      const Icon = getIcon(it.icon);
      return (
        <Revelar as="li" key={it.text} retraso={i * 0.07}>
          <span className={`${styles.hexListIcono} mu-hex`} aria-hidden="true">
            <Icon />
          </span>
          {it.text}
        </Revelar>
      );
    })}
  </ul>
);

export default HexList;
