import ServicePage from '../ServicePage';
import diagramaImg from './img/diagrama.png';
import arbolImg from './img/arbol.png';

const CONTENIDO = {
  docTitle: 'MU - Riesgo Financiero',
  ruta: '/riesgo-financiero',
  titulo: 'Riesgos financieros',
  subtitulo: 'Desarrollamos modelos de gestión y metodologías de medición.',
  secciones: [
    {
      titulo: 'Riesgos financieros',
      parrafos: [
        'Los riesgos financieros son aquellos generados por el "qué hacemos", es decir, por todos los negocios ejecutados en la oferta de productos y servicios.',
        'Este ámbito del riesgo tiene la particularidad de ser [[inevitable pero predecible]], y las magnitudes de sus impactos pueden conducir a escenarios adversos de alta criticidad.',
        'Una gestión de riesgos eficaz no solo genera valor a través de la medición, mitigación y control de estos riesgos, sino que también permite diseñar nuevas estrategias de negocios.',
      ],
      imagen: { src: diagramaImg, alt: 'Motor decisional de crédito y arquitectura de datos', w: 1307, h: 796, tipo: 'diagrama' },
    },
    {
      titulo: 'Tipos de riesgo que trabajamos',
      listas: [
        {
          titulo: 'Riesgos de crédito',
          items: [
            { icon: 'wallet', text: 'Macro proceso de crédito' },
            { icon: 'diversity', text: 'Modelos Scoring de originación y comportamiento' },
            { icon: 'trendingDown', text: 'Pronóstico de Pérdidas Esperadas' },
          ],
        },
        {
          titulo: 'Riesgos financieros y de mercado',
          items: [
            { icon: 'warning', text: 'Riesgo de liquidez y contingencias' },
            { icon: 'atm', text: 'Riesgo de precios y divisas' },
            { icon: 'financiero', text: 'Riesgo de tasa de interés' },
          ],
        },
      ],
      imagen: { src: arbolImg, alt: 'Ilustración del árbol de riesgos financieros', w: 779, h: 762 },
    },
  ],
};

const RiesgoFinanciero = () => <ServicePage contenido={CONTENIDO} />;

export default RiesgoFinanciero;
