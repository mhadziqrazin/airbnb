import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form"
import Input from "../inputs/Input"
import Heading from "../texts/Heading"

interface DescriptionStepProps {
  disabled: boolean
  register: UseFormRegister<FieldValues>
  errors: FieldErrors<FieldValues>
}

const DescriptionStep: React.FC<DescriptionStepProps> = ({
  disabled, register, errors
}) => {
  return (
    <div className="flex flex-col gap-8">
      <Heading
        title="How would you describe your property"
        subtitle="Short and sweet works best!"
      />
      <Input
        id="title"
        label="Title"
        disabled={disabled}
        register={register}
        errors={errors}
        required
      />
      <hr className="dark:border-neutral-700" />
      <Input
        id="description"
        label="Description"
        disabled={disabled}
        register={register}
        errors={errors}
        required
      />
    </div>
  )
}

export default DescriptionStep