import { IconType } from "react-icons"

interface ListingCategoryProps {
  icon: IconType
  label: string
  description: string
}

const ListingCategory: React.FC<ListingCategoryProps> = ({
  icon: Icon, label, description
}) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-row items-center gap-4">
        <Icon size={40} className="text-neutral-600 dark:text-neutral-200" />
        <div className="flex flex-col">
          <p className="text-lg font-semibold">
            {label}
          </p>
          <p className="txet-neutral-500 dark:text-neutral-400">
            {description}
          </p>
        </div>
      </div>
    </div>
  )
}

export default ListingCategory