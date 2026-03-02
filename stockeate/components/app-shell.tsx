"use client"

import type React from "react"
import { useEffect, useState } from "react"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  Activity,
  BarChart3,
  LayoutDashboard,
  Package,
  Receipt,
  RefreshCcw,
  Settings,
  ShoppingCart,
  Truck,
  UserCircle,
  Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { supabase } from "@/lib/supabase/client"
import { getStoredTheme, THEMES, type ThemeName } from "@/lib/themes"

const navSections = [
  {
    title: "Principal",
    items: [
      {
        href: "/dashboard",
        label: "Panel principal",
        description: "Resumen del negocio",
        icon: LayoutDashboard,
      },
      {
        href: "/products",
        label: "Productos",
        description: "Stock y catalogo",
        icon: Package,
      },
      {
        href: "/sales",
        label: "Ventas",
        description: "Registro rapido",
        icon: ShoppingCart,
      },
      {
        href: "/restock",
        label: "Reposicion",
        description: "Mercaderia",
        icon: RefreshCcw,
      },
      {
        href: "/cash-close",
        label: "Cierre de caja",
        description: "Resumen diario",
        icon: Receipt,
      },
      {
        href: "/reports",
        label: "Reportes",
        description: "Tendencias y metricas",
        icon: BarChart3,
      },
    ],
  },
  {
    title: "Gestion",
    items: [
      {
        href: "/customers",
        label: "Clientes",
        description: "Base simple",
        icon: Users,
      },
      {
        href: "/suppliers",
        label: "Proveedores",
        description: "Contactos",
        icon: Truck,
      },
      {
        href: "/history",
        label: "Historial",
        description: "Auditoria",
        icon: Activity,
      },
    ],
  },
  {
    title: "Cuenta",
    items: [
      {
        href: "/profile",
        label: "Perfil",
        description: "Preferencias",
        icon: UserCircle,
      },
      {
        href: "/settings",
        label: "Ajustes",
        description: "Configuracion",
        icon: Settings,
      },
    ],
  },
]

const navItems = navSections.flatMap((section) => section.items)

interface AppShellProps {
  children: React.ReactNode
}

function AppShell({ children }: AppShellProps) {
  const pathname = usePathname()
  const router = useRouter()
  const activeItem = navItems.find((item) => item.href === pathname) ?? navItems[0]
  const [storeName, setStoreName] = useState("Cargando...")
  const [planStatus, setPlanStatus] = useState("Plan")
  const [themeName, setThemeName] = useState<ThemeName>("default")
  const headerActions = {
    "/dashboard": [
      { label: "Ver actividad", variant: "outline" as const, className: "text-foreground" },
      { label: "Crear producto", variant: "default" as const, href: "/products" },
    ],
    "/sales": [{ label: "Confirmar venta", variant: "default" as const }],
    "/products": [{ label: "Nuevo producto", variant: "default" as const }],
    "/restock": [{ label: "Registrar reposicion", variant: "default" as const }],
    "/cash-close": [{ label: "Generar cierre", variant: "default" as const }],
    "/reports": [{ label: "Exportar reporte", variant: "outline" as const, className: "text-foreground" }],
    "/customers": [{ label: "Nuevo cliente", variant: "default" as const }],
    "/suppliers": [{ label: "Nuevo proveedor", variant: "default" as const }],
    "/history": [{ label: "Exportar historial", variant: "outline" as const, className: "text-foreground" }],
    "/profile": [{ label: "Guardar cambios", variant: "default" as const, formId: "store-name-form" }],
  }[pathname]

  async function handleSignOut() {
    await supabase.auth.signOut()
    router.push("/login")
  }

  useEffect(() => {
    let isMounted = true
    function handleStoreNameUpdate(event: Event) {
      const customEvent = event as CustomEvent<{ name?: string }>
      if (customEvent.detail?.name) {
        setStoreName(customEvent.detail.name)
      }
    }

    async function loadStoreInfo() {
      const { data: userData } = await supabase.auth.getUser()
      const userId = userData.user?.id
      if (!userId) {
        return
      }

      const { data: membership } = await supabase
        .from("store_members")
        .select("store_id, stores(name)")
        .eq("user_id", userId)
        .limit(1)
        .maybeSingle()

      const resolvedStoreName = membership?.stores?.name ?? "Mi negocio"
      if (isMounted) {
        setStoreName(resolvedStoreName)
      }

      const storeId = membership?.store_id
      if (!storeId) {
        return
      }

      const { data: subscription } = await supabase
        .from("subscriptions")
        .select("status")
        .eq("store_id", storeId)
        .single()

      const statusLabel = subscription?.status === "active"
        ? "Plan activo"
        : subscription?.status === "trialing"
          ? "Plan trial activo"
          : "Plan inactivo"

      if (isMounted) {
        setPlanStatus(statusLabel)
      }
    }

    loadStoreInfo()
    window.addEventListener("store-name-updated", handleStoreNameUpdate)

    return () => {
      isMounted = false
      window.removeEventListener("store-name-updated", handleStoreNameUpdate)
    }
  }, [])

  useEffect(() => {
    function handleThemeUpdate(event: Event) {
      const customEvent = event as CustomEvent<{ name?: ThemeName }>
      if (customEvent.detail?.name && customEvent.detail.name in THEMES) {
        setThemeName(customEvent.detail.name)
      }
    }

    setThemeName(getStoredTheme())
    window.addEventListener("theme-updated", handleThemeUpdate)

    return () => {
      window.removeEventListener("theme-updated", handleThemeUpdate)
    }
  }, [])

  const activeTheme = THEMES[themeName] ?? THEMES.default

  return (
    <div
      className={cn("min-h-screen", activeTheme.backgroundClass, activeTheme.isDark ? "dark" : "")}
      style={activeTheme.cssVars as React.CSSProperties}
    >
      <div className="mx-auto flex w-full max-w-[1500px] gap-6 px-4 py-6 md:px-6 lg:px-8">
        <aside className="hidden w-64 shrink-0 md:sticky md:top-6 md:flex md:h-[calc(100vh-3rem)]">
          <div className="flex h-full w-full flex-col rounded-2xl border border-border/60 bg-card/90 shadow-[0_10px_30px_rgba(15,23,42,0.05)]">
            <div className="space-y-2 border-b border-border/60 p-5">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                  Stockeate
                </p>
                <p className="text-lg font-semibold text-foreground">{storeName}</p>
                <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-border/70 bg-muted/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  {planStatus}
                </div>
              </div>
            </div>
            <nav className="flex-1 space-y-4 px-3 py-5">
              {navSections.map((section, sectionIndex) => (
                <div
                  key={section.title}
                  className={cn(
                    "px-1",
                    sectionIndex > 0 ? "border-t border-border/70 pt-4" : "",
                  )}
                >
                  <p className="px-3 text-[10px] font-semibold uppercase tracking-[0.26em] text-muted-foreground/80">
                    {section.title}
                  </p>
                  <div className="mt-2 space-y-1">
                    {section.items.map((item) => {
                      const isActive = pathname === item.href
                      const Icon = item.icon

                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={cn(
                            "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                            isActive
                              ? "bg-muted/70 text-foreground"
                              : "text-muted-foreground hover:bg-muted/40 hover:text-foreground",
                          )}
                        >
                          <span
                            className={cn(
                              "flex h-8 w-8 items-center justify-center rounded-full border border-border/60 transition-colors",
                              isActive
                                ? "bg-foreground text-background"
                                : "bg-muted/20 text-muted-foreground group-hover:bg-muted/50 group-hover:text-foreground",
                            )}
                          >
                            <Icon className="h-4 w-4" />
                          </span>
                          <span>{item.label}</span>
                        </Link>
                      )
                    })}
                    {section.title === "Cuenta" ? (
                      <Button
                        variant="outline"
                        className="mt-2 w-full justify-start text-foreground"
                        onClick={handleSignOut}
                      >
                        Cerrar sesion
                      </Button>
                    ) : null}
                  </div>
                </div>
              ))}
            </nav>
            <div className="border-t border-border/60 p-4"></div>
          </div>
        </aside>

        <main className="flex-1 space-y-6 pb-20 md:pb-6">
          <div className="rounded-[28px] border border-border/60 bg-card/85 p-6 shadow-[0_16px_36px_rgba(15,23,42,0.08)] backdrop-blur">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  Navegacion
                </p>
                <h1 className="text-2xl font-semibold text-foreground md:text-3xl">
                  <span className="font-serif tracking-tight">{activeItem.label}</span>
                </h1>
                <p className="text-sm text-muted-foreground">
                  {activeItem.description}. Controla stock, ventas y alertas en segundos.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                {(headerActions ?? []).map((action) => {
                  if ("href" in action) {
                    return (
                      <Button key={action.label} asChild variant={action.variant} className={action.className}>
                        <Link href={action.href}>{action.label}</Link>
                      </Button>
                    )
                  }

                  if ("formId" in action) {
                    return (
                      <Button
                        key={action.label}
                        variant={action.variant}
                        type="submit"
                        form={action.formId}
                        className={action.className}
                      >
                        {action.label}
                      </Button>
                    )
                  }

                  return (
                    <Button key={action.label} variant={action.variant} className={action.className}>
                      {action.label}
                    </Button>
                  )
                })}
              </div>
            </div>
          </div>

          {children}
        </main>
      </div>

      <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-border/70 bg-card/95 px-3 py-2 backdrop-blur md:hidden">
        <div className="no-scrollbar flex gap-2 overflow-x-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex min-w-[86px] flex-1 flex-col items-center gap-1 rounded-lg px-2 py-2 text-[11px] font-medium transition-all",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                <Icon className="h-4 w-4" />
                <span className="line-clamp-1">{item.label}</span>
              </Link>
            )
          })}
        </div>
      </nav>
    </div>
  )
}

export default AppShell
