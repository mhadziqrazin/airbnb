'use client'

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export const Navbar = () => {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const themeSwitch = () => {
    if (theme === 'dark') {
      setTheme('light')
    } else if (theme === 'light') {
      setTheme('system')
    } else {
      setTheme('dark')
    }
  }

  return (
    <nav className="light:bg-white shadow-sm border-b-[1px]">
      <button onClick={() => themeSwitch()}>
        switch
      </button>
      <p>
        {theme}
      </p>
    </nav>
  )
}