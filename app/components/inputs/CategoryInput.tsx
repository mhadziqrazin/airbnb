'use client'

import { IconType } from "react-icons"

interface CategoryInputProps {
  icon: IconType
  label: string
  selected?: boolean
  onClick: (value: string) => void
}

const CategoryInput: React.FC<CategoryInputProps> = ({
  icon: Icon, label, selected, onClick
}) => {
  return (
    <button
      onClick={() => onClick(label)}
      className={`
        w-full rounded-xl border-2 p-4 flex flex-rows items-center gap-3 hover:border-black dark:hover:border-white transition
        ${selected ? 'border-black dark:border-white' : 'border-neutral-200 dark:border-neutral-700'}
      `}
    >
      <Icon size={30} />
      <p className="font-semibold">
        {label}
      </p>
    </button>
  )
}

export default CategoryInput