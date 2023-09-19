import { Loader } from '../components/atoms/Loader'
import { useAuth } from '../hooks/useAuth'
import { Header } from './header'
import { Footer } from '../components/organisms/Footer'
import { Container } from '@chakra-ui/react'

export const Main = ({ children }: { children: React.ReactNode }) => {
  const check = useAuth()

  if (!check.checked) {
    return <Loader />
  }
  return (
    check.checked && (
      <>
        <Header />
        <Container
          minW={'100%'}
          minH={'80vh'}
          padding={'0px'}
          margin={'0px'}
          bg={'gray.50'}
        >
          {children}
        </Container>
        <Footer />
      </>
    )
  )
}
