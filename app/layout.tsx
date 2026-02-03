import "./globals.css"
import "@mantine/core/styles.css"
import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import { ColorSchemeScript, MantineProvider, createTheme } from "@mantine/core"

const inter = Inter({ subsets: ["latin"], variable: "--font-primary" })
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" })

const theme = createTheme({
  fontFamily: "var(--font-primary)",
  fontFamilyMonospace: "var(--font-mono)",
  primaryColor: "primary",
  defaultRadius: "md",
  fontSizes: {
    xs: "0.75rem",
    sm: "0.875rem",
    md: "1.0625rem",
    lg: "1.25rem",
    xl: "1.5rem"
  },
  colors: {
    primary: Array(10).fill("rgb(var(--color-primary))"),
    success: Array(10).fill("rgb(var(--color-success))"),
    warning: Array(10).fill("rgb(var(--color-warning))"),
    critical: Array(10).fill("rgb(var(--color-critical))"),
    info: Array(10).fill("rgb(var(--color-info))"),
    neutral: Array(10).fill("rgb(var(--color-neutral-500))")
  },
  radius: {
    xs: "4px",
    sm: "6px",
    md: "8px",
    lg: "12px",
    xl: "16px"
  }
})

export const metadata: Metadata = {
  title: "Metabolic Intelligence Platform",
  description: "Evidence-based nutrition powered by your biometrics."
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mantine-color-scheme="light" suppressHydrationWarning>
      <head>
        <ColorSchemeScript defaultColorScheme="dark" />
      </head>
      <body className={`${inter.variable} ${jetbrains.variable} font-sans`}>
        <MantineProvider theme={theme} defaultColorScheme="dark">
          {children}
        </MantineProvider>
      </body>
    </html>
  )
}
