import ServicePage from '../ServicePage';
import riesgoDerechaImg from './img/riesgo_derecha.png';
import riesgoIzquierdaImg from './img/riesgo_izquierda.png';

const CONTENIDO = {
  docTitle: 'MU - Riesgo Estratégico y Operacional',
  ruta: '/riesgo-estrategico-operacional',
  titulo: 'Riesgos estratégicos y operacionales',
  subtitulo: 'Desarrollamos modelos de gestión y metodologías de medición.',
  secciones: [
    {
      titulo: 'Riesgos estratégicos',
      parrafos: [
        'Los riesgos estratégicos son aquellos que tienen su raíz en el ápice estratégico de la empresa y en fenómenos de impacto sistémico.',
        'Este tipo de riesgos requiere una gestión eficaz ya que puede dar lugar a una incertidumbre intolerable sobre los productos o servicios, sobre los clientes y/o sobre la propia empresa.',
      ],
      listas: [
        {
          items: [
            { icon: 'business', text: 'Gobierno Corporativo' },
            { icon: 'warning', text: 'Riesgo Reputacional' },
            { icon: 'security', text: 'Continuidad de Negocio (BCP)' },
            { icon: 'ambiental', text: 'Riesgo Ambiental y Social' },
          ],
        },
      ],
      imagen: { src: riesgoDerechaImg, alt: 'Componentes del riesgo estratégico', w: 810, h: 853, tipo: 'diagrama' },
    },
    {
      titulo: 'Riesgos operacionales',
      parrafos: [
        'Los riesgos operacionales son aquellos generados por el "cómo lo hacemos", es decir, por todos los procesos operativos y por factores exógenos a la organización.',
        'Tienen la particularidad de ser [[impredecibles pero evitables]], y las magnitudes de sus impactos pueden llegar a ser catastróficas.',
      ],
      listas: [
        {
          items: [
            { icon: 'estrategico', text: 'Riesgos Operativos' },
            { icon: 'gavel', text: 'Riesgo de Cumplimiento' },
            { icon: 'computer', text: 'Riesgo de Tecnología' },
            { icon: 'gavel', text: 'Riesgo Legal' },
          ],
        },
      ],
      imagen: { src: riesgoIzquierdaImg, alt: 'Ilustración de gestión de riesgos operacionales', w: 335, h: 405 },
    },
  ],
  // Este servicio se apoya directamente en el software TAR
  destacado: {
    ruta: '/software/mu-tar',
    titulo: 'Gestiona el riesgo operativo con TAR',
    texto: 'Eventos de pérdida, matrices, indicadores y reportes en una sola plataforma.',
    label: 'Conocer TAR',
  },
};

const RiesgoEstrategicoOperacional = () => <ServicePage contenido={CONTENIDO} />;

export default RiesgoEstrategicoOperacional;
