import useCountries from "@/app/hooks/useCountries"
import { SafeUser } from "@/app/types"
import { IconType } from "react-icons"
import Avatar from "../Avatar"
import ListingCategory from "./ListingCategory"
import dynamic from "next/dynamic"
import Map from "../Map"

interface ListingInfoProps {
  user: SafeUser
  category: {
    label: string
    icon: IconType
    description: string
  } | undefined
  description: string
  roomCount: number
  guestCount: number
  bathroomCount: number
  locationValue: string
}

const ListingInfo: React.FC<ListingInfoProps> = ({
  user, category, description, roomCount, guestCount, bathroomCount, locationValue
}) => {
  const { getByValue } = useCountries()

  const coordinates = getByValue(locationValue)?.latlng
  
  // const Map = dynamic(() => import('../Map'), {
  //   ssr: false
  // })

  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="text-xl font-semibold flex flex-row items-center gap-2">
          <p>Hosted by {user.name}</p>
          <Avatar src={user.image} />
        </div>
        <div className="flex flex-row items-center gap-4 font-light text-neutral-500 dark:text-neutral-400">
          <p>
            {guestCount} guests
          </p>
          <p>
            {roomCount} rooms
          </p>
          <p>
            {bathroomCount} bathrooms
          </p>
        </div>
      </div>
      <hr className="dark:border-neutral-700" />
      {category && (
        <ListingCategory
          icon={category.icon}
          label={category.label}
          description={category.description}
        />
      )}
      <hr className="dark:border-neutral-700" />
      <p className="text-lg font-light text-neutral-500 dark:text-neutral-400">
        {description}
      </p>
      <hr className="dark:border-neutral-700" />
      <Map center={coordinates} />
    </div>
  )
}

export default ListingInfo