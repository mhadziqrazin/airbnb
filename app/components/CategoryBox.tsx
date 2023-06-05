import { useRouter, useSearchParams } from "next/navigation"
import { IconType } from "react-icons"
import qs from "query-string"
import { useCallback } from "react"

interface CategoryBoxProps {
  label: string
  icon: IconType
  selected?: boolean
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
  label, icon: Icon, selected
}) => {
  const router = useRouter()
  const params = useSearchParams()

  const handleClick = useCallback(() => {
    let currentQuery = {}

    if (params) {
      currentQuery = qs.parse(params.toString())
    }

    const updatedQuery: any = {
      ...currentQuery,
      category: label
    }

    if (params?.get('category') === label) {
      delete updatedQuery.category
    }

    const url = qs.stringifyUrl({
      url: '/',
      query: updatedQuery
    })

    router.push(url)
  }, [label, params, router])

  return (
    <button
      onClick={handleClick}
      className={`
        flex flex-col items-center gap-2 p-3 border-b-2 transition
        hover:text-neutral-800 dark:hover:text-neutral-300
        ${selected ? 'border-neutral-800 dark:border-neutral-300' : 'border-transparent'}
        ${selected ? 'text-neutral-800 dark:text-neutral-300' : 'text-neutral-500'}
      `}
    >
      <Icon size={26} />
      <p className="font-medium text-sm">
        {label}
      </p>
    </button>
  )
}

export default CategoryBox