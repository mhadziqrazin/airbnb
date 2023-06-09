import getCurrentUser from "../actions/getCurrentUser"
import getReservations from "../actions/getReservations"
import EmptyState from "../components/EmptyState"
import Trips from "../components/trips/Trips"

export default async function TripsPage() {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return (
      <EmptyState
        title="Unauthorized"
        subtitle="Please login"
      />
    )
  }

  const reservations = await getReservations({userId: currentUser.id})

  if (reservations.length === 0) {
    return (
      <EmptyState
        title="No trips found"
        subtitle="Looks like you haven't reserved any trips"
      />
    )
  }
  return (
    <Trips
      currentUser={currentUser}
      reservations={reservations}
    />
  )
}