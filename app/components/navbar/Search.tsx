'use client'

const Search = () => {
  return (
    <div className="border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm animated hover:shadow-md cursor-pointer">
        <div className="flex flex-row items-center justify-between">
          <div className="text-sm font-semibold px-6">
            Anywhere
          </div>
          <div className="hidden sm:block text-sm font-semibold px-6 border-l-[1px] flex-1 text-center">
            Any Week
          </div>
          <div className="text-sm pl-6 pr-2 text-gray-600 dark:text-gray-300 border-l-[1px] flex flex-row items-center gap-3">
            <div className="hidden sm:block">
              Add Guests
            </div>
          </div>
        </div>
    </div>
  )
}

export default Search