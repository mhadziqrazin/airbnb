import getListings, { ListingParams } from "./actions/getListings";
import EmptyState from "./components/EmptyState";
import Container from "./components/container/Container";
import ListingCard from "./components/listings/ListingCard";
import getCurrentUser from "./actions/getCurrentUser";
import ClientOnly from "./components/ClientOnly";

export const dynamic = 'force-dynamic'

interface HomeProps {
  searchParams: ListingParams
}

export default async function Home({ searchParams }: HomeProps) {
  const currentUser = await getCurrentUser()
  const listings = await getListings(searchParams)

  if (listings.length === 0) {
    return (
      <EmptyState showReset />
    )
  }
  return (
    <Container>
      <ClientOnly>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {listings.map((listing) => (
            <ListingCard
              key={listing.id}
              data={listing}
              currentUser={currentUser}
            />
          ))}
        </div>
      </ClientOnly>
    </Container>
  )
}
