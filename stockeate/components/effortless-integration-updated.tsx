import type React from "react"

interface EffortlessIntegrationProps {
  /** Fixed width from Figma: 482px */
  width?: number | string
  /** Fixed height from Figma: 300px */
  height?: number | string
  /** Optional className to pass to root */
  className?: string
}

/**
 * Effortless Integration - Reports mini dashboard
 */
const EffortlessIntegration: React.FC<EffortlessIntegrationProps> = ({ width = 482, height = 300, className = "" }) => {
  const ranges = ["Dia", "Semana", "Mes", "Ano"]
  const highlights = [
    { label: "Ventas netas", value: "$245.300" },
    { label: "Ticket prom.", value: "$3.890" },
  ]

  return (
    <div
      className={className}
      style={{
        width,
        height,
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "transparent",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "360px",
          height: "220px",
          transform: "scale(1.05)",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: "0px",
            top: "0px",
            width: "320px",
            background: "#ffffff",
            borderRadius: "12px",
            padding: "12px",
            boxShadow: "0px 0px 0px 1px rgba(0,0,0,0.08), 0px 10px 20px rgba(15,23,42,0.12)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(135deg, rgba(30,64,175,0.08), rgba(255,255,255,0))",
              pointerEvents: "none",
            }}
          />

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "10px",
            }}
          >
            <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "12px", color: "#0f172a" }}>
              Reportes
            </div>
            <div style={{ display: "flex", gap: "6px" }}>
              {ranges.map((range, index) => (
                <div
                  key={range}
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "8px",
                    color: index === 2 ? "#1e40af" : "#94a3b8",
                    border: "1px solid rgba(15,23,42,0.12)",
                    background: index === 2 ? "rgba(30,64,175,0.12)" : "rgba(15,23,42,0.03)",
                    padding: "2px 6px",
                    borderRadius: "999px",
                  }}
                >
                  {range}
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1.4fr 0.9fr", gap: "10px" }}>
            <div
              style={{
                position: "relative",
                height: "110px",
                borderRadius: "10px",
                border: "1px solid rgba(15,23,42,0.1)",
                background: "rgba(15,23,42,0.02)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: "10px",
                  borderTop: "1px dashed rgba(15,23,42,0.12)",
                  borderBottom: "1px dashed rgba(15,23,42,0.12)",
                }}
              />
              <svg viewBox="0 0 200 120" style={{ position: "absolute", inset: 0 }}>
                <defs>
                  <linearGradient id="miniReportFill" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#1E40AF" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#1E40AF" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0,85 C30,65 60,78 90,60 C120,42 150,46 175,30 C185,24 192,22 200,20 L200,120 L0,120 Z"
                  fill="url(#miniReportFill)"
                />
                <path
                  d="M0,85 C30,65 60,78 90,60 C120,42 150,46 175,30 C185,24 192,22 200,20"
                  fill="none"
                  stroke="#1E40AF"
                  strokeWidth="3"
                />
              </svg>
              <div
                style={{
                  position: "absolute",
                  bottom: "10px",
                  left: "10px",
                  display: "flex",
                  gap: "6px",
                }}
              >
                {[40, 62, 48, 75, 90].map((value, index) => (
                  <div
                    key={`${value}-${index}`}
                    style={{
                      width: "8px",
                      height: `${value * 0.6}px`,
                      background: "rgba(30,64,175,0.35)",
                      borderRadius: "3px",
                      alignSelf: "flex-end",
                    }}
                  />
                ))}
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {highlights.map((item) => (
                <div
                  key={item.label}
                  style={{
                    border: "1px solid rgba(15,23,42,0.12)",
                    borderRadius: "10px",
                    padding: "8px",
                    background: "rgba(15,23,42,0.03)",
                  }}
                >
                  <div style={{ fontFamily: "Inter, sans-serif", fontSize: "8px", color: "#64748b" }}>
                    {item.label}
                  </div>
                  <div
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "12px",
                      fontWeight: 600,
                      color: "#0f172a",
                      marginTop: "6px",
                    }}
                  >
                    {item.value}
                  </div>
                </div>
              ))}
              <div
                style={{
                  border: "1px dashed rgba(15,23,42,0.12)",
                  borderRadius: "10px",
                  padding: "8px",
                  fontFamily: "Inter, sans-serif",
                  fontSize: "8px",
                  color: "#94a3b8",
                }}
              >
                Pico: 18:30
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EffortlessIntegration
