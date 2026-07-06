import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import {
  Zap, Building2, Settings, Truck, Leaf, Ship, Cpu, Plane,
  ChevronRight, Menu, X, ArrowRight, MapPin, Phone, Mail, Globe,
  Upload, CheckCircle, Award, Target, Plus,
  Shield, Star, ChevronDown, Users, Wrench, LayoutGrid, List,
  Briefcase, FileText, Clock
} from 'lucide-react'

// ─── IMAGE MAP ────────────────────────────────────────────────────────────────
const IMG = (n) => `/projects/img-${String(n).padStart(3,'0')}.jpg`

// ─── CLASSIFICATION ───────────────────────────────────────────────────────────
// Matches the reference: Civiles / Mecánicos / Eléctricos / Transporte / Ambientales / Otras Divisiones
const DIVISION_META = {
  'Civiles':         { label: 'Proyectos Civiles',     icon: <Building2 size={16}/>,  color: 'bg-samred/10 text-samred border-samred/30',  dot: '#C8102E', img: IMG(72) },
  'Mecánicos':       { label: 'Proyectos Mecánicos',   icon: <Wrench size={16}/>,     color: 'bg-samred/10 text-samred border-samred/30',  dot: '#C8102E', img: IMG(103) },
  'Eléctricos':      { label: 'Proyectos Eléctricos',  icon: <Zap size={16}/>,        color: 'bg-samred/10 text-samred border-samred/30',  dot: '#C8102E', img: IMG(23) },
  'Transporte':      { label: 'División Transporte',   icon: <Truck size={16}/>,      color: 'bg-samred/10 text-samred border-samred/30',  dot: '#C8102E', img: IMG(129) },
  'Ambientales':     { label: 'Servicios Ambientales', icon: <Leaf size={16}/>,       color: 'bg-samred/10 text-samred border-samred/30',  dot: '#C8102E', img: '/division/ambientales.jpg' },
  'Otras':           { label: 'Servicios Marítimos',   icon: <Ship size={16}/>,       color: 'bg-samred/10 text-samred border-samred/30',  dot: '#C8102E', img: IMG(136) },
  'Automatización':  { label: 'Automatización y Control', icon: <Cpu size={16}/>,    color: 'bg-samred/10 text-samred border-samred/30',  dot: '#C8102E', img: IMG(28) },
}

// ─── DATA ────────────────────────────────────────────────────────────────────

const SERVICES = [
  { icon: <Zap size={28}/>, title: 'Obras Eléctricas', division: 'Eléctricos', desc: 'Diseño y construcción de plantas eléctricas, subestaciones, tendido de alta tensión, automatización industrial y sistemas SCADA.' },
  { icon: <Building2 size={28}/>, title: 'Obras Civiles', division: 'Civiles', desc: 'Movimiento de tierras, edificaciones, carreteras, puentes, muelles y construcción en plataformas petroleras y petroquímicas.' },
  { icon: <Settings size={28}/>, title: 'Obras Mecánicas', division: 'Mecánicos', desc: 'Oleoductos, acueductos, tanques, estaciones de bombeo, instalación de tuberías y mantenimiento de facilidades de producción.' },
  { icon: <Truck size={28}/>, title: 'Transporte', division: 'Transporte', desc: 'Transporte especializado de hidrocarburos, equipos industriales y personal. Cobertura terrestre, aérea y marítima en todo Venezuela.', subServices: ['Transporte Terrestre', 'Transporte Marítimo', 'Transporte Aéreo'] },
  { icon: <Leaf size={28}/>, title: 'Servicios Ambientales', division: 'Ambientales', desc: 'Manejadora de Desechos Peligrosos autorizada desde 1999. Recolección, transporte, tratamiento y disposición final conforme a normativas.' },
  { icon: <Ship size={28}/>, title: 'Servicios Marítimos/Lacustres', division: 'Otras', desc: 'Operaciones en el Lago de Maracaibo, costas venezolanas y Archipiélago Los Monjes. Transporte hacia plataformas offshore con embarcaciones especializadas.' },
  { icon: <Cpu size={28}/>, title: 'Automatización y Control', division: 'Automatización', desc: 'Sistemas PLC/DCS, instrumentación industrial, SCADA, control de procesos y redes industriales para facilidades petroleras y petroquímicas.' },
]

const SERVICES_DETAIL = {
  'Obras Eléctricas': {
    heroImg: '/sv-electrica-hero.jpg',
    descImg: '/sv-electrica-desc.jpg',
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
    descImg: '/sv-civil-desc.jpg',
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
    descImg: '/sv-mecanica-desc.jpg',
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
  'Transporte Terrestre': {
    heroImg: '/sv-transporte2.webp',
    descImg: '/sv-transporte-desc.jpg',
    tagline: 'Flota terrestre certificada',
    longDesc: 'SAMFOR dispone de una flota de vehículos especializados para el transporte terrestre de hidrocarburos, equipos industriales de alto tonelaje y materiales peligrosos. Contamos con operadores certificados, vehículos con mantenimiento preventivo riguroso y cumplimiento estricto de las normas de seguridad vial y ambiental en todo el territorio venezolano.',
    capabilities: [
      'Transporte de equipos y maquinaria industrial',
      'Flota de camiones cisterna y plataformas',
      'Logística de carga pesada y sobredimensionada',
      'Operadores con licencias especiales (AVB, MPP)',
      'Gestión de manifiestos y documentación legal',
    ],
    division: 'Transporte',
  },
  'Transporte Marítimo': {
    heroImg: '/sv-maritimo-hero.jpg',
    tagline: 'Logística marítima y lacustre',
    longDesc: 'Operamos embarcaciones especializadas para el transporte marítimo y lacustre en el Lago de Maracaibo, costas venezolanas y Archipiélago Los Monjes. Brindamos servicios de transporte de personal, carga general, combustibles y suministros hacia plataformas offshore, muelles e instalaciones costeras con altos estándares de seguridad.',
    capabilities: [
      'Transporte de personal a plataformas offshore',
      'Embarcaciones de apoyo lacustre y marítimo',
      'Operaciones en el Lago de Maracaibo',
      'Logística hacia el Archipiélago Los Monjes',
      'Cumplimiento de normativas COVENIN y OMI',
      'Coordinación de muelles y atraques',
    ],
    division: 'Transporte',
  },
  'Transporte Aéreo': {
    heroImg: '/sv-aereo-hero.jpg',
    descImg: '/sv-aereo-desc.jpg',
    tagline: 'Movilización aérea industrial',
    longDesc: 'SAMFOR gestiona soluciones de transporte aéreo para la industria petrolera, facilitando la movilización rápida de personal técnico, equipos de respuesta inmediata y cargas críticas hacia locaciones remotas y de difícil acceso. Con una red de operadores aéreos certificados, garantizamos desplazamientos seguros y eficientes en todo el país.',
    capabilities: [
      'Transporte de personal a locaciones remotas',
      'Movilización de equipos de emergencia',
      'Carga aérea de repuestos e instrumentos',
      'Coordinación de vuelos chárter industriales',
      'Logística aérea para operaciones costa afuera',
      'Cumplimiento de normativas INAC y OACI',
      'Respuesta rápida para contingencias operativas',
      'Aéreoambulancia',
      'Vuelos Diplomáticos',
    ],
    division: 'Transporte',
  },
  'Servicios Ambientales': {
    heroImg: '/qs-hero.webp',
    descImg: '/sv-ambiental-desc.jpg',
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
    descImg: '/sv-maritimo-lacustre.jpg',
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
  { value: 250, suffix: '+', label: 'Proyectos ejecutados' },
  { value: 20, suffix: '+', label: 'Clientes internacionales' },
  { value: 6, suffix: '', label: 'Líneas de servicio' },
]

const CB = (domain) => `https://logo.clearbit.com/${domain}`
const CLIENT_GRID = [
  // ── Energía / Petróleo internacional ──
  { img: '/clients/pdvsa.webp',           name: 'PDVSA',              sector: 'Petróleo y Gas',        bg: '#fff' },
  { img: '/clients/pdvsa-gas.png',       name: 'PDVSA Gas',          sector: 'Petróleo y Gas',        bg: '#fff' },
  { img: '/clients/pdvsa-petroboscan.png', name: 'PDVSA Petroboscán', sector: 'Petróleo y Gas',        bg: '#fff' },
  { img: '/clients/chevron.webp',         name: 'Chevron',            sector: 'Petróleo y Gas',        bg: '#fff' },
  { img: '/clients/shell.webp',           name: 'Shell',              sector: 'Petróleo y Gas',        bg: '#fff' },
  { img: '/clients/repsol.webp',          name: 'Repsol',             sector: 'Petróleo y Gas',        bg: '#fff' },
  { img: '/clients/eni.webp',             name: 'Eni',                sector: 'Petróleo y Gas',        bg: '#fff' },
  { img: '/clients/cnpc.webp',            name: 'CNPC',               sector: 'Petróleo y Gas',        bg: '#fff' },
  { img: '/clients/halliburton.webp',     name: 'Halliburton',        sector: 'Petróleo y Gas',        bg: '#fff' },
  { img: '/clients/weatherford.webp',     name: 'Weatherford',        sector: 'Petróleo y Gas',        bg: '#fff' },
  // ── Petroquímica ──
  { img: IMG(171),                       name: 'Pequiven',           sector: 'Petroquímica',   bg: '#fff' },
  { img: '/clients/cardon-iv.webp',       name: 'Cardón IV',          sector: 'Petroquímica',   bg: '#fff' },
  // ── Servicios Oilfield ──
  { img: '/clients/baker-hughes.webp',    name: 'Baker Hughes',       sector: 'Servicios',      bg: '#fff' },
  // ── CAF / Instituciones financieras ──
  { img: '/clients/caf.webp',             name: 'CAF',                sector: 'Finanzas',       bg: '#fff' },
  { img: '/clients/bnc.webp',             name: 'BNC',                sector: 'Finanzas',       bg: '#fff' },
  // ── Internacional / ONU ──
  { img: '/clients/wfp.webp',             name: 'WFP / ONU',          sector: 'ONG',  bg: '#fff' },
  { img: '/clients/unhcr.webp',           name: 'UNHCR / ACNUR',      sector: 'ONG',  bg: '#fff' },
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
  // ── Gobierno / Municipios ──
  { img: '/clients/alcaldia-maracaibo.png', name: 'Alcaldía de Maracaibo', sector: 'Gobierno',  bg: '#fff' },
  { img: '/clients/gob-zulia.png',       name: 'Gobernación del Zulia', sector: 'Gobierno',     bg: '#fff' },
  // ── Otros ──
  { img: '/clients/lukiven.webp',         name: 'Lukiven S.A.',       sector: 'Industrial',     bg: '#fff' },
  { img: '/clients/farmatodo.webp',       name: 'Farmatodo',          sector: 'Retail',         bg: '#fff' },
]

const SECTOR_COLORS = {
  'Petróleo y Gas': 'bg-samred/10 text-samred',
  Petroquímica: 'bg-blue-50 text-samblue',
  Servicios: 'bg-gray-100 text-gray-600',
  ONG: 'bg-green-50 text-green-700',
  Transporte: 'bg-purple-50 text-purple-700',
  Acuicultura: 'bg-teal-50 text-teal-700',
}

// ─── ALL PROJECTS (curated sample) ────────────────────────────────────────────
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
    id: 103, status: 'completed', division: 'Mecánicos',
    client: 'PDVSA Petróleo, S.A.',
    title: 'Gasoducto Anaco–Barquisimeto Ø36" y Ø30"',
    img: IMG(103),
    desc: 'Reemplazo de tubería Ø36" API 5L X60 y Ø30" API 5L X52. Subsistemas EPA-N50 y EPA-N5.',
    detail: 'Adecuación del gasoducto LANA Ø36" y NURGAS Ø30" mediante reclasificación de área, garantizando operatividad y cumplimiento de estándares vigentes.',
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

  // ── OTRAS (Marítimo / Lacustre) ──
  {
    id: 112, status: 'completed', division: 'Otras',
    client: 'Cardón IV (Eni / Repsol)',
    title: 'Servicio Embarcaciones Campo Perla',
    img: IMG(136),
    desc: 'Embarcación NO estándar, NO DP para operaciones marítimas en Campo Perla. Transporte de materiales, equipos y personal.',
    detail: 'Cardón IV (CM 4600001208 / CM 4700022511). Embarcaciones especializadas offshore en Campo Perla, Golfo de Venezuela.',
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
    <div ref={ref} className="text-center px-1.5 py-4 sm:px-3 sm:py-5 md:px-5 md:py-7 flex-1">
      <div className="font-display text-[2rem] sm:text-[2.8rem] md:text-[4rem] lg:text-[4.5rem] text-samred leading-none tabular-nums">{count}{suffix}</div>
      <div className="font-sub text-[0.72rem] sm:text-[0.8rem] md:text-[0.88rem] font-semibold uppercase tracking-widest text-secondary mt-1.5 md:mt-2.5 leading-tight">{label}</div>
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
  const white = !dark && (scrolled || page === 'proyectos' || page === 'contacto')
  const navBg = dark ? 'bg-[#0D1117] border-b border-white/10' : white ? 'bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)]' : 'bg-transparent'
  const textColor = dark ? 'text-white' : white ? 'text-dark' : page === 'inicio' ? 'text-white' : 'text-dark'
  const linkActive = 'text-samred'
  const linkIdle = dark ? 'text-white/70 hover:text-white' : white ? 'text-dark/70 hover:text-samred' : page === 'inicio' ? 'text-white/70 hover:text-white' : 'text-dark/70 hover:text-samred'

  // ── Animated logo ──────────────────────────────────────────────────────────
  const vpw = typeof window !== 'undefined' ? window.innerWidth : 1280
  const isMobile = vpw < 768

  // On mobile: no animation — logo lives in the normal navbar flow
  // On desktop: scroll-driven animation from hero to navbar
  const t      = Math.min(Math.max(logoProgress, 0), 1)
  const eased  = 1 - Math.pow(1 - t, 4)   // ease-out quart

  const HERO_H = 520
  const NAV_H  = 210

  const containerPad = vpw >= 768 ? 32 : 16
  const centerOffset = Math.max(0, (vpw - 1280) / 2)

  const baseFont = Math.min(Math.max(16, vpw * 0.02), 22)
  const navCY  = baseFont * 3  // h-24 = 6rem, center = 3rem
  const navTop = navCY - NAV_H / 2

  // Absolute top-left in hero (higher up), animates into navbar spot
  const heroLeft  = 0
  const heroTop   = -160
  const navLeft   = centerOffset + containerPad

  const currentLeft = heroLeft + (navLeft - heroLeft) * eased
  const currentTop  = heroTop + (navTop - heroTop) * eased
  const currentH    = HERO_H + (NAV_H - HERO_H) * eased
  // ──────────────────────────────────────────────────────────────────────────

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}>

      {/* ── Animated floating logo — desktop only ── */}
      {!isMobile && (
        <button
          onClick={() => { setPage('inicio'); setOpen(false) }}
          aria-label="Inicio"
          style={{
            position: 'fixed',
            zIndex: 55,
            top: currentTop,
            left: currentLeft,
            height: currentH,
            width: 'auto',
            background: 'none',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
            lineHeight: 0,
            willChange: 'top, height, left',
          }}
        >
          <img src="/logo.png" alt="SAMFOR" style={{ height: '100%', width: 'auto', display: 'block' }} />
        </button>
      )}

      <div className="max-w-7xl mx-auto px-4 md:px-8 h-24 flex items-center justify-between">
        {/* Mobile: real logo button in navbar flow. Desktop: invisible placeholder for layout space */}
        {isMobile ? (
          <button onClick={() => { setPage('inicio'); setOpen(false) }} className="flex items-center">
            <img src="/logo.png" alt="SAMFOR" style={{ height: '140px' }} className={`w-auto ${dark ? 'brightness-0 invert' : ''}`} />
          </button>
        ) : (
          <div aria-hidden="true" style={{ height: '210px', width: 'clamp(210px,22vw,320px)', flexShrink: 0 }} />
        )}

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
            <div className="mb-4"><img src="/logo.png" alt="SAMFOR" style={{ height: '120px' }} className="w-auto brightness-0 invert" /></div>
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
              <div className="flex items-center gap-2.5"><Phone size={13} className="flex-shrink-0 text-samred" /><span>+58 261 814 4444 / +58 414-615.8000</span></div>
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
    <div className="bg-dark min-h-screen">

      {/* ── HERO — full screen cover ── */}
      <div className="relative w-full bg-[#060809]" style={{ height: '100dvh' }}>
        <img
          src={project.img}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-dark/50 via-transparent to-dark/50 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/20 to-transparent pointer-events-none" />
        {/* Back button — top left */}
        <button onClick={onClose}
          className="absolute top-6 left-6 md:left-10 flex items-center gap-2 bg-dark/60 backdrop-blur-sm border border-white/15 text-white/80 hover:text-white hover:border-white/40 transition-all px-3.5 py-2 rounded text-xs font-sub font-semibold uppercase tracking-widest z-50"
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

        {/* ── TITLE OVERLAY — bottom of hero ── */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 lg:p-14 z-10">
          <div className="max-w-5xl">
            <div className="mb-3"><DivisionBadge division={project.division} /></div>
            <h1 className="font-display text-[clamp(2rem,5vw,4rem)] text-white leading-none tracking-wide">{project.title}</h1>
          </div>
        </div>

        {/* Red accent bar — bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-samred" />
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
                  onClick={() => { onClose(p); }}
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
        : <span className="font-display font-bold text-xs leading-none text-white">{initials}</span>
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
          <div />
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
  'Transporte':                '/sv-transporte-card.jpg',
  'Transporte Terrestre':      '/sv-transporte.webp',
  'Transporte Marítimo':       '/sv-maritimo-hero.jpg',
  'Transporte Aéreo':          '/sv-aereo-hero.jpg',
  'Servicios Ambientales':     '/qs-hero.webp',
  'Servicios Marítimos/Lacustres': '/projects/img-005.jpg',
  'Automatización y Control':  '/sv-photo3.webp',
}

const SUB_SERVICE_ICONS = {
  'Transporte Terrestre': <Truck size={28} />,
  'Transporte Marítimo': <Ship size={28} />,
  'Transporte Aéreo': <Plane size={28} />,
}

function ServicioDetalle({ title, onBack, onProjectClick }) {
  useScrollReveal()
  const detail = SERVICES_DETAIL[title]
  const activeIdx = SERVICES.findIndex(s => s.title === title)
  const inMainList = activeIdx >= 0
  const srvIcon = inMainList ? SERVICES[activeIdx]?.icon : SUB_SERVICE_ICONS[title]
  const relatedProjects = ALL_PROJECTS.filter(p => p.division === detail.division).slice(0, 8)

  return (
    <div>
      {/* ── HERO individual servicio ── */}
      <section className="relative overflow-hidden" style={{ height: '100dvh' }}>
        <img src={SV_CARD_PHOTOS[title]} alt={title}
          className="absolute inset-0 w-full h-full object-cover object-center" loading="eager" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark/90 via-dark/60 to-dark/15" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/70 via-transparent to-transparent" />
        <div className="relative h-full flex flex-col justify-end px-5 sm:px-8 md:px-16 lg:px-24 pb-10 md:pb-16 lg:pb-20">
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
              <span className="text-samred">{srvIcon}</span>
              <h2 className="font-display text-[clamp(1.75rem,3.5vw,3rem)] text-dark leading-none">{title.toUpperCase()}</h2>
            </div>
            <p className="text-secondary text-base leading-relaxed mb-10">{detail.longDesc}</p>
            <div className="flex items-center gap-3">
              {inMainList && activeIdx > 0 && (
                <button onClick={() => onBack('prev', activeIdx - 1)}
                  className="flex items-center gap-2 text-xs font-sub font-bold uppercase tracking-widest text-secondary border border-border px-4 py-2 rounded hover:border-dark hover:text-dark transition-all">
                  ← Anterior
                </button>
              )}
              {inMainList && activeIdx < SERVICES.length - 1 && (
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
      <section className="bg-dark grid grid-cols-1 md:grid-cols-[1fr_380px] lg:grid-cols-[1fr_420px] xl:grid-cols-[1fr_500px] min-h-[80vh]">
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
        <div className="relative hidden md:block overflow-hidden">
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
              <span className="font-mono text-xs text-white/25 hidden md:block">250+ proyectos</span>
            </div>
          </div>
          <div className="overflow-hidden">
            <div className="flex gap-5 px-5 md:px-16 lg:px-24"
              style={{ width:'max-content', animation: relatedProjects.length > 3 ? `marquee ${Math.round(relatedProjects.length*300/SPEED)}s linear infinite` : 'none', willChange:'transform' }}>
              {(relatedProjects.length > 3 ? [...relatedProjects,...relatedProjects] : relatedProjects).map((p, i) => (
                <div key={`${p.id}-${i}`}
                  className="flex-shrink-0 group rounded overflow-hidden bg-white/5 border border-white/10 hover:border-white/30 transition-all duration-300 cursor-pointer"
                  style={{ width:'280px' }}
                  onClick={() => onProjectClick?.(p)}>
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

// ─── SUBMENÚ DE TRANSPORTE ──────────────────────────────────────────────
function TransporteSubmenu({ subServices, onSelect, onBack }) {
  useScrollReveal()

  const SUBS = [
    { title: 'Transporte Terrestre', img: '/sv-transporte.webp', icon: <Truck size={40}/>, tagline: 'Flota terrestre certificada', desc: 'Transporte de hidrocarburos, equipos industriales y personal por vía terrestre con flota certificada y operadores especializados.' },
    { title: 'Transporte Marítimo', img: '/sv-maritimo-hero.jpg', icon: <Ship size={40}/>, tagline: 'Logística marítima y lacustre', desc: 'Transporte lacustre y marítimo hacia plataformas offshore, instalaciones en el Lago de Maracaibo y costas venezolanas.' },
    { title: 'Transporte Aéreo', img: '/sv-aereo-hero.jpg', icon: <Plane size={40}/>, tagline: 'Movilización aérea industrial', desc: 'Transporte aéreo de personal, equipos y cargas especializadas para operaciones industriales y remotas en todo el territorio nacional.' },
  ]

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden" style={{ height: '100dvh' }}>
        <img src="/sv-transporte2.webp" alt="Transporte SAMFOR"
          className="absolute inset-0 w-full h-full object-cover object-center" loading="eager" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark/90 via-dark/60 to-dark/15" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/70 via-transparent to-transparent" />
        <div className="relative h-full flex flex-col justify-end px-5 sm:px-8 md:px-16 lg:px-24 pb-10 md:pb-16 lg:pb-20">
          <div className="max-w-3xl">
            <button onClick={onBack} className="flex items-center gap-2 text-white/50 hover:text-white text-xs font-sub font-bold uppercase tracking-widest mb-8 transition-colors group">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform group-hover:-translate-x-1"><path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              Todos los servicios
            </button>
            <div className="flex items-center gap-3 mb-4">
              <span className="h-[3px] w-10 bg-samred" />
              <span className="font-sub font-semibold text-[0.85rem] uppercase tracking-[0.25em] text-white/55">Transporte · 3 modalidades</span>
            </div>
            <h1 className="font-display text-[clamp(2.5rem,6vw,5rem)] text-white leading-none tracking-wide mb-4">TRANSPORTE</h1>
            <p className="text-samred font-sub font-semibold text-sm uppercase tracking-widest">Selecciona una modalidad</p>
          </div>
        </div>
      </section>

      {/* SUB-SERVICE CARDS */}
      <section className="bg-dark py-14 md:py-20 px-5 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="scroll-reveal flex items-center gap-3 mb-12">
            <span className="h-[3px] w-10 bg-samred" />
            <span className="font-sub font-semibold text-[0.85rem] uppercase tracking-[0.2em] text-samred">Modalidades de transporte</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SUBS.map((sub, i) => (
              <button key={sub.title} onClick={() => onSelect(sub.title)}
                className="scroll-reveal group relative overflow-hidden rounded cursor-pointer text-left"
                style={{ height: 'clamp(300px, 30vw, 420px)', transitionDelay: `${i * 100}ms` }}>
                <img src={sub.img} alt={sub.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06]" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-dark/10" />
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-samred scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left" />
                <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
                  <span className="font-mono text-[0.72rem] text-white/30 tracking-widest mb-3">{String(i + 1).padStart(2, '0')}</span>
                  <div className="text-samred mb-3">{sub.icon}</div>
                  <h3 className="font-display text-[1.5rem] text-white leading-tight mb-2">{sub.title.toUpperCase()}</h3>
                  <p className="text-samred font-sub font-semibold text-[0.72rem] uppercase tracking-widest mb-2">{sub.tagline}</p>
                  <p className="text-white/45 text-[0.85rem] leading-relaxed line-clamp-2 group-hover:text-white/65 transition-colors duration-300">{sub.desc}</p>
                  <div className="flex items-center gap-2 mt-5 text-samred text-[0.8rem] font-sub font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 -translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                    Ver detalle <ArrowRight size={11} />
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

function PageServicios({ initialService, setPage }) {
  useScrollReveal()
  const [selected, setSelected] = useState(initialService || null)
  const [subSelected, setSubSelected] = useState(null)

  const handleSelect = (title) => {
    setSelected(title)
    setSubSelected(null)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }
  const handleSubSelect = (subTitle) => {
    setSubSelected(subTitle)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }
  const handleBack = (dir, idx) => {
    if (subSelected) {
      setSubSelected(null)
    } else if (dir === 'prev' || dir === 'next') {
      setSelected(SERVICES[idx].title)
    } else {
      setSelected(null)
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  // Sub-service detail view
  if (subSelected) {
    const handleSubBack = () => {
      setSubSelected(null)
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
    return <div className="pt-24"><ServicioDetalle title={subSelected} onBack={handleSubBack} onProjectClick={(p) => { setPage('proyectos'); window.scrollTo({ top: 0, behavior: 'instant' }) }} /></div>
  }

  // Service with sub-services → show submenu
  if (selected) {
    const srv = SERVICES.find(s => s.title === selected)
    if (srv && srv.subServices) {
      return <TransporteSubmenu subServices={srv.subServices} onSelect={handleSubSelect} onBack={() => { setSelected(null); window.scrollTo({ top: 0, behavior: 'instant' }) }} />
    }
    return <div className="pt-24"><ServicioDetalle title={selected} onBack={handleBack} onProjectClick={(p) => { setPage('proyectos'); window.scrollTo({ top: 0, behavior: 'instant' }) }} /></div>
  }

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
        <div className="relative h-full flex flex-col justify-end px-5 sm:px-8 md:px-16 lg:px-24 pb-10 md:pb-16 lg:pb-20">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
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
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
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

// ─── HOME BEFORE / AFTER (grid photo replacement) ──────────────────────────
function HomeBeforeAfter() {
  const wrapperRef = useRef(null)
  const afterRef = useRef(null)
  const lineRef = useRef(null)
  const playedRef = useRef(false)

  useEffect(() => {
    const el = wrapperRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !playedRef.current) {
          playedRef.current = true
          const tl = gsap.timeline({ defaults: { ease: 'power2.inOut' } })
          tl.to(afterRef.current, { clipPath: 'inset(0 0% 0 0)', duration: 2.6 }, 0)
          tl.to(lineRef.current,  { left: '100%',              duration: 2.6 }, 0)
        }
      },
      { threshold: 0.25 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={wrapperRef} className="relative h-64 sm:h-80 md:h-auto order-1 md:order-none overflow-hidden bg-[#0a0c10]">

      {/* BEFORE image (base) */}
      <div className="absolute inset-0">
        <img src="/proyectos/gasap-vieja.jpg" alt="Antes"
             className="w-full h-full object-cover opacity-90" loading="lazy" />
        <div className="absolute inset-0 pointer-events-none"
             style={{ background: 'linear-gradient(135deg, rgba(200,16,46,0.10) 0%, transparent 50%, rgba(200,16,46,0.08) 100%)' }} />
        <div className="absolute inset-0 pointer-events-none"
             style={{ background: 'rgba(200,16,46,0.06)', mixBlendMode: 'multiply' }} />
        <div className="absolute inset-0 pointer-events-none"
             style={{ boxShadow: 'inset 0 0 60px rgba(0,0,0,0.25)' }} />
        {/* Antes badge */}
        <div className="absolute top-4 left-4 z-10 bg-dark/60 backdrop-blur-sm border border-white/10 rounded px-2.5 py-1">
          <span className="font-sub font-bold text-[0.55rem] uppercase tracking-[0.2em] text-white/40">Antes</span>
        </div>
      </div>

      {/* AFTER image (clipped) */}
      <div ref={afterRef} className="absolute inset-0 overflow-hidden"
           style={{ clipPath: 'inset(0 100% 0 0)' }}>
        <img src="/proyectos/gasap-nueva.jpg" alt="Después"
             className="w-full h-full object-cover opacity-90" loading="lazy" />
        <div className="absolute inset-0 pointer-events-none"
             style={{ background: 'linear-gradient(135deg, rgba(200,16,46,0.10) 0%, transparent 50%, rgba(200,16,46,0.08) 100%)' }} />
        <div className="absolute inset-0 pointer-events-none"
             style={{ background: 'rgba(200,16,46,0.06)', mixBlendMode: 'multiply' }} />
        <div className="absolute inset-0 pointer-events-none"
             style={{ boxShadow: 'inset 0 0 60px rgba(0,0,0,0.25)' }} />
        <div className="absolute top-4 right-4 z-10 bg-dark/60 backdrop-blur-sm border border-white/10 rounded px-2.5 py-1">
          <span className="font-sub font-bold text-[0.55rem] uppercase tracking-[0.2em] text-samred">Después</span>
        </div>
      </div>

      {/* Slider line */}
      <div ref={lineRef} className="absolute top-0 bottom-0 z-20 pointer-events-none"
           style={{ left: '0%', width: '2px' }}>
        <div className="absolute inset-0 bg-samred shadow-[0_0_12px_rgba(200,16,46,0.7)]" />
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-white border-2 border-samred shadow-lg flex items-center justify-center">
          <div className="flex gap-px">
            <div className="w-[2px] h-2.5 rounded-full bg-samred/50" />
            <div className="w-[2px] h-2.5 rounded-full bg-samred/50 ml-[1px]" />
          </div>
        </div>
      </div>

      {/* Right fade on desktop */}
      <div className="hidden md:block absolute inset-y-0 right-0 w-24 bg-gradient-to-r from-transparent to-white z-10 pointer-events-none" />
      {/* Red bottom accent */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-samred z-10" />
      {/* 60 años badge */}
      <div className="absolute bottom-5 left-5 bg-dark/80 backdrop-blur-sm border border-white/10 rounded px-3.5 py-2.5 z-10">
        <span className="font-display text-[1.8rem] text-white leading-none">60</span>
        <span className="block font-sub text-[0.7rem] tracking-[0.2em] uppercase text-white/55 mt-0.5">Años de trayectoria</span>
      </div>
      {/* Progress bar at bottom edge */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/5 z-10">
        <div className="h-full bg-samred" style={{ width: '0%' }} />
      </div>
    </div>
  )
}

// ─── PAGE: INICIO ─────────────────────────────────────────────────────────────
function PageInicio({ setPage, navigateToServicios }) {
  useScrollReveal()
  const afterClipRef = useRef(null)
  const sectionRef = useRef(null)
  const [scrollH, setScrollH] = useState('200dvh')
  useEffect(() => {
    const check = () => setScrollH(window.innerWidth < 768 ? '150dvh' : '200dvh')
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])
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

  // Scroll-triggered reveal: construction transition (0→100%) within sticky section
  useEffect(() => {
    const clip = afterClipRef.current
    const section = sectionRef.current
    if (!clip || !section) return

    let ticking = false
    const update = () => {
      const wh = window.innerHeight
      const sh = section.offsetHeight
      const scrollable = sh - wh               // extra scroll room (100dvh)
      const rect = section.getBoundingClientRect()
      // Transition starts when sticky locks (rect.top = 0) and finishes at end of sticky
      const scrolledIntoSticky = -rect.top     // 0 when sticky locks, positive through sticky
      let p = Math.max(0, Math.min(1, scrolledIntoSticky / scrollable))
      // clip: 100% hidden (before) → 0% hidden (after)
      clip.style.clipPath = `inset(0 ${100 - p * 100}% 0 0)`
      ticking = false
    }

    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update) } }
    window.addEventListener('scroll', onScroll, { passive: true })
    update()
    return () => window.removeEventListener('scroll', onScroll)
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
      {/* QUIÉNES SOMOS — sticky scroll-reveal: construcción antes/después */}
      <section ref={sectionRef} className="relative" style={{ height: scrollH }}>

        {/* Sticky content — fills screen while scrolling through 200dvh */}
        <div className="sticky top-0 h-screen overflow-hidden bg-[#0a0c10]">

          {/* Before — old construction */}
          <div className="absolute inset-0">
            <img src="/proyectos/gasap-vieja.jpg" alt="Antes"
                 className="w-full h-full object-cover object-left" loading="lazy" />
          </div>

          {/* After — new construction (clip-path: 100%→0% as you scroll) */}
          <div ref={afterClipRef} className="absolute inset-0 overflow-hidden"
               style={{ clipPath: 'inset(0 100% 0 0)' }}>
            <img src="/proyectos/gasap-nueva.jpg" alt="Después"
                 className="w-full h-full object-cover object-left" loading="lazy" />
          </div>

          {/* Gradient overlay */}
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(135deg, #0D1117 0%, rgba(13,17,23,0.80) 30%, rgba(13,17,23,0.50) 60%, rgba(13,17,23,0.2) 100%)',
          }} />
          {/* Mobile solo: overlay extra oscuro en la esquina inferior izquierda */}
          <div className="md:hidden absolute inset-0" style={{
            background: 'linear-gradient(to top, #0D1117 0%, rgba(13,17,23,0.85) 20%, rgba(13,17,23,0.5) 35%, transparent 50%)',
          }} />

          {/* Before / After badges */}
          <div className="absolute top-4 md:top-6 left-4 md:right-6 z-10 flex gap-2">
            <div className="bg-dark/70 backdrop-blur-sm border border-white/10 rounded px-2 py-0.5 md:px-2.5 md:py-1">
              <span className="font-sub font-bold text-[0.5rem] md:text-[0.55rem] uppercase tracking-[0.2em] text-white/40">Antes</span>
            </div>
            <div className="bg-dark/70 backdrop-blur-sm border border-white/10 rounded px-2 py-0.5 md:px-2.5 md:py-1">
              <span className="font-sub font-bold text-[0.5rem] md:text-[0.55rem] uppercase tracking-[0.2em] text-samred">Después</span>
            </div>
          </div>

          {/* Corner accents */}
          <div className="absolute top-6 left-6 md:top-10 md:left-10 w-16 h-16 z-10 pointer-events-none">
            <div className="absolute top-0 left-0 w-10 h-[1px] bg-samred/30" />
            <div className="absolute top-0 left-0 w-[1px] h-10 bg-samred/30" />
          </div>
          <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 w-16 h-16 z-10 pointer-events-none">
            <div className="absolute bottom-0 right-0 w-10 h-[1px] bg-samred/30" />
            <div className="absolute bottom-0 right-0 w-[1px] h-10 bg-samred/30" />
          </div>

          {/* Content — centered */}
          <div className="relative z-10 h-full flex flex-col justify-end md:justify-start pb-14 md:pt-36 px-6 md:px-14 lg:px-20 max-w-4xl mr-auto">
            <div className="scroll-reveal flex items-center gap-3 mb-4 md:mb-4">
              <span className="h-[2px] w-8 md:w-10 bg-samred flex-shrink-0" />
              <span className="font-sub font-semibold text-[0.65rem] md:text-[0.78rem] tracking-[0.28em] uppercase text-samred">Quiénes somos</span>
            </div>

            <h2 className="scroll-reveal font-display text-[2.5rem] md:text-[4.5rem] lg:text-[5.5rem] text-white leading-[0.92] mb-4 md:mb-8 tracking-wide">
              INGENIERÍA<br />
              <span className="text-samred">SIN LÍMITES.</span>
            </h2>

            <div className="scroll-reveal max-w-2xl mb-4 md:mb-12">
              <p className="text-white/75 text-sm md:text-[1.1rem] leading-relaxed mb-2 md:mb-4">
                SAMFOR es una empresa venezolana de contratación industrial con 60 años de trayectoria continua. Ejecutamos proyectos de alta complejidad para la industria petrolera, petroquímica, civil, ambiental y de servicios públicos.
              </p>
              <p className="text-white/50 text-xs md:text-base leading-relaxed hidden md:block">
                Fundada en 1966, con equipos multidisciplinarios, maquinaria pesada propia y más de 50 clientes institucionales nacionales e internacionales.
              </p>
            </div>

            <div className="scroll-reveal">
              <button
                onClick={() => setPage('quienes-somos')}
                className="group inline-flex items-center gap-2 font-sub font-bold text-[0.65rem] md:text-[0.75rem] tracking-[0.18em] uppercase text-white border border-white/30 px-5 py-3 md:px-8 md:py-4 rounded transition-all hover:bg-samred hover:border-samred"
              >
                Conocer nuestra historia
                <ArrowRight size={11} className="transition-transform group-hover:translate-x-1 md:w-[13px]" />
              </button>
            </div>
          </div>

          {/* Scroll progress indicator */}
          <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 opacity-40">
            <div className="w-[1px] h-5 md:h-8 bg-white/30" />
            <span className="font-mono text-[0.45rem] md:text-[0.55rem] uppercase tracking-[0.3em] text-white/40">Scroll para revelar</span>
          </div>

        </div>
      </section>

      
      {/* SERVICES */}
      <section className="bg-dark overflow-hidden relative">

        {/* Foto — desktop */}
        <div className="hidden md:block absolute right-0 top-0 w-[62%] h-full overflow-hidden">
          <img src="/services-photo.webp" alt="" className="absolute inset-0 w-full h-full object-cover object-left" loading="lazy" aria-hidden="true"
            style={{ maskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.05) 15%, rgba(0,0,0,0.3) 30%, #000 55%, #000 100%)', WebkitMaskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.05) 15%, rgba(0,0,0,0.3) 30%, #000 55%, #000 100%)' }} />
        </div>
        {/* Foto — mobile: 100% ancho con degradado de der a izq */}
        <div className="md:hidden absolute inset-0 w-full h-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-l from-dark/60 via-dark/20 to-transparent z-10" />
          <img src="/services-photo.webp" alt="" className="absolute inset-0 w-full h-full object-cover object-right" loading="lazy" aria-hidden="true"
            style={{ maskImage: 'linear-gradient(to left, #000 0%, #000 25%, transparent 80%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to left, #000 0%, #000 25%, transparent 80%, transparent 100%)' }} />
        </div>

        <div className="relative flex flex-col md:flex-row">

          {/* LEFT — list */}
          <div className="w-full md:w-1/2 px-6 md:px-14 lg:px-16 flex flex-col justify-center py-14 lg:py-20">

            {/* Header */}
            <div className="scroll-reveal mb-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="h-[3px] w-10 bg-samred" />
                <span className="font-sub font-semibold text-[0.82rem] uppercase tracking-widest text-samred">Lo que hacemos</span>
              </div>
              <h2 className="font-display text-[2.25rem] md:text-[2.75rem] text-white leading-none">NUESTROS<br />SERVICIOS</h2>
            </div>

            <div className="stagger divide-y divide-white/10">
              {SERVICES.map((s, i) => (
                <div key={s.title} className="group flex items-start gap-5 py-3.5 cursor-pointer transition-all duration-300" onClick={() => navigateToServicios(s.title)}>
                  <span className="font-mono text-[0.78rem] text-white/25 group-hover:text-samred pt-1 transition-colors duration-300 flex-shrink-0 w-5">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="text-white/30 group-hover:text-samred transition-colors duration-300 flex-shrink-0 mt-0.5">
                    {s.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-sub font-bold text-[0.9375rem] uppercase tracking-wider text-white/80 group-hover:text-white transition-colors duration-300 mb-0.5">{s.title}</h3>
                    <p className="text-white/40 text-[0.9rem] leading-relaxed group-hover:text-white/55 transition-colors duration-300 hidden md:block">{s.desc}</p>
                  </div>
                  <div className="flex-shrink-0 mt-1 opacity-0 group-hover:opacity-100 translate-x-[-4px] group-hover:translate-x-0 transition-all duration-300">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 7h12M8 3l5 4-5 4" stroke="#C8102E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA — portafolio */}
            <div className="mt-8 scroll-reveal">
              <button
                onClick={() => setPage('proyectos')}
                className="group inline-flex items-center gap-3 bg-samred text-white font-sub font-bold text-[0.8rem] tracking-[0.18em] uppercase px-8 py-4 rounded transition-all hover:bg-red-700 active:scale-[0.97]"
              >
                Ver Portafolio
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* RIGHT — empty spacer for desktop layout balance */}
          <div className="hidden md:block md:w-1/2" />

        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section className="bg-white px-6 md:px-14 lg:px-20">
        <style>{`
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 stagger">
            {featured.filter(Boolean).map((p) => (
              <div
                key={p.id}
                className="featured-card group relative rounded overflow-hidden cursor-pointer"
                style={{ minHeight: 'clamp(180px,25vw,260px)', height: 'clamp(180px,25vw,260px)' }}
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

          {/* Spacer */}
          <div />

          {/* Bottom: title left + stats */}
          <div className="flex flex-col gap-6">
            <h1 className="font-display text-[clamp(2rem,5vw,4.5rem)] text-white leading-none w-full">ALGUNOS DE<br />NUESTROS PROYECTOS</h1>
            <div className="flex gap-5 md:gap-10 border-t border-white/10 pt-5">
            {[['250+','Proyectos'], ['6','Divisiones'], ['60','Años']].map(([v,l]) => (
              <div key={l}>
                <p className="font-display text-xl md:text-3xl text-samred leading-none">{v}</p>
                <p className="font-sub text-[0.82rem] md:text-[0.9rem] uppercase tracking-widest text-white/35 mt-0.5">{l}</p>
              </div>
            ))}
          </div>
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
            {activeDivision === 'Todos' ? `250+ proyectos totales` : `${counts[activeDivision]||0} proyectos`}
          </span>
        </div>

        {/* Divisiones — scroll horizontal en mobile, grid en desktop */}
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-0 border-t border-white/10">

          {/* TODOS */}
          <button
            onClick={() => setActiveDivision('Todos')}
            className={`group relative overflow-hidden transition-all duration-300 ${activeDivision==='Todos' ? 'opacity-100' : 'opacity-60 hover:opacity-90'}`}
            style={{ height: 'clamp(110px,18vw,260px)' }}
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
            const isActive = activeDivision === key
            return (
              <button key={key}
                onClick={() => setActiveDivision(key)}
                className={`group relative overflow-hidden transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-55 hover:opacity-90'}`}
                style={{ height: 'clamp(110px,18vw,260px)' }}
              >
                <img src={m.img} alt={key} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06]" loading="lazy" />
                <div className={`absolute inset-0 transition-all duration-300 ${isActive ? 'bg-dark/40' : 'bg-dark/75 group-hover:bg-dark/50'}`} />
                {/* Top accent when active */}
                {isActive && <div className="absolute top-0 left-0 right-0 h-[3px] bg-samred" />}
                {/* Bottom content */}
                <div className="absolute inset-0 flex flex-col items-start justify-end p-2 sm:p-4">
                  <div className={`mb-1 sm:mb-2 transition-colors duration-300 ${isActive ? 'text-samred' : 'text-white/50 group-hover:text-white/80'}`} style={{transform:'scale(0.8) sm:scale(1)',transformOrigin:'left bottom'}}>{m.icon}</div>
                  <p className={`font-display text-[0.65rem] sm:text-[0.95rem] leading-none mb-0.5 sm:mb-1 transition-colors duration-300 ${isActive ? 'text-white' : 'text-white/80 group-hover:text-white'}`}>
                    {m.label.replace('Proyectos ', '').replace('División ', '').replace('Servicios ', '').toUpperCase()}
                  </p>
                </div>
                {/* Right border separator */}
                {i < 5 && <div className="absolute top-0 right-0 w-px h-full bg-white/10" />}
              </button>
            )
          })}
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
                {activeDivision === 'Todos' ? 'ALGUNOS DE NUESTROS PROYECTOS' : DIVISION_META[activeDivision]?.label?.toUpperCase()}
              </h3>
              <span className="font-mono text-xs text-white/30 ml-1"></span>
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
          <div className="md:hidden overflow-hidden relative">
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
          <div className="hidden md:block overflow-hidden relative"
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

function useGsapReveal(ref, delay = 0) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 0.9,
            delay,
            ease: 'power3.out',
          })
          io.unobserve(el)
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [ref, delay])
}

function PageQuienesSomos({ setPage }) {
  useScrollReveal()
  const heroRef = useRef(null)
  const aboutTextRef = useRef(null)
  const ventajasRef = useRef(null)
  const timelineRef = useRef(null)

  // Hero stagger
  useEffect(() => {
    const els = heroRef.current?.querySelectorAll('.hero-item')
    if (!els) return
    gsap.fromTo(els, { opacity: 0, y: 40 }, {
      opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
      stagger: 0.12, delay: 0.3,
    })
  }, [])

  
  // About text stagger
  useEffect(() => {
    const els = aboutTextRef.current?.querySelectorAll('.about-item')
    if (!els) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gsap.to(els, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.1 })
          io.unobserve(entry.target)
        }
      },
      { threshold: 0.15 },
    )
    if (aboutTextRef.current) io.observe(aboutTextRef.current)
    return () => io.disconnect()
  }, [])

  // Ventajas stagger
  useEffect(() => {
    const els = ventajasRef.current?.querySelectorAll('.ventaja-item')
    if (!els) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gsap.to(els, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.08 })
          io.unobserve(entry.target)
        }
      },
      { threshold: 0.1 },
    )
    if (ventajasRef.current) io.observe(ventajasRef.current)
    return () => io.disconnect()
  }, [])

  // Timeline stagger
  useEffect(() => {
    const els = timelineRef.current?.querySelectorAll('.timeline-item')
    if (!els) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gsap.fromTo(els,
            { opacity: 0, x: -20 },
            { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out', stagger: 0.1 },
          )
          io.unobserve(entry.target)
        }
      },
      { threshold: 0.05 },
    )
    if (timelineRef.current) io.observe(timelineRef.current)
    return () => io.disconnect()
  }, [])

  return (
    <div className="pt-24">

      {/* ── HERO — con GSAP stagger ── */}
      <section ref={heroRef} className="relative overflow-hidden" style={{ height: '100dvh' }}>
        <div className="absolute inset-0">
          <img src="/qs-hero.webp" alt="Equipo SAMFOR" className="absolute inset-0 w-full h-full object-cover object-center" loading="eager" />
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(135deg, rgba(13,17,23,0.92) 0%, rgba(13,17,23,0.50) 50%, rgba(200,16,46,0.15) 100%)',
          }} />
        </div>
        <div className="relative h-full flex flex-col justify-end px-5 sm:px-8 md:px-16 lg:px-24 pb-10 md:pb-16 lg:pb-20">
          <div className="max-w-3xl">
            <div className="hero-item" style={{ opacity: 0 }}>
              <div className="flex items-center gap-3 mb-4">
                <span className="h-[3px] w-10 bg-samred" />
                <span className="font-sub font-semibold text-[0.85rem] uppercase tracking-[0.25em] text-white/55">Nuestra empresa &middot; Desde 1966</span>
              </div>
            </div>
            <h1 className="hero-item font-display text-[clamp(2.2rem,6vw,6rem)] text-white leading-none tracking-wide mb-5" style={{ opacity: 0 }}>
              UNA EMPRESA.<br />
              <span className="text-samred">SEIS DÉCADAS.</span><br />
              UN ESTÁNDAR.
            </h1>
            <p className="hero-item text-white/65 text-base md:text-lg max-w-xl leading-relaxed mb-8" style={{ opacity: 0 }}>
              Construyendo Venezuela con excelencia técnica, responsabilidad ambiental y el más alto compromiso con la seguridad industrial.
            </p>
          </div>
        </div>
        <div className="absolute bottom-7 right-8 flex flex-col items-center gap-1.5 opacity-30">
          <div className="w-[1px] h-10 bg-white animate-pulse" />
          <span className="font-mono text-[0.65rem] uppercase tracking-widest text-white rotate-90 translate-x-3">scroll</span>
        </div>
      </section>

      {/* ── QUIÉNES SOMOS ── */}
      <section className="relative overflow-hidden bg-dark">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-samred/30 to-transparent" />

        {/* Mobile: stacked */}
        <div className="md:hidden">
          <div className="relative" style={{ minHeight: '300px' }}>
            <img src="/qs-team-img2.jpg" alt="Equipo SAMFOR" className="absolute inset-0 w-full h-full object-cover object-center" loading="lazy" />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(13,17,23,0.10) 0%, rgba(13,17,23,0.60) 50%, #0D1117 100%)' }} />
            <div className="relative px-5 pt-14 pb-8 flex flex-col justify-end h-full">
              <div className="flex items-center gap-3 mb-3">
                <span className="h-[2px] w-6 bg-samred" />
                <span className="font-sub font-semibold text-[0.7rem] uppercase tracking-[0.25em] text-samred">Quiénes Somos</span>
              </div>
              <h2 className="font-display text-[2.6rem] text-white leading-none mb-1">SAMFOR</h2>
              <span className="text-samred font-display text-[1.5rem] leading-none">S.A.</span>
            </div>
          </div>
          <div className="bg-white px-5 py-10">
            <p className="text-dark/70 text-[1.05rem] leading-relaxed mb-5">
              Somos una empresa venezolana fundada en <span className="text-dark font-semibold">1966 en Maracaibo</span>, dedicada a la prestación de servicios de construcción civil, eléctrica, mecánica, telecomunicaciones, transporte y servicios ambientales para la industria petrolera, petroquímica, carbonífera y civil.
            </p>
            <p className="text-dark/55 text-[1rem] leading-relaxed mb-8">
              Con casi seis décadas de operación continua, contamos con la infraestructura, el capital humano y los estándares certificados para ejecutar proyectos de alta complejidad en cualquier punto del territorio nacional.
            </p>
            {/* Valores con borde izquierdo — like desktop */}
            <div className="flex flex-col gap-4">
              {[
                { label: 'Lealtad', desc: 'Compromiso con clientes, colaboradores y el pa\u00eds.' },
                { label: 'Responsabilidad', desc: 'Cumplimiento técnico, ambiental y de seguridad.' },
                { label: 'Respeto', desc: 'Cada persona tratada con máxima dignidad.' },
              ].map((v) => (
                <div key={v.label} className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-[3px] h-8 self-stretch bg-samred rounded" />
                  <div>
                    <span className="font-sub font-bold text-sm uppercase tracking-widest text-dark">{v.label}</span>
                    <span className="text-secondary text-sm ml-2">{v.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Desktop: modern split */}
        <div className="hidden md:grid md:grid-cols-2 lg:min-h-[85vh]">
          {/* Left: Texto */}
          <div className="bg-white flex items-center px-8 md:px-12 lg:px-16 py-12 md:py-16 lg:py-20">
            <div ref={aboutTextRef} className="max-w-lg">
              <div className="about-item flex items-center gap-3 mb-6" style={{ opacity: 0 }}>
                <span className="h-[3px] w-10 bg-samred" />
                <span className="font-sub font-semibold text-[0.85rem] uppercase tracking-[0.2em] text-samred">Quiénes Somos</span>
              </div>
              <h2 className="about-item font-display text-[clamp(2.5rem,4vw,3.75rem)] text-dark leading-none mb-8" style={{ opacity: 0 }}>
                SAMFOR,<br />S.A.
              </h2>
              <p className="about-item text-dark/70 text-[1.1rem] leading-relaxed mb-6" style={{ opacity: 0 }}>
                Somos una empresa venezolana fundada en <span className="text-dark font-semibold">1966 en Maracaibo</span>, dedicada a la prestación de servicios de construcción civil, eléctrica, mecánica, telecomunicaciones, transporte y servicios ambientales para la industria petrolera, petroquímica, carbonífera y civil.
              </p>
              <p className="about-item text-dark/55 text-[1.05rem] leading-relaxed mb-10" style={{ opacity: 0 }}>
                Con casi seis décadas de operación continua, contamos con la infraestructura, el capital humano y los estándares certificados para ejecutar proyectos de alta complejidad en cualquier punto del territorio nacional.
              </p>
              <div className="about-item flex flex-col gap-4" style={{ opacity: 0 }}>
                {[
                  { label: 'Lealtad', desc: 'Compromiso con clientes, colaboradores y el pa\u00eds.' },
                  { label: 'Responsabilidad', desc: 'Cumplimiento técnico, ambiental y de seguridad.' },
                  { label: 'Respeto', desc: 'Cada persona tratada con máxima dignidad.' },
                ].map((v) => (
                  <div key={v.label} className="group flex items-start gap-4 cursor-default">
                    <span className="flex-shrink-0 w-[3px] h-8 self-stretch bg-samred rounded" />
                    <div>
                      <span className="font-sub font-bold text-sm uppercase tracking-widest text-dark">{v.label}</span>
                      <span className="text-secondary text-sm ml-2">{v.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Imagen + 3D Cube */}
          <div className="relative overflow-hidden">
            <img src="/qs-team-img2.jpg" alt="Equipo SAMFOR" className="absolute inset-0 w-full h-full object-cover object-center" loading="lazy" />
            <div className="absolute inset-0" style={{
              background: 'linear-gradient(112deg, rgba(13,17,23,0.60) 0%, rgba(13,17,23,0.25) 50%, rgba(200,16,46,0.12) 100%)',
            }} />
            <div className="absolute inset-0 bg-gradient-to-t from-dark/70 via-transparent to-transparent" />
            {/* Desktop: modern split */}
            <div className="absolute bottom-0 left-0 right-0 h-[4px] bg-samred" />
            <div className="absolute top-8 right-8 bg-dark/60 backdrop-blur-md border border-white/10 rounded-full px-5 py-2">
              <span className="font-sub font-bold text-xs uppercase tracking-widest text-samred">Fundada 1966</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── MISIÓN / VISIÓN — tarjetas con gradiente ── */}
      <section className="relative bg-dark py-12 md:py-24 px-5 md:px-16 lg:px-24 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }} />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="scroll-reveal flex items-center gap-3 mb-10 md:mb-16">
            <span className="h-[3px] w-10 bg-samred" />
            <span className="font-sub font-semibold text-[0.85rem] uppercase tracking-[0.2em] text-samred">Identidad corporativa</span>
          </div>

          {/* Mobile */}
          <div className="md:hidden flex flex-col gap-4">
            {[
              { num: '01', title: 'MISIÓN', body: 'Ejecutar de manera rentable y eficiente, en armon\u00eda con el ambiente, obras y servicios de construcción civil, eléctrica, telecomunicación, transporte y servicios ambientales, asegurando la satisfacción del cliente y el desarrollo del talento humano.' },
              { num: '02', title: 'VISIÓN', body: 'Ser una empresa líder en Construcción, Transporte y Servicios Ambientales, reconocida por su excelencia, calidad de servicios, solidez del equipo humano y compromiso con el desarrollo sostenible de Venezuela.' },
              { num: '03', title: 'VALORES', body: 'Lealtad, Responsabilidad y Respeto a la Dignidad Humana son los pilares que gu\u00edan cada decisión, cada proyecto y cada relación con nuestros clientes, colaboradores y comunidades.' },
            ].map((c, i) => (
              <div key={c.num} className="mission-card relative group overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-6">
                <div className="absolute -right-6 -top-6 font-display text-[6rem] text-white/[0.03] leading-none select-none">{c.num}</div>
                <div className="flex items-center gap-3 mb-4">
                  <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-display text-sm ${i === 0 ? 'bg-samred text-white' : 'bg-white/10 text-samred'}`}>{c.num}</span>
                  <h3 className="font-display text-2xl text-white tracking-wide">{c.title}</h3>
                </div>
                <p className="text-white/55 text-[0.95rem] leading-relaxed pl-11">{c.body}</p>
              </div>
            ))}
          </div>

          {/* Desktop: 3 columnas */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {[
              { num: '01', title: 'MISIÓN', body: 'Ejecutar de manera rentable y eficiente, en armon\u00eda con el ambiente, obras y servicios de construcción civil, eléctrica, telecomunicación, transporte y servicios ambientales, asegurando la satisfacción del cliente y el desarrollo del talento humano.' },
              { num: '02', title: 'VISIÓN', body: 'Ser una empresa líder en Construcción, Transporte y Servicios Ambientales, reconocida por su excelencia, calidad de servicios, solidez del equipo humano y compromiso con el desarrollo sostenible de Venezuela.' },
              { num: '03', title: 'VALORES', body: 'Lealtad, Responsabilidad y Respeto a la Dignidad Humana son los pilares que gu\u00edan cada decisión, cada proyecto y cada relación con nuestros clientes, colaboradores y comunidades.' },
            ].map((c, i) => (
              <div key={c.num} className="mission-card relative group rounded-2xl border border-white/[0.06] bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-8 hover-card">
                <div className="absolute inset-0 bg-gradient-to-br from-samred/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                <span className="block font-mono text-[0.8rem] text-samred/50 tracking-widest mb-4 relative z-10">{c.num}</span>
                <div className="h-[2px] w-8 bg-samred mb-6 relative z-10" />
                <h3 className="font-display text-3xl text-white mb-5 relative z-10">{c.title}</h3>
                <p className="text-white/50 text-base leading-relaxed relative z-10">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VENTAJAS COMPETITIVAS ── */}
      <section className="bg-surface">
        {/* Mobile */}
        <div className="md:hidden">
          <div className="relative overflow-hidden" style={{ height: 'clamp(110px,18vw,260px)' }}>
            <img src="/qs-electrical.webp" alt="Técnicos eléctricos SAMFOR" className="absolute inset-0 w-full h-full object-cover object-center" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-dark/20" />
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-samred" />
            <div className="absolute bottom-6 left-5">
              <div className="font-sub font-bold text-[0.72rem] uppercase tracking-widest text-samred mb-0.5">Certificación</div>
              <div className="text-white text-sm font-medium">Manejadora de Desechos Peligrosos &middot; 1999</div>
            </div>
          </div>
          <div ref={ventajasRef} className="px-5 py-10">
            <div className="flex items-center gap-3 mb-5">
              <span className="h-[3px] w-8 bg-samred" />
              <span className="font-sub font-semibold text-[0.78rem] uppercase tracking-[0.2em] text-samred">Por qué elegirnos</span>
            </div>
            <h2 className="font-display text-[2.5rem] text-dark leading-none mb-8">VENTAJAS<br /><span className="text-samred">COMPETITIVAS</span></h2>
            <div className="flex flex-col gap-0">
              {[
                { icon: Target, title: 'Capacidad Operativa', desc: 'Flota de veh\u00edculos, equipos pesados, maquinaria y aeronave.' },
                { icon: CheckCircle, title: 'Calidad Certificada', desc: 'Estándares IPC internacionales. Cert. Desechos Peligrosos 1999.' },
                { icon: Users, title: 'Capital Humano', desc: 'Ingenieros en eléctrica, civil, mec\u00e1nica, instrumentación y ambiental.' },
                { icon: Shield, title: 'HSE / Seguridad', desc: 'Cultura HSE arraigada. Normativas COVENIN en entornos de riesgo.' },
              ].map((a, i) => (
                <div key={i} className="ventaja-item flex items-start gap-4 py-5 border-b border-border last:border-0" style={{ opacity: 0 }}>
                  <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-samred/10 flex items-center justify-center text-samred"><a.icon size={22} /></div>
                  <div>
                    <h3 className="font-sub font-bold text-[0.92rem] uppercase tracking-wide text-dark mb-1">{a.title}</h3>
                    <p className="text-secondary text-[0.9rem] leading-relaxed">{a.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Desktop */}
        <div className="hidden md:grid md:grid-cols-2 lg:min-h-[75vh]">
          <div className="relative overflow-hidden order-2 lg:order-1" style={{ minHeight: '300px' }}>
            <img src="/qs-electrical.webp" alt="Técnicos eléctricos SAMFOR" className="absolute inset-0 w-full h-full object-cover object-center" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-dark/20" />
            <div className="absolute top-0 left-0 bottom-0 w-[4px] bg-samred" />
            <div className="absolute bottom-8 left-8 bg-dark/75 backdrop-blur-sm border border-white/10 px-5 py-3 rounded">
              <div className="font-sub font-bold text-xs uppercase tracking-widest text-samred mb-0.5">Certificación</div>
              <div className="text-white text-sm font-medium">Manejadora de Desechos Peligrosos</div>
              <div className="text-white/40 text-xs font-mono mt-0.5">Ministerio del Ecosistema &middot; 1999</div>
            </div>
          </div>
          <div className="bg-surface flex items-center px-8 md:px-12 lg:px-16 py-12 md:py-16 lg:py-20 order-1 lg:order-2">
            <div ref={ventajasRef} className="w-full max-w-lg">
              <div className="flex items-center gap-3 mb-6">
                <span className="h-[3px] w-10 bg-samred" />
                <span className="font-sub font-semibold text-[0.85rem] uppercase tracking-[0.2em] text-samred">Por qué elegirnos</span>
              </div>
              <h2 className="font-display text-[clamp(2rem,3.5vw,3rem)] text-dark leading-none mb-10">VENTAJAS<br />COMPETITIVAS</h2>
              <div className="flex flex-col gap-0 divide-y divide-border">
                {[
                  { icon: Target, title: 'Capacidad Operativa', desc: 'Flota completa de veh\u00edculos, equipos pesados, maquinaria y aeronave para proyectos en todo el territorio.' },
                  { icon: CheckCircle, title: 'Calidad Certificada', desc: 'Procesos IPC bajo estándares internacionales. Certificación como Manejadora de Desechos Peligrosos desde 1999.' },
                  { icon: Users, title: 'Capital Humano', desc: 'Ingenieros y técnicos en eléctrica, civil, mec\u00e1nica, instrumentación, telecomunicaciones y ambiental.' },
                  { icon: Shield, title: 'HSE / Seguridad', desc: 'Cultura HSE arraigada. Operaciones en entornos de alto riesgo con cumplimiento de normativas COVENIN.' },
                ].map((a, i) => (
                  <div key={i} className="ventaja-item flex gap-5 py-6 group" style={{ opacity: 0 }}>
                    <div className="flex-shrink-0 w-10 h-10 rounded bg-white border border-border flex items-center justify-center text-samred group-hover:bg-samred group-hover:text-white group-hover:border-samred transition-all duration-300"><a.icon size={20} /></div>
                    <div>
                      <h3 className="font-sub font-bold text-base uppercase tracking-wide text-dark mb-1">{a.title}</h3>
                      <p className="text-secondary text-base leading-relaxed">{a.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HISTORIA — timeline lateral ── */}
      <section className="bg-white py-12 md:py-24 px-5 md:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="scroll-reveal mb-10 md:mb-14">
            <div className="flex items-center gap-3 mb-4">
              <span className="h-[3px] w-10 bg-samred" />
              <span className="font-sub font-semibold text-[0.85rem] uppercase tracking-[0.2em] text-samred">Historia</span>
            </div>
            <h2 className="font-display text-[clamp(2.5rem,5vw,4rem)] text-dark leading-none">NUESTRA<br />TRAYECTORIA</h2>
          </div>

          {/* Mobile */}
          <div className="md:hidden">
            <div className="scroll-reveal relative w-full rounded-2xl overflow-hidden mb-8 shadow-xl">
              <div className="relative w-full" style={{ minHeight: 'clamp(280px,50vw,420px)' }}>
                <img src="/projects/samfor-inicios.jpg" alt="Inicios de SAMFOR" className="absolute inset-0 w-full h-full object-cover object-center" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 h-[4px] bg-samred" />
                <div className="absolute bottom-8 left-8 md:bottom-10 md:left-12">
                  <div className="flex items-center gap-2.5 mb-2">
                    <span className="w-2 h-2 rounded-full bg-samred" />
                    <span className="font-mono text-[0.7rem] uppercase tracking-[0.25em] text-white/50">Archivo histórico</span>
                  </div>
                  <p className="text-white text-lg font-display tracking-wide">Inicios de SAMFOR &middot; Maracaibo, 1966</p>
                </div>
              </div>
            </div>
            <div ref={timelineRef} className="flex flex-col gap-5">
              {TIMELINE.map((item, i) => (
                <div key={i} className="timeline-item relative group" style={{ opacity: 0 }}>
                  {i < TIMELINE.length - 1 && (
                    <div className="absolute left-[1.1rem] top-10 bottom-0 w-[2px] bg-gradient-to-b from-samred via-samred/30 to-transparent" />
                  )}
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 relative z-10 mt-1">
                      <div className={`w-[1.375rem] h-[1.375rem] rounded-full border-2 flex items-center justify-center transition-all duration-300 ${i === 0 ? 'bg-samred border-samred shadow-[0_0_0_4px_rgba(200,16,46,0.15)]' : 'bg-white border-samred/40 group-hover:border-samred group-hover:shadow-[0_0_0_4px_rgba(200,16,46,0.1)]'}`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${i === 0 ? 'bg-white' : 'bg-samred/60 group-hover:bg-samred'}`} />
                      </div>
                    </div>
                    <div className={`flex-1 rounded-xl border p-4 transition-all duration-300 ${i === 0 ? 'bg-samred/5 border-samred/20' : 'bg-white border-gray-200 hover:border-samred/30 hover:shadow-md'}`}>
                      <span className={`font-display text-lg leading-none mb-2 block ${i === 0 ? 'text-samred' : 'text-dark/30'}`}>{item.year}</span>
                      <h3 className={`font-sub font-bold text-sm uppercase tracking-wide mb-1.5 ${i === 0 ? 'text-samred' : 'text-dark'}`}>{item.title}</h3>
                      <p className="text-secondary text-[0.88rem] leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop: split - foto sticky + timeline */}
          <div className="hidden md:grid md:grid-cols-[1fr_1.8fr] md:gap-12 lg:gap-16 items-start">
            <div className="sticky top-32">
              <div className="scroll-reveal relative rounded-2xl overflow-hidden shadow-xl hover-card" style={{ height: 'clamp(400px,42vw,600px)' }}>
                <img src="/projects/samfor-inicios.jpg" alt="Inicios de SAMFOR" className="absolute inset-0 w-full h-full object-cover object-center" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/85 via-dark/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 h-[4px] bg-samred" />
                <div className="absolute bottom-7 left-7">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2 h-2 rounded-full bg-samred" />
                    <span className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-white/45">Archivo histórico</span>
                  </div>
                  <p className="text-white text-xl font-display tracking-wide">Inicios de SAMFOR<br />Maracaibo, 1966</p>
                </div>
              </div>
            </div>

            <div ref={timelineRef} className="relative pl-8 lg:pl-12">
              <div className="absolute left-0 top-2 bottom-2 w-[3px] bg-gradient-to-b from-samred via-samred/30 to-samred/10 rounded-full" />

              {TIMELINE.map((item, i) => (
                <div key={i} className="timeline-item relative pb-12 last:pb-0" style={{ paddingLeft: '2rem', opacity: 0 }}>
                  <div className="absolute left-[-7.5px] top-1 z-10">
                    <div className={`w-[18px] h-[18px] rounded-full border-[3px] transition-all duration-300 ${
                      i === 0
                        ? 'bg-samred border-samred shadow-[0_0_0_8px_rgba(200,16,46,0.12)]'
                        : 'bg-white border-samred/30'
                    }`} />
                  </div>

                  <span className={`font-display text-[2.2rem] lg:text-[2.8rem] leading-none tracking-tight block mb-3 ${
                    i === 0 ? 'text-samred' : 'text-dark/10'
                  }`}>
                    {item.year}
                  </span>

                  <div className={`relative rounded-xl border-2 p-5 lg:p-6 transition-all duration-300 hover-card ${
                    i === 0
                      ? 'border-samred/20 bg-gradient-to-br from-samred/[0.03] to-white shadow-lg'
                      : 'border-gray-100 bg-white hover:border-samred/20 hover:shadow-lg'
                  }`}>
                    <div className={`absolute top-0 left-0 right-0 h-[3px] rounded-t-xl ${
                      i === 0 ? 'bg-samred' : 'bg-gradient-to-r from-samred/50 via-samred/20 to-transparent'
                    }`} />

                    <h3 className={`font-sub font-bold text-base uppercase tracking-wide mb-2 ${
                      i === 0 ? 'text-samred' : 'text-dark'
                    }`}>
                      {item.title}
                    </h3>
                    <p className="text-secondary text-[0.95rem] leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CLIENTES ── */}
      <section className="bg-dark py-16 md:py-24 px-5 md:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="scroll-reveal mb-10 md:mb-14 text-center md:text-left">
            <div className="flex items-center gap-3 mb-4 justify-center md:justify-start">
              <span className="h-[3px] w-10 bg-samred" />
              <span className="font-sub font-semibold text-[0.85rem] uppercase tracking-[0.2em] text-samred">Clientes</span>
            </div>
            <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] text-white leading-none">HAN CONFIADO EN <span className="text-samred">NOSOTROS</span></h2>
            <p className="text-zinc-400 text-base mt-3 max-w-lg mx-auto md:mx-0">Más de 50 clientes institucionales nacionales e internacionales avalan nuestra trayectoria.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
            {CLIENT_GRID.map((c, i) => (
              <ClientCard key={c.name + i} c={c} />
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
// ─── CONTACTO ─────────────────────────────────────────────────────────────────
function PageContacto() {
  const [form, setForm] = useState({ nombre: '', email: '', asunto: '', mensaje: '' })
  const [sent, setSent] = useState(false)
  const [cvFile, setCvFile] = useState(null)
  const [cvSent, setCvSent] = useState(false)
  const [cvForm, setCvForm] = useState({ nombre: '', email: '', telefono: '', cargo: '' })
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })
  const handleSubmit = (e) => { e.preventDefault(); setSent(true) }
  const handleCvChange = (e) => setCvForm({ ...cvForm, [e.target.name]: e.target.value })
  const handleCvSubmit = (e) => { e.preventDefault(); setCvSent(true) }

  const CONTACT_INFO = [
    { icon: <MapPin size={18} />, label: 'Dirección', value: 'Av. 3H entre Calles 68-70 N.69-61, Maracaibo, Venezuela' },
    { icon: <Phone size={18} />, label: 'Teléfono', value: '+58 261 814 4444 / +58 414-615.8000' },
    { icon: <Mail size={18} />, label: 'Email', value: 'samfor@samfor.com' },
    { icon: <Clock size={18} />, label: 'Horario', value: 'Lun–Vie 7:00 AM – 4:30 PM' },
  ]

  return (
    <div className="bg-[#0D1117] pt-24">

      {/* ── HERO — full screen ── */}
      <section className="relative h-screen min-h-[500px] overflow-hidden">
        <img src="/ct-hero.webp" alt="Contacto SAMFOR" className="absolute inset-0 w-full h-full object-cover object-center" loading="eager" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D1117]/70 via-[#0D1117]/30 to-[#0D1117]/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D1117]/50 via-transparent to-[#0D1117]/20" />
        <div className="relative h-full flex flex-col justify-center px-6 md:px-16 lg:px-24">
          <div className="flex items-center gap-3 mb-5">
            <span className="h-[3px] w-10 bg-samred" />
            <span className="font-sub font-semibold text-[0.8rem] uppercase tracking-[0.25em] text-white/55">Comunícate con nosotros</span>
          </div>
          <h1 className="font-display text-[clamp(3.2rem,8vw,7rem)] text-white leading-none tracking-wide">
            <span className="text-samred">Contáct</span>anos
          </h1>
          <p className="text-white/60 text-base md:text-lg max-w-lg mt-5 leading-relaxed">
            Estamos listos para tu próximo proyecto. Hablemos.
          </p>
        </div>
      </section>

      {/* ── CONTACT INFO + FORM ── */}
      <section className="relative py-20 md:py-28 px-6 md:px-16 lg:px-24">
        {/* bg subtle texture */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 30% 40%, #991b1b 0%, transparent 60%)' }} />
        <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-start">

          {/* LEFT — redesigned info */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="h-[2px] w-8 bg-samred" />
              <span className="font-sub font-semibold text-[0.7rem] uppercase tracking-[0.25em] text-samred">Información</span>
            </div>
            <h2 className="font-display text-3xl md:text-5xl text-white mb-4 tracking-tight leading-tight">Hablemos de tu <span className="text-samred">proyecto</span></h2>
            <p className="text-zinc-400 text-base md:text-lg max-w-md mb-12 leading-relaxed">
              Cuéntanos sobre tu proyecto y uno de nuestros especialistas te contactará en las próximas 24 horas.
            </p>

            {/* Info cards — redesigned */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-12">
              {CONTACT_INFO.map((item) => (
                <div key={item.label} className="group relative overflow-hidden rounded-xl p-5 transition-all duration-300 hover:-translate-y-0.5"
                  style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div className="absolute top-0 left-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: 'linear-gradient(135deg, rgba(153,27,27,0.08) 0%, transparent 60%)' }} />
                  <div className="relative">
                    <div className="w-10 h-10 rounded-lg bg-samred/15 flex items-center justify-center text-samred mb-4 group-hover:bg-samred/25 group-hover:scale-105 transition-all duration-300">
                      {item.icon}
                    </div>
                    <div className="font-sub text-[0.65rem] uppercase tracking-[0.2em] text-zinc-400 mb-1.5">{item.label}</div>
                    <div className="text-white text-sm leading-relaxed font-medium">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Replacement image — industrial aesthetic */}
            <div className="relative rounded-2xl overflow-hidden h-56 md:h-64 mb-6">
              <img src="/ct-turbina2.webp" alt="Instalaciones SAMFOR" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D1117]/70 via-[#0D1117]/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-2 text-white/80 text-sm">
                  <MapPin size={14} className="text-samred" />
                  <span>Maracaibo, Venezuela — Desde 1966</span>
                </div>
              </div>
            </div>

            {/* Social / extra links */}
            <div className="flex items-center gap-4">
              <span className="font-sub text-[0.65rem] uppercase tracking-[0.2em] text-zinc-500">Síguenos</span>
              <div className="flex gap-3">
                {[
                  <svg key="li" viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
                  <Globe key="gl" size={16} />,
                ].map((icon, i) => (
                  <a key={i} href="#" className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-zinc-400 hover:text-samred hover:border-samred/50 hover:bg-samred/10 transition-all duration-300">
                    {icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — form */}
          <div className="lg:sticky lg:top-28">
            {sent ? (
              <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-12 text-center">
                <div className="w-16 h-16 rounded-full bg-samred/20 flex items-center justify-center mx-auto mb-5">
                  <CheckCircle size={32} className="text-samred" />
                </div>
                <h3 className="text-white text-2xl font-display mb-2">Mensaje Enviado</h3>
                <p className="text-zinc-400 max-w-sm mx-auto">Gracias por contactarnos. Te responderemos a la brevedad posible.</p>
              </div>
            ) : (
              <div className="bg-white/[0.02] border border-white/[0.07] rounded-2xl p-8 md:p-10">
                <h3 className="font-display text-xl text-white mb-6">Envíanos un mensaje</h3>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <input name="nombre" placeholder="Nombre completo" value={form.nombre} onChange={handleChange} required
                      className="bg-zinc-900/60 border border-zinc-800 rounded-xl px-5 py-3.5 text-white placeholder-zinc-500 focus:outline-none focus:border-samred/50 transition-colors text-sm" />
                    <input name="email" type="email" placeholder="Correo electrónico" value={form.email} onChange={handleChange} required
                      className="bg-zinc-900/60 border border-zinc-800 rounded-xl px-5 py-3.5 text-white placeholder-zinc-500 focus:outline-none focus:border-samred/50 transition-colors text-sm" />
                  </div>
                  <input name="asunto" placeholder="Asunto" value={form.asunto} onChange={handleChange} required
                    className="w-full bg-zinc-900/60 border border-zinc-800 rounded-xl px-5 py-3.5 text-white placeholder-zinc-500 focus:outline-none focus:border-samred/50 transition-colors text-sm" />
                  <textarea name="mensaje" placeholder="Cuéntanos sobre tu proyecto..." rows={5} value={form.mensaje} onChange={handleChange} required
                    className="w-full bg-zinc-900/60 border border-zinc-800 rounded-xl px-5 py-3.5 text-white placeholder-zinc-500 focus:outline-none focus:border-samred/50 transition-colors text-sm resize-none" />
                  <button type="submit" className="w-full bg-samred hover:bg-red-500 text-white font-semibold rounded-xl px-8 py-3.5 transition-all text-base tracking-wide active:scale-[0.98]">
                    Enviar Mensaje
                  </button>
                </form>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* ── TRABAJA CON NOSOTROS — Postula tu CV ── */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <img src="/ct-jobs2.webp" alt="Trabaja en SAMFOR" className="absolute inset-0 w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0D1117]/92 via-[#0D1117]/75 to-[#0D1117]/80" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D1117]/60 via-transparent to-[#0D1117]/40" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 md:px-16 lg:px-24">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="h-[2px] w-8 bg-samred" />
              <span className="font-sub font-semibold text-[0.7rem] uppercase tracking-[0.25em] text-samred">Talento</span>
            </div>
            <h2 className="font-display text-3xl md:text-5xl text-white mb-4 tracking-tight leading-tight">
              Trabaja con <span className="text-samred">Nosotros</span>
            </h2>
            <p className="text-zinc-300 text-base max-w-lg mb-8 leading-relaxed">
              En SAMFOR buscamos profesionales comprometidos con la excelencia. Si quieres formar parte de nuestro equipo, postula tu CV y nos pondremos en contacto contigo.
            </p>

            {cvSent ? (
              <div className="bg-white/[0.05] border border-white/[0.1] rounded-2xl p-10 text-center max-w-md">
                <div className="w-14 h-14 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={28} className="text-green-400" />
                </div>
                <h3 className="text-white text-xl font-display mb-2">CV Recibido</h3>
                <p className="text-zinc-400 text-sm">Gracias por tu interés. Revisaremos tu perfil y te contactaremos si hay una oportunidad que se ajuste a tus habilidades.</p>
              </div>
            ) : (
              <form onSubmit={handleCvSubmit} className="space-y-4 max-w-lg">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input name="nombre" placeholder="Nombre completo" value={cvForm.nombre} onChange={handleCvChange} required
                    className="bg-[#0D1117]/50 border border-white/[0.12] rounded-xl px-5 py-3.5 text-white placeholder-zinc-500 focus:outline-none focus:border-samred/50 transition-colors text-sm backdrop-blur-sm" />
                  <input name="email" type="email" placeholder="Correo electrónico" value={cvForm.email} onChange={handleCvChange} required
                    className="bg-[#0D1117]/50 border border-white/[0.12] rounded-xl px-5 py-3.5 text-white placeholder-zinc-500 focus:outline-none focus:border-samred/50 transition-colors text-sm backdrop-blur-sm" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input name="telefono" placeholder="Teléfono" value={cvForm.telefono} onChange={handleCvChange} required
                    className="bg-[#0D1117]/50 border border-white/[0.12] rounded-xl px-5 py-3.5 text-white placeholder-zinc-500 focus:outline-none focus:border-samred/50 transition-colors text-sm backdrop-blur-sm" />
                  <input name="cargo" placeholder="Cargo de interés" value={cvForm.cargo} onChange={handleCvChange}
                    className="bg-black/50 border border-white/[0.12] rounded-xl px-5 py-3.5 text-white placeholder-zinc-500 focus:outline-none focus:border-samred/50 transition-colors text-sm backdrop-blur-sm" />
                </div>
                <div className="border border-dashed border-white/[0.15] rounded-xl p-6 text-center hover:border-samred/40 transition-colors cursor-pointer"
                  onClick={() => document.getElementById('cv-upload')?.click()}>
                  <input id="cv-upload" type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={(e) => setCvFile(e.target.files[0])} />
                  <Upload size={24} className="mx-auto mb-2 text-zinc-400" />
                  <div className="text-zinc-400 text-sm">
                    {cvFile ? (
                      <span className="text-samred font-medium">{cvFile.name}</span>
                    ) : (
                      <span>Haz clic para subir tu CV <span className="text-zinc-600">(PDF, DOC)</span></span>
                    )}
                  </div>
                </div>
                <button type="submit" className="w-full bg-samred hover:bg-red-500 text-white font-semibold rounded-xl px-8 py-3.5 transition-all text-base tracking-wide active:scale-[0.98] flex items-center justify-center gap-2">
                  <Briefcase size={16} />
                  Enviar Postulación
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
  const LOGO_SCROLL_END = 480
  const logoProgress = page === 'inicio' ? Math.min(rawScrollY / LOGO_SCROLL_END, 1) : 1

  const pages = {
    inicio: <PageInicio setPage={setPage} navigateToServicios={navigateToServicios} />,
    servicios: <PageServicios initialService={initialService} setPage={setPage} />,
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
