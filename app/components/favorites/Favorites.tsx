import { SafeListing, SafeUser } from "@/app/types"
import Container from "../container/Container"
import Heading from "../texts/Heading"
import ListingCard from "../listings/ListingCard"

interface FavoritesProps {
  currentUser: SafeUser
  listings: SafeListing[]
}

const Favorites: React.FC<FavoritesProps> = ({
  currentUser, listings
}) => {
  return (
    <Container>
      <Heading
        title="Favorites"
        subtitle="List of places you have favorited"
      />
      <div className="mt-10 gap-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {listings.map((listing) => (
          <ListingCard
            key={listing.id}
            data={listing}
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  )
}

export default Favorites