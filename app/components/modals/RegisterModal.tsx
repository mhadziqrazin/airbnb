'use client'

import { AiFillGithub } from "react-icons/ai"
import { FcGoogle } from "react-icons/fc"
import useRegisterModal from "@/app/hooks/useRegisterModal"
import { useState } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import axios from "axios"
import Modal from "./Modal"
import Heading from "../texts/Heading"
import Input from "../inputs/Input"

const RegisterModal = () => {
  const registerModal = useRegisterModal()
  const [loading, setLoading] = useState(false)

  const {register, handleSubmit, formState: {errors}} = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  })

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setLoading(true)

    try {
      await axios.post('/api/register', data)
      registerModal.onClose()
    } catch (err) {
      console.log(err)
    }

    setLoading(false)
  }

  const body = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Welcome to AirbnbHajik"
        subtitle="Create an account"
      />
      <Input
        id="email"
        label="Email"
        disabled={loading}
        register={register}
        errors={errors}
        required
        formatPrice
      />
    </div>
  )

  return (
    <Modal
      disabled={loading}
      isOpen={registerModal.isOpen}
      title="Register"
      actionLabel="Continue"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={body}
    />
  )
}

export default RegisterModal