import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Home from './components/Home.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer'; // Importa el Footer
import About from './components/About.jsx';
import RiesgoEstrategicoOperacional from './components/services/riesgo_estrategico_operacional/RiesgoEstrategicoOperacional.jsx';
import RiesgoFinanciero from './components/services/riesgo_financiero/RiesgoFinanciero.jsx';
import RiesgoAmbientalSocial from './components/services/riesgo_ambiental_social/RiesgoAmbientalSocial.jsx';
import GestionFinancieraProyectos from './components/services/gestion_financiera_proyectos/GestionFinancieraProyectos.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';

import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <ScrollToTop />
        <Navbar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/riesgo-estrategico-operacional" element={<RiesgoEstrategicoOperacional />} />
            <Route path="/riesgo-financiero" element={<RiesgoFinanciero />} />
            <Route path="/riesgo-ambiental-social" element={<RiesgoAmbientalSocial />} />
            <Route path="/gestion-financiera-proyectos" element={<GestionFinancieraProyectos />} />
          </Routes>
        </div>
        <Footer /> {/* Footer siempre al final */}
      </div>
    </Router>
  );
}

export default App;
