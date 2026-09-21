import {
  IconChat,
  IconFlow,
  IconIntegration,
  IconDocument,
  IconSearch,
  IconPen,
  IconWrench,
  IconLifebuoy,
} from './components/icons.jsx'

export const problems = [
  {
    title: 'Atención que no escala',
    desc: 'El mismo puñado de preguntas, cien veces por semana, repartidas entre WhatsApp, mail y teléfono. Alguien las contesta todas, y ese alguien podría estar haciendo otra cosa.',
  },
  {
    title: 'Datos que se cargan a mano',
    desc: 'Copiar de un sistema a otro, de un mail a una planilla, de la planilla al ERP. Trabajo invisible que consume horas y no deja rastro de dónde se rompió.',
  },
  {
    title: 'Errores que aparecen tarde',
    desc: 'El error manual no avisa cuando ocurre. Avisa en el cierre del mes, en el reclamo del cliente o en el número que nunca cuadró.',
  },
  {
    title: 'Decisiones sin información a tiempo',
    desc: 'Los datos existen. Llegan tarde, desordenados y en tres formatos distintos. Se termina decidiendo por intuición donde se podría decidir por evidencia.',
  },
]

export const services = [
  {
    Icon: IconChat,
    title: 'Agentes de IA para atención',
    desc: 'Responden en WhatsApp, web y correo con la información real de tu empresa. Resuelven lo repetitivo y derivan a una persona cuando el caso lo amerita, con el historial completo.',
    footer: 'Incluye base de conocimiento, reglas de derivación y panel de conversaciones.',
  },
  {
    Icon: IconFlow,
    title: 'Automatización de procesos',
    desc: 'Convertimos tareas repetitivas en flujos que corren solos, con registro de cada paso y alerta cuando algo falla. Nada se ejecuta a ciegas.',
    footer: 'Incluye trazabilidad, manejo de errores y notificaciones.',
  },
  {
    Icon: IconIntegration,
    title: 'Integración de sistemas',
    desc: 'Conectamos tu CRM, tu sistema de gestión, tu facturación y tus planillas para que dejen de ser islas. Sin reemplazar lo que ya funciona.',
    footer: 'Incluye mapeo de datos, sincronización y control de duplicados.',
  },
  {
    Icon: IconDocument,
    title: 'Procesamiento de documentos',
    desc: 'Facturas, remitos, contratos y comprobantes leídos y cargados automáticamente. La persona solo revisa las excepciones, no el volumen.',
    footer: 'Incluye extracción, validación y revisión humana de excepciones.',
  },
]

export const methodSteps = [
  {
    number: '01',
    Icon: IconSearch,
    eyebrow: 'Sin costo · 20 min + relevamiento',
    title: 'Diagnóstico',
    desc: 'Una llamada corta para entender tu operación, y un relevamiento de los procesos candidatos. Salís con un mapa de qué conviene automatizar primero y qué no. Si no hay caso, te lo decimos ahí.',
  },
  {
    number: '02',
    Icon: IconPen,
    eyebrow: '1 semana',
    title: 'Kick-off y diseño',
    desc: 'Definimos alcance, entregables, plazo y precio cerrado por escrito. Acordamos qué datos se tocan y cuáles no. Recién cuando eso está firmado, empezamos a construir.',
  },
  {
    number: '03',
    Icon: IconWrench,
    eyebrow: '2 a 6 semanas según alcance',
    title: 'Construcción y pruebas',
    desc: 'Construimos e integramos con tus sistemas. Hay una demo funcionando cada semana, sobre datos reales, no de laboratorio. Vos ves el avance, no un informe del avance.',
  },
  {
    number: '04',
    Icon: IconLifebuoy,
    eyebrow: 'Entrega + 30 días incluidos',
    title: 'Entrega y soporte',
    desc: 'Capacitación del equipo, documentación escrita y traspaso de accesos y código. Treinta días de soporte incluidos para ajustar lo que el uso real destape.',
  },
]

export const intensityOptions = [
  { value: 0.4, label: 'Bastante variable (40%)' },
  { value: 0.6, label: 'Repetitiva con excepciones (60%)' },
  { value: 0.8, label: 'Casi siempre igual (80%)' },
]

export const commitments = [
  {
    title: 'Precio cerrado',
    desc: 'El monto se define antes de empezar y no se mueve, salvo que vos pidas ampliar el alcance por escrito.',
  },
  {
    title: 'Plazo comprometido',
    desc: 'La fecha de entrega va en el acuerdo. Si se atrasa por nuestro lado, no lo pagás vos.',
  },
  {
    title: 'El sistema es tuyo',
    desc: 'Código, accesos, credenciales y documentación se entregan a tu nombre. No quedás atado a nosotros para seguir operando.',
  },
  {
    title: 'Visibilidad semanal',
    desc: 'Una demo funcionando por semana. Si algo no va para donde esperabas, te enterás en siete días, no en dos meses.',
  },
  {
    title: 'Perímetro de datos por escrito',
    desc: 'Antes de escribir código definimos qué dato entra al sistema, cuál no sale nunca de tu infraestructura y quién accede a qué.',
  },
  {
    title: 'Revisión humana donde importa',
    desc: 'Ningún proceso que afecte a un cliente o a la plata se automatiza sin un punto de control humano. Lo diseñamos así por defecto.',
  },
]

export const standardItems = [
  'Control de versiones',
  'Ambiente de pruebas separado del productivo',
  'Documentación escrita de cada flujo',
  'Plan de reversión ante fallos',
  'Registro de cada ejecución',
]

export const faqs = [
  {
    q: '¿Cuánto tarda una implementación?',
    a: 'Entre dos y seis semanas para el primer sistema en producción, según el alcance. El diagnóstico previo toma días y ya te devuelve un mapa accionable, aunque después no trabajes con nosotros.',
  },
  {
    q: '¿Tengo que cambiar las herramientas que uso hoy?',
    a: 'No. Trabajamos sobre tu stack actual. Integrar lo que ya funciona casi siempre rinde más y cuesta menos que reemplazarlo.',
  },
  {
    q: '¿Esto reemplaza gente de mi equipo?',
    a: 'No es el objetivo. Lo que se automatiza es el trabajo repetitivo: carga de datos, respuestas que se repiten, reportes armados a mano. Lo que requiere criterio sigue siendo humano, y lo diseñamos para que así sea.',
  },
  {
    q: '¿Qué pasa con la seguridad de mis datos?',
    a: 'Definimos el perímetro antes de escribir código: qué dato entra al sistema, cuál no sale de tu infraestructura, quién accede y bajo qué registro. Queda documentado y es auditable.',
  },
  {
    q: '¿Cómo se cobra?',
    a: 'Por proyecto, con alcance y precio cerrados antes de empezar. La operación mensual posterior es opcional: si preferís que lo mantenga tu equipo, te dejamos la documentación para hacerlo.',
  },
  {
    q: 'Son una agencia nueva. ¿Por qué debería confiar?',
    a: 'Es una pregunta razonable y la respuesta honesta es que todavía no tenemos una cartera de casos públicos para mostrarte. Lo que sí tenemos es un método explícito, precio cerrado, plazo por escrito y la entrega del código a tu nombre. Empezá por el diagnóstico, que no tiene costo: vas a poder juzgar cómo trabajamos antes de comprometer un peso.',
  },
  {
    q: '¿Y si no sé qué automatizar?',
    a: 'Es el punto de partida más común. Para eso existe el diagnóstico: encontrar el proceso con mayor retorno antes de invertir en construir nada.',
  },
]
