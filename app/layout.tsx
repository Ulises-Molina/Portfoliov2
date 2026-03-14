import type React from "react"
import type { Metadata } from "next"
import { Space_Grotesk, JetBrains_Mono, Bebas_Neue, Cormorant_Garamond } from "next/font/google"
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

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400"],
  style: ["italic"],
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
  display: "swap",
})

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ulisesmolina.vercel.app"

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Ulises Molina — Software Dev",
    template: "%s | Ulises Molina",
  },
  description:
    "Desarrollador especializado en React, Next.js y TypeScript. Creando experiencias digitales excepcionales. Basado en Buenos Aires, Argentina.",
  keywords: [
    "frontend developer",
    "react",
    "next.js",
    "typescript",
    "web developer",
    "portfolio",
    "buenos aires",
    "argentina",
    "ulises molina",
    "tailwind css",
    "javascript",
  ],
  authors: [{ name: "Ulises Molina", url: BASE_URL }],
  creator: "Ulises Molina",
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: BASE_URL,
    siteName: "Ulises Molina — Frontend Developer",
    title: "Ulises Molina — Frontend Developer",
    description:
      "Frontend Developer especializado en React, Next.js y TypeScript. Creando experiencias digitales excepcionales.",
    images: [
      {
        url: "/origin.jpeg",
        width: 1200,
        height: 630,
        alt: "Ulises Molina — Frontend Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ulises Molina — Frontend Developer",
    description:
      "Frontend Developer especializado en React, Next.js y TypeScript. Creando experiencias digitales excepcionales.",
    images: ["/origin.jpeg"],
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
    canonical: BASE_URL,
  },
  icons: {
    icon: "/icons8-studio-display-50 .png",
    shortcut: "/icons8-studio-display-50 .png",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ulises Molina",
  url: BASE_URL,
  jobTitle: "Frontend Developer",
  description:
    "Frontend Developer especializado en React, Next.js y TypeScript. Basado en Buenos Aires, Argentina.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Buenos Aires",
    addressCountry: "AR",
  },
  sameAs: [
    "https://github.com/Ulises-Molina",
    "https://www.linkedin.com/in/ulises-rafael-molina/",
  ],
  knowsAbout: [
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "HTML5",
    "CSS",
    "Tailwind CSS",
    "Node.js",
    "Git",
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
      <body className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} ${bebasNeue.variable} ${cormorant.variable} font-sans`}>
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
