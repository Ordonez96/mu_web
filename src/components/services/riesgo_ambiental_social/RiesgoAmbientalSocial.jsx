import ServicePage from '../ServicePage';
import diagramaImg from './img/diagrama.png';
import personImg from './img/person.png';

const CONTENIDO = {
  docTitle: 'MU - Riesgo Ambiental y Social',
  ruta: '/riesgo-ambiental-social',
  titulo: 'Riesgo ambiental y social',
  subtitulo: 'Desarrollamos modelos de gestión y metodologías de medición.',
  secciones: [
    {
      titulo: 'Responsabilidad ambiental y social',
      parrafos: [
        'La responsabilidad ambiental y social adquiere cada vez más importancia en la economía mundial.',
        'Las instituciones financieras deben desarrollar un compromiso proactivo de alineación a la agenda internacional y local de desarrollo sostenible, al incidir desde su rol de entidad financiera en principios de sostenibilidad ambiental y social, y contar con un Sistema de Gestión de Riesgos Ambientales y Sociales [[(SARAS)]] que identifique los impactos ambientales y sociales de las operaciones a financiar.',
        'Este tipo de riesgos requiere una gestión eficaz y culturalmente arraigada, ya que puede dar lugar a fenómenos o incidentes que impacten a nivel de cartera de activos de riesgo y a nivel estratégico desde el riesgo reputacional.',
      ],
      imagen: { src: diagramaImg, alt: 'Procedimiento ARAS dentro del proceso de crédito', w: 908, h: 822, tipo: 'diagrama' },
    },
    {
      titulo: 'Desarrollamos tu SARAS',
      parrafos: ['Sistema de Administración de Riesgo Ambiental y Social, de punta a punta:'],
      listas: [
        {
          items: [
            { icon: 'accountTree', text: 'Marco de políticas y procedimientos' },
            { icon: 'groups', text: 'Sistema de gobernanza' },
            { icon: 'deviceHub', text: 'Modelo de clasificación del riesgo A&S' },
            { icon: 'troubleshoot', text: 'Metodología de análisis por sector económico' },
            { icon: 'devices', text: 'Sistema de monitoreo y mantenimiento de cartera' },
            { icon: 'bank', text: 'Desarrollo de productos de finanzas sostenibles' },
          ],
        },
      ],
      imagen: { src: personImg, alt: 'Ilustración de análisis ambiental y social', w: 356, h: 386 },
    },
  ],
};

const RiesgoAmbientalSocial = () => <ServicePage contenido={CONTENIDO} />;

export default RiesgoAmbientalSocial;
