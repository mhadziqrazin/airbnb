import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form"
import Input from "../inputs/Input"
import Heading from "../texts/Heading"

interface PriceStepProps {
  disabled: boolean
  register: UseFormRegister<FieldValues>
  errors: FieldErrors<FieldValues>
}

const PriceStep: React.FC<PriceStepProps> = ({
  disabled, register, errors
}) => {
  return (
    <div className="flex flex-col gap-8">
      <Heading
        title="Last but not least, set your price"
        subtitle="How much do you charge per night?"
      />
      <Input
        id="price"
        label="Price"
        type="number"
        formatPrice
        disabled={disabled}
        register={register}
        errors={errors}
        required
      />
    </div>
  )
}

export default PriceStep