'use client'

import useRentModal from "@/app/hooks/useRentModal"
import Modal from "./Modal"
import { useMemo, useState } from "react"
import { PulseLoader } from "react-spinners"
import Heading from "../texts/Heading"
import { categories } from "@/app/constants/categories"
import CategoryInput from "../inputs/CategoryInput"
import { FieldValues, useForm } from "react-hook-form"
import CountryInput from "../inputs/CountryInput"
import dynamic from "next/dynamic"

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5
}

const RentModal = () => {
  const rentModal = useRentModal()
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(STEPS.CATEGORY)

  const { register, handleSubmit, setValue, watch, formState: { errors }, reset } = useForm<FieldValues>({
    defaultValues: {
      category: '',
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: '',
      price: 1,
      title: '',
      description: ''
    }
  })

  const category = watch('category')
  const location = watch('location')

  const Map = useMemo(() => dynamic(() => import('../Map'), {
    ssr: false
  }), [location])

  const setCustomValue = ((id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true
    })
  })

  const onBack = () => {
    setStep((value) => value - 1)
  }

  const onNext = () => {
    setStep((value) => value + 1)
  }

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return 'Create'
    }
    return 'Next'
  }, [step])

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined
    }
    return 'Back'
  }, [step])

  let body

  switch (step) {
    case STEPS.CATEGORY:
      body = (
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
      break

    case STEPS.LOCATION:
      body = (
        <div className="flex flex-col gap-8">
          <Heading
            title="Where is your property located?"
            subtitle="Help guests find you!"
          />
          <CountryInput
            onChange={(value) => setCustomValue('location', value)}
            value={location}
          />
          <Map
            center={location?.latlng}
          />
        </div>
      )
      break

    case STEPS.INFO:
      body = (
        <div className="flex flex-col gap-8">
          <Heading
            title="Share some basics about your property"
            subtitle="What amenities do you have?"
          />
        </div>
      )
  }



  const label = (
    <>
      {!loading ?
        <>Submit</> : <PulseLoader color="white" size={10} />
      }
    </>
  )

  return (
    <Modal
      isOpen={rentModal.isOpen}
      title="Airbnb your home!"
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      onClose={rentModal.onClose}
      onSubmit={onNext}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      body={body}
    />
  )
}

export default RentModal