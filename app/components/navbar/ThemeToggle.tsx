'use client'

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { MdOutlineLightMode, MdOutlineNightlight } from "react-icons/md"

interface ThemeToggleProps {
  menuItem?: boolean
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ menuItem }) => {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className={`
        ${menuItem ? 'flex w-16 border-[1px] border-slate-300 dark:border-slate-800' : 'hidden xl:w-16'}
        rounded-full sm:flex dark:place-content-end bg-gray-200 dark:bg-gray-700
      `}
    >
      <div className="shadow-sm border-[1px] border-slate-300 dark:border-slate-800 p-2 rounded-full left-1 right-1">
        {theme === 'light' ? <MdOutlineLightMode /> : <MdOutlineNightlight />}
      </div>
    </button>
  )
}

export default ThemeToggle