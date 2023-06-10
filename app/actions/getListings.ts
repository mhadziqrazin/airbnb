import { toast } from "react-hot-toast"
import prisma from "@/app/libs/prismadb"

export interface ListingParams {
  userId?: string
  guestCount?: number
  roomCount?: number
  bathroomCount?: number
  startDate?: string
  endDate?: string
  locationValue?: string
  category?: string
}

export default async function getListings(params: ListingParams) {
  try {
    const {
      userId,
      guestCount,
      roomCount,
      bathroomCount,
      startDate,
      endDate,
      locationValue,
      category,
    } = params

    let query: any = {}

    if (userId) {
      query.userId = userId
    }

    if (guestCount) {
      query.guestCount = {
        gte: + guestCount
      }
    }

    if (roomCount) {
      query.roomCount = {
        gte: + roomCount
      }
    }

    if (bathroomCount) {
      query.bathroomCount = {
        gte: + bathroomCount
      }
    }
    
    if (locationValue) {
      query.locationValue = locationValue
    }

    if (category) {
      query.category = category
    }
    
    if (startDate && endDate) {
      query.NOT = {
        reservations: {
          some: {
            OR: [
              {
                endDate: { gte: startDate },
                startDate: { lte: startDate }
              },
              {
                endDate: { gte: endDate },
                startDate: { lte: endDate }
              }
            ]
          }
        }
      }
    }
    

    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: { createdAt: 'desc' }
    })

    return listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString()
    }))
  } catch (err) {
    console.log(err)
    return []
  }
}