'use client'

import Container from "../container/Container"
import Logo from "./Logo"
import Search from "./Search"
import UserMenu from "./UserMenu"
import ThemeToggle from "./ThemeToggle"

const Navbar = () => {
  return (
    <nav className="shadow-sm border-b-[1px] dark:border-b-black py-4">
      <Container>
        <div className="flex flex-row items-center justify-between gap-3">
          <Logo />
          <Search />
          <div className="flex flex-row items-center justify-between gap-4 md:gap-1">
            <ThemeToggle />
            <UserMenu />
          </div>
        </div>
      </Container>
    </nav>
  )
}

export default Navbar