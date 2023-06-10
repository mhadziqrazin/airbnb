import prisma from "../libs/prismadb";
import getCurrentUser from "./getCurrentUser";

export default async function getFavoriteListings() {
  try {
    const currentUser = await getCurrentUser()

    if (!currentUser) {
      return []
    }

    const favorites = await prisma.listing.findMany({
      where: {
        id: {
          in: [...(currentUser.favoriteIds || [])]
        }
      }
    })

    return favorites.map((favorite) => ({
      ...favorite,
      createdAt: favorite.createdAt.toISOString()
    }))
  } catch (err) {
    console.log(err)
    throw new Error()
  }
}