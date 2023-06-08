import Theme from './providers/Theme'
import Navbar from './components/navbar/Navbar'
import './globals.css'
import { Nunito } from 'next/font/google'
import ToasterProvider from './providers/Toaster'
import getCurrentUser from './actions/getCurrentUser'
import RegisterModal from './components/modals/RegisterModal'
import LoginModal from './components/modals/LoginModal'
import RentModal from './components/modals/RentModal'

const font = Nunito({ subsets: ['latin'] })

export const metadata = {
  title: 'Airbnb Hajik',
  description: 'Airbnb Clone',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser()

  return (
    <html lang="en">
      <body className={`${font.className} dark:bg-[#121212]`}>
        <Theme>
          <ToasterProvider />
          <RegisterModal />
          <LoginModal />
          <RentModal />
          <div>
            <Navbar currentUser={currentUser} />
            {children}
          </div>
        </Theme>
      </body>
    </html>
  )
}
