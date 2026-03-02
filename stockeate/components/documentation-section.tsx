"use client"

import { useState, useEffect } from "react"
import type React from "react"

// Badge component for consistency
function Badge({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="px-[14px] py-[6px] bg-white shadow-[0px_0px_0px_4px_rgba(55,50,47,0.05)] overflow-hidden rounded-[90px] flex justify-start items-center gap-[8px] border border-[rgba(2,6,23,0.08)] shadow-xs">
      <div className="w-[14px] h-[14px] relative overflow-hidden flex items-center justify-center">{icon}</div>
      <div className="text-center flex justify-center flex-col text-[#37322F] text-xs font-medium leading-3 font-sans">
        {text}
      </div>
    </div>
  )
}

export default function DocumentationSection() {
  const [activeCard, setActiveCard] = useState(0)
  const [animationKey, setAnimationKey] = useState(0)

  const cards = [
    {
      title: "Historial y auditoria",
      description: "Cada movimiento queda registrado\ny es facil de revisar.",
    },
    {
      title: "Clientes",
      description: "Gestiona contactos y consulta\nla ultima compra en segundos.",
    },
    {
      title: "Proveedores",
      description: "Organiza proveedores y estados\npara reponer sin friccion.",
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % cards.length)
      setAnimationKey((prev) => prev + 1)
    }, 5000)

    return () => clearInterval(interval)
  }, [cards.length])

  const handleCardClick = (index: number) => {
    setActiveCard(index)
    setAnimationKey((prev) => prev + 1)
  }

  const renderPreview = () => {
    if (activeCard === 0) {
      return (
        <div className="w-full h-full rounded-lg border border-border/60 bg-white/95 p-4 sm:p-6 shadow-sm">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Historial</p>
              <p className="text-base font-semibold text-foreground">Actividad reciente</p>
            </div>
            <div className="flex items-center gap-2 text-[10px]">
              <span className="rounded-full border border-border/60 bg-muted/30 px-2 py-0.5">Hoy</span>
              <span className="rounded-full border border-border/60 bg-muted/30 px-2 py-0.5">Turno</span>
            </div>
          </div>
          <div className="mt-4 sm:mt-5 grid grid-cols-1 sm:grid-cols-[1fr_120px] gap-4 sm:gap-5">
            <div className="space-y-3 order-2 sm:order-1">
              {[
                { title: "Venta registrada", detail: "V-2301 · 6 items · $8.900", tag: "Venta" },
                { title: "Reposicion", detail: "Ingreso 24u bebidas", tag: "Stock" },
                { title: "Ajuste de stock", detail: "Rotura -2u cargadores", tag: "Ajuste" },
                { title: "Venta registrada", detail: "V-2300 · 2 items · $3.200", tag: "Venta" },
              ].map((item) => (
                <div key={`${item.title}-${item.detail}`} className="rounded-lg border border-border/60 bg-muted/15 px-3 py-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-foreground">{item.title}</p>
                    <span className="rounded-full border border-border/60 bg-background px-2 py-0.5 text-[10px] text-muted-foreground">
                      {item.tag}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">{item.detail}</p>
                </div>
              ))}
            </div>
            <div className="rounded-xl border border-border/60 bg-muted/20 p-3 text-xs text-muted-foreground order-1 sm:order-2">
              <p className="text-[11px] font-semibold text-foreground">Filtros</p>
              <div className="mt-3 space-y-2">
                {["Ventas", "Reposicion", "Ajustes", "Usuarios"].map((label) => (
                  <div key={label} className="flex items-center justify-between rounded-md border border-border/60 bg-background/70 px-2 py-1">
                    <span>{label}</span>
                    <span className="text-[10px]">•</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )
    }

    if (activeCard === 1) {
      return (
        <div className="relative w-full h-full rounded-lg border border-border/60 bg-white/95 p-4 sm:p-6 shadow-sm">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Clientes</p>
              <p className="text-base font-semibold text-foreground">Clientes activos</p>
            </div>
            <span className="rounded-full border border-border/60 bg-muted/30 px-2 py-0.5 text-[10px]">
              Segmento A
            </span>
          </div>
          <div className="mt-4 sm:mt-5 grid grid-cols-1 sm:grid-cols-[1fr_140px] gap-4 sm:gap-5">
            <div className="space-y-3 order-2 sm:order-1">
              <div className="rounded-lg border border-border/60 bg-muted/20 px-3 py-2 text-xs text-muted-foreground">
                Filtrar por nombre o email
              </div>
              {[
                { name: "Maria Torres", email: "maria@mail.com", last: "Hace 2 dias" },
                { name: "Juan Perez", email: "juan@mail.com", last: "Hace 1 semana" },
                { name: "Distribuidora Plaza", email: "contacto@plaza.com", last: "Hace 3 semanas" },
              ].map((item) => (
                <div key={item.email} className="rounded-lg border border-border/60 bg-background/80 px-3 py-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-foreground">{item.name}</p>
                    <span className="text-[10px] text-muted-foreground">{item.last}</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground">{item.email}</p>
                </div>
              ))}
            </div>
            <div className="rounded-xl border border-border/60 bg-muted/15 p-3 text-xs order-1 sm:order-2">
              <p className="text-[11px] font-semibold text-foreground">Resumen</p>
              <div className="mt-3 space-y-2 text-[11px] text-muted-foreground">
                <div className="flex items-center justify-between">
                  <span>Clientes</span>
                  <span className="font-semibold text-foreground">128</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Activos</span>
                  <span className="font-semibold text-foreground">92</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Nuevos</span>
                  <span className="font-semibold text-foreground">12</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="w-full h-full rounded-lg border border-border/60 bg-white/95 p-4 sm:p-6 shadow-sm">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div>
            <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Proveedores</p>
            <p className="text-base font-semibold text-foreground">Proveedores activos</p>
          </div>
          <span className="rounded-full border border-border/60 bg-muted/30 px-2 py-0.5 text-[10px]">
            Reponer
          </span>
        </div>
        <div className="mt-4 sm:mt-5 grid grid-cols-1 sm:grid-cols-[1fr_140px] gap-4 sm:gap-5">
          <div className="space-y-3 order-2 sm:order-1">
            <div className="rounded-lg border border-border/60 bg-muted/20 px-3 py-2 text-xs text-muted-foreground">
              Filtrar por nombre o email
            </div>
            {[
              { name: "Distribuidora Norte", email: "ventas@norte.com", status: "Activo" },
              { name: "Bebidas Sur", email: "hola@bebidassur.com", status: "Activo" },
              { name: "Snacks Central", email: "central@snacks.com", status: "Pendiente" },
            ].map((item) => (
              <div key={item.email} className="rounded-lg border border-border/60 bg-background/80 px-3 py-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-foreground">{item.name}</p>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                      item.status === "Activo"
                        ? "bg-success/15 text-success"
                        : "bg-warning/15 text-warning"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
                <p className="text-[11px] text-muted-foreground">{item.email}</p>
              </div>
            ))}
          </div>
          <div className="rounded-xl border border-border/60 bg-muted/15 p-3 text-xs order-1 sm:order-2">
            <p className="text-[11px] font-semibold text-foreground">Resumen</p>
            <div className="mt-3 space-y-2 text-[11px] text-muted-foreground">
              <div className="flex items-center justify-between">
                <span>Activos</span>
                <span className="font-semibold text-foreground">8</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Pendientes</span>
                <span className="font-semibold text-foreground">2</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Ultimo ingreso</span>
                <span className="font-semibold text-foreground">Hoy</span>
              </div>
            </div>
            <div className="mt-3 rounded-lg border border-dashed border-border/60 bg-background/60 px-2 py-1 text-[10px] text-muted-foreground">
              SLA 24h
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full border-b border-[rgba(55,50,47,0.12)] flex flex-col justify-center items-center">
      {/* Header Section */}
      <div className="self-stretch px-6 md:px-24 py-12 md:py-16 border-b border-[rgba(55,50,47,0.12)] flex justify-center items-center gap-6">
        <div className="w-full max-w-[686px] px-6 py-5 shadow-[0px_2px_4px_rgba(50,45,43,0.06)] overflow-hidden rounded-lg flex flex-col justify-start items-center gap-4 shadow-none">
          <Badge
            icon={
              <div className="w-[10.50px] h-[10.50px] outline outline-[1.17px] outline-[#37322F] outline-offset-[-0.58px] rounded-full"></div>
            }
            text="Funciones clave"
          />
          <div className="self-stretch text-center flex justify-center flex-col text-[#49423D] text-3xl md:text-5xl font-semibold leading-tight md:leading-[60px] font-sans tracking-tight">
            Menos tareas, más control
          </div>
          <div className="self-stretch text-center text-[#605A57] text-base font-normal leading-7 font-sans">
            Un sistema pensado para comercios chicos que necesitan<br></br> orden, velocidad y claridad todos los días.
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="self-stretch px-4 md:px-9 overflow-hidden flex justify-start items-center">
        <div className="flex-1 py-8 md:py-11 flex flex-col md:flex-row justify-start items-center gap-6 md:gap-12">
          {/* Left Column - Feature Cards */}
          <div className="w-full md:w-auto md:max-w-[400px] flex flex-col justify-center items-center gap-4 order-2 md:order-1">
            {cards.map((card, index) => {
              const isActive = index === activeCard

              return (
                <div
                  key={index}
                  onClick={() => handleCardClick(index)}
                  className={`w-full overflow-hidden flex flex-col justify-start items-start transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "bg-white shadow-[0px_0px_0px_0.75px_#E0DEDB_inset]"
                      : "border border-[rgba(2,6,23,0.08)]"
                  }`}
                >
                  <div
                    className={`w-full h-0.5 bg-[rgba(50,45,43,0.08)] overflow-hidden ${isActive ? "opacity-100" : "opacity-0"}`}
                  >
                    <div
                      key={animationKey}
                      className="h-0.5 bg-[#322D2B] animate-[progressBar_5s_linear_forwards] will-change-transform"
                    />
                  </div>
                  <div className="px-6 py-5 w-full flex flex-col gap-2">
                    <div className="self-stretch flex justify-center flex-col text-[#49423D] text-sm font-semibold leading-6 font-sans">
                      {card.title}
                    </div>
                    <div className="self-stretch text-[#605A57] text-[13px] font-normal leading-[22px] font-sans whitespace-pre-line">
                      {card.description}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Right Column - Preview */}
          <div className="w-full md:w-auto rounded-lg flex flex-col justify-center items-center gap-2 order-1 md:order-2 md:px-0 px-[00]">
            <div className="w-full md:w-[1080px] min-h-[360px] md:h-[420px] bg-white shadow-[0px_0px_0px_0.9056603908538818px_rgba(0,0,0,0.08)] overflow-hidden rounded-lg flex flex-col justify-start items-start">
              <div className="relative w-full h-full bg-gradient-to-br from-blue-50 via-white to-blue-100 p-4 sm:p-5">
                {renderPreview()}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes progressBar {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(0%);
          }
        }
      `}</style>
    </div>
  )
}
