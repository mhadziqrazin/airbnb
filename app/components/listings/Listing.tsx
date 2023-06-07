import { categories } from "@/app/constants/categories"
import { SafeListing, SafeUser } from "@/app/types"
import { Reservation } from "@prisma/client"
import { useMemo } from "react"
import Container from "../container/Container"
import ListingHead from "./ListingHead"

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
    return categories.find((item) => listing.category)
  }, [listing.category])

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto pt-6">
        <div className="flex flex-col gap-6">
          <ListingHead
            id={listing.id}
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            currentUser={currentUser}
          />
        </div>
      </div>
    </Container>
  )
}

export default Listing