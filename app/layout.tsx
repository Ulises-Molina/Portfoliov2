import type React from "react"
import type { Metadata, Viewport } from "next"
import { Space_Grotesk, JetBrains_Mono, Bebas_Neue, Inter } from "next/font/google"
import "./globals.css"
import { Analytics } from "@vercel/analytics/next"
import Script from "next/script"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  weight: ["400", "500", "600", "700"],
  display: "swap",
})

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  variable: "--font-bebas",
  weight: "400",
  display: "swap",
})


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500"],
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
  display: "swap",
})

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0b0d10",
  colorScheme: "dark",
}

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.ulisesmolina.com.ar"

/* ─── SEO ───
   Posicionamiento: búsquedas en español, con intención local (Buenos Aires / Argentina)
   y por servicio (desarrollo web, e-commerce, apps, automatizaciones). */
const TITLE = "Ulises Molina | Desarrollador Web en Buenos Aires"
const DESCRIPTION =
  "Desarrollo de sitios web, e-commerce, apps y automatizaciones con Next.js, React, WordPress, Shopify y n8n. Desarrollador web en Buenos Aires, Argentina."
const SOCIAL_DESCRIPTION =
  "Sitios web, e-commerce, apps y automatizaciones rápidos y optimizados para convertir. Mirá proyectos y escribime por WhatsApp."

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: TITLE,
    template: "%s | Ulises Molina",
  },
  description: DESCRIPTION,
  // Google ignora meta keywords; se dejan como referencia y para otros buscadores
  keywords: [
    "desarrollador web",
    "desarrollador web Buenos Aires",
    "desarrollo web Argentina",
    "diseño de páginas web",
    "desarrollo de e-commerce",
    "tienda online Shopify",
    "desarrollador WordPress",
    "desarrollador Next.js",
    "desarrollador React",
    "automatizaciones n8n",
    "Google Tag Manager GA4",
    "Ulises Molina",
  ],
  authors: [{ name: "Ulises Molina", url: BASE_URL }],
  creator: "Ulises Molina",
  publisher: "Ulises Molina",
  category: "technology",
  formatDetection: { telephone: false, email: false, address: false },
  openGraph: {
    type: "profile",
    firstName: "Ulises",
    lastName: "Molina",
    locale: "es_AR",
    url: BASE_URL,
    siteName: "Ulises Molina",
    title: TITLE,
    description: SOCIAL_DESCRIPTION,
    // La imagen la genera app/opengraph-image.tsx (1200×630)
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: SOCIAL_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  // Para verificar en Google Search Console: NEXT_PUBLIC_GSC_VERIFICATION=<código>
  ...(process.env.NEXT_PUBLIC_GSC_VERIFICATION && {
    verification: { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION },
  }),
  // Íconos: app/favicon.ico, app/icon.svg y app/apple-icon.png (convención de archivos)
}

/* Datos estructurados (schema.org). ProfilePage + Person es lo que Google
   recomienda para páginas personales; ProfessionalService describe los servicios. */
const PERSON_ID = `${BASE_URL}/#person`
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      url: BASE_URL,
      name: "Ulises Molina",
      inLanguage: "es-AR",
      publisher: { "@id": PERSON_ID },
    },
    {
      "@type": "ProfilePage",
      "@id": `${BASE_URL}/#profilepage`,
      url: BASE_URL,
      name: TITLE,
      description: DESCRIPTION,
      inLanguage: "es-AR",
      isPartOf: { "@id": `${BASE_URL}/#website` },
      mainEntity: { "@id": PERSON_ID },
    },
    {
      "@type": "Person",
      "@id": PERSON_ID,
      name: "Ulises Molina",
      url: BASE_URL,
      image: `${BASE_URL}/opengraph-image`,
      jobTitle: "Desarrollador Web",
      description:
        "Desarrollador web en Buenos Aires. Sitios, e-commerce, apps y automatizaciones con Next.js, React, WordPress, Shopify y n8n.",
      email: "mailto:ulisesmolinadev@gmail.com",
      address: { "@type": "PostalAddress", addressLocality: "Buenos Aires", addressCountry: "AR" },
      worksFor: { "@type": "Organization", name: "Qualita Studio" },
      knowsLanguage: ["es", "en"],
      sameAs: [
        "https://github.com/Ulises-Molina",
        "https://www.linkedin.com/in/ulises-rafael-molina/",
      ],
      knowsAbout: [
        "Desarrollo web", "E-commerce", "Automatización de procesos", "SEO técnico", "Analítica web",
        "JavaScript", "TypeScript", "React", "Next.js", "Node.js", "Tailwind CSS",
        "WordPress", "Shopify", "WooCommerce", "n8n", "Google Tag Manager", "Google Analytics 4",
      ],
    },
    {
      "@type": "ProfessionalService",
      "@id": `${BASE_URL}/#service`,
      name: "Ulises Molina — Desarrollo web y automatizaciones",
      url: BASE_URL,
      image: `${BASE_URL}/opengraph-image`,
      description: DESCRIPTION,
      founder: { "@id": PERSON_ID },
      address: { "@type": "PostalAddress", addressLocality: "Buenos Aires", addressCountry: "AR" },
      areaServed: [{ "@type": "Country", name: "Argentina" }, "Remoto"],
      availableLanguage: ["es", "en"],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Servicios",
        itemListElement: [
          ["Desarrollo web", "Landings, sitios corporativos y e-commerce rápidos, responsive y optimizados para convertir."],
          ["Automatizaciones", "Integraciones a medida con n8n, Zapier y APIs que eliminan tareas manuales."],
          ["Desarrollo de apps", "Web apps, dashboards y herramientas internas con React, Next.js y Supabase."],
          ["Tracking y analítica", "Configuración de GA4, Google Tag Manager, Meta Pixel y Google Ads."],
        ].map(([name, description]) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name, description },
        })),
      },
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es-AR" suppressHydrationWarning>
      <head>
        {/* Pre-oculta el hero hasta que GSAP arranque la intro. Red de seguridad: si el JS
            no llega a correr, a los 8s se quita la clase y el contenido queda visible. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(d){var h=d.documentElement;if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;h.classList.add("js-anim");setTimeout(function(){if(!window.__heroReady)h.classList.remove("js-anim")},8000)})(document)`,
          }}
        />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        {/* JSON-LD como <script> plano: así queda en el HTML inicial (next/script lo inyecta por JS) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-57WR95TV');
            `,
          }}
        />
      </head>
      <body className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} ${bebasNeue.variable} ${inter.variable} font-sans`}>
        <a href="#hero" className="skip-to-content">Saltar al contenido</a>
        {children}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-57WR95TV"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <Analytics />
      </body>
    </html>
  )
}
