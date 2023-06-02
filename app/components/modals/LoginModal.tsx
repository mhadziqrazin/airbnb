'use client'

import { AiFillGithub } from "react-icons/ai"
import { FcGoogle } from "react-icons/fc"
import useRegisterModal from "@/app/hooks/useRegisterModal"
import useLoginModal from "@/app/hooks/useLoginModal"
import { useState } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import axios from "axios"
import Modal from "./Modal"
import Heading from "../texts/Heading"
import Input from "../inputs/Input"
import toast from "react-hot-toast"
import Button from "../buttons/Button"
import { PulseLoader } from "react-spinners"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

const LoginModal = () => {
  const router = useRouter()
  const loginModal = useLoginModal()
  const registerModal = useRegisterModal()
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setLoading(true)

    const res = await signIn('credentials', {
      ...data,
      redirect: false
    })
    if (res?.ok) {
      loginModal.onClose()
      toast.success('Login successful!')
      reset()
      router.refresh()
    } else if (res?.status === 401) {
      toast.error('Invalid email or password!')
    } else {
      toast.error('Something went wrong. Try again')
    }

    setLoading(false)
  }

  const body = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Welcome back!"
        subtitle="Login to your account"
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
        label="Sign in with Google"
        icon={FcGoogle}
        onClick={() => { }}
      />
      <Button
        outline
        label="Sign in with Github"
        icon={AiFillGithub}
        onClick={() => signIn('github')}
      />
      <p className="text-center">
        Don&apos;t have an account? <span
          onClick={() => {
            loginModal.onClose()
            registerModal.onOpen()
          }}
          className="font-semibold text-rose-500 hover:underline hover:cursor-pointer transition"
        >
          Register
        </span>
      </p>
    </div>
  )

  const label = (
    <>
      {!loading ?
        <>Login</> : <PulseLoader color="white" size={10} />
      }
    </>
  )

  return (
    <Modal
      disabled={loading}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel={label}
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={body}
      footer={footer}
    />
  )
}

export default LoginModal