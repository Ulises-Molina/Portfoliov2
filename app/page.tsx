"use client"

import type React from "react"
import { useRef, useEffect, useState, useCallback } from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap"
import { ArrowUpRight, Github, Linkedin, Mail, ExternalLink, Code, FileText } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { SmoothScroll } from "@/components/smooth-scroll"
import { WarpedGrid } from "@/components/warped-grid"
import { LoadingScreen } from "@/components/loading-screen"

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

const EXPERIENCE = [
  {
    role: "Frontend Developer", company: "Qualita Studio", period: "MAR 2025 — PRESENTE", current: true,
    description: "Desarrollo, configuración y mantenimiento de sitios web y plataformas E-Commerce. Diseño y optimización UX/UI, Responsive Design, automatización de procesos y colaboración con equipo de diseño gráfico.",
    technologies: ["Wordpress", "Elementor", "Shopify", "ClickUp", "Zapier", "HTML5", "CSS3", "JavaScript"],
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
    title: "Fintrack", subtitle: "Finanzas personales",
    description: "Dashboard interactivo con análisis financiero IA, autenticación y gestión de cuentas.",
    technologies: ["React", "Supabase", "0Auth", "Vite", "TailwindCSS"],
    demoUrl: "https://fintrackgastos.vercel.app/", repoUrl: "https://github.com/Ulises-Molina/Fintrack",
    video: "/Fintrack.mp4", screenshot: "/fintrack-sh-mobile.jpeg", isPrivate: false,
  },
  {
    title: "Great Burgers", subtitle: "App de pedidos",
    description: "Menú interactivo, carrito de compras y panel de administración.",
    technologies: ["NextJS", "TypeScript", "TailwindCSS", "Supabase"],
    demoUrl: "https://great-burgers.vercel.app/", repoUrl: "https://github.com/Ulises-Molina/Market-Crypto",
    video: "/great.mp4", screenshot: "/great-sh-mobile.jpeg", isPrivate: true,
  },
  {
    title: "Crypto Market", subtitle: "Precios real-time",
    description: "Precios de criptomonedas en tiempo real con gráfico interactivo y noticias.",
    technologies: ["React", "TypeScript", "TailwindCSS", "Chart.js", "NewsAPI"],
    demoUrl: "https://marketcrypto-psi.vercel.app/", repoUrl: "https://github.com/Ulises-Molina/Market-Crypto",
    video: "/marketcrypto.mp4", screenshot: "/crypto-sh-mobile.jpeg", isPrivate: false,
  },
  {
    title: "NextJS E-Commerce", subtitle: "Tienda full-stack",
    description: "E-commerce con exploración de productos, carrito y autenticación.",
    technologies: ["NextJS", "TypeScript", "TailwindCSS", "PostgreSQL", "NextAuth"],
    demoUrl: "https://next-js-eccomerce-nine.vercel.app/", repoUrl: "https://github.com/Ulises-Molina/NextJS-Eccomerce",
    video: "/nextjs.mp4", screenshot: "/next-sh-mobile.jpeg", isPrivate: false,
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

/* ═══ MARQUEE — dual row, full bleed ═══ */

function TechMarquee() {
  const reversed = [...TECH].reverse()

  const TechItem = ({ t, prefix }: { t: typeof TECH[number]; prefix: string }) => (
    <div className="flex items-center gap-3 shrink-0 px-5 py-3 rounded-full border border-white/[0.06] bg-white/[0.02] hover:border-white/[0.15] hover:bg-white/[0.04] transition-all duration-300 group">
      <div className="relative w-5 h-5 opacity-50 group-hover:opacity-100 transition-opacity">
        <Image src={t.icon} alt={t.label} fill className="object-contain" />
      </div>
      <span className="text-sm text-white/35 group-hover:text-white/90 transition-colors whitespace-nowrap font-medium">
        {t.label}
      </span>
    </div>
  )

  return (
    <div className="w-screen relative left-1/2 -translate-x-1/2 overflow-hidden space-y-3 py-8">
      {/* Row 1 — left: two identical sets, animation translates -50% for seamless loop */}
      <div className="marquee-track flex items-center gap-8 w-max">
        {TECH.map((t, i) => <TechItem key={`a1-${i}`} t={t} prefix="a1" />)}
        {TECH.map((t, i) => <TechItem key={`a2-${i}`} t={t} prefix="a2" />)}
      </div>
      {/* Row 2 — right (reversed): two identical sets */}
      <div className="marquee-track-reverse flex items-center gap-8 w-max">
        {reversed.map((t, i) => <TechItem key={`b1-${i}`} t={t} prefix="b1" />)}
        {reversed.map((t, i) => <TechItem key={`b2-${i}`} t={t} prefix="b2" />)}
      </div>
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
  const [time, setTime] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!loading) return
    const prevent = (e: Event) => e.preventDefault()
    window.addEventListener("wheel", prevent, { passive: false })
    window.addEventListener("touchmove", prevent, { passive: false })
    return () => {
      window.removeEventListener("wheel", prevent)
      window.removeEventListener("touchmove", prevent)
    }
  }, [loading])

  useEffect(() => {
    setMounted(true)
    const tick = () => setTime(new Date().toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit", timeZone: "America/Argentina/Buenos_Aires" }))
    tick(); const id = setInterval(tick, 60000); return () => clearInterval(id)
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

    gsap.to(".hero-content", { yPercent: 20, opacity: 0, ease: "none", scrollTrigger: { trigger: ".hero-section", start: "top top", end: "bottom top", scrub: true } })

    // About reveals
    gsap.utils.toArray<HTMLElement>(".about-reveal").forEach((el, i) => {
      gsap.fromTo(el, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, delay: i * 0.08, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none reverse" } })
    })

    // Experience
    gsap.utils.toArray<HTMLElement>(".exp-entry").forEach((el) => {
      gsap.fromTo(el, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none reverse" } })
    })

    // 3D Carousel projects
    if (projectsRef.current) {
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

    // Certs
    gsap.utils.toArray<HTMLElement>(".cert-row").forEach((el, i) => {
      gsap.fromTo(el, { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6, delay: i * 0.05, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 92%", toggleActions: "play none none reverse" } })
    })

    // Contact
    gsap.fromTo(".contact-big", { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: ".contact-section", start: "top 70%" } })
    gsap.utils.toArray<HTMLElement>(".contact-row").forEach((el, i) => {
      gsap.fromTo(el, { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, delay: 0.2 + i * 0.07, ease: "power2.out", scrollTrigger: { trigger: ".contact-section", start: "top 60%" } })
    })
  }, { scope: containerRef, dependencies: [prefersReducedMotion, mounted, loading] })

  const scrollTo = useCallback((id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }) }, [])

  if (!mounted) return null

  return (
    <SmoothScroll>
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
              {[{ id: "about", n: "01" }, { id: "experience", n: "02" }, { id: "projects", n: "03" }, { id: "certifications", n: "04" }, { id: "contact", n: "05" }].map((item) => (
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
          <nav className="hidden md:flex items-center gap-8">
            {[
              { id: "about", label: "Sobre mí" },
              { id: "experience", label: "Experiencia" },
              { id: "projects", label: "Proyectos" },
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
            <span className="hidden lg:block font-mono text-[10px] text-white/30 tracking-widest mr-10">BUE {time}</span>
            {SOCIAL.map((s) => (
              <Link key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                className="magnetic text-white/30 hover:text-white transition-colors duration-300 hidden sm:block" aria-label={s.label}>
                <s.icon className="w-4 h-4" />
              </Link>
            ))}
          </div>
        </header>

        {/* ═══ HERO ═══ */}
        <section data-section="hero" className="hero-section relative min-h-screen flex items-center">
          <div className="hero-content relative z-10 w-full px-6 md:px-10 lg:px-20">
            <div className="max-w-7xl mx-auto">
              <div className="hero-meta font-mono text-[11px] tracking-[0.4em] text-white/40 uppercase mb-8 flex items-center gap-4">
                <div className="w-8 h-[1px]" style={{ backgroundColor: ac() }} />
                Software Developer
              </div>
              <h1 className="text-[clamp(3rem,9vw,8rem)] font-bold leading-[0.92] tracking-tighter mb-10">
                <span className="block overflow-hidden"><span className="hero-line block text-white">Creando</span></span>
                <span className="block overflow-hidden"><span className="hero-line block" style={{ color: ac() }}>experiencias</span></span>
                <span className="block overflow-hidden">
                  <span className="hero-line block text-white">
                    digitales<span className="inline-block w-3 h-3 md:w-4 md:h-4 rounded-full ml-2 mb-2 md:mb-4" style={{ backgroundColor: ac() }} />
                  </span>
                </span>
              </h1>
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
                <p className="hero-meta max-w-md text-white/50 text-sm leading-relaxed">
                  Desarrollador de Software especializado en interfaces modernas y funcionales. Foco en performance, diseño y experiencia de usuario.
                </p>
                <div className="flex gap-3 hero-meta">
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

        {/* ═══ ABOUT — editorial, sin cards ═══ */}
        <section id="about" data-section="about" className="relative z-10 py-32 md:py-44 px-6 md:px-10 lg:px-20">
          <div className="max-w-6xl mx-auto">
            <SectionHeader index="01" label="Sobre mí" />

            {/* Big statement */}
            <h2 className="about-reveal text-[clamp(1.6rem,4vw,3rem)] font-bold leading-[1.15] tracking-tight text-white max-w-4xl mb-8">
              Desarrollador de software enfocado en crear
              interfaces que conectan con los usuarios.
            </h2>

            {/* Two column text */}
            <div className="about-reveal grid md:grid-cols-2 gap-x-16 gap-y-6 mb-12">
              <p className="text-white/45 leading-relaxed">
                Transformo ideas en sitios rápidos, estéticos y orientados a resultados.
                Priorizo performance, accesibilidad y experiencia clara.
              </p>
              <p className="text-white/45 leading-relaxed">
                Me involucro desde la estrategia y el diseño hasta la implementación,
                asegurando consistencia visual con foco en los objetivos.
              </p>
            </div>

            {/* Stats inline */}
            <div className="about-reveal flex gap-16 mb-16">
              <div>
                <span className="text-[2.5rem] md:text-[3rem] font-bold leading-none" style={{ color: ac() }}>+2</span>
                <span className="block font-mono text-[10px] tracking-[0.3em] text-white/50 uppercase mt-1">Años</span>
              </div>
              <div>
                <span className="text-[2.5rem] md:text-[3rem] font-bold leading-none" style={{ color: ac() }}>+15</span>
                <span className="block font-mono text-[10px] tracking-[0.3em] text-white/50 uppercase mt-1">Proyectos</span>
              </div>
            </div>

            {/* Tech Marquee — full width */}
            <div className="about-reveal">
              <div className="font-mono text-[10px] tracking-[0.3em] uppercase mb-4" style={{ color: ac(0.5) }}>
                Stack tecnológico
              </div>
              <TechMarquee />
            </div>
          </div>
        </section>

        {/* ═══ EXPERIENCE — timeline ═══ */}
        <section id="experience" data-section="experience" className="relative z-10 py-32 md:py-44 px-6 md:px-10 lg:px-20">
          <div className="max-w-5xl mx-auto">
            <SectionHeader index="02" label="Experiencia" />
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
                    <p className="text-white/55 leading-relaxed mb-4 text-sm max-w-2xl">{exp.description}</p>
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

        {/* ═══ PROJECTS — horizontal carousel, info panel left ═══ */}
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
                  {/* ── MacBook Pro mockup ── */}
                  <Link href={p.demoUrl} target="_blank" rel="noopener noreferrer"
                    className="magnetic block relative w-full group/proj select-none">

                    {/*
                      Layout: screen is 84% of card width (centered via 8% padding each side).
                      Keyboard is 100% of card width → ratio 100/84 ≈ 1.19 (same as original).
                      Nothing overflows the card div, so rotateY from GSAP applies uniformly
                      to both screen and keyboard — no broken 3D effect.
                    */}

                    {/* Screen wrapper — 8% padding each side keeps screen at 84% width */}
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
                        {/* Notch */}
                        <div style={{
                          position: "absolute",
                          top: "2%", left: "50%",
                          transform: "translateX(-50%)",
                          width: "16%", height: "3.2%",
                          borderRadius: "0 0 6px 6px",
                          background: "#0d0d0d",
                          zIndex: 20,
                        }} />

                        {/* Screen content */}
                        <div style={{ position: "relative", width: "100%", borderRadius: "4px", overflow: "hidden", background: "#000" }}>
                          <video
                            autoPlay={isActive} muted loop playsInline poster={p.screenshot}
                            className="w-full h-full object-cover"
                            ref={(el) => { if (el) { isActive ? el.play().catch(() => {}) : el.pause() } }}
                          >
                            <source src={p.video} type="video/mp4" />
                          </video>

                          {/* Glass glare */}
                          <div style={{
                            position: "absolute", inset: 0, pointerEvents: "none",
                            background: "linear-gradient(130deg, rgba(255,255,255,0.05) 0%, transparent 40%)",
                          }} />

                          {/* Hover overlay */}
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

                    {/* Keyboard base — 100% of card = ~119% of screen, no overflow */}
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

          {/* Left info panel — gradient, fades top/bottom, cards pass behind */}
          <div className="absolute left-0 top-0 h-full w-[46%] z-20 hidden lg:flex flex-col justify-center pl-44 xl:pl-52 pr-12"
            style={{
              background: "linear-gradient(to right, rgba(4,6,10,0.96) 40%, rgba(4,6,10,0.65) 70%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
              maskImage: "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
            }}>

            {/* Section header — fixed at top of panel */}
            <div className="absolute top-32 flex items-center gap-3">
              <span className="font-mono text-[11px] tracking-[0.3em]" style={{ color: ac() }}>03</span>
              <div className="h-[1px] w-12 bg-white/[0.06]" />
              <span className="font-mono text-base tracking-[0.25em] text-white/50 uppercase text-4xl">Proyectos</span>
            </div>

            {/* Project info */}
            <div className="relative z-10 mt-14">
              {/* Active project info — animated */}
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
                    <h3 className="text-4xl xl:text-5xl font-bold tracking-tight text-white mb-4 leading-tight">{p.title}</h3>
                    <p className="text-white/65 leading-relaxed text-sm mb-6 max-w-sm">{p.description}</p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {p.technologies.map((t) => (
                        <span key={t} className="font-mono px-3 py-1 text-[11px] tracking-wider border border-white/[0.15] rounded text-white/60" style={{ backgroundColor: "rgba(255,255,255,0.04)" }}>{t}</span>
                      ))}
                    </div>
                    <div className="flex flex-row items-center gap-3 pt-8">
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

              {/* Counter */}
              <div className="mt-12 font-mono text-sm tracking-widest">
                <span style={{ color: ac() }}>{String(activeProject + 1).padStart(2, "0")}</span>
                <span className="text-white/20"> / {String(PROJECTS.length).padStart(2, "0")}</span>
              </div>

              {/* Dot indicators */}
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


          {/* Mobile — info overlay at bottom */}
          <div className="lg:hidden absolute bottom-0 left-0 right-0 z-20 px-6 pb-10 pt-8"
            style={{ background: "linear-gradient(to top, rgba(4,6,10,0.97) 60%, transparent 100%)" }}>
            {PROJECTS.map((p, i) => (
              <div key={i} className={`transition-all duration-500 ${i === activeProject ? "opacity-100" : "opacity-0 absolute inset-0 pointer-events-none"}`}>
                <h3 className="text-lg font-bold text-white mb-1">{p.title}
                  <span className="ml-2 font-mono text-[10px] tracking-wider text-white/25 uppercase">{p.subtitle}</span>
                </h3>
                <p className="text-white/40 text-xs mb-3 line-clamp-2">{p.description}</p>
                <div className="flex gap-2">
                  <Link href={p.demoUrl} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 font-semibold text-xs rounded-full text-[hsl(220,15%,5%)]"
                    style={{ backgroundColor: ac() }}>
                    Demo <ExternalLink className="w-3 h-3" />
                  </Link>
                  {!p.isPrivate && p.repoUrl && (
                    <Link href={p.repoUrl} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 border border-white/10 text-white/50 text-xs rounded-full">
                      Código <Code className="w-3 h-3" />
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Scroll hint */}
          <div className="absolute bottom-8 right-6 md:right-10 font-mono text-[10px] tracking-wider text-white/20 z-30 hidden lg:block">
            SCROLL ↓
          </div>
        </section>

        {/* ═══ CERTIFICATIONS ═══ */}
        <section id="certifications" data-section="certifications" className="relative z-10 py-32 md:py-44 px-6 md:px-10 lg:px-20">
          <div className="max-w-5xl mx-auto">
            <SectionHeader index="04" label="Certificaciones" />
            <div>
              {CERTS.map((c, i) => (
                <Link key={i} href={c.url} target="_blank" rel="noopener noreferrer" className="cert-row magnetic group block">
                  <div className="h-[1px] bg-white/[0.04] group-hover:bg-white/[0.08] transition-colors duration-500" />
                  <div className="py-5 md:py-7 flex flex-col md:flex-row md:items-center justify-between gap-2 md:gap-6">
                    <h3 className="text-base md:text-lg font-medium text-white/80 group-hover:text-white transition-colors duration-300 flex-1">{c.title}</h3>
                    <div className="flex items-center gap-4 md:gap-6 shrink-0">
                      <span className="font-mono text-[10px] tracking-wider text-white/20">{c.org}</span>
                      <span className="font-mono text-[10px] tracking-wider text-white/20">{c.date}</span>
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
        <section id="contact" data-section="contact" className="contact-section relative z-10 py-32 md:py-44 px-6 md:px-10 lg:px-20 overflow-hidden">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80vw] h-[40vh] rounded-full opacity-[0.05] blur-[160px] pointer-events-none" style={{ backgroundColor: ac() }} />
          <div className="max-w-5xl mx-auto relative z-10">
            <div className="contact-big mb-16 md:mb-20">
              <div className="font-mono text-[11px] tracking-[0.3em] uppercase mb-8" style={{ color: ac() }}>05 — Contacto</div>
              <h2 className="text-[clamp(2.2rem,6vw,5rem)] font-bold leading-[1] tracking-tight text-white">
                ¿Trabajamos<br /><span style={{ color: ac() }}>juntos</span>?
              </h2>
              <p className="text-white/35 mt-6 max-w-md text-sm leading-relaxed">
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
                  className="contact-row magnetic group flex items-center gap-5 py-5 px-6 rounded-xl border border-white/[0.04] hover:border-white/[0.12] hover:bg-white/[0.02] transition-all duration-500">
                  <div className="text-white/20 group-hover:text-white/60 transition-colors duration-300">{item.icon}</div>
                  <div className="flex-1">
                    <div className="font-mono text-[9px] tracking-[0.25em] text-white/15 uppercase">{item.label}</div>
                    <div className="text-white/60 group-hover:text-white text-sm transition-colors duration-300">{item.value}</div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-white/[0.08] group-hover:text-white/50 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ─── FOOTER ─── */}
        <footer className="relative z-10 px-6 md:px-10 lg:px-20 py-8 border-t border-white/[0.04]">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-mono text-[10px] text-white/15 tracking-wider">&copy; {new Date().getFullYear()} ULISES MOLINA</p>
            <div className="flex gap-6">
              {SOCIAL.map((s) => (
                <Link key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  className="font-mono text-[10px] tracking-wider text-white/15 hover:text-white/60 transition-colors duration-300" aria-label={s.label}>{s.label}</Link>
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
      <div className="h-[1px] flex-1 bg-white/[0.06]" />
      <span className="font-mono text-base md:text-lg tracking-[0.25em] text-white/50 uppercase">{label}</span>
    </div>
  )
}
