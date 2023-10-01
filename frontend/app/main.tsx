import { Loader } from '../components/atoms/Loader'
import { Header } from './header'
import { Footer } from '../components/organisms/Footer'
import { AuthContext } from '../providers/AuthProvider'
import { useContext } from 'react'
import { useSession } from 'next-auth/react'

export const Main = ({ children }: { children: React.ReactNode }) => {
  const { check } = useContext(AuthContext)
  const { data: session, status } = useSession()

  // if (!check.checked) {
  //   return <Loader />
  // }
  return (
    <>
      <Header isLogin={check.isAuthenticated} />
      {children}
      <Footer />
    </>
  )
}
