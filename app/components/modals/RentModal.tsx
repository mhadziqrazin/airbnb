'use client'

import useRentModal from "@/app/hooks/useRentModal"
import Modal from "./Modal"
import { useMemo, useState } from "react"
import { PulseLoader } from "react-spinners"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import dynamic from "next/dynamic"
import CategoryStep from "../rentModals/CategoryStep"
import LocationStep from "../rentModals/LocationStep"
import InfoStep from "../rentModals/InfoStep"
import ImageStep from "../rentModals/ImageStep"
import DescriptionStep from "../rentModals/DescriptionStep"
import PriceStep from "../rentModals/PriceStep"
import axios from "axios"
import { toast } from "react-hot-toast"
import { useRouter } from "next/navigation"

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
  const router = useRouter()

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
  const imageSrc = watch('imageSrc')

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

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (step !== STEPS.PRICE) {
      return onNext()
    }

    setLoading(true)

    try {
      await axios.post('/api/listings', data)
      toast.success('Listing created!')
      rentModal.onClose()
      router.refresh()
      reset()
      setStep(STEPS.CATEGORY)
    } catch (err) {
      toast.error('Something went wrong. Try again')
      console.log(err)
    }

    setLoading(false)
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
        <ImageStep
          imageSrc={imageSrc}
          setCustomValue={setCustomValue}
        />
      )
      break

    case STEPS.DESCRIPTION:
      body = (
        <DescriptionStep
          disabled={loading}
          register={register}
          errors={errors}
        />
      )
      break

    case STEPS.PRICE:
      body = (
        <PriceStep
          disabled={loading}
          register={register}
          errors={errors}
        />
      )
      break
  }

  const label = (
    <>
      {!loading ?
        actionLabel : <PulseLoader color="white" size={10} />
      }
    </>
  )

  return (
    <Modal
      isOpen={rentModal.isOpen}
      title="Airbnb your home!"
      actionLabel={label}
      secondaryActionLabel={secondaryActionLabel}
      onClose={rentModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      body={body}
    />
  )
}

export default RentModal