"use client"

import type React from "react"
import { Fragment, useRef, useEffect, useState, useCallback } from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap"
import { ArrowUpRight, Github, Linkedin, Mail, FileText } from "lucide-react"
import Link from "next/link"
import dynamic from "next/dynamic"
import { SmoothScroll } from "@/components/smooth-scroll"
import { ProjectsBento, PROJECTS } from "@/components/projects-bento"

const WarpedGrid = dynamic(() => import("@/components/warped-grid").then((m) => m.WarpedGrid), { ssr: false })
const LoadingScreen = dynamic(() => import("@/components/loading-screen").then((m) => m.LoadingScreen), { ssr: false })

const ACCENT = "165, 80%, 48%"
const ac = (a = 1) => `hsl(${ACCENT} / ${a})`

/* ═══ DATA ═══ */

const WhatsappIcon = ({ className }: { className?: string; strokeWidth?: number }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.69.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35zM12.05 21.5h-.01a9.43 9.43 0 0 1-4.8-1.32l-.35-.2-3.57.94.95-3.48-.22-.36a9.41 9.41 0 0 1-1.44-5.02c0-5.2 4.24-9.44 9.45-9.44 2.52 0 4.89.99 6.67 2.77a9.38 9.38 0 0 1 2.76 6.68c0 5.2-4.24 9.43-9.44 9.43zm8.03-17.47A11.27 11.27 0 0 0 12.05.7C5.8.7.7 5.79.7 12.05c0 2 .52 3.95 1.52 5.67L.6 23.3l5.72-1.5a11.33 11.33 0 0 0 5.72 1.46h.01c6.25 0 11.35-5.1 11.35-11.35 0-3.03-1.18-5.88-3.32-8.02z" />
  </svg>
)

const SOCIAL = [
  { href: "https://wa.me/5491165162354", icon: WhatsappIcon, label: "WA" },
  { href: "https://github.com/Ulises-Molina", icon: Github, label: "GH" },
  { href: "https://www.linkedin.com/in/ulises-rafael-molina/", icon: Linkedin, label: "LI" },
  { href: "mailto:ulisesmolinadev@gmail.com", icon: Mail, label: "EM" },
]

const WHATSAPP_URL = "https://wa.me/5491165162354"

const SERVICES = [
  {
    title: "Desarrollo web",
    description: "Landings, sitios corporativos y e-commerce rápidos, responsive y optimizados para convertir. SEO técnico y microinteracciones incluidas.",
    tags: ["Next.js", "Wordpress", "Shopify", "Tailwind"],
  },
  {
    title: "Automatizaciones",
    description: "Integraciones a medida que conectan herramientas, eliminan tareas manuales y escalan la operatividad sin esfuerzo.",
    tags: ["n8n", "Zapier", "REST APIs", "Webhooks"],
  },
  {
    title: "Desarrollo de apps",
    description: "Web apps, dashboards y herramientas internas con interfaz moderna, autenticación robusta y backend escalable.",
    tags: ["React", "Next.js", "Supabase", "TypeScript"],
  },
  {
    title: "Tracking & analítica",
    description: "GA4, GTM y píxeles configurados desde el día uno. Cada visita, click y conversión, medible para tomar decisiones con datos.",
    tags: ["GA4", "GTM", "Meta Pixel", "Google Ads"],
  },
]

/* Proyecto que se usa como video de ejemplo para cada servicio (mismo orden que SERVICES) */
const SERVICE_EXAMPLE_TITLES = ["Surland Viajes", "SVN Designs", "Stockear", "Web Audity"]
const SERVICE_EXAMPLE = (i: number) => PROJECTS.find((p) => p.title === SERVICE_EXAMPLE_TITLES[i]) ?? PROJECTS[0]

function ServicesList() {
  const floaterRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [active, setActive] = useState<number | null>(null)
  const [openTouch, setOpenTouch] = useState<number | null>(null)
  const pos = useRef({ mx: 0, my: 0, fx: 0, fy: 0, s: 0.7 })

  // Preview flotante: sigue al cursor con inercia y una leve inclinación
  useEffect(() => {
    if (active === null) return
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    let raf = 0
    const loop = () => {
      const p = pos.current, k = reduce ? 1 : 0.13
      p.fx += (p.mx - p.fx) * k
      p.fy += (p.my - p.fy) * k
      p.s += (1 - p.s) * 0.12
      const tilt = reduce ? 0 : Math.max(-7, Math.min(7, (p.mx - p.fx) * 0.05))
      if (floaterRef.current) floaterRef.current.style.transform = `translate(${p.fx}px, ${p.fy}px) translate(-50%, -50%) scale(${p.s}) rotate(${tilt}deg)`
      raf = requestAnimationFrame(loop)
    }
    loop()
    return () => cancelAnimationFrame(raf)
  }, [active])

  useEffect(() => {
    if (active !== null) videoRef.current?.play().catch(() => {})
    else videoRef.current?.pause()
  }, [active])

  // Posición objetivo del preview: a la derecha del cursor, o a la izquierda si no entra.
  // Siempre dentro de la ventana, con 16px de margen.
  const setTarget = (x: number, y: number) => {
    const el = floaterRef.current
    const w = el?.offsetWidth ?? 520, h = el?.offsetHeight ?? 325, gap = 32, m = 16
    const vw = window.innerWidth, vh = window.innerHeight
    let cx = x + gap + w / 2
    if (cx + w / 2 > vw - m) cx = x - gap - w / 2
    cx = Math.max(m + w / 2, Math.min(vw - m - w / 2, cx))
    const cy = Math.max(m + h / 2, Math.min(vh - m - h / 2, y))
    pos.current.mx = cx
    pos.current.my = cy
  }

  const example = active !== null ? SERVICE_EXAMPLE(active) : null

  return (
    <>
      <ul className="border-t border-white/[0.08]"
        onPointerMove={(e) => setTarget(e.clientX, e.clientY)}
        onPointerLeave={() => { setActive(null); pos.current.s = 0.7 }}>
      {SERVICES.map((s, i) => (
        <li key={s.title} className="service-row group relative border-b border-white/[0.08]"
          onPointerEnter={(e) => {
            if (e.pointerType !== "mouse") return
            setTarget(e.clientX, e.clientY)
            if (active === null) { pos.current.fx = pos.current.mx; pos.current.fy = pos.current.my }
            setActive(i)
          }}>
          {/* Barrido de acento al hover */}
          <span aria-hidden="true"
            className={`pointer-events-none absolute inset-0 origin-left transition-transform duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100 group-focus-within:scale-x-100 ${openTouch === i ? "scale-x-100" : "scale-x-0"}`}
            style={{ background: `linear-gradient(90deg, ${ac(0.12)}, transparent)` }} />
          <Link href={`${WHATSAPP_URL}?text=${encodeURIComponent(`¡Hola Ulises! Me interesa el servicio de ${s.title.toLowerCase()}.`)}`}
            target="_blank" rel="noopener noreferrer"
            onClick={(e) => {
              // En touch: el primer toque abre el video, el segundo va a WhatsApp
              if (!window.matchMedia("(hover: none)").matches || openTouch === i) return
              e.preventDefault()
              setOpenTouch(i)
            }}
            className="relative flex flex-wrap items-start gap-x-4 gap-y-5 sm:gap-8 py-6 md:py-9 lg:px-6">
            <span className="sr-in font-mono pt-2 text-xs" style={{ color: ac() }}>{String(i + 1).padStart(2, "0")}</span>
            <div className="sr-in min-w-0 flex-1 lg:grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.3fr)] lg:gap-10">
              <h3 className={`text-xl sm:text-2xl md:text-[1.7rem] font-medium tracking-tight transition-[transform,color] duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-2 ${active !== null && active !== i ? "text-white/35" : "text-white"}`}>
                {s.title}
              </h3>
              <div>
                <p className="mt-3 lg:mt-1 max-w-xl text-sm md:text-[15px] font-light leading-relaxed text-white/55"
                  style={{ fontFamily: "var(--font-inter)" }}>
                  {s.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {s.tags.map((t) => (
                    <span key={t} className="font-mono rounded-full border border-white/[0.1] px-3 py-1 text-[10px] tracking-wider text-white/50">{t}</span>
                  ))}
                </div>
              </div>
            </div>
            <span className="service-arrow mt-1 flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full border border-white/25 text-white transition-all duration-500 group-hover:border-[hsl(165_80%_48%)] group-hover:bg-[hsl(165_80%_48%)] group-hover:text-black">
              <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:rotate-45" />
            </span>
            {/* Video inline en touch */}
            <AnimatePresence initial={false}>
              {openTouch === i && (
                <motion.div className="basis-full overflow-hidden"
                  initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
                  <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-white/[0.08]">
                    <video src={SERVICE_EXAMPLE(i).video} poster={SERVICE_EXAMPLE(i).poster} autoPlay muted loop playsInline className="h-full w-full object-cover" />
                    <span className="absolute left-2.5 bottom-2.5 font-mono text-[9.5px] tracking-[0.18em] uppercase px-2.5 py-1 rounded-full bg-black/70 border border-white/[0.16]">Ej: {SERVICE_EXAMPLE(i).title}</span>
                  </div>
                  <p className="mt-3 inline-flex items-center gap-1.5 text-xs text-white/60" style={{ fontFamily: "var(--font-inter)" }}>
                    <WhatsappIcon className="h-3.5 w-3.5" /> Tocá de nuevo para consultar por WhatsApp
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </Link>
        </li>
      ))}
      </ul>

      {/* Preview flotante (solo con mouse) */}
      <div ref={floaterRef} aria-hidden="true"
        className={`pointer-events-none fixed left-0 top-0 z-40 hidden aspect-[16/10] w-[min(420px,38vw)] overflow-hidden rounded-xl border border-white/[0.16] bg-[hsl(220_12%_10%)] transition-opacity duration-300 [@media(hover:hover)]:block ${active !== null ? "opacity-100" : "opacity-0"}`}
        style={{ boxShadow: "0 30px 80px rgba(0,0,0,.6)", willChange: "transform" }}>
        <video ref={videoRef} src={example?.video} poster={example?.poster} autoPlay muted loop playsInline className="h-full w-full object-cover" />
        {example && (
          <span className="absolute left-2.5 bottom-2.5 font-mono text-[9.5px] tracking-[0.18em] uppercase px-2.5 py-1 rounded-full bg-black/70 border border-white/[0.16] backdrop-blur">Ej: {example.title}</span>
        )}
      </div>
    </>
  )
}

const EXPERIENCE = [
  {
    role: "Full-Stack & Automation Developer", company: "Qualita Studio", period: "DIC 2025 — PRESENTE", current: true,
    description: "Automatizaciones con n8n que conectan la generación de leads con CRMs y sistemas internos.\nIntegración de APIs y herramientas externas para optimizar flujos digitales.\nDesarrollo y mantenimiento de sitios web y plataformas E-Commerce.\nAdministración de hosting, dominios y servidores.\nTracking avanzado de eventos (GTM, GA4, Google Ads, Meta Pixel).\nTrabajo con equipos de diseño y marketing bajo metodologías ágiles.",
    technologies: ["n8n", "Zapier", "APIs", "GTM", "GA4", "Google Ads", "Meta Pixel", "Wordpress", "Shopify"],
  },
  {
    role: "Web Developer", company: "Qualita Studio", period: "FEB — DIC 2025", current: false,
    description: "Desarrollo y mantenimiento de sitios web y plataformas E-Commerce.\nFront-end con HTML, CSS y JavaScript enfocado en UX y conversión.\nGestión de WordPress y Shopify: themes, plugins y nuevas funcionalidades.\nDiseño UX/UI y desarrollo responsive multi-dispositivo.\nOptimización SEO técnica y estructural.\nSoporte en campañas de Email Marketing.",
    technologies: ["HTML5", "CSS3", "JavaScript", "Wordpress", "Shopify", "SEO", "UX/UI"],
  },
]

const CERTS = [
  { title: "JavaScript Algorithms & Data Structures", org: "freeCodeCamp", date: "02.2025", url: "https://www.freecodecamp.org/certification/Ulises-Molina/javascript-algorithms-and-data-structures-v8" },
  { title: "Curso avanzado de React JS", org: "Gobierno de la Ciudad de Buenos Aires", date: "06.2025", url: "https://www.linkedin.com/in/ulises-rafael-molina/overlay/1752792565172/single-media-viewer/?profileId=ACoAAEMW2M4BXEIU9aAorWjDk3HB4Cl0NRGjZy8" },
  { title: "Curso avanzado de Node JS", org: "Gobierno de la Ciudad de Buenos Aires", date: "12.2025", url: "https://www.linkedin.com/in/ulises-rafael-molina/overlay/1766005199800/single-media-viewer/?profileId=ACoAAEMW2M4BXEIU9aAorWjDk3HB4Cl0NRGjZy8" },
  { title: "Responsive Web Design", org: "freeCodeCamp", date: "01.2025", url: "https://www.freecodecamp.org/certification/Ulises-Molina/responsive-web-design" },
  { title: "English Certificate B2 — Upper Intermediate", org: "EF SET", date: "02.2025", url: "https://cert.efset.org/es/7WVPUE" },
  { title: "Claude Code in Action", org: "Anthropic", date: "03.2026", url: "https://verify.skilljar.com/c/d45ub3kt6epf" },
]

/* ═══ CURSOR ═══ */

function MagneticCursor() {
  const outerRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const [hov, setHov] = useState(false)
  // En touch no hay cursor: no montamos nada ni corremos el loop de rAF
  const [enabled, setEnabled] = useState(false)
  useEffect(() => { setEnabled(window.matchMedia("(hover: hover) and (pointer: fine)").matches) }, [])

  const pos = useRef({ x: -100, y: -100 })

  useEffect(() => {
    if (!enabled || !outerRef.current || !dotRef.current) return

    const onM = (e: MouseEvent) => { pos.current = { x: e.clientX, y: e.clientY } }
    const onOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest("a, button, [role='button'], .magnetic")) setHov(true)
    }
    const onOut = () => setHov(false)
    window.addEventListener("mousemove", onM, { passive: true })
    document.addEventListener("mouseover", onOver)
    document.addEventListener("mouseout", onOut)

    let raf = 0
    const tick = () => {
      gsap.set(dotRef.current, { x: pos.current.x, y: pos.current.y })
      gsap.set(outerRef.current, { x: pos.current.x, y: pos.current.y })
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => { window.removeEventListener("mousemove", onM); document.removeEventListener("mouseover", onOver); document.removeEventListener("mouseout", onOut); cancelAnimationFrame(raf) }
  }, [enabled])

  if (!enabled) return null

  return (
    <>
      <div ref={outerRef} className={`custom-cursor fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 rounded-full border transition-all duration-300 ${hov ? "w-14 h-14 border-[hsl(165,80%,48%)] bg-[hsl(165,80%,48%)]/10 opacity-100" : "w-8 h-8 border-white/20 opacity-0 scale-50"}`} />
      <div ref={dotRef} className="custom-cursor fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[hsl(165,80%,48%)]" />
    </>
  )
}

/* ═══ MOBILE MENU ═══ */

const NAV_ITEMS = [
  { id: "projects", label: "Proyectos" },
  { id: "services", label: "Servicios" },
  { id: "experience", label: "Experiencia" },
  { id: "certifications", label: "Certificaciones" },
  { id: "contact", label: "Contacto" },
]

const SOCIAL_NAMES: Record<string, string> = { WA: "WhatsApp", GH: "GitHub", LI: "LinkedIn", EM: "Email" }

function MobileMenu({ open, active, onClose, onGo }: { open: boolean; active: string; onClose: () => void; onGo: (id: string) => void }) {
  // Bloquear el scroll del fondo y cerrar con Escape
  useEffect(() => {
    if (!open) return
    const html = document.documentElement
    const prev = html.style.overflow
    html.style.overflow = "hidden"
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    window.addEventListener("keydown", onKey)
    return () => { html.style.overflow = prev; window.removeEventListener("keydown", onKey) }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div id="mobile-menu" role="dialog" aria-modal="true" aria-label="Menú"
          className="fixed inset-0 z-[45] flex flex-col bg-[hsl(220_15%_4%/0.96)] backdrop-blur-xl px-6 pb-[max(2rem,env(safe-area-inset-bottom))] pt-24 md:hidden"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
          <nav className="flex flex-1 flex-col justify-center">
            {NAV_ITEMS.map((item, i) => (
              <motion.button key={item.id} type="button" onClick={() => onGo(item.id)}
                initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }}
                transition={{ duration: 0.45, delay: 0.05 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-baseline gap-4 border-b border-white/[0.08] py-4 text-left">
                <span className="font-mono text-[11px] tracking-[0.2em]" style={{ color: ac() }}>{String(i + 1).padStart(2, "0")}</span>
                <span className={`text-[clamp(1.75rem,8vw,2.5rem)] font-semibold tracking-tight ${active === item.id ? "text-white" : "text-white/60"}`}>{item.label}</span>
              </motion.button>
            ))}
          </nav>
          <motion.div className="flex items-center justify-between gap-3 pt-8"
            initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.35 } }} exit={{ opacity: 0 }}>
            {SOCIAL.map((s) => (
              <Link key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={SOCIAL_NAMES[s.label] ?? s.label}
                className="flex h-12 flex-1 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-white/80 active:bg-white/10">
                <s.icon className="h-5 w-5" strokeWidth={1.75} />
              </Link>
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ═══ MAIN ═══ */

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const [mounted, setMounted] = useState(false)
  const [activeNav, setActiveNav] = useState("hero")
  const [navVisible, setNavVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [loading, setLoading] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = useCallback(() => setMenuOpen(false), [])

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
    // GSAP ya tomó el control con estilos inline: el pre-ocultado CSS (html.js-anim) deja de hacer falta
    ;(window as unknown as { __heroReady?: boolean }).__heroReady = true

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

    /* ── Entradas de secciones ──
       Lenguaje común: líneas que se dibujan, texto que sube desde una máscara
       y bloques que se revelan con clip-path. En mobile, mismas animaciones
       con menos recorrido y sin blur (rendimiento). */
    const k = isMobile ? 0.6 : 1
    // Se reproduce una sola vez. No usamos `once: true`: si la sección ya pasó al crearse
    // (recarga scrolleada / HMR), ScrollTrigger se autodestruye en pleno constructor y
    // GSAP tira "Cannot read properties of undefined (reading 'end')".
    const once = (trigger: Element, start = "top 86%") => ({ trigger, start, toggleActions: "play none none none" })

    // Encabezados de sección: la línea se dibuja y el rótulo sube
    gsap.utils.toArray<HTMLElement>(".sec-head").forEach((el) => {
      gsap.timeline({ scrollTrigger: once(el, "top 90%") })
        .fromTo(el.querySelector(".sh-line"), { scaleX: 0 }, { scaleX: 1, duration: 1.4, ease: "expo.out" })
        .fromTo(el.querySelector(".sh-index"), { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, 0)
        .fromTo(el.querySelector(".sh-label"), { yPercent: 110 }, { yPercent: 0, duration: 1, ease: "power4.out" }, 0.15)
    })

    // Titulares palabra por palabra
    gsap.utils.toArray<HTMLElement>(".reveal-words").forEach((el) => {
      gsap.fromTo(el.querySelectorAll(".rw"), { yPercent: 115, rotate: 3 },
        { yPercent: 0, rotate: 0, duration: 1.1, stagger: 0.05, ease: "power4.out", scrollTrigger: once(el) })
    })

    // Párrafos sueltos
    gsap.utils.toArray<HTMLElement>(".reveal-fade").forEach((el) => {
      gsap.fromTo(el, { opacity: 0, y: 24 * k }, { opacity: 1, y: 0, duration: 0.9, delay: 0.2, ease: "power3.out", scrollTrigger: once(el) })
    })

    // Proyectos: cortina desde abajo, en tandas escalonadas
    const tiles = gsap.utils.toArray<HTMLElement>(".project-tile > button")
    gsap.set(tiles, { clipPath: "inset(35% 0% 0% 0% round 18px)", y: 70 * k, opacity: 0 })
    ScrollTrigger.batch(tiles, {
      start: "top 92%",
      onEnter: (batch) => gsap.to(batch, {
        clipPath: "inset(0% 0% 0% 0% round 18px)", y: 0, opacity: 1,
        duration: 1.2, stagger: 0.12, ease: "expo.out", clearProps: "clipPath,transform",
      }),
    })

    // Servicios: cada fila se "pinta" de izquierda a derecha y su contenido sube
    gsap.utils.toArray<HTMLElement>(".service-row").forEach((el, i) => {
      gsap.timeline({ delay: i * 0.1, scrollTrigger: once(el, "top 92%") })
        .fromTo(el, { clipPath: "inset(0% 100% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.1, ease: "expo.inOut", clearProps: "clipPath" })
        .fromTo(el.querySelectorAll(".sr-in"), { y: 26 * k, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.08, ease: "power3.out" }, 0.4)
    })

    // Experiencia: el punto aparece, el contenido entra y la línea crece con el scroll
    gsap.utils.toArray<HTMLElement>(".exp-entry").forEach((el) => {
      gsap.timeline({ scrollTrigger: once(el, "top 84%") })
        .fromTo(el.querySelector(".exp-dot"), { scale: 0 }, { scale: 1, duration: 0.6, ease: "back.out(2.5)" })
        .fromTo(el.querySelector(".exp-body"),
          isMobile ? { x: 24, opacity: 0 } : { x: 40, opacity: 0, filter: "blur(8px)" },
          { x: 0, opacity: 1, filter: "blur(0px)", duration: 1, ease: "power3.out", clearProps: "filter" }, 0.1)
      const line = el.querySelector(".exp-line")
      if (line) gsap.fromTo(line, { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: el, start: "top 70%", end: "bottom 55%", scrub: 0.6 } })
    })

    // Certificaciones: la línea superior se dibuja y el texto sube, en tandas
    gsap.set(".cert-line", { scaleX: 0 })
    gsap.set(".cert-body", { opacity: 0, y: 20 * k })
    ScrollTrigger.batch(".cert-row", {
      start: "top 92%",
      onEnter: (batch) => {
        const rows = batch as HTMLElement[]
        gsap.to(rows.map((r) => r.querySelector(".cert-line")), { scaleX: 1, duration: 1.2, stagger: 0.08, ease: "expo.out" })
        gsap.to(rows.map((r) => r.querySelector(".cert-body")), { opacity: 1, y: 0, duration: 0.8, stagger: 0.08, delay: 0.15, ease: "power3.out" })
      },
    })

    // Contacto: la tarjeta CTA se expande desde un recorte más chico
    gsap.utils.toArray<HTMLElement>(".cta-card").forEach((el) => {
      gsap.fromTo(el, { clipPath: "inset(10% 6% 10% 6% round 28px)", y: 40 * k },
        { clipPath: "inset(0% 0% 0% 0% round 28px)", y: 0, duration: 1.4, ease: "expo.out", clearProps: "clipPath,transform", scrollTrigger: once(el, "top 85%") })
    })

    // Contacto: filas escalonadas
    gsap.fromTo(".contact-row", { y: 30 * k, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.08, ease: "power3.out", scrollTrigger: once(document.querySelector(".contact-row") ?? document.body, "top 90%") })

    // Recalcular posiciones una vez que todo el layout está en el DOM
    requestAnimationFrame(() => ScrollTrigger.refresh())
  }, { scope: containerRef, dependencies: [prefersReducedMotion, mounted, loading, isMobile] })

  const scrollTo = useCallback((id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }) }, [])
  // Desde el menú mobile: cerrar primero (libera el bloqueo de scroll) y después scrollear
  const goFromMenu = useCallback((id: string) => {
    setMenuOpen(false)
    requestAnimationFrame(() => scrollTo(id))
  }, [scrollTo])

  // El contenido se renderiza en el servidor (HTML completo para FCP/LCP y SEO).
  // En desktop (lg+) un telón oscuro, presente ya en el HTML, tapa todo hasta que termina el loader.
  return (
    <SmoothScroll stopped={loading}>
      {loading && <div className="fixed inset-0 z-[9999] hidden lg:block bg-[hsl(220_15%_4%)]" />}
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
              {[{ id: "projects", n: "01" }, { id: "services", n: "02" }, { id: "experience", n: "03" }, { id: "certifications", n: "04" }, { id: "contact", n: "05" }].map((item) => (
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
        <MobileMenu open={menuOpen} active={activeNav} onClose={closeMenu} onGo={goFromMenu} />

        <header className={`fixed top-0 left-0 right-0 z-50 px-5 sm:px-6 md:px-10 pt-[max(1rem,env(safe-area-inset-top))] pb-4 md:py-5 flex items-center justify-between transition-all duration-500 ${navVisible && !menuOpen ? "bg-black/40 backdrop-blur-md border-b border-white/[0.04]" : "border-b border-transparent"}`}>
          <button onClick={() => { setMenuOpen(false); scrollTo("hero") }} className="magnetic font-sans font-bold text-base tracking-tight text-white py-2" aria-label="Inicio">
            ULISES<span style={{ color: ac() }}>.</span>M
          </button>
          <nav className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2 px-2 py-1.5 rounded-full border border-white/[0.06] backdrop-blur-xl backdrop-saturate-150"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 50%, rgba(255,255,255,0.04) 100%), rgba(0,0,0,0.35)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08), 0 8px 32px rgba(0,0,0,0.35)",
            }}>
            {NAV_ITEMS.map((item) => (
              <button key={item.id} onClick={() => scrollTo(item.id)}
                className={`magnetic px-2.5 lg:px-3.5 py-1.5 rounded-full text-[12px] lg:text-[13px] font-medium tracking-tight transition-colors duration-300 ${activeNav === item.id ? "text-white bg-white/10" : "text-white/75 hover:text-white hover:bg-white/[0.06]"}`}
                style={{ fontFamily: "var(--font-inter)" }}>
                {item.label}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            {SOCIAL.map((s) => (
              <Link key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                className="magnetic hidden sm:flex items-center justify-center w-9 h-9 rounded-full border border-white/15 bg-black/35 backdrop-blur-md text-white/80 hover:text-white hover:border-white/40 hover:bg-white/10 transition-all duration-300"
                aria-label={SOCIAL_NAMES[s.label] ?? s.label}>
                <s.icon className="w-[17px] h-[17px]" strokeWidth={1.75} />
              </Link>
            ))}
            {/* Hamburguesa (mobile) */}
            <button type="button" onClick={() => setMenuOpen((o) => !o)}
              aria-expanded={menuOpen} aria-controls="mobile-menu" aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
              className="md:hidden relative flex items-center justify-center w-11 h-11 -mr-1.5 rounded-full border border-white/15 bg-black/35 backdrop-blur-md text-white">
              <span className={`absolute h-[1.5px] w-[18px] bg-current transition-transform duration-300 ${menuOpen ? "rotate-45" : "-translate-y-[4px]"}`} />
              <span className={`absolute h-[1.5px] w-[18px] bg-current transition-transform duration-300 ${menuOpen ? "-rotate-45" : "translate-y-[4px]"}`} />
            </button>
          </div>
        </header>

        <main>
        {/* ═══ HERO ═══ */}
        <section id="hero" data-section="hero" aria-label="Inicio" className="hero-section relative min-h-[100svh] flex items-center overflow-hidden pt-24 pb-24 md:py-0">

          {/* Bokeh atmosférico */}
          <div className="absolute inset-0 pointer-events-none z-0">
            <div className="absolute top-[20%] left-[10%] w-[200px] h-[200px] md:w-[500px] md:h-[500px] rounded-full opacity-[0.07] blur-[80px] md:blur-[120px]" style={{ backgroundColor: ac() }} />
            <div className="absolute bottom-[15%] right-[15%] w-[150px] h-[150px] md:w-[350px] md:h-[350px] rounded-full opacity-[0.05] blur-[60px] md:blur-[100px] bg-white" />
            <div className="absolute top-[50%] left-[50%] w-[100px] h-[100px] md:w-[250px] md:h-[250px] rounded-full opacity-[0.04] blur-[50px] md:blur-[80px]" style={{ backgroundColor: ac() }} />
          </div>

          <div className="hero-content relative z-10 w-full px-6 md:px-10 lg:px-20">
            <div className="max-w-7xl mx-auto">

              {/* Label */}
              <div className="hero-meta font-mono text-[10px] sm:text-[11px] tracking-[0.3em] sm:tracking-[0.4em] text-white/40 uppercase mb-6 md:mb-8 flex items-center gap-4">
                <div className="w-8 h-[1px]" style={{ backgroundColor: "hsl(165 80% 48%)" }} />
                Software Developer
              </div>

              {/* Title */}
              <h1 className="leading-[0.88] mb-8 md:mb-12">
                {/* Texto para buscadores y lectores de pantalla: el titular visual no dice quién ni qué */}
                <span className="sr-only">Ulises Molina, desarrollador web en Buenos Aires: </span>

                {/* "CONSTRUYO" — Bebas Neue, outline/stroke, XXL */}
                <span className="block overflow-hidden">
                  <span className="hero-line block text-[clamp(4.5rem,24vw,9rem)] md:text-[clamp(5rem,15vw,13rem)] [-webkit-text-stroke:1.5px_rgba(255,255,255,0.65)] md:[-webkit-text-stroke:2px_rgba(255,255,255,0.65)]"
                    style={{
                      fontFamily: "var(--font-bebas)",
                      color: "transparent",
                      letterSpacing: "0.02em",
                    }}>
                    creando
                  </span>
                </span>

                {" "}
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
                <p className="hero-meta text-white/65 text-sm md:text-[15px] font-light leading-relaxed tracking-[-0.01em] max-w-lg"
                  style={{ fontFamily: "var(--font-inter)" }}>
                  Desarrollador web en Buenos Aires. Sitios, e-commerce, apps y automatizaciones con foco en performance, diseño y experiencia de usuario.
                </p>
                <div className="flex gap-3 hero-meta shrink-0 [&>*]:flex-1 sm:[&>*]:flex-none">
                  <Link href="https://wa.me/5491165162354" target="_blank" rel="noopener noreferrer"
                    className="hero-cta-btn magnetic group px-6 py-3.5 sm:py-3 text-white font-semibold text-sm rounded-full hover:scale-105 transition-transform flex items-center justify-center gap-2 border border-white/20"
                    style={{ backgroundColor: "rgba(255,255,255,0.08)", boxShadow: `0 0 20px ${ac(0.15)}` }}>
                    Contactame <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>
                  <button onClick={() => scrollTo("projects")}
                    className="hero-cta-btn magnetic px-6 py-3.5 sm:py-3 border border-white/15 text-white/80 font-medium text-sm rounded-full hover:border-white/30 hover:text-white transition-all">
                    Proyectos
                  </button>
                </div>
              </div>

            </div>
          </div>

          <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 hero-meta [@media(max-height:640px)]:hidden">
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-[1px] h-12 mx-auto" style={{ background: `linear-gradient(to bottom, transparent, ${ac(0.5)}, transparent)` }} />
          </div>
        </section>

        {/* ═══ PROJECTS — 01 (bento con ventana de navegador) ═══ */}
        <section id="projects" data-section="projects" className="relative z-10 px-6 md:px-10 lg:px-20 pt-12 md:pt-24 pb-16 md:pb-28">
          <div className="max-w-6xl mx-auto">
            <SectionHeader index="01" label="Proyectos" />
            <ProjectsBento />
          </div>
        </section>

        {/* ═══ SERVICES — 02 (encabezado + índice) ═══ */}
        <section id="services" data-section="services" className="relative z-10 px-6 md:px-10 lg:px-20 pt-12 md:pt-24 pb-16 md:pb-28">
          <div className="max-w-6xl mx-auto">
            <SectionHeader index="02" label="Servicios" />

            <div className="mb-10 md:mb-14 flex flex-col gap-5 md:flex-row md:items-end md:justify-between md:gap-16">
              <p className="reveal-words max-w-xl text-[clamp(1.5rem,2.6vw,2.1rem)] font-bold leading-[1.1] tracking-tight text-white">
                {words("Diseño, código y automatización bajo un mismo")} <M><span className="text-[hsl(260,15%,75%)]">criterio</span>.</M>
              </p>
              <p className="reveal-fade max-w-sm text-sm md:text-[15px] font-light leading-relaxed text-white/55"
                style={{ fontFamily: "var(--font-inter)" }}>
                Servicios que funcionan solos o combinados. Cada uno resuelve una parte distinta de tu presencia digital.
              </p>
            </div>

            <ServicesList />
          </div>
        </section>

        {/* ═══ EXPERIENCE — 03 (timeline) ═══ */}
        <section id="experience" data-section="experience" className="relative z-10 pt-12 md:pt-24 pb-6 md:pb-10 px-6 md:px-10 lg:px-20">
          <div className="max-w-5xl mx-auto">
            <SectionHeader index="03" label="Experiencia" />
            <div className="space-y-10">
              {EXPERIENCE.map((exp, i) => (
                <div key={i} className="exp-entry group relative flex gap-5 md:gap-8">
                  <div className="flex flex-col items-center pt-2 shrink-0">
                    <div className="exp-dot w-3 h-3 rounded-full border-2 transition-colors duration-500"
                      style={{ borderColor: exp.current ? ac() : "rgba(255,255,255,0.15)", backgroundColor: exp.current ? ac(0.15) : "transparent" }} />
                    {i < EXPERIENCE.length - 1 && (
                      <div className="exp-line w-[1px] flex-1 mt-2 origin-top"
                        style={{ background: `linear-gradient(to bottom, ${ac(0.5)}, rgba(255,255,255,0.08) 40%)` }} />
                    )}
                  </div>
                  <div className={`exp-body flex-1 ${i < EXPERIENCE.length - 1 ? "pb-14" : ""}`}>
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <span className="font-mono text-[10px] tracking-[0.25em] uppercase" style={{ color: ac() }}>{exp.period}</span>
                      <span className="text-xs text-white/40">— {exp.company}</span>
                      {exp.current && (
                        <span className="font-mono text-[9px] tracking-wider px-2 py-0.5 rounded-full border text-white/60"
                          style={{ borderColor: ac(0.4), backgroundColor: ac(0.08) }}>ACTUAL</span>
                      )}
                    </div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-semibold leading-snug mb-3 text-white group-hover:translate-x-1 transition-transform duration-500">{exp.role}</h3>
                    <ul className="mb-4 max-w-2xl space-y-1.5">
                      {exp.description.split("\n").map((line, li) => (
                        <li key={li} className="flex gap-2.5 text-white/55 text-sm leading-relaxed">
                          <span className="shrink-0 select-none" style={{ color: ac() }}>•</span>
                          <span>{line}</span>
                        </li>
                      ))}
                    </ul>
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
        <section id="certifications" data-section="certifications" className="relative z-10 pt-12 md:pt-24 pb-6 md:pb-10 px-6 md:px-10 lg:px-20">
          <div className="max-w-5xl mx-auto">
            <SectionHeader index="04" label="Certificaciones" />
            <div>
              {CERTS.map((c, i) => (
                <Link key={i} href={c.url} target="_blank" rel="noopener noreferrer" className="cert-row magnetic group block">
                  <div className="cert-line h-[1px] origin-left bg-white/[0.04] group-hover:bg-white/[0.08] transition-colors duration-500" />
                  <div className="cert-body py-5 md:py-7 flex flex-col md:flex-row md:items-center justify-between gap-2 md:gap-6">
                    <h3 className="text-[15px] sm:text-base md:text-lg font-medium leading-snug text-white/80 group-hover:text-white transition-colors duration-300 flex-1">{c.title}</h3>
                    <div className="flex items-center gap-4 md:gap-6 md:shrink-0">
                      <span className="min-w-0 flex-1 md:flex-none font-mono text-[10px] tracking-wider text-white/45">{c.org}</span>
                      <span className="shrink-0 font-mono text-[10px] tracking-wider text-white/45">{c.date}</span>
                      <ArrowUpRight className="shrink-0 w-3.5 h-3.5 text-white/30 md:text-white/10 group-hover:text-white/60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                    </div>
                  </div>
                </Link>
              ))}
              <div className="h-[1px] bg-white/[0.04]" />
            </div>
          </div>
        </section>

        {/* ═══ CONTACT ═══ */}
        <section id="contact" data-section="contact" className="contact-section relative z-10 pt-12 md:pt-24 pb-20 md:pb-32 px-6 md:px-10 lg:px-20">
          <div className="max-w-6xl mx-auto">
            <SectionHeader index="05" label="Contacto" />

            <div className="cta-card relative isolate overflow-hidden rounded-[22px] sm:rounded-[28px] border border-white/[0.07] px-5 py-12 sm:px-10 sm:py-16 md:px-16 md:py-28 backdrop-blur-lg md:backdrop-blur-2xl backdrop-saturate-150"
              style={{
                background: `linear-gradient(135deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.025) 45%, rgba(255,255,255,0.05) 100%), radial-gradient(90% 80% at 50% 120%, ${ac(0.22)}, transparent 60%), rgba(10,13,16,0.55)`,
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08), 0 30px 80px rgba(0,0,0,0.45)",
              }}>
              {/* Orbes de color detrás del vidrio */}
              <div aria-hidden="true" className="pointer-events-none absolute -z-20 -left-24 -top-24 h-[320px] w-[320px] rounded-full blur-[90px] opacity-50"
                style={{ backgroundColor: ac(0.55) }} />
              <div aria-hidden="true" className="pointer-events-none absolute -z-20 -right-20 bottom-[-160px] h-[360px] w-[360px] rounded-full blur-[120px] opacity-[0.14]"
                style={{ backgroundColor: "hsl(200 70% 50%)" }} />
              <div aria-hidden="true" className="pointer-events-none absolute -z-20 left-1/2 top-1/3 h-[220px] w-[420px] -translate-x-1/2 rounded-full blur-[110px] opacity-25"
                style={{ backgroundColor: "hsl(260 60% 60%)" }} />
              {/* Brillo diagonal del vidrio */}
              <div aria-hidden="true" className="pointer-events-none absolute -z-10 inset-0"
                style={{ background: "linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.06) 45%, transparent 60%)" }} />
              {/* Cuadrícula de fondo */}
              <div aria-hidden="true" className="absolute inset-0 -z-10"
                style={{
                  backgroundImage: "linear-gradient(rgba(255,255,255,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.04) 1px, transparent 1px)",
                  backgroundSize: "44px 44px",
                  maskImage: "radial-gradient(ellipse at 50% 100%, #000 20%, transparent 70%)",
                  WebkitMaskImage: "radial-gradient(ellipse at 50% 100%, #000 20%, transparent 70%)",
                }} />

              <div className="flex flex-col items-center text-center">
                {/* Disponibilidad */}
                <span className="reveal-fade inline-flex items-center gap-2.5 rounded-full border border-white/[0.12] bg-black/30 px-4 py-1.5 text-[12px] text-white/70 backdrop-blur-md"
                  style={{ fontFamily: "var(--font-inter)" }}>
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60" style={{ backgroundColor: ac() }} />
                    <span className="relative inline-flex h-2 w-2 rounded-full" style={{ backgroundColor: ac() }} />
                  </span>
                  Disponible para nuevos proyectos
                </span>

                <h3 className="reveal-words mt-7 text-[clamp(2.2rem,5.2vw,4rem)] font-bold leading-[1] tracking-[-0.03em] text-white">
                  <M>¿Trabajamos</M> <M><span style={{ color: ac() }}>juntos</span>?</M>
                </h3>

                <p className="reveal-fade mt-6 max-w-lg text-[15px] md:text-base font-light leading-relaxed text-white/60"
                  style={{ fontFamily: "var(--font-inter)" }}>
                  Contame qué tenés en mente: un sitio, un sistema o una automatización. Te respondo en el día con una propuesta concreta.
                </p>

                {/* Botones */}
                <div className="reveal-fade mt-8 sm:mt-10 flex w-full flex-col sm:w-auto sm:flex-row items-stretch sm:items-center gap-3">
                  <Link href={`${WHATSAPP_URL}?text=${encodeURIComponent("¡Hola Ulises! Vi tu portfolio y me gustaría charlar sobre un proyecto.")}`}
                    target="_blank" rel="noopener noreferrer"
                    className="group/wa relative inline-flex items-center gap-2.5 sm:gap-3 rounded-full bg-white py-2 pl-2 pr-5 sm:pr-6 text-[14px] sm:text-[15px] md:text-base font-semibold whitespace-nowrap transition-[transform,box-shadow] duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.03]"
                    style={{ color: "hsl(220 20% 8%)", boxShadow: `0 18px 50px ${ac(0.3)}, 0 0 0 1px rgba(255,255,255,0.9)` }}>
                    <span className="flex h-11 w-11 items-center justify-center rounded-full text-white" style={{ backgroundColor: "#25D366" }}>
                      <WhatsappIcon className="h-5 w-5" />
                    </span>
                    <span className="flex-1 text-center sm:flex-none">Escribime por WhatsApp</span>
                    <ArrowUpRight className="h-4 w-4 shrink-0 transition-transform duration-500 group-hover/wa:rotate-45" />
                  </Link>
                  <Link href="mailto:ulisesmolinadev@gmail.com"
                    className="inline-flex min-w-0 items-center justify-center gap-2.5 rounded-full border border-white/[0.16] bg-black/30 px-5 sm:px-6 py-[17px] text-[13px] sm:text-sm font-medium text-white/80 backdrop-blur-md transition-colors duration-300 hover:border-white/40 hover:text-white">
                    <Mail className="h-4 w-4 shrink-0" />
                    <span className="truncate">ulisesmolinadev@gmail.com</span>
                  </Link>
                </div>
              </div>

              {/* Otros canales */}
              <div className="mt-12 md:mt-20 flex flex-wrap items-center justify-center gap-x-6 sm:gap-x-8 gap-y-1 sm:gap-y-3 border-t border-white/[0.08] pt-5 sm:pt-7">
                {[
                  { icon: <Linkedin className="h-4 w-4" />, label: "LinkedIn", href: "https://www.linkedin.com/in/ulises-rafael-molina/" },
                  { icon: <Github className="h-4 w-4" />, label: "GitHub", href: "https://github.com/Ulises-Molina" },
                  { icon: <FileText className="h-4 w-4" />, label: "Descargar CV", href: "/Cv.Ulises.pdf" },
                ].map((item) => (
                  <Link key={item.label} href={item.href} target="_blank" rel="noopener noreferrer"
                    className="contact-row group inline-flex items-center gap-2 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-white/45 hover:text-white">
                    {item.icon}
                    {item.label}
                    <ArrowUpRight className="h-3 w-3 opacity-0 -translate-x-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />
                  </Link>
                ))}
                <span className="contact-row font-mono text-[11px] uppercase tracking-[0.2em] text-white/30">Buenos Aires · GMT-3</span>
              </div>
            </div>
          </div>
        </section>

        </main>

        {/* ─── FOOTER ─── */}
        <footer className="relative z-10 px-6 md:px-10 lg:px-20 pt-6 md:pt-8 pb-[max(1.5rem,env(safe-area-inset-bottom))] md:pb-8 border-t border-white/[0.12]">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2 md:gap-4">
            <p className="font-mono text-[10px] text-white/40 tracking-wider">&copy; {new Date().getFullYear()} ULISES MOLINA</p>
            <div className="flex gap-2 md:gap-6">
              {SOCIAL.map((s) => (
                <Link key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  className="px-2.5 py-3 md:p-0 font-mono text-[10px] tracking-wider text-white/40 hover:text-white/80 transition-colors duration-300" aria-label={SOCIAL_NAMES[s.label] ?? s.label}>{s.label}</Link>
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
    <div className="sec-head flex items-center gap-3 sm:gap-4 mb-10 sm:mb-16 md:mb-20">
      <span className="sh-index shrink-0 font-mono text-[11px] tracking-[0.3em]" style={{ color: ac() }}>{index}</span>
      <div className="sh-line h-[1px] min-w-6 flex-1 origin-left bg-white/[0.18]" />
      <span className="block shrink-0 overflow-hidden">
        <h2 className="sh-label block font-mono text-sm sm:text-xl md:text-2xl font-normal tracking-[0.2em] sm:tracking-[0.25em] text-white/50 uppercase">{label}</h2>
      </span>
    </div>
  )
}

/* Máscara para revelar texto palabra por palabra (ver .reveal-words en useGSAP) */
function M({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block overflow-hidden align-top pb-[0.12em] -mb-[0.12em]">
      <span className="rw inline-block">{children}</span>
    </span>
  )
}

function words(text: string) {
  return text.split(" ").map((w, i, arr) => (
    <Fragment key={i}><M>{w}</M>{i < arr.length - 1 ? " " : ""}</Fragment>
  ))
}
