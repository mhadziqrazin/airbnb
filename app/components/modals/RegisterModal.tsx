'use client'

import { AiFillGithub } from "react-icons/ai"
import { FcGoogle } from "react-icons/fc"
import useRegisterModal from "@/app/hooks/useRegisterModal"
import { useState } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import axios from "axios"
import Modal from "./Modal"

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

  return (
    <Modal
      disabled={loading}
      isOpen={registerModal.isOpen}
      title="Register"
      actionLabel="Continue"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
    />
  )
}

export default RegisterModal