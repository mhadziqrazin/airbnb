import { categories } from "@/app/constants/categories"
import { SafeListing, SafeUser } from "@/app/types"
import { Reservation } from "@prisma/client"
import { useMemo } from "react"
import Container from "../container/Container"
import ListingHead from "./ListingHead"
import ListingInfo from "./ListingInfo"

interface ListingProps {
  listing: SafeListing & {
    user: SafeUser
  }
  reservation?: Reservation[]
  currentUser?: SafeUser | null
}

const Listing: React.FC<ListingProps> = ({
  listing, reservation, currentUser
}) => {
  const category = useMemo(() => {
    return categories.find((item) => listing.category === item.label)
  }, [listing.category])

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto pt-6 pb-12">
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
          </div>
        </div>
      </div>
    </Container>
  )
}

export default Listing