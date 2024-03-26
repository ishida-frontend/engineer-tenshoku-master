import { Loader } from '../components/atoms/Loader'
import { Header } from './header'
import { Footer } from '../components/organisms/Footer'
import { PATHS } from '../constants/paths'
import { useSession, signOut } from 'next-auth/react'
import { Box, Flex } from '@chakra-ui/react'
import { isAdmin, isAdminPage } from '../utils/useAdminAuth'

export const Main = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession()
  console.log('session', session)

  if (status === 'loading') {
    return <Loader />
  }

  const user = session?.user as {
    id: string
    isAdmin: boolean
    name: string
  }

  const triggerSignOut = () => signOut({ callbackUrl: PATHS.LOGIN.path })

  const canShowAdminPage = isAdminPage() || isAdmin(user)

  if (canShowAdminPage) {
    return <Box>管理者権限がありません</Box>
  }

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
