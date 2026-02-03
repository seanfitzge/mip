import "@mantine/core/styles.css"
import "./globals.css"
import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import { ColorSchemeScript } from "@mantine/core"
import { Providers } from "./providers"
import { IntroAnimation } from "@/components/intro-animation"

const inter = Inter({ subsets: ["latin"], variable: "--font-primary" })
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" })

export const metadata: Metadata = {
  title: "Metabolic Intelligence Platform",
  description: "Evidence-based nutrition powered by your biometrics."
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mantine-color-scheme="dark" suppressHydrationWarning>
      <head>
        <ColorSchemeScript defaultColorScheme="dark" />
      </head>
      <body className={`${inter.variable} ${jetbrains.variable} font-sans`}>
        <IntroAnimation />
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
