import { DateRange, Range } from "react-date-range"
import Calendar from "../inputs/Calendar"
import Button from "../buttons/Button"
import { PulseLoader } from "react-spinners"
import "react-date-range/dist/styles.css"
import "react-date-range/dist/theme/default.css"

interface ListingReservationProps {
  price: number
  totalPrice: number
  onChangeDate: (value: Range) => void
  dateRange: Range
  onSubmit: () => void
  disabled: boolean
  disabledDates: Date[]
}

const ListingReservation: React.FC<ListingReservationProps> = ({
  price, totalPrice, onChangeDate, dateRange, onSubmit, disabled, disabledDates
}) => {

  const label = (
    <>
      {!disabled ?
        <>Reserve</> : <PulseLoader color="white" size={10} />
      }
    </>
  )

  return (
    <div className="rounded-xl border-[1px] border-neutral-200 dark:border-neutral-700 overflow-hidden">
      <div className="flex flex-row items-center gap-1 p-4">
        <p className="text-xl font-semibold">
          $ {price}
          <span
            className="font-light text-neutral-600 dark:text-neutral-300"
          > / night
          </span>
        </p>
      </div>
      <hr className="dark:border-neutral-700" />
      <Calendar
        value={dateRange}
        disabledDates={disabledDates}
        onChange={(value) => onChangeDate(value.selection)}
      />
      <div className="p-4">
        <Button
          disabled={disabled}
          label={label}
          onClick={onSubmit}
        />
      </div>
      <hr className="dark:border-neutral-700" />
      <div className="p-4 flex flex-row items-center justify-between font-semibold text-lg">
        <p>Total</p>
        <p>$ {totalPrice}</p>
      </div>
    </div>
  )
}

export default ListingReservation