import { useMemo } from "react"
import CountryInput, { CountryInputValue } from "../inputs/CountryInput"
import Heading from "../texts/Heading"
import dynamic from "next/dynamic"

interface LocationStepProps {
  setCustomValue: (id: string, value: any) => void
  location: CountryInputValue | undefined
}

const LocationStep: React.FC<LocationStepProps> = ({
  setCustomValue, location
}) => {
  const Map = useMemo(() => dynamic(() => import('../Map'), {
    ssr: false
  }), [location])

  return (
    <div className="flex flex-col gap-8">
      <Heading
        title="Where is your property located?"
        subtitle="Help guests find you!"
      />
      <CountryInput
        onChange={(value) => setCustomValue('location', value)}
        value={location}
      />
      <Map
        center={location?.latlng}
      />
    </div>
  )
}

export default LocationStep