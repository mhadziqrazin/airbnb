import { toast } from "react-hot-toast"
import prisma from "@/app/libs/prismadb"

export interface ListingParams {
  userId?: string
}

export default async function getListings(params: ListingParams) {
  try {
    const { userId } = params

    let query: any = {}

    if (userId) {
      query.userId = userId
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
    toast.error("Something went wrong :(")
    console.log(err)
    throw new Error()
  }
}