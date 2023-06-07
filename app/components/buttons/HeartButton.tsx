import useFavorite from "@/app/hooks/useFavorite"
import { SafeUser } from "@/app/types"
import { useState } from "react"
import { toast } from "react-hot-toast"
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"

interface HeartButtonProps {
  listingId: string
  currentUser?: SafeUser | null
}

const HeartButton: React.FC<HeartButtonProps> = ({
  listingId, currentUser
}) => {
  const { hasFavorited, toggleFavorite } = useFavorite({ listingId, currentUser })
  const [favorited, setFavorited] = useState(hasFavorited)

  const handleFavorite = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      setFavorited((value) => !value)
      await toggleFavorite(e)
    } catch (err) {
      toast.error('Something went wrong')
      setFavorited(hasFavorited)
    }
  }

  return (
    <button
      onClick={handleFavorite}
      className="relative hover-opacity-80 transition"
    >
      <AiOutlineHeart
        size={28}
        className="fill-white absolute -top-[2px] -right-[2px]"
      />
      <AiFillHeart
        size={24}
        className={
          favorited ? 'fill-rose-500' : 'fill-neutral-500/40'
        }
      />
    </button>
  )
}

export default HeartButton