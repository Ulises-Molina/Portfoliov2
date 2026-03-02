import LoginForm from "@/components/auth/login-form"
import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

function LoginPage() {
  return (
    <div className="grid w-full items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
      <section className="space-y-6">
        <Button variant="outline" size="sm" asChild className="w-fit">
          <Link href="/">Volver al inicio</Link>
        </Button>
        <div className="space-y-3">
          <Badge className="rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.2em]">
            Iniciar sesion
          </Badge>
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
            Stockeate
          </p>
          <h1 className="text-3xl font-semibold text-foreground md:text-4xl">
            Accede al control diario de tu kiosco en segundos.
          </h1>
          <p className="text-sm text-muted-foreground md:text-base">
            Stock, ventas y reposicion en un solo lugar. Simple, rapido y listo para operar.
          </p>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {[
            { label: "Ventas rapidas", value: "2 clicks y listo" },
            { label: "Stock claro", value: "Alertas automaticas" },
            { label: "Cierre diario", value: "Resumen en segundos" },
            { label: "Historial", value: "Movimientos auditables" },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-border/70 bg-white/70 px-4 py-3 shadow-[0_12px_26px_rgba(15,23,42,0.06)] backdrop-blur"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                {item.label}
              </p>
              <p className="mt-2 text-sm font-medium text-foreground">{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      <Card className="w-full max-w-[420px] justify-self-center">
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl">Iniciar sesion</CardTitle>
          <CardDescription>
            Usa tu correo y contrasena para entrar al panel.
          </CardDescription>
        </CardHeader>
        <LoginForm />
      </Card>
    </div>
  )
}

export default LoginPage
