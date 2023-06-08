import prisma from "@/app/libs/prismadb"

interface Reservations {
  listingId?: string
  userId?: string
  authorId?: string
}

export default async function getReservations(params: Reservations) {
  try {
    const { listingId, userId, authorId } = params

    const query: any = {}

    if (listingId) {
      query.listingId = listingId
    }

    if (userId) {
      query.userId = userId
    }

    if (authorId) {
      query.listing = { userId: authorId }
    }

    const reservations = await prisma.reservation.findMany({
      where: query,
      include: { listing: true },
      orderBy: { createdAt: 'desc' }
    })

    return reservations.map((reservation) => ({
      ...reservation,
      startDate: reservation.startDate.toISOString(),
      endDate: reservation.endDate.toISOString(),
      createdAt: reservation.createdAt.toISOString(),
      listing: {
        ...reservation.listing,
        createdAt: reservation.listing.createdAt.toISOString()
      }
    }))
  } catch (err) {
    console.log(err)
    throw new Error()
  }
}