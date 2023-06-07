import { toast } from "react-hot-toast"
import prisma from "@/app/libs/prismadb"

export default async function getListings() {
  try {
    const listings = await prisma.listing.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString()
    }))
  } catch (err) {
    toast.error("Something went wrong :(")
    console.log(err)
  }
}