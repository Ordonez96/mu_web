import ServicePage from '../ServicePage';
import tabla from './img/tabla.png';
import foco from './img/foco.png';

const CONTENIDO = {
  docTitle: 'MU - Gestión Financiera y Proyectos',
  ruta: '/gestion-financiera-proyectos',
  titulo: 'Gestión financiera y proyectos',
  subtitulo: 'Información financiera confiable para tomar mejores decisiones de inversión.',
  secciones: [
    {
      titulo: 'Gestión financiera',
      parrafos: [
        'La gestión financiera y contable se fundamenta en la eficacia de la información estructural de la organización para la efectiva toma de decisiones.',
        'Esta gestión debe ser totalmente confiable, por lo que ofrecemos servicios de consultoría basados en metodologías y soluciones que conduzcan a la optimización de ingresos y costos.',
        'Nuestros servicios financieros y de evaluación de proyectos permiten tomar las mejores decisiones de inversión, estableciendo la viabilidad y rentabilidad de los proyectos a través de técnicas modernas de valoración.',
      ],
      imagen: { src: tabla, alt: 'Modelo de proyección financiera con escenarios', w: 2683, h: 1902, tipo: 'diagrama' },
    },
    {
      titulo: 'Servicios que desarrollamos',
      listas: [
        {
          items: [
            { icon: 'corporate', text: 'Valoración de empresas' },
            { icon: 'balance', text: 'Gestión de flujos de caja y contingencias' },
            { icon: 'lan', text: 'Evaluación de sistema contable' },
            { icon: 'addTask', text: 'Evaluación de cumplimiento tributario' },
            { icon: 'priceCheck', text: 'Formulación y evaluación de proyectos de inversión' },
          ],
        },
      ],
      imagen: { src: foco, alt: 'Ilustración de ideas e inversión', w: 295, h: 362 },
    },
  ],
};

const GestionFinancieraProyectos = () => <ServicePage contenido={CONTENIDO} />;

export default GestionFinancieraProyectos;
