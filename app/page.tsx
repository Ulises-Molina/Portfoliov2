"use client"

import type React from "react"
import { useRef, useEffect, useState, useCallback } from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap"
import { ArrowUpRight, Github, Linkedin, Mail, ExternalLink, Code, FileText, Globe, Workflow, AppWindow, Zap, Filter, MessageSquare, Database, Briefcase, Sparkles } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import dynamic from "next/dynamic"
import { SmoothScroll } from "@/components/smooth-scroll"
import EarthGlobe from "@/components/ui/globe"

const WarpedGrid = dynamic(() => import("@/components/warped-grid").then((m) => m.WarpedGrid), { ssr: false })
const LoadingScreen = dynamic(() => import("@/components/loading-screen").then((m) => m.LoadingScreen), { ssr: false })

const ACCENT = "165, 80%, 48%"
const ac = (a = 1) => `hsl(${ACCENT} / ${a})`

/* ═══ DATA ═══ */

const SOCIAL = [
  { href: "https://github.com/Ulises-Molina", icon: Github, label: "GH" },
  { href: "https://www.linkedin.com/in/ulises-rafael-molina/", icon: Linkedin, label: "LI" },
  { href: "mailto:ulisesmolinadev@gmail.com", icon: Mail, label: "EM" },
]

const TECH = [
  { label: "JavaScript", icon: "/iconos/javascript.svg" },
  { label: "TypeScript", icon: "/iconos/typescript.svg" },
  { label: "React", icon: "/iconos/react_light.svg" },
  { label: "Next.js", icon: "/iconos/nextjs_icon_dark.svg" },
  { label: "HTML5", icon: "/iconos/html5.svg" },
  { label: "CSS", icon: "/iconos/css_old.svg" },
  { label: "Tailwind CSS", icon: "/iconos/tailwindcss.svg" },
  { label: "SQL", icon: "/iconos/postgresql.svg" },
  { label: "Git", icon: "/iconos/git.svg" },
  { label: "AWS", icon: "/iconos/aws_light.svg" },
  { label: "Wordpress", icon: "/iconos/wordpress.svg" },
  { label: "Shopify", icon: "/iconos/shopify.svg" },
  { label: "Elementor", icon: "/iconos/elementor.svg" },
  { label: "n8n", icon: "/iconos/n8n.svg" },
]

const SERVICES = [
  {
    n: "01",
    title: "Desarrollo Web",
    subtitle: "Sitios & E-Commerce",
    bullets: [
      "Landings & corporativos",
      "E-Commerce (Shopify / WP)",
      "SEO técnico & performance",
      "Responsive design",
      "Animaciones & microinteracciones",
      "Optimización de conversión",
    ],
    stack: ["Next.js", "Wordpress", "Shopify", "Tailwind"],
    icon: Globe,
  },
  {
    n: "02",
    title: "Automatizaciones",
    subtitle: "Flujos & Procesos",
    description: "Integraciones a medida que conectan herramientas, eliminan tareas manuales y escalan la operatividad sin esfuerzo.",
    bullets: [
      "Workflows con n8n / Zapier",
      "Integraciones de APIs",
      "Email marketing & CRM",
      "Sincronización de datos",
    ],
    stack: ["n8n", "Zapier", "REST APIs", "Webhooks"],
    icon: Workflow,
  },
  {
    n: "03",
    title: "Desarrollo de Apps",
    subtitle: "Producto & SaaS",
    description: "Web apps, dashboards y herramientas internas con interfaz moderna, autenticación robusta y backend escalable.",
    bullets: [
      "Web Apps & SaaS",
      "Dashboards a medida",
      "Auth & base de datos",
      "Deploy & mantenimiento",
    ],
    stack: ["React", "Next.js", "Supabase", "TypeScript"],
    icon: AppWindow,
  },
]

const EXPERIENCE = [
  {
    role: "Web Developer", company: "Qualita Studio", period: "MAR 2025 — PRESENTE", current: true,
    description: "Desarrollo, configuración y mantenimiento de sitios web y plataformas E-Commerce.\nImplementación front-end con HTML, CSS y JavaScript. Gestión de WordPress y Shopify, personalización de themes y plugins.\nDiseño y optimización UX/UI, responsive design, automatización de procesos con n8n y Zapier, integración de APIs, SEO técnico, administración de hosting y dominios, soporte en Email Marketing.\nColaboración con equipos de diseño y marketing bajo metodologías ágiles.",
    technologies: ["Wordpress", "Elementor", "Shopify", "Notion", "Zapier", "HTML5", "CSS3", "JavaScript"],
  },
  {
    role: "Pasante Web Developer", company: "Qualita Studio", period: "FEB — MAR 2025", current: false,
    description: "Desarrollo de sitios web con enfoque en interfaces responsivas, accesibles y alineadas con los objetivos del negocio.",
    technologies: ["Wordpress", "Elementor", "Shopify", "ClickUp"],
  },
  {
    role: "Encargado de local", company: "Great Burgers", period: "2023 — 2025", current: false,
    description: "Atención al cliente, manejo de caja, grupo de trabajo y control de inventario.",
    technologies: [],
  },
]

const PROJECTS = [
  {
    title: "Web Audity", subtitle: "Auditoría web",
    description: "Herramienta para auditar el rendimiento y SEO de sitios web. Analiza métricas clave, detecta problemas y ofrece recomendaciones para optimizar la velocidad y el posicionamiento de cualquier página.",
    technologies: ["Next.js", "TypeScript", "TailwindCSS", "Vercel"],
    demoUrl: "https://web-audity.vercel.app/", repoUrl: "https://github.com/Ulises-Molina/web-audity",
    video: "/web-audity.mp4", screenshot: "/web-audity.mp4", isPrivate: false,
  },
  {
    title: "Stockear", subtitle: "Gestión de stock y ventas",
    description: "Sistema integral para pequeños comercios: inventario en tiempo real, venta rápida, reportes y cierre de caja desde un único panel.",
    technologies: ["Next.js", "Supabase", "TailwindCSS", "Claude Code", "Shadcn/ui", "Vercel"],
    demoUrl: "https://stockear.vercel.app/", repoUrl: "https://github.com/Ulises-Molina/Stockear",
    video: "/stockear.mp4", screenshot: "/stockear.jpeg", isPrivate: false,
  },
  {
    title: "SVN Designs", subtitle: "Catálogo & e-commerce",
    description: "Catálogo visual atractivo y fácil de navegar, con formularios de pedido y automatización de respuestas vía Zapier. Una interfaz clara que transmite profesionalismo.",
    technologies: ["Shopify", "Typeform", "Zapier"],
    demoUrl: "https://svn-designs.com/", repoUrl: "",
    video: "/svn.mp4", screenshot: "/svnmobile.png", isPrivate: true,
  },
  {
    title: "Skiway", subtitle: "E-commerce industrial",
    description: "Sitio para una marca argentina de calzado e indumentaria de seguridad industrial. Diseño responsivo con catálogo de productos filtrable y fichas técnicas claras.",
    technologies: ["Wordpress", "Elementor", "WooCommerce", "CSS"],
    demoUrl: "https://skiway.com.ar/", repoUrl: "",
    video: "/skiway.mp4", screenshot: "/skiwaymobile.png", isPrivate: true,
  },
  {
    title: "Surland Viajes", subtitle: "Agencia de viajes",
    description: "Agencia de viajes de egresados y quinceañeras a destinos como Bariloche, Camboriú, cruceros y Disney. Diseño responsivo que presenta los paquetes de forma clara y atractiva.",
    technologies: ["Wordpress", "Elementor", "CSS"],
    demoUrl: "https://surlandviajes.tur.ar/", repoUrl: "",
    video: "/surland.mp4", screenshot: "/surlandmobile.png", isPrivate: true,
  },
  {
    title: "Green Company", subtitle: "Web corporativa B2B",
    description: "Soluciones logísticas B2B para empresas. Interfaz alineada con la identidad de la marca y optimizada para todos los dispositivos, con foco en transmitir confianza.",
    technologies: ["Wordpress", "Elementor", "WooCommerce"],
    demoUrl: "https://greenmovingco.com/", repoUrl: "",
    video: "/green.mp4", screenshot: "/greenmobile.jpeg", isPrivate: true,
  },
  {
    title: "Fintrack", subtitle: "Finanzas personales",
    description: "Dashboard de finanzas personales con seguimiento de gastos, categorización automática, análisis con IA y visualización de tendencias. Incluye autenticación y gestión multi-cuenta.",
    technologies: ["React", "Supabase", "0Auth", "Vite", "TailwindCSS"],
    demoUrl: "https://fintrackgastos.vercel.app/", repoUrl: "https://github.com/Ulises-Molina/Fintrack",
    video: "/Fintrack.mp4", screenshot: "/fintrack-sh-mobile.jpeg", isPrivate: false,
  },
  {
    title: "Great Burgers", subtitle: "App de pedidos",
    description: "App de pedidos para restaurante con menú interactivo por categorías, carrito en tiempo real y panel de administración para gestionar productos, precios y disponibilidad.",
    technologies: ["NextJS", "TypeScript", "TailwindCSS", "Supabase"],
    demoUrl: "https://great-burgers.vercel.app/", repoUrl: "https://github.com/Ulises-Molina/Market-Crypto",
    video: "/great.mp4", screenshot: "/great-sh-mobile.jpeg", isPrivate: true,
  },
  {
    title: "Crypto Market", subtitle: "Precios real-time",
    description: "Plataforma de seguimiento cripto con precios en tiempo real vía API, gráficos históricos interactivos con Chart.js y feed de noticias del mercado integrado.",
    technologies: ["React", "TypeScript", "TailwindCSS", "Chart.js", "NewsAPI"],
    demoUrl: "https://marketcrypto-psi.vercel.app/", repoUrl: "https://github.com/Ulises-Molina/Market-Crypto",
    video: "/marketcrypto.mp4", screenshot: "/crypto-sh-mobile.jpeg", isPrivate: false,
  },
  {
    title: "NextJS E-Commerce", subtitle: "Tienda full-stack",
    description: "Tienda online full-stack con catálogo de productos, filtros por categoría, carrito persistente, checkout y autenticación de usuarios con NextAuth y base de datos PostgreSQL.",
    technologies: ["NextJS", "TypeScript", "TailwindCSS", "PostgreSQL", "NextAuth"],
    demoUrl: "https://next-js-eccomerce-nine.vercel.app/", repoUrl: "https://github.com/Ulises-Molina/NextJS-Eccomerce",
    video: "/nextjs.mp4", screenshot: "/next-sh-mobile.jpeg", isPrivate: false,
  }
]

const CERTS = [
  { title: "JavaScript Algorithms & Data Structures", org: "freeCodeCamp", date: "02.2025", url: "https://www.freecodecamp.org/certification/Ulises-Molina/javascript-algorithms-and-data-structures-v8" },
  { title: "Curso avanzado de React JS", org: "Gobierno de la Ciudad de Buenos Aires", date: "06.2025", url: "https://www.linkedin.com/in/ulises-rafael-molina/overlay/1752792565172/single-media-viewer/?profileId=ACoAAEMW2M4BXEIU9aAorWjDk3HB4Cl0NRGjZy8" },
  { title: "Curso avanzado de Node JS", org: "Gobierno de la Ciudad de Buenos Aires", date: "12.2025", url: "https://www.linkedin.com/in/ulises-rafael-molina/overlay/1766005199800/single-media-viewer/?profileId=ACoAAEMW2M4BXEIU9aAorWjDk3HB4Cl0NRGjZy8" },
  { title: "Responsive Web Design", org: "freeCodeCamp", date: "01.2025", url: "https://www.freecodecamp.org/certification/Ulises-Molina/responsive-web-design" },
  { title: "English Certificate B2 — Upper Intermediate", org: "EF SET", date: "02.2025", url: "https://cert.efset.org/es/7WVPUE" },
  { title: "Claude Code in Action", org: "Anthropic", date: "03.2026", url: "https://verify.skilljar.com/c/d45ub3kt6epf" },
]

/* ═══ ABOUT — components ═══ */

function useTicker(intervalMs = 1000) {
  const [t, setT] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setT(new Date()), intervalMs)
    return () => clearInterval(id)
  }, [intervalMs])
  return t
}

function LiveDot({ size = 6 }: { size?: number }) {
  return (
    <span className="relative inline-flex" style={{ width: size, height: size }}>
      <span className="absolute inset-0 rounded-full animate-ping" style={{ background: ac(0.55) }} />
      <span className="relative rounded-full" style={{ width: size, height: size, background: ac(), boxShadow: `0 0 8px ${ac(0.8)}` }} />
    </span>
  )
}

/* ─── Count-up — animación numérica al entrar en viewport ─── */

function CountUp({ to, prefix = "", duration = 1200 }: { to: number; prefix?: string; duration?: number }) {
  const [n, setN] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    if (reduce) { setN(to); return }
    const el = ref.current
    if (!el) return
    let started = false
    let raf = 0
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !started) {
          started = true
          const start = performance.now()
          const tick = (t: number) => {
            const p = Math.min(1, (t - start) / duration)
            const eased = 1 - Math.pow(1 - p, 3)
            setN(Math.round(to * eased))
            if (p < 1) raf = requestAnimationFrame(tick)
          }
          raf = requestAnimationFrame(tick)
        }
      })
    }, { threshold: 0.4 })
    obs.observe(el)
    return () => { obs.disconnect(); cancelAnimationFrame(raf) }
  }, [to, duration, reduce])

  return <span ref={ref} className="tabular-nums">{prefix}{n}</span>
}

/* ─── Card shell — base visual compartida (gradiente, halo, textura) ─── */

type BlobPosPreset = "tl" | "tr" | "bl" | "br"
type BlobPosCustom = { top?: string; bottom?: string; left?: string; right?: string }

function CardShell({
  children,
  className = "",
  blob = "hsla(165, 80%, 48%, 0.2)",
  blobPos = "tr",
  minH,
}: {
  children: React.ReactNode
  className?: string
  blob?: string
  blobPos?: BlobPosPreset | BlobPosCustom
  minH?: number
}) {
  const presets: Record<BlobPosPreset, BlobPosCustom> = {
    tl: { top: "-25%", left: "-25%" },
    tr: { top: "-25%", right: "-25%" },
    bl: { bottom: "-25%", left: "-25%" },
    br: { bottom: "-25%", right: "-25%" },
  }
  const blobStyle = typeof blobPos === "string" ? presets[blobPos] : blobPos

  return (
    <div
      className={`group relative rounded-[20px] overflow-hidden flex flex-col p-7 md:p-8 transition-[border-color,box-shadow] duration-500 hover:border-white/[0.14] ${className}`}
      style={{
        background: "linear-gradient(180deg, hsla(220, 18%, 9%, 0.7) 0%, hsla(220, 22%, 4%, 0.96) 100%)",
        boxShadow: "inset 0 1px 0 hsla(0, 0%, 100%, 0.06), 0 30px 60px -25px rgba(0,0,0,0.5)",
        border: "1px solid hsla(0, 0%, 100%, 0.08)",
        minHeight: minH,
      }}
    >
      <div
        className="absolute top-0 left-8 right-8 h-px pointer-events-none opacity-70 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: `linear-gradient(90deg, transparent, ${ac(0.65)}, transparent)` }}
      />
      <div
        className="absolute w-72 h-72 rounded-full pointer-events-none"
        style={{ ...blobStyle, background: `radial-gradient(circle, ${blob}, transparent 70%)`, filter: "blur(50px)" }}
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: "22px 22px",
        }}
      />
      <div className="relative z-10 flex flex-col flex-1">{children}</div>
    </div>
  )
}

/* ─── Counters card — años, proyectos, stacks ─── */

const COUNTERS = [
  { value: 2, prefix: "+", label: "AÑOS" },
  { value: 15, prefix: "+", label: "PROYECTOS" },
  { value: 6, prefix: "", label: "CERTIFICADOS" },
]

function CountersCard() {
  return (
    <CardShell blob="transparent" blobPos="bl">
      <div className="flex items-center justify-between mb-8 md:mb-10">
        <span className="font-mono text-[10px] tracking-[0.4em] text-white/65 inline-flex items-center gap-2.5">
          <span className="w-3 h-px" style={{ background: ac(0.7) }} />
          TRACK RECORD
        </span>
        <span className="font-mono text-[10px] tracking-[0.3em] text-white/35">2024 — HOY</span>
      </div>

      <div className="grid grid-cols-3 gap-3 md:gap-5">
        {COUNTERS.map((c, i) => (
          <div
            key={c.label}
            className={`text-center ${i > 0 ? "border-l border-white/[0.06]" : ""}`}
          >
            <p className="text-[2rem] md:text-[2.5rem] font-bold leading-none text-white tracking-tight">
              <CountUp to={c.value} prefix={c.prefix} />
            </p>
            <div className="flex items-center justify-center gap-2 mt-3">
              <span className="w-2 h-px" style={{ background: ac(0.5) }} />
              <p className="font-mono text-[9px] md:text-[10px] tracking-[0.3em] text-white/45">{c.label}</p>
            </div>
          </div>
        ))}
      </div>
    </CardShell>
  )
}

/* ─── Live status card — identidad fija + snapshot rotando del "ahora" ─── */

type LiveState = {
  label: string
  icon: typeof Code
  value?: string
  stack?: { name: string; icon: string }[]
}

const LIVE_STATES: LiveState[] = [
  { label: "Working at", value: "Qualita Studio", icon: Briefcase },
  {
    label: "Stack principal",
    icon: Zap,
    stack: [
      { name: "Next.js", icon: "/iconos/nextjs_icon_dark.svg" },
      { name: "React", icon: "/iconos/react_light.svg" },
      { name: "TypeScript", icon: "/iconos/typescript.svg" },
      { name: "JavaScript", icon: "/iconos/javascript.svg" },
      { name: "Node.js", icon: "/iconos/nodejs.svg" },
      { name: "WordPress", icon: "/iconos/wordpress.svg" },
      { name: "n8n", icon: "/iconos/n8n.svg" },
    ],
  },
  { label: "Último certificado", value: "Claude Code in Action · Anthropic", icon: FileText },
]

const LIVE_INTERVAL_MS = 4500

function LiveStatusCard() {
  const [idx, setIdx] = useState(0)
  const reduce = useReducedMotion()
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (reduce) return
    const id = setInterval(() => setIdx((p) => (p + 1) % LIVE_STATES.length), LIVE_INTERVAL_MS)
    return () => clearInterval(id)
  }, [reduce])

  useEffect(() => {
    const el = progressRef.current
    if (!el) return
    if (reduce) { el.style.transform = "scaleX(1)"; return }
    el.style.transform = "scaleX(0)"
    const start = performance.now()
    let raf = 0
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / LIVE_INTERVAL_MS)
      el.style.transform = `scaleX(${p})`
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [idx, reduce])

  const current = LIVE_STATES[idx]
  const Icon = current.icon

  return (
    <CardShell blob={ac(0.22)} blobPos="tr">
      {/* Terminal header — window dots + path + counter */}
      <div
        className="-mx-7 md:-mx-8 -mt-7 md:-mt-8 mb-6 px-5 py-3 flex items-center justify-between"
        style={{
          background: "hsla(220, 22%, 5%, 0.55)",
          borderBottom: "1px solid hsla(0, 0%, 100%, 0.06)",
        }}
      >
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: "hsla(0, 70%, 60%, 0.7)" }} />
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: "hsla(40, 90%, 60%, 0.7)" }} />
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: "hsla(140, 70%, 50%, 0.7)" }} />
        </div>
        <div className="inline-flex items-center gap-2">
          <LiveDot size={5} />
          <span className="font-mono text-[10px] tracking-[0.25em] text-white/55 tabular-nums">
            {String(idx + 1).padStart(2, "0")}
            <span className="text-white/20">/</span>
            {String(LIVE_STATES.length).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* Body — rotador horizontal, centrado vertical */}
      <div className="flex-1 flex items-center min-h-[120px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -14, filter: "blur(6px)" }}
            transition={{ duration: 0.5, ease: [0.65, 0, 0.35, 1] }}
            className="flex items-center gap-4 w-full"
          >
            <span
              className="grid place-items-center w-12 h-12 rounded-xl shrink-0"
              style={{
                background: `linear-gradient(135deg, ${ac(0.2)}, ${ac(0.05)})`,
                border: `1px solid ${ac(0.32)}`,
                boxShadow: `inset 0 1px 0 ${ac(0.25)}, 0 0 16px ${ac(0.15)}`,
              }}
            >
              <Icon className="w-5 h-5" style={{ color: ac() }} />
            </span>
            <div className="min-w-0 flex-1">
              <span className="font-mono text-[9.5px] tracking-[0.32em] text-white/50 uppercase block">
                {current.label}
              </span>
              {current.stack ? (
                <div className="flex items-center gap-2 mt-2 flex-wrap">
                  {current.stack.map((s) => (
                    <span
                      key={s.name}
                      title={s.name}
                      className="grid place-items-center w-9 h-9 rounded-lg shrink-0 transition-colors duration-300 hover:border-white/20"
                      style={{
                        background: "hsla(0, 0%, 100%, 0.04)",
                        border: "1px solid hsla(0, 0%, 100%, 0.08)",
                      }}
                    >
                      <Image src={s.icon} alt={s.name} width={18} height={18} className="opacity-90" />
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-[1.2rem] md:text-[1.4rem] font-semibold leading-[1.2] text-white tracking-tight mt-1 text-balance">
                  {current.value}
                </p>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress bars — la activa se llena progresivamente durante el ciclo */}
      <div className="mt-5 flex items-center gap-1.5">
        {LIVE_STATES.map((_, i) => {
          const isPast = i < idx
          const isCurrent = i === idx
          return (
            <div
              key={i}
              className="h-[2px] flex-1 rounded-full overflow-hidden relative"
              style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
            >
              {isPast && (
                <div
                  className="absolute inset-0"
                  style={{ backgroundColor: "hsl(165, 80%, 48%)", opacity: 0.4 }}
                />
              )}
              {isCurrent && (
                <div
                  ref={progressRef}
                  className="absolute inset-0"
                  style={{
                    backgroundColor: "hsl(165, 80%, 48%)",
                    boxShadow: "0 0 6px hsla(165, 80%, 48%, 0.4)",
                    opacity: 0.7,
                    transformOrigin: "left",
                    transform: "scaleX(0)",
                    willChange: "transform",
                    zIndex: 1,
                  }}
                />
              )}
            </div>
          )
        })}
      </div>
    </CardShell>
  )
}

/* ─── Location card — globo rotando + reloj en vivo ─── */

function LocationCard() {
  const now = useTicker(1000)
  const time = now.toLocaleTimeString("es-AR", {
    hour: "2-digit", minute: "2-digit", second: "2-digit",
    hour12: false, timeZone: "America/Argentina/Buenos_Aires",
  })

  return (
    <CardShell blob="hsla(165, 80%, 55%, 0.22)" blobPos={{ top: "35%", left: "-30%" }} minH={320} className="h-full">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] tracking-[0.4em] text-white/65 inline-flex items-center gap-2.5">
          <span className="w-3 h-px" style={{ background: ac(0.7) }} />
          UBICACIÓN
        </span>
        <span className="font-mono text-[10px] tracking-[0.3em] text-white/40">UTC −03:00</span>
      </div>

      <div className="flex-1 relative my-4 md:my-6 flex items-center justify-center">
        <EarthGlobe size={240} />
      </div>

      <div className="flex items-baseline justify-between gap-3 flex-wrap">
        <div>
          <p className="text-base md:text-lg font-semibold text-white tracking-tight">Buenos Aires, ARG</p>
          <p className="font-mono text-[10px] tracking-[0.25em] text-white/35 mt-0.5">−34.61° / −58.38°</p>
        </div>
        <p className="font-mono text-2xl md:text-[1.85rem] font-bold tabular-nums" style={{ color: ac() }}>{time}</p>
      </div>
    </CardShell>
  )
}

/* ═══ CURSOR ═══ */

function MagneticCursor() {
  const outerRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const [hov, setHov] = useState(false)

  const pos = useRef({ x: -100, y: -100 })

  useEffect(() => {
    if (!outerRef.current || !dotRef.current) return

    const onM = (e: MouseEvent) => { pos.current = { x: e.clientX, y: e.clientY } }
    const onOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest("a, button, [role='button'], .magnetic")) setHov(true)
    }
    const onOut = () => setHov(false)
    window.addEventListener("mousemove", onM, { passive: true })
    document.addEventListener("mouseover", onOver)
    document.addEventListener("mouseout", onOut)

    const tick = () => {
      gsap.set(dotRef.current, { x: pos.current.x, y: pos.current.y })
      gsap.set(outerRef.current, { x: pos.current.x, y: pos.current.y })
      requestAnimationFrame(tick)
    }
    const raf = requestAnimationFrame(tick)

    return () => { window.removeEventListener("mousemove", onM); document.removeEventListener("mouseover", onOver); document.removeEventListener("mouseout", onOut); cancelAnimationFrame(raf) }
  }, [])

  return (
    <>
      <div ref={outerRef} className={`custom-cursor fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 rounded-full border transition-all duration-300 ${hov ? "w-14 h-14 border-[hsl(165,80%,48%)] bg-[hsl(165,80%,48%)]/10 opacity-100" : "w-8 h-8 border-white/20 opacity-0 scale-50"}`} />
      <div ref={dotRef} className="custom-cursor fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[hsl(165,80%,48%)]" />
    </>
  )
}

/* ═══ TECH — orbit pro ═══ */

type Tech = {
  label: string
  icon: string
  categories: string[]
}

type Ring = {
  label: string
  radius: number
  duration: number
  reverse: boolean
  items: Tech[]
}

const TECH_RINGS: Ring[] = [
  {
    label: "Backend & Cloud",
    radius: 22,
    duration: 70,
    reverse: false,
    items: [
      { label: "Node.js", icon: "/iconos/nodejs.svg", categories: ["Backend"] },
      { label: "SQL", icon: "/iconos/postgresql.svg", categories: ["Database"] },
      { label: "AWS", icon: "/iconos/aws_light.svg", categories: ["Cloud"] },
      { label: "Git", icon: "/iconos/git.svg", categories: ["DevOps"] },
    ],
  },
  {
    label: "CMS & Automation",
    radius: 36,
    duration: 105,
    reverse: true,
    items: [
      { label: "WordPress", icon: "/iconos/wordpress.svg", categories: ["CMS"] },
      { label: "Shopify", icon: "/iconos/shopify.svg", categories: ["E-commerce", "CMS"] },
      { label: "Elementor", icon: "/iconos/elementor.svg", categories: ["CMS"] },
      { label: "n8n", icon: "/iconos/n8n.svg", categories: ["Automation"] },
    ],
  },
  {
    label: "Frontend",
    radius: 49,
    duration: 140,
    reverse: false,
    items: [
      { label: "Next.js", icon: "/iconos/nextjs_icon_dark.svg", categories: ["Frontend", "Backend"] },
      { label: "React", icon: "/iconos/react_light.svg", categories: ["Frontend"] },
      { label: "TypeScript", icon: "/iconos/typescript.svg", categories: ["Frontend", "Backend"] },
      { label: "JavaScript", icon: "/iconos/javascript.svg", categories: ["Frontend", "Backend"] },
      { label: "Tailwind CSS", icon: "/iconos/tailwindcss.svg", categories: ["Frontend"] },
      { label: "HTML5", icon: "/iconos/html5.svg", categories: ["Frontend"] },
      { label: "CSS", icon: "/iconos/css_old.svg", categories: ["Frontend"] },
    ],
  },
]

// Display order for the editorial stack columns (primary area first).
const STACK_ORDER = ["Frontend", "Backend & Cloud", "CMS & Automation"]

function TechStack() {
  const groups = [...TECH_RINGS].sort(
    (a, b) => STACK_ORDER.indexOf(a.label) - STACK_ORDER.indexOf(b.label),
  )

  return (
    <div className="space-y-7">
      {groups.map((group) => (
        <div key={group.label}>
          <div className="flex items-center gap-2.5 mb-3.5">
            <span className="w-1 h-1 rounded-full shrink-0" style={{ background: ac(), boxShadow: `0 0 6px ${ac(0.7)}` }} />
            <h3 className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/40">{group.label}</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {group.items.map((t) => (
              <span
                key={t.label}
                className="group inline-flex items-center gap-2 pl-2 pr-3.5 py-1.5 rounded-full border border-white/[0.1] bg-white/[0.03] transition-colors duration-300 hover:border-white/25 hover:bg-white/[0.06]"
              >
                <Image src={t.icon} alt="" width={16} height={16} className="opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="text-[13px] text-white/70 group-hover:text-white transition-colors duration-300">{t.label}</span>
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

/* ═══ SERVICES — sticky-stacked deck of dramatic cards ═══ */

/* Inline mockups — one visual identity per service (Web / Flow / App) */

function WebMockup() {
  return (
    <div className="relative w-full max-w-[580px] aspect-[4/3] rounded-2xl overflow-hidden border border-white/[0.12]"
      style={{
        background: "linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.015) 100%)",
        boxShadow: `0 40px 80px -10px rgba(0,0,0,0.7), 0 0 80px ${ac(0.2)}, 0 0 0 1px rgba(255,255,255,0.04) inset`,
      }}>
      {/* Browser chrome */}
      <div className="h-9 border-b border-white/[0.08] px-4 flex items-center gap-2 bg-white/[0.02]">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-white/15" />
          <div className="w-2.5 h-2.5 rounded-full bg-white/15" />
          <div className="w-2.5 h-2.5 rounded-full bg-white/15" />
        </div>
        <div className="ml-3 h-5 flex-1 max-w-[60%] rounded-md bg-white/[0.06] px-2.5 flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: ac(), boxShadow: `0 0 6px ${ac(0.7)}` }} />
          <div className="font-mono text-[8px] tracking-wider text-white/50">tu-marca.com</div>
        </div>
      </div>

      {/* Page content */}
      <div className="p-5 space-y-3.5">
        {/* Hero block */}
        <div className="space-y-1.5">
          <div className="h-3.5 w-[78%] rounded" style={{ background: `linear-gradient(90deg, ${ac()} 0%, ${ac(0.4)} 100%)` }} />
          <div className="h-2 w-[55%] rounded bg-white/15" />
          <div className="h-2 w-[42%] rounded bg-white/10" />
        </div>

        {/* CTAs */}
        <div className="flex gap-2 pt-0.5">
          <div className="h-7 w-24 rounded-full flex items-center justify-center px-3"
            style={{ background: ac(0.9), boxShadow: `0 0 18px ${ac(0.55)}` }}>
            <div className="h-1.5 w-12 rounded bg-black/40" />
          </div>
          <div className="h-7 w-20 rounded-full border border-white/20 flex items-center justify-center">
            <div className="h-1.5 w-10 rounded bg-white/40" />
          </div>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-3 gap-2 pt-1">
          {[0, 1, 2].map((i) => (
            <div key={i} className="aspect-[1/1] rounded-lg border border-white/[0.06] p-2"
              style={{ background: i === 1 ? `linear-gradient(135deg, ${ac(0.18)} 0%, transparent 80%)` : "rgba(255,255,255,0.03)" }}>
              <div className="w-3.5 h-3.5 rounded mb-1.5" style={{ background: i === 1 ? ac(0.75) : "rgba(255,255,255,0.18)" }} />
              <div className="h-1 w-3/4 rounded bg-white/15 mb-1" />
              <div className="h-1 w-1/2 rounded bg-white/10" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function FlowNode({
  Icon, sub, label, accent, style,
}: {
  Icon: typeof Zap; sub: string; label: string; accent?: boolean; style?: React.CSSProperties;
}) {
  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2 rounded-xl backdrop-blur-md flex items-center gap-2 px-2.5 py-2 min-w-[124px] z-10"
      style={{
        ...style,
        border: `1px solid ${accent ? ac(0.55) : "rgba(255,255,255,0.12)"}`,
        background: accent
          ? `linear-gradient(135deg, ${ac(0.18)} 0%, rgba(255,255,255,0.04) 100%)`
          : "rgba(255,255,255,0.04)",
        boxShadow: accent ? `0 0 24px ${ac(0.35)}` : "0 8px 24px -8px rgba(0,0,0,0.5)",
      }}
    >
      <div
        className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
        style={{
          background: accent ? ac(0.22) : "rgba(255,255,255,0.06)",
          border: `1px solid ${accent ? ac(0.4) : "rgba(255,255,255,0.08)"}`,
        }}
      >
        <Icon className="w-3.5 h-3.5" style={{ color: accent ? ac() : "rgba(255,255,255,0.7)" }} />
      </div>
      <div className="min-w-0 leading-none">
        <div className="font-mono text-[7.5px] tracking-[0.18em] uppercase mb-1"
          style={{ color: accent ? ac(0.85) : "rgba(255,255,255,0.4)" }}>
          {sub}
        </div>
        <div className="text-[10.5px] font-semibold" style={{ color: accent ? "white" : "rgba(255,255,255,0.85)" }}>
          {label}
        </div>
      </div>
      {accent && (
        <div className="w-1.5 h-1.5 rounded-full ml-auto shrink-0"
          style={{ background: "rgb(74, 222, 128)", boxShadow: "0 0 8px rgb(74, 222, 128)" }} />
      )}
    </div>
  )
}

function FlowMockup() {
  // n8n / Zapier-style canvas: trigger → process → branches into 2 actions
  return (
    <div className="relative w-full max-w-[580px] aspect-[4/3] rounded-2xl overflow-hidden border border-white/[0.12]"
      style={{
        background: "linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.015) 100%)",
        boxShadow: `0 40px 80px -10px rgba(0,0,0,0.7), 0 0 80px ${ac(0.2)}, 0 0 0 1px rgba(255,255,255,0.04) inset`,
      }}>

      {/* Toolbar */}
      <div className="relative z-20 h-9 border-b border-white/[0.08] px-4 flex items-center justify-between bg-white/[0.02]">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: "rgb(74, 222, 128)", boxShadow: "0 0 8px rgb(74, 222, 128)" }} />
          <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/65">Workflow · Active</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-mono text-[9px] tracking-wider text-white/40">1,284 runs</span>
          <span className="font-mono text-[9px] tracking-wider" style={{ color: ac() }}>99.8%</span>
        </div>
      </div>

      {/* Canvas */}
      <div className="relative" style={{ height: "calc(100% - 36px)" }}>
        {/* Dot grid */}
        <div className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)`,
            backgroundSize: "18px 18px",
          }} />

        {/* SVG connectors — viewBox matches the 4/3 container so geometry is undistorted */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 450" fill="none" preserveAspectRatio="xMidYMid meet">
          <defs>
            <marker
              id="arrowEnd"
              viewBox="0 0 12 12"
              refX="10"
              refY="6"
              markerUnits="userSpaceOnUse"
              markerWidth="11"
              markerHeight="11"
              orient="auto"
            >
              <path d="M 1 1 L 11 6 L 1 11 L 3.5 6 z" fill="rgba(255,255,255,0.6)" />
            </marker>
          </defs>

          {/* Trigger → Filter */}
          <path
            id="connA"
            d="M 300 107 L 300 196"
            stroke="rgba(255,255,255,0.45)"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeDasharray="4 4"
            markerEnd="url(#arrowEnd)"
          />
          {/* Filter → Slack (left branch) */}
          <path
            id="connB"
            d="M 300 254 L 186 340"
            stroke="rgba(255,255,255,0.45)"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeDasharray="4 4"
            markerEnd="url(#arrowEnd)"
          />
          {/* Filter → Database (right branch) */}
          <path
            id="connC"
            d="M 300 254 L 414 340"
            stroke="rgba(255,255,255,0.45)"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeDasharray="4 4"
            markerEnd="url(#arrowEnd)"
          />

          {/* Animated traveling dots — staggered to suggest continuous flow */}
          <circle r="4" fill={ac()} style={{ filter: `drop-shadow(0 0 8px ${ac()})` }}>
            <animateMotion dur="2.2s" repeatCount="indefinite" begin="0s">
              <mpath href="#connA" />
            </animateMotion>
          </circle>
          <circle r="3.5" fill={ac()} style={{ filter: `drop-shadow(0 0 7px ${ac()})` }}>
            <animateMotion dur="2.6s" repeatCount="indefinite" begin="0.9s">
              <mpath href="#connB" />
            </animateMotion>
          </circle>
          <circle r="3.5" fill={ac()} style={{ filter: `drop-shadow(0 0 7px ${ac()})` }}>
            <animateMotion dur="2.6s" repeatCount="indefinite" begin="1.4s">
              <mpath href="#connC" />
            </animateMotion>
          </circle>
        </svg>

        {/* Nodes (positioned with %, mirrors SVG viewBox geometry) */}
        <FlowNode Icon={Zap} sub="Trigger" label="Webhook" accent style={{ left: "50%", top: "18%" }} />
        <FlowNode Icon={Filter} sub="Process" label="Filter" style={{ left: "50%", top: "50%" }} />
        <FlowNode Icon={MessageSquare} sub="Action" label="Slack" style={{ left: "30%", top: "82%" }} />
        <FlowNode Icon={Database} sub="Action" label="Database" style={{ left: "70%", top: "82%" }} />
      </div>
    </div>
  )
}

function AppMockup() {
  return (
    <div className="relative w-full max-w-[460px] aspect-[5/4] rounded-2xl overflow-hidden border border-white/[0.08] flex"
      style={{
        background: "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
        boxShadow: `0 30px 60px -10px rgba(0,0,0,0.55), 0 0 50px ${ac(0.12)}`,
      }}>
      {/* Sidebar */}
      <div className="w-14 border-r border-white/[0.08] bg-white/[0.02] py-3 px-2 flex flex-col gap-2">
        <div className="w-7 h-7 rounded-md mb-2 flex items-center justify-center" style={{ background: ac(0.15) }}>
          <div className="w-3 h-3 rounded-sm" style={{ background: ac() }} />
        </div>
        {[true, false, false, false].map((active, i) => (
          <div key={i} className="w-full h-7 rounded-md flex items-center px-1.5"
            style={{ background: active ? ac(0.12) : "transparent" }}>
            <div className="w-3 h-3 rounded" style={{ background: active ? ac() : "rgba(255,255,255,0.18)" }} />
            <div className="ml-1 h-1 flex-1 rounded" style={{ background: active ? ac(0.7) : "rgba(255,255,255,0.12)" }} />
          </div>
        ))}
      </div>

      {/* Main */}
      <div className="flex-1 p-3 space-y-2.5">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-1">
          <div className="space-y-1">
            <div className="h-2.5 w-20 rounded bg-white/20" />
            <div className="h-1.5 w-12 rounded bg-white/10" />
          </div>
          <div className="flex gap-1.5 items-center">
            <div className="w-5 h-5 rounded-full bg-white/[0.05] border border-white/[0.08]" />
            <div className="w-5 h-5 rounded-full" style={{ background: ac(0.5), boxShadow: `0 0 8px ${ac(0.5)}` }} />
          </div>
        </div>

        {/* KPI cards */}
        <div className="grid grid-cols-3 gap-1.5">
          {[
            { label: "Ventas", value: "12.4K", accent: true },
            { label: "Usuarios", value: "+248", accent: false },
            { label: "Conv.", value: "+8%", accent: false },
          ].map((kpi, i) => (
            <div key={i} className="rounded-md border border-white/[0.06] p-2"
              style={{ background: kpi.accent ? `linear-gradient(135deg, ${ac(0.15)} 0%, transparent 80%)` : "rgba(255,255,255,0.03)" }}>
              <div className="font-mono text-[7px] tracking-wider uppercase mb-0.5"
                style={{ color: kpi.accent ? ac() : "rgba(255,255,255,0.4)" }}>{kpi.label}</div>
              <div className="font-bold text-[11px]"
                style={{ color: kpi.accent ? ac() : "rgba(255,255,255,0.85)" }}>{kpi.value}</div>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div className="rounded-md border border-white/[0.06] bg-white/[0.02] p-2">
          <div className="flex items-end gap-[3px] h-12">
            {[35, 55, 42, 68, 48, 72, 58, 85, 62, 78].map((h, i) => (
              <div key={i} className="flex-1 rounded-t-sm transition-all"
                style={{
                  height: `${h}%`,
                  background: i === 7 ? ac() : i === 9 ? ac(0.6) : "rgba(255,255,255,0.18)",
                  boxShadow: i === 7 ? `0 0 10px ${ac(0.6)}` : "none",
                }} />
            ))}
          </div>
        </div>

        {/* List rows */}
        <div className="space-y-1.5">
          {[true, false].map((active, i) => (
            <div key={i} className="flex items-center gap-2 py-1 px-1.5 rounded"
              style={{ background: active ? "rgba(255,255,255,0.03)" : "transparent" }}>
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: active ? ac() : "rgba(255,255,255,0.25)" }} />
              <div className="h-1.5 flex-1 rounded bg-white/12" />
              <div className="h-1.5 w-8 rounded bg-white/10" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ServiceMockup({ index }: { index: number }) {
  if (index === 0) return <WebMockup />
  if (index === 1) return <FlowMockup />
  return <AppMockup />
}

function ServiceCard({ service, index, total }: { service: typeof SERVICES[number]; index: number; total: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const Icon = service.icon

  useGSAP(() => {
    if (!ref.current) return
    const root = ref.current
    const inner = root.querySelector<HTMLElement>(".card-inner")
    if (!inner) return

    // NOTE: the peel-away (scale/fade as the next card covers this one) is created
    // in the parent's useGSAP, AFTER the Projects carousel pin exists. That pin sits
    // above this section and inserts a tall pin-spacer; creating the scrub trigger
    // here (on mount, before the pin) left it stuck at progress=1 → transparent card.

    // Reveal animations (play once on enter)
    const tl = gsap.timeline({
      scrollTrigger: { trigger: root, start: "top 70%", toggleActions: "play none none none" },
    })
    tl.fromTo(inner.querySelector(".card-mockup"), { opacity: 0, x: -80, scale: 0.85 }, { opacity: 1, x: 0, scale: 1, duration: 1, ease: "power3.out" })
    tl.fromTo(inner.querySelectorAll(".card-meta"), { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.06, ease: "power2.out" }, "-=0.8")
    tl.fromTo(inner.querySelector(".card-title"), { opacity: 0, y: 70 }, { opacity: 1, y: 0, duration: 0.85, ease: "power3.out" }, "-=0.6")
    tl.fromTo(inner.querySelectorAll(".card-desc"), { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, "-=0.55")
    tl.fromTo(inner.querySelectorAll(".card-bullet"), { opacity: 0, x: -18 }, { opacity: 1, x: 0, duration: 0.45, stagger: 0.06, ease: "power2.out" }, "-=0.45")
    tl.fromTo(inner.querySelectorAll(".card-chip"), { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.35, stagger: 0.04, ease: "power2.out" }, "-=0.3")
    tl.fromTo(inner.querySelector(".card-icon"), { opacity: 0, scale: 0.5, rotate: -25 }, { opacity: 1, scale: 1, rotate: 0, duration: 0.6, ease: "back.out(1.6)" }, "-=0.5")
  }, { scope: ref })

  return (
    <div
      ref={ref}
      className="service-card sticky top-0 h-screen flex items-center justify-center px-4 md:px-8 lg:px-14"
      style={{ zIndex: index + 1 }}
    >
      <div
        className="card-inner relative w-full max-w-[1300px] h-[88vh] md:h-[86vh] lg:h-[84vh] xl:h-[82vh] rounded-[28px] md:rounded-[36px] border border-white/[0.1] overflow-hidden"
        style={{
          background: `radial-gradient(120% 80% at 100% 0%, ${ac(0.18)} 0%, transparent 55%), radial-gradient(80% 60% at 0% 100%, rgba(255,255,255,0.04) 0%, transparent 60%), hsla(220, 15%, 4%, 0.35)`,
          backdropFilter: "blur(48px) saturate(160%)",
          WebkitBackdropFilter: "blur(48px) saturate(160%)",
          boxShadow: `0 40px 100px -20px rgba(0,0,0,0.6), 0 0 0 1px ${ac(0.06)} inset`,
        }}
      >
        {/* Subtle accent border on top */}
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent 0%, ${ac(0.5)} 30%, ${ac(0.5)} 70%, transparent 100%)` }} />

        {/* Decorative grid texture */}
        <div className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(${ac()} 1px, transparent 1px), linear-gradient(90deg, ${ac()} 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
            maskImage: "radial-gradient(ellipse at 50% 50%, black 30%, transparent 80%)",
          }} />

        {/* Top bar: index + subtitle + icon */}
        <div className="absolute top-6 md:top-7 xl:top-9 left-7 md:left-10 xl:left-12 right-7 md:right-10 xl:right-12 flex items-center justify-between z-20">
          <div className="card-meta flex items-center gap-3">
            <span className="font-mono text-[10px] md:text-[11px] tracking-[0.35em] text-white/35 tabular-nums">
              {String(index + 1).padStart(2, "0")}<span className="text-white/15"> / {String(total).padStart(2, "0")}</span>
            </span>
            <div className="w-10 h-px" style={{ backgroundColor: ac(0.6) }} />
            <span className="font-mono text-[10px] md:text-[11px] tracking-[0.3em] uppercase" style={{ color: ac() }}>
              {service.subtitle}
            </span>
          </div>

          <div className="card-icon w-11 h-11 md:w-12 md:h-12 xl:w-14 xl:h-14 rounded-2xl border-2 flex items-center justify-center backdrop-blur-sm"
            style={{ borderColor: ac(0.5), backgroundColor: ac(0.1), boxShadow: `0 0 30px ${ac(0.25)}` }}>
            <Icon className="w-5 h-5 xl:w-6 xl:h-6" style={{ color: ac() }} />
          </div>
        </div>

        {/* Main content grid */}
        <div className="absolute inset-0 grid grid-cols-12 gap-4 md:gap-6 xl:gap-8 px-7 md:px-10 lg:px-14 xl:px-16 pt-20 md:pt-20 xl:pt-24 pb-8 md:pb-10 xl:pb-12 [@media(min-height:980px)]:xl:pt-28 [@media(min-height:980px)]:xl:pb-14">

          {/* Mockup — fills left half, centered with equal padding */}
          <div className="card-mockup col-span-12 md:col-span-6 flex items-center justify-center">
            <ServiceMockup index={index} />
          </div>

          {/* Right content — centered in its column, mirrors mockup's framing */}
          <div className="col-span-12 md:col-span-6 flex items-center justify-center">
            <div className="w-full max-w-[480px]">
              <h3 className="card-title leading-[0.85] tracking-tight text-white mb-4 md:mb-4 xl:mb-5 [@media(min-height:980px)]:xl:mb-7"
                style={{
                  fontFamily: "var(--font-bebas)",
                  fontSize: "clamp(2.2rem, 4.6vw, 5.5rem)",
                  letterSpacing: "0.005em",
                }}>
                {service.title.toUpperCase()}
              </h3>

              {service.description && (
                <p className="card-desc text-white/70 text-sm md:text-[14px] xl:text-[1.05rem] leading-relaxed mb-5 md:mb-5 xl:mb-6 [@media(min-height:980px)]:xl:mb-9">
                  {service.description}
                </p>
              )}

              <div className="mb-5 md:mb-5 xl:mb-6 [@media(min-height:980px)]:xl:mb-9">
                <div className="card-meta flex items-center gap-3 mb-3 md:mb-3 xl:mb-4">
                  <div className="w-6 h-px" style={{ backgroundColor: ac(0.6) }} />
                  <span className="font-mono text-[9px] md:text-[10px] tracking-[0.3em] uppercase text-white/40">
                    Capacidades
                  </span>
                </div>

                <ul className="border-t border-white/[0.08]">
                  {service.bullets.map((b, j) => (
                    <li key={j} className="card-bullet group flex items-baseline gap-4 py-2 md:py-2 xl:py-2.5 [@media(min-height:980px)]:xl:py-3 border-b border-white/[0.08]">
                      <span className="font-mono text-[10px] tracking-wider tabular-nums w-5 shrink-0 transition-colors text-white/30 group-hover:text-white/70">
                        {String(j + 1).padStart(2, "0")}
                      </span>
                      <span className="text-white/75 group-hover:text-white text-[13px] md:text-[13.5px] xl:text-[15px] flex-1 transition-colors">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {service.stack.map((t) => (
                  <span key={t} className="card-chip font-mono px-2.5 py-1 md:px-3 md:py-1.5 text-[10px] tracking-wider border rounded-full text-white/70 backdrop-blur-sm transition-colors duration-300 hover:text-white"
                    style={{ borderColor: "rgba(255,255,255,0.12)", backgroundColor: "rgba(255,255,255,0.03)" }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom-right corner mark */}
        <div className="absolute bottom-5 md:bottom-6 xl:bottom-9 right-7 md:right-10 xl:right-12 flex items-center gap-2 z-20 card-meta">
          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: ac(), boxShadow: `0 0 10px ${ac()}` }} />
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/40">{service.title}</span>
        </div>
      </div>
    </div>
  )
}

function ServiceCardMobile({ service, index }: { service: typeof SERVICES[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const Icon = service.icon

  useGSAP(() => {
    if (!ref.current) return
    gsap.fromTo(ref.current, { opacity: 0, y: 30 }, {
      opacity: 1, y: 0, duration: 0.75, ease: "power3.out",
      scrollTrigger: { trigger: ref.current, start: "top 88%", toggleActions: "play none none none" },
    })
  }, { scope: ref })

  return (
    <div ref={ref}
      className="relative rounded-2xl border border-white/[0.1] overflow-hidden p-7"
      style={{
        background: `radial-gradient(120% 80% at 100% 0%, ${ac(0.16)} 0%, transparent 60%), hsla(220, 15%, 4%, 0.4)`,
        backdropFilter: "blur(36px) saturate(160%)",
        WebkitBackdropFilter: "blur(36px) saturate(160%)",
      }}
    >
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${ac(0.6)} 50%, transparent)` }} />

      <div className="relative flex items-start justify-between mb-3">
        <span className="font-mono text-[10px] tracking-[0.35em] text-white/35 tabular-nums">
          {String(index + 1).padStart(2, "0")} <span className="text-white/15">/ {String(SERVICES.length).padStart(2, "0")}</span>
        </span>
        <div className="w-11 h-11 rounded-xl border-2 flex items-center justify-center"
          style={{ borderColor: ac(0.5), backgroundColor: ac(0.1), boxShadow: `0 0 20px ${ac(0.2)}` }}>
          <Icon className="w-5 h-5" style={{ color: ac() }} />
        </div>
      </div>

      <div className="relative">
        {/* Mockup */}
        <div className="mb-5 flex justify-center">
          <ServiceMockup index={index} />
        </div>

        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-px" style={{ backgroundColor: ac() }} />
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase" style={{ color: ac() }}>
            {service.subtitle}
          </span>
        </div>

        <h3 className="leading-[0.9] tracking-tight text-white mb-4"
          style={{ fontFamily: "var(--font-bebas)", fontSize: "clamp(2.4rem, 9vw, 3.5rem)", letterSpacing: "0.015em" }}>
          {service.title.toUpperCase()}
        </h3>

        {service.description && (
          <p className="text-white/70 text-sm leading-relaxed mb-6">{service.description}</p>
        )}

        <div className="mb-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-5 h-px" style={{ backgroundColor: ac(0.6) }} />
            <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-white/40">
              Capacidades
            </span>
          </div>

          <ul className="border-t border-white/[0.08]">
            {service.bullets.map((b, j) => (
              <li key={j} className="flex items-baseline gap-4 py-2.5 border-b border-white/[0.08]">
                <span className="font-mono text-[10px] tracking-wider tabular-nums w-5 shrink-0 text-white/30">
                  {String(j + 1).padStart(2, "0")}
                </span>
                <span className="text-white/75 text-sm flex-1">{b}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {service.stack.map((t) => (
            <span key={t} className="font-mono px-3 py-1.5 text-[10px] tracking-wider border border-white/[0.12] rounded-full text-white/70 bg-white/[0.03]">
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

function ServicesPanel({ isMobile }: { isMobile: boolean }) {
  if (isMobile) {
    return (
      <div className="relative space-y-5">
        {SERVICES.map((service, i) => (
          <ServiceCardMobile key={i} service={service} index={i} />
        ))}
      </div>
    )
  }

  return (
    <div className="relative">
      {SERVICES.map((service, i) => (
        <ServiceCard key={i} service={service} index={i} total={SERVICES.length} />
      ))}
    </div>
  )
}

/* ═══ MAIN ═══ */

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const projectsRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const [activeProject, setActiveProject] = useState(0)
  const prefersReducedMotion = useReducedMotion()
  const [mounted, setMounted] = useState(false)
  const [activeNav, setActiveNav] = useState("hero")
  const [navVisible, setNavVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const mobile = window.innerWidth < 1024
    setMounted(true)
    setIsMobile(mobile)
    if (mobile) setLoading(false)
  }, [])

  useEffect(() => {
    if (!mounted) return
    const sections = document.querySelectorAll("section[data-section]")
    const obs = new IntersectionObserver((es) => { es.forEach((e) => { if (e.isIntersecting) setActiveNav(e.target.getAttribute("data-section") || "") }) }, { threshold: 0.2 })
    sections.forEach((s) => obs.observe(s)); return () => obs.disconnect()
  }, [mounted])

  useEffect(() => {
    if (!mounted) return
    const fn = () => setNavVisible(window.scrollY > window.innerHeight * 0.05)
    window.addEventListener("scroll", fn, { passive: true }); return () => window.removeEventListener("scroll", fn)
  }, [mounted])

  useGSAP(() => {
    if (!mounted) return

    // Prevent ScrollTrigger from recalculating on mobile viewport resize
    // (caused by URL bar appearing/disappearing on scroll, which shifts elements)
    ScrollTrigger.config({ ignoreMobileResize: true })

    // Pre-set hero elements to their initial (hidden) state immediately on mount.
    // This ensures they're invisible while the loader iris is closing, preventing
    // the flash of fully-visible content before GSAP animates them in.
    gsap.set(".hero-line", { y: "110%", rotateX: -20 })
    gsap.set(".hero-meta", { opacity: 0, y: 20 })
    gsap.set(".hero-cta-btn", { opacity: 0, scale: 0.9 })

    if (loading) return // Stay hidden while loader is active

    if (prefersReducedMotion) {
      // Skip animations — immediately reveal content
      gsap.set(".hero-line", { y: "0%", rotateX: 0 })
      gsap.set(".hero-meta", { opacity: 1, y: 0 })
      gsap.set(".hero-cta-btn", { opacity: 1, scale: 1 })
      return
    }

    // Hero
    const tl = gsap.timeline({ delay: 0.2 })
    tl.fromTo(".hero-line", { y: "110%", rotateX: -20 }, { y: "0%", rotateX: 0, duration: 1.2, stagger: 0.08, ease: "power4.out" })
    tl.fromTo(".hero-meta", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.06, ease: "power3.out" }, "-=0.5")
    tl.fromTo(".hero-cta-btn", { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: "back.out(1.4)" }, "-=0.3")

    if (!isMobile) {
      gsap.to(".hero-content", { yPercent: 20, opacity: 0, filter: "blur(14px)", ease: "none", scrollTrigger: { trigger: ".hero-section", start: "top top", end: "bottom top", scrub: true } })
    }

    // About reveals — on mobile use opacity-only fade (no y offset) to avoid layout shifts
    gsap.utils.toArray<HTMLElement>(".about-reveal").forEach((el, i) => {
      if (isMobile) {
        gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.6, delay: i * 0.06, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 95%", toggleActions: "play none none none" } })
      } else {
        gsap.fromTo(el, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, delay: i * 0.08, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" } })
      }
    })

    // Services intro reveals (header / statement)
    gsap.utils.toArray<HTMLElement>(".services-reveal").forEach((el, i) => {
      if (isMobile) {
        gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.6, delay: i * 0.06, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 95%", toggleActions: "play none none none" } })
      } else {
        gsap.fromTo(el, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, delay: i * 0.08, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" } })
      }
    })

    // Experience — on mobile use opacity-only fade
    gsap.utils.toArray<HTMLElement>(".exp-entry").forEach((el) => {
      if (isMobile) {
        gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.6, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 95%", toggleActions: "play none none none" } })
      } else {
        gsap.fromTo(el, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" } })
      }
    })

    // 3D Carousel projects — desktop only
    if (projectsRef.current && window.innerWidth >= 1024) {
      const count = PROJECTS.length

      // Shared function: set a card's 3D state based on its continuous offset from center
      const setCardState = (card: HTMLDivElement, offset: number) => {
        const abs = Math.abs(offset)
        // Opacity: quadratic falloff, stays high near center
        const tOp        = Math.min(abs / 2.5, 1)
        const opacity    = Math.max(0, 1 - tOp * tOp)
        const rotateY    = Math.max(-28, Math.min(28, offset * 16))
        const scale      = Math.max(0.80, 1 - abs * 0.085)
        // Brightness/saturate: always applied as a continuous function (no hard threshold → no jump)
        const tBr        = Math.min(abs / 2.0, 1)
        const brightness = Math.max(0.15, 1 - tBr * tBr * 0.85)
        const saturate   = Math.max(0.25, 1 - tBr * tBr * 0.75)
        const filter     = `brightness(${brightness.toFixed(3)}) saturate(${saturate.toFixed(3)})`
        gsap.set(card, {
          xPercent: offset * 155 - 50,
          yPercent: -50,
          rotateY,
          scale,
          opacity,
          zIndex: PROJECTS.length - Math.round(abs),
          pointerEvents: abs < 0.5 ? "auto" : "none",
          filter,
        })
      }

      // Initialize card positions
      cardRefs.current.forEach((card, i) => { if (card) setCardState(card, i) })

      ScrollTrigger.create({
        trigger: projectsRef.current,
        start: "top top",
        end: () => `+=${count * 350}vh`,
        pin: true,
        scrub: 2.5,
        onUpdate: (self) => {
          const raw = self.progress * (count - 1)
          setActiveProject(Math.min(Math.round(raw), count - 1))
          cardRefs.current.forEach((card, i) => { if (card) setCardState(card, i - raw) })
        },
      })
    }

    // Aptitudes cards peel-away — created HERE, after the Projects carousel pin
    // above this section has inserted its tall pin-spacer, so these scrub triggers
    // measure correct start/end positions. (Created inside the child cards on mount
    // they ran before the pin existed and stayed stuck at progress=1 → transparent.)
    if (!isMobile) {
      const cards = gsap.utils.toArray<HTMLElement>(".service-card", containerRef.current)
      cards.forEach((card, i) => {
        if (i >= cards.length - 1) return // last card stays solid — nothing covers it
        const inner = card.querySelector<HTMLElement>(".card-inner")
        if (!inner) return
        gsap.to(inner, {
          scale: 0.92, opacity: 0.35, filter: "blur(4px)", ease: "none",
          scrollTrigger: { trigger: card, start: "top top", end: "bottom top", scrub: 0.6 },
        })
      })
    }

    // Certs — on mobile use opacity-only fade (no x offset) to avoid layout shifts
    gsap.utils.toArray<HTMLElement>(".cert-row").forEach((el, i) => {
      if (isMobile) {
        gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.5, delay: i * 0.04, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 95%", toggleActions: "play none none none" } })
      } else {
        gsap.fromTo(el, { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6, delay: i * 0.05, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 92%", toggleActions: "play none none none" } })
      }
    })

    // Contact — on mobile use opacity-only fades
    if (isMobile) {
      gsap.fromTo(".contact-big", { opacity: 0 }, { opacity: 1, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: ".contact-section", start: "top 80%" } })
      gsap.utils.toArray<HTMLElement>(".contact-row").forEach((el, i) => {
        gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.4, delay: 0.1 + i * 0.06, ease: "power2.out", scrollTrigger: { trigger: ".contact-section", start: "top 70%" } })
      })
    } else {
      gsap.fromTo(".contact-big", { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: ".contact-section", start: "top 70%" } })
      gsap.utils.toArray<HTMLElement>(".contact-row").forEach((el, i) => {
        gsap.fromTo(el, { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, delay: 0.2 + i * 0.07, ease: "power2.out", scrollTrigger: { trigger: ".contact-section", start: "top 60%" } })
      })
    }

    // Marimba-style scroll-driven blur on large headings (desktop only).
    // Two scrubs: entry resolves blur as the element enters the viewport,
    // exit re-blurs as it leaves through the top.
    if (!isMobile) {
      gsap.utils.toArray<HTMLElement>(".scroll-blur").forEach((el) => {
        // Entry: blurred from below → clear at upper-middle
        gsap.fromTo(el,
          { filter: "blur(12px)", opacity: 0 },
          {
            filter: "blur(0px)", opacity: 1, ease: "none",
            scrollTrigger: { trigger: el, start: "top 95%", end: "top 60%", scrub: 0.5 },
          },
        )
        // Exit: clear → blurred and gone past the top
        gsap.fromTo(el,
          { filter: "blur(0px)", opacity: 1 },
          {
            filter: "blur(14px)", opacity: 0, ease: "none",
            immediateRender: false,
            scrollTrigger: { trigger: el, start: "top 30%", end: "top -20%", scrub: 0.5 },
          },
        )
      })
    }

    // The Projects carousel pins itself and inserts a tall pin-spacer above the
    // sticky Aptitudes cards. The cards' scrub-based "peel" triggers are created
    // in child components (before this pin exists), so their start/end positions
    // ignore the spacer and stay stuck at progress=1 (opacity 0.35 → transparent).
    // Recalculate every trigger now that the pin and its spacer are in the DOM.
    requestAnimationFrame(() => ScrollTrigger.refresh())
  }, { scope: containerRef, dependencies: [prefersReducedMotion, mounted, loading, isMobile] })

  const scrollTo = useCallback((id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }) }, [])

  if (!mounted) return null

  return (
    <SmoothScroll stopped={loading}>
      {loading && <div className="fixed inset-0 z-[9999] bg-[hsl(220_15%_4%)]" />}
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}

      <div ref={containerRef} className="relative">
        <WarpedGrid />
        <MagneticCursor />

        {/* ─── SIDE NAV ─── */}
        <AnimatePresence>
          {navVisible && (
            <motion.nav initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
              className="fixed left-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-3">
              {[{ id: "about", n: "01" }, { id: "projects", n: "02" }, { id: "services", n: "03" }, { id: "experience", n: "04" }, { id: "certifications", n: "05" }, { id: "contact", n: "06" }].map((item) => (
                <button key={item.id} onClick={() => scrollTo(item.id)}
                  className={`group flex items-center gap-2 transition-all duration-300 ${activeNav === item.id ? "opacity-100" : "opacity-25 hover:opacity-60"}`} aria-label={item.id}>
                  <div className={`h-[1px] transition-all duration-500 ${activeNav === item.id ? "w-8" : "w-4"}`}
                    style={{ backgroundColor: activeNav === item.id ? ac() : "rgba(255,255,255,0.3)" }} />
                  <span className="font-mono text-[10px] tracking-widest text-white/50">{item.n}</span>
                </button>
              ))}
            </motion.nav>
          )}
        </AnimatePresence>

        {/* ─── HEADER ─── */}
        <header className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-10 py-5 flex items-center justify-between transition-all duration-500 ${navVisible ? "bg-black/40 backdrop-blur-md border-b border-white/[0.04]" : ""}`}>
          <button onClick={() => scrollTo("hero")} className="magnetic font-sans font-bold text-base tracking-tight text-white" aria-label="Inicio">
            ULISES<span style={{ color: ac() }}>.</span>M
          </button>
          <nav className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {[
              { id: "about", label: "Sobre mí" },
              { id: "projects", label: "Proyectos" },
              { id: "services", label: "Aptitudes" },
              { id: "experience", label: "Experiencia" },
              { id: "certifications", label: "Certificaciones" },
              { id: "contact", label: "Contacto" },
            ].map((item) => (
              <button key={item.id} onClick={() => scrollTo(item.id)}
                className={`magnetic font-mono text-[11px] tracking-wider transition-colors duration-300 ${activeNav === item.id ? "text-white" : "text-white/40 hover:text-white/70"}`}>
                {item.label}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            {SOCIAL.map((s) => (
              <Link key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                className="magnetic text-white/30 hover:text-white transition-colors duration-300 hidden sm:block" aria-label={s.label}>
                <s.icon className="w-4 h-4" />
              </Link>
            ))}
          </div>
        </header>

        {/* ═══ HERO ═══ */}
        <section data-section="hero" className="hero-section relative min-h-screen flex items-center overflow-hidden">

          {/* Bokeh atmosférico */}
          <div className="absolute inset-0 pointer-events-none z-0">
            <div className="absolute top-[20%] left-[10%] w-[200px] h-[200px] md:w-[500px] md:h-[500px] rounded-full opacity-[0.07] blur-[80px] md:blur-[120px]" style={{ backgroundColor: ac() }} />
            <div className="absolute bottom-[15%] right-[15%] w-[150px] h-[150px] md:w-[350px] md:h-[350px] rounded-full opacity-[0.05] blur-[60px] md:blur-[100px] bg-white" />
            <div className="absolute top-[50%] left-[50%] w-[100px] h-[100px] md:w-[250px] md:h-[250px] rounded-full opacity-[0.04] blur-[50px] md:blur-[80px]" style={{ backgroundColor: ac() }} />
          </div>

          <div className="hero-content relative z-10 w-full px-6 md:px-10 lg:px-20">
            <div className="max-w-7xl mx-auto">

              {/* Label */}
              <div className="hero-meta font-mono text-[11px] tracking-[0.4em] text-white/40 uppercase mb-8 flex items-center gap-4">
                <div className="w-8 h-[1px]" style={{ backgroundColor: "hsl(165 80% 48%)" }} />
                Software Developer
              </div>

              {/* Title */}
              <h1 className="leading-[0.88] mb-12">

                {/* "CONSTRUYO" — Bebas Neue, outline/stroke, XXL */}
                <span className="block overflow-hidden">
                  <span className="hero-line block text-[clamp(5rem,15vw,13rem)]"
                    style={{
                      fontFamily: "var(--font-bebas)",
                      WebkitTextStroke: "2px rgba(255,255,255,0.65)",
                      color: "transparent",
                      letterSpacing: "0.02em",
                    }}>
                    creando
                  </span>
                </span>

                {/* "experiencias digitales." — Poppins light, limpio */}
                <span className="block overflow-hidden pb-1">
                  <span className="hero-line block text-[clamp(1.4rem,3.5vw,3.2rem)] text-white/70 leading-normal"
                    style={{ fontWeight: 500, letterSpacing: "0.05em" }}>
                    experiencias digitales<span style={{ color: ac() }}>.</span>
                  </span>
                </span>

              </h1>

              {/* Subtitle izq + botones der */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                <p className="hero-meta text-white/45 text-m leading-relaxed max-w-lg">
                  Desarrollador de Software especializado en interfaces modernas y funcionales. Foco en performance, diseño y experiencia de usuario.
                </p>
                <div className="flex gap-3 hero-meta shrink-0">
                  <button onClick={() => scrollTo("projects")}
                    className="hero-cta-btn magnetic group px-6 py-3 text-white font-semibold text-sm rounded-full hover:scale-105 transition-transform flex items-center gap-2 border border-white/20"
                    style={{ backgroundColor: "rgba(255,255,255,0.08)", boxShadow: `0 0 20px ${ac(0.15)}` }}>
                    Proyectos <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>
                  <button onClick={() => scrollTo("contact")}
                    className="hero-cta-btn magnetic px-6 py-3 border border-white/15 text-white/80 font-medium text-sm rounded-full hover:border-white/30 hover:text-white transition-all">
                    Contacto
                  </button>
                </div>
              </div>

            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hero-meta">
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-[1px] h-12 mx-auto" style={{ background: `linear-gradient(to bottom, transparent, ${ac(0.5)}, transparent)` }} />
          </div>
        </section>

        {/* ═══ ABOUT — Editorial spread + marquee wall + manifesto ═══ */}
        <section id="about" data-section="about" className="relative z-10 py-12 md:py-20 overflow-hidden">
          <div className="px-6 md:px-10 lg:px-20">
            <div className="max-w-6xl mx-auto">
              <div className="about-reveal mb-6 md:mb-10">
                <SectionHeader index="01" label="Sobre mí" />
              </div>

              {/* Bento — ubicación con globo | live + counters apilados */}
              <div className="about-reveal grid gap-5 md:gap-6 md:grid-cols-2">
                <LocationCard />
                <div className="flex flex-col gap-5 md:gap-6">
                  <LiveStatusCard />
                  <CountersCard />
                </div>
              </div>
            </div>
          </div>

          {/* Stack oculto por el momento — cambiar `false` por `true` para restaurarlo */}
          {false && (
            <div className="px-6 md:px-10 lg:px-20">
              <div className="max-w-6xl mx-auto">
                <div className="about-reveal mt-12 md:mt-16">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="font-mono text-[10px] md:text-[11px] tracking-[0.4em] text-white/40">/ STACK</span>
                    <span className="flex-1 h-px max-w-[160px]" style={{ background: `linear-gradient(90deg, ${ac(0.4)}, transparent)` }} />
                  </div>
                  <TechStack />
                </div>
              </div>
            </div>
          )}
        </section>

        {/* ═══ PROJECTS — 02 ═══ */}
        {isMobile ? (
          /* ─── Mobile: vertical cards ─── */
          <section id="projects" data-section="projects" className="relative z-10 py-16 px-6">
            <div className="max-w-lg mx-auto">
              <SectionHeader index="02" label="Proyectos" />
              <div className="space-y-16">
                {PROJECTS.map((p, i) => (
                  <div key={i}>
                    <Link href={p.demoUrl} target="_blank" rel="noopener noreferrer"
                      className="block relative rounded-2xl overflow-hidden border border-white/[0.08] mb-6"
                      style={{ aspectRatio: "16/10" }}>
                      <video autoPlay muted loop playsInline poster={p.screenshot} className="w-full h-full object-cover">
                        <source src={p.video} type="video/mp4" />
                      </video>
                      <div className="absolute inset-0 pointer-events-none"
                        style={{ background: "linear-gradient(130deg, rgba(255,255,255,0.04) 0%, transparent 40%)" }} />
                    </Link>

                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-mono text-[10px] tracking-[0.3em]" style={{ color: ac() }}>{String(i + 1).padStart(2, "0")}</span>
                      <div className="h-px w-4" style={{ backgroundColor: ac(0.3) }} />
                      <span className="font-mono text-[10px] tracking-wider text-white/50 uppercase">{p.subtitle}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">{p.title}</h3>
                    <p className="text-white/55 text-sm leading-relaxed mb-4">{p.description}</p>
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {p.technologies.map((t) => (
                        <span key={t} className="font-mono px-2.5 py-1 text-[10px] tracking-wider border border-white/[0.08] rounded text-white/35">{t}</span>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Link href={p.demoUrl} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 font-semibold text-xs rounded-full text-white/70 border border-white/20 transition-all">
                        Demo <ExternalLink className="w-3 h-3" />
                      </Link>
                      {!p.isPrivate && p.repoUrl ? (
                        <Link href={p.repoUrl} target="_blank" rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-5 py-2.5 border border-[hsl(165_80%_48%)] text-[hsl(165_80%_48%)] font-medium text-xs rounded-full transition-all">
                          Código <Code className="w-3 h-3" />
                        </Link>
                      ) : p.isPrivate ? (
                        <span className="inline-flex items-center gap-2 px-5 py-2.5 border border-white/10 text-white/30 text-xs rounded-full">
                          <Code className="w-3 h-3" /> Privado
                        </span>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ) : (
          /* ─── Desktop: horizontal 3D carousel ─── */
          <section id="projects" data-section="projects" ref={projectsRef} className="relative z-10 h-screen overflow-hidden">

            {/* Horizontal carousel — anchor at 65% from left, slides behind info panel */}
            <div className="absolute top-1/2 -translate-y-1/2" style={{ left: "63%", perspective: "1400px" }}>
              {PROJECTS.map((p, i) => {
                const isActive = i === activeProject
                return (
                  <div
                    key={i}
                    ref={(el) => { cardRefs.current[i] = el }}
                    className="absolute top-1/2"
                    style={{
                      width: "min(52vw, 680px)",
                      left: "50%",
                    }}
                  >
                    <Link href={p.demoUrl} target="_blank" rel="noopener noreferrer"
                      className="magnetic block relative w-full group/proj select-none">

                      <div style={{ padding: "0 8%" }}>
                        <div style={{
                          position: "relative",
                          width: "100%",
                          aspectRatio: "63/39",
                          borderRadius: "14px",
                          background: "#0d0d0d",
                          boxShadow: `inset 0 0 0 2px #c8cacb, inset 0 0 0 13px #0d0d0d, ${isActive ? "0 28px 65px rgba(0,0,0,0.85)" : "0 10px 30px rgba(0,0,0,0.5)"}`,
                          padding: "2% 2% 4.2%",
                          display: "flex",
                          alignItems: "stretch",
                        }}>
                          <div style={{
                            position: "absolute",
                            top: "2%", left: "50%",
                            transform: "translateX(-50%)",
                            width: "16%", height: "3.2%",
                            borderRadius: "0 0 6px 6px",
                            background: "#0d0d0d",
                            zIndex: 20,
                          }} />

                          <div style={{ position: "relative", width: "100%", borderRadius: "4px", overflow: "hidden", background: "#000" }}>
                            <video
                              autoPlay={isActive} muted loop playsInline poster={p.screenshot}
                              preload={isActive ? "auto" : "none"}
                              className="w-full h-full object-cover"
                              ref={(el) => { if (el) { isActive ? el.play().catch(() => {}) : el.pause() } }}
                            >
                              <source src={p.video} type="video/mp4" />
                            </video>

                            <div style={{
                              position: "absolute", inset: 0, pointerEvents: "none",
                              background: "linear-gradient(130deg, rgba(255,255,255,0.05) 0%, transparent 40%)",
                            }} />

                            {isActive && (
                              <div className="absolute inset-0 bg-black/0 group-hover/proj:bg-black/30 transition-colors duration-500 flex items-center justify-center" style={{ zIndex: 10 }}>
                                <span className="opacity-0 group-hover/proj:opacity-100 transition-opacity duration-500 text-white text-xs font-mono tracking-widest uppercase flex items-center gap-2">
                                  Ver proyecto <ExternalLink className="w-3.5 h-3.5" />
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div style={{
                        position: "relative",
                        zIndex: 10,
                        width: "100%",
                        marginTop: "-1.2%",
                        height: "26px",
                        borderRadius: "0 0 10px 10px",
                        border: "1px solid #a0a3a7",
                        borderTop: "none",
                        background: "radial-gradient(ellipse at center, #e8e8ea 60%, #b0b2b4 100%)",
                      }} />
                    </Link>
                  </div>
                )
              })}
            </div>

            {/* Left info panel */}
            <div className="absolute left-0 top-0 h-full w-[46%] z-20 hidden lg:flex flex-col justify-center pl-44 xl:pl-52 pr-12"
              style={{
                background: "linear-gradient(to right, rgba(4,6,10,0.96) 40%, rgba(4,6,10,0.65) 70%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
                maskImage: "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
              }}>

              <div className="absolute top-32 flex items-center gap-3">
                <span className="font-mono text-[11px] tracking-[0.3em]" style={{ color: ac() }}>04</span>
                <div className="h-[1px] w-12 bg-white/[0.18]" />
                <span className="font-mono text-xl md:text-2xl tracking-[0.25em] text-white/50 uppercase">Proyectos</span>
              </div>

              <div className="relative z-10 mt-14">
                <div className="relative">
                  {PROJECTS.map((p, i) => (
                    <div key={i} className={`transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${i === activeProject ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6 absolute inset-0 pointer-events-none"}`}>
                      <div className="flex items-center gap-3 mb-5">
                        <span className="font-mono text-[11px] tracking-[0.3em]" style={{ color: ac() }}>
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <div className="h-px w-6" style={{ backgroundColor: ac(0.3) }} />
                        <span className="font-mono text-[11px] tracking-wider text-white/50 uppercase">{p.subtitle}</span>
                      </div>
                      <h3 className="text-3xl lg:text-4xl font-bold tracking-tight text-white mb-4 leading-tight">{p.title}</h3>
                      <p className="text-white/65 leading-relaxed text-sm mb-6 max-w-sm line-clamp-4">{p.description}</p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {p.technologies.map((t) => (
                          <span key={t} className="font-mono px-3 py-1 text-[11px] tracking-wider border border-white/[0.15] rounded text-white/60" style={{ backgroundColor: "rgba(255,255,255,0.04)" }}>{t}</span>
                        ))}
                      </div>
                      <div className="flex flex-row items-center gap-3 pt-6">
                        <Link href={p.demoUrl} target="_blank" rel="noopener noreferrer"
                          className="magnetic inline-flex items-center gap-2 px-6 py-3 font-semibold text-sm rounded-full hover:scale-105 transition-transform border border-white/20 text-white/70 bg-transparent hover:border-white/40 hover:text-white">
                          Demo <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                        {!p.isPrivate && p.repoUrl ? (
                          <Link href={p.repoUrl} target="_blank" rel="noopener noreferrer"
                            className="magnetic inline-flex items-center gap-2 px-6 py-3 border border-[hsl(165_80%_48%)] text-[hsl(165_80%_48%)] font-medium text-sm rounded-full transition-all hover:scale-105">
                            Código <Code className="w-3.5 h-3.5" />
                          </Link>
                        ) : p.isPrivate ? (
                          <span className="inline-flex items-center gap-2 px-6 py-3 border border-white/10 text-white/30 text-sm rounded-full">
                            <Code className="w-3.5 h-3.5" /> Privado
                          </span>
                        ) : null}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-12 font-mono text-sm tracking-widest">
                  <span style={{ color: ac() }}>{String(activeProject + 1).padStart(2, "0")}</span>
                  <span className="text-white/20"> / {String(PROJECTS.length).padStart(2, "0")}</span>
                </div>

                <div className="flex gap-3 mt-6">
                  {PROJECTS.map((_, i) => (
                    <button key={i} className="w-2 h-2 rounded-full transition-all duration-500"
                      style={{
                        backgroundColor: i === activeProject ? "hsl(165 80% 48%)" : "rgba(255,255,255,0.15)",
                        transform: i === activeProject ? "scale(1.4)" : "scale(1)",
                      }}
                      aria-label={`Proyecto ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="absolute bottom-8 right-6 md:right-10 font-mono text-[10px] tracking-wider text-white/20 z-30 hidden lg:block">
              SCROLL ↓
            </div>
          </section>
        )}

        {/* ═══ SERVICES — 03 (sticky-stacked deck of cards) ═══ */}
        <section id="services" data-section="services" className="relative z-10">
          {/* Intro: header + statement */}
          <div className="px-6 md:px-10 lg:px-20 pt-12 md:pt-24 pb-6 md:pb-10">
            <div className="max-w-6xl mx-auto">
              <div className="services-reveal">
                <SectionHeader index="03" label="Aptitudes" />
              </div>

              <h2 className="scroll-blur text-[clamp(1.6rem,4vw,3rem)] font-bold leading-[1.15] tracking-tight text-white max-w-4xl">
                Diseño, código y automatización bajo un mismo <span className="text-[hsl(260,15%,75%)]">criterio</span>.
              </h2>
            </div>
          </div>

          {/* Sticky-stacked cards: each pins to the top of the viewport and is covered by the next */}
          <ServicesPanel isMobile={isMobile} />
        </section>

        {/* ═══ EXPERIENCE — 04 (timeline) ═══ */}
        <section id="experience" data-section="experience" className="relative z-10 py-20 md:py-44 px-6 md:px-10 lg:px-20">
          <div className="max-w-5xl mx-auto">
            <SectionHeader index="04" label="Experiencia" />
            <div className="space-y-10">
              {EXPERIENCE.map((exp, i) => (
                <div key={i} className="exp-entry group relative flex gap-5 md:gap-8">
                  <div className="flex flex-col items-center pt-2 shrink-0">
                    <div className="w-3 h-3 rounded-full border-2 transition-colors duration-500"
                      style={{ borderColor: exp.current ? ac() : "rgba(255,255,255,0.15)", backgroundColor: exp.current ? ac(0.15) : "transparent" }} />
                    {i < EXPERIENCE.length - 1 && <div className="w-[1px] flex-1 mt-2 bg-white/[0.08]" />}
                  </div>
                  <div className="pb-14 flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <span className="font-mono text-[10px] tracking-[0.25em] uppercase" style={{ color: ac() }}>{exp.period}</span>
                      <span className="text-xs text-white/40">— {exp.company}</span>
                      {exp.current && (
                        <span className="font-mono text-[9px] tracking-wider px-2 py-0.5 rounded-full border text-white/60"
                          style={{ borderColor: ac(0.4), backgroundColor: ac(0.08) }}>ACTUAL</span>
                      )}
                    </div>
                    <h3 className="text-xl md:text-2xl font-semibold mb-3 text-white group-hover:translate-x-1 transition-transform duration-500">{exp.role}</h3>
                    <p className="text-white/55 leading-relaxed mb-4 text-sm max-w-2xl whitespace-pre-line">{exp.description}</p>
                    {exp.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {exp.technologies.map((t) => (
                          <span key={t} className="font-mono px-2.5 py-1 text-[10px] tracking-wider border border-white/[0.08] rounded text-white/35">{t}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ CERTIFICATIONS ═══ */}
        <section id="certifications" data-section="certifications" className="relative z-10 py-20 md:py-44 px-6 md:px-10 lg:px-20">
          <div className="max-w-5xl mx-auto">
            <SectionHeader index="05" label="Certificaciones" />
            <div>
              {CERTS.map((c, i) => (
                <Link key={i} href={c.url} target="_blank" rel="noopener noreferrer" className="cert-row magnetic group block">
                  <div className="h-[1px] bg-white/[0.04] group-hover:bg-white/[0.08] transition-colors duration-500" />
                  <div className="py-5 md:py-7 flex flex-col md:flex-row md:items-center justify-between gap-2 md:gap-6">
                    <h3 className="text-base md:text-lg font-medium text-white/80 group-hover:text-white transition-colors duration-300 flex-1">{c.title}</h3>
                    <div className="flex items-center gap-4 md:gap-6 shrink-0">
                      <span className="font-mono text-[10px] tracking-wider text-white/45">{c.org}</span>
                      <span className="font-mono text-[10px] tracking-wider text-white/45">{c.date}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-white/10 group-hover:text-white/60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                    </div>
                  </div>
                </Link>
              ))}
              <div className="h-[1px] bg-white/[0.04]" />
            </div>
          </div>
        </section>

        {/* ═══ CONTACT ═══ */}
        <section id="contact" data-section="contact" className="contact-section relative z-10 py-20 md:py-44 px-6 md:px-10 lg:px-20 overflow-hidden">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80vw] h-[40vh] rounded-full opacity-[0.05] blur-[160px] pointer-events-none" style={{ backgroundColor: ac() }} />
          <div className="max-w-5xl mx-auto relative z-10">
            <div className="mb-16 md:mb-20">
              <div className="contact-big">
                <SectionHeader index="06" label="Contacto" />
              </div>
              <h2 className="scroll-blur text-[clamp(2.2rem,6vw,3.3rem)] font-bold leading-[1] tracking-tight text-white">
                ¿Trabajamos<br /><span style={{ color: ac() }}>juntos</span>?
              </h2>
              <p className="contact-big text-white/35 mt-6 max-w-md text-sm leading-relaxed">
                Actualmente estoy abierto a nuevas oportunidades. No dudes en contactarme si querés trabajar conmigo.
              </p>
            </div>
            <div className="space-y-3">
              {[
                { icon: <Mail className="w-5 h-5" />, label: "Email", value: "ulisesmolinadev@gmail.com", href: "mailto:ulisesmolinadev@gmail.com" },
                { icon: <Linkedin className="w-5 h-5" />, label: "LinkedIn", value: "Ulises Molina", href: "https://www.linkedin.com/in/ulises-rafael-molina/" },
                { icon: <Github className="w-5 h-5" />, label: "GitHub", value: "Ulises-Molina", href: "https://github.com/Ulises-Molina" },
                { icon: <FileText className="w-5 h-5" />, label: "CV", value: "Descargar CV", href: "/Cv.Ulises.pdf" },
              ].map((item, i) => (
                <Link key={i} href={item.href} target="_blank" rel="noopener noreferrer"
                  className="contact-row magnetic group flex items-center gap-5 py-5 px-6 rounded-xl border border-white/[0.12] hover:border-white/[0.28] hover:bg-white/[0.02] transition-all duration-500">
                  <div className="text-white/20 group-hover:text-white/60 transition-colors duration-300">{item.icon}</div>
                  <div className="flex-1">
                    <div className="font-mono text-[9px] tracking-[0.25em] text-white/40 uppercase">{item.label}</div>
                    <div className="text-white/60 group-hover:text-white text-sm transition-colors duration-300">{item.value}</div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-white/[0.08] group-hover:text-white/50 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ─── FOOTER ─── */}
        <footer className="relative z-10 px-6 md:px-10 lg:px-20 py-8 border-t border-white/[0.12]">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-mono text-[10px] text-white/40 tracking-wider">&copy; {new Date().getFullYear()} ULISES MOLINA</p>
            <div className="flex gap-6">
              {SOCIAL.map((s) => (
                <Link key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  className="font-mono text-[10px] tracking-wider text-white/40 hover:text-white/80 transition-colors duration-300" aria-label={s.label}>{s.label}</Link>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </SmoothScroll>
  )
}

function SectionHeader({ index, label }: { index: string; label: string }) {
  return (
    <div className="flex items-center gap-4 mb-16 md:mb-20">
      <span className="font-mono text-[11px] tracking-[0.3em]" style={{ color: ac() }}>{index}</span>
      <div className="h-[1px] flex-1 bg-white/[0.18]" />
      <span className="font-mono text-xl md:text-2xl tracking-[0.25em] text-white/50 uppercase">{label}</span>
    </div>
  )
}
