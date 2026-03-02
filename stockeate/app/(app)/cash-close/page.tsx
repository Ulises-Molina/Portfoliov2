import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
function CashClosePage() {
  return (
    <div className="space-y-6">
      <section className="grid gap-4 lg:grid-cols-3">
        {[
          { label: "Ventas en efectivo", value: "$185.400" },
          { label: "Ventas con QR", value: "$59.900" },
          { label: "Tickets totales", value: "63" },
        ].map((item) => (
          <Card key={item.label} className="animate-in fade-in slide-in-from-bottom-2 duration-500">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">{item.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold text-foreground">{item.value}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <Card className="animate-in fade-in slide-in-from-bottom-2 duration-700">
        <CardHeader>
          <CardTitle>Detalle del dia</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>Hora de apertura: 08:00</p>
          <p>Hora de cierre estimada: 21:30</p>
          <p>Descuentos aplicados: $3.500</p>
          <p>Devoluciones: $0</p>
        </CardContent>
      </Card>
    </div>
  )
}

export default CashClosePage
