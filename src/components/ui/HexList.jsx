import { getIcon } from './icons';
import styles from './ui.module.css';

/** Lista de capacidades con ícono dentro de un hexágono. items: [{ icon, text }] */
const HexList = ({ items }) => (
  <ul className={styles.hexList}>
    {items.map((it) => {
      const Icon = getIcon(it.icon);
      return (
        <li key={it.text}>
          <span className={`${styles.hexListIcono} mu-hex`} aria-hidden="true">
            <Icon />
          </span>
          {it.text}
        </li>
      );
    })}
  </ul>
);

export default HexList;
