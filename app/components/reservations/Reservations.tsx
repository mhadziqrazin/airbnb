'use client'

import { SafeReservation, SafeUser } from "@/app/types"
import Container from "../container/Container"
import Heading from "../texts/Heading"
import axios from "axios"
import { toast } from "react-hot-toast"
import { useCallback, useState } from "react"
import { useRouter } from "next/navigation"
import ListingCard from "../listings/ListingCard"

interface ReservationsProps {
  currentUser: SafeUser
  reservations: SafeReservation[]
}

const Reservations: React.FC<ReservationsProps> = ({
  currentUser, reservations
}) => {
  const router = useRouter()
  const [deletingId, setDeletingId] = useState('')

  const onCancel = useCallback(async (id: string) => {
    setDeletingId(id)

    try {
      await axios.delete(`/api/reservation/${id}`)
      toast.success('Reservation cancelled')
      router.refresh()
    } catch (err) {
      toast.error('Something went wrong')
      console.log(err)
    }

    setDeletingId('')
  }, [router])

  return (
    <Container>
      <Heading
        title="Reservations"
        subtitle="Bookings on your properties"
      />
      <div className="mt-10 gap-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {reservations.map((reservation) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancel} // ini kok bisa masuk ya id nya keren :(
            disabled={deletingId === reservation.id}
            actionLabel='Cancel guest reservation'
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  )
}

export default Reservations