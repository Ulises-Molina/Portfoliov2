"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowUpRight, Github, Linkedin, Twitter, Mail, ExternalLink, Menu, X, Code, ChevronRight, ChevronDown, User } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { FloatingLines } from "@/components/floating-lines"

export default function Home() {
  const [activeSection, setActiveSection] = useState("about")
  const [menuOpen, setMenuOpen] = useState(false)
  const mainRef = useRef<HTMLElement>(null)
  const [scrollY, setScrollY] = useState(0)
  const [showArrow, setShowArrow] = useState(true)
  const aboutSectionRef = useRef<HTMLDivElement>(null)

  // GSAP refs
  const heroTitleRef = useRef<HTMLHeadingElement>(null)
  const heroDescRef = useRef<HTMLParagraphElement>(null)
  const aboutTitleRef = useRef<HTMLHeadingElement>(null)
  const aboutContentRef = useRef<HTMLDivElement>(null)
  const techBadgesRef = useRef<HTMLDivElement>(null)

  // Register GSAP plugins
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
  }, [])

  const handleSectionClick = (section: string) => {
    setActiveSection(section)
    setMenuOpen(false)
    if (mainRef.current) {
      mainRef.current.scrollTo(0, 0)
    }
  }

  // Parallax effect for hero section

  useEffect(() => {
    const handleScroll = () => {
      if (mainRef.current) {
        setScrollY(mainRef.current.scrollTop)
      }
    }

    const currentMainRef = mainRef.current
    if (currentMainRef) {
      currentMainRef.addEventListener("scroll", handleScroll)
    }

    return () => {
      if (currentMainRef) {
        currentMainRef.removeEventListener("scroll", handleScroll)
      }
    }
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowArrow(entry.isIntersecting)
      },
      { threshold: 0.3 }
    )

    if (aboutSectionRef.current) {
      observer.observe(aboutSectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // GSAP Animations
  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {

      // --- ABOUT SECTION ANIMATIONS ---
      if (activeSection === "about") {
        if (heroTitleRef.current) {
          gsap.fromTo(
            heroTitleRef.current,
            { opacity: 0, y: 50, scale: 0.95 },
            { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "power3.out", delay: 0.2 }
          )
        }

        if (heroDescRef.current) {
          gsap.fromTo(
            heroDescRef.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 1, ease: "power2.out", delay: 0.5 }
          )
        }

        if (aboutTitleRef.current && mainRef.current) {
          gsap.fromTo(
            aboutTitleRef.current,
            { opacity: 0, x: -50, rotateY: -15 },
            {
              opacity: 1, x: 0, rotateY: 0, duration: 1, ease: "power3.out",
              scrollTrigger: {
                trigger: aboutTitleRef.current,
                scroller: mainRef.current,
                start: "top 80%",
                end: "top 50%",
                toggleActions: "play none none reverse"
              }
            }
          )
        }

        if (aboutContentRef.current && mainRef.current) {
          gsap.fromTo(
            aboutContentRef.current,
            { opacity: 0, y: 50, scale: 0.95 },
            {
              opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power2.out",
              scrollTrigger: {
                trigger: aboutContentRef.current,
                scroller: mainRef.current,
                start: "top 75%",
                end: "top 40%",
                toggleActions: "play none none reverse"
              }
            }
          )
        }

        if (techBadgesRef.current && mainRef.current) {
          const badges = techBadgesRef.current.querySelectorAll(".tech-badge")
          gsap.fromTo(
            badges,
            { opacity: 0, scale: 0.8, y: 20, rotateX: -15 },
            {
              opacity: 1, scale: 1, y: 0, rotateX: 0, duration: 0.6,
              stagger: { amount: 0.8, from: "start", ease: "power2.out" },
              ease: "back.out(1.7)",
              scrollTrigger: {
                trigger: techBadgesRef.current,
                scroller: mainRef.current,
                start: "top 80%",
                end: "top 50%",
                toggleActions: "play none none reverse"
              }
            }
          )

          badges.forEach((badge) => {
            badge.addEventListener("mouseenter", () => {
              gsap.to(badge, { scale: 1.1, y: -5, duration: 0.3, ease: "power2.out" })
            })
            badge.addEventListener("mouseleave", () => {
              gsap.to(badge, { scale: 1, y: 0, duration: 0.3, ease: "power2.out" })
            })
          })
        }
      }

      // --- EXPERIENCE SECTION ANIMATIONS ---
      if (activeSection === "experience" && mainRef.current) {
        gsap.from(".timeline-line", {
          scaleY: 0, transformOrigin: "top", duration: 1.5, ease: "power2.out", delay: 0.5
        })

        const items = gsap.utils.toArray(".timeline-item")
        items.forEach((item: any, i) => {
          gsap.fromTo(item,
            { opacity: 0, x: i % 2 === 0 ? -50 : 50 },
            {
              opacity: 1, x: 0, duration: 0.8, ease: "power3.out", scrollTrigger: {
                trigger: item,
                scroller: mainRef.current,
                start: "top 80%"
              }
            }
          )
        })
      }

      // --- PROJECTS SECTION ANIMATIONS ---
      if (activeSection === "projects" && mainRef.current) {
        const projects = gsap.utils.toArray(".project-card")
        gsap.fromTo(projects,
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.2, ease: "power2.out",
            scrollTrigger: {
              trigger: ".projects-container",
              scroller: mainRef.current,
              start: "top 85%"
            }
          }
        )
      }

      // --- CERTIFICATIONS SECTION ANIMATIONS ---
      if (activeSection === "certifications" && mainRef.current) {
        const certs = gsap.utils.toArray(".certification-card")
        gsap.fromTo(certs,
          { opacity: 0, y: 30, rotateX: 10 },
          {
            opacity: 1, y: 0, rotateX: 0, duration: 0.8, stagger: 0.15, ease: "back.out(1.2)",
            scrollTrigger: {
              trigger: ".certifications-container",
              scroller: mainRef.current,
              start: "top 80%"
            }
          }
        )
      }

      // --- CONTACT SECTION ANIMATIONS ---
      if (activeSection === "contact") {
        gsap.from(".contact-title", {
          opacity: 0, y: -30, duration: 1, delay: 0.2, ease: "power3.out"
        })
        gsap.from(".contact-item", {
          opacity: 0, x: -30, duration: 0.8, stagger: 0.1, delay: 0.5, ease: "power2.out"
        })
      }

    })

    return () => {
      ctx.revert()
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [activeSection])

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f0f] to-[#121212] text-white overflow-hidden">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-50 bg-gradient-to-br from-[#8a9a8c]/20 to-[#4a5a4d]/20 backdrop-blur-lg border-b border-white/10">
        <div className="container flex items-center justify-between px-6 py-4 mx-auto">
          <Link href="https://www.linkedin.com/in/ulises-rafael-molina/" target="_blank" className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-gradient-to-br from-[#8a9a8c] to-[#4a5a4d] p-0.5">
              <div className="absolute inset-0 bg-black rounded-lg overflow-hidden m-0.5">
                <Image src="/foto.jpg" alt="Profile" fill className="object-cover" />
              </div>
            </div>
            <div>
              <h1 className="text-lg font-bold bg-gradient-to-r from-[#8a9a8c] to-[#4a5a4d] text-transparent bg-clip-text">
                Ulises Molina
              </h1>
              <p className="text-xs text-white/70">Software Developer</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-1">
              {[
                { id: "about", label: "Sobre mí" },
                { id: "experience", label: "Experiencia" },
                { id: "projects", label: "Proyectos" },
                { id: "certifications", label: "Certificaciones" },
                { id: "contact", label: "Contacto" },
              ].map((section) => (
                <li key={section.id}>
                  <button
                    onClick={() => handleSectionClick(section.id)}
                    className={cn(
                      "px-4 py-2 rounded-lg transition-all",
                      activeSection === section.id
                        ? "bg-gradient-to-r from-[#8a9a8c]/20 to-[#4a5a4d]/20 text-white font-medium"
                        : "text-white/60 hover:text-white hover:bg-white/5",
                    )}
                  >
                    {section.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social Links - Desktop */}
          <div className="hidden space-x-2 md:flex">
            <SocialLink href="https://github.com/Ulises-Molina" icon={<Github className="w-4 h-4" />} label="GitHub" />
            <SocialLink href="https://www.linkedin.com/in/ulises-rafael-molina/" icon={<Linkedin className="w-4 h-4" />} label="LinkedIn" />
            <SocialLink href="mailto:tu@ulisesmolinadev@gmail.com" icon={<Mail className="w-4 h-4" />} label="Email" />
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="p-2 rounded-lg md:hidden bg-white/5">
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 flex flex-col px-6 pt-20 pb-6 bg-black/95 backdrop-blur-lg md:hidden"
          >
            <nav className="mb-8">
              <ul className="space-y-2">
                {[
                  { id: "about", label: "Sobre mí" },
                  { id: "experience", label: "Experiencia" },
                  { id: "projects", label: "Proyectos" },
                  { id: "contact", label: "Contacto" },
                ].map((section) => (
                  <li key={section.id}>
                    <button
                      onClick={() => handleSectionClick(section.id)}
                      className={cn(
                        "text-left w-full px-4 py-3 rounded-xl transition-all flex items-center",
                        activeSection === section.id
                          ? "bg-gradient-to-r from-[#8a9a8c]/20 to-[#4a5a4d]/20 text-white font-medium"
                          : "text-white/60 hover:text-white hover:bg-white/5",
                      )}
                    >
                      {section.label}
                      {activeSection === section.id && <ChevronRight className="w-4 h-4 ml-auto" />}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mt-auto">
              <div className="flex justify-center mb-6 space-x-4">
                <SocialLink href="https://github.com/Ulises-Molina" icon={<Github className="w-4 h-4" />} label="GitHub" />
                <SocialLink href="https://www.linkedin.com/in/ulises-rafael-molina/" icon={<Linkedin className="w-4 h-4" />} label="LinkedIn" />
                <SocialLink href="mailto:tu@ulisesmolinadev@gmail.com" icon={<Mail className="w-4 h-4" />} label="Email" />
              </div>
              <p className="text-xs text-center text-white/40">© {new Date().getFullYear()} Ulises Molina</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <main ref={mainRef} className="h-screen pt-16 overflow-x-hidden overflow-y-auto scrollbar-hide">
        <AnimatePresence mode="wait">
          {activeSection === "about" && (
            <motion.div
              key="about"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="min-h-screen"
            >
              {/* Hero section with parallax */}
              <section ref={aboutSectionRef} className="relative h-[80vh] flex items-center overflow-hidden">
                <div
                  className="absolute inset-0 bg-gradient-to-br from-[#8a9a8c]/20 to-[#4a5a4d]/20 z-0"
                  style={{ transform: `translateY(${scrollY * 0.2}px)` }}
                ></div>
                <div
                  className="absolute inset-0 z-0 opacity-10"
                  style={{ transform: `translateY(${scrollY * 0.1}px)` }}
                ></div>
                <FloatingLines />
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0f0f0f] to-transparent z-10"></div>

                <div className="container relative z-20 px-6 mx-auto md:px-12">
                  <h1
                    ref={heroTitleRef}
                    className="mb-4 text-4xl font-bold leading-tight sm:text-5xl md:text-7xl sm:mb-6"
                  >
                    Creando{" "}
                    <span className="bg-gradient-to-r from-[#8a9a8c] to-[#4a5a4d] text-transparent bg-clip-text">
                      experiencias
                    </span>{" "}
                    digitales excepcionales
                  </h1>
                  <p
                    ref={heroDescRef}
                    className="max-w-2xl mb-6 text-lg sm:text-xl text-white/70 sm:mb-8"
                  >
                    Desarrollador Frontend especializado en crear interfaces modernas, atractivas y funcionales que
                    conectan con los usuarios.
                  </p>
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="flex flex-col gap-3 sm:flex-row sm:gap-4"
                  >
                    <Link
                      href="#contact"
                      onClick={() => handleSectionClick("contact")}
                      className="w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-[#8a9a8c] to-[#4a5a4d] rounded-full font-medium hover:shadow-lg hover:shadow-[#8a9a8c]/20 transition-all flex items-center justify-center"
                    >
                      Contactar <ArrowUpRight className="w-4 h-4 ml-2" />
                    </Link>
                    <Link
                      href="#projects"
                      onClick={() => handleSectionClick("projects")}
                      className="w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 bg-white/5 border border-white/10 rounded-full font-medium hover:bg-white/10 transition-all text-center"
                    >
                      Ver proyectos
                    </Link>
                  </motion.div>
                </div>
              </section>

              {/* Scroll indicator */}
              <AnimatePresence>
                {showArrow && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: 1, duration: 0.8 }}
                    className="relative z-50 -mt-2 -translate-x-1/2 left-1/2"
                  >
                    <motion.div
                      animate={{ y: [0, 10, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <ChevronDown className="w-8 h-8 text-white/60" />
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>


              {/* About content */}
              <section className="relative py-16 sm:py-32 overflow-hidden">
                {/* Animated gradient background */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-[#8a9a8c]/15 rounded-full blur-[100px] animate-pulse"></div>
                  <div className="absolute bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-[#4a5a4d]/15 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }}></div>
                </div>

                <div className="container px-4 mx-auto sm:px-6 md:px-12 max-w-6xl relative z-10">
                  {/* Section Title with animated underline */}
                  <div className="mb-16 text-center">
                    <h2 ref={aboutTitleRef} className="relative inline-block mb-4 text-3xl font-bold sm:text-4xl md:text-5xl">
                      <span className="bg-gradient-to-r from-white via-[#8a9a8c] to-white bg-clip-text text-transparent">
                        Sobre mí
                      </span>
                      <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-[#8a9a8c] to-transparent rounded-full"></div>
                    </h2>
                    <p className="mt-6 text-white/60 max-w-2xl mx-auto">
                      Desarrollador apasionado por crear experiencias digitales excepcionales
                    </p>
                  </div>

                  {/* Main Content Grid */}
                  <div className="grid gap-8 mb-16 lg:grid-cols-2">
                    {/* About Card with Glassmorphism */}
                    <div ref={aboutContentRef} className="group relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#8a9a8c]/20 to-[#4a5a4d]/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                      <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-[#8a9a8c]/30 transition-all duration-500 h-full">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#8a9a8c]/10 to-transparent rounded-bl-full"></div>

                        <div className="space-y-6 relative z-10">
                          <div className="flex items-center gap-4 mb-6">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#8a9a8c] to-[#4a5a4d] flex items-center justify-center">
                              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                            </div>
                            <div>
                              <h3 className="text-2xl font-bold text-white">Ulises Molina</h3>
                              <p className="text-[#8a9a8c]">Software Developer</p>
                            </div>
                          </div>

                          <p className="text-white/80 leading-relaxed">
                            Soy un desarrollador frontend apasionado por crear experiencias web atractivas y funcionales que conectan con los usuarios.
                          </p>
                          <p className="text-white/80 leading-relaxed">
                            Me especializo en construir aplicaciones modernas utilizando tecnologías como React, Next.js, TypeScript y Tailwind CSS. Me encanta trabajar en la intersección del diseño y la programación.
                          </p>
                          <p className="text-white/80 leading-relaxed">
                            Cuento con una sólida capacidad de adaptación a nuevos entornos, pensamiento analítico y habilidades para el trabajo en equipo, lo que me permite contribuir de manera efectiva en proyectos de diversa complejidad.
                          </p>

                          {/* Stats */}
                          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-[#8a9a8c]">+2</div>
                              <div className="text-xs text-white/60">Años</div>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-[#8a9a8c]">+15</div>
                              <div className="text-xs text-white/60">Proyectos</div>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-[#8a9a8c]">+4</div>
                              <div className="text-xs text-white/60">Certificaciones</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Technologies Card */}
                    <div className="group relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#4a5a4d]/20 to-[#8a9a8c]/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                      <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-[#8a9a8c]/30 transition-all duration-500 h-full">
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-[#4a5a4d]/10 to-transparent rounded-tr-full"></div>

                        <div className="relative z-10">
                          <div className="flex items-center gap-3 mb-8">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#8a9a8c] to-[#4a5a4d] flex items-center justify-center">
                              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                              </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-white">Stack Tecnológico</h3>
                          </div>

                          <div ref={techBadgesRef} className="grid grid-cols-2 gap-3">
                            <TechBadge label="JavaScript" iconPath="/iconos/javascript.svg" />
                            <TechBadge label="React" iconPath="/iconos/react_light.svg" />
                            <TechBadge label="TypeScript" iconPath="/iconos/typescript.svg" />
                            <TechBadge label="Next.js" iconPath="/iconos/nextjs_icon_dark.svg" />
                            <TechBadge label="HTML5" iconPath="/iconos/html5.svg" />
                            <TechBadge label="CSS" iconPath="/iconos/css_old.svg" />
                            <TechBadge label="Tailwind CSS" iconPath="/iconos/tailwindcss.svg" />
                            <TechBadge label="SQL" iconPath="/iconos/postgresql.svg" />
                            <TechBadge label="Git" iconPath="/iconos/git.svg" />
                            <TechBadge label="AWS" iconPath="/iconos/aws_light.svg" />
                            <TechBadge label="Elementor" iconPath="/iconos/elementor.svg" />
                            <TechBadge label="n8n" iconPath="/iconos/n8n.svg" />
                            <TechBadge label="Wordpress" iconPath="/iconos/wordpress.svg" />
                            <TechBadge label="Shopify" iconPath="/iconos/shopify.svg" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Skills Highlights */}
                </div>
              </section>
            </motion.div>
          )}

          {activeSection === "experience" && (
            <motion.div
              key="experience"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="container min-h-screen px-6 py-20 mx-auto md:px-12"
            >
              <div className="max-w-4xl mx-auto">
                <h2 className="relative inline-block mb-12 text-3xl font-bold">
                  Experiencia
                  <div className="absolute -bottom-3 left-0 w-1/3 h-1 bg-gradient-to-r from-[#8a9a8c] to-[#4a5a4d] rounded-full"></div>
                </h2>

                <div className="relative mt-16">
                  {/* Timeline line */}
                  <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[#8a9a8c] to-[#4a5a4d] rounded-full timeline-line"></div>

                  <div className="space-y-24">
                    <TimelineItem
                      title="Frontend Developer"
                      company="Qualita"
                      period="Marzo 2025 - Presente"
                      description="Desarrollo, configuración y mantenimiento de sitios web y plataformas E-Commerce. HTML, CSS y JavaScript, diseño y optimización UX / UI, Responsive Design, automatización de procesos con Zapier, administración de servicios de Hosting, colaboración con equipo de diseño grafico y metodologías ágiles"
                      technologies={["Wordpress", "Elementor", "Shopify", "ClickUp", "Zapier", "HTML5", "CSS3", "JavaScript"]}
                      isLeft={true}
                    />

                    <TimelineItem
                      title="Pasante Web Developer"
                      company="Qualita"
                      period="Febrero 2025 - Marzo 2025"
                      description="Desarrollo de sitios web utilizando Wordpress y Shopify, con enfoque en la implementación de interfaces responsivas, accesibles y alineadas con los objetivos del negocio. Colaboración activa con equipos de diseño y marketing para garantizar una experiencia de usuario coherente y atractiva."
                      technologies={["Wordpress", "Elementor", "Shopify", "ClickUp"]}
                      isLeft={false}
                    />

                    <TimelineItem
                      title="Encargado de local"
                      company="Great Burgers"
                      period="2023-2025"
                      description="Responsable de la atención al cliente, el manejo de caja, grupo de trabajo y el control de inventario."
                      technologies={[]}
                      isLeft={true}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeSection === "certifications" && (
            <motion.div
              key="certifications"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="container min-h-screen px-6 py-20 mx-auto md:px-12"
            >
              <div className=" mx-auto">
                <h2 className="relative inline-block mb-12 text-3xl font-bold">
                  Certificaciones
                  <div className="absolute -bottom-3 left-0 w-1/3 h-1 bg-gradient-to-r from-[#647566] to-[#7d8f7e] rounded-full"></div>
                </h2>

                <div className="grid gap-8 md:grid-cols-3 certifications-container">
                  <CertificationCard
                    title="JavaScript Algorithms and Data Structures"
                    organization="freeCodeCamp"
                    date="Febrero 2025"
                    description="Certificación profesional que valida habilidades en fundamentos de JavaScript, programación funcional, estructuras de datos y algoritmos, aplicando estos conocimientos en desafíos y proyectos prácticos."
                    imageUrl="/free.png"
                    credentialUrl="https://www.freecodecamp.org/certification/Ulises-Molina/javascript-algorithms-and-data-structures-v8"
                  />
                  <CertificationCard
                    title="Curso avanzado de React JS"
                    organization="Gobierno de la Ciudad de Buenos Aires"
                    date="Junio 2025"
                    description="Certificación que demuestra conocimientos en React.JS, como componentes, eventos, estados, rutas, formularios y uso de Hooks. Trabajo con APIs y gestion de estados globalmente."
                    imageUrl="/BA.png"
                    credentialUrl="https://www.linkedin.com/in/ulises-rafael-molina/overlay/1752792565172/single-media-viewer/?profileId=ACoAAEMW2M4BXEIU9aAorWjDk3HB4Cl0NRGjZy8"
                  />



                  <CertificationCard
                    title="Curso avanzado de Node JS"
                    organization="Gobierno de la Ciudad de Buenos Aires"
                    date="Diciembre 2025"
                    description="Certificación que demuestra conocimientos en Node.JS, creación de APIs, gestión de paquetes, manejo de errores y despliegue de aplicaciones."
                    imageUrl="/BA.png"
                    credentialUrl="https://www.linkedin.com/in/ulises-rafael-molina/overlay/1766005199800/single-media-viewer/?profileId=ACoAAEMW2M4BXEIU9aAorWjDk3HB4Cl0NRGjZy8"
                  />

                  <CertificationCard
                    title="Responsive Web Design"
                    organization="freeCodeCamp"
                    date="Enero 2025"
                    description="Certificación que demuestra conocimientos HTML y CSS para crear sitios web accesibles y adaptables a cualquier dispositivo. Implementé Flexbox, Grid y diseño responsivo, desarrollando proyectos prácticos para aplicar estos conocimientos."
                    imageUrl="/free.png"
                    credentialUrl="https://www.freecodecamp.org/certification/Ulises-Molina/responsive-web-design"
                  />

                  <CertificationCard
                    title="EF SET English Certificate 53/100 (B2 Upper Intermediate)"
                    organization="EF SET"
                    date="Febrero 2025"
                    description="Certificación en inglés con nivel B2 (Intermedio), validado por EF SET. Demuestra habilidades avanzadas en comprensión escrita y auditiva, con capacidad para comunicar ideas de forma clara y efectiva en contextos profesionales y académicos."
                    imageUrl="/logo.svg"
                    credentialUrl="https://cert.efset.org/es/7WVPUE"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {activeSection === "projects" && (
            <motion.div
              key="projects"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="container min-h-screen px-6 py-20 mx-auto md:px-12"
            >
              <div className="max-w-8xl mx-auto">
                <h2 className="relative inline-block mb-12 text-3xl font-bold">
                  Proyectos
                  <div className="absolute -bottom-3 left-0 w-1/3 h-1 bg-gradient-to-r from-[#8a9a8c] to-[#4a5a4d] rounded-full"></div>
                </h2>


                <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-1 projects-container">

                  <ProjectCardVideo
                    title="Fintrack"
                    description="Aplicación web moderna para el control financiero personal, diseñada para ayudar a gestionar los ingresos y gastos de forma intuitiva y visual. Dashboard interactivo, gestión de transacciones y categorias, analísis financiero con IA, autenticación de usuarios y gestión de cuentas."
                    technologies={["React", "Supabase", "0Auth", "Vite", "TailwindCSS"]}
                    demoUrl="https://fintrackgastos.vercel.app/"
                    repoUrl="https://github.com/Ulises-Molina/Fintrack"
                    videoDesktopUrl="/Fintrack.mp4"
                    videoMobileUrl="/FintrackMobile.png"
                    isPrivate={false}
                  />

                  <ProjectCardVideo
                    title="SVN Designs"
                    description="El proyecto se centró en ofrecer un catálogo visual atractivo y fácil de navegar, con formularios de pedido y automatización de respuestas con Zapier. Como desarrollador trabajé en la implementación de una interfaz clara que transmite profesionalismo y facilita la interacción con los servicios de la marca."
                    technologies={["Shopify", "Typeform", "Zapier"]}
                    demoUrl="https://svn-designs.com/"
                    repoUrl=""
                    videoDesktopUrl="/svn.mp4"
                    videoMobileUrl="/svnmobile.png"
                    isPrivate={true}
                  />

                  <ProjectCardVideo
                    title="Confidas Capital"
                    description="El proyecto se centró en transmitir confianza y accesibilidad, facilitando el acceso a información sobre productos financieros. Como desarrollador trabajé en la construcción de un diseño moderno y responsivo, optimizando la navegación y asegurando una experiencia fluida tanto en desktop como en dispositivos móviles, con un enfoque en la usabilidad y la comunicación visual de la marca."
                    technologies={["Wordpress", "Elementor", "CSS", "MetForm"]}
                    demoUrl="https://confidascapital.com.ar/"
                    repoUrl=""
                    videoDesktopUrl="/confidas.mp4"
                    videoMobileUrl="/confidasmobile.png"
                    isPrivate={true}
                  />

                  <ProjectCardVideo
                    title="Green Company"
                    description="Green Company ofrece soluciones logísticas de forma B2B para empresas. Mi trabajo como desarrollador se enfocó en construir una interfaz alineada con la identidad visual de la marca, además de optimizar la experiencia en distintos dispositivos. Creamos una consistencia visual para reforzar la confianza desde la estética hasta la funcionalidad para mostrar servicios."
                    technologies={["Wordpress", "Elementor", "WooCommerce"]}
                    demoUrl="https://greenmovingco.com/"
                    repoUrl=""
                    videoDesktopUrl="/green2.mp4"
                    videoMobileUrl="/greenmobile2.png"
                    isPrivate={true}

                  />

                  <ProjectCardVideo
                    title="Skiway"
                    description="Skiway es un sitio web para una marca argentina de calzado e indumentaria de seguridad industrial. Como desarrollador, trabajé en un diseño responsivo y funcional, optimizando la navegación, el catálogo de productos con filtros y la presentación de imágenes y detalles técnicos para ofrecer una experiencia clara y profesional."
                    technologies={["Wordpress", "Elementor", "WooCommerce", "CSS"]}
                    demoUrl="https://skiway.com.ar/"
                    repoUrl=""
                    videoDesktopUrl="/skiway.mp4"
                    videoMobileUrl="/skiwaymobile.png"
                    isPrivate={true}
                  />


                  <ProjectCardVideo
                    title="Great Burgers Website"
                    description="Great Burgers es una aplicación web de pedidos de comida desarrollada como proyecto de práctica de desarrollo front-end. La interfaz simula una experiencia de usuario moderna para un restaurante de hamburguesas, permitiendo explorar el menú, agregar productos al carrito y gestionar pedidos mediante un panel de administración."
                    technologies={["NextJS", "TypeScript", "TailwindCSS", "Supabase"]}
                    demoUrl="https://great-burgers.vercel.app/"
                    repoUrl="https://github.com/Ulises-Molina/Market-Crypto"
                    videoDesktopUrl="/great.mp4"
                    videoMobileUrl="/greatmobile2.png"
                    isPrivate={true}
                  />

                  <ProjectCardVideo
                    title="Crypto Market"
                    description="Permite a los usuarios visualizar el precio de diversas criptomonedas en tiempo real con grafico interactivo y acceder a las últimas noticias del mundo cripto."
                    technologies={["React", "TypeScript", "TailwindCSS", "Chart.js", "NewsAPI"]}
                    demoUrl="https://marketcrypto-psi.vercel.app/"
                    repoUrl="https://github.com/Ulises-Molina/Market-Crypto"
                    videoDesktopUrl="/marketcrypto.mp4"
                    videoMobileUrl="/marketcrypto.png"
                  />

                  <ProjectCardVideo
                    title="NextJS E-Commerce"
                    description="Next.js E-Commerce es una aplicación web de comercio electrónico desarrollada como proyecto de práctica de desarrollo front-end. La interfaz simula una experiencia de usuario moderna para una tienda en línea, permitiendo explorar productos, agregarlos al carrito y utiliza un sistema de register y login."
                    technologies={["NextJS", "TypeScript", "TailwindCSS", "PostgreSQL", "NextAuth"]}
                    demoUrl="https://next-js-eccomerce-nine.vercel.app/"
                    repoUrl="https://github.com/Ulises-Molina/NextJS-Eccomerce"
                    videoDesktopUrl="/nextjs.mp4"
                    videoMobileUrl="/nextmobile.png"
                  />

                </div>
              </div>
            </motion.div>
          )}

          {activeSection === "contact" && (
            <motion.div
              key="contact"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="container flex items-center min-h-screen px-6 py-20 mx-auto md:px-12"
            >
              <div className="w-full max-w-4xl mx-auto">
                <h2 className="relative inline-block w-full mb-12 text-3xl font-bold text-center contact-title">
                  Contacto
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-gradient-to-r from-[#8a9a8c] to-[#4a5a4d] rounded-full"></div>
                </h2>

                <div className="max-w-xl mx-auto">
                  <p className="mb-8 text-center text-white/80">
                    Actualmente estoy abierto a nuevas oportunidades. No dudes en contactarme si
                    queres trabajar conmigo.
                  </p>

                  <div className="space-y-4">
                    <ContactItem
                      icon={<Mail className="w-5 h-5" />}
                      label="Email"
                      value="ulisesmolinadev@gmail.com"
                      href="mailto:ulisesmolinadev@gmail.com"
                    />

                    <ContactItem
                      icon={<Linkedin className="w-5 h-5" />}
                      label="LinkedIn"
                      value="Ulises Molina"
                      href="https://www.linkedin.com/in/ulises-rafael-molina/"
                    />

                    <ContactItem
                      icon={<Github className="w-5 h-5" />}
                      label="GitHub"
                      value="Ulises-Molina"
                      href="https://github.com/Ulises-Molina"
                    />

                    <ContactItem
                      icon={<User className="w-5 h-5" />}
                      label="CV"
                      value="Ver CV"
                      href="/Cv.Ulises.pdf"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <footer className="py-8 mt-0 border-t border-white/10">
          <div className="container px-6 mx-auto md:px-12">
            <div className="flex items-center justify-center text-center">
              <p className="text-sm text-white/40">
                Desarrollado por Ulises Molina
              </p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}

function SocialLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center w-8 h-8 transition-colors rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white"
      aria-label={label}
    >
      {icon}
    </Link>
  )
}

function TechBadge({ label, icon, iconPath }: { label: string; icon?: string; iconPath?: string }) {
  return (
    <div
      className="tech-badge group relative overflow-hidden bg-gradient-to-br from-[#8a9a8c]/10 to-[#4a5a4d]/10 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-3 hover:border-[#8a9a8c]/50 transition-all duration-300 cursor-pointer"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#8a9a8c]/0 to-[#8a9a8c]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="relative z-10 flex items-center gap-3">
        {iconPath ? (
          <div className="relative w-5 h-5">
            <Image src={iconPath} alt={label} fill className="object-contain" />
          </div>
        ) : icon ? (
          <span className="text-lg">{icon}</span>
        ) : null}
        <span className="text-sm font-medium text-white/90">{label}</span>
      </div>
    </div>
  )
}

interface ProjectCardVideoProps {
  title: string
  description: string
  technologies: string[]
  demoUrl: string
  repoUrl: string
  videoDesktopUrl: string
  videoMobileUrl: string
  isPrivate?: boolean
}

export function ProjectCardVideo({
  title,
  description,
  technologies,
  demoUrl,
  repoUrl,
  videoDesktopUrl,
  videoMobileUrl,
  isPrivate,
}: ProjectCardVideoProps) {

  return (
    <div
      className="group overflow-hidden transition-all flex flex-col xl:flex-row h-full lg:gap-8 border-b-2 border-[#8a9a8c]/10 lg:py-10 project-card"
    >
      {/* Mockups */}
      <div className="flex justify-center items-center px-4 md:py-10 py-6 relative w-full md:w-auto">
        {/* Laptop (Desktop Video) */}
        <div className="transform scale-[0.45] sm:scale-[0.5] md:scale-[0.65] lg:scale-[0.7] xl:scale-[0.8]">
          <div className="relative mx-auto flex h-[390px] w-[630px] items-center justify-center rounded-[20px] bg-black p-[9px] pt-[9px] pb-[23px] shadow-[inset_0_0_0_2px_#c8cacb,inset_0_0_0_10px_#000] [transform-style:preserve-3d] [transform-origin:bottom_center]">
            <div className="absolute top-[10px] left-1/2 h-[12px] w-[100px] -translate-x-1/2 rounded-b-[6px] bg-black z-20" />
            <video
              autoPlay
              muted
              loop
              playsInline
              className="h-full w-full rounded-[12px] object-cover p-1"
            >
              <source src={videoDesktopUrl} type="video/mp4" />
            </video>
            <div className="absolute top-[-3px] h-[12px] w-[630px] rounded-t-[5px] bg-gradient-to-b from-[#979899] to-transparent [transform:rotateX(90deg)]" />
            <div className="absolute bottom-[2px] left-[2px] h-[24px] w-[626px] rounded-b-[20px] bg-gradient-to-b from-[#272727] to-[#0d0d0d]" />
          </div>
          <div className="relative mx-auto mt-[-10px] h-[30px] w-[750px] rounded-b-[12px] border border-t-0 border-[#a0a3a7] bg-[radial-gradient(circle_at_center,#e2e3e4_85%,#a9abac_100%)] shadow-[inset_0_-2px_8px_0_#6c7074] z-10">
            <div className="absolute top-0 left-1/2 h-[10px] w-[120px] -translate-x-1/2 rounded-b-[10px] bg-[#e2e3e4] shadow-[inset_0_0_4px_2px_#babdbf]" />
            <div className="absolute bottom-[-2px] left-1/2 h-[2px] w-[40px] -translate-x-1/2 rounded-b-[3px] shadow-[-320px_0_#272727,300px_0_#272727]" />
          </div>
        </div>

        {/* Phone (Mobile Video) - HIDDEN */}
        <div className="hidden w-[130px] sm:w-[120px] md:w-[136px] absolute top-[44%] md:left-[85%] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="relative aspect-[9/19.5] overflow-hidden rounded-[30px] border-[7px] border-[#222] bg-[#444] shadow-lg">
            <div className="absolute top-[5px] left-1/2 h-[12px] w-[70px] -translate-x-1/2 rounded-[10px] bg-[#111] z-20" />
            <Image
              src={videoMobileUrl}
              alt="Phone"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* Text Content */}
      <div className="flex flex-col flex-grow px-4 md:px-6 lg:px-10 py-6 justify-center">
        <h3 className="text-2xl font-semibold text-white mb-3 group-hover:text-[#8a9a8c] transition-colors">
          {title}
        </h3>
        <p className="mb-4 text-m text-white/70">{description}</p>
        <div className="flex flex-wrap gap-2 mb-6">
          {technologies.map((tech) => (
            <span key={tech} className="px-2 py-1 text-xs border rounded-full bg-white/5 border-white/10">
              {tech}
            </span>
          ))}
        </div>
        <div className="flex gap-3 flex-wrap">
          <Link
            href={demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center px-3 py-2 bg-gradient-to-r from-[#8a9a8c] to-[#4a5a4d] rounded-lg text-sm font-medium hover:shadow-lg hover:shadow-[#8a9a8c]/20 transition-all"
          >
            <ExternalLink className="mr-1.5 w-3.5 h-3.5" /> Ver Demo
          </Link>
          {isPrivate ? (
            <div className="flex items-center justify-center flex-1 px-3 py-2 text-sm font-medium border rounded-lg cursor-not-allowed bg-white/5 border-white/10 text-white/40">
              <Code className="mr-1.5 w-3.5 h-3.5" /> Privado
            </div>
          ) : (
            <Link
              href={repoUrl || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center flex-1 px-3 py-2 text-sm font-medium transition-all border rounded-lg bg-white/5 border-white/10 hover:bg-white/10"
            >
              <Code className="mr-1.5 w-3.5 h-3.5" /> Ver Código
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}












interface ContactItemProps {
  icon: React.ReactNode
  label: string
  value: string
  href: string
}

function ContactItem({ icon, label, value, href }: ContactItemProps) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center p-4 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 hover:border-[#8a9a8c]/30 transition-all group contact-item"
    >
      <div className="mr-4 text-[#8a9a8c] group-hover:text-[#4a5a4d]">{icon}</div>
      <div>
        <p className="text-sm text-white/60">{label}</p>
        <p className="text-white group-hover:text-[#8a9a8c] transition-colors">{value}</p>
      </div>
      <ArrowUpRight className="ml-auto text-white/40 group-hover:text-[#8a9a8c] transition-colors w-4 h-4" />
    </Link>
  )
}

interface TimelineItemProps {
  title: string
  company: string
  period: string
  description: string
  technologies: string[]
  isLeft: boolean
}

function TimelineItem({ title, company, period, description, technologies, isLeft }: TimelineItemProps) {
  return (
    <div
      className={`relative flex flex-col md:flex-row ${isLeft ? "md:flex-row-reverse" : ""} timeline-item`}
    >
      {/* Timeline dot */}
      <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-gradient-to-r from-[#8a9a8c] to-[#4a5a4d] border-4 border-[#0f0f0f] z-10"></div>

      {/* Content */}
      <div className={`md:w-1/2 ${isLeft ? "md:pr-12" : "md:pl-12"} pl-10 md:pl-0`}>
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-[#8a9a8c]/30 transition-all">
          <div className="flex flex-col mb-4">
            <h3 className="text-xl font-semibold text-white">{title}</h3>
            <span className="px-3 py-1 mt-2 text-sm rounded-full text-white/60 bg-white/5 w-fit">{period}</span>
          </div>
          <p className="text-[#8a9a8c] mb-3">{company}</p>
          <p className="mb-6 text-white/70">{description}</p>
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech) => (
              <span key={tech} className="px-3 py-1 text-xs border rounded-full bg-white/5 border-white/10">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

interface CertificationCardProps {
  title: string
  organization: string
  date: string
  description: string
  imageUrl: string
  credentialUrl: string
}

function CertificationCard({
  title,
  organization,
  date,
  description,
  imageUrl,
  credentialUrl,
}: CertificationCardProps) {
  return (
    <div
      className="bg-white/5 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/10 hover:border-[#647566]/30 transition-all certification-card group hover:shadow-lg hover:shadow-[#8a9a8c]/10"
    >
      <div className="flex flex-col gap-6 p-6 md:flex-row">
        <div className="flex-shrink-0">
          <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden bg-gradient-to-br from-[#647566]/20 to-[#7d8f7e]/20 p-0.5">
            <div className="absolute inset-0 bg-black/50 rounded-lg overflow-hidden m-0.5">
              <Image src={imageUrl || "/placeholder.svg"} alt={organization} fill className="object-cover" />
            </div>
          </div>
        </div>
        <div className="flex-1">
          <h3 className="mb-1 text-xl font-semibold text-white">{title}</h3>
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="text-[#7d8f7e] font-medium">{organization}</span>
            <span className="text-sm text-white/40">•</span>
            <span className="text-sm text-white/40">{date}</span>
          </div>
          <p className="mb-4 text-sm text-white/70">{description}</p>
          <Link
            href={credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm text-[#7d8f7e] hover:text-[#8fa190] transition-colors"
          >
            <div className="mr-1.5 w-3.5 h-3.5" /> Ver credencial
            <ArrowUpRight className="w-3 h-3 ml-1" />
          </Link>
        </div>
      </div>
    </div>
  )
}


