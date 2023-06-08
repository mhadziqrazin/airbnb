'use client'

import useCountries from "@/app/hooks/useCountries"
import { SafeUser } from "@/app/types"
import Heading from "../texts/Heading"
import Image from "next/image"
import HeartButton from "../buttons/HeartButton"

interface ListingHeadProps {
  id: string
  title: string
  locationValue: string
  imageSrc: string
  currentUser?: SafeUser | null
}

const ListingHead: React.FC<ListingHeadProps> = ({
  id, title, locationValue, imageSrc, currentUser
}) => {
  const { getByValue } = useCountries()
  const location = getByValue(locationValue)

  return (
    <>
      <Heading
        title={title}
        subtitle={`${location?.region}, ${location?.label}`}
      />
      <div className="w-fill h-[60vh] overflow-hidden rounded-xl relative">
        <Image
          alt="Listing"
          src={imageSrc}
          fill
          className="object-cover w-full"
        />
        <div className="absolute top-3 right-3">
          <HeartButton
            listingId={id}
            currentUser={currentUser}
          />
        </div>
      </div>
    </>
  )
}

export default ListingHead