import { Link } from 'react-router-dom';
import PageHeader from './ui/PageHeader';
import { useDocumentTitle } from './useDocumentTittle';

/** Ruta comodín: antes una URL inexistente mostraba la página vacía. */
const NotFound = () => {
  useDocumentTitle('MU - Página no encontrada');
  return (
    <PageHeader
      chip="Error 404"
      titulo="No encontramos esta página"
      subtitulo="Puede que el enlace haya cambiado. Vuelve al inicio o revisa nuestros servicios."
      acciones={
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 24 }}>
          <Link to="/" className="mu-btn mu-btn--primary">Ir al inicio</Link>
          <Link to="/contact" className="mu-btn mu-btn--ghost">Contactar</Link>
        </div>
      }
    />
  );
};

export default NotFound;
