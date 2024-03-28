import { Header } from './_layouts/header'
import { Footer } from '../components/organisms/Footer'
import { Box, Flex } from '@chakra-ui/react'
import { isAdmin, isAdminPage } from '../utils/useAdminAuth'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'

export const Main = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions)
  const user = session?.user

  if (isAdminPage()) {
    const canShowAdminPage = isAdmin(user)

    if (!canShowAdminPage) {
      return <Box>管理者権限がありません</Box>
    }
  }

  return (
    <Flex direction="column" minH="100vh">
      <Header user={user} />
      <Box flex="1" bg="gray.200">
        {children}
      </Box>
      <Footer />
    </Flex>
  )
}
