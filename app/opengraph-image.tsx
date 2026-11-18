import { ImageResponse } from "next/og"

/* Imagen para compartir en redes / WhatsApp / LinkedIn (1200×630).
   Next la sirve en /opengraph-image y agrega las meta og:image y twitter:image solo. */

export const alt = "Ulises Molina — Desarrollador web en Buenos Aires"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

const ACCENT = "#18d4a4" // hsl(165 80% 48%)
const SERVICES = ["Sitios web", "E-commerce", "Apps", "Automatizaciones"]

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#0b0d10",
          backgroundImage: `radial-gradient(circle at 85% 110%, rgba(24,212,164,0.28), transparent 55%), radial-gradient(circle at 0% 0%, rgba(255,255,255,0.06), transparent 50%)`,
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        {/* Marca */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", fontSize: 30, fontWeight: 700, letterSpacing: -0.5 }}>
            ULISES<span style={{ color: ACCENT }}>.</span>M
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 22, color: "rgba(255,255,255,0.6)" }}>
            <div style={{ width: 10, height: 10, borderRadius: 10, background: ACCENT }} />
            Disponible para nuevos proyectos
          </div>
        </div>

        {/* Titular */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 24, letterSpacing: 6, color: "rgba(255,255,255,0.5)" }}>
            <div style={{ width: 48, height: 2, background: ACCENT }} />
            ULISES MOLINA
          </div>
          <div style={{ display: "flex", marginTop: 20, fontSize: 92, fontWeight: 700, lineHeight: 1, letterSpacing: -3 }}>
            Desarrollador web<span style={{ color: ACCENT }}>.</span>
          </div>
          <div style={{ display: "flex", gap: 14, marginTop: 36 }}>
            {SERVICES.map((s) => (
              <div key={s} style={{ display: "flex", padding: "10px 22px", borderRadius: 999, border: "1.5px solid rgba(255,255,255,0.18)", fontSize: 24, color: "rgba(255,255,255,0.8)" }}>
                {s}
              </div>
            ))}
          </div>
        </div>

        {/* Pie */}
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, color: "rgba(255,255,255,0.45)" }}>
          <div style={{ display: "flex" }}>Next.js · React · WordPress · Shopify · n8n</div>
          <div style={{ display: "flex" }}>Buenos Aires, Argentina</div>
        </div>
      </div>
    ),
    size,
  )
}
