import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './components/Home.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';
import { FondoPanal } from './components/hex/PanalContext.jsx';

import './styles/App.css';

/*
 * Code-splitting por ruta: el Inicio carga de inmediato y el resto de páginas
 * se descargan solo cuando se visitan (bundle inicial más liviano).
 */
const Contact = lazy(() => import('./components/Contact.jsx'));
const About = lazy(() => import('./components/About.jsx'));
const RiesgoEstrategicoOperacional = lazy(() =>
  import('./components/services/riesgo_estrategico_operacional/RiesgoEstrategicoOperacional.jsx')
);
const RiesgoFinanciero = lazy(() => import('./components/services/riesgo_financiero/RiesgoFinanciero.jsx'));
const RiesgoAmbientalSocial = lazy(() =>
  import('./components/services/riesgo_ambiental_social/RiesgoAmbientalSocial.jsx')
);
const GestionFinancieraProyectos = lazy(() =>
  import('./components/services/gestion_financiera_proyectos/GestionFinancieraProyectos.jsx')
);
const cargarMuTar = () => import('./components/software/mu_tar/MuTar.jsx');
const MuTar = lazy(cargarMuTar);
const NotFound = lazy(() => import('./components/NotFound.jsx'));

/* Reserva el alto mientras llega el chunk: evita saltos del footer */
const Cargando = () => <div style={{ minHeight: '100vh', background: 'var(--bg)' }} aria-busy="true" />;

/*
 * TAR es la página a la que más se navega desde el Inicio: se descarga en
 * segundo plano cuando el navegador está libre, así el primer clic es instantáneo.
 * No se hace si el usuario activó el ahorro de datos.
 */
const usePrecargaTar = () => {
  useEffect(() => {
    if (navigator.connection?.saveData) return undefined;
    const ric = window.requestIdleCallback || ((fn) => setTimeout(fn, 2500));
    const cic = window.cancelIdleCallback || clearTimeout;
    const id = ric(() => cargarMuTar().catch(() => {}), { timeout: 5000 });
    return () => cic(id);
  }, []);
};

function App() {
  usePrecargaTar();
  return (
    <Router>
      {/* Panal fijo detrás de todo el sitio */}
      <FondoPanal>
      <div className="App">
        <ScrollToTop />
        <Navbar />
        <main className="main-content">
          <Suspense fallback={<Cargando />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
              <Route path="/riesgo-estrategico-operacional" element={<RiesgoEstrategicoOperacional />} />
              <Route path="/riesgo-financiero" element={<RiesgoFinanciero />} />
              <Route path="/riesgo-ambiental-social" element={<RiesgoAmbientalSocial />} />
              <Route path="/gestion-financiera-proyectos" element={<GestionFinancieraProyectos />} />
              <Route path="/software/mu-tar" element={<MuTar />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
      </FondoPanal>
    </Router>
  );
}

export default App;
