'use client'

import Container from "../container/Container"
import Logo from "./Logo"
import Search from "./Search"
import UserMenu from "./UserMenu"
import ThemeToggle from "./ThemeToggle"
import { useEffect, useState } from "react"
import { SafeUser } from "@/app/types"
import Categories from "./Categories"

interface NavbarProps {
  currentUser?: SafeUser | null
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <nav className="shadow-sm sticky top-0 z-50 bg-white dark:bg-[#121212]">
      <div className="border-b-[1px] dark:border-neutral-700 py-4">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3">
            <Logo />
            <Search />
            <div className="flex flex-row items-center justify-between gap-4 md:gap-1">
              <ThemeToggle />
              <UserMenu currentUser={currentUser} />
            </div>
          </div>
        </Container>
      </div>
      <Categories />
    </nav>
  )
}

export default Navbar