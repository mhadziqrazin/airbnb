'use client'

import Image from "next/image"
import { useRouter } from "next/navigation"

const Logo = () => {
  const router = useRouter()

  return (
    <>
      <div
        onClick={() => router.push('/')}
        className="hidden md:flex flex-col items-center gap-2 cursor-pointer"
      >
        <Image
          alt='Logo'
          height={"100"}
          width={"100"}
          src={"/images/logo.png"}
        />
        <p className="text-sm font-bold">
          hajik
        </p>
      </div>
      <div
        onClick={() => router.push('/')}
        className="flex md:hidden flex-col items-center gap-2 cursor-pointer"
      >
        <Image
          alt='Logo'
          height={"30"}
          width={"30"}
          src={"/images/logo_sm.png"}
        />
        <p className="text-sm font-bold">
          hajik
        </p>
      </div>
    </>
  )
}

export default Logo