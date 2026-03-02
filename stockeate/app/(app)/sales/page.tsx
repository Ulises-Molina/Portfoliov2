import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
function SalesPage() {
  return (
    <div className="space-y-6">
      <section className="grid gap-4 lg:grid-cols-[1.3fr_0.7fr]">
        <Card className="animate-in fade-in slide-in-from-bottom-2 duration-500">
          <CardHeader>
            <CardTitle>Venta rapida</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input placeholder="Buscar por nombre o codigo" />
            <div className="space-y-3">
              {[
                { name: "Coca Cola 500ml", price: "$1500" },
                { name: "Agua mineral 500ml", price: "$900" },
                { name: "Papas fritas clasicas", price: "$1200" },
              ].map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between rounded-lg border border-border/60 bg-muted/20 px-3 py-2"
                >
                  <div>
                    <p className="text-sm font-medium text-foreground">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.price}</p>
                  </div>
                  <Button size="sm" variant="outline">
                    +1
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="animate-in fade-in slide-in-from-bottom-2 duration-700">
          <CardHeader>
            <CardTitle>Carrito</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-foreground">Coca Cola 500ml x2</span>
                <span className="font-semibold">$3000</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-foreground">Papas fritas clasicas x1</span>
                <span className="font-semibold">$1200</span>
              </div>
            </div>
            <div className="flex items-center justify-between border-t border-border/70 pt-3">
              <span className="text-muted-foreground">Total</span>
              <span className="text-lg font-semibold text-foreground">$4200</span>
            </div>
            <Button className="w-full">Cobrar y cerrar</Button>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
        <Card className="animate-in fade-in slide-in-from-bottom-2 duration-500">
          <CardHeader>
            <CardTitle>Ventas recientes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            {[
              { id: "V-2301", total: "$8.900", time: "Hace 12 min", items: 6 },
              { id: "V-2300", total: "$3.200", time: "Hace 35 min", items: 2 },
              { id: "V-2299", total: "$14.500", time: "Hace 1 h", items: 9 },
            ].map((sale) => (
              <div
                key={sale.id}
                className="flex items-center justify-between rounded-lg border border-border/60 bg-muted/20 px-3 py-3"
              >
                <div>
                  <p className="font-medium text-foreground">{sale.id}</p>
                  <p className="text-xs text-muted-foreground">
                    {sale.items} items - {sale.time}
                  </p>
                </div>
                <span className="text-sm font-semibold text-foreground">{sale.total}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="animate-in fade-in slide-in-from-bottom-2 duration-700">
          <CardHeader>
            <CardTitle>Atajos de venta</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <div className="rounded-lg border border-border/60 bg-muted/20 px-3 py-2">
              Venta rapida con productos frecuentes.
            </div>
            <div className="rounded-lg border border-border/60 bg-muted/20 px-3 py-2">
              Atajos por categorias y combos.
            </div>
            <div className="rounded-lg border border-dashed border-border/60 bg-muted/10 px-3 py-2 text-xs">
              Integracion de shortcuts cuando conectemos la DB.
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}

export default SalesPage
