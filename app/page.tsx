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

/* ═══════════════════════════════════════════
   ACCENT COLOR — single source of truth
   ═══════════════════════════════════════════ */
const ACCENT = "165, 80%, 48%"
const ac = (alpha = 1) => `hsl(${ACCENT} / ${alpha})`

/* ═══════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════ */

const SOCIAL_LINKS = [
  { href: "https://github.com/Ulises-Molina", icon: Github, label: "GH" },
  { href: "https://www.linkedin.com/in/ulises-rafael-molina/", icon: Linkedin, label: "LI" },
  { href: "mailto:ulisesmolinadev@gmail.com", icon: Mail, label: "EM" },
]

const TECH_STACK = [
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
    role: "Frontend Developer",
    company: "Qualita",
    period: "MAR 2025 — PRESENTE",
    current: true,
    description:
      "Desarrollo, configuración y mantenimiento de sitios web y plataformas E-Commerce. Diseño y optimización UX/UI, Responsive Design, automatización de procesos y colaboración con equipo de diseño gráfico.",
    technologies: ["Wordpress", "Elementor", "Shopify", "ClickUp", "Zapier", "HTML5", "CSS3", "JavaScript"],
  },
  {
    role: "Pasante Web Developer",
    company: "Qualita",
    period: "FEB 2025 — MAR 2025",
    current: false,
    description:
      "Desarrollo de sitios web con enfoque en interfaces responsivas, accesibles y alineadas con los objetivos del negocio. Colaboración con equipos de diseño y marketing.",
    technologies: ["Wordpress", "Elementor", "Shopify", "ClickUp"],
  },
  {
    role: "Encargado de local",
    company: "Great Burgers",
    period: "2023 — 2025",
    current: false,
    description:
      "Responsable de la atención al cliente, manejo de caja, grupo de trabajo y control de inventario.",
    technologies: [],
  },
]

const PROJECTS = [
  {
    title: "Fintrack",
    subtitle: "Control financiero personal",
    description:
      "Dashboard interactivo para gestionar ingresos y gastos con análisis financiero IA, autenticación y gestión de cuentas.",
    technologies: ["React", "Supabase", "0Auth", "Vite", "TailwindCSS"],
    demoUrl: "https://fintrackgastos.vercel.app/",
    repoUrl: "https://github.com/Ulises-Molina/Fintrack",
    video: "/Fintrack.mp4",
    screenshot: "/fintrack-sh-mobile.jpeg",
    isPrivate: false,
  },
  {
    title: "Great Burgers",
    subtitle: "App de pedidos",
    description:
      "Interfaz moderna para restaurante con menú interactivo, carrito de compras y panel de administración.",
    technologies: ["NextJS", "TypeScript", "TailwindCSS", "Supabase"],
    demoUrl: "https://great-burgers.vercel.app/",
    repoUrl: "https://github.com/Ulises-Molina/Market-Crypto",
    video: "/great.mp4",
    screenshot: "/great-sh-mobile.jpeg",
    isPrivate: true,
  },
  {
    title: "Crypto Market",
    subtitle: "Precios cripto real-time",
    description:
      "Visualización de precios de criptomonedas en tiempo real con gráfico interactivo y noticias.",
    technologies: ["React", "TypeScript", "TailwindCSS", "Chart.js", "NewsAPI"],
    demoUrl: "https://marketcrypto-psi.vercel.app/",
    repoUrl: "https://github.com/Ulises-Molina/Market-Crypto",
    video: "/marketcrypto.mp4",
    screenshot: "/crypto-sh-mobile.jpeg",
    isPrivate: false,
  },
  {
    title: "NextJS E-Commerce",
    subtitle: "Tienda online full-stack",
    description:
      "E-commerce con exploración de productos, carrito de compras y sistema de autenticación.",
    technologies: ["NextJS", "TypeScript", "TailwindCSS", "PostgreSQL", "NextAuth"],
    demoUrl: "https://next-js-eccomerce-nine.vercel.app/",
    repoUrl: "https://github.com/Ulises-Molina/NextJS-Eccomerce",
    video: "/nextjs.mp4",
    screenshot: "/next-sh-mobile.jpeg",
    isPrivate: false,
  },
]

const CERTIFICATIONS = [
  { title: "JavaScript Algorithms & Data Structures", org: "freeCodeCamp", date: "02.2025", url: "https://www.freecodecamp.org/certification/Ulises-Molina/javascript-algorithms-and-data-structures-v8" },
  { title: "Curso avanzado de React JS", org: "GCBA", date: "06.2025", url: "https://www.linkedin.com/in/ulises-rafael-molina/overlay/1752792565172/single-media-viewer/?profileId=ACoAAEMW2M4BXEIU9aAorWjDk3HB4Cl0NRGjZy8" },
  { title: "Curso avanzado de Node JS", org: "GCBA", date: "12.2025", url: "https://www.linkedin.com/in/ulises-rafael-molina/overlay/1766005199800/single-media-viewer/?profileId=ACoAAEMW2M4BXEIU9aAorWjDk3HB4Cl0NRGjZy8" },
  { title: "Responsive Web Design", org: "freeCodeCamp", date: "01.2025", url: "https://www.freecodecamp.org/certification/Ulises-Molina/responsive-web-design" },
  { title: "English Certificate B2 — Upper Intermediate", org: "EF SET", date: "02.2025", url: "https://cert.efset.org/es/7WVPUE" },
]

/* ═══════════════════════════════════════════
   MAGNETIC CURSOR
   ═══════════════════════════════════════════ */

function MagneticCursor() {
  const outerRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const [hovering, setHovering] = useState(false)
  const pos = useRef({ x: -100, y: -100 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => { pos.current = { x: e.clientX, y: e.clientY } }
    const onOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest("a, button, [role='button'], .magnetic")) setHovering(true)
    }
    const onOut = () => setHovering(false)

    window.addEventListener("mousemove", onMove)
    document.addEventListener("mouseover", onOver)
    document.addEventListener("mouseout", onOut)

    const tick = () => {
      if (outerRef.current) gsap.set(outerRef.current, { x: pos.current.x, y: pos.current.y })
      if (dotRef.current) gsap.set(dotRef.current, { x: pos.current.x, y: pos.current.y })
      requestAnimationFrame(tick)
    }
    const raf = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener("mousemove", onMove)
      document.removeEventListener("mouseover", onOver)
      document.removeEventListener("mouseout", onOut)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div ref={outerRef} className={`custom-cursor fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 rounded-full border transition-all duration-300 ${hovering ? "w-14 h-14 border-[hsl(165,80%,48%)] bg-[hsl(165,80%,48%)]/10" : "w-8 h-8 border-white/20"}`} />
      <div ref={dotRef} className="custom-cursor fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[hsl(165,80%,48%)]" />
    </>
  )
}

/* ═══════════════════════════════════════════
   TECH MARQUEE
   ═══════════════════════════════════════════ */

function TechMarquee() {
  const items = [...TECH_STACK, ...TECH_STACK] // duplicate for seamless loop

  return (
    <div className="overflow-hidden py-10 -mx-6 md:-mx-10 lg:-mx-20">
      <div className="marquee-track flex items-center gap-10 w-max">
        {items.map((tech, i) => (
          <div key={`${tech.label}-${i}`} className="flex items-center gap-3 shrink-0 group">
            <div className="relative w-7 h-7 opacity-40 group-hover:opacity-90 transition-opacity">
              <Image src={tech.icon} alt={tech.label} fill className="object-contain" />
            </div>
            <span className="text-sm font-medium text-white/30 group-hover:text-white/80 transition-colors whitespace-nowrap">
              {tech.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════
   LAPTOP MOCKUP
   ═══════════════════════════════════════════ */

function LaptopMockup({ video, screenshot, title }: { video: string; screenshot: string; title: string }) {
  return (
    <div className="relative w-full max-w-[480px] mx-auto">
      {/* Screen bezel */}
      <div className="relative rounded-t-xl bg-[#1a1a1e] p-[6px] pt-[6px] pb-[14px] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]">
        {/* Camera notch */}
        <div className="absolute top-[5px] left-1/2 -translate-x-1/2 w-[50px] h-[6px] rounded-b-md bg-[#1a1a1e] z-20" />
        {/* Screen */}
        <div className="relative rounded-[6px] overflow-hidden aspect-[16/10] bg-black">
          <video autoPlay muted loop playsInline poster={screenshot} className="w-full h-full object-cover">
            <source src={video} type="video/mp4" />
          </video>
        </div>
      </div>
      {/* Base */}
      <div className="relative h-[12px] mx-[-8px] rounded-b-md border border-t-0 border-[#555] bg-gradient-to-b from-[#d4d4d8] to-[#a1a1aa]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60px] h-[5px] rounded-b-md bg-[#d4d4d8] shadow-[inset_0_0_2px_1px_#999]" />
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════ */

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const [mounted, setMounted] = useState(false)
  const [activeNav, setActiveNav] = useState("hero")
  const [navVisible, setNavVisible] = useState(false)
  const [time, setTime] = useState("")

  useEffect(() => {
    setMounted(true)
    const tick = () => {
      setTime(new Date().toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit", timeZone: "America/Argentina/Buenos_Aires" }))
    }
    tick()
    const id = setInterval(tick, 60000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    if (!mounted) return
    const sections = document.querySelectorAll("section[data-section]")
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setActiveNav(e.target.getAttribute("data-section") || "") })
    }, { threshold: 0.25 })
    sections.forEach((s) => obs.observe(s))
    return () => obs.disconnect()
  }, [mounted])

  useEffect(() => {
    if (!mounted) return
    const onScroll = () => setNavVisible(window.scrollY > window.innerHeight * 0.5)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [mounted])

  // ─── GSAP ───
  useGSAP(() => {
    if (prefersReducedMotion || !mounted) return

    // Hero entrance
    const tl = gsap.timeline({ delay: 0.2 })
    tl.fromTo(".hero-line", { y: "110%", rotateX: -20 }, {
      y: "0%", rotateX: 0, duration: 1.2, stagger: 0.08, ease: "power4.out",
    })
    tl.fromTo(".hero-meta", { opacity: 0, y: 20 }, {
      opacity: 1, y: 0, duration: 0.8, stagger: 0.06, ease: "power3.out",
    }, "-=0.5")
    tl.fromTo(".hero-cta-btn", { opacity: 0, scale: 0.9 }, {
      opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: "back.out(1.4)",
    }, "-=0.3")

    // Hero dissolve
    gsap.to(".hero-content", {
      yPercent: 20, opacity: 0, ease: "none",
      scrollTrigger: { trigger: ".hero-section", start: "top top", end: "bottom top", scrub: true },
    })

    // About cards
    gsap.utils.toArray<HTMLElement>(".about-reveal").forEach((el, i) => {
      gsap.fromTo(el, { y: 60, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, delay: i * 0.1, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none reverse" },
      })
    })

    // Experience entries
    gsap.utils.toArray<HTMLElement>(".exp-entry").forEach((el) => {
      gsap.fromTo(el, { y: 50, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none reverse" },
      })
    })

    // Project blocks
    gsap.utils.toArray<HTMLElement>(".project-block").forEach((block) => {
      const mockup = block.querySelector(".project-mockup")
      const info = block.querySelector(".project-info")
      if (mockup) {
        gsap.fromTo(mockup, { y: 60, opacity: 0, scale: 0.95 }, {
          y: 0, opacity: 1, scale: 1, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: block, start: "top 80%", toggleActions: "play none none reverse" },
        })
      }
      if (info) {
        gsap.fromTo(info, { y: 40, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.8, delay: 0.15, ease: "power3.out",
          scrollTrigger: { trigger: block, start: "top 80%", toggleActions: "play none none reverse" },
        })
      }
    })

    // Certs
    gsap.utils.toArray<HTMLElement>(".cert-row").forEach((el, i) => {
      gsap.fromTo(el, { x: -40, opacity: 0 }, {
        x: 0, opacity: 1, duration: 0.6, delay: i * 0.05, ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 92%", toggleActions: "play none none reverse" },
      })
    })

    // Contact
    gsap.fromTo(".contact-big", { y: 60, opacity: 0 }, {
      y: 0, opacity: 1, duration: 1, ease: "power3.out",
      scrollTrigger: { trigger: ".contact-section", start: "top 70%" },
    })
    gsap.utils.toArray<HTMLElement>(".contact-row").forEach((el, i) => {
      gsap.fromTo(el, { y: 25, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.5, delay: 0.2 + i * 0.07, ease: "power2.out",
        scrollTrigger: { trigger: ".contact-section", start: "top 60%" },
      })
    })
  }, { scope: containerRef, dependencies: [prefersReducedMotion, mounted] })

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }, [])

  if (!mounted) return null

  return (
    <SmoothScroll>
      <div ref={containerRef} className="relative bg-[hsl(220,15%,5%)]">
        <WarpedGrid />
        <MagneticCursor />

        {/* ─── SIDE NAV ─── */}
        <AnimatePresence>
          {navVisible && (
            <motion.nav
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
              className="fixed left-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-3"
            >
              {[
                { id: "about", n: "01" }, { id: "experience", n: "02" },
                { id: "projects", n: "03" }, { id: "certifications", n: "04" }, { id: "contact", n: "05" },
              ].map((item) => (
                <button key={item.id} onClick={() => scrollTo(item.id)}
                  className={`group flex items-center gap-2 transition-all duration-300 ${activeNav === item.id ? "opacity-100" : "opacity-25 hover:opacity-60"}`}
                  aria-label={item.id}
                >
                  <div className={`h-[1px] transition-all duration-500 ${activeNav === item.id ? `w-8 bg-[${ac()}]` : "w-4 bg-white/40"}`}
                    style={activeNav === item.id ? { backgroundColor: ac() } : undefined}
                  />
                  <span className="font-mono text-[10px] tracking-widest text-white/50">{item.n}</span>
                </button>
              ))}
            </motion.nav>
          )}
        </AnimatePresence>

        {/* ─── HEADER ─── */}
        <header className="fixed top-0 left-0 right-0 z-50 px-6 md:px-10 py-5 flex items-center justify-between mix-blend-difference">
          <button onClick={() => scrollTo("hero")} className="font-sans font-bold text-base tracking-tight text-white" aria-label="Inicio">
            ULISES<span style={{ color: ac() }}>.</span>M
          </button>
          <div className="flex items-center gap-6">
            <span className="hidden md:block font-mono text-[10px] text-white/30 tracking-widest">BUE {time}</span>
            {SOCIAL_LINKS.map((s) => (
              <Link key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                className="font-mono text-[10px] tracking-widest text-white/30 hover:text-white transition-colors duration-300" aria-label={s.label}>
                {s.label}
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
                    digitales
                    <span className="inline-block w-3 h-3 md:w-4 md:h-4 rounded-full ml-2 mb-2 md:mb-4" style={{ backgroundColor: ac() }} />
                  </span>
                </span>
              </h1>

              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
                <p className="hero-meta max-w-md text-white/50 text-sm leading-relaxed">
                  Desarrollador de Software especializado en interfaces modernas y funcionales.
                  Foco en performance, diseño y experiencia de usuario.
                </p>
                <div className="flex gap-3 hero-meta">
                  <button onClick={() => scrollTo("projects")}
                    className="hero-cta-btn magnetic group px-6 py-3 text-[hsl(220,15%,5%)] font-semibold text-sm rounded-full overflow-hidden hover:scale-105 transition-transform flex items-center gap-2"
                    style={{ backgroundColor: ac() }}>
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

        {/* ═══ ABOUT — conciso + marquee ═══ */}
        <section id="about" data-section="about" className="relative z-10 py-32 md:py-44 px-6 md:px-10 lg:px-20">
          <div className="max-w-6xl mx-auto">
            <SectionHeader index="01" label="Sobre mí" />

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {/* Bio */}
              <div className="about-reveal p-8 md:p-10 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.12] transition-colors duration-500">
                <h2 className="text-2xl md:text-3xl font-bold leading-tight mb-5 text-white">
                  Soy <span style={{ color: ac() }}>Ulises Molina</span>, desarrollador enfocado en crear interfaces que conectan.
                </h2>
                <p className="text-white/50 leading-relaxed">
                  Transformo ideas en sitios rápidos, estéticos y orientados a resultados. Me involucro desde la estrategia hasta la implementación.
                </p>
              </div>

              {/* Stats */}
              <div className="about-reveal grid grid-cols-2 gap-4">
                <div className="p-8 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.12] transition-colors duration-500 flex flex-col justify-center">
                  <div className="text-[3rem] font-bold leading-none" style={{ color: ac() }}>+2</div>
                  <div className="font-mono text-[10px] tracking-[0.3em] text-white/25 uppercase mt-2">Años exp.</div>
                </div>
                <div className="p-8 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.12] transition-colors duration-500 flex flex-col justify-center">
                  <div className="text-[3rem] font-bold leading-none" style={{ color: ac() }}>+15</div>
                  <div className="font-mono text-[10px] tracking-[0.3em] text-white/25 uppercase mt-2">Proyectos</div>
                </div>
              </div>
            </div>

            {/* Tech Marquee */}
            <div className="about-reveal">
              <div className="font-mono text-[10px] tracking-[0.3em] uppercase mb-2 px-1" style={{ color: ac(0.6) }}>
                Stack tecnológico
              </div>
              <div className="rounded-2xl bg-white/[0.02] border border-white/[0.04] overflow-hidden">
                <TechMarquee />
              </div>
            </div>
          </div>
        </section>

        {/* ═══ EXPERIENCE — cards con accent sidebar ═══ */}
        <section id="experience" data-section="experience" className="relative z-10 py-32 md:py-44 px-6 md:px-10 lg:px-20">
          <div className="max-w-5xl mx-auto">
            <SectionHeader index="02" label="Experiencia" />

            <div className="space-y-5">
              {EXPERIENCE.map((exp, i) => (
                <div key={i} className="exp-entry group relative flex gap-5 md:gap-8">
                  {/* Accent sidebar */}
                  <div className="flex flex-col items-center pt-2 shrink-0">
                    <div className="w-3 h-3 rounded-full border-2 transition-colors duration-500"
                      style={{ borderColor: exp.current ? ac() : "rgba(255,255,255,0.15)", backgroundColor: exp.current ? ac(0.2) : "transparent" }} />
                    {i < EXPERIENCE.length - 1 && (
                      <div className="w-[1px] flex-1 mt-2 bg-white/[0.06]" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="pb-10 flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <span className="font-mono text-[10px] tracking-[0.25em] uppercase" style={{ color: ac() }}>
                        {exp.period}
                      </span>
                      <span className="text-xs text-white/25">— {exp.company}</span>
                      {exp.current && (
                        <span className="font-mono text-[9px] tracking-wider px-2 py-0.5 rounded-full border text-white/60"
                          style={{ borderColor: ac(0.4), backgroundColor: ac(0.08) }}>
                          ACTUAL
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl md:text-2xl font-semibold mb-3 text-white group-hover:translate-x-1 transition-transform duration-500">
                      {exp.role}
                    </h3>
                    <p className="text-white/40 leading-relaxed mb-4 text-sm max-w-2xl">{exp.description}</p>
                    {exp.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {exp.technologies.map((tech) => (
                          <span key={tech} className="font-mono px-2.5 py-1 text-[10px] tracking-wider border border-white/[0.06] rounded text-white/25">
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ PROJECTS — laptop mockups + info ═══ */}
        <section id="projects" data-section="projects" className="relative z-10 py-32 md:py-44 px-6 md:px-10 lg:px-20">
          <div className="max-w-6xl mx-auto">
            <SectionHeader index="03" label="Proyectos" />

            <div className="space-y-28 md:space-y-36">
              {PROJECTS.map((project, i) => (
                <div key={i} className={`project-block grid md:grid-cols-2 gap-10 md:gap-14 items-center ${i % 2 === 1 ? "md:[direction:rtl]" : ""}`}>
                  {/* Laptop */}
                  <div className={`project-mockup ${i % 2 === 1 ? "md:[direction:ltr]" : ""}`}>
                    <LaptopMockup video={project.video} screenshot={project.screenshot} title={project.title} />
                  </div>

                  {/* Info */}
                  <div className={`project-info space-y-4 ${i % 2 === 1 ? "md:[direction:ltr]" : ""}`}>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[10px] tracking-[0.3em] uppercase" style={{ color: ac() }}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-mono text-[10px] tracking-wider text-white/20 uppercase">{project.subtitle}</span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white">{project.title}</h3>
                    <p className="text-white/40 leading-relaxed text-sm">{project.description}</p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.technologies.map((tech) => (
                        <span key={tech} className="font-mono px-2.5 py-1 text-[10px] tracking-wider border border-white/[0.06] rounded text-white/25">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-3 pt-3">
                      <Link href={project.demoUrl} target="_blank" rel="noopener noreferrer"
                        className="magnetic inline-flex items-center gap-2 px-5 py-2.5 font-semibold text-sm rounded-full text-[hsl(220,15%,5%)] hover:scale-105 transition-transform"
                        style={{ backgroundColor: ac() }}>
                        Demo <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                      {!project.isPrivate && project.repoUrl && (
                        <Link href={project.repoUrl} target="_blank" rel="noopener noreferrer"
                          className="magnetic inline-flex items-center gap-2 px-5 py-2.5 border border-white/10 text-white/60 font-medium text-sm rounded-full hover:border-white/20 hover:text-white transition-all">
                          Código <Code className="w-3.5 h-3.5" />
                        </Link>
                      )}
                      {project.isPrivate && (
                        <span className="inline-flex items-center gap-2 px-5 py-2.5 border border-white/[0.06] text-white/20 text-sm rounded-full">
                          <Code className="w-3.5 h-3.5" /> Privado
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ CERTIFICATIONS ═══ */}
        <section id="certifications" data-section="certifications" className="relative z-10 py-32 md:py-44 px-6 md:px-10 lg:px-20">
          <div className="max-w-5xl mx-auto">
            <SectionHeader index="04" label="Certificaciones" />

            <div>
              {CERTIFICATIONS.map((cert, i) => (
                <Link key={i} href={cert.url} target="_blank" rel="noopener noreferrer" className="cert-row magnetic group block">
                  <div className="h-[1px] bg-white/[0.04] group-hover:bg-white/[0.08] transition-colors duration-500" />
                  <div className="py-5 md:py-7 flex flex-col md:flex-row md:items-center justify-between gap-2 md:gap-6">
                    <h3 className="text-base md:text-lg font-medium text-white/80 group-hover:text-white transition-colors duration-300 flex-1">
                      {cert.title}
                    </h3>
                    <div className="flex items-center gap-4 md:gap-6 shrink-0">
                      <span className="font-mono text-[10px] tracking-wider text-white/20">{cert.org}</span>
                      <span className="font-mono text-[10px] tracking-wider text-white/20">{cert.date}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-white/10 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
                        style={{ color: undefined }} />
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
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80vw] h-[40vh] rounded-full opacity-[0.05] blur-[160px] pointer-events-none"
            style={{ backgroundColor: ac() }} />

          <div className="max-w-5xl mx-auto relative z-10">
            <div className="contact-big mb-16 md:mb-20">
              <div className="font-mono text-[11px] tracking-[0.3em] uppercase mb-8" style={{ color: ac() }}>05 — Contacto</div>
              <h2 className="text-[clamp(2.2rem,6vw,5rem)] font-bold leading-[1] tracking-tight text-white">
                ¿Trabajamos<br />
                <span style={{ color: ac() }}>juntos</span>?
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
                  <div className="text-white/20 group-hover:transition-colors duration-300" style={{ color: undefined }}>
                    {item.icon}
                  </div>
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
              {SOCIAL_LINKS.map((s) => (
                <Link key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  className="font-mono text-[10px] tracking-wider text-white/15 hover:text-white/60 transition-colors duration-300" aria-label={s.label}>
                  {s.label}
                </Link>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </SmoothScroll>
  )
}

/* ═══════════════════════════════════════════
   SHARED COMPONENTS
   ═══════════════════════════════════════════ */

function SectionHeader({ index, label }: { index: string; label: string }) {
  return (
    <div className="flex items-center gap-4 mb-16 md:mb-20">
      <span className="font-mono text-[11px] tracking-[0.3em]" style={{ color: ac() }}>{index}</span>
      <div className="h-[1px] flex-1 bg-white/[0.06]" />
      <span className="font-mono text-[11px] tracking-[0.3em] text-white/20 uppercase">{label}</span>
    </div>
  )
}
