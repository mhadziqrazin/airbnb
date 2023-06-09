'use client'

import { useCallback, useEffect, useState } from "react"
import { IoMdClose } from 'react-icons/io'
import Button from "../buttons/Button"

interface ModalProps {
  isOpen?: boolean
  onClose: () => void
  onSubmit: () => void
  title?: string
  body?: React.ReactElement
  footer?: React.ReactElement
  actionLabel: React.ReactNode
  disabled?: boolean
  secondaryAction?: () => void
  secondaryActionLabel?: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({
  isOpen, onClose, onSubmit, title, body, footer, actionLabel, disabled, secondaryAction, secondaryActionLabel
}) => {
  const [visible, setVisible] = useState(isOpen)

  useEffect(() => {
    setVisible(isOpen)
  }, [isOpen])

  const handleClose = useCallback(() => {
    if (disabled) {
      return
    }

    setVisible(false)
    setTimeout(() => {
      onClose()
    }, 300)
  }, [disabled, onClose])

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return
    }

    onSubmit()
  }, [disabled, onSubmit])

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) {
      return
    }

    secondaryAction()
  }, [disabled, secondaryAction])

  if (!isOpen) {
    return null
  }

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-950/70">
        <div className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto max-h-full h-auto">
          {/* CONTENT */}
          <div className={`
              translate duration-300 h-full
              ${visible ? 'translate-y-0' : 'translate-y-full'}
              ${visible ? 'opacity-100' : 'opacity-0'}
            `}
          >
            <div className="translate min:h-full h-fit lg:h-auto md:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white dark:bg-neutral-800 outline-none focus:outline-none">
              {/* HEADER */}
              <div className="flex items-center p-6 rouned-t justify-center relative border-b-[1px] dark:border-neutral-700">
                <div className="text-lg font-semibold">
                  {title}
                </div>
                <button
                  onClick={handleClose}
                  className="p-1 border-0 hover:opacity-70 transition absolute right-9"
                >
                  <IoMdClose size={18} />
                </button>
              </div>
              {/* BODY */}
              <div className="relative p-6 flex-auto">
                {body}
              </div>
              {/* FOOTER */}
              <div className="flex flex-col gap-2 p-6">
                <div className="flex flex-row items-center gap-4 w-full">
                  {secondaryActionLabel && secondaryAction && (
                    <Button
                      outline
                      disabled={disabled}
                      label={secondaryActionLabel}
                      onClick={handleSecondaryAction}
                    />
                  )}
                  <Button
                    disabled={disabled}
                    label={actionLabel}
                    onClick={handleSubmit}
                  />
                </div>
                {footer}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Modal