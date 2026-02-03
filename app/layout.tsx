import "./globals.css"
import "@mantine/core/styles.css"
import "@mantine/charts/styles.css"
import type { Metadata } from "next"
import { ColorSchemeScript, MantineProvider, createTheme } from "@mantine/core"

const theme = createTheme({
  fontFamily: "Inter, system-ui, -apple-system, sans-serif",
  primaryColor: "indigo",
  defaultRadius: "md"
})

export const metadata: Metadata = {
  title: "Metabolic Intelligence Platform",
  description: "Evidence-based nutrition powered by your biometrics."
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript defaultColorScheme="dark" />
      </head>
      <body>
        <MantineProvider theme={theme} defaultColorScheme="dark">
          {children}
        </MantineProvider>
      </body>
    </html>
  )
}
