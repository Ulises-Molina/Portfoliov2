import type React from "react"

interface SmartSimpleBrilliantProps {
  /** Fixed width from Figma: 482px */
  width?: number | string
  /** Fixed height from Figma: 300px */
  height?: number | string
  /** Optional className to pass to root */
  className?: string
  /** Theme palette */
  theme?: "light" | "dark"
}

/**
 * Smart - Simple - Brilliant - Products dashboard
 * Single-file component following the v0-ready pattern used in this repo.
 */
const SmartSimpleBrilliant: React.FC<SmartSimpleBrilliantProps> = ({
  width = 482,
  height = 300,
  className = "",
  theme = "dark",
}) => {
  // Design tokens (derived from Figma local variables)
  const themeVars =
    theme === "light"
      ? {
          "--ssb-surface": "#ffffff",
          "--ssb-text": "#1b1919",
          "--ssb-border": "rgba(0,0,0,0.08)",
          "--ssb-inner-border": "rgba(0,0,0,0.12)",
          "--ssb-shadow": "rgba(0,0,0,0.12)",
        }
      : ({
          "--ssb-surface": "#333937",
          "--ssb-text": "#f8f8f8",
          "--ssb-border": "rgba(255,255,255,0.16)",
          "--ssb-inner-border": "rgba(255,255,255,0.12)",
          "--ssb-shadow": "rgba(0,0,0,0.28)",
        } as React.CSSProperties)

  const rows = [
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
      name: "Alfajor Jorgito",
      code: "7790040117013",
      category: "Golosinas",
      cost: "$150",
      price: "$280",
      stock: "8 / 15",
      status: "low",
    },
  ]

  return (
    <div
      className={className}
      style={
        {
          width,
          height,
          position: "relative",
          background: "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          ...themeVars,
        } as React.CSSProperties
      }
      role="img"
      aria-label="Products catalog dashboard with search and status chips"
    >
      <div
        style={{
          position: "relative",
          width: "360px",
          height: "220px",
          transform: "scale(1.08)",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: "-10px",
            top: "20px",
            width: "220px",
            height: "140px",
            background: "linear-gradient(135deg, rgba(30,64,175,0.22), rgba(30,64,175,0))",
            filter: "blur(18px)",
            borderRadius: "999px",
            opacity: 0.7,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "0px",
            top: "0px",
            width: "320px",
            background: "#ffffff",
            borderRadius: "10px",
            padding: "12px",
            boxShadow: "0px 0px 0px 1px rgba(0,0,0,0.08), 0px 6px 16px rgba(0,0,0,0.08)",
          }}
        >
          <div
            style={{
              background: "rgba(255,255,255,0.9)",
              backdropFilter: "blur(6px)",
              border: "1px solid rgba(15,23,42,0.08)",
              borderRadius: "10px",
              padding: "8px",
              marginBottom: "10px",
              boxShadow: "0px 6px 12px rgba(15,23,42,0.08)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "12px", color: "#1b1919" }}>
                Catalogo
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "8px",
                    color: "#475569",
                    border: "1px solid rgba(15,23,42,0.12)",
                    background: "rgba(15,23,42,0.03)",
                    padding: "2px 6px",
                    borderRadius: "999px",
                  }}
                >
                  8 productos
                </span>
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "8px",
                    color: "#475569",
                    border: "1px solid rgba(15,23,42,0.12)",
                    background: "rgba(15,23,42,0.03)",
                    padding: "2px 6px",
                    borderRadius: "999px",
                  }}
                >
                  2 con stock bajo
                </span>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginTop: "8px",
              }}
            >
              <div
                style={{
                  flex: 1,
                  height: "20px",
                  borderRadius: "8px",
                  border: "1px solid rgba(0,0,0,0.08)",
                  background: "#f8fafc",
                  display: "flex",
                  alignItems: "center",
                  padding: "0 8px",
                  fontFamily: "Inter, sans-serif",
                  fontSize: "8px",
                  color: "#94a3b8",
                }}
              >
                Filtrar por nombre, codigo o categoria
              </div>
              <div
                style={{
                  width: "22px",
                  height: "20px",
                  borderRadius: "8px",
                  background: "#1e40af",
                  boxShadow: "0px 0px 10px rgba(30,64,175,0.35)",
                }}
              />
            </div>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.4fr 0.8fr 0.6fr 0.6fr 0.6fr",
              fontFamily: "Inter, sans-serif",
              fontSize: "8px",
              color: "#64748b",
              marginBottom: "6px",
            }}
          >
            <div>Producto</div>
            <div>Categoria</div>
            <div>Costo</div>
            <div>Precio</div>
            <div>Estado</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {rows.map((row) => {
              const isLow = row.status === "low"
              return (
                <div
                  key={row.code}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1.4fr 0.8fr 0.6fr 0.6fr 0.6fr",
                    alignItems: "center",
                    fontFamily: "Inter, sans-serif",
                    fontSize: "8px",
                    color: "#1b1919",
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
                    <div style={{ fontWeight: 600 }}>{row.name}</div>
                    <div style={{ fontSize: "7px", color: "#94a3b8" }}>{row.code}</div>
                  </div>
                  <div style={{ color: "#64748b" }}>{row.category}</div>
                  <div>{row.cost}</div>
                  <div>{row.price}</div>
                  <div
                    style={{
                      fontSize: "7px",
                      fontWeight: 700,
                      textAlign: "left",
                      color: isLow ? "#b91c1c" : "#15803d",
                      background: isLow ? "rgba(185,28,28,0.12)" : "rgba(21,128,61,0.12)",
                      padding: "2px 6px",
                      borderRadius: "999px",
                      width: "fit-content",
                    }}
                  >
                    {isLow ? "Bajo" : "OK"}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SmartSimpleBrilliant
