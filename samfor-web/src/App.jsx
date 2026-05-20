import { useState, useEffect, useRef } from 'react'
import {
  Zap, Building2, Settings, Truck, Leaf, Ship,
  ChevronRight, Menu, X, ArrowRight, MapPin, Phone, Mail, Globe,
  Upload, CheckCircle, Award, Target, Plus,
  Shield, Star, ChevronDown, Users, Wrench, LayoutGrid
} from 'lucide-react'

// ─── IMAGE MAP ────────────────────────────────────────────────────────────────
const IMG = (n) => `/projects/img-${String(n).padStart(3,'0')}.jpg`

// ─── CLASSIFICATION ───────────────────────────────────────────────────────────
// Matches the reference: Civiles / Mecánicos / Eléctricos / Transporte / Ambientales / Otras Divisiones
const DIVISION_META = {
  'Civiles':         { label: 'Proyectos Civiles',     icon: <Building2 size={16}/>,  color: 'bg-samblue/10 text-samblue border-samblue/30',       dot: '#1A6FB5' },
  'Mecánicos':       { label: 'Proyectos Mecánicos',   icon: <Wrench size={16}/>,     color: 'bg-orange-50 text-orange-700 border-orange-200',      dot: '#EA580C' },
  'Eléctricos':      { label: 'Proyectos Eléctricos',  icon: <Zap size={16}/>,        color: 'bg-yellow-50 text-yellow-700 border-yellow-200',      dot: '#CA8A04' },
  'Transporte':      { label: 'División Transporte',   icon: <Truck size={16}/>,      color: 'bg-purple-50 text-purple-700 border-purple-200',      dot: '#7C3AED' },
  'Ambientales':     { label: 'Servicios Ambientales', icon: <Leaf size={16}/>,       color: 'bg-green-50 text-green-700 border-green-200',         dot: '#16A34A' },
  'Otras':           { label: 'Otras Divisiones',      icon: <Ship size={16}/>,       color: 'bg-cyan-50 text-cyan-700 border-cyan-200',            dot: '#0891B2' },
}

// ─── DATA ────────────────────────────────────────────────────────────────────

const SERVICES = [
  { icon: <Zap size={28}/>, title: 'Obras Eléctricas', desc: 'Diseño y construcción de plantas eléctricas, subestaciones, tendido de alta tensión, automatización industrial y sistemas SCADA.' },
  { icon: <Building2 size={28}/>, title: 'Obras Civiles', desc: 'Movimiento de tierras, edificaciones, carreteras, puentes, muelles y construcción en plataformas petroleras y petroquímicas.' },
  { icon: <Settings size={28}/>, title: 'Obras Mecánicas', desc: 'Oleoductos, acueductos, tanques, estaciones de bombeo, instalación de tuberías y mantenimiento de facilidades de producción.' },
  { icon: <Truck size={28}/>, title: 'Transporte', desc: 'Transporte especializado de hidrocarburos, equipos industriales y personal. Cobertura terrestre, aérea y marítima en todo Venezuela.' },
  { icon: <Leaf size={28}/>, title: 'Servicios Ambientales', desc: 'Manejadora de Desechos Peligrosos autorizada desde 1999. Recolección, transporte, tratamiento y disposición final conforme a normativas.' },
  { icon: <Ship size={28}/>, title: 'Servicios Marítimos/Lacustres', desc: 'Operaciones en el Lago de Maracaibo, costas venezolanas y Archipiélago Los Monjes. Transporte hacia plataformas offshore con embarcaciones especializadas.' },
]

const METRICS = [
  { value: 59, suffix: '', label: 'Años de experiencia' },
  { value: 100, suffix: '+', label: 'Proyectos ejecutados' },
  { value: 20, suffix: '+', label: 'Clientes internacionales' },
  { value: 6, suffix: '', label: 'Líneas de servicio' },
]

const CLIENT_GRID = [
  { img: IMG(163), name: 'PDVSA', sector: 'Energía', bg: '#fff' },
  { img: IMG(183), name: 'Chevron', sector: 'Energía', bg: '#fff' },
  { img: IMG(179), name: 'Shell', sector: 'Energía', bg: '#000' },
  { img: IMG(171), name: 'Pequiven', sector: 'Petroquímica', bg: '#fff' },
  { img: IMG(181), name: 'Repsol', sector: 'Energía', bg: '#fff' },
  { img: IMG(185), name: 'Eni', sector: 'Energía', bg: '#FFD700' },
  { img: IMG(187), name: 'CNPC', sector: 'Energía', bg: '#fff' },
  { img: IMG(193), name: 'Baker Hughes', sector: 'Servicios', bg: '#000' },
  { img: IMG(206), name: 'WFP / ONU', sector: 'Internacional', bg: '#fff' },
  { img: IMG(211), name: 'UNHCR / ACNUR', sector: 'Internacional', bg: '#fff' },
  { img: IMG(219), name: 'Metro Maracaibo', sector: 'Transporte', bg: '#fff' },
  { img: IMG(245), name: 'VeneAcuícola', sector: 'Acuicultura', bg: '#fff' },
  { img: IMG(246), name: 'VeneShrimp', sector: 'Acuicultura', bg: '#fff' },
  { img: IMG(237), name: 'PetroCaribe', sector: 'Energía', bg: '#fff' },
  { img: IMG(177), name: 'Lagoven', sector: 'Energía', bg: '#fff' },
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
    detail: 'Más de 59 años de operaciones vinculadas con las costas venezolanas, el Lago de Maracaibo y el Archipiélago Los Monjes.',
  },
]

const TIMELINE = [
  { year: '1966', title: 'Fundación de SAMFOR', desc: 'Nace SAMFOR, S.A. en Maracaibo, Venezuela. Inicio de operaciones en la industria petrolera del Lago de Maracaibo.' },
  { year: '1980s', title: 'Expansión de Servicios', desc: 'Ampliación hacia obras civiles, mecánicas y telecomunicaciones. Consolidación como contratista integral del sector energético.' },
  { year: '1999', title: 'Autorización Ambiental', desc: 'Autorización del Ministerio del Ecosistema como Manejadora de Desechos Peligrosos. Nueva línea de negocios estratégica.' },
  { year: '2000s', title: 'Expansión Regional', desc: 'Contratos con Shell, Petrobras, Eni/Repsol y Cardón IV. Operaciones en Los Monjes y Campo Perla offshore.' },
  { year: '2015', title: 'Proyectos Hito', desc: 'Metro de Maracaibo, Gasoductos Anaco–Barquisimeto y contratos con WFP/UNHCR de Naciones Unidas.' },
  { year: '2025', title: '59 Años de Trayectoria', desc: 'Proyectos activos con Chevron y PDVSA. 59 años de excelencia técnica y compromiso con Venezuela.' },
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
    <div ref={ref} className="text-center px-5 py-7 flex-1 min-w-[130px]">
      <div className="font-display text-[3.5rem] md:text-[4rem] text-samred leading-none tabular-nums">{count}{suffix}</div>
      <div className="font-sub text-xs font-semibold uppercase tracking-widest text-secondary mt-2">{label}</div>
    </div>
  )
}

// ─── DIVISION BADGE ───────────────────────────────────────────────────────────
function DivisionBadge({ division, size = 'sm' }) {
  const m = DIVISION_META[division]
  if (!m) return null
  return (
    <span className={`inline-flex items-center gap-1 font-mono font-semibold rounded border px-2 py-0.5 ${m.color} ${size === 'xs' ? 'text-[0.6rem]' : 'text-xs'}`}>
      {m.icon}{m.label}
    </span>
  )
}

// ─── NAVBAR ───────────────────────────────────────────────────────────────────
function Navbar({ page, setPage, scrolled }) {
  const [open, setOpen] = useState(false)
  const links = [
    { id: 'inicio', label: 'Inicio' },
    { id: 'proyectos', label: 'Proyectos' },
    { id: 'quienes-somos', label: 'Quiénes Somos' },
    { id: 'contacto', label: 'Contacto' },
  ]
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)]' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        <button onClick={() => { setPage('inicio'); setOpen(false) }} className="flex items-center gap-2.5">
          <SamforLogo size={36} />
          <span className="font-display text-[1.6rem] text-dark tracking-wide leading-none">SAMFOR</span>
        </button>
        <div className="hidden md:flex items-center gap-7">
          {links.map(l => (
            <button key={l.id} onClick={() => setPage(l.id)}
              className={`nav-link font-sub font-semibold text-[0.8125rem] tracking-wider uppercase transition-colors ${page === l.id ? 'text-samred active' : 'text-dark hover:text-samred'}`}
              aria-current={page === l.id ? 'page' : undefined}
            >{l.label}</button>
          ))}
          <button onClick={() => setPage('contacto')} className="btn-outline-red text-[0.75rem] ml-1">Trabaja con Nosotros</button>
        </div>
        <button className="md:hidden p-2 text-dark" onClick={() => setOpen(!open)} aria-label="Menú">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-white border-t border-border px-5 pb-6 pt-2 shadow-lg">
          {links.map(l => (
            <button key={l.id} onClick={() => { setPage(l.id); setOpen(false) }}
              className={`block w-full text-left py-3.5 font-sub font-semibold text-base tracking-wider uppercase border-b border-border last:border-0 ${page === l.id ? 'text-samred' : 'text-dark'}`}
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
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-10 border-b border-white/10">
          <div>
            <div className="flex items-center gap-3 mb-4"><SamforLogo size={38} invert /><span className="font-display text-2xl tracking-wide">SAMFOR</span></div>
            <p className="text-white/55 text-sm leading-relaxed mb-5 max-w-xs">Construyendo Venezuela desde 1966. Empresa líder en construcción industrial, servicios petroleros y ambientales.</p>
          </div>
          <div>
            <h4 className="font-sub font-semibold text-xs uppercase tracking-widest text-white/40 mb-5">Navegación</h4>
            <div className="flex flex-col gap-2.5">
              {[['inicio','Inicio'],['proyectos','Proyectos'],['quienes-somos','Quiénes Somos'],['contacto','Contacto']].map(([id,label]) => (
                <button key={id} onClick={() => setPage(id)} className="text-left text-white/65 hover:text-white transition-colors text-sm">{label}</button>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-sub font-semibold text-xs uppercase tracking-widest text-white/40 mb-5">Contacto</h4>
            <div className="flex flex-col gap-3 text-sm text-white/65">
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

// ─── PROJECT MODAL ────────────────────────────────────────────────────────────
function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const h = e => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', h)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', h); document.body.style.overflow = '' }
  }, [onClose])

  return (
    <div className="modal-overlay fixed inset-0 z-[100] bg-dark/65 flex items-end md:items-center justify-center p-0 md:p-4" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-content bg-white w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-t-2xl md:rounded-lg" onClick={e => e.stopPropagation()}>
        <div className="relative h-48 md:h-56 overflow-hidden rounded-t-2xl md:rounded-t-lg">
          <img src={project.img} alt={project.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent" />
          <button onClick={onClose} className="absolute top-4 right-4 bg-white/15 backdrop-blur-sm text-white p-1.5 rounded-full hover:bg-white/25 transition-colors" aria-label="Cerrar">
            <X size={16} />
          </button>
          <div className="absolute bottom-4 left-5 right-5">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <DivisionBadge division={project.division} />
              {project.status === 'active' && (
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-green-600/90 px-2 py-0.5 rounded">
                  <span className="w-1.5 h-1.5 rounded-full bg-white dot-pulse" /> En Ejecución 2025
                </span>
              )}
            </div>
            <h3 className="font-display text-xl md:text-2xl text-white leading-tight">{project.title}</h3>
          </div>
        </div>
        <div className="p-6 md:p-8">
          <div className="mb-1 text-xs font-sub font-semibold uppercase tracking-widest text-samred">Cliente</div>
          <p className="font-semibold text-dark mb-5 text-sm">{project.client}</p>
          <div className="mb-2 text-xs font-sub font-semibold uppercase tracking-widest text-secondary">Descripción</div>
          <p className="text-secondary leading-relaxed mb-5 text-sm">{project.desc}</p>
          <div className="bg-surface rounded p-5">
            <div className="mb-2 text-xs font-sub font-semibold uppercase tracking-widest text-secondary">Alcance del Proyecto</div>
            <p className="text-secondary text-sm leading-relaxed">{project.detail}</p>
          </div>
        </div>
      </div>
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
        <p className="text-[0.6875rem] font-mono font-semibold text-secondary uppercase tracking-wide mb-1.5 line-clamp-1">{project.client}</p>
        <h3 className="font-sub font-bold text-sm text-dark mb-3 leading-snug line-clamp-2">{project.title}</h3>
        <p className="text-secondary text-xs leading-relaxed mb-3 line-clamp-2">{project.desc}</p>
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
function ClientsSection({ setPage }) {
  return (
    <section className="bg-white py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="scroll-reveal text-center mb-12">
          <div className="inline-flex items-center gap-2 text-samred text-xs font-sub font-semibold uppercase tracking-widest mb-3">
            <span className="h-px w-8 bg-samred" />Confían en nosotros<span className="h-px w-8 bg-samred" />
          </div>
          <h2 className="font-display text-[2.75rem] md:text-5xl text-dark tracking-wide">NUESTROS CLIENTES</h2>
          <p className="text-secondary text-base mt-3 max-w-md mx-auto leading-relaxed">
            Instituciones líderes del sector público, privado e internacional que confían en nuestra capacidad técnica.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
          {CLIENT_GRID.slice(0, 11).map((c, i) => (
            <div key={i} className="scroll-reveal group flex flex-col items-center border border-border rounded bg-white hover:border-samred/40 hover:shadow-[0_4px_20px_rgba(200,16,46,0.08)] transition-all duration-200 p-5" style={{ transitionDelay: `${(i % 8) * 40}ms` }}>
              <div className="w-full h-16 flex items-center justify-center rounded mb-3 overflow-hidden" style={{ background: c.bg || '#fff' }}>
                <img src={c.img} alt={c.name} className="max-h-12 max-w-[80%] object-contain" loading="lazy" />
              </div>
              <p className="font-sub font-bold text-xs uppercase tracking-wide text-dark text-center leading-tight mb-1.5">{c.name}</p>
              <span className={`text-[0.625rem] font-mono font-semibold uppercase tracking-wider px-2 py-0.5 rounded ${SECTOR_COLORS[c.sector] || 'bg-gray-100 text-gray-600'}`}>{c.sector}</span>
            </div>
          ))}
          <div className="scroll-reveal flex flex-col items-center justify-center rounded bg-samred cursor-pointer hover:bg-samred/90 active:scale-[0.97] transition-all duration-200 p-5 min-h-[140px]"
            style={{ transitionDelay: `${(11 % 8) * 40}ms` }}
            onClick={() => setPage('quienes-somos')} role="button" tabIndex={0}
            onKeyDown={e => e.key === 'Enter' && setPage('quienes-somos')}
          >
            <Plus size={28} className="text-white mb-2" strokeWidth={2} />
            <p className="font-sub font-bold text-sm uppercase tracking-wide text-white text-center mb-0.5">Más Clientes</p>
            <p className="text-white/70 text-[0.625rem] font-mono uppercase tracking-widest text-center">Portafolio Nacional</p>
          </div>
        </div>
        <div className="scroll-reveal mt-10 bg-dark rounded overflow-hidden flex flex-col md:flex-row items-center justify-between gap-4 px-7 py-5">
          <div>
            <p className="font-sub font-bold text-white text-base md:text-lg">Confían en SAMFOR</p>
            <p className="text-white/55 text-sm">Instituciones públicas, privadas e industriales de Venezuela</p>
          </div>
          <button onClick={() => setPage('contacto')} className="flex-shrink-0 btn-primary whitespace-nowrap">Ser parte de nuestros clientes</button>
        </div>
      </div>
    </section>
  )
}

// ─── PAGE: INICIO ─────────────────────────────────────────────────────────────
function PageInicio({ setPage }) {
  useScrollReveal()
  const featured = [
    ALL_PROJECTS.find(p => p.id === 1),   // Termoeléctrica Bajo Grande (active)
    ALL_PROJECTS.find(p => p.id === 101), // Subestación 155KV
    ALL_PROJECTS.find(p => p.id === 104), // Metro Maracaibo
  ]

  return (
    <div>
      {/* HERO */}
      <section className="relative flex flex-col items-start justify-end px-6 md:px-14 lg:px-20 pb-24"
        style={{ minHeight: '100dvh', background: `linear-gradient(rgba(10,12,15,0.62), rgba(10,12,15,0.62)), url("/hero.jpg") center/cover no-repeat` }}
      >
        <div className="max-w-[14rem] sm:max-w-[16rem] text-left">
          <div className="badge-since inline-flex items-center gap-2 bg-samred text-white text-[0.5625rem] font-mono font-semibold uppercase tracking-[0.15em] px-2 py-1 rounded mb-4">
            <span className="w-1 h-1 rounded-full bg-white" />Desde 1966
          </div>
          <h1 className="font-display text-[clamp(1.25rem,3vw,2rem)] text-white leading-[0.95] tracking-wide mb-5">
            CONSTRUIMOS<br />EL FUTURO DE<br />LA ENERGÍA
          </h1>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => setPage('proyectos')} className="btn-primary">Ver Proyectos</button>
            <button onClick={() => setPage('quienes-somos')} className="btn-outline-white">Conócenos</button>
          </div>
        </div>
        <div className="scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 select-none">
          <span className="text-white/40 text-[0.625rem] font-mono uppercase tracking-widest">Scroll</span>
          <ChevronDown size={14} className="text-white/40" />
        </div>
      </section>

      {/* METRICS */}
      <section className="border-y-[3px] border-samred bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-wrap justify-around divide-x divide-border">
            {METRICS.map(m => <CounterItem key={m.label} {...m} />)}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="bg-dark overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2">

          {/* LEFT — list */}
          <div className="py-16 px-6 md:px-14 lg:px-16 flex flex-col justify-center">
            {/* Header */}
            <div className="scroll-reveal mb-10">
              <div className="flex items-center gap-3 mb-3">
                <span className="h-[3px] w-10 bg-samred" />
                <span className="font-sub font-semibold text-[0.6875rem] uppercase tracking-widest text-samred">Lo que hacemos</span>
              </div>
              <h2 className="font-display text-[2.5rem] md:text-[3rem] text-white leading-none">NUESTROS<br />SERVICIOS</h2>
            </div>

            {/* Service rows */}
            <div className="stagger divide-y divide-white/10">
              {SERVICES.map((s, i) => (
                <div key={s.title}
                  className="group flex items-start gap-5 py-5 cursor-default transition-all duration-300"
                  style={{ '--tw-translate-x': '0px' }}
                >
                  {/* Number */}
                  <span className="font-mono text-[0.625rem] text-white/25 group-hover:text-samred pt-1 transition-colors duration-300 flex-shrink-0 w-5">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {/* Icon */}
                  <div className="text-white/30 group-hover:text-samred transition-colors duration-300 flex-shrink-0 mt-0.5">
                    {s.icon}
                  </div>
                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-sub font-bold text-[0.9375rem] uppercase tracking-wider text-white/80 group-hover:text-white transition-colors duration-300 mb-1">{s.title}</h3>
                    <p className="text-white/40 text-xs leading-relaxed group-hover:text-white/55 transition-colors duration-300">{s.desc}</p>
                  </div>
                  {/* Arrow */}
                  <div className="flex-shrink-0 mt-1 opacity-0 group-hover:opacity-100 translate-x-[-4px] group-hover:translate-x-0 transition-all duration-300">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 7h12M8 3l5 4-5 4" stroke="#C8102E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — photo */}
          <div className="relative hidden lg:block min-h-[640px]">
            <img
              src="/services-photo.jpg"
              alt="Equipo SAMFOR en obra"
              className="absolute inset-0 w-full h-full object-cover object-center"
              loading="lazy"
            />
            {/* Dark fade left */}
            <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/30 to-transparent" />
            {/* Bottom overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-dark/70 via-transparent to-transparent" />
            {/* Caption */}
            <div className="absolute bottom-10 right-10 text-right">
              <p className="font-display text-xl text-white leading-tight mb-1">PROFESIONALES<br />EN CADA OBRA</p>
              <p className="text-white/40 text-[0.6875rem] font-sub uppercase tracking-widest">Campo Boscán — Venezuela</p>
            </div>
            {/* Red accent top-right */}
            <div className="absolute top-0 right-0 w-[3px] h-full bg-samred" />
          </div>

        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section className="bg-white py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="scroll-reveal mb-12">
            <div className="flex items-center gap-3 mb-3"><span className="h-[3px] w-12 bg-samred" /><span className="font-sub font-semibold text-xs uppercase tracking-widest text-samred">Portafolio</span></div>
            <h2 className="font-display text-[2.75rem] md:text-5xl text-dark">PROYECTOS DESTACADOS</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {featured.filter(Boolean).map(p => (
              <div key={p.id} className="project-card group rounded overflow-hidden cursor-pointer" onClick={() => setPage('proyectos')} role="button" tabIndex={0} onKeyDown={e => e.key === 'Enter' && setPage('proyectos')}>
                <div className="relative h-52 overflow-hidden">
                  <img src={p.img} alt={p.title} className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/20 to-transparent" />
                  <div className="absolute inset-0 p-5 flex flex-col justify-between">
                    <div className="self-start"><DivisionBadge division={p.division} /></div>
                    <div>
                      <h3 className="font-display text-[1.4rem] text-white leading-tight mb-2">{p.title}</h3>
                      <span className="text-white/75 text-xs font-sub font-semibold uppercase tracking-wide flex items-center gap-1.5 group-hover:gap-2.5 transition-all">Ver más <ArrowRight size={12} /></span>
                    </div>
                  </div>
                  {/* Division color bar */}
                  <div className="absolute bottom-0 left-0 right-0 h-[3px]" style={{ background: DIVISION_META[p.division]?.dot || '#C8102E' }} />
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <button onClick={() => setPage('proyectos')} className="btn-secondary">Ver Todos los Proyectos</button>
          </div>
        </div>
      </section>

      {/* CLIENTS */}
      <ClientsSection setPage={setPage} />

      {/* CTA */}
      <section className="bg-samred py-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center scroll-reveal">
          <h2 className="font-display text-[2.75rem] md:text-5xl lg:text-6xl text-white mb-4 tracking-wide">¿TIENES UN PROYECTO? HABLEMOS.</h2>
          <p className="text-white/75 text-base md:text-lg mb-8 max-w-lg mx-auto leading-relaxed">Contamos con el equipo, la experiencia y la infraestructura para ejecutar proyectos de cualquier escala.</p>
          <button onClick={() => setPage('contacto')} className="bg-white text-samred font-sub font-bold text-sm uppercase tracking-widest px-8 py-4 rounded transition-all hover:bg-white/90 active:scale-[0.97]">Contáctanos Ahora</button>
        </div>
      </section>
    </div>
  )
}

// ─── PAGE: PROYECTOS ──────────────────────────────────────────────────────────
function PageProyectos() {
  useScrollReveal()
  const [activeDivision, setActiveDivision] = useState('Todos')
  const [statusFilter, setStatusFilter] = useState('Todos') // 'Todos' | 'active' | 'completed'
  const [modal, setModal] = useState(null)

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
    <div className="pt-16">
      {/* Hero */}
      <div className="relative py-20 px-4 md:px-8 overflow-hidden"
        style={{ background: `linear-gradient(rgba(10,12,15,0.70), rgba(10,12,15,0.70)), url("${IMG(23)}") center/cover no-repeat` }}
      >
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex items-center gap-3 mb-3"><span className="h-[3px] w-12 bg-samred" /><span className="font-sub font-semibold text-xs uppercase tracking-widest text-white/60">Portafolio</span></div>
          <h1 className="font-display text-5xl md:text-6xl text-white tracking-wide mb-3">PROYECTOS</h1>
          <p className="text-white/65 text-base max-w-xl leading-relaxed">Décadas de experiencia ejecutando proyectos de alta complejidad en Venezuela y la región.</p>
          {/* Division overview chips */}
          <div className="flex flex-wrap gap-2 mt-6">
            {Object.entries(DIVISION_META).map(([key, m]) => (
              <span key={key} className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm text-white text-xs font-sub font-semibold uppercase tracking-wide px-3 py-1.5 rounded border border-white/20">
                {m.icon}<span className="opacity-80">{m.label}</span>
                <span className="bg-white/20 text-white text-[0.625rem] font-mono px-1.5 py-0.5 rounded ml-0.5">{counts[key] || 0}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Sticky filter bar */}
      <div className="bg-white border-b border-border sticky top-16 z-30 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          {/* Division tabs — horizontal scroll on mobile */}
          <div className="flex gap-0 overflow-x-auto scrollbar-hide">
            {divisionTabs.map(t => {
              const isActive = activeDivision === t.id
              const dot = t.id === 'Todos' ? '#C8102E' : DIVISION_META[t.id]?.dot
              return (
                <button
                  key={t.id}
                  onClick={() => setActiveDivision(t.id)}
                  className={`flex items-center gap-2 px-4 py-3.5 text-xs font-sub font-bold uppercase tracking-wide whitespace-nowrap border-b-2 transition-all duration-200 flex-shrink-0 ${
                    isActive
                      ? 'text-dark border-b-2'
                      : 'text-secondary/70 border-transparent hover:text-dark hover:border-gray-300'
                  }`}
                  style={isActive ? { borderBottomColor: dot } : {}}
                >
                  <span className={isActive ? 'opacity-100' : 'opacity-50'}>{t.icon}</span>
                  <span>{t.id === 'Todos' ? 'Todos' : t.label}</span>
                  {t.id !== 'Todos' && (
                    <span className={`text-[0.625rem] font-mono px-1.5 py-0.5 rounded ${isActive ? 'bg-dark/10 text-dark' : 'bg-gray-100 text-secondary'}`}>
                      {counts[t.id] || 0}
                    </span>
                  )}
                </button>
              )
            })}
          </div>
          {/* Status sub-filter */}
          <div className="flex items-center gap-2 py-2 border-t border-border/60">
            {[['Todos', 'Todos'], ['active', 'En Ejecución 2025'], ['completed', 'Culminados']].map(([val, lab]) => (
              <button key={val} onClick={() => setStatusFilter(val)}
                className={`text-xs font-mono font-semibold px-3 py-1 rounded border transition-all ${statusFilter === val ? 'bg-dark text-white border-dark' : 'bg-white text-secondary border-border hover:border-dark/40'}`}
              >
                {val === 'active' && <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block mr-1.5 dot-pulse" />}
                {lab}
              </button>
            ))}
            <span className="ml-auto text-xs font-mono text-secondary/60">{filtered.length} proyecto{filtered.length !== 1 ? 's' : ''}</span>
          </div>
        </div>
      </div>

      {/* Active division header */}
      {activeDivision !== 'Todos' && (
        <div className="bg-surface border-b border-border py-4 px-4 md:px-8">
          <div className="max-w-7xl mx-auto flex items-center gap-3">
            <div className="w-1 h-10 rounded-full flex-shrink-0" style={{ background: DIVISION_META[activeDivision]?.dot }} />
            <div>
              <p className="font-display text-2xl text-dark leading-none">{DIVISION_META[activeDivision]?.label}</p>
              <p className="text-secondary text-xs mt-1">{counts[activeDivision] || 0} proyectos en esta división</p>
            </div>
          </div>
        </div>
      )}

      {/* Project grid */}
      <div className="bg-white py-10 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map(p => <ProjectCard key={p.id} project={p} onClick={setModal} />)}
            </div>
          ) : (
            <div className="text-center py-20 text-secondary">
              <LayoutGrid size={28} className="mx-auto mb-3 opacity-30" />
              <p className="font-sub font-semibold text-lg">No hay proyectos con estos filtros.</p>
            </div>
          )}
        </div>
      </div>

      {modal && <ProjectModal project={modal} onClose={() => setModal(null)} />}
    </div>
  )
}

// ─── PAGE: QUIÉNES SOMOS ──────────────────────────────────────────────────────
function PageQuienesSomos({ setPage }) {
  useScrollReveal()
  const advantages = [
    { icon: <Target size={28}/>, title: 'Capacidad Operativa', desc: 'Flota completa de vehículos, camiones, equipos pesados, maquinaria y aeronave. Infraestructura para proyectos de gran envergadura en todo el territorio.' },
    { icon: <CheckCircle size={28}/>, title: 'Calidad Certificada', desc: 'Procesos IPC bajo estándares internacionales. Certificación como Manejadora de Desechos Peligrosos desde 1999 por el Ministerio del Ecosistema.' },
    { icon: <Users size={28}/>, title: 'Capital Humano', desc: 'Profesionales calificados en ingeniería eléctrica, civil, mecánica, instrumentación, telecomunicaciones y ambiental con plataformas avanzadas.' },
    { icon: <Shield size={28}/>, title: 'HSE / Seguridad', desc: 'Cultura HSE arraigada. Operaciones en entornos de alto riesgo con cumplimiento de normativas COVENIN e internacionales.' },
  ]

  return (
    <div className="pt-16">
      <section className="py-20 md:py-28 px-4 md:px-12"
        style={{ background: `linear-gradient(rgba(10,12,15,0.70), rgba(10,12,15,0.76)), url("${IMG(18)}") center/cover no-repeat` }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4"><span className="h-[3px] w-12 bg-samred" /><span className="font-sub font-semibold text-xs uppercase tracking-widest text-white/55">Nuestra empresa</span></div>
            <h1 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] text-white leading-tight mb-4 tracking-wide">UNA EMPRESA.<br />SEIS DÉCADAS.<br />UN ESTÁNDAR.</h1>
            <p className="text-white/65 text-lg max-w-lg leading-relaxed">Desde 1966, SAMFOR construye Venezuela con excelencia técnica, responsabilidad ambiental y el más alto compromiso con la seguridad.</p>
          </div>
        </div>
      </section>

      {/* Photo strip */}
      <div className="grid grid-cols-4 h-32 md:h-44 overflow-hidden">
        {[IMG(4), IMG(72), IMG(119), IMG(33)].map((src, i) => (
          <div key={i} className="relative overflow-hidden">
            <img src={src} alt="" className="w-full h-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-dark/20" />
          </div>
        ))}
      </div>

      {/* Timeline */}
      <section className="bg-white py-20 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="scroll-reveal mb-12">
            <div className="flex items-center gap-3 mb-3"><span className="h-[3px] w-12 bg-samred" /><span className="font-sub font-semibold text-xs uppercase tracking-widest text-samred">Historia</span></div>
            <h2 className="font-display text-[2.75rem] md:text-5xl text-dark">NUESTRA HISTORIA</h2>
          </div>
          <div className="relative">
            <div className="absolute left-[6rem] md:left-[8rem] top-2 bottom-2 w-[2px] bg-gradient-to-b from-samred to-samblue/30" />
            <div className="flex flex-col gap-10">
              {TIMELINE.map((item, i) => (
                <div key={i} className="scroll-reveal flex gap-5 md:gap-8 items-start" style={{ transitionDelay: `${i * 70}ms` }}>
                  <div className="flex-shrink-0 w-20 md:w-28 text-right pt-0.5"><span className="font-display text-[1.6rem] md:text-3xl text-samred">{item.year}</span></div>
                  <div className="flex-shrink-0 mt-2 relative z-10"><div className="w-3.5 h-3.5 rounded-full bg-samred ring-4 ring-white" /></div>
                  <div className="flex-1 pb-2"><h3 className="font-sub font-bold text-base text-dark mb-1">{item.title}</h3><p className="text-secondary text-sm leading-relaxed">{item.desc}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission/Vision/Values */}
      <section className="bg-surface py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="scroll-reveal mb-12">
            <div className="flex items-center gap-3 mb-3"><span className="h-[3px] w-12 bg-samred" /><span className="font-sub font-semibold text-xs uppercase tracking-widest text-samred">Identidad corporativa</span></div>
            <h2 className="font-display text-[2.75rem] md:text-5xl text-dark">MISIÓN, VISIÓN Y VALORES</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: <Target size={22}/>, title: 'MISIÓN', body: 'Ejecutar de manera rentable y eficiente, en armonía con el ambiente, obras y servicios de construcción civil, eléctrica, telecomunicación, transporte y servicios ambientales, asegurando la satisfacción del cliente y el desarrollo del talento humano.' },
              { icon: <Star size={22}/>, title: 'VISIÓN', body: 'Ser una empresa líder en Construcción, Transporte y Servicios Ambientales, reconocida por su excelencia, calidad de servicios, solidez del equipo humano y compromiso con el desarrollo sostenible de Venezuela.' },
              { icon: <Award size={22}/>, title: 'VALORES', list: [{ name: 'Lealtad', desc: 'Compromiso con clientes, colaboradores y el país.' }, { name: 'Responsabilidad', desc: 'Cumplimiento técnico, ambiental y de seguridad.' }, { name: 'Respeto a la Dignidad Humana', desc: 'Cada persona es tratada con el máximo respeto.' }] },
            ].map((card, i) => (
              <div key={card.title} className="scroll-reveal bg-white rounded border-t-[3px] border-samred shadow-[0_2px_16px_rgba(0,0,0,0.07)] p-7" style={{ transitionDelay: `${i * 80}ms` }}>
                <div className="text-samblue mb-3">{card.icon}</div>
                <h3 className="font-display text-2xl text-samred mb-4">{card.title}</h3>
                {card.body && <p className="text-secondary text-sm leading-relaxed">{card.body}</p>}
                {card.list && <div className="flex flex-col gap-4">{card.list.map(v => (<div key={v.name}><div className="font-sub font-bold text-sm uppercase tracking-wide text-dark mb-0.5">{v.name}</div><p className="text-secondary text-xs leading-relaxed">{v.desc}</p></div>))}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="bg-white py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="scroll-reveal mb-12">
            <div className="flex items-center gap-3 mb-3"><span className="h-[3px] w-12 bg-samred" /><span className="font-sub font-semibold text-xs uppercase tracking-widest text-samred">Por qué elegirnos</span></div>
            <h2 className="font-display text-[2.75rem] md:text-5xl text-dark">VENTAJAS COMPETITIVAS</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {advantages.map((a, i) => (
              <div key={i} className="scroll-reveal bg-surface rounded p-7 flex gap-5" style={{ transitionDelay: `${i * 70}ms` }}>
                <div className="flex-shrink-0 text-samred mt-0.5">{a.icon}</div>
                <div><h3 className="font-sub font-bold text-lg text-dark mb-2">{a.title}</h3><p className="text-secondary text-sm leading-relaxed">{a.desc}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ClientsSection setPage={setPage} />

      <section className="bg-surface py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="scroll-reveal mb-8"><h2 className="font-display text-3xl md:text-4xl text-dark">FICHA DE EMPRESA</h2></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            <div className="bg-white rounded shadow-[0_2px_16px_rgba(0,0,0,0.06)] overflow-hidden">
              <div className="bg-dark text-white px-6 py-3"><span className="font-sub font-bold text-xs uppercase tracking-widest">Datos Corporativos</span></div>
              <table className="w-full text-sm">
                <tbody>
                  {[['Razón Social','SAMFOR, S.A.'],['Fundación','1966 — Maracaibo, Venezuela'],['Trayectoria','59 años de operación continua'],['Sector','Petrolero, Petroquímico, Carbonífero, Civil'],['Servicios','6 líneas de negocio especializadas'],['Certificación','Manejadora de Desechos Peligrosos (desde 1999)'],['Cobertura','Venezuela y operaciones internacionales']].map(([k,v]) => (
                    <tr key={k} className="border-b border-border last:border-0"><td className="px-5 py-3 font-sub font-semibold text-secondary uppercase tracking-wide text-xs">{k}</td><td className="px-5 py-3 text-dark text-sm font-medium">{v}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="bg-white rounded shadow-[0_2px_16px_rgba(0,0,0,0.06)] p-6">
              <h3 className="font-sub font-bold text-xs uppercase tracking-widest text-secondary mb-5">Contacto y Dirección</h3>
              <div className="flex flex-col gap-4">
                {[{icon:<MapPin size={15} className="text-samred"/>,label:'Dirección',value:'Av. 3H entre Calles 68-70 N.69-61, Maracaibo, Venezuela'},{icon:<Mail size={15} className="text-samred"/>,label:'Email',value:'samfor@samfor.com'},{icon:<Phone size={15} className="text-samred"/>,label:'Teléfonos',value:'+58 261 814 4444 / +58 414-615.8000'},{icon:<Globe size={15} className="text-samred"/>,label:'Web',value:'www.samfor.com'}].map(item => (
                  <div key={item.label} className="flex items-start gap-3"><div className="flex-shrink-0 mt-0.5">{item.icon}</div><div><div className="text-xs font-mono text-secondary/60 uppercase tracking-widest mb-0.5">{item.label}</div><div className="text-dark text-sm font-medium">{item.value}</div></div></div>
                ))}
              </div>
            </div>
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
    <div className="pt-16">
      <div className="relative h-36 md:h-48 overflow-hidden">
        <img src={IMG(28)} alt="" className="w-full h-full object-cover object-top" />
        <div className="absolute inset-0 bg-dark/70 flex items-end pb-8 px-8 md:px-16">
          <div className="max-w-7xl w-full mx-auto"><h1 className="font-display text-5xl md:text-6xl text-white tracking-wide">CONTACTO</h1></div>
        </div>
      </div>

      <section className="bg-white py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded overflow-hidden shadow-[0_4px_40px_rgba(0,0,0,0.09)]">
            <div className="bg-surface p-8 md:p-12">
              <h2 className="font-display text-[3.5rem] md:text-[4rem] text-samred mb-3 leading-none">HABLEMOS</h2>
              <p className="text-secondary text-base mb-8 leading-relaxed max-w-sm">Estamos listos para evaluar tu proyecto. Un especialista se pondrá en contacto contigo.</p>
              <div className="flex flex-col gap-5">
                {[{icon:<Mail size={16} className="text-samred flex-shrink-0"/>,label:'Email',value:'samfor@samfor.com'},{icon:<Phone size={16} className="text-samred flex-shrink-0"/>,label:'Teléfonos',value:'+58 261 814 4444\n+58 414-615.8000'},{icon:<Globe size={16} className="text-samred flex-shrink-0"/>,label:'Web',value:'www.samfor.com'},{icon:<MapPin size={16} className="text-samred flex-shrink-0"/>,label:'Dirección',value:'Av. 3H entre Calles 68-70 N.69-61\nMaracaibo, Venezuela'}].map(item => (
                  <div key={item.label} className="flex items-start gap-3">{item.icon}<div><div className="text-xs font-mono text-secondary/55 uppercase tracking-widest mb-0.5">{item.label}</div><div className="text-dark text-sm font-medium whitespace-pre-line">{item.value}</div></div></div>
                ))}
              </div>
            </div>
            <div className="bg-white p-8 md:p-12">
              {sent ? (
                <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                  <CheckCircle size={44} className="text-green-500 mb-4" />
                  <h3 className="font-display text-3xl text-dark mb-2">Mensaje Enviado</h3>
                  <p className="text-secondary text-sm">Un especialista se pondrá en contacto a la brevedad.</p>
                  <button onClick={() => { setSent(false); setForm({name:'',company:'',email:'',phone:'',type:'',message:''}) }} className="btn-secondary mt-6">Nuevo Mensaje</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <h2 className="font-display text-2xl text-dark mb-6">ENVÍA TU CONSULTA</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="flex flex-col gap-1.5"><label className="text-[0.6875rem] font-mono text-secondary uppercase tracking-widest">Nombre *</label><input className="form-input" required value={form.name} onChange={e => setForm(f=>({...f,name:e.target.value}))} placeholder="Carlos Rodríguez" /></div>
                    <div className="flex flex-col gap-1.5"><label className="text-[0.6875rem] font-mono text-secondary uppercase tracking-widest">Empresa</label><input className="form-input" value={form.company} onChange={e => setForm(f=>({...f,company:e.target.value}))} placeholder="PDVSA, Chevron..." /></div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="flex flex-col gap-1.5"><label className="text-[0.6875rem] font-mono text-secondary uppercase tracking-widest">Email *</label><input className="form-input" type="email" required value={form.email} onChange={e => setForm(f=>({...f,email:e.target.value}))} placeholder="correo@empresa.com" /></div>
                    <div className="flex flex-col gap-1.5"><label className="text-[0.6875rem] font-mono text-secondary uppercase tracking-widest">Teléfono</label><input className="form-input" type="tel" value={form.phone} onChange={e => setForm(f=>({...f,phone:e.target.value}))} placeholder="+58 261 000 0000" /></div>
                  </div>
                  <div className="flex flex-col gap-1.5 mb-4">
                    <label className="text-[0.6875rem] font-mono text-secondary uppercase tracking-widest">Tipo de consulta</label>
                    <select className="form-input" value={form.type} onChange={e => setForm(f=>({...f,type:e.target.value}))}>
                      <option value="">Seleccionar...</option>
                      {['Propuesta de proyecto','Consulta técnica','Alianza comercial','Otro'].map(o=><option key={o}>{o}</option>)}
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5 mb-6"><label className="text-[0.6875rem] font-mono text-secondary uppercase tracking-widest">Mensaje *</label><textarea className="form-input min-h-[110px] resize-none" required value={form.message} onChange={e => setForm(f=>({...f,message:e.target.value}))} placeholder="Describe tu proyecto..." /></div>
                  <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2" disabled={sending}>
                    {sending ? <><svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="40 60"/></svg>Enviando...</> : 'Enviar Mensaje'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="scroll-reveal border-t-[3px] border-samred pt-10 mb-10">
            <h2 className="font-display text-[2.75rem] md:text-5xl text-dark mb-3">ÚNETE A SAMFOR</h2>
            <p className="text-secondary max-w-xl leading-relaxed">Forma parte del equipo que construye la infraestructura energética de Venezuela.</p>
          </div>
          <div className="bg-white rounded shadow-[0_2px_24px_rgba(0,0,0,0.07)] p-8 md:p-10">
            {jobSent ? (
              <div className="flex flex-col items-center py-10 text-center">
                <CheckCircle size={44} className="text-samblue mb-4" />
                <h3 className="font-display text-3xl text-dark mb-2">Postulación Recibida</h3>
                <p className="text-secondary text-sm">Revisaremos tu perfil y nos pondremos en contacto si hay oportunidad.</p>
                <button onClick={() => { setJobSent(false); setJobForm({name:'',email:'',phone:'',area:'',exp:'',cv:null,letter:''}) }} className="btn-secondary mt-6">Nueva Postulación</button>
              </div>
            ) : (
              <form onSubmit={handleJobSubmit} noValidate>
                <h3 className="font-display text-2xl text-dark mb-6">FORMULARIO DE POSTULACIÓN</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="flex flex-col gap-1.5"><label className="text-[0.6875rem] font-mono text-secondary uppercase tracking-widest">Nombre *</label><input className="form-input" required value={jobForm.name} onChange={e=>setJobForm(f=>({...f,name:e.target.value}))} placeholder="Nombre completo" /></div>
                  <div className="flex flex-col gap-1.5"><label className="text-[0.6875rem] font-mono text-secondary uppercase tracking-widest">Email *</label><input className="form-input" type="email" required value={jobForm.email} onChange={e=>setJobForm(f=>({...f,email:e.target.value}))} placeholder="tu@email.com" /></div>
                  <div className="flex flex-col gap-1.5"><label className="text-[0.6875rem] font-mono text-secondary uppercase tracking-widest">Teléfono</label><input className="form-input" value={jobForm.phone} onChange={e=>setJobForm(f=>({...f,phone:e.target.value}))} placeholder="+58 424 000 0000" /></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="flex flex-col gap-1.5"><label className="text-[0.6875rem] font-mono text-secondary uppercase tracking-widest">Área</label><select className="form-input" value={jobForm.area} onChange={e=>setJobForm(f=>({...f,area:e.target.value}))}><option value="">Seleccionar...</option>{['Ing. Eléctrica','Ing. Civil','Ing. Mecánica','Instrumentación','Telecomunicaciones','Ambiental','Transporte','Administración','Otra'].map(a=><option key={a}>{a}</option>)}</select></div>
                  <div className="flex flex-col gap-1.5"><label className="text-[0.6875rem] font-mono text-secondary uppercase tracking-widest">Experiencia</label><select className="form-input" value={jobForm.exp} onChange={e=>setJobForm(f=>({...f,exp:e.target.value}))}><option value="">Seleccionar...</option>{['0-2 años','3-5 años','6-10 años','10+ años'].map(x=><option key={x}>{x}</option>)}</select></div>
                </div>
                <div className="mb-4">
                  <label className="text-[0.6875rem] font-mono text-secondary uppercase tracking-widest block mb-2">CV / Hoja de Vida</label>
                  <div className={`upload-zone ${drag?'drag-over':''}`} onDragOver={e=>{e.preventDefault();setDrag(true)}} onDragLeave={()=>setDrag(false)} onDrop={e=>{e.preventDefault();setDrag(false);const f=e.dataTransfer.files[0];if(f)setJobForm(jf=>({...jf,cv:f}))}} onClick={()=>document.getElementById('cv-input').click()}>
                    <input id="cv-input" type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={e=>{const f=e.target.files[0];if(f)setJobForm(jf=>({...jf,cv:f}))}} />
                    {jobForm.cv ? <div className="flex items-center gap-2 justify-center text-samblue"><CheckCircle size={15}/><span className="text-sm font-medium">{jobForm.cv.name}</span></div> : <div className="text-secondary text-sm"><Upload size={18} className="mx-auto mb-2 opacity-40"/><span>Arrastra tu CV o <span className="text-samblue font-semibold">haz clic para seleccionar</span></span></div>}
                  </div>
                </div>
                <div className="flex flex-col gap-1.5 mb-6"><label className="text-[0.6875rem] font-mono text-secondary uppercase tracking-widest">Carta de presentación</label><textarea className="form-input min-h-[90px] resize-none" value={jobForm.letter} onChange={e=>setJobForm(f=>({...f,letter:e.target.value}))} placeholder="Cuéntanos sobre tu experiencia y motivación..." /></div>
                <button type="submit" className="btn-primary flex items-center gap-2" style={{background:'#1A6FB5'}} disabled={jobSending}>
                  {jobSending?<><svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="40 60"/></svg>Enviando...</>:'Postularme'}
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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }) }, [page])

  const pages = {
    inicio: <PageInicio setPage={setPage} />,
    proyectos: <PageProyectos />,
    'quienes-somos': <PageQuienesSomos setPage={setPage} />,
    contacto: <PageContacto />,
  }

  return (
    <div className="min-h-screen flex flex-col font-body">
      <Navbar page={page} setPage={setPage} scrolled={scrolled} />
      <main className="flex-1">{pages[page] || pages['inicio']}</main>
      <Footer setPage={setPage} />
    </div>
  )
}
