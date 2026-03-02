import type React from "react"

interface NumbersThatSpeakProps {
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
 * Numbers that speak - Cash close summary
 * Layered cards with a compact cash-close snapshot.
 */
const NumbersThatSpeak: React.FC<NumbersThatSpeakProps> = ({
  width = 482,
  height = 300,
  className = "",
  theme = "dark",
}) => {
  const themeVars =
    theme === "light"
      ? {
          "--nts-surface": "#ffffff",
          "--nts-text-primary": "#0f172a",
          "--nts-text-secondary": "#64748b",
          "--nts-border": "rgba(15,23,42,0.12)",
          "--nts-shadow": "rgba(15,23,42,0.08)",
        }
      : ({
          "--nts-surface": "#ffffff",
          "--nts-text-primary": "#0f172a",
          "--nts-text-secondary": "#64748b",
          "--nts-border": "rgba(15,23,42,0.12)",
          "--nts-shadow": "rgba(15,23,42,0.08)",
        } as React.CSSProperties)

  const stats = [
    { label: "Ventas en efectivo", value: "$185.400" },
    { label: "Ventas con QR", value: "$59.900" },
    { label: "Tickets totales", value: "63" },
  ]

  const details = [
    "Hora de apertura: 08:00",
    "Hora de cierre estimada: 21:30",
    "Descuentos aplicados: $3.500",
    "Devoluciones: $0",
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
      aria-label="Cash close dashboard with totals and day details"
    >
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: "360px",
          height: "230px",
        }}
      >
        <div style={{ position: "relative", width: "360px", height: "230px" }}>
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "20px",
              transform: "translateX(-50%)",
              width: "300px",
              height: "180px",
              background: "#ffffff",
              borderRadius: "10px",
              border: "1px solid var(--nts-border)",
              boxShadow: "0px 10px 18px rgba(15,23,42,0.06)",
              opacity: 0.45,
            }}
          />
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "10px",
              transform: "translateX(-50%)",
              width: "330px",
              height: "200px",
              background: "#ffffff",
              borderRadius: "11px",
              border: "1px solid var(--nts-border)",
              boxShadow: "0px 12px 20px rgba(15,23,42,0.08)",
              opacity: 0.7,
            }}
          />
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "0px",
              transform: "translateX(-50%)",
              width: "360px",
              height: "230px",
              background: "#ffffff",
              borderRadius: "12px",
              border: "1px solid var(--nts-border)",
              boxShadow: "0px 14px 26px rgba(15,23,42,0.12)",
              padding: "14px",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              boxSizing: "border-box",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "12px", color: "#0f172a" }}>
                Cierre de caja
              </div>
              <div
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "8px",
                  color: "#64748b",
                  border: "1px solid rgba(15,23,42,0.12)",
                  padding: "2px 6px",
                  borderRadius: "999px",
                }}
              >
                Hoy
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px" }}>
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  style={{
                    border: "1px solid rgba(15,23,42,0.12)",
                    borderRadius: "10px",
                    padding: "8px",
                    background: "rgba(15,23,42,0.03)",
                    minHeight: "54px",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "8px",
                      color: "#64748b",
                      marginBottom: "6px",
                    }}
                  >
                    {stat.label}
                  </div>
                  <div
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "#0f172a",
                    }}
                  >
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ position: "relative", height: "14px" }}>
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  top: "6px",
                  borderTop: "1px dashed rgba(15,23,42,0.18)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  left: "-7px",
                  top: "0px",
                  width: "14px",
                  height: "14px",
                  borderRadius: "999px",
                  background: "#F7F5F3",
                  border: "1px solid rgba(15,23,42,0.12)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  right: "-7px",
                  top: "0px",
                  width: "14px",
                  height: "14px",
                  borderRadius: "999px",
                  background: "#F7F5F3",
                  border: "1px solid rgba(15,23,42,0.12)",
                }}
              />
            </div>

            <div
              style={{
                paddingTop: "2px",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "6px 12px",
                backgroundImage:
                  "linear-gradient(to bottom, rgba(15,23,42,0.05) 0, rgba(15,23,42,0.05) 1px, transparent 1px, transparent 12px)",
                backgroundSize: "100% 12px",
              }}
            >
              {details.map((item) => (
                <div
                  key={item}
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "8px",
                    color: "#64748b",
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NumbersThatSpeak
