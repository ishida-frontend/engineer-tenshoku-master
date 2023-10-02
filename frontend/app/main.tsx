import { Loader } from '../components/atoms/Loader'
import { Header } from './header'
import { Footer } from '../components/organisms/Footer'
import { useSession, signOut } from 'next-auth/react'

export const Main = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return <Loader />
  }

  const user = session?.user as {
    id: string
    isAdmin: boolean
    name: string
  }

  return (
    <>
      <Header user={user} signOut={signOut} />
      {children}
      <Footer />
    </>
  )
}
