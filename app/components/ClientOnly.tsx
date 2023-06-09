'use client'

import { useEffect, useState } from "react"
import { PropagateLoader } from "react-spinners"
import Container from "./container/Container"

interface ClientOnlyProps {
  children: React.ReactNode
}

const ClientOnly: React.FC<ClientOnlyProps> = ({ children }) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Container>
        <section className="h-screen grid place-items-center">
          <PropagateLoader color="rgb(244, 63, 94)" />
        </section>
      </Container>
    )
  }
  return (
    <>{children}</>
  )
}

export default ClientOnly