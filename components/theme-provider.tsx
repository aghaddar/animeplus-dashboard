"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  // Render NextThemesProvider directly so the theme class can be applied
  // early and avoid the UI looking wrong on initial paint in light mode.
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
