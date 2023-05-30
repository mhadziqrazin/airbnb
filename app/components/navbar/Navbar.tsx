'use client'

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { MdOutlineLightMode, MdOutlineNightlight } from "react-icons/md"

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
      setTheme('dark')
    }
  }

  return (
    <nav className="shadow-sm border-b-[1px] dark:border-b-black flex place-content-between padding-md">
      <p>
        {theme}
      </p>
      <button
        onClick={() => themeSwitch()}
        className="
          rounded-full w-16 flex dark:place-content-end
          bg-gray-200 dark:bg-gray-700
        "
      >
        <span className="
          shadow-sm border-[1px]
          border-slate-300 dark:border-slate-800
          p-2 rounded-full left-1 right-1
        "
        >
          {theme === 'light' ? <MdOutlineLightMode /> : <MdOutlineNightlight />}
        </span>
      </button>
    </nav>
  )
}