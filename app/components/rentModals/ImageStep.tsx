import ImageUpload from "../inputs/ImageUpload"
import Heading from "../texts/Heading"

const ImageStep = () => {
  return (
    <div className="flex flex-col gap-8">
      <Heading
        title="Add a photo of your property"
        subtitle="Show guests what your property looks like!"
      />
      <ImageUpload />
    </div>
  )
}

export default ImageStep