import Theme from './providers/Theme'
import RegisterModal from './components/modals/RegisterModal'
import Navbar from './components/navbar/Navbar'
import './globals.css'
import { Nunito } from 'next/font/google'
import ToasterProvider from './providers/Toaster'
import LoginModal from './components/modals/LoginModal'

const font = Nunito({ subsets: ['latin'] })

export const metadata = {
  title: 'Airbnb',
  description: 'Airbnb Clone',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Theme>
          <ToasterProvider />
          <RegisterModal />
          <LoginModal />
          <Navbar />
          {children}
        </Theme>
      </body>
    </html>
  )
}
