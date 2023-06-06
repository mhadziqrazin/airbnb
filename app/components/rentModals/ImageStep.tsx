import ImageUpload from "../inputs/ImageUpload"
import Heading from "../texts/Heading"

interface ImageStepProps {
  imageSrc: string
  setCustomValue: (id: string, value: any) => void
}

const ImageStep: React.FC<ImageStepProps> = ({
  imageSrc, setCustomValue
}) => {
  return (
    <div className="flex flex-col gap-8">
      <Heading
        title="Add a photo of your property"
        subtitle="Show guests what your property looks like!"
      />
      <ImageUpload
        value={imageSrc}
        onChange={(value) => setCustomValue('imageSrc', value)}
      />
    </div>
  )
}

export default ImageStep