import getCurrentUser from "@/app/actions/getCurrentUser"
import getListingById from "@/app/actions/getListingById"
import ClientOnly from "@/app/components/ClientOnly"
import EmptyState from "@/app/components/EmptyState"
import Listing from "@/app/components/listings/Listing"

interface ListingPageParams {
  listingId: string
}

const ListingPage = async ({ params }: { params: ListingPageParams }) => {
  const listing = await getListingById(params)
  const currentUser = await getCurrentUser()

  if (!listing) {
    return (
      <EmptyState />
    )
  }
  return (
    <ClientOnly>
      <Listing
        listing={listing}
        currentUser={currentUser}
      />
    </ClientOnly>
  )
}

export default ListingPage