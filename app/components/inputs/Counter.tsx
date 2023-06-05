import { useCallback } from "react"
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai"

interface CounterProps {
  title: string
  subtitle: string
  value: number
  onChange: (value: number) => void
}

const Counter: React.FC<CounterProps> = ({
  title, subtitle, value, onChange
}) => {
  const onAdd = useCallback(() => {
    onChange(value + 1)
  }, [onChange, value])

  const onReduce = useCallback(() => {
    if (value === 1) {
      return
    }
    onChange(value - 1)
  }, [onChange, value])

  return (
    <div className="flex flex-row items-center justify-between">
      <div className="flex flex-col">
        <p className="font-medium">
          {title}
        </p>
        <p className="font-light text-gray-600 dark:text-gray-300">
          {subtitle}
        </p>
      </div>
      <div className="flex flex-row items-center gap-4">
        <button
          onClick={onReduce}
          className={`
            w-10 h-10 rounded-full border-[1px] border-neutral-400 flex items-center justify-center text-neutral-600 dark:text-neutral-200 hover-opacity-80 transition
            ${value === 1 ? 'cursor-not-allowed opacity-50' : ''}
          `}
        >
          <AiOutlineMinus />
        </button>
        <p className="font-light text-xl text-neutral-600 dark:text-neutral-200">
          {value}
        </p>
        <button
          onClick={onAdd}
          className="w-10 h-10 rounded-full border-[1px] border-neutral-400 flex items-center justify-center text-neutral-600 dark:text-neutral-200 hover-opacity-80 transition">
          <AiOutlinePlus />
        </button>
      </div>
    </div>
  )
}

export default Counter