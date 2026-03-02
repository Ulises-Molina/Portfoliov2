import RegisterForm from "@/components/auth/register-form"
import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

function RegisterPage() {
  return (
    <div className="grid w-full items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
      <section className="space-y-6">
        <Button variant="outline" size="sm" asChild className="w-fit">
          <Link href="/">Volver al inicio</Link>
        </Button>
        <div className="space-y-3">
          <Badge className="rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.2em]">
            Empieza hoy
          </Badge>
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
            Stockeate
          </p>
          <h1 className="text-3xl font-semibold text-foreground md:text-4xl">
            Configura tu negocio y activa el control total de stock.
          </h1>
          <p className="text-sm text-muted-foreground md:text-base">
            Crea tu cuenta en minutos y empieza a vender con un panel claro y rapido.
          </p>
        </div>
        <div className="rounded-3xl border border-border/70 bg-white/70 p-5 shadow-[0_12px_26px_rgba(15,23,42,0.06)] backdrop-blur">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Incluye
          </p>
          <div className="mt-4 grid gap-3 text-sm text-muted-foreground">
            <div className="flex items-center justify-between rounded-2xl border border-border/70 bg-muted/20 px-3 py-2">
              <span className="text-foreground">Productos + stock minimo</span>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Plan Basico</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-border/70 bg-muted/20 px-3 py-2">
              <span className="text-foreground">Ventas rapidas y cierre diario</span>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Plan Basico</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-border/70 bg-muted/20 px-3 py-2">
              <span className="text-foreground">Alertas personalizadas y reposicion guiada</span>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Plan Basico</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-border/70 bg-muted/20 px-3 py-2">
              <span className="text-foreground">Base de datos de clientes y proveedores</span>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Plan Basico</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-border/70 bg-muted/20 px-3 py-2">
              <span className="text-foreground">Historial de ventas</span>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Plan Basico</span>
            </div>
          </div>
        </div>
      </section>

      <Card className="w-full max-w-[440px] justify-self-center">
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl">Crear cuenta</CardTitle>
          <CardDescription>
            Completa los datos basicos para habilitar tu panel.
          </CardDescription>
        </CardHeader>
        <RegisterForm />
      </Card>
    </div>
  )
}

export default RegisterPage
