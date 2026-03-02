import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
function RestockPage() {
  return (
    <div className="space-y-6">
      <section className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
        <Card className="animate-in fade-in slide-in-from-bottom-2 duration-500">
          <CardHeader>
            <CardTitle>Productos a reponer</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            {[
              { name: "Galletitas surtidas", stock: "3", min: "8" },
              { name: "Coca Cola 500ml", stock: "6", min: "10" },
              { name: "Yerba 500g", stock: "2", min: "6" },
            ].map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between rounded-lg border border-border/60 bg-muted/20 px-3 py-2"
              >
                <div>
                  <p className="font-medium text-foreground">{item.name}</p>
                  <p className="text-xs text-muted-foreground">
                    Stock {item.stock} - Minimo {item.min}
                  </p>
                </div>
                <span className="rounded-full bg-destructive/15 px-2 py-1 text-xs font-semibold text-destructive">
                  Bajo
                </span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="animate-in fade-in slide-in-from-bottom-2 duration-700">
          <CardHeader>
            <CardTitle>Ingreso rapido</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <div className="rounded-lg border border-border/60 bg-muted/20 px-3 py-2">
              Selecciona proveedor y suma items en un solo movimiento.
            </div>
            <div className="rounded-lg border border-border/60 bg-muted/20 px-3 py-2">
              Se registrara en stock_movements via RPC.
            </div>
            <Button variant="outline" className="w-full">
              Cargar mercaderia
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}

export default RestockPage
