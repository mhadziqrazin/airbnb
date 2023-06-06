import Counter from "../inputs/Counter"
import Heading from "../texts/Heading"

interface InfoStepProps {
  guestCount: number
  roomCount: number
  bathroomCount: number
  setCustomValue: (id: string, value: any) => void
}

const InfoStep: React.FC<InfoStepProps> = ({
  guestCount, roomCount, bathroomCount, setCustomValue
}) => {
  return (
    <div className="flex flex-col gap-8">
      <Heading
        title="Share some basics about your property"
        subtitle="What amenities do you have?"
      />
      <Counter
        title="Guests"
        subtitle="How many guests do you allow?"
        value={guestCount}
        onChange={(value) => setCustomValue('guestCount', value)}
      />
      <hr className="dark:border-neutral-700" />
      <Counter
        title="Rooms"
        subtitle="How many rooms do you have?"
        value={roomCount}
        onChange={(value) => setCustomValue('roomCount', value)}
      />
      <hr className="dark:border-neutral-700" />
      <Counter
        title="Bathroom"
        subtitle="How many bathrooms do you have?"
        value={bathroomCount}
        onChange={(value) => setCustomValue('bathroomCount', value)}
      />
    </div>
  )
}

export default InfoStep