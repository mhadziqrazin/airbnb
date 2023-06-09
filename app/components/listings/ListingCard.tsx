'use client'

import useCountries from "@/app/hooks/useCountries"
import { SafeListing, SafeReservation, SafeUser } from "@/app/types"
import { format } from "date-fns"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useCallback, useMemo } from "react"
import HeartButton from "../buttons/HeartButton"
import Button from "../buttons/Button"
import { PulseLoader } from "react-spinners"

interface ListingCardProps {
  data: SafeListing
  reservation?: SafeReservation
  onAction?: (id: string) => void
  disabled?: boolean
  actionLabel?: string
  actionId?: string
  currentUser?: SafeUser | null
}

const ListingCard: React.FC<ListingCardProps> = ({
  data, reservation, onAction, disabled, actionLabel, actionId = "", currentUser
}) => {
  const router = useRouter()
  const { getByValue } = useCountries()

  const location = getByValue(data.locationValue)

  const handleCancel = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    if (disabled) {
      return
    }
    onAction?.(actionId)
  }, [disabled, onAction, actionId])

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice
    }
    return data.price
  }, [reservation, data.price])

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null
    }

    const start = new Date(reservation.startDate)
    const end = new Date(reservation.endDate)

    return `${format(start, 'PP')} - ${format(end, 'PP')}`
  }, [reservation])

  const label = (
    <>
      {!disabled ?
        <>{actionLabel}</> : <PulseLoader color="white" size={8} />
      }
    </>
  )


  return (
    <div
      onClick={() => router.push(`/listings/${data.id}`)}
      className="col-span-1 cursor-pointer group"
    >
      <div className="flex flex-col gap-2 w-full">
        <div className="aspect-square w-full relative overflow-hidden rounded-xl">
          <Image
            alt="Listing"
            src={data.imageSrc}
            fill
            className="object-cover h-full w-full group-hover:scale-110 transition"
          />
          <div className="absolute top-3 right-3">
            <HeartButton
              listingId={data.id}
              currentUser={currentUser}
            />
          </div>
        </div>
        <p className="text-lg font-semibold">
          {location?.region}, {location?.label}
        </p>
        <p className="font-light text-neutral-500 dark:text-neutral-400">
          {reservationDate || data.category}
        </p>
        <p className="font-semibold">
          $ {price}
          {!reservation && (
            <span className="font-light text-neutral-600 dark:text-neutral-300"> / night</span>
          )}
        </p>
        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            small
            label={label}
            onClick={handleCancel}
          />
        )}
      </div>
    </div>
  )
}

export default ListingCard
