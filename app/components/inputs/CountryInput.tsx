import useCountries from "@/app/hooks/useCountries"
import Select from "react-select"

export type CountryInputValue = {
  value: string
  label: string
  flag: string
  latlng: number[]
  region: string
}

interface CountryInputProps {
  value?: CountryInputValue
  onChange: (value: CountryInputValue) => void
}

const CountryInput: React.FC<CountryInputProps> = ({
  value, onChange
}) => {
  const { getAll } = useCountries()
  return (
    <div>
      <Select
        placeholder="Anywhere"
        isClearable
        options={getAll()}
        value={value}
        onChange={(value) => onChange(value as CountryInputValue)}
        formatOptionLabel={(option: CountryInputValue) => (
          <div className="flex flex-row items-center gap-3">
            <div>
              {option.flag}
            </div>
            <p className="dark:text-white">
              {option.label},
              <span className="text-neutral-500 dark:text-neutral-400 ml-1">
                {option.region}
              </span>
            </p>
          </div>
        )}
        classNames={{
          control: () => 'p-3 border-2 dark:bg-neutral-800 dark:border-white dark:hover:border-white',
          input: () => 'text-lg dark:text-white',
          option: () => 'text-lg dark:bg-neutral-800 dark:hover:bg-rose-700'
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: 'black',
            primary25: '#ffe4e6'
          }
        })}
      />
    </div>
  )
}

export default CountryInput