import { categories } from "@/app/constants/categories"
import Heading from "../texts/Heading"
import CategoryInput from "../inputs/CategoryInput"

interface CategoryStepProps {
  category: string
  setCustomValue: (id: string, value: any) => void
}

const CategoryStep: React.FC<CategoryStepProps> = ({
  category, setCustomValue
}) => {
  return (
    <div className="flex flex-col gap-8">
      <Heading
        title="Which of these best describe your property?"
        subtitle="Pick a category"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
        {categories.map((item) => (
          <div key={item.id} className="col-span-1">
            <CategoryInput
              onClick={(category) => setCustomValue('category', category)}
              selected={category === item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default CategoryStep