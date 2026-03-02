import ProtectedRoute from "@/components/auth/protected-route"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
function DashboardPage() {
  return (
    <ProtectedRoute>
      <div className="space-y-6">
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            { label: "Ventas hoy", value: "$245.300", delta: "+12% vs ayer" },
            { label: "Ventas mes", value: "$3.2M", delta: "+8% vs mes anterior" },
            { label: "Productos bajos", value: "18", delta: "Reponer pronto" },
            { label: "Stock activo", value: "1.284", delta: "Items en catalogo" },
          ].map((metric) => (
            <Card key={metric.label} className="animate-in fade-in slide-in-from-bottom-2 duration-500">
              <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">{metric.label}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-1">
                <p className="text-2xl font-semibold text-foreground">{metric.value}</p>
                <p className="text-xs text-muted-foreground">{metric.delta}</p>
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
          <Card className="animate-in fade-in slide-in-from-bottom-2 duration-500">
            <CardHeader>
              <CardTitle>Alertas y reposicion</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center justify-between rounded-lg border border-border/60 bg-muted/30 px-3 py-2">
                <div>
                  <p className="font-medium text-foreground">Galletitas surtidas</p>
                  <p>Stock actual 3u - Minimo 8u</p>
                </div>
                <span className="rounded-full bg-destructive/15 px-2 py-1 text-xs font-semibold text-destructive">
                  Reponer
                </span>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-border/60 bg-muted/30 px-3 py-2">
                <div>
                  <p className="font-medium text-foreground">Coca Cola 500ml</p>
                  <p>Stock actual 6u - Minimo 10u</p>
                </div>
                <span className="rounded-full bg-destructive/15 px-2 py-1 text-xs font-semibold text-destructive">
                  Reponer
                </span>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-border/60 bg-muted/30 px-3 py-2">
                <div>
                  <p className="font-medium text-foreground">Cargadores USB</p>
                  <p>Stock actual 12u - Minimo 5u</p>
                </div>
                <span className="rounded-full bg-success/15 px-2 py-1 text-xs font-semibold text-success">
                  Ok
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-in fade-in slide-in-from-bottom-2 duration-700">
            <CardHeader>
              <CardTitle>Top productos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              {["Agua mineral 500ml", "Papas fritas clasicas", "Cigarrillos 20u"].map((item, index) => (
                <div key={item} className="flex items-center justify-between">
                  <span className="text-foreground">{item}</span>
                  <span className="text-xs text-muted-foreground">#{index + 1}</span>
                </div>
              ))}
              <div className="rounded-lg border border-dashed border-border/60 bg-muted/20 px-3 py-2 text-xs">
                Proxima integracion: ventas en tiempo real desde Supabase.
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </ProtectedRoute>
  )
}

export default DashboardPage
