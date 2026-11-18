import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Ulises Molina — Desarrollador Web",
    short_name: "Ulises Molina",
    description: "Sitios web, e-commerce, apps y automatizaciones. Desarrollador web en Buenos Aires.",
    start_url: "/",
    display: "browser",
    lang: "es-AR",
    background_color: "#0b0d10",
    theme_color: "#0b0d10",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  }
}
