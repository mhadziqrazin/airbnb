import { useRouter } from "next/navigation"
import { SafeUser } from "../types"
import useLoginModal from "./useLoginModal"
import { useCallback, useMemo } from "react"
import axios from "axios"
import { toast } from "react-hot-toast"

interface UseFavorite {
  listingId: string
  currentUser?: SafeUser | null
}

const useFavorite = (
  { listingId, currentUser }: UseFavorite
) => {
  const router = useRouter()
  const loginModal = useLoginModal()

  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || []

    return list.includes(listingId)
  }, [currentUser, listingId])

  const toggleFavorite = useCallback(async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation()

    if (!currentUser) {
      return loginModal.onOpen()
    }

    try {
      if (!hasFavorited) {
        await toast.promise(
          axios.post(`/api/favorites/${listingId}`)
          , {
            loading: 'Adding...',
            success: 'Added to favorites!',
            error: 'Something went wrong. Try again'
          }
        )
        // toast.success('Added to favorites!')
      } else {
        await toast.promise(
          axios.delete(`/api/favorites/${listingId}`)
          , {
            loading: 'Removing...',
            success: 'Removed from favorites!',
            error: 'Something went wrong. Try again'
          }
        )
        // toast.success('Removed from favorites!')
      }

      router.refresh()
    } catch (err) { }
  }, [currentUser, hasFavorited, listingId, loginModal, router])

  return {
    hasFavorited, toggleFavorite
  }
}

export default useFavorite