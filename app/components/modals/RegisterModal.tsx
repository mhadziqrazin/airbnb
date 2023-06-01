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
import toast from "react-hot-toast"
import Button from "../buttons/Button"

const RegisterModal = () => {
  const registerModal = useRegisterModal()
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
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
      toast.error('Something went wrong :(')
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
      />
      <Input
        id="name"
        label="Name"
        disabled={loading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        type="password"
        label="Password"
        disabled={loading}
        register={register}
        errors={errors}
        required
      />
    </div>
  )

  const footer = (
    <div className="flex flex-col gap-4 mt-3">
      <hr className="dark:border-neutral-700" />
      <Button
        outline
        label="Sign up with Google"
        icon={FcGoogle}
        onClick={() => { }}
      />
      <Button
        outline
        label="Sign up with Github"
        icon={AiFillGithub}
        onClick={() => { }}
      />
      <p className="text-center">
        Already have an account? <span
          onClick={registerModal.onClose}
          className="font-semibold hover:text-rose-500 hover:cursor-pointer transition"
        >
          Login
        </span>
      </p>
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
      footer={footer}
    />
  )
}

export default RegisterModal