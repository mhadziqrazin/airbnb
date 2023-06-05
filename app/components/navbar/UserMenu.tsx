'use client'

import { AiOutlineMenu } from 'react-icons/ai'
import Avatar from '../Avatar'
import { useCallback, useState } from 'react'
import MenuItem from './MenuItem'
import useRegisterModal from '@/app/hooks/useRegisterModal'
import useLoginModal from '@/app/hooks/useLoginModal'
import ThemeToggle from './ThemeToggle'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { SafeUser } from '@/app/types'
import useRentModal from '@/app/hooks/useRentModal'

interface UserMenuProps {
  currentUser?: SafeUser | null
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const loginModal = useLoginModal()
  const registerModal = useRegisterModal()
  const rentModal = useRentModal()
  const [isOpen, setIsOpen] = useState(false)

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value)
  }, [])

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen()
    }
    rentModal.onOpen()
  }, [currentUser, loginModal])

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <button
          onClick={onRent}
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer transition"
        >
          Airbnb your home
        </button>
        <button
          onClick={toggleOpen}
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 dark:border-rose-500 dark:text-rose-500 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md animated-shadow"
        >
          <AiOutlineMenu className='md:ml-1' />
          <div className='hidden md:block'>
            <Avatar src={currentUser?.image} />
          </div>
        </button>
      </div>

      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white dark:bg-neutral-800 overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            <div className="flex sm:hidden justify-center px-4 py-3 border-b-[1px] dark:border-neutral-700">
              <ThemeToggle menuItem />
            </div>
            {currentUser ? (
              <>
                <MenuItem
                  onClick={() => { }}
                  label="My trips"
                />
                <MenuItem
                  onClick={() => { }}
                  label="My favorites"
                />
                <MenuItem
                  onClick={() => { }}
                  label="My reservations"
                />
                <MenuItem
                  onClick={() => { }}
                  label="My properties"
                />
                <div className="block md:hidden">
                  <MenuItem
                    onClick={rentModal.onOpen}
                    label="Airbnb my home"
                  />
                </div>
                <hr className='dark:border-neutral-700'/>
                <MenuItem
                  onClick={signOut}
                  label="Logout"
                />
              </>
            ) : (
              <>
                <MenuItem
                  onClick={loginModal.onOpen}
                  label="Sign in"
                />
                <MenuItem
                  onClick={registerModal.onOpen}
                  label="Sign up"
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default UserMenu