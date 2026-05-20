import { useState, useEffect, useRef } from 'react'
import {
  Zap, Building2, Settings, Truck, Leaf, Ship,
  ChevronRight, Menu, X, ArrowRight, MapPin, Phone, Mail, Globe,
  Upload, CheckCircle, Award, Target,
  Shield, Star, ChevronDown, Filter, Users
} from 'lucide-react'

// ─── DATA ───────────────────────────────────────────────────────────────────

const SERVICES = [
  {
    icon: <Zap size={28} />, title: 'Obras Eléctricas',
    desc: 'Diseño y construcción de plantas eléctricas, subestaciones, tendido de alta tensión, automatización industrial y sistemas SCADA.',
  },
  {
    icon: <Building2 size={28} />, title: 'Obras Civiles',
    desc: 'Movimiento de tierras, edificaciones, carreteras, puentes, muelles y construcción en plataformas petroleras y petroquímicas.',
  },
  {
    icon: <Settings size={28} />, title: 'Obras Mecánicas',
    desc: 'Oleoductos, acueductos, tanques, estaciones de bombeo, instalación de tuberías y mantenimiento de facilidades de producción.',
  },
  {
    icon: <Truck size={28} />, title: 'Transporte',
    desc: 'Transporte especializado de hidrocarburos, equipos industriales y personal. Cobertura terrestre, aérea y marítima en todo Venezuela.',
  },
  {
    icon: <Leaf size={28} />, title: 'Servicios Ambientales',
    desc: 'Manejadora de Desechos Peligrosos autorizada desde 1999. Recolección, transporte, tratamiento y disposición final conforme a normativas.',
  },
  {
    icon: <Ship size={28} />, title: 'Servicios Marítimos/Lacustres',
    desc: 'Operaciones en el Lago de Maracaibo, costas venezolanas y Archipiélago Los Monjes. Transporte hacia plataformas offshore con embarcaciones especializadas.',
  },
]

const METRICS = [
  { value: 59, suffix: '', label: 'Años de experiencia' },
  { value: 100, suffix: '+', label: 'Proyectos ejecutados' },
  { value: 20, suffix: '+', label: 'Clientes internacionales' },
  { value: 6, suffix: '', label: 'Líneas de servicio' },
]

const CLIENTS = [
  'PDVSA','Chevron','Shell','Repsol','Eni','Halliburton','Baker Hughes',
  'Schlumberger','Weatherford','PEQUIVEN','Petrobras','Gazprom',
  'WFP / ONU','UNHCR','Metro de Maracaibo','ENELVEN','ENELCO','Maraven',
  'Petroregional del Lago','Suelopetrol','VENESHRIMP',
]

const PROJECTS_ACTIVE = [
  {
    id: 1, client: 'CHEVRON GLOBAL TECHNOLOGY SERVICE COMPANY',
    title: 'Mantenimiento Integral Planta Termoeléctrica Bajo Grande',
    category: 'Eléctrico',
    desc: 'Servicio integral de operación y mantenimiento de la Planta Termoeléctrica Bajo Grande. Abarca sistemas de agua, contra incendios, combustible, aire comprimido, electricidad, turbogeneradores, tratamiento de aguas, SCADA y comunicaciones.',
    detail: 'Objetivo: mejorar la eficiencia operativa, prolongar la vida útil de los equipos y garantizar la continuidad del suministro eléctrico a Campo Boscán. Incluye mantenimiento predictivo, preventivo y correctivo con operación 24/7.',
    status: 'active'
  },
  {
    id: 2, client: 'CHEVRON GLOBAL TECHNOLOGY SERVICE COMPANY',
    title: 'Instalación y Preservación Turbinas GE LM-6000PC',
    category: 'Mecánico',
    desc: 'Servicios integrales para la operación y mantenimiento de la Planta Termoeléctrica Bajo Grande. Comprende instalación y desmontaje de turbinas GE LM6000PC.',
    detail: 'Alcance: acondicionamiento y mantenimiento preventivo y correctivo, certificación de equipos, reparación de motores y componentes, suministro de repuestos. Objetivo: optimizar la eficiencia operativa y prolongar la vida útil.',
    status: 'active'
  },
  {
    id: 3, client: 'CHEVRON GLOBAL TECHNOLOGY SERVICE COMPANY',
    title: 'Mantenimiento Planta de Agua Desmineralizada Bajo Grande',
    category: 'Mecánico',
    desc: 'Mantenimiento correctivo de la Planta de Agua Desmineralizada en la Planta Termoeléctrica Bajo Grande. Incluye subsistemas críticos de la planta.',
    detail: 'Actividades: mantenimiento mayor, intermedio y menor de subsistemas, mejoras civiles de infraestructuras, certificación de equipos, reparación de motores eléctricos, válvulas y bombas, actualización de sistemas de detección y medición.',
    status: 'active'
  },
  {
    id: 4, client: 'CHEVRON GLOBAL TECHNOLOGY SERVICE COMPANY',
    title: 'Mantenimiento Generadores de Emergencia Petro Boscán',
    category: 'Eléctrico',
    desc: 'Servicio de mantenimiento a generadores de emergencia en las instalaciones de Petro Boscán. Instalación, configuración, inspección y reparación de sistemas.',
    detail: 'Incluye: inspección y limpieza de equipos, reparación y mantenimiento preventivo y correctivo, configuración de software, pruebas en sitio, puesta en marcha con garantía de buen funcionamiento.',
    status: 'active'
  },
  {
    id: 5, client: 'CHEVRON GLOBAL TECHNOLOGY SERVICE COMPANY',
    title: 'Mantenimiento Integral Instalaciones Petro Boscán',
    category: 'Civil',
    desc: 'Mantenimiento integral aplicando métodos físicos, mecánicos y químicos en áreas operacionales y administrativas en Campo Boscán, Richmond, Terminal Bajo Grande y Termoeléctrica.',
    detail: 'Durante un año se desmalezarán 21.000.000 m²: 14.000.000 m² mediante corte manual y 7.000.000 m² con corte a máquina. Áreas: Campo Boscán, Richmond, Terminal de Embarque Bajo Grande y Termoeléctrica Bajo Grande.',
    status: 'active'
  },
  {
    id: 6, client: 'CHEVRON GLOBAL TECHNOLOGY SERVICE COMPANY',
    title: 'Tendido Líneas Eléctricas 24 KV Campo Boscán',
    category: 'Eléctrico',
    desc: 'Construcción de instalaciones eléctricas de superficie para el suministro eléctrico a pozos productores de crudo en el área operativa de Campo Boscán.',
    detail: 'Incluye: tendido de líneas aéreas de 24 KV (postes, herrajes y accesorios), instalación de bancos de transformadores, cableados y acometidas eléctricas, puestas a tierra, conexión de motores y equipos eléctricos.',
    status: 'active'
  },
  {
    id: 7, client: 'PDVSA PETRÓLEO, S.A.',
    title: 'Mantenimiento General Llenadero Productos Blancos Cardón',
    category: 'Mecánico',
    desc: 'Mantenimiento general del llenadero de productos blancos en la refinería Cardón, garantizando la operatividad y seguridad de las instalaciones.',
    detail: 'Trabajos de mantenimiento integral en el llenadero de productos blancos, incluyendo mantenimiento de equipos mecánicos, instalaciones eléctricas, estructuras civiles y sistemas de seguridad.',
    status: 'active'
  },
]

const PROJECTS_COMPLETED = [
  {
    id: 101, client: 'PDVSA PETRÓLEO, S.A.',
    title: 'Implantación Generadores + Subestación 155 KV',
    category: 'Eléctrico',
    desc: 'Proyecto IPC: instalación de dos Turbo Generadores de Gas de 30 MW ISO en ciclo simple, subestación 155 KV e interconexión con Línea Doble Terna Pirital–Pigap II a 115 kV.',
    detail: 'Contrato modalidad IPC (Ingeniería, Procura y Construcción). Diseño, adquisición, construcción e instalación de la planta de generación. Ubicación: Planta PIGAP II, El Tejero, Municipio Ezequiel Zamora, Estado Monagas.',
    status: 'completed'
  },
  {
    id: 102, client: 'PDVSA PETRÓLEO, S.A.',
    title: 'Puntos GNV Carabobo, Yaracuy y Aragua',
    category: 'Mecánico',
    desc: 'Ingeniería de detalle y construcción de puntos de expendio de gas natural vehicular en estaciones de servicio en los estados Carabobo, Yaracuy y Aragua.',
    detail: 'Alcance: acometidas eléctricas alta y baja tensión, módulos de medición, tableros eléctricos, transformadores, cableado de unidades de compresión, sistema de puesta a tierra, iluminación exterior. Incluye disciplinas civil, mecánica e instrumentación.',
    status: 'completed'
  },
  {
    id: 103, client: 'PDVSA PETRÓLEO, S.A.',
    title: 'Gasoducto Anaco–Barquisimeto Ø36" y Ø30"',
    category: 'Mecánico',
    desc: 'Reemplazo de tramos de tubería Ø36" API 5L X60 y Ø30" API 5L X52 en el Sistema de Transmisión de Gas Anaco–Barquisimeto. Subsistemas EPA-N50 y EPA-N5.',
    detail: 'Ejecución de obras civiles y mecánicas para adecuación del gasoducto LANA Ø36" y NURGAS Ø30" mediante reclasificación de área, garantizando operatividad y cumplimiento con estándares de seguridad vigentes.',
    status: 'completed'
  },
  {
    id: 104, client: 'PRECOWAYSS / Metro de Maracaibo',
    title: 'Obras Complementarias Metro de Maracaibo',
    category: 'Civil',
    desc: 'Construcción de muros, defensas y drenajes, infraestructura de Patios y Talleres, reubicación de servicios tramo TR-4 y equipamiento del Edificio de Servicios Generales.',
    detail: 'Incluye: explanación de patios y talleres, adecuación de área de oficinas generales y presidencial, equipamiento segunda planta del Edificio de Servicios Generales. Metro de Maracaibo.',
    status: 'completed'
  },
  {
    id: 105, client: 'PDVSA PETRÓLEO, S.A.',
    title: 'Interconexión Islas Los Monjes Sur',
    category: 'Civil',
    desc: 'Construcción del Dique Escollera para la interconexión entre las Islas de los Monjes del Sur y la plataforma en la Isla Pequeña del Archipiélago Los Monjes, Estado Insular.',
    detail: 'Actividades: movilización de equipos, instalación de estructuras provisionales, preparación y voladura de rocas, construcción de terrazas y rompeolas para interconexión de las islas.',
    status: 'completed'
  },
  {
    id: 106, client: 'ENELVEN',
    title: 'Subestación El Tablazo 400/230/34.5 KV – 150 MVA',
    category: 'Eléctrico',
    desc: 'Suministro, traslado, instalación y puesta en servicio de un autotransformador de potencia monofásico 400/230/34.5 KV, 150 MVA para la Subestación El Tablazo.',
    detail: 'Proyecto ejecutado para ENELVEN. Autotransformador de potencia monofásico de alta capacidad, instalación y puesta en servicio completa con pruebas de funcionamiento.',
    status: 'completed'
  },
  {
    id: 107, client: 'ENELCO',
    title: 'Subestación Cabimas 230/115 KV',
    category: 'Eléctrico',
    desc: 'Montaje electromecánico, ampliación de subestación Cabimas 230/115 KV. Construcción línea de transmisión entrada y salida subestación Cabimas 230 KV.',
    detail: 'Energía Eléctrica de la Costa Oriental. Ampliación y montaje electromecánico completo. Construcción de la línea de transmisión de entrada y salida.',
    status: 'completed'
  },
  {
    id: 108, client: 'VENESHRIMP',
    title: 'Proyecto Acuícola Mitare (VENESHRIMP)',
    category: 'Civil',
    desc: 'Ingeniería, Procura y Construcción del Proyecto Acuícola Mitare. Movimiento de tierras, lagunas, muros, diques e infraestructura para proyecto camaronero.',
    detail: 'Proyecto IPC para VENESHRIMP. Construcción de infraestructura acuícola completa incluyendo lagunas de cultivo, sistemas de distribución de agua, estructuras civiles e instalaciones eléctricas.',
    status: 'completed'
  },
  {
    id: 109, client: 'CHEVRON / TEXACO PETROLEUM Co.',
    title: 'Sistema de Remediación Petroboscán',
    category: 'Ambiental',
    desc: 'Sub Estación Eléctrica de la Refinería Bajo Grande. Sistema de remediación para Petroboscán. Transporte de efluentes líquidos y desechos sólidos.',
    detail: 'Transporte terrestre en unidades tipo Vacuum y de plataforma. Tratamiento de efluentes líquidos. Disposición final de desechos sólidos. Procesamiento de materiales peligrosos.',
    status: 'completed'
  },
  {
    id: 110, client: 'SHELL VENEZUELA',
    title: 'Manejo Integral Desechos Industriales Shell',
    category: 'Ambiental',
    desc: 'Remoción, extracción y limpieza de desechos en gabarras. Transporte desde muelle Ciudad Ojeda. Transporte de lodos y ripios de perforación. Almacenamiento temporal y tratamiento.',
    detail: 'Servicios ambientales integrales: recolección, transporte, almacenamiento temporal, tratamiento de desechos sólidos y líquidos. Técnicas de esparcimiento y biorremediación.',
    status: 'completed'
  },
  {
    id: 111, client: 'PETROQUÍMICA DE VENEZUELA, S.A. (PEQUIVEN)',
    title: 'Tendido Eléctrico Planta Cloro Soda',
    category: 'Eléctrico',
    desc: 'Tendido de alimentaciones eléctricas en bandeja portacables a motores de 480V en la Planta Cloro Soda. Complejo Petroquímico Ana María Campos.',
    detail: 'Instalación de bandejas portacables, tendido de cables de potencia 480V, conexiones a motores eléctricos. Trabajos en el Complejo Petroquímico Ana María Campos, Zulia.',
    status: 'completed'
  },
  {
    id: 112, client: 'CARDON IV (ENI / REPSOL)',
    title: 'Servicio Embarcaciones Campo Perla',
    category: 'Marítimo',
    desc: 'Provisión de servicio de embarcación NO estándar, NO DP para las operaciones marítimas en Campo Perla. Transporte de materiales, equipos y personal.',
    detail: 'Servicios marítimos para Cardón IV (CM 4600001208 / CM 4700022511). Embarcaciones especializadas para operaciones offshore en Campo Perla, Golfo de Venezuela.',
    status: 'completed'
  },
  {
    id: 113, client: 'United Nations – World Food Programme',
    title: 'Transporte Alimentos WFP / ONU',
    category: 'Transporte',
    desc: 'Servicio de transporte para alimentos en la Zona Sur del Lago de Maracaibo, Estado Zulia y Estado Yaracuy. Productos alimenticios e insumos no alimentarios del PMA.',
    detail: 'Contratos múltiples con WFP. Transporte en estados Zulia y Yaracuy. Procura y entrega de insumos de cocina de acero inoxidable a locaciones rurales.',
    status: 'completed'
  },
  {
    id: 114, client: 'UNHCR / Consejo Noruego para Refugiados',
    title: 'Suministros Humanitarios UNHCR',
    category: 'Transporte',
    desc: 'Procura y entrega de camas y colchones a poblaciones rurales en todo el país. Procura y transporte de kits de salud personal a San Cristóbal, Estado Táchira.',
    detail: 'Contratos UNHCR y Consejo Noruego para Refugiados. Distribución logística nacional de suministros humanitarios a poblaciones vulnerables.',
    status: 'completed'
  },
  {
    id: 115, client: 'CONSORCIO PETROBRAS ENERGÍA – WILLIAMS',
    title: 'Saneamiento Ambiental Bachaquero / Puerto Miranda',
    category: 'Ambiental',
    desc: 'Movilización de equipos, manejo y disposición del agua en fosa, tratamientos de sedimentos y suelos impactados, confinamiento de sedimentos.',
    detail: 'Actividades: obras temporales, manejo del agua contenida en fosa, tratamiento de sedimentos y suelos, suministro de material de préstamo, confinamiento y conformación superficial en Bachaquero y Puerto Miranda.',
    status: 'completed'
  },
  {
    id: 116, client: 'SCHLUMBERGER, WEATHERFORD, MI SWACO',
    title: 'Transporte Lodos y Ripios de Perforación',
    category: 'Transporte',
    desc: 'Transporte terrestre de lodos y ripios de perforación base agua y aceite, efluentes líquidos, salmueras contaminadas y química descartada.',
    detail: 'Clientes: Schlumberger, Weatherford, Tucker Energy, Dresser Rand, MI Swaco. Unidades vacuum y bateas. Servicio certificado de manejo de residuos de perforación.',
    status: 'completed'
  },
  {
    id: 117, client: 'MARAVEN, S.A.',
    title: 'Subestaciones y Mejoras Eléctricas Lagunillas',
    category: 'Eléctrico',
    desc: 'Acometida eléctrica estación de drenaje El Polvorín Lagunillas. Construcción Subestación 42 Lagunillas Campo Las Delicias. Mejoras eléctricas en drenajes Lagunillas.',
    detail: 'Tres contratos ejecutados para Maraven en el área de Lagunillas. Infraestructura eléctrica para operaciones de producción.',
    status: 'completed'
  },
  {
    id: 118, client: 'MINISTERIO DE INFRAESTRUCTURA',
    title: 'Carretera Los Filuos – Cojoro – Castillete',
    category: 'Civil',
    desc: 'Construcción y pavimentación de carretera Los Filuos – Cojoro – Castillete. Obra de infraestructura vial para el Ministerio de Infraestructura.',
    detail: 'Proyecto de infraestructura vial completo incluyendo movimiento de tierras, base, sub-base, pavimentación asfáltica y obras complementarias.',
    status: 'completed'
  },
  {
    id: 119, client: 'GOBERNACIÓN DEL ESTADO FALCÓN',
    title: 'Subestación Eléctrica La Sabanita – Falcón',
    category: 'Eléctrico',
    desc: 'Consolidación de la subestación eléctrica La Sabanita, Municipio Petit, Estado Falcón.',
    detail: 'Consolidación y puesta en servicio de subestación eléctrica para la Gobernación del Estado Falcón, beneficiando la distribución eléctrica regional.',
    status: 'completed'
  },
  {
    id: 120, client: 'SUELOPETROL',
    title: 'Manejo Arenas Petrolizadas',
    category: 'Ambiental',
    desc: 'Transporte de arenas petrolizadas en volquetas. Manejo y disposición final de arenas petrolizadas conforme a normativas ambientales vigentes.',
    detail: 'Servicio ambiental certificado para manejo de residuos industriales peligrosos. Transporte y disposición final de arenas petrolizadas.',
    status: 'completed'
  },
  {
    id: 121, client: 'PDVSA PETRÓLEO, S.A.',
    title: 'Mantenimiento Campos Bachaquero y Barua Motatan',
    category: 'Mecánico',
    desc: 'Mantenimiento operacional de facilidades de producción tierra costa este, Campos Bachaquero y Barua Motatan.',
    detail: 'Facilidades civiles, eléctricas y mecánicas a pozos, localizaciones, vías de acceso e instalaciones en los campos Barua, Motatan y Tomoporo.',
    status: 'completed'
  },
  {
    id: 122, client: 'PETREX',
    title: 'Recolección Desechos Taladros PTX',
    category: 'Ambiental',
    desc: 'Contrato de recolección de desechos sólidos y líquidos para los taladros PTX-5802, PTX-5920, PTX-5954, PTX-5955 y base Ojeda.',
    detail: 'Servicio integral de gestión ambiental para operaciones de perforación. Recolección, transporte y disposición final conforme a normativas.',
    status: 'completed'
  },
  {
    id: 123, client: 'PETROREGIONAL DEL LAGO',
    title: 'Manejo Lodos Perforación Petroregional',
    category: 'Ambiental',
    desc: 'Transporte terrestre de lodos y ripios de perforación. Almacenamiento temporal, tratamiento mediante esparcimiento y disposición final.',
    detail: 'Unidades vacuum y volquetas. Almacenamiento temporal certificado. Tratamiento por esparcimiento y biorremediación de residuos de perforación.',
    status: 'completed'
  },
]

const TIMELINE = [
  { year: '1966', title: 'Fundación de SAMFOR', desc: 'Nace SAMFOR, S.A. en Maracaibo, Venezuela. Inicio de operaciones en la industria petrolera del Lago de Maracaibo.' },
  { year: '1980s', title: 'Expansión de Servicios', desc: 'Ampliación hacia obras civiles, mecánicas y telecomunicaciones. Consolidación como contratista integral del sector energético.' },
  { year: '1999', title: 'Autorización Ambiental', desc: 'Autorización por el Ministerio del Poder Popular del Ecosistema como Manejadora de Desechos Peligrosos. Nueva línea de negocios estratégica.' },
  { year: '2000s', title: 'Expansión Internacional', desc: 'Contratos con Shell, Petrobras, Eni/Repsol y Cardón IV. Operaciones en el Archipiélago Los Monjes y Campo Perla offshore.' },
  { year: '2015', title: 'Proyectos Hito', desc: 'Ejecución del Metro de Maracaibo, Gasoductos Anaco–Barquisimeto y contratos con organismos internacionales WFP/UNHCR.' },
  { year: '2025', title: '59 Años de Trayectoria', desc: 'Proyectos activos con Chevron y PDVSA. 59 años de excelencia técnica, seguridad y compromiso con Venezuela y sus industrias estratégicas.' },
]

const CATEGORIES_COMPLETED = ['Todos', 'Eléctrico', 'Civil', 'Mecánico', 'Ambiental', 'Marítimo', 'Transporte']

// ─── HOOKS ──────────────────────────────────────────────────────────────────

function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.scroll-reveal')
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('revealed'); io.unobserve(e.target) }
      }),
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

// ─── LOGO ────────────────────────────────────────────────────────────────────
function SamforLogo({ size = 36, invert = false }) {
  return (
    <img
      src="/samfor-logo.png"
      alt="SAMFOR"
      width={size}
      height={size}
      className={`object-contain ${invert ? 'brightness-0 invert' : ''}`}
    />
  )
}

// ─── NAVBAR ─────────────────────────────────────────────────────────────────
function Navbar({ page, setPage, scrolled }) {
  const [open, setOpen] = useState(false)
  const links = [
    { id: 'inicio', label: 'Inicio' },
    { id: 'proyectos', label: 'Proyectos' },
    { id: 'quienes-somos', label: 'Quiénes Somos' },
    { id: 'contacto', label: 'Contacto' },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/97 backdrop-blur-md shadow-[0_2px_8px_rgba(0,0,0,0.08)]' : 'bg-transparent'
      }`}
      aria-label="Navegación principal"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        <button
          onClick={() => { setPage('inicio'); setOpen(false) }}
          className="flex items-center gap-2.5"
          aria-label="Inicio"
        >
          <SamforLogo size={36} />
          <span className="font-display text-[1.6rem] text-dark tracking-wide leading-none">SAMFOR</span>
        </button>

        <div className="hidden md:flex items-center gap-7">
          {links.map(l => (
            <button
              key={l.id}
              onClick={() => setPage(l.id)}
              className={`nav-link font-sub font-semibold text-[0.8125rem] tracking-wider uppercase transition-colors ${
                page === l.id ? 'text-samred active' : 'text-dark hover:text-samred'
              }`}
              aria-current={page === l.id ? 'page' : undefined}
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={() => setPage('contacto')}
            className="btn-outline-red text-[0.75rem] ml-1"
          >
            Trabaja con Nosotros
          </button>
        </div>

        <button
          className="md:hidden p-2 text-dark"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t border-border px-5 pb-6 pt-2 shadow-lg">
          <div className="flex flex-col gap-0">
            {links.map(l => (
              <button
                key={l.id}
                onClick={() => { setPage(l.id); setOpen(false) }}
                className={`text-left py-3.5 font-sub font-semibold text-base tracking-wider uppercase border-b border-border last:border-0 transition-colors ${
                  page === l.id ? 'text-samred' : 'text-dark'
                }`}
              >
                {l.label}
              </button>
            ))}
            <button onClick={() => { setPage('contacto'); setOpen(false) }} className="btn-outline-red mt-4 self-start">
              Trabaja con Nosotros
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}

// ─── FOOTER ─────────────────────────────────────────────────────────────────
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
            <p className="text-white/55 text-sm leading-relaxed mb-5 max-w-xs">
              Construyendo Venezuela desde 1966. Empresa líder en construcción industrial, servicios petroleros y ambientales.
            </p>
          </div>
          <div>
            <h4 className="font-sub font-semibold text-xs uppercase tracking-widest text-white/40 mb-5">Navegación</h4>
            <div className="flex flex-col gap-2.5">
              {[
                { id: 'inicio', label: 'Inicio' },
                { id: 'proyectos', label: 'Proyectos' },
                { id: 'quienes-somos', label: 'Quiénes Somos' },
                { id: 'contacto', label: 'Contacto' },
              ].map(l => (
                <button key={l.id} onClick={() => setPage(l.id)} className="text-left text-white/65 hover:text-white transition-colors text-sm">
                  {l.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-sub font-semibold text-xs uppercase tracking-widest text-white/40 mb-5">Contacto</h4>
            <div className="flex flex-col gap-3 text-sm text-white/65">
              <div className="flex items-start gap-2.5">
                <MapPin size={13} className="mt-0.5 flex-shrink-0 text-samred" />
                <span>Av. 3H entre Calles 68-70 N.69-61, Maracaibo, Venezuela</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail size={13} className="flex-shrink-0 text-samred" />
                <span>samfor@samfor.com</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone size={13} className="flex-shrink-0 text-samred" />
                <span>+58 261 814 4444</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Globe size={13} className="flex-shrink-0 text-samred" />
                <span>www.samfor.com</span>
              </div>
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

// ─── COUNTER ITEM ────────────────────────────────────────────────────────────
function CounterItem({ value, suffix, label }) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  const count = useCounter(value, inView)

  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); io.disconnect() } },
      { threshold: 0.4 }
    )
    if (ref.current) io.observe(ref.current)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={ref} className="text-center px-5 py-7 flex-1 min-w-[130px]">
      <div className="font-display text-[3.5rem] md:text-[4rem] text-samred leading-none font-mono tabular-nums">
        {count}{suffix}
      </div>
      <div className="font-sub text-xs font-semibold uppercase tracking-widest text-secondary mt-2">{label}</div>
    </div>
  )
}

// ─── PROJECT MODAL ───────────────────────────────────────────────────────────
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
    const h = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', h)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', h); document.body.style.overflow = '' }
  }, [onClose])

  return (
    <div
      className="modal-overlay fixed inset-0 z-[100] bg-dark/60 flex items-end md:items-center justify-center p-0 md:p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="modal-content bg-white w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-t-2xl md:rounded-lg"
        onClick={e => e.stopPropagation()}
      >
        <div className="h-1 bg-samred rounded-t-2xl md:rounded-t-lg" />
        <div className="p-6 md:p-8">
          <div className="flex items-start justify-between gap-4 mb-5">
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className={`text-xs font-mono font-semibold px-2 py-0.5 rounded border ${CAT_COLORS[project.category] || 'bg-gray-100 text-gray-600 border-gray-200'}`}>
                  {project.category}
                </span>
                {project.status === 'active' && (
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-green-700 bg-green-50 px-2 py-0.5 rounded border border-green-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 dot-pulse" />
                    En Ejecución 2025
                  </span>
                )}
              </div>
              <h3 className="font-display text-2xl md:text-3xl text-dark leading-tight">{project.title}</h3>
            </div>
            <button onClick={onClose} className="flex-shrink-0 p-1.5 text-secondary hover:text-dark transition-colors rounded" aria-label="Cerrar">
              <X size={18} />
            </button>
          </div>
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

// ─── PAGE: INICIO ────────────────────────────────────────────────────────────
function PageInicio({ setPage }) {
  useScrollReveal()

  const featuredProjects = [
    {
      seed: 'oilpower47a', client: 'Chevron',
      title: 'Planta Termoeléctrica Bajo Grande',
      desc: 'Mantenimiento integral predictivo, preventivo y correctivo. Operación continua 24/7.',
    },
    {
      seed: 'pdvsa_substation9', client: 'PDVSA',
      title: 'Subestación 155 KV + Generadores 30 MW',
      desc: 'Proyecto IPC completo. Dos turbo generadores de gas en ciclo simple interconectados a la red nacional.',
    },
    {
      seed: 'metro_construction4', client: 'Metro de Maracaibo',
      title: 'Obras Complementarias Metro',
      desc: 'Muros, drenajes, patios, talleres e infraestructura del Edificio de Servicios Generales.',
    },
  ]

  return (
    <div>
      {/* HERO */}
      <section
        className="relative flex flex-col items-start justify-center px-6 md:px-14 lg:px-20"
        style={{
          minHeight: '100dvh',
          background: 'linear-gradient(rgba(10,12,15,0.74), rgba(10,12,15,0.74)), url("https://picsum.photos/seed/heavy_industry_oil_rig/1600/900") center/cover no-repeat',
        }}
        aria-label="Hero"
      >
        <div className="max-w-7xl w-full mx-auto">
          <div className="badge-since inline-flex items-center gap-2 bg-samred text-white text-[0.6875rem] font-mono font-semibold uppercase tracking-[0.15em] px-3 py-1.5 rounded mb-7">
            <span className="w-1.5 h-1.5 rounded-full bg-white" />
            Desde 1966
          </div>
          <h1
            className="font-display text-[clamp(3rem,8vw,6rem)] text-white leading-[0.95] tracking-wide mb-6 max-w-4xl"
          >
            CONSTRUIMOS<br />EL FUTURO DE<br />LA ENERGÍA
          </h1>
          <p className="text-white/75 text-lg md:text-xl max-w-lg mb-8 leading-relaxed font-body">
            59 años de experiencia en proyectos de alta complejidad para la industria petrolera, petroquímica y civil.
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

      {/* METRICS */}
      <section className="border-y-[3px] border-samred bg-white" aria-label="Métricas clave">
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

      {/* FEATURED PROJECTS */}
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
                key={i}
                className="project-card rounded overflow-hidden cursor-pointer group"
                style={{
                  background: `linear-gradient(rgba(13,17,23,0.58), rgba(13,17,23,0.74)), url("https://picsum.photos/seed/${p.seed}/600/400") center/cover no-repeat`,
                  minHeight: 260,
                }}
                onClick={() => setPage('proyectos')}
                role="button"
                tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && setPage('proyectos')}
              >
                <div className="p-6 h-full flex flex-col justify-between min-h-[260px]">
                  <span className="text-xs font-mono font-semibold text-samred bg-samred/10 border border-samred/25 px-2 py-0.5 rounded self-start">{p.client}</span>
                  <div>
                    <h3 className="font-display text-[1.5rem] text-white mb-2 leading-tight">{p.title}</h3>
                    <p className="text-white/65 text-sm mb-4 leading-relaxed">{p.desc}</p>
                    <span className="text-white/75 text-xs font-sub font-semibold uppercase tracking-wide flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                      Ver más <ArrowRight size={13} />
                    </span>
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

      {/* CLIENTS MARQUEE */}
      <section className="bg-surface py-14 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8 mb-8 scroll-reveal text-center">
          <h2 className="font-display text-3xl md:text-4xl text-samred tracking-wide">NUESTROS CLIENTES</h2>
        </div>
        <div className="overflow-hidden relative">
          <div className="marquee-track">
            {[...CLIENTS, ...CLIENTS].map((c, i) => (
              <span key={i} className="flex items-center mx-8 whitespace-nowrap">
                <span className="font-sub font-bold text-sm uppercase tracking-widest text-secondary/45 hover:text-samred transition-colors cursor-default select-none">{c}</span>
                <span className="ml-8 w-1 h-1 rounded-full bg-samred/25 inline-block" />
              </span>
            ))}
          </div>
        </div>
      </section>

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

// ─── PAGE: PROYECTOS ─────────────────────────────────────────────────────────
function PageProyectos() {
  useScrollReveal()
  const [tab, setTab] = useState('active')
  const [catFilter, setCatFilter] = useState('Todos')
  const [modal, setModal] = useState(null)

  const allProjects = [...PROJECTS_ACTIVE, ...PROJECTS_COMPLETED]
  const filteredCompleted = PROJECTS_COMPLETED.filter(p => catFilter === 'Todos' || p.category === catFilter)
  const filteredAll = catFilter === 'Todos' ? allProjects : allProjects.filter(p => p.category === catFilter)

  const showList = tab === 'active' ? PROJECTS_ACTIVE : tab === 'completed' ? filteredCompleted : filteredAll

  return (
    <div className="pt-16">
      <div className="bg-surface py-16 px-4 md:px-8 relative overflow-hidden">
        <div className="absolute top-6 right-10 select-none pointer-events-none" aria-hidden>
          <div className="w-44 h-[3px] bg-samred rotate-[-10deg] mb-3 translate-x-6 opacity-20" />
          <div className="w-32 h-[3px] bg-samred rotate-[-10deg] mb-3 opacity-20" />
          <div className="w-20 h-[3px] bg-samblue rotate-[-10deg] -translate-x-4 opacity-20" />
        </div>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <span className="h-[3px] w-12 bg-samred" />
            <span className="font-sub font-semibold text-xs uppercase tracking-widest text-samred">Portafolio</span>
          </div>
          <h1 className="font-display text-5xl md:text-6xl text-dark tracking-wide">PROYECTOS</h1>
          <p className="text-secondary mt-3 text-base max-w-xl leading-relaxed">
            Décadas de experiencia ejecutando proyectos de alta complejidad en Venezuela y la región.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-border sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex gap-2 py-3 flex-wrap">
          {[
            { id: 'active', label: 'En Ejecución 2025' },
            { id: 'completed', label: 'Proyectos Culminados' },
            { id: 'all', label: 'Todos' },
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`font-sub font-semibold text-sm uppercase tracking-wide px-4 py-2 rounded border transition-all ${
                tab === t.id
                  ? 'bg-samred text-white border-samred'
                  : 'bg-white border-border text-secondary hover:border-samred hover:text-samred'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Category sub-filter */}
      {(tab === 'completed' || tab === 'all') && (
        <div className="bg-surface border-b border-border py-3 px-4 md:px-8">
          <div className="max-w-7xl mx-auto flex items-center gap-2 flex-wrap">
            <Filter size={13} className="text-secondary flex-shrink-0" />
            {CATEGORIES_COMPLETED.map(c => (
              <button
                key={c}
                onClick={() => setCatFilter(c)}
                className={`text-xs font-mono font-semibold px-2.5 py-1 rounded border transition-all ${
                  catFilter === c ? 'bg-dark text-white border-dark' : 'bg-white text-secondary border-border hover:border-dark/40'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Grid */}
      <div className="bg-white py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          {tab === 'active' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {PROJECTS_ACTIVE.map(p => (
                <div
                  key={p.id}
                  onClick={() => setModal(p)}
                  className="project-card bg-white border border-border rounded-sm border-t-[3px] border-t-samred cursor-pointer p-6 shadow-[0_2px_16px_rgba(0,0,0,0.05)]"
                  role="button" tabIndex={0}
                  onKeyDown={e => e.key === 'Enter' && setModal(p)}
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <span className="text-[0.6875rem] font-mono font-semibold text-samred uppercase tracking-wide line-clamp-1">{p.client}</span>
                    <span className="flex-shrink-0 inline-flex items-center gap-1.5 text-xs font-semibold text-green-700 bg-green-50 px-2 py-0.5 rounded border border-green-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 dot-pulse" />
                      En Ejecución
                    </span>
                  </div>
                  <h3 className="font-sub font-bold text-lg text-dark mb-2 leading-snug">{p.title}</h3>
                  <p className="text-secondary text-sm leading-relaxed mb-4 line-clamp-2">{p.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono bg-surface px-2 py-0.5 rounded text-secondary">{p.category}</span>
                    <span className="text-samred text-xs font-sub font-semibold uppercase tracking-wide flex items-center gap-1">
                      Ver detalle <ChevronRight size={12} />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {showList.map(p => (
                <div
                  key={p.id}
                  onClick={() => setModal(p)}
                  className="project-card bg-white border border-border rounded-sm cursor-pointer p-5 shadow-[0_2px_12px_rgba(0,0,0,0.05)]"
                  role="button" tabIndex={0}
                  onKeyDown={e => e.key === 'Enter' && setModal(p)}
                >
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <span className="text-[0.625rem] font-mono font-semibold text-secondary uppercase tracking-wide line-clamp-1 flex-1">{p.client}</span>
                    {p.status === 'active' ? (
                      <span className="flex-shrink-0 inline-flex items-center gap-1 text-xs font-semibold text-green-700 bg-green-50 px-1.5 py-0.5 rounded border border-green-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 dot-pulse" />
                        Activo
                      </span>
                    ) : (
                      <span className="flex-shrink-0 text-xs font-semibold text-secondary bg-gray-100 px-2 py-0.5 rounded border border-gray-200">Culminado</span>
                    )}
                  </div>
                  <h3 className="font-sub font-bold text-sm text-dark mb-2 leading-snug">{p.title}</h3>
                  <p className="text-secondary text-xs leading-relaxed mb-3 line-clamp-2">{p.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono bg-surface px-2 py-0.5 rounded text-secondary">{p.category}</span>
                    <span className="text-samred text-xs font-sub font-semibold uppercase tracking-wide flex items-center gap-1">
                      Detalle <ChevronRight size={11} />
                    </span>
                  </div>
                </div>
              ))}
              {showList.length === 0 && (
                <div className="col-span-3 text-center py-20 text-secondary">
                  <Filter size={28} className="mx-auto mb-3 opacity-30" />
                  <p className="font-sub font-semibold text-lg">No hay proyectos en esta categoría.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {modal && <ProjectModal project={modal} onClose={() => setModal(null)} />}
    </div>
  )
}

// ─── PAGE: QUIÉNES SOMOS ──────────────────────────────────────────────────────
function PageQuienesSomos() {
  useScrollReveal()

  const advantages = [
    { icon: <Target size={28} />, title: 'Capacidad Operativa', desc: 'Flota completa de vehículos, camiones, equipos pesados, maquinaria y aeronave. Infraestructura para asumir proyectos de gran envergadura en todo el territorio.' },
    { icon: <CheckCircle size={28} />, title: 'Calidad Certificada', desc: 'Procesos IPC bajo estándares internacionales. Certificación como Manejadora de Desechos Peligrosos desde 1999 por el Ministerio del Ecosistema.' },
    { icon: <Users size={28} />, title: 'Capital Humano', desc: 'Equipo de profesionales calificados en ingeniería eléctrica, civil, mecánica, instrumentación, telecomunicaciones y ambiental con uso de plataformas avanzadas.' },
    { icon: <Shield size={28} />, title: 'HSE / Seguridad', desc: 'Cultura HSE arraigada. Historial de operaciones en entornos de alto riesgo con cumplimiento riguroso de normativas COVENIN e internacionales.' },
  ]

  return (
    <div className="pt-16">
      {/* HERO */}
      <section
        className="py-20 md:py-28 px-4 md:px-12"
        style={{ background: 'linear-gradient(rgba(10,12,15,0.70), rgba(10,12,15,0.76)), url("https://picsum.photos/seed/industrial_plant_night/1400/600") center/cover no-repeat' }}
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

      {/* TIMELINE */}
      <section className="bg-white py-20 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="scroll-reveal mb-12">
            <div className="flex items-center gap-3 mb-3">
              <span className="h-[3px] w-12 bg-samred" />
              <span className="font-sub font-semibold text-xs uppercase tracking-widest text-samred">Historia</span>
            </div>
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

      {/* MISSION/VISION/VALUES */}
      <section className="bg-surface py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="scroll-reveal mb-12">
            <div className="flex items-center gap-3 mb-3">
              <span className="h-[3px] w-12 bg-samred" />
              <span className="font-sub font-semibold text-xs uppercase tracking-widest text-samred">Identidad corporativa</span>
            </div>
            <h2 className="font-display text-[2.75rem] md:text-5xl text-dark">MISIÓN, VISIÓN Y VALORES</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <Target size={22} />, title: 'MISIÓN',
                body: 'Ejecutar de manera rentable y eficiente, en armonía con el ambiente, obras y servicios de construcción civil, eléctrica, telecomunicación e instrumentación, transporte y servicios ambientales a empresas públicas y privadas, asegurando la satisfacción del cliente y el desarrollo de nuestro talento humano.'
              },
              {
                icon: <Star size={22} />, title: 'VISIÓN',
                body: 'Ser una empresa líder en el área de Construcción, Transporte y Servicios Ambientales, reconocida por su orientación a la excelencia, la calidad de sus servicios, la solidez de su equipo humano y su compromiso con el desarrollo sostenible de Venezuela.'
              },
              {
                icon: <Award size={22} />, title: 'VALORES',
                list: [
                  { name: 'Lealtad', desc: 'Compromiso con clientes, colaboradores y país. La confianza ganada en 59 años es nuestro activo más valioso.' },
                  { name: 'Responsabilidad', desc: 'Cumplimiento estricto de compromisos técnicos, ambientales y de seguridad.' },
                  { name: 'Respeto a la Dignidad Humana', desc: 'Cada trabajador y cliente es tratado con el máximo respeto.' },
                ]
              },
            ].map((card, i) => (
              <div key={card.title} className="scroll-reveal bg-white rounded border-t-[3px] border-samred shadow-[0_2px_16px_rgba(0,0,0,0.07)] p-7" style={{ transitionDelay: `${i * 80}ms` }}>
                <div className="text-samblue mb-3">{card.icon}</div>
                <h3 className="font-display text-2xl text-samred mb-4">{card.title}</h3>
                {card.body && <p className="text-secondary text-sm leading-relaxed">{card.body}</p>}
                {card.list && (
                  <div className="flex flex-col gap-4">
                    {card.list.map(v => (
                      <div key={v.name}>
                        <div className="font-sub font-bold text-sm uppercase tracking-wide text-dark mb-0.5">{v.name}</div>
                        <p className="text-secondary text-xs leading-relaxed">{v.desc}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ADVANTAGES */}
      <section className="bg-white py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="scroll-reveal mb-12">
            <div className="flex items-center gap-3 mb-3">
              <span className="h-[3px] w-12 bg-samred" />
              <span className="font-sub font-semibold text-xs uppercase tracking-widest text-samred">Por qué elegirnos</span>
            </div>
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

      {/* COMPANY SHEET */}
      <section className="bg-surface py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="scroll-reveal mb-8">
            <h2 className="font-display text-3xl md:text-4xl text-dark">FICHA DE EMPRESA</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            <div className="bg-white rounded shadow-[0_2px_16px_rgba(0,0,0,0.06)] overflow-hidden">
              <div className="bg-dark text-white px-6 py-3">
                <span className="font-sub font-bold text-xs uppercase tracking-widest">Datos Corporativos</span>
              </div>
              <table className="w-full text-sm">
                <tbody>
                  {[
                    ['Razón Social', 'SAMFOR, S.A.'],
                    ['Fundación', '1966 — Maracaibo, Venezuela'],
                    ['Trayectoria', '59 años de operación continua'],
                    ['Sector', 'Petrolero, Petroquímico, Carbonífero, Civil'],
                    ['Servicios', '6 líneas de negocio especializadas'],
                    ['Certificación', 'Manejadora de Desechos Peligrosos (desde 1999)'],
                    ['Cobertura', 'Venezuela y operaciones internacionales'],
                  ].map(([k, v]) => (
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
                {[
                  { icon: <MapPin size={15} className="text-samred" />, label: 'Dirección', value: 'Av. 3H entre Calles 68-70 N.69-61, Maracaibo, Venezuela' },
                  { icon: <Mail size={15} className="text-samred" />, label: 'Email', value: 'samfor@samfor.com' },
                  { icon: <Phone size={15} className="text-samred" />, label: 'Teléfonos', value: '+58 261 814 4444 / +58 414-615.8000' },
                  { icon: <Globe size={15} className="text-samred" />, label: 'Web', value: 'www.samfor.com' },
                ].map(item => (
                  <div key={item.label} className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5">{item.icon}</div>
                    <div>
                      <div className="text-xs font-mono text-secondary/60 uppercase tracking-widest mb-0.5">{item.label}</div>
                      <div className="text-dark text-sm font-medium">{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-surface rounded p-4 flex items-center justify-center">
                <svg viewBox="0 0 220 140" className="w-40 opacity-30" fill="none">
                  <path d="M28 72 Q56 18 92 30 Q128 14 160 44 Q188 30 198 68 Q210 94 176 114 Q142 134 108 118 Q72 132 50 108 Q16 94 28 72Z" fill="#C8102E" />
                  <circle cx="54" cy="94" r="6" fill="#C8102E" />
                  <text x="62" y="99" fontSize="10" fill="#0D1117" fontFamily="sans-serif">Maracaibo</text>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

// ─── PAGE: CONTACTO ───────────────────────────────────────────────────────────
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
    e.preventDefault()
    setSending(true)
    await new Promise(r => setTimeout(r, 1500))
    setSending(false); setSent(true)
  }

  const handleJobSubmit = async e => {
    e.preventDefault()
    setJobSending(true)
    await new Promise(r => setTimeout(r, 1500))
    setJobSending(false); setJobSent(true)
  }

  return (
    <div className="pt-16">
      <section className="bg-white py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="scroll-reveal mb-10">
            <div className="flex items-center gap-3 mb-3">
              <span className="h-[3px] w-12 bg-samred" />
              <span className="font-sub font-semibold text-xs uppercase tracking-widest text-samred">Contacto</span>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded overflow-hidden shadow-[0_4px_40px_rgba(0,0,0,0.09)]">
            {/* Left */}
            <div className="bg-surface p-8 md:p-12">
              <h1 className="font-display text-[3.5rem] md:text-[4rem] text-samred mb-3 leading-none">HABLEMOS</h1>
              <p className="text-secondary text-base mb-8 leading-relaxed max-w-sm">
                Estamos listos para evaluar tu proyecto. Un especialista se pondrá en contacto contigo.
              </p>
              <div className="flex flex-col gap-5 mb-10">
                {[
                  { icon: <Mail size={16} className="text-samred flex-shrink-0" />, label: 'Email', value: 'samfor@samfor.com' },
                  { icon: <Phone size={16} className="text-samred flex-shrink-0" />, label: 'Teléfonos', value: '+58 261 814 4444\n+58 414-615.8000' },
                  { icon: <Globe size={16} className="text-samred flex-shrink-0" />, label: 'Web', value: 'www.samfor.com' },
                  { icon: <MapPin size={16} className="text-samred flex-shrink-0" />, label: 'Dirección', value: 'Av. 3H entre Calles 68-70 N.69-61\nMaracaibo, Venezuela' },
                ].map(item => (
                  <div key={item.label} className="flex items-start gap-3">
                    {item.icon}
                    <div>
                      <div className="text-xs font-mono text-secondary/55 uppercase tracking-widest mb-0.5">{item.label}</div>
                      <div className="text-dark text-sm font-medium whitespace-pre-line">{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
              <svg viewBox="0 0 220 140" className="w-40 opacity-20 hidden md:block" fill="none">
                <path d="M28 72 Q56 18 92 30 Q128 14 160 44 Q188 30 198 68 Q210 94 176 114 Q142 134 108 118 Q72 132 50 108 Q16 94 28 72Z" fill="#C8102E" />
                <circle cx="54" cy="94" r="5" fill="#C8102E" />
              </svg>
            </div>

            {/* Right */}
            <div className="bg-white p-8 md:p-12">
              {sent ? (
                <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                  <CheckCircle size={44} className="text-green-500 mb-4" />
                  <h3 className="font-display text-3xl text-dark mb-2">Mensaje Enviado</h3>
                  <p className="text-secondary text-sm">Un especialista de SAMFOR se pondrá en contacto a la brevedad.</p>
                  <button onClick={() => { setSent(false); setForm({ name: '', company: '', email: '', phone: '', type: '', message: '' }) }} className="btn-secondary mt-6">Nuevo Mensaje</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <h2 className="font-display text-2xl text-dark mb-6">ENVÍA TU CONSULTA</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[0.6875rem] font-mono text-secondary uppercase tracking-widest">Nombre completo *</label>
                      <input className="form-input" required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Carlos Rodríguez" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[0.6875rem] font-mono text-secondary uppercase tracking-widest">Empresa</label>
                      <input className="form-input" value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))} placeholder="PDVSA, Chevron, etc." />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[0.6875rem] font-mono text-secondary uppercase tracking-widest">Email *</label>
                      <input className="form-input" type="email" required value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="correo@empresa.com" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[0.6875rem] font-mono text-secondary uppercase tracking-widest">Teléfono</label>
                      <input className="form-input" type="tel" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="+58 261 000 0000" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5 mb-4">
                    <label className="text-[0.6875rem] font-mono text-secondary uppercase tracking-widest">Tipo de consulta</label>
                    <select className="form-input" value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}>
                      <option value="">Seleccionar...</option>
                      <option>Propuesta de proyecto</option>
                      <option>Consulta técnica</option>
                      <option>Alianza comercial</option>
                      <option>Otro</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5 mb-6">
                    <label className="text-[0.6875rem] font-mono text-secondary uppercase tracking-widest">Mensaje *</label>
                    <textarea className="form-input min-h-[110px] resize-none" required value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} placeholder="Describe tu proyecto o consulta..." />
                  </div>
                  <button type="submit" className="btn-primary w-full justify-center flex items-center gap-2" disabled={sending}>
                    {sending ? (
                      <>
                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="40 60" /></svg>
                        Enviando...
                      </>
                    ) : 'Enviar Mensaje'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* JOBS */}
      <section className="bg-surface py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="scroll-reveal border-t-[3px] border-samred pt-10 mb-10">
            <h2 className="font-display text-[2.75rem] md:text-5xl text-dark mb-3">ÚNETE A SAMFOR</h2>
            <p className="text-secondary max-w-xl leading-relaxed text-base">
              Forma parte de un equipo que construye la infraestructura energética de Venezuela. Buscamos talentos comprometidos con la excelencia técnica.
            </p>
          </div>
          <div className="bg-white rounded shadow-[0_2px_24px_rgba(0,0,0,0.07)] p-8 md:p-10">
            {jobSent ? (
              <div className="flex flex-col items-center py-10 text-center">
                <CheckCircle size={44} className="text-samblue mb-4" />
                <h3 className="font-display text-3xl text-dark mb-2">Postulación Recibida</h3>
                <p className="text-secondary text-sm">Revisaremos tu perfil y nos pondremos en contacto si hay una oportunidad alineada con tu experiencia.</p>
                <button onClick={() => { setJobSent(false); setJobForm({ name: '', email: '', phone: '', area: '', exp: '', cv: null, letter: '' }) }} className="btn-secondary mt-6">Nueva Postulación</button>
              </div>
            ) : (
              <form onSubmit={handleJobSubmit} noValidate>
                <h3 className="font-display text-2xl text-dark mb-6">FORMULARIO DE POSTULACIÓN</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[0.6875rem] font-mono text-secondary uppercase tracking-widest">Nombre *</label>
                    <input className="form-input" required value={jobForm.name} onChange={e => setJobForm(f => ({ ...f, name: e.target.value }))} placeholder="Nombre completo" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[0.6875rem] font-mono text-secondary uppercase tracking-widest">Email *</label>
                    <input className="form-input" type="email" required value={jobForm.email} onChange={e => setJobForm(f => ({ ...f, email: e.target.value }))} placeholder="tu@email.com" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[0.6875rem] font-mono text-secondary uppercase tracking-widest">Teléfono</label>
                    <input className="form-input" value={jobForm.phone} onChange={e => setJobForm(f => ({ ...f, phone: e.target.value }))} placeholder="+58 424 000 0000" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[0.6875rem] font-mono text-secondary uppercase tracking-widest">Área de especialidad</label>
                    <select className="form-input" value={jobForm.area} onChange={e => setJobForm(f => ({ ...f, area: e.target.value }))}>
                      <option value="">Seleccionar...</option>
                      {['Ingeniería Eléctrica','Ingeniería Civil','Ingeniería Mecánica','Instrumentación','Telecomunicaciones','Ambiental','Transporte','Administración','Otra'].map(a => <option key={a}>{a}</option>)}
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[0.6875rem] font-mono text-secondary uppercase tracking-widest">Años de experiencia</label>
                    <select className="form-input" value={jobForm.exp} onChange={e => setJobForm(f => ({ ...f, exp: e.target.value }))}>
                      <option value="">Seleccionar...</option>
                      {['0-2 años','3-5 años','6-10 años','10+ años'].map(x => <option key={x}>{x}</option>)}
                    </select>
                  </div>
                </div>
                <div className="mb-4">
                  <label className="text-[0.6875rem] font-mono text-secondary uppercase tracking-widest block mb-2">CV / Hoja de Vida (PDF o DOC, máx. 5MB)</label>
                  <div
                    className={`upload-zone ${drag ? 'drag-over' : ''}`}
                    onDragOver={e => { e.preventDefault(); setDrag(true) }}
                    onDragLeave={() => setDrag(false)}
                    onDrop={e => { e.preventDefault(); setDrag(false); const f = e.dataTransfer.files[0]; if (f) setJobForm(jf => ({ ...jf, cv: f })) }}
                    onClick={() => document.getElementById('cv-input').click()}
                  >
                    <input id="cv-input" type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={e => { const f = e.target.files[0]; if (f) setJobForm(jf => ({ ...jf, cv: f })) }} />
                    {jobForm.cv ? (
                      <div className="flex items-center gap-2 justify-center text-samblue">
                        <CheckCircle size={15} />
                        <span className="text-sm font-medium">{jobForm.cv.name}</span>
                      </div>
                    ) : (
                      <div className="text-secondary text-sm">
                        <Upload size={18} className="mx-auto mb-2 opacity-40" />
                        <span>Arrastra tu CV o <span className="text-samblue font-semibold">haz clic para seleccionar</span></span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-1.5 mb-6">
                  <label className="text-[0.6875rem] font-mono text-secondary uppercase tracking-widest">Carta de presentación</label>
                  <textarea className="form-input min-h-[90px] resize-none" value={jobForm.letter} onChange={e => setJobForm(f => ({ ...f, letter: e.target.value }))} placeholder="Cuéntanos sobre tu experiencia y motivación para unirte a SAMFOR..." />
                </div>
                <button
                  type="submit"
                  className="btn-primary flex items-center gap-2"
                  style={{ background: '#1A6FB5' }}
                  disabled={jobSending}
                >
                  {jobSending ? (
                    <>
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="40 60" /></svg>
                      Enviando...
                    </>
                  ) : 'Postularme'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

// ─── ROOT ────────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState('inicio')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [page])

  const pages = {
    inicio: <PageInicio setPage={setPage} />,
    proyectos: <PageProyectos />,
    'quienes-somos': <PageQuienesSomos />,
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
