'use client'

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { MdOutlineLightMode, MdOutlineNightlight } from "react-icons/md"
import Container from "../container/Container"
import Logo from "./Logo"
import Search from "./Search"

const Navbar = () => {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <nav className="shadow-sm border-b-[1px] dark:border-b-black py-4">
      <Container>
        <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
          <Logo />
          <Search />
          <button
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className="
              rounded-full w-16 flex dark:place-content-end
            bg-gray-200 dark:bg-gray-700 scale-75 sm:scale-100
            "
          >
            <div className="
                shadow-sm border-[1px]
              border-slate-300 dark:border-slate-800
                p-2 rounded-full left-1 right-1
              "
            >
              {theme === 'light' ? <MdOutlineLightMode /> : <MdOutlineNightlight />}
            </div>
          </button>
        </div>
      </Container>
    </nav>
  )
}

export default Navbar