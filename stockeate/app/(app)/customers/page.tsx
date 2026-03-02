import { Search } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
function CustomersPage() {
  return (
    <div className="space-y-6">
      <Card className="animate-in fade-in slide-in-from-bottom-2 duration-500">
        <CardHeader>
          <CardTitle>Clientes activos</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <div className="relative w-full md:max-w-sm">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input className="pl-9" placeholder="Filtrar por nombre o email" />
          </div>
          {[
            { name: "Maria Torres", email: "maria@mail.com", last: "Hace 2 dias" },
            { name: "Juan Perez", email: "juan@mail.com", last: "Hace 1 semana" },
            { name: "Distribuidora Plaza", email: "contacto@plaza.com", last: "Hace 3 semanas" },
          ].map((item) => (
            <div
              key={item.email}
              className="flex flex-col gap-2 rounded-lg border border-border/60 bg-muted/20 px-3 py-3 md:flex-row md:items-center md:justify-between"
            >
              <div>
                <p className="font-medium text-foreground">{item.name}</p>
                <p className="text-xs text-muted-foreground">{item.email}</p>
              </div>
              <span className="text-xs text-muted-foreground">Ultima compra: {item.last}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

export default CustomersPage
