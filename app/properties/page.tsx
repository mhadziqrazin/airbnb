import getCurrentUser from "../actions/getCurrentUser"
import getListings from "../actions/getListings"
import ClientOnly from "../components/ClientOnly"
import EmptyState from "../components/EmptyState"
import Properties from "../components/properties/Properties"

export default async function PropertiesPage() {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState
          title="Unauthorized"
          subtitle="Please login"
        />
      </ClientOnly>
    )
  }

  const properties = await getListings({ userId: currentUser.id })

  if (properties.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No properties found"
          subtitle="Looks like you have no properties"
        />
      </ClientOnly>
    )
  }
  return (
    <ClientOnly>
      <Properties
        currentUser={currentUser}
        listings={properties}
      />
    </ClientOnly>
  )
}