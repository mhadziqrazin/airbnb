'use client'

import { SafeListing, SafeUser } from "@/app/types"
import Heading from "../texts/Heading"
import ListingCard from "../listings/ListingCard"
import Container from "../container/Container"
import axios from "axios"
import { toast } from "react-hot-toast"
import { useCallback, useState } from "react"
import { useRouter } from "next/navigation"

interface PropertiesProps {
  currentUser: SafeUser
  listings: SafeListing[]
}

const Properties: React.FC<PropertiesProps> = ({
  currentUser, listings
}) => {
  const router = useRouter()
  const [deletingId, setDeletingId] = useState('')

  const onCancel = useCallback(async (id: string) => {
    setDeletingId(id)

    try {
      await axios.delete(`/api/listings/${id}`)
      toast.success('Listing deleted')
      router.refresh()
    } catch (err) {
      toast.error('Something went wrong')
      console.log(err)
    }

    setDeletingId('')
  }, [router])

  return (
    <Container>
      <Heading
        title="Properties"
        subtitle="List of your properties"
      />
      <div className="mt-10 gap-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {listings.map((listing) => (
          <ListingCard
            key={listing.id}
            data={listing}
            actionId={listing.id}
            onAction={onCancel} // ini kok bisa masuk ya id nya keren :(
            disabled={deletingId === listing.id}
            actionLabel='Delete property'
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  )
}

export default Properties