'use client'

import Image from "next/image"
import { useRouter } from "next/navigation"

const Logo = () => {
  const router = useRouter()

  return (
    <>
      <Image
        alt='Logo'
        className="hidden md:block cursor-pointer"
        height={"100"}
        width={"100"}
        src={"/images/logo.png"}
      />
      <Image
        alt='Logo'
        className="block md:hidden cursor-pointer"
        height={"30"}
        width={"30"}
        src={"/images/logo_sm.png"}
      />
    </>
  )
}

export default Logo