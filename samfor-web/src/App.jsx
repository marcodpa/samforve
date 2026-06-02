import { useState, useEffect, useRef } from 'react'
import {
  Zap, Building2, Settings, Truck, Leaf, Ship, Cpu,
  ChevronRight, Menu, X, ArrowRight, MapPin, Phone, Mail, Globe,
  Upload, CheckCircle, Award, Target, Plus,
  Shield, Star, ChevronDown, Users, Wrench, LayoutGrid, List
} from 'lucide-react'

// ─── IMAGE MAP ────────────────────────────────────────────────────────────────
const IMG = (n) => `/projects/img-${String(n).padStart(3,'0')}.jpg`

// ─── CLASSIFICATION ───────────────────────────────────────────────────────────
// Matches the reference: Civiles / Mecánicos / Eléctricos / Transporte / Ambientales / Otras Divisiones
const DIVISION_META = {
  'Civiles':         { label: 'Proyectos Civiles',     icon: <Building2 size={16}/>,  color: 'bg-samred/10 text-samred border-samred/30',  dot: '#C8102E' },
  'Mecánicos':       { label: 'Proyectos Mecánicos',   icon: <Wrench size={16}/>,     color: 'bg-samred/10 text-samred border-samred/30',  dot: '#C8102E' },
  'Eléctricos':      { label: 'Proyectos Eléctricos',  icon: <Zap size={16}/>,        color: 'bg-samred/10 text-samred border-samred/30',  dot: '#C8102E' },
  'Transporte':      { label: 'División Transporte',   icon: <Truck size={16}/>,      color: 'bg-samred/10 text-samred border-samred/30',  dot: '#C8102E' },
  'Ambientales':     { label: 'Servicios Ambientales', icon: <Leaf size={16}/>,       color: 'bg-samred/10 text-samred border-samred/30',  dot: '#C8102E' },
  'Otras':           { label: 'Servicios Marítimos',   icon: <Ship size={16}/>,       color: 'bg-samred/10 text-samred border-samred/30',  dot: '#C8102E' },
  'Automatización':  { label: 'Automatización y Control', icon: <Cpu size={16}/>,    color: 'bg-samred/10 text-samred border-samred/30',  dot: '#C8102E' },
}

// ─── DATA ────────────────────────────────────────────────────────────────────

const SERVICES = [
  { icon: <Zap size={28}/>, title: 'Obras Eléctricas', division: 'Eléctricos', desc: 'Diseño y construcción de plantas eléctricas, subestaciones, tendido de alta tensión, automatización industrial y sistemas SCADA.' },
  { icon: <Building2 size={28}/>, title: 'Obras Civiles', division: 'Civiles', desc: 'Movimiento de tierras, edificaciones, carreteras, puentes, muelles y construcción en plataformas petroleras y petroquímicas.' },
  { icon: <Settings size={28}/>, title: 'Obras Mecánicas', division: 'Mecánicos', desc: 'Oleoductos, acueductos, tanques, estaciones de bombeo, instalación de tuberías y mantenimiento de facilidades de producción.' },
  { icon: <Truck size={28}/>, title: 'Transporte', division: 'Transporte', desc: 'Transporte especializado de hidrocarburos, equipos industriales y personal. Cobertura terrestre, aérea y marítima en todo Venezuela.' },
  { icon: <Leaf size={28}/>, title: 'Servicios Ambientales', division: 'Ambientales', desc: 'Manejadora de Desechos Peligrosos autorizada desde 1999. Recolección, transporte, tratamiento y disposición final conforme a normativas.' },
  { icon: <Ship size={28}/>, title: 'Servicios Marítimos/Lacustres', division: 'Otras', desc: 'Operaciones en el Lago de Maracaibo, costas venezolanas y Archipiélago Los Monjes. Transporte hacia plataformas offshore con embarcaciones especializadas.' },
  { icon: <Cpu size={28}/>, title: 'Automatización y Control', division: 'Automatización', desc: 'Sistemas PLC/DCS, instrumentación industrial, SCADA, control de procesos y redes industriales para facilidades petroleras y petroquímicas.' },
]

const SERVICES_DETAIL = {
  'Obras Eléctricas': {
    heroImg: '/sv-electrica.webp',
    descImg: '/sv-electrica-desc.webp',
    tagline: 'Energía y potencia para la industria',
    longDesc: 'SAMFOR diseña, construye y mantiene instalaciones eléctricas de alta complejidad para la industria petrolera, petroquímica y de servicios públicos. Con más de 60 años de experiencia, nuestro equipo ejecuta proyectos desde subestaciones de transmisión hasta sistemas de automatización industrial, garantizando continuidad operativa y estándares internacionales.',
    capabilities: [
      'Subestaciones de alta, media y baja tensión',
      'Tendido de líneas de transmisión y distribución',
      'Sistemas SCADA e instrumentación eléctrica',
      'Instalaciones eléctricas en facilidades industriales',
      'Iluminación industrial y perimetral',
      'Mantenimiento predictivo, preventivo y correctivo',
      'Pruebas y puesta en servicio de equipos eléctricos',
    ],
    division: 'Eléctricos',
  },
  'Obras Civiles': {
    heroImg: '/sv-civil.webp',
    tagline: 'Infraestructura que soporta la industria',
    longDesc: 'Ejecutamos obras civiles de gran envergadura para el sector energético, petroquímico y de infraestructura pública. Desde movimiento de tierras y fundaciones hasta edificaciones completas, carreteras industriales y estructuras costeras, SAMFOR aporta ingeniería, equipos propios y personal altamente calificado.',
    capabilities: [
      'Movimiento de tierras y excavaciones',
      'Edificaciones industriales y administrativas',
      'Carreteras, accesos y plataformas',
      'Puentes y obras de arte vial',
      'Muelles y estructuras costeras',
      'Obras en plataformas petroleras',
      'Fundaciones especiales y estructuras de concreto',
    ],
    division: 'Civiles',
  },
  'Obras Mecánicas': {
    heroImg: '/sv-mecanica.webp',
    tagline: 'Ingeniería mecánica de alto desempeño',
    longDesc: 'Especialistas en la construcción y mantenimiento de facilidades de producción, sistemas de tuberías y equipos mecánicos rotativos. SAMFOR garantiza la integridad mecánica de plantas y campos a través de procedimientos rigurosos de inspección, soldadura certificada y montaje de equipos.',
    capabilities: [
      'Oleoductos, gasoductos y poliductos',
      'Tanques de almacenamiento de hidrocarburos',
      'Estaciones de bombeo y compresión',
      'Instalación de tuberías en facilidades',
      'Mantenimiento de plantas de proceso',
      'Montaje de equipos rotativos y estáticos',
      'Inspección y pruebas hidrostáticas',
    ],
    division: 'Mecánicos',
  },
  'Transporte': {
    heroImg: '/sv-transporte2.webp',
    tagline: 'Logística especializada en todo Venezuela',
    longDesc: 'Contamos con una flota de vehículos especializados y embarcaciones para el transporte seguro de hidrocarburos, equipos industriales y personal. Operamos en todo el territorio venezolano con cobertura terrestre, marítima y lacustre, cumpliendo las más estrictas normas de seguridad industrial y transporte de materiales peligrosos.',
    capabilities: [
      'Transporte terrestre de hidrocarburos',
      'Transporte de equipos y materiales industriales',
      'Transporte de personal operativo',
      'Logística y cadena de suministro',
      'Vehículos especializados certificados',
      'Operadores con licencias especiales',
      'Gestión de manifiestos y documentación legal',
    ],
    division: 'Transporte',
  },
  'Servicios Ambientales': {
    heroImg: '/qs-hero.webp',
    tagline: 'Gestión ambiental responsable desde 1999',
    longDesc: 'SAMFOR es una Manejadora de Desechos Peligrosos autorizada por el Ministerio del Ecosistema desde 1999. Ofrecemos soluciones integrales para el manejo, tratamiento y disposición final de residuos industriales, garantizando cumplimiento de normativas ambientales venezolanas e internacionales.',
    capabilities: [
      'Recolección y transporte de desechos peligrosos',
      'Tratamiento físico-químico de efluentes',
      'Disposición final en rellenos autorizados',
      'Auditorías e informes ambientales',
      'Remediación de suelos contaminados',
      'Manejo de derrames de hidrocarburos',
      'Capacitación en gestión ambiental',
    ],
    division: 'Ambientales',
  },
  'Servicios Marítimos/Lacustres': {
    heroImg: '/hero2.webp',
    tagline: 'Operaciones en el Lago y costas venezolanas',
    longDesc: 'Con décadas de presencia en el Lago de Maracaibo y las costas venezolanas, SAMFOR opera embarcaciones especializadas para el transporte de personal, equipos y materiales hacia plataformas offshore. Nuestras operaciones cubren desde el Lago de Maracaibo hasta el Archipiélago Los Monjes y el Golfo de Venezuela.',
    capabilities: [
      'Transporte a plataformas offshore',
      'Operaciones en Lago de Maracaibo',
      'Embarcaciones especializadas certificadas',
      'Transporte de personal y equipos',
      'Operaciones en Los Monjes y Campo Perla',
      'Tripulaciones certificadas PDVSA',
      'Servicio 24/7 con embarcaciones de respaldo',
    ],
    division: 'Otras',
  },
  'Automatización y Control': {
    heroImg: '/sv-photo3.webp',
    tagline: 'Inteligencia industrial para procesos críticos',
    longDesc: 'SAMFOR implementa soluciones de automatización y control para la industria petrolera y petroquímica venezolana. Desde sistemas PLC/DCS hasta plataformas SCADA completas, nuestro equipo de ingenieros especializados garantiza la integración, programación y puesta en marcha de sistemas de control de última generación.',
    capabilities: [
      'Sistemas PLC (Allen-Bradley, Siemens, Schneider)',
      'Sistemas DCS y control distribuido',
      'Plataformas SCADA para supervisión remota',
      'Instrumentación industrial de campo',
      'Redes industriales Ethernet/IP, Profibus, Modbus',
      'HMI y paneles de operación local',
      'Integración con sistemas ERP y MES',
      'Mantenimiento y soporte de sistemas de control',
    ],
    division: 'Automatización',
  },
}

const METRICS = [
  { value: 60, suffix: '', label: 'Años de experiencia' },
  { value: 100, suffix: '+', label: 'Proyectos ejecutados' },
  { value: 20, suffix: '+', label: 'Clientes internacionales' },
  { value: 6, suffix: '', label: 'Líneas de servicio' },
]

const CB = (domain) => `https://logo.clearbit.com/${domain}`
const CLIENT_GRID = [
  // ── Energía / Petróleo internacional ──
  { img: '/clients/pdvsa.webp',           name: 'PDVSA',              sector: 'Energía',        bg: '#fff' },
  { img: '/clients/chevron.webp',         name: 'Chevron',            sector: 'Energía',        bg: '#fff' },
  { img: '/clients/shell.webp',           name: 'Shell',              sector: 'Energía',        bg: '#fff' },
  { img: '/clients/repsol.webp',          name: 'Repsol',             sector: 'Energía',        bg: '#fff' },
  { img: '/clients/eni.webp',             name: 'Eni',                sector: 'Energía',        bg: '#fff' },
  { img: '/clients/cnpc.webp',            name: 'CNPC',               sector: 'Energía',        bg: '#fff' },
  { img: '/clients/halliburton.webp',     name: 'Halliburton',        sector: 'Energía',        bg: '#fff' },
  { img: '/clients/slb.webp',             name: 'SLB',                sector: 'Energía',        bg: '#fff' },
  { img: '/clients/weatherford.webp',     name: 'Weatherford',        sector: 'Energía',        bg: '#fff' },
  { img: '/clients/gazprom.webp',         name: 'Gazprom',            sector: 'Energía',        bg: '#fff' },
  { img: '/clients/petrex.webp',           name: 'Petrex',             sector: 'Energía',        bg: '#fff' },
  // ── Petroquímica ──
  { img: IMG(171),                       name: 'Pequiven',           sector: 'Petroquímica',   bg: '#fff' },
  { img: '/clients/cardon-iv.webp',       name: 'Cardón IV',          sector: 'Petroquímica',   bg: '#fff' },
  // ── Servicios Oilfield ──
  { img: '/clients/baker-hughes.webp',    name: 'Baker Hughes',       sector: 'Servicios',      bg: '#fff' },
  { img: '/clients/mi-swaco.webp',        name: 'Mi-SWACO',           sector: 'Servicios',      bg: '#fff' },
  // ── CAF / Instituciones financieras ──
  { img: '/clients/caf.webp',             name: 'CAF',                sector: 'Finanzas',       bg: '#fff' },
  { img: '/clients/bnc.webp',             name: 'BNC',                sector: 'Finanzas',       bg: '#fff' },
  // ── Internacional / ONU ──
  { img: '/clients/wfp.webp',             name: 'WFP / ONU',          sector: 'Internacional',  bg: '#fff' },
  { img: '/clients/unhcr.webp',           name: 'UNHCR / ACNUR',      sector: 'Internacional',  bg: '#fff' },
  // ── Transporte / Infraestructura ──
  { img: '/clients/metro-maracaibo.webp', name: 'Metro Maracaibo',    sector: 'Transporte',     bg: '#fff' },
  { img: '/clients/fontur.webp',          name: 'Fontur',             sector: 'Transporte',     bg: '#fff' },
  // ── Energía eléctrica Venezuela ──
  { img: '/clients/corpoelec.webp',       name: 'Corpoelec',          sector: 'Electricidad',   bg: '#fff' },
  { img: '/clients/cvg-edelca.webp',      name: 'CVG EDELCA',         sector: 'Electricidad',   bg: '#fff' },
  // ── Industria / Consumo ──
  { img: '/clients/pepsi.webp',           name: 'Pepsi-Cola',         sector: 'Industria',      bg: '#fff' },
  { img: '/clients/polar.webp',           name: 'Empresas Polar',     sector: 'Industria',      bg: '#fff' },
  { img: '/clients/regional.webp',        name: 'C. Regional',        sector: 'Industria',      bg: '#fff' },
  { img: '/clients/carbones-guasare.webp', name: 'Carbones del Guasare', sector: 'Minería',    bg: '#fff' },
  // ── Gobierno / Municipios ──
  { img: '/clients/gob-falcon.webp',      name: 'Gob. Falcón',        sector: 'Gobierno',       bg: '#fff' },
  { img: '/clients/alcaldia-miranda.webp', name: 'Alcaldía Miranda',  sector: 'Gobierno',       bg: '#fff' },
  { img: '/clients/alcaldia-lagunillas.webp', name: 'Alcaldía Lagunillas', sector: 'Gobierno',  bg: '#fff' },
  { img: '/clients/minec.webp',           name: 'Min. Ambiente',      sector: 'Gobierno',       bg: '#fff' },
  { img: '/clients/mppop.webp',           name: 'MPPOP',              sector: 'Gobierno',       bg: '#fff' },
  { img: '/clients/min-agricultura.webp', name: 'Min. Agricultura',   sector: 'Gobierno',       bg: '#fff' },
  { img: '/clients/min-aguas.webp',       name: 'Min. Aguas',         sector: 'Gobierno',       bg: '#fff' },
  // ── Otros ──
  { img: '/clients/lukiven.webp',         name: 'Lukiven S.A.',       sector: 'Industrial',     bg: '#fff' },
  { img: '/clients/farmatodo.webp',       name: 'Farmatodo',          sector: 'Retail',         bg: '#fff' },
]

const SECTOR_COLORS = {
  Energía: 'bg-samred/10 text-samred',
  Petroquímica: 'bg-blue-50 text-samblue',
  Servicios: 'bg-gray-100 text-gray-600',
  Internacional: 'bg-green-50 text-green-700',
  Transporte: 'bg-purple-50 text-purple-700',
  Acuicultura: 'bg-teal-50 text-teal-700',
}

// ─── ALL PROJECTS ─────────────────────────────────────────────────────────────
// division: 'Civiles' | 'Mecánicos' | 'Eléctricos' | 'Transporte' | 'Ambientales' | 'Otras'
const ALL_PROJECTS = [
  // ── ELÉCTRICOS ──
  {
    id: 1, status: 'active', division: 'Eléctricos',
    client: 'Chevron Global Technology Service Company',
    title: 'Mantenimiento Integral Planta Termoeléctrica Bajo Grande',
    img: IMG(28),
    desc: 'Operación y mantenimiento integral: sistemas de agua, contra incendios, combustible, electricidad, turbogeneradores, SCADA y comunicaciones.',
    detail: 'Mantenimiento predictivo, preventivo y correctivo con operación 24/7. Objetivo: mejorar eficiencia operativa y garantizar la continuidad del suministro eléctrico a Campo Boscán.',
  },
  {
    id: 6, status: 'active', division: 'Eléctricos',
    client: 'Chevron Global Technology Service Company',
    title: 'Tendido Líneas Eléctricas 24 KV Campo Boscán',
    img: IMG(62),
    desc: 'Construcción de instalaciones eléctricas de superficie para suministro eléctrico a pozos productores de crudo.',
    detail: 'Tendido de líneas aéreas 24 KV (postes, herrajes y accesorios), instalación de bancos de transformadores, cableados, acometidas, puesta a tierra y conexión de motores.',
  },
  {
    id: 4, status: 'active', division: 'Eléctricos',
    client: 'Chevron Global Technology Service Company',
    title: 'Mantenimiento Generadores de Emergencia Petro Boscán',
    img: IMG(50),
    desc: 'Inspección, limpieza, reparación y mantenimiento preventivo/correctivo de generadores de emergencia. Configuración de software y pruebas en sitio.',
    detail: 'Puesta en marcha con garantía de buen funcionamiento. Traslado de equipos entre instalaciones y talleres. Campo Boscán, Venezuela.',
  },
  {
    id: 101, status: 'completed', division: 'Eléctricos',
    client: 'PDVSA Petróleo, S.A.',
    title: 'Implantación Generadores + Subestación 155 KV',
    img: IMG(23),
    desc: 'Proyecto IPC: dos Turbo Generadores de Gas de 30 MW ISO en ciclo simple, subestación 155 KV e interconexión con Línea Doble Terna Pirital–Pigap II a 115 kV.',
    detail: 'Modalidad IPC (Ingeniería, Procura y Construcción). Planta PIGAP II, El Tejero, Municipio Ezequiel Zamora, Estado Monagas.',
  },
  {
    id: 106, status: 'completed', division: 'Eléctricos',
    client: 'ENELVEN',
    title: 'Subestación El Tablazo 400/230/34.5 KV – 150 MVA',
    img: IMG(120),
    desc: 'Suministro, traslado, instalación y puesta en servicio de autotransformador de potencia monofásico 400/230/34.5 KV, 150 MVA.',
    detail: 'Instalación completa con pruebas de funcionamiento. Subestación El Tablazo, Venezuela.',
  },
  {
    id: 107, status: 'completed', division: 'Eléctricos',
    client: 'ENELCO – Energía Eléctrica de la Costa Oriental',
    title: 'Subestación Cabimas 230/115 KV',
    img: IMG(4),
    desc: 'Montaje electromecánico y ampliación de subestación Cabimas 230/115 KV. Construcción línea de transmisión entrada y salida.',
    detail: 'Ampliación y montaje electromecánico completo con construcción de la línea de transmisión 230 KV.',
  },
  {
    id: 111, status: 'completed', division: 'Eléctricos',
    client: 'PEQUIVEN – Petroquímica de Venezuela, S.A.',
    title: 'Tendido Eléctrico Planta Cloro Soda',
    img: IMG(56),
    desc: 'Tendido de alimentaciones eléctricas en bandeja portacables a motores 480V. Planta Cloro Soda, Complejo Petroquímico Ana María Campos.',
    detail: 'Bandejas portacables, cables de potencia 480V, conexiones a motores eléctricos. Complejo Petroquímico Ana María Campos, Zulia.',
  },
  {
    id: 117, status: 'completed', division: 'Eléctricos',
    client: 'Maraven, S.A.',
    title: 'Subestaciones Eléctricas Lagunillas',
    img: IMG(4),
    desc: 'Acometida eléctrica El Polvorín Lagunillas. Subestación 42 Campo Las Delicias. Mejoras eléctricas en drenajes.',
    detail: 'Tres contratos para Maraven en Lagunillas. Infraestructura eléctrica para operaciones de producción en el Lago de Maracaibo.',
  },
  {
    id: 119, status: 'completed', division: 'Eléctricos',
    client: 'Gobernación del Estado Falcón',
    title: 'Subestación Eléctrica La Sabanita – Falcón',
    img: IMG(56),
    desc: 'Consolidación de la subestación eléctrica La Sabanita, Municipio Petit, Estado Falcón.',
    detail: 'Consolidación y puesta en servicio completa para la Gobernación del Estado Falcón, mejorando la distribución eléctrica regional.',
  },

  // ── MECÁNICOS ──
  {
    id: 2, status: 'active', division: 'Mecánicos',
    client: 'Chevron Global Technology Service Company',
    title: 'Instalación y Preservación Turbinas GE LM-6000PC',
    img: IMG(33),
    desc: 'Instalación y desmontaje de turbinas GE LM6000PC, acondicionamiento, mantenimiento preventivo/correctivo y certificación de equipos.',
    detail: 'Reparación de motores y componentes, suministro de repuestos. Optimizar la eficiencia operativa y prolongar la vida útil de los equipos de generación.',
  },
  {
    id: 3, status: 'active', division: 'Mecánicos',
    client: 'Chevron Global Technology Service Company',
    title: 'Mantenimiento Planta Agua Desmineralizada Bajo Grande',
    img: IMG(38),
    desc: 'Mantenimiento correctivo de la Planta de Agua Desmineralizada. Subsistemas críticos, mejoras civiles y actualización de sistemas.',
    detail: 'Mantenimiento mayor, intermedio y menor de subsistemas. Reparación de motores eléctricos, válvulas y bombas. Garantiza la continuidad del suministro de agua para generación.',
  },
  {
    id: 7, status: 'active', division: 'Mecánicos',
    client: 'PDVSA Petróleo, S.A.',
    title: 'Mantenimiento General Llenadero Productos Blancos Cardón',
    img: IMG(90),
    desc: 'Mantenimiento general del llenadero de productos blancos en la refinería Cardón, garantizando operatividad y seguridad.',
    detail: 'Mantenimiento integral de equipos mecánicos, instalaciones eléctricas, estructuras civiles y sistemas de seguridad. Refinería Cardón, Venezuela.',
  },
  {
    id: 102, status: 'completed', division: 'Mecánicos',
    client: 'PDVSA Petróleo, S.A.',
    title: 'Puntos GNV Carabobo, Yaracuy y Aragua',
    img: IMG(96),
    desc: 'Ingeniería de detalle y construcción de puntos de expendio de gas natural vehicular en estaciones de servicio existentes.',
    detail: 'Acometidas alta y baja tensión, módulos de medición, tableros, transformadores, cableado, puesta a tierra e iluminación exterior. Disciplinas: civil, mecánica e instrumentación.',
  },
  {
    id: 103, status: 'completed', division: 'Mecánicos',
    client: 'PDVSA Petróleo, S.A.',
    title: 'Gasoducto Anaco–Barquisimeto Ø36" y Ø30"',
    img: IMG(103),
    desc: 'Reemplazo de tubería Ø36" API 5L X60 y Ø30" API 5L X52. Subsistemas EPA-N50 y EPA-N5.',
    detail: 'Adecuación del gasoducto LANA Ø36" y NURGAS Ø30" mediante reclasificación de área, garantizando operatividad y cumplimiento de estándares vigentes.',
  },
  {
    id: 121, status: 'completed', division: 'Mecánicos',
    client: 'PDVSA Petróleo, S.A.',
    title: 'Mantenimiento Campos Bachaquero y Barua Motatan',
    img: IMG(85),
    desc: 'Mantenimiento operacional de facilidades de producción tierra costa este, Campos Bachaquero y Barua Motatan.',
    detail: 'Facilidades civiles, eléctricas y mecánicas a pozos, localizaciones, vías de acceso e instalaciones campos Barua, Motatan y Tomoporo.',
  },

  // ── CIVILES ──
  {
    id: 5, status: 'active', division: 'Civiles',
    client: 'Chevron Global Technology Service Company',
    title: 'Mantenimiento Integral Instalaciones Petro Boscán',
    img: IMG(67),
    desc: 'Métodos físicos, mecánicos y químicos. 21.000.000 m² en Campo Boscán, Richmond, Terminal de Embarque Bajo Grande y Termoeléctrica.',
    detail: '14.000.000 m² corte manual y 7.000.000 m² con corte a máquina. Control de vegetación durante un año para garantizar accesibilidad operativa.',
  },
  {
    id: 104, status: 'completed', division: 'Civiles',
    client: 'PRECOWAYSS / Metro de Maracaibo',
    title: 'Obras Complementarias Metro de Maracaibo',
    img: IMG(72),
    desc: 'Muros, defensas y drenajes, Patios y Talleres, reubicación de servicios tramo TR-4 y equipamiento del Edificio de Servicios Generales.',
    detail: 'Explanación de patios y talleres, adecuación de oficinas generales y presidenciales, equipamiento segunda planta del Edificio de Servicios Generales.',
  },
  {
    id: 105, status: 'completed', division: 'Civiles',
    client: 'PDVSA Petróleo, S.A.',
    title: 'Interconexión Islas Los Monjes Sur',
    img: IMG(77),
    desc: 'Dique Escollera para la interconexión entre las Islas de los Monjes del Sur y la plataforma en la Isla Pequeña, Archipiélago Los Monjes.',
    detail: 'Movilización de equipos, instalación de estructuras provisionales, preparación y voladura de rocas, construcción de terrazas y rompeolas.',
  },
  {
    id: 108, status: 'completed', division: 'Civiles',
    client: 'VENESHRIMP',
    title: 'Proyecto Acuícola Mitare',
    img: IMG(111),
    desc: 'Ingeniería, Procura y Construcción del Proyecto Acuícola Mitare. Movimiento de tierras, lagunas, muros, diques e infraestructura camaronera.',
    detail: 'Lagunas de cultivo, sistemas de distribución de agua, estructuras civiles e instalaciones eléctricas. Proyecto IPC completo.',
  },
  {
    id: 118, status: 'completed', division: 'Civiles',
    client: 'Ministerio de Infraestructura',
    title: 'Carretera Los Filuos – Cojoro – Castillete',
    img: IMG(111),
    desc: 'Construcción y pavimentación de carretera Los Filuos – Cojoro – Castillete.',
    detail: 'Movimiento de tierras, base, sub-base, pavimentación asfáltica y obras complementarias.',
  },

  // ── AMBIENTALES ──
  {
    id: 109, status: 'completed', division: 'Ambientales',
    client: 'Chevron / Texaco Petroleum Co.',
    title: 'Sistema de Remediación Petroboscán',
    img: IMG(128),
    desc: 'Sub Estación Eléctrica Refinería Bajo Grande. Sistema de remediación, transporte de efluentes líquidos y desechos sólidos.',
    detail: 'Unidades tipo Vacuum y de plataforma. Tratamiento de efluentes. Disposición final de desechos sólidos y procesamiento de materiales peligrosos.',
  },
  {
    id: 110, status: 'completed', division: 'Ambientales',
    client: 'Shell Venezuela',
    title: 'Manejo Integral Desechos Industriales Shell',
    img: IMG(130),
    desc: 'Remoción, extracción y limpieza de gabarras. Transporte de lodos y ripios. Almacenamiento temporal y tratamiento.',
    detail: 'Técnicas de esparcimiento y biorremediación. Recolección, transporte, almacenamiento y tratamiento de sólidos y líquidos.',
  },
  {
    id: 115, status: 'completed', division: 'Ambientales',
    client: 'Consorcio Petrobras Energía – Williams',
    title: 'Saneamiento Ambiental Bachaquero / Puerto Miranda',
    img: IMG(127),
    desc: 'Manejo de agua en fosa, tratamiento de sedimentos y suelos impactados, confinamiento y conformación de superficie.',
    detail: 'Obras temporales, tratamiento de sedimentos, suministro de material de préstamo. Bachaquero y Puerto Miranda.',
  },
  {
    id: 120, status: 'completed', division: 'Ambientales',
    client: 'Suelopetrol',
    title: 'Manejo Arenas Petrolizadas',
    img: IMG(130),
    desc: 'Transporte en volquetas y disposición final de arenas petrolizadas conforme a normativas ambientales.',
    detail: 'Servicio ambiental certificado para manejo de residuos industriales peligrosos.',
  },
  {
    id: 122, status: 'completed', division: 'Ambientales',
    client: 'Petrex',
    title: 'Recolección Desechos Taladros PTX',
    img: IMG(128),
    desc: 'Recolección de desechos sólidos y líquidos para taladros PTX-5802, PTX-5920, PTX-5954, PTX-5955 y base Ojeda.',
    detail: 'Servicio integral de gestión ambiental para operaciones de perforación.',
  },
  {
    id: 130, status: 'completed', division: 'Ambientales',
    client: 'Petroquímica de Venezuela, S.A. (PEQUIVEN)',
    title: 'Manejo Desechos Ana María Campos',
    img: IMG(127),
    desc: 'Manejo y disposición de desechos industriales del Complejo Petroquímico Ana María Campos.',
    detail: 'Recolección, transporte y disposición final de materiales peligrosos del complejo petroquímico.',
  },

  // ── TRANSPORTE ──
  {
    id: 113, status: 'completed', division: 'Transporte',
    client: 'WFP / Programa Mundial de Alimentos – ONU',
    title: 'Transporte Alimentos WFP Venezuela',
    img: IMG(129),
    desc: 'Transporte de alimentos en Zona Sur del Lago de Maracaibo, Zulia y Yaracuy. Insumos del Programa Mundial de Alimentos.',
    detail: 'Múltiples contratos con WFP ONU. Procura y entrega de insumos de cocina de acero inoxidable a locaciones rurales.',
  },
  {
    id: 114, status: 'completed', division: 'Transporte',
    client: 'UNHCR / Consejo Noruego para Refugiados',
    title: 'Suministros Humanitarios UNHCR',
    img: IMG(122),
    desc: 'Procura y entrega de camas y colchones a poblaciones rurales. Kits de salud personal en San Cristóbal, Estado Táchira.',
    detail: 'Distribución logística nacional para UNHCR y Consejo Noruego para Refugiados.',
  },
  {
    id: 116, status: 'completed', division: 'Transporte',
    client: 'Schlumberger, Weatherford, MI SWACO',
    title: 'Transporte Lodos y Ripios de Perforación',
    img: IMG(121),
    desc: 'Lodos y ripios base agua y aceite, efluentes líquidos, salmueras contaminadas y química descartada.',
    detail: 'Unidades vacuum y bateas. Clientes: Schlumberger, Weatherford, Tucker Energy, Dresser Rand, MI Swaco.',
  },

  // ── OTRAS (Marítimo / Lacustre) ──
  {
    id: 112, status: 'completed', division: 'Otras',
    client: 'Cardón IV (Eni / Repsol)',
    title: 'Servicio Embarcaciones Campo Perla',
    img: IMG(136),
    desc: 'Embarcación NO estándar, NO DP para operaciones marítimas en Campo Perla. Transporte de materiales, equipos y personal.',
    detail: 'Cardón IV (CM 4600001208 / CM 4700022511). Embarcaciones especializadas offshore en Campo Perla, Golfo de Venezuela.',
  },
  {
    id: 200, status: 'completed', division: 'Otras',
    client: 'PDVSA Petróleo, S.A.',
    title: 'Servicios Marítimos Lago de Maracaibo',
    img: IMG(5),
    desc: 'Operaciones marítimas y lacustres en el Lago de Maracaibo y costas de Venezuela. Transporte de personal y equipos.',
    detail: 'Más de 60 años de operaciones vinculadas con las costas venezolanas, el Lago de Maracaibo y el Archipiélago Los Monjes.',
  },
  // ── AUTOMATIZACIÓN Y CONTROL ──
  {
    id: 301, status: 'active', division: 'Automatización',
    client: 'Chevron Global Technology Service Company',
    title: 'Sistema SCADA Planta Termoeléctrica Bajo Grande',
    img: IMG(28),
    desc: 'Implementación y mantenimiento de sistema SCADA para supervisión y control de turbogeneradores, sistemas eléctricos y utilidades de la planta.',
    detail: 'Integración de PLCs Allen-Bradley con HMI FactoryTalk. Comunicación Ethernet/IP y ControlNet. Monitoreo en tiempo real de 1,200+ variables de proceso.',
  },
  {
    id: 302, status: 'active', division: 'Automatización',
    client: 'Chevron Global Technology Service Company',
    title: 'Automatización Sistema de Agua Campo Boscán',
    img: IMG(62),
    desc: 'Automatización integral del sistema de distribución y tratamiento de agua para Campo Boscán. PLCs, instrumentación de campo y telemetría.',
    detail: 'Instalación de sensores de flujo, presión y nivel. Programación de PLC Siemens S7-300. Interfaz HMI local y remota con reportes automáticos de operación.',
  },
  {
    id: 303, status: 'completed', division: 'Automatización',
    client: 'CORPOELEC',
    title: 'Sistema de Control y Protección Subestación 155 KV',
    img: IMG(23),
    desc: 'Sistema de protección de relés digitales y control automatizado para la nueva subestación 155 KV en la Costa Oriental del Lago.',
    detail: 'Relés de protección SEL-700G y SEL-451. Sistema de control distribuido con comunicación IEC 61850. Panel de supervisión local y enlace SCADA a centro de control.',
  },
]

const TIMELINE = [
  { year: '1966', title: 'Fundación de SAMFOR', desc: 'Nace SAMFOR, S.A. en Maracaibo, Venezuela. Inicio de operaciones en la industria petrolera del Lago de Maracaibo.' },
  { year: '1980s', title: 'Expansión de Servicios', desc: 'Ampliación hacia obras civiles, mecánicas y telecomunicaciones. Consolidación como contratista integral del sector energético.' },
  { year: '1999', title: 'Autorización Ambiental', desc: 'Autorización del Ministerio del Ecosistema como Manejadora de Desechos Peligrosos. Nueva línea de negocios estratégica.' },
  { year: '2000s', title: 'Expansión Regional', desc: 'Contratos con Shell, Petrobras, Eni/Repsol y Cardón IV. Operaciones en Los Monjes y Campo Perla offshore.' },
  { year: '2015', title: 'Proyectos Hito', desc: 'Metro de Maracaibo, Gasoductos Anaco–Barquisimeto y contratos con WFP/UNHCR de Naciones Unidas.' },
  { year: '2026', title: '60 Años de Trayectoria', desc: 'Proyectos activos con Chevron y PDVSA. 60 años de excelencia técnica y compromiso con Venezuela.' },
]

// ─── HOOKS ───────────────────────────────────────────────────────────────────

function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.scroll-reveal')
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('revealed'); io.unobserve(e.target) } }),
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  })
}

function useCounter(target, inView) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!inView) return
    let start = 0
    const step = Math.max(1, Math.ceil(target / 80))
    const timer = setInterval(() => {
      start += step
      if (start >= target) { setCount(target); clearInterval(timer) }
      else setCount(start)
    }, 18)
    return () => clearInterval(timer)
  }, [inView, target])
  return count
}

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

function SamforLogo({ size = 36, invert = false }) {
  return <img src="/samfor-logo.png" alt="SAMFOR" width={size} height={size} className={`object-contain ${invert ? 'brightness-0 invert' : ''}`} />
}

function CounterItem({ value, suffix, label }) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  const count = useCounter(value, inView)
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); io.disconnect() } }, { threshold: 0.4 })
    if (ref.current) io.observe(ref.current)
    return () => io.disconnect()
  }, [])
  return (
    <div ref={ref} className="text-center px-2 py-5 md:px-5 md:py-7 flex-1">
      <div className="font-display text-[2.5rem] md:text-[4.5rem] text-samred leading-none tabular-nums">{count}{suffix}</div>
      <div className="font-sub text-[0.8rem] md:text-[0.9rem] font-semibold uppercase tracking-widest text-secondary mt-2 md:mt-3 leading-tight">{label}</div>
    </div>
  )
}

// ─── DIVISION BADGE ───────────────────────────────────────────────────────────
function DivisionBadge({ division, size = 'sm' }) {
  const m = DIVISION_META[division]
  if (!m) return null
  return (
    <span className={`inline-flex items-center gap-1 font-mono font-semibold rounded border px-2 py-0.5 ${m.color} ${size === 'xs' ? 'text-[0.75rem]' : 'text-xs'}`}>
      {m.icon}{m.label}
    </span>
  )
}

// ─── NAVBAR ───────────────────────────────────────────────────────────────────
function Navbar({ page, setPage, scrolled, forceDark, logoProgress = 1 }) {
  const [open, setOpen] = useState(false)
  const links = [
    { id: 'inicio', label: 'Inicio' },
    { id: 'servicios', label: 'Servicios' },
    { id: 'proyectos', label: 'Proyectos' },
    { id: 'quienes-somos', label: 'Quiénes Somos' },
    { id: 'contacto', label: 'Contacto' },
  ]

  const dark = forceDark
  const white = !dark && (scrolled || page === 'proyectos')
  const navBg = dark ? 'bg-[#0D1117] border-b border-white/10' : white ? 'bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)]' : 'bg-transparent'
  const textColor = dark ? 'text-white' : 'text-dark'
  const linkActive = 'text-samred'
  const linkIdle = dark ? 'text-white/70 hover:text-white' : 'text-dark hover:text-samred'

  // ── Animated logo ──────────────────────────────────────────────────────────
  // Ease in-out cubic
  const t = Math.min(Math.max(logoProgress, 0), 1)
  const eased = t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t+2, 3)/2

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  const HERO_H   = isMobile ? 170 : 280   // logo height when in hero
  const NAV_H    = 170                     // logo height when at navbar (slightly bigger than original)
  const currentH = HERO_H + (NAV_H - HERO_H) * eased

  // Hero: center logo at 42% of viewport height
  // Navbar: center logo at 48px (middle of h-24=96px navbar)
  const vph = typeof window !== 'undefined' ? window.innerHeight : 800
  const heroCY = vph * 0.42
  const navCY  = 48
  const currentCY = heroCY + (navCY - heroCY) * eased
  const currentTop = currentCY - currentH / 2

  // Left: match container padding + max-w-7xl centering
  const vpw = typeof window !== 'undefined' ? window.innerWidth : 1280
  const containerPad = vpw >= 768 ? 32 : 16
  const centerOffset = Math.max(0, (vpw - 1280) / 2)
  const leftPx = centerOffset + containerPad

  // Logo filter: white over dark hero → original colors at navbar
  const logoInvert = dark || eased < 0.65
  // ──────────────────────────────────────────────────────────────────────────

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}>

      {/* ── Animated floating logo (scroll-driven) ── */}
      <button
        onClick={() => { setPage('inicio'); setOpen(false) }}
        aria-label="Inicio"
        style={{
          position: 'fixed',
          zIndex: 55,
          top: Math.round(currentTop),
          left: Math.round(leftPx),
          height: Math.round(currentH),
          width: 'auto',
          background: 'none',
          border: 'none',
          padding: 0,
          cursor: 'pointer',
          lineHeight: 0,
          transition: eased >= 0.98 ? 'filter 0.25s ease' : 'none',
        }}
      >
        <img
          src="/logo.png"
          alt="SAMFOR"
          style={{
            height: '100%',
            width: 'auto',
            filter: logoInvert ? 'brightness(0) invert(1)' : 'none',
            transition: 'filter 0.3s ease',
          }}
        />
      </button>

      <div className="max-w-7xl mx-auto px-4 md:px-8 h-24 flex items-center justify-between">
        {/* Invisible placeholder to preserve flex layout space */}
        <div aria-hidden="true" style={{ height: '170px', width: '220px', flexShrink: 0 }} />

        <div className="hidden md:flex items-center gap-7">
          {links.map(l => (
            <button key={l.id} onClick={() => setPage(l.id)}
              className={`nav-link font-sub font-semibold text-[0.8125rem] tracking-wider uppercase transition-colors ${page === l.id ? linkActive + ' active' : linkIdle}`}
              aria-current={page === l.id ? 'page' : undefined}
            >{l.label}</button>
          ))}
          <button onClick={() => setPage('contacto')} className="btn-outline-red text-[0.75rem] ml-1">Trabaja con Nosotros</button>
        </div>
        <button className={`md:hidden p-2 ${textColor} transition-colors duration-300`} onClick={() => setOpen(!open)} aria-label="Menú">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {open && (
        <div className={`md:hidden border-t px-5 pb-6 pt-2 shadow-lg ${dark ? 'bg-[#0D1117] border-white/10' : 'bg-white border-border'}`}>
          {links.map(l => (
            <button key={l.id} onClick={() => { setPage(l.id); setOpen(false) }}
              className={`block w-full text-left py-3.5 font-sub font-semibold text-base tracking-wider uppercase border-b last:border-0 ${dark ? 'border-white/10' : 'border-border'} ${page === l.id ? 'text-samred' : dark ? 'text-white/70' : 'text-dark'}`}
            >{l.label}</button>
          ))}
          <button onClick={() => { setPage('contacto'); setOpen(false) }} className="btn-outline-red mt-4">Trabaja con Nosotros</button>
        </div>
      )}
    </nav>
  )
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer({ setPage }) {
  return (
    <footer className="bg-dark text-white pt-14 pb-6">
      <div className="px-6 md:px-14 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-10 border-b border-white/10">
          <div>
            <div className="mb-4"><img src="/logo.png" alt="SAMFOR" style={{ height: '100px' }} className="w-auto brightness-0 invert" /></div>
            <p className="text-white/55 text-base leading-relaxed mb-5 max-w-xs">Construyendo Venezuela desde 1966. Empresa líder en construcción industrial, servicios petroleros y ambientales.</p>
          </div>
          <div>
            <h4 className="font-sub font-semibold text-sm uppercase tracking-widest text-white/40 mb-5">Navegación</h4>
            <div className="flex flex-col gap-2.5">
              {[['inicio','Inicio'],['proyectos','Proyectos'],['quienes-somos','Quiénes Somos'],['contacto','Contacto']].map(([id,label]) => (
                <button key={id} onClick={() => setPage(id)} className="text-left text-white/65 hover:text-white transition-colors text-base">{label}</button>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-sub font-semibold text-sm uppercase tracking-widest text-white/40 mb-5">Contacto</h4>
            <div className="flex flex-col gap-3 text-base text-white/65">
              <div className="flex items-start gap-2.5"><MapPin size={13} className="mt-0.5 flex-shrink-0 text-samred" /><span>Av. 3H entre Calles 68-70 N.69-61, Maracaibo, Venezuela</span></div>
              <div className="flex items-center gap-2.5"><Mail size={13} className="flex-shrink-0 text-samred" /><span>samfor@samfor.com</span></div>
              <div className="flex items-center gap-2.5"><Phone size={13} className="flex-shrink-0 text-samred" /><span>+58 261 814 4444</span></div>
              <div className="flex items-center gap-2.5"><Globe size={13} className="flex-shrink-0 text-samred" /><span>www.samfor.com</span></div>
            </div>
          </div>
        </div>
        <div className="pt-5 flex flex-col md:flex-row md:items-center justify-between gap-2 text-white/30 text-xs">
          <span>© 2026 SAMFOR, S.A. | Maracaibo, Venezuela</span>
          <span>Manejadora de Desechos Peligrosos autorizada desde 1999</span>
        </div>
      </div>
    </footer>
  )
}

// ─── PROJECT DETAIL PAGE ──────────────────────────────────────────────────────
function ProjectDetailPage({ project, onClose }) {
  const onCloseRef = useRef(onClose)
  useEffect(() => { onCloseRef.current = onClose }, [onClose])

  useEffect(() => {
    const h = e => { if (e.key === 'Escape') onCloseRef.current() }
    document.addEventListener('keydown', h)
    window.scrollTo({ top: 0, behavior: 'instant' })
    return () => document.removeEventListener('keydown', h)
  }, []) // empty deps — only runs on mount, no scroll loop

  const m = DIVISION_META[project.division]
  const related = ALL_PROJECTS.filter(p => p.division === project.division && p.id !== project.id).slice(0, 3)

  return (
    <div className="bg-dark min-h-screen pt-16">

      {/* ── HERO — full image visible ── */}
      <div className="relative w-full bg-[#060809] flex items-center justify-center" style={{ minHeight: '72vh' }}>
        <img
          src={project.img}
          alt={project.title}
          className="w-full h-auto max-h-[80vh] object-contain"
          loading="lazy"
        />
        {/* Subtle dark vignette on sides only */}
        <div className="absolute inset-0 bg-gradient-to-r from-dark/40 via-transparent to-dark/40 pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-dark to-transparent pointer-events-none" />
        {/* Back button — top left */}
        <button onClick={onClose}
          className="absolute top-6 left-6 md:left-10 flex items-center gap-2 bg-dark/60 backdrop-blur-sm border border-white/15 text-white/80 hover:text-white hover:border-white/40 transition-all px-3.5 py-2 rounded text-xs font-sub font-semibold uppercase tracking-widest z-10"
        >
          <ArrowRight size={12} className="rotate-180" /> Proyectos
        </button>

        {/* Status badge — top right */}
        {project.status === 'active' && (
          <div className="absolute top-6 right-6 md:right-10 flex items-center gap-1.5 bg-dark/60 backdrop-blur-sm px-3 py-1.5 rounded-full border border-green-500/30 z-10">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 dot-pulse" />
            <span className="text-green-400 text-[0.82rem] font-mono uppercase tracking-widest">En Ejecución</span>
          </div>
        )}

        {/* Red accent bar — bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-samred" />
      </div>

      {/* ── TITLE BLOCK — below image ── */}
      <div className="px-6 md:px-14 lg:px-20 pt-10 pb-2">
        <div className="max-w-5xl mx-auto">
          <div className="mb-3"><DivisionBadge division={project.division} /></div>
          <h1 className="font-display text-[clamp(2rem,5vw,4rem)] text-white leading-none tracking-wide">{project.title}</h1>
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div className="px-6 md:px-14 lg:px-20 py-10">
        <div className="max-w-5xl mx-auto">

          {/* Client + meta row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 mb-12 border border-white/10 rounded overflow-hidden">
            <div className="px-7 py-6 border-b md:border-b-0 md:border-r border-white/10">
              <p className="font-sub font-semibold text-[0.78rem] uppercase tracking-[0.2em] text-samred mb-2">Cliente</p>
              <p className="font-sub font-bold text-base text-white leading-snug">{project.client}</p>
            </div>
            <div className="px-7 py-6 border-b md:border-b-0 md:border-r border-white/10">
              <p className="font-sub font-semibold text-[0.78rem] uppercase tracking-[0.2em] text-white/35 mb-2">División</p>
              <p className="font-sub font-bold text-base uppercase tracking-wide text-white/80">{m?.label}</p>
            </div>
            <div className="px-7 py-6">
              <p className="font-sub font-semibold text-[0.78rem] uppercase tracking-[0.2em] text-white/35 mb-2">Estado</p>
              {project.status === 'active' ? (
                <span className="flex items-center gap-2 text-green-400 text-sm font-sub font-semibold">
                  <span className="w-2 h-2 rounded-full bg-green-400 dot-pulse flex-shrink-0" /> En Ejecución 2026
                </span>
              ) : (
                <span className="flex items-center gap-2 text-white/45 text-sm font-sub font-semibold">
                  <span className="w-2 h-2 rounded-full bg-white/25 flex-shrink-0" /> Culminado
                </span>
              )}
            </div>
          </div>

          {/* Description + Scope — two column on large screens */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1px_1fr] gap-0 mb-14">
            {project.desc && (
              <div className="lg:pr-12 pb-10 lg:pb-0">
                <p className="font-sub font-semibold text-[0.78rem] uppercase tracking-[0.2em] text-white/35 mb-5">Descripción</p>
                <p className="text-white/70 text-[1rem] leading-relaxed">{project.desc}</p>
              </div>
            )}
            {/* Divider */}
            {project.desc && project.detail && (
              <div className="hidden lg:block bg-white/8" />
            )}
            {project.detail && (
              <div className="lg:pl-12 pt-10 lg:pt-0">
                <p className="font-sub font-semibold text-[0.78rem] uppercase tracking-[0.2em] text-white/35 mb-5">Alcance del Proyecto</p>
                <div className="border-l-[3px] border-samred pl-5">
                  <p className="text-white/60 text-[0.9375rem] leading-relaxed">{project.detail}</p>
                </div>
              </div>
            )}
          </div>

          {/* Back button */}
          <button onClick={onClose}
            className="flex items-center gap-2 border border-white/20 text-white/50 hover:border-samred hover:text-samred font-sub font-bold text-xs uppercase tracking-widest px-5 py-3 rounded transition-all duration-200 mb-16"
          >
            <ArrowRight size={12} className="rotate-180" /> Volver a la lista
          </button>

        </div>
      </div>

      {/* Related projects — white section */}
      {related.length > 0 && (
        <div className="bg-white px-6 md:px-14 lg:px-20 py-14">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <span className="h-[3px] w-8 bg-samred" />
              <span className="font-sub font-semibold text-[0.82rem] uppercase tracking-widest text-samred">Proyectos relacionados</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {related.map(p => (
                <div key={p.id}
                  className="group cursor-pointer rounded overflow-hidden bg-white border border-gray-200 hover:border-samred hover:shadow-lg transition-all duration-300"
                  onClick={() => onClose(p)}
                >
                  <div className="relative overflow-hidden" style={{ height: '180px' }}>
                    <img src={p.img} alt={p.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <div className="absolute top-0 left-0 right-0 h-[3px] bg-samred" />
                  </div>
                  <div className="p-4">
                    <p className="text-gray-400 text-[0.8rem] font-mono uppercase tracking-widest mb-1">{p.client}</p>
                    <h3 className="font-sub font-bold text-sm uppercase tracking-wide text-dark group-hover:text-samred transition-colors leading-snug line-clamp-2">{p.title}</h3>
                    <div className="flex items-center gap-1 text-samred text-xs font-sub font-semibold uppercase tracking-widest mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      Ver detalle <ArrowRight size={11} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── PROJECT CARD ─────────────────────────────────────────────────────────────
function ProjectCard({ project, onClick }) {
  const m = DIVISION_META[project.division]
  return (
    <div
      onClick={() => onClick(project)}
      className="project-card bg-white border border-border rounded overflow-hidden cursor-pointer group"
      role="button" tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onClick(project)}
    >
      <div className="relative h-44 overflow-hidden">
        <img src={project.img} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent" />
        {project.status === 'active' && (
          <div className="absolute top-3 right-3 inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-green-600/90 backdrop-blur-sm px-2 py-0.5 rounded">
            <span className="w-1.5 h-1.5 rounded-full bg-white dot-pulse" />En Ejecución
          </div>
        )}
        {/* Division color bar on image bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-[3px]" style={{ background: m?.dot || '#C8102E' }} />
      </div>
      <div className="p-4">
        <p className="text-[0.82rem] font-mono font-semibold text-secondary uppercase tracking-wide mb-1.5 line-clamp-1">{project.client}</p>
        <h3 className="font-sub font-bold text-base text-dark mb-3 leading-snug line-clamp-2">{project.title}</h3>
        <p className="text-secondary text-base leading-relaxed mb-3 line-clamp-2">{project.desc}</p>
        <div className="flex items-center justify-between gap-2">
          <DivisionBadge division={project.division} size="xs" />
          <span className="text-samred text-xs font-sub font-semibold uppercase tracking-wide flex items-center gap-1 group-hover:gap-2 transition-all flex-shrink-0">
            Detalle <ChevronRight size={11} />
          </span>
        </div>
      </div>
    </div>
  )
}

// ─── CLIENTS GRID ─────────────────────────────────────────────────────────────
function ClientLogo({ c }) {
  const [imgOk, setImgOk] = useState(true)
  const initials = c.name.split(/[\s/]+/).slice(0, 2).map(w => w[0]).join('').toUpperCase()
  const showImg = c.img && imgOk
  const bgColor = c.bg === '#000' ? '#111' : (c.bg || '#1a2233')
  return (
    <div className="w-12 h-12 rounded flex items-center justify-center overflow-hidden flex-shrink-0" style={{ background: bgColor }}>
      {showImg
        ? <img src={c.img} alt={c.name} className="max-h-9 max-w-[2.5rem] object-contain" onError={() => setImgOk(false)} />
        : <span className="font-display font-bold text-xs leading-none" style={{ color: c.accent || bgColor === '#111' ? '#fff' : '#fff' }}>{initials}</span>
      }
    </div>
  )
}

function ClientCard({ c }) {
  return (
    <div className="flex-shrink-0 flex items-center gap-4 bg-white/5 border border-white/10 rounded px-7 py-4 hover:border-samred/50 hover:bg-white/8 transition-all duration-200 group">
      <ClientLogo c={c} />
      <div>
        <p className="font-sub font-bold text-base uppercase tracking-wide text-white/80 group-hover:text-white transition-colors">{c.name}</p>
        <p className="text-white/35 text-[0.8rem] font-mono uppercase tracking-widest">{c.sector}</p>
      </div>
    </div>
  )
}

const CARD_PX = 240   // ancho aprox de cada card en px
const SPEED   = 55    // px por segundo — velocidad constante en cualquier pantalla

function ClientsSection({ setPage }) {
  const third = Math.ceil(CLIENT_GRID.length / 3)
  const row1 = CLIENT_GRID.slice(0, third)
  const row2 = CLIENT_GRID.slice(third, third * 2)
  const row3 = CLIENT_GRID.slice(third * 2)
  const dur1 = Math.round(row1.length * CARD_PX / SPEED)
  const dur2 = Math.round(row2.length * CARD_PX / SPEED)
  const dur3 = Math.round(row3.length * CARD_PX / SPEED)

  return (
    <section className="bg-dark overflow-hidden" style={{ minHeight: 'min(100dvh,auto)' }} data-clients>
      <div className="flex flex-col">

        {/* TOP — header + marquee rows */}
        <div className="flex flex-col justify-center px-6 md:px-14 lg:px-20 py-12">

          {/* Header — split left/right */}
          <div className="scroll-reveal flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="h-[3px] w-10 bg-samred" />
                <span className="font-sub font-semibold text-[0.82rem] uppercase tracking-widest text-samred">Confían en nosotros</span>
              </div>
              <h2 className="font-display text-[2.25rem] md:text-[3rem] text-white leading-none">NUESTROS<br />CLIENTES</h2>
            </div>
            <p className="text-white/40 text-base max-w-xs leading-relaxed md:text-right">
              Más de 50 empresas e instituciones del sector público, privado e internacional han confiado en SAMFOR a lo largo de sus 60 años.
            </p>
          </div>

          {/* Marquee row 1 — left to right */}
          <div className="relative mb-4 overflow-hidden">
            <div className="marquee-auto flex gap-4" style={{ width: 'max-content', willChange: 'transform', backfaceVisibility: 'hidden', animation: `marquee ${dur1}s linear infinite` }}>
              {[...row1, ...row1].map((c, i) => <ClientCard key={i} c={c} />)}
            </div>
          </div>

          {/* Marquee row 2 — right to left */}
          <div className="relative mb-4 overflow-hidden">
            <div className="marquee-auto flex gap-4" style={{ width: 'max-content', willChange: 'transform', backfaceVisibility: 'hidden', animation: `marquee-reverse ${dur2}s linear infinite` }}>
              {[...row2, ...row2].map((c, i) => <ClientCard key={i} c={c} />)}
            </div>
          </div>

          {/* Marquee row 3 — left to right */}
          <div className="relative overflow-hidden">
            <div className="marquee-auto flex gap-4" style={{ width: 'max-content', willChange: 'transform', backfaceVisibility: 'hidden', animation: `marquee ${dur3}s linear infinite` }}>
              {[...row3, ...row3].map((c, i) => <ClientCard key={i} c={c} />)}
            </div>
          </div>
        </div>

        {/* BOTTOM — stat bar */}
        <div className="border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 px-6 md:px-14 lg:px-20 py-5">
          <div className="flex items-center gap-4 md:gap-8">
            {[['50+', 'Clientes históricos'], ['60', 'Años de confianza'], ['9', 'Sectores atendidos']].map(([val, lbl]) => (
              <div key={lbl} className="flex items-baseline gap-1.5">
                <span className="font-display text-xl md:text-3xl text-samred">{val}</span>
                <span className="font-sub text-[0.8rem] md:text-sm uppercase tracking-widest text-white/40 leading-tight max-w-[4rem] md:max-w-none">{lbl}</span>
              </div>
            ))}
          </div>
          <button onClick={() => setPage('contacto')} className="flex-shrink-0 btn-primary whitespace-nowrap">Ser parte de nuestros clientes</button>
        </div>

      </div>
    </section>
  )
}

// ─── PAGE: SERVICIOS ──────────────────────────────────────────────────────────
// Card photo for lobby (different from hero detail photo)
const SV_CARD_PHOTOS = {
  'Obras Eléctricas':          '/sv-electrica.webp',
  'Obras Civiles':             '/sv-civil.webp',
  'Obras Mecánicas':           '/sv-mecanica.webp',
  'Transporte':                '/sv-transporte.webp',
  'Servicios Ambientales':     '/qs-hero.webp',
  'Servicios Marítimos/Lacustres': '/projects/img-005.jpg',
  'Automatización y Control':  '/sv-photo3.webp',
}

function ServicioDetalle({ title, onBack }) {
  useScrollReveal()
  const detail = SERVICES_DETAIL[title]
  const activeIdx = SERVICES.findIndex(s => s.title === title)
  const relatedProjects = ALL_PROJECTS.filter(p => p.division === detail.division).slice(0, 8)

  return (
    <div>
      {/* ── HERO individual servicio ── */}
      <section className="relative overflow-hidden" style={{ height: '100dvh' }}>
        <img src={SV_CARD_PHOTOS[title]} alt={title}
          className="absolute inset-0 w-full h-full object-cover object-center" loading="eager" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark/90 via-dark/60 to-dark/15" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/70 via-transparent to-transparent" />
        <div className="relative h-full flex flex-col justify-end px-5 md:px-16 lg:px-24 pb-14 md:pb-20">
          <div className="max-w-3xl">
            <button onClick={onBack} className="flex items-center gap-2 text-white/50 hover:text-white text-xs font-sub font-bold uppercase tracking-widest mb-8 transition-colors group">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform group-hover:-translate-x-1"><path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              Todos los servicios
            </button>
            <div className="flex items-center gap-3 mb-4">
              <span className="h-[3px] w-10 bg-samred" />
              <span className="font-sub font-semibold text-[0.85rem] uppercase tracking-[0.25em] text-white/55">
                {String(activeIdx + 1).padStart(2,'0')} de {String(SERVICES.length).padStart(2,'0')} — Nuestros servicios
              </span>
            </div>
            <h1 className="font-display text-[clamp(2.5rem,6vw,5rem)] text-white leading-none tracking-wide mb-4">{title.toUpperCase()}</h1>
            <p className="text-samred font-sub font-semibold text-sm uppercase tracking-widest">{detail.tagline}</p>
          </div>
        </div>
        <div className="absolute bottom-7 right-10 flex flex-col items-center gap-1.5 opacity-40">
          <div className="w-[1px] h-10 bg-white animate-pulse" />
          <span className="font-mono text-[0.72rem] uppercase tracking-widest text-white rotate-90 translate-x-3">scroll</span>
        </div>
      </section>

      {/* ── DESCRIPCIÓN — split texto / foto ── */}
      <section className="grid grid-cols-1 lg:grid-cols-2 lg:min-h-[80vh]">
        <div className="bg-white flex items-center px-5 md:px-16 py-14 md:py-20">
          <div className="max-w-lg">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-[3px] w-10 bg-samred" />
              <span className="font-sub font-semibold text-[0.85rem] uppercase tracking-[0.2em] text-samred">Descripción del servicio</span>
            </div>
            <div className="flex items-center gap-4 mb-6">
              <span className="text-samred">{SERVICES[activeIdx]?.icon}</span>
              <h2 className="font-display text-[clamp(1.75rem,3.5vw,3rem)] text-dark leading-none">{title.toUpperCase()}</h2>
            </div>
            <p className="text-secondary text-base leading-relaxed mb-10">{detail.longDesc}</p>
            <div className="flex items-center gap-3">
              {activeIdx > 0 && (
                <button onClick={() => onBack('prev', activeIdx - 1)}
                  className="flex items-center gap-2 text-xs font-sub font-bold uppercase tracking-widest text-secondary border border-border px-4 py-2 rounded hover:border-dark hover:text-dark transition-all">
                  ← Anterior
                </button>
              )}
              {activeIdx < SERVICES.length - 1 && (
                <button onClick={() => onBack('next', activeIdx + 1)}
                  className="flex items-center gap-2 text-xs font-sub font-bold uppercase tracking-widest text-white bg-samred border border-samred px-4 py-2 rounded hover:bg-red-700 transition-all ml-auto">
                  Siguiente →
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="relative overflow-hidden" style={{ minHeight: '400px' }}>
          <img src={detail.descImg || detail.heroImg} alt={title} className="absolute inset-0 w-full h-full object-cover object-center" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-dark/10" />
          <div className="absolute bottom-0 left-0 right-0 h-[4px] bg-samred" />
        </div>
      </section>

      {/* ── CAPACIDADES — split lista + foto vertical ── */}
      <section className="bg-dark grid grid-cols-1 lg:grid-cols-[1fr_420px] xl:grid-cols-[1fr_500px] min-h-[80vh]">
        <div className="px-5 md:px-16 lg:px-20 py-14 md:py-24 flex flex-col justify-center">
          <div className="scroll-reveal flex items-center gap-3 mb-4">
            <span className="h-[3px] w-10 bg-samred" />
            <span className="font-sub font-semibold text-[0.85rem] uppercase tracking-[0.2em] text-samred">Capacidades técnicas</span>
          </div>
          <h3 className="scroll-reveal font-display text-[clamp(2rem,3.5vw,3rem)] text-white leading-none mb-12">{title.toUpperCase()}</h3>
          <div className="divide-y divide-white/8">
            {detail.capabilities.map((cap, i) => (
              <div key={i} className="scroll-reveal flex items-start gap-6 py-5 group" style={{ transitionDelay: `${i * 50}ms` }}>
                <span className="font-mono text-[0.75rem] text-samred/50 tracking-widest flex-shrink-0 mt-1 w-6">{String(i + 1).padStart(2,'0')}</span>
                <div className="flex-shrink-0 w-[2px] self-stretch bg-white/8 group-hover:bg-samred transition-colors duration-300" />
                <p className="text-white/65 text-[0.9375rem] leading-relaxed group-hover:text-white/90 transition-colors duration-300">{cap}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="relative hidden lg:block overflow-hidden">
          <img src="/sv-photo3.webp" alt="Ingeniería SAMFOR" className="absolute inset-0 w-full h-full object-cover object-center" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-[4px] bg-samred" />
          <div className="absolute bottom-8 right-8 text-right">
            <span className="font-mono text-[0.72rem] uppercase tracking-widest text-white/40">Ingeniería de precisión</span>
          </div>
        </div>
      </section>

      {/* ── PROYECTOS RELACIONADOS ── */}
      {relatedProjects.length > 0 && (
        <section className="bg-dark py-14 md:py-20 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-5 md:px-16 lg:px-24 mb-10">
            <div className="scroll-reveal flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="h-[3px] w-10 bg-samred" />
                  <span className="font-sub font-semibold text-[0.85rem] uppercase tracking-[0.2em] text-samred">Portafolio</span>
                </div>
                <h3 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] text-white leading-none">PROYECTOS RELACIONADOS</h3>
              </div>
              <span className="font-mono text-xs text-white/25 hidden md:block">{relatedProjects.length} proyectos</span>
            </div>
          </div>
          <div className="overflow-hidden">
            <div className="flex gap-5 px-5 md:px-16 lg:px-24"
              style={{ width:'max-content', animation: relatedProjects.length > 3 ? `marquee ${Math.round(relatedProjects.length*300/SPEED)}s linear infinite` : 'none', willChange:'transform' }}>
              {(relatedProjects.length > 3 ? [...relatedProjects,...relatedProjects] : relatedProjects).map((p, i) => (
                <div key={`${p.id}-${i}`}
                  className="flex-shrink-0 group rounded overflow-hidden bg-white/5 border border-white/10 hover:border-white/30 transition-all duration-300"
                  style={{ width:'280px' }}>
                  <div className="relative overflow-hidden" style={{ height:'180px' }}>
                    <img src={p.img} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06]" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark/85 to-transparent" />
                    <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: DIVISION_META[p.division]?.dot||'#C8102E' }} />
                    {p.status==='active' && (
                      <div className="absolute top-3 right-3 flex items-center gap-1 bg-dark/70 backdrop-blur-sm px-2 py-0.5 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 dot-pulse" />
                        <span className="text-green-400 text-[0.72rem] font-mono uppercase tracking-widest">Activo</span>
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <div className="mb-2"><DivisionBadge division={p.division} size="xs" /></div>
                    <h4 className="font-sub font-bold text-[0.875rem] uppercase tracking-wide text-white/85 leading-snug mb-1 line-clamp-2">{p.title}</h4>
                    <p className="text-white/35 text-[0.85rem]">{p.client}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

function PageServicios({ initialService }) {
  useScrollReveal()
  const [selected, setSelected] = useState(initialService || null)

  const handleSelect = (title) => {
    setSelected(title)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }
  const handleBack = (dir, idx) => {
    if (dir === 'prev' || dir === 'next') { setSelected(SERVICES[idx].title); window.scrollTo({ top: 0, behavior: 'instant' }) }
    else { setSelected(null); window.scrollTo({ top: 0, behavior: 'instant' }) }
  }

  if (selected) return <div className="pt-24"><ServicioDetalle title={selected} onBack={handleBack} /></div>

  // ── LOBBY ──
  const active = null
  const detail = null
  const activeIdx = -1
  const relatedProjects = []

  return (
    <div className="pt-24">

      {/* ── HERO — full-bleed foto atardecer ── */}
      <section className="relative overflow-hidden" style={{ height: '100dvh' }}>
        <img src="/sv-photo4.webp" alt="SAMFOR Servicios" className="absolute inset-0 w-full h-full object-cover object-center" loading="eager" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark/90 via-dark/60 to-dark/15" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/70 via-transparent to-transparent" />
        <div className="relative h-full flex flex-col justify-end px-5 md:px-16 lg:px-24 pb-14 md:pb-20">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-5">
              <span className="h-[3px] w-10 bg-samred" />
              <span className="font-sub font-semibold text-[0.85rem] uppercase tracking-[0.25em] text-white/55">Lo que hacemos · {SERVICES.length} líneas de servicio</span>
            </div>
            <h1 className="font-display text-[clamp(3rem,7vw,6rem)] text-white leading-none tracking-wide mb-6">
              INGENIERÍA.<br />
              <span className="text-samred">EXPERIENCIA.</span><br />
              RESULTADOS.
            </h1>
            <p className="text-white/65 text-lg max-w-xl leading-relaxed mb-10">
              Más de 60 años ejecutando obras y servicios de alta complejidad para la industria petrolera, petroquímica y civil en Venezuela.
            </p>
            <div className="flex flex-wrap gap-8">
              {[['60', 'Años de trayectoria'], ['+100', 'Proyectos ejecutados'], [String(SERVICES.length), 'Divisiones activas']].map(([n, l]) => (
                <div key={l}>
                  <div className="font-display text-[2rem] text-samred leading-none">{n}</div>
                  <div className="font-sub text-[0.88rem] uppercase tracking-widest text-white/45 mt-1 max-w-[8rem] leading-snug">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="absolute bottom-7 right-10 flex flex-col items-center gap-1.5 opacity-40">
          <div className="w-[1px] h-10 bg-white animate-pulse" />
          <span className="font-mono text-[0.72rem] uppercase tracking-widest text-white rotate-90 translate-x-3">scroll</span>
        </div>
      </section>

      {/* ── LOBBY — cards fotográficas ── */}
      <section className="bg-dark py-14 md:py-20 px-5 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="scroll-reveal flex items-center justify-between mb-12">
            <div className="flex items-center gap-3">
              <span className="h-[3px] w-10 bg-samred" />
              <span className="font-sub font-semibold text-[0.85rem] uppercase tracking-[0.2em] text-samred">Selecciona un servicio</span>
            </div>
            <span className="font-mono text-xs text-white/25 hidden md:block">{SERVICES.length} divisiones</span>
          </div>
          {/* Fila 1 — 3 cards grandes */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            {SERVICES.slice(0,3).map((s,i) => (
              <button key={s.title} onClick={() => handleSelect(s.title)}
                className="scroll-reveal group relative overflow-hidden rounded cursor-pointer text-left"
                style={{ height:'clamp(240px,26vw,380px)', transitionDelay:`${i*60}ms` }}>
                <img src={SV_CARD_PHOTOS[s.title]} alt={s.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06]" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-dark/5" />
                <div className="absolute inset-0 bg-samred/0 group-hover:bg-samred/12 transition-all duration-500" />
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-samred scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left" />
                <div className="absolute inset-0 p-7 flex flex-col justify-end">
                  <span className="font-mono text-[0.72rem] text-white/30 tracking-widest mb-3">{String(i+1).padStart(2,'0')}</span>
                  <div className="text-white/50 group-hover:text-samred mb-3 transition-colors duration-300">{s.icon}</div>
                  <h3 className="font-display text-[1.25rem] text-white leading-tight mb-2">{s.title.toUpperCase()}</h3>
                  <p className="text-white/45 text-[0.85rem] leading-relaxed line-clamp-2 group-hover:text-white/65 transition-colors duration-300">{s.desc}</p>
                  <div className="flex items-center gap-2 mt-5 text-samred text-[0.8rem] font-sub font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 -translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                    Ver servicio <ArrowRight size={11} />
                  </div>
                </div>
              </button>
            ))}
          </div>
          {/* Fila 2 — 4 cards más compactas */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {SERVICES.slice(3).map((s,i) => (
              <button key={s.title} onClick={() => handleSelect(s.title)}
                className="scroll-reveal group relative overflow-hidden rounded cursor-pointer text-left"
                style={{ height:'clamp(170px,18vw,260px)', transitionDelay:`${(i+3)*60}ms` }}>
                <img src={SV_CARD_PHOTOS[s.title]} alt={s.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06]" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/55 to-dark/10" />
                <div className="absolute inset-0 bg-samred/0 group-hover:bg-samred/12 transition-all duration-500" />
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-samred scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left" />
                <div className="absolute inset-0 p-5 flex flex-col justify-end">
                  <span className="font-mono text-[0.72rem] text-white/30 tracking-widest mb-2">{String(i+4).padStart(2,'0')}</span>
                  <div className="text-white/50 group-hover:text-samred mb-2 transition-colors duration-300">{s.icon}</div>
                  <h3 className="font-display text-[1rem] text-white leading-tight">{s.title.toUpperCase()}</h3>
                  <div className="flex items-center gap-1.5 mt-3 text-samred text-[0.75rem] font-sub font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 -translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                    Ver servicio <ArrowRight size={10} />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}


// ─── PAGE: INICIO ─────────────────────────────────────────────────────────────
function PageInicio({ setPage, navigateToServicios }) {
  useScrollReveal()
  const featured = [
    ALL_PROJECTS.find(p => p.id === 1),   // Termoeléctrica Bajo Grande (active)
    ALL_PROJECTS.find(p => p.id === 101), // Subestación 155KV
    ALL_PROJECTS.find(p => p.id === 104), // Metro Maracaibo
  ]

  const heroDesktop = ['/hero.webp', '/hero2.webp', '/hero3-v3.webp']
  const heroMobile  = ['/hero-mobile1-v2.webp', '/hero-mobile2.webp', '/hero-mobile3.webp']
  const [heroIdx, setHeroIdx] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setHeroIdx(i => (i + 1) % 3), 5000)
    return () => clearInterval(t)
  }, [])

  return (
    <div>
      {/* HERO */}
      <section className="relative flex flex-col items-start justify-end px-6 md:px-14 lg:px-20 pb-24 overflow-hidden"
        style={{ minHeight: '100dvh' }}
      >
        {/* Desktop slides */}
        {heroDesktop.map((src, i) => (
          <div key={`d-${src}`} className="hidden lg:block absolute inset-0 bg-center bg-cover"
            style={{ backgroundImage: `url("${src}")`, opacity: i === heroIdx ? 1 : 0, transition: 'opacity 1.2s ease-in-out', zIndex: i === heroIdx ? 1 : 0 }}
          />
        ))}
        {/* Mobile slides */}
        {heroMobile.map((src, i) => (
          <div key={`m-${src}`} className="lg:hidden absolute inset-0 bg-center bg-cover"
            style={{ backgroundImage: `url("${src}")`, opacity: i === heroIdx ? 1 : 0, transition: 'opacity 1.2s ease-in-out', zIndex: i === heroIdx ? 1 : 0 }}
          />
        ))}
        {/* Overlay */}
        <div className="absolute inset-0 bg-dark/60" style={{ zIndex: 2 }} />

        {/* Dots */}
        <div className="absolute bottom-8 right-8 flex gap-2" style={{ zIndex: 3 }}>
          {[0,1,2].map(i => (
            <button key={i} onClick={() => setHeroIdx(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${i === heroIdx ? 'bg-samred scale-125' : 'bg-white/40 hover:bg-white/70'}`}
            />
          ))}
        </div>

        <div className="relative text-left" style={{ zIndex: 3 }}>
          <div className="badge-since inline-flex items-center gap-2 bg-samred text-white text-[0.5625rem] font-mono font-semibold uppercase tracking-[0.15em] px-2 py-1 rounded mb-4">
            <span className="w-1 h-1 rounded-full bg-white" />Desde 1966
          </div>
          <h1 className="font-display text-[clamp(1.25rem,4vw,3.25rem)] text-white leading-[0.95] tracking-wide mb-5">
            CONSTRUIMOS<br />EL FUTURO DE<br />LA ENERGÍA
          </h1>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => setPage('proyectos')} className="btn-primary">Ver Proyectos</button>
            <button onClick={() => setPage('quienes-somos')} className="btn-outline-white">Conócenos</button>
          </div>
        </div>
        <div className="scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 select-none" style={{ zIndex: 3 }}>
          <span className="text-white/40 text-[0.78rem] font-mono uppercase tracking-widest">Scroll</span>
          <ChevronDown size={14} className="text-white/40" />
        </div>
      </section>

      {/* METRICS */}
      <section className="border-y-[3px] border-samred bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex justify-around divide-x divide-border">
            {METRICS.map(m => <CounterItem key={m.label} {...m} />)}
          </div>
        </div>
      </section>

      {/* QUIÉNES SOMOS — home snippet */}
      <section className="bg-white overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[560px] lg:min-h-[640px]">

          {/* LEFT — photo */}
          <div className="relative h-72 sm:h-96 lg:h-auto order-1 lg:order-none">
            <img
              src="/intro-bg.webp"
              alt="SAMFOR en campo"
              className="absolute inset-0 w-full h-full object-cover object-center"
              loading="lazy"
            />
            {/* subtle red bottom accent */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-samred lg:hidden" />
            {/* right fade on desktop */}
            <div className="hidden lg:block absolute inset-y-0 right-0 w-24 bg-gradient-to-r from-transparent to-white" />
            {/* floating year badge */}
            <div className="absolute bottom-6 left-6 bg-dark/80 backdrop-blur-sm border border-white/10 rounded px-4 py-3">
              <span className="font-display text-[2rem] text-white leading-none">60</span>
              <span className="block font-sub text-[0.75rem] tracking-[0.2em] uppercase text-white/55 mt-0.5">Años de trayectoria</span>
            </div>
          </div>

          {/* RIGHT — content */}
          <div className="flex flex-col justify-center px-8 md:px-14 lg:px-16 py-14 lg:py-20">

            {/* eyebrow */}
            <div className="scroll-reveal flex items-center gap-3 mb-5">
              <span className="h-[2px] w-8 bg-samred flex-shrink-0" />
              <span className="font-sub font-semibold text-[0.8rem] tracking-[0.28em] uppercase text-samred">Quiénes somos</span>
            </div>

            <h2 className="scroll-reveal font-display text-[2.4rem] md:text-[3rem] lg:text-[3.4rem] text-dark leading-none mb-6 tracking-wide">
              INGENIERÍA<br />
              <span className="text-samred">SIN LÍMITES.</span>
            </h2>

            <p className="scroll-reveal text-dark/65 text-base md:text-[1.0625rem] leading-relaxed mb-5 max-w-lg">
              SAMFOR es una empresa venezolana de contratación industrial con 60 años de trayectoria continua. Ejecutamos proyectos de alta complejidad para la industria petrolera, petroquímica, civil, ambiental y de servicios públicos en todo el territorio nacional.
            </p>

            <p className="scroll-reveal text-dark/50 text-sm md:text-base leading-relaxed mb-10 max-w-lg">
              Fundada en 1966, contamos con equipos multidisciplinarios, maquinaria pesada propia y más de 50 clientes institucionales entre empresas públicas y privadas nacionales e internacionales — incluyendo Chevron, PDVSA, Repsol y agencias de Naciones Unidas.
            </p>

            {/* pillars */}
            <div className="scroll-reveal grid grid-cols-3 gap-4 mb-10">
              {[
                { n: '+100', l: 'Proyectos\nejecutados' },
                { n: '7',    l: 'Divisiones\nespecializadas' },
                { n: '50+',  l: 'Clientes\nhistóricos' },
              ].map(({ n, l }) => (
                <div key={n} className="border-l-2 border-samred pl-3">
                  <span className="font-display text-[1.75rem] text-dark leading-none">{n}</span>
                  <span className="block font-sub text-[0.82rem] tracking-widest uppercase text-dark/45 mt-1 whitespace-pre-line">{l}</span>
                </div>
              ))}
            </div>

            <div className="scroll-reveal">
              <button
                onClick={() => setPage('quienes-somos')}
                className="group inline-flex items-center gap-2 font-sub font-bold text-[0.75rem] tracking-[0.18em] uppercase text-samred border border-samred px-7 py-3.5 rounded transition-all hover:bg-samred hover:text-white"
              >
                Conocer nuestra historia
                <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* SERVICES */}
      <section className="bg-dark overflow-hidden relative" style={{ height: 'auto', minHeight: 0 }} data-lg-height="100dvh">
        <style>{`@media(min-width:1024px){section[data-lg-height]{height:100dvh!important}}`}</style>

        {/* MÓVIL — foto fondo de toda la sección */}
        <img src="/services-photo.webp" alt="" className="lg:hidden absolute inset-0 w-full h-full object-cover object-right" loading="lazy" aria-hidden="true" />
        <div className="lg:hidden absolute inset-0" style={{ background: 'linear-gradient(to right, #0D1117 0%, rgba(13,17,23,0.88) 30%, rgba(13,17,23,0.6) 55%, rgba(13,17,23,0.2) 80%, transparent 100%)' }} />

        <div className="relative grid grid-cols-1 lg:grid-cols-2 lg:h-full">

          {/* LEFT — list */}
          <div className="px-6 md:px-14 lg:px-16 flex flex-col justify-center py-10">

            {/* Header */}
            <div className="scroll-reveal mb-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="h-[3px] w-10 bg-samred" />
                <span className="font-sub font-semibold text-[0.82rem] uppercase tracking-widest text-samred">Lo que hacemos</span>
              </div>
              <h2 className="font-display text-[2.25rem] md:text-[2.75rem] text-white leading-none">NUESTROS<br />SERVICIOS</h2>
            </div>
            <div className="stagger divide-y divide-white/10 pb-2 lg:pb-0">
              {SERVICES.map((s, i) => (
                <div key={s.title} className="group flex items-start gap-5 py-3 cursor-pointer transition-all duration-300" onClick={() => navigateToServicios(s.title)}>
                  <span className="font-mono text-[0.78rem] text-white/25 group-hover:text-samred pt-1 transition-colors duration-300 flex-shrink-0 w-5">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="text-white/30 group-hover:text-samred transition-colors duration-300 flex-shrink-0 mt-0.5">
                    {s.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-sub font-bold text-[0.9375rem] uppercase tracking-wider text-white/80 group-hover:text-white transition-colors duration-300 mb-0.5">{s.title}</h3>
                    <p className="text-white/40 text-[0.9rem] leading-relaxed group-hover:text-white/55 transition-colors duration-300">{s.desc}</p>
                  </div>
                  <div className="flex-shrink-0 mt-1 opacity-0 group-hover:opacity-100 translate-x-[-4px] group-hover:translate-x-0 transition-all duration-300">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 7h12M8 3l5 4-5 4" stroke="#C8102E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — photo, fills full column height */}
          <div className="relative hidden lg:block">
            <img
              src="/services-photo.webp"
              alt="Equipo SAMFOR en obra"
              className="absolute inset-0 w-full h-full object-cover object-center"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/20 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-dark/70 via-transparent to-transparent" />
            <div className="absolute bottom-10 right-10 text-right">
              <p className="font-display text-xl text-white leading-tight mb-1">PROFESIONALES<br />EN CADA OBRA</p>
              <p className="text-white/40 text-[0.88rem] font-sub uppercase tracking-widest">Campo Boscán — Venezuela</p>
            </div>
            <div className="absolute top-0 right-0 w-[3px] h-full bg-samred" />
          </div>

        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section className="bg-white px-6 md:px-14 lg:px-20 flex flex-col justify-center" style={{ minHeight: 'auto' }} data-lg-min="100dvh">
        <style>{`
          @media(min-width:1024px){section[data-lg-min]{min-height:100dvh!important}}
          @media(max-width:1023px){.featured-card{height:56vw!important;min-height:180px!important;max-height:260px!important;flex:none!important}}
        `}</style>
        <div className="max-w-7xl mx-auto w-full py-16">

          {/* Header */}
          <div className="scroll-reveal flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="h-[3px] w-10 bg-samred" />
                <span className="font-sub font-semibold text-[0.82rem] uppercase tracking-widest text-samred">Portafolio</span>
              </div>
              <h2 className="font-display text-[2.5rem] md:text-[3rem] text-dark leading-none">PROYECTOS DESTACADOS</h2>
            </div>
            <button onClick={() => setPage('proyectos')} className="flex-shrink-0 btn-secondary self-start md:self-auto">
              Ver todos los proyectos
            </button>
          </div>

          {/* 3 equal cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 stagger">
            {featured.filter(Boolean).map((p) => (
              <div
                key={p.id}
                className="featured-card group relative rounded overflow-hidden cursor-pointer"
                style={{ minHeight: 'clamp(180px,30vw,228px)', height: 'clamp(180px,30vw,228px)' }}
                onClick={() => setPage('proyectos')}
                role="button" tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && setPage('proyectos')}
              >
                <img
                  src={p.img}
                  alt={p.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/30 to-transparent" />
                <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: DIVISION_META[p.division]?.dot || '#C8102E' }} />
                <div className="absolute inset-0 p-5 flex flex-col justify-end">
                  <div className="mb-2"><DivisionBadge division={p.division} /></div>
                  <h3 className="font-sub font-bold text-[0.9375rem] uppercase tracking-wide text-white leading-snug mb-1">{p.title}</h3>
                  <p className="text-white/40 text-[0.88rem] font-sub uppercase tracking-widest">{p.client}</p>
                </div>
                <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-[2px] bg-samred transition-all duration-500 ease-out" />
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* CLIENTS */}
      <ClientsSection setPage={setPage} />

      {/* CTA */}
      <section className="relative overflow-hidden flex items-center justify-center px-4 md:px-8" style={{ minHeight: '60dvh' }}>
        {/* Photo */}
        <img
          src="/cta-bg.webp"
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-center"
          loading="lazy"
        />
        {/* Gradient: red from left, dark from right, unified overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-samred/95 via-samred/80 to-dark/90" />
        <div className="absolute inset-0 bg-dark/30" />
        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center scroll-reveal">
          <h2 className="font-display text-[2.75rem] md:text-5xl lg:text-6xl text-white mb-4 tracking-wide">¿TIENES UN PROYECTO? HABLEMOS.</h2>
          <p className="text-white/70 text-base md:text-lg mb-8 max-w-lg mx-auto leading-relaxed">Contamos con el equipo, la experiencia y la infraestructura para ejecutar proyectos de cualquier escala.</p>
          <button onClick={() => setPage('contacto')} className="bg-white text-samred font-sub font-bold text-sm uppercase tracking-widest px-8 py-4 rounded transition-all hover:bg-white/90 active:scale-[0.97]">Contáctanos Ahora</button>
        </div>
      </section>
    </div>
  )
}

// ─── PAGE: PROYECTOS ──────────────────────────────────────────────────────────
function PageProyectos({ onProjectOpen, initialDivision }) {
  useScrollReveal()
  const [activeDivision, setActiveDivision] = useState(initialDivision || 'Todos')
  const [statusFilter, setStatusFilter] = useState('Todos')
  const [selectedProject, setSelectedProject] = useState(null)
  const [listView, setListView] = useState(false)

  // When a related project is clicked inside the detail page, open that one
  const openProject = (p) => {
    setSelectedProject(p)
    onProjectOpen?.(true)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  const closeProject = (next) => {
    if (next && next.id) {
      openProject(next)
    } else {
      setSelectedProject(null)
      onProjectOpen?.(false)
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
  }

  if (selectedProject) {
    return <ProjectDetailPage project={selectedProject} onClose={closeProject} />
  }

  // Division tabs definition — matching the reference image order
  const divisionTabs = [
    { id: 'Todos', label: 'Todos', icon: <LayoutGrid size={15}/> },
    { id: 'Civiles',     ...DIVISION_META['Civiles'],     icon: DIVISION_META['Civiles'].icon },
    { id: 'Mecánicos',   ...DIVISION_META['Mecánicos'],   icon: DIVISION_META['Mecánicos'].icon },
    { id: 'Eléctricos',  ...DIVISION_META['Eléctricos'],  icon: DIVISION_META['Eléctricos'].icon },
    { id: 'Transporte',  ...DIVISION_META['Transporte'],  icon: DIVISION_META['Transporte'].icon },
    { id: 'Ambientales', ...DIVISION_META['Ambientales'], icon: DIVISION_META['Ambientales'].icon },
    { id: 'Otras',       ...DIVISION_META['Otras'],       icon: DIVISION_META['Otras'].icon },
  ]

  const filtered = ALL_PROJECTS.filter(p => {
    const matchDiv = activeDivision === 'Todos' || p.division === activeDivision
    const matchStatus = statusFilter === 'Todos' || p.status === statusFilter
    return matchDiv && matchStatus
  })

  // Count per division
  const counts = {}
  ALL_PROJECTS.forEach(p => { counts[p.division] = (counts[p.division] || 0) + 1 })

  return (
    <div className="pt-24">

      {/* ── HERO ── */}
      <div className="relative overflow-hidden" style={{ height: 'calc(100dvh - 4rem)' }}>
        <img src="/proyectos-hero.webp" alt="SAMFOR Proyectos" className="absolute inset-0 w-full h-full object-cover object-[30%_center] lg:object-center" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark/95 via-dark/70 to-dark/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent" />
        <div className="absolute top-0 right-0 w-[3px] h-full bg-samred" />

        <div className="relative z-10 h-full flex flex-col justify-between px-6 md:px-14 lg:px-20 py-10">
          {/* Top label */}
          <div className="flex items-center gap-3">
            <span className="h-[3px] w-10 bg-samred" />
            <span className="font-sub font-semibold text-[0.82rem] uppercase tracking-widest text-samred">Portafolio</span>
          </div>

          {/* Center title */}
          <div>
            <h1 className="font-display text-[clamp(3rem,10vw,9rem)] text-white leading-none mb-6 w-full">NUESTROS<br />PROYECTOS</h1>
            {/* Division chips row */}
            <div className="flex flex-wrap gap-2">
              {Object.entries(DIVISION_META).map(([key, m]) => (
                <button key={key}
                  onClick={() => { setActiveDivision(key); document.getElementById('proyectos-lista')?.scrollIntoView({ behavior: 'smooth' }) }}
                  className="group flex items-center gap-2 bg-white/8 border border-white/15 hover:border-samred/60 hover:bg-white/12 transition-all duration-200 px-3 py-1.5 rounded"
                >
                  <span className="text-white/50 group-hover:text-samred transition-colors">{m.icon}</span>
                  <span className="font-sub font-semibold text-xs uppercase tracking-wide text-white/70 group-hover:text-white transition-colors">{m.label}</span>
                  <span className="font-mono text-[0.75rem] text-white/30 ml-0.5">{counts[key]||0}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Bottom stats */}
          <div className="flex gap-5 md:gap-10 border-t border-white/10 pt-5">
            {[['100+','Proyectos'], ['6','Divisiones'], ['60','Años']].map(([v,l]) => (
              <div key={l}>
                <p className="font-display text-xl md:text-3xl text-samred leading-none">{v}</p>
                <p className="font-sub text-[0.82rem] md:text-[0.9rem] uppercase tracking-widest text-white/35 mt-0.5">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CATEGORÍAS FOTO-FILTRO ── */}
      <div id="proyectos-lista" className="bg-dark border-b border-white/10">
        {/* Header */}
        <div className="px-6 md:px-14 lg:px-20 pt-12 pb-6 flex items-end justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="h-[3px] w-8 bg-samred" />
              <span className="font-sub font-semibold text-[0.82rem] uppercase tracking-widest text-samred">Filtrar por categoría</span>
            </div>
            <h2 className="font-display text-[2rem] md:text-[2.5rem] text-white leading-none">DIVISIONES</h2>
          </div>
          <span className="font-mono text-xs text-white/25 hidden md:block">
            {activeDivision === 'Todos' ? `${ALL_PROJECTS.length} proyectos totales` : `${counts[activeDivision]||0} proyectos`}
          </span>
        </div>

        {/* Divisiones — scroll horizontal en mobile, grid en desktop */}
        <div className="hidden lg:grid lg:grid-cols-8 gap-0 border-t border-white/10">

          {/* TODOS */}
          <button
            onClick={() => setActiveDivision('Todos')}
            className={`group relative overflow-hidden transition-all duration-300 ${activeDivision==='Todos' ? 'opacity-100' : 'opacity-60 hover:opacity-90'}`}
            style={{ height: '260px' }}
          >
            <img src={IMG(28)} alt="Todos" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06]" loading="lazy" />
            <div className={`absolute inset-0 transition-all duration-300 ${activeDivision==='Todos' ? 'bg-samred/55' : 'bg-dark/75 group-hover:bg-dark/55'}`} />
            {/* Active indicator */}
            {activeDivision==='Todos' && <div className="absolute top-0 left-0 right-0 h-[3px] bg-samred" />}
            <div className="absolute inset-0 flex flex-col items-start justify-end p-4">
              <div className="text-white/70 mb-2 group-hover:text-white transition-colors"><LayoutGrid size={18}/></div>
              <p className="font-display text-[1.1rem] text-white leading-none mb-1">TODOS</p>
            </div>
            {/* Right border */}
            <div className="absolute top-0 right-0 w-px h-full bg-white/10" />
          </button>

          {/* Cada división */}
          {Object.entries(DIVISION_META).map(([key, m], i) => {
            const sample = ALL_PROJECTS.find(p => p.division === key)
            const isActive = activeDivision === key
            return (
              <button key={key}
                onClick={() => setActiveDivision(key)}
                className={`group relative overflow-hidden transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-55 hover:opacity-90'}`}
                style={{ height: '260px' }}
              >
                {sample && <img src={sample.img} alt={key} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06]" loading="lazy" />}
                <div className={`absolute inset-0 transition-all duration-300 ${isActive ? 'bg-dark/40' : 'bg-dark/75 group-hover:bg-dark/50'}`} />
                {/* Top accent when active */}
                {isActive && <div className="absolute top-0 left-0 right-0 h-[3px] bg-samred" />}
                {/* Bottom content */}
                <div className="absolute inset-0 flex flex-col items-start justify-end p-4">
                  <div className={`mb-2 transition-colors duration-300 ${isActive ? 'text-samred' : 'text-white/50 group-hover:text-white/80'}`}>{m.icon}</div>
                  <p className={`font-display text-[0.95rem] leading-none mb-1 transition-colors duration-300 ${isActive ? 'text-white' : 'text-white/80 group-hover:text-white'}`}>
                    {m.label.replace('Proyectos ', '').replace('División ', '').replace('Servicios ', '').toUpperCase()}
                  </p>
                </div>
                {/* Right border separator */}
                {i < 5 && <div className="absolute top-0 right-0 w-px h-full bg-white/10" />}
              </button>
            )
          })}
        </div>

        {/* Mobile — horizontal photo-card scroll */}
        <div className="lg:hidden border-t border-white/10">
          <div className="flex w-full">
            {/* TODOS */}
            <button
              onClick={() => setActiveDivision('Todos')}
              className={`group relative overflow-hidden transition-all duration-300 ${activeDivision==='Todos' ? 'opacity-100' : 'opacity-55'}`}
              style={{ width: 'calc(100%/8)', minWidth: 0, height: '90px' }}
            >
              <img src={IMG(28)} alt="Todos" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
              <div className={`absolute inset-0 transition-all duration-300 ${activeDivision==='Todos' ? 'bg-samred/55' : 'bg-dark/75'}`} />
              {activeDivision==='Todos' && <div className="absolute top-0 left-0 right-0 h-[3px] bg-samred" />}
              <div className="absolute inset-0 flex flex-col items-start justify-end p-2">
                <div className="text-white/70 mb-0.5"><LayoutGrid size={11}/></div>
                <p className="font-display text-[0.75rem] text-white leading-none mb-0.5">TODOS</p>
              </div>
              <div className="absolute top-0 right-0 w-px h-full bg-white/10" />
            </button>
            {/* Cada división */}
            {Object.entries(DIVISION_META).map(([key, m]) => {
              const sample = ALL_PROJECTS.find(p => p.division === key)
              const isActive = activeDivision === key
              return (
                <button key={key}
                  onClick={() => setActiveDivision(key)}
                  className={`group relative overflow-hidden transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-55'}`}
                  style={{ width: 'calc(100%/8)', minWidth: 0, height: '90px' }}
                >
                  {sample && <img src={sample.img} alt={key} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />}
                  <div className={`absolute inset-0 transition-all duration-300 ${isActive ? 'bg-dark/40' : 'bg-dark/75'}`} />
                  {isActive && <div className="absolute top-0 left-0 right-0 h-[3px] bg-samred" />}
                  <div className="absolute inset-0 flex flex-col items-start justify-end p-2">
                    <div className={`mb-0.5 transition-colors duration-300 ${isActive ? 'text-samred' : 'text-white/50'}`} style={{transform:'scale(0.75)',transformOrigin:'left bottom'}}>{m.icon}</div>
                    <p className={`font-display text-[0.72rem] leading-none mb-0.5 transition-colors duration-300 ${isActive ? 'text-white' : 'text-white/80'}`}>
                      {m.label.replace('Proyectos ','').replace('División ','').replace('Servicios ','').split(' ')[0].toUpperCase()}
                    </p>
                  </div>
                  <div className="absolute top-0 right-0 w-px h-full bg-white/10" />
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* ── PROYECTOS ── */}
      <div className="bg-dark py-12">
        <div className="max-w-7xl mx-auto px-6 md:px-14 lg:px-20">

          {/* Header row */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              {activeDivision !== 'Todos' && <div className="h-6 w-[3px] rounded-full flex-shrink-0" style={{ background: DIVISION_META[activeDivision]?.dot }} />}
              <h3 className="font-display text-[1.5rem] md:text-[1.75rem] text-white leading-none">
                {activeDivision === 'Todos' ? 'TODOS LOS PROYECTOS' : DIVISION_META[activeDivision]?.label?.toUpperCase()}
              </h3>
              <span className="font-mono text-xs text-white/30 ml-1">{filtered.length}</span>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              {/* Status filter */}
              <div className="flex items-center gap-2">
                {[['Todos','Todos'],['active','Activos'],['completed','Culminados']].map(([val,lab]) => (
                  <button key={val} onClick={() => setStatusFilter(val)}
                    className={`text-xs font-mono font-semibold px-3 py-1.5 rounded border transition-all ${statusFilter===val ? 'bg-white text-dark border-white' : 'bg-transparent text-white/40 border-white/15 hover:border-white/40 hover:text-white/70'}`}
                  >
                    {val==='active' && <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block mr-1.5" />}
                    {lab}
                  </button>
                ))}
              </div>
              {/* View toggle */}
              <button
                onClick={() => setListView(v => !v)}
                className="flex items-center gap-2 text-xs font-sub font-bold uppercase tracking-widest px-4 py-1.5 rounded border border-samred text-samred hover:bg-samred hover:text-white transition-all duration-200"
              >
                {listView ? <><LayoutGrid size={13}/> Carrusel</> : <><List size={13}/> Lista completa</>}
              </button>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <LayoutGrid size={28} className="mx-auto mb-3 text-white/20" />
              <p className="font-sub font-semibold text-lg text-white/30">No hay proyectos con estos filtros.</p>
            </div>

          ) : listView ? (
            /* ── LISTA COMPLETA ── */
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered.map(p => (
                <div key={p.id}
                  className="group cursor-pointer rounded overflow-hidden bg-white/5 border border-white/10 hover:border-white/30 transition-all duration-300 flex flex-col"
                  onClick={() => openProject(p)}
                >
                  {/* Image */}
                  <div className="relative overflow-hidden" style={{ height: '220px' }}>
                    <img src={p.img} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark/85 via-dark/10 to-transparent" />
                    <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: DIVISION_META[p.division]?.dot||'#C8102E' }} />
                    {p.status === 'active' && (
                      <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-dark/70 backdrop-blur-sm px-2.5 py-1 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 dot-pulse" />
                        <span className="text-green-400 text-[0.75rem] font-mono uppercase tracking-widest">Activo</span>
                      </div>
                    )}
                  </div>
                  {/* Body */}
                  <div className="p-5 flex flex-col flex-1">
                    <div className="mb-2"><DivisionBadge division={p.division} /></div>
                    <h3 className="font-sub font-bold text-[1rem] uppercase tracking-wide text-white/85 group-hover:text-white transition-colors leading-snug mb-1 flex-1">{p.title}</h3>
                    <p className="text-white/35 text-sm mb-1">{p.client}</p>
                    {p.desc && <p className="text-white/25 text-xs leading-relaxed line-clamp-2 mt-1">{p.desc}</p>}
                    <div className="flex items-center gap-1.5 text-samred text-xs font-sub font-semibold uppercase tracking-widest mt-4 pt-4 border-t border-white/8 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      Ver detalle <ArrowRight size={12} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

          ) : null}
        </div>

        {/* ── CARRUSEL — full width, fuera del contenedor con padding ── */}
        {filtered.length > 0 && !listView && (<>
          {/* MÓVIL — animación automática */}
          <div className="lg:hidden overflow-hidden relative">
            <div className="flex gap-4"
              style={{ width: 'max-content', animation: `marquee ${Math.round(filtered.length * 280 / SPEED)}s linear infinite`, willChange: 'transform', backfaceVisibility: 'hidden' }}
            >
              {[...filtered, ...filtered].map((p, i) => (
                <div key={`m-${p.id}-${i}`}
                  className="group flex-shrink-0 cursor-pointer rounded overflow-hidden bg-white/5 border border-white/10 active:border-white/40 transition-all duration-300 flex flex-col"
                  style={{ width: '72vw', maxWidth: '300px' }}
                  onClick={() => openProject(p)}
                >
                  <div className="relative overflow-hidden" style={{ height: '160px' }}>
                    <img src={p.img} alt={p.title} className="w-full h-full object-cover" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark/85 via-dark/20 to-transparent" />
                    <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: DIVISION_META[p.division]?.dot||'#C8102E' }} />
                    {p.status === 'active' && (
                      <div className="absolute top-2 right-2 flex items-center gap-1 bg-dark/70 px-2 py-0.5 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                        <span className="text-green-400 text-[0.72rem] font-mono uppercase tracking-widest">Activo</span>
                      </div>
                    )}
                  </div>
                  <div className="p-4 flex flex-col flex-1">
                    <div className="mb-1.5"><DivisionBadge division={p.division} size="xs" /></div>
                    <h3 className="font-sub font-bold text-[0.85rem] uppercase tracking-wide text-white/85 leading-snug mb-1 flex-1 line-clamp-2">{p.title}</h3>
                    <p className="text-white/35 text-[0.85rem]">{p.client}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* DESKTOP — animación automática */}
          <div className="hidden lg:block overflow-hidden relative"
            onMouseEnter={e => e.currentTarget.querySelector('.carousel-track').style.animationPlayState='paused'}
            onMouseLeave={e => e.currentTarget.querySelector('.carousel-track').style.animationPlayState='running'}
          >
            <div className="carousel-track flex gap-5"
              style={{ width: 'max-content', animation: `marquee ${Math.round(filtered.length * 340 / SPEED)}s linear infinite`, willChange: 'transform', backfaceVisibility: 'hidden' }}
            >
              {[...filtered, ...filtered].map((p, i) => (
                <div key={`${p.id}-${i}`}
                  className="group flex-shrink-0 cursor-pointer rounded overflow-hidden bg-white/5 border border-white/10 hover:border-white/30 transition-all duration-300 flex flex-col"
                  style={{ width: 'clamp(260px,26vw,420px)' }}
                  onClick={() => openProject(p)}
                >
                  <div className="relative overflow-hidden" style={{ height: 'clamp(180px,16vw,280px)' }}>
                    <img src={p.img} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06]" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark/85 via-dark/20 to-transparent" />
                    <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: DIVISION_META[p.division]?.dot||'#C8102E' }} />
                    {p.status === 'active' && (
                      <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-dark/70 backdrop-blur-sm px-2.5 py-1 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 dot-pulse" />
                        <span className="text-green-400 text-[0.75rem] font-mono uppercase tracking-widest">Activo</span>
                      </div>
                    )}
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <div className="mb-2"><DivisionBadge division={p.division} /></div>
                    <h3 className="font-sub font-bold text-[1rem] uppercase tracking-wide text-white/80 group-hover:text-white transition-colors leading-snug mb-2 line-clamp-2">{p.title}</h3>
                    <p className="text-white/35 text-sm flex-1">{p.client}</p>
                    <div className="flex items-center gap-1.5 text-samred text-xs font-sub font-semibold uppercase tracking-widest mt-4 pt-4 border-t border-white/8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Ver detalle <ArrowRight size={12} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="absolute top-0 left-0 w-16 h-full bg-gradient-to-r from-dark to-transparent pointer-events-none" />
            <div className="absolute top-0 right-0 w-16 h-full bg-gradient-to-l from-dark to-transparent pointer-events-none" />
          </div>
        </>)}
      </div>

    </div>
  )
}

// ─── PAGE: QUIÉNES SOMOS ──────────────────────────────────────────────────────
function PageQuienesSomos({ setPage }) {
  useScrollReveal()

  return (
    <div className="pt-24">

      {/* ── HERO — full-bleed, foto1 principal ── */}
      <section className="relative overflow-hidden" style={{ height: '100dvh' }}>
        <img src="/qs-hero.webp" alt="Equipo SAMFOR" className="absolute inset-0 w-full h-full object-cover object-center" loading="eager" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark/85 via-dark/55 to-dark/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent" />
        {/* Content */}
        <div className="relative h-full flex flex-col justify-end px-5 md:px-16 lg:px-24 pb-14 md:pb-20">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-5">
              <span className="h-[3px] w-10 bg-samred" />
              <span className="font-sub font-semibold text-[0.85rem] uppercase tracking-[0.25em] text-white/55">Nuestra empresa · Desde 1966</span>
            </div>
            <h1 className="font-display text-[clamp(3rem,7vw,6rem)] text-white leading-none tracking-wide mb-6">
              UNA EMPRESA.<br />
              <span className="text-samred">SEIS DÉCADAS.</span><br />
              UN ESTÁNDAR.
            </h1>
            <p className="text-white/65 text-lg max-w-xl leading-relaxed mb-10">
              Construyendo Venezuela con excelencia técnica, responsabilidad ambiental y el más alto compromiso con la seguridad industrial.
            </p>
            {/* Stats row */}
            <div className="flex flex-wrap gap-8">
              {[['60', 'Años de trayectoria'], ['+100', 'Proyectos ejecutados'], ['6', 'Divisiones especializadas'], ['1999', 'Cert. desechos peligrosos']].map(([n, l]) => (
                <div key={l}>
                  <div className="font-display text-[2rem] text-samred leading-none">{n}</div>
                  <div className="font-sub text-[0.88rem] uppercase tracking-widest text-white/45 mt-1 max-w-[8rem] leading-snug">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Scroll indicator */}
        <div className="absolute bottom-7 right-10 flex flex-col items-center gap-1.5 opacity-40">
          <div className="w-[1px] h-10 bg-white animate-pulse" />
          <span className="font-mono text-[0.72rem] uppercase tracking-widest text-white rotate-90 translate-x-3">scroll</span>
        </div>
      </section>

      {/* ── QUIÉNES SOMOS — split: texto izq, foto der ── */}
      <section className="grid grid-cols-1 lg:grid-cols-2 lg:min-h-[80vh]">
        {/* Left — text */}
        <div className="bg-white flex items-center px-5 md:px-16 py-12 md:py-20">
          <div className="max-w-lg">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-[3px] w-10 bg-samred" />
              <span className="font-sub font-semibold text-[0.85rem] uppercase tracking-[0.2em] text-samred">Quiénes Somos</span>
            </div>
            <h2 className="font-display text-[clamp(2.5rem,4vw,3.75rem)] text-dark leading-none mb-8">SAMFOR,<br />S.A.</h2>
            <p className="text-secondary text-base leading-relaxed mb-6">
              Somos una empresa venezolana fundada en 1966 en Maracaibo, dedicada a la prestación de servicios de construcción civil, eléctrica, mecánica, telecomunicaciones, transporte y servicios ambientales para la industria petrolera, petroquímica, carbonífera y civil.
            </p>
            <p className="text-secondary text-base leading-relaxed mb-10">
              Con casi seis décadas de operación continua, contamos con la infraestructura, el capital humano y los estándares certificados para ejecutar proyectos de alta complejidad en cualquier punto del territorio nacional.
            </p>
            {/* Values bullets */}
            <div className="flex flex-col gap-4">
              {[
                { label: 'Lealtad', desc: 'Compromiso con clientes, colaboradores y el país.' },
                { label: 'Responsabilidad', desc: 'Cumplimiento técnico, ambiental y de seguridad.' },
                { label: 'Respeto', desc: 'Cada persona tratada con máxima dignidad.' },
              ].map(v => (
                <div key={v.label} className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-[3px] h-full self-stretch bg-samred rounded" />
                  <div>
                    <span className="font-sub font-bold text-sm uppercase tracking-widest text-dark">{v.label} — </span>
                    <span className="text-secondary text-sm">{v.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Right — welding photo */}
        <div className="relative overflow-hidden" style={{ minHeight: '300px' }}>
          <img src="/qs-welding.webp" alt="Soldadores SAMFOR" className="absolute inset-0 w-full h-full object-cover object-center" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-dark/20" />
          <div className="absolute bottom-0 left-0 right-0 h-[4px] bg-samred" />
        </div>
      </section>

      {/* ── MISIÓN / VISIÓN — dark bg ── */}
      <section className="bg-dark py-14 md:py-24 px-5 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="scroll-reveal flex items-center gap-3 mb-16">
            <span className="h-[3px] w-10 bg-samred" />
            <span className="font-sub font-semibold text-[0.85rem] uppercase tracking-[0.2em] text-samred">Identidad corporativa</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border border-white/10 rounded overflow-hidden">
            {[
              { num: '01', title: 'MISIÓN', body: 'Ejecutar de manera rentable y eficiente, en armonía con el ambiente, obras y servicios de construcción civil, eléctrica, telecomunicación, transporte y servicios ambientales, asegurando la satisfacción del cliente y el desarrollo del talento humano.' },
              { num: '02', title: 'VISIÓN', body: 'Ser una empresa líder en Construcción, Transporte y Servicios Ambientales, reconocida por su excelencia, calidad de servicios, solidez del equipo humano y compromiso con el desarrollo sostenible de Venezuela.' },
              { num: '03', title: 'VALORES', body: 'Lealtad, Responsabilidad y Respeto a la Dignidad Humana son los pilares que guían cada decisión, cada proyecto y cada relación con nuestros clientes, colaboradores y comunidades.' },
            ].map((c, i) => (
              <div key={c.num} className="scroll-reveal p-10 border-b md:border-b-0 md:border-r border-white/10 last:border-0" style={{ transitionDelay: `${i * 100}ms` }}>
                <div className="font-mono text-[0.8rem] text-samred/60 tracking-widest mb-4">{c.num}</div>
                <div className="h-[2px] w-8 bg-samred mb-6" />
                <h3 className="font-display text-3xl text-white mb-5">{c.title}</h3>
                <p className="text-white/50 text-base leading-relaxed">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VENTAJAS — split: foto izq, lista der ── */}
      <section className="grid grid-cols-1 lg:grid-cols-2 lg:min-h-[75vh]">
        {/* Left — electrical photo */}
        <div className="relative overflow-hidden order-2 lg:order-1" style={{ minHeight: '300px' }}>
          <img src="/qs-electrical.webp" alt="Técnicos eléctricos SAMFOR" className="absolute inset-0 w-full h-full object-cover object-center" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-dark/20" />
          <div className="absolute top-0 left-0 bottom-0 w-[4px] bg-samred" />
          {/* Floating label */}
          <div className="absolute bottom-8 left-8 bg-dark/75 backdrop-blur-sm border border-white/10 px-5 py-3 rounded">
            <div className="font-sub font-bold text-xs uppercase tracking-widest text-samred mb-0.5">Certificación</div>
            <div className="text-white text-sm font-medium">Manejadora de Desechos Peligrosos</div>
            <div className="text-white/40 text-xs font-mono mt-0.5">Ministerio del Ecosistema · 1999</div>
          </div>
        </div>
        {/* Right — advantages */}
        <div className="bg-surface flex items-center px-5 md:px-16 py-12 md:py-20 order-1 lg:order-2">
          <div className="w-full max-w-lg">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-[3px] w-10 bg-samred" />
              <span className="font-sub font-semibold text-[0.85rem] uppercase tracking-[0.2em] text-samred">Por qué elegirnos</span>
            </div>
            <h2 className="font-display text-[clamp(2rem,3.5vw,3rem)] text-dark leading-none mb-10">VENTAJAS<br />COMPETITIVAS</h2>
            <div className="flex flex-col gap-0 divide-y divide-border">
              {[
                { icon: <Target size={20}/>, title: 'Capacidad Operativa', desc: 'Flota completa de vehículos, equipos pesados, maquinaria y aeronave para proyectos en todo el territorio.' },
                { icon: <CheckCircle size={20}/>, title: 'Calidad Certificada', desc: 'Procesos IPC bajo estándares internacionales. Certificación como Manejadora de Desechos Peligrosos desde 1999.' },
                { icon: <Users size={20}/>, title: 'Capital Humano', desc: 'Ingenieros y técnicos en eléctrica, civil, mecánica, instrumentación, telecomunicaciones y ambiental.' },
                { icon: <Shield size={20}/>, title: 'HSE / Seguridad', desc: 'Cultura HSE arraigada. Operaciones en entornos de alto riesgo con cumplimiento de normativas COVENIN.' },
              ].map((a, i) => (
                <div key={i} className="scroll-reveal flex gap-5 py-6 group" style={{ transitionDelay: `${i * 80}ms` }}>
                  <div className="flex-shrink-0 w-10 h-10 rounded bg-white border border-border flex items-center justify-center text-samred group-hover:bg-samred group-hover:text-white group-hover:border-samred transition-all duration-300">{a.icon}</div>
                  <div>
                    <h3 className="font-sub font-bold text-base uppercase tracking-wide text-dark mb-1">{a.title}</h3>
                    <p className="text-secondary text-base leading-relaxed">{a.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── HISTORIA — timeline ── */}
      <section className="bg-white py-14 md:py-24 px-5 md:px-16">
        <div className="max-w-5xl mx-auto">
          <div className="scroll-reveal mb-16">
            <div className="flex items-center gap-3 mb-4">
              <span className="h-[3px] w-10 bg-samred" />
              <span className="font-sub font-semibold text-[0.85rem] uppercase tracking-[0.2em] text-samred">Historia</span>
            </div>
            <h2 className="font-display text-[clamp(2.5rem,5vw,4rem)] text-dark leading-none">NUESTRA<br />TRAYECTORIA</h2>
          </div>
          <div className="relative">
            <div className="absolute left-[5.5rem] md:left-[7.5rem] top-2 bottom-2 w-[2px] bg-gradient-to-b from-samred via-samred/40 to-transparent" />
            <div className="flex flex-col gap-10">
              {TIMELINE.map((item, i) => (
                <div key={i} className="scroll-reveal flex gap-6 md:gap-10 items-start" style={{ transitionDelay: `${i * 60}ms` }}>
                  <div className="flex-shrink-0 w-16 md:w-24 text-right pt-0.5">
                    <span className="font-display text-[1.5rem] md:text-[1.75rem] text-samred leading-none">{item.year}</span>
                  </div>
                  <div className="flex-shrink-0 mt-1.5 relative z-10">
                    <div className="w-3 h-3 rounded-full bg-samred ring-[3px] ring-white shadow" />
                  </div>
                  <div className="flex-1 pb-2">
                    <h3 className="font-sub font-bold text-base text-dark mb-1">{item.title}</h3>
                    <p className="text-secondary text-base leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FICHA + CLIENTES ── */}
      <section className="bg-dark py-14 md:py-20 px-5 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="scroll-reveal flex items-center gap-3 mb-12">
            <span className="h-[3px] w-10 bg-samred" />
            <span className="font-sub font-semibold text-[0.85rem] uppercase tracking-[0.2em] text-samred">Datos corporativos</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Corporate data */}
            <div className="border border-white/10 rounded overflow-hidden">
              <div className="bg-white/5 border-b border-white/10 px-7 py-4">
                <span className="font-sub font-bold text-xs uppercase tracking-widest text-white/60">Ficha de Empresa</span>
              </div>
              <div className="divide-y divide-white/8">
                {[
                  ['Razón Social', 'SAMFOR, S.A.'],
                  ['Fundación', '1966 — Maracaibo, Venezuela'],
                  ['Trayectoria', '60 años de operación continua'],
                  ['Sector', 'Petrolero, Petroquímico, Carbonífero, Civil'],
                  ['Servicios', '6 líneas de negocio especializadas'],
                  ['Certificación', 'Manejadora de Desechos Peligrosos (desde 1999)'],
                  ['Cobertura', 'Venezuela y operaciones internacionales'],
                ].map(([k, v]) => (
                  <div key={k} className="flex px-7 py-4 gap-6">
                    <span className="flex-shrink-0 w-28 font-mono text-[0.88rem] uppercase tracking-widest text-white/30">{k}</span>
                    <span className="text-white/80 text-base">{v}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Contact */}
            <div className="border border-white/10 rounded overflow-hidden">
              <div className="bg-white/5 border-b border-white/10 px-7 py-4">
                <span className="font-sub font-bold text-xs uppercase tracking-widest text-white/60">Contacto y Dirección</span>
              </div>
              <div className="p-7 flex flex-col gap-6">
                {[
                  { icon: <MapPin size={15} className="text-samred flex-shrink-0 mt-0.5" />, label: 'Dirección', value: 'Av. 3H entre Calles 68-70 N.69-61, Maracaibo, Venezuela' },
                  { icon: <Mail size={15} className="text-samred flex-shrink-0 mt-0.5" />, label: 'Email', value: 'samfor@samfor.com' },
                  { icon: <Phone size={15} className="text-samred flex-shrink-0 mt-0.5" />, label: 'Teléfonos', value: '+58 261 814 4444 / +58 414-615.8000' },
                  { icon: <Globe size={15} className="text-samred flex-shrink-0 mt-0.5" />, label: 'Web', value: 'www.samfor.com' },
                ].map(item => (
                  <div key={item.label} className="flex items-start gap-4">
                    {item.icon}
                    <div>
                      <div className="font-mono text-[0.82rem] uppercase tracking-widest text-white/30 mb-0.5">{item.label}</div>
                      <div className="text-white/80 text-base">{item.value}</div>
                    </div>
                  </div>
                ))}
                <button onClick={() => setPage('contacto')} className="btn-primary mt-4 self-start">Contáctanos</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CLIENTES — grid estático ── */}
      <section className="bg-dark py-14 md:py-24 px-5 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="scroll-reveal flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="h-[3px] w-10 bg-samred" />
                <span className="font-sub font-semibold text-[0.82rem] uppercase tracking-widest text-samred">Historial de clientes</span>
              </div>
              <h2 className="font-display text-[2.25rem] md:text-[3rem] text-white leading-none">NUESTROS<br />CLIENTES</h2>
            </div>
            <p className="text-white/40 text-base max-w-xs leading-relaxed md:text-right">
              Más de 50 empresas e instituciones del sector público, privado e internacional a lo largo de 60 años.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {CLIENT_GRID.map((c, i) => (
              <div key={i} className="scroll-reveal flex flex-col items-center gap-3 bg-white/5 border border-white/10 rounded-lg px-4 py-5 hover:border-samred/40 hover:bg-white/8 transition-all duration-200" style={{ transitionDelay: `${(i % 12) * 40}ms` }}>
                <div className="w-16 h-16 rounded-md flex items-center justify-center overflow-hidden flex-shrink-0 bg-white p-1.5">
                  {c.img
                    ? <img src={c.img} alt={c.name} className="max-h-full max-w-full object-contain" onError={e => { e.target.style.display='none'; e.target.nextSibling.style.display='flex' }} />
                    : null
                  }
                  <span className={`${c.img ? 'hidden' : 'flex'} w-full h-full items-center justify-center font-display font-bold text-sm rounded`} style={{ background: c.bg || '#1a2233', color: c.accent || '#fff' }}>
                    {c.name.split(/[\s/]+/).slice(0,2).map(w=>w[0]).join('').toUpperCase()}
                  </span>
                </div>
                <div className="text-center">
                  <p className="font-sub font-bold text-[0.88rem] uppercase tracking-wide text-white/75 leading-tight">{c.name}</p>
                  <p className="text-white/30 text-[0.8rem] font-mono uppercase tracking-widest mt-0.5">{c.sector}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}

// ─── PAGE: CONTACTO ────────────────────────────────────────────────────────────
function PageContacto() {
  useScrollReveal()
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', type: '', message: '' })
  const [jobForm, setJobForm] = useState({ name: '', email: '', phone: '', area: '', exp: '', cv: null, letter: '' })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [jobSending, setJobSending] = useState(false)
  const [jobSent, setJobSent] = useState(false)
  const [drag, setDrag] = useState(false)

  const handleSubmit = async e => { e.preventDefault(); setSending(true); await new Promise(r => setTimeout(r, 1500)); setSending(false); setSent(true) }
  const handleJobSubmit = async e => { e.preventDefault(); setJobSending(true); await new Promise(r => setTimeout(r, 1500)); setJobSending(false); setJobSent(true) }

  return (
    <div className="pt-24">

      {/* ── HERO ── */}
      <section className="relative overflow-hidden" style={{ height: '100dvh' }}>
        <img src="/ct-hero.webp" alt="SAMFOR operaciones" className="absolute inset-0 w-full h-full object-cover object-[30%_center] lg:object-center" loading="eager" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark/90 via-dark/60 to-dark/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/50 via-transparent to-transparent" />
        <div className="relative h-full flex flex-col justify-end px-5 md:px-16 lg:px-24 pb-14 md:pb-20">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-5">
              <span className="h-[3px] w-10 bg-samred" />
              <span className="font-sub font-semibold text-[0.85rem] uppercase tracking-[0.25em] text-white/50">Contacto</span>
            </div>
            <h1 className="font-display text-[clamp(3.5rem,8vw,7rem)] text-white leading-none tracking-wide mb-6">
              HABLEMOS<br /><span className="text-samred">.</span>
            </h1>
            <p className="text-white/60 text-lg max-w-md leading-relaxed mb-10">
              Cuéntanos tu proyecto. Un especialista de SAMFOR evaluará tu consulta y te responderá a la brevedad.
            </p>
            <div className="flex flex-wrap gap-6">
              {[
                { icon: <Mail size={14}/>, val: 'samfor@samfor.com' },
                { icon: <Phone size={14}/>, val: '+58 261 814 4444' },
                { icon: <MapPin size={14}/>, val: 'Maracaibo, Venezuela' },
              ].map(c => (
                <div key={c.val} className="flex items-center gap-2 text-white/55 text-sm">
                  <span className="text-samred">{c.icon}</span>{c.val}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FORMULARIO PRINCIPAL — split: info izq, form der ── */}
      <section className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr]">

        {/* Left — info + foto decorativa */}
        <div className="bg-dark flex flex-col justify-between px-5 md:px-14 py-12 md:py-16">
          <div>
            <div className="flex items-center gap-3 mb-8">
              <span className="h-[3px] w-10 bg-samred" />
              <span className="font-sub font-semibold text-[0.85rem] uppercase tracking-[0.2em] text-samred">Información de Contacto</span>
            </div>
            <h2 className="font-display text-[clamp(2.5rem,4vw,3.5rem)] text-white leading-none mb-10">ESTAMOS<br />LISTOS<br />PARA TI</h2>
            <div className="flex flex-col gap-6 mb-12">
              {[
                { icon: <Mail size={16}/>, label: 'Email', val: 'samfor@samfor.com' },
                { icon: <Phone size={16}/>, label: 'Teléfonos', val: '+58 261 814 4444\n+58 414-615.8000' },
                { icon: <Globe size={16}/>, label: 'Web', val: 'www.samfor.com' },
                { icon: <MapPin size={16}/>, label: 'Dirección', val: 'Av. 3H entre Calles 68-70 N.69-61\nMaracaibo, Venezuela' },
              ].map(item => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded border border-white/10 flex items-center justify-center text-samred">{item.icon}</div>
                  <div>
                    <div className="font-mono text-[0.82rem] uppercase tracking-widest text-white/30 mb-0.5">{item.label}</div>
                    <div className="text-white/75 text-base whitespace-pre-line">{item.val}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Decorative photo — turbina */}
          <div className="relative rounded overflow-hidden" style={{ height: '220px' }}>
            <img src="/ct-turbina2.webp" alt="Técnico SAMFOR en campo" className="w-full h-full object-cover object-center" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-samred" />
            <div className="absolute bottom-4 left-5">
              <span className="font-sub font-bold text-[0.75rem] uppercase tracking-widest text-white/50">Proyecto · Reemplazo Turbina BG-2</span>
            </div>
          </div>
        </div>

        {/* Right — form */}
        <div className="bg-white px-5 md:px-14 py-12 md:py-16">
          {sent ? (
            <div className="flex flex-col items-center justify-center h-full py-20 text-center">
              <div className="w-16 h-16 rounded-full bg-green-50 border border-green-200 flex items-center justify-center mb-5">
                <CheckCircle size={30} className="text-green-500" />
              </div>
              <h3 className="font-display text-4xl text-dark mb-3">MENSAJE ENVIADO</h3>
              <p className="text-secondary text-sm max-w-xs leading-relaxed mb-8">Un especialista revisará tu consulta y se pondrá en contacto a la brevedad.</p>
              <button onClick={() => { setSent(false); setForm({ name:'',company:'',email:'',phone:'',type:'',message:'' }) }} className="btn-primary">Enviar otro mensaje</button>
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-3 mb-8">
                <span className="h-[3px] w-10 bg-samred" />
                <span className="font-sub font-semibold text-[0.85rem] uppercase tracking-[0.2em] text-samred">Envía tu consulta</span>
              </div>
              <h2 className="font-display text-[clamp(2rem,3vw,2.75rem)] text-dark leading-none mb-10">¿TIENES UN<br />PROYECTO?</h2>
              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[0.82rem] font-mono text-secondary uppercase tracking-widest">Nombre *</label>
                    <input className="form-input" required value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} placeholder="Carlos Rodríguez" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[0.82rem] font-mono text-secondary uppercase tracking-widest">Empresa</label>
                    <input className="form-input" value={form.company} onChange={e=>setForm(f=>({...f,company:e.target.value}))} placeholder="PDVSA, Chevron..." />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[0.82rem] font-mono text-secondary uppercase tracking-widest">Email *</label>
                    <input className="form-input" type="email" required value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))} placeholder="correo@empresa.com" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[0.82rem] font-mono text-secondary uppercase tracking-widest">Teléfono</label>
                    <input className="form-input" type="tel" value={form.phone} onChange={e=>setForm(f=>({...f,phone:e.target.value}))} placeholder="+58 261 000 0000" />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[0.82rem] font-mono text-secondary uppercase tracking-widest">Tipo de consulta</label>
                  <select className="form-input" value={form.type} onChange={e=>setForm(f=>({...f,type:e.target.value}))}>
                    <option value="">Seleccionar...</option>
                    {['Propuesta de proyecto','Consulta técnica','Alianza comercial','Otro'].map(o=><option key={o}>{o}</option>)}
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[0.82rem] font-mono text-secondary uppercase tracking-widest">Mensaje *</label>
                  <textarea className="form-input min-h-[120px] resize-none" required value={form.message} onChange={e=>setForm(f=>({...f,message:e.target.value}))} placeholder="Describe tu proyecto o consulta..." />
                </div>
                <button type="submit" className="btn-primary flex items-center justify-center gap-2 mt-2" disabled={sending}>
                  {sending
                    ? <><svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="40 60"/></svg>Enviando...</>
                    : <>Enviar Mensaje <ArrowRight size={15}/></>}
                </button>
              </form>
            </div>
          )}
        </div>
      </section>

      {/* ── ÚNETE A SAMFOR — dark + foto equipo ── */}
      <section className="relative overflow-hidden" style={{ minHeight: '520px' }}>
        <img src="/ct-jobs2.webp" alt="Equipo SAMFOR" className="absolute inset-0 w-full h-full object-cover object-center" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/90 to-dark/40" />
        <div className="relative px-5 md:px-16 lg:px-24 py-12 md:py-20 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center max-w-7xl mx-auto">

          {/* Left — text */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="h-[3px] w-10 bg-samred" />
              <span className="font-sub font-semibold text-[0.85rem] uppercase tracking-[0.2em] text-samred">Trabaja con Nosotros</span>
            </div>
            <h2 className="font-display text-[clamp(2.5rem,5vw,4rem)] text-white leading-none mb-6" style={{ textShadow: '0 2px 16px rgba(0,0,0,0.6)' }}>ÚNETE<br />A SAMFOR</h2>
            <p className="text-white text-base leading-relaxed max-w-md mb-0" style={{ textShadow: '0 1px 8px rgba(0,0,0,0.8)' }}>
              Forma parte del equipo que construye la infraestructura energética e industrial de Venezuela. Buscamos profesionales comprometidos con la excelencia técnica y la seguridad.
            </p>
          </div>

          {/* Right — postulation form */}
          <div className="bg-white/15 backdrop-blur-sm border border-white/25 rounded p-8">
            {jobSent ? (
              <div className="flex flex-col items-center py-8 text-center">
                <CheckCircle size={36} className="text-green-400 mb-4" />
                <h3 className="font-display text-2xl text-white mb-2">POSTULACIÓN RECIBIDA</h3>
                <p className="text-white text-sm mb-6 max-w-xs">Revisaremos tu perfil y nos pondremos en contacto si hay oportunidad.</p>
                <button onClick={()=>{ setJobSent(false); setJobForm({name:'',email:'',phone:'',area:'',exp:'',cv:null,letter:''}) }} className="btn-primary">Nueva Postulación</button>
              </div>
            ) : (
              <form onSubmit={handleJobSubmit} noValidate className="flex flex-col gap-4">
                <h3 className="font-display text-xl text-white mb-2">FORMULARIO DE POSTULACIÓN</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[0.82rem] font-mono text-white uppercase tracking-widest">Nombre *</label>
                    <input className="form-input bg-white/15 border-white/30 text-white placeholder:text-white/50 focus:border-samred" required value={jobForm.name} onChange={e=>setJobForm(f=>({...f,name:e.target.value}))} placeholder="Nombre completo" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[0.82rem] font-mono text-white uppercase tracking-widest">Email *</label>
                    <input className="form-input bg-white/15 border-white/30 text-white placeholder:text-white/50 focus:border-samred" type="email" required value={jobForm.email} onChange={e=>setJobForm(f=>({...f,email:e.target.value}))} placeholder="tu@email.com" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[0.82rem] font-mono text-white uppercase tracking-widest">Área</label>
                    <select className="form-input bg-white/15 border-white/30 text-white focus:border-samred" value={jobForm.area} onChange={e=>setJobForm(f=>({...f,area:e.target.value}))}>
                      <option value="" className="bg-dark">Seleccionar...</option>
                      {['Ing. Eléctrica','Ing. Civil','Ing. Mecánica','Instrumentación','Telecomunicaciones','Ambiental','Transporte','Administración','Otra'].map(a=><option key={a} className="bg-dark">{a}</option>)}
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[0.82rem] font-mono text-white uppercase tracking-widest">Experiencia</label>
                    <select className="form-input bg-white/15 border-white/30 text-white focus:border-samred" value={jobForm.exp} onChange={e=>setJobForm(f=>({...f,exp:e.target.value}))}>
                      <option value="" className="bg-dark">Seleccionar...</option>
                      {['0-2 años','3-5 años','6-10 años','10+ años'].map(x=><option key={x} className="bg-dark">{x}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-[0.82rem] font-mono text-white uppercase tracking-widest block mb-1.5">CV / Hoja de Vida</label>
                  <div className={`upload-zone border-white/30 bg-white/10 text-white hover:border-samred/60 ${drag?'border-samred/60':''}`}
                    onDragOver={e=>{e.preventDefault();setDrag(true)}} onDragLeave={()=>setDrag(false)}
                    onDrop={e=>{e.preventDefault();setDrag(false);const f=e.dataTransfer.files[0];if(f)setJobForm(jf=>({...jf,cv:f}))}}
                    onClick={()=>document.getElementById('cv-input').click()}>
                    <input id="cv-input" type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={e=>{const f=e.target.files[0];if(f)setJobForm(jf=>({...jf,cv:f}))}} />
                    {jobForm.cv
                      ? <div className="flex items-center gap-2 justify-center text-samred"><CheckCircle size={14}/><span className="text-sm">{jobForm.cv.name}</span></div>
                      : <div className="text-sm"><Upload size={16} className="mx-auto mb-1.5 opacity-40"/><span>Arrastra tu CV o <span className="text-white/70 font-semibold">haz clic</span></span></div>}
                  </div>
                </div>
                <button type="submit" className="btn-primary flex items-center justify-center gap-2 mt-1" disabled={jobSending}>
                  {jobSending
                    ? <><svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="40 60"/></svg>Enviando...</>
                    : <>Postularme <ArrowRight size={15}/></>}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

    </div>
  )
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState('inicio')
  const [scrolled, setScrolled] = useState(false)
  const [rawScrollY, setRawScrollY] = useState(0)
  const [projectOpen, setProjectOpen] = useState(false)
  const [initialDivision, setInitialDivision] = useState('Todos')
  const [initialService, setInitialService] = useState(null)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 50)
      setRawScrollY(y)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setProjectOpen(false)
    setRawScrollY(0)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [page])

  const navigateToProyectos = (division) => {
    setInitialDivision(division || 'Todos')
    setPage('proyectos')
  }

  const navigateToServicios = (serviceTitle) => {
    setInitialService(serviceTitle || SERVICES[0].title)
    setPage('servicios')
  }

  // Logo progress: 0 = hero (large), 1 = navbar (final). Only animates on inicio page.
  const LOGO_SCROLL_END = 320
  const logoProgress = page === 'inicio' ? Math.min(rawScrollY / LOGO_SCROLL_END, 1) : 1

  const pages = {
    inicio: <PageInicio setPage={setPage} navigateToServicios={navigateToServicios} />,
    servicios: <PageServicios initialService={initialService} />,
    proyectos: <PageProyectos onProjectOpen={setProjectOpen} initialDivision={initialDivision} />,
    'quienes-somos': <PageQuienesSomos setPage={setPage} />,
    contacto: <PageContacto />,
  }

  return (
    <div className="min-h-screen flex flex-col font-body">
      <Navbar page={page} setPage={setPage} scrolled={scrolled} forceDark={projectOpen} logoProgress={logoProgress} />
      <main className="flex-1">{pages[page] || pages['inicio']}</main>
      <Footer setPage={setPage} />
    </div>
  )
}
