"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowLeft, ArrowRight, ArrowUpRight, Github, Lock, X } from "lucide-react"
import { useLenis } from "lenis/react"
import { ScrollTrigger } from "@/lib/gsap"
import Link from "next/link"

/* ═══ DATA ═══ */

type Kind = "web" | "sistema"

type Project = {
  title: string
  subtitle: string
  description: string
  technologies: string[]
  /** Opcional: sin URL la tarjeta no muestra links al sitio */
  demoUrl?: string
  repoUrl?: string
  video: string
  /** Captura de escritorio que se muestra mientras carga el video */
  poster?: string
  /** Captura mobile: si existe, se muestra un celular junto a la ventana */
  mobile?: string
  kind: Kind
  /** Tono (HSL hue) del fondo de la tarjeta */
  hue: number
}

export const PROJECTS: Project[] = [
  {
    title: "Surland Viajes", subtitle: "Agencia de viajes", kind: "web", hue: 195,
    description: "Agencia de viajes de egresados y quinceañeras a destinos como Bariloche, Camboriú, cruceros y Disney. Diseño responsivo que presenta los paquetes de forma clara y atractiva.",
    technologies: ["Wordpress", "Elementor", "CSS"],
    demoUrl: "https://surlandviajes.tur.ar/",
    video: "/surland.mp4", mobile: "/surlandmobile.webp",
  },
  {
    title: "SVN Designs", subtitle: "Catálogo & e-commerce", kind: "web", hue: 30,
    description: "Catálogo visual atractivo y fácil de navegar, con formularios de pedido y automatización de respuestas vía Zapier. Una interfaz clara que transmite profesionalismo.",
    technologies: ["Shopify", "Typeform", "Zapier"],
    demoUrl: "https://svn-designs.com/",
    video: "/svn.mp4", mobile: "/svnmobile.webp",
  },
  {
    title: "Stockear", subtitle: "Gestión de stock y ventas", kind: "sistema", hue: 160,
    description: "Sistema integral para pequeños comercios: inventario en tiempo real, venta rápida, reportes y cierre de caja desde un único panel.",
    technologies: ["Next.js", "Supabase", "TailwindCSS", "Claude Code", "Shadcn/ui", "Vercel"],
    demoUrl: "https://stockear.vercel.app/", repoUrl: "https://github.com/Ulises-Molina/Stockear",
    video: "/stockear.mp4", poster: "/stockear.webp",
  },
  {
    title: "Skiway", subtitle: "E-commerce industrial", kind: "web", hue: 45,
    description: "Sitio para una marca argentina de calzado e indumentaria de seguridad industrial. Diseño responsivo con catálogo de productos filtrable y fichas técnicas claras.",
    technologies: ["Wordpress", "Elementor", "WooCommerce", "CSS"],
    demoUrl: "https://skiway.com.ar/",
    video: "/skiway.mp4", mobile: "/skiwaymobile.webp",
  },
  {
    title: "Green Company", subtitle: "Web corporativa B2B", kind: "web", hue: 140,
    description: "Soluciones logísticas B2B para empresas. Interfaz alineada con la identidad de la marca y optimizada para todos los dispositivos, con foco en transmitir confianza.",
    technologies: ["Wordpress", "Elementor", "WooCommerce"],
    demoUrl: "https://greenmovingco.com/",
    video: "/green.mp4", mobile: "/greenmobile.webp",
  },
  {
    // TODO: falta la URL del sitio y confirmar el stack
    title: "Habita Urbana", subtitle: "Desarrollos urbanísticos", kind: "web", hue: 100,
    description: "Sitio para una desarrolladora de barrios y loteos. Presenta el proceso de compra paso a paso, transmite la propuesta de la marca y canaliza las consultas directo a WhatsApp.",
    technologies: ["Wordpress", "Elementor", "CSS"],
    video: "/habitaurbana.mp4", mobile: "/habitamobile.webp",
  },
  {
    title: "Confidas Capital", subtitle: "Servicios financieros", kind: "web", hue: 220,
    description: "Web para una firma de productos financieros, enfocada en transmitir confianza y facilitar el acceso a la información. Diseño moderno y responsivo con navegación clara en desktop y mobile.",
    technologies: ["Wordpress", "Elementor", "CSS", "MetForm"],
    demoUrl: "https://confidascapital.com.ar/",
    video: "/confidas.mp4", mobile: "/confidasmobile.webp",
  },
  {
    title: "Web Audity", subtitle: "Auditoría web", kind: "sistema", hue: 200,
    description: "Herramienta para auditar el rendimiento y SEO de sitios web. Analiza métricas clave, detecta problemas y ofrece recomendaciones para optimizar la velocidad y el posicionamiento de cualquier página.",
    technologies: ["Next.js", "TypeScript", "TailwindCSS", "Vercel"],
    demoUrl: "https://web-audity.vercel.app/", repoUrl: "https://github.com/Ulises-Molina/web-audity",
    video: "/web-audity.mp4",
  },
  {
    title: "Fintrack", subtitle: "Finanzas personales", kind: "sistema", hue: 255,
    description: "Dashboard de finanzas personales con seguimiento de gastos, categorización automática, análisis con IA y visualización de tendencias. Incluye autenticación y gestión multi-cuenta.",
    technologies: ["React", "Supabase", "OAuth", "Vite", "TailwindCSS"],
    demoUrl: "https://fintrackgastos.vercel.app/", repoUrl: "https://github.com/Ulises-Molina/Fintrack",
    video: "/Fintrack.mp4", poster: "/fintrack-sh-mobile.webp",
  },
  {
    title: "Great Burgers", subtitle: "App de pedidos", kind: "sistema", hue: 20,
    description: "App de pedidos para restaurante con menú interactivo por categorías, carrito en tiempo real y panel de administración para gestionar productos, precios y disponibilidad.",
    technologies: ["NextJS", "TypeScript", "TailwindCSS", "Supabase"],
    demoUrl: "https://great-burgers.vercel.app/",
    video: "/great.mp4", poster: "/great-sh-mobile.webp",
  },
  {
    title: "Crypto Market", subtitle: "Precios real-time", kind: "sistema", hue: 280,
    description: "Plataforma de seguimiento cripto con precios en tiempo real vía API, gráficos históricos interactivos con Chart.js y feed de noticias del mercado integrado.",
    technologies: ["React", "TypeScript", "TailwindCSS", "Chart.js", "NewsAPI"],
    demoUrl: "https://marketcrypto-psi.vercel.app/", repoUrl: "https://github.com/Ulises-Molina/Market-Crypto",
    video: "/marketcrypto.mp4", poster: "/crypto-sh-mobile.webp",
  },
  {
    // TODO: falta la URL del sitio y confirmar el stack
    title: "MH", subtitle: "E-commerce industrial", kind: "web", hue: 210,
    description: "Tienda online de instrumentos y equipamiento industrial, con catálogo por producto, variantes, carrito y cuenta de cliente. Navegación pensada para comprar cómodo desde el celular.",
    technologies: ["Wordpress", "WooCommerce", "WoodMart"],
    video: "/mh.mp4", mobile: "/mhmobile.webp",
  },
  {
    title: "Room", subtitle: "Tienda de muebles", kind: "web", hue: 30,
    description: "Landing de e-commerce de muebles desarrollada a partir de un diseño en Figma de Frontend Mentor, con slider de productos y animaciones de transición.",
    technologies: ["Next.js", "TypeScript", "TailwindCSS", "Framer Motion"],
    demoUrl: "https://room-tan.vercel.app/",
    video: "/room.mp4", mobile: "/roommobile.webp",
  },
]

const FILTERS: { key: "todos" | Kind; label: string }[] = [
  { key: "todos", label: "Todos" },
  { key: "web", label: "Web" },
  { key: "sistema", label: "Sistemas" },
]

/* Patrón de filas sobre 12 columnas: grande/chica, tres iguales, chica/grande, tres iguales */
const ROWS = [[7, 5], [4, 4, 4], [5, 7], [4, 4, 4]]

function spansFor(count: number) {
  const spans: number[] = []
  let r = 0
  while (spans.length < count) {
    let row = ROWS[r % ROWS.length]
    const left = count - spans.length
    if (left < row.length) row = left === 1 ? [12] : left === 2 ? [6, 6] : row.slice(0, left)
    spans.push(...row)
    r++
  }
  return spans
}

const hostOf = (p: Project) => p.demoUrl ? p.demoUrl.replace(/^https?:\/\//, "").replace(/\/$/, "") : p.title.toLowerCase().replace(/\s+/g, "")
const ACCENT = "hsl(165 80% 48%)"

/* ═══ Video que solo se reproduce cuando está en pantalla ═══ */

/* En desktop el video queda quieto en su primer cuadro y se reproduce solo con
   `active` (hover/foco en la card). En touch, sin hover, se reproduce al estar en pantalla. */
function InViewVideo({ src, poster, className, active }: { src: string; poster?: string; className?: string; active: boolean }) {
  const ref = useRef<HTMLVideoElement>(null)
  const [load, setLoad] = useState(false)
  const inView = useRef(false)
  const canHover = useRef(true)

  useEffect(() => {
    canHover.current = window.matchMedia("(hover: hover)").matches
    const v = ref.current
    if (!v) return
    const io = new IntersectionObserver(([e]) => {
      inView.current = e.isIntersecting
      if (e.isIntersecting) {
        setLoad(true)
        if (!canHover.current) v.play().catch(() => {})
      } else {
        v.pause()
      }
    }, { rootMargin: "120px" })
    io.observe(v)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    const v = ref.current
    if (!v || !load) return
    if (!canHover.current) { if (inView.current) v.play().catch(() => {}); return }
    if (active) v.play().catch(() => {})
    else v.pause()
  }, [active, load])

  // Sin poster, "#t=0.1" hace que el navegador pinte el primer cuadro en vez de un recuadro vacío
  return (
    <video ref={ref} muted loop playsInline preload="metadata" poster={poster}
      src={load ? (poster ? src : `${src}#t=0.1`) : undefined} className={className} />
  )
}

/* ═══ Tarjeta ═══ */

function ProjectTile({ p, span, onOpen }: { p: Project; span: number; onOpen: () => void }) {
  const big = span >= 7
  const [hover, setHover] = useState(false)
  return (
    <button type="button" onClick={onOpen} aria-label={`Ver ${p.title}`}
      onPointerEnter={(e) => { if (e.pointerType === "mouse") setHover(true) }}
      onPointerLeave={() => setHover(false)}
      onFocus={() => setHover(true)} onBlur={() => setHover(false)}
      className="group relative isolate block h-[280px] sm:h-[300px] md:h-[340px] w-full overflow-hidden rounded-[18px] border border-white/[0.08] text-left"
      style={{
        background: `radial-gradient(120% 90% at 85% 100%, hsl(${p.hue} 70% 45% / .35), transparent 60%), radial-gradient(80% 60% at 0% 0%, hsl(${p.hue} 60% 50% / .10), transparent 70%), hsl(220 14% 7%)`,
      }}>
      {/* Cuadrícula sutil de fondo */}
      <span aria-hidden="true" className="absolute inset-0 -z-10"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.035) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage: "linear-gradient(to bottom, #000, transparent 70%)",
          WebkitMaskImage: "linear-gradient(to bottom, #000, transparent 70%)",
        }} />

      {/* Encabezado */}
      <span className="absolute top-5 left-[22px] right-[22px] z-20 flex items-start justify-between gap-3">
        <span>
          <span className="block text-[19px] font-semibold tracking-tight text-white">{p.title}</span>
          <span className="block mt-0.5 text-[13px] font-light text-white/45" style={{ fontFamily: "var(--font-inter)" }}>{p.subtitle}</span>
        </span>
        <span className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full border border-white/25 bg-black/40 text-white transition-all duration-500 group-hover:border-[hsl(165_80%_48%)] group-hover:bg-[hsl(165_80%_48%)] group-hover:text-black">
          <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:rotate-45" />
        </span>
      </span>

      {/* Ventana de navegador */}
      <span className={`absolute top-[84px] md:top-[92px] overflow-hidden rounded-t-[10px] border border-white/[0.12] bg-[hsl(220_12%_10%)] transition-transform duration-700 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-x-2 group-hover:-translate-y-3.5 ${
        p.mobile
          ? "bottom-[-24px] left-[18px] right-[22%] md:left-[22px]"
          : big ? "aspect-[16/10] left-[18px] right-[-30px] lg:left-7 lg:right-7" : "aspect-[16/10] left-[18px] right-[-30px] md:left-[22px] md:right-[-40px]"
      }`}
        style={{ boxShadow: `0 -10px 60px hsl(${p.hue} 70% 40% / .18), 0 20px 50px rgba(0,0,0,.5)` }}>
        <span className="flex h-[26px] items-center gap-1.5 border-b border-white/[0.06] bg-[hsl(220_12%_12%)] px-2.5">
          <i className="h-2 w-2 rounded-full bg-white/[0.18]" />
          <i className="h-2 w-2 rounded-full bg-white/[0.18]" />
          <i className="h-2 w-2 rounded-full bg-white/[0.18]" />
          <span className="ml-2.5 truncate rounded-md bg-white/[0.05] px-2.5 py-[3px] font-mono text-[9.5px] text-white/40">{hostOf(p)}</span>
        </span>
        <span className="block h-[calc(100%-26px)]">
          <InViewVideo src={p.video} poster={p.poster} active={hover} className="h-full w-full object-cover object-top" />
        </span>
      </span>

      {/* Celular (solo proyectos con captura mobile) */}
      {p.mobile && (
        <span className="absolute right-[6%] top-[104px] md:top-[112px] z-10 aspect-[9/19.3] w-[92px] md:w-[110px] overflow-hidden rounded-[20px] border-[5px] border-[hsl(220_8%_16%)] bg-black transition-transform duration-700 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-4 group-hover:-rotate-3"
          style={{ boxShadow: "-18px 24px 50px rgba(0,0,0,.55)" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={p.mobile} alt={`Versión mobile de ${p.title}`} loading="lazy" className="h-full w-full object-cover object-top" />
        </span>
      )}
    </button>
  )
}

/* ═══ Ficha (modal) ═══ */

const EASE = [0.22, 1, 0.36, 1] as const
const pad = (n: number) => String(n).padStart(2, "0")

function ProjectModal({ list, index, onClose, onNavigate }: {
  list: Project[]
  index: number
  onClose: () => void
  onNavigate: (to: number) => void
}) {
  const p = list[index]
  const total = list.length
  const prev = list[(index - 1 + total) % total]
  const next = list[(index + 1) % total]
  const closeRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const [dir, setDir] = useState(1)
  const lenis = useLenis()

  const go = useCallback((step: number) => {
    setDir(step)
    onNavigate((index + step + total) % total)
  }, [index, total, onNavigate])

  // Foco, teclado y bloqueo de scroll del fondo
  useEffect(() => {
    const prevFocus = document.activeElement as HTMLElement | null
    closeRef.current?.focus()
    const html = document.documentElement
    const prevOverflow = html.style.overflow
    html.style.overflow = "hidden"
    lenis?.stop()
    return () => {
      html.style.overflow = prevOverflow
      lenis?.start()
      prevFocus?.focus()
    }
  }, [lenis])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      else if (e.key === "ArrowRight") go(1)
      else if (e.key === "ArrowLeft") go(-1)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [onClose, go])

  // Al cambiar de proyecto, volver arriba del panel
  useEffect(() => { panelRef.current?.scrollTo({ top: 0 }) }, [index])

  const swap = {
    initial: { opacity: 0, x: 28 * dir },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -28 * dir },
    transition: { duration: 0.45, ease: EASE },
  }

  return (
    <motion.div role="dialog" aria-modal="true" aria-labelledby="project-modal-title"
      className="fixed inset-0 z-[100] flex items-end justify-center bg-[hsl(220_15%_2%/0.78)] backdrop-blur-md md:items-center md:p-6"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <motion.div ref={panelRef} data-lenis-prevent
        className="relative grid max-h-[94dvh] w-full max-w-[1180px] overflow-y-auto overscroll-contain rounded-t-[22px] border border-white/[0.12] bg-[hsl(220_14%_6%)] md:max-h-[88vh] md:rounded-[22px] lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:overflow-hidden"
        style={{ boxShadow: `0 40px 120px rgba(0,0,0,.6), 0 0 0 1px hsl(${p.hue} 60% 50% / .06)` }}
        initial={{ y: 40, opacity: 0, scale: 0.98 }} animate={{ y: 0, opacity: 1, scale: 1 }} exit={{ y: 24, opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.55, ease: EASE }}>

        {/* ── Escenario: ventana + celular ── */}
        <div className="relative isolate flex items-center overflow-hidden px-5 pb-8 pt-14 md:px-10 md:pb-12 md:pt-16 lg:py-14"
          style={{
            background: `radial-gradient(90% 80% at 80% 100%, hsl(${p.hue} 70% 45% / .38), transparent 65%), radial-gradient(70% 60% at 0% 0%, hsl(${p.hue} 60% 50% / .12), transparent 70%), hsl(220 14% 7%)`,
            transition: "background 0.6s ease",
          }}>
          <span aria-hidden="true" className="absolute inset-0 -z-10"
            style={{
              backgroundImage: "linear-gradient(rgba(255,255,255,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.04) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
              maskImage: "radial-gradient(ellipse at center, #000 30%, transparent 75%)",
              WebkitMaskImage: "radial-gradient(ellipse at center, #000 30%, transparent 75%)",
            }} />

          {/* Contador */}
          <span className="absolute left-5 top-5 font-mono text-[11px] tracking-[0.2em] text-white/45 md:left-10 md:top-6">
            <span className="text-white">{pad(index + 1)}</span> / {pad(total)}
          </span>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={p.title} {...swap} className={`relative w-full ${p.mobile ? "pr-[16%] md:pr-[14%]" : ""}`}>
              <div className="overflow-hidden rounded-[12px] border border-white/[0.14] bg-[hsl(220_12%_10%)]"
                style={{ boxShadow: `0 -12px 70px hsl(${p.hue} 70% 40% / .22), 0 30px 70px rgba(0,0,0,.55)` }}>
                <div className="flex h-8 items-center gap-1.5 border-b border-white/[0.06] bg-[hsl(220_12%_12%)] px-3">
                  <i className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/70" />
                  <i className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/70" />
                  <i className="h-2.5 w-2.5 rounded-full bg-[#28c840]/70" />
                  {p.demoUrl ? (
                    <Link href={p.demoUrl} target="_blank" rel="noopener noreferrer"
                      className="group/url mx-auto flex max-w-[60%] items-center gap-1.5 truncate rounded-md bg-white/[0.05] px-3 py-1 font-mono text-[10.5px] text-white/45 transition-colors hover:bg-white/[0.09] hover:text-white/80">
                      <Lock className="h-2.5 w-2.5 shrink-0" />
                      <span className="truncate">{hostOf(p)}</span>
                      <ArrowUpRight className="h-3 w-3 shrink-0 opacity-0 transition-opacity group-hover/url:opacity-100" />
                    </Link>
                  ) : (
                    <span className="mx-auto flex max-w-[60%] items-center gap-1.5 truncate rounded-md bg-white/[0.05] px-3 py-1 font-mono text-[10.5px] text-white/45">
                      <Lock className="h-2.5 w-2.5 shrink-0" />
                      <span className="truncate">{hostOf(p)}</span>
                    </span>
                  )}
                  <span className="w-[42px]" aria-hidden="true" />
                </div>
                <div className="aspect-[16/10]">
                  <video src={p.video} poster={p.poster} autoPlay muted loop playsInline className="h-full w-full object-cover object-top" />
                </div>
              </div>

              {p.mobile && (
                <motion.div
                  initial={{ y: 30, opacity: 0, rotate: 0 }} animate={{ y: 0, opacity: 1, rotate: -3 }}
                  transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
                  className="absolute -bottom-4 right-0 aspect-[9/19.3] w-[24%] max-w-[170px] overflow-hidden rounded-[18px] border-[5px] border-[hsl(220_8%_16%)] bg-black md:rounded-[24px] md:border-[6px]"
                  style={{ boxShadow: "-20px 28px 60px rgba(0,0,0,.6)" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.mobile} alt={`Versión mobile de ${p.title}`} className="h-full w-full object-cover object-top" />
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Info ── */}
        <div className="flex min-h-0 flex-col border-t border-white/[0.06] lg:overflow-y-auto lg:border-l lg:border-t-0" data-lenis-prevent>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={p.title} {...swap} className="flex flex-1 flex-col gap-5 p-5 sm:gap-6 sm:p-6 md:p-8">
              <div>
                <span className="inline-flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: ACCENT }} />
                  {p.kind === "web" ? "Sitio web" : "Sistema"}
                </span>
                <h3 id="project-modal-title" className="mt-2 pr-10 text-[clamp(2.4rem,4.5vw,3.6rem)] leading-[0.92] text-white"
                  style={{ fontFamily: "var(--font-bebas)" }}>{p.title}</h3>
                <p className="mt-1 text-[14px] text-white/50" style={{ fontFamily: "var(--font-inter)" }}>{p.subtitle}</p>
              </div>

              <p className="text-[14.5px] font-light leading-relaxed text-white/70" style={{ fontFamily: "var(--font-inter)" }}>{p.description}</p>

              <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.08] text-[13px]" style={{ fontFamily: "var(--font-inter)" }}>
                <div className="bg-[hsl(220_14%_6%)] p-3.5">
                  <dt className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-white/35">Tipo</dt>
                  <dd className="mt-1 text-white/85">{p.kind === "web" ? "Sitio web" : "Sistema / app"}</dd>
                </div>
                <div className="bg-[hsl(220_14%_6%)] p-3.5">
                  <dt className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-white/35">Código</dt>
                  <dd className="mt-1 text-white/85">{p.repoUrl ? "Público en GitHub" : "Privado"}</dd>
                </div>
                <div className="col-span-2 bg-[hsl(220_14%_6%)] p-3.5">
                  <dt className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-white/35">Stack</dt>
                  <dd className="mt-2 flex flex-wrap gap-1.5">
                    {p.technologies.map((t) => (
                      <span key={t} className="rounded-full border border-white/[0.1] bg-white/[0.03] px-2.5 py-1 font-mono text-[10.5px] text-white/65">{t}</span>
                    ))}
                  </dd>
                </div>
              </dl>

              {(p.demoUrl || p.repoUrl) && <div className="flex flex-wrap gap-2">
                {p.demoUrl && (
                  <Link href={p.demoUrl} target="_blank" rel="noopener noreferrer"
                    className="group/cta inline-flex flex-1 items-center justify-center gap-2 rounded-full px-5 py-3 text-[13.5px] font-medium text-black transition hover:brightness-110 sm:flex-none"
                    style={{ backgroundColor: ACCENT }}>
                    {p.kind === "web" ? "Visitar sitio" : "Ver demo"}
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/cta:rotate-45" />
                  </Link>
                )}
                {p.repoUrl && (
                  <Link href={p.repoUrl} target="_blank" rel="noopener noreferrer"
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-white/[0.16] px-5 py-3 text-[13.5px] font-medium text-white/80 transition hover:border-white/40 hover:bg-white/[0.06] hover:text-white sm:flex-none">
                    <Github className="h-4 w-4" /> Código
                  </Link>
                )}
              </div>}
            </motion.div>
          </AnimatePresence>

          {/* Navegación entre proyectos */}
          <nav aria-label="Otros proyectos" className="mt-auto grid grid-cols-2 border-t border-white/[0.06] pb-[env(safe-area-inset-bottom)] md:pb-0">
            <button type="button" onClick={() => go(-1)}
              className="group/nav flex min-w-0 flex-col items-start gap-1 p-5 text-left transition-colors hover:bg-white/[0.03] md:px-8">
              <span className="flex items-center gap-1.5 font-mono text-[9.5px] uppercase tracking-[0.2em] text-white/35">
                <ArrowLeft className="h-3 w-3 transition-transform group-hover/nav:-translate-x-0.5" /> Anterior
              </span>
              <span className="w-full truncate text-[14px] text-white/75 group-hover/nav:text-white">{prev.title}</span>
            </button>
            <button type="button" onClick={() => go(1)}
              className="group/nav flex min-w-0 flex-col items-end gap-1 border-l border-white/[0.06] p-5 text-right transition-colors hover:bg-white/[0.03] md:px-8">
              <span className="flex items-center gap-1.5 font-mono text-[9.5px] uppercase tracking-[0.2em] text-white/35">
                Siguiente <ArrowRight className="h-3 w-3 transition-transform group-hover/nav:translate-x-0.5" />
              </span>
              <span className="w-full truncate text-[14px] text-white/75 group-hover/nav:text-white">{next.title}</span>
            </button>
          </nav>
        </div>

        {/* Cerrar */}
        <button ref={closeRef} type="button" onClick={onClose} aria-label="Cerrar"
          className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.16] bg-black/50 text-white backdrop-blur-md transition-colors hover:border-white/40 hover:bg-white/[0.12] md:right-5 md:top-5">
          <X className="h-4 w-4" />
        </button>
      </motion.div>
    </motion.div>
  )
}

/* ═══ Sección ═══ */

export function ProjectsBento() {
  const [filter, setFilter] = useState<"todos" | Kind>("todos")
  const [open, setOpen] = useState<number | null>(null)
  const close = useCallback(() => setOpen(null), [])
  // El portal solo existe en el cliente: esperar al montaje evita un mismatch de hidratación
  const [portalReady, setPortalReady] = useState(false)
  useEffect(() => setPortalReady(true), [])

  // Al filtrar cambia la altura del bento: recalcular las animaciones de scroll de abajo
  useEffect(() => {
    const t = setTimeout(() => ScrollTrigger.refresh(), 600)
    return () => clearTimeout(t)
  }, [filter])

  const visible = PROJECTS.filter((p) => filter === "todos" || p.kind === filter)
  const spans = spansFor(visible.length)

  return (
    <>
      <div className="mb-5 flex flex-wrap gap-1.5" role="group" aria-label="Filtrar proyectos">
        {FILTERS.map((f) => {
          const count = f.key === "todos" ? PROJECTS.length : PROJECTS.filter((p) => p.kind === f.key).length
          const on = filter === f.key
          return (
            <button key={f.key} type="button" aria-pressed={on} onClick={() => setFilter(f.key)}
              className={`rounded-full border px-4 py-2 text-[13px] font-medium transition-colors duration-300 ${on ? "border-white bg-white text-black" : "border-white/[0.16] text-white/65 hover:text-white"}`}
              style={{ fontFamily: "var(--font-inter)" }}>
              {f.label}<sup className="ml-1 font-mono text-[9px] opacity-60">{count}</sup>
            </button>
          )
        })}
      </div>

      <motion.div layout className="grid grid-cols-12 gap-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((p, i) => (
            <motion.div key={p.title} layout
              className="project-tile col-span-12 lg:[grid-column:span_var(--span)_/_span_var(--span)]"
              style={{ ["--span" as string]: spans[i] }}
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}>
              <ProjectTile p={p} span={spans[i]} onOpen={() => setOpen(i)} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {portalReady && createPortal(
        <AnimatePresence>
          {open !== null && visible[open] && (
            <ProjectModal key="project-modal" list={visible} index={open} onClose={close} onNavigate={setOpen} />
          )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  )
}
