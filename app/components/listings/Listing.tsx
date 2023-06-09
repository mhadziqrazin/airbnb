'use client'

import { categories } from "@/app/constants/categories"
import { SafeListing, SafeReservation, SafeUser } from "@/app/types"
import { useCallback, useEffect, useMemo, useState } from "react"
import Container from "../container/Container"
import ListingHead from "./ListingHead"
import ListingInfo from "./ListingInfo"
import useLoginModal from "@/app/hooks/useLoginModal"
import { useRouter } from "next/navigation"
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns"
import axios from "axios"
import { toast } from "react-hot-toast"
import ListingReservation from "./ListingReservation"
import { Range } from "react-date-range"

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection'
}

interface ListingProps {
  listing: SafeListing & {
    user: SafeUser
  }
  reservations?: SafeReservation[]
  currentUser?: SafeUser | null
}

const Listing: React.FC<ListingProps> = ({
  listing, reservations = [], currentUser
}) => {
  const loginModal = useLoginModal()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [totalPrice, setTotalPrice] = useState(listing.price)
  const [dateRange, setDateRange] = useState<Range>(initialDateRange)
  
  const category = useMemo(() => {
    return categories.find((item) => listing.category === item.label)
  }, [listing.category])
  
  const disabledDates = useMemo(() => {
    let dates: Date[] = []
    
    reservations.forEach((reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate)
      })
      dates = [...dates, ...range]
    })
    return dates
  }, [reservations])

  const onCreateReservation = useCallback(async () => {
    if (!currentUser) {
      return loginModal.onOpen()
    }

    setLoading(true)

    try {
      await axios.post('/api/reservation', {
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId: listing.id
      })
      toast.success('Listing reserved!')
      router.refresh()
      router.push('/trips')
    } catch (err) {
      toast.error('Reservation failed.')
    }
    setLoading(false)

  }, [currentUser, loginModal, totalPrice, dateRange, listing, router, currentUser])

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const days = differenceInCalendarDays(dateRange.endDate, dateRange.startDate)
      
      if (days) {
        setTotalPrice(listing.price * days)
      } else {
        setTotalPrice(listing.price)
      }
    }
  }, [dateRange, listing.price])
  
  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <ListingHead
            id={listing.id}
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            currentUser={currentUser}
          />
          <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
            <ListingInfo
              user={listing.user}
              category={category}
              description={listing.description}
              roomCount={listing.roomCount}
              guestCount={listing.guestCount}
              bathroomCount={listing.bathroomCount}
              locationValue={listing.locationValue}
            />
            <div className="order-first mb-10 md:order-last md:col-span-3">
              <ListingReservation
                price={listing.price}
                totalPrice={totalPrice}
                onChangeDate={(value) => setDateRange(value)}
                dateRange={dateRange}
                onSubmit={onCreateReservation}
                disabled={loading}
                disabledDates={disabledDates}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default Listing