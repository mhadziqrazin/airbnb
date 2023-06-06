'use client'

import useRentModal from "@/app/hooks/useRentModal"
import Modal from "./Modal"
import { useMemo, useState } from "react"
import { PulseLoader } from "react-spinners"
import { FieldValues, useForm } from "react-hook-form"
import dynamic from "next/dynamic"
import CategoryStep from "../rentModals/CategoryStep"
import LocationStep from "../rentModals/LocationStep"
import InfoStep from "../rentModals/InfoStep"
import ImageStep from "../rentModals/ImageStep"

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
  const guestCount = watch('guestCount')
  const roomCount = watch('roomCount')
  const bathroomCount = watch('bathroomCount')

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
        <CategoryStep
          category={category}
          setCustomValue={setCustomValue}
        />
      )
      break

    case STEPS.LOCATION:
      body = (
        <LocationStep
          setCustomValue={setCustomValue}
          location={location}
          map={Map}
        />
      )
      break

    case STEPS.INFO:
      body = (
        <InfoStep
          guestCount={guestCount}
          roomCount={roomCount}
          bathroomCount={bathroomCount}
          setCustomValue={setCustomValue}
        />
      )
      break

    case STEPS.IMAGES:
      body = (
        <ImageStep/>
      )
      break
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