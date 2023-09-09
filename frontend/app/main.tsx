import { Loader } from '../components/atoms/Loader'
import { useAuth } from '../hooks/useAuth'
import { Header } from './header'
import { Footer } from '../components/organisms/Footer'

export const Main = ({ children }: { children: React.ReactNode }) => {
  const check = useAuth()

  if (!check.checked) {
    return <Loader />
  }
  return (
    check.checked && (
      <>
        <Header />
        {children}
        <Footer />
      </>
    )
  )
}