import { CalendarDays } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
function HistoryPage() {
  return (
    <div className="space-y-6">
      <Card className="animate-in fade-in slide-in-from-bottom-2 duration-500">
        <CardHeader>
          <CardTitle>Actividad reciente</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <div className="relative w-full md:max-w-[200px]">
              <CalendarDays className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input className="pl-9" type="date" />
            </div>
            <div className="relative w-full md:max-w-[200px]">
              <CalendarDays className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input className="pl-9" type="date" />
            </div>
          </div>
          {[
            {
              title: "Venta registrada",
              detail: "V-2301 - 6 items - $8.900",
              time: "Hace 12 min",
            },
            {
              title: "Reposicion",
              detail: "Ingreso 24u de bebidas",
              time: "Hace 2 h",
            },
            {
              title: "Ajuste de stock",
              detail: "Rotura -2u cargadores",
              time: "Ayer",
            },
          ].map((entry) => (
            <div key={entry.title} className="flex items-start justify-between gap-4">
              <div>
                <p className="font-medium text-foreground">{entry.title}</p>
                <p className="text-xs text-muted-foreground">{entry.detail}</p>
              </div>
              <span className="text-xs text-muted-foreground">{entry.time}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

export default HistoryPage
