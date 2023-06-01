'use client'

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form"
import { BiDollar } from "react-icons/bi"

interface InputProps {
  id: string
  label: string
  type?: string
  disabled?: boolean
  formatPrice?: boolean
  required?: boolean
  register: UseFormRegister<FieldValues>
  errors: FieldErrors
}

const Input: React.FC<InputProps> = ({
  id, label, type = 'text', disabled, formatPrice, register, required, errors
}) => {
  return (
    <div className="w-full relative">
      {formatPrice && (
        <BiDollar size={24} className="text-neutral-700 dark:text-white absolute top-6 left-2" />
      )}
      <input
        type={type}
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=" "
        className={`
          peer w-full p-4 pt-6 font-light bg-white dark:bg-neutral-800 border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed
          ${formatPrice ? 'pl-9' : 'pl-4'}
          ${errors[id] ? 'border-rose-500' : 'border-neutral-300 dark:border-neutral-600'}
          ${errors[id] ? 'focus:border-rose-500' : 'focus:border-black dark:focus:border-neutral-400'}
        `}
      />
    </div>
  )
}

export default Input