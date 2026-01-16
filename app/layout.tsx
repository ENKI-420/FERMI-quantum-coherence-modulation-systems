import * as React from "react"
import type { Metadata, Viewport } from "next"
import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google"
import "./globals.css"
import { Navigation } from "@/components/navigation"
import { MobileNav } from "@/components/mobile-nav"
import { QuantumMetricsBar } from "@/components/quantum-metrics-bar"
import { SkipLink } from "@/components/ui/skip-link"
import { ToastProvider } from "@/components/ui/toast-provider"

const ibmPlexSans = IBM_Plex_Sans({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-ibm-plex-sans",
})

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
})

export const metadata: Metadata = {
  title: "DNA::}{::lang - IDE Development Platform",
  description:
    "Build, customize, and extend your own integrated development environments using biological computing paradigms.",
  generator: "v0.app",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#0a0a0a",
}

// Add comment above fix: Make children prop optional in RootLayout to satisfy Next.js layout requirements and resolve property missing errors.
export default function RootLayout({
  children,
}: {
  children?: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body className={`${ibmPlexSans.variable} ${ibmPlexMono.variable} font-sans antialiased`}>
        <SkipLink />
        <ToastProvider>
          <Navigation />
          <QuantumMetricsBar />
          <main id="main-content" tabIndex={-1} className="focus:outline-none pb-20 md:pb-0">
            {children}
          </main>
          <MobileNav />
        </ToastProvider>
      </body>
    </html>
  )
}
