import { Loader } from '../components/atoms/Loader'
import { Header } from './header'
import { Footer } from '../components/organisms/Footer'
import { PATHS } from '../constants/paths'
import { useSession, signOut } from 'next-auth/react'
import { Box, Flex } from '@chakra-ui/react'

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

  const triggerSignOut = () => signOut({ callbackUrl: PATHS.LOGIN.path })

  return (
    <Flex direction="column" minH="100vh">
      <Header user={user} signOut={triggerSignOut} />
      <Box flex="1" bg="gray.200">
        {children}
      </Box>
      <Footer />
    </Flex>
  )
}
