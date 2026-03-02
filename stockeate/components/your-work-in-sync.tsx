import type React from "react"

interface YourWorkInSyncProps {
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
 * Your work, in sync - Sales dashboard
 * Single-file component following the v0-ready pattern used in this repo.
 */
const YourWorkInSync: React.FC<YourWorkInSyncProps> = ({
  width = 482,
  height = 300,
  className = "",
  theme = "dark",
}) => {
  const themeVars =
    theme === "light"
      ? {
          "--yws-surface": "#ffffff",
          "--yws-text-primary": "#0f172a",
          "--yws-text-secondary": "#64748b",
          "--yws-border": "rgba(0,0,0,0.08)",
          "--yws-muted": "rgba(15,23,42,0.04)",
          "--yws-accent": "#1e40af",
        }
      : ({
          "--yws-surface": "#1f2937",
          "--yws-text-primary": "#f9fafb",
          "--yws-text-secondary": "#d1d5db",
          "--yws-border": "rgba(255,255,255,0.12)",
          "--yws-muted": "rgba(255,255,255,0.06)",
          "--yws-accent": "#60a5fa",
        } as React.CSSProperties)

  const quickItems = [
    { name: "Coca Cola 500ml", price: "$1500" },
    { name: "Agua mineral 500ml", price: "$900" },
    { name: "Papas fritas clasicas", price: "$1200" },
  ]

  const cartItems = [
    { name: "Coca Cola 500ml x2", price: "$3000" },
    { name: "Papas fritas clasicas x1", price: "$1200" },
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
          ...themeVars,
        } as React.CSSProperties
      }
      role="img"
      aria-label="Sales dashboard with quick sale and cart summary"
    >
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: "380px",
          height: "220px",
        }}
      >
        <div style={{ width: "420px", height: "220px", position: "relative", transform: "scale(1.05)" }}>
          <div
            style={{
              position: "absolute",
              left: "-20px",
              top: "10px",
              width: "460px",
              height: "200px",
              background: "linear-gradient(135deg, rgba(30,64,175,0.15), rgba(30,64,175,0.02))",
              transform: "skewY(-6deg)",
              borderRadius: "16px",
              filter: "blur(5px)",
              opacity: 0.75,
            }}
          />
          <div
            style={{
              position: "absolute",
              left: "0px",
              top: "0px",
              width: "235px",
              background: "#ffffff",
              borderRadius: "10px",
              padding: "10px",
              boxShadow: "0px 0px 0px 1px rgba(0,0,0,0.08), 0px 6px 16px rgba(0,0,0,0.08)",
            }}
          >
            <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "12px", color: "#0f172a" }}>
              Venta rapida
            </div>
            <div
              style={{
                marginTop: "8px",
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
              Buscar por nombre o codigo
            </div>
            <div style={{ marginTop: "8px", display: "flex", flexDirection: "column", gap: "6px" }}>
              {quickItems.map((item) => (
                <div
                  key={item.name}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    border: "1px solid rgba(15,23,42,0.12)",
                    background: "rgba(15,23,42,0.03)",
                    borderRadius: "8px",
                    padding: "6px 8px",
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  <div>
                    <div style={{ fontSize: "9px", fontWeight: 600, color: "#0f172a" }}>{item.name}</div>
                    <div style={{ fontSize: "8px", color: "#64748b" }}>{item.price}</div>
                  </div>
                  <div
                    style={{
                      fontSize: "8px",
                      fontWeight: 600,
                      color: "#0f172a",
                      border: "1px solid rgba(15,23,42,0.18)",
                      padding: "2px 6px",
                      borderRadius: "6px",
                      background: "#ffffff",
                      boxShadow: "0px 0px 8px rgba(30,64,175,0.16)",
                    }}
                  >
                    +1
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            style={{
              position: "absolute",
              right: "0px",
              top: "0px",
              width: "170px",
              background: "#ffffff",
              borderRadius: "10px",
              padding: "10px",
              boxShadow: "0px 0px 0px 1px rgba(0,0,0,0.08), 0px 6px 12px rgba(0,0,0,0.08)",
            }}
          >
            <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "12px", color: "#0f172a" }}>
              Carrito
            </div>
            <div style={{ marginTop: "8px", display: "flex", flexDirection: "column", gap: "6px" }}>
              {cartItems.map((item) => (
                <div
                  key={item.name}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    fontFamily: "Inter, sans-serif",
                    fontSize: "9px",
                    color: "#0f172a",
                  }}
                >
                  <span>{item.name}</span>
                  <span style={{ fontWeight: 600 }}>{item.price}</span>
                </div>
              ))}
            </div>
            <div
              style={{
                marginTop: "8px",
                paddingTop: "8px",
                borderTop: "1px solid rgba(15,23,42,0.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                fontFamily: "Inter, sans-serif",
                fontSize: "10px",
              }}
            >
              <span style={{ color: "#64748b" }}>Total</span>
              <span style={{ fontWeight: 700, color: "#0f172a" }}>$4200</span>
            </div>
            <div
              style={{
                marginTop: "8px",
                background: "linear-gradient(135deg, #1e40af, #1d4ed8)",
                color: "#ffffff",
                fontFamily: "Inter, sans-serif",
                fontWeight: 600,
                fontSize: "9px",
                textAlign: "center",
                padding: "6px 8px",
                borderRadius: "8px",
                boxShadow: "0px 6px 12px rgba(30,64,175,0.26)",
              }}
            >
              Cobrar y cerrar
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default YourWorkInSync
