import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Stockea - Controlá tu stock sin complicarte",
  description:
    "Streamline your billing process with seamless automation for every custom contract, tailored by Brillance.",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="antialiased" suppressHydrationWarning>
      <head>
        <link rel="icon" href="favicon-transparente.png" />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
