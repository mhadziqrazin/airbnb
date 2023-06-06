import { Listing } from "@prisma/client";
import getListings from "./actions/getListings";
import EmptyState from "./components/EmptyState";
import Container from "./components/container/Container";
import ListingCard from "./components/listings/ListingCard";
import getCurrentUser from "./actions/getCurrentUser";
import ClientOnly from "./components/ClientOnly";

export default async function Home() {
  const currentUser = await getCurrentUser()
  const listings: Listing[] | undefined = await getListings()

  if (listings?.length === 0) {
    return (
      <EmptyState showReset />
    )
  }
  return (
    <Container>
      <ClientOnly>
        <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {listings?.map((listing) => (
            <ListingCard
              data={listing}
            />
          ))}
        </div>
      </ClientOnly>
    </Container>
  )
}
