import "@mantine/core/styles.css"
import "./globals.css"
import type { Metadata } from "next"
import { Space_Grotesk, IBM_Plex_Mono } from "next/font/google"
import { ColorSchemeScript } from "@mantine/core"
import { Providers } from "./providers"
import { IntroAnimation } from "@/components/intro-animation"

// Distinctive, futuristic fonts
const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"], 
  variable: "--font-primary",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap"
})

const ibmPlexMono = IBM_Plex_Mono({ 
  subsets: ["latin"], 
  variable: "--font-mono",
  weight: ["400", "500", "600", "700"],
  display: "swap"
})

export const metadata: Metadata = {
  title: "MIP · Metabolic Intelligence Platform",
  description: "A once-in-a-lifetime experience. Evidence-based nutrition powered by your biometrics."
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mantine-color-scheme="dark" suppressHydrationWarning>
      <head>
        <ColorSchemeScript defaultColorScheme="dark" />
      </head>
      <body className={`${spaceGrotesk.variable} ${ibmPlexMono.variable} font-sans grid-pattern`}>
        <IntroAnimation />
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
