'use client'

import { ThemeProvider } from "next-themes"

interface ThemeProps {
  children: React.ReactNode
}

const Theme: React.FC<ThemeProps> = ({children}) => {
  return (
    <ThemeProvider
      attribute="class"
    >
      {children}
    </ThemeProvider>
  )
}

export default Theme