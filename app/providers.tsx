"use client"

import { MantineProvider, createTheme } from "@mantine/core"

const theme = createTheme({
  primaryColor: "indigo",
  fontFamily: "var(--font-primary), system-ui, sans-serif",
  fontFamilyMonospace: "var(--font-mono), ui-monospace, SFMono-Regular, Menlo, monospace",
  radius: {
    xs: "6px",
    sm: "8px",
    md: "12px",
    lg: "16px",
    xl: "20px"
  }
})

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MantineProvider defaultColorScheme="dark" theme={theme}>
      {children}
    </MantineProvider>
  )
}
