import { useState, useEffect, useRef } from 'react'
import {
  Zap, Building2, Settings, Truck, Leaf, Ship,
  ChevronRight, Menu, X, ArrowRight, MapPin, Phone, Mail, Globe,
  Upload, CheckCircle, Award, Target, Plus,
  Shield, Star, ChevronDown, Filter, Users
} from 'lucide-react'

// ─── IMAGE MAP ────────────────────────────────────────────────────────────────
// All images extracted from the official SAMFOR PDF presentation
const IMG = (n) => `/projects/img-${String(n).padStart(3,'0')}.jpg`

// ─── DATA ───────────────────────────────────────────────────────────────────

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

// Client logo grid — using extracted PDF logos
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
  { img: IMG(177), name: 'Lagoven', sector: 'Energía', bg: '#fff' },
  { img: IMG(237), name: 'PetroCaribe', sector: 'Energía', bg: '#fff' },
  { img: IMG(245), name: 'VeneAcuícola', sector: 'Acuicultura', bg: '#fff' },
  { img: IMG(246), name: 'VeneShrimp', sector: 'Acuicultura', bg: '#fff' },
]

const SECTOR_COLORS = {
  Energía: 'bg-samred/10 text-samred',
  Petroquímica: 'bg-blue-50 text-samblue',
  Servicios: 'bg-gray-100 text-gray-600',
  Internacional: 'bg-green-50 text-green-700',
  Transporte: 'bg-purple-50 text-purple-700',
  Acuicultura: 'bg-teal-50 text-teal-700',
}

const PROJECTS_ACTIVE = [
  {
    id: 1, client: 'Chevron Global Technology Service Company',
    title: 'Mantenimiento Integral Planta Termoeléctrica Bajo Grande',
    category: 'Eléctrico', img: IMG(28),
    desc: 'Servicio integral de operación y mantenimiento: sistemas de agua, contra incendios, combustible, electricidad, turbogeneradores, tratamiento de aguas, SCADA y comunicaciones.',
    detail: 'Objetivo: mejorar la eficiencia operativa, prolongar la vida útil de los equipos y garantizar la continuidad del suministro eléctrico a Campo Boscán. Mantenimiento predictivo, preventivo y correctivo con operación 24/7.',
    status: 'active'
  },
  {
    id: 2, client: 'Chevron Global Technology Service Company',
    title: 'Instalación y Preservación Turbinas GE LM-6000PC',
    category: 'Mecánico', img: IMG(33),
    desc: 'Instalación y desmontaje de turbinas GE LM6000PC, acondicionamiento y mantenimiento preventivo/correctivo, certificación de equipos.',
    detail: 'Reparación de motores y componentes, suministro de repuestos. Objetivo: optimizar la eficiencia operativa y prolongar la vida útil de los equipos de generación.',
    status: 'active'
  },
  {
    id: 3, client: 'Chevron Global Technology Service Company',
    title: 'Mantenimiento Planta Agua Desmineralizada Bajo Grande',
    category: 'Mecánico', img: IMG(38),
    desc: 'Mantenimiento correctivo de la Planta de Agua Desmineralizada. Subsistemas críticos, mejoras civiles, certificación de equipos y actualización de sistemas.',
    detail: 'Mantenimiento mayor, intermedio y menor de subsistemas, reparación de motores eléctricos, válvulas y bombas. Garantiza la continuidad del suministro de agua para generación de energía.',
    status: 'active'
  },
  {
    id: 4, client: 'Chevron Global Technology Service Company',
    title: 'Mantenimiento Generadores de Emergencia Petro Boscán',
    category: 'Eléctrico', img: IMG(50),
    desc: 'Inspección, limpieza, reparación, mantenimiento preventivo y correctivo de generadores de emergencia. Configuración de software y pruebas en sitio.',
    detail: 'Puesta en marcha con garantía de buen funcionamiento. Traslado de equipos entre instalaciones y talleres. Objetivo: eficiencia operativa y continuidad de las operaciones.',
    status: 'active'
  },
  {
    id: 5, client: 'Chevron Global Technology Service Company',
    title: 'Mantenimiento Integral Instalaciones Petro Boscán',
    category: 'Civil', img: IMG(67),
    desc: 'Métodos físicos, mecánicos y químicos en Campo Boscán, Richmond, Terminal de Embarque Bajo Grande y Termoeléctrica. 21.000.000 m² durante un año.',
    detail: '14.000.000 m² mediante corte manual y 7.000.000 m² con corte a máquina. Control de vegetación para cumplir planes de mantenimiento y garantizar accesibilidad operativa.',
    status: 'active'
  },
  {
    id: 6, client: 'Chevron Global Technology Service Company',
    title: 'Tendido Líneas Eléctricas 24 KV Campo Boscán',
    category: 'Eléctrico', img: IMG(62),
    desc: 'Construcción de instalaciones eléctricas de superficie para suministro eléctrico a pozos productores de crudo. Líneas aéreas 24 KV, transformadores y puesta a tierra.',
    detail: 'Tendido de líneas aéreas (postes, herrajes y accesorios), instalación de bancos de transformadores, cableados y acometidas, conexión de motores y equipos eléctricos.',
    status: 'active'
  },
  {
    id: 7, client: 'PDVSA Petróleo, S.A.',
    title: 'Mantenimiento General Llenadero Productos Blancos Cardón',
    category: 'Mecánico', img: IMG(90),
    desc: 'Mantenimiento general del llenadero de productos blancos en la refinería Cardón, garantizando operatividad y seguridad de las instalaciones.',
    detail: 'Mantenimiento integral: equipos mecánicos, instalaciones eléctricas, estructuras civiles y sistemas de seguridad. Refinería Cardón, Venezuela.',
    status: 'active'
  },
]

const PROJECTS_COMPLETED = [
  {
    id: 101, client: 'PDVSA Petróleo, S.A.',
    title: 'Implantación Generadores + Subestación 155 KV',
    category: 'Eléctrico', img: IMG(23),
    desc: 'Proyecto IPC: dos Turbo Generadores de Gas de 30 MW ISO en ciclo simple, subestación 155 KV e interconexión con Línea Doble Terna Pirital–Pigap II a 115 kV.',
    detail: 'Contrato modalidad IPC (Ingeniería, Procura y Construcción). Diseño, adquisición, construcción e instalación. Planta PIGAP II, El Tejero, Municipio Ezequiel Zamora, Estado Monagas.',
    status: 'completed'
  },
  {
    id: 102, client: 'PDVSA Petróleo, S.A.',
    title: 'Puntos GNV Carabobo, Yaracuy y Aragua',
    category: 'Mecánico', img: IMG(96),
    desc: 'Ingeniería de detalle y construcción de puntos de expendio de gas natural vehicular en estaciones de servicio existentes.',
    detail: 'Acometidas eléctricas alta y baja tensión, módulos de medición, tableros, transformadores, cableado de compresión, puesta a tierra, iluminación exterior. Disciplinas: civil, mecánica e instrumentación.',
    status: 'completed'
  },
  {
    id: 103, client: 'PDVSA Petróleo, S.A.',
    title: 'Gasoducto Anaco–Barquisimeto Ø36" y Ø30"',
    category: 'Mecánico', img: IMG(103),
    desc: 'Reemplazo de tubería Ø36" API 5L X60 y Ø30" API 5L X52 en el Sistema de Transmisión de Gas Anaco–Barquisimeto.',
    detail: 'Subsistemas EPA-N50 y EPA-N5. Adecuación del gasoducto LANA Ø36" y NURGAS Ø30" mediante reclasificación de área, garantizando operatividad y cumplimiento de estándares vigentes.',
    status: 'completed'
  },
  {
    id: 104, client: 'PRECOWAYSS / Metro de Maracaibo',
    title: 'Obras Complementarias Metro de Maracaibo',
    category: 'Civil', img: IMG(72),
    desc: 'Muros, defensas y drenajes, infraestructura de Patios y Talleres, reubicación de servicios tramo TR-4 y equipamiento del Edificio de Servicios Generales.',
    detail: 'Explanación de patios y talleres, adecuación de área de oficinas generales y presidencial, equipamiento segunda planta del Edificio de Servicios Generales.',
    status: 'completed'
  },
  {
    id: 105, client: 'PDVSA Petróleo, S.A.',
    title: 'Interconexión Islas Los Monjes Sur',
    category: 'Civil', img: IMG(77),
    desc: 'Construcción del Dique Escollera para la interconexión entre las Islas de los Monjes del Sur y la plataforma en la Isla Pequeña, Archipiélago Los Monjes.',
    detail: 'Movilización de equipos, instalación de estructuras provisionales, preparación y voladura de rocas, construcción de terrazas y rompeolas.',
    status: 'completed'
  },
  {
    id: 106, client: 'ENELVEN',
    title: 'Subestación El Tablazo 400/230/34.5 KV – 150 MVA',
    category: 'Eléctrico', img: IMG(120),
    desc: 'Suministro, traslado, instalación y puesta en servicio de autotransformador de potencia monofásico 400/230/34.5 KV, 150 MVA.',
    detail: 'Instalación completa con pruebas de funcionamiento. Subestación El Tablazo, Venezuela.',
    status: 'completed'
  },
  {
    id: 107, client: 'ENELCO',
    title: 'Subestación Cabimas 230/115 KV',
    category: 'Eléctrico', img: IMG(4),
    desc: 'Montaje electromecánico y ampliación de subestación Cabimas 230/115 KV. Construcción línea de transmisión entrada y salida.',
    detail: 'Energía Eléctrica de la Costa Oriental. Ampliación y montaje electromecánico completo con construcción de la línea de transmisión.',
    status: 'completed'
  },
  {
    id: 108, client: 'VENESHRIMP',
    title: 'Proyecto Acuícola Mitare',
    category: 'Civil', img: IMG(111),
    desc: 'Ingeniería, Procura y Construcción del Proyecto Acuícola Mitare. Movimiento de tierras, lagunas, muros, diques e infraestructura camaronera.',
    detail: 'Lagunas de cultivo, sistemas de distribución de agua, estructuras civiles e instalaciones eléctricas.',
    status: 'completed'
  },
  {
    id: 109, client: 'Chevron / Texaco Petroleum Co.',
    title: 'Sistema de Remediación Petroboscán',
    category: 'Ambiental', img: IMG(128),
    desc: 'Sub Estación Eléctrica de la Refinería Bajo Grande. Sistema de remediación, transporte de efluentes líquidos y desechos sólidos.',
    detail: 'Unidades tipo Vacuum y de plataforma. Tratamiento de efluentes líquidos. Disposición final de desechos sólidos y procesamiento de materiales peligrosos.',
    status: 'completed'
  },
  {
    id: 110, client: 'Shell Venezuela',
    title: 'Manejo Integral Desechos Industriales Shell',
    category: 'Ambiental', img: IMG(130),
    desc: 'Remoción, extracción y limpieza de gabarras. Transporte de lodos y ripios. Almacenamiento temporal y tratamiento.',
    detail: 'Recolección, transporte, almacenamiento, tratamiento de sólidos y líquidos. Técnicas de esparcimiento y biorremediación.',
    status: 'completed'
  },
  {
    id: 111, client: 'PEQUIVEN',
    title: 'Tendido Eléctrico Planta Cloro Soda',
    category: 'Eléctrico', img: IMG(56),
    desc: 'Tendido de alimentaciones eléctricas en bandeja portacables a motores 480V. Planta Cloro Soda, Complejo Petroquímico Ana María Campos.',
    detail: 'Bandejas portacables, cables de potencia 480V, conexiones a motores eléctricos en el Complejo Petroquímico Ana María Campos, Zulia.',
    status: 'completed'
  },
  {
    id: 112, client: 'Cardón IV (Eni / Repsol)',
    title: 'Servicio Embarcaciones Campo Perla',
    category: 'Marítimo', img: IMG(136),
    desc: 'Servicio de embarcación NO estándar, NO DP para operaciones marítimas en Campo Perla. Transporte de materiales, equipos y personal.',
    detail: 'Cardón IV (CM 4600001208 / CM 4700022511). Embarcaciones especializadas para operaciones offshore en Campo Perla, Golfo de Venezuela.',
    status: 'completed'
  },
  {
    id: 113, client: 'WFP / Programa Mundial de Alimentos – ONU',
    title: 'Transporte Alimentos WFP Venezuela',
    category: 'Transporte', img: IMG(129),
    desc: 'Transporte de alimentos en Zona Sur del Lago de Maracaibo, Estado Zulia y Estado Yaracuy. Insumos del Programa Mundial de Alimentos.',
    detail: 'Múltiples contratos con WFP. Procura y entrega de insumos de cocina de acero inoxidable a locaciones rurales en Zulia y Yaracuy.',
    status: 'completed'
  },
  {
    id: 114, client: 'UNHCR / Consejo Noruego para Refugiados',
    title: 'Suministros Humanitarios UNHCR',
    category: 'Transporte', img: IMG(122),
    desc: 'Procura y entrega de camas y colchones a poblaciones rurales. Kits de salud personal en San Cristóbal, Estado Táchira.',
    detail: 'Distribución logística nacional de suministros humanitarios para UNHCR y Consejo Noruego para Refugiados.',
    status: 'completed'
  },
  {
    id: 115, client: 'Consorcio Petrobras Energía – Williams',
    title: 'Saneamiento Ambiental Bachaquero / Puerto Miranda',
    category: 'Ambiental', img: IMG(127),
    desc: 'Manejo de agua en fosa, tratamiento de sedimentos y suelos impactados, confinamiento y conformación de superficie.',
    detail: 'Obras temporales, manejo de fosa, tratamiento de sedimentos, suministro de material de préstamo, confinamiento en Bachaquero y Puerto Miranda.',
    status: 'completed'
  },
  {
    id: 116, client: 'Schlumberger, Weatherford, MI SWACO',
    title: 'Transporte Lodos y Ripios de Perforación',
    category: 'Transporte', img: IMG(121),
    desc: 'Lodos y ripios base agua y aceite, efluentes líquidos, salmueras contaminadas y química descartada.',
    detail: 'Unidades vacuum y bateas. Clientes: Schlumberger, Weatherford, Tucker Energy, Dresser Rand, MI Swaco.',
    status: 'completed'
  },
  {
    id: 117, client: 'Maraven, S.A.',
    title: 'Subestaciones Eléctricas Lagunillas',
    category: 'Eléctrico', img: IMG(4),
    desc: 'Acometida eléctrica El Polvorín Lagunillas. Subestación 42 Campo Las Delicias. Mejoras eléctricas en drenajes Lagunillas.',
    detail: 'Tres contratos para Maraven en el área de Lagunillas. Infraestructura eléctrica para operaciones de producción.',
    status: 'completed'
  },
  {
    id: 118, client: 'Ministerio de Infraestructura',
    title: 'Carretera Los Filuos – Cojoro – Castillete',
    category: 'Civil', img: IMG(111),
    desc: 'Construcción y pavimentación de carretera Los Filuos – Cojoro – Castillete.',
    detail: 'Movimiento de tierras, base, sub-base, pavimentación asfáltica y obras complementarias.',
    status: 'completed'
  },
  {
    id: 119, client: 'Gobernación del Estado Falcón',
    title: 'Subestación Eléctrica La Sabanita – Falcón',
    category: 'Eléctrico', img: IMG(56),
    desc: 'Consolidación de la subestación eléctrica La Sabanita, Municipio Petit, Estado Falcón.',
    detail: 'Consolidación y puesta en servicio completa para la Gobernación del Estado Falcón.',
    status: 'completed'
  },
  {
    id: 120, client: 'Suelopetrol',
    title: 'Manejo Arenas Petrolizadas',
    category: 'Ambiental', img: IMG(130),
    desc: 'Transporte en volquetas y disposición final de arenas petrolizadas conforme a normativas ambientales.',
    detail: 'Servicio ambiental certificado para manejo de residuos industriales peligrosos.',
    status: 'completed'
  },
  {
    id: 121, client: 'PDVSA Petróleo, S.A.',
    title: 'Mantenimiento Campos Bachaquero y Barua Motatan',
    category: 'Mecánico', img: IMG(85),
    desc: 'Mantenimiento operacional de facilidades de producción tierra costa este en los campos Bachaquero y Barua Motatan.',
    detail: 'Facilidades civiles, eléctricas y mecánicas a pozos, localizaciones, vías de acceso e instalaciones campos Barua, Motatan y Tomoporo.',
    status: 'completed'
  },
  {
    id: 122, client: 'Petrex',
    title: 'Recolección Desechos Taladros PTX',
    category: 'Ambiental', img: IMG(128),
    desc: 'Recolección de desechos sólidos y líquidos para taladros PTX-5802, PTX-5920, PTX-5954, PTX-5955 y base Ojeda.',
    detail: 'Servicio integral de gestión ambiental para operaciones de perforación.',
    status: 'completed'
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

const CATEGORIES = ['Todos', 'Eléctrico', 'Civil', 'Mecánico', 'Ambiental', 'Marítimo', 'Transporte']

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

// ─── NAVBAR ──────────────────────────────────────────────────────────────────
function Navbar({ page, setPage, scrolled }) {
  const [open, setOpen] = useState(false)
  const links = [
    { id: 'inicio', label: 'Inicio' },
    { id: 'proyectos', label: 'Proyectos' },
    { id: 'quienes-somos', label: 'Quiénes Somos' },
    { id: 'contacto', label: 'Contacto' },
  ]
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/97 backdrop-blur-md shadow-[0_2px_8px_rgba(0,0,0,0.08)]' : 'bg-transparent'}`}>
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

// ─── FOOTER ──────────────────────────────────────────────────────────────────
function Footer({ setPage }) {
  return (
    <footer className="bg-dark text-white pt-14 pb-6">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-10 border-b border-white/10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <SamforLogo size={38} invert />
              <span className="font-display text-2xl tracking-wide">SAMFOR</span>
            </div>
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
const CAT_COLORS = {
  Eléctrico: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  Civil: 'bg-blue-50 text-blue-700 border-blue-200',
  Mecánico: 'bg-orange-50 text-orange-700 border-orange-200',
  Ambiental: 'bg-green-50 text-green-700 border-green-200',
  Marítimo: 'bg-cyan-50 text-cyan-700 border-cyan-200',
  Transporte: 'bg-purple-50 text-purple-700 border-purple-200',
}

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
        {/* Project image header */}
        <div className="relative h-48 md:h-56 overflow-hidden rounded-t-2xl md:rounded-t-lg">
          <img src={project.img} alt={project.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent" />
          <button onClick={onClose} className="absolute top-4 right-4 bg-white/15 backdrop-blur-sm text-white p-1.5 rounded-full hover:bg-white/25 transition-colors" aria-label="Cerrar">
            <X size={16} />
          </button>
          <div className="absolute bottom-4 left-5 right-5">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className={`text-xs font-mono font-semibold px-2 py-0.5 rounded border ${CAT_COLORS[project.category] || 'bg-gray-100 text-gray-600 border-gray-200'}`}>{project.category}</span>
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
function ProjectCard({ project, onClick, size = 'normal' }) {
  return (
    <div
      onClick={() => onClick(project)}
      className="project-card bg-white border border-border rounded overflow-hidden cursor-pointer group"
      role="button" tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onClick(project)}
    >
      {/* Real project photo */}
      <div className={`relative overflow-hidden ${size === 'large' ? 'h-52' : 'h-40'}`}>
        <img
          src={project.img}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent" />
        {project.status === 'active' && (
          <div className="absolute top-3 right-3 inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-green-600/90 backdrop-blur-sm px-2 py-0.5 rounded">
            <span className="w-1.5 h-1.5 rounded-full bg-white dot-pulse" />En Ejecución
          </div>
        )}
        <div className="absolute bottom-3 left-3">
          <span className={`text-xs font-mono font-semibold px-2 py-0.5 rounded border ${CAT_COLORS[project.category] || 'bg-white/90 text-gray-700 border-white'}`}>{project.category}</span>
        </div>
      </div>
      {/* Card body */}
      <div className="p-4">
        <p className="text-[0.6875rem] font-mono font-semibold text-samred uppercase tracking-wide mb-1.5 line-clamp-1">{project.client}</p>
        <h3 className="font-sub font-bold text-sm text-dark mb-2 leading-snug line-clamp-2">{project.title}</h3>
        <p className="text-secondary text-xs leading-relaxed mb-3 line-clamp-2">{project.desc}</p>
        <span className="text-samred text-xs font-sub font-semibold uppercase tracking-wide flex items-center gap-1 group-hover:gap-2 transition-all">
          Ver detalle <ChevronRight size={12} />
        </span>
      </div>
    </div>
  )
}

// ─── CLIENTS GRID SECTION ─────────────────────────────────────────────────────
function ClientsSection({ setPage }) {
  const visibleClients = CLIENT_GRID.slice(0, 11)

  return (
    <section className="bg-white py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="scroll-reveal text-center mb-12">
          <div className="inline-flex items-center gap-2 text-samred text-xs font-sub font-semibold uppercase tracking-widest mb-3">
            <span className="h-px w-8 bg-samred" />Confían en nosotros<span className="h-px w-8 bg-samred" />
          </div>
          <h2 className="font-display text-[2.75rem] md:text-5xl text-dark tracking-wide">NUESTROS CLIENTES</h2>
          <p className="text-secondary text-base mt-3 max-w-md mx-auto leading-relaxed">
            Instituciones líderes del sector público, privado e internacional que confían en nuestra capacidad técnica.
          </p>
        </div>

        {/* Logo grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
          {visibleClients.map((c, i) => (
            <div
              key={i}
              className="scroll-reveal group flex flex-col items-center border border-border rounded bg-white hover:border-samred/40 hover:shadow-[0_4px_20px_rgba(200,16,46,0.08)] transition-all duration-250 p-5"
              style={{ transitionDelay: `${(i % 8) * 40}ms` }}
            >
              <div
                className="w-full h-16 flex items-center justify-center rounded mb-3 overflow-hidden"
                style={{ background: c.bg || '#fff' }}
              >
                <img
                  src={c.img}
                  alt={c.name}
                  className="max-h-12 max-w-[80%] object-contain"
                  loading="lazy"
                />
              </div>
              <p className="font-sub font-bold text-xs uppercase tracking-wide text-dark text-center leading-tight mb-1.5">{c.name}</p>
              <span className={`text-[0.625rem] font-mono font-semibold uppercase tracking-wider px-2 py-0.5 rounded ${SECTOR_COLORS[c.sector] || 'bg-gray-100 text-gray-600'}`}>
                {c.sector}
              </span>
            </div>
          ))}

          {/* "Más clientes" card */}
          <div
            className="scroll-reveal flex flex-col items-center justify-center border-0 rounded bg-samred cursor-pointer hover:bg-samred/90 active:scale-[0.97] transition-all duration-200 p-5 min-h-[140px]"
            style={{ transitionDelay: `${(11 % 8) * 40}ms` }}
            onClick={() => setPage('quienes-somos')}
            role="button" tabIndex={0}
            onKeyDown={e => e.key === 'Enter' && setPage('quienes-somos')}
          >
            <Plus size={28} className="text-white mb-2" strokeWidth={2} />
            <p className="font-sub font-bold text-sm uppercase tracking-wide text-white text-center mb-0.5">Más Clientes</p>
            <p className="text-white/70 text-[0.625rem] font-mono uppercase tracking-widest text-center">Portafolio Nacional</p>
          </div>
        </div>

        {/* CTA band */}
        <div className="scroll-reveal mt-10 bg-dark rounded overflow-hidden flex flex-col md:flex-row items-center justify-between gap-4 px-7 py-5">
          <div>
            <p className="font-sub font-bold text-white text-base md:text-lg">Confían en SAMFOR</p>
            <p className="text-white/55 text-sm">Instituciones públicas, privadas e industriales de Venezuela</p>
          </div>
          <button
            onClick={() => setPage('contacto')}
            className="flex-shrink-0 btn-primary whitespace-nowrap"
          >
            Ser parte de nuestros clientes
          </button>
        </div>
      </div>
    </section>
  )
}

// ─── PAGE: INICIO ─────────────────────────────────────────────────────────────
function PageInicio({ setPage }) {
  useScrollReveal()

  const featuredProjects = [
    PROJECTS_ACTIVE[0],  // Termoeléctrica Bajo Grande
    PROJECTS_COMPLETED[0], // Subestación 155KV
    PROJECTS_COMPLETED[3], // Metro Maracaibo
  ]

  return (
    <div>
      {/* HERO */}
      <section
        className="relative flex flex-col items-start justify-center px-6 md:px-14 lg:px-20"
        style={{
          minHeight: '100dvh',
          background: `linear-gradient(rgba(10,12,15,0.72), rgba(10,12,15,0.72)), url("${IMG(28)}") center/cover no-repeat`,
        }}
      >
        <div className="max-w-7xl w-full mx-auto">
          <div className="badge-since inline-flex items-center gap-2 bg-samred text-white text-[0.6875rem] font-mono font-semibold uppercase tracking-[0.15em] px-3 py-1.5 rounded mb-7">
            <span className="w-1.5 h-1.5 rounded-full bg-white" />
            Desde 1966
          </div>
          <h1 className="font-display text-[clamp(3rem,8vw,6rem)] text-white leading-[0.95] tracking-wide mb-6 max-w-4xl">
            CONSTRUIMOS<br />EL FUTURO DE<br />LA ENERGÍA
          </h1>
          <p className="text-white/75 text-lg md:text-xl max-w-lg mb-8 leading-relaxed">
            59 años de experiencia en proyectos de alta complejidad para la industria petrolera, petroquímica y civil en Venezuela.
          </p>
          <div className="flex flex-wrap gap-3">
            <button onClick={() => setPage('proyectos')} className="btn-primary">Ver Proyectos</button>
            <button onClick={() => setPage('quienes-somos')} className="btn-outline-white">Conócenos</button>
          </div>
        </div>
        <div className="scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 select-none">
          <span className="text-white/40 text-[0.625rem] font-mono uppercase tracking-widest">Scroll</span>
          <ChevronDown size={14} className="text-white/40" />
        </div>
      </section>

      {/* METRICS STRIP */}
      <section className="border-y-[3px] border-samred bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-wrap justify-around divide-x divide-border">
            {METRICS.map(m => <CounterItem key={m.label} {...m} />)}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="bg-surface py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="scroll-reveal mb-12">
            <div className="flex items-center gap-3 mb-3">
              <span className="h-[3px] w-12 bg-samred" />
              <span className="font-sub font-semibold text-xs uppercase tracking-widest text-samred">Lo que hacemos</span>
            </div>
            <h2 className="font-display text-[2.75rem] md:text-5xl text-dark">NUESTROS SERVICIOS</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 stagger">
            {SERVICES.map(s => (
              <div key={s.title} className="service-card bg-white rounded shadow-[0_2px_16px_rgba(0,0,0,0.07)] p-6">
                <div className="text-samred mb-4">{s.icon}</div>
                <h3 className="font-sub font-bold text-[1.05rem] uppercase tracking-wide text-dark mb-2">{s.title}</h3>
                <p className="text-secondary text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS — real photos */}
      <section className="bg-white py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="scroll-reveal mb-12">
            <div className="flex items-center gap-3 mb-3">
              <span className="h-[3px] w-12 bg-samred" />
              <span className="font-sub font-semibold text-xs uppercase tracking-widest text-samred">Portafolio</span>
            </div>
            <h2 className="font-display text-[2.75rem] md:text-5xl text-dark">PROYECTOS DESTACADOS</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {featuredProjects.map((p, i) => (
              <div
                key={p.id}
                className="project-card group rounded overflow-hidden cursor-pointer"
                onClick={() => setPage('proyectos')}
                role="button" tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && setPage('proyectos')}
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={p.img}
                    alt={p.title}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/20 to-transparent" />
                  <div className="absolute inset-0 p-5 flex flex-col justify-between">
                    <span className="self-start text-xs font-mono font-semibold text-samred bg-white/90 px-2 py-0.5 rounded">{p.client}</span>
                    <div>
                      <h3 className="font-display text-[1.4rem] text-white leading-tight mb-2">{p.title}</h3>
                      <span className="text-white/75 text-xs font-sub font-semibold uppercase tracking-wide flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                        Ver más <ArrowRight size={12} />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <button onClick={() => setPage('proyectos')} className="btn-secondary">Ver Todos los Proyectos</button>
          </div>
        </div>
      </section>

      {/* CLIENTS GRID */}
      <ClientsSection setPage={setPage} />

      {/* CTA BAND */}
      <section className="bg-samred py-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center scroll-reveal">
          <h2 className="font-display text-[2.75rem] md:text-5xl lg:text-6xl text-white mb-4 tracking-wide">
            ¿TIENES UN PROYECTO? HABLEMOS.
          </h2>
          <p className="text-white/75 text-base md:text-lg mb-8 max-w-lg mx-auto leading-relaxed">
            Contamos con el equipo, la experiencia y la infraestructura para ejecutar proyectos de cualquier escala.
          </p>
          <button
            onClick={() => setPage('contacto')}
            className="bg-white text-samred font-sub font-bold text-sm uppercase tracking-widest px-8 py-4 rounded transition-all hover:bg-white/90 active:scale-[0.97]"
          >
            Contáctanos Ahora
          </button>
        </div>
      </section>
    </div>
  )
}

// ─── PAGE: PROYECTOS ──────────────────────────────────────────────────────────
function PageProyectos() {
  useScrollReveal()
  const [tab, setTab] = useState('active')
  const [catFilter, setCatFilter] = useState('Todos')
  const [modal, setModal] = useState(null)

  const allProjects = [...PROJECTS_ACTIVE, ...PROJECTS_COMPLETED]
  const filteredCompleted = PROJECTS_COMPLETED.filter(p => catFilter === 'Todos' || p.category === catFilter)
  const showList = tab === 'active' ? PROJECTS_ACTIVE : tab === 'completed' ? filteredCompleted : (catFilter === 'Todos' ? allProjects : allProjects.filter(p => p.category === catFilter))

  return (
    <div className="pt-16">
      {/* Hero */}
      <div
        className="relative py-20 px-4 md:px-8 overflow-hidden"
        style={{ background: `linear-gradient(rgba(10,12,15,0.70), rgba(10,12,15,0.70)), url("${IMG(23)}") center/cover no-repeat` }}
      >
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <span className="h-[3px] w-12 bg-samred" />
            <span className="font-sub font-semibold text-xs uppercase tracking-widest text-white/60">Portafolio</span>
          </div>
          <h1 className="font-display text-5xl md:text-6xl text-white tracking-wide mb-3">PROYECTOS</h1>
          <p className="text-white/65 text-base max-w-xl leading-relaxed">
            Décadas de experiencia ejecutando proyectos de alta complejidad en Venezuela y la región.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-border sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex gap-2 py-3 flex-wrap">
          {[{ id: 'active', label: 'En Ejecución 2025' }, { id: 'completed', label: 'Proyectos Culminados' }, { id: 'all', label: 'Todos' }].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`font-sub font-semibold text-sm uppercase tracking-wide px-4 py-2 rounded border transition-all ${tab === t.id ? 'bg-samred text-white border-samred' : 'bg-white border-border text-secondary hover:border-samred hover:text-samred'}`}
            >{t.label}</button>
          ))}
        </div>
      </div>

      {/* Category filter */}
      {(tab === 'completed' || tab === 'all') && (
        <div className="bg-surface border-b border-border py-3 px-4 md:px-8">
          <div className="max-w-7xl mx-auto flex items-center gap-2 flex-wrap">
            <Filter size={13} className="text-secondary" />
            {CATEGORIES.map(c => (
              <button key={c} onClick={() => setCatFilter(c)}
                className={`text-xs font-mono font-semibold px-2.5 py-1 rounded border transition-all ${catFilter === c ? 'bg-dark text-white border-dark' : 'bg-white text-secondary border-border hover:border-dark/40'}`}
              >{c}</button>
            ))}
          </div>
        </div>
      )}

      {/* Grid */}
      <div className="bg-white py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {showList.map(p => <ProjectCard key={p.id} project={p} onClick={setModal} />)}
            {showList.length === 0 && (
              <div className="col-span-3 text-center py-20 text-secondary">
                <Filter size={28} className="mx-auto mb-3 opacity-30" />
                <p className="font-sub font-semibold text-lg">No hay proyectos en esta categoría.</p>
              </div>
            )}
          </div>
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
      {/* Hero with real photo */}
      <section
        className="py-20 md:py-28 px-4 md:px-12"
        style={{ background: `linear-gradient(rgba(10,12,15,0.70), rgba(10,12,15,0.76)), url("${IMG(18)}") center/cover no-repeat` }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="h-[3px] w-12 bg-samred" />
              <span className="font-sub font-semibold text-xs uppercase tracking-widest text-white/55">Nuestra empresa</span>
            </div>
            <h1 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] text-white leading-tight mb-4 tracking-wide">
              UNA EMPRESA.<br />SEIS DÉCADAS.<br />UN ESTÁNDAR.
            </h1>
            <p className="text-white/65 text-lg max-w-lg leading-relaxed">
              Desde 1966, SAMFOR construye Venezuela con excelencia técnica, responsabilidad ambiental y el más alto compromiso con la seguridad.
            </p>
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
                  <div className="flex-shrink-0 w-20 md:w-28 text-right pt-0.5">
                    <span className="font-display text-[1.6rem] md:text-3xl text-samred">{item.year}</span>
                  </div>
                  <div className="flex-shrink-0 mt-2 relative z-10">
                    <div className="w-3.5 h-3.5 rounded-full bg-samred ring-4 ring-white" />
                  </div>
                  <div className="flex-1 pb-2">
                    <h3 className="font-sub font-bold text-base text-dark mb-1">{item.title}</h3>
                    <p className="text-secondary text-sm leading-relaxed">{item.desc}</p>
                  </div>
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
              { icon: <Target size={22}/>, title: 'MISIÓN', body: 'Ejecutar de manera rentable y eficiente, en armonía con el ambiente, obras y servicios de construcción civil, eléctrica, telecomunicación e instrumentación, transporte y servicios ambientales, asegurando la satisfacción del cliente y el desarrollo del talento humano.' },
              { icon: <Star size={22}/>, title: 'VISIÓN', body: 'Ser una empresa líder en Construcción, Transporte y Servicios Ambientales, reconocida por su orientación a la excelencia, calidad de servicios, solidez del equipo humano y compromiso con el desarrollo sostenible de Venezuela.' },
              { icon: <Award size={22}/>, title: 'VALORES', list: [
                { name: 'Lealtad', desc: 'Compromiso con clientes, colaboradores y el país.' },
                { name: 'Responsabilidad', desc: 'Cumplimiento técnico, ambiental y de seguridad.' },
                { name: 'Respeto a la Dignidad Humana', desc: 'Cada persona es tratada con el máximo respeto.' },
              ]},
            ].map((card, i) => (
              <div key={card.title} className="scroll-reveal bg-white rounded border-t-[3px] border-samred shadow-[0_2px_16px_rgba(0,0,0,0.07)] p-7" style={{ transitionDelay: `${i * 80}ms` }}>
                <div className="text-samblue mb-3">{card.icon}</div>
                <h3 className="font-display text-2xl text-samred mb-4">{card.title}</h3>
                {card.body && <p className="text-secondary text-sm leading-relaxed">{card.body}</p>}
                {card.list && <div className="flex flex-col gap-4">{card.list.map(v => (
                  <div key={v.name}><div className="font-sub font-bold text-sm uppercase tracking-wide text-dark mb-0.5">{v.name}</div><p className="text-secondary text-xs leading-relaxed">{v.desc}</p></div>
                ))}</div>}
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
                <div>
                  <h3 className="font-sub font-bold text-lg text-dark mb-2">{a.title}</h3>
                  <p className="text-secondary text-sm leading-relaxed">{a.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Full Clients Section */}
      <ClientsSection setPage={setPage} />

      {/* Company sheet */}
      <section className="bg-surface py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="scroll-reveal mb-8"><h2 className="font-display text-3xl md:text-4xl text-dark">FICHA DE EMPRESA</h2></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            <div className="bg-white rounded shadow-[0_2px_16px_rgba(0,0,0,0.06)] overflow-hidden">
              <div className="bg-dark text-white px-6 py-3"><span className="font-sub font-bold text-xs uppercase tracking-widest">Datos Corporativos</span></div>
              <table className="w-full text-sm">
                <tbody>
                  {[['Razón Social','SAMFOR, S.A.'],['Fundación','1966 — Maracaibo, Venezuela'],['Trayectoria','59 años de operación continua'],['Sector','Petrolero, Petroquímico, Carbonífero, Civil'],['Servicios','6 líneas de negocio especializadas'],['Certificación','Manejadora de Desechos Peligrosos (desde 1999)'],['Cobertura','Venezuela y operaciones internacionales']].map(([k,v]) => (
                    <tr key={k} className="border-b border-border last:border-0">
                      <td className="px-5 py-3 font-sub font-semibold text-secondary uppercase tracking-wide text-xs">{k}</td>
                      <td className="px-5 py-3 text-dark text-sm font-medium">{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="bg-white rounded shadow-[0_2px_16px_rgba(0,0,0,0.06)] p-6">
              <h3 className="font-sub font-bold text-xs uppercase tracking-widest text-secondary mb-5">Contacto y Dirección</h3>
              <div className="flex flex-col gap-4 mb-6">
                {[{icon:<MapPin size={15} className="text-samred"/>,label:'Dirección',value:'Av. 3H entre Calles 68-70 N.69-61, Maracaibo, Venezuela'},{icon:<Mail size={15} className="text-samred"/>,label:'Email',value:'samfor@samfor.com'},{icon:<Phone size={15} className="text-samred"/>,label:'Teléfonos',value:'+58 261 814 4444 / +58 414-615.8000'},{icon:<Globe size={15} className="text-samred"/>,label:'Web',value:'www.samfor.com'}].map(item => (
                  <div key={item.label} className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5">{item.icon}</div>
                    <div><div className="text-xs font-mono text-secondary/60 uppercase tracking-widest mb-0.5">{item.label}</div><div className="text-dark text-sm font-medium">{item.value}</div></div>
                  </div>
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

  const handleSubmit = async e => {
    e.preventDefault(); setSending(true)
    await new Promise(r => setTimeout(r, 1500))
    setSending(false); setSent(true)
  }
  const handleJobSubmit = async e => {
    e.preventDefault(); setJobSending(true)
    await new Promise(r => setTimeout(r, 1500))
    setJobSending(false); setJobSent(true)
  }

  return (
    <div className="pt-16">
      {/* Contact hero with real photo */}
      <div className="relative h-36 md:h-48 overflow-hidden">
        <img src={IMG(28)} alt="" className="w-full h-full object-cover object-top" />
        <div className="absolute inset-0 bg-dark/70 flex items-end pb-8 px-8 md:px-16">
          <div className="max-w-7xl w-full mx-auto">
            <h1 className="font-display text-5xl md:text-6xl text-white tracking-wide">CONTACTO</h1>
          </div>
        </div>
      </div>

      {/* Contact form */}
      <section className="bg-white py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded overflow-hidden shadow-[0_4px_40px_rgba(0,0,0,0.09)]">
            <div className="bg-surface p-8 md:p-12">
              <h2 className="font-display text-[3.5rem] md:text-[4rem] text-samred mb-3 leading-none">HABLEMOS</h2>
              <p className="text-secondary text-base mb-8 leading-relaxed max-w-sm">Estamos listos para evaluar tu proyecto. Un especialista se pondrá en contacto contigo.</p>
              <div className="flex flex-col gap-5 mb-10">
                {[{icon:<Mail size={16} className="text-samred flex-shrink-0"/>,label:'Email',value:'samfor@samfor.com'},{icon:<Phone size={16} className="text-samred flex-shrink-0"/>,label:'Teléfonos',value:'+58 261 814 4444\n+58 414-615.8000'},{icon:<Globe size={16} className="text-samred flex-shrink-0"/>,label:'Web',value:'www.samfor.com'},{icon:<MapPin size={16} className="text-samred flex-shrink-0"/>,label:'Dirección',value:'Av. 3H entre Calles 68-70 N.69-61\nMaracaibo, Venezuela'}].map(item => (
                  <div key={item.label} className="flex items-start gap-3">
                    {item.icon}
                    <div><div className="text-xs font-mono text-secondary/55 uppercase tracking-widest mb-0.5">{item.label}</div><div className="text-dark text-sm font-medium whitespace-pre-line">{item.value}</div></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white p-8 md:p-12">
              {sent ? (
                <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                  <CheckCircle size={44} className="text-green-500 mb-4" />
                  <h3 className="font-display text-3xl text-dark mb-2">Mensaje Enviado</h3>
                  <p className="text-secondary text-sm">Un especialista se pondrá en contacto a la brevedad.</p>
                  <button onClick={() => { setSent(false); setForm({ name:'',company:'',email:'',phone:'',type:'',message:'' }) }} className="btn-secondary mt-6">Nuevo Mensaje</button>
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

      {/* Jobs */}
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
                <p className="text-secondary text-sm">Revisaremos tu perfil y nos pondremos en contacto si hay oportunidad alineada.</p>
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
                  <label className="text-[0.6875rem] font-mono text-secondary uppercase tracking-widest block mb-2">CV / Hoja de Vida (PDF o DOC)</label>
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
