import { MoreHorizontal, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
function ProductsPage() {
  return (
    <div className="space-y-6">
      <Card className="animate-in fade-in slide-in-from-bottom-2 duration-500">
        <CardHeader>
          <CardTitle>Catalogo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="relative w-full md:max-w-sm">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input className="pl-9" placeholder="Filtrar por nombre, codigo o categoria" />
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="rounded-full border border-border/70 bg-muted/40 px-2 py-1">
                8 productos
              </span>
              <span className="rounded-full border border-border/70 bg-muted/40 px-2 py-1">
                2 con stock bajo
              </span>
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Producto</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Costo</TableHead>
                <TableHead>Precio</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                {
                  name: "Coca Cola 500ml",
                  code: "7790895000034",
                  category: "Bebidas",
                  cost: "$450",
                  price: "$700",
                  stock: "48 / 20",
                  status: "ok",
                },
                {
                  name: "Pepsi 500ml",
                  code: "7791813420019",
                  category: "Bebidas",
                  cost: "$420",
                  price: "$650",
                  stock: "36 / 20",
                  status: "ok",
                },
                {
                  name: "Sprite 500ml",
                  code: "7790895001505",
                  category: "Bebidas",
                  cost: "$430",
                  price: "$680",
                  stock: "24 / 15",
                  status: "ok",
                },
                {
                  name: "Agua Mineral 500ml",
                  code: "7790895640015",
                  category: "Bebidas",
                  cost: "$200",
                  price: "$350",
                  stock: "60 / 30",
                  status: "ok",
                },
                {
                  name: "Alfajor Havanna",
                  code: "7790111000116",
                  category: "Golosinas",
                  cost: "$380",
                  price: "$600",
                  stock: "15 / 10",
                  status: "ok",
                },
                {
                  name: "Alfajor Jorgito",
                  code: "7790040117013",
                  category: "Golosinas",
                  cost: "$150",
                  price: "$280",
                  stock: "8 / 15",
                  status: "low",
                },
                {
                  name: "Chicle Beldent x3",
                  code: "7622300299873",
                  category: "Golosinas",
                  cost: "$180",
                  price: "$300",
                  stock: "25 / 20",
                  status: "ok",
                },
                {
                  name: "Caramelos Flynn Paff",
                  code: "7790580301507",
                  category: "Golosinas",
                  cost: "$50",
                  price: "$100",
                  stock: "40 / 30",
                  status: "ok",
                },
              ].map((item) => (
                <TableRow key={item.code}>
                  <TableCell>
                    <div className="space-y-1">
                      <p className="font-medium text-foreground">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.code}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{item.category}</TableCell>
                  <TableCell>{item.cost}</TableCell>
                  <TableCell>{item.price}</TableCell>
                  <TableCell className="text-muted-foreground">{item.stock}</TableCell>
                  <TableCell>
                    <span
                      className={
                        item.status === "ok"
                          ? "rounded-full bg-success/15 px-2 py-1 text-xs font-semibold text-success"
                          : "rounded-full bg-destructive/15 px-2 py-1 text-xs font-semibold text-destructive"
                      }
                    >
                      {item.status === "ok" ? "OK" : "Stock bajo"}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" aria-label="Acciones">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

export default ProductsPage
