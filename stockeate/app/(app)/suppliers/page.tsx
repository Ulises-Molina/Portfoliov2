import { Search } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
function SuppliersPage() {
  return (
    <div className="space-y-6">
      <Card className="animate-in fade-in slide-in-from-bottom-2 duration-500">
        <CardHeader>
          <CardTitle>Proveedores activos</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <div className="relative w-full md:max-w-sm">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input className="pl-9" placeholder="Filtrar por nombre o email" />
          </div>
          {[
            { name: "Distribuidora Norte", email: "ventas@norte.com", status: "Activo" },
            { name: "Bebidas Sur", email: "hola@bebidassur.com", status: "Activo" },
            { name: "Snacks Central", email: "central@snacks.com", status: "Pendiente" },
          ].map((item) => (
            <div
              key={item.email}
              className="flex flex-col gap-2 rounded-lg border border-border/60 bg-muted/20 px-3 py-3 md:flex-row md:items-center md:justify-between"
            >
              <div>
                <p className="font-medium text-foreground">{item.name}</p>
                <p className="text-xs text-muted-foreground">{item.email}</p>
              </div>
              <span
                className={
                  item.status === "Activo"
                    ? "rounded-full bg-success/15 px-2 py-1 text-xs font-semibold text-success"
                    : "rounded-full bg-warning/15 px-2 py-1 text-xs font-semibold text-warning"
                }
              >
                {item.status}
              </span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

export default SuppliersPage
