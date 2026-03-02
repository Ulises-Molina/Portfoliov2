import ProtectedRoute from "@/components/auth/protected-route"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const RANGES = [
  { value: "day", label: "Dia" },
  { value: "week", label: "Semana" },
  { value: "month", label: "Mes" },
  { value: "year", label: "Año" },
] as const

const KPI_METRICS = [
  { label: "Ventas netas", value: "$245.300", delta: "+12%" },
  { label: "Ticket promedio", value: "$3.890", delta: "+4%" },
  { label: "Tickets", value: "63", delta: "+9" },
  { label: "Descuentos", value: "$3.500", delta: "-2%" },
]

const TOP_CATEGORIES = [
  { name: "Bebidas", share: "38%" },
  { name: "Golosinas", share: "24%" },
  { name: "Almacen", share: "18%" },
  { name: "Lacteos", share: "12%" },
]

function ReportsPage() {
  return (
    <ProtectedRoute>
      <div className="space-y-6">
        <section className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Reportes</h1>
            <p className="text-sm text-muted-foreground">
              Vista general de ventas, tickets y tendencias. Datos simulados para el MVP.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            {[
              "Medio: Efectivo + QR",
            ].map((filter) => (
              <span key={filter} className="rounded-full border border-border/70 bg-muted/30 px-3 py-1">
                {filter}
              </span>
            ))}
          </div>
        </section>

        <Tabs defaultValue="month" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 sm:w-[360px]">
            {RANGES.map((range) => (
              <TabsTrigger key={range.value} value={range.value}>
                {range.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {RANGES.map((range) => (
            <TabsContent key={range.value} value={range.value} className="space-y-6">
              <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {KPI_METRICS.map((metric) => (
                  <Card key={`${range.value}-${metric.label}`} className="animate-in fade-in slide-in-from-bottom-2">
                    <CardHeader>
                      <CardTitle className="text-sm font-medium text-muted-foreground">{metric.label}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-1">
                      <p className="text-2xl font-semibold text-foreground">{metric.value}</p>
                      <p className="text-xs text-muted-foreground">{metric.delta} vs periodo anterior</p>
                    </CardContent>
                  </Card>
                ))}
              </section>

              <section className="grid gap-4 lg:grid-cols-[1.4fr_0.9fr]">
                <Card className="relative overflow-hidden">
                  <CardHeader>
                    <CardTitle>Ventas netas</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="relative h-56 w-full overflow-hidden rounded-xl border border-border/70 bg-gradient-to-br from-primary/5 via-transparent to-muted/40">
                      <div className="absolute inset-0 grid grid-cols-6 gap-x-2 px-4 py-5">
                        {Array.from({ length: 6 }).map((_, index) => (
                          <div key={index} className="h-full border-l border-dashed border-border/50" />
                        ))}
                      </div>
                      <svg viewBox="0 0 400 200" className="absolute inset-0 h-full w-full">
                        <defs>
                          <linearGradient id="reportesLinea" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0%" stopColor="#1E40AF" stopOpacity="0.35" />
                            <stop offset="100%" stopColor="#1E40AF" stopOpacity="0" />
                          </linearGradient>
                        </defs>
                        <path
                          d="M0,130 C40,110 80,120 120,98 C160,76 200,84 240,70 C280,56 320,40 360,48 C380,52 392,60 400,66 L400,200 L0,200 Z"
                          fill="url(#reportesLinea)"
                        />
                        <path
                          d="M0,130 C40,110 80,120 120,98 C160,76 200,84 240,70 C280,56 320,40 360,48 C380,52 392,60 400,66"
                          fill="none"
                          stroke="#1E40AF"
                          strokeWidth="3"
                        />
                      </svg>
                      <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full border border-border/60 bg-background/80 px-3 py-1 text-xs text-muted-foreground">
                        Pico de ventas a las 18:30
                      </div>
                    </div>
                    <div className="grid gap-3 text-xs text-muted-foreground sm:grid-cols-3">
                      {[
                        "Ticket promedio +4%",
                        "Conversion de visitas 62%",
                        "Productos por ticket: 2.3",
                      ].map((item) => (
                        <div key={item} className="rounded-lg border border-border/60 bg-muted/30 px-3 py-2">
                          {item}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Ventas por hora</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      {[
                        { label: "10-12", value: 40 },
                        { label: "12-14", value: 62 },
                        { label: "14-16", value: 48 },
                        { label: "16-18", value: 75 },
                        { label: "18-20", value: 90 },
                      ].map((bar) => (
                        <div key={bar.label} className="flex items-center gap-3">
                          <span className="w-12 text-xs text-muted-foreground">{bar.label}</span>
                          <div className="h-2 flex-1 rounded-full bg-muted/40">
                            <div className="h-full rounded-full bg-primary" style={{ width: `${bar.value}%` }} />
                          </div>
                          <span className="w-8 text-xs text-muted-foreground">{bar.value}%</span>
                        </div>
                      ))}
                    </div>
                    <div className="rounded-lg border border-dashed border-border/70 bg-muted/20 px-3 py-2 text-xs text-muted-foreground">
                      Ajusta los turnos con mayor demanda segun este rango.
                    </div>
                  </CardContent>
                </Card>
              </section>

              <section className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
                <Card>
                  <CardHeader>
                    <CardTitle>Mix por categoria</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-6">
                      <div className="relative h-32 w-32">
                        <div className="absolute inset-0 rounded-full border-[10px] border-primary/20" />
                        <div className="absolute inset-2 rounded-full border-[10px] border-primary/60" />
                        <div className="absolute inset-6 rounded-full border-[10px] border-primary/90" />
                        <div className="absolute inset-0 flex items-center justify-center text-xs text-muted-foreground">
                          Top 3
                        </div>
                      </div>
                      <div className="space-y-2">
                        {TOP_CATEGORIES.map((category) => (
                          <div key={category.name} className="flex items-center justify-between gap-6 text-sm">
                            <span className="text-foreground">{category.name}</span>
                            <span className="text-xs text-muted-foreground">{category.share}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="rounded-lg border border-border/60 bg-muted/20 px-3 py-2 text-xs text-muted-foreground">
                      Las bebidas explican la mayor parte del ticket promedio.
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Resumen operativo</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm text-muted-foreground">
                    {[
                      "Picos de demanda entre 17:00 y 19:30.",
                      "Mayor conversion en combos y snacks.",
                      "Promedio de venta por turno estable.",
                    ].map((item) => (
                      <div key={item} className="rounded-lg border border-border/60 bg-muted/30 px-3 py-2">
                        {item}
                      </div>
                    ))}
                    <div className="rounded-lg border border-dashed border-border/70 bg-muted/20 px-3 py-2 text-xs">
                      Proxima integracion: reportes automaticos con Supabase.
                    </div>
                  </CardContent>
                </Card>
              </section>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </ProtectedRoute>
  )
}

export default ReportsPage
