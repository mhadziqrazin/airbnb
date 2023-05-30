'use client'

import { ThemeProvider } from "next-themes"

interface ThemeProps {
  children: React.ReactNode
}

export const Theme: React.FC<ThemeProps> = ({children}) => {
  return (
    <ThemeProvider
      enableSystem={true}
      attribute="class"
    >
      {children}
    </ThemeProvider>
  )
}