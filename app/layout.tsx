import type React from "react"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import "./globals.css"
import { Analytics } from "@vercel/analytics/next"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "Ulises Molina - Portfolio",
  description: "Desarrollador Frontend Portfolio",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <link rel="icon" type="image/svg+xml" href="/icons8-studio-display-50 .png" />
      <body className={poppins.className}>{children}
        <Analytics/>
        </body>
    </html>
    
  )
}



import './globals.css'